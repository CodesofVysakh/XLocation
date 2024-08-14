import React, { useEffect, useState } from "react";
import axios from "axios";

function Location() {
    const [countryData, setCountryData] = useState([]);
    const [stateData, setStateData] = useState([]);
    const [cityData, setCityData] = useState([]);
    const [countrySelected, setCountrySelected] = useState("");
    const [stateSelected, setStateSelected] = useState("");
    const [citySelected, setCitySelected] = useState("");
    const handleGetCountry = () => {
        axios
            .get("https://crio-location-selector.onrender.com/countries")
            .then((response) => {
                setCountryData(response.data);
                setStateData([]);
                setStateSelected("");
                setCityData([]);
                setCitySelected("");
            })
            .catch((error) => {
                alert("Something went wrong!")
            })
    }
    const handleGetState = (country) => {
        axios
            .get(`https://crio-location-selector.onrender.com/country=${country}/states `)
            .then((response) => {
                setStateData(response.data);
                setCityData([]);
                setCitySelected("");
            })
    }
    const handleGetCity = (country, state) => {
        axios
            .get(` https://crio-location-selector.onrender.com/country=${country}/state=${state}/cities`)
            .then((response) => {
                setCityData(response.data);
            })
    }

    useEffect(() => {
        handleGetCountry();
    }, [])
    
    return (
        <div className="main-container">
            <h3>Select Location</h3>
            <div className="selection-container">
                <select name="Country" id="country" onChange={(e) => {
                        handleGetState(e.target.value)
                        setCountrySelected(e.target.value);}}>
                    <option value="default">Select Country</option>
                    {countryData.map((country, index) => 
                    <option value={country}>{country}</option>
                    )}
                </select>
                <select name="State" id="state"
                disabled={stateData.length <= 0}
                onChange={(e) => {
                    handleGetCity(countrySelected, e.target.value);
                    setStateSelected(e.target.value)
                }}>
                    <option value="default">Select State</option>
                    {stateData.map((state, index) => 
                    <option value={state} >{state}</option>
                    )}
                </select>
                <select name="City" id="city"
                disabled={cityData.length <= 0}
                onChange={(e) => {
                    setCitySelected(e.target.value)
                }}>
                    <option value="default">Select City</option>
                    {cityData.map((city, index) => 
                    <option value={city} >{city}</option>
                    )}
                </select>
            </div>
            {
                countrySelected && stateSelected && citySelected &&
                <p>You selected <span style={{ fontSize: "20px", fontWeight: "bold" }}>{citySelected}</span>, {stateSelected}, {countrySelected}</p>
            }
        </div>
    );
}

export default Location;
