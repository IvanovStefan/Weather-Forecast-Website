const apiURL = "https://api.openweathermap.org/data/2.5/forecast?appid=47bfab072dc24822bcc7585bf507c61c&units=metric&q=";

const resultContainer = document.getElementById("result-container");
let previousCity = resultContainer.textContent.trim();
console.log("Press ENTER to see the weather");
const today = new Date();
let dayOfWeekNumber = today.getDay();
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const dayOfWeek = daysOfWeek[dayOfWeekNumber];
console.log(dayOfWeek);
const spinner = document.getElementById("spinner");
const wth = document.getElementById("wth");
const wth1 = document.getElementById("wth1");
const wth2 = document.getElementById("result-container");
const wth3 = document.getElementById("imagine");
const wth4 = document.getElementById("heartIcon");

for(let i=1;i<=5;i++)
{
    if(dayOfWeekNumber==6)
        dayOfWeekNumber=0;
    else
        dayOfWeekNumber++;
    const dayOfWeek = daysOfWeek[dayOfWeekNumber];
    document.querySelector(".weekday" + i).innerHTML=dayOfWeek;
}

async function checkWeather(city) {
  try {
    spinner.removeAttribute('hidden');
    wth.setAttribute('hidden', '');
    wth1.setAttribute('hidden', '');
    wth2.setAttribute('hidden', '');
    wth3.setAttribute('hidden', '');
    wth4.setAttribute('hidden', '');
    const response = await fetch(apiURL + city);

    if (!response.ok) {
      throw new Error('Failed to retrieve weather data');
    }

    const data = await response.json();
    setTimeout(() => {
      spinner.setAttribute('hidden', '');
      wth.removeAttribute('hidden');
      wth1.removeAttribute('hidden');
      wth2.removeAttribute('hidden');
      wth3.removeAttribute('hidden');
      wth4.removeAttribute('hidden');
      console.log(data);
    }, 2000);
    document.querySelector(".current-temp").innerHTML="Temperatura actuala: " + Math.round(data.list[0].main.temp) + "°C";
    
    let dateOnly = data.list[0].dt_txt.split(" ")[0];
    let tempmax, tempmin;
    tempmax=data.list[0].main.temp_max;
    tempmin=data.list[0].main.temp_min;
    console.log(dateOnly);
    let i=1;
    while(dateOnly == data.list[i].dt_txt.split(" ")[0])
    {
      if(tempmax < data.list[i].main.temp_max)
        tempmax=data.list[i].main.temp_max;
      if(tempmin > data.list[i].main.temp_min)
        tempmin=data.list[i].main.temp_min;
      i++;
    }
    dateOnly = data.list[i].dt_txt.split(" ")[0];
    document.querySelector(".high").innerHTML=Math.round(tempmax) + "°C";
    document.querySelector(".low").innerHTML=Math.round(tempmin) + "°C";
    document.querySelector(".humid").innerHTML=data.list[0].main.humidity + "%";
    document.querySelector(".wind").innerHTML=data.list[0].wind.speed + "km/h";
    document.querySelector(".press").innerHTML=data.list[0].main.grnd_level + "hPa";
    document.querySelector(".precip").innerHTML=Math.round((data.list[0].pop)*100) + "%";
    let Icon = document.querySelector(".weather-icon");
    if(data.list[0].weather[0].main=="Clouds")
        Icon.src="assets/clouds.png";
    if(data.list[0].weather[0].main=="Clear")
      Icon.src="assets/clear.png";
    if(data.list[0].weather[0].main=="Rain")
        Icon.src="assets/rain.png";
    if(data.list[0].weather[0].main=="Mist")
        Icon.src="assets/mist.png";
    if(data.list[0].weather[0].main=="Drizzle")
        Icon.src="assets/drizzle.png";
    if(data.list[0].weather[0].main=="Snow")
        Icon.src="assets/snow.png";
    
    //Day 1
    console.log(dateOnly);
    tempmax=data.list[i].main.temp_max;
    tempmin=data.list[i].main.temp_min;
    document.querySelector(".humid1").innerHTML=data.list[i+5].main.humidity + "%";
    document.querySelector(".rain1").innerHTML=Math.round((data.list[i+5].pop)*100) + "%";
    while(dateOnly == data.list[i].dt_txt.split(" ")[0])
    {
      if(tempmax < data.list[i].main.temp_max)
        tempmax=data.list[i].main.temp_max;
      if(tempmin > data.list[i].main.temp_min)
        tempmin=data.list[i].main.temp_min;
      i++;
    }
    dateOnly = data.list[i].dt_txt.split(" ")[0];
    document.querySelector(".max1").innerHTML=Math.round(tempmax) + "°C";
    document.querySelector(".min1").innerHTML=Math.round(tempmin) + "°C";
    Icon = document.querySelector(".weather-icon1");
    if(data.list[i-5].weather[0].main=="Clouds")
        Icon.src="assets/clouds.png";
    if(data.list[i-5].weather[0].main=="Clear")
      Icon.src="assets/clear.png";
    if(data.list[i-5].weather[0].main=="Rain")
        Icon.src="assets/rain.png";
    if(data.list[i-5].weather[0].main=="Mist")
        Icon.src="assets/mist.png";
    if(data.list[i-5].weather[0].main=="Drizzle")
        Icon.src="assets/drizzle.png";
    if(data.list[i-5].weather[0].main=="Snow")
        Icon.src="assets/snow.png";

    //Day 2
    console.log(dateOnly);
    tempmax=data.list[i].main.temp_max;
    tempmin=data.list[i].main.temp_min;
    document.querySelector(".humid2").innerHTML=data.list[i+5].main.humidity + "%";
    document.querySelector(".rain2").innerHTML=Math.round((data.list[i+5].pop)*100) + "%";
    while(dateOnly == data.list[i].dt_txt.split(" ")[0])
    {
      if(tempmax < data.list[i].main.temp_max)
        tempmax=data.list[i].main.temp_max;
      if(tempmin > data.list[i].main.temp_min)
        tempmin=data.list[i].main.temp_min;
      i++;
    }
    dateOnly = data.list[i].dt_txt.split(" ")[0];
    document.querySelector(".max2").innerHTML=Math.round(tempmax) + "°C";
    document.querySelector(".min2").innerHTML=Math.round(tempmin) + "°C";
    Icon = document.querySelector(".weather-icon2");
    if(data.list[i-5].weather[0].main=="Clouds")
        Icon.src="assets/clouds.png";
    if(data.list[i-5].weather[0].main=="Clear")
      Icon.src="assets/clear.png";
    if(data.list[i-5].weather[0].main=="Rain")
        Icon.src="assets/rain.png";
    if(data.list[i-5].weather[0].main=="Mist")
        Icon.src="assets/mist.png";
    if(data.list[i-5].weather[0].main=="Drizzle")
        Icon.src="assets/drizzle.png";
    if(data.list[i-5].weather[0].main=="Snow")
        Icon.src="assets/snow.png";

    //Day 3
    console.log(dateOnly);
    tempmax=data.list[i].main.temp_max;
    tempmin=data.list[i].main.temp_min;
    document.querySelector(".humid3").innerHTML=data.list[i+5].main.humidity + "%";
    document.querySelector(".rain3").innerHTML=Math.round((data.list[i+5].pop)*100) + "%";
    while(dateOnly == data.list[i].dt_txt.split(" ")[0])
    {
      if(tempmax < data.list[i].main.temp_max)
        tempmax=data.list[i].main.temp_max;
      if(tempmin > data.list[i].main.temp_min)
        tempmin=data.list[i].main.temp_min;
      i++;
    }
    dateOnly = data.list[i].dt_txt.split(" ")[0];
    document.querySelector(".max3").innerHTML=Math.round(tempmax) + "°C";
    document.querySelector(".min3").innerHTML=Math.round(tempmin) + "°C";
    Icon = document.querySelector(".weather-icon3");
    if(data.list[i-5].weather[0].main=="Clouds")
        Icon.src="assets/clouds.png";
    if(data.list[i-5].weather[0].main=="Clear")
      Icon.src="assets/clear.png";
    if(data.list[i-5].weather[0].main=="Rain")
        Icon.src="assets/rain.png";
    if(data.list[i-5].weather[0].main=="Mist")
        Icon.src="assets/mist.png";
    if(data.list[i-5].weather[0].main=="Drizzle")
        Icon.src="assets/drizzle.png";
    if(data.list[i-5].weather[0].main=="Snow")
        Icon.src="assets/snow.png";

    //Day 4
    console.log(dateOnly);
    tempmax=data.list[i].main.temp_max;
    tempmin=data.list[i].main.temp_min;
    document.querySelector(".humid4").innerHTML=data.list[i+5].main.humidity + "%";
    document.querySelector(".rain4").innerHTML=Math.round((data.list[i+5].pop)*100) + "%";
    while(dateOnly == data.list[i].dt_txt.split(" ")[0])
    {
      if(tempmax < data.list[i].main.temp_max)
        tempmax=data.list[i].main.temp_max;
      if(tempmin > data.list[i].main.temp_min)
        tempmin=data.list[i].main.temp_min;
      i++;
    }
    dateOnly = data.list[i].dt_txt.split(" ")[0];
    document.querySelector(".max4").innerHTML=Math.round(tempmax) + "°C";
    document.querySelector(".min4").innerHTML=Math.round(tempmin) + "°C";
    Icon = document.querySelector(".weather-icon4");
    if(data.list[i-5].weather[0].main=="Clouds")
        Icon.src="assets/clouds.png";
    if(data.list[i-5].weather[0].main=="Clear")
      Icon.src="assets/clear.png";
    if(data.list[i-5].weather[0].main=="Rain")
        Icon.src="assets/rain.png";
    if(data.list[i-5].weather[0].main=="Mist")
        Icon.src="assets/mist.png";
    if(data.list[i-5].weather[0].main=="Drizzle")
        Icon.src="assets/drizzle.png";
    if(data.list[i-5].weather[0].main=="Snow")
        Icon.src="assets/snow.png";

    //Day 5
    console.log(dateOnly);
    tempmax=data.list[i].main.temp_max;
    tempmin=data.list[i].main.temp_min;
    document.querySelector(".humid5").innerHTML=data.list[i].main.humidity + "%";
    document.querySelector(".rain5").innerHTML=Math.round((data.list[i].pop)*100) + "%";
    while(i<=38)
    {
      if(tempmax < data.list[i].main.temp_max)
        tempmax=data.list[i].main.temp_max;
      if(tempmin > data.list[i].main.temp_min)
        tempmin=data.list[i].main.temp_min;
      i++;
    }
    document.querySelector(".max5").innerHTML=Math.round(tempmax) + "°C";
    document.querySelector(".min5").innerHTML=Math.round(tempmin) + "°C";
    Icon = document.querySelector(".weather-icon5");
    if(data.list[i-5].weather[0].main=="Clouds")
        Icon.src="assets/clouds.png";
    if(data.list[i-5].weather[0].main=="Clear")
      Icon.src="assets/clear.png";
    if(data.list[i-5].weather[0].main=="Rain")
        Icon.src="assets/rain.png";
    if(data.list[i-5].weather[0].main=="Mist")
        Icon.src="assets/mist.png";
    if(data.list[i-5].weather[0].main=="Drizzle")
        Icon.src="assets/drizzle.png";
    if(data.list[i-5].weather[0].main=="Snow")
        Icon.src="assets/snow.png";

    console.log('Current Temperature:', Math.round(data.list[0].main.temp), '°C');
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
  }
}

checkWeather(previousCity);

const observer = new MutationObserver(() => {
  const currentCity = resultContainer.textContent.trim();
  if (currentCity !== previousCity) {
    checkWeather(currentCity);
    previousCity = currentCity;
  }
});

const config = { childList: true, subtree: true, characterData: true };
observer.observe(resultContainer, config);

