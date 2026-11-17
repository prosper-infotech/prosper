# Prosper Infotech: Online Hardware Shop (Commercial Website) Plan

Goal: an attractive, easy-to-use online shop where customers buy RFID and barcode hardware directly from Prosper Infotech. Built on the existing website. Products are loaded from the current list now (placeholders) and replaced with real data later.

This document is the full plan. The **prompts to give Claude Code are in section 17**. Rough costs are estimates and the fee figures come from third-party sources: confirm on each provider's site.

---

## 1. Decisions already made (change any of these before building)

| Topic | Decision |
|---|---|
| Where it lives | Same repo and same site, under `/shop` (and `/admin` for staff). Same theme, header and footer. |
| Hosting | Existing Vercel project. Small server functions in `/api`. **Check the Vercel plan: the free Hobby plan is not allowed for commercial use.** |
| Domain | No new domain. Use `www.prosperinfotech.com/shop`. (Optional later: `shop.prosperinfotech.com`.) DNS is in Cloudflare. |
| Region and currency | India only, INR, to start. |
| Prices | Shown **including GST**. Each product has its own GST rate and HSN code. |
| Customers | **Guest checkout first** (name, email, phone, address). Optional accounts in a later phase. |
| Database and login | Supabase (Postgres + Auth + file storage). |
| Payments | Razorpay (or Cashfree) **plus** bank transfer / UPI as a manual option. Money is never taken without server-side confirmation. |
| Emails | Resend (or Brevo / SES), sent from `orders@prosperinfotech.com`. |
| Shipping | Flat rate, free above a set order value. First version: staff books the courier (Shiprocket) and types the tracking number. Courier API automation later. |
| CRM | Each order also creates a lead in Prosper CRM (leads only) and the existing Zoho copy. Existing form flows must keep working. |
| Products not for sale online | Stay "Request price" (quote form). A product becomes orderable only when it has a price and stock. |

---

## 2. Architecture

```
Browser (React + Vite, existing site)
   |  /shop, /cart, /checkout, /order/:token, /admin
   v
Vercel serverless functions  (/api/*)
   |-- Supabase (Postgres, Auth, Storage)   products, orders, customers
   |-- Razorpay                            create payment order, verify, webhook
   |-- Resend                              transactional emails
   |-- Prosper CRM webhook + Zoho          lead copy of each order
   |-- Shiprocket (later)                  create shipment, tracking webhooks
```

Rules that must hold:
- **The server decides the price.** The browser only sends product IDs and quantities. The server looks up prices, GST and shipping from the database and computes the total.
- **A payment is confirmed only by a verified Razorpay webhook** (signature check), never by the browser saying "success".
- **Secret keys live only in Vercel environment variables**, never in front-end code.
- Webhooks must be **idempotent** (the same event twice does not create two orders or two emails).
- Card details are never stored or touched by us.

---

## 3. Data model (Supabase / Postgres)

- **categories**: id, slug, name, description, sort_order, image.
- **products**: id, sku, slug, name, brand, category_id, short_description, long_description, specs (JSON list of label/value), images (list), datasheet_url, **price_paise** (null = quote only), **gst_percent**, **hsn_code**, **stock_qty**, **min_order_qty**, is_active, is_featured, quote_only (computed: no price or no stock policy), seo_title, seo_description, created_at, updated_at.
- **customers**: id, name, email, phone, company, gstin, created_at (guest orders create a customer row keyed by email).
- **addresses**: id, customer_id, line1, line2, city, state, pincode, country.
- **orders**: id, order_number (e.g. PI-2026-000123), public_token (for order status link), customer_id, status (`pending_payment`, `paid`, `processing`, `shipped`, `delivered`, `cancelled`, `refunded`), payment_method (`razorpay`, `bank_transfer`, `upi_manual`), subtotal_paise, gst_paise, shipping_paise, total_paise, billing_address, shipping_address, gstin, notes, created_at.
- **order_items**: order_id, product_id, sku, name (snapshot), unit_price_paise (snapshot), gst_percent, qty, line_total_paise.
- **payments**: order_id, provider, provider_order_id, provider_payment_id, amount_paise, status, raw_event (JSON), created_at.
- **shipments**: order_id, courier, awb (tracking number), tracking_url, shipped_at, delivered_at.
- **order_events**: order_id, type, message, created_by, created_at (audit trail for every status change and email).
- **settings**: shipping flat rate, free-shipping threshold, bank details, UPI ID, support phone and email, invoice prefix, GST registration details.
- **staff** (or role on Supabase users): who may use `/admin`.

Security: Supabase Row Level Security on every table. Public can only read active products and categories. Orders, customers and payments are readable only by the server (service key) and staff. The public order-status page reads through a server function using the unguessable `public_token`.

---

## 4. Pages and features

### 4.1 Customer-facing
1. **Shop home `/shop`**: hero, category tiles (Tags & Labels, Readers & Antennas, Barcode Scanners, Printers & Encoders), featured products, why-buy-from-us strip, FAQ, WhatsApp button.
2. **Category / listing `/shop/:category`**: product grid, filters (category, brand, price range, in stock), sort (featured, price low-high, high-low, newest), search box, product count, pagination or "load more". Cards show image, name, brand, 2 to 3 key specs, price with "Incl. GST", stock badge, **Add to cart** (or **Request price** for quote-only products).
3. **Product page `/shop/p/:slug`**: image gallery, price incl. GST, stock status, quantity selector with minimum order quantity, Add to cart / Buy now, specification table, datasheet download, "Request bulk quote" button, delivery estimate by pincode (simple), warranty and returns summary, related products, JSON-LD `Product` with `Offer`.
4. **Cart** (slide-out drawer plus `/cart` page): change quantity, remove, shipping and GST shown, "free shipping above ₹X" progress bar, continue to checkout.
5. **Checkout `/checkout`**: one page, guest-friendly. Contact, shipping address, optional GSTIN and company, billing same as shipping, order notes, payment choice (**Pay online** or **Bank transfer / UPI**), order summary, terms checkbox. Clear validation and a single "Place order" button.
6. **Order confirmation `/order/:token`**: order number, items, totals, status timeline (Placed, Paid, Packed, Shipped, Delivered), tracking link, bank/UPI details if manual payment, download invoice (Phase 5), support contact.
7. **Payment failed / retry page**: retry payment or switch method without re-entering details.
8. **Policy pages**: Shipping, Returns & Refunds, Warranty, Terms of Sale, Privacy (update existing), Contact. (Payment gateways ask for these before approval.)
9. **Accounts (Phase 4)**: sign in with email code or password, order history, saved addresses, reorder, download invoices.

### 4.2 Staff admin `/admin` (login required, `noindex`)
- **Orders**: list with filters (status, date, payment), open an order, change status, add notes, mark payment received (manual methods), cancel/refund (record), print packing slip.
- **Shipping**: enter courier + tracking number for an order, which sends the "shipped" email with the tracking link.
- **Products**: add, edit, hide, set price, GST, HSN, stock, images, specs, bulk import/export by CSV.
- **Stock**: quick stock update, low-stock list.
- **Settings**: shipping rules, bank/UPI details, support contacts, email templates text.
- **Dashboard**: today's orders, revenue, pending payments, orders to ship.

### 4.3 Design and ease of use
- Use the existing theme (navy `#14346d`, gold `#f7dd00`, `surface` backgrounds, Tailwind tokens, Framer Motion `Reveal`) so the shop feels like the same site.
- Mobile first. Large tap targets, sticky "Add to cart" on mobile product pages, sticky cart summary on checkout.
- Fast: lazy-loaded images with fixed aspect ratios, no layout shift, code-split shop routes.
- Trust: "Incl. GST", secure payment badge, delivery and warranty notes, phone and WhatsApp on every shop page, GST invoice mention.
- B2B: GSTIN field, company name, bulk quote button, purchase-order and bank transfer option.
- Accessibility: keyboard usable drawer and forms, labels on all inputs, visible focus, alt text, sufficient contrast.
- Empty and error states for cart, search, payment failure, network errors.

---

## 5. Product catalogue for launch (placeholders)

Seed the database from the existing placeholder list in `src/data/rfidProducts.js` (16 products) plus the three items on `/products/hardware` that are shown there:

- Tags & Labels (4): UHF RFID Paper Labels, On-Metal RFID Tags, Rugged Outdoor RFID Tags, Cable-Tie and Hang Tags.
- Readers & Antennas (3): Handheld UHF RFID Reader, 4-Port Fixed RFID Reader, RFID Antennas.
- Barcode Scanners (5): Handheld, Wireless, Mobile Computer with Scanner, Fixed-Mount, Tabletop.
- Printers & Encoders (4): Desktop RFID Printer, Industrial RFID Printer, Barcode Label Printer, Blank RFID Labels and Ribbons.
- Quote-only for now (not in cart): AI Edge Box, IoT Gateway, Antenna Integrated RFID Reader (coming soon).

Until real data arrives, every product is seeded with **no price**, so it shows "Request price" and opens the existing quote form. When you add a price and stock in the admin screen, the product automatically becomes orderable. That means the shop can be built and launched in stages without fake prices.

What we need later for each real product: name, brand, model, SKU, price including GST, GST % and HSN code, stock, minimum order quantity, 3 to 5 photos, specs, datasheet PDF, weight (for shipping).

---

## 6. Payments

- **Gateway:** Razorpay (or Cashfree). Check the yearly fee, the UPI fee and the success rate before choosing.
- **Flow:** the browser asks `/api/checkout` to create an order. The server computes the total, saves a `pending_payment` order, creates a Razorpay order and returns its ID. The browser opens Razorpay Checkout. After payment, `/api/razorpay-webhook` verifies the signature and marks the order `paid`, reduces stock and sends emails. The browser also calls `/api/verify-payment` to show the result quickly, but the **webhook is the source of truth**.
- **Manual option:** bank transfer / UPI. The order is saved as `pending_payment` and the confirmation page and email show bank details, UPI QR and the exact amount. Staff mark it paid in admin after checking the bank. An optional field lets the customer enter the UTR.
- **Refunds:** done from the Razorpay dashboard (or admin button later), then status set to `refunded` with a note.
- **Test mode first**, then a real small payment and refund before launch.
- **Fees to budget:** about 2% plus 18% GST on cards (about 2.36%). UPI may be near zero but confirm. All figures from third-party sources.

---

## 7. Emails (transactional)

Set up once: verify `prosperinfotech.com` with the email service by adding SPF, DKIM and DMARC records in Cloudflare. Send from `orders@prosperinfotech.com`, reply-to your support address.

| Email | Trigger | To |
|---|---|---|
| Order received | Order created | Customer, plus a copy to the sales team |
| Payment instructions | Manual payment chosen | Customer |
| Payment received | Webhook / staff marks paid | Customer, sales team |
| Payment failed | Webhook | Customer (retry link) |
| Order shipped (with tracking link) | Staff enters tracking | Customer |
| Delivered | Staff marks delivered | Customer |
| Order cancelled / refund processed | Status change | Customer |
| Account created (Phase 4) | Sign-up | Customer |
| Sign-in code (Phase 4) | Login request | Customer |
| New-device login alert (Phase 4, optional) | New device | Customer |

Notes: every email shows the order number, items, totals and a link to the order status page. Plain, well-formatted HTML plus text version. Log every sent email in `order_events`. I would not send a "login successful" email for every login. Send it only for new devices.

---

## 8. Shipping

- **Phase 1 to 3 (manual):** staff books the courier on Shiprocket (or any courier), then enters courier name and tracking number in admin. The "shipped" email goes out with the tracking link.
- **Rules:** flat rate and free above a set value (editable in settings), India only. Optional per-product weight for later weight-based rates.
- **Later (automation):** Shiprocket API creates the shipment from the order, gets the tracking number, and its webhook updates status to shipped and delivered automatically.
- **Delivery estimate:** a simple pincode check on the product page (fixed estimate at first).

---

## 9. GST and invoices

- Prices include GST. Store the GST % and HSN per product and compute the tax split per order.
- **Phase 1 to 4:** invoice is prepared manually from your usual process using the order data (an admin "export order" button gives a clean summary or CSV).
- **Phase 5:** automatic GST invoice PDF with sequential invoice number, your GSTIN, buyer GSTIN if given, HSN, CGST/SGST or IGST by state. **Have an accountant approve the format.**

---

## 10. SEO and analytics

- Shop pages indexable. Cart, checkout, account, order status and admin: `noindex`.
- Product pages: unique title and description, JSON-LD `Product` with `Offer` (price, INR, availability), breadcrumbs.
- Sitemap includes categories and products (generated from the database or at build time).
- Internal links: shop to blog and solutions, and the existing RFID & Barcode Products page links into the shop (and the shop links back for quotes).
- GA4 ecommerce events: `view_item_list`, `view_item`, `add_to_cart`, `begin_checkout`, `add_payment_info`, `purchase`. Keep the existing Google Ads conversion setup working.
- Google Merchant Center product feed (later, optional).

---

## 11. Security, privacy and compliance

- Server-side pricing and webhook signature verification (section 2).
- Row Level Security in Supabase. Service key only in server functions.
- Input validation on every API function. Rate limiting and a honeypot or CAPTCHA on checkout and sign-in to stop bots.
- Admin protected by login, with a role check on every admin API call.
- No card data stored. HTTPS everywhere (already true).
- Secrets only in Vercel environment variables. Never commit keys.
- Privacy policy and terms updated for orders and accounts. Data protection (India's DPDP Act): collect only what is needed, provide a way to delete an account.
- Backups: Supabase automatic backups. Keep a test and a live environment.
- Prosper CRM and Zoho lead forwarding must stay non-blocking: a CRM outage must never fail an order.

---

## 12. Environment variables (set in Vercel, never in code)

```
SUPABASE_URL
SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY        (server only)
RAZORPAY_KEY_ID
RAZORPAY_KEY_SECRET              (server only)
RAZORPAY_WEBHOOK_SECRET          (server only)
RESEND_API_KEY                   (server only)
EMAIL_FROM=orders@prosperinfotech.com
SALES_NOTIFY_EMAIL
VITE_CRM_WEBHOOK_URL             (existing)
SHIPROCKET_EMAIL / SHIPROCKET_PASSWORD   (later phase)
```

Test keys first. Live keys only at launch.

---

## 13. What you need to prepare (checklist)

Accounts and access:
- [ ] Vercel plan checked (commercial use needs a paid plan).
- [ ] Supabase account (free tier to start).
- [ ] Email service account (Resend or Brevo) and access to Cloudflare DNS to add SPF/DKIM/DMARC.
- [ ] Razorpay (or Cashfree) account with business KYC: PAN, GSTIN, bank account, website with policies live.
- [ ] Courier account (Shiprocket) for later.

Business inputs:
- [ ] Products with real names, brands, SKUs, prices incl. GST, GST % and HSN, stock, weights, photos, datasheets.
- [ ] Shipping rule (flat rate and free-shipping threshold).
- [ ] Bank account details and UPI ID/QR for manual payments.
- [ ] Policy text approved: returns, refunds, warranty, shipping, terms.
- [ ] Invoice process decided, and an accountant to approve the invoice format.
- [ ] Support email, phone and WhatsApp numbers for the shop.
- [ ] Who packs and ships orders, and who confirms manual payments.

---

## 14. Phases with acceptance criteria

Each phase is merged only after your approval ("push it live"). Build on a branch, check the Vercel preview, then merge.

### Phase 0: Foundations (about 2 to 3 days)
Supabase project, database tables, Row Level Security, seed products from the placeholder list (no prices), `/api` structure, environment variables, email domain verified.
Done when: seeded products are readable by the site, and a test email arrives (not in spam).

### Phase 1: Browse, cart, guest checkout, manual payment (about 1 to 2 weeks)
`/shop` home, listing with filters/sort/search, product pages, cart, checkout, order confirmation page, bank/UPI payment instructions, order emails, lead copy to Prosper CRM and Zoho, policy pages, menu and footer links, SEO, analytics events.
Done when: a test order placed from a phone shows in the database, the customer and sales team get emails, the quote-only products still open the quote form, and nothing breaks on the existing site.

### Phase 2: Online payments (about 3 to 5 days, plus gateway approval time)
Razorpay checkout, webhook, payment verification, failed-payment retry, refund note flow.
Done when: test-mode payments confirm orders by webhook only, a duplicate webhook does nothing extra, and a real small payment plus refund works in live mode.

### Phase 3: Staff admin and shipping (about 1 week)
`/admin` with login: orders, products, stock, settings, shipping entry, status changes, shipped and delivered emails.
Done when: staff can run a whole order from "paid" to "delivered" without touching the database, and each step emails the customer.

### Phase 4: Customer accounts (about 1 week)
Sign in with email code, order history, saved addresses, reorder, account-created and sign-in emails.
Done when: a customer can see past orders, and guest orders placed with the same email attach to the account.

### Phase 5: Invoices and automation (about 1 to 2 weeks)
Automatic GST invoice PDFs, Shiprocket API shipment creation and tracking updates, low-stock alerts, Merchant Center feed.
Done when: an accountant approves the invoice, and shipments update without manual entry.

---

## 15. Testing and launch checklist

- Build passes, lint passes, no console errors on shop pages.
- Price tampering test: change the total in the browser, and the server still charges the correct amount.
- Webhook tests: duplicate, out-of-order and bad-signature events.
- Out-of-stock and minimum-quantity behaviour, quantity limits.
- Mobile checks at 375px and 768px, no horizontal scroll, checkout usable one-handed.
- Email deliverability: Gmail, Outlook, Zoho inbox, spam folder check.
- Test orders: manual payment, online payment (test), online payment (live small amount), refund.
- Existing forms (contact, quote, landing pages) and CRM/Zoho forwarding still work.
- Policies live and linked. Terms checkbox enforced.
- `noindex` on cart, checkout, account, admin, order status. Sitemap updated.
- Rollback plan: the previous Vercel deployment can be restored in one click.

---

## 16. Rough costs (estimates, verify before committing)

| Item | Estimate |
|---|---|
| Hosting | Existing. Vercel Pro if needed: about $20 a month. |
| Supabase | Free tier to start. Paid plan later if needed. |
| Email service | Free tier at the start. Check limits. |
| Razorpay / Cashfree | About 2% to 2.36% on cards. UPI to be confirmed. |
| Courier | About ₹20 to ₹23 per 500 g in India (varies). |
| Accountant check of invoice format | About ₹3,000 to ₹10,000 once. |
| Policy review by a lawyer (optional) | About ₹5,000 to ₹15,000 once. |
| Build | No agency cost if built with Claude Code. A freelancer would be much more. |

At 50 orders a month of ₹10,000 each, gateway fees are about ₹11,800 a month, against about ₹23,600 with Shopify plus Razorpay.

---

## 17. Prompts to give Claude Code

Use one prompt per phase. Start each in a **new Claude Code session opened in this project folder** and let it finish, test and show a preview before moving on.

### 17.1 Master context (paste first in every session)

```
You are working on the Prosper Infotech website (React 19, Vite, Tailwind CSS 4, React Router 7,
Framer Motion, lucide-react), repo prosper-infotech/prosper, deployed to Vercel from master
(production = www.prosperinfotech.com).

Read docs/commercial-website-plan.md fully before doing anything. It is the source of truth for
the online hardware shop: decisions (section 1), architecture (2), data model (3), pages (4),
catalogue (5), payments (6), emails (7), shipping (8), GST (9), SEO (10), security (11),
environment variables (12), phases (14) and tests (15).

Rules:
- Work on a new git branch. NEVER merge or push to master until I say "push it live".
  Pushing the branch for a Vercel preview is fine.
- Match the existing design: theme tokens in the Tailwind config (primary navy, gold, surface),
  existing components (Reveal, Button, CTABand, FAQAccordion, QuoteModal, Breadcrumb),
  and useDocumentTitle for meta tags and JSON-LD.
- Do not break existing pages, forms, CRM/Zoho/Privyr forwarding, or the sitemap.
- Prices come only from the server. Payment is confirmed only by a verified webhook.
- Never commit secrets. Use environment variables and list any I must set in Vercel.
- Run `npm run build` and `npm run lint`, test in the browser at desktop and 375px,
  and report what you verified and what you could not.
- Placeholder products have no price and show "Request price" until real data is added.
- Explain things in plain words. Ask me before anything that costs money or needs my accounts.
```

### 17.2 Phase 0 prompt
```
Do Phase 0 of the plan: set up Supabase tables and Row Level Security from section 3, seed the
products and categories from section 5 (no prices, all quote-only), create the /api folder
structure for Vercel serverless functions, add a shared server helper for Supabase, and
wire up the email service. Give me exact step-by-step instructions for what I must create
in Supabase, Resend and Cloudflare (SPF/DKIM/DMARC) and which environment variables to set
in Vercel. Then send a test email and confirm the products are readable from the site.
```

### 17.3 Phase 1 prompt
```
Do Phase 1 of the plan: the /shop home, listing page with filters, sort and search, product
pages, cart drawer and cart page, one-page guest checkout, order confirmation page with the
order status timeline, bank transfer / UPI payment instructions, order emails (customer and
sales team), a lead copy to Prosper CRM and Zoho for each order, policy pages, menu and footer
links, SEO and GA4 ecommerce events. Quote-only products must keep opening the existing quote
form. Make it attractive, mobile first and very easy to use. Push the branch for a preview,
then list what I should test.
```

### 17.4 Phase 2 prompt
```
Do Phase 2: Razorpay online payment. Create the order server-side, open Razorpay Checkout,
verify the signature, handle the webhook idempotently, mark orders paid, reduce stock, send
emails, add a failed-payment retry flow. Use test mode only. Tell me exactly which keys and
webhook URL to set. Add tests for duplicate and invalid webhook events.
```

### 17.5 Phase 3 prompt
```
Do Phase 3: the staff admin at /admin (login, role check, noindex): orders, order detail with
status changes and notes, mark manual payments received, enter courier and tracking number
(sends the shipped email), products with CSV import and export, stock, settings, and a simple
dashboard. Staff must be able to run an order from paid to delivered without database access.
```

### 17.6 Phase 4 prompt
```
Do Phase 4: customer accounts with email-code sign-in, order history, saved addresses, reorder,
and attaching earlier guest orders with the same email. Add account and sign-in emails. Keep
guest checkout working.
```

### 17.7 Phase 5 prompt
```
Do Phase 5: automatic GST invoice PDFs with sequential numbers (CGST/SGST or IGST by state),
Shiprocket API shipment creation and tracking webhooks, low-stock alerts, and a Google Merchant
Center product feed. Show me the invoice sample so my accountant can approve it.
```

### 17.8 Later, when real products arrive
```
Replace the placeholder products with this real list (I will attach a spreadsheet): update names,
brands, SKUs, prices including GST, GST %, HSN, stock, weights, images and datasheets. Keep
quote-only products without a price as "Request price". Update the product pages, sitemap and
the RFID & Barcode Products marketing page so they link to the matching shop products.
```

---

## 18. Open questions to decide before Phase 0

1. Razorpay or Cashfree (check yearly fee and UPI fee)?
2. Vercel plan: is the project on Pro?
3. Shipping: flat rate amount and free-shipping threshold?
4. Is any product sold outside India or in USD?
5. Will you ship every product, or are some (readers with installation) quote-only for good?
6. Who handles manual payment checking and packing?
7. Do you want customer accounts at launch, or guest checkout only?
