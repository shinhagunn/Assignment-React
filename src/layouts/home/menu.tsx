import ZContainer from "../../components/ZContainer"
import Banner from "../../assets/images/banner.png";
import Phone from "../../assets/images/phone.png";
import ArrowRight from "../../assets/images/arrow-right.png";

function Menu() {
  return (
    <ZContainer className="mb-8">
      <div className="w-3/12">
        <div className="flex items-center justify-between px-4 mb-3">
          <div className="flex text-base">
            <img src={Phone} />
            <span className="ml-4">Điện thoại</span>
          </div>
          <div>
            <img src={ArrowRight} />
          </div>
        </div>
        <div className="flex items-center justify-between px-4 mb-3">
          <div className="flex text-base">
            <img src={Phone} />
            <span className="ml-4">Điện thoại</span>
          </div>
          <div>
            <img src={ArrowRight} />
          </div>
        </div>
        <div className="flex items-center justify-between px-4 mb-3">
          <div className="flex text-base">
            <img src={Phone} />
            <span className="ml-4">Điện thoại</span>
          </div>
          <div>
            <img src={ArrowRight} />
          </div>
        </div>
        <div className="flex items-center justify-between px-4 mb-3">
          <div className="flex text-base">
            <img src={Phone} />
            <span className="ml-4">Điện thoại</span>
          </div>
          <div>
            <img src={ArrowRight} />
          </div>
        </div>
        <div className="flex items-center justify-between px-4 mb-3">
          <div className="flex text-base">
            <img src={Phone} />
            <span className="ml-4">Điện thoại</span>
          </div>
          <div>
            <img src={ArrowRight} />
          </div>
        </div>
        <div className="flex items-center justify-between px-4 mb-3">
          <div className="flex text-base">
            <img src={Phone} />
            <span className="ml-4">Điện thoại</span>
          </div>
          <div>
            <img src={ArrowRight} />
          </div>
        </div>
      </div>
      <div className="w-9/12">
        <img src={Banner} />
      </div>
    </ZContainer>
  )
}

export default Menu