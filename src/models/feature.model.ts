import { Geometry } from "./geometry.model";

export interface Feature {
    type: string;
    geometry: Geometry;
    properties: { id: string, name: string }
}