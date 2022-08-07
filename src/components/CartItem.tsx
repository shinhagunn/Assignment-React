import { useState } from "react";
import CartProductImage from "../assets/images/cart_product.png";
import CloseIcon from "../assets/images/close.png";
import useCartStore from "../stores/cart";

function CartItem(props: any) {
  const cartStore = useCartStore()

  const formatCurrency = (number?: number) => {
    if (!number) return 0
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(number)
  }

  const [quantity, setQuantity] = useState(props.product.quantity)

  const changeQuantiy = async (type: string) => {
    if (type === 'plus') {
      setQuantity(quantity + 1)
      cartStore.Set(props.product.product_id, quantity + 1)
    } else {
      setQuantity(quantity - 1)
      cartStore.Set(props.product.product_id, quantity - 1)
    }
  }

  return (
    <div className="w-full flex p-4 rounded-lg shadow-md relative bg-white mb-4">
      <div className="w-4/12">
        <img src={CartProductImage} />
      </div>
      <div className="w-8/12">
        <p className="text-lg font-semibold">{props.product.name}</p>
        <div>
          <span className="text-red-500 font-semibold text-base mr-3">{formatCurrency(props.product.new_price)}</span>
          <span className="text-gray-400 mr-2">{formatCurrency(props.product.old_price)}</span>
          <span className="w-12 bg-red-400 rounded-lg py-[2px] px-1 text-white text-sm">Giảm 24%</span>
        </div>
        <div className="flex mt-2">
          <span className="mr-3">Chọn số lượng:</span>
          <div className="flex border-[1px] rounded">
            <button className="w-6 rounded bg-white" onClick={() => changeQuantiy('minus')}>-</button>
            <input className="w-16 border-t-1 border-b-1 text-center" value={quantity}/>
            <button className="w-6 rounded bg-white" onClick={() => changeQuantiy('plus')}>+</button>
          </div>
        </div>
      </div>
      <div className="absolute right-[12px] cursor-pointer">
        <img src={CloseIcon} />
      </div>
    </div>
  )
}

export default CartItem
