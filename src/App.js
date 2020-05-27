import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';
import "./App.css";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';


export default class App extends Component {

  constructor(props){
    super(props)
    this.state={
      weatherResult:null,
      weatherResultFive:null,
    }
  }

  getCity = async (city) =>{
    let apiKey = process.env.REACT_APP_APIKEY
    let url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`
    let data = await fetch(url)
    let result = await data.json()
    let urlFive =`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`
    let dataFive = await fetch(urlFive)
    let resultFive = await dataFive.json()
    console.log("whats the result", result)
    this.setState({weatherResult:result})
    console.log("whats the result for five", resultFive)
    this.setState({weatherResultFive:resultFive})
  }

getCurrentWeather = async (lon,lat) =>{
  let apiKey = process.env.REACT_APP_APIKEY
  let url =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`

  let urlFive =`https://api.openweathermap.org/data/2.5/forecast?q="ho chi minh city"&appid=${apiKey}&units=imperial`
  let dataFive = await fetch(urlFive)
  let resultFive = await dataFive.json()
  let data = await fetch(url)
  let result = await data.json()
  console.log("whats the result", result)
  this.setState({weatherResult:result})
  console.log("whats the result for five", resultFive)
  this.setState({weatherResultFive:resultFive})
}

getLocation  = () => {
  navigator.geolocation.getCurrentPosition((post) => {
    this.getCurrentWeather(post.coords.longitude, post.coords.latitude)
  })
}
componentDidMount(){
  this.getLocation()
}


  render() {
    let cityBack= ''

    if(this.state.weatherResult == null){
      return(<div className="spinner"><div><Spinner className="spinner-top" variant="primary" animation="border" /></div></div>)
    }
    if(this.state.weatherResultFive == null){
      return(<div className="spinner"><div><Spinner className="spinner-top" variant="primary" animation="border" /></div></div>)
    }
    if(this.state.weatherResult.name == "San Antonio"){
      cityBack = "sanantonio"
    }else if (this.state.weatherResult.name == "San Fransisco"){
      cityBack = "sanfransisco"
    }else {
      cityBack = "current"
    }
    let something 
    let something2
    let something3
    let something4
    let something5

    let somethingTemp
    let somethingTemp2
    let somethingTemp3
    let somethingTemp4
    let somethingTemp5
    let notAvail
    let tempColor

    if(this.state.weatherResultFive.cod == 404){
      something = ''
      something2 = ''
      something3 = ''
      something4 = ''
      something5 = ''
      somethingTemp =''
      somethingTemp2=''
      somethingTemp3=''
      somethingTemp4=''
      somethingTemp5=''
    } else {
      something = this.state.weatherResultFive.list[0].dt_txt 
      somethingTemp = this.state.weatherResultFive.list[0].main.temp
      something2 = this.state.weatherResultFive.list[1].dt_txt 
      somethingTemp2 = this.state.weatherResultFive.list[1].main.temp
      something3 = this.state.weatherResultFive.list[2].dt_txt 
      somethingTemp3 = this.state.weatherResultFive.list[2].main.temp
      something4 = this.state.weatherResultFive.list[3].dt_txt 
      somethingTemp4 = this.state.weatherResultFive.list[3].main.temp
      something5 = this.state.weatherResultFive.list[4].dt_txt 
      somethingTemp5 = this.state.weatherResultFive.list[4].main.temp
    }
    if (something == ''){
      notAvail = 'Not Available for this Region'
    }else{
      notAvail = 'Hourly Forecast'
    }

    if (this.state.weatherResult.main.temp > 85){
      tempColor = 'text-danger'
    }else if (this.state.weatherResult.main.temp < 35){
      tempColor = 'text-primary'
    }else{
      tempColor = 'text-white'
    }


    return (
    <div>
    <div className={`App ${cityBack}`}>
        <div className="box-back container-fluid text-white my-auto">
        <div className="container mx-auto my-4 py-4">
          <div className="row justify-content-center text-center">
            <h1 className="col-12 display-4 my-2 py-3 text-white">
              Derek's Awesome Weather App
            </h1>
            <h2 className="col-12">{this.state.weatherResult.name}</h2>
            <h3 className={`col-12 ${tempColor}`}>{this.state.weatherResult.main.temp}°F</h3>
            <h3 className="col-12">{this.state.weatherResult.weather[0].description}</h3>

            <Button variant="primary" className="button" onClick={()=>this.getLocation()}value="current">Current Location</Button>
            <Button variant="primary" className="button" onClick={()=>this.getCity("san antonio")} value="sanantonio">San Antonio</Button>
            <Button variant="primary" className="button" onClick={()=>this.getCity("san fransisco")} value ="sanfransisco">San Fransisco</Button>

          </div>
        </div>
      </div>
    </div>
    <div className="row text-center">
      <h1 className="col">  <Badge pill variant="primary">{`${notAvail}`}</Badge>{' '}</h1>
    </div>
    <div>
    <Row>
    <Col>
    <ul>
      <li>{`${something}`}</li>
      <h3><li>{`${somethingTemp}°F`}</li></h3>
    </ul>
    </Col>
    <Col>
    <ul>
      <li>{`${something2}`}</li>
      <h3><li>{`${somethingTemp2}°F`}</li></h3>
    </ul>
    </Col>
    <Col>
    <ul>
      <li>{`${something3}`}</li>
      <h3><li>{`${somethingTemp3}°F`}</li></h3>
    </ul>
    </Col>
    <Col>
    <ul>
      <li>{`${something4}`}</li>
      <h3><li>{`${somethingTemp4}°F`}</li></h3>
    </ul>
    </Col>
    <Col>
    <ul>
      <li>{`${something5}`}</li>
      <h3><li>{`${somethingTemp5}°F`}</li></h3>
    </ul>
    </Col>
    </Row>
    </div>
    </div>



    )
  }
}
