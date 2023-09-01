export async function  request(url, options) {
    const baseUrl='https://api.football-data.org/v4'
    const response = await fetch(baseUrl+url, options)
    return  response.json()
}