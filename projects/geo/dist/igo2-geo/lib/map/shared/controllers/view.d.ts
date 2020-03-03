import OlMap from 'ol/Map';
import { BehaviorSubject } from 'rxjs';
import OlProjection from 'ol/proj/Projection';
import OlView from 'ol/View';
import { MapExtent, MapViewState } from '../map.interface';
import { MapController } from './controller';
export interface MapViewControllerOptions {
    stateHistory: boolean;
}
/**
 * Controller to handle map view interactions
 */
export declare class MapViewController extends MapController {
    private options?;
    /**
     * Observable of the current resolution
     */
    resolution$: BehaviorSubject<number>;
    /**
     * Observable of the current state
     */
    state$: BehaviorSubject<MapViewState>;
    /**
     * View Padding
     */
    padding: number[];
    /**
     * Max zoom after set extent
     */
    maxZoomOnExtent: number;
    /**
     * Extent stream
     */
    private extent$;
    /**
     * Subscription to the movement stream
     */
    private extent$$;
    /**
     * History of states
     */
    private states;
    /**
     * Current state index
     */
    private stateIndex;
    /**
     * Whether the view controller should keep the view's state history
     */
    readonly stateHistory: boolean;
    /**
     * OL View
     */
    readonly olView: OlView;
    constructor(options?: MapViewControllerOptions);
    /**
     * Add or remove this controller to/from a map.
     * @param map OL Map
     */
    setOlMap(olMap: OlMap | undefined): void;
    /**
     * Observe move moveend and subscribe to the extent stream
     */
    setupObservers(): void;
    /**
     * Teardown any observers
     */
    teardownObservers(): void;
    /**
     * Get the view's OL projection
     * @returns OL projection
     */
    getOlProjection(): OlProjection;
    /**
     * Get the current map view center
     * @param projection Output projection
     * @returns Center
     */
    getCenter(projection?: string | OlProjection): [number, number];
    /**
     * Get the current view extent
     * @param projection Output projection
     * @returns Extent
     */
    getExtent(projection?: string | OlProjection): MapExtent;
    /**
     * Get the current scale
     * @param dpi Dot per inches
     * @returns View scale
     */
    getScale(dpi?: number): number;
    /**
     * Get the current resolution
     * @returns Projection denominator
     */
    getResolution(): number;
    /**
     * Get the current zoom level
     * @returns Zoom level
     */
    getZoom(): number;
    /**
     * Zoom in
     */
    zoomIn(): void;
    /**
     * Zoom out
     */
    zoomOut(): void;
    /**
     * Zoom to specific zoom level
     * @param zoom Zoom level
     */
    zoomTo(zoom: number): void;
    /**
     * Move to extent after a short delay (100ms) unless
     * a new movement gets registered in the meantime.
     * @param extent Extent to move to
     */
    moveToExtent(extent: [number, number, number, number]): void;
    /**
     * Zoom to extent after a short delay (100ms) unless
     * a new movement gets registered in the meantime.
     * @param extent Extent to zoom to
     */
    zoomToExtent(extent: [number, number, number, number]): void;
    /**
     * Return the current view rotation
     * @returns Rotation angle in degrees
     */
    getRotation(): number;
    /**
     * Reset the view rotation to 0
     */
    resetRotation(): void;
    /**
     * Whether the view has a previous state
     * @returns True if the view has a previous state
     */
    hasPreviousState(): boolean;
    /**
     * Whether the view has a next state
     * @returns True if the view has a next state
     */
    hasNextState(): boolean;
    /**
     * Restore the previous view state
     */
    previousState(): void;
    /**
     * Restore the next view state
     */
    nextState(): void;
    /**
     * Clear the state history
     */
    clearStateHistory(): void;
    /**
     * Update the the view to it's intial state
     */
    setInitialState(): void;
    /**
     * Move to the extent retrieved from the stream
     * @param extent Extent
     * @param action Either zoom or move
     * @param animation With or without animation to the target extent.
     */
    private setExtent;
    /**
     * Set the view state index
     * @param index State index
     */
    private setStateIndex;
    /**
     * Set the view state
     * @param state View state
     */
    private setState;
    /**
     * On move end, get the view state and record it.
     * @param event Map event
     */
    private onMoveEnd;
}
