const url = "https://api.openweathermap.org/data/2.5/";
const APIKey = "0a3eb332892c14227c97ed8390936741";
//Query Selectors
const searchCityBtn = document.querySelector(".cityBtn");
const city = document.querySelector("#city");
const cityTitle = document.querySelector(".cityTitle");
const currentWeatherDiv = document.querySelector(".currentWeatherBody");
const currentWeatherUl = document.querySelector(".currentWeatherUl");
const currentWeatherLi = document.querySelector(".currentWeatherLi");

//localstorage city name
function setCityStorage(cityName) {
  cityName = localStorage.setItem("cityName", userCity);
  cityName = localStorage.getItem("cityName");
}

//Geocoding API Call
const GET_CityCoordinates = function (userCity) {
  const queryUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + userCity + '&limit=1' + '&appid=' + APIKey;
  fetch(queryUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          let lat = `lat=${data[0].lat}`;
          let lon = `lon=${data[0].lon}`;
          searchApiByCoordinates(lat, lon);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to GitHub. Geocoding API Call Failed", error);
    });
};

//Api call current weather data
function searchApiByCoordinates(lat, lon) {
  const locQueryUrl = `${url}weather?${lat}&${lon}&exclude=minutely,hourly&units=imperial&appid=${APIKey}`;
  fetch(locQueryUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayCurrentWeather(data)
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("coord api search failed");
    });
};

//Api call to forecast next 4 days
function forecastApiCall(lat, lon) {
  // console.log("forecastApiCall")
  const locQueryUrl = `${url}forecast?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=imperial&appid=${APIKey}`;
  fetch(locQueryUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log("api call for forecast", data)
          displayForecastWeather(data)
        })
      } else {
        alert("Error: " + response.statusText)
      }
    })
    .catch(function (error) {
      alert("api forecast call failed")
    })
}

//display current weather
const displayCurrentWeather = function (data) {
  for (var i = 0; i < data.length; i++) {
    return i;
  }
  const dateElement = document.createElement("h3")
  const temp = document.createElement("li")
  const tempMax = document.createElement("li")
  const tempMin = document.createElement("li")
  const wind = document.createElement("li")
  const humidity = document.createElement("li")
  const weatherDesc = document.createElement("li")
  const weatherIcon = document.createElement("img")

  cityTitle.textContent = `Current Weather In ${userCity.charAt(0).toUpperCase() + userCity.slice(1)}`
  dateElement.textContent = `Today's Date: ${new Date(data.dt * 1000).toLocaleDateString()}`
  temp.textContent = "Tempature: " + data.main.temp + "°F";
  tempMax.textContent = "Max Tempature: " + data.main.temp_max + "°F";
  tempMin.textContent = "Minimum Tempature: " + data.main.temp_min + "°F";
  wind.textContent = "Wind: " + data.wind.speed + " MPH"
  humidity.textContent = "Humidity: " + data.main.humidity + " %"
  weatherDesc.textContent = data.weather[i].description
  weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[i].icon}@2x.png`
  currentWeatherUl.textContent = ""

  dateElement.classList.add('date')
  temp.classList.add('currentWeatherLi');
  tempMax.classList.add('currentWeatherLi');
  tempMin.classList.add('currentWeatherLi');
  wind.classList.add('currentWeatherLi');
  humidity.classList.add('currentWeatherLi');
  weatherDesc.classList.add('currentWeatherLi');
  weatherIcon.classList.add("weatherIcon")
  humidity.classList.add('currentWeatherLi');
  console.log(data)
  currentWeatherUl.append(dateElement, temp, tempMax, tempMin, wind, humidity, weatherDesc, weatherIcon,)

  const lat = data.coord.lat
  const lon = data.coord.lon
  forecastApiCall(lat, lon)
};

//display forecast
const displayForecastWeather = function (data) {
  //start at 1 so that the forecast info starts tomorrow instead of today 
  for (var i = 1; i < data.list.length; i++) {
    //removing the time from date
    let date = new Date(data.list[i].dt * 1000).toLocaleDateString()
    let oldDate = date[3]

    const forecastUl = document.querySelector(".forecastUl")
    const dateElement = document.createElement("h3")
    const temp = document.createElement("li")
    const humidity = document.createElement("li")
    const windSpeed = document.createElement("li")
    const windGust = document.createElement("li")
    const weatherDescription = document.createElement("li")
    const weatherIcon = document.createElement("img")

    // if data is same day splice it out all matches
    if (date[3] === oldDate) {
      data.list.splice(data.list >= data.list.length, 7)
    }

    temp.textContent = `Tempature: ${data.list[0].main.temp}`
    humidity.textContent = `Humidity: ${data.list[0].main.humidity}`
    dateElement.textContent = date
    windSpeed.textContent = `Wind Speed: ${data.list[0].wind.speed} Mph`
    windGust.textContent = `Wind Gust Speed: ${data.list[0].wind.gust} Mph`
    weatherDescription.textContent = `${data.list[0].weather[0].description}`
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`

    forecastUl.classList.add('forecastWeatherUl');
    dateElement.classList.add('forecastWeatherH3');
    temp.classList.add('forecastWeatherLi');
    humidity.classList.add('forecastWeatherLi');
    windSpeed.classList.add('forecastWeatherLi');
    windGust.classList.add("forecastWeatherLi")
    weatherDescription.classList.add("forecastWeatherLi")
    weatherIcon.classList.add('forecastWeatherLi');

    forecastUl.append(dateElement, temp, windSpeed, windGust, humidity, weatherDescription, weatherIcon)
    // console.log("date:" , data.list)
    // console.log('tempature: ', data.list[0].weather[0].description)  
  }
}

//start
const getCity = function (event) {
  event.preventDefault();
  // if without this new search doesnt delete old search. then data stack the old forecastUl
  if (document.querySelector(".forecastUl")) {
    document.querySelector(".forecastUl").textContent = ""
  }
  userCity = city.value.trim();
  if (!userCity) {
    alert("Please enter a City");
  } else if (userCity) {
    setCityStorage();
    GET_CityCoordinates(userCity);
    city.value = ""
  }
};
//search weather by city
searchCityBtn.addEventListener("click", getCity);

