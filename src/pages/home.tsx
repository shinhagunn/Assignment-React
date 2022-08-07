import { Select } from "antd";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ZContainer from "../components/ZContainer";
import ZProduct from "../components/ZProduct";
import ListProduct from "../layouts/home/list_product";
import Menu from "../layouts/home/menu";
import usePublicStore from "../stores/public";
import { Category } from "../types";

function HomePage() {
  const publicStore = usePublicStore()
  const products = useRef(usePublicStore.getState().products);
  let [searchParams, setSearchParams] = useSearchParams();

  const [currentKey, setCurrentKey] = useState(Math.random())

  const { Option } = Select  

  useEffect(() => {
    usePublicStore.subscribe((state) => {
      products.current = state.products
      setCurrentKey(Math.random())
    })
    if (searchParams.get('categoryId')) {
      publicStore.fetchProducts(`categoryId=${searchParams.get('categoryId')}`);
    } else {
      publicStore.fetchProducts('');
    }
    publicStore.fetchCategories();
  }, []);

  useEffect(() => {
    if (searchParams.get('categoryId')) {
      publicStore.fetchProducts(`categoryId=${searchParams.get('categoryId')}`);
    } else {
      publicStore.fetchProducts('');
    }
  }, [searchParams])

  const onChangeCategory = (value: string) => {
    setSearchParams({
      categoryId: value.toLowerCase()
    })
  }

  const onClearQuery = () => {
    setSearchParams({})
  }

  return (
    <div className="home">
      <Menu />
      <ZContainer>
        <div className="flex items-center mb-6">
          <span className="font-semibold text-base">Bộ lọc:</span>
          <div className="ml-8 w-64">
            <Select defaultValue="Laptop" className="w-full" onChange={onChangeCategory}>
              {publicStore.categories.map((category: Category) => (
                <Option value={`${category.id}`} key={category.id}>{category.name}</Option>
              ))}
            </Select>
          </div>
          <div className="ml-8 text-base hover:text-cyan-500 cursor-pointer" onClick={onClearQuery}>
            Clear
          </div>
        </div>
      </ZContainer>
      <ZContainer>
        <ZContainer className="list-product mb-8 bg-white p-4 rounded-lg w-full">
          <div className="w-full">
            <div className="list-product-title mb-4 text-xl font-semibold">
              Sản phẩm
            </div>
            <div className="list-product-content flex flex-wrap mx-[-12px]">
              { publicStore.products.map(product => (
                <ZProduct product={product} key={product.id} />
              )) }
            </div>
          </div>
        </ZContainer>
      </ZContainer>
    </div>
  )
}

export default HomePage