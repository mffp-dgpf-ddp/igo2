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
    get olView() { return this.olMap.getView(); }
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
    getScale(dpi = 72) {
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
     * @return {?}
     */
    setExtent(extent, action) {
        /** @type {?} */
        const olView = this.olView;
        if (action === MapViewAction.Zoom) {
            olView.fit(extent, { maxZoom: 17 });
        }
        else if (action === MapViewAction.Move) {
            olView.fit(extent, { maxZoom: olView.getZoom() });
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9tYXAvc2hhcmVkL2NvbnRyb2xsZXJzL3ZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUdBLE9BQU8sRUFBRSxlQUFlLEVBQUUsT0FBTyxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFOUMsT0FBTyxLQUFLLFFBQVEsTUFBTSxXQUFXLENBQUM7QUFDdEMsT0FBTyxLQUFLLE1BQU0sTUFBTSxTQUFTLENBQUM7QUFJbEMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUU3QyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDMUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGNBQWMsQ0FBQzs7OztBQUU3Qyw4Q0FFQzs7O0lBREMsZ0RBQXNCOzs7OztBQU14QixNQUFNLE9BQU8saUJBQWtCLFNBQVEsYUFBYTs7OztJQTRDbEQsWUFBb0IsT0FBa0M7UUFDcEQsS0FBSyxFQUFFLENBQUM7UUFEVSxZQUFPLEdBQVAsT0FBTyxDQUEyQjs7OztRQXZDdEQsZ0JBQVcsR0FBRyxJQUFJLGVBQWUsQ0FBUyxTQUFTLENBQUMsQ0FBQzs7OztRQUtyRCxXQUFNLEdBQUcsSUFBSSxlQUFlLENBQWUsU0FBUyxDQUFDLENBQUM7Ozs7UUFLOUMsWUFBTyxHQUFHLElBQUksT0FBTyxFQUE4QyxDQUFDOzs7O1FBVXBFLFdBQU0sR0FBbUIsRUFBRSxDQUFDOzs7O1FBSzVCLGVBQVUsR0FBVyxDQUFDLENBQUM7SUFnQi9CLENBQUM7Ozs7O0lBWEQsSUFBSSxZQUFZO1FBQ2QsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUss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TUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7YUFDMUM7U0FDRjtRQUVELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFCLENBQUM7Q0FDRjs7Ozs7O0lBM1RDLHdDQUFxRDs7Ozs7SUFLckQsbUNBQXNEOzs7Ozs7SUFLdEQsb0NBQTRFOzs7Ozs7SUFLNUUscUNBQStCOzs7Ozs7SUFLL0IsbUNBQW9DOzs7Ozs7SUFLcEMsdUNBQStCOzs7OztJQWNuQixvQ0FBMEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgT2xNYXAgZnJvbSAnb2wvTWFwJztcclxuaW1wb3J0IE9sTWFwRXZlbnQgZnJvbSAnb2wvTWFwRXZlbnQnO1xyXG5cclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgZGVib3VuY2VUaW1lIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0ICogYXMgb2xlYXNpbmcgZnJvbSAnb2wvZWFzaW5nJztcclxuaW1wb3J0ICogYXMgb2xwcm9qIGZyb20gJ29sL3Byb2onO1xyXG5pbXBvcnQgT2xQcm9qZWN0aW9uIGZyb20gJ29sL3Byb2ovUHJvamVjdGlvbic7XHJcbmltcG9ydCBPbFZpZXcgZnJvbSAnb2wvVmlldyc7XHJcblxyXG5pbXBvcnQgeyBNYXBWaWV3QWN0aW9uIH0gZnJvbSAnLi4vbWFwLmVudW1zJztcclxuaW1wb3J0IHsgTWFwRXh0ZW50LCBNYXBWaWV3U3RhdGUgfSBmcm9tICcuLi9tYXAuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgZ2V0U2NhbGVGcm9tUmVzb2x1dGlvbiwgdmlld1N0YXRlc0FyZUVxdWFsIH0gZnJvbSAnLi4vbWFwLnV0aWxzJztcclxuaW1wb3J0IHsgTWFwQ29udHJvbGxlciB9IGZyb20gJy4vY29udHJvbGxlcic7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE1hcFZpZXdDb250cm9sbGVyT3B0aW9ucyB7XHJcbiAgc3RhdGVIaXN0b3J5OiBib29sZWFuO1xyXG59XHJcblxyXG4vKipcclxuICogQ29udHJvbGxlciB0byBoYW5kbGUgbWFwIHZpZXcgaW50ZXJhY3Rpb25zXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTWFwVmlld0NvbnRyb2xsZXIgZXh0ZW5kcyBNYXBDb250cm9sbGVyIHtcclxuXHJcbiAgLyoqXHJcbiAgICogT2JzZXJ2YWJsZSBvZiB0aGUgY3VycmVudCByZXNvbHV0aW9uXHJcbiAgICovXHJcbiAgcmVzb2x1dGlvbiQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4odW5kZWZpbmVkKTtcclxuXHJcbiAgLyoqXHJcbiAgICogT2JzZXJ2YWJsZSBvZiB0aGUgY3VycmVudCBzdGF0ZVxyXG4gICAqL1xyXG4gIHN0YXRlJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TWFwVmlld1N0YXRlPih1bmRlZmluZWQpO1xyXG5cclxuICAvKipcclxuICAgKiBFeHRlbnQgc3RyZWFtXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBleHRlbnQkID0gbmV3IFN1YmplY3Q8e2V4dGVudDogTWFwRXh0ZW50LCBhY3Rpb246IE1hcFZpZXdBY3Rpb259PigpO1xyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpcHRpb24gdG8gdGhlIG1vdmVtZW50IHN0cmVhbVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZXh0ZW50JCQ6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogSGlzdG9yeSBvZiBzdGF0ZXNcclxuICAgKi9cclxuICBwcml2YXRlIHN0YXRlczogTWFwVmlld1N0YXRlW10gPSBbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogQ3VycmVudCBzdGF0ZSBpbmRleFxyXG4gICAqL1xyXG4gIHByaXZhdGUgc3RhdGVJbmRleDogbnVtYmVyID0gMDtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0aGUgdmlldyBjb250cm9sbGVyIHNob3VsZCBrZWVwIHRoZSB2aWV3J3Mgc3RhdGUgaGlzdG9yeVxyXG4gICAqL1xyXG4gIGdldCBzdGF0ZUhpc3RvcnkoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zID8gdGhpcy5vcHRpb25zLnN0YXRlSGlzdG9yeSA9PT0gdHJ1ZSA6IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT0wgVmlld1xyXG4gICAqL1xyXG4gIGdldCBvbFZpZXcoKTogT2xWaWV3IHsgcmV0dXJuIHRoaXMub2xNYXAuZ2V0VmlldygpOyB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgb3B0aW9ucz86IE1hcFZpZXdDb250cm9sbGVyT3B0aW9ucykge1xyXG4gICAgc3VwZXIoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBvciByZW1vdmUgdGhpcyBjb250cm9sbGVyIHRvL2Zyb20gYSBtYXAuXHJcbiAgICogQHBhcmFtIG1hcCBPTCBNYXBcclxuICAgKi9cclxuICBzZXRPbE1hcChvbE1hcDogT2xNYXAgfCB1bmRlZmluZWQpIHtcclxuICAgIHN1cGVyLnNldE9sTWFwKG9sTWFwKTtcclxuICAgIHRoaXMuc2V0dXBPYnNlcnZlcnMoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9ic2VydmUgbW92ZSBtb3ZlZW5kIGFuZCBzdWJzY3JpYmUgdG8gdGhlIGV4dGVudCBzdHJlYW1cclxuICAgKi9cclxuICBzZXR1cE9ic2VydmVycygpIHtcclxuICAgIGlmICh0aGlzLnN0YXRlSGlzdG9yeSA9PT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLm9ic2VydmVyS2V5cy5wdXNoKFxyXG4gICAgICAgIHRoaXMub2xNYXAub24oJ21vdmVlbmQnLCAoZXZlbnQ6IE9sTWFwRXZlbnQpID0+IHRoaXMub25Nb3ZlRW5kKGV2ZW50KSlcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmV4dGVudCQkID0gdGhpcy5leHRlbnQkXHJcbiAgICAgIC5waXBlKGRlYm91bmNlVGltZSgyNSkpXHJcbiAgICAgIC5zdWJzY3JpYmUoKHZhbHVlOiB7ZXh0ZW50OiBNYXBFeHRlbnQsIGFjdGlvbjogTWFwVmlld0FjdGlvbn0pID0+IHtcclxuICAgICAgICB0aGlzLnNldEV4dGVudCh2YWx1ZS5leHRlbnQsIHZhbHVlLmFjdGlvbik7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGVhcmRvd24gYW55IG9ic2VydmVyc1xyXG4gICAqL1xyXG4gIHRlYXJkb3duT2JzZXJ2ZXJzKCkge1xyXG4gICAgc3VwZXIudGVhcmRvd25PYnNlcnZlcnMoKTtcclxuICAgIGlmICh0aGlzLmV4dGVudCQkICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5leHRlbnQkJC51bnN1YnNjcmliZSgpO1xyXG4gICAgICB0aGlzLmV4dGVudCQkID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSB2aWV3J3MgT0wgcHJvamVjdGlvblxyXG4gICAqIEByZXR1cm5zIE9MIHByb2plY3Rpb25cclxuICAgKi9cclxuICBnZXRPbFByb2plY3Rpb24oKTogT2xQcm9qZWN0aW9uIHtcclxuICAgIHJldHVybiB0aGlzLm9sVmlldy5nZXRQcm9qZWN0aW9uKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIGN1cnJlbnQgbWFwIHZpZXcgY2VudGVyXHJcbiAgICogQHBhcmFtIHByb2plY3Rpb24gT3V0cHV0IHByb2plY3Rpb25cclxuICAgKiBAcmV0dXJucyBDZW50ZXJcclxuICAgKi9cclxuICBnZXRDZW50ZXIocHJvamVjdGlvbj86IHN0cmluZyB8IE9sUHJvamVjdGlvbik6IFtudW1iZXIsIG51bWJlcl0ge1xyXG4gICAgbGV0IGNlbnRlciA9IHRoaXMub2xWaWV3LmdldENlbnRlcigpO1xyXG4gICAgaWYgKHByb2plY3Rpb24gJiYgY2VudGVyKSB7XHJcbiAgICAgIGNlbnRlciA9IG9scHJvai50cmFuc2Zvcm0oY2VudGVyLCB0aGlzLmdldE9sUHJvamVjdGlvbigpLCBwcm9qZWN0aW9uKTtcclxuICAgIH1cclxuICAgIHJldHVybiBjZW50ZXI7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIGN1cnJlbnQgdmlldyBleHRlbnRcclxuICAgKiBAcGFyYW0gcHJvamVjdGlvbiBPdXRwdXQgcHJvamVjdGlvblxyXG4gICAqIEByZXR1cm5zIEV4dGVudFxyXG4gICAqL1xyXG4gIGdldEV4dGVudChwcm9qZWN0aW9uPzogc3RyaW5nIHwgT2xQcm9qZWN0aW9uKTogTWFwRXh0ZW50IHtcclxuICAgIGxldCBleHRlbnQgPSB0aGlzLm9sVmlldy5jYWxjdWxhdGVFeHRlbnQodGhpcy5vbE1hcC5nZXRTaXplKCkpO1xyXG4gICAgaWYgKHByb2plY3Rpb24gJiYgZXh0ZW50KSB7XHJcbiAgICAgIGV4dGVudCA9IG9scHJvai50cmFuc2Zvcm1FeHRlbnQoZXh0ZW50LCB0aGlzLmdldE9sUHJvamVjdGlvbigpLCBwcm9qZWN0aW9uKTtcclxuICAgIH1cclxuICAgIHJldHVybiBleHRlbnQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIGN1cnJlbnQgc2NhbGVcclxuICAgKiBAcGFyYW0gZHBpIERvdCBwZXIgaW5jaGVzXHJcbiAgICogQHJldHVybnMgVmlldyBzY2FsZVxyXG4gICAqL1xyXG4gIGdldFNjYWxlKGRwaSA9IDcyKSB7XHJcbiAgICByZXR1cm4gZ2V0U2NhbGVGcm9tUmVzb2x1dGlvbihcclxuICAgICAgdGhpcy5nZXRSZXNvbHV0aW9uKCksXHJcbiAgICAgIHRoaXMuZ2V0T2xQcm9qZWN0aW9uKCkuZ2V0VW5pdHMoKSxcclxuICAgICAgZHBpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBjdXJyZW50IHJlc29sdXRpb25cclxuICAgKiBAcmV0dXJucyBQcm9qZWN0aW9uIGRlbm9taW5hdG9yXHJcbiAgICovXHJcbiAgZ2V0UmVzb2x1dGlvbigpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMub2xWaWV3LmdldFJlc29sdXRpb24oKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgY3VycmVudCB6b29tIGxldmVsXHJcbiAgICogQHJldHVybnMgWm9vbSBsZXZlbFxyXG4gICAqL1xyXG4gIGdldFpvb20oKTogbnVtYmVyIHtcclxuICAgIHJldHVybiBNYXRoLnJvdW5kKHRoaXMub2xWaWV3LmdldFpvb20oKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBab29tIGluXHJcbiAgICovXHJcbiAgem9vbUluKCkge1xyXG4gICAgdGhpcy56b29tVG8odGhpcy5vbFZpZXcuZ2V0Wm9vbSgpICsgMSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBab29tIG91dFxyXG4gICAqL1xyXG4gIHpvb21PdXQoKSB7XHJcbiAgICB0aGlzLnpvb21Ubyh0aGlzLm9sVmlldy5nZXRab29tKCkgLSAxKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFpvb20gdG8gc3BlY2lmaWMgem9vbSBsZXZlbFxyXG4gICAqIEBwYXJhbSB6b29tIFpvb20gbGV2ZWxcclxuICAgKi9cclxuICB6b29tVG8oem9vbTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLm9sVmlldy5hbmltYXRlKHtcclxuICAgICAgem9vbSxcclxuICAgICAgZHVyYXRpb246IDI1MCxcclxuICAgICAgZWFzaW5nOiBvbGVhc2luZy5lYXNlT3V0XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE1vdmUgdG8gZXh0ZW50IGFmdGVyIGEgc2hvcnQgZGVsYXkgKDEwMG1zKSB1bmxlc3NcclxuICAgKiBhIG5ldyBtb3ZlbWVudCBnZXRzIHJlZ2lzdGVyZWQgaW4gdGhlIG1lYW50aW1lLlxyXG4gICAqIEBwYXJhbSBleHRlbnQgRXh0ZW50IHRvIG1vdmUgdG9cclxuICAgKi9cclxuICBtb3ZlVG9FeHRlbnQoZXh0ZW50OiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXSkge1xyXG4gICAgdGhpcy5leHRlbnQkLm5leHQoe2V4dGVudCwgYWN0aW9uOiBNYXBWaWV3QWN0aW9uLk1vdmV9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFpvb20gdG8gZXh0ZW50IGFmdGVyIGEgc2hvcnQgZGVsYXkgKDEwMG1zKSB1bmxlc3NcclxuICAgKiBhIG5ldyBtb3ZlbWVudCBnZXRzIHJlZ2lzdGVyZWQgaW4gdGhlIG1lYW50aW1lLlxyXG4gICAqIEBwYXJhbSBleHRlbnQgRXh0ZW50IHRvIHpvb20gdG9cclxuICAgKi9cclxuICB6b29tVG9FeHRlbnQoZXh0ZW50OiBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXSkge1xyXG4gICAgdGhpcy5leHRlbnQkLm5leHQoe2V4dGVudCwgYWN0aW9uOiBNYXBWaWV3QWN0aW9uLlpvb219KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybiB0aGUgY3VycmVudCB2aWV3IHJvdGF0aW9uXHJcbiAgICogQHJldHVybnMgUm90YXRpb24gYW5nbGUgaW4gZGVncmVlc1xyXG4gICAqL1xyXG4gIGdldFJvdGF0aW9uKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5vbFZpZXcuZ2V0Um90YXRpb24oKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlc2V0IHRoZSB2aWV3IHJvdGF0aW9uIHRvIDBcclxuICAgKi9cclxuICByZXNldFJvdGF0aW9uKCkge1xyXG4gICAgdGhpcy5vbFZpZXcuYW5pbWF0ZSh7cm90YXRpb246IDB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgdGhlIHZpZXcgaGFzIGEgcHJldmlvdXMgc3RhdGVcclxuICAgKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2aWV3IGhhcyBhIHByZXZpb3VzIHN0YXRlXHJcbiAgICovXHJcbiAgaGFzUHJldmlvdXNTdGF0ZSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLnN0YXRlcy5sZW5ndGggPiAxICYmIHRoaXMuc3RhdGVJbmRleCA+IDA7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIHRoZSB2aWV3IGhhcyBhIG5leHQgc3RhdGVcclxuICAgKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB2aWV3IGhhcyBhIG5leHQgc3RhdGVcclxuICAgKi9cclxuICBoYXNOZXh0U3RhdGUoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5zdGF0ZXMubGVuZ3RoID4gMSAmJiB0aGlzLnN0YXRlSW5kZXggPCB0aGlzLnN0YXRlcy5sZW5ndGggLSAxO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVzdG9yZSB0aGUgcHJldmlvdXMgdmlldyBzdGF0ZVxyXG4gICAqL1xyXG4gIHByZXZpb3VzU3RhdGUoKSB7XHJcbiAgICBpZiAodGhpcy5oYXNQcmV2aW91c1N0YXRlKCkpIHtcclxuICAgICAgdGhpcy5zZXRTdGF0ZUluZGV4KHRoaXMuc3RhdGVJbmRleCAtIDEpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVzdG9yZSB0aGUgbmV4dCB2aWV3IHN0YXRlXHJcbiAgICovXHJcbiAgbmV4dFN0YXRlKCkge1xyXG4gICAgaWYgKHRoaXMuaGFzTmV4dFN0YXRlKCkpIHtcclxuICAgICAgdGhpcy5zZXRTdGF0ZUluZGV4KHRoaXMuc3RhdGVJbmRleCArIDEpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2xlYXIgdGhlIHN0YXRlIGhpc3RvcnlcclxuICAgKi9cclxuICBjbGVhclN0YXRlSGlzdG9yeSgpIHtcclxuICAgIHRoaXMuc3RhdGVzID0gW107XHJcbiAgICB0aGlzLnN0YXRlSW5kZXggPSAwO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlIHRoZSB0aGUgdmlldyB0byBpdCdzIGludGlhbCBzdGF0ZVxyXG4gICAqL1xyXG4gIHNldEluaXRpYWxTdGF0ZSgpIHtcclxuICAgIGlmICh0aGlzLnN0YXRlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHRoaXMuc2V0U3RhdGVJbmRleCgwKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE1vdmUgdG8gdGhlIGV4dGVudCByZXRyaWV2ZWQgZnJvbSB0aGUgc3RyZWFtXHJcbiAgICogQHBhcmFtIGV4dGVudCBFeHRlbnRcclxuICAgKiBAcGFyYW0gYWN0aW9uIEVpdGhlciB6b29tIG9yIG1vdmVcclxuICAgKi9cclxuICBwcml2YXRlIHNldEV4dGVudChleHRlbnQ6IE1hcEV4dGVudCwgYWN0aW9uOiBNYXBWaWV3QWN0aW9uKSB7XHJcbiAgICBjb25zdCBvbFZpZXcgPSB0aGlzLm9sVmlldztcclxuICAgIGlmIChhY3Rpb24gPT09IE1hcFZpZXdBY3Rpb24uWm9vbSkge1xyXG4gICAgICBvbFZpZXcuZml0KGV4dGVudCwge21heFpvb206IDE3fSk7XHJcbiAgICB9IGVsc2UgaWYgKGFjdGlvbiA9PT0gTWFwVmlld0FjdGlvbi5Nb3ZlKSB7XHJcbiAgICAgIG9sVmlldy5maXQoZXh0ZW50LCB7bWF4Wm9vbTogb2xWaWV3LmdldFpvb20oKX0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IHRoZSB2aWV3IHN0YXRlIGluZGV4XHJcbiAgICogQHBhcmFtIGluZGV4IFN0YXRlIGluZGV4XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzZXRTdGF0ZUluZGV4KGluZGV4OiBudW1iZXIpIHtcclxuICAgIHRoaXMuc3RhdGVJbmRleCA9IGluZGV4O1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh0aGlzLnN0YXRlc1tpbmRleF0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IHRoZSB2aWV3IHN0YXRlXHJcbiAgICogQHBhcmFtIHN0YXRlIFZpZXcgc3RhdGVcclxuICAgKi9cclxuICBwcml2YXRlIHNldFN0YXRlKHN0YXRlOiBNYXBWaWV3U3RhdGUpIHtcclxuICAgIHRoaXMub2xWaWV3LmFuaW1hdGUoe1xyXG4gICAgICByZXNvbHV0aW9uOiBzdGF0ZS5yZXNvbHV0aW9uLFxyXG4gICAgICBjZW50ZXI6IHN0YXRlLmNlbnRlcixcclxuICAgICAgZHVyYXRpb246IDBcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT24gbW92ZSBlbmQsIGdldCB0aGUgdmlldyBzdGF0ZSBhbmQgcmVjb3JkIGl0LlxyXG4gICAqIEBwYXJhbSBldmVudCBNYXAgZXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIG9uTW92ZUVuZChldmVudDogT2xNYXBFdmVudCkge1xyXG4gICAgY29uc3QgcmVzb2x1dGlvbiA9IHRoaXMuZ2V0UmVzb2x1dGlvbigpO1xyXG4gICAgaWYgKHRoaXMucmVzb2x1dGlvbiQudmFsdWUgIT09IHJlc29sdXRpb24pIHtcclxuICAgICAgdGhpcy5yZXNvbHV0aW9uJC5uZXh0KHJlc29sdXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHN0YXRlID0ge1xyXG4gICAgICByZXNvbHV0aW9uLFxyXG4gICAgICBjZW50ZXI6IHRoaXMuZ2V0Q2VudGVyKCksXHJcbiAgICAgIHpvb206IHRoaXMuZ2V0Wm9vbSgpXHJcbiAgICB9O1xyXG5cclxuICAgIGlmICh0aGlzLnN0YXRlSGlzdG9yeSA9PT0gdHJ1ZSkge1xyXG4gICAgICBjb25zdCBzdGF0ZUluZGV4ID0gdGhpcy5zdGF0ZUluZGV4O1xyXG4gICAgICBjb25zdCBzdGF0ZUF0SW5kZXggPSB0aGlzLnN0YXRlcy5sZW5ndGggPT09IDAgPyB1bmRlZmluZWQgOiB0aGlzLnN0YXRlc1tzdGF0ZUluZGV4XTtcclxuICAgICAgaWYgKCF2aWV3U3RhdGVzQXJlRXF1YWwoc3RhdGUsIHN0YXRlQXRJbmRleCkpIHtcclxuICAgICAgICB0aGlzLnN0YXRlcyA9IHRoaXMuc3RhdGVzLnNsaWNlKDAsIHN0YXRlSW5kZXggKyAxKS5jb25jYXQoW3N0YXRlXSk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZUluZGV4ID0gdGhpcy5zdGF0ZXMubGVuZ3RoIC0gMTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc3RhdGUkLm5leHQoc3RhdGUpO1xyXG4gIH1cclxufVxyXG4iXX0=