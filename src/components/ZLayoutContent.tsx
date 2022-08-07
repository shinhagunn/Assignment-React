import { Outlet } from "react-router-dom";

const ZLayoutContent = (props: React.PropsWithChildren) => {
  return (
    <div className="z-layout-content p-4 bg-gray-100">
      <Outlet />
    </div>
  )
}

export default ZLayoutContent;
