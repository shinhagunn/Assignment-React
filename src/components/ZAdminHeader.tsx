import ZContainer from "./ZContainer";
import logo from "../assets/images/logo.png";
import SearchIcon from "../assets/images/search_icon.svg";
import { NavLink } from "react-router-dom";

const ZAdminHeader = () => {
  return (
    <div className="z-admin-header bg-cyan-500 h-[64px]">
      <ZContainer className="px-4 justify-between items-center h-full">
        <div className="flex items-center">
          <NavLink to="/" className="z-admin-header-logo block h-[52px]">
            <img src={logo} className="h-full" />
          </NavLink>
          <div className="z-admin-header-tite text-white text-lg ml-2">
            Dashboard
          </div>
        </div>
        <div className="h-[34px] flex items-center relative w-[400px]">
          <img src={SearchIcon} className="absolute left-2" />
          <input type="text" className="h-full w-full rounded-lg px-8" />
        </div>
        <div>
          <div className="z-admin-header-user-info text-xl text-white">
            Xin chào Nguyễn Văn Hoàng
          </div>
        </div>
      </ZContainer>
    </div>
  )
}

export default ZAdminHeader;
