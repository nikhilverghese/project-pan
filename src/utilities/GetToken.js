import axios from 'axios';

/**
 * Generates the api token for the spotify dev api.
 * @returns token for api
 */
export async function getToken() {
    const params = new URLSearchParams();
        params.append('grant_type', 'client_credentials');
        params.append('client_id', 'c1864e7b390f4689a49f9f87f696de1d'); 
        params.append('client_secret', 'd70c6a926a534789b1d98ee38c463be5'); 

        try {
            const response = await axios.post('https://accounts.spotify.com/api/token', params.toString(), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            console.log('Token:', response.data.access_token);
            return response.data.access_token;
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        }
}