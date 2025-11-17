import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Hamburger, Pizza, CupSoda } from "lucide-react"
import home1 from '../../assets/home1.jpg'
import home2 from '../../assets/home2.jpg'
import home3 from '../../assets/home3.jpg'
import home4 from '../../assets/home4.jpg'
import home5 from '../../assets/home5.jpg'


const heroImages = [
  home1,
  home2,
  home3,
  home4,
  home5
]


const Home = () => {
  const [heroIndex, setHeroIndex] = useState(0);

  const handlePrev = () => {
    setHeroIndex((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));
  }

  const handleNext = () => {
    setHeroIndex((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
  }

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, []);


  return (
    <div className="min-h-full w-full">

      {/* show image */}
      <div className="w-full overflow-hidden relative bg-gray-300 h-[500px] md:h-[500px] flex items-center justify-center">
        {heroImages.length > 0 ? (
          <img
            src={heroImages[heroIndex]}
            alt="food"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-lg font-semibold text-black">รูปอาหาร</span>
        )}

        {/* ปุ่มซ้าย */}
        <button
          onClick={handlePrev}
          className="absolute left-4 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 active:scale-95"
        >
          <ChevronLeft size={28} />
        </button>

        {/* ปุ่มขวา */}
        <button
          onClick={handleNext}
          className="absolute right-4 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 active:scale-95"
        >
          <ChevronRight size={28} />
        </button>
      </div>

      <div className="flex items-center justify-center">

        <div className="h-64 mt-8 w-full max-w-3xl">
          <div className="flex justify-between">
            <div>
              <button className="border w-48 h-48 p-4 border-gray-300 rounded-md shadow-md flex items-center justify-center hover:bg-gray-200">
                <div className="flex flex-col gap-4">
                  <Hamburger className="size-15" />
                  <span>Burger</span>
                </div>
              </button>
            </div>

            <div>
              <button className="border w-48 h-48 p-4 border-gray-300 rounded-md shadow-md flex items-center justify-center hover:bg-gray-200">
                <div className="flex flex-col gap-4">
                  <Pizza className="size-15" />
                  <span>Burger</span>
                </div>
              </button>
            </div>

            <div>
              <button className="border w-48 h-48 p-4 border-gray-300 rounded-md shadow-md flex items-center justify-center hover:bg-gray-200">
                <div className="flex flex-col gap-4">
                  <CupSoda className="size-15" />
                  <span>Burger</span>
                </div>
              </button>
            </div>

          </div>
        </div>

      </div>




    </div>
  )
}

export default Home