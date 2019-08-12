/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Self, Optional } from '@angular/core';
import { RouteService } from '@igo2/core';
import { RoutingFormComponent } from './routing-form.component';
import { RoutingFormService } from './routing-form.service';
var RoutingFormBindingDirective = /** @class */ (function () {
    function RoutingFormBindingDirective(component, routingFormService, route) {
        this.component = component;
        this.routingFormService = routingFormService;
        this.route = route;
    }
    /**
     * @return {?}
     */
    RoutingFormBindingDirective.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var storedStopsCoordinates = this.routingFormService.getStopsCoordinates();
        if (!storedStopsCoordinates &&
            this.route &&
            this.route.options.routingCoordKey) {
            this.route.queryParams.subscribe((/**
             * @param {?} params
             * @return {?}
             */
            function (params) {
                /** @type {?} */
                var routingParams = params[(/** @type {?} */ (_this.route.options.routingCoordKey))];
                /** @type {?} */
                var stopsCoordinatesFromURL = [];
                if (routingParams) {
                    /** @type {?} */
                    var routingCoordUrl_1 = routingParams.split(';');
                    if (routingCoordUrl_1.length >= 2) {
                        /** @type {?} */
                        var cnt_1 = 0;
                        routingCoordUrl_1.forEach((/**
                         * @param {?} coord
                         * @return {?}
                         */
                        function (coord) {
                            if (cnt_1 !== 0 && cnt_1 !== routingCoordUrl_1.length - 1) {
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
                        _this.component.getRoutes(stopsCoordinatesFromURL, true);
                    }
                }
            }));
        }
        else if (storedStopsCoordinates) {
            for (var i = 0; i < storedStopsCoordinates.length; i++) {
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
    };
    RoutingFormBindingDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[igoRoutingFormBinding]'
                },] }
    ];
    /** @nocollapse */
    RoutingFormBindingDirective.ctorParameters = function () { return [
        { type: RoutingFormComponent, decorators: [{ type: Self }] },
        { type: RoutingFormService },
        { type: RouteService, decorators: [{ type: Optional }] }
    ]; };
    return RoutingFormBindingDirective;
}());
export { RoutingFormBindingDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGluZy1mb3JtLWJpbmRpbmcuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL3JvdXRpbmcvcm91dGluZy1mb3JtL3JvdXRpbmctZm9ybS1iaW5kaW5nLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxJQUFJLEVBRUosUUFBUSxFQUNULE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFFMUMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFNUQ7SUFLRSxxQ0FDa0IsU0FBK0IsRUFDdkMsa0JBQXNDLEVBQzFCLEtBQW1CO1FBRnZCLGNBQVMsR0FBVCxTQUFTLENBQXNCO1FBQ3ZDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDMUIsVUFBSyxHQUFMLEtBQUssQ0FBYztJQUN0QyxDQUFDOzs7O0lBRUoscURBQWU7OztJQUFmO1FBQUEsaUJBeURDOztZQXhETyxzQkFBc0IsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsbUJBQW1CLEVBQUU7UUFDNUUsSUFDRSxDQUFDLHNCQUFzQjtZQUN2QixJQUFJLENBQUMsS0FBSztZQUNWLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFDbEM7WUFDQSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxTQUFTOzs7O1lBQUMsVUFBQSxNQUFNOztvQkFDL0IsYUFBYSxHQUNqQixNQUFNLENBQUMsbUJBQUEsS0FBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFVLENBQUM7O29CQUNoRCx1QkFBdUIsR0FBRyxFQUFFO2dCQUNsQyxJQUFJLGFBQWEsRUFBRTs7d0JBQ1gsaUJBQWUsR0FB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QVksdUJBYWhCLFFBQVE7O0lBNkRiLGtDQUFDO0NBQUEsQUFyRUQsSUFxRUM7U0FsRVksMkJBQTJCOzs7Ozs7SUFHcEMsZ0RBQStDOzs7OztJQUMvQyx5REFBOEM7Ozs7O0lBQzlDLDRDQUF1QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgRGlyZWN0aXZlLFxyXG4gIFNlbGYsXHJcbiAgQWZ0ZXJWaWV3SW5pdCxcclxuICBPcHRpb25hbFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgUm91dGVTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBSb3V0aW5nRm9ybUNvbXBvbmVudCB9IGZyb20gJy4vcm91dGluZy1mb3JtLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFJvdXRpbmdGb3JtU2VydmljZSB9IGZyb20gJy4vcm91dGluZy1mb3JtLnNlcnZpY2UnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbaWdvUm91dGluZ0Zvcm1CaW5kaW5nXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIFJvdXRpbmdGb3JtQmluZGluZ0RpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIEBTZWxmKCkgcHJpdmF0ZSBjb21wb25lbnQ6IFJvdXRpbmdGb3JtQ29tcG9uZW50LFxyXG4gICAgcHJpdmF0ZSByb3V0aW5nRm9ybVNlcnZpY2U6IFJvdXRpbmdGb3JtU2VydmljZSxcclxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgcm91dGU6IFJvdXRlU2VydmljZVxyXG4gICkge31cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xyXG4gICAgY29uc3Qgc3RvcmVkU3RvcHNDb29yZGluYXRlcyA9IHRoaXMucm91dGluZ0Zvcm1TZXJ2aWNlLmdldFN0b3BzQ29vcmRpbmF0ZXMoKTtcclxuICAgIGlmIChcclxuICAgICAgIXN0b3JlZFN0b3BzQ29vcmRpbmF0ZXMgJiZcclxuICAgICAgdGhpcy5yb3V0ZSAmJlxyXG4gICAgICB0aGlzLnJvdXRlLm9wdGlvbnMucm91dGluZ0Nvb3JkS2V5XHJcbiAgICApIHtcclxuICAgICAgdGhpcy5yb3V0ZS5xdWVyeVBhcmFtcy5zdWJzY3JpYmUocGFyYW1zID0+IHtcclxuICAgICAgICBjb25zdCByb3V0aW5nUGFyYW1zID1cclxuICAgICAgICAgIHBhcmFtc1t0aGlzLnJvdXRlLm9wdGlvbnMucm91dGluZ0Nvb3JkS2V5IGFzIHN0cmluZ107XHJcbiAgICAgICAgY29uc3Qgc3RvcHNDb29yZGluYXRlc0Zyb21VUkwgPSBbXTtcclxuICAgICAgICBpZiAocm91dGluZ1BhcmFtcykge1xyXG4gICAgICAgICAgY29uc3Qgcm91dGluZ0Nvb3JkVXJsID0gcm91dGluZ1BhcmFtcy5zcGxpdCgnOycpO1xyXG4gICAgICAgICAgaWYgKHJvdXRpbmdDb29yZFVybC5sZW5ndGggPj0gMikge1xyXG4gICAgICAgICAgICBsZXQgY250ID0gMDtcclxuICAgICAgICAgICAgcm91dGluZ0Nvb3JkVXJsLmZvckVhY2goY29vcmQgPT4ge1xyXG4gICAgICAgICAgICAgIGlmIChjbnQgIT09IDAgJiYgY250ICE9PSByb3V0aW5nQ29vcmRVcmwubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb21wb25lbnQuc3RvcHMuaW5zZXJ0KGNudCwgdGhpcy5jb21wb25lbnQuY3JlYXRlU3RvcCgpKTtcclxuICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgIGNvbnN0IHN0b3BDb29yZGluYXRlc0Zyb21VUkwgPSBKU09OLnBhcnNlKCdbJyArIGNvb3JkICsgJ10nKTtcclxuICAgICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5zdG9wc1xyXG4gICAgICAgICAgICAgICAgLmF0KGNudClcclxuICAgICAgICAgICAgICAgIC5wYXRjaFZhbHVlKHsgc3RvcENvb3JkaW5hdGVzOiBzdG9wQ29vcmRpbmF0ZXNGcm9tVVJMIH0pO1xyXG4gICAgICAgICAgICAgIHRoaXMuY29tcG9uZW50LnN0b3BzXHJcbiAgICAgICAgICAgICAgICAuYXQoY250KVxyXG4gICAgICAgICAgICAgICAgLnBhdGNoVmFsdWUoeyBzdG9wUG9pbnQ6IHN0b3BDb29yZGluYXRlc0Zyb21VUkwgfSk7XHJcbiAgICAgICAgICAgICAgdGhpcy5jb21wb25lbnQuaGFuZGxlTG9jYXRpb25Qcm9wb3NhbHMoXHJcbiAgICAgICAgICAgICAgICBzdG9wQ29vcmRpbmF0ZXNGcm9tVVJMLFxyXG4gICAgICAgICAgICAgICAgY250XHJcbiAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgc3RvcHNDb29yZGluYXRlc0Zyb21VUkwucHVzaChzdG9wQ29vcmRpbmF0ZXNGcm9tVVJMKTtcclxuICAgICAgICAgICAgICB0aGlzLmNvbXBvbmVudC5hZGRTdG9wT3ZlcmxheShzdG9wQ29vcmRpbmF0ZXNGcm9tVVJMLCBjbnQpO1xyXG4gICAgICAgICAgICAgIGNudCsrO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5jb21wb25lbnQuZ2V0Um91dGVzKHN0b3BzQ29vcmRpbmF0ZXNGcm9tVVJMLCB0cnVlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIGlmIChzdG9yZWRTdG9wc0Nvb3JkaW5hdGVzKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RvcmVkU3RvcHNDb29yZGluYXRlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChpICE9PSAwICYmIGkgIT09IHN0b3JlZFN0b3BzQ29vcmRpbmF0ZXMubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgdGhpcy5jb21wb25lbnQuc3RvcHMuaW5zZXJ0KGksIHRoaXMuY29tcG9uZW50LmNyZWF0ZVN0b3AoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzdG9yZWRTdG9wc0Nvb3JkaW5hdGVzW2ldIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICAgIHRoaXMuY29tcG9uZW50LmFkZFN0b3BPdmVybGF5KHN0b3JlZFN0b3BzQ29vcmRpbmF0ZXNbaV0sIGkpO1xyXG4gICAgICAgICAgdGhpcy5jb21wb25lbnQuc3RvcHNcclxuICAgICAgICAgICAgLmF0KGkpXHJcbiAgICAgICAgICAgIC5wYXRjaFZhbHVlKHsgc3RvcENvb3JkaW5hdGVzOiBzdG9yZWRTdG9wc0Nvb3JkaW5hdGVzW2ldIH0pO1xyXG4gICAgICAgICAgdGhpcy5jb21wb25lbnQuc3RvcHNcclxuICAgICAgICAgICAgLmF0KGkpXHJcbiAgICAgICAgICAgIC5wYXRjaFZhbHVlKHsgc3RvcFBvaW50OiBzdG9yZWRTdG9wc0Nvb3JkaW5hdGVzW2ldIH0pO1xyXG4gICAgICAgICAgdGhpcy5jb21wb25lbnQuaGFuZGxlTG9jYXRpb25Qcm9wb3NhbHMoc3RvcmVkU3RvcHNDb29yZGluYXRlc1tpXSwgaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==