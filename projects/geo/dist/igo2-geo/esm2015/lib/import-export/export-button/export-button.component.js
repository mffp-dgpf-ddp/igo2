/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Layer } from '../../layer/shared/layers/layer';
import { VectorLayer } from '../../layer';
export class ExportButtonComponent {
    constructor() {
        this._color = 'primary';
    }
    /**
     * @return {?}
     */
    get layer() {
        return this._layer;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set layer(value) {
        this._layer = value;
    }
    /**
     * @return {?}
     */
    get color() {
        return this._color;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set color(value) {
        this._color = value;
    }
    /**
     * @return {?}
     */
    get options() {
        if (!this.layer) {
            return;
        }
        return this.layer.dataSource.options;
    }
    /**
     * @return {?}
     */
    layerIsExportable() {
        if ((this.layer instanceof VectorLayer && this.layer.exportable === true) ||
            (this.layer.dataSource.options.download && this.layer.dataSource.options.download.url)) {
            return true;
        }
        return false;
    }
}
ExportButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-export-button',
                template: "<button\r\n  *ngIf=\"layerIsExportable()\"\r\n  mat-icon-button\r\n  tooltip-position=\"below\"\r\n  matTooltipShowDelay=\"500\"\r\n  [matTooltip]=\"'igo.geo.download.action' | translate\"\r\n  [color]=\"color\">\r\n  <!-- (click)=\"openDownload(layer)\"> -->\r\n  <mat-icon svgIcon=\"file-export\"></mat-icon>\r\n</button>\r\n\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            }] }
];
/** @nocollapse */
ExportButtonComponent.ctorParameters = () => [];
ExportButtonComponent.propDecorators = {
    layer: [{ type: Input }],
    color: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0LWJ1dHRvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvaW1wb3J0LWV4cG9ydC9leHBvcnQtYnV0dG9uL2V4cG9ydC1idXR0b24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUxRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFFeEQsT0FBTyxFQUFnQixXQUFXLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFReEQsTUFBTSxPQUFPLHFCQUFxQjtJQW1CaEM7UUFGUSxXQUFNLEdBQUcsU0FBUyxDQUFDO0lBRVosQ0FBQzs7OztJQWxCaEIsSUFDSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7Ozs7O0lBQ0QsSUFBSSxLQUFLLENBQUMsS0FBWTtRQUNwQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUN0QixDQUFDOzs7O0lBR0QsSUFDSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7Ozs7O0lBQ0QsSUFBSSxLQUFLLENBQUMsS0FBYTtRQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUN0QixDQUFDOzs7O0lBS0QsSUFBSSxPQUFPO1FBQ1QsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDZixPQUFPO1NBQ1I7UUFDRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQztJQUN2QyxDQUFDOzs7O0lBRUQsaUJBQWlCO1FBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLFlBQVksV0FBVyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxLQUFLLElBQUksQ0FBQztZQUN2RSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUN4RixPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDOzs7WUF4Q0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLHVWQUE2QztnQkFFN0MsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2hEOzs7OztvQkFFRSxLQUFLO29CQVNMLEtBQUs7Ozs7Ozs7SUFGTix1Q0FBc0I7Ozs7O0lBU3RCLHVDQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uLy4uL2xheWVyL3NoYXJlZC9sYXllcnMvbGF5ZXInO1xyXG5cclxuaW1wb3J0IHsgTGF5ZXJPcHRpb25zLCBWZWN0b3JMYXllciB9IGZyb20gJy4uLy4uL2xheWVyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLWV4cG9ydC1idXR0b24nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9leHBvcnQtYnV0dG9uLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9leHBvcnQtYnV0dG9uLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIEV4cG9ydEJ1dHRvbkNvbXBvbmVudCB7XHJcbiAgQElucHV0KClcclxuICBnZXQgbGF5ZXIoKTogTGF5ZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX2xheWVyO1xyXG4gIH1cclxuICBzZXQgbGF5ZXIodmFsdWU6IExheWVyKSB7XHJcbiAgICB0aGlzLl9sYXllciA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9sYXllcjogTGF5ZXI7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGNvbG9yKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NvbG9yO1xyXG4gIH1cclxuICBzZXQgY29sb3IodmFsdWU6IHN0cmluZykge1xyXG4gICAgdGhpcy5fY29sb3IgPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfY29sb3IgPSAncHJpbWFyeSc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgZ2V0IG9wdGlvbnMoKTogTGF5ZXJPcHRpb25zIHtcclxuICAgIGlmICghdGhpcy5sYXllcikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5sYXllci5kYXRhU291cmNlLm9wdGlvbnM7XHJcbiAgfVxyXG5cclxuICBsYXllcklzRXhwb3J0YWJsZSgpOiBib29sZWFuIHtcclxuICAgIGlmICgodGhpcy5sYXllciBpbnN0YW5jZW9mIFZlY3RvckxheWVyICYmIHRoaXMubGF5ZXIuZXhwb3J0YWJsZSA9PT0gdHJ1ZSkgfHxcclxuICAgICAgKHRoaXMubGF5ZXIuZGF0YVNvdXJjZS5vcHRpb25zLmRvd25sb2FkICYmIHRoaXMubGF5ZXIuZGF0YVNvdXJjZS5vcHRpb25zLmRvd25sb2FkLnVybCkpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG59XHJcbiJdfQ==