import QRCode from 'react-qr-code'  // ✅ Works perfectly with Vite
import { Download, Copy, Share2, Shield } from 'lucide-react'
import { mockPatients } from '../../data/mockData'

const PatientQR = ({ patientId }) => {
  const patient = mockPatients.find(p => p.id === patientId)
  const qrValue = patient?.qrCode || 'PATIENT_DEFAULT_QR'

  const downloadQR = () => {
    // Create temporary canvas for download
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const qrElement = document.getElementById('qr-code')
    
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)
      const pngUrl = canvas.toDataURL("image/png")
      const downloadLink = document.createElement("a")
      downloadLink.href = pngUrl
      downloadLink.download = "medipass-qr.png"
      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)
    }
    img.src = qrElement.querySelector('svg').outerHTML.replace(/<svg/, '<svg xmlns="http://www.w3.org/2000/svg"')
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="card p-8 text-center">
        <div className="w-24 h-24 bg-white rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-2xl p-4">
          <QRCode
            id="qr-code"
            value={qrValue}
            size={140}
            bgColor="#ffffff"
            fgColor="#1e40af"
            level="H"
          />
        </div>
        
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">Your MediPass QR</h2>
        <p className="text-neutral-600 mb-8">Show this QR code to healthcare providers</p>

        <div className="flex items-center justify-center space-x-3 p-4 bg-gray-50 rounded-xl mb-8">
          <span className="font-mono font-semibold text-primary-600 bg-primary-100 px-3 py-1 rounded-lg">
            {qrValue}
          </span>
          <button className="p-2 hover:bg-gray--200 rounded-xl transition-all">
            <Copy className="w-5 h-5 text-neutral-600" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={downloadQR}
            className="btn-primary flex items-center justify-center space-x-2"
          >
            <Download className="w-5 h-5" />
            <span>Download</span>
          </button>
          <button className="btn-secondary flex items-center justify-center space-x-2">
            <Share2 className="w-5 h-5" />
            <span>Share</span>
          </button>
        </div>

        <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-2xl border border-blue-100">
          <p className="text-sm text-neutral-700 flex items-center justify-center space-x-2">
            <Shield className="w-4 h-4 text-success-600" />
            <span>Secure & Private - Encrypted with healthcare standards</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default PatientQR
