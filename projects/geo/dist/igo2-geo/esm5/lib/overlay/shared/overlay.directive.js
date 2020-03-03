/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Self } from '@angular/core';
import olFormatGeoJSON from 'ol/format/GeoJSON';
import { MapBrowserComponent } from '../../map/map-browser/map-browser.component';
import { OverlayService } from '../shared/overlay.service';
var OverlayDirective = /** @class */ (function () {
    function OverlayDirective(component, overlayService) {
        this.component = component;
        this.overlayService = overlayService;
        this.format = new olFormatGeoJSON();
    }
    Object.defineProperty(OverlayDirective.prototype, "map", {
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
    OverlayDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.features$$ = this.overlayService.features$.subscribe((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            return _this.handleFeatures(res[0], res[1]);
        }));
    };
    /**
     * @return {?}
     */
    OverlayDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.features$$.unsubscribe();
    };
    /**
     * @private
     * @param {?} features
     * @param {?} action
     * @return {?}
     */
    OverlayDirective.prototype.handleFeatures = /**
     * @private
     * @param {?} features
     * @param {?} action
     * @return {?}
     */
    function (features, action) { };
    OverlayDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[igoOverlay]'
                },] }
    ];
    /** @nocollapse */
    OverlayDirective.ctorParameters = function () { return [
        { type: MapBrowserComponent, decorators: [{ type: Self }] },
        { type: OverlayService }
    ]; };
    return OverlayDirective;
}());
export { OverlayDirective };
if (false) {
    /**
     * @type {?}
     * @private
     */
    OverlayDirective.prototype.features$$;
    /**
     * @type {?}
     * @private
     */
    OverlayDirective.prototype.format;
    /**
     * @type {?}
     * @private
     */
    OverlayDirective.prototype.component;
    /**
     * @type {?}
     * @private
     */
    OverlayDirective.prototype.overlayService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvb3ZlcmxheS9zaGFyZWQvb3ZlcmxheS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUduRSxPQUFPLGVBQWUsTUFBTSxtQkFBbUIsQ0FBQztBQUtoRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUdsRixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFHM0Q7SUFXRSwwQkFDa0IsU0FBOEIsRUFDdEMsY0FBOEI7UUFEdEIsY0FBUyxHQUFULFNBQVMsQ0FBcUI7UUFDdEMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBUmhDLFdBQU0sR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDO0lBU3BDLENBQUM7SUFQSixzQkFBSSxpQ0FBRzs7OztRQUFQO1lBQ0UsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQztRQUM1QixDQUFDOzs7T0FBQTs7OztJQU9ELG1DQUFROzs7SUFBUjtRQUFBLGlCQUlDO1FBSEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxTQUFTOzs7O1FBQUMsVUFBQSxHQUFHO1lBQzNELE9BQUEsS0FBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQW5DLENBQW1DLEVBQ3BDLENBQUM7SUFDSixDQUFDOzs7O0lBRUQsc0NBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNoQyxDQUFDOzs7Ozs7O0lBRU8seUNBQWM7Ozs7OztJQUF0QixVQUF1QixRQUFtQixFQUFFLE1BQXFCLElBQUcsQ0FBQzs7Z0JBMUJ0RSxTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGNBQWM7aUJBQ3pCOzs7O2dCQVJRLG1CQUFtQix1QkFrQnZCLElBQUk7Z0JBZkEsY0FBYzs7SUE4QnZCLHVCQUFDO0NBQUEsQUEzQkQsSUEyQkM7U0F4QlksZ0JBQWdCOzs7Ozs7SUFDM0Isc0NBQWlDOzs7OztJQUNqQyxrQ0FBdUM7Ozs7O0lBT3JDLHFDQUE4Qzs7Ozs7SUFDOUMsMENBQXNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBTZWxmLCBPbkluaXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCBvbEZvcm1hdEdlb0pTT04gZnJvbSAnb2wvZm9ybWF0L0dlb0pTT04nO1xyXG5pbXBvcnQgKiBhcyBvbGV4dGVudCBmcm9tICdvbC9leHRlbnQnO1xyXG5pbXBvcnQgKiBhcyBvbHByb2ogZnJvbSAnb2wvcHJvaic7XHJcblxyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICcuLi8uLi9tYXAvc2hhcmVkL21hcCc7XHJcbmltcG9ydCB7IE1hcEJyb3dzZXJDb21wb25lbnQgfSBmcm9tICcuLi8uLi9tYXAvbWFwLWJyb3dzZXIvbWFwLWJyb3dzZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRmVhdHVyZSB9IGZyb20gJy4uLy4uL2ZlYXR1cmUvc2hhcmVkL2ZlYXR1cmUuaW50ZXJmYWNlcyc7XHJcblxyXG5pbXBvcnQgeyBPdmVybGF5U2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9vdmVybGF5LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBPdmVybGF5QWN0aW9uIH0gZnJvbSAnLi4vc2hhcmVkL292ZXJsYXkuZW51bSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tpZ29PdmVybGF5XSdcclxufSlcclxuZXhwb3J0IGNsYXNzIE92ZXJsYXlEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgcHJpdmF0ZSBmZWF0dXJlcyQkOiBTdWJzY3JpcHRpb247XHJcbiAgcHJpdmF0ZSBmb3JtYXQgPSBuZXcgb2xGb3JtYXRHZW9KU09OKCk7XHJcblxyXG4gIGdldCBtYXAoKTogSWdvTWFwIHtcclxuICAgIHJldHVybiB0aGlzLmNvbXBvbmVudC5tYXA7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIEBTZWxmKCkgcHJpdmF0ZSBjb21wb25lbnQ6IE1hcEJyb3dzZXJDb21wb25lbnQsXHJcbiAgICBwcml2YXRlIG92ZXJsYXlTZXJ2aWNlOiBPdmVybGF5U2VydmljZVxyXG4gICkge31cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmZlYXR1cmVzJCQgPSB0aGlzLm92ZXJsYXlTZXJ2aWNlLmZlYXR1cmVzJC5zdWJzY3JpYmUocmVzID0+XHJcbiAgICAgIHRoaXMuaGFuZGxlRmVhdHVyZXMocmVzWzBdLCByZXNbMV0pXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmZlYXR1cmVzJCQudW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGFuZGxlRmVhdHVyZXMoZmVhdHVyZXM6IEZlYXR1cmVbXSwgYWN0aW9uOiBPdmVybGF5QWN0aW9uKSB7fVxyXG59XHJcbiJdfQ==