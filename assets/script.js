var APIKey='&appid=0a3eb332892c14227c97ed8390936741';
var city = document.getElementById('searchTerm').value;


var searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", getApi);



//
var repoList = document.querySelector('ul');
 
//
function getApi() {
var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + APIKey;
//
fetch(queryURL)
.then(function (response) {
  
  console.log(response)

  console.log(response.name)
    return response;
  })


  .then(function (data) {

    for (var i = 0; i < data.length; i++) {
      var listItem = document.createElement('li');
      listItem.textContent = data[i].html_url;
      repoList.appendChild(listItem);
    }
  });

  }
  
 
