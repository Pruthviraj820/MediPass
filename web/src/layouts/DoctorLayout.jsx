import { Outlet } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import Sidebar from '../components/common/Sidebar'
import Footer from '../components/common/Footer'

const DoctorLayout = () => (
  <div className="min-h-screen flex bg-gray-50 flex-col">
    <div className="flex flex-1">
      <Sidebar role="doctor" />
      <div className="flex-1 flex flex-col">
        <Navbar showDoctorNav />
        <main className="p-8 flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  </div>
)

export default DoctorLayout
