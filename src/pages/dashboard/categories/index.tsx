import { Button, Input, Select, Switch, Table } from "antd";
import useAdminStore from "../../../stores/admin";
import EditIcon from "../../../assets/images/edit.png"
import { Category, Product } from "../../../types";
import { NavLink, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import PlusIcon from "../../../assets/images/plus.png"
import RabishIcon from "../../../assets/images/rabish.png"
import { useEffect, useRef, useState } from "react";

const Categories = () => {
  const adminStore = useAdminStore()
  const categories = useRef(useAdminStore.getState().categories);

  const [currentKey, setCurrentKey] = useState(Math.random())
  const [name, setName] = useState("")

  const deleteCategory = (id: number | undefined) => {
    adminStore.deleteCategory(`${id}`)
  }
  
  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Têm danh mục",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      key: "action",
      render: (_, record: Product) => {
        return <div className="flex">
            <button className="ml-4">
              <img src={RabishIcon} alt="edit" onClick={() => deleteCategory(record.id)}/>
            </button>
          </div>
      }
    },
  ]

  useEffect(() => {
    useAdminStore.subscribe((state) => {
      categories.current = state.categories
      setCurrentKey(Math.random())
    })
    adminStore.fetchCategories();
  }, []);

  const disabled_button = () => {
    if (name.length === 0) return true
  
    return false
  }

  const onCreateCategory = async () => {
    if (disabled_button()) return
    
    const id = adminStore.categories[adminStore.categories.length - 1].id

    if (id) {
      const category: Category = {
        id: id + 1,
        name,
      }
        
      await adminStore.createCategory(category)
      adminStore.categories.push(category)
    }
  }

  return (
    <div>
      <div className="flex justify-between">
        <div className="text-2xl font-semibold mb-12">
          Danh mục
        </div>
        <div>
          <NavLink to="/dashboard/products/create">
            <img className="w-12" src={PlusIcon} alt="icon" />
          </NavLink>
        </div>
      </div>
      <div className="mb-8">
        <div className="text-xl font-semibold mb-2">
          Thêm mới danh mục
        </div>
        <div className="flex">
          <Input value={name} onChange={(e) => setName(e.target.value)} />
          <button
              disabled={disabled_button()}
              className={`w-24 h-10 ml-4 rounded text-white ${disabled_button() ? 'cursor-not-allowed bg-gray-300' : 'cursor-pointer bg-[#00B0D7] hover:bg-cyan-600'}`}
              onClick={onCreateCategory}
            >
            Thêm mới
          </button>
        </div>
      </div>
      <Table columns={columns} dataSource={categories.current} key={Math.random()} />
    </div>
  )
}

export default Categories;
