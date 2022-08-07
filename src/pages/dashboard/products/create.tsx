import { Input, Select } from "antd";
import { Button } from "antd/lib/radio";
import { useEffect, useState } from "react";
import { Router, useNavigate } from "react-router-dom";
import PlusIcon from "../../../assets/images/plus.png"
import Error from "../../../components/Error";
import useAdminStore from "../../../stores/admin";
import { Category, Product } from "../../../types";

const CreateProduct = () => {
  const adminStore = useAdminStore()
  const navigation = useNavigate()

  useEffect(() => {
    adminStore.fetchCategories();
  }, []);

  const [name, setName] = useState("");
  const [old_price, setOldPrice] = useState("");
  const [new_price, setNewPrice] = useState("");
  const [short_description, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [feature, setFeature] = useState("");
  const [image, setImage] = useState("");
  const [category_id, setCategoryID] = useState(1);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImage(reader.result as string);
      };
    }
  };

  const { Option } = Select;
  const onChangeCategory = (value: string) => {
    setCategoryID(Number(value))
  }

  const onCreateProduct = async () => {
    if (disabled_button()) return

    const product: Product = {
      name,
      old_price: Number(old_price),
      new_price: Number(new_price),
      short_description,
      description,
      feature,
      image,
      categoryId: category_id,
      status: true,
    }
      
    await adminStore.createProduct(product)
    adminStore.products.push(product)
    navigation('/dashboard/products')
  }

  const error_old_price = () => {
    if (/\D/g.test(old_price)) return "Không đúng định dạng giá cả"
    return ""
  }

  const error_new_price = () => {
    if (/\D/g.test(new_price)) return "Không đúng định dạng giá cả"
    return ""
  }

  const disabled_button = () => {
    if (name.length === 0) return true
    if (old_price.length === 0 || error_old_price()) return true
    if (new_price.length === 0 || error_new_price()) return true
    if (image.length === 0) return true
    if (feature.length === 0) return true
  
    return false
  }

  return (
    <div>
      <div className="text-2xl font-semibold mb-12">
        Thêm mới sản phẩm
      </div>
      <div className="flex mx-[-16px]">
        <div className="w-5/12 px-4">
          <div className="border-4 border-dashed mb-4">
            <label id="imagePre" htmlFor="upFile" className="block min-h-[256px] relative">
              {image ? (
                <img id="preview" src={image} className="w-full h-auto"/>
              ) : (
                <div className="overlay">
                  <img className="mb-8 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-100%]" src={PlusIcon} />
                  <div className="mt-8 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-xl font-semibold">
                    Thêm ảnh
                  </div>
                </div>
              )}
            </label>
            <div>
              <input id="upFile" className="hidden" type="file" onChange={(e) => onFileChange(e)} />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-base">Mô tả ngắn</label>
            <textarea value={short_description} onChange={(e) => setShortDescription(e.target.value)} className="w-full p-2 border-[1px] border-transparent focus:outline-none focus:border-[1px] focus:border-cyan-500 rounded-sm h-32">
            </textarea>
          </div>
        </div>
        <div className="w-7/12 px-4">
          <div className="text-xl border-b-2 pb-4 mb-4">
            Thông tin sản phẩm
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-base">Tên sản phẩm</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="flex mx-[-16px]">
            <div className="mb-4 w-6/12 px-4">
              <label className="block mb-2 text-base">Giá gốc</label>
              <Input status={error_old_price() ? "error" : ""} value={old_price} onChange={(e) => setOldPrice(e.target.value)} />
              <Error value={error_old_price()} />
            </div>
            <div className="mb-4 w-6/12 px-4">
              <label className="block mb-2 text-base">Giá khuyến mãi</label>
              <Input status={error_new_price() ? "error" : ""} value={new_price} onChange={(e) => setNewPrice(e.target.value)} />
              <Error value={error_new_price()} />
            </div>
          </div>
          <div className="mb-6 w-6/12 pr-4">
            <label className="block mb-2 text-base">Danh mục</label>
            <Select defaultValue="Laptop" className="w-full" onChange={onChangeCategory}>
              {adminStore.categories.map((category: Category) => (
                <Option value={`${category.id}`} key={category.id}>{category.name}</Option>
              ))}
            </Select>
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-base">Đặc điểm nổi bật</label>
            <textarea value={feature} onChange={(e) => setFeature(e.target.value)} className="w-full p-2 border-[1px] border-transparent focus:outline-none focus:border-[1px] focus:border-cyan-500 rounded-sm h-32">
            </textarea>
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-base">Mô tả dài</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border-[1px] border-transparent focus:outline-none focus:border-[1px] focus:border-cyan-500 rounded-sm h-32">
            </textarea>
          </div>
          <div className="mb-6">
            <button
              disabled={disabled_button()}
              className={`px-4 py-2 rounded text-white ${disabled_button() ? 'cursor-not-allowed bg-gray-300' : 'cursor-pointer bg-[#00B0D7] hover:bg-cyan-600'}`}
              onClick={onCreateProduct}
            >
              Thêm mới
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateProduct;
