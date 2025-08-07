import { useEffect, useMemo, useState } from "react";
import { Map, NavigationControl, useControl } from "react-map-gl/maplibre";
import { GeoJsonLayer } from "deck.gl";
import {
  MapboxOverlay as DeckOverlay,
  type MapboxOverlayProps,
} from "@deck.gl/mapbox";
import "maplibre-gl/dist/maplibre-gl.css";

const NYC_BORDERS_URL =
  "https://data.cityofnewyork.us/resource/pri4-ifjk.geojson";

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
        stroked: true,
        filled: true,
        getLineColor: [200, 200, 200],
        getFillColor: (f) => {
          const zip = f.properties.modzcta;
          // Example: make zip 10001 red, others gray
          return zip === "10001" ? [255, 0, 0, 180] : [200, 200, 200, 100];
        },
        onHover: ({ object }) => {
          console.log(`Hovered MODZCTA: ${object?.properties?.modzcta}`);
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
