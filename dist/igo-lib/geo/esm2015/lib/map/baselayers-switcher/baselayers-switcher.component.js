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
        const bl = this._baseLayers.filter((/**
         * @param {?} l
         * @return {?}
         */
        l => {
            return ((!l.options.maxResolution ||
                mapResolution <= l.options.maxResolution) &&
                (!l.options.minResolution || mapResolution >= l.options.minResolution));
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
                template: "<div *ngIf=\"baseLayers.length > 0\"\r\n     class=\"igo-baselayers-switcher-container\"\r\n     [ngClass]=\"{'container-expand': expand}\"\r\n     [@baseLayerSwitcherState]=\"expand ? 'expand' : useStaticIcon ? 'collapseIcon' : 'collapseMap'\"\r\n     (@baseLayerSwitcherState.start)=\"showButton=false\"\r\n     (@baseLayerSwitcherState.done)=\"showButton=true\"\r\n     (click)=\"collapseOrExpand()\">\r\n\r\n     <div *ngIf=\"useStaticIcon && !expand && showButton\" class=\"igo-baselayers-switcher-button-container\">\r\n       <button\r\n         mat-icon-button\r\n         [matTooltip]=\"'igo.geo.mapButtons.baselayerSwitcher' | translate\"\r\n         matTooltipPosition=\"right\"\r\n         color=\"primary\">\r\n         <mat-icon svgIcon=\"photo-library\"></mat-icon>\r\n       </button>\r\n     </div>\r\n\r\n     <igo-mini-basemap *ngFor=\"let baseLayer of baseLayers; let i = index\"\r\n       [map]=\"map\"\r\n       [baseLayer]=\"baseLayer\"\r\n       [display]=\"expand || (i === 0 && !useStaticIcon)\"\r\n       [disabled]=\"!expand && baseLayers.length > 1\">\r\n     </igo-mini-basemap>\r\n\r\n    <div class=\"more-baselayers\">\r\n      <mat-icon class=\"material-icons mat-icon mat-list-avatar\" color=\"primary\" svgIcon=\"menu-down\"></mat-icon>\r\n    </div>\r\n\r\n</div>\r\n",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZWxheWVycy1zd2l0Y2hlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvbWFwL2Jhc2VsYXllcnMtc3dpdGNoZXIvYmFzZWxheWVycy1zd2l0Y2hlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUE0QixNQUFNLGVBQWUsQ0FBQztBQUczRSxPQUFPLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLFlBQVksQ0FBQztBQUVqRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ25DLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBUS9FLE1BQU0sT0FBTywyQkFBMkI7Ozs7SUF5QnRDLFlBQW9CLFlBQTBCO1FBQTFCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBTnZDLGdCQUFXLEdBQVksRUFBRSxDQUFDO1FBQzFCLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFDZixlQUFVLEdBQUcsSUFBSSxDQUFDOztjQUtqQixLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsS0FBSztRQUM1QyxJQUFJLEtBQUssS0FBSyxLQUFLLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxhQUFhLEtBQUssU0FBUyxFQUFFO1lBQzlELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1NBQzNCO0lBQ0gsQ0FBQzs7OztJQTdCRCxJQUNJLEdBQUc7UUFDTCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDbkIsQ0FBQzs7Ozs7SUFDRCxJQUFJLEdBQUcsQ0FBQyxLQUFhO1FBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO0lBQ3BCLENBQUM7Ozs7SUFHRCxJQUNJLGFBQWE7UUFDZixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7SUFDN0IsQ0FBQzs7Ozs7SUFDRCxJQUFJLGFBQWEsQ0FBQyxLQUFjO1FBQzlCLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO0lBQzlCLENBQUM7Ozs7SUFnQkQsZUFBZTtRQUNiLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUzs7OztRQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQ3ZELElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDLE1BQU07Ozs7WUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUMsQ0FBQztRQUMxRCxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUM5QixDQUFDOzs7O0lBRUQsZ0JBQWdCO1FBQ2QsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUNwRCxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUM1QjthQUFNO1lBQ0wsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7U0FDckI7SUFDSCxDQUFDOzs7O0lBRUQsSUFBSSxVQUFVOztjQUNOLGFBQWEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxhQUFhLEVBQUU7O2NBRXZELEVBQUUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU07Ozs7UUFBQyxDQUFDLENBQUMsRUFBRTtZQUNyQyxPQUFPLENBQ0wsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsYUFBYTtnQkFDdkIsYUFBYSxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDO2dCQUMzQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxhQUFhLElBQUksYUFBYSxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQ3ZFLENBQUM7UUFDSixDQUFDLEVBQUM7O2NBRUksUUFBUSxHQUFHLEVBQUUsQ0FBQyxNQUFNOzs7O1FBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUM7UUFDM0MsT0FBTyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUMzRCxDQUFDOzs7WUFyRUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx5QkFBeUI7Z0JBQ25DLG95Q0FBbUQ7Z0JBRW5ELFVBQVUsRUFBRSxDQUFDLDRCQUE0QixFQUFFLENBQUM7O2FBQzdDOzs7O1lBVlEsWUFBWTs7O2tCQVlsQixLQUFLOzRCQVNMLEtBQUs7Ozs7Ozs7SUFGTiwyQ0FBcUI7Ozs7O0lBU3JCLHFEQUFnQzs7SUFFaEMsa0RBQWlDOztJQUNqQyw2Q0FBc0I7O0lBQ3RCLGlEQUF5Qjs7Ozs7SUFFekIsK0NBQStCOzs7OztJQUVuQixtREFBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBNZWRpYVNlcnZpY2UsIE1lZGlhIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcbmltcG9ydCB7IExheWVyIH0gZnJvbSAnLi4vLi4vbGF5ZXInO1xyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICcuLi9zaGFyZWQnO1xyXG5pbXBvcnQgeyBiYXNlTGF5ZXJzU3dpdGNoZXJTbGlkZUluT3V0IH0gZnJvbSAnLi9iYXNlbGF5ZXJzLXN3aXRjaGVyLmFuaW1hdGlvbic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1iYXNlbGF5ZXJzLXN3aXRjaGVyJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vYmFzZWxheWVycy1zd2l0Y2hlci5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vYmFzZWxheWVycy1zd2l0Y2hlci5jb21wb25lbnQuc2NzcyddLFxyXG4gIGFuaW1hdGlvbnM6IFtiYXNlTGF5ZXJzU3dpdGNoZXJTbGlkZUluT3V0KCldXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBCYXNlTGF5ZXJzU3dpdGNoZXJDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IG1hcCgpOiBJZ29NYXAge1xyXG4gICAgcmV0dXJuIHRoaXMuX21hcDtcclxuICB9XHJcbiAgc2V0IG1hcCh2YWx1ZTogSWdvTWFwKSB7XHJcbiAgICB0aGlzLl9tYXAgPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfbWFwOiBJZ29NYXA7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IHVzZVN0YXRpY0ljb24oKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fdXNlU3RhdGljSWNvbjtcclxuICB9XHJcbiAgc2V0IHVzZVN0YXRpY0ljb24odmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX3VzZVN0YXRpY0ljb24gPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfdXNlU3RhdGljSWNvbjogYm9vbGVhbjtcclxuXHJcbiAgcHVibGljIF9iYXNlTGF5ZXJzOiBMYXllcltdID0gW107XHJcbiAgcHVibGljIGV4cGFuZCA9IGZhbHNlO1xyXG4gIHB1YmxpYyBzaG93QnV0dG9uID0gdHJ1ZTtcclxuXHJcbiAgcHJpdmF0ZSBsYXllcnMkJDogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1lZGlhU2VydmljZTogTWVkaWFTZXJ2aWNlKSB7XHJcbiAgICBjb25zdCBtZWRpYSA9IHRoaXMubWVkaWFTZXJ2aWNlLm1lZGlhJC52YWx1ZTtcclxuICAgIGlmIChtZWRpYSA9PT0gTWVkaWEuTW9iaWxlICYmIHRoaXMudXNlU3RhdGljSWNvbiA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMudXNlU3RhdGljSWNvbiA9IHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICB0aGlzLmxheWVycyQkID0gdGhpcy5tYXAubGF5ZXJzJC5zdWJzY3JpYmUoYXJyYXlMYXllcnMgPT4ge1xyXG4gICAgICB0aGlzLl9iYXNlTGF5ZXJzID0gYXJyYXlMYXllcnMuZmlsdGVyKGwgPT4gbC5iYXNlTGF5ZXIpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMubGF5ZXJzJCQudW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIGNvbGxhcHNlT3JFeHBhbmQoKSB7XHJcbiAgICBpZiAodGhpcy5iYXNlTGF5ZXJzLmxlbmd0aCA+IDEgfHwgdGhpcy51c2VTdGF0aWNJY29uKSB7XHJcbiAgICAgIHRoaXMuZXhwYW5kID0gIXRoaXMuZXhwYW5kO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5leHBhbmQgPSBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldCBiYXNlTGF5ZXJzKCk6IExheWVyW10ge1xyXG4gICAgY29uc3QgbWFwUmVzb2x1dGlvbiA9IHRoaXMubWFwLnZpZXdDb250cm9sbGVyLmdldFJlc29sdXRpb24oKTtcclxuXHJcbiAgICBjb25zdCBibCA9IHRoaXMuX2Jhc2VMYXllcnMuZmlsdGVyKGwgPT4ge1xyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgICghbC5vcHRpb25zLm1heFJlc29sdXRpb24gfHxcclxuICAgICAgICAgIG1hcFJlc29sdXRpb24gPD0gbC5vcHRpb25zLm1heFJlc29sdXRpb24pICYmXHJcbiAgICAgICAgKCFsLm9wdGlvbnMubWluUmVzb2x1dGlvbiB8fCBtYXBSZXNvbHV0aW9uID49IGwub3B0aW9ucy5taW5SZXNvbHV0aW9uKVxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgYmxIaWRkZW4gPSBibC5maWx0ZXIobCA9PiAhbC52aXNpYmxlKTtcclxuICAgIHJldHVybiBibEhpZGRlbi5sZW5ndGggKyAxID09PSBibC5sZW5ndGggPyBibEhpZGRlbiA6IGJsO1xyXG4gIH1cclxufVxyXG4iXX0=