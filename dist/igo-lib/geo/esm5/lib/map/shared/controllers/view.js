/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var /**
 * Controller to handle map view interactions
 */
MapViewController = /** @class */ (function (_super) {
    tslib_1.__extends(MapViewController, _super);
    function MapViewController(options) {
        var _this = _super.call(this) || this;
        _this.options = options;
        /**
         * Observable of the current resolution
         */
        _this.resolution$ = new BehaviorSubject(undefined);
        /**
         * Observable of the current state
         */
        _this.state$ = new BehaviorSubject(undefined);
        /**
         * Extent stream
         */
        _this.extent$ = new Subject();
        /**
         * History of states
         */
        _this.states = [];
        /**
         * Current state index
         */
        _this.stateIndex = 0;
        return _this;
    }
    Object.defineProperty(MapViewController.prototype, "stateHistory", {
        /**
         * Whether the view controller should keep the view's state history
         */
        get: /**
         * Whether the view controller should keep the view's state history
         * @return {?}
         */
        function () {
            return this.options ? this.options.stateHistory === true : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapViewController.prototype, "olView", {
        /**
         * OL View
         */
        get: /**
         * OL View
         * @return {?}
         */
        function () { return this.olMap.getView(); },
        enumerable: true,
        configurable: true
    });
    /**
     * Add or remove this controller to/from a map.
     * @param map OL Map
     */
    /**
     * Add or remove this controller to/from a map.
     * @param {?} olMap
     * @return {?}
     */
    MapViewController.prototype.setOlMap = /**
     * Add or remove this controller to/from a map.
     * @param {?} olMap
     * @return {?}
     */
    function (olMap) {
        _super.prototype.setOlMap.call(this, olMap);
        this.setupObservers();
    };
    /**
     * Observe move moveend and subscribe to the extent stream
     */
    /**
     * Observe move moveend and subscribe to the extent stream
     * @return {?}
     */
    MapViewController.prototype.setupObservers = /**
     * Observe move moveend and subscribe to the extent stream
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.stateHistory === true) {
            this.observerKeys.push(this.olMap.on('moveend', (/**
             * @param {?} event
             * @return {?}
             */
            function (event) { return _this.onMoveEnd(event); })));
        }
        this.extent$$ = this.extent$
            .pipe(debounceTime(25))
            .subscribe((/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            _this.setExtent(value.extent, value.action);
        }));
    };
    /**
     * Teardown any observers
     */
    /**
     * Teardown any observers
     * @return {?}
     */
    MapViewController.prototype.teardownObservers = /**
     * Teardown any observers
     * @return {?}
     */
    function () {
        _super.prototype.teardownObservers.call(this);
        if (this.extent$$ !== undefined) {
            this.extent$$.unsubscribe();
            this.extent$$ = undefined;
        }
    };
    /**
     * Get the view's OL projection
     * @returns OL projection
     */
    /**
     * Get the view's OL projection
     * @return {?} OL projection
     */
    MapViewController.prototype.getOlProjection = /**
     * Get the view's OL projection
     * @return {?} OL projection
     */
    function () {
        return this.olView.getProjection();
    };
    /**
     * Get the current map view center
     * @param projection Output projection
     * @returns Center
     */
    /**
     * Get the current map view center
     * @param {?=} projection Output projection
     * @return {?} Center
     */
    MapViewController.prototype.getCenter = /**
     * Get the current map view center
     * @param {?=} projection Output projection
     * @return {?} Center
     */
    function (projection) {
        /** @type {?} */
        var center = this.olView.getCenter();
        if (projection && center) {
            center = olproj.transform(center, this.getOlProjection(), projection);
        }
        return center;
    };
    /**
     * Get the current view extent
     * @param projection Output projection
     * @returns Extent
     */
    /**
     * Get the current view extent
     * @param {?=} projection Output projection
     * @return {?} Extent
     */
    MapViewController.prototype.getExtent = /**
     * Get the current view extent
     * @param {?=} projection Output projection
     * @return {?} Extent
     */
    function (projection) {
        /** @type {?} */
        var extent = this.olView.calculateExtent(this.olMap.getSize());
        if (projection && extent) {
            extent = olproj.transformExtent(extent, this.getOlProjection(), projection);
        }
        return extent;
    };
    /**
     * Get the current scale
     * @param dpi Dot per inches
     * @returns View scale
     */
    /**
     * Get the current scale
     * @param {?=} dpi Dot per inches
     * @return {?} View scale
     */
    MapViewController.prototype.getScale = /**
     * Get the current scale
     * @param {?=} dpi Dot per inches
     * @return {?} View scale
     */
    function (dpi) {
        if (dpi === void 0) { dpi = 72; }
        return getScaleFromResolution(this.getResolution(), this.getOlProjection().getUnits(), dpi);
    };
    /**
     * Get the current resolution
     * @returns Projection denominator
     */
    /**
     * Get the current resolution
     * @return {?} Projection denominator
     */
    MapViewController.prototype.getResolution = /**
     * Get the current resolution
     * @return {?} Projection denominator
     */
    function () {
        return this.olView.getResolution();
    };
    /**
     * Get the current zoom level
     * @returns Zoom level
     */
    /**
     * Get the current zoom level
     * @return {?} Zoom level
     */
    MapViewController.prototype.getZoom = /**
     * Get the current zoom level
     * @return {?} Zoom level
     */
    function () {
        return Math.round(this.olView.getZoom());
    };
    /**
     * Zoom in
     */
    /**
     * Zoom in
     * @return {?}
     */
    MapViewController.prototype.zoomIn = /**
     * Zoom in
     * @return {?}
     */
    function () {
        this.zoomTo(this.olView.getZoom() + 1);
    };
    /**
     * Zoom out
     */
    /**
     * Zoom out
     * @return {?}
     */
    MapViewController.prototype.zoomOut = /**
     * Zoom out
     * @return {?}
     */
    function () {
        this.zoomTo(this.olView.getZoom() - 1);
    };
    /**
     * Zoom to specific zoom level
     * @param zoom Zoom level
     */
    /**
     * Zoom to specific zoom level
     * @param {?} zoom Zoom level
     * @return {?}
     */
    MapViewController.prototype.zoomTo = /**
     * Zoom to specific zoom level
     * @param {?} zoom Zoom level
     * @return {?}
     */
    function (zoom) {
        this.olView.animate({
            zoom: zoom,
            duration: 250,
            easing: oleasing.easeOut
        });
    };
    /**
     * Move to extent after a short delay (100ms) unless
     * a new movement gets registered in the meantime.
     * @param extent Extent to move to
     */
    /**
     * Move to extent after a short delay (100ms) unless
     * a new movement gets registered in the meantime.
     * @param {?} extent Extent to move to
     * @return {?}
     */
    MapViewController.prototype.moveToExtent = /**
     * Move to extent after a short delay (100ms) unless
     * a new movement gets registered in the meantime.
     * @param {?} extent Extent to move to
     * @return {?}
     */
    function (extent) {
        this.extent$.next({ extent: extent, action: MapViewAction.Move });
    };
    /**
     * Zoom to extent after a short delay (100ms) unless
     * a new movement gets registered in the meantime.
     * @param extent Extent to zoom to
     */
    /**
     * Zoom to extent after a short delay (100ms) unless
     * a new movement gets registered in the meantime.
     * @param {?} extent Extent to zoom to
     * @return {?}
     */
    MapViewController.prototype.zoomToExtent = /**
     * Zoom to extent after a short delay (100ms) unless
     * a new movement gets registered in the meantime.
     * @param {?} extent Extent to zoom to
     * @return {?}
     */
    function (extent) {
        this.extent$.next({ extent: extent, action: MapViewAction.Zoom });
    };
    /**
     * Return the current view rotation
     * @returns Rotation angle in degrees
     */
    /**
     * Return the current view rotation
     * @return {?} Rotation angle in degrees
     */
    MapViewController.prototype.getRotation = /**
     * Return the current view rotation
     * @return {?} Rotation angle in degrees
     */
    function () {
        return this.olView.getRotation();
    };
    /**
     * Reset the view rotation to 0
     */
    /**
     * Reset the view rotation to 0
     * @return {?}
     */
    MapViewController.prototype.resetRotation = /**
     * Reset the view rotation to 0
     * @return {?}
     */
    function () {
        this.olView.setRotation(0);
    };
    /**
     * Whether the view has a previous state
     * @returns True if the view has a previous state
     */
    /**
     * Whether the view has a previous state
     * @return {?} True if the view has a previous state
     */
    MapViewController.prototype.hasPreviousState = /**
     * Whether the view has a previous state
     * @return {?} True if the view has a previous state
     */
    function () {
        return this.states.length > 1 && this.stateIndex > 0;
    };
    /**
     * Whether the view has a next state
     * @returns True if the view has a next state
     */
    /**
     * Whether the view has a next state
     * @return {?} True if the view has a next state
     */
    MapViewController.prototype.hasNextState = /**
     * Whether the view has a next state
     * @return {?} True if the view has a next state
     */
    function () {
        return this.states.length > 1 && this.stateIndex < this.states.length - 1;
    };
    /**
     * Restore the previous view state
     */
    /**
     * Restore the previous view state
     * @return {?}
     */
    MapViewController.prototype.previousState = /**
     * Restore the previous view state
     * @return {?}
     */
    function () {
        if (this.hasPreviousState()) {
            this.setStateIndex(this.stateIndex - 1);
        }
    };
    /**
     * Restore the next view state
     */
    /**
     * Restore the next view state
     * @return {?}
     */
    MapViewController.prototype.nextState = /**
     * Restore the next view state
     * @return {?}
     */
    function () {
        if (this.hasNextState()) {
            this.setStateIndex(this.stateIndex + 1);
        }
    };
    /**
     * Clear the state history
     */
    /**
     * Clear the state history
     * @return {?}
     */
    MapViewController.prototype.clearStateHistory = /**
     * Clear the state history
     * @return {?}
     */
    function () {
        this.states = [];
        this.stateIndex = 0;
    };
    /**
     * Update the the view to it's intial state
     */
    /**
     * Update the the view to it's intial state
     * @return {?}
     */
    MapViewController.prototype.setInitialState = /**
     * Update the the view to it's intial state
     * @return {?}
     */
    function () {
        if (this.states.length > 0) {
            this.setStateIndex(0);
        }
    };
    /**
     * Move to the extent retrieved from the stream
     * @param extent Extent
     * @param action Either zoom or move
     */
    /**
     * Move to the extent retrieved from the stream
     * @private
     * @param {?} extent Extent
     * @param {?} action Either zoom or move
     * @return {?}
     */
    MapViewController.prototype.setExtent = /**
     * Move to the extent retrieved from the stream
     * @private
     * @param {?} extent Extent
     * @param {?} action Either zoom or move
     * @return {?}
     */
    function (extent, action) {
        /** @type {?} */
        var olView = this.olView;
        if (action === MapViewAction.Zoom) {
            olView.fit(extent, { maxZoom: 17 });
        }
        else if (action === MapViewAction.Move) {
            olView.fit(extent, { maxZoom: olView.getZoom() });
        }
    };
    /**
     * Set the view state index
     * @param index State index
     */
    /**
     * Set the view state index
     * @private
     * @param {?} index State index
     * @return {?}
     */
    MapViewController.prototype.setStateIndex = /**
     * Set the view state index
     * @private
     * @param {?} index State index
     * @return {?}
     */
    function (index) {
        this.stateIndex = index;
        this.setState(this.states[index]);
    };
    /**
     * Set the view state
     * @param state View state
     */
    /**
     * Set the view state
     * @private
     * @param {?} state View state
     * @return {?}
     */
    MapViewController.prototype.setState = /**
     * Set the view state
     * @private
     * @param {?} state View state
     * @return {?}
     */
    function (state) {
        this.olView.animate({
            resolution: state.resolution,
            center: state.center,
            duration: 0
        });
    };
    /**
     * On move end, get the view state and record it.
     * @param event Map event
     */
    /**
     * On move end, get the view state and record it.
     * @private
     * @param {?} event Map event
     * @return {?}
     */
    MapViewController.prototype.onMoveEnd = /**
     * On move end, get the view state and record it.
     * @private
     * @param {?} event Map event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var resolution = this.getResolution();
        if (this.resolution$.value !== resolution) {
            this.resolution$.next(resolution);
        }
        /** @type {?} */
        var state = {
            resolution: resolution,
            center: this.getCenter(),
            zoom: this.getZoom()
        };
        if (this.stateHistory === true) {
            /** @type {?} */
            var stateIndex = this.stateIndex;
            /** @type {?} */
            var stateAtIndex = this.states.length === 0 ? undefined : this.states[stateIndex];
            if (!viewStatesAreEqual(state, stateAtIndex)) {
                this.states = this.states.slice(0, stateIndex + 1).concat([state]);
                this.stateIndex = this.states.length - 1;
            }
        }
        this.state$.next(state);
    };
    return MapViewController;
}(MapController));
/**
 * Controller to handle map view interactions
 */
export { MapViewController };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9tYXAvc2hhcmVkL2NvbnRyb2xsZXJzL3ZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFHQSxPQUFPLEVBQUUsZUFBZSxFQUFFLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTlDLE9BQU8sS0FBSyxRQUFRLE1BQU0sV0FBVyxDQUFDO0FBQ3RDLE9BQU8sS0FBSyxNQUFNLE1BQU0sU0FBUyxDQUFDO0FBSWxDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFN0MsT0FBTyxFQUFFLHNCQUFzQixFQUFFLGtCQUFrQixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxjQUFjLENBQUM7Ozs7QUFFN0MsOENBRUM7OztJQURDLGdEQUFzQjs7Ozs7QUFNeEI7Ozs7SUFBdUMsNkNBQWE7SUE0Q2xELDJCQUFvQixPQUFrQztRQUF0RCxZQUNFLGlCQUFPLFNBQ1I7UUFGbUIsYUFBTyxHQUFQLE9BQU8sQ0FBMkI7Ozs7UUF2Q3RELGlCQUFXLEdBQUcsSUFBSSxlQUFlLENBQVMsU0FBUyxDQUFDLENBQUM7Ozs7UUFLckQsWUFBTSxHQUFHLElBQUksZUFBZSxDQUFlLFNBQVMsQ0FBQyxDQUFDOzs7O1FBSzlDLGFBQU8sR0FBRyxJQUFJLE9BQU8sRUFBOEMsQ0FBQzs7OztRQVVwRSxZQUFNLEdBQW1CLEVBQUUsQ0FBQzs7OztRQUs1QixnQkFBVSxHQUFXLENBQUMsQ0FBQzs7SUFnQi9CLENBQUM7SUFYRCxzQkFBSSwyQ0FBWTtRQUhoQjs7V0FFRzs7Ozs7UUFDSDtZQUNFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEtBQUssSUFBSSxDQUFDLENBQUMs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c291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE9sTWFwIGZyb20gJ29sL01hcCc7XHJcbmltcG9ydCBPbE1hcEV2ZW50IGZyb20gJ29sL01hcEV2ZW50JztcclxuXHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGRlYm91bmNlVGltZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCAqIGFzIG9sZWFzaW5nIGZyb20gJ29sL2Vhc2luZyc7XHJcbmltcG9ydCAqIGFzIG9scHJvaiBmcm9tICdvbC9wcm9qJztcclxuaW1wb3J0IE9sUHJvamVjdGlvbiBmcm9tICdvbC9wcm9qL1Byb2plY3Rpb24nO1xyXG5pbXBvcnQgT2xWaWV3IGZyb20gJ29sL1ZpZXcnO1xyXG5cclxuaW1wb3J0IHsgTWFwVmlld0FjdGlvbiB9IGZyb20gJy4uL21hcC5lbnVtcyc7XHJcbmltcG9ydCB7IE1hcEV4dGVudCwgTWFwVmlld1N0YXRlIH0gZnJvbSAnLi4vbWFwLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IGdldFNjYWxlRnJvbVJlc29sdXRpb24sIHZpZXdTdGF0ZXNBcmVFcXVhbCB9IGZyb20gJy4uL21hcC51dGlscyc7XHJcbmltcG9ydCB7IE1hcENvbnRyb2xsZXIgfSBmcm9tICcuL2NvbnRyb2xsZXInO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBNYXBWaWV3Q29udHJvbGxlck9wdGlvbnMge1xyXG4gIHN0YXRlSGlzdG9yeTogYm9vbGVhbjtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbnRyb2xsZXIgdG8gaGFuZGxlIG1hcCB2aWV3IGludGVyYWN0aW9uc1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE1hcFZpZXdDb250cm9sbGVyIGV4dGVuZHMgTWFwQ29udHJvbGxlciB7XHJcblxyXG4gIC8qKlxyXG4gICAqIE9ic2VydmFibGUgb2YgdGhlIGN1cnJlbnQgcmVzb2x1dGlvblxyXG4gICAqL1xyXG4gIHJlc29sdXRpb24kID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KHVuZGVmaW5lZCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIE9ic2VydmFibGUgb2YgdGhlIGN1cnJlbnQgc3RhdGVcclxuICAgKi9cclxuICBzdGF0ZSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE1hcFZpZXdTdGF0ZT4odW5kZWZpbmVkKTtcclxuXHJcbiAgLyoqXHJcbiAgICogRXh0ZW50IHN0cmVhbVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZXh0ZW50JCA9IG5ldyBTdWJqZWN0PHtleHRlbnQ6IE1hcEV4dGVudCwgYWN0aW9uOiBNYXBWaWV3QWN0aW9ufT4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaXB0aW9uIHRvIHRoZSBtb3ZlbWVudCBzdHJlYW1cclxuICAgKi9cclxuICBwcml2YXRlIGV4dGVudCQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIEhpc3Rvcnkgb2Ygc3RhdGVzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzdGF0ZXM6IE1hcFZpZXdTdGF0ZVtdID0gW107XHJcblxyXG4gIC8qKlxyXG4gICAqIEN1cnJlbnQgc3RhdGUgaW5kZXhcclxuICAgKi9cclxuICBwcml2YXRlIHN0YXRlSW5kZXg6IG51bWJlciA9IDA7XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgdGhlIHZpZXcgY29udHJvbGxlciBzaG91bGQga2VlcCB0aGUgdmlldydzIHN0YXRlIGhpc3RvcnlcclxuICAgKi9cclxuICBnZXQgc3RhdGVIaXN0b3J5KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucyA/IHRoaXMub3B0aW9ucy5zdGF0ZUhpc3RvcnkgPT09IHRydWUgOiBmYWxzZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9MIFZpZXdcclxuICAgKi9cclxuICBnZXQgb2xWaWV3KCk6IE9sVmlldyB7IHJldHVybiB0aGlzLm9sTWFwLmdldFZpZXcoKTsgfVxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG9wdGlvbnM/OiBNYXBWaWV3Q29udHJvbGxlck9wdGlvbnMpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgb3IgcmVtb3ZlIHRoaXMgY29udHJvbGxlciB0by9mcm9tIGEgbWFwLlxyXG4gICAqIEBwYXJhbSBtYXAgT0wgTWFwXHJcbiAgICovXHJcbiAgc2V0T2xNYXAob2xNYXA6IE9sTWFwIHwgdW5kZWZpbmVkKSB7XHJcbiAgICBzdXBlci5zZXRPbE1hcChvbE1hcCk7XHJcbiAgICB0aGlzLnNldHVwT2JzZXJ2ZXJzKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBPYnNlcnZlIG1vdmUgbW92ZWVuZCBhbmQgc3Vic2NyaWJlIHRvIHRoZSBleHRlbnQgc3RyZWFtXHJcbiAgICovXHJcbiAgc2V0dXBPYnNlcnZlcnMoKSB7XHJcbiAgICBpZiAodGhpcy5zdGF0ZUhpc3RvcnkgPT09IHRydWUpIHtcclxuICAgICAgdGhpcy5vYnNlcnZlcktleXMucHVzaChcclxuICAgICAgICB0aGlzLm9sTWFwLm9uKCdtb3ZlZW5kJywgKGV2ZW50OiBPbE1hcEV2ZW50KSA9PiB0aGlzLm9uTW92ZUVuZChldmVudCkpXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5leHRlbnQkJCA9IHRoaXMuZXh0ZW50JFxyXG4gICAgICAucGlwZShkZWJvdW5jZVRpbWUoMjUpKVxyXG4gICAgICAuc3Vic2NyaWJlKCh2YWx1ZToge2V4dGVudDogTWFwRXh0ZW50LCBhY3Rpb246IE1hcFZpZXdBY3Rpb259KSA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXRFeHRlbnQodmFsdWUuZXh0ZW50LCB2YWx1ZS5hY3Rpb24pO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRlYXJkb3duIGFueSBvYnNlcnZlcnNcclxuICAgKi9cclxuICB0ZWFyZG93bk9ic2VydmVycygpIHtcclxuICAgIHN1cGVyLnRlYXJkb3duT2JzZXJ2ZXJzKCk7XHJcbiAgICBpZiAodGhpcy5leHRlbnQkJCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuZXh0ZW50JCQudW5zdWJzY3JpYmUoKTtcclxuICAgICAgdGhpcy5leHRlbnQkJCA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgdmlldydzIE9MIHByb2plY3Rpb25cclxuICAgKiBAcmV0dXJucyBPTCBwcm9qZWN0aW9uXHJcbiAgICovXHJcbiAgZ2V0T2xQcm9qZWN0aW9uKCk6IE9sUHJvamVjdGlvbiB7XHJcbiAgICByZXR1cm4gdGhpcy5vbFZpZXcuZ2V0UHJvamVjdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBjdXJyZW50IG1hcCB2aWV3IGNlbnRlclxyXG4gICAqIEBwYXJhbSBwcm9qZWN0aW9uIE91dHB1dCBwcm9qZWN0aW9uXHJcbiAgICogQHJldHVybnMgQ2VudGVyXHJcbiAgICovXHJcbiAgZ2V0Q2VudGVyKHByb2plY3Rpb24/OiBzdHJpbmcgfCBPbFByb2plY3Rpb24pOiBbbnVtYmVyLCBudW1iZXJdIHtcclxuICAgIGxldCBjZW50ZXIgPSB0aGlzLm9sVmlldy5nZXRDZW50ZXIoKTtcclxuICAgIGlmIChwcm9qZWN0aW9uICYmIGNlbnRlcikge1xyXG4gICAgICBjZW50ZXIgPSBvbHByb2oudHJhbnNmb3JtKGNlbnRlciwgdGhpcy5nZXRPbFByb2plY3Rpb24oKSwgcHJvamVjdGlvbik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY2VudGVyO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBjdXJyZW50IHZpZXcgZXh0ZW50XHJcbiAgICogQHBhcmFtIHByb2plY3Rpb24gT3V0cHV0IHByb2plY3Rpb25cclxuICAgKiBAcmV0dXJucyBFeHRlbnRcclxuICAgKi9cclxuICBnZXRFeHRlbnQocHJvamVjdGlvbj86IHN0cmluZyB8IE9sUHJvamVjdGlvbik6IE1hcEV4dGVudCB7XHJcbiAgICBsZXQgZXh0ZW50ID0gdGhpcy5vbFZpZXcuY2FsY3VsYXRlRXh0ZW50KHRoaXMub2xNYXAuZ2V0U2l6ZSgpKTtcclxuICAgIGlmIChwcm9qZWN0aW9uICYmIGV4dGVudCkge1xyXG4gICAgICBleHRlbnQgPSBvbHByb2oudHJhbnNmb3JtRXh0ZW50KGV4dGVudCwgdGhpcy5nZXRPbFByb2plY3Rpb24oKSwgcHJvamVjdGlvbik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZXh0ZW50O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBjdXJyZW50IHNjYWxlXHJcbiAgICogQHBhcmFtIGRwaSBEb3QgcGVyIGluY2hlc1xyXG4gICAqIEByZXR1cm5zIFZpZXcgc2NhbGVcclxuICAgKi9cclxuICBnZXRTY2FsZShkcGkgPSA3Mikge1xyXG4gICAgcmV0dXJuIGdldFNjYWxlRnJvbVJlc29sdXRpb24oXHJcbiAgICAgIHRoaXMuZ2V0UmVzb2x1dGlvbigpLFxyXG4gICAgICB0aGlzLmdldE9sUHJvamVjdGlvbigpLmdldFVuaXRzKCksXHJcbiAgICAgIGRwaVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgY3VycmVudCByZXNvbHV0aW9uXHJcbiAgICogQHJldHVybnMgUHJvamVjdGlvbiBkZW5vbWluYXRvclxyXG4gICAqL1xyXG4gIGdldFJlc29sdXRpb24oKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLm9sVmlldy5nZXRSZXNvbHV0aW9uKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIGN1cnJlbnQgem9vbSBsZXZlbFxyXG4gICAqIEByZXR1cm5zIFpvb20gbGV2ZWxcclxuICAgKi9cclxuICBnZXRab29tKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gTWF0aC5yb3VuZCh0aGlzLm9sVmlldy5nZXRab29tKCkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogWm9vbSBpblxyXG4gICAqL1xyXG4gIHpvb21JbigpIHtcclxuICAgIHRoaXMuem9vbVRvKHRoaXMub2xWaWV3LmdldFpvb20oKSArIDEpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogWm9vbSBvdXRcclxuICAgKi9cclxuICB6b29tT3V0KCkge1xyXG4gICAgdGhpcy56b29tVG8odGhpcy5vbFZpZXcuZ2V0Wm9vbSgpIC0gMSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBab29tIHRvIHNwZWNpZmljIHpvb20gbGV2ZWxcclxuICAgKiBAcGFyYW0gem9vbSBab29tIGxldmVsXHJcbiAgICovXHJcbiAgem9vbVRvKHpvb206IG51bWJlcikge1xyXG4gICAgdGhpcy5vbFZpZXcuYW5pbWF0ZSh7XHJcbiAgICAgIHpvb20sXHJcbiAgICAgIGR1cmF0aW9uOiAyNTAsXHJcbiAgICAgIGVhc2luZzogb2xlYXNpbmcuZWFzZU91dFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBNb3ZlIHRvIGV4dGVudCBhZnRlciBhIHNob3J0IGRlbGF5ICgxMDBtcykgdW5sZXNzXHJcbiAgICogYSBuZXcgbW92ZW1lbnQgZ2V0cyByZWdpc3RlcmVkIGluIHRoZSBtZWFudGltZS5cclxuICAgKiBAcGFyYW0gZXh0ZW50IEV4dGVudCB0byBtb3ZlIHRvXHJcbiAgICovXHJcbiAgbW92ZVRvRXh0ZW50KGV4dGVudDogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl0pIHtcclxuICAgIHRoaXMuZXh0ZW50JC5uZXh0KHtleHRlbnQsIGFjdGlvbjogTWFwVmlld0FjdGlvbi5Nb3ZlfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBab29tIHRvIGV4dGVudCBhZnRlciBhIHNob3J0IGRlbGF5ICgxMDBtcykgdW5sZXNzXHJcbiAgICogYSBuZXcgbW92ZW1lbnQgZ2V0cyByZWdpc3RlcmVkIGluIHRoZSBtZWFudGltZS5cclxuICAgKiBAcGFyYW0gZXh0ZW50IEV4dGVudCB0byB6b29tIHRvXHJcbiAgICovXHJcbiAgem9vbVRvRXh0ZW50KGV4dGVudDogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl0pIHtcclxuICAgIHRoaXMuZXh0ZW50JC5uZXh0KHtleHRlbnQsIGFjdGlvbjogTWFwVmlld0FjdGlvbi5ab29tfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm4gdGhlIGN1cnJlbnQgdmlldyByb3RhdGlvblxyXG4gICAqIEByZXR1cm5zIFJvdGF0aW9uIGFuZ2xlIGluIGRlZ3JlZXNcclxuICAgKi9cclxuICBnZXRSb3RhdGlvbigpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMub2xWaWV3LmdldFJvdGF0aW9uKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXNldCB0aGUgdmlldyByb3RhdGlvbiB0byAwXHJcbiAgICovXHJcbiAgcmVzZXRSb3RhdGlvbigpIHtcclxuICAgIHRoaXMub2xWaWV3LnNldFJvdGF0aW9uKDApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0aGUgdmlldyBoYXMgYSBwcmV2aW91cyBzdGF0ZVxyXG4gICAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZpZXcgaGFzIGEgcHJldmlvdXMgc3RhdGVcclxuICAgKi9cclxuICBoYXNQcmV2aW91c1N0YXRlKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuc3RhdGVzLmxlbmd0aCA+IDEgJiYgdGhpcy5zdGF0ZUluZGV4ID4gMDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgdGhlIHZpZXcgaGFzIGEgbmV4dCBzdGF0ZVxyXG4gICAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZpZXcgaGFzIGEgbmV4dCBzdGF0ZVxyXG4gICAqL1xyXG4gIGhhc05leHRTdGF0ZSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLnN0YXRlcy5sZW5ndGggPiAxICYmIHRoaXMuc3RhdGVJbmRleCA8IHRoaXMuc3RhdGVzLmxlbmd0aCAtIDE7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXN0b3JlIHRoZSBwcmV2aW91cyB2aWV3IHN0YXRlXHJcbiAgICovXHJcbiAgcHJldmlvdXNTdGF0ZSgpIHtcclxuICAgIGlmICh0aGlzLmhhc1ByZXZpb3VzU3RhdGUoKSkge1xyXG4gICAgICB0aGlzLnNldFN0YXRlSW5kZXgodGhpcy5zdGF0ZUluZGV4IC0gMSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXN0b3JlIHRoZSBuZXh0IHZpZXcgc3RhdGVcclxuICAgKi9cclxuICBuZXh0U3RhdGUoKSB7XHJcbiAgICBpZiAodGhpcy5oYXNOZXh0U3RhdGUoKSkge1xyXG4gICAgICB0aGlzLnNldFN0YXRlSW5kZXgodGhpcy5zdGF0ZUluZGV4ICsgMSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDbGVhciB0aGUgc3RhdGUgaGlzdG9yeVxyXG4gICAqL1xyXG4gIGNsZWFyU3RhdGVIaXN0b3J5KCkge1xyXG4gICAgdGhpcy5zdGF0ZXMgPSBbXTtcclxuICAgIHRoaXMuc3RhdGVJbmRleCA9IDA7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGUgdGhlIHRoZSB2aWV3IHRvIGl0J3MgaW50aWFsIHN0YXRlXHJcbiAgICovXHJcbiAgc2V0SW5pdGlhbFN0YXRlKCkge1xyXG4gICAgaWYgKHRoaXMuc3RhdGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgdGhpcy5zZXRTdGF0ZUluZGV4KDApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTW92ZSB0byB0aGUgZXh0ZW50IHJldHJpZXZlZCBmcm9tIHRoZSBzdHJlYW1cclxuICAgKiBAcGFyYW0gZXh0ZW50IEV4dGVudFxyXG4gICAqIEBwYXJhbSBhY3Rpb24gRWl0aGVyIHpvb20gb3IgbW92ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgc2V0RXh0ZW50KGV4dGVudDogTWFwRXh0ZW50LCBhY3Rpb246IE1hcFZpZXdBY3Rpb24pIHtcclxuICAgIGNvbnN0IG9sVmlldyA9IHRoaXMub2xWaWV3O1xyXG4gICAgaWYgKGFjdGlvbiA9PT0gTWFwVmlld0FjdGlvbi5ab29tKSB7XHJcbiAgICAgIG9sVmlldy5maXQoZXh0ZW50LCB7bWF4Wm9vbTogMTd9KTtcclxuICAgIH0gZWxzZSBpZiAoYWN0aW9uID09PSBNYXBWaWV3QWN0aW9uLk1vdmUpIHtcclxuICAgICAgb2xWaWV3LmZpdChleHRlbnQsIHttYXhab29tOiBvbFZpZXcuZ2V0Wm9vbSgpfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgdGhlIHZpZXcgc3RhdGUgaW5kZXhcclxuICAgKiBAcGFyYW0gaW5kZXggU3RhdGUgaW5kZXhcclxuICAgKi9cclxuICBwcml2YXRlIHNldFN0YXRlSW5kZXgoaW5kZXg6IG51bWJlcikge1xyXG4gICAgdGhpcy5zdGF0ZUluZGV4ID0gaW5kZXg7XHJcbiAgICB0aGlzLnNldFN0YXRlKHRoaXMuc3RhdGVzW2luZGV4XSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgdGhlIHZpZXcgc3RhdGVcclxuICAgKiBAcGFyYW0gc3RhdGUgVmlldyBzdGF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgc2V0U3RhdGUoc3RhdGU6IE1hcFZpZXdTdGF0ZSkge1xyXG4gICAgdGhpcy5vbFZpZXcuYW5pbWF0ZSh7XHJcbiAgICAgIHJlc29sdXRpb246IHN0YXRlLnJlc29sdXRpb24sXHJcbiAgICAgIGNlbnRlcjogc3RhdGUuY2VudGVyLFxyXG4gICAgICBkdXJhdGlvbjogMFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBPbiBtb3ZlIGVuZCwgZ2V0IHRoZSB2aWV3IHN0YXRlIGFuZCByZWNvcmQgaXQuXHJcbiAgICogQHBhcmFtIGV2ZW50IE1hcCBldmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgb25Nb3ZlRW5kKGV2ZW50OiBPbE1hcEV2ZW50KSB7XHJcbiAgICBjb25zdCByZXNvbHV0aW9uID0gdGhpcy5nZXRSZXNvbHV0aW9uKCk7XHJcbiAgICBpZiAodGhpcy5yZXNvbHV0aW9uJC52YWx1ZSAhPT0gcmVzb2x1dGlvbikge1xyXG4gICAgICB0aGlzLnJlc29sdXRpb24kLm5leHQocmVzb2x1dGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc3RhdGUgPSB7XHJcbiAgICAgIHJlc29sdXRpb24sXHJcbiAgICAgIGNlbnRlcjogdGhpcy5nZXRDZW50ZXIoKSxcclxuICAgICAgem9vbTogdGhpcy5nZXRab29tKClcclxuICAgIH07XHJcblxyXG4gICAgaWYgKHRoaXMuc3RhdGVIaXN0b3J5ID09PSB0cnVlKSB7XHJcbiAgICAgIGNvbnN0IHN0YXRlSW5kZXggPSB0aGlzLnN0YXRlSW5kZXg7XHJcbiAgICAgIGNvbnN0IHN0YXRlQXRJbmRleCA9IHRoaXMuc3RhdGVzLmxlbmd0aCA9PT0gMCA/IHVuZGVmaW5lZCA6IHRoaXMuc3RhdGVzW3N0YXRlSW5kZXhdO1xyXG4gICAgICBpZiAoIXZpZXdTdGF0ZXNBcmVFcXVhbChzdGF0ZSwgc3RhdGVBdEluZGV4KSkge1xyXG4gICAgICAgIHRoaXMuc3RhdGVzID0gdGhpcy5zdGF0ZXMuc2xpY2UoMCwgc3RhdGVJbmRleCArIDEpLmNvbmNhdChbc3RhdGVdKTtcclxuICAgICAgICB0aGlzLnN0YXRlSW5kZXggPSB0aGlzLnN0YXRlcy5sZW5ndGggLSAxO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zdGF0ZSQubmV4dChzdGF0ZSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==