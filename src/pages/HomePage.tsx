import { useEffect, useRef, useState } from 'react';
import { Map, MapRef, NavigationControl, Popup } from 'react-map-gl/maplibre';
import { Layer, ScatterplotLayer } from 'deck.gl';
import { MapboxOverlay as DeckOverlay } from '@deck.gl/mapbox';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, IRootState } from '../store/store';
import { getMapData } from '../store/app-state';
import { Point } from '../models/point.model';

const INITIAL_VIEW_STATE = {
    latitude: 52.047,
    longitude: 4.42,
    zoom: 14,
    bearing: 0,
    pitch: 30
};

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';

interface DeckGLOverlayProps {
    layers: Layer[];
    mapRef: any;
}

function DeckGLOverlayComponent({ layers, mapRef }: DeckGLOverlayProps) {
    useEffect(() => {
        if (mapRef.current) {
            const deckOverlay = new DeckOverlay({ layers });

            mapRef.current.getMap().addControl(deckOverlay);

            return () => {
                mapRef.current.getMap().removeControl(deckOverlay);
            };
        }
    }, [layers, mapRef]);

    return null;
}
export default function HomePage() {
    const dispatch = useDispatch<AppDispatch>()
    const points: Point[] = useSelector((state: IRootState) => state.app.mapData)
    const mapRef = useRef<MapRef>(null);
    const [selected, setSelected] = useState<Point | null>(null);
    useEffect(() => {
        dispatch(getMapData())
    }, [dispatch])


    const layers = [
        new ScatterplotLayer({
            id: 'scatterplot-layer',
            data: points,
            getPosition: (d: Point) => d.position,
            getRadius: 10,
            getLineColor: [255, 0, 0],
            getFillColor: [255, 0, 0],
            pickable: true,
            radiusMinPixels: 1,
            onClick: info => setSelected(info.object)
        })
    ];

    return (
        <>
            <Map ref={mapRef} initialViewState={INITIAL_VIEW_STATE} mapStyle={MAP_STYLE} style={{ height: '100vh' }}>
                {selected && (
                    <Popup
                        key={selected.id}
                        anchor="bottom"
                        style={{ zIndex: 10 }}
                        longitude={selected.position[0]}
                        latitude={selected.position[1]}
                    >
                        {selected.name}
                    </Popup>
                )}
                <DeckGLOverlayComponent layers={layers} mapRef={mapRef} />
                <NavigationControl position="top-left" />
            </Map>
        </>
    );
}