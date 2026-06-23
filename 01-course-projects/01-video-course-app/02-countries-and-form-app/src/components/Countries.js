import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

export default function Countries() {
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);

    useEffect(() => {
        axios.get("https://date.nager.at/api/v3/AvailableCountries")
        .then((result) => {
            setCountries(result.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <div className="countries-container">
            <h2 className="countries-title">World Countries & Flags 🌍</h2>
            
           
            {selectedCountry && (
                <div className="details-box">
                    <h3 className="details-title">🗺️ Country Details</h3>
                    <div className="details-content">
                        <img 
                            src={`https://flagcdn.com/w80/${selectedCountry.countryCode.toLowerCase()}.png`} 
                            alt={selectedCountry.name} 
                            className="details-flag"
                        />
                        <div className="details-text">
                            <h3>{selectedCountry.name}</h3>
                            <p>Country Code: {selectedCountry.countryCode}</p>
                        </div>
                    </div>
                    <p className="details-link">
                        <a 
                            href={`https://en.wikipedia.org/wiki/${selectedCountry.name}`} 
                            target="_blank" 
                            rel="noreferrer"
                        >
                            Read more on Wikipedia →
                        </a>
                    </p>
                </div>
            )}

            
            <div className="countries-list">
                {countries && countries.map(country => {
                    return (
                        <div 
                            key={country.countryCode} 
                            className="country-item clickable-item"
                            onClick={() => setSelectedCountry(country)}
                        >
                            <img 
                                src={`https://flagcdn.com/w40/${country.countryCode.toLowerCase()}.png`} 
                                alt={country.name} 
                                className="country-flag"
                            />
                            <span className="country-name">{country.name}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}