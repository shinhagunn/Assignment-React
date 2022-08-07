import { NavLink } from "react-router-dom"
import CartItem from "../components/CartItem"
import useCartStore from "../stores/cart"
import { Cart } from '../types'

function CartPage() {
  const cartStore = useCartStore()

  const formatCurrency = (number?: number) => {
    if (!number) return 0
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(number)
  }

  return (
    <div className="w-[600px] mx-auto">
      <div className="flex justify-between mb-4">
        <div>
          <a>Trở về</a>
        </div>
        <div className="text-xl text-[#D70018]">
          Giỏ hàng
        </div>
        <div></div>
      </div>
      { cartStore.carts.map((item: Cart) => (
        item.quantity > 0 ? <CartItem key={item.product_id} product={item} /> : ''
      )) }
      <div className="flex justify-between">
        <span className="font-semibold text-base">Tổng tiền tạm tính:</span>
        <span className="text-[#D70018] text-base">{formatCurrency(cartStore.carts.reduce((pre, item) => {
          return pre + item.new_price * item.quantity
        }, 0))}</span>
      </div>
      <button className="w-full h-[60px] mb-2 border-[#D70018] bg-[#D70018] text-white rounded mt-4">TIẾN HÀNH ĐẶT HÀNG</button>
      <NavLink to="/" className="text-[#D70018] flex justify-center items-center w-full h-[60px] my-2 border-[1px] border-[#D70018] bg-white rounded">CHỌN THÊM SẢN PHẨM KHÁC</NavLink>
    </div>
  )
}

export default CartPage
