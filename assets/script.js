const url = "https://api.openweathermap.org/data/2.5/";
const openWeatherApiKey = "0a3eb332892c14227c97ed8390936741";
const nasaImgOfTheDayApiKey = "IccyfLytAtBdOxx98LrB30b5hH6fV4h8NW5x6R9G"
//Query Selectors
const searchCityBtn = document.querySelector(".cityBtn");
const city = document.querySelector("#city");

const currentWeatherForecastSection = document.querySelector(".currentWeatherForecastSection");

const currentWeatherLi = document.querySelector(".currentWeatherLi");
const searchHistory = []

//Geocoding API Call
// const GET_APOD = function () {
//   const queryUrl = 'https://api.nasa.gov/planetary/apod?' + 'api_key=' + nasaImgOfTheDayApiKey;
//   fetch(queryUrl)
//     .then(function (response) {
//       if (response.ok) {
//         console.log(response)
//         response.json().then(function (data) {
//           displayNasaImg(data)
//         });
//       } else {
//         alert("Error: " + response.statusText);
//       }
//     })
//     .catch(function (error) {
//       alert("Unable to connect to GitHub. Geocoding API Call Failed", error);
//     });
// };

//Geocoding API Call
const GET_CityCoordinates = function () {
  const storedUserCity = JSON.parse(localStorage.getItem("cityName"));
  const queryUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + storedUserCity[0] + '&limit=1' + '&appid=' + openWeatherApiKey;

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
  const locQueryUrl = `${url}weather?${lat}&${lon}&exclude=minutely,hourly&units=imperial&appid=${openWeatherApiKey}`;
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
  const locQueryUrl = `${url}forecast?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=imperial&appid=${openWeatherApiKey}`;
  fetch(locQueryUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {

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
//Nasa Image
// const displayNasaImg = function (data) {
// console.log("nasa img console.log", data)
// const bgImageDiv = document.querySelector(".bgImageDiv")
// const hdImage = document.createElement("img")
// hdImage.classList.add('hdimage')
// hdImage.src = data.hdurl
// bgImageDiv.append(hdImage)

// }

//display current weather
const displayCurrentWeather = function (data) {

  const storedUserCity = JSON.parse(localStorage.getItem("cityName"));

  for (var i = 0; i < data.length; i++) {
    return i;
  }

  const dateElement = document.createElement("p")
  const cityTitle = document.createElement("p");
  const divElement = document.createElement("div")
  const temp = document.createElement("li")
  const tempMax = document.createElement("li")
  const tempMin = document.createElement("li")
  const wind = document.createElement("li")
  const humidity = document.createElement("li")
  const weatherDesc = document.createElement("li")
  const weatherIcon = document.createElement("img")
  const currentWeatherUl = document.querySelector(".currentWeatherUl");
  const searchHistoryUl = document.querySelector(".searchHistoryUl")
  const historyDiv = document.querySelector(".historyDiv")
  const weatherIconClass = document.querySelector('.weatherIcon')


  cityTitle.textContent = ` ${storedUserCity[0].charAt(0).toUpperCase() + storedUserCity[0].slice(1)}`
  dateElement.textContent = `Today's Date: ${new Date(data.dt * 1000).toLocaleDateString()}`
  temp.textContent = "Tempature: " + data.main.temp + "°F";
  tempMax.textContent = "Max Tempature: " + data.main.temp_max + "°F";
  tempMin.textContent = "Minimum Tempature: " + data.main.temp_min + "°F";
  wind.textContent = "Wind: " + data.wind.speed + " MPH"
  humidity.textContent = "Humidity: " + data.main.humidity + " %"
  weatherDesc.textContent = data.weather[i].description
  if (weatherIconClass) {
    weatherIcon.src = ""
  }
  weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[i].icon}@2x.png`
  currentWeatherUl.textContent = ""

  divElement.classList.add('title_date')
  dateElement.classList.add('date')
  temp.classList.add('currentWeatherLi');
  tempMax.classList.add('currentWeatherLi');
  tempMin.classList.add('currentWeatherLi');
  wind.classList.add('currentWeatherLi');
  humidity.classList.add('currentWeatherLi');
  weatherDesc.classList.add('currentWeatherLi');
  weatherIcon.classList.add("weatherIcon")
  humidity.classList.add('currentWeatherLi');
  historyDiv.classList.remove('hidden')
  currentWeatherUl.classList.remove('hidden')
  searchHistoryUl.classList.add('borderStyle')
  // console.log(data)

  currentWeatherUl.append(divElement, temp, tempMax, tempMin, wind, humidity, weatherDesc, weatherIcon)
  divElement.append(cityTitle, dateElement)
  const lat = data.coord.lat
  const lon = data.coord.lon

  forecastApiCall(lat, lon)
};

//display forecast
const displayForecastWeather = function (data) {
  //start at 1 so that the forecast info starts tomorrow instead of today 
  for (var i = 8; i < data.list.length; i++) {
    //removing the time from date
    let date = new Date(data.list[i].dt * 1000).toLocaleDateString()
    let oldDate = date[3]

    const forecastUl = document.querySelector(".forecastUl")
    const forecastdiv = document.createElement("div")
    const dateElement = document.createElement("h3")
    const temp = document.createElement("li")
    const humidity = document.createElement("li")
    const windSpeed = document.createElement("li")
    const windGust = document.createElement("li")
    const weatherDescription = document.createElement("li")
    const weatherIcon = document.createElement("img")
    // if data is same day splice it out all matches

    if (date[3] === oldDate) {
      data.list.splice(data.list >= data.list.length, 8)
    }
    temp.textContent = `Tempature: ${data.list[0].main.temp}°F`
    humidity.textContent = `Humidity: ${data.list[0].main.humidity}%`
    dateElement.textContent = date
    windSpeed.textContent = `Wind: ${data.list[0].wind.speed} Mph`
    windGust.textContent = `Wind Gust: ${data.list[0].wind.gust} Mph`
    weatherDescription.textContent = `${data.list[0].weather[0].description}`
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`

    dateElement.classList.add('forecastWeatherH3');
    temp.classList.add('forecastWeatherLi');
    humidity.classList.add('forecastWeatherLi');
    windSpeed.classList.add('forecastWeatherLi');
    windGust.classList.add("forecastWeatherLi")
    weatherDescription.classList.add("forecastWeatherLi")
    weatherIcon.classList.add('forecastWeatherIcon');
    forecastdiv.classList.add('forecastWeatherDayDiv');
    forecastdiv.append(dateElement, temp, humidity, windSpeed, windGust, weatherDescription, weatherIcon)
    forecastUl.append(forecastdiv)
    // console.log("date:" , data.list)
    // console.log('tempature: ', data.list[0].weather[0].description)  
  }
}

const displayHistory = function () {
  const storedUserCity = JSON.parse(localStorage.getItem("cityName"));
  console.log("display history: ", storedUserCity[storedUserCity.length - 1])
  const searchHistoryLink = document.createElement("button")
  const searchHistoryUl = document.querySelector(".searchHistoryUl")
  searchHistoryLink.classList.add('searchHistoryLink')
  searchHistoryLink.src = "/"
  searchHistoryLink.textContent = storedUserCity[storedUserCity.length - 1]
  searchHistoryUl.classList.remove('hidden')
  searchHistoryUl.append(searchHistoryLink)
}

//search weather by city
searchCityBtn.addEventListener("click", function (event) {
  event.preventDefault();
  if (document.querySelector(".homePageStyles")) {
    document.getElementById("nav").classList.remove('centered', 'homePageStyles')
    document.getElementById("user-form").classList.remove('centered')
    document.getElementById("nav").classList.add('nav');
  }
  else if (document.querySelector(".forecastUl")) {
    document.querySelector(".forecastUl").textContent = ""
  }
 
  userCity = city.value.trim();
  if (!userCity) {
    alert("Please enter a City");
  } else if (userCity) {
    searchHistory.push(userCity)
    localStorage.setItem("cityName", JSON.stringify(searchHistory));

    displayHistory();
    GET_CityCoordinates();
    city.value = ""
  }

});

