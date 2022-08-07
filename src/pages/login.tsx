import LogoIcon from "../assets/images/logo.png";
import FBIcon from "../assets/images/fb.png";
import GGIcon from "../assets/images/gg.png";
import { useState } from "react";
import useUserStore from "../stores/user";
import { useNavigate } from "react-router-dom";

function Login() {
  const userStore = useUserStore()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [re_password, setRepassword] = useState('')

  

  const login = async () => {
    let error = ''

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) error = 'Email không đúng định dạng !'
    if (password.length < 6) error = 'Độ dài mật khẩu < 6'

    await userStore.Login(email, password, error)

    navigate('/')
  }

  return (
    <div className="py-4">
      <div className="bg-white w-[800px] mx-auto rounded-lg">
        <div className="flex h-full">
          <div className="w-8/12 p-[44px] flex flex-wrap flex-col justify-center">
            <div className="form-control w-full mb-4">
              <div className="text-lg font-semibold mb-2">Email</div>
              <div className="border-[1px] rounded h-[48px]">
                <input className="h-full w-full p-4 rounded" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
            <div className="form-control w-full mb-4">
              <div className="text-lg font-semibold mb-2">Mật khẩu</div>
              <div className="border-[1px] rounded h-[48px]">
                <input className="h-full w-full p-4 rounded" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
              </div>
            </div>
            <div className="form-control w-full mb-4">
              <div className="border-[1px] rounded h-[48px] flex items-center justify-center">
                <button className="w-full h-full bg-[#FF424E] text-white rounded text-base" onClick={login}>Đăng nhập</button>
              </div>
            </div>
            <div>
              <p className="text-center">Hoặc đăng nhập bằng</p>
              <div className="flex justify-center">
                <div>
                  <img src={FBIcon} className="w-[48px] h-[48px] mr-4 shadow-sm cursor-pointer"/>
                </div>
                <div>
                  <img src={GGIcon} className="w-[48px] h-[48px] shadow-sm cursor-pointer"/>
                </div>
              </div>
            </div>
          </div>
          <div className="w-4/12 flex items-center">
            <div>
              <img className="w-[185px]" src={LogoIcon}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
