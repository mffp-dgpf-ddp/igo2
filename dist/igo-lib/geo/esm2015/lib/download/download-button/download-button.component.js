/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Layer } from '../../layer/shared/layers/layer';
import { DownloadService } from '../shared/download.service';
export class DownloadButtonComponent {
    /**
     * @param {?} downloadService
     */
    constructor(downloadService) {
        this.downloadService = downloadService;
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
     * @param {?} layer
     * @return {?}
     */
    openDownload(layer) {
        this.downloadService.open(layer);
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
}
DownloadButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-download-button',
                template: "<button\r\n  *ngIf=\"options && options.download && (options.download['dynamicUrl'] || options.download['url']) \"\r\n  mat-icon-button\r\n  tooltip-position=\"below\"\r\n  matTooltipShowDelay=\"500\"\r\n  [matTooltip]=\"'igo.geo.download.action' | translate\"\r\n  [color]=\"color\"\r\n  (click)=\"openDownload(layer)\">\r\n  <mat-icon svgIcon=\"download\"></mat-icon>\r\n</button>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            }] }
];
/** @nocollapse */
DownloadButtonComponent.ctorParameters = () => [
    { type: DownloadService }
];
DownloadButtonComponent.propDecorators = {
    layer: [{ type: Input }],
    color: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG93bmxvYWQtYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9kb3dubG9hZC9kb3dubG9hZC1idXR0b24vZG93bmxvYWQtYnV0dG9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFMUUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBR3hELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQVE3RCxNQUFNLE9BQU8sdUJBQXVCOzs7O0lBbUJsQyxZQUFvQixlQUFnQztRQUFoQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFGNUMsV0FBTSxHQUFHLFNBQVMsQ0FBQztJQUU0QixDQUFDOzs7O0lBbEJ4RCxJQUNJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQzs7Ozs7SUFDRCxJQUFJLEtBQUssQ0FBQyxLQUFZO1FBQ3BCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ3RCLENBQUM7Ozs7SUFHRCxJQUNJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQzs7Ozs7SUFDRCxJQUFJLEtBQUssQ0FBQyxLQUFhO1FBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ3RCLENBQUM7Ozs7O0lBS0QsWUFBWSxDQUFDLEtBQVk7UUFDdkIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkMsQ0FBQzs7OztJQUVELElBQUksT0FBTztRQUNULElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2YsT0FBTztTQUNSO1FBQ0QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7SUFDdkMsQ0FBQzs7O1lBcENGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQiw4WUFBK0M7Z0JBRS9DLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNoRDs7OztZQVBRLGVBQWU7OztvQkFTckIsS0FBSztvQkFTTCxLQUFLOzs7Ozs7O0lBRk4seUNBQXNCOzs7OztJQVN0Qix5Q0FBMkI7Ozs7O0lBRWYsa0RBQXdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IExheWVyIH0gZnJvbSAnLi4vLi4vbGF5ZXIvc2hhcmVkL2xheWVycy9sYXllcic7XHJcblxyXG5pbXBvcnQgeyBEb3dubG9hZERhdGFTb3VyY2VPcHRpb25zIH0gZnJvbSAnLi4vc2hhcmVkL2Rvd25sb2FkLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IERvd25sb2FkU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9kb3dubG9hZC5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLWRvd25sb2FkLWJ1dHRvbicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2Rvd25sb2FkLWJ1dHRvbi5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vZG93bmxvYWQtYnV0dG9uLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIERvd25sb2FkQnV0dG9uQ29tcG9uZW50IHtcclxuICBASW5wdXQoKVxyXG4gIGdldCBsYXllcigpOiBMYXllciB7XHJcbiAgICByZXR1cm4gdGhpcy5fbGF5ZXI7XHJcbiAgfVxyXG4gIHNldCBsYXllcih2YWx1ZTogTGF5ZXIpIHtcclxuICAgIHRoaXMuX2xheWVyID0gdmFsdWU7XHJcbiAgfVxyXG4gIHByaXZhdGUgX2xheWVyOiBMYXllcjtcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgY29sb3IoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fY29sb3I7XHJcbiAgfVxyXG4gIHNldCBjb2xvcih2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLl9jb2xvciA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9jb2xvciA9ICdwcmltYXJ5JztcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkb3dubG9hZFNlcnZpY2U6IERvd25sb2FkU2VydmljZSkge31cclxuXHJcbiAgb3BlbkRvd25sb2FkKGxheWVyOiBMYXllcikge1xyXG4gICAgdGhpcy5kb3dubG9hZFNlcnZpY2Uub3BlbihsYXllcik7XHJcbiAgfVxyXG5cclxuICBnZXQgb3B0aW9ucygpOiBEb3dubG9hZERhdGFTb3VyY2VPcHRpb25zIHtcclxuICAgIGlmICghdGhpcy5sYXllcikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5sYXllci5kYXRhU291cmNlLm9wdGlvbnM7XHJcbiAgfVxyXG59XHJcbiJdfQ==