import { Outlet } from "react-router-dom";

const ZAdminLayoutContent = (props: React.PropsWithChildren) => {
  return (
    <div className="z-admin-layout-content p-4 flex-1">
      <Outlet />
    </div>
  )
}

export default ZAdminLayoutContent;
