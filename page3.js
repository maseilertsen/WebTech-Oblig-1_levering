
const weatherContainer = document.getElementById('weatherContainer');

const places = [                                                                // Hardcode list of locations with latitude and longitude.
    { name: 'Tokyo, Japan', latitude: 35.6895, longitude: 139.6917 },
    { name: 'New York, USA', latitude: 40.7128, longitude: -74.0060 },
    { name: 'London, UK', latitude: 51.5074, longitude: -0.1278 },
    { name: 'Paris, France', latitude: 48.8566, longitude: 2.3522 },
    { name: 'Sydney, Australia', latitude: -33.8688, longitude: 151.2093 }
];


function fetchWeather() {                                                       // Function to fetch and display weather data for all locations.
    weatherContainer.innerHTML = '';                                            // Clear the container before each new fetch.

    places.forEach(location => {                                                // Construct the API URL for the current location.
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true`;

        // Fetch weather data for the location
        fetch(url)
            .then(response => response.json())
            .then(data => {
               
                const weatherBox = document.createElement('div');               // Create a new div for the weather box.
                weatherBox.classList.add('weather-box');

                const weather = data.current_weather;                           // Storing in weather for ease of reading. 
               
                let mps = weather.windspeed/3.6;                                // Convert km/t to m/s.
                mps = mps.toFixed(1);                                           // Only allow 1 decimal point.

                function isDay() {                                              // Playing around with weather data.
                    if (weather.is_day) { return "day in "+ location.name}
                    else { return "NOT day in " + location.name}                
                }
                                                                                // Populate the weather box with data.                                          
                weatherBox.innerHTML = `                                        
                    <h2>${location.name}</h2>
                    <p>Temperature: ${weather.temperature} °C</p>
                    <p>Wind Speed: ${mps} m/s</p>
                    <p>Condition: ${weather.weathercode}</p>
                    <p>It is ${isDay()}</p>
                `;

                weatherContainer.appendChild(weatherBox);                       // Append the weather box to the container.
            })
            .catch(error => {
                console.log('Error fetching weather data:', error);
            });
    });
}

fetchWeather();                                                                 // Fetch weather data initially.
setInterval(fetchWeather, 300000);                                              // Update weather data every 5 minutes (300,000 milliseconds).

