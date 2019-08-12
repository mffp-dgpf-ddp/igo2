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
        this.olView.setRotation(0);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9tYXAvc2hhcmVkL2NvbnRyb2xsZXJzL3ZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUdBLE9BQU8sRUFBRSxlQUFlLEVBQUUsT0FBTyxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFOUMsT0FBTyxLQUFLLFFBQVEsTUFBTSxXQUFXLENBQUM7QUFDdEMsT0FBTyxLQUFLLE1BQU0sTUFBTSxTQUFTLENBQUM7QUFJbEMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUU3QyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDMUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGNBQWMsQ0FBQzs7OztBQUU3Qyw4Q0FFQzs7O0lBREMsZ0RBQXNCOzs7OztBQU14QixNQUFNLE9BQU8saUJBQWtCLFNBQVEsYUFBYTs7OztJQTRDbEQsWUFBb0IsT0FBa0M7UUFDcEQsS0FBSyxFQUFFLENBQUM7UUFEVSxZQUFPLEdBQVAsT0FBTyxDQUEyQjs7OztRQXZDdEQsZ0JBQVcsR0FBRyxJQUFJLGVBQWUsQ0FBUyxTQUFTLENBQUMsQ0FBQzs7OztRQUtyRCxXQUFNLEdBQUcsSUFBSSxlQUFlLENBQWUsU0FBUyxDQUFDLENBQUM7Ozs7UUFLOUMsWUFBTyxHQUFHLElBQUksT0FBTyxFQUE4QyxDQUFDOzs7O1FBVXBFLFdBQU0sR0FBbUIsRUFBRSxDQUFDOzs7O1FBSzVCLGVBQVUsR0FBVyxDQUFDLENBQUM7SUFnQi9CLENBQUM7Ozs7O0lBWEQsSUFBSSxZQUFZO1FBQ2QsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUss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Q0FBQyxDQUFDO2FBQzFDO1NBQ0Y7UUFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMxQixDQUFDO0NBQ0Y7Ozs7OztJQTNUQyx3Q0FBcUQ7Ozs7O0lBS3JELG1DQUFzRDs7Ozs7O0lBS3RELG9DQUE0RTs7Ozs7O0lBSzVFLHFDQUErQjs7Ozs7O0lBSy9CLG1DQUFvQzs7Ozs7O0lBS3BDLHVDQUErQjs7Ozs7SUFjbkIsb0NBQTBDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE9sTWFwIGZyb20gJ29sL01hcCc7XHJcbmltcG9ydCBPbE1hcEV2ZW50IGZyb20gJ29sL01hcEV2ZW50JztcclxuXHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGRlYm91bmNlVGltZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCAqIGFzIG9sZWFzaW5nIGZyb20gJ29sL2Vhc2luZyc7XHJcbmltcG9ydCAqIGFzIG9scHJvaiBmcm9tICdvbC9wcm9qJztcclxuaW1wb3J0IE9sUHJvamVjdGlvbiBmcm9tICdvbC9wcm9qL1Byb2plY3Rpb24nO1xyXG5pbXBvcnQgT2xWaWV3IGZyb20gJ29sL1ZpZXcnO1xyXG5cclxuaW1wb3J0IHsgTWFwVmlld0FjdGlvbiB9IGZyb20gJy4uL21hcC5lbnVtcyc7XHJcbmltcG9ydCB7IE1hcEV4dGVudCwgTWFwVmlld1N0YXRlIH0gZnJvbSAnLi4vbWFwLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IGdldFNjYWxlRnJvbVJlc29sdXRpb24sIHZpZXdTdGF0ZXNBcmVFcXVhbCB9IGZyb20gJy4uL21hcC51dGlscyc7XHJcbmltcG9ydCB7IE1hcENvbnRyb2xsZXIgfSBmcm9tICcuL2NvbnRyb2xsZXInO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBNYXBWaWV3Q29udHJvbGxlck9wdGlvbnMge1xyXG4gIHN0YXRlSGlzdG9yeTogYm9vbGVhbjtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbnRyb2xsZXIgdG8gaGFuZGxlIG1hcCB2aWV3IGludGVyYWN0aW9uc1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE1hcFZpZXdDb250cm9sbGVyIGV4dGVuZHMgTWFwQ29udHJvbGxlciB7XHJcblxyXG4gIC8qKlxyXG4gICAqIE9ic2VydmFibGUgb2YgdGhlIGN1cnJlbnQgcmVzb2x1dGlvblxyXG4gICAqL1xyXG4gIHJlc29sdXRpb24kID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KHVuZGVmaW5lZCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIE9ic2VydmFibGUgb2YgdGhlIGN1cnJlbnQgc3RhdGVcclxuICAgKi9cclxuICBzdGF0ZSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE1hcFZpZXdTdGF0ZT4odW5kZWZpbmVkKTtcclxuXHJcbiAgLyoqXHJcbiAgICogRXh0ZW50IHN0cmVhbVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZXh0ZW50JCA9IG5ldyBTdWJqZWN0PHtleHRlbnQ6IE1hcEV4dGVudCwgYWN0aW9uOiBNYXBWaWV3QWN0aW9ufT4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaXB0aW9uIHRvIHRoZSBtb3ZlbWVudCBzdHJlYW1cclxuICAgKi9cclxuICBwcml2YXRlIGV4dGVudCQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIEhpc3Rvcnkgb2Ygc3RhdGVzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzdGF0ZXM6IE1hcFZpZXdTdGF0ZVtdID0gW107XHJcblxyXG4gIC8qKlxyXG4gICAqIEN1cnJlbnQgc3RhdGUgaW5kZXhcclxuICAgKi9cclxuICBwcml2YXRlIHN0YXRlSW5kZXg6IG51bWJlciA9IDA7XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgdGhlIHZpZXcgY29udHJvbGxlciBzaG91bGQga2VlcCB0aGUgdmlldydzIHN0YXRlIGhpc3RvcnlcclxuICAgKi9cclxuICBnZXQgc3RhdGVIaXN0b3J5KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucyA/IHRoaXMub3B0aW9ucy5zdGF0ZUhpc3RvcnkgPT09IHRydWUgOiBmYWxzZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9MIFZpZXdcclxuICAgKi9cclxuICBnZXQgb2xWaWV3KCk6IE9sVmlldyB7IHJldHVybiB0aGlzLm9sTWFwLmdldFZpZXcoKTsgfVxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG9wdGlvbnM/OiBNYXBWaWV3Q29udHJvbGxlck9wdGlvbnMpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgb3IgcmVtb3ZlIHRoaXMgY29udHJvbGxlciB0by9mcm9tIGEgbWFwLlxyXG4gICAqIEBwYXJhbSBtYXAgT0wgTWFwXHJcbiAgICovXHJcbiAgc2V0T2xNYXAob2xNYXA6IE9sTWFwIHwgdW5kZWZpbmVkKSB7XHJcbiAgICBzdXBlci5zZXRPbE1hcChvbE1hcCk7XHJcbiAgICB0aGlzLnNldHVwT2JzZXJ2ZXJzKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBPYnNlcnZlIG1vdmUgbW92ZWVuZCBhbmQgc3Vic2NyaWJlIHRvIHRoZSBleHRlbnQgc3RyZWFtXHJcbiAgICovXHJcbiAgc2V0dXBPYnNlcnZlcnMoKSB7XHJcbiAgICBpZiAodGhpcy5zdGF0ZUhpc3RvcnkgPT09IHRydWUpIHtcclxuICAgICAgdGhpcy5vYnNlcnZlcktleXMucHVzaChcclxuICAgICAgICB0aGlzLm9sTWFwLm9uKCdtb3ZlZW5kJywgKGV2ZW50OiBPbE1hcEV2ZW50KSA9PiB0aGlzLm9uTW92ZUVuZChldmVudCkpXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5leHRlbnQkJCA9IHRoaXMuZXh0ZW50JFxyXG4gICAgICAucGlwZShkZWJvdW5jZVRpbWUoMjUpKVxyXG4gICAgICAuc3Vic2NyaWJlKCh2YWx1ZToge2V4dGVudDogTWFwRXh0ZW50LCBhY3Rpb246IE1hcFZpZXdBY3Rpb259KSA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXRFeHRlbnQodmFsdWUuZXh0ZW50LCB2YWx1ZS5hY3Rpb24pO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRlYXJkb3duIGFueSBvYnNlcnZlcnNcclxuICAgKi9cclxuICB0ZWFyZG93bk9ic2VydmVycygpIHtcclxuICAgIHN1cGVyLnRlYXJkb3duT2JzZXJ2ZXJzKCk7XHJcbiAgICBpZiAodGhpcy5leHRlbnQkJCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuZXh0ZW50JCQudW5zdWJzY3JpYmUoKTtcclxuICAgICAgdGhpcy5leHRlbnQkJCA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgdmlldydzIE9MIHByb2plY3Rpb25cclxuICAgKiBAcmV0dXJucyBPTCBwcm9qZWN0aW9uXHJcbiAgICovXHJcbiAgZ2V0T2xQcm9qZWN0aW9uKCk6IE9sUHJvamVjdGlvbiB7XHJcbiAgICByZXR1cm4gdGhpcy5vbFZpZXcuZ2V0UHJvamVjdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBjdXJyZW50IG1hcCB2aWV3IGNlbnRlclxyXG4gICAqIEBwYXJhbSBwcm9qZWN0aW9uIE91dHB1dCBwcm9qZWN0aW9uXHJcbiAgICogQHJldHVybnMgQ2VudGVyXHJcbiAgICovXHJcbiAgZ2V0Q2VudGVyKHByb2plY3Rpb24/OiBzdHJpbmcgfCBPbFByb2plY3Rpb24pOiBbbnVtYmVyLCBudW1iZXJdIHtcclxuICAgIGxldCBjZW50ZXIgPSB0aGlzLm9sVmlldy5nZXRDZW50ZXIoKTtcclxuICAgIGlmIChwcm9qZWN0aW9uICYmIGNlbnRlcikge1xyXG4gICAgICBjZW50ZXIgPSBvbHByb2oudHJhbnNmb3JtKGNlbnRlciwgdGhpcy5nZXRPbFByb2plY3Rpb24oKSwgcHJvamVjdGlvbik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY2VudGVyO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBjdXJyZW50IHZpZXcgZXh0ZW50XHJcbiAgICogQHBhcmFtIHByb2plY3Rpb24gT3V0cHV0IHByb2plY3Rpb25cclxuICAgKiBAcmV0dXJucyBFeHRlbnRcclxuICAgKi9cclxuICBnZXRFeHRlbnQocHJvamVjdGlvbj86IHN0cmluZyB8IE9sUHJvamVjdGlvbik6IE1hcEV4dGVudCB7XHJcbiAgICBsZXQgZXh0ZW50ID0gdGhpcy5vbFZpZXcuY2FsY3VsYXRlRXh0ZW50KHRoaXMub2xNYXAuZ2V0U2l6ZSgpKTtcclxuICAgIGlmIChwcm9qZWN0aW9uICYmIGV4dGVudCkge1xyXG4gICAgICBleHRlbnQgPSBvbHByb2oudHJhbnNmb3JtRXh0ZW50KGV4dGVudCwgdGhpcy5nZXRPbFByb2plY3Rpb24oKSwgcHJvamVjdGlvbik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZXh0ZW50O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBjdXJyZW50IHNjYWxlXHJcbiAgICogQHBhcmFtIGRwaSBEb3QgcGVyIGluY2hlc1xyXG4gICAqIEByZXR1cm5zIFZpZXcgc2NhbGVcclxuICAgKi9cclxuICBnZXRTY2FsZShkcGkgPSA3Mikge1xyXG4gICAgcmV0dXJuIGdldFNjYWxlRnJvbVJlc29sdXRpb24oXHJcbiAgICAgIHRoaXMuZ2V0UmVzb2x1dGlvbigpLFxyXG4gICAgICB0aGlzLmdldE9sUHJvamVjdGlvbigpLmdldFVuaXRzKCksXHJcbiAgICAgIGRwaVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgY3VycmVudCByZXNvbHV0aW9uXHJcbiAgICogQHJldHVybnMgUHJvamVjdGlvbiBkZW5vbWluYXRvclxyXG4gICAqL1xyXG4gIGdldFJlc29sdXRpb24oKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLm9sVmlldy5nZXRSZXNvbHV0aW9uKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIGN1cnJlbnQgem9vbSBsZXZlbFxyXG4gICAqIEByZXR1cm5zIFpvb20gbGV2ZWxcclxuICAgKi9cclxuICBnZXRab29tKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gTWF0aC5yb3VuZCh0aGlzLm9sVmlldy5nZXRab29tKCkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogWm9vbSBpblxyXG4gICAqL1xyXG4gIHpvb21JbigpIHtcclxuICAgIHRoaXMuem9vbVRvKHRoaXMub2xWaWV3LmdldFpvb20oKSArIDEpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogWm9vbSBvdXRcclxuICAgKi9cclxuICB6b29tT3V0KCkge1xyXG4gICAgdGhpcy56b29tVG8odGhpcy5vbFZpZXcuZ2V0Wm9vbSgpIC0gMSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBab29tIHRvIHNwZWNpZmljIHpvb20gbGV2ZWxcclxuICAgKiBAcGFyYW0gem9vbSBab29tIGxldmVsXHJcbiAgICovXHJcbiAgem9vbVRvKHpvb206IG51bWJlcikge1xyXG4gICAgdGhpcy5vbFZpZXcuYW5pbWF0ZSh7XHJcbiAgICAgIHpvb20sXHJcbiAgICAgIGR1cmF0aW9uOiAyNTAsXHJcbiAgICAgIGVhc2luZzogb2xlYXNpbmcuZWFzZU91dFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBNb3ZlIHRvIGV4dGVudCBhZnRlciBhIHNob3J0IGRlbGF5ICgxMDBtcykgdW5sZXNzXHJcbiAgICogYSBuZXcgbW92ZW1lbnQgZ2V0cyByZWdpc3RlcmVkIGluIHRoZSBtZWFudGltZS5cclxuICAgKiBAcGFyYW0gZXh0ZW50IEV4dGVudCB0byBtb3ZlIHRvXHJcbiAgICovXHJcbiAgbW92ZVRvRXh0ZW50KGV4dGVudDogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl0pIHtcclxuICAgIHRoaXMuZXh0ZW50JC5uZXh0KHtleHRlbnQsIGFjdGlvbjogTWFwVmlld0FjdGlvbi5Nb3ZlfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBab29tIHRvIGV4dGVudCBhZnRlciBhIHNob3J0IGRlbGF5ICgxMDBtcykgdW5sZXNzXHJcbiAgICogYSBuZXcgbW92ZW1lbnQgZ2V0cyByZWdpc3RlcmVkIGluIHRoZSBtZWFudGltZS5cclxuICAgKiBAcGFyYW0gZXh0ZW50IEV4dGVudCB0byB6b29tIHRvXHJcbiAgICovXHJcbiAgem9vbVRvRXh0ZW50KGV4dGVudDogW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl0pIHtcclxuICAgIHRoaXMuZXh0ZW50JC5uZXh0KHtleHRlbnQsIGFjdGlvbjogTWFwVmlld0FjdGlvbi5ab29tfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm4gdGhlIGN1cnJlbnQgdmlldyByb3RhdGlvblxyXG4gICAqIEByZXR1cm5zIFJvdGF0aW9uIGFuZ2xlIGluIGRlZ3JlZXNcclxuICAgKi9cclxuICBnZXRSb3RhdGlvbigpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMub2xWaWV3LmdldFJvdGF0aW9uKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXNldCB0aGUgdmlldyByb3RhdGlvbiB0byAwXHJcbiAgICovXHJcbiAgcmVzZXRSb3RhdGlvbigpIHtcclxuICAgIHRoaXMub2xWaWV3LnNldFJvdGF0aW9uKDApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0aGUgdmlldyBoYXMgYSBwcmV2aW91cyBzdGF0ZVxyXG4gICAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZpZXcgaGFzIGEgcHJldmlvdXMgc3RhdGVcclxuICAgKi9cclxuICBoYXNQcmV2aW91c1N0YXRlKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuc3RhdGVzLmxlbmd0aCA+IDEgJiYgdGhpcy5zdGF0ZUluZGV4ID4gMDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgdGhlIHZpZXcgaGFzIGEgbmV4dCBzdGF0ZVxyXG4gICAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHZpZXcgaGFzIGEgbmV4dCBzdGF0ZVxyXG4gICAqL1xyXG4gIGhhc05leHRTdGF0ZSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLnN0YXRlcy5sZW5ndGggPiAxICYmIHRoaXMuc3RhdGVJbmRleCA8IHRoaXMuc3RhdGVzLmxlbmd0aCAtIDE7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXN0b3JlIHRoZSBwcmV2aW91cyB2aWV3IHN0YXRlXHJcbiAgICovXHJcbiAgcHJldmlvdXNTdGF0ZSgpIHtcclxuICAgIGlmICh0aGlzLmhhc1ByZXZpb3VzU3RhdGUoKSkge1xyXG4gICAgICB0aGlzLnNldFN0YXRlSW5kZXgodGhpcy5zdGF0ZUluZGV4IC0gMSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXN0b3JlIHRoZSBuZXh0IHZpZXcgc3RhdGVcclxuICAgKi9cclxuICBuZXh0U3RhdGUoKSB7XHJcbiAgICBpZiAodGhpcy5oYXNOZXh0U3RhdGUoKSkge1xyXG4gICAgICB0aGlzLnNldFN0YXRlSW5kZXgodGhpcy5zdGF0ZUluZGV4ICsgMSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDbGVhciB0aGUgc3RhdGUgaGlzdG9yeVxyXG4gICAqL1xyXG4gIGNsZWFyU3RhdGVIaXN0b3J5KCkge1xyXG4gICAgdGhpcy5zdGF0ZXMgPSBbXTtcclxuICAgIHRoaXMuc3RhdGVJbmRleCA9IDA7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGUgdGhlIHRoZSB2aWV3IHRvIGl0J3MgaW50aWFsIHN0YXRlXHJcbiAgICovXHJcbiAgc2V0SW5pdGlhbFN0YXRlKCkge1xyXG4gICAgaWYgKHRoaXMuc3RhdGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgdGhpcy5zZXRTdGF0ZUluZGV4KDApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTW92ZSB0byB0aGUgZXh0ZW50IHJldHJpZXZlZCBmcm9tIHRoZSBzdHJlYW1cclxuICAgKiBAcGFyYW0gZXh0ZW50IEV4dGVudFxyXG4gICAqIEBwYXJhbSBhY3Rpb24gRWl0aGVyIHpvb20gb3IgbW92ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgc2V0RXh0ZW50KGV4dGVudDogTWFwRXh0ZW50LCBhY3Rpb246IE1hcFZpZXdBY3Rpb24pIHtcclxuICAgIGNvbnN0IG9sVmlldyA9IHRoaXMub2xWaWV3O1xyXG4gICAgaWYgKGFjdGlvbiA9PT0gTWFwVmlld0FjdGlvbi5ab29tKSB7XHJcbiAgICAgIG9sVmlldy5maXQoZXh0ZW50LCB7bWF4Wm9vbTogMTd9KTtcclxuICAgIH0gZWxzZSBpZiAoYWN0aW9uID09PSBNYXBWaWV3QWN0aW9uLk1vdmUpIHtcclxuICAgICAgb2xWaWV3LmZpdChleHRlbnQsIHttYXhab29tOiBvbFZpZXcuZ2V0Wm9vbSgpfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgdGhlIHZpZXcgc3RhdGUgaW5kZXhcclxuICAgKiBAcGFyYW0gaW5kZXggU3RhdGUgaW5kZXhcclxuICAgKi9cclxuICBwcml2YXRlIHNldFN0YXRlSW5kZXgoaW5kZXg6IG51bWJlcikge1xyXG4gICAgdGhpcy5zdGF0ZUluZGV4ID0gaW5kZXg7XHJcbiAgICB0aGlzLnNldFN0YXRlKHRoaXMuc3RhdGVzW2luZGV4XSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgdGhlIHZpZXcgc3RhdGVcclxuICAgKiBAcGFyYW0gc3RhdGUgVmlldyBzdGF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgc2V0U3RhdGUoc3RhdGU6IE1hcFZpZXdTdGF0ZSkge1xyXG4gICAgdGhpcy5vbFZpZXcuYW5pbWF0ZSh7XHJcbiAgICAgIHJlc29sdXRpb246IHN0YXRlLnJlc29sdXRpb24sXHJcbiAgICAgIGNlbnRlcjogc3RhdGUuY2VudGVyLFxyXG4gICAgICBkdXJhdGlvbjogMFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBPbiBtb3ZlIGVuZCwgZ2V0IHRoZSB2aWV3IHN0YXRlIGFuZCByZWNvcmQgaXQuXHJcbiAgICogQHBhcmFtIGV2ZW50IE1hcCBldmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgb25Nb3ZlRW5kKGV2ZW50OiBPbE1hcEV2ZW50KSB7XHJcbiAgICBjb25zdCByZXNvbHV0aW9uID0gdGhpcy5nZXRSZXNvbHV0aW9uKCk7XHJcbiAgICBpZiAodGhpcy5yZXNvbHV0aW9uJC52YWx1ZSAhPT0gcmVzb2x1dGlvbikge1xyXG4gICAgICB0aGlzLnJlc29sdXRpb24kLm5leHQocmVzb2x1dGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc3RhdGUgPSB7XHJcbiAgICAgIHJlc29sdXRpb24sXHJcbiAgICAgIGNlbnRlcjogdGhpcy5nZXRDZW50ZXIoKSxcclxuICAgICAgem9vbTogdGhpcy5nZXRab29tKClcclxuICAgIH07XHJcblxyXG4gICAgaWYgKHRoaXMuc3RhdGVIaXN0b3J5ID09PSB0cnVlKSB7XHJcbiAgICAgIGNvbnN0IHN0YXRlSW5kZXggPSB0aGlzLnN0YXRlSW5kZXg7XHJcbiAgICAgIGNvbnN0IHN0YXRlQXRJbmRleCA9IHRoaXMuc3RhdGVzLmxlbmd0aCA9PT0gMCA/IHVuZGVmaW5lZCA6IHRoaXMuc3RhdGVzW3N0YXRlSW5kZXhdO1xyXG4gICAgICBpZiAoIXZpZXdTdGF0ZXNBcmVFcXVhbChzdGF0ZSwgc3RhdGVBdEluZGV4KSkge1xyXG4gICAgICAgIHRoaXMuc3RhdGVzID0gdGhpcy5zdGF0ZXMuc2xpY2UoMCwgc3RhdGVJbmRleCArIDEpLmNvbmNhdChbc3RhdGVdKTtcclxuICAgICAgICB0aGlzLnN0YXRlSW5kZXggPSB0aGlzLnN0YXRlcy5sZW5ndGggLSAxO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zdGF0ZSQubmV4dChzdGF0ZSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==