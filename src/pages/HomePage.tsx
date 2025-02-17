import { Container } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, IRootState } from "../store/store";
import { getMapData } from "../store/app-state";
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

export default function HomePage() {
    const dispatch = useDispatch<AppDispatch>()
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const [map, setMap] = useState<maplibregl.Map | null>(null); // Store the MapLibre map instance
    const points = useSelector((state: IRootState) => state.app.mapData)

    useEffect(() => {
        if (mapContainerRef.current) {
            const mapInstance = new maplibregl.Map({
                container: mapContainerRef.current,
                style: 'https://demotiles.maplibre.org/style.json',
                center: [0, 0],
                zoom: 2,
            });

            mapInstance.on('load', () => {
                setMap(mapInstance); // Store the map instance
            });

            // Cleanup map instance when component unmounts
            return () => mapInstance.remove();
        }
    }, []);

    useEffect(() => {
        dispatch(getMapData())
    }, [dispatch])


    return <div
        ref={mapContainerRef}
        style={{
            width: '100%',
            height: '100vh',
        }}
    />
}