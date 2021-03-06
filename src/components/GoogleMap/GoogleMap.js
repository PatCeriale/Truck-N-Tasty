import React, { Component } from "react";
import { Router, Link } from "react-router-dom";
import { Map, Marker, GoogleApiWrapper, InfoWindow } from "google-maps-react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { getGeolocation, getTrucks } from "../../utils/Api";
//note: code formatted for ES6 here
export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      mapCenter: {
        lat: 47.606,
        lng: -122.33,
      },
      foodTrucks: [],
    };
  }
  handleChange = (address) => {
    this.setState({ address });
  };
  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
    console.log(this.state.selectedPlace);
  };
  onClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };
  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };
  handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        console.log("Success", latLng);
        // api call for food truck
        this.setState({ address });
        this.setState({ mapCenter: latLng });
        getGeolocation(address).then((data) => {
          console.log(data);
          var location =
            data.data.results[0].geometry.location.lat +
            "," +
            data.data.results[0].geometry.location.lng;
          console.log("======================================");
          console.log(address);
          console.log(location);
          console.log("======================================");
          getTrucks(location).then((res) => {
            console.log("======================================");
            console.log(res);
            console.log("======================================");
            const results = res.data.results.map((r) => ({
              name: r.name,
              icon2: r.icon,
              status: r.business_status,
              place: r.place_id,
              lat: r.geometry.location.lat,
              lng: r.geometry.location.lng,
            }));
            this.setState({ foodTrucks: results });
            this.props.setFoodTrucks(results);
          });
        });
        console.log({ address });
        // axios request for pins
      })
      .catch((error) => console.error("Error", error));
  };
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.state.mapCenter.lat === nextState.mapCenter.lat) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }
  render() {
    const mapStyle = {
      width: "95%",
      height: "65%",
      "margin-left": "auto",
      "margin-right": "auto",
      "margin-top": "10px",
      //"z-index": "-1",
      position: "absolute",
    };
    // const suggestionStyle ={
    //    "z-index": "-1",
    // }
    return (
      <div id="googleMap">
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: "Search Places ...",
                  className: "location-search-input",
                })}
              />
              <div
                className="autocomplete-dropdown-container"
                // style={suggestionStyle}
              >
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion) => {
                  const className = suggestion.active
                    ? "suggestion-item-active"
                    : "suggestion-item";
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? {
                        backgroundColor: "aqua",
                        cursor: "pointer",
                        marginLeft: "30px",
                        width: "260px",
                      }
                    : {
                        backgroundColor: "#FFFFFF",
                        cursor: "pointer",
                        marginLeft: "30px",
                        width: "260px",
                      };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
        <Map
          style={mapStyle}
          google={this.props.google}
          initialCenter={{
            lat: this.state.mapCenter.lat,
            lng: this.state.mapCenter.lng,
          }}
          center={{
            lat: this.state.mapCenter.lat,
            lng: this.state.mapCenter.lng,
          }}
          onClick={this.onMapClicked}
          zoom={14}
        >
          <Marker
            position={{
              lat: this.state.mapCenter.lat,
              lng: this.state.mapCenter.lng,
            }}
            // icon={{
            //   url: "/TruckNTastyPin.svg",
            //   scaledSize: new window.google.maps.Size(100, 100),
            // }}
          />
          {this.state.foodTrucks.map((foodTruck) => {
            console.log(foodTruck);
            return (
              <Marker
                position={{
                  lat: foodTruck.lat,
                  lng: foodTruck.lng,
                }}
                // icon={{
                //   url: "/TruckNTastyPin.svg",
                //   scaledSize: new window.google.maps.Size(100, 100),
                // }}
                onClick={this.onMarkerClick}
                truckName={foodTruck.name}
                truckStatus={foodTruck.status}
                truckPlaceId={foodTruck.place}
              />
            );
          })}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            <div>
              <h3>{this.state.selectedPlace.truckName}</h3>
              <p>Status: {this.state.selectedPlace.truckStatus}</p>
              <p>
                {/* <Router>
                  <Link
                    to={"/truck?id=" + this.state.selectedPlace.truckPlaceId}
                  >
                    Website
                  </Link>
                </Router> */}
              </p>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyCuN1lJcst4n7Y8RM3vGqbrHk-FLLJj6xc",
})(MapContainer);
