import { useState } from "react"
import QRCode from "react-qr-code"
import { Download, Copy, Share2, Check } from "lucide-react"
import { useAuthStore } from "../../stores/authStore"

const PatientQR = () => {
  const { user } = useAuthStore() // Get logged-in user
  const [copied, setCopied] = useState(false)

  const qrValue = user?.email || "patient@email.com"

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(qrValue)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      alert("Failed to copy")
    }
  }

  const downloadQR = () => {
    const svg = document.getElementById("qr-code")
    const serializer = new XMLSerializer()
    const svgStr = serializer.serializeToString(svg)

    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const img = new Image()

    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)
      const pngUrl = canvas.toDataURL("image/png")

      const link = document.createElement("a")
      link.href = pngUrl
      link.download = "medipass-qr.png"
      link.click()
    }

    img.src =
      "data:image/svg+xml;base64," +
      window.btoa(unescape(encodeURIComponent(svgStr)))
  }

  const shareQR = async () => {
    try {
      const svg = document.getElementById("qr-code")
      const serializer = new XMLSerializer()
      const svgStr = serializer.serializeToString(svg)

      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      const img = new Image()

      img.onload = async () => {
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)
        
        canvas.toBlob(async (blob) => {
          const file = new File([blob], "medipass-qr.png", { type: "image/png" })
          
          // Check if Web Share API is available
          if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
            try {
              await navigator.share({
                title: "My MediPass QR Code",
                text: `My MediPass QR Code: ${qrValue}`,
                files: [file],
              })
            } catch (err) {
              if (err.name !== "AbortError") {
                // Fallback to copy link if share fails
                fallbackShare()
              }
            }
          } else {
            // Fallback for browsers that don't support Web Share API
            fallbackShare()
          }
        }, "image/png")
      }

      img.src =
        "data:image/svg+xml;base64," +
        window.btoa(unescape(encodeURIComponent(svgStr)))
    } catch (err) {
      console.error("Error sharing QR code:", err)
      fallbackShare()
    }
  }

  const fallbackShare = async () => {
    try {
      // Try to copy QR code data URL to clipboard
      const svg = document.getElementById("qr-code")
      const serializer = new XMLSerializer()
      const svgStr = serializer.serializeToString(svg)
      const dataUrl = "data:image/svg+xml;base64," + window.btoa(unescape(encodeURIComponent(svgStr)))
      
      // Convert to PNG data URL
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      const img = new Image()
      
      img.onload = async () => {
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)
        const pngDataUrl = canvas.toDataURL("image/png")
        
        // Try to copy image to clipboard (modern browsers)
        try {
          await navigator.clipboard.write([
            new ClipboardItem({
              "image/png": await fetch(pngDataUrl).then(r => r.blob())
            })
          ])
          alert("QR Code copied to clipboard! You can paste it anywhere.")
        } catch (clipErr) {
          // If clipboard API fails, show share options
          const shareText = `My MediPass QR Code: ${qrValue}\n\nShare this with healthcare providers to access my medical records.`
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(shareText)
            alert("QR Code information copied to clipboard! You can share it via email or messaging apps.")
          } else {
            // Last resort: show the data
            prompt("Copy this QR Code information:", shareText)
          }
        }
      }
      
      img.src = "data:image/svg+xml;base64," + window.btoa(unescape(encodeURIComponent(svgStr)))
    } catch (err) {
      console.error("Fallback share error:", err)
      alert("Please use the download button to save the QR code and share it manually.")
    }
  }

  if (!user) {
    return <p className="text-center py-10">Please log in to view your QR code.</p>
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="card p-10 text-center shadow-2xl rounded-3xl">

        {/* QR */}
        <div className="w-60 h-60 mx-auto mb-6 bg-white rounded-2xl shadow-lg flex items-center justify-center">
          <QRCode
            id="qr-code"
            value={qrValue}
            size={200}
            bgColor="#ffffff"
            fgColor="#2563eb"
            level="H"
          />
        </div>

        <h2 className="text-2xl font-bold text-neutral-900 mb-2">
          Your MediPass QR
        </h2>
        <p className="text-neutral-600 mb-6">
          Show this QR code to healthcare providers
        </p>

        {/* Code + Copy */}
        <div className="flex items-center justify-center gap-3 bg-neutral-50 p-4 rounded-xl mb-6">
          <span className="font-mono text-primary-600 bg-primary-100 px-3 py-1 rounded-lg truncate max-w-[220px]">
            {qrValue}
          </span>
          <button
            onClick={handleCopy}
            className="p-2 hover:bg-neutral-200 rounded-lg transition"
          >
            {copied ? (
              <Check className="w-5 h-5 text-green-600" />
            ) : (
              <Copy className="w-5 h-5 text-neutral-600" />
            )}
          </button>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-6">
  <button
    onClick={downloadQR}
    className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-white font-medium shadow-md hover:bg-blue-700 active:scale-95 transition"
  >
    <Download className="w-5 h-5" />
    Download
  </button>

  <button
    onClick={shareQR}
    className="flex items-center justify-center gap-2 rounded-xl border border-blue-600 px-4 py-3 text-blue-600 font-medium shadow-sm hover:bg-blue-50 active:scale-95 transition"
  >
    <Share2 className="w-5 h-5" />
    Share
  </button>
</div>


      </div>
    </div>
  )
}

export default PatientQR
