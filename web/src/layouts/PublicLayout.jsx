import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from '../components/common/Footer'

const PublicLayout = () => {
  const location = useLocation()
  const isAuthPage = location.pathname === '/auth'

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className={`pt-24 flex-1 ${!isAuthPage ? '' : ''}`}>
        <Outlet />
      </main>
      {!isAuthPage && <Footer />}
    </div>
  )
}

export default PublicLayout
