import request from 'superagent'

export async function getCoordinates(){
  const response = request.get("https://api.wheretheiss.at/v1/satellites/25544")
  return response.body
}




