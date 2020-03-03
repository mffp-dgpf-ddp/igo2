/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import * as oleasing from 'ol/easing';
import * as olproj from 'ol/proj';
import { MapViewAction } from '../map.enums';
import { getScaleFromResolution, viewStatesAreEqual } from '../map.utils';
import { MapController } from './controller';
/**
 * @record
 */
export function MapViewControllerOptions() { }
if (false) {
    /** @type {?} */
    MapViewControllerOptions.prototype.stateHistory;
}
/**
 * Controller to handle map view interactions
 */
export class MapViewController extends MapController {
    /**
     * @param {?=} options
     */
    constructor(options) {
        super();
        this.options = options;
        /**
         * Observable of the current resolution
         */
        this.resolution$ = new BehaviorSubject(undefined);
        /**
         * Observable of the current state
         */
        this.state$ = new BehaviorSubject(undefined);
        /**
         * View Padding
         */
        this.padding = [0, 0, 0, 0];
        /**
         * Max zoom after set extent
         */
        this.maxZoomOnExtent = 19;
        /**
         * Extent stream
         */
        this.extent$ = new Subject();
        /**
         * History of states
         */
        this.states = [];
        /**
         * Current state index
         */
        this.stateIndex = 0;
    }
    /**
     * Whether the view controller should keep the view's state history
     * @return {?}
     */
    get stateHistory() {
        return this.options ? this.options.stateHistory === true : false;
    }
    /**
     * OL View
     * @return {?}
     */
    get olView() {
        return this.olMap.getView();
    }
    /**
     * Add or remove this controller to/from a map.
     * @param {?} olMap
     * @return {?}
     */
    setOlMap(olMap) {
        super.setOlMap(olMap);
        this.setupObservers();
    }
    /**
     * Observe move moveend and subscribe to the extent stream
     * @return {?}
     */
    setupObservers() {
        if (this.stateHistory === true) {
            this.observerKeys.push(this.olMap.on('moveend', (/**
             * @param {?} event
             * @return {?}
             */
            (event) => this.onMoveEnd(event))));
        }
        this.extent$$ = this.extent$
            .pipe(debounceTime(25))
            .subscribe((/**
         * @param {?} value
         * @return {?}
         */
        (value) => {
            this.setExtent(value.extent, value.action);
        }));
    }
    /**
     * Teardown any observers
     * @return {?}
     */
    teardownObservers() {
        super.teardownObservers();
        if (this.extent$$ !== undefined) {
            this.extent$$.unsubscribe();
            this.extent$$ = undefined;
        }
    }
    /**
     * Get the view's OL projection
     * @return {?} OL projection
     */
    getOlProjection() {
        return this.olView.getProjection();
    }
    /**
     * Get the current map view center
     * @param {?=} projection Output projection
     * @return {?} Center
     */
    getCenter(projection) {
        /** @type {?} */
        let center = this.olView.getCenter();
        if (projection && center) {
            center = olproj.transform(center, this.getOlProjection(), projection);
        }
        return center;
    }
    /**
     * Get the current view extent
     * @param {?=} projection Output projection
     * @return {?} Extent
     */
    getExtent(projection) {
        /** @type {?} */
        let extent = this.olView.calculateExtent(this.olMap.getSize());
        if (projection && extent) {
            extent = olproj.transformExtent(extent, this.getOlProjection(), projection);
        }
        return extent;
    }
    /**
     * Get the current scale
     * @param {?=} dpi Dot per inches
     * @return {?} View scale
     */
    getScale(dpi = 96) {
        return getScaleFromResolution(this.getResolution(), this.getOlProjection().getUnits(), dpi);
    }
    /**
     * Get the current resolution
     * @return {?} Projection denominator
     */
    getResolution() {
        return this.olView.getResolution();
    }
    /**
     * Get the current zoom level
     * @return {?} Zoom level
     */
    getZoom() {
        return Math.round(this.olView.getZoom());
    }
    /**
     * Zoom in
     * @return {?}
     */
    zoomIn() {
        this.zoomTo(this.olView.getZoom() + 1);
    }
    /**
     * Zoom out
     * @return {?}
     */
    zoomOut() {
        this.zoomTo(this.olView.getZoom() - 1);
    }
    /**
     * Zoom to specific zoom level
     * @param {?} zoom Zoom level
     * @return {?}
     */
    zoomTo(zoom) {
        this.olView.cancelAnimations();
        this.olView.animate({
            zoom,
            duration: 250,
            easing: oleasing.easeOut
        });
    }
    /**
     * Move to extent after a short delay (100ms) unless
     * a new movement gets registered in the meantime.
     * @param {?} extent Extent to move to
     * @return {?}
     */
    moveToExtent(extent) {
        this.extent$.next({ extent, action: MapViewAction.Move });
    }
    /**
     * Zoom to extent after a short delay (100ms) unless
     * a new movement gets registered in the meantime.
     * @param {?} extent Extent to zoom to
     * @return {?}
     */
    zoomToExtent(extent) {
        this.extent$.next({ extent, action: MapViewAction.Zoom });
    }
    /**
     * Return the current view rotation
     * @return {?} Rotation angle in degrees
     */
    getRotation() {
        return this.olView.getRotation();
    }
    /**
     * Reset the view rotation to 0
     * @return {?}
     */
    resetRotation() {
        this.olView.animate({ rotation: 0 });
    }
    /**
     * Whether the view has a previous state
     * @return {?} True if the view has a previous state
     */
    hasPreviousState() {
        return this.states.length > 1 && this.stateIndex > 0;
    }
    /**
     * Whether the view has a next state
     * @return {?} True if the view has a next state
     */
    hasNextState() {
        return this.states.length > 1 && this.stateIndex < this.states.length - 1;
    }
    /**
     * Restore the previous view state
     * @return {?}
     */
    previousState() {
        if (this.hasPreviousState()) {
            this.setStateIndex(this.stateIndex - 1);
        }
    }
    /**
     * Restore the next view state
     * @return {?}
     */
    nextState() {
        if (this.hasNextState()) {
            this.setStateIndex(this.stateIndex + 1);
        }
    }
    /**
     * Clear the state history
     * @return {?}
     */
    clearStateHistory() {
        this.states = [];
        this.stateIndex = 0;
    }
    /**
     * Update the the view to it's intial state
     * @return {?}
     */
    setInitialState() {
        if (this.states.length > 0) {
            this.setStateIndex(0);
        }
    }
    /**
     * Move to the extent retrieved from the stream
     * @private
     * @param {?} extent Extent
     * @param {?} action Either zoom or move
     * @param {?=} animation With or without animation to the target extent.
     * @return {?}
     */
    setExtent(extent, action, animation = true) {
        /** @type {?} */
        const olView = this.olView;
        olView.cancelAnimations();
        /** @type {?} */
        const duration = animation ? 500 : 0;
        /** @type {?} */
        const zoom = olView.getZoom();
        /** @type {?} */
        const fromCenter = olView.getCenter();
        /** @type {?} */
        const toCenter = [
            extent[0] + (extent[2] - extent[0]) / 2,
            extent[1] + (extent[3] - extent[1]) / 2
        ];
        /** @type {?} */
        const distCenter = Math.sqrt(Math.pow(fromCenter[0] - toCenter[0], 2) +
            Math.pow(fromCenter[1] - toCenter[1], 2));
        /** @type {?} */
        const fromExtent = olView.calculateExtent();
        /** @type {?} */
        const fromSize = Math.sqrt(Math.pow(fromExtent[2] - fromExtent[0], 2) +
            Math.pow(fromExtent[3] - fromExtent[1], 2));
        /** @type {?} */
        const toSize = Math.sqrt(Math.pow(extent[2] - extent[0], 2) + Math.pow(extent[3] - extent[1], 2));
        /** @type {?} */
        const moySize = (toSize + fromSize) / 2;
        /** @type {?} */
        const xSize = distCenter / moySize;
        /** @type {?} */
        const maxZoom = action === MapViewAction.Move || zoom > this.maxZoomOnExtent
            ? zoom
            : this.maxZoomOnExtent;
        olView.fit(extent, {
            maxZoom,
            padding: this.padding,
            duration: xSize > 4 ? 0 : duration
        });
    }
    /**
     * Set the view state index
     * @private
     * @param {?} index State index
     * @return {?}
     */
    setStateIndex(index) {
        this.stateIndex = index;
        this.setState(this.states[index]);
    }
    /**
     * Set the view state
     * @private
     * @param {?} state View state
     * @return {?}
     */
    setState(state) {
        this.olView.animate({
            resolution: state.resolution,
            center: state.center,
            duration: 0
        });
    }
    /**
     * On move end, get the view state and record it.
     * @private
     * @param {?} event Map event
     * @return {?}
     */
    onMoveEnd(event) {
        /** @type {?} */
        const resolution = this.getResolution();
        if (this.resolution$.value !== resolution) {
            this.resolution$.next(resolution);
        }
        /** @type {?} */
        const state = {
            resolution,
            center: this.getCenter(),
            zoom: this.getZoom()
        };
        if (this.stateHistory === true) {
            /** @type {?} */
            const stateIndex = this.stateIndex;
            /** @type {?} */
            const stateAtIndex = this.states.length === 0 ? undefined : this.states[stateIndex];
            if (!viewStatesAreEqual(state, stateAtIndex)) {
                this.states = this.states.slice(0, stateIndex + 1).concat([state]);
                this.stateIndex = this.states.length - 1;
            }
        }
        this.state$.next(state);
    }
}
if (false) {
    /**
     * Observable of the current resolution
     * @type {?}
     */
    MapViewController.prototype.resolution$;
    /**
     * Observable of the current state
     * @type {?}
     */
    MapViewController.prototype.state$;
    /**
     * View Padding
     * @type {?}
     */
    MapViewController.prototype.padding;
    /**
     * Max zoom after set extent
     * @type {?}
     */
    MapViewController.prototype.maxZoomOnExtent;
    /**
     * Extent stream
     * @type {?}
     * @private
     */
    MapViewController.prototype.extent$;
    /**
     * Subscription to the movement stream
     * @type {?}
     * @private
     */
    MapViewController.prototype.extent$$;
    /**
     * History of states
     * @type {?}
     * @private
     */
    MapViewController.prototype.states;
    /**
     * Current state index
     * @type {?}
     * @private
     */
    MapViewController.prototype.stateIndex;
    /**
     * @type {?}
     * @private
     */
    MapViewController.prototype.options;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9tYXAvc2hhcmVkL2NvbnRyb2xsZXJzL3ZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUdBLE9BQU8sRUFBRSxlQUFlLEVBQUUsT0FBTyxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFOUMsT0FBTyxLQUFLLFFBQVEsTUFBTSxXQUFXLENBQUM7QUFDdEMsT0FBTyxLQUFLLE1BQU0sTUFBTSxTQUFTLENBQUM7QUFJbEMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUU3QyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDMUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGNBQWMsQ0FBQzs7OztBQUU3Qyw4Q0FFQzs7O0lBREMsZ0RBQXNCOzs7OztBQU14QixNQUFNLE9BQU8saUJBQWtCLFNBQVEsYUFBYTs7OztJQXVEbEQsWUFBb0IsT0FBa0M7UUFDcEQsS0FBSyxFQUFFLENBQUM7UUFEVSxZQUFPLEdBQVAsT0FBTyxDQUEyQjs7OztRQW5EdEQsZ0JBQVcsR0FBRyxJQUFJLGVBQWUsQ0FBUyxTQUFTLENBQUMsQ0FBQzs7OztRQUtyRCxXQUFNLEdBQUcsSUFBSSxlQUFlLENBQWUsU0FBUyxDQUFDLENBQUM7Ozs7UUFLdEQsWUFBTyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Ozs7UUFLdkIsb0JBQWUsR0FBRyxFQUFFLENBQUM7Ozs7UUFLYixZQUFPLEdBQUcsSUFBSSxPQUFPLEVBQWdELENBQUM7Ozs7UUFVdEUsV0FBTSxHQUFtQixFQUFFLENBQUM7Ozs7UUFLNUIsZUFBVSxHQUFXLENBQUMsQ0FBQztJQWtCL0IsQ0FBQzs7Ozs7SUFiRCxJQUFJLFlB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QUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUN2QyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztTQUN4Qzs7Y0FDSyxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FDMUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN0QyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQzNDOztjQUNLLFVBQVUsR0FBRyxNQUFNLENBQUMsZUFBZSxFQUFFOztjQUNyQyxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FDeEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN4QyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQzdDOztjQUNLLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUN0QixJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUN4RTs7Y0FDSyxPQUFPLEdBQUcsQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQzs7Y0FDakMsS0FBSyxHQUFHLFVBQVUsR0FBRyxPQUFPOztjQUU1QixPQUFPLEdBQ1gsTUFBTSxLQUFLLGFBQWEsQ0FBQyxJQUFJLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxlQUFlO1lBQzFELENBQUMsQ0FBQyxJQUFJO1lBQ04sQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlO1FBRTFCLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFO1lBQ2pCLE9BQU87WUFDUCxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsUUFBUSxFQUFFLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUTtTQUNuQyxDQUFDLENBQUM7SUFDTCxDQUFDOzs7Ozs7O0lBTU8sYUFBYSxDQUFDLEtBQWE7UUFDakMsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDcEMsQ0FBQzs7Ozs7OztJQU1PLFFBQVEsQ0FBQyxLQUFtQjtRQUNsQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztZQUNsQixVQUFVLEVBQUUsS0FBSyxDQUFDLFVBQVU7WUFDNUIsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNO1lBQ3BCLFFBQVEsRUFBRSxDQUFDO1NBQ1osQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7OztJQU1PLFNBQVMsQ0FBQyxLQUFpQjs7Y0FDM0IsVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUU7UUFDdkMsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssS0FBSyxVQUFVLEVBQUU7WUFDekMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDbkM7O2NBRUssS0FBSyxHQUFHO1lBQ1osVUFBVTtZQUNWLE1BQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ3hCLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFO1NBQ3JCO1FBRUQsSUFBSSxJQUFJLENBQUMsWUFBWSxLQUFLLElBQUksRUFBRTs7a0JBQ3hCLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVTs7a0JBQzVCLFlBQVksR0FDaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDO1lBQ2hFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDLEVBQUU7Z0JBQzVDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNuRSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQzthQUMxQztTQUNGO1FBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUIsQ0FBQztDQUNGOzs7Ozs7SUEvV0Msd0NBQXFEOzs7OztJQUtyRCxtQ0FBc0Q7Ozs7O0lBS3RELG9DQUF1Qjs7Ozs7SUFLdkIsNENBQXFCOzs7Ozs7SUFLckIsb0NBQThFOzs7Ozs7SUFLOUUscUNBQStCOzs7Ozs7SUFLL0IsbUNBQW9DOzs7Ozs7SUFLcEMsdUNBQStCOzs7OztJQWdCbkIsb0NBQTBDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE9sTWFwIGZyb20gJ29sL01hcCc7XHJcbmltcG9ydCBPbE1hcEV2ZW50IGZyb20gJ29sL01hcEV2ZW50JztcclxuXHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGRlYm91bmNlVGltZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCAqIGFzIG9sZWFzaW5nIGZyb20gJ29sL2Vhc2luZyc7XHJcbmltcG9ydCAqIGFzIG9scHJvaiBmcm9tICdvbC9wcm9qJztcclxuaW1wb3J0IE9sUHJvamVjdGlvbiBmcm9tICdvbC9wcm9qL1Byb2plY3Rpb24nO1xyXG5pbXBvcnQgT2xWaWV3IGZyb20gJ29sL1ZpZXcnO1xyXG5cclxuaW1wb3J0IHsgTWFwVmlld0FjdGlvbiB9IGZyb20gJy4uL21hcC5lbnVtcyc7XHJcbmltcG9ydCB7IE1hcEV4dGVudCwgTWFwVmlld1N0YXRlIH0gZnJvbSAnLi4vbWFwLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IGdldFNjYWxlRnJvbVJlc29sdXRpb24sIHZpZXdTdGF0ZXNBcmVFcXVhbCB9IGZyb20gJy4uL21hcC51dGlscyc7XHJcbmltcG9ydCB7IE1hcENvbnRyb2xsZXIgfSBmcm9tICcuL2NvbnRyb2xsZXInO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBNYXBWaWV3Q29udHJvbGxlck9wdGlvbnMge1xyXG4gIHN0YXRlSGlzdG9yeTogYm9vbGVhbjtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbnRyb2xsZXIgdG8gaGFuZGxlIG1hcCB2aWV3IGludGVyYWN0aW9uc1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE1hcFZpZXdDb250cm9sbGVyIGV4dGVuZHMgTWFwQ29udHJvbGxlciB7XHJcbiAgLyoqXHJcbiAgICogT2JzZXJ2YWJsZSBvZiB0aGUgY3VycmVudCByZXNvbHV0aW9uXHJcbiAgICovXHJcbiAgcmVzb2x1dGlvbiQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4odW5kZWZpbmVkKTtcclxuXHJcbiAgLyoqXHJcbiAgICogT2JzZXJ2YWJsZSBvZiB0aGUgY3VycmVudCBzdGF0ZVxyXG4gICAqL1xyXG4gIHN0YXRlJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TWFwVmlld1N0YXRlPih1bmRlZmluZWQpO1xyXG5cclxuICAvKipcclxuICAgKiBWaWV3IFBhZGRpbmdcclxuICAgKi9cclxuICBwYWRkaW5nID0gWzAsIDAsIDAsIDBdO1xyXG5cclxuICAvKipcclxuICAgKiBNYXggem9vbSBhZnRlciBzZXQgZXh0ZW50XHJcbiAgICovXHJcbiAgbWF4Wm9vbU9uRXh0ZW50ID0gMTk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEV4dGVudCBzdHJlYW1cclxuICAgKi9cclxuICBwcml2YXRlIGV4dGVudCQgPSBuZXcgU3ViamVjdDx7IGV4dGVudDogTWFwRXh0ZW50OyBhY3Rpb246IE1hcFZpZXdBY3Rpb24gfT4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaXB0aW9uIHRvIHRoZSBtb3ZlbWVudCBzdHJlYW1cclxuICAgKi9cclxuICBwcml2YXRlIGV4dGVudCQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIEhpc3Rvcnkgb2Ygc3RhdGVzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzdGF0ZXM6IE1hcFZpZXdTdGF0ZVtdID0gW107XHJcblxyXG4gIC8qKlxyXG4gICAqIEN1cnJlbnQgc3RhdGUgaW5kZXhcclxuICAgKi9cclxuICBwcml2YXRlIHN0YXRlSW5kZXg6IG51bWJlciA9IDA7XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgdGhlIHZpZXcgY29udHJvbGxlciBzaG91bGQga2VlcCB0aGUgdmlldydzIHN0YXRlIGhpc3RvcnlcclxuICAgKi9cclxuICBnZXQgc3RhdGVIaXN0b3J5KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucyA/IHRoaXMub3B0aW9ucy5zdGF0ZUhpc3RvcnkgPT09IHRydWUgOiBmYWxzZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9MIFZpZXdcclxuICAgKi9cclxuICBnZXQgb2xWaWV3KCk6IE9sVmlldyB7XHJcbiAgICByZXR1cm4gdGhpcy5vbE1hcC5nZXRWaWV3KCk7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG9wdGlvbnM/OiBNYXBWaWV3Q29udHJvbGxlck9wdGlvbnMpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgb3IgcmVtb3ZlIHRoaXMgY29udHJvbGxlciB0by9mcm9tIGEgbWFwLlxyXG4gICAqIEBwYXJhbSBtYXAgT0wgTWFwXHJcbiAgICovXHJcbiAgc2V0T2xNYXAob2xNYXA6IE9sTWFwIHwgdW5kZWZpbmVkKSB7XHJcbiAgICBzdXBlci5zZXRPbE1hcChvbE1hcCk7XHJcbiAgICB0aGlzLnNldHVwT2JzZXJ2ZXJzKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBPYnNlcnZlIG1vdmUgbW92ZWVuZCBhbmQgc3Vic2NyaWJlIHRvIHRoZSBleHRlbnQgc3RyZWFtXHJcbiAgICovXHJcbiAgc2V0dXBPYnNlcnZlcnMoKSB7XHJcbiAgICBpZiAodGhpcy5zdGF0ZUhpc3RvcnkgPT09IHRydWUpIHtcclxuICAgICAgdGhpcy5vYnNlcnZlcktleXMucHVzaChcclxuICAgICAgICB0aGlzLm9sTWFwLm9uKCdtb3ZlZW5kJywgKGV2ZW50OiBPbE1hcEV2ZW50KSA9PiB0aGlzLm9uTW92ZUVuZChldmVudCkpXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5leHRlbnQkJCA9IHRoaXMuZXh0ZW50JFxyXG4gICAgICAucGlwZShkZWJvdW5jZVRpbWUoMjUpKVxyXG4gICAgICAuc3Vic2NyaWJlKCh2YWx1ZTogeyBleHRlbnQ6IE1hcEV4dGVudDsgYWN0aW9uOiBNYXBWaWV3QWN0aW9uIH0pID0+IHtcclxuICAgICAgICB0aGlzLnNldEV4dGVudCh2YWx1ZS5leHRlbnQsIHZhbHVlLmFjdGlvbik7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGVhcmRvd24gYW55IG9ic2VydmVyc1xyXG4gICAqL1xyXG4gIHRlYXJkb3duT2JzZXJ2ZXJzKCkge1xyXG4gICAgc3VwZXIudGVhcmRvd25PYnNlcnZlcnMoKTtcclxuICAgIGlmICh0aGlzLmV4dGVudCQkICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5leHRlbnQkJC51bnN1YnNjcmliZSgpO1xyXG4gICAgICB0aGlzLmV4dGVudCQkID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSB2aWV3J3MgT0wgcHJvamVjdGlvblxyXG4gICAqIEByZXR1cm5zIE9MIHByb2plY3Rpb25cclxuICAgKi9cclxuICBnZXRPbFByb2plY3Rpb24oKTogT2xQcm9qZWN0aW9uIHtcclxuICAgIHJldHVybiB0aGlzLm9sVmlldy5nZXRQcm9qZWN0aW9uKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIGN1cnJlbnQgbWFwIHZpZXcgY2VudGVyXHJcbiAgICogQHBhcmFtIHByb2plY3Rpb24gT3V0cHV0IHByb2plY3Rpb25cclxuICAgKiBAcmV0dXJucyBDZW50ZXJcclxuICAgKi9cclxuICBnZXRDZW50ZXIocHJvamVjdGlvbj86IHN0cmluZyB8IE9sUHJvamVjdGlvbik6IFtudW1iZXIsIG51bWJlcl0ge1xyXG4gICAgbGV0IGNlbnRlciA9IHRoaXMub2xWaWV3LmdldENlbnRlcigpO1xyXG4gICAgaWYgKHByb2plY3Rpb24gJiYgY2VudGVyKSB7XHJcbiAgICAgIGNlbnRlciA9IG9scHJvai50cmFuc2Zvcm0oY2VudGVyLCB0aGlzLmdldE9sUHJvamVjdGlvbigpLCBwcm9qZWN0aW9uKTtcclxuICAgIH1cclxuICAgIHJldHVybiBjZW50ZXI7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIGN1cnJlbnQgdmlldyBleHRlbnRcclxuICAgKiBAcGFyYW0gcHJvamVjdGlvbiBPdXRwdXQgcHJvamVjdGlvblxyXG4gICAqIEByZXR1cm5zIEV4dGVudFxyXG4gICAqL1xyXG4gIGdldEV4dGVudChwcm9qZWN0aW9uPzogc3RyaW5nIHwgT2xQcm9qZWN0aW9uKTogTWFwRXh0ZW50IHtcclxuICAgIGxldCBleHRlbnQgPSB0aGlzLm9sVmlldy5jYWxjdWxhdGVFeHRlbnQodGhpcy5vbE1hcC5nZXRTaXplKCkpO1xyXG4gICAgaWYgKHByb2plY3Rpb24gJiYgZXh0ZW50KSB7XHJcbiAgICAgIGV4dGVudCA9IG9scHJvai50cmFuc2Zvcm1FeHRlbnQoXHJcbiAgICAgICAgZXh0ZW50LFxyXG4gICAgICAgIHRoaXMuZ2V0T2xQcm9qZWN0aW9uKCksXHJcbiAgICAgICAgcHJvamVjdGlvblxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGV4dGVudDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgY3VycmVudCBzY2FsZVxyXG4gICAqIEBwYXJhbSBkcGkgRG90IHBlciBpbmNoZXNcclxuICAgKiBAcmV0dXJucyBWaWV3IHNjYWxlXHJcbiAgICovXHJcbiAgZ2V0U2NhbGUoZHBpID0gOTYpIHtcclxuICAgIHJldHVybiBnZXRTY2FsZUZyb21SZXNvbHV0aW9uKFxyXG4gICAgICB0aGlzLmdldFJlc29sdXRpb24oKSxcclxuICAgICAgdGhpcy5nZXRPbFByb2plY3Rpb24oKS5nZXRVbml0cygpLFxyXG4gICAgICBkcGlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIGN1cnJlbnQgcmVzb2x1dGlvblxyXG4gICAqIEByZXR1cm5zIFByb2plY3Rpb24gZGVub21pbmF0b3JcclxuICAgKi9cclxuICBnZXRSZXNvbHV0aW9uKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5vbFZpZXcuZ2V0UmVzb2x1dGlvbigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBjdXJyZW50IHpvb20gbGV2ZWxcclxuICAgKiBAcmV0dXJucyBab29tIGxldmVsXHJcbiAgICovXHJcbiAgZ2V0Wm9vbSgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIE1hdGgucm91bmQodGhpcy5vbFZpZXcuZ2V0Wm9vbSgpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFpvb20gaW5cclxuICAgKi9cclxuICB6b29tSW4oKSB7XHJcbiAgICB0aGlzLnpvb21Ubyh0aGlzLm9sVmlldy5nZXRab29tKCkgKyAxKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFpvb20gb3V0XHJcbiAgICovXHJcbiAgem9vbU91dCgpIHtcclxuICAgIHRoaXMuem9vbVRvKHRoaXMub2xWaWV3LmdldFpvb20oKSAtIDEpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogWm9vbSB0byBzcGVjaWZpYyB6b29tIGxldmVsXHJcbiAgICogQHBhcmFtIHpvb20gWm9vbSBsZXZlbFxyXG4gICAqL1xyXG4gIHpvb21Ubyh6b29tOiBudW1iZXIpIHtcclxuICAgIHRoaXMub2xWaWV3LmNhbmNlbEFuaW1hdGlvbnMoKTtcclxuICAgIHRoaXMub2xWaWV3LmFuaW1hdGUoe1xyXG4gICAgICB6b29tLFxyXG4gICAgICBkdXJhdGlvbjogMjUwLFxyXG4gICAgICBlYXNpbmc6IG9sZWFzaW5nLmVhc2VPdXRcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTW92ZSB0byBleHRlbnQgYWZ0ZXIgYSBzaG9ydCBkZWxheSAoMTAwbXMpIHVubGVzc1xyXG4gICAqIGEgbmV3IG1vdmVtZW50IGdldHMgcmVnaXN0ZXJlZCBpbiB0aGUgbWVhbnRpbWUuXHJcbiAgICogQHBhcmFtIGV4dGVudCBFeHRlbnQgdG8gbW92ZSB0b1xyXG4gICAqL1xyXG4gIG1vdmVUb0V4dGVudChleHRlbnQ6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdKSB7XHJcbiAgICB0aGlzLmV4dGVudCQubmV4dCh7IGV4dGVudCwgYWN0aW9uOiBNYXBWaWV3QWN0aW9uLk1vdmUgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBab29tIHRvIGV4dGVudCBhZnRlciBhIHNob3J0IGRlbGF5ICgxMDBtcykgdW5sZXNzXHJcbiAgICogYSBuZXcgbW92ZW1lbnQgZ2V0cyByZWdpc3RlcmVkIGluIHRoZSBtZWFudGltZS5cclxuICAgKiBAcGFyYW0gZXh0ZW50IEV4dGVudCB0byB6b29tIHRvXHJcbiAgICovXHJcbiAgem9vbVRvRXh0ZW50KGV4dGVudDogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl0pIHtcclxuICAgIHRoaXMuZXh0ZW50JC5uZXh0KHsgZXh0ZW50LCBhY3Rpb246IE1hcFZpZXdBY3Rpb24uWm9vbSB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybiB0aGUgY3VycmVudCB2aWV3IHJvdGF0aW9uXHJcbiAgICogQHJldHVybnMgUm90YXRpb24gYW5nbGUgaW4gZGVncmVlc1xyXG4gICAqL1xyXG4gIGdldFJvdGF0aW9uKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5vbFZpZXcuZ2V0Um90YXRpb24oKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlc2V0IHRoZSB2aWV3IHJvdGF0aW9uIHRvIDBcclxuICAgKi9cclxuICByZXNldFJvdGF0aW9uKCkge1xyXG4gICAgdGhpcy5vbFZpZXcuYW5pbWF0ZSh7IHJvdGF0aW9uOiAwIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0aGUgdmlldyBoYXMgYSBwcmV2aW91cyBzdGF0ZVxyXG4gICAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZpZXcgaGFzIGEgcHJldmlvdXMgc3RhdGVcclxuICAgKi9cclxuICBoYXNQcmV2aW91c1N0YXRlKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuc3RhdGVzLmxlbmd0aCA+IDEgJiYgdGhpcy5zdGF0ZUluZGV4ID4gMDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgdGhlIHZpZXcgaGFzIGEgbmV4dCBzdGF0ZVxyXG4gICAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZpZXcgaGFzIGEgbmV4dCBzdGF0ZVxyXG4gICAqL1xyXG4gIGhhc05leHRTdGF0ZSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLnN0YXRlcy5sZW5ndGggPiAxICYmIHRoaXMuc3RhdGVJbmRleCA8IHRoaXMuc3RhdGVzLmxlbmd0aCAtIDE7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXN0b3JlIHRoZSBwcmV2aW91cyB2aWV3IHN0YXRlXHJcbiAgICovXHJcbiAgcHJldmlvdXNTdGF0ZSgpIHtcclxuICAgIGlmICh0aGlzLmhhc1ByZXZpb3VzU3RhdGUoKSkge1xyXG4gICAgICB0aGlzLnNldFN0YXRlSW5kZXgodGhpcy5zdGF0ZUluZGV4IC0gMSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXN0b3JlIHRoZSBuZXh0IHZpZXcgc3RhdGVcclxuICAgKi9cclxuICBuZXh0U3RhdGUoKSB7XHJcbiAgICBpZiAodGhpcy5oYXNOZXh0U3RhdGUoKSkge1xyXG4gICAgICB0aGlzLnNldFN0YXRlSW5kZXgodGhpcy5zdGF0ZUluZGV4ICsgMSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDbGVhciB0aGUgc3RhdGUgaGlzdG9yeVxyXG4gICAqL1xyXG4gIGNsZWFyU3RhdGVIaXN0b3J5KCkge1xyXG4gICAgdGhpcy5zdGF0ZXMgPSBbXTtcclxuICAgIHRoaXMuc3RhdGVJbmRleCA9IDA7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGUgdGhlIHRoZSB2aWV3IHRvIGl0J3MgaW50aWFsIHN0YXRlXHJcbiAgICovXHJcbiAgc2V0SW5pdGlhbFN0YXRlKCkge1xyXG4gICAgaWYgKHRoaXMuc3RhdGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgdGhpcy5zZXRTdGF0ZUluZGV4KDApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTW92ZSB0byB0aGUgZXh0ZW50IHJldHJpZXZlZCBmcm9tIHRoZSBzdHJlYW1cclxuICAgKiBAcGFyYW0gZXh0ZW50IEV4dGVudFxyXG4gICAqIEBwYXJhbSBhY3Rpb24gRWl0aGVyIHpvb20gb3IgbW92ZVxyXG4gICAqIEBwYXJhbSBhbmltYXRpb24gV2l0aCBvciB3aXRob3V0IGFuaW1hdGlvbiB0byB0aGUgdGFyZ2V0IGV4dGVudC5cclxuICAgKi9cclxuICBwcml2YXRlIHNldEV4dGVudChcclxuICAgIGV4dGVudDogTWFwRXh0ZW50LFxyXG4gICAgYWN0aW9uOiBNYXBWaWV3QWN0aW9uLFxyXG4gICAgYW5pbWF0aW9uOiBib29sZWFuID0gdHJ1ZVxyXG4gICkge1xyXG4gICAgY29uc3Qgb2xWaWV3ID0gdGhpcy5vbFZpZXc7XHJcbiAgICBvbFZpZXcuY2FuY2VsQW5pbWF0aW9ucygpO1xyXG4gICAgY29uc3QgZHVyYXRpb24gPSBhbmltYXRpb24gPyA1MDAgOiAwO1xyXG4gICAgY29uc3Qgem9vbSA9IG9sVmlldy5nZXRab29tKCk7XHJcblxyXG4gICAgY29uc3QgZnJvbUNlbnRlciA9IG9sVmlldy5nZXRDZW50ZXIoKTtcclxuICAgIGNvbnN0IHRvQ2VudGVyID0gW1xyXG4gICAgICBleHRlbnRbMF0gKyAoZXh0ZW50WzJdIC0gZXh0ZW50WzBdKSAvIDIsXHJcbiAgICAgIGV4dGVudFsxXSArIChleHRlbnRbM10gLSBleHRlbnRbMV0pIC8gMlxyXG4gICAgXTtcclxuICAgIGNvbnN0IGRpc3RDZW50ZXIgPSBNYXRoLnNxcnQoXHJcbiAgICAgIE1hdGgucG93KGZyb21DZW50ZXJbMF0gLSB0b0NlbnRlclswXSwgMikgK1xyXG4gICAgICAgIE1hdGgucG93KGZyb21DZW50ZXJbMV0gLSB0b0NlbnRlclsxXSwgMilcclxuICAgICk7XHJcbiAgICBjb25zdCBmcm9tRXh0ZW50ID0gb2xWaWV3LmNhbGN1bGF0ZUV4dGVudCgpO1xyXG4gICAgY29uc3QgZnJvbVNpemUgPSBNYXRoLnNxcnQoXHJcbiAgICAgIE1hdGgucG93KGZyb21FeHRlbnRbMl0gLSBmcm9tRXh0ZW50WzBdLCAyKSArXHJcbiAgICAgICAgTWF0aC5wb3coZnJvbUV4dGVudFszXSAtIGZyb21FeHRlbnRbMV0sIDIpXHJcbiAgICApO1xyXG4gICAgY29uc3QgdG9TaXplID0gTWF0aC5zcXJ0KFxyXG4gICAgICBNYXRoLnBvdyhleHRlbnRbMl0gLSBleHRlbnRbMF0sIDIpICsgTWF0aC5wb3coZXh0ZW50WzNdIC0gZXh0ZW50WzFdLCAyKVxyXG4gICAgKTtcclxuICAgIGNvbnN0IG1veVNpemUgPSAodG9TaXplICsgZnJvbVNpemUpIC8gMjtcclxuICAgIGNvbnN0IHhTaXplID0gZGlzdENlbnRlciAvIG1veVNpemU7XHJcblxyXG4gICAgY29uc3QgbWF4Wm9vbSA9XHJcbiAgICAgIGFjdGlvbiA9PT0gTWFwVmlld0FjdGlvbi5Nb3ZlIHx8IHpvb20gPiB0aGlzLm1heFpvb21PbkV4dGVudFxyXG4gICAgICAgID8gem9vbVxyXG4gICAgICAgIDogdGhpcy5tYXhab29tT25FeHRlbnQ7XHJcblxyXG4gICAgb2xWaWV3LmZpdChleHRlbnQsIHtcclxuICAgICAgbWF4Wm9vbSxcclxuICAgICAgcGFkZGluZzogdGhpcy5wYWRkaW5nLFxyXG4gICAgICBkdXJhdGlvbjogeFNpemUgPiA0ID8gMCA6IGR1cmF0aW9uXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCB0aGUgdmlldyBzdGF0ZSBpbmRleFxyXG4gICAqIEBwYXJhbSBpbmRleCBTdGF0ZSBpbmRleFxyXG4gICAqL1xyXG4gIHByaXZhdGUgc2V0U3RhdGVJbmRleChpbmRleDogbnVtYmVyKSB7XHJcbiAgICB0aGlzLnN0YXRlSW5kZXggPSBpbmRleDtcclxuICAgIHRoaXMuc2V0U3RhdGUodGhpcy5zdGF0ZXNbaW5kZXhdKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCB0aGUgdmlldyBzdGF0ZVxyXG4gICAqIEBwYXJhbSBzdGF0ZSBWaWV3IHN0YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzZXRTdGF0ZShzdGF0ZTogTWFwVmlld1N0YXRlKSB7XHJcbiAgICB0aGlzLm9sVmlldy5hbmltYXRlKHtcclxuICAgICAgcmVzb2x1dGlvbjogc3RhdGUucmVzb2x1dGlvbixcclxuICAgICAgY2VudGVyOiBzdGF0ZS5jZW50ZXIsXHJcbiAgICAgIGR1cmF0aW9uOiAwXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9uIG1vdmUgZW5kLCBnZXQgdGhlIHZpZXcgc3RhdGUgYW5kIHJlY29yZCBpdC5cclxuICAgKiBAcGFyYW0gZXZlbnQgTWFwIGV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvbk1vdmVFbmQoZXZlbnQ6IE9sTWFwRXZlbnQpIHtcclxuICAgIGNvbnN0IHJlc29sdXRpb24gPSB0aGlzLmdldFJlc29sdXRpb24oKTtcclxuICAgIGlmICh0aGlzLnJlc29sdXRpb24kLnZhbHVlICE9PSByZXNvbHV0aW9uKSB7XHJcbiAgICAgIHRoaXMucmVzb2x1dGlvbiQubmV4dChyZXNvbHV0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzdGF0ZSA9IHtcclxuICAgICAgcmVzb2x1dGlvbixcclxuICAgICAgY2VudGVyOiB0aGlzLmdldENlbnRlcigpLFxyXG4gICAgICB6b29tOiB0aGlzLmdldFpvb20oKVxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAodGhpcy5zdGF0ZUhpc3RvcnkgPT09IHRydWUpIHtcclxuICAgICAgY29uc3Qgc3RhdGVJbmRleCA9IHRoaXMuc3RhdGVJbmRleDtcclxuICAgICAgY29uc3Qgc3RhdGVBdEluZGV4ID1cclxuICAgICAgICB0aGlzLnN0YXRlcy5sZW5ndGggPT09IDAgPyB1bmRlZmluZWQgOiB0aGlzLnN0YXRlc1tzdGF0ZUluZGV4XTtcclxuICAgICAgaWYgKCF2aWV3U3RhdGVzQXJlRXF1YWwoc3RhdGUsIHN0YXRlQXRJbmRleCkpIHtcclxuICAgICAgICB0aGlzLnN0YXRlcyA9IHRoaXMuc3RhdGVzLnNsaWNlKDAsIHN0YXRlSW5kZXggKyAxKS5jb25jYXQoW3N0YXRlXSk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZUluZGV4ID0gdGhpcy5zdGF0ZXMubGVuZ3RoIC0gMTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc3RhdGUkLm5leHQoc3RhdGUpO1xyXG4gIH1cclxufVxyXG4iXX0=