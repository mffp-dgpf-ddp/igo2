/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatListModule } from '@angular/material';
import { IgoClickoutModule } from '../clickout/clickout.module';
import { ListItemDirective } from './list-item.directive';
import { ListComponent } from './list.component';
var IgoListModule = /** @class */ (function () {
    function IgoListModule() {
    }
    /**
     * @return {?}
     */
    IgoListModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: IgoListModule,
            providers: []
        };
    };
    IgoListModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, MatIconModule, MatListModule, IgoClickoutModule],
                    declarations: [ListItemDirective, ListComponent],
                    exports: [ListItemDirective, ListComponent]
                },] }
    ];
    return IgoListModule;
}());
export { IgoListModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb21tb24vIiwic291cmNlcyI6WyJsaWIvbGlzdC9saXN0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFakUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFaEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRWpEO0lBQUE7SUFZQSxDQUFDOzs7O0lBTlEscUJBQU87OztJQUFkO1FBQ0UsT0FBTztZQUNMLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLFNBQVMsRUFBRSxFQUFFO1NBQ2QsQ0FBQztJQUNKLENBQUM7O2dCQVhGLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQztvQkFDeEUsWUFBWSxFQUFFLENBQUMsaUJBQWlCLEVBQUUsYUFBYSxDQUFDO29CQUNoRCxPQUFPLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxhQUFhLENBQUM7aUJBQzVDOztJQVFELG9CQUFDO0NBQUEsQUFaRCxJQVlDO1NBUFksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IE1hdEljb25Nb2R1bGUsIE1hdExpc3RNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcblxyXG5pbXBvcnQgeyBJZ29DbGlja291dE1vZHVsZSB9IGZyb20gJy4uL2NsaWNrb3V0L2NsaWNrb3V0Lm1vZHVsZSc7XHJcblxyXG5pbXBvcnQgeyBMaXN0SXRlbURpcmVjdGl2ZSB9IGZyb20gJy4vbGlzdC1pdGVtLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IExpc3RDb21wb25lbnQgfSBmcm9tICcuL2xpc3QuY29tcG9uZW50JztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgTWF0SWNvbk1vZHVsZSwgTWF0TGlzdE1vZHVsZSwgSWdvQ2xpY2tvdXRNb2R1bGVdLFxyXG4gIGRlY2xhcmF0aW9uczogW0xpc3RJdGVtRGlyZWN0aXZlLCBMaXN0Q29tcG9uZW50XSxcclxuICBleHBvcnRzOiBbTGlzdEl0ZW1EaXJlY3RpdmUsIExpc3RDb21wb25lbnRdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJZ29MaXN0TW9kdWxlIHtcclxuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5nTW9kdWxlOiBJZ29MaXN0TW9kdWxlLFxyXG4gICAgICBwcm92aWRlcnM6IFtdXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=