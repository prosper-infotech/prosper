import { createContext, useContext, useEffect } from 'react'

export const ShopContext = createContext(null)

// Cart badge and drawer state only. Does not load the catalogue.
export function useCart() {
  return useContext(ShopContext)
}

// For shop pages: also makes sure the catalogue is loaded.
export function useShop() {
  const shop = useContext(ShopContext)
  const { ensureCatalogue } = shop
  useEffect(() => {
    ensureCatalogue()
  }, [ensureCatalogue])
  return shop
}
