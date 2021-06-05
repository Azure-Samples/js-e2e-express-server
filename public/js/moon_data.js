// api url
var api_url;

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy+mm+dd;

var loc = '33.493401,-117.148788'

var time_zone = '-5';

api_url = 'https://api.solunar.org/solunar/'+loc+','+today+','+time_zone;

// Defining async function
async function getapi(url) {

    // Storing response
    const response = await fetch(url);

    console.log()

    // Storing data in form of JSON
    var data = await response.json();
    console.log(data);

    if(window.location.pathname.includes('moon')){
      document.getElementById('phase').textContent = data.moonPhase;
      document.getElementById('percentage').textContent = 'idk yet';
      document.getElementById('moon_rise').textContent = data.moonRise;
      document.getElementById('moon_set').textContent = data.moonSet;
    }else{
      document.getElementById('sun_rise').textContent = data.sunRise;
      document.getElementById('sun_set').textContent = data.sunSet;
    }
    document.getElementById('loc').textContent = loc;
}

function load_new_loc(){
  var loc = document.getElementById('input_loc').value;
  api_url = 'https://api.solunar.org/solunar/'+loc+','+today+','+time_zone;
  getapi(api_url);
}

// Calling that async function
getapi(api_url);
