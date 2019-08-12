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
var ToastComponent = /** @class */ (function () {
    function ToastComponent() {
        this.format = new olFormatGeoJSON();
        this.opened = new EventEmitter();
    }
    Object.defineProperty(ToastComponent.prototype, "expanded", {
        get: /**
         * @return {?}
         */
        function () {
            return this._expanded;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.state = value ? 'expanded' : 'collapsed';
            this._expanded = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToastComponent.prototype, "map", {
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
    Object.defineProperty(ToastComponent.prototype, "feature", {
        get: /**
         * @return {?}
         */
        function () {
            return this._feature;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._feature = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToastComponent.prototype, "title", {
        /**
         * @internal
         */
        get: /**
         * \@internal
         * @return {?}
         */
        function () { return getEntityTitle(this.feature); },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ToastComponent.prototype.toggle = /**
     * @return {?}
     */
    function () {
        this.expanded = !this.expanded;
        this.opened.emit(this.expanded);
    };
    /**
     * @return {?}
     */
    ToastComponent.prototype.zoomToFeatureExtent = /**
     * @return {?}
     */
    function () {
        if (this.feature.geometry) {
            /** @type {?} */
            var olFeature = this.format.readFeature(this.feature, {
                dataProjection: this.feature.projection,
                featureProjection: this.map.projection
            });
            moveToOlFeatures(this.map, [olFeature], FeatureMotion.Zoom);
        }
    };
    /**
     * @param {?} action
     * @return {?}
     */
    ToastComponent.prototype.swipe = /**
     * @param {?} action
     * @return {?}
     */
    function (action) {
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
    };
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
    ToastComponent.ctorParameters = function () { return []; };
    ToastComponent.propDecorators = {
        expanded: [{ type: Input }],
        map: [{ type: Input }],
        feature: [{ type: Input }],
        opened: [{ type: Output }]
    };
    return ToastComponent;
}());
export { ToastComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL3RvYXN0L3RvYXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV2RSxPQUFPLEVBQWlCLGNBQWMsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUM3RCxPQUFPLGVBQWUsTUFBTSxtQkFBbUIsQ0FBQztBQUVoRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDaEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDbkUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRTNDO0lBaURFO1FBdkNRLFdBQU0sR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDO1FBOEI3QixXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztJQVNoQyxDQUFDO0lBckNoQixzQkFDSSxvQ0FBUTs7OztRQURaO1lBRUUsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ3hCLENBQUM7Ozs7O1FBQ0QsVUFBYSxLQUFjO1lBQ3pCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQztZQUM5QyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN6QixDQUFDOzs7T0FKQTtJQU9ELHNCQUNJLCtCQUFHOzs7O1FBRFA7WUFFRSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDbkIsQ0FBQzs7Ozs7UUFDRCxVQUFRLEtBQWE7WUFDbkIsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7UUFDcEIsQ0FBQzs7O09BSEE7SUFNRCxzQkFDSSxtQ0FBTzs7OztRQURYO1lBRUUsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3ZCLENBQUM7Ozs7O1FBQ0QsVUFBWSxLQUFjO1lBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLENBQUM7OztPQUhBO0lBYUQsc0JBQUksaUNBQUs7UUFIVDs7V0FFRzs7Ozs7UUFDSCxjQUFzQixPQUFPLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTs7OztJQUk1RCwrQkFBTTs7O0lBQU47UUFDRSxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUMvQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbEMsQ0FBQzs7OztJQUVELDRDQUFtQjs7O0lBQW5CO1FBQ0UsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRTs7Z0JBQ25CLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUN0RCxjQUFjLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVO2dCQUN2QyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVU7YUFDdkMsQ0FBQztZQUNGLGdCQUFnQixDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDN0Q7SUFDSCxDQUFDOzs7OztJQUVELDhCQUFLOzs7O0lBQUwsVUFBTSxNQUFjO1FBQ2xCLElBQUksTUFBTSxLQUFLLGNBQWMsQ0FBQyxZQUFZLENBQUMsRUFBRSxFQUFFO1lBQzdDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNsQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDZjtTQUNGO2FBQU0sSUFBSSxNQUFNLEtBQUssY0FBYyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUU7WUFDdEQsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNqQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDZjtTQUNGO0lBQ0gsQ0FBQztJQXRFTSwyQkFBWSxHQUFHO1FBQ3BCLEVBQUUsRUFBRSxTQUFTO1FBQ2IsSUFBSSxFQUFFLFdBQVc7S0FDbEIsQ0FBQzs7Z0JBVEgsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxXQUFXO29CQUNyQixzeUJBQXFDOztpQkFFdEM7Ozs7OzJCQVFFLEtBQUs7c0JBVUwsS0FBSzswQkFTTCxLQUFLO3lCQVNMLE1BQU07O0lBcUNULHFCQUFDO0NBQUEsQUE3RUQsSUE2RUM7U0F4RVksY0FBYzs7O0lBQ3pCLDRCQUdFOzs7OztJQUNGLGdDQUF1Qzs7Ozs7SUFVdkMsbUNBQTJCOzs7OztJQVMzQiw4QkFBcUI7Ozs7O0lBU3JCLGtDQUEwQjs7SUFFMUIsZ0NBQStDOztJQUUvQywrQkFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgRmxleGlibGVTdGF0ZSwgZ2V0RW50aXR5VGl0bGUgfSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5pbXBvcnQgb2xGb3JtYXRHZW9KU09OIGZyb20gJ29sL2Zvcm1hdC9HZW9KU09OJztcclxuaW1wb3J0IHsgRmVhdHVyZSB9IGZyb20gJy4uL2ZlYXR1cmUvc2hhcmVkL2ZlYXR1cmUuaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IEZlYXR1cmVNb3Rpb24gfSBmcm9tICcuLi9mZWF0dXJlL3NoYXJlZC9mZWF0dXJlLmVudW1zJztcclxuaW1wb3J0IHsgbW92ZVRvT2xGZWF0dXJlcyB9IGZyb20gJy4uL2ZlYXR1cmUvc2hhcmVkL2ZlYXR1cmUudXRpbHMnO1xyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICcuLi9tYXAvc2hhcmVkL21hcCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby10b2FzdCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3RvYXN0LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi90b2FzdC5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUb2FzdENvbXBvbmVudCB7XHJcbiAgc3RhdGljIFNXSVBFX0FDVElPTiA9IHtcclxuICAgIFVQOiAnc3dpcGV1cCcsXHJcbiAgICBET1dOOiAnc3dpcGVkb3duJ1xyXG4gIH07XHJcbiAgcHJpdmF0ZSBmb3JtYXQgPSBuZXcgb2xGb3JtYXRHZW9KU09OKCk7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGV4cGFuZGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2V4cGFuZGVkO1xyXG4gIH1cclxuICBzZXQgZXhwYW5kZWQodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuc3RhdGUgPSB2YWx1ZSA/ICdleHBhbmRlZCcgOiAnY29sbGFwc2VkJztcclxuICAgIHRoaXMuX2V4cGFuZGVkID0gdmFsdWU7XHJcbiAgfVxyXG4gIHByaXZhdGUgX2V4cGFuZGVkOiBib29sZWFuO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBtYXAoKTogSWdvTWFwIHtcclxuICAgIHJldHVybiB0aGlzLl9tYXA7XHJcbiAgfVxyXG4gIHNldCBtYXAodmFsdWU6IElnb01hcCkge1xyXG4gICAgdGhpcy5fbWFwID0gdmFsdWU7XHJcbiAgfVxyXG4gIHByaXZhdGUgX21hcDogSWdvTWFwO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBmZWF0dXJlKCk6IEZlYXR1cmUge1xyXG4gICAgcmV0dXJuIHRoaXMuX2ZlYXR1cmU7XHJcbiAgfVxyXG4gIHNldCBmZWF0dXJlKHZhbHVlOiBGZWF0dXJlKSB7XHJcbiAgICB0aGlzLl9mZWF0dXJlID0gdmFsdWU7XHJcbiAgfVxyXG4gIHByaXZhdGUgX2ZlYXR1cmU6IEZlYXR1cmU7XHJcblxyXG4gIEBPdXRwdXQoKSBvcGVuZWQgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcblxyXG4gIHB1YmxpYyBzdGF0ZTogRmxleGlibGVTdGF0ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0IHRpdGxlKCk6IHN0cmluZyB7IHJldHVybiBnZXRFbnRpdHlUaXRsZSh0aGlzLmZlYXR1cmUpOyB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgdG9nZ2xlKCkge1xyXG4gICAgdGhpcy5leHBhbmRlZCA9ICF0aGlzLmV4cGFuZGVkO1xyXG4gICAgdGhpcy5vcGVuZWQuZW1pdCh0aGlzLmV4cGFuZGVkKTtcclxuICB9XHJcblxyXG4gIHpvb21Ub0ZlYXR1cmVFeHRlbnQoKSB7XHJcbiAgICBpZiAodGhpcy5mZWF0dXJlLmdlb21ldHJ5KSB7XHJcbiAgICAgIGNvbnN0IG9sRmVhdHVyZSA9IHRoaXMuZm9ybWF0LnJlYWRGZWF0dXJlKHRoaXMuZmVhdHVyZSwge1xyXG4gICAgICAgIGRhdGFQcm9qZWN0aW9uOiB0aGlzLmZlYXR1cmUucHJvamVjdGlvbixcclxuICAgICAgICBmZWF0dXJlUHJvamVjdGlvbjogdGhpcy5tYXAucHJvamVjdGlvblxyXG4gICAgICB9KTtcclxuICAgICAgbW92ZVRvT2xGZWF0dXJlcyh0aGlzLm1hcCwgW29sRmVhdHVyZV0sIEZlYXR1cmVNb3Rpb24uWm9vbSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzd2lwZShhY3Rpb246IHN0cmluZykge1xyXG4gICAgaWYgKGFjdGlvbiA9PT0gVG9hc3RDb21wb25lbnQuU1dJUEVfQUNUSU9OLlVQKSB7XHJcbiAgICAgIGlmICghdGhpcy5leHBhbmRlZCkge1xyXG4gICAgICAgIHRoaXMudG9nZ2xlKCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoYWN0aW9uID09PSBUb2FzdENvbXBvbmVudC5TV0lQRV9BQ1RJT04uRE9XTikge1xyXG4gICAgICBpZiAodGhpcy5leHBhbmRlZCkge1xyXG4gICAgICAgIHRoaXMudG9nZ2xlKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19