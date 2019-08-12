/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { MediaService, Media } from '@igo2/core';
import { IgoMap } from '../shared';
import { baseLayersSwitcherSlideInOut } from './baselayers-switcher.animation';
var BaseLayersSwitcherComponent = /** @class */ (function () {
    function BaseLayersSwitcherComponent(mediaService) {
        this.mediaService = mediaService;
        this._baseLayers = [];
        this.expand = false;
        this.showButton = true;
        /** @type {?} */
        var media = this.mediaService.media$.value;
        if (media === Media.Mobile && this.useStaticIcon === undefined) {
            this.useStaticIcon = true;
        }
    }
    Object.defineProperty(BaseLayersSwitcherComponent.prototype, "map", {
        get: /**
         * @return {?}
         */
        function () {
            return this._map;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._map = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseLayersSwitcherComponent.prototype, "useStaticIcon", {
        get: /**
         * @return {?}
         */
        function () {
            return this._useStaticIcon;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._useStaticIcon = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    BaseLayersSwitcherComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.layers$$ = this.map.layers$.subscribe((/**
         * @param {?} arrayLayers
         * @return {?}
         */
        function (arrayLayers) {
            _this._baseLayers = arrayLayers.filter((/**
             * @param {?} l
             * @return {?}
             */
            function (l) { return l.baseLayer; }));
        }));
    };
    /**
     * @return {?}
     */
    BaseLayersSwitcherComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.layers$$.unsubscribe();
    };
    /**
     * @return {?}
     */
    BaseLayersSwitcherComponent.prototype.collapseOrExpand = /**
     * @return {?}
     */
    function () {
        if (this.baseLayers.length > 1 || this.useStaticIcon) {
            this.expand = !this.expand;
        }
        else {
            this.expand = false;
        }
    };
    Object.defineProperty(BaseLayersSwitcherComponent.prototype, "baseLayers", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var mapResolution = this.map.viewController.getResolution();
            /** @type {?} */
            var bl = this._baseLayers.filter((/**
             * @param {?} l
             * @return {?}
             */
            function (l) {
                return ((!l.options.maxResolution ||
                    mapResolution <= l.options.maxResolution) &&
                    (!l.options.minResolution || mapResolution >= l.options.minResolution));
            }));
            /** @type {?} */
            var blHidden = bl.filter((/**
             * @param {?} l
             * @return {?}
             */
            function (l) { return !l.visible; }));
            return blHidden.length + 1 === bl.length ? blHidden : bl;
        },
        enumerable: true,
        configurable: true
    });
    BaseLayersSwitcherComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-baselayers-switcher',
                    template: "<div *ngIf=\"baseLayers.length > 0\"\r\n     class=\"igo-baselayers-switcher-container\"\r\n     [ngClass]=\"{'container-expand': expand}\"\r\n     [@baseLayerSwitcherState]=\"expand ? 'expand' : useStaticIcon ? 'collapseIcon' : 'collapseMap'\"\r\n     (@baseLayerSwitcherState.start)=\"showButton=false\"\r\n     (@baseLayerSwitcherState.done)=\"showButton=true\"\r\n     (click)=\"collapseOrExpand()\">\r\n\r\n     <div *ngIf=\"useStaticIcon && !expand && showButton\" class=\"igo-baselayers-switcher-button-container\">\r\n       <button\r\n         mat-icon-button\r\n         [matTooltip]=\"'igo.geo.mapButtons.baselayerSwitcher' | translate\"\r\n         matTooltipPosition=\"right\"\r\n         color=\"primary\">\r\n         <mat-icon svgIcon=\"photo-library\"></mat-icon>\r\n       </button>\r\n     </div>\r\n\r\n     <igo-mini-basemap *ngFor=\"let baseLayer of baseLayers; let i = index\"\r\n       [map]=\"map\"\r\n       [baseLayer]=\"baseLayer\"\r\n       [display]=\"expand || (i === 0 && !useStaticIcon)\"\r\n       [disabled]=\"!expand && baseLayers.length > 1\">\r\n     </igo-mini-basemap>\r\n\r\n    <div class=\"more-baselayers\">\r\n      <mat-icon class=\"material-icons mat-icon mat-list-avatar\" color=\"primary\" svgIcon=\"menu-down\"></mat-icon>\r\n    </div>\r\n\r\n</div>\r\n",
                    animations: [baseLayersSwitcherSlideInOut()],
                    styles: [".igo-baselayers-switcher-container{height:auto;position:relative}.container-expand{overflow:hidden;border-width:0}.more-baselayers{width:80px;height:20px;background-color:#fff;text-align:center;cursor:pointer}.more-baselayers:hover{background-color:#efefef}.igo-baselayers-switcher-button-container{width:40px;background-color:#fff}.igo-baselayers-switcher-button-container:hover{background-color:#efefef}:host>>>button .mat-button-ripple-round,button{border-radius:0}"]
                }] }
    ];
    /** @nocollapse */
    BaseLayersSwitcherComponent.ctorParameters = function () { return [
        { type: MediaService }
    ]; };
    BaseLayersSwitcherComponent.propDecorators = {
        map: [{ type: Input }],
        useStaticIcon: [{ type: Input }]
    };
    return BaseLayersSwitcherComponent;
}());
export { BaseLayersSwitcherComponent };
if (false) {
    /**
     * @type {?}
     * @private
     */
    BaseLayersSwitcherComponent.prototype._map;
    /**
     * @type {?}
     * @private
     */
    BaseLayersSwitcherComponent.prototype._useStaticIcon;
    /** @type {?} */
    BaseLayersSwitcherComponent.prototype._baseLayers;
    /** @type {?} */
    BaseLayersSwitcherComponent.prototype.expand;
    /** @type {?} */
    BaseLayersSwitcherComponent.prototype.showButton;
    /**
     * @type {?}
     * @private
     */
    BaseLayersSwitcherComponent.prototype.layers$$;
    /**
     * @type {?}
     * @private
     */
    BaseLayersSwitcherComponent.prototype.mediaService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZWxheWVycy1zd2l0Y2hlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvbWFwL2Jhc2VsYXllcnMtc3dpdGNoZXIvYmFzZWxheWVycy1zd2l0Y2hlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUE0QixNQUFNLGVBQWUsQ0FBQztBQUczRSxPQUFPLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLFlBQVksQ0FBQztBQUVqRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ25DLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRS9FO0lBK0JFLHFDQUFvQixZQUEwQjtRQUExQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQU52QyxnQkFBVyxHQUFZLEVBQUUsQ0FBQztRQUMxQixXQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2YsZUFBVSxHQUFHLElBQUksQ0FBQzs7WUFLakIsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEtBQUs7UUFDNUMsSUFBSSxLQUFLLEtBQUssS0FBSyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsYUFBYSxLQUFLLFNBQVMsRUFBRTtZQUM5RCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztTQUMzQjtJQUNILENBQUM7SUE3QkQsc0JBQ0ksNENBQUc7Ozs7UUFEUDtZQUVFLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztRQUNuQixDQUFDOzs7OztRQUNELFVBQVEsS0FBYTtZQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztRQUNwQixDQUFDOzs7T0FIQTtJQU1ELHNCQUNJLHNEQUFhOzs7O1FBRGpCO1lBRUUsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO1FBQzdCLENBQUM7Ozs7O1FBQ0QsVUFBa0IsS0FBYztZQUM5QixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztRQUM5QixDQUFDOzs7T0FIQTs7OztJQW1CRCxxREFBZTs7O0lBQWY7UUFBQSxpQkFJQztRQUhDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUzs7OztRQUFDLFVBQUEsV0FBVztZQUNwRCxLQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQyxNQUFNOzs7O1lBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsU0FBUyxFQUFYLENBQVcsRUFBQyxDQUFDO1FBQzFELENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7OztJQUVELGlEQUFXOzs7SUFBWDtRQUNFLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDOUIsQ0FBQzs7OztJQUVELHNEQUFnQjs7O0lBQWhCO1FBQ0UsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUNwRCxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUM1QjthQUFNO1lBQ0wsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7U0FDckI7SUFDSCxDQUFDO0lBRUQsc0JBQUksbURBQVU7Ozs7UUFBZDs7Z0JBQ1EsYUFBYSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLGFBQWEsRUFBRTs7Z0JBRXZELEVBQUUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU07Ozs7WUFBQyxVQUFBLENBQUM7Z0JBQ2xDLE9BQU8sQ0FDTCxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxhQUFhO29CQUN2QixhQUFhLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUM7b0JBQzNDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGFBQWEsSUFBSSxhQUFhLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FDdkUsQ0FBQztZQUNKLENBQUMsRUFBQzs7Z0JBRUksUUFBUSxHQUFHLEVBQUUsQ0FBQyxNQUFNOzs7O1lBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQVYsQ0FBVSxFQUFDO1lBQzNDLE9BQU8sUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDM0QsQ0FBQzs7O09BQUE7O2dCQXJFRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHlCQUF5QjtvQkFDbkMsb3lDQUFtRDtvQkFFbkQsVUFBVSxFQUFFLENBQUMsNEJBQTRCLEVBQUUsQ0FBQzs7aUJBQzdDOzs7O2dCQVZRLFlBQVk7OztzQkFZbEIsS0FBSztnQ0FTTCxLQUFLOztJQXNEUixrQ0FBQztDQUFBLEFBdEVELElBc0VDO1NBaEVZLDJCQUEyQjs7Ozs7O0lBUXRDLDJDQUFxQjs7Ozs7SUFTckIscURBQWdDOztJQUVoQyxrREFBaUM7O0lBQ2pDLDZDQUFzQjs7SUFDdEIsaURBQXlCOzs7OztJQUV6QiwrQ0FBK0I7Ozs7O0lBRW5CLG1EQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IE1lZGlhU2VydmljZSwgTWVkaWEgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi8uLi9sYXllcic7XHJcbmltcG9ydCB7IElnb01hcCB9IGZyb20gJy4uL3NoYXJlZCc7XHJcbmltcG9ydCB7IGJhc2VMYXllcnNTd2l0Y2hlclNsaWRlSW5PdXQgfSBmcm9tICcuL2Jhc2VsYXllcnMtc3dpdGNoZXIuYW5pbWF0aW9uJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLWJhc2VsYXllcnMtc3dpdGNoZXInLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9iYXNlbGF5ZXJzLXN3aXRjaGVyLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9iYXNlbGF5ZXJzLXN3aXRjaGVyLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgYW5pbWF0aW9uczogW2Jhc2VMYXllcnNTd2l0Y2hlclNsaWRlSW5PdXQoKV1cclxufSlcclxuZXhwb3J0IGNsYXNzIEJhc2VMYXllcnNTd2l0Y2hlckNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XHJcbiAgQElucHV0KClcclxuICBnZXQgbWFwKCk6IElnb01hcCB7XHJcbiAgICByZXR1cm4gdGhpcy5fbWFwO1xyXG4gIH1cclxuICBzZXQgbWFwKHZhbHVlOiBJZ29NYXApIHtcclxuICAgIHRoaXMuX21hcCA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9tYXA6IElnb01hcDtcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgdXNlU3RhdGljSWNvbigpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl91c2VTdGF0aWNJY29uO1xyXG4gIH1cclxuICBzZXQgdXNlU3RhdGljSWNvbih2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fdXNlU3RhdGljSWNvbiA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF91c2VTdGF0aWNJY29uOiBib29sZWFuO1xyXG5cclxuICBwdWJsaWMgX2Jhc2VMYXllcnM6IExheWVyW10gPSBbXTtcclxuICBwdWJsaWMgZXhwYW5kID0gZmFsc2U7XHJcbiAgcHVibGljIHNob3dCdXR0b24gPSB0cnVlO1xyXG5cclxuICBwcml2YXRlIGxheWVycyQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbWVkaWFTZXJ2aWNlOiBNZWRpYVNlcnZpY2UpIHtcclxuICAgIGNvbnN0IG1lZGlhID0gdGhpcy5tZWRpYVNlcnZpY2UubWVkaWEkLnZhbHVlO1xyXG4gICAgaWYgKG1lZGlhID09PSBNZWRpYS5Nb2JpbGUgJiYgdGhpcy51c2VTdGF0aWNJY29uID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy51c2VTdGF0aWNJY29uID0gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgIHRoaXMubGF5ZXJzJCQgPSB0aGlzLm1hcC5sYXllcnMkLnN1YnNjcmliZShhcnJheUxheWVycyA9PiB7XHJcbiAgICAgIHRoaXMuX2Jhc2VMYXllcnMgPSBhcnJheUxheWVycy5maWx0ZXIobCA9PiBsLmJhc2VMYXllcik7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5sYXllcnMkJC51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgY29sbGFwc2VPckV4cGFuZCgpIHtcclxuICAgIGlmICh0aGlzLmJhc2VMYXllcnMubGVuZ3RoID4gMSB8fCB0aGlzLnVzZVN0YXRpY0ljb24pIHtcclxuICAgICAgdGhpcy5leHBhbmQgPSAhdGhpcy5leHBhbmQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmV4cGFuZCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0IGJhc2VMYXllcnMoKTogTGF5ZXJbXSB7XHJcbiAgICBjb25zdCBtYXBSZXNvbHV0aW9uID0gdGhpcy5tYXAudmlld0NvbnRyb2xsZXIuZ2V0UmVzb2x1dGlvbigpO1xyXG5cclxuICAgIGNvbnN0IGJsID0gdGhpcy5fYmFzZUxheWVycy5maWx0ZXIobCA9PiB7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgKCFsLm9wdGlvbnMubWF4UmVzb2x1dGlvbiB8fFxyXG4gICAgICAgICAgbWFwUmVzb2x1dGlvbiA8PSBsLm9wdGlvbnMubWF4UmVzb2x1dGlvbikgJiZcclxuICAgICAgICAoIWwub3B0aW9ucy5taW5SZXNvbHV0aW9uIHx8IG1hcFJlc29sdXRpb24gPj0gbC5vcHRpb25zLm1pblJlc29sdXRpb24pXHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBibEhpZGRlbiA9IGJsLmZpbHRlcihsID0+ICFsLnZpc2libGUpO1xyXG4gICAgcmV0dXJuIGJsSGlkZGVuLmxlbmd0aCArIDEgPT09IGJsLmxlbmd0aCA/IGJsSGlkZGVuIDogYmw7XHJcbiAgfVxyXG59XHJcbiJdfQ==