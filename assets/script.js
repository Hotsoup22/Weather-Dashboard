var APIKey='&appid=0a3eb332892c14227c97ed8390936741';
var city = document.getElementById('searchTerm').value;

// const city = $("<h4>").addClass("card-title").text(response.name);
// var name = element.textContent;s
var searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", getApi);



//

 
//search city
var cityList = document.querySelector('ul');

function getApi() {
var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + APIKey;
//
fetch(queryURL)
.then(function (response) {
  
  console.log(response)

  console.log(response.city)
    return response;
  })


  .then(function (data) {
    //
    
   var cityList = document.querySelector('ul');
    for (var i = 0; i < data.length; i++) {
      var listItem = document.createElement('li');
      listItem.textContent = data[i].name;
      cityList.appendChild(listItem);
    }
  });

  }
  
 
