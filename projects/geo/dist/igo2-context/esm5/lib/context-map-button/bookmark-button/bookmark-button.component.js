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
                    _this.contextService.loadContext(context_1.uri);
                }));
            }
        }));
    };
    BookmarkButtonComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-bookmark-button',
                    template: "<div class=\"igo-bookmark-button-container\">\r\n  <button\r\n    mat-icon-button\r\n    [matTooltip]=\"'igo.context.bookmarkButton.create' | translate\"\r\n    matTooltipPosition=\"above\"\r\n    [color]=\"color\"\r\n    (click)=\"createContext()\">\r\n    <mat-icon svgIcon=\"star\"></mat-icon>\r\n  </button>\r\n</div>\r\n",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9va21hcmstYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbnRleHQvIiwic291cmNlcyI6WyJsaWIvY29udGV4dC1tYXAtYnV0dG9uL2Jvb2ttYXJrLWJ1dHRvbi9ib29rbWFyay1idXR0b24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFOUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxlQUFlLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDN0QsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUVuQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDOUUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFdEU7SUF3QkUsaUNBQ1UsTUFBaUIsRUFDakIsY0FBOEIsRUFDOUIsZUFBZ0MsRUFDaEMsY0FBOEI7UUFIOUIsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUNqQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtJQUNyQyxDQUFDO0lBdkJKLHNCQUNJLHdDQUFHOzs7O1FBRFA7WUFFRSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDbkIsQ0FBQzs7Ozs7UUFDRCxVQUFRLEtBQWE7WUFDbkIsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7UUFDcEIsQ0FBQzs7O09BSEE7SUFNRCxzQkFDSSwwQ0FBSzs7OztRQURUO1lBRUUsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3JCLENBQUM7Ozs7O1FBQ0QsVUFBVSxLQUFhO1lBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLENBQUM7OztPQUhBOzs7O0lBYUQsK0NBQWE7OztJQUFiO1FBQUEsaUJBd0JDO1FBdkJDLElBQUksQ0FBQyxNQUFNO2FBQ1IsSUFBSSxDQUFDLHVCQUF1QixFQUFFLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxDQUFDO2FBQ3RELFdBQVcsRUFBRTthQUNiLFNBQVM7Ozs7UUFBQyxVQUFBLEtBQUs7WUFDZCxJQUFJLEtBQUssRUFBRTs7b0JBQ0gsU0FBTyxHQUFHLEtBQUksQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQUMsS0FBSSxDQUFDLEdBQUcsQ0FBQztnQkFDL0QsU0FBTyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7Z0JBQ3RCLEtBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLFNBQU8sQ0FBQyxDQUFDLFNBQVM7OztnQkFBQzs7d0JBQ3RDLFNBQVMsR0FBRyxLQUFJLENBQUMsZUFBZSxDQUFDLFNBQVM7O3dCQUMxQyxNQUFNLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FDOUIsK0NBQStDLENBQ2hEOzt3QkFDSyxPQUFPLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FDL0IsNkNBQTZDLEVBQzdDO3dCQUNFLEtBQUssRUFBRSxTQUFPLENBQUMsS0FBSztxQkFDckIsQ0FDRjtvQkFDRCxLQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7b0JBQzdDLEtBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLFNBQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDL0MsQ0FBQyxFQUFDLENBQUM7YUFDSjtRQUNILENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7Z0JBdkRGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUscUJBQXFCO29CQUMvQixpVkFBK0M7O2lCQUVoRDs7OztnQkFaUSxTQUFTO2dCQUtULGNBQWM7Z0JBSEUsZUFBZTtnQkFBL0IsY0FBYzs7O3NCQVlwQixLQUFLO3dCQVNMLEtBQUs7O0lBeUNSLDhCQUFDO0NBQUEsQUF4REQsSUF3REM7U0FuRFksdUJBQXVCOzs7Ozs7SUFRbEMsdUNBQXFCOzs7OztJQVNyQix5Q0FBdUI7Ozs7O0lBR3JCLHlDQUF5Qjs7Ozs7SUFDekIsaURBQXNDOzs7OztJQUN0QyxrREFBd0M7Ozs7O0lBQ3hDLGlEQUFzQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTWF0RGlhbG9nIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5cclxuaW1wb3J0IHsgTWVzc2FnZVNlcnZpY2UsIExhbmd1YWdlU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICdAaWdvMi9nZW8nO1xyXG5cclxuaW1wb3J0IHsgQ29udGV4dFNlcnZpY2UgfSBmcm9tICcuLi8uLi9jb250ZXh0LW1hbmFnZXIvc2hhcmVkL2NvbnRleHQuc2VydmljZSc7XHJcbmltcG9ydCB7IEJvb2ttYXJrRGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi9ib29rbWFyay1kaWFsb2cuY29tcG9uZW50JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLWJvb2ttYXJrLWJ1dHRvbicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2Jvb2ttYXJrLWJ1dHRvbi5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vYm9va21hcmstYnV0dG9uLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIEJvb2ttYXJrQnV0dG9uQ29tcG9uZW50IHtcclxuICBASW5wdXQoKVxyXG4gIGdldCBtYXAoKTogSWdvTWFwIHtcclxuICAgIHJldHVybiB0aGlzLl9tYXA7XHJcbiAgfVxyXG4gIHNldCBtYXAodmFsdWU6IElnb01hcCkge1xyXG4gICAgdGhpcy5fbWFwID0gdmFsdWU7XHJcbiAgfVxyXG4gIHByaXZhdGUgX21hcDogSWdvTWFwO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBjb2xvcigpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NvbG9yO1xyXG4gIH1cclxuICBzZXQgY29sb3IodmFsdWU6IHN0cmluZykge1xyXG4gICAgdGhpcy5fY29sb3IgPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfY29sb3I6IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGRpYWxvZzogTWF0RGlhbG9nLFxyXG4gICAgcHJpdmF0ZSBjb250ZXh0U2VydmljZTogQ29udGV4dFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBtZXNzYWdlU2VydmljZTogTWVzc2FnZVNlcnZpY2VcclxuICApIHt9XHJcblxyXG4gIGNyZWF0ZUNvbnRleHQoKSB7XHJcbiAgICB0aGlzLmRpYWxvZ1xyXG4gICAgICAub3BlbihCb29rbWFya0RpYWxvZ0NvbXBvbmVudCwgeyBkaXNhYmxlQ2xvc2U6IGZhbHNlIH0pXHJcbiAgICAgIC5hZnRlckNsb3NlZCgpXHJcbiAgICAgIC5zdWJzY3JpYmUodGl0bGUgPT4ge1xyXG4gICAgICAgIGlmICh0aXRsZSkge1xyXG4gICAgICAgICAgY29uc3QgY29udGV4dCA9IHRoaXMuY29udGV4dFNlcnZpY2UuZ2V0Q29udGV4dEZyb21NYXAodGhpcy5tYXApO1xyXG4gICAgICAgICAgY29udGV4dC50aXRsZSA9IHRpdGxlO1xyXG4gICAgICAgICAgdGhpcy5jb250ZXh0U2VydmljZS5jcmVhdGUoY29udGV4dCkuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgdHJhbnNsYXRlID0gdGhpcy5sYW5ndWFnZVNlcnZpY2UudHJhbnNsYXRlO1xyXG4gICAgICAgICAgICBjb25zdCB0aXRsZUQgPSB0cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAgICAgICAnaWdvLmNvbnRleHQuYm9va21hcmtCdXR0b24uZGlhbG9nLmNyZWF0ZVRpdGxlJ1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gdHJhbnNsYXRlLmluc3RhbnQoXHJcbiAgICAgICAgICAgICAgJ2lnby5jb250ZXh0LmJvb2ttYXJrQnV0dG9uLmRpYWxvZy5jcmVhdGVNc2cnLFxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBjb250ZXh0LnRpdGxlXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLnN1Y2Nlc3MobWVzc2FnZSwgdGl0bGVEKTtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0U2VydmljZS5sb2FkQ29udGV4dChjb250ZXh0LnVyaSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=