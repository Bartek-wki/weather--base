import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';
import ErrorBox from '../ErrorBox/ErrorBox';

const WeatherBox = props => {

  const [weatherData, setWeatherData] = useState('')
  const [pending, setPending] = useState(false)
  const [error, setError] = useState(false);
  
  const handleCityChange = useCallback(city => {
    setPending(true);
    
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8803ad50acff05fcc30ea0846e4c774e&units=metric`)
      .then(res => {
        if (res.status === 200) {
          return res.json()
          .then(data => {
            setWeatherData({
              city: data.name,
              temp: data.main.temp,
              icon: data.weather[0].icon,
              description: data.weather[0].main
            })
            setPending(false);
            setError(false);
          });
        } else {
          setError(true);
        }
      })
  }, []);
    
  return (
    <section>
      <PickCity action={handleCityChange} />
      {(weatherData && !pending) && <WeatherSummary weatherData={weatherData}/>}
      {(!weatherData && pending && !error) && <Loader />}
      {error && <ErrorBox />}
      
    </section>
  )
};

export default WeatherBox;