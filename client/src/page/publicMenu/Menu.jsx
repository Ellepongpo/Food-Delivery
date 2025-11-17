import { useState } from "react"
import ShowProduct from "./ShowProduct"
import { useEffect } from "react"
import axios from "axios"
import Cart from "../publicCart/Cart"

const Menu = () => {
  const [listProduct, setListProduct] = useState([])
  const [listCategory, setListCategory] = useState([])
  const [selectCategory, setSelectCategory] = useState("All")

  useEffect(() => {
    hdlCategory()
  }, [])

  useEffect(() => {
    hdlSearchPorductByCategory(selectCategory)
  }, [selectCategory])


  const hdlCategory = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/category')
      //console.log(res.data)
      setListCategory(res.data.category)
    } catch (err) {
      console.log(err)
    }
  }

  const hdlOnChange = (e) => {
    //console.log("select category : ", e.target.value)
    setSelectCategory(e.target.value)
  }

  const hdlSearchPorductByCategory = async (selectCategory) => {
    try {
      const res = await axios.get(`http://localhost:3000/api/product/${selectCategory}`)
      console.log(res.data.product)
      setListProduct(res.data.product)

    } catch (err) {
      console.log(err)
    }

  }

  // const goto = (item) => {
  //   if (customer) {
  //     navigate(`/customer/detailProduct/${item.product_id}` , {state : {item}})
  //   } else {
  //     navigate(`/detailProduct/${item.product_id}` , {state : {item}})
  //   }
  // }



  return (
    <div className="flex justify-between">

      <div className="w-full p-4 h-screen overflow-y-auto">

        {/* search product by category */}
        <div className="bg-white w-full h-24">
          {/* <p className="text-center font-bold text-2xl">หมวดหมู่</p> */}

          <div className="flex flex-row gap-4 items-center justify-center py-8">
            <div>
              <input type="radio" name="category" value="All" onChange={hdlOnChange} /> All
            </div>

            {
              listCategory.map((item) => (
                <>
                  {item.status === "IsActive" && (
                    <div key={item.category_id}>
                      <input type="radio" name="category" value={item.category_id} onChange={hdlOnChange} /> {item.category_name}
                    </div>
                  )}
                </>
              ))
            }
          </div>
        </div>


        <hr className="border-gray-200 mb-8" />

        {/* show product */}
        <p className="text-2xl font-bold mt-6 mb-4 text-center">สินค้าทั้งหมด</p>

        <div className="flex flex-wrap gap-10 justify-center">
          {
            listProduct.map((item) => (
              // <div key={item.product_id} onClick={()=> goto(item)}>
              <ShowProduct item={item} key={item.product_id} />
              // </div>
            ))}
        </div>

      </div>


      {/* show cart */}
      <div className="bg-gray-300 w-xl p-4 h-screen overflow-y-auto">
        <Cart />
      </div>


    </div>
  )
}

export default Menu