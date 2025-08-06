import { useEffect, useMemo, useState } from "react";
import { Map, NavigationControl, useControl } from "react-map-gl/maplibre";
import { GeoJsonLayer } from "deck.gl";
import {
  MapboxOverlay as DeckOverlay,
  type MapboxOverlayProps,
} from "@deck.gl/mapbox";
import "maplibre-gl/dist/maplibre-gl.css";

const NYC_BORDERS_URL =
  "https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/NYC_Borough_Boundary/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=pgeojson";
//"https://data.cityofnewyork.us/resource/pri4-ifjk.json";

const INITIAL_VIEW_STATE = {
  latitude: 40.7128,
  longitude: -74.006,
  zoom: 9,
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
  const [geojson, setGeojson] = useState(null);

  useEffect(() => {
    fetch(NYC_BORDERS_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log("GeoJSON loaded:", data.features.length, "features");
        setGeojson(data);
      });
  }, []);

  const layers = useMemo(() => {
    if (!geojson) return [];

    return [
      new GeoJsonLayer({
        id: "nyc-boroughs",
        data: geojson,
        pickable: true,
        autoHighlight: true,
        highlightColor: [255, 255, 0, 160],
        stroked: false,
        filled: true,
        getLineColor: [80, 80, 80],
        getFillColor: (f) => {
          const boro = f.properties.BoroName;
          console.log(f.properties.BoroName);

          const valueMap = {
            "Staten Island": 100,
            Brooklyn: 180,
            Manhattan: 160,
            Queens: 140,
            Bronx: 120,
          };

          const value = valueMap[boro];

          if (value === undefined) {
            return [200, 200, 200, 80]; // fallback gray
          }

          return [255, 0, 0, Math.min(255, value)];
        },
        lineWidthMinPixels: 1,
        onHover: ({ object, x, y }) => {
          const boro = object?.properties?.BoroName;
          if (boro) {
            console.log(`Hovered: ${boro}`);
          }
        },
      }),
    ];
  }, [geojson]);

  return (
    <div className="relative w-full h-full">
      <Map
        initialViewState={INITIAL_VIEW_STATE}
        mapStyle={MAP_STYLE}
        maxBounds={[
          [-74.269855, 40.493325],
          [-73.687826, 40.91604],
        ]}
        minZoom={9}
        maxZoom={16}
      >
        <DeckGLOverlay layers={layers} />
        <NavigationControl position="top-left" />
      </Map>
    </div>
  );
}
