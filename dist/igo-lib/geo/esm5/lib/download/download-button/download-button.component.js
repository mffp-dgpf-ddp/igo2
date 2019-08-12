/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Layer } from '../../layer/shared/layers/layer';
import { DownloadService } from '../shared/download.service';
var DownloadButtonComponent = /** @class */ (function () {
    function DownloadButtonComponent(downloadService) {
        this.downloadService = downloadService;
        this._color = 'primary';
    }
    Object.defineProperty(DownloadButtonComponent.prototype, "layer", {
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
    Object.defineProperty(DownloadButtonComponent.prototype, "color", {
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
     * @param {?} layer
     * @return {?}
     */
    DownloadButtonComponent.prototype.openDownload = /**
     * @param {?} layer
     * @return {?}
     */
    function (layer) {
        this.downloadService.open(layer);
    };
    Object.defineProperty(DownloadButtonComponent.prototype, "options", {
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
    DownloadButtonComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-download-button',
                    template: "<button\r\n  *ngIf=\"options && options.download && (options.download['dynamicUrl'] || options.download['url']) \"\r\n  mat-icon-button\r\n  tooltip-position=\"below\"\r\n  matTooltipShowDelay=\"500\"\r\n  [matTooltip]=\"'igo.geo.download.action' | translate\"\r\n  [color]=\"color\"\r\n  (click)=\"openDownload(layer)\">\r\n  <mat-icon svgIcon=\"download\"></mat-icon>\r\n</button>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    DownloadButtonComponent.ctorParameters = function () { return [
        { type: DownloadService }
    ]; };
    DownloadButtonComponent.propDecorators = {
        layer: [{ type: Input }],
        color: [{ type: Input }]
    };
    return DownloadButtonComponent;
}());
export { DownloadButtonComponent };
if (false) {
    /**
     * @type {?}
     * @private
     */
    DownloadButtonComponent.prototype._layer;
    /**
     * @type {?}
     * @private
     */
    DownloadButtonComponent.prototype._color;
    /**
     * @type {?}
     * @private
     */
    DownloadButtonComponent.prototype.downloadService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG93bmxvYWQtYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9kb3dubG9hZC9kb3dubG9hZC1idXR0b24vZG93bmxvYWQtYnV0dG9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFMUUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBR3hELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUU3RDtJQXlCRSxpQ0FBb0IsZUFBZ0M7UUFBaEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBRjVDLFdBQU0sR0FBRyxTQUFTLENBQUM7SUFFNEIsQ0FBQztJQWxCeEQsc0JBQ0ksMENBQUs7Ozs7UUFEVDtZQUVFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNyQixDQUFDOzs7OztRQUNELFVBQVUsS0FBWTtZQUNwQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN0QixDQUFDOzs7T0FIQTtJQU1ELHNCQUNJLDBDQUFLOzs7O1FBRFQ7WUFFRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDckIsQ0FBQzs7Ozs7UUFDRCxVQUFVLEtBQWE7WUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDdEIsQ0FBQzs7O09BSEE7Ozs7O0lBUUQsOENBQVk7Ozs7SUFBWixVQUFhLEtBQVk7UUFDdkIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELHNCQUFJLDRDQUFPOzs7O1FBQVg7WUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDZixPQUFPO2FBQ1I7WUFDRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQztRQUN2QyxDQUFDOzs7T0FBQTs7Z0JBcENGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUscUJBQXFCO29CQUMvQiw4WUFBK0M7b0JBRS9DLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztpQkFDaEQ7Ozs7Z0JBUFEsZUFBZTs7O3dCQVNyQixLQUFLO3dCQVNMLEtBQUs7O0lBcUJSLDhCQUFDO0NBQUEsQUFyQ0QsSUFxQ0M7U0EvQlksdUJBQXVCOzs7Ozs7SUFRbEMseUNBQXNCOzs7OztJQVN0Qix5Q0FBMkI7Ozs7O0lBRWYsa0RBQXdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IExheWVyIH0gZnJvbSAnLi4vLi4vbGF5ZXIvc2hhcmVkL2xheWVycy9sYXllcic7XHJcblxyXG5pbXBvcnQgeyBEb3dubG9hZERhdGFTb3VyY2VPcHRpb25zIH0gZnJvbSAnLi4vc2hhcmVkL2Rvd25sb2FkLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IERvd25sb2FkU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9kb3dubG9hZC5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLWRvd25sb2FkLWJ1dHRvbicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2Rvd25sb2FkLWJ1dHRvbi5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vZG93bmxvYWQtYnV0dG9uLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIERvd25sb2FkQnV0dG9uQ29tcG9uZW50IHtcclxuICBASW5wdXQoKVxyXG4gIGdldCBsYXllcigpOiBMYXllciB7XHJcbiAgICByZXR1cm4gdGhpcy5fbGF5ZXI7XHJcbiAgfVxyXG4gIHNldCBsYXllcih2YWx1ZTogTGF5ZXIpIHtcclxuICAgIHRoaXMuX2xheWVyID0gdmFsdWU7XHJcbiAgfVxyXG4gIHByaXZhdGUgX2xheWVyOiBMYXllcjtcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgY29sb3IoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fY29sb3I7XHJcbiAgfVxyXG4gIHNldCBjb2xvcih2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLl9jb2xvciA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9jb2xvciA9ICdwcmltYXJ5JztcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkb3dubG9hZFNlcnZpY2U6IERvd25sb2FkU2VydmljZSkge31cclxuXHJcbiAgb3BlbkRvd25sb2FkKGxheWVyOiBMYXllcikge1xyXG4gICAgdGhpcy5kb3dubG9hZFNlcnZpY2Uub3BlbihsYXllcik7XHJcbiAgfVxyXG5cclxuICBnZXQgb3B0aW9ucygpOiBEb3dubG9hZERhdGFTb3VyY2VPcHRpb25zIHtcclxuICAgIGlmICghdGhpcy5sYXllcikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5sYXllci5kYXRhU291cmNlLm9wdGlvbnM7XHJcbiAgfVxyXG59XHJcbiJdfQ==