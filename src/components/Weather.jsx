import { useEffect, useState } from "react";
import "./weather.css"
import clouds from "../assets/cloud.png"
import rain from "../assets/rain.png"
import snow from "../assets/snow.png"
import drizzle from "../assets/drizzle.png"

const Weather = ({ apikey }) => {

    const [city, setCity] = useState("Tokyo")
    const [data, setData] = useState("");
    const [forecast, setForecast] = useState([]);
    const [loading, setLoading] = useState(false);

    const weatherImages = {
        'scattered clouds': clouds,
        "broken clouds": snow,
        "overcast clouds" : drizzle,
        "light rain" : rain,
        "default" : clouds,
    };


    async function getWeather() {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`)
            const data = await response.json();
            // console.log(data);
            setData(data)
            setLoading(true)

        } catch (error) {
            console.log(error);
        }
    }

    async function getForecast() {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}&units=metric`)
            const data = await response.json();
            // const list ;
            setForecast(data.list.slice(0, 3));

        } catch (error) {
            console.log(error);
        }
    }

    console.log(forecast);
    console.log(data);

    useEffect(() => {
        getWeather();
        getForecast();
    }, [city])


    return (
        <div>
            <div className="outer-box">
                <div>
                    <select onChange={(e) => setCity(e.target.value)}>
                        <option value="Tokyo">Tokyo</option>
                        <option value="Ho Chi Minh">Ho Chi Minh</option>
                        <option value="Singapore">Singapore</option>
                        <option value="Kuala Lumpur">Kaula Lumpur</option>
                        <option value="Athens">Athens</option>
                    </select>
                </div>
                <div className="result">
                    <div>
                        {!loading ? <p className="loading">loading...</p> :
                            <div>
                                {/* <img src={clouds} alt="" /> */}
                                <img src={weatherImages[data.weather[0].description] || weatherImages['default']} />

                                <h1>{data?.main.temp}°C</h1>
                                <p>{data?.weather[0].description}</p>
                                <div id="wind">
                                    <p>wind {data?.wind.speed}km/h</p>
                                    <p>humidity {data?.main.humidity}</p>
                                </div>
                            </div>
                        }
                    </div>
                    {
                        !loading ? "" : <div className="forecast">
                            {
                                forecast?.map(function (ele, index) {
                                    const date = new Date(ele.dt_txt);
                                    const dayOfWeek = date.getDay();
                                    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                                    const dayName = daysOfWeek[dayOfWeek];

                                    return <div key={index}>
                                        {/* <h2>day</h2> */}
                                        {/* <img src={clouds} alt="" /> */}
                                        <img src={weatherImages[ele.weather[0].description] || weatherImages['default']} />
                                        <h2>{dayName}</h2>
                                        <h3>{ele.main.temp}</h3>
                                        <h3>{ele.weather[0].description}</h3>
                                    </div>
                                })
                            }
                        </div>
                    }


                </div>
            </div>
        </div>
    )
}

export default Weather