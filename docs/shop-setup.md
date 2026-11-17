# Online shop: setup guide

This project is the shop only: home page, categories, product pages, cart, checkout, order
pages, account, contact, policies and the staff admin. The company pages (solutions, services,
blog) are not part of it; the shop links out to www.prosperinfotech.com for those.

It needs its own Vercel project and its own address. The code assumes
`shop.prosperinfotech.com`: add that domain to the new Vercel project and create the DNS
record Vercel shows you in Cloudflare. To use a different address, set `SITE_URL` and
`VITE_SHOP_URL` and update `public/sitemap.xml` and `public/robots.txt`.

The code is on the `shop` branch. It works on a laptop with no accounts (test mode).
To take real orders you connect four services. Do them in this order. Nothing here costs
money until you choose a paid plan, except Vercel Pro (needed for commercial use).

## 0. Try it on this computer first

```bash
npm install
npm run dev
```

- Shop: http://localhost:5173/
- Admin: http://localhost:5173/admin (sign in with an email listed in `ADMIN_EMAILS` in `.env.local`)
- In test mode, orders are saved in `.shop-dev/db.json` and every email is saved as a file in
  `.shop-dev/outbox/` (open the `.html` file to see it; the sign-in code is in the subject line).
- `npm test` runs the server tests (pricing, checkout, payment webhook, sign-in, CSV).

## 1. Supabase (database)

1. Create a project at supabase.com (region: Mumbai).
2. SQL Editor -> New query -> paste `supabase/schema.sql` -> Run.
3. New query -> paste `supabase/seed.sql` -> Run. This adds the 19 placeholder products (no prices).
4. Project Settings -> API: copy the **Project URL** and the **service_role** key.

The service_role key is a secret. It goes only into Vercel, never into code or chat.

## 2. Resend (emails)

1. Create an account at resend.com -> Domains -> Add `prosperinfotech.com`.
2. Resend shows DNS records (SPF, DKIM and a DMARC suggestion). Add each one in Cloudflare -> DNS.
   Set them to "DNS only" (grey cloud).
3. Wait for Resend to show "Verified", then create an API key.

## 3. Razorpay (online payments, optional at first)

Without Razorpay the shop still takes orders by bank transfer and UPI.

1. Finish business KYC. Razorpay will ask for the policy pages: they are live at
   `/shipping-policy`, `/returns-refunds`, `/warranty`, `/terms-of-sale`, `/privacy-policy`.
2. In **Test mode**: Settings -> API Keys -> generate a key (Key ID + Key Secret).
3. Settings -> Webhooks -> Add:
   - URL: `https://shop.prosperinfotech.com/api/payments/razorpay-webhook`
     (for a preview, use the preview address instead)
   - Secret: any long random text. Keep a copy for Vercel.
   - Events: `payment.captured`, `payment.failed`, `order.paid`, `refund.processed`
4. Use live keys only after a test-mode order works end to end.

## 4. Vercel environment variables

Project -> Settings -> Environment Variables. Add for Production and Preview:

| Name | Value |
|---|---|
| `SUPABASE_URL` | from step 1 |
| `SUPABASE_SERVICE_ROLE_KEY` | from step 1 |
| `SESSION_SECRET` | any random text, 32+ characters |
| `ADMIN_EMAILS` | your email (comma-separated for more people) |
| `RESEND_API_KEY` | from step 2 |
| `EMAIL_FROM` | `Prosper Infotech Shop <orders@prosperinfotech.com>` |
| `SALES_NOTIFY_EMAIL` | who gets "new order" emails |
| `SITE_URL` | `https://shop.prosperinfotech.com` (the shop's own address) |
| `VITE_SHOP_URL` | same address as `SITE_URL` |
| `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET` | from step 3 |

`VITE_CRM_WEBHOOK_URL` (already set) is reused to copy each order to Prosper CRM. Lead copies
to Prosper CRM and Zoho are sent only from the live site, not from previews or a laptop.

Until `SUPABASE_URL` is set, the live shop shows the placeholder catalogue as "Request price"
and nothing can be ordered, so it is safe to deploy before the accounts are ready.

## 5. First sign-in and settings

1. Open `/admin`, enter your email, type the code you receive.
2. Settings: shipping charge, free-shipping value, bank and UPI details, your GSTIN and
   billing state, support contacts. Bank transfer and UPI appear at checkout only once
   their details are filled in.
3. Products: add a price and stock to a product and it becomes orderable. Or export the CSV,
   fill it in Excel, and import it.

## Daily use

- **Orders**: open an order. For bank/UPI orders, check your bank and press "Mark payment
  received". Enter the courier and tracking number to mark it shipped. Then "Mark as delivered".
  Each step emails the customer.
- **Refunds**: refund the money in Razorpay or your bank first, then press "Record refund".
- **Invoice**: every paid order gets a sequential invoice number. Customers and staff open it
  from the order page and print or save it as PDF.

## What still needs a decision or an outside check

- Vercel plan: commercial use needs Pro.
- Shipping charge and free-shipping value (placeholders: Rs 150, free above Rs 5,000).
- Policy pages are sensible drafts. Read them and have them approved before launch.
- Invoice layout: have your accountant approve it (HSN codes are empty until you add them).
- Shiprocket automation is written but untested (no account). Manual tracking entry works.
