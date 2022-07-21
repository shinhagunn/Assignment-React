import { Select, Switch, Table } from "antd";
import useAdminStore from "../../../stores/admin";
import EditIcon from "../../../assets/images/edit.png"
import { Category, Product } from "../../../types";
import { NavLink, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import PlusIcon from "../../../assets/images/plus.png"
import RabishIcon from "../../../assets/images/rabish.png"
import { useEffect, useRef, useState } from "react";

const Products = () => {
  const adminStore = useAdminStore()
  const products = useRef(useAdminStore.getState().products);
  let [searchParams, setSearchParams] = useSearchParams();

  const [currentKey, setCurrentKey] = useState(Math.random())

  const onChangeStatus = (product: Product) => {
    product.status = !product.status
    adminStore.updateProduct(product)
  }

  const deleteProduct = (id: number | undefined) => {
    adminStore.deleteProduct(`${id}`)
  }
  
  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Thành tiền",
      dataIndex: "old_price",
      key: "old_price",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Ẩn/hiện",
      dataIndex: "show",
      key: "show",
      render: (_, record: Product) => {
        return <Switch checked={record.status}  onChange={() => onChangeStatus(record)} />
      }
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      key: "action",
      render: (_, record: Product) => {
        return <div className="flex">
            <NavLink to={`/dashboard/products/update/${record.id}`}>
              <img src={EditIcon} alt="edit" />
            </NavLink>
            <button className="ml-4">
              <img src={RabishIcon} alt="edit" onClick={() => deleteProduct(record.id)}/>
            </button>
          </div>
      }
    },
  ]

  const { Option } = Select;
  const onChangeCategory = (value: string) => {
    setSearchParams({
      categoryId: value.toLowerCase()
    })
  }

  useEffect(() => {
    useAdminStore.subscribe((state) => {
      products.current = state.products
      setCurrentKey(Math.random())
    })
    if (searchParams.get('categoryId')) {
      adminStore.fetchProducts(`categoryId=${searchParams.get('categoryId')}`);
    } else {
      adminStore.fetchProducts('');
    }
    adminStore.fetchCategories();
  }, []);

  useEffect(() => {
    if (searchParams.get('categoryId')) {
      adminStore.fetchProducts(`categoryId=${searchParams.get('categoryId')}`);
    } else {
      adminStore.fetchProducts('');
    }
  }, [searchParams])

  const onClearQuery = () => {
    setSearchParams({})
  }

  return (
    <div>
      <div className="flex justify-between">
        <div className="text-2xl font-semibold mb-12">
          Sản phẩm
        </div>
        <div>
          <NavLink to="/dashboard/products/create">
            <img className="w-12" src={PlusIcon} alt="icon" />
          </NavLink>
        </div>
      </div>
      <div className="flex items-center mb-6">
        <span className="font-semibold text-base">Bộ lọc:</span>
        <div className="ml-8 w-64">
          <p className="text-base">Danh mục sản phẩm</p>
          <Select defaultValue="Laptop" className="w-full" onChange={onChangeCategory}>
            {adminStore.categories.map((category: Category) => (
              <Option value={`${category.id}`} key={category.id}>{category.name}</Option>
            ))}
          </Select>
        </div>
        <div className="ml-8 text-base hover:text-cyan-500 cursor-pointer" onClick={onClearQuery}>
          Clear
        </div>
      </div>
      <Table columns={columns} dataSource={products.current} key={Math.random()} />
    </div>
  )
}

export default Products;
