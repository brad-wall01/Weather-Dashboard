const cityEl = document.querySelector(`#cityResult`);
const tempEl = document.querySelector(`#temp`);
const windEl = document.querySelector(`#wind`);
const humidityEl = document.querySelector(`#humidity`);
const forecastCardsEl = document.querySelector(`#forecastCards`);
const weatherIconEl = document.querySelector('#weather-icon');

function getCity(name) {

    const apiKey = `3f0bf355ca0b89fed2636379f62e1ec3`;

    let cityURL = `https://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=5&appid=${apiKey}`;

    fetch(cityURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (location) {
            let weatherURL = `https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=${location[0].lat}&lon=${location[0].lon}&appid=${apiKey}`;

            fetch(weatherURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (weather) {
                displayWeather(weather);
            });
        });

    console.log(getCity)
}

function displayWeather(result) {
    const { icon } = result.list[0].weather[0];
    weatherIconEl.src = `https://openweathermap.org/img/wn/${icon}.png`;

    cityEl.textContent = result.city.name;
    tempEl.textContent = result.list[0].main.temp;
    windEl.textContent = result.list[0].wind.speed;
    humidityEl.textContent = result.list[0].main.humidity;

}

// function handleFormSubmit() {
//     let formValue = document.querySelector(`#city`).value;

//     let searchHistory = JSON.parse(localStorage.getItem(`searchHistory`));

//     localStorage.setItem(`searchHistory`, JSON.stringify(searchHistory));
//     getCity(formValue)
// }
