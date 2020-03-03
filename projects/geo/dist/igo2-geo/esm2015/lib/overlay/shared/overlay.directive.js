/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Self } from '@angular/core';
import olFormatGeoJSON from 'ol/format/GeoJSON';
import { MapBrowserComponent } from '../../map/map-browser/map-browser.component';
import { OverlayService } from '../shared/overlay.service';
export class OverlayDirective {
    /**
     * @param {?} component
     * @param {?} overlayService
     */
    constructor(component, overlayService) {
        this.component = component;
        this.overlayService = overlayService;
        this.format = new olFormatGeoJSON();
    }
    /**
     * @return {?}
     */
    get map() {
        return this.component.map;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.features$$ = this.overlayService.features$.subscribe((/**
         * @param {?} res
         * @return {?}
         */
        res => this.handleFeatures(res[0], res[1])));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.features$$.unsubscribe();
    }
    /**
     * @private
     * @param {?} features
     * @param {?} action
     * @return {?}
     */
    handleFeatures(features, action) { }
}
OverlayDirective.decorators = [
    { type: Directive, args: [{
                selector: '[igoOverlay]'
            },] }
];
/** @nocollapse */
OverlayDirective.ctorParameters = () => [
    { type: MapBrowserComponent, decorators: [{ type: Self }] },
    { type: OverlayService }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvb3ZlcmxheS9zaGFyZWQvb3ZlcmxheS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUduRSxPQUFPLGVBQWUsTUFBTSxtQkFBbUIsQ0FBQztBQUtoRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUdsRixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFNM0QsTUFBTSxPQUFPLGdCQUFnQjs7Ozs7SUFRM0IsWUFDa0IsU0FBOEIsRUFDdEMsY0FBOEI7UUFEdEIsY0FBUyxHQUFULFNBQVMsQ0FBcUI7UUFDdEMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBUmhDLFdBQU0sR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDO0lBU3BDLENBQUM7Ozs7SUFQSixJQUFJLEdBQUc7UUFDTCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDO0lBQzVCLENBQUM7Ozs7SUFPRCxRQUFRO1FBQ04sSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxTQUFTOzs7O1FBQUMsR0FBRyxDQUFDLEVBQUUsQ0FDOUQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ3BDLENBQUM7SUFDSixDQUFDOzs7O0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDaEMsQ0FBQzs7Ozs7OztJQUVPLGNBQWMsQ0FBQyxRQUFtQixFQUFFLE1BQXFCLElBQUcsQ0FBQzs7O1lBMUJ0RSxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGNBQWM7YUFDekI7Ozs7WUFSUSxtQkFBbUIsdUJBa0J2QixJQUFJO1lBZkEsY0FBYzs7Ozs7OztJQU9yQixzQ0FBaUM7Ozs7O0lBQ2pDLGtDQUF1Qzs7Ozs7SUFPckMscUNBQThDOzs7OztJQUM5QywwQ0FBc0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIFNlbGYsIE9uSW5pdCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IG9sRm9ybWF0R2VvSlNPTiBmcm9tICdvbC9mb3JtYXQvR2VvSlNPTic7XHJcbmltcG9ydCAqIGFzIG9sZXh0ZW50IGZyb20gJ29sL2V4dGVudCc7XHJcbmltcG9ydCAqIGFzIG9scHJvaiBmcm9tICdvbC9wcm9qJztcclxuXHJcbmltcG9ydCB7IElnb01hcCB9IGZyb20gJy4uLy4uL21hcC9zaGFyZWQvbWFwJztcclxuaW1wb3J0IHsgTWFwQnJvd3NlckNvbXBvbmVudCB9IGZyb20gJy4uLy4uL21hcC9tYXAtYnJvd3Nlci9tYXAtYnJvd3Nlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBGZWF0dXJlIH0gZnJvbSAnLi4vLi4vZmVhdHVyZS9zaGFyZWQvZmVhdHVyZS5pbnRlcmZhY2VzJztcclxuXHJcbmltcG9ydCB7IE92ZXJsYXlTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL292ZXJsYXkuc2VydmljZSc7XHJcbmltcG9ydCB7IE92ZXJsYXlBY3Rpb24gfSBmcm9tICcuLi9zaGFyZWQvb3ZlcmxheS5lbnVtJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW2lnb092ZXJsYXldJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgT3ZlcmxheURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICBwcml2YXRlIGZlYXR1cmVzJCQ6IFN1YnNjcmlwdGlvbjtcclxuICBwcml2YXRlIGZvcm1hdCA9IG5ldyBvbEZvcm1hdEdlb0pTT04oKTtcclxuXHJcbiAgZ2V0IG1hcCgpOiBJZ29NYXAge1xyXG4gICAgcmV0dXJuIHRoaXMuY29tcG9uZW50Lm1hcDtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgQFNlbGYoKSBwcml2YXRlIGNvbXBvbmVudDogTWFwQnJvd3NlckNvbXBvbmVudCxcclxuICAgIHByaXZhdGUgb3ZlcmxheVNlcnZpY2U6IE92ZXJsYXlTZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuZmVhdHVyZXMkJCA9IHRoaXMub3ZlcmxheVNlcnZpY2UuZmVhdHVyZXMkLnN1YnNjcmliZShyZXMgPT5cclxuICAgICAgdGhpcy5oYW5kbGVGZWF0dXJlcyhyZXNbMF0sIHJlc1sxXSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuZmVhdHVyZXMkJC51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBoYW5kbGVGZWF0dXJlcyhmZWF0dXJlczogRmVhdHVyZVtdLCBhY3Rpb246IE92ZXJsYXlBY3Rpb24pIHt9XHJcbn1cclxuIl19