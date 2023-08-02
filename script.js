const weatherForm = document.getElementById('weatherForm');
const locationInput = document.getElementById('locationInput');
const weatherInfo = document.getElementById('weatherInfo');
const loading = document.getElementById('loading');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = locationInput.value;
  getWeatherData(location);
});

function getWeatherData(location) {
  const apiKey = 'fd5c1d7819c949a1bbc213146233007';
  const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;

  showLoading();

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      hideLoading();
      displayWeatherInfo(data);
    })
    .catch(error => {
      hideLoading();
      console.log('Error fetching weather data:', error);
    });
}

function displayWeatherInfo(data) {
  const weatherData = processWeatherData(data);
  weatherInfo.innerHTML = `
    <h2>${weatherData.city}</h2>
    <p>Temperature: ${weatherData.temperature} °C</p>
    <p>Weather: ${weatherData.description}</p>
  `;
}


function processWeatherData(data) {
    if (!data || !data.current || !data.current.temp_c || !data.current.condition || !data.current.condition.text) {
      console.log('Error: Invalid weather data format.');
      return null;
    }
  
    return {
      city: data.location.name,
      temperature: data.current.temp_c,
      description: data.current.condition.text
    };
  }
  

function showLoading() {
  loading.style.display = 'block';
}

function hideLoading() {
  loading.style.display = 'none';
}
