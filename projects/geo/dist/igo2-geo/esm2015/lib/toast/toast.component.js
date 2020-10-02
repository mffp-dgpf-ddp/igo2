/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { getEntityTitle } from '@igo2/common';
import olFormatGeoJSON from 'ol/format/GeoJSON';
import { FeatureMotion } from '../feature/shared/feature.enums';
import { moveToOlFeatures } from '../feature/shared/feature.utils';
import { IgoMap } from '../map/shared/map';
export class ToastComponent {
    constructor() {
        this.format = new olFormatGeoJSON();
        this.opened = new EventEmitter();
    }
    /**
     * @return {?}
     */
    get expanded() {
        return this._expanded;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set expanded(value) {
        this.state = value ? 'expanded' : 'collapsed';
        this._expanded = value;
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
    get feature() {
        return this._feature;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set feature(value) {
        this._feature = value;
    }
    /**
     * \@internal
     * @return {?}
     */
    get title() { return getEntityTitle(this.feature); }
    /**
     * @return {?}
     */
    toggle() {
        this.expanded = !this.expanded;
        this.opened.emit(this.expanded);
    }
    /**
     * @return {?}
     */
    zoomToFeatureExtent() {
        if (this.feature.geometry) {
            /** @type {?} */
            const olFeature = this.format.readFeature(this.feature, {
                dataProjection: this.feature.projection,
                featureProjection: this.map.projection
            });
            moveToOlFeatures(this.map, [olFeature], FeatureMotion.Zoom);
        }
    }
    /**
     * @param {?} action
     * @return {?}
     */
    swipe(action) {
        if (action === ToastComponent.SWIPE_ACTION.UP) {
            if (!this.expanded) {
                this.toggle();
            }
        }
        else if (action === ToastComponent.SWIPE_ACTION.DOWN) {
            if (this.expanded) {
                this.toggle();
            }
        }
    }
}
ToastComponent.SWIPE_ACTION = {
    UP: 'swipeup',
    DOWN: 'swipedown'
};
ToastComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-toast',
                template: "<igo-flexible #flex\r\n  collapsedMobile=\"51px\"\r\n  expandedMobile=\"300px\"\r\n  [state]=\"state\"\r\n  (swipeup)=\"swipe($event.type)\"\r\n  (swipedown)=\"swipe($event.type)\">\r\n\r\n  <igo-panel [title]=\"title\">\r\n    <button\r\n      mat-icon-button\r\n      panelLeftButton\r\n      (click)=\"toggle()\">\r\n      <mat-icon [svgIcon]=\"['collapsed', 'initial'].indexOf(flex.state) >= 0 ? 'arrow_upward' : 'arrow_downward'\"></mat-icon>\r\n    </button>\r\n\r\n    <button mat-icon-button panelRightButton class=\"igo-icon-button\" (click)=\"zoomToFeatureExtent()\" *ngIf=\"feature.geometry\">\r\n      <mat-icon svgIcon=\"zoom-in\"></mat-icon>\r\n    </button>\r\n\r\n    <igo-feature-details [feature]=\"feature\"></igo-feature-details>\r\n  </igo-panel>\r\n\r\n</igo-flexible>\r\n",
                styles: [":host{position:absolute;bottom:0;width:100%;max-height:calc(100% - 50px);background-color:#fff}igo-feature-details ::ng-deep table{width:100%}"]
            }] }
];
/** @nocollapse */
ToastComponent.ctorParameters = () => [];
ToastComponent.propDecorators = {
    expanded: [{ type: Input }],
    map: [{ type: Input }],
    feature: [{ type: Input }],
    opened: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    ToastComponent.SWIPE_ACTION;
    /**
     * @type {?}
     * @private
     */
    ToastComponent.prototype.format;
    /**
     * @type {?}
     * @private
     */
    ToastComponent.prototype._expanded;
    /**
     * @type {?}
     * @private
     */
    ToastComponent.prototype._map;
    /**
     * @type {?}
     * @private
     */
    ToastComponent.prototype._feature;
    /** @type {?} */
    ToastComponent.prototype.opened;
    /** @type {?} */
    ToastComponent.prototype.state;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL3RvYXN0L3RvYXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV2RSxPQUFPLEVBQWlCLGNBQWMsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUM3RCxPQUFPLGVBQWUsTUFBTSxtQkFBbUIsQ0FBQztBQUVoRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDaEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDbkUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBTzNDLE1BQU0sT0FBTyxjQUFjO0lBNEN6QjtRQXZDUSxXQUFNLEdBQUcsSUFBSSxlQUFlLEVBQUUsQ0FBQztRQThCN0IsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7SUFTaEMsQ0FBQzs7OztJQXJDaEIsSUFDSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7Ozs7O0lBQ0QsSUFBSSxRQUFRLENBQUMsS0FBYztRQUN6QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUM7UUFDOUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDekIsQ0FBQzs7OztJQUdELElBQ0ksR0FBRztRQUNMLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztJQUNuQixDQUFDOzs7OztJQUNELElBQUksR0FBRyxDQUFDLEtBQWE7UUFDbkIsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7SUFDcEIsQ0FBQzs7OztJQUdELElBQ0ksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDOzs7OztJQUNELElBQUksT0FBTyxDQUFDLEtBQWM7UUFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDeEIsQ0FBQzs7Ozs7SUFVRCxJQUFJLEtBQUssS0FBYSxPQUFPLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7O0lBSTVELE1BQU07UUFDSixJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUMvQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbEMsQ0FBQzs7OztJQUVELG1CQUFtQjtRQUNqQixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFOztrQkFDbkIsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ3RELGNBQWMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVU7Z0JBQ3ZDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVTthQUN2QyxDQUFDO1lBQ0YsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM3RDtJQUNILENBQUM7Ozs7O0lBRUQsS0FBSyxDQUFDLE1BQWM7UUFDbEIsSUFBSSxNQUFNLEtBQUssY0FBYyxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUU7WUFDN0MsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2xCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUNmO1NBQ0Y7YUFBTSxJQUFJLE1BQU0sS0FBSyxjQUFjLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRTtZQUN0RCxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2pCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUNmO1NBQ0Y7SUFDSCxDQUFDOztBQXRFTSwyQkFBWSxHQUFHO0lBQ3BCLEVBQUUsRUFBRSxTQUFTO0lBQ2IsSUFBSSxFQUFFLFdBQVc7Q0FDbEIsQ0FBQzs7WUFUSCxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFdBQVc7Z0JBQ3JCLHN5QkFBcUM7O2FBRXRDOzs7Ozt1QkFRRSxLQUFLO2tCQVVMLEtBQUs7c0JBU0wsS0FBSztxQkFTTCxNQUFNOzs7O0lBbENQLDRCQUdFOzs7OztJQUNGLGdDQUF1Qzs7Ozs7SUFVdkMsbUNBQTJCOzs7OztJQVMzQiw4QkFBcUI7Ozs7O0lBU3JCLGtDQUEwQjs7SUFFMUIsZ0NBQStDOztJQUUvQywrQkFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgRmxleGlibGVTdGF0ZSwgZ2V0RW50aXR5VGl0bGUgfSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5pbXBvcnQgb2xGb3JtYXRHZW9KU09OIGZyb20gJ29sL2Zvcm1hdC9HZW9KU09OJztcclxuaW1wb3J0IHsgRmVhdHVyZSB9IGZyb20gJy4uL2ZlYXR1cmUvc2hhcmVkL2ZlYXR1cmUuaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IEZlYXR1cmVNb3Rpb24gfSBmcm9tICcuLi9mZWF0dXJlL3NoYXJlZC9mZWF0dXJlLmVudW1zJztcclxuaW1wb3J0IHsgbW92ZVRvT2xGZWF0dXJlcyB9IGZyb20gJy4uL2ZlYXR1cmUvc2hhcmVkL2ZlYXR1cmUudXRpbHMnO1xyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICcuLi9tYXAvc2hhcmVkL21hcCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby10b2FzdCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3RvYXN0LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi90b2FzdC5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUb2FzdENvbXBvbmVudCB7XHJcbiAgc3RhdGljIFNXSVBFX0FDVElPTiA9IHtcclxuICAgIFVQOiAnc3dpcGV1cCcsXHJcbiAgICBET1dOOiAnc3dpcGVkb3duJ1xyXG4gIH07XHJcbiAgcHJpdmF0ZSBmb3JtYXQgPSBuZXcgb2xGb3JtYXRHZW9KU09OKCk7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGV4cGFuZGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2V4cGFuZGVkO1xyXG4gIH1cclxuICBzZXQgZXhwYW5kZWQodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuc3RhdGUgPSB2YWx1ZSA/ICdleHBhbmRlZCcgOiAnY29sbGFwc2VkJztcclxuICAgIHRoaXMuX2V4cGFuZGVkID0gdmFsdWU7XHJcbiAgfVxyXG4gIHByaXZhdGUgX2V4cGFuZGVkOiBib29sZWFuO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBtYXAoKTogSWdvTWFwIHtcclxuICAgIHJldHVybiB0aGlzLl9tYXA7XHJcbiAgfVxyXG4gIHNldCBtYXAodmFsdWU6IElnb01hcCkge1xyXG4gICAgdGhpcy5fbWFwID0gdmFsdWU7XHJcbiAgfVxyXG4gIHByaXZhdGUgX21hcDogSWdvTWFwO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBmZWF0dXJlKCk6IEZlYXR1cmUge1xyXG4gICAgcmV0dXJuIHRoaXMuX2ZlYXR1cmU7XHJcbiAgfVxyXG4gIHNldCBmZWF0dXJlKHZhbHVlOiBGZWF0dXJlKSB7XHJcbiAgICB0aGlzLl9mZWF0dXJlID0gdmFsdWU7XHJcbiAgfVxyXG4gIHByaXZhdGUgX2ZlYXR1cmU6IEZlYXR1cmU7XHJcblxyXG4gIEBPdXRwdXQoKSBvcGVuZWQgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcblxyXG4gIHB1YmxpYyBzdGF0ZTogRmxleGlibGVTdGF0ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0IHRpdGxlKCk6IHN0cmluZyB7IHJldHVybiBnZXRFbnRpdHlUaXRsZSh0aGlzLmZlYXR1cmUpOyB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgdG9nZ2xlKCkge1xyXG4gICAgdGhpcy5leHBhbmRlZCA9ICF0aGlzLmV4cGFuZGVkO1xyXG4gICAgdGhpcy5vcGVuZWQuZW1pdCh0aGlzLmV4cGFuZGVkKTtcclxuICB9XHJcblxyXG4gIHpvb21Ub0ZlYXR1cmVFeHRlbnQoKSB7XHJcbiAgICBpZiAodGhpcy5mZWF0dXJlLmdlb21ldHJ5KSB7XHJcbiAgICAgIGNvbnN0IG9sRmVhdHVyZSA9IHRoaXMuZm9ybWF0LnJlYWRGZWF0dXJlKHRoaXMuZmVhdHVyZSwge1xyXG4gICAgICAgIGRhdGFQcm9qZWN0aW9uOiB0aGlzLmZlYXR1cmUucHJvamVjdGlvbixcclxuICAgICAgICBmZWF0dXJlUHJvamVjdGlvbjogdGhpcy5tYXAucHJvamVjdGlvblxyXG4gICAgICB9KTtcclxuICAgICAgbW92ZVRvT2xGZWF0dXJlcyh0aGlzLm1hcCwgW29sRmVhdHVyZV0sIEZlYXR1cmVNb3Rpb24uWm9vbSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzd2lwZShhY3Rpb246IHN0cmluZykge1xyXG4gICAgaWYgKGFjdGlvbiA9PT0gVG9hc3RDb21wb25lbnQuU1dJUEVfQUNUSU9OLlVQKSB7XHJcbiAgICAgIGlmICghdGhpcy5leHBhbmRlZCkge1xyXG4gICAgICAgIHRoaXMudG9nZ2xlKCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoYWN0aW9uID09PSBUb2FzdENvbXBvbmVudC5TV0lQRV9BQ1RJT04uRE9XTikge1xyXG4gICAgICBpZiAodGhpcy5leHBhbmRlZCkge1xyXG4gICAgICAgIHRoaXMudG9nZ2xlKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19