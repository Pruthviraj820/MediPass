import { useState } from 'react'
import { Camera, CheckCircle2, XCircle, User } from 'lucide-react'
import { mockPatients } from '../../data/mockData'

const DoctorQRScanner = () => {
  const [isScanning, setIsScanning] = useState(true)
  const [scannedPatient, setScannedPatient] = useState(null)

  const handleScanSuccess = () => {
    setScannedPatient(mockPatients[0])
    setIsScanning(false)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="card p-12 text-center">
        {isScanning ? (
          <>
            <div className="w-40 h-40 bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-2xl animate-pulse">
              <Camera className="w-20 h-20 text-white drop-shadow-lg" />
            </div>
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">Position QR Code</h2>
            <p className="text-xl text-neutral-600 mb-12">Hold patient's QR code in front of camera</p>
            
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2 mb-8">
                <div className="w-32 h-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse" />
                <span className="text-green-600 font-semibold">Scanning...</span>
                <div className="w-32 h-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse" />
              </div>
              
              <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-3xl font-bold text-xl shadow-2xl hover:shadow-3xl cursor-pointer transition-all" onClick={handleScanSuccess}>
                <CheckCircle2 className="w-6 h-6 mr-2" />
                Found Patient ✓
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="w-32 h-32 bg-gradient-to-r from-success-500 to-emerald-600 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-2xl">
              <CheckCircle2 className="w-20 h-20 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">Patient Identified</h2>
            <div className="w-full h-px bg-gradient-to-r from-success-500 to-emerald-600 mx-auto mb-12" />
            
            <div className="flex items-center justify-center space-x-6 p-8 bg-success-50 rounded-3xl">
              <div className="w-20 h-20 bg-success-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl">
                {scannedPatient.name[0]}
              </div>
              <div className="text-left">
                <h3 className="text-2xl font-bold text-success-800">{scannedPatient.name}</h3>
                <p className="text-success-700">{scannedPatient.bloodGroup} | {scannedPatient.phone}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <button className="btn-primary px-12 py-4 text-xl flex items-center space-x-3">
                <User className="w-6 h-6" />
                <span>View Profile</span>
              </button>
              <button 
                onClick={() => setIsScanning(true)}
                className="px-12 py-4 border-2 border-neutral-200 rounded-2xl font-semibold text-xl hover:bg-gray-50 transition-all flex items-center space-x-3"
              >
                <Camera className="w-6 h-6" />
                <span>Scan Again</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default DoctorQRScanner
