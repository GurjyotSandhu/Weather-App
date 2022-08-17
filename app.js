const key = "v6fWFdQoy5h3xlFpB2i_N3tlrh59vkHX-t-VgfwbvxE";
const weatherKey = "bbcbb896844c3c0734ae10ccf40dc4c1";
const city = "";

async function unsplash(city){
    try{
        let resolvedValue = await fetch(`https://api.unsplash.com/photos/random/?query=${city}&client_id=${key}&h=1920&orientation=landscape`);
        const data = await resolvedValue.json();
        const result = data.urls.regular;
        document.body.style.backgroundImage = `url('${result}')`;
        console.log(data);
    }
    catch(error){
        console.log(error);
    }
} 

async function fetchWeather(city) {
    try{
        let response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + `${city}` + "&units=metric"+ `&APPID=${weatherKey}`);
        const jsondata = await response.json();
        const {name} = jsondata;
        const {icon, description} = jsondata.weather[0];
        const {temp, humidity }= jsondata.main;
        const {speed} = jsondata.wind;
        const test = document.querySelector(".icon");
        document.querySelector(".temperature-value").innerText = "Temperature: " + temp + "°C";
        document.querySelector(".city").innerText = "Weather in " + name;
        test.src = `https://openweathermap.org/img/wn/${icon}.png`;
        console.log(test);
        document.querySelector(".description").innerText = description;
        document.querySelector(".humidity").innerText = "Humidity: " + humidity;
        document.querySelector(".wind").innerText = "Wind speed: " + speed;
    } catch(err){
        console.log(err);
    }
}

function show(){
    fetchWeather(document.querySelector("#input").value);
    unsplash(document.querySelector("#input").value);
}

document.querySelector(".search-btn").addEventListener('click', function (){
    show();
})

fetchWeather("tokyo");
unsplash("tokyo")
