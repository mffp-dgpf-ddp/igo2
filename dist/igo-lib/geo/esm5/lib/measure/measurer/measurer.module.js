/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatButtonToggleModule, MatIconModule, MatTooltipModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatSlideToggleModule } from '@angular/material';
import { IgoLanguageModule } from '@igo2/core';
import { IgoEntityTableModule } from '@igo2/common';
import { MeasureFormatPipe } from './measure-format.pipe';
import { MeasurerItemComponent } from './measurer-item.component';
import { MeasurerComponent } from './measurer.component';
import { MeasurerDialogComponent } from './measurer-dialog.component';
/**
 * @ignore
 */
var IgoMeasurerModule = /** @class */ (function () {
    function IgoMeasurerModule() {
    }
    IgoMeasurerModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        MatButtonModule,
                        MatButtonToggleModule,
                        MatIconModule,
                        MatTooltipModule,
                        MatFormFieldModule,
                        MatInputModule,
                        MatSelectModule,
                        MatSlideToggleModule,
                        IgoLanguageModule,
                        IgoEntityTableModule
                    ],
                    declarations: [
                        MeasureFormatPipe,
                        MeasurerItemComponent,
                        MeasurerComponent,
                        MeasurerDialogComponent
                    ],
                    exports: [
                        MeasureFormatPipe,
                        MeasurerComponent
                    ],
                    entryComponents: [
                        MeasurerDialogComponent
                    ]
                },] }
    ];
    return IgoMeasurerModule;
}());
export { IgoMeasurerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVhc3VyZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL21lYXN1cmUvbWVhc3VyZXIvbWVhc3VyZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQ0wsZUFBZSxFQUNmLHFCQUFxQixFQUNyQixhQUFhLEVBQ2IsZ0JBQWdCLEVBQ2hCLGtCQUFrQixFQUNsQixjQUFjLEVBQ2QsZUFBZSxFQUNmLG9CQUFvQixFQUNyQixNQUFNLG1CQUFtQixDQUFDO0FBRTNCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUMvQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFcEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDMUQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDekQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sNkJBQTZCLENBQUM7Ozs7QUFLdEU7SUFBQTtJQTRCZ0MsQ0FBQzs7Z0JBNUJoQyxRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osZUFBZTt3QkFDZixxQkFBcUI7d0JBQ3JCLGFBQWE7d0JBQ2IsZ0JBQWdCO3dCQUNoQixrQkFBa0I7d0JBQ2xCLGNBQWM7d0JBQ2QsZUFBZTt3QkFDZixvQkFBb0I7d0JBQ3BCLGlCQUFpQjt3QkFDakIsb0JBQW9CO3FCQUNyQjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1osaUJBQWlCO3dCQUNqQixxQkFBcUI7d0JBQ3JCLGlCQUFpQjt3QkFDakIsdUJBQXVCO3FCQUN4QjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsaUJBQWlCO3dCQUNqQixpQkFBaUI7cUJBQ2xCO29CQUNELGVBQWUsRUFBRTt3QkFDZix1QkFBdUI7cUJBQ3hCO2lCQUNGOztJQUMrQix3QkFBQztDQUFBLEFBNUJqQyxJQTRCaUM7U0FBcEIsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7XHJcbiAgTWF0QnV0dG9uTW9kdWxlLFxyXG4gIE1hdEJ1dHRvblRvZ2dsZU1vZHVsZSxcclxuICBNYXRJY29uTW9kdWxlLFxyXG4gIE1hdFRvb2x0aXBNb2R1bGUsXHJcbiAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxyXG4gIE1hdElucHV0TW9kdWxlLFxyXG4gIE1hdFNlbGVjdE1vZHVsZSxcclxuICBNYXRTbGlkZVRvZ2dsZU1vZHVsZVxyXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuXHJcbmltcG9ydCB7IElnb0xhbmd1YWdlTW9kdWxlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcbmltcG9ydCB7IElnb0VudGl0eVRhYmxlTW9kdWxlIH0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IE1lYXN1cmVGb3JtYXRQaXBlIH0gZnJvbSAnLi9tZWFzdXJlLWZvcm1hdC5waXBlJztcclxuaW1wb3J0IHsgTWVhc3VyZXJJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi9tZWFzdXJlci1pdGVtLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE1lYXN1cmVyQ29tcG9uZW50IH0gZnJvbSAnLi9tZWFzdXJlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBNZWFzdXJlckRpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vbWVhc3VyZXItZGlhbG9nLmNvbXBvbmVudCc7XHJcblxyXG4vKipcclxuICogQGlnbm9yZVxyXG4gKi9cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgICBNYXRCdXR0b25Ub2dnbGVNb2R1bGUsXHJcbiAgICBNYXRJY29uTW9kdWxlLFxyXG4gICAgTWF0VG9vbHRpcE1vZHVsZSxcclxuICAgIE1hdEZvcm1GaWVsZE1vZHVsZSxcclxuICAgIE1hdElucHV0TW9kdWxlLFxyXG4gICAgTWF0U2VsZWN0TW9kdWxlLFxyXG4gICAgTWF0U2xpZGVUb2dnbGVNb2R1bGUsXHJcbiAgICBJZ29MYW5ndWFnZU1vZHVsZSxcclxuICAgIElnb0VudGl0eVRhYmxlTW9kdWxlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIE1lYXN1cmVGb3JtYXRQaXBlLFxyXG4gICAgTWVhc3VyZXJJdGVtQ29tcG9uZW50LFxyXG4gICAgTWVhc3VyZXJDb21wb25lbnQsXHJcbiAgICBNZWFzdXJlckRpYWxvZ0NvbXBvbmVudFxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgTWVhc3VyZUZvcm1hdFBpcGUsXHJcbiAgICBNZWFzdXJlckNvbXBvbmVudFxyXG4gIF0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbXHJcbiAgICBNZWFzdXJlckRpYWxvZ0NvbXBvbmVudFxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIElnb01lYXN1cmVyTW9kdWxlIHt9XHJcbiJdfQ==