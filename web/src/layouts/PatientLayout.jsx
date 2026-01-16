import { Outlet } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import Sidebar from '../components/common/Sidebar'
import Footer from '../components/common/Footer'

const PatientLayout = () => (
  <div className="min-h-screen flex bg-gray-50 flex-col">
    <div className="flex flex-1">
      <Sidebar role="patient" />
      <div className="flex-1 flex flex-col">
        <Navbar showPatientNav />
        <main className="p-8 flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  </div>
)

export default PatientLayout
