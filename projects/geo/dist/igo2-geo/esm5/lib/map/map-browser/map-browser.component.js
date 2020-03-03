/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { SubjectStatus } from '@igo2/utils';
import { ActivityService } from '@igo2/core';
import { IgoMap } from '../shared';
var MapBrowserComponent = /** @class */ (function () {
    function MapBrowserComponent(activityService) {
        this.activityService = activityService;
        this.id = "igo-map-target-" + new Date().getTime();
    }
    Object.defineProperty(MapBrowserComponent.prototype, "view", {
        get: /**
         * @return {?}
         */
        function () { return this._view; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._view = value;
            if (this.map !== undefined) {
                this.map.updateView(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MapBrowserComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.status$$ = this.map.status$.subscribe((/**
         * @param {?} status
         * @return {?}
         */
        function (status) {
            return _this.handleStatusChange(status);
        }));
    };
    /**
     * @return {?}
     */
    MapBrowserComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.map.setTarget(this.id);
    };
    /**
     * @return {?}
     */
    MapBrowserComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.map.setTarget(undefined);
        this.activityService.unregister(this.activityId);
        this.status$$.unsubscribe();
    };
    /**
     * @private
     * @param {?} status
     * @return {?}
     */
    MapBrowserComponent.prototype.handleStatusChange = /**
     * @private
     * @param {?} status
     * @return {?}
     */
    function (status) {
        if (status === SubjectStatus.Working && this.activityId === undefined) {
            this.activityId = this.activityService.register();
        }
        else if (status === SubjectStatus.Done && this.activityId !== undefined) {
            this.activityService.unregister(this.activityId);
            this.activityId = undefined;
        }
    };
    MapBrowserComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-map-browser',
                    template: "<div [id]=\"id\" class=\"igo-map-browser-target\"></div>\r\n<ng-content></ng-content>\r\n",
                    styles: [":host{position:relative;display:block}.igo-map-browser-target,:host{width:100%;height:100%}:host>>>igo-zoom-button{position:absolute;bottom:5px;right:5px}:host>>>igo-offline-button{position:absolute;bottom:15px;right:5px}:host>>>igo-geolocate-button{position:absolute;bottom:5px;right:5px}:host>>>igo-rotation-button{position:absolute;top:calc(40px + 5px + 5px);right:5px}:host>>>igo-user-button{position:absolute;bottom:5px;right:calc(5px + 50px)}@media only screen and (orientation:portrait) and (max-width:599px),only screen and (orientation:landscape) and (max-width:959px){:host>>>igo-zoom-button{display:none}:host>>>igo-offline-button{bottom:5px}:host>>>igo-geolocate-button{bottom:5px}:host>>>igo-rotation-button{top:calc(40px + 5px + 5px)}:host>>>igo-user-button{right:calc(5px + 90px)}}:host>>>igo-baselayers-switcher{position:absolute;bottom:5px;left:5px}:host>>>.ol-attribution{left:5px;bottom:5px;text-align:left;padding:0;margin-right:90px;background-color:rgba(255,255,255,0);width:calc(100% - 100px)}:host>>>.ol-attribution.ol-logo-only{height:inherit}:host>>>.ol-attribution.ol-collapsed{background:0 0}:host>>>.ol-attribution.ol-collapsed button{-webkit-transform:none;transform:none}:host>>>.ol-attribution button{-webkit-transform:rotate(180deg);transform:rotate(180deg);background-color:#fff;cursor:pointer;outline:0}:host>>>.ol-scale-line-inner{color:#000;border-color:#000}:host>>>.ol-scale-line{background-color:rgba(255,255,255,0);bottom:4px;-webkit-transform:translate(-50%);transform:translate(-50%);left:50%}:host>>>canvas{display:block}"]
                }] }
    ];
    /** @nocollapse */
    MapBrowserComponent.ctorParameters = function () { return [
        { type: ActivityService }
    ]; };
    MapBrowserComponent.propDecorators = {
        map: [{ type: Input }],
        view: [{ type: Input }]
    };
    return MapBrowserComponent;
}());
export { MapBrowserComponent };
if (false) {
    /**
     * @type {?}
     * @private
     */
    MapBrowserComponent.prototype.activityId;
    /**
     * @type {?}
     * @private
     */
    MapBrowserComponent.prototype.status$$;
    /** @type {?} */
    MapBrowserComponent.prototype.map;
    /**
     * @type {?}
     * @private
     */
    MapBrowserComponent.prototype._view;
    /** @type {?} */
    MapBrowserComponent.prototype.id;
    /**
     * @type {?}
     * @private
     */
    MapBrowserComponent.prototype.activityService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLWJyb3dzZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL21hcC9tYXAtYnJvd3Nlci9tYXAtYnJvd3Nlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUlOLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDNUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUU3QyxPQUFPLEVBQUUsTUFBTSxFQUFrQixNQUFNLFdBQVcsQ0FBQztBQUVuRDtJQXdCRSw2QkFBb0IsZUFBZ0M7UUFBaEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBRjdDLE9BQUUsR0FBRyxvQkFBa0IsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUksQ0FBQztJQUVFLENBQUM7SUFaeEQsc0JBQ0kscUNBQUk7Ozs7UUFEUixjQUM2QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDOzs7OztRQUNqRCxVQUFTLEtBQXFCO1lBQzVCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ25CLElBQUksSUFBSSxDQUFDLEdBQUcsS0FBSyxTQUFTLEVBQUU7Z0JBQzFCLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzVCO1FBQ0gsQ0FBQzs7O09BTmdEOzs7O0lBYWpELHNDQUFROzs7SUFBUjtRQUFBLGlCQUlDO1FBSEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTOzs7O1FBQUMsVUFBQSxNQUFNO1lBQy9DLE9BQUEsS0FBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQztRQUEvQixDQUErQixFQUNoQyxDQUFDO0lBQ0osQ0FBQzs7OztJQUVELDZDQUFlOzs7SUFBZjtRQUNFLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM5QixDQUFDOzs7O0lBRUQseUNBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDOUIsQ0FBQzs7Ozs7O0lBRU8sZ0RBQWtCOzs7OztJQUExQixVQUEyQixNQUFxQjtRQUM5QyxJQUFJLE1BQU0sS0FBSyxhQUFhLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssU0FBUyxFQUFFO1lBQ3JFLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNuRDthQUFNLElBQUksTUFBTSxLQUFLLGFBQWEsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxTQUFTLEVBQUU7WUFDekUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ2pELElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1NBQzdCO0lBQ0gsQ0FBQzs7Z0JBakRGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixxR0FBMkM7O2lCQUU1Qzs7OztnQkFSUSxlQUFlOzs7c0JBY3JCLEtBQUs7dUJBRUwsS0FBSzs7SUFzQ1IsMEJBQUM7Q0FBQSxBQWxERCxJQWtEQztTQTdDWSxtQkFBbUI7Ozs7OztJQUU5Qix5Q0FBMkI7Ozs7O0lBQzNCLHVDQUErQjs7SUFFL0Isa0NBQXFCOzs7OztJQVVyQixvQ0FBOEI7O0lBRTlCLGlDQUFxRDs7Ozs7SUFFekMsOENBQXdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgT25Jbml0LFxyXG4gIEFmdGVyVmlld0luaXQsXHJcbiAgT25EZXN0cm95XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgU3ViamVjdFN0YXR1cyB9IGZyb20gJ0BpZ28yL3V0aWxzJztcclxuaW1wb3J0IHsgQWN0aXZpdHlTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBJZ29NYXAsIE1hcFZpZXdPcHRpb25zIH0gZnJvbSAnLi4vc2hhcmVkJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLW1hcC1icm93c2VyJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vbWFwLWJyb3dzZXIuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL21hcC1icm93c2VyLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIE1hcEJyb3dzZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XHJcblxyXG4gIHByaXZhdGUgYWN0aXZpdHlJZDogc3RyaW5nO1xyXG4gIHByaXZhdGUgc3RhdHVzJCQ6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgQElucHV0KCkgbWFwOiBJZ29NYXA7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IHZpZXcoKTogTWFwVmlld09wdGlvbnMgeyByZXR1cm4gdGhpcy5fdmlldzsgfVxyXG4gIHNldCB2aWV3KHZhbHVlOiBNYXBWaWV3T3B0aW9ucykge1xyXG4gICAgdGhpcy5fdmlldyA9IHZhbHVlO1xyXG4gICAgaWYgKHRoaXMubWFwICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5tYXAudXBkYXRlVmlldyh2YWx1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHByaXZhdGUgX3ZpZXc6IE1hcFZpZXdPcHRpb25zO1xyXG5cclxuICBwdWJsaWMgaWQgPSBgaWdvLW1hcC10YXJnZXQtJHtuZXcgRGF0ZSgpLmdldFRpbWUoKX1gO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFjdGl2aXR5U2VydmljZTogQWN0aXZpdHlTZXJ2aWNlKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuc3RhdHVzJCQgPSB0aGlzLm1hcC5zdGF0dXMkLnN1YnNjcmliZShzdGF0dXMgPT5cclxuICAgICAgdGhpcy5oYW5kbGVTdGF0dXNDaGFuZ2Uoc3RhdHVzKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgIHRoaXMubWFwLnNldFRhcmdldCh0aGlzLmlkKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5tYXAuc2V0VGFyZ2V0KHVuZGVmaW5lZCk7XHJcbiAgICB0aGlzLmFjdGl2aXR5U2VydmljZS51bnJlZ2lzdGVyKHRoaXMuYWN0aXZpdHlJZCk7XHJcbiAgICB0aGlzLnN0YXR1cyQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhhbmRsZVN0YXR1c0NoYW5nZShzdGF0dXM6IFN1YmplY3RTdGF0dXMpIHtcclxuICAgIGlmIChzdGF0dXMgPT09IFN1YmplY3RTdGF0dXMuV29ya2luZyAmJiB0aGlzLmFjdGl2aXR5SWQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLmFjdGl2aXR5SWQgPSB0aGlzLmFjdGl2aXR5U2VydmljZS5yZWdpc3RlcigpO1xyXG4gICAgfSBlbHNlIGlmIChzdGF0dXMgPT09IFN1YmplY3RTdGF0dXMuRG9uZSAmJiB0aGlzLmFjdGl2aXR5SWQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLmFjdGl2aXR5U2VydmljZS51bnJlZ2lzdGVyKHRoaXMuYWN0aXZpdHlJZCk7XHJcbiAgICAgIHRoaXMuYWN0aXZpdHlJZCA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19