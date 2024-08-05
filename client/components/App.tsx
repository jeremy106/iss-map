import { useEffect, useState } from "react"
import { getCoordinates, Satelite } from "../apiClients"

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


  return (
    <>
    <h1>ISS Point of View</h1>
    <p>
      Latitude: {satelite.latitude}
    </p>
    <p>
      Longitude: {satelite.longitude}
    </p>
    </>
  )
}

export default App
