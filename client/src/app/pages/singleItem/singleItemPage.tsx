import { FC } from "react"
import NavBar from "../../components/navBar/navBarComponent"
import { useParams } from "react-router-dom"

const SingleItemPage:FC  = () => {
    const { productID }: any = useParams()
    {/* useEffect to fetch the specific product details based on the productID  */}
 return <>
 <NavBar />
 <p>ok{productID}</p>
 
 </>   
}

export default SingleItemPage