/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Self, Optional } from '@angular/core';
import { RouteService } from '@igo2/core';
import { DirectionsFormComponent } from './directions-form.component';
import { DirectionsFormService } from './directions-form.service';
var DirectionsFormBindingDirective = /** @class */ (function () {
    function DirectionsFormBindingDirective(component, directionsFormService, route) {
        this.component = component;
        this.directionsFormService = directionsFormService;
        this.route = route;
    }
    /**
     * @return {?}
     */
    DirectionsFormBindingDirective.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var storedStops = this.directionsFormService.getStops();
        if (!storedStops && this.route &&
            this.route.options.directionsCoordKey) {
            this.route.queryParams.subscribe((/**
             * @param {?} params
             * @return {?}
             */
            function (params) {
                /** @type {?} */
                var directionsParams = params[(/** @type {?} */ (_this.route.options.directionsCoordKey))];
                /** @type {?} */
                var stopsCoordinatesFromURL = [];
                if (directionsParams) {
                    /** @type {?} */
                    var directionsCoordUrl_1 = directionsParams.split(';');
                    if (directionsCoordUrl_1.length >= 2) {
                        /** @type {?} */
                        var cnt_1 = 0;
                        directionsCoordUrl_1.forEach((/**
                         * @param {?} coord
                         * @return {?}
                         */
                        function (coord) {
                            if (cnt_1 !== 0 && cnt_1 !== directionsCoordUrl_1.length - 1) {
                                _this.component.stops.insert(cnt_1, _this.component.createStop());
                            }
                            /** @type {?} */
                            var stopCoordinatesFromURL = JSON.parse('[' + coord + ']');
                            _this.component.stops
                                .at(cnt_1)
                                .patchValue({ stopCoordinates: stopCoordinatesFromURL });
                            _this.component.stops
                                .at(cnt_1)
                                .patchValue({ stopPoint: stopCoordinatesFromURL });
                            _this.component.handleLocationProposals(stopCoordinatesFromURL, cnt_1);
                            stopsCoordinatesFromURL.push(stopCoordinatesFromURL);
                            _this.component.addStopOverlay(stopCoordinatesFromURL, cnt_1);
                            cnt_1++;
                        }));
                        _this.component.getRoutes(true);
                    }
                }
            }));
        }
        else if (storedStops) {
            for (var i = 0; i < storedStops.length; i++) {
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
    };
    DirectionsFormBindingDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[igoDirectionsFormBinding]'
                },] }
    ];
    /** @nocollapse */
    DirectionsFormBindingDirective.ctorParameters = function () { return [
        { type: DirectionsFormComponent, decorators: [{ type: Self }] },
        { type: DirectionsFormService },
        { type: RouteService, decorators: [{ type: Optional }] }
    ]; };
    return DirectionsFormBindingDirective;
}());
export { DirectionsFormBindingDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aW9ucy1mb3JtLWJpbmRpbmcuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2RpcmVjdGlvbnMvZGlyZWN0aW9ucy1mb3JtL2RpcmVjdGlvbnMtZm9ybS1iaW5kaW5nLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxJQUFJLEVBRUosUUFBUSxFQUNULE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFFMUMsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDdEUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFbEU7SUFLRSx3Q0FDa0IsU0FBa0MsRUFDMUMscUJBQTRDLEVBQ2hDLEtBQW1CO1FBRnZCLGNBQVMsR0FBVCxTQUFTLENBQXlCO1FBQzFDLDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBdUI7UUFDaEMsVUFBSyxHQUFMLEtBQUssQ0FBYztJQUN0QyxDQUFDOzs7O0lBRUosd0RBQWU7OztJQUFmO1FBQUEsaUJBb0RDOztZQW5ETyxXQUFXLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFFBQVEsRUFBRTtRQUN6RCxJQUNFLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxLQUFLO1lBQzFCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGtCQUFrQixFQUNyQztZQUNBLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFNBQVM7Ozs7WUFBQyxVQUFBLE1BQU07O29CQUMvQixnQkFBZ0IsR0FDcEIsTUFBTSxDQUFDLG1CQUFBLEtBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGtCQUFrQixFQUFVLENBQUM7O29CQUNuRCx1QkFBdUIsR0FBRyxFQUFFO2dCQUNsQyxJQUFJLGdCQUFnQixFQUFFOzt3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bXBvcnQge1xyXG4gIERpcmVjdGl2ZSxcclxuICBTZWxmLFxyXG4gIEFmdGVyVmlld0luaXQsXHJcbiAgT3B0aW9uYWxcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IFJvdXRlU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgRGlyZWN0aW9uc0Zvcm1Db21wb25lbnQgfSBmcm9tICcuL2RpcmVjdGlvbnMtZm9ybS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBEaXJlY3Rpb25zRm9ybVNlcnZpY2UgfSBmcm9tICcuL2RpcmVjdGlvbnMtZm9ybS5zZXJ2aWNlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW2lnb0RpcmVjdGlvbnNGb3JtQmluZGluZ10nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEaXJlY3Rpb25zRm9ybUJpbmRpbmdEaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBAU2VsZigpIHByaXZhdGUgY29tcG9uZW50OiBEaXJlY3Rpb25zRm9ybUNvbXBvbmVudCxcclxuICAgIHByaXZhdGUgZGlyZWN0aW9uc0Zvcm1TZXJ2aWNlOiBEaXJlY3Rpb25zRm9ybVNlcnZpY2UsXHJcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIHJvdXRlOiBSb3V0ZVNlcnZpY2VcclxuICApIHt9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcclxuICAgIGNvbnN0IHN0b3JlZFN0b3BzID0gdGhpcy5kaXJlY3Rpb25zRm9ybVNlcnZpY2UuZ2V0U3RvcHMoKTtcclxuICAgIGlmIChcclxuICAgICAgIXN0b3JlZFN0b3BzICYmIHRoaXMucm91dGUgJiZcclxuICAgICAgdGhpcy5yb3V0ZS5vcHRpb25zLmRpcmVjdGlvbnNDb29yZEtleVxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMucm91dGUucXVlcnlQYXJhbXMuc3Vic2NyaWJlKHBhcmFtcyA9PiB7XHJcbiAgICAgICAgY29uc3QgZGlyZWN0aW9uc1BhcmFtcyA9XHJcbiAgICAgICAgICBwYXJhbXNbdGhpcy5yb3V0ZS5vcHRpb25zLmRpcmVjdGlvbnNDb29yZEtleSBhcyBzdHJpbmddO1xyXG4gICAgICAgIGNvbnN0IHN0b3BzQ29vcmRpbmF0ZXNGcm9tVVJMID0gW107XHJcbiAgICAgICAgaWYgKGRpcmVjdGlvbnNQYXJhbXMpIHtcclxuICAgICAgICAgIGNvbnN0IGRpcmVjdGlvbnNDb29yZFVybCA9IGRpcmVjdGlvbnNQYXJhbXMuc3BsaXQoJzsnKTtcclxuICAgICAgICAgIGlmIChkaXJlY3Rpb25zQ29vcmRVcmwubGVuZ3RoID49IDIpIHtcclxuICAgICAgICAgICAgbGV0IGNudCA9IDA7XHJcbiAgICAgICAgICAgIGRpcmVjdGlvbnNDb29yZFVybC5mb3JFYWNoKGNvb3JkID0+IHtcclxuICAgICAgICAgICAgICBpZiAoY250ICE9PSAwICYmIGNudCAhPT0gZGlyZWN0aW9uc0Nvb3JkVXJsLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29tcG9uZW50LnN0b3BzLmluc2VydChjbnQsIHRoaXMuY29tcG9uZW50LmNyZWF0ZVN0b3AoKSk7XHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICBjb25zdCBzdG9wQ29vcmRpbmF0ZXNGcm9tVVJMID0gSlNPTi5wYXJzZSgnWycgKyBjb29yZCArICddJyk7XHJcbiAgICAgICAgICAgICAgdGhpcy5jb21wb25lbnQuc3RvcHNcclxuICAgICAgICAgICAgICAgIC5hdChjbnQpXHJcbiAgICAgICAgICAgICAgICAucGF0Y2hWYWx1ZSh7IHN0b3BDb29yZGluYXRlczogc3RvcENvb3JkaW5hdGVzRnJvbVVSTCB9KTtcclxuICAgICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5zdG9wc1xyXG4gICAgICAgICAgICAgICAgLmF0KGNudClcclxuICAgICAgICAgICAgICAgIC5wYXRjaFZhbHVlKHsgc3RvcFBvaW50OiBzdG9wQ29vcmRpbmF0ZXNGcm9tVVJMIH0pO1xyXG4gICAgICAgICAgICAgIHRoaXMuY29tcG9uZW50LmhhbmRsZUxvY2F0aW9uUHJvcG9zYWxzKFxyXG4gICAgICAgICAgICAgICAgc3RvcENvb3JkaW5hdGVzRnJvbVVSTCxcclxuICAgICAgICAgICAgICAgIGNudFxyXG4gICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgIHN0b3BzQ29vcmRpbmF0ZXNGcm9tVVJMLnB1c2goc3RvcENvb3JkaW5hdGVzRnJvbVVSTCk7XHJcbiAgICAgICAgICAgICAgdGhpcy5jb21wb25lbnQuYWRkU3RvcE92ZXJsYXkoc3RvcENvb3JkaW5hdGVzRnJvbVVSTCwgY250KTtcclxuICAgICAgICAgICAgICBjbnQrKztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50LmdldFJvdXRlcyh0cnVlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIGlmIChzdG9yZWRTdG9wcykge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0b3JlZFN0b3BzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGkgIT09IDAgJiYgaSAhPT0gc3RvcmVkU3RvcHMubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgdGhpcy5jb21wb25lbnQuc3RvcHMuaW5zZXJ0KGksIHRoaXMuY29tcG9uZW50LmNyZWF0ZVN0b3AoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzdG9yZWRTdG9wc1tpXS5zdG9wQ29vcmRpbmF0ZXMgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgICAgdGhpcy5jb21wb25lbnQuYWRkU3RvcE92ZXJsYXkoc3RvcmVkU3RvcHNbaV0uc3RvcENvb3JkaW5hdGVzLCBpKTtcclxuICAgICAgICAgIHRoaXMuY29tcG9uZW50LnN0b3BzLmF0KGkpLnBhdGNoVmFsdWUoc3RvcmVkU3RvcHNbaV0gKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5jb21wb25lbnQuZ2V0Um91dGVzKCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmNvbXBvbmVudC53cml0ZVN0b3BzVG9Gb3JtU2VydmljZSgpO1xyXG4gIH1cclxufVxyXG4iXX0=