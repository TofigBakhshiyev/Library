import React, { Component } from 'react'; 
import mapboxgl from 'mapbox-gl'  
import axios from 'axios';
import ReactMapGL, { Marker } from 'react-map-gl';

// Components 
import AppBar from './Appbar'
import Pin from './pin'

mapboxgl.accessToken = 'API_Token'


/* class Maps extends Component {
    constructor(props) {
        super(props);  
        this.state = {
            lng: 5,
            lat: 34,
            zoom: 8, 
            location: ''
        }
    }   
    componentDidMount() {
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [point.features[0].center[0], point.features[0].center[1]],
            zoom: this.state.zoom
        })
        new mapboxgl.Marker().setLngLat(point.features[0].center).addTo(map) 
    }
    render() {
        return (
            <div>
                <div className='sidebarStyle'>
                    <p>Maps</p>
                    <div id="map" />
                </div>
            </div>
        )
    }
} */ 


class Maps extends Component { 
    constructor(props) {
        super(props);
        this.routeParam = props.match.params.location;
        this.state = {
            viewport: {
                width: 1000,
                height: 500,
                latitude: 37.7577,
                longitude: -122.4376,
                zoom: 10
            },
            center: {
                latitude: 0,
                longitude: 0
            }
        }
    }
    componentDidMount() {    
        console.log(this.routeParam)  
        const location = this.routeParam 
        this.setState({ location })
        axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${mapboxgl.accessToken}`)
        .then(res => {
            const point = res.data;
            console.log(point.features[0].center) 
            const newviewport = {
                width: this.state.viewport.width,
                height: this.state.viewport.height,
                latitude: point.features[0].center[1],
                longitude: point.features[0].center[0],
                zoom: this.state.viewport.zoom
            }
            this.setState({ viewport: newviewport }); 
            const Citycenter = {
                latitude: point.features[0].center[1],
                longitude: point.features[0].center[0]
            }
            this.setState({ center: Citycenter })
            console.log('Center:',this.state.center)
        })
    }
    render() {
        return (
            <div>
                <div id="nav">
                <AppBar/>
                </div>
                
                <div id="main">  
                    <h1>Location of Event on the Map</h1> 
                    <div id="map_main">
                    <ReactMapGL mapboxApiAccessToken={mapboxgl.accessToken} mapStyle='mapbox://styles/mapbox/streets-v11'
                    {...this.state.viewport}
                    NavigationControl onViewportChange={(viewport) => this.setState({viewport})} >
                        <Marker 
                            latitude={this.state.center.latitude}
                            longitude={this.state.center.longitude}
                        >
                            <Pin size={20} />
                        </Marker>
                    </ReactMapGL>
                    </div> 
                </div> 
            </div>
        )
    }
}
  

export default Maps
