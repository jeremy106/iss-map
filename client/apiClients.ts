import request from 'superagent'

export interface Satelite {
  name: string,
  latitude: number,
  longitude: number
}

export async function getCoordinates(){
  const response = await request.get("https://api.wheretheiss.at/v1/satellites/25544")
  return {
    name: response.body.name,
    latitude: response.body.latitude,
    longitude: response.body.longitude
  }
}