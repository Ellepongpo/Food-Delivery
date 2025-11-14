import { useLocation } from "react-router-dom"

const DetailProduct = () => {
    const { state } = useLocation()
    const detailProduct = state?.item

    console.log(detailProduct)
  return (
    <div>
        {detailProduct.product_name}
    </div>
  )
}

export default DetailProduct