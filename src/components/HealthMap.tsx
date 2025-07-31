import { useMemo } from "react";
import { Map, NavigationControl, useControl } from "react-map-gl/maplibre";
import { GeoJsonLayer } from "deck.gl";
import {
  MapboxOverlay as DeckOverlay,
  type MapboxOverlayProps,
} from "@deck.gl/mapbox";
import "maplibre-gl/dist/maplibre-gl.css";

import { useQueryWhoIndicator } from "@/hooks/useWhoQueryIndicator";
import { MapFilterPanel } from "./MapFilterPanel";

// GeoJSON with country borders
const COUNTRY_BORDERS =
  "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_0_countries.geojson";

const INITIAL_VIEW_STATE = {
  latitude: 20,
  longitude: 0,
  zoom: 1.5,
  bearing: 0,
  pitch: 0,
};

const MAP_STYLE =
  "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";

function DeckGLOverlay(props: MapboxOverlayProps) {
  const overlay = useControl(() => new DeckOverlay(props));
  overlay.setProps(props);
  return null;
}

export function HealthMap() {
  const query = useQueryWhoIndicator("HIV_ARTCOVERAGE");

  const countryData = query.data || {};

  const layers = useMemo(
    () => [
      new GeoJsonLayer({
        id: "countries",
        data: COUNTRY_BORDERS,
        pickable: true,
        autoHighlight: true,
        highlightColor: [255, 0, 0, 40], // semi-transparent red
        stroked: false,
        filled: true,
        getLineColor: [80, 80, 80],
        getFillColor: (f) => {
          const value = countryData[f.properties.adm0_a3];
          if (value === undefined) return [0, 0, 0, 0]; // no fill

          // Example: Red intensity based on value (0–100)
          return [255, 0, 0, Math.min(255, value)];
        },
        lineWidthMinPixels: 1,
      }),
    ],
    [countryData]
  );

  return (
    <div className="relative w-full h-full">
      <Map initialViewState={INITIAL_VIEW_STATE} mapStyle={MAP_STYLE}>
        <DeckGLOverlay layers={layers} />
        <NavigationControl position="top-left" />
      </Map>

      <div className="absolute top-2 right-2 z-10">
        <MapFilterPanel />
      </div>
    </div>
  );
}
