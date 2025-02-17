import { useEffect, useMemo, useRef, useState } from 'react';
import { FullscreenControl, GeolocateControl, Map, MapRef, NavigationControl, Popup, ScaleControl } from 'react-map-gl/maplibre';
import { IconLayer, Layer } from 'deck.gl';
import { MapboxOverlay as DeckOverlay } from '@deck.gl/mapbox';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, IRootState } from '../store/store';
import { getHeavyMapData, getMapData } from '../store/app-state';
import { Point } from '../models/point.model';

//Set the initial view state to nootdorp
const INITIAL_VIEW_STATE = {
    latitude: 52.047,
    longitude: 4.42,
    zoom: 14,
    bearing: 0,
    pitch: 30
};

const MAP_STYLE = "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";

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
        dispatch(getHeavyMapData())
    }, [dispatch])

    const layers = useMemo(() => [
        new IconLayer({
            id: 'IconLayer',
            data: points,
            getColor: [255, 0, 0],
            getIcon: () => 'marker-warning',
            getPosition: (d: Point) => d.position,
            getSize: 20,
            iconAtlas: 'icon-atlas.png',
            iconMapping: {
                "marker": {
                    "x": 0,
                    "y": 0,
                    "width": 128,
                    "height": 128,
                    "anchorY": 128,
                    "mask": true
                },
                "marker-warning": {
                    "x": 128,
                    "y": 0,
                    "width": 128,
                    "height": 128,
                    "anchorY": 128,
                    "mask": false
                }
            },
            pickable: true,
            onClick: info => setSelected(info.object)
        })
    ], [points]);

    return (
        <>
            <Map ref={mapRef} initialViewState={INITIAL_VIEW_STATE} mapStyle={MAP_STYLE} style={{ height: '100vh' }}>
                <GeolocateControl position="top-left" />
                <FullscreenControl position="top-left" />
                <NavigationControl position="top-left" />
                <ScaleControl />
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

            </Map>
        </>
    );
}