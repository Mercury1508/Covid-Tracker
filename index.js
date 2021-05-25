const TotalCasesData=document.getElementById("total-cases-data");
const DeathsData=document.getElementById("deaths-data");
const RecoveredData=document.getElementById("recovered-data");
const CasesTodayData=document.getElementById("cases-today-data");
const DeathsTodayData=document.getElementById("deaths-today-data");

async function CovidAPI(){
  const JsonData = await fetch("https://corona-virus-world-and-india-data.p.rapidapi.com/api", {
    "method": "GET",
    "headers": {
      "x-rapidapi-key": "57bc5776d1msh43c932b1590eb2cp1ee00bjsnfa24dc9cc199",
      "x-rapidapi-host": "corona-virus-world-and-india-data.p.rapidapi.com"
    }
  })
const JsData = await JsonData.json();
TotalCasesData.innerHTML = JsData.world_total.total_cases;
DeathsData.innerHTML = JsData.world_total.total_deaths;
RecoveredData.innerHTML = JsData.world_total.total_recovered;
CasesTodayData.innerHTML = JsData.world_total.new_cases;
DeathsTodayData.innerHTML = JsData.world_total.new_deaths;
}

CovidAPI();