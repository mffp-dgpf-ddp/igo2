/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Self, Optional } from '@angular/core';
import { RouteService } from '@igo2/core';
import { DirectionsFormComponent } from './directions-form.component';
import { DirectionsFormService } from './directions-form.service';
export class DirectionsFormBindingDirective {
    /**
     * @param {?} component
     * @param {?} directionsFormService
     * @param {?} route
     */
    constructor(component, directionsFormService, route) {
        this.component = component;
        this.directionsFormService = directionsFormService;
        this.route = route;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        /** @type {?} */
        const storedStops = this.directionsFormService.getStops();
        if (!storedStops && this.route &&
            this.route.options.directionsCoordKey) {
            this.route.queryParams.subscribe((/**
             * @param {?} params
             * @return {?}
             */
            params => {
                /** @type {?} */
                const directionsParams = params[(/** @type {?} */ (this.route.options.directionsCoordKey))];
                /** @type {?} */
                const stopsCoordinatesFromURL = [];
                if (directionsParams) {
                    /** @type {?} */
                    const directionsCoordUrl = directionsParams.split(';');
                    if (directionsCoordUrl.length >= 2) {
                        /** @type {?} */
                        let cnt = 0;
                        directionsCoordUrl.forEach((/**
                         * @param {?} coord
                         * @return {?}
                         */
                        coord => {
                            if (cnt !== 0 && cnt !== directionsCoordUrl.length - 1) {
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
                        this.component.getRoutes(true);
                    }
                }
            }));
        }
        else if (storedStops) {
            for (let i = 0; i < storedStops.length; i++) {
                if (i !== 0 && i !== storedStops.length - 1) {
                    this.component.stops.insert(i, this.component.createStop());
                }
                if (storedStops[i].stopCoordinates instanceof Array) {
                    this.component.addStopOverlay(storedStops[i].stopCoordinates, i);
                    this.component.stops.at(i).patchValue(storedStops[i]);
                }
            }
            this.component.getRoutes();
        }
        this.component.writeStopsToFormService();
    }
}
DirectionsFormBindingDirective.decorators = [
    { type: Directive, args: [{
                selector: '[igoDirectionsFormBinding]'
            },] }
];
/** @nocollapse */
DirectionsFormBindingDirective.ctorParameters = () => [
    { type: DirectionsFormComponent, decorators: [{ type: Self }] },
    { type: DirectionsFormService },
    { type: RouteService, decorators: [{ type: Optional }] }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    DirectionsFormBindingDirective.prototype.component;
    /**
     * @type {?}
     * @private
     */
    DirectionsFormBindingDirective.prototype.directionsFormService;
    /**
     * @type {?}
     * @private
     */
    DirectionsFormBindingDirective.prototype.route;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aW9ucy1mb3JtLWJpbmRpbmcuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2RpcmVjdGlvbnMvZGlyZWN0aW9ucy1mb3JtL2RpcmVjdGlvbnMtZm9ybS1iaW5kaW5nLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxJQUFJLEVBRUosUUFBUSxFQUNULE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFFMUMsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDdEUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFLbEUsTUFBTSxPQUFPLDhCQUE4Qjs7Ozs7O0lBRXpDLFlBQ2tCLFNBQWtDLEVBQzFDLHFCQUE0QyxFQUNoQyxLQUFtQjtRQUZ2QixjQUFTLEdBQVQsU0FBUyxDQUF5QjtRQUMxQywwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO1FBQ2hDLFVBQUssR0FBTCxLQUFLLENBQWM7SUFDdEMsQ0FBQzs7OztJQUVKLGVBQWU7O2NBQ1AsV0FBVyxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxRQUFRLEVBQUU7UUFDekQsSUFDRSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsS0FBSztZQUMxQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsRUFDckM7WUFDQSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxTQUFTOzs7O1lBQUMsTUFBTSxDQUFDLEVBQUU7O3NCQUNsQyxnQkFBZ0IsR0FDcEIsTUFBTSxDQUFDLG1CQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGtCQUFrQixFQUFVLENBQUM7O3NCQUNuRCx1QkFBdUIsR0FBRyxFQUFFO2dCQUNsQyxJQUFJLGdCQUFnQixF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XG4gIEFmdGVyVmlld0luaXQsXHJcbiAgT3B0aW9uYWxcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IFJvdXRlU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgRGlyZWN0aW9uc0Zvcm1Db21wb25lbnQgfSBmcm9tICcuL2RpcmVjdGlvbnMtZm9ybS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBEaXJlY3Rpb25zRm9ybVNlcnZpY2UgfSBmcm9tICcuL2RpcmVjdGlvbnMtZm9ybS5zZXJ2aWNlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW2lnb0RpcmVjdGlvbnNGb3JtQmluZGluZ10nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEaXJlY3Rpb25zRm9ybUJpbmRpbmdEaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBAU2VsZigpIHByaXZhdGUgY29tcG9uZW50OiBEaXJlY3Rpb25zRm9ybUNvbXBvbmVudCxcclxuICAgIHByaXZhdGUgZGlyZWN0aW9uc0Zvcm1TZXJ2aWNlOiBEaXJlY3Rpb25zRm9ybVNlcnZpY2UsXHJcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIHJvdXRlOiBSb3V0ZVNlcnZpY2VcclxuICApIHt9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcclxuICAgIGNvbnN0IHN0b3JlZFN0b3BzID0gdGhpcy5kaXJlY3Rpb25zRm9ybVNlcnZpY2UuZ2V0U3RvcHMoKTtcclxuICAgIGlmIChcclxuICAgICAgIXN0b3JlZFN0b3BzICYmIHRoaXMucm91dGUgJiZcclxuICAgICAgdGhpcy5yb3V0ZS5vcHRpb25zLmRpcmVjdGlvbnNDb29yZEtleVxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMucm91dGUucXVlcnlQYXJhbXMuc3Vic2NyaWJlKHBhcmFtcyA9PiB7XHJcbiAgICAgICAgY29uc3QgZGlyZWN0aW9uc1BhcmFtcyA9XHJcbiAgICAgICAgICBwYXJhbXNbdGhpcy5yb3V0ZS5vcHRpb25zLmRpcmVjdGlvbnNDb29yZEtleSBhcyBzdHJpbmddO1xyXG4gICAgICAgIGNvbnN0IHN0b3BzQ29vcmRpbmF0ZXNGcm9tVVJMID0gW107XHJcbiAgICAgICAgaWYgKGRpcmVjdGlvbnNQYXJhbXMpIHtcclxuICAgICAgICAgIGNvbnN0IGRpcmVjdGlvbnNDb29yZFVybCA9IGRpcmVjdGlvbnNQYXJhbXMuc3BsaXQoJzsnKTtcclxuICAgICAgICAgIGlmIChkaXJlY3Rpb25zQ29vcmRVcmwubGVuZ3RoID49IDIpIHtcclxuICAgICAgICAgICAgbGV0IGNudCA9IDA7XHJcbiAgICAgICAgICAgIGRpcmVjdGlvbnNDb29yZFVybC5mb3JFYWNoKGNvb3JkID0+IHtcclxuICAgICAgICAgICAgICBpZiAoY250ICE9PSAwICYmIGNudCAhPT0gZGlyZWN0aW9uc0Nvb3JkVXJsLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29tcG9uZW50LnN0b3BzLmluc2VydChjbnQsIHRoaXMuY29tcG9uZW50LmNyZWF0ZVN0b3AoKSk7XHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICBjb25zdCBzdG9wQ29vcmRpbmF0ZXNGcm9tVVJMID0gSlNPTi5wYXJzZSgnWycgKyBjb29yZCArICddJyk7XHJcbiAgICAgICAgICAgICAgdGhpcy5jb21wb25lbnQuc3RvcHNcclxuICAgICAgICAgICAgICAgIC5hdChjbnQpXHJcbiAgICAgICAgICAgICAgICAucGF0Y2hWYWx1ZSh7IHN0b3BDb29yZGluYXRlczogc3RvcENvb3JkaW5hdGVzRnJvbVVSTCB9KTtcclxuICAgICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5zdG9wc1xyXG4gICAgICAgICAgICAgICAgLmF0KGNudClcclxuICAgICAgICAgICAgICAgIC5wYXRjaFZhbHVlKHsgc3RvcFBvaW50OiBzdG9wQ29vcmRpbmF0ZXNGcm9tVVJMIH0pO1xyXG4gICAgICAgICAgICAgIHRoaXMuY29tcG9uZW50LmhhbmRsZUxvY2F0aW9uUHJvcG9zYWxzKFxyXG4gICAgICAgICAgICAgICAgc3RvcENvb3JkaW5hdGVzRnJvbVVSTCxcclxuICAgICAgICAgICAgICAgIGNudFxyXG4gICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgIHN0b3BzQ29vcmRpbmF0ZXNGcm9tVVJMLnB1c2goc3RvcENvb3JkaW5hdGVzRnJvbVVSTCk7XHJcbiAgICAgICAgICAgICAgdGhpcy5jb21wb25lbnQuYWRkU3RvcE92ZXJsYXkoc3RvcENvb3JkaW5hdGVzRnJvbVVSTCwgY250KTtcclxuICAgICAgICAgICAgICBjbnQrKztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50LmdldFJvdXRlcyh0cnVlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIGlmIChzdG9yZWRTdG9wcykge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0b3JlZFN0b3BzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGkgIT09IDAgJiYgaSAhPT0gc3RvcmVkU3RvcHMubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgdGhpcy5jb21wb25lbnQuc3RvcHMuaW5zZXJ0KGksIHRoaXMuY29tcG9uZW50LmNyZWF0ZVN0b3AoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzdG9yZWRTdG9wc1tpXS5zdG9wQ29vcmRpbmF0ZXMgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgICAgdGhpcy5jb21wb25lbnQuYWRkU3RvcE92ZXJsYXkoc3RvcmVkU3RvcHNbaV0uc3RvcENvb3JkaW5hdGVzLCBpKTtcclxuICAgICAgICAgIHRoaXMuY29tcG9uZW50LnN0b3BzLmF0KGkpLnBhdGNoVmFsdWUoc3RvcmVkU3RvcHNbaV0gKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5jb21wb25lbnQuZ2V0Um91dGVzKCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmNvbXBvbmVudC53cml0ZVN0b3BzVG9Gb3JtU2VydmljZSgpO1xyXG4gIH1cclxufVxyXG4iXX0=