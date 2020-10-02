import OlMap from 'ol/Map';
/**
 * Base map controller
 */
export declare class MapController {
    /**
     * OL Map
     */
    protected olMap: OlMap;
    /**
     * Array of observer keys
     */
    protected observerKeys: string[];
    /**
     * Return the OL map this controller is bound to
     * @returns OL Map
     */
    getOlMap(): OlMap;
    /**
     * Add or remove this controller to/from a map.
     * @param map OL Map
     */
    setOlMap(olMap: OlMap | undefined): void;
    /**
     * Teardown any observers
     */
    teardownObservers(): void;
}
