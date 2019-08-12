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
export class IgoListModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoListModule,
            providers: []
        };
    }
}
IgoListModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, MatIconModule, MatListModule, IgoClickoutModule],
                declarations: [ListItemDirective, ListComponent],
                exports: [ListItemDirective, ListComponent]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb21tb24vIiwic291cmNlcyI6WyJsaWIvbGlzdC9saXN0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFakUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFaEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBT2pELE1BQU0sT0FBTyxhQUFhOzs7O0lBQ3hCLE1BQU0sQ0FBQyxPQUFPO1FBQ1osT0FBTztZQUNMLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLFNBQVMsRUFBRSxFQUFFO1NBQ2QsQ0FBQztJQUNKLENBQUM7OztZQVhGLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQztnQkFDeEUsWUFBWSxFQUFFLENBQUMsaUJBQWlCLEVBQUUsYUFBYSxDQUFDO2dCQUNoRCxPQUFPLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxhQUFhLENBQUM7YUFDNUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBNYXRJY29uTW9kdWxlLCBNYXRMaXN0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5cclxuaW1wb3J0IHsgSWdvQ2xpY2tvdXRNb2R1bGUgfSBmcm9tICcuLi9jbGlja291dC9jbGlja291dC5tb2R1bGUnO1xyXG5cclxuaW1wb3J0IHsgTGlzdEl0ZW1EaXJlY3RpdmUgfSBmcm9tICcuL2xpc3QtaXRlbS5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9saXN0LmNvbXBvbmVudCc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIE1hdEljb25Nb2R1bGUsIE1hdExpc3RNb2R1bGUsIElnb0NsaWNrb3V0TW9kdWxlXSxcclxuICBkZWNsYXJhdGlvbnM6IFtMaXN0SXRlbURpcmVjdGl2ZSwgTGlzdENvbXBvbmVudF0sXHJcbiAgZXhwb3J0czogW0xpc3RJdGVtRGlyZWN0aXZlLCBMaXN0Q29tcG9uZW50XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgSWdvTGlzdE1vZHVsZSB7XHJcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZ01vZHVsZTogSWdvTGlzdE1vZHVsZSxcclxuICAgICAgcHJvdmlkZXJzOiBbXVxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19