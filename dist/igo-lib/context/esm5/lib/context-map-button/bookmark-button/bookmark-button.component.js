/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MessageService, LanguageService } from '@igo2/core';
import { IgoMap } from '@igo2/geo';
import { ContextService } from '../../context-manager/shared/context.service';
import { BookmarkDialogComponent } from './bookmark-dialog.component';
var BookmarkButtonComponent = /** @class */ (function () {
    function BookmarkButtonComponent(dialog, contextService, languageService, messageService) {
        this.dialog = dialog;
        this.contextService = contextService;
        this.languageService = languageService;
        this.messageService = messageService;
    }
    Object.defineProperty(BookmarkButtonComponent.prototype, "map", {
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
    Object.defineProperty(BookmarkButtonComponent.prototype, "color", {
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
     * @return {?}
     */
    BookmarkButtonComponent.prototype.createContext = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.dialog
            .open(BookmarkDialogComponent, { disableClose: false })
            .afterClosed()
            .subscribe((/**
         * @param {?} title
         * @return {?}
         */
        function (title) {
            if (title) {
                /** @type {?} */
                var context_1 = _this.contextService.getContextFromMap(_this.map);
                context_1.title = title;
                _this.contextService.create(context_1).subscribe((/**
                 * @return {?}
                 */
                function () {
                    /** @type {?} */
                    var translate = _this.languageService.translate;
                    /** @type {?} */
                    var titleD = translate.instant('igo.context.bookmarkButton.dialog.createTitle');
                    /** @type {?} */
                    var message = translate.instant('igo.context.bookmarkButton.dialog.createMsg', {
                        value: context_1.title
                    });
                    _this.messageService.success(message, titleD);
                }));
            }
        }));
    };
    BookmarkButtonComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-bookmark-button',
                    template: "<div class=\"igo-bookmark-button-container\">\r\n  <button\r\n    mat-icon-button\r\n    [matTooltip]=\"'igo.context.bookmarkButton.create' | translate\"\r\n    matTooltipPosition=\"above\"\r\n    [color]=\"color\"\r\n    (click)=\"createContext()\">\r\n    <mat-icon svgIcon=\"bookmark\"></mat-icon>\r\n  </button>\r\n</div>\r\n",
                    styles: [".igo-bookmark-button-container{width:40px}.igo-bookmark-button-container button{background-color:#fff}.igo-bookmark-button-container button:hover{background-color:#efefef}:host>>>button .mat-button-ripple-round,button{border-radius:0}"]
                }] }
    ];
    /** @nocollapse */
    BookmarkButtonComponent.ctorParameters = function () { return [
        { type: MatDialog },
        { type: ContextService },
        { type: LanguageService },
        { type: MessageService }
    ]; };
    BookmarkButtonComponent.propDecorators = {
        map: [{ type: Input }],
        color: [{ type: Input }]
    };
    return BookmarkButtonComponent;
}());
export { BookmarkButtonComponent };
if (false) {
    /**
     * @type {?}
     * @private
     */
    BookmarkButtonComponent.prototype._map;
    /**
     * @type {?}
     * @private
     */
    BookmarkButtonComponent.prototype._color;
    /**
     * @type {?}
     * @private
     */
    BookmarkButtonComponent.prototype.dialog;
    /**
     * @type {?}
     * @private
     */
    BookmarkButtonComponent.prototype.contextService;
    /**
     * @type {?}
     * @private
     */
    BookmarkButtonComponent.prototype.languageService;
    /**
     * @type {?}
     * @private
     */
    BookmarkButtonComponent.prototype.messageService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9va21hcmstYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbnRleHQvIiwic291cmNlcyI6WyJsaWIvY29udGV4dC1tYXAtYnV0dG9uL2Jvb2ttYXJrLWJ1dHRvbi9ib29rbWFyay1idXR0b24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFOUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxlQUFlLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDN0QsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUVuQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDOUUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFdEU7SUF3QkUsaUNBQ1UsTUFBaUIsRUFDakIsY0FBOEIsRUFDOUIsZUFBZ0MsRUFDaEMsY0FBOEI7UUFIOUIsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUNqQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtJQUNyQyxDQUFDO0lBdkJKLHNCQUNJLHdDQUFHOzs7O1FBRFA7WUFFRSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDbkIsQ0FBQzs7Ozs7UUFDRCxVQUFRLEtBQWE7WUFDbkIsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7UUFDcEIsQ0FBQzs7O09BSEE7SUFNRCxzQkFDSSwwQ0FBSzs7OztRQURUO1lBRUUsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3JCLENBQUM7Ozs7O1FBQ0QsVUFBVSxLQUFhO1lBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLENBQUM7OztPQUhBOzs7O0lBYUQsK0NBQWE7OztJQUFiO1FBQUEsaUJBdUJDO1FBdEJDLElBQUksQ0FBQyxNQUFNO2FBQ1IsSUFBSSxDQUFDLHVCQUF1QixFQUFFLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxDQUFDO2FBQ3RELFdBQVcsRUFBRTthQUNiLFNBQVM7Ozs7UUFBQyxVQUFBLEtBQUs7WUFDZCxJQUFJLEtBQUssRUFBRTs7b0JBQ0gsU0FBTyxHQUFHLEtBQUksQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQUMsS0FBSSxDQUFDLEdBQUcsQ0FBQztnQkFDL0QsU0FBTyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7Z0JBQ3RCLEtBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLFNBQU8sQ0FBQyxDQUFDLFNBQVM7OztnQkFBQzs7d0JBQ3RDLFNBQVMsR0FBRyxLQUFJLENBQUMsZUFBZSxDQUFDLFNBQVM7O3dCQUMxQyxNQUFNLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FDOUIsK0NBQStDLENBQ2hEOzt3QkFDSyxPQUFPLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FDL0IsNkNBQTZDLEVBQzdDO3dCQUNFLEtBQUssRUFBRSxTQUFPLENBQUMsS0FBSztxQkFDckIsQ0FDRjtvQkFDRCxLQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQy9DLENBQUMsRUFBQyxDQUFDO2FBQ0o7UUFDSCxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7O2dCQXRERixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHFCQUFxQjtvQkFDL0IscVZBQStDOztpQkFFaEQ7Ozs7Z0JBWlEsU0FBUztnQkFLVCxjQUFjO2dCQUhFLGVBQWU7Z0JBQS9CLGNBQWM7OztzQkFZcEIsS0FBSzt3QkFTTCxLQUFLOztJQXdDUiw4QkFBQztDQUFBLEFBdkRELElBdURDO1NBbERZLHVCQUF1Qjs7Ozs7O0lBUWxDLHVDQUFxQjs7Ozs7SUFTckIseUNBQXVCOzs7OztJQUdyQix5Q0FBeUI7Ozs7O0lBQ3pCLGlEQUFzQzs7Ozs7SUFDdEMsa0RBQXdDOzs7OztJQUN4QyxpREFBc0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE1hdERpYWxvZyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuXHJcbmltcG9ydCB7IE1lc3NhZ2VTZXJ2aWNlLCBMYW5ndWFnZVNlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuaW1wb3J0IHsgSWdvTWFwIH0gZnJvbSAnQGlnbzIvZ2VvJztcclxuXHJcbmltcG9ydCB7IENvbnRleHRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29udGV4dC1tYW5hZ2VyL3NoYXJlZC9jb250ZXh0LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBCb29rbWFya0RpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vYm9va21hcmstZGlhbG9nLmNvbXBvbmVudCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1ib29rbWFyay1idXR0b24nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9ib29rbWFyay1idXR0b24uY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2Jvb2ttYXJrLWJ1dHRvbi5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBCb29rbWFya0J1dHRvbkNvbXBvbmVudCB7XHJcbiAgQElucHV0KClcclxuICBnZXQgbWFwKCk6IElnb01hcCB7XHJcbiAgICByZXR1cm4gdGhpcy5fbWFwO1xyXG4gIH1cclxuICBzZXQgbWFwKHZhbHVlOiBJZ29NYXApIHtcclxuICAgIHRoaXMuX21hcCA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9tYXA6IElnb01hcDtcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgY29sb3IoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLl9jb2xvcjtcclxuICB9XHJcbiAgc2V0IGNvbG9yKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuX2NvbG9yID0gdmFsdWU7XHJcbiAgfVxyXG4gIHByaXZhdGUgX2NvbG9yOiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBkaWFsb2c6IE1hdERpYWxvZyxcclxuICAgIHByaXZhdGUgY29udGV4dFNlcnZpY2U6IENvbnRleHRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBsYW5ndWFnZVNlcnZpY2U6IExhbmd1YWdlU2VydmljZSxcclxuICAgIHByaXZhdGUgbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICBjcmVhdGVDb250ZXh0KCkge1xyXG4gICAgdGhpcy5kaWFsb2dcclxuICAgICAgLm9wZW4oQm9va21hcmtEaWFsb2dDb21wb25lbnQsIHsgZGlzYWJsZUNsb3NlOiBmYWxzZSB9KVxyXG4gICAgICAuYWZ0ZXJDbG9zZWQoKVxyXG4gICAgICAuc3Vic2NyaWJlKHRpdGxlID0+IHtcclxuICAgICAgICBpZiAodGl0bGUpIHtcclxuICAgICAgICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLmNvbnRleHRTZXJ2aWNlLmdldENvbnRleHRGcm9tTWFwKHRoaXMubWFwKTtcclxuICAgICAgICAgIGNvbnRleHQudGl0bGUgPSB0aXRsZTtcclxuICAgICAgICAgIHRoaXMuY29udGV4dFNlcnZpY2UuY3JlYXRlKGNvbnRleHQpLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRyYW5zbGF0ZSA9IHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnRyYW5zbGF0ZTtcclxuICAgICAgICAgICAgY29uc3QgdGl0bGVEID0gdHJhbnNsYXRlLmluc3RhbnQoXHJcbiAgICAgICAgICAgICAgJ2lnby5jb250ZXh0LmJvb2ttYXJrQnV0dG9uLmRpYWxvZy5jcmVhdGVUaXRsZSdcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IHRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICAgICAgICdpZ28uY29udGV4dC5ib29rbWFya0J1dHRvbi5kaWFsb2cuY3JlYXRlTXNnJyxcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogY29udGV4dC50aXRsZVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgdGhpcy5tZXNzYWdlU2VydmljZS5zdWNjZXNzKG1lc3NhZ2UsIHRpdGxlRCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=