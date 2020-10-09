import OlMap from 'ol/Map';
import OlFeature from 'ol/Feature';
import OlStyle from 'ol/style';
import OlVectorSource from 'ol/source/Vector';
import OlVectorLayer from 'ol/layer/Vector';
import OlModify from 'ol/interaction/Modify';
import { Geometry as OlGeometry } from 'ol/geom/Geometry';
import { Subject } from 'rxjs';
export interface ModifyControlOptions {
    source?: OlVectorSource;
    layer?: OlVectorLayer;
    layerStyle?: OlStyle | ((olfeature: OlFeature) => OlStyle);
    drawStyle?: OlStyle | ((olfeature: OlFeature) => OlStyle);
}
/**
 * Control to modify geometries
 */
export declare class ModifyControl {
    private options;
    /**
     * Modify start observable
     */
    start$: Subject<OlGeometry>;
    /**
     * Modify end observable
     */
    end$: Subject<OlGeometry>;
    /**
     * Geometry changes observable
     */
    changes$: Subject<OlGeometry>;
    private olMap;
    private olOverlayLayer;
    olModifyInteraction: OlModify;
    private onModifyStartKey;
    private onModifyEndKey;
    private onModifyKey;
    private olModifyInteractionIsActive;
    private olTranslateInteraction;
    private onTranslateStartKey;
    private onTranslateEndKey;
    private onTranslateKey;
    private olTranslateInteractionIsActive;
    private olDrawInteraction;
    private onDrawStartKey;
    private onDrawEndKey;
    private onDrawKey;
    private olDrawInteractionIsActive;
    private mousePosition;
    private keyDown$$;
    private drawKeyUp$$;
    private drawKeyDown$$;
    private removedOlInteractions;
    private olLinearRingsLayer;
    private olOuterGeometry;
    /**
     * Wheter the control is active
     */
    readonly active: boolean;
    /**
     * OL overlay source
     * @internal
     */
    readonly olOverlaySource: OlVectorSource;
    /**
     * OL linear rings source
     * @internal
     */
    readonly olLinearRingsSource: OlVectorSource;
    constructor(options: ModifyControlOptions);
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
     * Add an OL geometry to the overlay and start modifying it
     * @param olGeometry Ol Geometry
     */
    setOlGeometry(olGeometry: OlGeometry): void;
    /**
     * Create an overlay source if none is defined in the options
     */
    private createOlInnerOverlayLayer;
    /**
     * Add the overlay layer if it wasn't defined in the options
     */
    private addOlInnerOverlayLayer;
    /**
     * Clear the overlay layer if it wasn't defined in the options
     */
    private removeOlInnerOverlayLayer;
    /**
     * Clear the overlay source if it wasn't defined in the options
     */
    private clearOlInnerOverlaySource;
    private createOlLinearRingsLayer;
    /**
     * Add the linear rings layer
     */
    private addOlLinearRingsLayer;
    /**
     * Clear the linear rings layer
     */
    private removeOlLinearRingsLayer;
    /**
     * Clear the linear rings source
     */
    private clearOlLinearRingsSource;
    /**
     * Add a modify interaction to the map an set up some listeners
     */
    private addOlModifyInteraction;
    /**
     * Remove the modify interaction
     */
    private removeOlModifyInteraction;
    private activateModifyInteraction;
    private deactivateModifyInteraction;
    /**
     * When modifying starts, clear the overlay and start watching for changes
     * @param event Modify start event
     */
    private onModifyStart;
    /**
     * When modifying ends, update the geometry observable and stop watching for changes
     * @param event Modify end event
     */
    private onModifyEnd;
    /**
     * Subscribe to CTRL key down to activate the draw control
     */
    private subscribeToKeyDown;
    /**
     * Unsubscribe to key down
     */
    private unsubscribeToKeyDown;
    /**
     * Add a translate interaction to the map an set up some listeners
     */
    private addOlTranslateInteraction;
    /**
     * Remove the translate interaction
     */
    private removeOlTranslateInteraction;
    private activateTranslateInteraction;
    private deactivateTranslateInteraction;
    /**
     * When translation starts, clear the overlay and start watching for changes
     * @param event Translate start event
     */
    private onTranslateStart;
    /**
     * When translation ends, update the geometry observable and stop watchign for changes
     * @param event Translate end event
     */
    private onTranslateEnd;
    /**
     * Add a draw interaction to the map an set up some listeners
     */
    private addOlDrawInteraction;
    /**
     * Subscribe to CTRL key down to activate the draw control
     */
    private subscribeToDrawKeyDown;
    /**
     * Subscribe to CTRL key up to deactivate the draw control
     */
    private subscribeToDrawKeyUp;
    /**
     * Unsubscribe to draw key down
     */
    private unsubscribeToDrawKeyDown;
    /**
     * Unsubscribe to key up
     */
    private unsubscribeToDrawKeyUp;
    /**
     * Remove the draw interaction
     */
    private removeOlDrawInteraction;
    /**
     * Activate the draw interaction
     */
    private activateDrawInteraction;
    /**
     * Deactivate the draw interaction
     */
    private deactivateDrawInteraction;
    /**
     * When draw start, add a new linerar ring to the geometry and start watching for changes
     * @param event Draw start event
     */
    private onDrawStart;
    /**
     * When translation ends, update the geometry observable and stop watchign for changes
     * @param event Draw end event
     */
    private onDrawEnd;
    /**
     * Add a linear ring to the geometry being modified
     * @param coordinates Linear ring coordinates
     */
    private addLinearRingToOlGeometry;
    /**
     * Update the last linear ring of the geometry being modified
     * @param coordinates Linear ring coordinates
     */
    private updateLinearRingOfOlGeometry;
    /**
     * Get the geometry being modified
     * @returns OL Geometry
     */
    private getOlGeometry;
}
