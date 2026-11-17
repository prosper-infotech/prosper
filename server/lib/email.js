// Transactional emails (plan section 7). Sends through Resend when
// RESEND_API_KEY is set. On a laptop with no key, each email is saved to
// .shop-dev/outbox so it can be opened and checked.
import fs from 'node:fs'
import path from 'node:path'
import { addEvent } from './db.js'
import { esc } from './http.js'
import { formatINR } from '../../shared/pricing.js'

const FROM = () => process.env.EMAIL_FROM || 'Prosper Infotech Shop <orders@prosperinfotech.com>'
const SALES = () => (process.env.SALES_NOTIFY_EMAIL || '').split(',').map((e) => e.trim()).filter(Boolean)

// Plain names for the order history and the admin Activity page.
const EMAIL_NAMES = {
  orderReceived: 'Order confirmation',
  paymentReceived: 'Payment received',
  paymentFailed: 'Payment failed',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Order cancelled',
  refunded: 'Refund',
  salesNewOrder: 'New order alert (sales team)',
  salesPaid: 'Ready to pack alert (sales team)',
  lowStock: 'Low stock alert',
  signInCode: 'Sign-in code',
  accountCreated: 'Welcome',
}

export async function sendEmail({ to, subject, html, text, replyTo, orderId, type = 'email' }) {
  const recipients = [].concat(to).filter(Boolean)
  if (!recipients.length) return { ok: false, skipped: true }
  let result
  try {
    if (process.env.RESEND_API_KEY) {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ from: FROM(), to: recipients, subject, html, text, reply_to: replyTo || undefined }),
        signal: AbortSignal.timeout(8000),
      })
      const data = await res.json().catch(() => ({}))
      result = res.ok ? { ok: true, id: data.id } : { ok: false, error: data?.message || `HTTP ${res.status}` }
    } else if (!process.env.VERCEL) {
      const dir = path.join(process.env.SHOP_LOCAL_DB_DIR || path.resolve('.shop-dev'), 'outbox')
      fs.mkdirSync(dir, { recursive: true })
      const name = `${Date.now()}-${type}`
      fs.writeFileSync(path.join(dir, `${name}.json`), JSON.stringify({ to: recipients, subject, text }, null, 1))
      fs.writeFileSync(path.join(dir, `${name}.html`), html)
      result = { ok: true, id: `local:${name}` }
    } else {
      result = { ok: false, error: 'Email service is not configured (RESEND_API_KEY missing).' }
    }
  } catch (err) {
    result = { ok: false, error: err.message }
  }
  if (!result.ok) console.error(`[shop] email "${subject}" failed: ${result.error}`)
  if (orderId) {
    await addEvent(orderId, result.ok ? 'email_sent' : 'email_failed', `${EMAIL_NAMES[type] || type} email to ${recipients.join(', ')}${result.ok ? '' : `: ${result.error}`}`)
  }
  return result
}

/* --------------------------------- Templates -------------------------------- */

const NAVY = '#14346d'
const GOLD = '#f7dd00'

function layout({ title, intro, body = '', button, settings, footnote }) {
  const support = [settings?.support_email, settings?.support_phone].filter(Boolean).map(esc).join(' &middot; ')
  return `<!doctype html><html><body style="margin:0;background:#f5f3ea;font-family:Arial,Helvetica,sans-serif;color:#444">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f3ea;padding:24px 12px"><tr><td align="center">
<table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden">
<tr><td style="background:${NAVY};padding:22px 28px;border-bottom:4px solid ${GOLD}"><span style="color:#ffffff;font-size:20px;font-weight:bold">Prosper Infotech</span><span style="color:${GOLD};font-size:13px;margin-left:8px">Online Shop</span></td></tr>
<tr><td style="padding:28px">
<h1 style="margin:0 0 12px;font-size:22px;color:${NAVY}">${esc(title)}</h1>
<p style="margin:0 0 18px;font-size:15px;line-height:1.6">${intro}</p>
${body}
${button ? `<p style="margin:24px 0 4px"><a href="${esc(button.url)}" style="display:inline-block;background:${GOLD};color:${NAVY};font-weight:bold;text-decoration:none;padding:12px 22px;border-radius:8px">${esc(button.label)}</a></p>` : ''}
${footnote ? `<p style="margin:18px 0 0;font-size:13px;color:#777;line-height:1.5">${footnote}</p>` : ''}
</td></tr>
<tr><td style="background:#fff8dc;padding:18px 28px;font-size:12px;color:#777;line-height:1.6">Need help? ${support || 'Reply to this email.'}<br>Prosper Infotech &middot; shop.prosperinfotech.com</td></tr>
</table></td></tr></table></body></html>`
}

function itemsTable(order, items) {
  const rows = items
    .map(
      (i) => `<tr><td style="padding:8px 0;border-bottom:1px solid #eee;font-size:14px">${esc(i.name)}<br><span style="color:#777;font-size:12px">${esc(i.sku)} &middot; Qty ${i.qty}</span></td><td align="right" style="padding:8px 0;border-bottom:1px solid #eee;font-size:14px;white-space:nowrap">${formatINR(i.line_total_paise)}</td></tr>`
    )
    .join('')
  const line = (label, value, bold) =>
    `<tr><td style="padding:6px 0;font-size:14px;${bold ? 'font-weight:bold;color:' + NAVY : ''}">${label}</td><td align="right" style="padding:6px 0;font-size:14px;${bold ? 'font-weight:bold;color:' + NAVY : ''}">${value}</td></tr>`
  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:6px 0 4px">${rows}
${line('Subtotal (incl. GST)', formatINR(order.subtotal_paise))}
${line('Shipping', order.shipping_paise ? formatINR(order.shipping_paise) : 'Free')}
${line('Total', formatINR(order.total_paise), true)}
<tr><td colspan="2" style="font-size:12px;color:#777;padding-top:2px">Includes GST of ${formatINR(order.gst_paise)}</td></tr></table>`
}

function itemsText(order, items) {
  return [
    ...items.map((i) => `- ${i.name} (${i.sku}) x ${i.qty}: ${formatINR(i.line_total_paise)}`),
    `Shipping: ${order.shipping_paise ? formatINR(order.shipping_paise) : 'Free'}`,
    `Total: ${formatINR(order.total_paise)} (includes GST ${formatINR(order.gst_paise)})`,
  ].join('\n')
}

function addressBlock(order) {
  const a = order.shipping_address
  return `<p style="margin:14px 0 0;font-size:13px;line-height:1.6;color:#666"><strong style="color:#444">Deliver to</strong><br>${esc(a.name)}, ${esc(a.line1)}${a.line2 ? ', ' + esc(a.line2) : ''}, ${esc(a.city)}, ${esc(a.state)} ${esc(a.pincode)}<br>Phone: ${esc(a.phone)}</p>`
}

function bankBlock(order, settings) {
  const b = settings.bank || {}
  const rows = [
    ['Amount to pay', formatINR(order.total_paise)],
    ['Payment reference', order.order_number],
    b.account_name && ['Account name', b.account_name],
    b.account_number && ['Account number', b.account_number],
    b.ifsc && ['IFSC', b.ifsc],
    b.bank_name && ['Bank', [b.bank_name, b.branch].filter(Boolean).join(', ')],
    settings.upi_id && ['UPI ID', settings.upi_id],
  ].filter(Boolean)
  const html = `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#fff8dc;border-radius:8px;padding:14px 16px;margin:6px 0 16px">${rows
    .map(([k, v]) => `<tr><td style="font-size:13px;color:#777;padding:3px 0">${esc(k)}</td><td align="right" style="font-size:14px;font-weight:bold;color:#444;padding:3px 0">${esc(v)}</td></tr>`)
    .join('')}</table>`
  return { html, text: rows.map(([k, v]) => `${k}: ${v}`).join('\n') }
}

const orderUrl = (base, order) => `${base}/order/${order.public_token}`

// Each builder returns { subject, html, text }.
export const templates = {
  orderReceived(order, items, settings, base) {
    const manual = order.payment_method !== 'razorpay'
    const bank = manual ? bankBlock(order, settings) : null
    return {
      subject: `Order ${order.order_number} received`,
      html: layout({
        title: `Thank you, ${order.contact.name.split(' ')[0]}. We have your order.`,
        intro: manual
          ? `Your order <strong>${esc(order.order_number)}</strong> is reserved. Please pay by bank transfer or UPI using the details below. We start packing as soon as the payment arrives.`
          : `Your order <strong>${esc(order.order_number)}</strong> has been placed. We will email you again as soon as your payment is confirmed.`,
        body: `${bank ? bank.html : ''}${itemsTable(order, items)}${addressBlock(order)}`,
        button: { url: orderUrl(base, order), label: 'View your order' },
        footnote: manual ? 'Add the order number in the payment remarks so we can match your payment quickly.' : '',
        settings,
      }),
      text: `Thank you. Order ${order.order_number} received.\n\n${bank ? bank.text + '\n\n' : ''}${itemsText(order, items)}\n\nTrack your order: ${orderUrl(base, order)}`,
    }
  },
  paymentReceived(order, items, settings, base) {
    return {
      subject: `Payment received for order ${order.order_number}`,
      html: layout({
        title: 'Payment received',
        intro: `We have received ${formatINR(order.total_paise)} for order <strong>${esc(order.order_number)}</strong>. We are now getting it ready to ship and will send you the tracking link.`,
        body: `${itemsTable(order, items)}${addressBlock(order)}`,
        button: { url: orderUrl(base, order), label: 'View order and invoice' },
        settings,
      }),
      text: `Payment of ${formatINR(order.total_paise)} received for order ${order.order_number}.\n\n${itemsText(order, items)}\n\nOrder page: ${orderUrl(base, order)}`,
    }
  },
  paymentFailed(order, items, settings, base) {
    return {
      subject: `Payment did not go through for order ${order.order_number}`,
      html: layout({
        title: 'Your payment did not go through',
        intro: `No money has been taken for order <strong>${esc(order.order_number)}</strong>. Your order is saved, so you can try again or pay by bank transfer or UPI without typing your details again.`,
        body: itemsTable(order, items),
        button: { url: orderUrl(base, order), label: 'Try payment again' },
        settings,
      }),
      text: `Payment failed for order ${order.order_number}. No money was taken. Try again here: ${orderUrl(base, order)}`,
    }
  },
  shipped(order, items, settings, base, shipment) {
    return {
      subject: `Order ${order.order_number} has shipped`,
      html: layout({
        title: 'Your order is on its way',
        intro: `Order <strong>${esc(order.order_number)}</strong> has been handed to ${esc(shipment.courier || 'the courier')}.${shipment.awb ? ` Tracking number: <strong>${esc(shipment.awb)}</strong>.` : ''}`,
        body: `${itemsTable(order, items)}${addressBlock(order)}`,
        button: shipment.tracking_url ? { url: shipment.tracking_url, label: 'Track your parcel' } : { url: orderUrl(base, order), label: 'View your order' },
        footnote: `Order page: <a href="${esc(orderUrl(base, order))}">${esc(orderUrl(base, order))}</a>`,
        settings,
      }),
      text: `Order ${order.order_number} has shipped with ${shipment.courier || 'the courier'}.${shipment.awb ? ` Tracking number: ${shipment.awb}.` : ''}${shipment.tracking_url ? `\nTrack: ${shipment.tracking_url}` : ''}\nOrder page: ${orderUrl(base, order)}`,
    }
  },
  delivered(order, items, settings, base) {
    return {
      subject: `Order ${order.order_number} delivered`,
      html: layout({
        title: 'Your order has been delivered',
        intro: `Order <strong>${esc(order.order_number)}</strong> is marked as delivered. Thank you for buying from Prosper Infotech. If anything is missing or not working, reply to this email and we will sort it out.`,
        body: itemsTable(order, items),
        button: { url: orderUrl(base, order), label: 'View order and invoice' },
        settings,
      }),
      text: `Order ${order.order_number} has been delivered. Thank you. Order page: ${orderUrl(base, order)}`,
    }
  },
  cancelled(order, items, settings, base, note) {
    return {
      subject: `Order ${order.order_number} cancelled`,
      html: layout({
        title: 'Your order has been cancelled',
        intro: `Order <strong>${esc(order.order_number)}</strong> has been cancelled.${note ? ` Note from our team: ${esc(note)}` : ''} If you paid for this order, the refund will be processed and you will get a separate email.`,
        body: itemsTable(order, items),
        button: { url: orderUrl(base, order), label: 'View your order' },
        settings,
      }),
      text: `Order ${order.order_number} has been cancelled.${note ? ` Note: ${note}` : ''} Order page: ${orderUrl(base, order)}`,
    }
  },
  refunded(order, items, settings, base, note) {
    return {
      subject: `Refund processed for order ${order.order_number}`,
      html: layout({
        title: 'Your refund has been processed',
        intro: `We have processed a refund of ${formatINR(order.total_paise)} for order <strong>${esc(order.order_number)}</strong>. It usually reaches your account in 5 to 7 working days, depending on your bank.${note ? ` Note from our team: ${esc(note)}` : ''}`,
        body: itemsTable(order, items),
        button: { url: orderUrl(base, order), label: 'View your order' },
        settings,
      }),
      text: `Refund of ${formatINR(order.total_paise)} processed for order ${order.order_number}. Order page: ${orderUrl(base, order)}`,
    }
  },
  salesNewOrder(order, items, settings, base) {
    const c = order.contact
    return {
      subject: `New shop order ${order.order_number}: ${formatINR(order.total_paise)} (${order.payment_method})`,
      html: layout({
        title: `New order ${order.order_number}`,
        intro: `${esc(c.name)}${c.company ? ` (${esc(c.company)})` : ''} &middot; ${esc(c.email)} &middot; ${esc(c.phone)}${order.gstin ? ` &middot; GSTIN ${esc(order.gstin)}` : ''}<br>Payment method: <strong>${esc(order.payment_method)}</strong> &middot; Status: <strong>${esc(order.status)}</strong>${order.notes ? `<br>Customer note: ${esc(order.notes)}` : ''}`,
        body: `${itemsTable(order, items)}${addressBlock(order)}`,
        button: { url: `${base}/admin/orders/${order.id}`, label: 'Open in admin' },
        settings,
      }),
      text: `New order ${order.order_number} from ${c.name} (${c.email}, ${c.phone}). ${formatINR(order.total_paise)}, ${order.payment_method}.\n\n${itemsText(order, items)}\n\nAdmin: ${base}/admin/orders/${order.id}`,
    }
  },
  salesPaid(order, items, settings, base) {
    return {
      subject: `Payment received: order ${order.order_number} (${formatINR(order.total_paise)}), ready to pack`,
      html: layout({
        title: `Order ${order.order_number} is paid`,
        intro: `Payment of ${formatINR(order.total_paise)} is confirmed. Please pack and ship this order.`,
        body: `${itemsTable(order, items)}${addressBlock(order)}`,
        button: { url: `${base}/admin/orders/${order.id}`, label: 'Open in admin' },
        settings,
      }),
      text: `Order ${order.order_number} is paid (${formatINR(order.total_paise)}). Admin: ${base}/admin/orders/${order.id}`,
    }
  },
  lowStock(products, settings, base) {
    const list = products.map((p) => `<li>${esc(p.name)} (${esc(p.sku)}): <strong>${p.stock_qty}</strong> left</li>`).join('')
    return {
      subject: `Low stock: ${products.map((p) => p.name).join(', ').slice(0, 120)}`,
      html: layout({ title: 'Low stock alert', intro: 'These products are at or below the low-stock level:', body: `<ul style="font-size:14px;line-height:1.8;padding-left:18px">${list}</ul>`, button: { url: `${base}/admin/stock`, label: 'Update stock' }, settings }),
      text: `Low stock:\n${products.map((p) => `- ${p.name} (${p.sku}): ${p.stock_qty} left`).join('\n')}`,
    }
  },
  signInCode(code, purpose, settings) {
    return {
      subject: `${code} is your Prosper Infotech sign-in code`,
      html: layout({
        title: 'Your sign-in code',
        intro: `Enter this code to sign in${purpose === 'staff' ? ' to the staff admin' : ''}. It works for 10 minutes and can be used once.`,
        body: `<p style="font-size:34px;letter-spacing:8px;font-weight:bold;color:${NAVY};margin:8px 0 4px">${esc(code)}</p>`,
        footnote: 'If you did not ask for this code, you can ignore this email. Nobody can sign in without it.',
        settings,
      }),
      text: `Your Prosper Infotech sign-in code is ${code}. It works for 10 minutes. If you did not ask for it, ignore this email.`,
    }
  },
  accountCreated(email, settings, base) {
    return {
      subject: 'Your Prosper Infotech shop account is ready',
      html: layout({
        title: 'Welcome',
        intro: `Your account for <strong>${esc(email)}</strong> is ready. You can see your orders, download invoices, save addresses and reorder in a few taps. There is no password: we email you a code each time you sign in.`,
        button: { url: `${base}/account`, label: 'Go to my account' },
        settings,
      }),
      text: `Your Prosper Infotech shop account for ${email} is ready. My account: ${base}/account`,
    }
  },
}

export const salesRecipients = SALES
