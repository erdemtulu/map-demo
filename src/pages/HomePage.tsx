import { useEffect, useRef } from 'react';
import { Map, MapRef, NavigationControl } from 'react-map-gl/maplibre';
import { Layer, ScatterplotLayer } from 'deck.gl';
import { MapboxOverlay as DeckOverlay } from '@deck.gl/mapbox';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, IRootState } from '../store/store';
import { getMapData } from '../store/app-state';
import { Point } from '../models/point.model';

const INITIAL_VIEW_STATE = {
    latitude: 51.47,
    longitude: 0.45,
    zoom: 4,
    bearing: 0,
    pitch: 30
};

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';

interface DeckGLOverlayProps {
    layers: Layer[];
    mapRef: any;
}

function DeckGLOverlayComponent({ layers, mapRef }: DeckGLOverlayProps) {
    console.log(mapRef)
    useEffect(() => {
        if (mapRef.current) {
            const deckOverlay = new DeckOverlay({ layers });

            // Attach the overlay to the map
            mapRef.current.getMap().addControl(deckOverlay);

            // Cleanup the overlay on component unmount
            return () => {
                mapRef.current.getMap().removeControl(deckOverlay);
            };
        }
    }, [layers, mapRef]);

    return null;
}
export default function HomePage() {
    const dispatch = useDispatch<AppDispatch>()
    const points = useSelector((state: IRootState) => state.app.mapData)
    const mapRef = useRef<MapRef>(null); // Now mapRef is defined here
    useEffect(() => {
        dispatch(getMapData())
    }, [dispatch])


    const layers = [
        new ScatterplotLayer({
            id: 'scatterplot-layer',
            data: points,
            getPosition: (d: Point) => d.position,  // Ensure the position is a tuple [number, number]
            getRadius: 10,
            getLineColor: [255, 0, 0],
            getFillColor: [255, 0, 0],
            pickable: true,
            radiusMinPixels: 1,
        })
    ];

    return (
        <>
            <Map ref={mapRef} initialViewState={INITIAL_VIEW_STATE} mapStyle={MAP_STYLE} style={{ height: '100vh' }}>

                <DeckGLOverlayComponent layers={layers} mapRef={mapRef} /* interleaved*/ />
                <NavigationControl position="top-left" />
            </Map>
        </>
    );
}