// Personal API Key for OpenWeatherMap API
const OPEN_WEATHER_MAP_API_KEY = 'c25c31ded24738075dacfb7c5e7a1d0f';

// Event listener to add function to existing HTML DOM element

/* Function called by event listener */

/* Function to GET Web API Data*/

const getData = async (url = '') => {
    const response = await fetch(url);
    return response.json();
}

/* Function to POST data */
async function postData(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin', 
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    });
    return response.json(); 
  }


/* Function to GET Project Data */
