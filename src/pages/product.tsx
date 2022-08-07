import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import CartIcon from "../assets/images/cart_icon.png"
import ProductImage from "../assets/images/product.png";
import ListProduct from "../layouts/home/list_product";
import usePublicStore from "../stores/public";
import AddToast from '../library/Toast';
import useCartStore from "../stores/cart";
import ZProduct from "../components/ZProduct";
import ZContainer from "../components/ZContainer";

function ProductPage() {
  const publicStore = usePublicStore()
  const cartStore = useCartStore()

  const addCart = async () => {
    try {
      if (publicStore.product.id) {
        await cartStore.Add(publicStore.product.id, publicStore.product.name, publicStore.product.old_price, publicStore.product.new_price)
      }
      AddToast('Success', 'Thêm sản phẩm vào giỏ hàng thành công!', 'toast');
    } catch (error) {
      AddToast('Error', 'Thêm sản phẩm vào giỏ hàng không thành công!', 'toast');
      return error;
    }
  }

  const { id } = useParams()

  const formatCurrency = (number?: number) => {
    if (!number) return 0
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(number)
  }

  const products = () => {
    return publicStore.products.filter(product => product.categoryId === publicStore.product.categoryId).slice(1,5)
  }
  
  useEffect(() => {
    publicStore.fetchProduct(id)
    publicStore.fetchCategories()
    publicStore.fetchProducts("")
  }, [id])

  return (
    <div className="w-[1200px] mx-auto bg-white p-2">
      <div className="product-name text-xl font-semibold border-b-2 pb-2 mb-4 mx-[-8px] px-4">
        { publicStore.product.name }
      </div>
      <div className="flex mb-8">
        <div className="w-4/12">
          <img className="w-full" src={publicStore.product.image} />
        </div>
        <div className="w-8/12">
          <div className="mb-4">
            <span className="text-red-500 font-semibold text-lg mr-3">{ formatCurrency(publicStore.product.new_price) }</span>
            <span className="text-gray-400 text-base mr-2">{ formatCurrency(publicStore.product.old_price) }</span>
          </div>
          <div>
            Mô tả ngắn: { publicStore.product.short_description }
          </div>
        </div>
      </div>
      <div className="flex mb-4">
        <div className="w-4/12 flex mx-2 justify-between">
          <div className="w-2/12 px-1 ">
            <img className="w-auto h-12 p-2 block border-[1px] border-solid rounded-lg" src={ProductImage} />
          </div>
          <div className="w-2/12 px-1">
            <img className="w-auto h-12 p-2 block border-[1px] border-solid rounded-lg" src={ProductImage} />
          </div>
          <div className="w-2/12 px-1">
            <img className="w-auto h-12 p-2 block border-[1px] border-solid rounded-lg" src={ProductImage} />
          </div>
          <div className="w-2/12 px-1">
            <img className="w-auto h-12 p-2 block border-[1px] border-solid rounded-lg" src={ProductImage} />
          </div>
          <div className="w-2/12 px-1">
            <img className="w-auto h-12 p-2 block border-[1px] border-solid rounded-lg" src={ProductImage} />
          </div>
          <div className="w-2/12 px-1">
            <img className="w-auto h-12 p-2 block border-[1px] border-solid rounded-lg" src={ProductImage} />
          </div>
        </div>
        <div className="w-8/12 flex">
          <button className="w-[240px] h-12 bg-[#FF3945] text-white rounded-lg text-base mr-4" onClick={addCart}>Mua ngay</button>
          <div className="flex">
            <div className="flex justify-center items-center h-12 w-12 border-[#FF3945] border-[1px] rounded-lg mr-4 cursor-pointer" onClick={addCart}>
              <img src={CartIcon} />
            </div>
            <span className="w-16 cursor-pointer hover:underline" onClick={addCart}>Thêm vào giỏ hàng</span>
          </div>
        </div>
      </div>
      <ZContainer className="list-product mb-8 bg-white p-4 rounded-lg w-full">
        <div className="w-full">
          <div className="list-product-title mb-4 text-xl font-semibold">
            Sản phẩm liên quan
          </div>
          <div className="list-product-content flex flex-wrap mx-[-12px]">
            { products().map(product => (
              <ZProduct product={product} key={product.id} />
            )) }
          </div>
        </div>
      </ZContainer>
      
      <div className="mt-4 bg-gray-200 mx-[-8px] mb-[-8px] p-4">
        <p className="font-semibold text-center text-base text-[#FF3945]">ĐẶC ĐIỂM NỔI BẬT</p>
        { publicStore.product.feature }
      </div>
    </div>
  )
}

export default ProductPage
