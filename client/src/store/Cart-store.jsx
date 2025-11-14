import { create } from 'zustand'
import { persist } from 'zustand/middleware' // local storage


const cartStore = (set, get) => ({
    cart: [],

    actionAddtoCart: (product) => {
        const cart = get().cart
        const idx = cart.findIndex(p =>
            p.product_id === product.product_id &&
            p.unit_price === product.unit_price
        )

        if (idx !== -1) {
            const cur = cart[idx]
            const newQty = cur.quantity + product.quantity
            const unit = cur.unit_price

            const updated = [...cart]
            updated[idx] = {
                ...cur,
                quantity: newQty,
                subTotal: unit * newQty,
            }
            set({ cart: updated })
        } else {
            const unit = product.unit_price
            const qty = product.quantity
            const updated = [...cart, { ...product, unit_price: unit, quantity: qty, subTotal: unit * qty }]
            set({ cart: updated })
        }

        //console.log("📦 CART UPDATED:", get().cart)
        
    },
    actionRemoveFromCart: (product_id) => {
        const cart = get().cart
        const updated = cart.filter(item => item.product_id !== product_id)
        set({ cart: updated })
    },
    actionClearCart : ()=> set({cart:[]})

})

//เก็บข้อมูลไว้ที่ local storage เพื่อไม่ให้เวลา รีเฟรซหน้าแล้วข้อมูลการ login มันหาย
const usePersist = {
    name: 'cart-store'
}
const useCartStore = create(persist(cartStore, usePersist))


export default useCartStore
