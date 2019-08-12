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
export class BookmarkButtonComponent {
    /**
     * @param {?} dialog
     * @param {?} contextService
     * @param {?} languageService
     * @param {?} messageService
     */
    constructor(dialog, contextService, languageService, messageService) {
        this.dialog = dialog;
        this.contextService = contextService;
        this.languageService = languageService;
        this.messageService = messageService;
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
    createContext() {
        this.dialog
            .open(BookmarkDialogComponent, { disableClose: false })
            .afterClosed()
            .subscribe((/**
         * @param {?} title
         * @return {?}
         */
        title => {
            if (title) {
                /** @type {?} */
                const context = this.contextService.getContextFromMap(this.map);
                context.title = title;
                this.contextService.create(context).subscribe((/**
                 * @return {?}
                 */
                () => {
                    /** @type {?} */
                    const translate = this.languageService.translate;
                    /** @type {?} */
                    const titleD = translate.instant('igo.context.bookmarkButton.dialog.createTitle');
                    /** @type {?} */
                    const message = translate.instant('igo.context.bookmarkButton.dialog.createMsg', {
                        value: context.title
                    });
                    this.messageService.success(message, titleD);
                }));
            }
        }));
    }
}
BookmarkButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-bookmark-button',
                template: "<div class=\"igo-bookmark-button-container\">\r\n  <button\r\n    mat-icon-button\r\n    [matTooltip]=\"'igo.context.bookmarkButton.create' | translate\"\r\n    matTooltipPosition=\"above\"\r\n    [color]=\"color\"\r\n    (click)=\"createContext()\">\r\n    <mat-icon svgIcon=\"bookmark\"></mat-icon>\r\n  </button>\r\n</div>\r\n",
                styles: [".igo-bookmark-button-container{width:40px}.igo-bookmark-button-container button{background-color:#fff}.igo-bookmark-button-container button:hover{background-color:#efefef}:host>>>button .mat-button-ripple-round,button{border-radius:0}"]
            }] }
];
/** @nocollapse */
BookmarkButtonComponent.ctorParameters = () => [
    { type: MatDialog },
    { type: ContextService },
    { type: LanguageService },
    { type: MessageService }
];
BookmarkButtonComponent.propDecorators = {
    map: [{ type: Input }],
    color: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9va21hcmstYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbnRleHQvIiwic291cmNlcyI6WyJsaWIvY29udGV4dC1tYXAtYnV0dG9uL2Jvb2ttYXJrLWJ1dHRvbi9ib29rbWFyay1idXR0b24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFOUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxlQUFlLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDN0QsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUVuQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDOUUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFPdEUsTUFBTSxPQUFPLHVCQUF1Qjs7Ozs7OztJQW1CbEMsWUFDVSxNQUFpQixFQUNqQixjQUE4QixFQUM5QixlQUFnQyxFQUNoQyxjQUE4QjtRQUg5QixXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQ2pCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO0lBQ3JDLENBQUM7Ozs7SUF2QkosSUFDSSxHQUFHO1FBQ0wsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ25CLENBQUM7Ozs7O0lBQ0QsSUFBSSxHQUFHLENBQUMsS0FBYTtRQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztJQUNwQixDQUFDOzs7O0lBR0QsSUFDSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7Ozs7O0lBQ0QsSUFBSSxLQUFLLENBQUMsS0FBYTtRQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUN0QixDQUFDOzs7O0lBVUQsYUFBYTtRQUNYLElBQUksQ0FBQyxNQUFNO2FBQ1IsSUFBSSxDQUFDLHVCQUF1QixFQUFFLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxDQUFDO2FBQ3RELFdBQVcsRUFBRTthQUNiLFNBQVM7Ozs7UUFBQyxLQUFLLENBQUMsRUFBRTtZQUNqQixJQUFJLEtBQUssRUFBRTs7c0JBQ0gsT0FBTyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztnQkFDL0QsT0FBTyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVM7OztnQkFBQyxHQUFHLEVBQUU7OzBCQUMzQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTOzswQkFDMUMsTUFBTSxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQzlCLCtDQUErQyxDQUNoRDs7MEJBQ0ssT0FBTyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQy9CLDZDQUE2QyxFQUM3Qzt3QkFDRSxLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUs7cUJBQ3JCLENBQ0Y7b0JBQ0QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUMvQyxDQUFDLEVBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7WUF0REYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxxQkFBcUI7Z0JBQy9CLHFWQUErQzs7YUFFaEQ7Ozs7WUFaUSxTQUFTO1lBS1QsY0FBYztZQUhFLGVBQWU7WUFBL0IsY0FBYzs7O2tCQVlwQixLQUFLO29CQVNMLEtBQUs7Ozs7Ozs7SUFGTix1Q0FBcUI7Ozs7O0lBU3JCLHlDQUF1Qjs7Ozs7SUFHckIseUNBQXlCOzs7OztJQUN6QixpREFBc0M7Ozs7O0lBQ3RDLGtEQUF3Qzs7Ozs7SUFDeEMsaURBQXNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBNYXREaWFsb2cgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcblxyXG5pbXBvcnQgeyBNZXNzYWdlU2VydmljZSwgTGFuZ3VhZ2VTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcbmltcG9ydCB7IElnb01hcCB9IGZyb20gJ0BpZ28yL2dlbyc7XHJcblxyXG5pbXBvcnQgeyBDb250ZXh0U2VydmljZSB9IGZyb20gJy4uLy4uL2NvbnRleHQtbWFuYWdlci9zaGFyZWQvY29udGV4dC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQm9va21hcmtEaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL2Jvb2ttYXJrLWRpYWxvZy5jb21wb25lbnQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28tYm9va21hcmstYnV0dG9uJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vYm9va21hcmstYnV0dG9uLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9ib29rbWFyay1idXR0b24uY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQm9va21hcmtCdXR0b25Db21wb25lbnQge1xyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IG1hcCgpOiBJZ29NYXAge1xyXG4gICAgcmV0dXJuIHRoaXMuX21hcDtcclxuICB9XHJcbiAgc2V0IG1hcCh2YWx1ZTogSWdvTWFwKSB7XHJcbiAgICB0aGlzLl9tYXAgPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfbWFwOiBJZ29NYXA7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGNvbG9yKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5fY29sb3I7XHJcbiAgfVxyXG4gIHNldCBjb2xvcih2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLl9jb2xvciA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9jb2xvcjogc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgZGlhbG9nOiBNYXREaWFsb2csXHJcbiAgICBwcml2YXRlIGNvbnRleHRTZXJ2aWNlOiBDb250ZXh0U2VydmljZSxcclxuICAgIHByaXZhdGUgbGFuZ3VhZ2VTZXJ2aWNlOiBMYW5ndWFnZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIG1lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZVxyXG4gICkge31cclxuXHJcbiAgY3JlYXRlQ29udGV4dCgpIHtcclxuICAgIHRoaXMuZGlhbG9nXHJcbiAgICAgIC5vcGVuKEJvb2ttYXJrRGlhbG9nQ29tcG9uZW50LCB7IGRpc2FibGVDbG9zZTogZmFsc2UgfSlcclxuICAgICAgLmFmdGVyQ2xvc2VkKClcclxuICAgICAgLnN1YnNjcmliZSh0aXRsZSA9PiB7XHJcbiAgICAgICAgaWYgKHRpdGxlKSB7XHJcbiAgICAgICAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5jb250ZXh0U2VydmljZS5nZXRDb250ZXh0RnJvbU1hcCh0aGlzLm1hcCk7XHJcbiAgICAgICAgICBjb250ZXh0LnRpdGxlID0gdGl0bGU7XHJcbiAgICAgICAgICB0aGlzLmNvbnRleHRTZXJ2aWNlLmNyZWF0ZShjb250ZXh0KS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0cmFuc2xhdGUgPSB0aGlzLmxhbmd1YWdlU2VydmljZS50cmFuc2xhdGU7XHJcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlRCA9IHRyYW5zbGF0ZS5pbnN0YW50KFxyXG4gICAgICAgICAgICAgICdpZ28uY29udGV4dC5ib29rbWFya0J1dHRvbi5kaWFsb2cuY3JlYXRlVGl0bGUnXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSB0cmFuc2xhdGUuaW5zdGFudChcclxuICAgICAgICAgICAgICAnaWdvLmNvbnRleHQuYm9va21hcmtCdXR0b24uZGlhbG9nLmNyZWF0ZU1zZycsXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IGNvbnRleHQudGl0bGVcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2Uuc3VjY2VzcyhtZXNzYWdlLCB0aXRsZUQpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICB9XHJcbn1cclxuIl19