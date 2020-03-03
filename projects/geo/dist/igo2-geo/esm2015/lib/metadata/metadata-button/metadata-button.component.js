/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Layer } from '../../layer/shared/layers/layer';
import { MetadataService } from '../shared/metadata.service';
export class MetadataButtonComponent {
    /**
     * @param {?} metadataService
     */
    constructor(metadataService) {
        this.metadataService = metadataService;
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
     * @param {?} metadata
     * @return {?}
     */
    openMetadata(metadata) {
        this.metadataService.open(metadata);
    }
    /**
     * @return {?}
     */
    get options() {
        if (!this.layer) {
            return;
        }
        return this.layer.options;
    }
}
MetadataButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-metadata-button',
                template: "<button\r\n  *ngIf=\"options && options.metadata && options.metadata.url\"\r\n  mat-icon-button\r\n  tooltip-position=\"below\"\r\n  matTooltipShowDelay=\"500\"\r\n  [matTooltip]=\"'igo.geo.metadata.show' | translate\"\r\n  [color]=\"color\"\r\n  (click)=\"openMetadata(options.metadata)\">\r\n  <mat-icon svgIcon=\"information-outline\"></mat-icon>\r\n</button>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            }] }
];
/** @nocollapse */
MetadataButtonComponent.ctorParameters = () => [
    { type: MetadataService }
];
MetadataButtonComponent.propDecorators = {
    layer: [{ type: Input }],
    color: [{ type: Input }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    MetadataButtonComponent.prototype._layer;
    /**
     * @type {?}
     * @private
     */
    MetadataButtonComponent.prototype._color;
    /**
     * @type {?}
     * @private
     */
    MetadataButtonComponent.prototype.metadataService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YWRhdGEtYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9tZXRhZGF0YS9tZXRhZGF0YS1idXR0b24vbWV0YWRhdGEtYnV0dG9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFMUUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBTXhELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQVE3RCxNQUFNLE9BQU8sdUJBQXVCOzs7O0lBbUJsQyxZQUFvQixlQUFnQztRQUFoQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFGNUMsV0FBTSxHQUFHLFNBQVMsQ0FBQztJQUU0QixDQUFDOzs7O0lBbEJ4RCxJQUNJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQzs7Ozs7SUFDRCxJQUFJLEtBQUssQ0FBQyxLQUFZO1FBQ3BCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ3RCLENBQUM7Ozs7SUFHRCxJQUNJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQzs7Ozs7SUFDRCxJQUFJLEtBQUssQ0FBQyxLQUFhO1FBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ3RCLENBQUM7Ozs7O0lBS0QsWUFBWSxDQUFDLFFBQXlCO1FBQ3BDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7Ozs7SUFFRCxJQUFJLE9BQU87UUFDVCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNmLE9BQU87U0FDUjtRQUNELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7SUFDNUIsQ0FBQzs7O1lBcENGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQiwwWEFBK0M7Z0JBRS9DLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNoRDs7OztZQVBRLGVBQWU7OztvQkFTckIsS0FBSztvQkFTTCxLQUFLOzs7Ozs7O0lBRk4seUNBQXNCOzs7OztJQVN0Qix5Q0FBMkI7Ozs7O0lBRWYsa0RBQXdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IExheWVyIH0gZnJvbSAnLi4vLi4vbGF5ZXIvc2hhcmVkL2xheWVycy9sYXllcic7XHJcblxyXG5pbXBvcnQge1xyXG4gIE1ldGFkYXRhT3B0aW9ucyxcclxuICBNZXRhZGF0YUxheWVyT3B0aW9uc1xyXG59IGZyb20gJy4uL3NoYXJlZC9tZXRhZGF0YS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBNZXRhZGF0YVNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvbWV0YWRhdGEuc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1tZXRhZGF0YS1idXR0b24nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9tZXRhZGF0YS1idXR0b24uY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL21ldGFkYXRhLWJ1dHRvbi5jb21wb25lbnQuc2NzcyddLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNZXRhZGF0YUJ1dHRvbkNvbXBvbmVudCB7XHJcbiAgQElucHV0KClcclxuICBnZXQgbGF5ZXIoKTogTGF5ZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX2xheWVyO1xyXG4gIH1cclxuICBzZXQgbGF5ZXIodmFsdWU6IExheWVyKSB7XHJcbiAgICB0aGlzLl9sYXllciA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9sYXllcjogTGF5ZXI7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGNvbG9yKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NvbG9yO1xyXG4gIH1cclxuICBzZXQgY29sb3IodmFsdWU6IHN0cmluZykge1xyXG4gICAgdGhpcy5fY29sb3IgPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfY29sb3IgPSAncHJpbWFyeSc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbWV0YWRhdGFTZXJ2aWNlOiBNZXRhZGF0YVNlcnZpY2UpIHt9XHJcblxyXG4gIG9wZW5NZXRhZGF0YShtZXRhZGF0YTogTWV0YWRhdGFPcHRpb25zKSB7XHJcbiAgICB0aGlzLm1ldGFkYXRhU2VydmljZS5vcGVuKG1ldGFkYXRhKTtcclxuICB9XHJcblxyXG4gIGdldCBvcHRpb25zKCk6IE1ldGFkYXRhTGF5ZXJPcHRpb25zIHtcclxuICAgIGlmICghdGhpcy5sYXllcikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5sYXllci5vcHRpb25zO1xyXG4gIH1cclxufVxyXG4iXX0=