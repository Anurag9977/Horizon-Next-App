"use client";

import { Country } from "@/utils/countries";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { icon } from "leaflet";
import CountryAndFlag from "./CountryAndFlag";
import SectionTitle from "./SectionTitle";

const iconURL =
  "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png";
const markerIcon = icon({
  iconUrl: iconURL,
  iconSize: [20, 30],
});

const defaultCoordinates: [number, number] = [51.505, -0.09];

function MapLocation({ countryDetails }: { countryDetails: Country }) {
  const { code, name, coordinates } = countryDetails;

  return (
    <section>
      <SectionTitle heading="Where you'll be" />
      <div className="my-4">
        <CountryAndFlag
          countryCode={code}
          countryName={name}
          subString={false}
          className="text-sm lg:text-base"
        />
      </div>
      <MapContainer
        center={coordinates || defaultCoordinates}
        zoom={7}
        scrollWheelZoom
        className="w-full h-96 rounded-lg relative z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={coordinates || defaultCoordinates} icon={markerIcon}>
          <Popup>Exact location provided after booking.</Popup>
        </Marker>
      </MapContainer>
    </section>
  );
}
export default MapLocation;
