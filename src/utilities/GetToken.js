import axios from 'axios';

/**
 * Generates the api token for the spotify dev api.
 * @returns token for api
 */
export async function getToken() {
    const params = new URLSearchParams();
        params.append('grant_type', 'client_credentials');
        params.append('client_id', process.env.REACT_APP_CLIENT_ID); 
        params.append('client_secret', process.env.REACT_APP_CLIENT_SECRET); 

        try {
            const response = await axios.post('https://accounts.spotify.com/api/token', params.toString(), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            return response.data.access_token;
        } catch (error) {
        }
}