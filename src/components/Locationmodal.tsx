import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setCoords } from "../store/slices/locationSlice";
import "./Locationmodal.css";
import pinIcon      from "../assets/icons/pin.png";
import exitIcon     from "../assets/icons/exit-button.png";
import arrowbackIcon from "../assets/icons/arrowback.png";

const CITIES = [
  { name: "Cairo",           nameAR: "القاهرة",      lat: 30.0444, lng: 31.2357 },
  { name: "Alexandria",      nameAR: "الإسكندرية",   lat: 31.2001, lng: 29.9187 },
  { name: "Giza",            nameAR: "الجيزة",        lat: 30.0131, lng: 31.2089 },
  { name: "Sharm El-Sheikh", nameAR: "شرم الشيخ",    lat: 27.9158, lng: 34.3300 },
  { name: "Hurghada",        nameAR: "الغردقة",       lat: 27.2579, lng: 33.8116 },
  { name: "Luxor",           nameAR: "الأقصر",        lat: 25.6872, lng: 32.6396 },
  { name: "Dubai",           nameAR: "دبي",           lat: 25.2048, lng: 55.2708 },
  { name: "Abu Dhabi",       nameAR: "أبوظبي",        lat: 24.4539, lng: 54.3773 },
  { name: "Riyadh",          nameAR: "الرياض",        lat: 24.7136, lng: 46.6753 },
  { name: "Jeddah",          nameAR: "جدة",           lat: 21.4858, lng: 39.1925 },
  { name: "Kuwait City",     nameAR: "مدينة الكويت",  lat: 29.3759, lng: 47.9774 },
  { name: "Beirut",          nameAR: "بيروت",         lat: 33.8938, lng: 35.5018 },
  { name: "Amman",           nameAR: "عمّان",          lat: 31.9454, lng: 35.9284 },
  { name: "Doha",            nameAR: "الدوحة",        lat: 25.2854, lng: 51.5310 },
  { name: "Casablanca",      nameAR: "الدار البيضاء", lat: 33.5731, lng: -7.5898 },
];

interface Props { onClose: () => void; }

function LocationModal({ onClose }: Props) {
  const dispatch    = useAppDispatch();
  const currentCity = useAppSelector((s) => s.location.city);

  const defaultCity = CITIES.find((c) => c.name === currentCity) || CITIES[0];
  const [selectedCity, setSelectedCity] = useState(defaultCity);
  const [confirmed, setConfirmed] = useState(false);

  // Real OSM map URL centered on selected city
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${selectedCity.lng-0.05},${selectedCity.lat-0.04},${selectedCity.lng+0.05},${selectedCity.lat+0.04}&layer=mapnik&marker=${selectedCity.lat},${selectedCity.lng}`;

  function handleCityChange(cityName: string) {
    const city = CITIES.find((c) => c.name === cityName);
    if (city) { setSelectedCity(city); setConfirmed(false); }
  }

  function handleConfirm() {
    dispatch(setCoords({ lat: selectedCity.lat, lng: selectedCity.lng, city: selectedCity.name }));
    setConfirmed(true);
    setTimeout(onClose, 400);
  }

  const cityLabel = selectedCity.name;

  return (
    <div className="location-overlay" onClick={onClose}>
      <div className="location-modal" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="location-modal-header">
          <button className="location-back" onClick={onClose}>
            <img src={arrowbackIcon} alt="back"/>
          </button>
          <h2>{"Add new address"}</h2>
          <button className="location-close" onClick={onClose}>
            <img src={exitIcon} alt="close"/>
          </button>
        </div>

        {/* Real OSM Map */}
        <div className="map-container">
          <iframe
            title="delivery-map"
            src={mapSrc}
            className="map-iframe"
            scrolling="no"
          />
          <div className="map-overlay-pin">
            <div className="map-pin-tooltip">{"Your order will be delivered here"}</div>
            <img src={pinIcon} alt="pin" className="map-pin-img"/>
          </div>
          <div className="map-zoom-btns">
            <button>+</button>
            <button>−</button>
          </div>
        </div>

        {/* Current location row */}
        <div className="current-location-row">
          <img src={pinIcon} alt="pin" className="cur-loc-pin-img"/>
          <div className="cur-loc-info">
            <p className="cur-loc-label">{"CURRENT LOCATION"}</p>
            <p className="cur-loc-city">{cityLabel}</p>
            <p className="cur-loc-detail">{selectedCity.lat.toFixed(4)}, {selectedCity.lng.toFixed(4)}</p>
          </div>
          <button className="location-confirm-btn" onClick={handleConfirm}>
            {confirmed ? "✓ Done" : "CONFIRM LOCATION"}
          </button>
        </div>

        {/* City selector */}
        <div className="city-selector-row">
          <label>{"City"}</label>
          <select
            value={selectedCity.name}
            onChange={(e) => handleCityChange(e.target.value)}
          >
            {CITIES.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

      </div>
    </div>
  );
}

export default LocationModal;