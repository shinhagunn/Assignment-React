import { Link, NavLink } from "react-router-dom";

export interface ZMenuItem {
  title: string;
  url: string;
  icon: any;
}

const ZAdminMenu = (props: { items: ZMenuItem[] }) => {
  return (
    <div className="z-admin-menu w-[300px] bg-white pl-[20px] pt-2 min-h-0">
      {props.items.map((item, index) => {
        return (
          <NavLink className={({ isActive }) => (`z-admin-menu-item flex items-center rounded-md w-[180px] h-10 leading-10 mt-[24px] px-2 ${isActive ? `bg-cyan-500 text-white hover:text-white` : `text-gray-500`}`)} to={item.url} key={index}>
            <img src={item.icon} className="h-[24px] mr-2" /> {item.title}
          </NavLink>
      )})}
    </div>
  )
}

export default ZAdminMenu;
