/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { SubjectStatus } from '@igo2/utils';
import { ActivityService } from '@igo2/core';
import { IgoMap } from '../shared';
export class MapBrowserComponent {
    /**
     * @param {?} activityService
     */
    constructor(activityService) {
        this.activityService = activityService;
        this.id = `igo-map-target-${new Date().getTime()}`;
    }
    /**
     * @return {?}
     */
    get view() { return this._view; }
    /**
     * @param {?} value
     * @return {?}
     */
    set view(value) {
        this._view = value;
        if (this.map !== undefined) {
            this.map.updateView(value);
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.status$$ = this.map.status$.subscribe((/**
         * @param {?} status
         * @return {?}
         */
        status => this.handleStatusChange(status)));
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.map.setTarget(this.id);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.map.setTarget(undefined);
        this.activityService.unregister(this.activityId);
        this.status$$.unsubscribe();
    }
    /**
     * @private
     * @param {?} status
     * @return {?}
     */
    handleStatusChange(status) {
        if (status === SubjectStatus.Working && this.activityId === undefined) {
            this.activityId = this.activityService.register();
        }
        else if (status === SubjectStatus.Done && this.activityId !== undefined) {
            this.activityService.unregister(this.activityId);
            this.activityId = undefined;
        }
    }
}
MapBrowserComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-map-browser',
                template: "<div [id]=\"id\" class=\"igo-map-browser-target\"></div>\r\n<ng-content></ng-content>\r\n",
                styles: [":host{position:relative;display:block}.igo-map-browser-target,:host{width:100%;height:100%}:host>>>igo-zoom-button{position:absolute;bottom:5px;right:5px}:host>>>igo-geolocate-button{position:absolute;bottom:95px;right:5px}:host>>>igo-rotation-button{position:absolute;top:calc(40px + 5px + 5px);right:5px}:host>>>igo-user-button{position:absolute;bottom:5px;right:calc(5px + 50px)}:host>>>igo-baselayers-switcher{position:absolute;bottom:5px;left:5px}:host.igo-attribution-offset>>>.ol-attribution{left:90px;width:calc(100% - 200px)}@media only screen and (max-width:450px),only screen and (max-height:450px){:host>>>igo-zoom-button{display:none}:host>>>igo-geolocate-button{bottom:5px}:host>>>igo-rotation-button{top:calc(40px + 5px + 5px)}:host>>>igo-user-button{right:calc(5px + 90px)}:host.igo-attribution-offset>>>.ol-attribution{left:50px}}:host>>>.ol-attribution{left:5px;bottom:5px;text-align:left;padding:0;margin-right:90px;background-color:rgba(255,255,255,0);width:calc(100% - 100px)}:host>>>.ol-attribution.ol-logo-only{height:inherit}:host>>>.ol-attribution.ol-collapsed{background:0 0}:host>>>.ol-attribution.ol-collapsed button{-webkit-transform:none;transform:none}:host>>>.ol-attribution button{-webkit-transform:rotate(180deg);transform:rotate(180deg);background-color:#fff;cursor:pointer}:host>>>.ol-scale-line-inner{color:#000;border-color:#000}:host>>>.ol-scale-line{background-color:rgba(255,255,255,0);bottom:4px;-webkit-transform:translate(-50%);transform:translate(-50%);left:50%}:host>>>canvas{display:block}"]
            }] }
];
/** @nocollapse */
MapBrowserComponent.ctorParameters = () => [
    { type: ActivityService }
];
MapBrowserComponent.propDecorators = {
    map: [{ type: Input }],
    view: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLWJyb3dzZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL21hcC9tYXAtYnJvd3Nlci9tYXAtYnJvd3Nlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUlOLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDNUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUU3QyxPQUFPLEVBQUUsTUFBTSxFQUFrQixNQUFNLFdBQVcsQ0FBQztBQU9uRCxNQUFNLE9BQU8sbUJBQW1COzs7O0lBbUI5QixZQUFvQixlQUFnQztRQUFoQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFGN0MsT0FBRSxHQUFHLGtCQUFrQixJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUM7SUFFRSxDQUFDOzs7O0lBWnhELElBQ0ksSUFBSSxLQUFxQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDOzs7OztJQUNqRCxJQUFJLElBQUksQ0FBQyxLQUFxQjtRQUM1QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLElBQUksQ0FBQyxHQUFHLEtBQUssU0FBUyxFQUFFO1lBQzFCLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzVCO0lBQ0gsQ0FBQzs7OztJQU9ELFFBQVE7UUFDTixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVM7Ozs7UUFBQyxNQUFNLENBQUMsRUFBRSxDQUNsRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLEVBQ2hDLENBQUM7SUFDSixDQUFDOzs7O0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM5QixDQUFDOzs7O0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzlCLENBQUM7Ozs7OztJQUVPLGtCQUFrQixDQUFDLE1BQXFCO1FBQzlDLElBQUksTUFBTSxLQUFLLGFBQWEsQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxTQUFTLEVBQUU7WUFDckUsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ25EO2FBQU0sSUFBSSxNQUFNLEtBQUssYUFBYSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLFNBQVMsRUFBRTtZQUN6RSxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDakQsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7U0FDN0I7SUFDSCxDQUFDOzs7WUFqREYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLHFHQUEyQzs7YUFFNUM7Ozs7WUFSUSxlQUFlOzs7a0JBY3JCLEtBQUs7bUJBRUwsS0FBSzs7Ozs7OztJQUxOLHlDQUEyQjs7Ozs7SUFDM0IsdUNBQStCOztJQUUvQixrQ0FBcUI7Ozs7O0lBVXJCLG9DQUE4Qjs7SUFFOUIsaUNBQXFEOzs7OztJQUV6Qyw4Q0FBd0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBPbkluaXQsXHJcbiAgQWZ0ZXJWaWV3SW5pdCxcclxuICBPbkRlc3Ryb3lcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBTdWJqZWN0U3RhdHVzIH0gZnJvbSAnQGlnbzIvdXRpbHMnO1xyXG5pbXBvcnQgeyBBY3Rpdml0eVNlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuXHJcbmltcG9ydCB7IElnb01hcCwgTWFwVmlld09wdGlvbnMgfSBmcm9tICcuLi9zaGFyZWQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tbWFwLWJyb3dzZXInLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9tYXAtYnJvd3Nlci5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vbWFwLWJyb3dzZXIuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWFwQnJvd3NlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcclxuXHJcbiAgcHJpdmF0ZSBhY3Rpdml0eUlkOiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBzdGF0dXMkJDogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBASW5wdXQoKSBtYXA6IElnb01hcDtcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgdmlldygpOiBNYXBWaWV3T3B0aW9ucyB7IHJldHVybiB0aGlzLl92aWV3OyB9XHJcbiAgc2V0IHZpZXcodmFsdWU6IE1hcFZpZXdPcHRpb25zKSB7XHJcbiAgICB0aGlzLl92aWV3ID0gdmFsdWU7XHJcbiAgICBpZiAodGhpcy5tYXAgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLm1hcC51cGRhdGVWaWV3KHZhbHVlKTtcclxuICAgIH1cclxuICB9XHJcbiAgcHJpdmF0ZSBfdmlldzogTWFwVmlld09wdGlvbnM7XHJcblxyXG4gIHB1YmxpYyBpZCA9IGBpZ28tbWFwLXRhcmdldC0ke25ldyBEYXRlKCkuZ2V0VGltZSgpfWA7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYWN0aXZpdHlTZXJ2aWNlOiBBY3Rpdml0eVNlcnZpY2UpIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5zdGF0dXMkJCA9IHRoaXMubWFwLnN0YXR1cyQuc3Vic2NyaWJlKHN0YXR1cyA9PlxyXG4gICAgICB0aGlzLmhhbmRsZVN0YXR1c0NoYW5nZShzdGF0dXMpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgdGhpcy5tYXAuc2V0VGFyZ2V0KHRoaXMuaWQpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLm1hcC5zZXRUYXJnZXQodW5kZWZpbmVkKTtcclxuICAgIHRoaXMuYWN0aXZpdHlTZXJ2aWNlLnVucmVnaXN0ZXIodGhpcy5hY3Rpdml0eUlkKTtcclxuICAgIHRoaXMuc3RhdHVzJCQudW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGFuZGxlU3RhdHVzQ2hhbmdlKHN0YXR1czogU3ViamVjdFN0YXR1cykge1xyXG4gICAgaWYgKHN0YXR1cyA9PT0gU3ViamVjdFN0YXR1cy5Xb3JraW5nICYmIHRoaXMuYWN0aXZpdHlJZCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuYWN0aXZpdHlJZCA9IHRoaXMuYWN0aXZpdHlTZXJ2aWNlLnJlZ2lzdGVyKCk7XHJcbiAgICB9IGVsc2UgaWYgKHN0YXR1cyA9PT0gU3ViamVjdFN0YXR1cy5Eb25lICYmIHRoaXMuYWN0aXZpdHlJZCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuYWN0aXZpdHlTZXJ2aWNlLnVucmVnaXN0ZXIodGhpcy5hY3Rpdml0eUlkKTtcclxuICAgICAgdGhpcy5hY3Rpdml0eUlkID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=