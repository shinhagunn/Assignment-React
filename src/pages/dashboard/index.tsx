import '../../App.css'
import '../../../node_modules/antd/dist/antd.css'
import ZAdminLayout from '../../components/ZAdminLayout'
import ZAdminHeader from '../../components/ZAdminHeader'
import ZAdminMenu, { ZMenuItem } from '../../components/ZAdminMenu';
import ZAdminLayoutContent from '../../components/ZAdminLayoutContent';
import PhoneIcon from "../../assets/images/phone.png"
import LaptopIcon from "../../assets/images/laptop.svg"
import CategoryIcon from "../../assets/images/category.png"
import useAdminStore from '../../stores/admin';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../stores/user';

function Dashboard() {
  const navigation = useNavigate()
  const userStore = useUserStore()

  const menuItems: ZMenuItem[] = [
    { title: "Sản phẩm", url: "/dashboard/products", icon: PhoneIcon },
    { title: "Danh mục", url: "/dashboard/categories", icon: CategoryIcon },
  ]

  useEffect(() => {
    if (!userStore.email) navigation('/')
  }, [])

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

export default Dashboard
