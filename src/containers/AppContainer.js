import React, { Component } from "react";
import App from '../components/App';

const baseUrl = 'https://www.metaweather.com/api/location'

class AppContainer extends Component {
  constructor() {
    super();
    this.state = {
      isFetching: true
    };
  }



  componentDidMount() {
    navigator.geolocation.getCurrentPosition(function(position) {
      fetch(
        `${baseUrl}/search/?lattlong=${position.coords.latitude},${position.coords.longitude}`
      )
        .then(response => response.json())
        .then(json => json[0].woeid)
        .then(woeid => {
          fetch(`${baseUrl}/${woeid}`)
            .then(response => response.json())
            .then(json => {
              const {
                min_temp,
                max_temp,
                the_temp,
                weather_state_abbr
              } = json.consolidated_weather[0];

              const { city } = json;

              this.setState({
                isFetching: false,
                city,
                min_temp,
                max_temp,
                the_temp,
                weather_state_abbr
              });
            });
        });
    });
  }

  render() {
    return <App {...this.state} />;
  }
}

export default AppContainer;
