/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { IgoActivityModule } from './activity/activity.module';
import { IgoConfigModule } from './config/config.module';
import { IgoLanguageModule } from './language/language.module';
import { IgoMessageModule } from './message/message.module';
import { IgoErrorModule } from './request/error.module';
var IgoCoreModule = /** @class */ (function () {
    function IgoCoreModule(matIconRegistry, domSanitizer) {
        matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/igo2/core/icons/mdi.svg'));
    }
    /**
     * @return {?}
     */
    IgoCoreModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: IgoCoreModule,
            providers: []
        };
    };
    IgoCoreModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        HttpClientModule,
                        IgoActivityModule.forRoot(),
                        IgoConfigModule.forRoot(),
                        IgoErrorModule.forRoot(),
                        IgoLanguageModule.forRoot(),
                        IgoMessageModule.forRoot()
                    ],
                    declarations: [],
                    exports: [
                        IgoActivityModule,
                        IgoConfigModule,
                        IgoErrorModule,
                        IgoLanguageModule,
                        IgoMessageModule
                    ]
                },] }
    ];
    /** @nocollapse */
    IgoCoreModule.ctorParameters = function () { return [
        { type: MatIconRegistry },
        { type: DomSanitizer }
    ]; };
    return IgoCoreModule;
}());
export { IgoCoreModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb3JlLyIsInNvdXJjZXMiOlsibGliL2NvcmUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUVwRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDekQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDL0QsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRXhEO0lBMkJFLHVCQUFZLGVBQWdDLEVBQUUsWUFBMEI7UUFDdEUsZUFBZSxDQUFDLGFBQWEsQ0FDM0IsWUFBWSxDQUFDLDhCQUE4QixDQUN6QyxrQ0FBa0MsQ0FDbkMsQ0FDRixDQUFDO0lBQ0osQ0FBQzs7OztJQWJNLHFCQUFPOzs7SUFBZDtRQUNFLE9BQU87WUFDTCxRQUFRLEVBQUUsYUFBYTtZQUN2QixTQUFTLEVBQUUsRUFBRTtTQUNkLENBQUM7SUFDSixDQUFDOztnQkF6QkYsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLGdCQUFnQjt3QkFDaEIsaUJBQWlCLENBQUMsT0FBTyxFQUFFO3dCQUMzQixlQUFlLENBQUMsT0FBTyxFQUFFO3dCQUN6QixjQUFjLENBQUMsT0FBTyxFQUFFO3dCQUN4QixpQkFBaUIsQ0FBQyxPQUFPLEVBQUU7d0JBQzNCLGdCQUFnQixDQUFDLE9BQU8sRUFBRTtxQkFDM0I7b0JBQ0QsWUFBWSxFQUFFLEVBQUU7b0JBQ2hCLE9BQU8sRUFBRTt3QkFDUCxpQkFBaUI7d0JBQ2pCLGVBQWU7d0JBQ2YsY0FBYzt3QkFDZCxpQkFBaUI7d0JBQ2pCLGdCQUFnQjtxQkFDakI7aUJBQ0Y7Ozs7Z0JBMUJRLGVBQWU7Z0JBRGYsWUFBWTs7SUEyQ3JCLG9CQUFDO0NBQUEsQUFsQ0QsSUFrQ0M7U0FmWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgRG9tU2FuaXRpemVyIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XHJcbmltcG9ydCB7IE1hdEljb25SZWdpc3RyeSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuXHJcbmltcG9ydCB7IElnb0FjdGl2aXR5TW9kdWxlIH0gZnJvbSAnLi9hY3Rpdml0eS9hY3Rpdml0eS5tb2R1bGUnO1xyXG5pbXBvcnQgeyBJZ29Db25maWdNb2R1bGUgfSBmcm9tICcuL2NvbmZpZy9jb25maWcubW9kdWxlJztcclxuaW1wb3J0IHsgSWdvTGFuZ3VhZ2VNb2R1bGUgfSBmcm9tICcuL2xhbmd1YWdlL2xhbmd1YWdlLm1vZHVsZSc7XHJcbmltcG9ydCB7IElnb01lc3NhZ2VNb2R1bGUgfSBmcm9tICcuL21lc3NhZ2UvbWVzc2FnZS5tb2R1bGUnO1xyXG5pbXBvcnQgeyBJZ29FcnJvck1vZHVsZSB9IGZyb20gJy4vcmVxdWVzdC9lcnJvci5tb2R1bGUnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBIdHRwQ2xpZW50TW9kdWxlLFxyXG4gICAgSWdvQWN0aXZpdHlNb2R1bGUuZm9yUm9vdCgpLFxyXG4gICAgSWdvQ29uZmlnTW9kdWxlLmZvclJvb3QoKSxcclxuICAgIElnb0Vycm9yTW9kdWxlLmZvclJvb3QoKSxcclxuICAgIElnb0xhbmd1YWdlTW9kdWxlLmZvclJvb3QoKSxcclxuICAgIElnb01lc3NhZ2VNb2R1bGUuZm9yUm9vdCgpXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIElnb0FjdGl2aXR5TW9kdWxlLFxyXG4gICAgSWdvQ29uZmlnTW9kdWxlLFxyXG4gICAgSWdvRXJyb3JNb2R1bGUsXHJcbiAgICBJZ29MYW5ndWFnZU1vZHVsZSxcclxuICAgIElnb01lc3NhZ2VNb2R1bGVcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJZ29Db3JlTW9kdWxlIHtcclxuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5nTW9kdWxlOiBJZ29Db3JlTW9kdWxlLFxyXG4gICAgICBwcm92aWRlcnM6IFtdXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IobWF0SWNvblJlZ2lzdHJ5OiBNYXRJY29uUmVnaXN0cnksIGRvbVNhbml0aXplcjogRG9tU2FuaXRpemVyKSB7XHJcbiAgICBtYXRJY29uUmVnaXN0cnkuYWRkU3ZnSWNvblNldChcclxuICAgICAgZG9tU2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RSZXNvdXJjZVVybChcclxuICAgICAgICAnLi9hc3NldHMvaWdvMi9jb3JlL2ljb25zL21kaS5zdmcnXHJcbiAgICAgIClcclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiJdfQ==