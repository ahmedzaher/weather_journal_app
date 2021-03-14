/* Global Variables */
// Personal API Key for OpenWeatherMap API
const OPEN_WEATHER_MAP_API_KEY = 'c25c31ded24738075dacfb7c5e7a1d0f';


const renderRecentTemp = (temp) => {

    document.getElementById("date").innerHTML = temp['date'];
    document.getElementById("temp").innerHTML = temp['temp'];
    document.getElementById("content").innerHTML = temp['content'];
}

/* Function called by event listener */
const generateTempHandler = async () => {
    const zipCode = document.getElementById("zip");
    if(!zipCode.value) {
        alert("Zip code required");
        return;
    } 

    const tempObj = await getWeatherByZipAndCountryCode(zipCode.value);
    if(tempObj.cod !== 200) {
        alert(tempObj.message);
        return;
    }

    const data = {
        temp: tempObj.main.temp,
        date: getCurrentTime(),
        content: document.getElementById("feelings").value
    }

    const postResponse = await postData("/temp", data);

    const recentTemp = await getProjectData();
console.log(recentTemp);
    renderRecentTemp(recentTemp);


}

// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener('click', generateTempHandler);


const getCurrentTime = () => {
       let d = new Date();
       return d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
}

/* Function to GET Web API Data*/
const getWeatherByZipAndCountryCode = async (zipCode, countryCode = 'us') => {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},${countryCode}&units=metric&&appid=${OPEN_WEATHER_MAP_API_KEY}`);
    return response.json();
}

/* Function to POST data */
const postData = async (url = '', data = {}) => {
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
const getProjectData = async () => {
    const response = await fetch("/all");
    return response.json();
};

