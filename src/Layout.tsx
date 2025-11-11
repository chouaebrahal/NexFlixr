
import Header from './components/elements/Header'
import Footer from './components/elements/Footer'
import type {  ReactNode } from 'react'
import { useModalStore } from './store/useModalStore'
import DetailModal from './components/shared/DetailModal'
import AlertComponent from './components/shared/AlertComponent'
import SearchModal from './components/shared/SearchModal'

const Layout = ({children}: {children:ReactNode}) => {
  const {modalOpen} = useModalStore()
  const alert = useModalStore(state => state.alert)
  const searchModal = useModalStore(state => state.searchModal)
  return (
    <>
        {modalOpen && <DetailModal/>}
        {alert && <AlertComponent/>}
        {searchModal && <SearchModal/>}
        <Header />
        
          {children}
        <Footer />
    </>
  )
}

export default Layout