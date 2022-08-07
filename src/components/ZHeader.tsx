import ZContainer from "./ZContainer";
import logo from "../assets/images/logo.png";
import CartIcon from "../assets/images/cart.png";
import { NavLink, useNavigate } from "react-router-dom";
import usePublicStore from "../stores/public";
import { Select } from "antd"
import useUserStore from "../stores/user";

const ZHeader = () => {
  const publicStore = usePublicStore()
  const userStore = useUserStore()
  let navigate = useNavigate()
  const { Option } = Select

  const onChange = (value: any) => {
    navigate(`/product/${value}`)
  }

  const logout = async () => {
    await userStore.Logout()
  }
  
  return (
    <div className="z-header bg-[#D70018] h-[64px]">
      <ZContainer className="px-4 justify-between items-center h-full">
        <div className="flex items-center">
          <div className="z-header-logo h-[52px]">
            <NavLink to="/" >
              <img src={logo} className="h-full" />
            </NavLink>
          </div>
        </div>
        <div className="h-[34px] flex items-center relative w-[400px]">
          <Select
            showSearch
            optionFilterProp="children"
            onChange={onChange}
            filterOption={(input, option) =>
              (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
            }
            className="w-full rounded-lg"
          >
            { publicStore.products.map(product => (
              <Option key={product.id} value={product.id}>{product.name}</Option>
            ))
            }
          </Select>
        </div>
        <div className="text-white flex items-center">
          <NavLink to="/cart" className="flex items-center mr-4 block !text-white"> 
            <div className="mr-2">
              <img src={CartIcon} />
            </div>
            <div>
              <div>Giỏ</div>
              <div>hàng</div>
            </div>
          </NavLink>
          { userStore.email ? (
            <div>
              <span className="mr-2">Xin chào { userStore.email }</span>
              <NavLink to="/dashboard" className="text-white mr-2">Admin</NavLink>
              <button onClick={logout}>Đăng xuất</button>
            </div>
          ) : (
            <div className="flex">
              <NavLink to="/login" className="flex items-center mr-4 block !text-white">Đăng nhập</NavLink>
              <NavLink to="/register" className="flex items-center mr-4 block !text-white">Đăng ký</NavLink>
            </div>
          )}
        </div>
      </ZContainer>
    </div>
  )
}

export default ZHeader;
