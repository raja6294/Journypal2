import React, { useEffect, useRef, useState } from "react";
import { GoogleMap, Marker, Circle, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = { lat: 22.5726, lng: 88.3639 }; // Kolkata fallback

export default function LiveSafetyMap() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCRA2Gs0HAYOeauLoHWCyjuErD0Iljwxuw",
  });

  const [position, setPosition] = useState(null);
  const [accuracy, setAccuracy] = useState(50);
  const [error, setError] = useState("");
  const mapRef = useRef(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported by browser");
      return;
    }

    let watchId;
    const geoOptions = { enableHighAccuracy: true, maximumAge: 0, timeout: 15000 };

    function updatePosition(pos) {
      setPosition({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
      setAccuracy(pos.coords.accuracy);
      setError("");
    }

    function geoError(err) {
      if (err.code === 1) setError("Permission denied");
      else if (err.code === 2) setError("Position unavailable");
      else if (err.code === 3) setError("Timeout");
      else setError(err.message || "Unknown error");
    }

    navigator.geolocation.getCurrentPosition(updatePosition, geoError, geoOptions);
    watchId = navigator.geolocation.watchPosition(updatePosition, geoError, geoOptions);

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <div style={{ position: "relative" }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={position || defaultCenter}
        zoom={position ? 15 : 7}
       onLoad={map => { mapRef.current = map; }}
      >
        {position && (
          <>
            <Marker position={position} />
            <Circle center={position} radius={accuracy} options={{
              strokeColor: "#1E90FF",
              strokeOpacity: 0.6,
              strokeWeight: 2,
              fillColor: "#1E90FF",
              fillOpacity: 0.12,
            }} />
          </>
        )}
      </GoogleMap>
      <div style={{
        position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)",
        background: "rgba(0,0,0,0.7)", color: "#fff", padding: "10px 14px", borderRadius: 8,
        zIndex: 1000, minWidth: 260, fontSize: 13, boxShadow: "0 6px 18px rgba(0,0,0,0.25)"
      }}>
        <div>
          <b>Live Location</b> — {error ? <span style={{ color: "#ffdd57" }}>{error}</span> : "Tracking…"}
        </div>
        <div style={{ marginTop: 6 }}>
          Lat: <span>{position ? position.lat.toFixed(6) : "-"}</span> — Lng: <span>{position ? position.lng.toFixed(6) : "-"}</span><br />
          Accuracy: <span>{accuracy ? accuracy.toFixed(1) : "-"}</span> m
        </div>
      </div>
    </div>
  );
}