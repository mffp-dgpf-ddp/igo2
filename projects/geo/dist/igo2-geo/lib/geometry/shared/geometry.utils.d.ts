import * as olstyle from 'ol/style';
import OlLineString from 'ol/geom/LineString';
import OlLinearRing from 'ol/geom/LinearRing';
import OlPolygon from 'ol/geom/Polygon';
import { GeometryEvent as OlGeometryEvent } from 'ol/geom/Geometry';
/**
 * Create a default style for draw and modify interactions
 * @param color Style color (R, G, B)
 * @returns OL style
 */
export declare function createDrawInteractionStyle(color?: [number, number, number]): olstyle.Style;
/**
 * Create a default style for drawing a hole
 * @returns OL style
 */
export declare function createDrawHoleInteractionStyle(): olstyle.Style;
/**
 * Slice geometry into two parts
 * @param olGeometry OL geometry
 * @param olSlicer Slicing line
 * @returns New OL geometries
 */
export declare function sliceOlGeometry(olGeometry: OlLineString | OlPolygon, olSlicer: OlLineString): Array<OlLineString | OlPolygon>;
/**
 * Slice OL LineString into one or more lines
 * @param olLineString OL line string
 * @param olSlicer Slicing line
 * @returns New OL line strings
 */
export declare function sliceOlLineString(olLineString: OlLineString, olSlicer: OlLineString): OlLineString[];
/**
 * Slice OL Polygon into one or more polygons
 * @param olPolygon OL polygon
 * @param olSlicer Slicing line
 * @returns New OL polygons
 */
export declare function sliceOlPolygon(olPolygon: OlPolygon, olSlicer: OlLineString): OlPolygon[];
/**
 * Splice geometry into two parts
 * @param olGeometry OL geometry
 * @param olSlicer Slicing line
 * @returns New OL geometries
 */
export declare function addLinearRingToOlPolygon(olPolygon: OlPolygon, olLinearRing: OlLinearRing): OlPolygon;
export declare function getMousePositionFromOlGeometryEvent(olEvent: OlGeometryEvent): [number, number];
