/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Self, Optional } from '@angular/core';
import { RouteService } from '@igo2/core';
import { RoutingFormComponent } from './routing-form.component';
import { RoutingFormService } from './routing-form.service';
export class RoutingFormBindingDirective {
    /**
     * @param {?} component
     * @param {?} routingFormService
     * @param {?} route
     */
    constructor(component, routingFormService, route) {
        this.component = component;
        this.routingFormService = routingFormService;
        this.route = route;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        /** @type {?} */
        const storedStopsCoordinates = this.routingFormService.getStopsCoordinates();
        if (!storedStopsCoordinates &&
            this.route &&
            this.route.options.routingCoordKey) {
            this.route.queryParams.subscribe((/**
             * @param {?} params
             * @return {?}
             */
            params => {
                /** @type {?} */
                const routingParams = params[(/** @type {?} */ (this.route.options.routingCoordKey))];
                /** @type {?} */
                const stopsCoordinatesFromURL = [];
                if (routingParams) {
                    /** @type {?} */
                    const routingCoordUrl = routingParams.split(';');
                    if (routingCoordUrl.length >= 2) {
                        /** @type {?} */
                        let cnt = 0;
                        routingCoordUrl.forEach((/**
                         * @param {?} coord
                         * @return {?}
                         */
                        coord => {
                            if (cnt !== 0 && cnt !== routingCoordUrl.length - 1) {
                                this.component.stops.insert(cnt, this.component.createStop());
                            }
                            /** @type {?} */
                            const stopCoordinatesFromURL = JSON.parse('[' + coord + ']');
                            this.component.stops
                                .at(cnt)
                                .patchValue({ stopCoordinates: stopCoordinatesFromURL });
                            this.component.stops
                                .at(cnt)
                                .patchValue({ stopPoint: stopCoordinatesFromURL });
                            this.component.handleLocationProposals(stopCoordinatesFromURL, cnt);
                            stopsCoordinatesFromURL.push(stopCoordinatesFromURL);
                            this.component.addStopOverlay(stopCoordinatesFromURL, cnt);
                            cnt++;
                        }));
                        this.component.getRoutes(stopsCoordinatesFromURL, true);
                    }
                }
            }));
        }
        else if (storedStopsCoordinates) {
            for (let i = 0; i < storedStopsCoordinates.length; i++) {
                if (i !== 0 && i !== storedStopsCoordinates.length - 1) {
                    this.component.stops.insert(i, this.component.createStop());
                }
                if (storedStopsCoordinates[i] instanceof Array) {
                    this.component.addStopOverlay(storedStopsCoordinates[i], i);
                    this.component.stops
                        .at(i)
                        .patchValue({ stopCoordinates: storedStopsCoordinates[i] });
                    this.component.stops
                        .at(i)
                        .patchValue({ stopPoint: storedStopsCoordinates[i] });
                    this.component.handleLocationProposals(storedStopsCoordinates[i], i);
                }
            }
        }
    }
}
RoutingFormBindingDirective.decorators = [
    { type: Directive, args: [{
                selector: '[igoRoutingFormBinding]'
            },] }
];
/** @nocollapse */
RoutingFormBindingDirective.ctorParameters = () => [
    { type: RoutingFormComponent, decorators: [{ type: Self }] },
    { type: RoutingFormService },
    { type: RouteService, decorators: [{ type: Optional }] }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    RoutingFormBindingDirective.prototype.component;
    /**
     * @type {?}
     * @private
     */
    RoutingFormBindingDirective.prototype.routingFormService;
    /**
     * @type {?}
     * @private
     */
    RoutingFormBindingDirective.prototype.route;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGluZy1mb3JtLWJpbmRpbmcuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL3JvdXRpbmcvcm91dGluZy1mb3JtL3JvdXRpbmctZm9ybS1iaW5kaW5nLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxJQUFJLEVBRUosUUFBUSxFQUNULE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFFMUMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFLNUQsTUFBTSxPQUFPLDJCQUEyQjs7Ozs7O0lBRXRDLFlBQ2tCLFNBQStCLEVBQ3ZDLGtCQUFzQyxFQUMxQixLQUFtQjtRQUZ2QixjQUFTLEdBQVQsU0FBUyxDQUFzQjtRQUN2Qyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQzFCLFVBQUssR0FBTCxLQUFLLENBQWM7SUFDdEMsQ0FBQzs7OztJQUVKLGVBQWU7O2NBQ1Asc0JBQXNCLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLG1CQUFtQixFQUFFO1FBQzVFLElBQ0UsQ0FBQyxzQkFBc0I7WUFDdkIsSUFBSSxDQUFDLEtBQUs7WUFDVixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQ2xDO1lBQ0EsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBUzs7OztZQUFDLE1BQU0sQ0FBQyxFQUFFOztzQkFDbEMsYUFBYSxHQUNqQixNQUFNLENBQUMsbUJBQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFVLENBQUM7O3NCQUNoRCx1QkFBdUIsR0FBRyxFQUFFO2dCQUNsQyxJQUFJLGFBQWEsRUFBRTs7MEJBQ1gsZUFB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LFlBQVksdUJBYWhCLFFBQVE7Ozs7Ozs7SUFGVCxnREFBK0M7Ozs7O0lBQy9DLHlEQUE4Qzs7Ozs7SUFDOUMsNENBQXVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBEaXJlY3RpdmUsXHJcbiAgU2VsZixcclxuICBBZnRlclZpZXdJbml0LFxyXG4gIE9wdGlvbmFsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBSb3V0ZVNlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuXHJcbmltcG9ydCB7IFJvdXRpbmdGb3JtQ29tcG9uZW50IH0gZnJvbSAnLi9yb3V0aW5nLWZvcm0uY29tcG9uZW50JztcclxuaW1wb3J0IHsgUm91dGluZ0Zvcm1TZXJ2aWNlIH0gZnJvbSAnLi9yb3V0aW5nLWZvcm0uc2VydmljZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tpZ29Sb3V0aW5nRm9ybUJpbmRpbmddJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgUm91dGluZ0Zvcm1CaW5kaW5nRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgQFNlbGYoKSBwcml2YXRlIGNvbXBvbmVudDogUm91dGluZ0Zvcm1Db21wb25lbnQsXHJcbiAgICBwcml2YXRlIHJvdXRpbmdGb3JtU2VydmljZTogUm91dGluZ0Zvcm1TZXJ2aWNlLFxyXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSByb3V0ZTogUm91dGVTZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XHJcbiAgICBjb25zdCBzdG9yZWRTdG9wc0Nvb3JkaW5hdGVzID0gdGhpcy5yb3V0aW5nRm9ybVNlcnZpY2UuZ2V0U3RvcHNDb29yZGluYXRlcygpO1xyXG4gICAgaWYgKFxyXG4gICAgICAhc3RvcmVkU3RvcHNDb29yZGluYXRlcyAmJlxyXG4gICAgICB0aGlzLnJvdXRlICYmXHJcbiAgICAgIHRoaXMucm91dGUub3B0aW9ucy5yb3V0aW5nQ29vcmRLZXlcclxuICAgICkge1xyXG4gICAgICB0aGlzLnJvdXRlLnF1ZXJ5UGFyYW1zLnN1YnNjcmliZShwYXJhbXMgPT4ge1xyXG4gICAgICAgIGNvbnN0IHJvdXRpbmdQYXJhbXMgPVxyXG4gICAgICAgICAgcGFyYW1zW3RoaXMucm91dGUub3B0aW9ucy5yb3V0aW5nQ29vcmRLZXkgYXMgc3RyaW5nXTtcclxuICAgICAgICBjb25zdCBzdG9wc0Nvb3JkaW5hdGVzRnJvbVVSTCA9IFtdO1xyXG4gICAgICAgIGlmIChyb3V0aW5nUGFyYW1zKSB7XHJcbiAgICAgICAgICBjb25zdCByb3V0aW5nQ29vcmRVcmwgPSByb3V0aW5nUGFyYW1zLnNwbGl0KCc7Jyk7XHJcbiAgICAgICAgICBpZiAocm91dGluZ0Nvb3JkVXJsLmxlbmd0aCA+PSAyKSB7XHJcbiAgICAgICAgICAgIGxldCBjbnQgPSAwO1xyXG4gICAgICAgICAgICByb3V0aW5nQ29vcmRVcmwuZm9yRWFjaChjb29yZCA9PiB7XHJcbiAgICAgICAgICAgICAgaWYgKGNudCAhPT0gMCAmJiBjbnQgIT09IHJvdXRpbmdDb29yZFVybC5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5zdG9wcy5pbnNlcnQoY250LCB0aGlzLmNvbXBvbmVudC5jcmVhdGVTdG9wKCkpO1xyXG4gICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgY29uc3Qgc3RvcENvb3JkaW5hdGVzRnJvbVVSTCA9IEpTT04ucGFyc2UoJ1snICsgY29vcmQgKyAnXScpO1xyXG4gICAgICAgICAgICAgIHRoaXMuY29tcG9uZW50LnN0b3BzXHJcbiAgICAgICAgICAgICAgICAuYXQoY250KVxyXG4gICAgICAgICAgICAgICAgLnBhdGNoVmFsdWUoeyBzdG9wQ29vcmRpbmF0ZXM6IHN0b3BDb29yZGluYXRlc0Zyb21VUkwgfSk7XHJcbiAgICAgICAgICAgICAgdGhpcy5jb21wb25lbnQuc3RvcHNcclxuICAgICAgICAgICAgICAgIC5hdChjbnQpXHJcbiAgICAgICAgICAgICAgICAucGF0Y2hWYWx1ZSh7IHN0b3BQb2ludDogc3RvcENvb3JkaW5hdGVzRnJvbVVSTCB9KTtcclxuICAgICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5oYW5kbGVMb2NhdGlvblByb3Bvc2FscyhcclxuICAgICAgICAgICAgICAgIHN0b3BDb29yZGluYXRlc0Zyb21VUkwsXHJcbiAgICAgICAgICAgICAgICBjbnRcclxuICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICBzdG9wc0Nvb3JkaW5hdGVzRnJvbVVSTC5wdXNoKHN0b3BDb29yZGluYXRlc0Zyb21VUkwpO1xyXG4gICAgICAgICAgICAgIHRoaXMuY29tcG9uZW50LmFkZFN0b3BPdmVybGF5KHN0b3BDb29yZGluYXRlc0Zyb21VUkwsIGNudCk7XHJcbiAgICAgICAgICAgICAgY250Kys7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5nZXRSb3V0ZXMoc3RvcHNDb29yZGluYXRlc0Zyb21VUkwsIHRydWUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2UgaWYgKHN0b3JlZFN0b3BzQ29vcmRpbmF0ZXMpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdG9yZWRTdG9wc0Nvb3JkaW5hdGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGkgIT09IDAgJiYgaSAhPT0gc3RvcmVkU3RvcHNDb29yZGluYXRlcy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICB0aGlzLmNvbXBvbmVudC5zdG9wcy5pbnNlcnQoaSwgdGhpcy5jb21wb25lbnQuY3JlYXRlU3RvcCgpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHN0b3JlZFN0b3BzQ29vcmRpbmF0ZXNbaV0gaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgICAgdGhpcy5jb21wb25lbnQuYWRkU3RvcE92ZXJsYXkoc3RvcmVkU3RvcHNDb29yZGluYXRlc1tpXSwgaSk7XHJcbiAgICAgICAgICB0aGlzLmNvbXBvbmVudC5zdG9wc1xyXG4gICAgICAgICAgICAuYXQoaSlcclxuICAgICAgICAgICAgLnBhdGNoVmFsdWUoeyBzdG9wQ29vcmRpbmF0ZXM6IHN0b3JlZFN0b3BzQ29vcmRpbmF0ZXNbaV0gfSk7XHJcbiAgICAgICAgICB0aGlzLmNvbXBvbmVudC5zdG9wc1xyXG4gICAgICAgICAgICAuYXQoaSlcclxuICAgICAgICAgICAgLnBhdGNoVmFsdWUoeyBzdG9wUG9pbnQ6IHN0b3JlZFN0b3BzQ29vcmRpbmF0ZXNbaV0gfSk7XHJcbiAgICAgICAgICB0aGlzLmNvbXBvbmVudC5oYW5kbGVMb2NhdGlvblByb3Bvc2FscyhzdG9yZWRTdG9wc0Nvb3JkaW5hdGVzW2ldLCBpKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19