import './App.css'
import '../node_modules/antd/dist/antd.css'
import ZAdminLayout from './components/ZAdminLayout'
import ZAdminHeader from './components/ZAdminHeader'
import ZAdminMenu, { ZMenuItem } from './components/ZAdminMenu';
import ZAdminLayoutContent from './components/ZAdminLayoutContent';
import PhoneIcon from "./assets/images/phone.svg"
import TabletIcon from "./assets/images/tablet.svg"
import LaptopIcon from "./assets/images/laptop.svg"

function App() {
  const menuItems: ZMenuItem[] = [
    { title: "Điện thoại", url: "/products", icon: PhoneIcon },
    { title: "Laptop", url: "/products", icon: LaptopIcon },
    { title: "Máy tính bảng", url: "/products", icon: TabletIcon },
  ]

  return (
    <ZAdminLayout>
      <ZAdminHeader />
      <div className="flex bg-gray-100 flex-auto min-height-0">
        <ZAdminMenu items={menuItems} />
        <ZAdminLayoutContent />
      </div>
    </ZAdminLayout>
  )
}

export default App
