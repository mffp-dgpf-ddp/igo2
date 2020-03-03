/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { MediaService, Media } from '@igo2/core';
import { IgoMap } from '../shared';
import { baseLayersSwitcherSlideInOut } from './baselayers-switcher.animation';
export class BaseLayersSwitcherComponent {
    /**
     * @param {?} mediaService
     */
    constructor(mediaService) {
        this.mediaService = mediaService;
        this._baseLayers = [];
        this.expand = false;
        this.showButton = true;
        /** @type {?} */
        const media = this.mediaService.media$.value;
        if (media === Media.Mobile && this.useStaticIcon === undefined) {
            this.useStaticIcon = true;
        }
    }
    /**
     * @return {?}
     */
    get map() {
        return this._map;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set map(value) {
        this._map = value;
    }
    /**
     * @return {?}
     */
    get useStaticIcon() {
        return this._useStaticIcon;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set useStaticIcon(value) {
        this._useStaticIcon = value;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.layers$$ = this.map.layers$.subscribe((/**
         * @param {?} arrayLayers
         * @return {?}
         */
        arrayLayers => {
            this._baseLayers = arrayLayers.filter((/**
             * @param {?} l
             * @return {?}
             */
            l => l.baseLayer));
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.layers$$.unsubscribe();
    }
    /**
     * @return {?}
     */
    collapseOrExpand() {
        if (this.baseLayers.length > 1 || this.useStaticIcon) {
            this.expand = !this.expand;
        }
        else {
            this.expand = false;
        }
    }
    /**
     * @return {?}
     */
    get baseLayers() {
        /** @type {?} */
        const mapResolution = this.map.viewController.getResolution();
        /** @type {?} */
        const mapZoom = this.map.viewController.getZoom();
        /** @type {?} */
        const bl = this._baseLayers.filter((/**
         * @param {?} l
         * @return {?}
         */
        l => {
            return ((!l.options.maxResolution ||
                mapResolution <= l.options.maxResolution) &&
                (!l.options.minResolution || mapResolution >= l.options.minResolution) &&
                (!l.options.source.options.maxZoom || mapZoom <= l.options.source.options.maxZoom) &&
                (!l.options.source.options.minZoom || mapZoom >= l.options.source.options.minZoom));
        }));
        /** @type {?} */
        const blHidden = bl.filter((/**
         * @param {?} l
         * @return {?}
         */
        l => !l.visible));
        return blHidden.length + 1 === bl.length ? blHidden : bl;
    }
}
BaseLayersSwitcherComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-baselayers-switcher',
                template: "<div *ngIf=\"baseLayers.length > 0\"\r\n     class=\"igo-baselayers-switcher-container\"\r\n     [ngClass]=\"{'container-expand': expand}\"\r\n     [@baseLayerSwitcherState]=\"expand ? 'expand' : useStaticIcon ? 'collapseIcon' : 'collapseMap'\"\r\n     (@baseLayerSwitcherState.start)=\"showButton=false\"\r\n     (@baseLayerSwitcherState.done)=\"showButton=true\"\r\n     (click)=\"collapseOrExpand()\">\r\n\r\n     <div *ngIf=\"useStaticIcon && !expand && showButton\" class=\"igo-baselayers-switcher-button-container\">\r\n       <button\r\n         mat-icon-button\r\n         [matTooltip]=\"'igo.geo.mapButtons.baselayerSwitcher' | translate\"\r\n         matTooltipPosition=\"right\"\r\n         color=\"primary\">\r\n         <mat-icon svgIcon=\"image-multiple\"></mat-icon>\r\n       </button>\r\n     </div>\r\n\r\n     <igo-mini-basemap *ngFor=\"let baseLayer of baseLayers; let i = index\"\r\n       [map]=\"map\"\r\n       [baseLayer]=\"baseLayer\"\r\n       [title]=\"(baseLayers.length > 2 && !expand) ? ('igo.geo.baselayersSwitcher.title' | translate) : baseLayer.title\"\r\n       [display]=\"expand || (i === 0 && !useStaticIcon)\"\r\n       [disabled]=\"!expand && baseLayers.length > 1\">\r\n     </igo-mini-basemap>\r\n\r\n    <div class=\"more-baselayers\">\r\n      <mat-icon class=\"material-icons mat-icon mat-list-avatar\" color=\"primary\" svgIcon=\"menu-down\"></mat-icon>\r\n    </div>\r\n\r\n</div>\r\n",
                animations: [baseLayersSwitcherSlideInOut()],
                styles: [".igo-baselayers-switcher-container{height:auto;position:relative}.container-expand{overflow:hidden;border-width:0}.more-baselayers{width:80px;height:20px;background-color:#fff;text-align:center;cursor:pointer}.more-baselayers:hover{background-color:#efefef}.igo-baselayers-switcher-button-container{width:40px;background-color:#fff}.igo-baselayers-switcher-button-container:hover{background-color:#efefef}:host>>>button .mat-button-ripple-round,button{border-radius:0}"]
            }] }
];
/** @nocollapse */
BaseLayersSwitcherComponent.ctorParameters = () => [
    { type: MediaService }
];
BaseLayersSwitcherComponent.propDecorators = {
    map: [{ type: Input }],
    useStaticIcon: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZWxheWVycy1zd2l0Y2hlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvbWFwL2Jhc2VsYXllcnMtc3dpdGNoZXIvYmFzZWxheWVycy1zd2l0Y2hlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUE0QixNQUFNLGVBQWUsQ0FBQztBQUczRSxPQUFPLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLFlBQVksQ0FBQztBQUVqRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ25DLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBUS9FLE1BQU0sT0FBTywyQkFBMkI7Ozs7SUF5QnRDLFlBQW9CLFlBQTBCO1FBQTFCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBTnZDLGdCQUFXLEdBQVksRUFBRSxDQUFDO1FBQzFCLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFDZixlQUFVLEdBQUcsSUFBSSxDQUFDOztjQUtqQixLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsS0FBSztRQUM1QyxJQUFJLEtBQUssS0FBSyxLQUFLLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxhQUFhLEtBQUssU0FBUyxFQUFFO1lBQzlELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1NBQzNCO0lBQ0gsQ0FBQzs7OztJQTdCRCxJQUNJLEdBQUc7UUFDTCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDbkIsQ0FBQzs7Ozs7SUFDRCxJQUFJLEdBQUcsQ0FBQyxLQUFhO1FBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO0lBQ3BCLENBQUM7Ozs7SUFHRCxJQUNJLGFBQWE7UUFDZixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7SUFDN0IsQ0FBQzs7Ozs7SUFDRCxJQUFJLGFBQWEsQ0FBQyxLQUFjO1FBQzlCLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO0lBQzlCLENBQUM7Ozs7SUFnQkQsZUFBZTtRQUNiLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUzs7OztRQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQ3ZELElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDLE1BQU07Ozs7WUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUMsQ0FBQztRQUMxRCxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUM5QixDQUFDOzs7O0lBRUQsZ0JBQWdCO1FBQ2QsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUNwRCxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUM1QjthQUFNO1lBQ0wsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7U0FDckI7SUFDSCxDQUFDOzs7O0lBRUQsSUFBSSxVQUFVOztjQUNOLGFBQWEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxhQUFhLEVBQUU7O2NBQ3ZELE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUU7O2NBRTNDLEVBQUUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU07Ozs7UUFBQyxDQUFDLENBQUMsRUFBRTtZQUNyQyxPQUFPLENBQ0wsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsYUFBYTtnQkFDdkIsYUFBYSxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDO2dCQUMzQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxhQUFhLElBQUksYUFBYSxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDO2dCQUN0RSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sSUFBSSxPQUFPLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztnQkFDbEYsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUksT0FBTyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FDbkYsQ0FBQztRQUNKLENBQUMsRUFBQzs7Y0FFSSxRQUFRLEdBQUcsRUFBRSxDQUFDLE1BQU07Ozs7UUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBQztRQUMzQyxPQUFPLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQzNELENBQUM7OztZQXhFRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHlCQUF5QjtnQkFDbkMsbTZDQUFtRDtnQkFFbkQsVUFBVSxFQUFFLENBQUMsNEJBQTRCLEVBQUUsQ0FBQzs7YUFDN0M7Ozs7WUFWUSxZQUFZOzs7a0JBWWxCLEtBQUs7NEJBU0wsS0FBSzs7Ozs7OztJQUZOLDJDQUFxQjs7Ozs7SUFTckIscURBQWdDOztJQUVoQyxrREFBaUM7O0lBQ2pDLDZDQUFzQjs7SUFDdEIsaURBQXlCOzs7OztJQUV6QiwrQ0FBK0I7Ozs7O0lBRW5CLG1EQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IE1lZGlhU2VydmljZSwgTWVkaWEgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi8uLi9sYXllcic7XHJcbmltcG9ydCB7IElnb01hcCB9IGZyb20gJy4uL3NoYXJlZCc7XHJcbmltcG9ydCB7IGJhc2VMYXllcnNTd2l0Y2hlclNsaWRlSW5PdXQgfSBmcm9tICcuL2Jhc2VsYXllcnMtc3dpdGNoZXIuYW5pbWF0aW9uJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLWJhc2VsYXllcnMtc3dpdGNoZXInLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9iYXNlbGF5ZXJzLXN3aXRjaGVyLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9iYXNlbGF5ZXJzLXN3aXRjaGVyLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgYW5pbWF0aW9uczogW2Jhc2VMYXllcnNTd2l0Y2hlclNsaWRlSW5PdXQoKV1cclxufSlcclxuZXhwb3J0IGNsYXNzIEJhc2VMYXllcnNTd2l0Y2hlckNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XHJcbiAgQElucHV0KClcclxuICBnZXQgbWFwKCk6IElnb01hcCB7XHJcbiAgICByZXR1cm4gdGhpcy5fbWFwO1xyXG4gIH1cclxuICBzZXQgbWFwKHZhbHVlOiBJZ29NYXApIHtcclxuICAgIHRoaXMuX21hcCA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9tYXA6IElnb01hcDtcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgdXNlU3RhdGljSWNvbigpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl91c2VTdGF0aWNJY29uO1xyXG4gIH1cclxuICBzZXQgdXNlU3RhdGljSWNvbih2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fdXNlU3RhdGljSWNvbiA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF91c2VTdGF0aWNJY29uOiBib29sZWFuO1xyXG5cclxuICBwdWJsaWMgX2Jhc2VMYXllcnM6IExheWVyW10gPSBbXTtcclxuICBwdWJsaWMgZXhwYW5kID0gZmFsc2U7XHJcbiAgcHVibGljIHNob3dCdXR0b24gPSB0cnVlO1xyXG5cclxuICBwcml2YXRlIGxheWVycyQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbWVkaWFTZXJ2aWNlOiBNZWRpYVNlcnZpY2UpIHtcclxuICAgIGNvbnN0IG1lZGlhID0gdGhpcy5tZWRpYVNlcnZpY2UubWVkaWEkLnZhbHVlO1xyXG4gICAgaWYgKG1lZGlhID09PSBNZWRpYS5Nb2JpbGUgJiYgdGhpcy51c2VTdGF0aWNJY29uID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy51c2VTdGF0aWNJY29uID0gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgIHRoaXMubGF5ZXJzJCQgPSB0aGlzLm1hcC5sYXllcnMkLnN1YnNjcmliZShhcnJheUxheWVycyA9PiB7XHJcbiAgICAgIHRoaXMuX2Jhc2VMYXllcnMgPSBhcnJheUxheWVycy5maWx0ZXIobCA9PiBsLmJhc2VMYXllcik7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5sYXllcnMkJC51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgY29sbGFwc2VPckV4cGFuZCgpIHtcclxuICAgIGlmICh0aGlzLmJhc2VMYXllcnMubGVuZ3RoID4gMSB8fCB0aGlzLnVzZVN0YXRpY0ljb24pIHtcclxuICAgICAgdGhpcy5leHBhbmQgPSAhdGhpcy5leHBhbmQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmV4cGFuZCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0IGJhc2VMYXllcnMoKTogTGF5ZXJbXSB7XHJcbiAgICBjb25zdCBtYXBSZXNvbHV0aW9uID0gdGhpcy5tYXAudmlld0NvbnRyb2xsZXIuZ2V0UmVzb2x1dGlvbigpO1xyXG4gICAgY29uc3QgbWFwWm9vbSA9IHRoaXMubWFwLnZpZXdDb250cm9sbGVyLmdldFpvb20oKTtcclxuXHJcbiAgICBjb25zdCBibCA9IHRoaXMuX2Jhc2VMYXllcnMuZmlsdGVyKGwgPT4ge1xyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgICghbC5vcHRpb25zLm1heFJlc29sdXRpb24gfHxcclxuICAgICAgICAgIG1hcFJlc29sdXRpb24gPD0gbC5vcHRpb25zLm1heFJlc29sdXRpb24pICYmXHJcbiAgICAgICAgKCFsLm9wdGlvbnMubWluUmVzb2x1dGlvbiB8fCBtYXBSZXNvbHV0aW9uID49IGwub3B0aW9ucy5taW5SZXNvbHV0aW9uKSAmJlxyXG4gICAgICAgICghbC5vcHRpb25zLnNvdXJjZS5vcHRpb25zLm1heFpvb20gfHwgbWFwWm9vbSA8PSBsLm9wdGlvbnMuc291cmNlLm9wdGlvbnMubWF4Wm9vbSkgJiZcclxuICAgICAgICAoIWwub3B0aW9ucy5zb3VyY2Uub3B0aW9ucy5taW5ab29tIHx8IG1hcFpvb20gPj0gbC5vcHRpb25zLnNvdXJjZS5vcHRpb25zLm1pblpvb20pXHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBibEhpZGRlbiA9IGJsLmZpbHRlcihsID0+ICFsLnZpc2libGUpO1xyXG4gICAgcmV0dXJuIGJsSGlkZGVuLmxlbmd0aCArIDEgPT09IGJsLmxlbmd0aCA/IGJsSGlkZGVuIDogYmw7XHJcbiAgfVxyXG59XHJcbiJdfQ==