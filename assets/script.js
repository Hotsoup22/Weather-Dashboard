var APIKey = "&appid=0a3eb332892c14227c97ed8390936741";
var  userCity = $("#searchTerm").val();
$("#searchTerm").val(""); 
var cityList =$(".cityList");
// const city = $("<h4>").addClass("card-title").text(response.name);
// var name = element.textContent;s

var searchCity = $("#searchCity");
// searchButton.addEventListener("click", getApi);
// var searchButton = $.Event( "click", getApi );

console.log('CITY DISPLAY. atleast this works');

var queryURL=
"https://api.openweathermap.org/data/2.5/weather?q=" + userCity + APIKey;
searchCity.on("click", cityDisplay);

  function cityDisplay() {
   

  
   $.ajax({
      url: queryURL,
      method:'GET'

     
    })
      .then(function (response) {
        console.log(response)
        console.log(response.name)
        console.log(response.weather)
      });
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
