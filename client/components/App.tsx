import { useEffect, useState } from "react"
import { getCoordinates, Satelite } from "../apiClients"
import "leaflet/dist/leaflet.css"
import { MapContainer, Marker, TileLayer } from 'react-leaflet'




function App() {

  const [satelite, setSatelite] = useState<Satelite | null>(null)
  const [error, setError ] = useState<string | null>(null)

  useEffect(() => {
    async function update() {
      const data = await getCoordinates()
      try {
        setSatelite(data)
      } catch (err) {
        setError(String(err))
      }
    }
  
    update()

  }, [])
  
  if (error) {
    return <>Something went wrong: {error}</>
  }

  if (!satelite) {
    return <>Loading...</>
  }
  
  // const map = L.map('map').setView([151.5035, -0.09], 13)

  // L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //   maxZoom: 19,
  //   attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  //   }).addTo(map)

  return (
    <>
    <h1>ISS Point of View</h1>
    <p>
      Latitude: {satelite.latitude}
    </p>
    <p>
      Longitude: {satelite.longitude}
    </p>
    <MapContainer center={[satelite.latitude, satelite.longitude]} zoom={4}>
      <TileLayer 
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[satelite.latitude, satelite.longitude]} ></Marker>
    </MapContainer>
    </>
  )
}

export default App
