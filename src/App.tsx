import React from 'react'
import Layout from './components/layout/layout'
import ManagedDrawer from './components/drawer/managed-drawer'
import Modal from './components/modal/fcModal'
import Search from './components/search/search'
import MobileNavigation from "./components/layout/mobile-navigation/mobile-navigation"



const App:React.FC =  () => {
  
  
  return (
    <React.Fragment>
        <Layout />
        <MobileNavigation/>
        <Search />
        <ManagedDrawer />
        <Modal />
    </React.Fragment> 
  )
}

export default App
