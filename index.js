const form = document.querySelector("form");
const inputEl = document.querySelector(".inputEl");
const mainBox = document.querySelector(".MainBox");

const ApiKey = '80185917f30a9653b2f67d1805e8fb09';

form.addEventListener("submit",(e) => {
    e.preventDefault();
    const city = inputEl.value;
    getWeather(city);
})

async function getWeather(city){
    try {

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}&units=metric`);
        const data = await response.json();

        if(!response.ok){
            console.log("Response not ok");
            notFound();
            return;
        }
            mainBox.innerHTML = `<div class="MainBoxLeft box">
            <iframe src="https://embed.lottiefiles.com/animation/4804"></iframe>
            <h2 class="degree">30°C </h2>
            <h3 class="date"><span class="day">Monday</span>, <span class="hour"><span class="h">12</span>:<span class="m">35</span></span></h3>
            <h2 class="status">Clear sky</h2>
            </div>
            <div class="MainBoxRight">
            <h2 class="title">Today's Highlights :</h2>
            <div class="hContainer">
                <div class="box Highlights">
                    <span>Humidity</span>
                    <h2 class="humidity">32%</h2>
                </div>
                <div class="box Highlights">
                    <span>Wind speed</span>
                    <h2 class="windSpeed">1.33 m/s</h2>
                </div>
                <div class="box Highlights">
                    <span>Visibility</span>
                    <h2 class="visibility">10.0km</h2>
                </div>
                <div class="box Highlights">
                    <span>pressure</span>
                    <h2 class="pressure">4</h2>
                </div>
            </div>
            </div>`;

        /* DAY + HOUR */
            const day = document.querySelector(".day");
            const time = document.querySelector(".hour");
            const hour = document.querySelector(".h");
            const minutes = document.querySelector(".m");
            const weekDays=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
            const d = new Date();
            day.innerHTML = weekDays[d.getDay()];
            
        /* DEGREE */
        const degree = document.querySelector(".degree");
        degree.innerHTML = Math.round(data.main.temp)+"°C" ;

        /* DESCRIPTION */
        const SkyStatus = document.querySelector(".status");
        SkyStatus.innerHTML = data.weather[0].description;

        /* HUMIDITY */
        const humidity = document.querySelector(".humidity");
        humidity.innerHTML = data.main.humidity+"%";

        /* WIND SPEED */
        const windSpeed = document.querySelector(".windSpeed");
        windSpeed.innerHTML = data.wind.speed+"m/s";

        /* VISIBILITY */
        const visibility = document.querySelector(".visibility");
        visibility.innerHTML = data.visibility+"m";

        /* PRESSURE */
        const pressure = document.querySelector(".pressure");
        pressure.innerHTML = data.main.pressure+"hPa";

        /* Icons */
        const Icon = document.querySelector("iframe");

        const IconsUrl = {
            "01d":"https://embed.lottiefiles.com/animation/4804",
            "01n":"https://embed.lottiefiles.com/animation/4799",
            "02d":"https://embed.lottiefiles.com/animation/4800",
            "02n":"https://embed.lottiefiles.com/animation/4796",
            "03d":"https://embed.lottiefiles.com/animation/4806",
            "03n":"https://embed.lottiefiles.com/animation/4806",
            "04d":"https://embed.lottiefiles.com/animation/4791",
            "04n":"https://embed.lottiefiles.com/animation/4806",
            "09d":"https://embed.lottiefiles.com/animation/4803",
            "09n":"https://embed.lottiefiles.com/animation/4803",
            "10d":"https://embed.lottiefiles.com/animation/4801",
            "10n":"https://embed.lottiefiles.com/animation/4797",
            "11d":"https://embed.lottiefiles.com/animation/4805",
            "11n":"https://embed.lottiefiles.com/animation/4805",
            "13d":"https://embed.lottiefiles.com/animation/4802",
            "13n":"https://embed.lottiefiles.com/animation/4798",
            "50d":"https://embed.lottiefiles.com/animation/4795",
            "50n":"https://embed.lottiefiles.com/animation/4795",
        }

        const iconUrl = IconsUrl[data.weather[0].icon];

        if (iconUrl) {
            Icon.setAttribute("src", iconUrl);
        } else {
            console.error(`Invalid weather icon value: ${data.weather[0].icon}`);
        }



    } catch (error) {
        notFound();
        console.error(error);
    }
}

function notFound(){
    mainBox.innerHTML = `<img src="/assets/pablo-weather-forecast.png">`;
}

