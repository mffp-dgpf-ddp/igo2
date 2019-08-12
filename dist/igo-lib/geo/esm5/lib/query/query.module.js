/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QueryDirective } from './shared/query.directive';
import { QueryService } from './shared/query.service';
import { provideQuerySearchSource } from './shared/query-search-source.providers';
var IgoQueryModule = /** @class */ (function () {
    function IgoQueryModule() {
    }
    /**
     * @return {?}
     */
    IgoQueryModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: IgoQueryModule,
            providers: [provideQuerySearchSource()]
        };
    };
    IgoQueryModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    exports: [QueryDirective],
                    declarations: [QueryDirective],
                    providers: [QueryService]
                },] }
    ];
    return IgoQueryModule;
}());
export { IgoQueryModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnkubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL3F1ZXJ5L3F1ZXJ5Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdEQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFFbEY7SUFBQTtJQWFBLENBQUM7Ozs7SUFOUSxzQkFBTzs7O0lBQWQ7UUFDRSxPQUFPO1lBQ0wsUUFBUSxFQUFFLGNBQWM7WUFDeEIsU0FBUyxFQUFFLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztTQUN4QyxDQUFDO0lBQ0osQ0FBQzs7Z0JBWkYsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztvQkFDdkIsT0FBTyxFQUFFLENBQUMsY0FBYyxDQUFDO29CQUN6QixZQUFZLEVBQUUsQ0FBQyxjQUFjLENBQUM7b0JBQzlCLFNBQVMsRUFBRSxDQUFDLFlBQVksQ0FBQztpQkFDMUI7O0lBUUQscUJBQUM7Q0FBQSxBQWJELElBYUM7U0FQWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IFF1ZXJ5RGlyZWN0aXZlIH0gZnJvbSAnLi9zaGFyZWQvcXVlcnkuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgUXVlcnlTZXJ2aWNlIH0gZnJvbSAnLi9zaGFyZWQvcXVlcnkuc2VydmljZSc7XHJcbmltcG9ydCB7IHByb3ZpZGVRdWVyeVNlYXJjaFNvdXJjZSB9IGZyb20gJy4vc2hhcmVkL3F1ZXJ5LXNlYXJjaC1zb3VyY2UucHJvdmlkZXJzJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXHJcbiAgZXhwb3J0czogW1F1ZXJ5RGlyZWN0aXZlXSxcclxuICBkZWNsYXJhdGlvbnM6IFtRdWVyeURpcmVjdGl2ZV0sXHJcbiAgcHJvdmlkZXJzOiBbUXVlcnlTZXJ2aWNlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgSWdvUXVlcnlNb2R1bGUge1xyXG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmdNb2R1bGU6IElnb1F1ZXJ5TW9kdWxlLFxyXG4gICAgICBwcm92aWRlcnM6IFtwcm92aWRlUXVlcnlTZWFyY2hTb3VyY2UoKV1cclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==