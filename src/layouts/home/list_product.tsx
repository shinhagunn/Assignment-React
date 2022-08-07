import ZProduct from "../../components/ZProduct"
import ZContainer from "../../components/ZContainer"
import { Product } from "../../types"

function ListProduct(props: any) {
  const data = () => {
    return props.products.slice(1, props.products.length || 5) as Product[]
  }

  return (
    <ZContainer className="list-product mb-8 bg-white p-4 rounded-lg w-full">
      <div className="w-full">
        <div className="list-product-title mb-4 text-xl font-semibold">
          TITLE NÈ
        </div>
        <div className="list-product-content flex flex-wrap mx-[-12px]">
          { data().map(product => (
            <ZProduct product={product}/>
          )) }
        </div>
      </div>
    </ZContainer>
  )
}

export default ListProduct