import React from 'react'
import { Outlet } from 'react-router-dom'
import CtmNav from '../navbar/customer/CtmNav'


const LayOutCTM = () => {
  return (
    <div>
        <CtmNav />
        
        <main>
          <Outlet />
        </main>
        
    </div>
  )
}

export default LayOutCTM