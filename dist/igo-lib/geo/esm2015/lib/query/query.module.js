/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QueryDirective } from './shared/query.directive';
import { QueryService } from './shared/query.service';
import { provideQuerySearchSource } from './shared/query-search-source.providers';
export class IgoQueryModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoQueryModule,
            providers: [provideQuerySearchSource()]
        };
    }
}
IgoQueryModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [QueryDirective],
                declarations: [QueryDirective],
                providers: [QueryService]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnkubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL3F1ZXJ5L3F1ZXJ5Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdEQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFRbEYsTUFBTSxPQUFPLGNBQWM7Ozs7SUFDekIsTUFBTSxDQUFDLE9BQU87UUFDWixPQUFPO1lBQ0wsUUFBUSxFQUFFLGNBQWM7WUFDeEIsU0FBUyxFQUFFLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztTQUN4QyxDQUFDO0lBQ0osQ0FBQzs7O1lBWkYsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztnQkFDdkIsT0FBTyxFQUFFLENBQUMsY0FBYyxDQUFDO2dCQUN6QixZQUFZLEVBQUUsQ0FBQyxjQUFjLENBQUM7Z0JBQzlCLFNBQVMsRUFBRSxDQUFDLFlBQVksQ0FBQzthQUMxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBRdWVyeURpcmVjdGl2ZSB9IGZyb20gJy4vc2hhcmVkL3F1ZXJ5LmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IFF1ZXJ5U2VydmljZSB9IGZyb20gJy4vc2hhcmVkL3F1ZXJ5LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBwcm92aWRlUXVlcnlTZWFyY2hTb3VyY2UgfSBmcm9tICcuL3NoYXJlZC9xdWVyeS1zZWFyY2gtc291cmNlLnByb3ZpZGVycyc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxyXG4gIGV4cG9ydHM6IFtRdWVyeURpcmVjdGl2ZV0sXHJcbiAgZGVjbGFyYXRpb25zOiBbUXVlcnlEaXJlY3RpdmVdLFxyXG4gIHByb3ZpZGVyczogW1F1ZXJ5U2VydmljZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIElnb1F1ZXJ5TW9kdWxlIHtcclxuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5nTW9kdWxlOiBJZ29RdWVyeU1vZHVsZSxcclxuICAgICAgcHJvdmlkZXJzOiBbcHJvdmlkZVF1ZXJ5U2VhcmNoU291cmNlKCldXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=