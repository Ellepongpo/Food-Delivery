import { Outlet } from 'react-router-dom'
import MainNav from '../navbar/MainNav'

const LayOut = () => {
  return (
    <div>
        <MainNav />

        <main>
          <Outlet />
        </main>
        
    </div>
  )
}

export default LayOut
