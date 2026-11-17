// Public address of the shop, used for canonical links and structured data.
// Change VITE_SHOP_URL in Vercel if the shop moves to another address.
export const SITE_URL = (import.meta.env.VITE_SHOP_URL || 'https://shop.prosperinfotech.com').replace(/\/+$/, '')
// The company website (solutions, services, blog). The shop only links out to it.
export const COMPANY_URL = 'https://www.prosperinfotech.com'
