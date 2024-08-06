import { useEffect, useState } from "react"
import { getCoordinates, Satelite } from "../apiClients"
import "leaflet/dist/leaflet.css"
import { MapContainer, Marker, TileLayer } from 'react-leaflet'

function App() {

  const [satelite, setSatelite] = useState<Satelite | null>(null)
  const [error, setError ] = useState<string | null>(null)

  useEffect(() => {

    const interval = setInterval(() => {
      
      
      async function update() {
        const data = await getCoordinates()
        try {
          setSatelite(data)
        } catch (err) {
          setError(String(err))
        }
      }
      
      update()
      
    }, 2000)
    console.log("beep")

    return () => clearInterval(interval)
      
  }, [])
  



  if (error) {
    return <>Something went wrong: {error}</>
  }

  if (!satelite) {
    return <>Loading...</>
  }

  return (
    <>
    <h1>Where is the International Spacestation?</h1>
    <p>
      Latitude: {satelite.latitude}
    </p>
    <p>
      Longitude: {satelite.longitude}
    </p>
    <MapContainer center={[satelite.latitude, satelite.longitude]} zoom={5}>
      <TileLayer 
        attribution='&copy; NASA Blue Marble'
        url="http://s3.amazonaws.com/com.modestmaps.bluemarble/{z}-r{y}-c{x}.jpg"
        maxNativeZoom={8}
      />
      <Marker position={[satelite.latitude, satelite.longitude]} ></Marker>
    </MapContainer>
    </>
  )
}

export default App
