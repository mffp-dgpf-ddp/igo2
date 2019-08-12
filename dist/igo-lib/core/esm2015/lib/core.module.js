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
export class IgoCoreModule {
    /**
     * @param {?} matIconRegistry
     * @param {?} domSanitizer
     */
    constructor(matIconRegistry, domSanitizer) {
        matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/igo2/core/icons/mdi.svg'));
    }
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoCoreModule,
            providers: []
        };
    }
}
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
IgoCoreModule.ctorParameters = () => [
    { type: MatIconRegistry },
    { type: DomSanitizer }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb3JlLyIsInNvdXJjZXMiOlsibGliL2NvcmUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUVwRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDekQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDL0QsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBcUJ4RCxNQUFNLE9BQU8sYUFBYTs7Ozs7SUFReEIsWUFBWSxlQUFnQyxFQUFFLFlBQTBCO1FBQ3RFLGVBQWUsQ0FBQyxhQUFhLENBQzNCLFlBQVksQ0FBQyw4QkFBOEIsQ0FDekMsa0NBQWtDLENBQ25DLENBQ0YsQ0FBQztJQUNKLENBQUM7Ozs7SUFiRCxNQUFNLENBQUMsT0FBTztRQUNaLE9BQU87WUFDTCxRQUFRLEVBQUUsYUFBYTtZQUN2QixTQUFTLEVBQUUsRUFBRTtTQUNkLENBQUM7SUFDSixDQUFDOzs7WUF6QkYsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxZQUFZO29CQUNaLGdCQUFnQjtvQkFDaEIsaUJBQWlCLENBQUMsT0FBTyxFQUFFO29CQUMzQixlQUFlLENBQUMsT0FBTyxFQUFFO29CQUN6QixjQUFjLENBQUMsT0FBTyxFQUFFO29CQUN4QixpQkFBaUIsQ0FBQyxPQUFPLEVBQUU7b0JBQzNCLGdCQUFnQixDQUFDLE9BQU8sRUFBRTtpQkFDM0I7Z0JBQ0QsWUFBWSxFQUFFLEVBQUU7Z0JBQ2hCLE9BQU8sRUFBRTtvQkFDUCxpQkFBaUI7b0JBQ2pCLGVBQWU7b0JBQ2YsY0FBYztvQkFDZCxpQkFBaUI7b0JBQ2pCLGdCQUFnQjtpQkFDakI7YUFDRjs7OztZQTFCUSxlQUFlO1lBRGYsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IERvbVNhbml0aXplciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xyXG5pbXBvcnQgeyBNYXRJY29uUmVnaXN0cnkgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcblxyXG5pbXBvcnQgeyBJZ29BY3Rpdml0eU1vZHVsZSB9IGZyb20gJy4vYWN0aXZpdHkvYWN0aXZpdHkubW9kdWxlJztcclxuaW1wb3J0IHsgSWdvQ29uZmlnTW9kdWxlIH0gZnJvbSAnLi9jb25maWcvY29uZmlnLm1vZHVsZSc7XHJcbmltcG9ydCB7IElnb0xhbmd1YWdlTW9kdWxlIH0gZnJvbSAnLi9sYW5ndWFnZS9sYW5ndWFnZS5tb2R1bGUnO1xyXG5pbXBvcnQgeyBJZ29NZXNzYWdlTW9kdWxlIH0gZnJvbSAnLi9tZXNzYWdlL21lc3NhZ2UubW9kdWxlJztcclxuaW1wb3J0IHsgSWdvRXJyb3JNb2R1bGUgfSBmcm9tICcuL3JlcXVlc3QvZXJyb3IubW9kdWxlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgSHR0cENsaWVudE1vZHVsZSxcclxuICAgIElnb0FjdGl2aXR5TW9kdWxlLmZvclJvb3QoKSxcclxuICAgIElnb0NvbmZpZ01vZHVsZS5mb3JSb290KCksXHJcbiAgICBJZ29FcnJvck1vZHVsZS5mb3JSb290KCksXHJcbiAgICBJZ29MYW5ndWFnZU1vZHVsZS5mb3JSb290KCksXHJcbiAgICBJZ29NZXNzYWdlTW9kdWxlLmZvclJvb3QoKVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBJZ29BY3Rpdml0eU1vZHVsZSxcclxuICAgIElnb0NvbmZpZ01vZHVsZSxcclxuICAgIElnb0Vycm9yTW9kdWxlLFxyXG4gICAgSWdvTGFuZ3VhZ2VNb2R1bGUsXHJcbiAgICBJZ29NZXNzYWdlTW9kdWxlXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgSWdvQ29yZU1vZHVsZSB7XHJcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZ01vZHVsZTogSWdvQ29yZU1vZHVsZSxcclxuICAgICAgcHJvdmlkZXJzOiBbXVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKG1hdEljb25SZWdpc3RyeTogTWF0SWNvblJlZ2lzdHJ5LCBkb21TYW5pdGl6ZXI6IERvbVNhbml0aXplcikge1xyXG4gICAgbWF0SWNvblJlZ2lzdHJ5LmFkZFN2Z0ljb25TZXQoXHJcbiAgICAgIGRvbVNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0UmVzb3VyY2VVcmwoXHJcbiAgICAgICAgJy4vYXNzZXRzL2lnbzIvY29yZS9pY29ucy9tZGkuc3ZnJ1xyXG4gICAgICApXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iXX0=