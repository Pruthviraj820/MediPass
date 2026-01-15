import { Outlet } from 'react-router-dom'
import Navbar from '../components/common/Navbar'

const PublicLayout = () => (
  <div className="min-h-screen">
    <Navbar />
    <main className="pt-24">
      <Outlet />
    </main>
  </div>
)

export default PublicLayout
