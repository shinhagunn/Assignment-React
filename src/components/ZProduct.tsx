import { NavLink } from "react-router-dom";
import Star from "../assets/images/star.png";

function ZProduct(props: any) {
  const formatCurrency = (number?: number) => {
    if (!number) return 0
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(number)
  }

  return (
    <NavLink to={`/product/${props.product.id}`} className="product block w-2/12 px-3 mb-4 text-black">
      <div className="product-image flex justify-center h-[160px]">
        { props.product.image ? (
          <img src={props.product.image} />
        ) : (
          <div className="w-[160px] h-[160px] bg-red-200"/>
        )}
      </div>
      <div className="product-name mt-2">
        {props.product.name}
      </div>
      <div className="product-price flex justify-between items-end">
        <span className="text-red-500 font-semibold text-base">{formatCurrency(props.product.new_price)}</span>
        <span className="text-gray-400">{formatCurrency(props.product.old_price)}</span>
      </div>
      <div className="product-description bg-[#E5E7EB] py-1 px-2 mb-1">
        Thu cũ lên đời - Trợ giá 1 triệu
      </div>
      <div className="product-rate flex items-center">
          <img src={Star} className="h-[12px]"/>
          <img src={Star} className="h-[12px]"/>
          <img src={Star} className="h-[12px]"/>
          <img src={Star} className="h-[12px]"/>
          <img src={Star} className="h-[12px]"/>
          <span className="ml-2">72 đánh giá</span>
      </div>
    </NavLink>
  )
}

export default ZProduct