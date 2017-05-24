import React, { Component } from 'react';
import App from '../components/App';

const baseUrl = 'https://www.metaweather.com/api/location';

class AppContainer extends Component {
  constructor() {
    super();
    this.state = {
      isFetching: true
    };
  }

  getSearchLocation(query) {
    return fetch(`${baseUrl}/search/?query=${query}`)
      .then(response => response.json())
      .then(json => json[0].woeid);
  }

  getLocalLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(position => {
        fetch(
          `${baseUrl}/search/?lattlong=${position.coords.latitude},${position.coords.longitude}`
        )
          .then(response => response.json())
          .then(json => resolve(json[0].woeid));
      });
    });
  }

  getWeather(woeid) {
    fetch(`${baseUrl}/${woeid}`)
      .then(response => response.json())
      .then(json => {
        const {
          min_temp,
          max_temp,
          the_temp,
          weather_state_abbr
        } = json.consolidated_weather[0];
        const city = json.title;

        this.setState({
          isFetching: false,
          city,
          min_temp,
          max_temp,
          the_temp,
          weather_state_abbr
        });
      });
  }

  componentDidMount() {
    this.getLocalLocation().then(woeid => {
      this.getWeather(woeid);
    });
  }

  render() {
    return <App {...this.state} />;
  }
}

export default AppContainer;
