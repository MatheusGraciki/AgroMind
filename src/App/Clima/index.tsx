import { useState, useEffect } from "react";
import { Input, Button } from "reactstrap";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

// Ícone do marcador padrão
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const initialPosition = { lat: -26.30443281860886, lng: -48.8579458137908 };

// Componente para clicar no mapa
function LocationMarker({
  position,
  setPosition,
  setLatLng,
}: {
  position: { lat: number; lng: number } | null;
  setPosition: (pos: { lat: number; lng: number }) => void;
  setLatLng: (pos: { lat: number; lng: number }) => void;
}) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      setLatLng(e.latlng);
    },
  });

  return position ? <Marker position={position} icon={markerIcon} /> : null;
}

// Componente de busca de endereço
function SearchBox({
  setPosition,
  setLatLng,
}: {
  setPosition: (pos: { lat: number; lng: number }) => void;
  setLatLng: (pos: { lat: number; lng: number }) => void;
}) {
  const [address, setAddress] = useState("");
  const map = useMap();

  const handleSearch = async () => {
    if (!address) return;

    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        address
      )}`;
      const response = await axios.get(url);
      const result = response.data[0];
      if (result) {
        const lat = parseFloat(result.lat);
        const lng = parseFloat(result.lon);
        const newPos = { lat, lng };
        setPosition(newPos);
        setLatLng(newPos);
        map.setView(newPos, 18);
      } else {
        alert("Endereço não encontrado");
      }
    } catch (error) {
      console.error(error);
      alert("Erro na busca do endereço");
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 10,
        left: 10,
        zIndex: 1000,
        background: "white",
        padding: "10px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.3)",
        width: "300px",
      }}
    >
      <Input
        placeholder="Digite o endereço..."
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <Button
        onClick={handleSearch}
        color="primary"
        style={{ marginTop: "8px", width: "100%" }}
      >
        Buscar
      </Button>
    </div>
  );
}

export default function Clima() {
  const [latLng, setLatLng] = useState(initialPosition);
  const [markerPos, setMarkerPos] = useState(initialPosition);
  const [mapType, setMapType] = useState<"streets" | "satellite">("streets");

  const handleLatLngChange = (field: "lat" | "lng", value: string) => {
    const num = parseFloat(value);
    if (!isNaN(num)) {
      const newPos = { ...latLng, [field]: num };
      setLatLng(newPos);
      setMarkerPos(newPos);
    }
  };

  // garantir altura total
  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.height = "100vh";
    document.documentElement.style.height = "100vh";
  }, []);

  return (
    <div style={{ height: "100vh", width: "100vw", position: "relative" }}>
      <MapContainer
        center={initialPosition}
        zoom={18}
        style={{ height: "100%", width: "100%" }}
      >
        <SearchBox setPosition={setMarkerPos} setLatLng={setLatLng} />

        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 1000,
            background: "white",
            padding: "10px",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0,0,0,0.3)",
          }}
        >
          <Input
            type="text"
            placeholder="Latitude..."
            value={latLng.lat}
            onChange={(e) => handleLatLngChange("lat", e.target.value)}
          />
          <Input
            type="text"
            placeholder="Longitude..."
            value={latLng.lng}
            onChange={(e) => handleLatLngChange("lng", e.target.value)}
            style={{ marginTop: "5px" }}
          />
          <div className="d-flex gap-2 mt-2">
            <Button
              color={mapType === "streets" ? "primary" : "secondary"}
              onClick={() => setMapType("streets")}
              size="sm"
              style={{ marginRight: "5px" }}
            >
              Ruas
            </Button>
            <Button
              color={mapType === "satellite" ? "primary" : "secondary"}
              onClick={() => setMapType("satellite")}
              size="sm"
            >
              Satélite
            </Button>
          </div>
        </div>

        <TileLayer
          url={
            mapType === "streets"
              ? "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              : "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          }
          attribution={
            mapType === "streets"
              ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              : "Tiles © Esri — Source: Esri, Maxar, Earthstar Geographics"
          }
        />
        <LocationMarker
          position={markerPos}
          setPosition={setMarkerPos}
          setLatLng={setLatLng}
        />
      </MapContainer>
    </div>
  );
}
