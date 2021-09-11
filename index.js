const WorldSection=document.getElementById("world");
const LocationSection=document.getElementById("location");
const OthersSection=document.getElementById("others");

document.getElementById("world-link").addEventListener("click",function(){
  WorldSection.classList.remove("hide");
  LocationSection.classList.add("hide");
  OthersSection.classList.add("hide");
})

document.getElementById("location-link").addEventListener("click",function(){
  SetWorldData(2);
  WorldSection.classList.add("hide");
  LocationSection.classList.remove("hide");
  OthersSection.classList.add("hide");
})

document.getElementById("others-link").addEventListener("click",function(){
  SetIndiaData();
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

async function SetWorldData(x){
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

  if(x==2)
  {
    document.getElementById("country-link-button").addEventListener("click",function(){
      list2=document.getElementById("country");
      val2=list2.value;
      country2=JsData.countries_stat[val2].country_name;
      CountryHere.innerHTML = "Data of " + country2;
      document.getElementById("country-level").classList.remove("hide");
      document.getElementById("location").classList.remove("fix");
      document.getElementById("location").classList.add("fix2");
  
      TotalCasesDataCountry.innerHTML = JsData.countries_stat[val2].cases;
      DeathsDataCountry.innerHTML = JsData.countries_stat[val2].deaths;
      RecoveredDataCountry.innerHTML = JsData.countries_stat[val2].total_recovered;
      CasesTodayDataCountry.innerHTML = "+"+JsData.countries_stat[val2].new_cases;
      DeathsTodayDataCountry.innerHTML = "+"+JsData.countries_stat[val2].new_deaths;
    })
  }
}

SetWorldData(1);

// ----------------------------------world data end-----------------------------------------

// --------------------------------country data start---------------------------------------

const TotalCasesDataCountry=document.getElementById("total-cases-data-country");
const DeathsDataCountry=document.getElementById("deaths-data-country");
const RecoveredDataCountry=document.getElementById("recovered-data-country");
const CasesTodayDataCountry=document.getElementById("cases-today-data-country");
const DeathsTodayDataCountry=document.getElementById("deaths-today-data-country");
const CountryHere= document.getElementById("country-here");

let list2;
let val2;
let country2;

// ----------------------------------country data end---------------------------------------




// ----------------------------------India data start------------------------------------

const TotalCasesDataIndia=document.getElementById("total-cases-data-india");
const DeathsDataIndia=document.getElementById("deaths-data-india");
const RecoveredDataIndia=document.getElementById("recovered-data-india");

const TotalCasesDataState=document.getElementById("total-cases-data-state");
const DeathsDataState=document.getElementById("deaths-data-state");
const RecoveredDataState=document.getElementById("recovered-data-state");

let list;
let val;

const TotalCasesDataOther=document.getElementById("total-cases-data-other");
const DeathsDataOther=document.getElementById("deaths-data-other");
const RecoveredDataOther=document.getElementById("recovered-data-other");

const OtherStateHere= document.getElementById("other-state-here");

async function SetIndiaData(){
  const JsonData = await fetch("https://corona-virus-world-and-india-data.p.rapidapi.com/api_india", {
    "method": "GET",
    "headers": {
      "x-rapidapi-key": "57bc5776d1msh43c932b1590eb2cp1ee00bjsnfa24dc9cc199",
      "x-rapidapi-host": "corona-virus-world-and-india-data.p.rapidapi.com"
    }
  })
  const JsData = await JsonData.json();
  console.log(JsData);

  TotalCasesDataIndia.innerHTML = JsData.total_values.confirmed;
  DeathsDataIndia.innerHTML = JsData.total_values.deaths;
  RecoveredDataIndia.innerHTML = JsData.total_values.recovered;

  document.getElementById("other-link-button").addEventListener("click",function(){
    list=document.getElementById("other-state");
    val=list.value;
    OtherStateHere.innerHTML = "Data of " + val;
    document.getElementById("other-level").classList.remove("hide");
    document.getElementById("others").classList.remove("fix");

    TotalCasesDataOther.innerHTML = JsData.state_wise[val].confirmed;
    DeathsDataOther.innerHTML = JsData.state_wise[val].deaths;
    RecoveredDataOther.innerHTML = JsData.state_wise[val].recovered;
    document.getElementById("other-alert").classList.remove("green");
    document.getElementById("other-alert").classList.remove("red");
    document.getElementById("other-alert").classList.remove("orange");
    let x=JsData.state_wise[val].active;
    if(x<=5000)
    {
      document.getElementById("other-alert").classList.add("green");
      document.getElementById("other-alert").innerHTML ="The number of active cases are less , so you can can get out of home but do not forget to wear facemask.";
    }
    else if(x>5000 && x<=30000)
    {
      document.getElementById("other-alert").classList.add("orange");
      document.getElementById("other-alert").innerHTML = "The number of active cases are moderate , so get out of house only if it is very important.";
    }
    else
    {
      document.getElementById("other-alert").classList.add("red");
      document.getElementById("other-alert").innerHTML = "The number of active cases are very high , stay at home unless emergency.";
    }
      document.getElementById("other-level").classList.remove("hide");
      document.getElementById("others").classList.remove("fix");
    })
}

// ----------------------------------India data end--------------------------------------

