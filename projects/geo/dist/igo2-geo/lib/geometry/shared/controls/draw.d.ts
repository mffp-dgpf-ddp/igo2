import OlMap from 'ol/Map';
import OlFeature from 'ol/Feature';
import OlStyle from 'ol/style';
import OlGeometryType from 'ol/geom/GeometryType';
import OlVectorSource from 'ol/source/Vector';
import OlVectorLayer from 'ol/layer/Vector';
import { Geometry as OlGeometry } from 'ol/geom/Geometry';
import { Subject, BehaviorSubject } from 'rxjs';
export interface DrawControlOptions {
    geometryType: OlGeometryType;
    source?: OlVectorSource;
    layer?: OlVectorLayer;
    layerStyle?: OlStyle | ((olfeature: OlFeature) => OlStyle);
    drawStyle?: OlStyle | ((olfeature: OlFeature) => OlStyle);
    maxPoints?: number;
}
/**
 * Control to draw geometries
 */
export declare class DrawControl {
    private options;
    /**
     * Draw start observable
     */
    start$: Subject<OlGeometry>;
    /**
     * Draw end observable
     */
    end$: Subject<OlGeometry>;
    /**
     * Geometry changes observable
     */
    changes$: Subject<OlGeometry>;
    private olMap;
    private olOverlayLayer;
    private olDrawInteraction;
    private onDrawStartKey;
    private onDrawEndKey;
    private onDrawKey;
    private mousePosition;
    private keyDown$$;
    freehand$: BehaviorSubject<boolean>;
    /**
     * Wheter the control is active
     */
    readonly active: boolean;
    /**
     * Geometry type
     * @internal
     */
    readonly geometryType: OlGeometryType;
    /**
     * OL overlay source
     * @internal
     */
    readonly olOverlaySource: OlVectorSource;
    constructor(options: DrawControlOptions);
    /**
     * Add or remove this control to/from a map.
     * @param map OL Map
     */
    setOlMap(olMap: OlMap | undefined): void;
    /**
     * Return the overlay source
     */
    getSource(): OlVectorSource;
    /**
     * Create an overlay source if none is defined in the options
     */
    private createOlInnerOverlayLayer;
    /**
     * Clear the overlay layer if it wasn't defined in the options
     */
    private removeOlInnerOverlayLayer;
    /**
     * Add the overlay layer if it wasn't defined in the options
     */
    private addOlInnerOverlayLayer;
    /**
     * Clear the overlay source if it wasn't defined in the options
     */
    private clearOlInnerOverlaySource;
    /**
     * Add a draw interaction to the map an set up some listeners
     */
    addOlDrawInteraction(): void;
    /**
     * Remove the draw interaction
     */
    private removeOlDrawInteraction;
    /**
     * When drawing starts, clear the overlay and start watching from changes
     * @param event Draw start event
     */
    private onDrawStart;
    /**
     * When drawing ends, update the geometry observable and start watching from changes
     * @param event Draw end event
     */
    private onDrawEnd;
    /**
     * Subscribe to CTRL key down to activate the draw control
     */
    private subscribeToKeyDown;
    /**
     * Unsubscribe to key down
     */
    private unsubscribeToKeyDown;
}
