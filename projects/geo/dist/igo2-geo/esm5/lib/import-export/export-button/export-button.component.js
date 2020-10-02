/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Layer } from '../../layer/shared/layers/layer';
import { VectorLayer } from '../../layer';
var ExportButtonComponent = /** @class */ (function () {
    function ExportButtonComponent() {
        this._color = 'primary';
    }
    Object.defineProperty(ExportButtonComponent.prototype, "layer", {
        get: /**
         * @return {?}
         */
        function () {
            return this._layer;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._layer = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExportButtonComponent.prototype, "color", {
        get: /**
         * @return {?}
         */
        function () {
            return this._color;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._color = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExportButtonComponent.prototype, "options", {
        get: /**
         * @return {?}
         */
        function () {
            if (!this.layer) {
                return;
            }
            return this.layer.dataSource.options;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ExportButtonComponent.prototype.layerIsExportable = /**
     * @return {?}
     */
    function () {
        if ((this.layer instanceof VectorLayer && this.layer.exportable === true) ||
            (this.layer.dataSource.options.download && this.layer.dataSource.options.download.url)) {
            return true;
        }
        return false;
    };
    ExportButtonComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-export-button',
                    template: "<button\r\n  *ngIf=\"layerIsExportable()\"\r\n  mat-icon-button\r\n  tooltip-position=\"below\"\r\n  matTooltipShowDelay=\"500\"\r\n  [matTooltip]=\"'igo.geo.download.action' | translate\"\r\n  [color]=\"color\">\r\n  <!-- (click)=\"openDownload(layer)\"> -->\r\n  <mat-icon svgIcon=\"file-export\"></mat-icon>\r\n</button>\r\n\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    ExportButtonComponent.ctorParameters = function () { return []; };
    ExportButtonComponent.propDecorators = {
        layer: [{ type: Input }],
        color: [{ type: Input }]
    };
    return ExportButtonComponent;
}());
export { ExportButtonComponent };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ExportButtonComponent.prototype._layer;
    /**
     * @type {?}
     * @private
     */
    ExportButtonComponent.prototype._color;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0LWJ1dHRvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvaW1wb3J0LWV4cG9ydC9leHBvcnQtYnV0dG9uL2V4cG9ydC1idXR0b24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUxRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFFeEQsT0FBTyxFQUFnQixXQUFXLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFeEQ7SUF5QkU7UUFGUSxXQUFNLEdBQUcsU0FBUyxDQUFDO0lBRVosQ0FBQztJQWxCaEIsc0JBQ0ksd0NBQUs7Ozs7UUFEVDtZQUVFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNyQixDQUFDOzs7OztRQUNELFVBQVUsS0FBWTtZQUNwQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN0QixDQUFDOzs7T0FIQTtJQU1ELHNCQUNJLHdDQUFLOzs7O1FBRFQ7WUFFRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDckIsQ0FBQzs7Ozs7UUFDRCxVQUFVLEtBQWE7WUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDdEIsQ0FBQzs7O09BSEE7SUFRRCxzQkFBSSwwQ0FBTzs7OztRQUFYO1lBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ2YsT0FBTzthQUNSO1lBQ0QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7UUFDdkMsQ0FBQzs7O09BQUE7Ozs7SUFFRCxpREFBaUI7OztJQUFqQjtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxZQUFZLFdBQVcsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsS0FBSyxJQUFJLENBQUM7WUFDdkUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDeEYsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQzs7Z0JBeENGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsbUJBQW1CO29CQUM3Qix1VkFBNkM7b0JBRTdDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztpQkFDaEQ7Ozs7O3dCQUVFLEtBQUs7d0JBU0wsS0FBSzs7SUF5QlIsNEJBQUM7Q0FBQSxBQXpDRCxJQXlDQztTQW5DWSxxQkFBcUI7Ozs7OztJQVFoQyx1Q0FBc0I7Ozs7O0lBU3RCLHVDQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uLy4uL2xheWVyL3NoYXJlZC9sYXllcnMvbGF5ZXInO1xyXG5cclxuaW1wb3J0IHsgTGF5ZXJPcHRpb25zLCBWZWN0b3JMYXllciB9IGZyb20gJy4uLy4uL2xheWVyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLWV4cG9ydC1idXR0b24nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9leHBvcnQtYnV0dG9uLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9leHBvcnQtYnV0dG9uLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIEV4cG9ydEJ1dHRvbkNvbXBvbmVudCB7XHJcbiAgQElucHV0KClcclxuICBnZXQgbGF5ZXIoKTogTGF5ZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX2xheWVyO1xyXG4gIH1cclxuICBzZXQgbGF5ZXIodmFsdWU6IExheWVyKSB7XHJcbiAgICB0aGlzLl9sYXllciA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9sYXllcjogTGF5ZXI7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGNvbG9yKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NvbG9yO1xyXG4gIH1cclxuICBzZXQgY29sb3IodmFsdWU6IHN0cmluZykge1xyXG4gICAgdGhpcy5fY29sb3IgPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfY29sb3IgPSAncHJpbWFyeSc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgZ2V0IG9wdGlvbnMoKTogTGF5ZXJPcHRpb25zIHtcclxuICAgIGlmICghdGhpcy5sYXllcikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5sYXllci5kYXRhU291cmNlLm9wdGlvbnM7XHJcbiAgfVxyXG5cclxuICBsYXllcklzRXhwb3J0YWJsZSgpOiBib29sZWFuIHtcclxuICAgIGlmICgodGhpcy5sYXllciBpbnN0YW5jZW9mIFZlY3RvckxheWVyICYmIHRoaXMubGF5ZXIuZXhwb3J0YWJsZSA9PT0gdHJ1ZSkgfHxcclxuICAgICAgKHRoaXMubGF5ZXIuZGF0YVNvdXJjZS5vcHRpb25zLmRvd25sb2FkICYmIHRoaXMubGF5ZXIuZGF0YVNvdXJjZS5vcHRpb25zLmRvd25sb2FkLnVybCkpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG59XHJcbiJdfQ==