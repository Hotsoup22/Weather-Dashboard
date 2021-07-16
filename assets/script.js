
const searchCity = $("#searchCity").val();
// $("#searchTerm").val("");  
console.log(searchCity);
$("#searchCity").on('keyup', function (e) {
  if (e.key === 'Enter' || e.keyCode === 13) {
      console.log("it works");
      apiCall();
    
  }
});

const APIKey = "&appid=0a3eb332892c14227c97ed8390936741";
    const queryUrl =
         "https://api.openweathermap.org/data/2.5/weather?q=" +
         searchCity +
         APIKey +
         "&units=imperial";
    function apiCall(response){
      $.ajax({
        url: queryUrl,
        method: "GET"
      })
      .then(function (response){
        console.log(response);
      })
      return response;
    }




























// const APIKey = "&appid=0a3eb332892c14227c97ed8390936741";
// var userCity = $("#searchTerm").val();
// var searchCity = $("#searchCity");

// console.log("CITY DISPLAY. atleast this works");

// // $("#searchTerm").keypress(function(event) {

// // 	if (event.keyCode === 13) {
// // 		event.preventDefault();
// // 		searchCity.click();
// // 	}
// // });
 

// function getAPI() {
//   var queryURL =
//     "https://api.openweathermap.org/data/2.5/weather?q=" +
//     userCity +
//     APIKey +
//     "&units=imperial";

//   $.ajax({
//     url: queryURL,
//     method: "GET",
//   })
//     .then(function (response) {
//       console.log(response)
//       return response;
   
//     })
    
//     .then (function cityInfo(cityData){
     
//       $('.tempLi').text('Temperature: ' + cityData.main.temp + '*F'  );
//       $('.feelsLike').text('Feels like: ' + cityData.main.feels_like + '*F');
//       $('.tempMax').text('Max Temp: ' + cityData.main.temp_max + '*F');
//       $('.tempMin').text('Min Temp: ' + cityData.main.temp_min + '*F');
//       $('.humidity').text('Humidity: ' + cityData.main.humidity );
//       $('.pressure').text('Pressure: ' + cityData.main.pressure );
  
    
//      })
//      .then (function cityTitle(cityData) {
//       $(".card-title").text(userCity);
//       $(".card-body").append(cityData.name);
    
//   })
// }



  
// function tempMain(temp){
//     //   let temp = $("<li>").addClass("list-group-item").text(city);
//     // $(".list").append(listItem);
// }

// searchCity.one("click", getAPI);
// // console.log(response)

// cityTitle(response);
// cityInfo(response);
// display5Days(response);

//   })

//   var card = $(".card");
//   var cardBody = $(".card-body");
//   var cardTitle = $(".card-title");
//   var listGroup = $(".list-group");
//   var listGroupItem = $(".list-group-item")



// function display5Days(forecast){

//   var forecastCard = $('.forecastCard');
//   var forecastTitle = $('.forecastTitle');
//   var forecastUL = $('.forecastUl');

//   var forecastDate = document.createElement("h5")
//   forecastTitle.textContent = "5-Day Forecast:";
//   // console.log (cityData+'this is 02');
//   // var forecast = response.weather;
//   console.log (forecast.weather+'this is it OGS');
//       for(var i=5; i < forecast.length; i=i+8){

//      var dailyForecast = forecast[i];
//         console.log (dailyForecast+'this is it');
//       }
//     }
