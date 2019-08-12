/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Layer } from '../../layer/shared/layers/layer';
import { MetadataService } from '../shared/metadata.service';
var MetadataButtonComponent = /** @class */ (function () {
    function MetadataButtonComponent(metadataService) {
        this.metadataService = metadataService;
        this._color = 'primary';
    }
    Object.defineProperty(MetadataButtonComponent.prototype, "layer", {
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
    Object.defineProperty(MetadataButtonComponent.prototype, "color", {
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
    /**
     * @param {?} metadata
     * @return {?}
     */
    MetadataButtonComponent.prototype.openMetadata = /**
     * @param {?} metadata
     * @return {?}
     */
    function (metadata) {
        this.metadataService.open(metadata);
    };
    Object.defineProperty(MetadataButtonComponent.prototype, "options", {
        get: /**
         * @return {?}
         */
        function () {
            if (!this.layer) {
                return;
            }
            return this.layer.options;
        },
        enumerable: true,
        configurable: true
    });
    MetadataButtonComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-metadata-button',
                    template: "<button\r\n  *ngIf=\"options && options.metadata && options.metadata.url\"\r\n  mat-icon-button\r\n  tooltip-position=\"below\"\r\n  matTooltipShowDelay=\"500\"\r\n  [matTooltip]=\"'igo.geo.metadata.show' | translate\"\r\n  [color]=\"color\"\r\n  (click)=\"openMetadata(options.metadata)\">\r\n  <mat-icon svgIcon=\"information-outline\"></mat-icon>\r\n</button>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    MetadataButtonComponent.ctorParameters = function () { return [
        { type: MetadataService }
    ]; };
    MetadataButtonComponent.propDecorators = {
        layer: [{ type: Input }],
        color: [{ type: Input }]
    };
    return MetadataButtonComponent;
}());
export { MetadataButtonComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YWRhdGEtYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9tZXRhZGF0YS9tZXRhZGF0YS1idXR0b24vbWV0YWRhdGEtYnV0dG9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFMUUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBTXhELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUU3RDtJQXlCRSxpQ0FBb0IsZUFBZ0M7UUFBaEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBRjVDLFdBQU0sR0FBRyxTQUFTLENBQUM7SUFFNEIsQ0FBQztJQWxCeEQsc0JBQ0ksMENBQUs7Ozs7UUFEVDtZQUVFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNyQixDQUFDOzs7OztRQUNELFVBQVUsS0FBWTtZQUNwQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN0QixDQUFDOzs7T0FIQTtJQU1ELHNCQUNJLDBDQUFLOzs7O1FBRFQ7WUFFRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDckIsQ0FBQzs7Ozs7UUFDRCxVQUFVLEtBQWE7WUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDdEIsQ0FBQzs7O09BSEE7Ozs7O0lBUUQsOENBQVk7Ozs7SUFBWixVQUFhLFFBQXlCO1FBQ3BDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRCxzQkFBSSw0Q0FBTzs7OztRQUFYO1lBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ2YsT0FBTzthQUNSO1lBQ0QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztRQUM1QixDQUFDOzs7T0FBQTs7Z0JBcENGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUscUJBQXFCO29CQUMvQiwwWEFBK0M7b0JBRS9DLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztpQkFDaEQ7Ozs7Z0JBUFEsZUFBZTs7O3dCQVNyQixLQUFLO3dCQVNMLEtBQUs7O0lBcUJSLDhCQUFDO0NBQUEsQUFyQ0QsSUFxQ0M7U0EvQlksdUJBQXVCOzs7Ozs7SUFRbEMseUNBQXNCOzs7OztJQVN0Qix5Q0FBMkI7Ozs7O0lBRWYsa0RBQXdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IExheWVyIH0gZnJvbSAnLi4vLi4vbGF5ZXIvc2hhcmVkL2xheWVycy9sYXllcic7XHJcblxyXG5pbXBvcnQge1xyXG4gIE1ldGFkYXRhT3B0aW9ucyxcclxuICBNZXRhZGF0YUxheWVyT3B0aW9uc1xyXG59IGZyb20gJy4uL3NoYXJlZC9tZXRhZGF0YS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBNZXRhZGF0YVNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvbWV0YWRhdGEuc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1tZXRhZGF0YS1idXR0b24nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9tZXRhZGF0YS1idXR0b24uY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL21ldGFkYXRhLWJ1dHRvbi5jb21wb25lbnQuc2NzcyddLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNZXRhZGF0YUJ1dHRvbkNvbXBvbmVudCB7XHJcbiAgQElucHV0KClcclxuICBnZXQgbGF5ZXIoKTogTGF5ZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX2xheWVyO1xyXG4gIH1cclxuICBzZXQgbGF5ZXIodmFsdWU6IExheWVyKSB7XHJcbiAgICB0aGlzLl9sYXllciA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9sYXllcjogTGF5ZXI7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGNvbG9yKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NvbG9yO1xyXG4gIH1cclxuICBzZXQgY29sb3IodmFsdWU6IHN0cmluZykge1xyXG4gICAgdGhpcy5fY29sb3IgPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfY29sb3IgPSAncHJpbWFyeSc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbWV0YWRhdGFTZXJ2aWNlOiBNZXRhZGF0YVNlcnZpY2UpIHt9XHJcblxyXG4gIG9wZW5NZXRhZGF0YShtZXRhZGF0YTogTWV0YWRhdGFPcHRpb25zKSB7XHJcbiAgICB0aGlzLm1ldGFkYXRhU2VydmljZS5vcGVuKG1ldGFkYXRhKTtcclxuICB9XHJcblxyXG4gIGdldCBvcHRpb25zKCk6IE1ldGFkYXRhTGF5ZXJPcHRpb25zIHtcclxuICAgIGlmICghdGhpcy5sYXllcikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5sYXllci5vcHRpb25zO1xyXG4gIH1cclxufVxyXG4iXX0=