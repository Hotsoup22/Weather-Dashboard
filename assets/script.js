var APIKey = "&appid=0a3eb332892c14227c97ed8390936741";
var  userCity = $("#searchTerm").val();
// const city = $("<h4>").addClass("card-title").text(response.name);
// var name = element.textContent;s
var searchCity = $("#searchCity");
// searchButton.addEventListener("click", getApi);
// var searchButton = $.Event( "click", getApi );


console.log('CITY DISPLAY. atleast this works');


$("#searchTerm").keypress(function(event) { 
	
	if (event.keyCode === 13) { 
		event.preventDefault();
		searchCity.click(); 
	}
});



searchCity.on("click", cityDisplay );

  function cityDisplay() {
    var queryURL=
    "https://api.openweathermap.org/data/2.5/weather?q=" + userCity + APIKey + '&units=imperial';
    
  
   $.ajax({
      url: queryURL,
      method:'GET'

     
    })
      .then(function (response) {
        console.log(response)
        cityTitle(response);
        cityInfo(response);
      
     

        
      });
      
    
    }
    var card = $(".card");
    var cardBody = $(".card-body");
    var cardTitle = $(".card-title");
    var listGroup = $(".list-group");
    var listGroupItem = $(".list-group-item")

  function cityTitle(nameData){
      cardTitle.text(userCity);
      cardBody.prepend(nameData);
      
    }
  function cityInfo(cityData){
    var temp = $('.temp')
    temp.text('Temperature: ' + cityData.main.temp + '*F'  );
    $('.feelsLike').text('Feels like: ' + cityData.main.feels_like + '*F');
    $('.tempMax').text('Max Temp: ' + cityData.main.temp_max + '*F');
    $('.tempMin').text('Min Temp: ' + cityData.main.temp_min + '*F');
    $('.humidity').text('Humidity: ' + cityData.main.humidity );
    $('.pressure').text('Pressure: ' + cityData.main.pressure );
    if (temp < 85){
      $('.card-img-top').src="./assets/penguin.jpg"
    } 

  }




 
  




//   fetch(queryURL)
//     .then(function (response) {
//       console.log(response);

//       console.log(response.city);
//       return response;
//     })

//     .then(function (data) {
//       var cityList = document.querySelector("ul");
//       for (var i = 0; i < data.length; i++) {
//         var listItem = document.createElement("li");
//         listItem.textContent = data[i].name;
//         cityList.appendChild(listItem);
//       }
//     });
// }
// var APIKey = "&appid=0a3eb332892c14227c97ed8390936741";
// var  userCity = $("#searchTerm").val();


// // const city = $("<h4>").addClass("card-title").text(response.name);
// // var name = element.textContent;s

// var searchCity = $("#searchCity");
// // searchButton.addEventListener("click", getApi);
// // var searchButton = $.Event( "click", getApi );

// console.log('CITY DISPLAY. atleast this works');

// var queryURL=
// "https://api.openweathermap.org/data/2.5/weather?q=" + userCity + APIKey;
// searchCity.one("click", cityDisplay);
// $("#searchTerm").val("");
//   function cityDisplay() {
   

  
//    $.ajax({
//       url: queryURL,
//       method:'GET'

     
//     })
//       .then(function (response) {
//         var tempF = (response.main.temp - 273.15) * 1.80 + 32;
//         tempF = Math.floor(tempF);

//         console.log(response)
//         console.log(response.name)
//         console.log(response.weather)
//         console.log(response.main);
     

        
      
//         console.log(tempF)

//          .then(function clearThis( userCity){
//           if(userCity.value== ("text")){
//             userCity.value= ('');}
//       })
 
        
        
//       });
      
    
//     }

//     function cityInfo() {
//       let listItem = $(".list-group").addClass("list-group-item").text(userCity);
//       $(".cityList").append(listItem);
 
     

//         // listTemp = 
//     } 
   