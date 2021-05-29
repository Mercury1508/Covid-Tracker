const WorldSection=document.getElementById("world");
const LocationSection=document.getElementById("location");
const OthersSection=document.getElementById("others");

document.getElementById("world-link").addEventListener("click",function(){
  WorldSection.classList.remove("hide");
  LocationSection.classList.add("hide");
  OthersSection.classList.add("hide");
})

document.getElementById("location-link").addEventListener("click",function(){
  WorldSection.classList.add("hide");
  LocationSection.classList.remove("hide");
  OthersSection.classList.add("hide");
  getLocation();
})

document.getElementById("others-link").addEventListener("click",function(){
  WorldSection.classList.add("hide");
  LocationSection.classList.add("hide");
  OthersSection.classList.remove("hide");
})

// ----------------------------------world data start---------------------------------------

const TotalCasesDataWorld=document.getElementById("total-cases-data-world");
const DeathsDataWorld=document.getElementById("deaths-data-world");
const RecoveredDataWorld=document.getElementById("recovered-data-world");
const CasesTodayDataWorld=document.getElementById("cases-today-data-world");
const DeathsTodayDataWorld=document.getElementById("deaths-today-data-world");

async function SetWorldData(){
  const JsonData = await fetch("https://corona-virus-world-and-india-data.p.rapidapi.com/api", {
    "method": "GET",
    "headers": {
      "x-rapidapi-key": "57bc5776d1msh43c932b1590eb2cp1ee00bjsnfa24dc9cc199",
      "x-rapidapi-host": "corona-virus-world-and-india-data.p.rapidapi.com"
    }
  })
const JsData = await JsonData.json();
console.log(JsData);
TotalCasesDataWorld.innerHTML = JsData.world_total.total_cases;
DeathsDataWorld.innerHTML = JsData.world_total.total_deaths;
RecoveredDataWorld.innerHTML = JsData.world_total.total_recovered;
CasesTodayDataWorld.innerHTML = "+"+JsData.world_total.new_cases;
DeathsTodayDataWorld.innerHTML = "+"+JsData.world_total.new_deaths;
}

SetWorldData();

// ----------------------------------world data end-----------------------------------------


// ----------------------------------location data start------------------------------------

const LocationHere=document.getElementById("location-here");
const CountryHere= document.getElementById("country-here");
const StateHere= document.getElementById("state-here");

let latitude;
let longitude;
let country;
let state;

const TotalCasesDataCountry=document.getElementById("total-cases-data-country");
const DeathsDataCountry=document.getElementById("deaths-data-country");
const RecoveredDataCountry=document.getElementById("recovered-data-country");
const CasesTodayDataCountry=document.getElementById("cases-today-data-country");
const DeathsTodayDataCountry=document.getElementById("deaths-today-data-country");

const TotalCasesDataState=document.getElementById("total-cases-data-state");
const DeathsDataState=document.getElementById("deaths-data-state");
const RecoveredDataState=document.getElementById("recovered-data-state");
const CasesTodayDataState=document.getElementById("cases-today-data-state");
const DeathsTodayDataState=document.getElementById("deaths-today-data-state");



function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    LocationHere.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  GetCountry(latitude,longitude);
}

function GetCountry(latitude,longitude){
  GetCountryData();
  async function GetCountryData(){
  const JsonData = await fetch("https://us1.locationiq.com/v1/reverse.php?key=pk.5a1198179f29fef476032844e665d426"+"&lat="+latitude+"&lon=" + longitude + "&format=json");
  const JsData = await JsonData.json();

  LocationHere.innerHTML = "Your Location - " + JsData.display_name;
  CountryHere.innerHTML = "Data of " + JsData.address.country;
  StateHere.innerHTML = "Data of " + JsData.address.state;
  country = JsData.address.country;
  state = JsData.address.state;
  SetCountryData(state,1);
 } 
}

async function SetCountryData(state,x){
  const JsonData = await fetch("https://corona-virus-world-and-india-data.p.rapidapi.com/api_india", {
    "method": "GET",
    "headers": {
      "x-rapidapi-key": "57bc5776d1msh43c932b1590eb2cp1ee00bjsnfa24dc9cc199",
      "x-rapidapi-host": "corona-virus-world-and-india-data.p.rapidapi.com"
    }
  })
  const JsData = await JsonData.json();
  console.log(JsData);
  TotalCasesDataCountry.innerHTML = JsData.total_values.confirmed;
  DeathsDataCountry.innerHTML = JsData.total_values.deaths;
  RecoveredDataCountry.innerHTML = JsData.total_values.recovered;
  CasesTodayDataCountry.innerHTML = "+"+JsData.total_values.deltaconfirmed;
  DeathsTodayDataCountry.innerHTML = "+"+JsData.total_values.deltadeaths;
  
  if(x===1)
  {
    TotalCasesDataState.innerHTML = JsData.state_wise[state].confirmed;
    DeathsDataState.innerHTML = JsData.state_wise[state].deaths;
    RecoveredDataState.innerHTML = JsData.state_wise[state].recovered;
    CasesTodayDataState.innerHTML = "+"+JsData.state_wise[state].deltaconfirmed;
    DeathsTodayDataState.innerHTML = "+"+JsData.state_wise[state].deltadeaths;
  }
  else if(x===2)
  {
    TotalCasesDataOther.innerHTML = JsData.state_wise[state].confirmed;
    DeathsDataOther.innerHTML = JsData.state_wise[state].deaths;
    RecoveredDataOther.innerHTML = JsData.state_wise[state].recovered;
    CasesTodayDataOther.innerHTML = "+"+JsData.state_wise[state].deltaconfirmed;
    DeathsTodayDataOther.innerHTML = "+"+JsData.state_wise[state].deltadeaths;
  }
}

// ----------------------------------location data end--------------------------------------


// ----------------------------------Others data start--------------------------------------

let list;
let val;

const TotalCasesDataOther=document.getElementById("total-cases-data-other");
const DeathsDataOther=document.getElementById("deaths-data-other");
const RecoveredDataOther=document.getElementById("recovered-data-other");
const CasesTodayDataOther=document.getElementById("cases-today-data-other");
const DeathsTodayDataOther=document.getElementById("deaths-today-data-other");

const OtherStateHere= document.getElementById("other-state-here");

document.getElementById("other-link").addEventListener("click",function(){
  list=document.getElementById("other-state");
  val=list.value;
  OtherStateHere.innerHTML = "Data of " + val;
  SetCountryData(val,2);
  document.getElementById("other-level").classList.remove("hide");
  document.getElementById("others").classList.remove("fix");
})

// ----------------------------------Others data end----------------------------------------