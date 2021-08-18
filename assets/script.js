
var searchCityBtn = document.querySelector(".cityBtn");
var city = document.querySelector("#city");
var cityTitle = document.querySelector(".cityTitle");
weatherCard = document.querySelector("weather");
var url = "https://api.openweathermap.org/data/2.5/";
const APIKey = "0a3eb332892c14227c97ed8390936741";

function setCityStorage(cityKey) {
  cityKey = localStorage.setItem("cityKey", userCity);
  cityKey = localStorage.getItem("cityKey");
  console.log("city key logged ", cityKey);
  return cityKey;
}

var getCity = function (event) {
  event.preventDefault();
  console.log("getcity");

  userCity = city.value.trim();

  if (userCity) {
    setCityStorage();
    getWeather(userCity);

  } else {
    alert("Please enter a City");
  }
};

var getWeather = function (userCity) {
  //var apiUrl = 'https://api.github.com/users/' + user + '/repos';
  

  const queryUrl =
    url  +
    "weather?q="+
    userCity +
    "&appid=" +
    APIKey +
    "&units=imperial";
  fetch(queryUrl)
    .then(function (response) {
      if (response.ok) {
        // console.log(response);
        response.json().then(function (data) {
          // console.log(data);
          displayWeather(data, city);
          var cityLat = `lat=${data.coord.lat}`;
          var cityLon = `lon=${data.coord.lon}`;
          console.log(cityLat, cityLon);
          searchApiByCoordinates(cityLat, cityLon);
        });
        
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to GitHub");
    });
};

 function searchApiByCoordinates(lat, lon) {
   console.log("seachApibyCoord")
   var locQueryUrl = `${url}onecall?${lat}&${lon}&exclude=minutely,hourly&units=imperial&appid=${APIKey}`;

   fetch(locQueryUrl)
   
       .then(function (response) {
          if(response.ok) {
             console.log(" found")
             response.json().then(function (data) {
             console.log(data)
             
             var uvi = data.daily[0].uvi
             cityTitle.textContent = userCity;

             const resultCard = document.createElement("div");
             resultCard.classList.add("card", "bg-light", "text-dark", "mb-3", "p-3");
           
             const resultBody = document.createElement("div");
             resultBody.classList.add("card-body");
             resultCard.append(resultBody);
           
             const titleEl = document.createElement("h3");
             titleEl.textContent = `City: ${userCity}`;
           
             const bodyContentEl = document.createElement("p");
             bodyContentEl.innerHTML = `Uvi Rating: `+  `${uvRating(uvi)}F<br>`
             resultBody.append(titleEl, bodyContentEl);
             forecastBody.append(resultCard);
             
          }); 
        } else {
        alert("Error: " + response.statusText);
      }
        })
        .catch(function (error) {
          alert("Unable to connect to GitHub");
        });
    };
    

function uvRating(uvi) {

  if(uvi < 3 ){
   return uvi+ ": Low".fontcolor("green")
  } else if (uvi < 6){
    returnuvi+ " Moderate" .fontcolor("yellow")
  } else if(uvi < 8){
    return uvi+" High".fontcolor("red")
  }else if (uvi < 11){
    return uvi+" Very High".fontcolor("black")
  } else 

  return  "uvExt";
}
var div = document.createElement("div");
var litag = document.createElement("li");
var cityTitle = document.querySelector(".cityTitle");
var maintempUl = document.querySelector(".maintemp");
var resultContentEl = document.querySelector(".mainTempL");
var forecastBody = document.querySelector(".forecastBody");

//display main
var displayWeather = function (data, city) {
  console.log(data);

  cityTitle.textContent = userCity;

  const resultCard = document.createElement("div");
  resultCard.classList.add("card", "bg-light", "text-dark", "mb-3", "p-3");

  const resultBody = document.createElement("div");
  resultBody.classList.add("card-body");
  resultCard.append(resultBody);

  const titleEl = document.createElement("h3");
  titleEl.textContent = `City: ${userCity}`;

  const bodyContentEl = document.createElement("p");
  bodyContentEl.innerHTML = `Feels like: ${data.main.feels_like}F<br>
Temp: ${data.main.temp}F<br>
pressure: ${data.main.pressure}<br>
humidity ${data.main.humidity}<br>
temp_max: ${data.main.temp_max}F<br>
temp_min: ${data.main.temp_min}F<br>
visibility: ${data.visibility}<br>
${data.weather[0].main}<br>
${data.weather[0].description}<br>`;
// ${uvRating(data.current.uvi)}<br>
  resultBody.append(titleEl, bodyContentEl);

  resultContentEl.append(resultCard);
};
//use the one call api on open weather dashboard

searchCityBtn.addEventListener("click", getCity);

