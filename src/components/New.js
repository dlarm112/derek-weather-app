import React, { Component } from 'react'

export default class New extends Component {
    render(props) {
        return (
            <div>
            <h1 className="col-12 display-4 my-2 py-3 text-success">
              Derek's Awesome Weather App
            </h1>
            <h2 className="col-12">{this.state.weatherResult.name}</h2>
            <h3 className="col-12 text-danger">{this.state.weatherResult.main.temp}F</h3>
            <h3 className="col-12">{this.state.weatherResult.weather[0].description}</h3>
            </div>
        )
    }
}
