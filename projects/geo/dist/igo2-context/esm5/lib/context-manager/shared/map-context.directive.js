/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive } from '@angular/core';
import { filter } from 'rxjs/operators';
import { MapBrowserComponent } from '@igo2/geo';
import { ContextService } from './context.service';
var MapContextDirective = /** @class */ (function () {
    function MapContextDirective(component, contextService) {
        this.contextService = contextService;
        this.component = component;
    }
    Object.defineProperty(MapContextDirective.prototype, "map", {
        get: /**
         * @return {?}
         */
        function () {
            return this.component.map;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MapContextDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.context$$ = this.contextService.context$
            .pipe(filter((/**
         * @param {?} context
         * @return {?}
         */
        function (context) { return context !== undefined; })))
            .subscribe((/**
         * @param {?} context
         * @return {?}
         */
        function (context) { return _this.handleContextChange(context); }));
    };
    /**
     * @return {?}
     */
    MapContextDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.context$$.unsubscribe();
    };
    /**
     * @private
     * @param {?} context
     * @return {?}
     */
    MapContextDirective.prototype.handleContextChange = /**
     * @private
     * @param {?} context
     * @return {?}
     */
    function (context) {
        if (context.map === undefined) {
            return;
        }
        // This creates a new ol.Map when the context changes. Doing that
        // allows the print tool to work properly even when the map's canvas
        // has been tainted (CORS) with the layers of another context. This could
        // have some side effects such as unbinding all listeners on the first map.
        // A better solution would be to create a new map (preview) before
        // printing and avoid the tainted canvas issue. This will come later so
        // this snippet of code is kept here in case it takes too long becomes
        // an issue
        // const target = this.component.map.ol.getTarget();
        // this.component.map.ol.setTarget(undefined);
        // this.component.map.init();
        // this.component.map.ol.setTarget(target);
        /** @type {?} */
        var viewContext = context.map.view;
        if (!this.component.view || viewContext.keepCurrentView !== true) {
            this.component.view = (/** @type {?} */ (viewContext));
        }
    };
    MapContextDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[igoMapContext]'
                },] }
    ];
    /** @nocollapse */
    MapContextDirective.ctorParameters = function () { return [
        { type: MapBrowserComponent },
        { type: ContextService }
    ]; };
    return MapContextDirective;
}());
export { MapContextDirective };
if (false) {
    /**
     * @type {?}
     * @private
     */
    MapContextDirective.prototype.component;
    /**
     * @type {?}
     * @private
     */
    MapContextDirective.prototype.context$$;
    /**
     * @type {?}
     * @private
     */
    MapContextDirective.prototype.contextService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLWNvbnRleHQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29udGV4dC8iLCJzb3VyY2VzIjpbImxpYi9jb250ZXh0LW1hbmFnZXIvc2hhcmVkL21hcC1jb250ZXh0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFHN0QsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXhDLE9BQU8sRUFBMEIsbUJBQW1CLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFeEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBR25EO0lBV0UsNkJBQ0UsU0FBOEIsRUFDdEIsY0FBOEI7UUFBOUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBRXRDLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQzdCLENBQUM7SUFURCxzQkFBSSxvQ0FBRzs7OztRQUFQO1lBQ0UsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQztRQUM1QixDQUFDOzs7T0FBQTs7OztJQVNELHNDQUFROzs7SUFBUjtRQUFBLGlCQUlDO1FBSEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVE7YUFDMUMsSUFBSSxDQUFDLE1BQU07Ozs7UUFBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sS0FBSyxTQUFTLEVBQXJCLENBQXFCLEVBQUMsQ0FBQzthQUM5QyxTQUFTOzs7O1FBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxLQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLEVBQWpDLENBQWlDLEVBQUMsQ0FBQztJQUM3RCxDQUFDOzs7O0lBRUQseUNBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUMvQixDQUFDOzs7Ozs7SUFFTyxpREFBbUI7Ozs7O0lBQTNCLFVBQTRCLE9BQXdCO1FBQ2xELElBQUksT0FBTyxDQUFDLEdBQUcsS0FBSyxTQUFTLEVBQUU7WUFDN0IsT0FBTztTQUNSOzs7Ozs7Ozs7Ozs7OztZQWdCSyxXQUFXLEdBQW1CLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSTtRQUNwRCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUksV0FBVyxDQUFDLGVBQWUsS0FBSyxJQUFJLEVBQUU7WUFDaEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsbUJBQUEsV0FBVyxFQUFrQixDQUFDO1NBQ3JEO0lBQ0gsQ0FBQzs7Z0JBbkRGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsaUJBQWlCO2lCQUM1Qjs7OztnQkFQZ0MsbUJBQW1CO2dCQUUzQyxjQUFjOztJQXVEdkIsMEJBQUM7Q0FBQSxBQXBERCxJQW9EQztTQWpEWSxtQkFBbUI7Ozs7OztJQUM5Qix3Q0FBdUM7Ozs7O0lBQ3ZDLHdDQUFnQzs7Ozs7SUFROUIsNkNBQXNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBPbkluaXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7IElnb01hcCwgTWFwVmlld09wdGlvbnMsIE1hcEJyb3dzZXJDb21wb25lbnQgfSBmcm9tICdAaWdvMi9nZW8nO1xyXG5cclxuaW1wb3J0IHsgQ29udGV4dFNlcnZpY2UgfSBmcm9tICcuL2NvbnRleHQuc2VydmljZSc7XHJcbmltcG9ydCB7IERldGFpbGVkQ29udGV4dCwgQ29udGV4dE1hcFZpZXcgfSBmcm9tICcuL2NvbnRleHQuaW50ZXJmYWNlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW2lnb01hcENvbnRleHRdJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTWFwQ29udGV4dERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICBwcml2YXRlIGNvbXBvbmVudDogTWFwQnJvd3NlckNvbXBvbmVudDtcclxuICBwcml2YXRlIGNvbnRleHQkJDogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBnZXQgbWFwKCk6IElnb01hcCB7XHJcbiAgICByZXR1cm4gdGhpcy5jb21wb25lbnQubWFwO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBjb21wb25lbnQ6IE1hcEJyb3dzZXJDb21wb25lbnQsXHJcbiAgICBwcml2YXRlIGNvbnRleHRTZXJ2aWNlOiBDb250ZXh0U2VydmljZVxyXG4gICkge1xyXG4gICAgdGhpcy5jb21wb25lbnQgPSBjb21wb25lbnQ7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuY29udGV4dCQkID0gdGhpcy5jb250ZXh0U2VydmljZS5jb250ZXh0JFxyXG4gICAgICAucGlwZShmaWx0ZXIoY29udGV4dCA9PiBjb250ZXh0ICE9PSB1bmRlZmluZWQpKVxyXG4gICAgICAuc3Vic2NyaWJlKGNvbnRleHQgPT4gdGhpcy5oYW5kbGVDb250ZXh0Q2hhbmdlKGNvbnRleHQpKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5jb250ZXh0JCQudW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGFuZGxlQ29udGV4dENoYW5nZShjb250ZXh0OiBEZXRhaWxlZENvbnRleHQpIHtcclxuICAgIGlmIChjb250ZXh0Lm1hcCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBUaGlzIGNyZWF0ZXMgYSBuZXcgb2wuTWFwIHdoZW4gdGhlIGNvbnRleHQgY2hhbmdlcy4gRG9pbmcgdGhhdFxyXG4gICAgLy8gYWxsb3dzIHRoZSBwcmludCB0b29sIHRvIHdvcmsgcHJvcGVybHkgZXZlbiB3aGVuIHRoZSBtYXAncyBjYW52YXNcclxuICAgIC8vIGhhcyBiZWVuIHRhaW50ZWQgKENPUlMpIHdpdGggdGhlIGxheWVycyBvZiBhbm90aGVyIGNvbnRleHQuIFRoaXMgY291bGRcclxuICAgIC8vIGhhdmUgc29tZSBzaWRlIGVmZmVjdHMgc3VjaCBhcyB1bmJpbmRpbmcgYWxsIGxpc3RlbmVycyBvbiB0aGUgZmlyc3QgbWFwLlxyXG4gICAgLy8gQSBiZXR0ZXIgc29sdXRpb24gd291bGQgYmUgdG8gY3JlYXRlIGEgbmV3IG1hcCAocHJldmlldykgYmVmb3JlXHJcbiAgICAvLyBwcmludGluZyBhbmQgYXZvaWQgdGhlIHRhaW50ZWQgY2FudmFzIGlzc3VlLiBUaGlzIHdpbGwgY29tZSBsYXRlciBzb1xyXG4gICAgLy8gdGhpcyBzbmlwcGV0IG9mIGNvZGUgaXMga2VwdCBoZXJlIGluIGNhc2UgaXQgdGFrZXMgdG9vIGxvbmcgYmVjb21lc1xyXG4gICAgLy8gYW4gaXNzdWVcclxuXHJcbiAgICAvLyBjb25zdCB0YXJnZXQgPSB0aGlzLmNvbXBvbmVudC5tYXAub2wuZ2V0VGFyZ2V0KCk7XHJcbiAgICAvLyB0aGlzLmNvbXBvbmVudC5tYXAub2wuc2V0VGFyZ2V0KHVuZGVmaW5lZCk7XHJcbiAgICAvLyB0aGlzLmNvbXBvbmVudC5tYXAuaW5pdCgpO1xyXG4gICAgLy8gdGhpcy5jb21wb25lbnQubWFwLm9sLnNldFRhcmdldCh0YXJnZXQpO1xyXG5cclxuICAgIGNvbnN0IHZpZXdDb250ZXh0OiBDb250ZXh0TWFwVmlldyA9IGNvbnRleHQubWFwLnZpZXc7XHJcbiAgICBpZiAoIXRoaXMuY29tcG9uZW50LnZpZXcgfHwgdmlld0NvbnRleHQua2VlcEN1cnJlbnRWaWV3ICE9PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMuY29tcG9uZW50LnZpZXcgPSB2aWV3Q29udGV4dCBhcyBNYXBWaWV3T3B0aW9ucztcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19