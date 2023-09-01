export async function request(url, options) {
    const baseUrl = 'https://apiv3.apifootball.com/'
    const response = await fetch(baseUrl + url + '&APIkey=' + import.meta.env.VITE_API_KEY)
    return response.json()
}