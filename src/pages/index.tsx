import { useEffect } from "react";
import ZFooter from "../components/ZFooter"
import ZHeader from "../components/ZHeader"
import ZLayout from "../components/ZLayout"
import ZLayoutContent from "../components/ZLayoutContent"

function Home() {

  return (
    <ZLayout>
      <ZHeader />
      <ZLayoutContent />
      <ZFooter />
    </ZLayout>
  )
}

export default Home
