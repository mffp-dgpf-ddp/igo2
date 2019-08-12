/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule } from '@angular/material';
import { IgoLanguageModule } from '@igo2/core';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { ConfirmDialogService } from './confirm-dialog.service';
export class IgoConfirmDialogModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoConfirmDialogModule,
            providers: []
        };
    }
}
IgoConfirmDialogModule.decorators = [
    { type: NgModule, args: [{
                imports: [MatButtonModule, MatDialogModule, IgoLanguageModule],
                declarations: [ConfirmDialogComponent],
                exports: [ConfirmDialogComponent],
                providers: [ConfirmDialogService],
                entryComponents: [ConfirmDialogComponent]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlybS1kaWFsb2cubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29tbW9uLyIsInNvdXJjZXMiOlsibGliL2NvbmZpcm0tZGlhbG9nL2NvbmZpcm0tZGlhbG9nLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUVyRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFFL0MsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDcEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFTaEUsTUFBTSxPQUFPLHNCQUFzQjs7OztJQUNqQyxNQUFNLENBQUMsT0FBTztRQUNaLE9BQU87WUFDTCxRQUFRLEVBQUUsc0JBQXNCO1lBQ2hDLFNBQVMsRUFBRSxFQUFFO1NBQ2QsQ0FBQztJQUNKLENBQUM7OztZQWJGLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUUsQ0FBQyxlQUFlLEVBQUUsZUFBZSxFQUFFLGlCQUFpQixDQUFDO2dCQUM5RCxZQUFZLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztnQkFDdEMsT0FBTyxFQUFFLENBQUMsc0JBQXNCLENBQUM7Z0JBQ2pDLFNBQVMsRUFBRSxDQUFDLG9CQUFvQixDQUFDO2dCQUNqQyxlQUFlLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQzthQUMxQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE1hdEJ1dHRvbk1vZHVsZSwgTWF0RGlhbG9nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5cclxuaW1wb3J0IHsgSWdvTGFuZ3VhZ2VNb2R1bGUgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuXHJcbmltcG9ydCB7IENvbmZpcm1EaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL2NvbmZpcm0tZGlhbG9nLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IENvbmZpcm1EaWFsb2dTZXJ2aWNlIH0gZnJvbSAnLi9jb25maXJtLWRpYWxvZy5zZXJ2aWNlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW01hdEJ1dHRvbk1vZHVsZSwgTWF0RGlhbG9nTW9kdWxlLCBJZ29MYW5ndWFnZU1vZHVsZV0sXHJcbiAgZGVjbGFyYXRpb25zOiBbQ29uZmlybURpYWxvZ0NvbXBvbmVudF0sXHJcbiAgZXhwb3J0czogW0NvbmZpcm1EaWFsb2dDb21wb25lbnRdLFxyXG4gIHByb3ZpZGVyczogW0NvbmZpcm1EaWFsb2dTZXJ2aWNlXSxcclxuICBlbnRyeUNvbXBvbmVudHM6IFtDb25maXJtRGlhbG9nQ29tcG9uZW50XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgSWdvQ29uZmlybURpYWxvZ01vZHVsZSB7XHJcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZ01vZHVsZTogSWdvQ29uZmlybURpYWxvZ01vZHVsZSxcclxuICAgICAgcHJvdmlkZXJzOiBbXVxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19