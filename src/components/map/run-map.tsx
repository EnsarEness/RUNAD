"use client";

import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  CircleMarker,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { cn } from "@/lib/utils";

type LatLng = [number, number];

type RunMapProps = {
  positions: LatLng[];
  center?: LatLng;
  zoom?: number;
  height?: string;
  className?: string;
  followUser?: boolean;
  showMarkers?: boolean;
  interactive?: boolean;
};

function MapFollower({ position }: { position: LatLng | null }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.panTo(position, { animate: true, duration: 0.5 });
    }
  }, [map, position]);
  return null;
}

function MapBoundsAdjuster({ positions }: { positions: LatLng[] }) {
  const map = useMap();
  useEffect(() => {
    if (positions.length >= 2) {
      const L = require("leaflet");
      const bounds = L.latLngBounds(positions);
      map.fitBounds(bounds, { padding: [30, 30] });
    }
  }, [map, positions]);
  return null;
}

export function RunMap({
  positions,
  center,
  zoom = 15,
  height = "h-64",
  className,
  followUser = false,
  showMarkers = true,
  interactive = true,
}: RunMapProps) {
  const mapCenter = center ?? positions[positions.length - 1] ?? [40.18, 26.41];
  const hasRoute = positions.length >= 2;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/[0.06]",
        height,
        className
      )}
    >
      <MapContainer
        center={mapCenter}
        zoom={zoom}
        className="h-full w-full"
        zoomControl={false}
        attributionControl={false}
        dragging={interactive}
        scrollWheelZoom={interactive}
        touchZoom={interactive}
        doubleClickZoom={interactive}
      >
        <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />

        {hasRoute && (
          <Polyline
            positions={positions}
            pathOptions={{
              color: "#a855f7",
              weight: 4,
              opacity: 0.9,
              lineCap: "round",
              lineJoin: "round",
            }}
          />
        )}

        {showMarkers && positions.length > 0 && (
          <>
            {/* Start marker */}
            <CircleMarker
              center={positions[0]}
              radius={7}
              pathOptions={{
                color: "#22c55e",
                fillColor: "#22c55e",
                fillOpacity: 1,
                weight: 2,
              }}
            />
            {/* Current / End marker */}
            {positions.length > 1 && (
              <CircleMarker
                center={positions[positions.length - 1]}
                radius={7}
                pathOptions={{
                  color: "#a855f7",
                  fillColor: "#a855f7",
                  fillOpacity: 1,
                  weight: 2,
                }}
              />
            )}
          </>
        )}

        {followUser && (
          <MapFollower
            position={positions.length > 0 ? positions[positions.length - 1] : null}
          />
        )}

        {!followUser && hasRoute && (
          <MapBoundsAdjuster positions={positions} />
        )}
      </MapContainer>

      {/* Gradient overlay at edges */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/[0.06]" />
    </div>
  );
}
