import React, { Component } from 'react';
import '../App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isFetching: true
    };
  }

  componentDidMount() {
    this.setState({ isFetching: true });

    navigator.geolocation.getCurrentPosition(function(position) {
      fetch(`/api/location/search/?lattlong=(${position.coords.latitude}),(${position.coords.longitude})`)
        .then(response => response.json())
        .then(json => json[0].woeid)
        .then(woeid => {
          fetch(`/api/location/${woeid}`)
            .then(reqponse => response.json())
            .then(json => {

            })
        }
        )  
    });



        let rates = Object.keys(json.rates).map(function(el) {
          return `${el}: ${json.rates[el]}`;
        });

        this.setState({
          rates,
          currencies
        });
      });
    });
  }

  render() {
    return (
      <div className="App">

      </div>
    );
  }
}

export default App;
