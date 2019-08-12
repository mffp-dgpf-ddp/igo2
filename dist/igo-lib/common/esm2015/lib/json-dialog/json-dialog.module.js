/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatDialogModule } from '@angular/material';
import { IgoKeyValueModule } from '../keyvalue/keyvalue.module';
import { JsonDialogComponent } from './json-dialog.component';
import { JsonDialogService } from './json-dialog.service';
export class IgoJsonDialogModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: IgoJsonDialogModule
        };
    }
}
IgoJsonDialogModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, MatButtonModule, MatDialogModule, IgoKeyValueModule],
                exports: [JsonDialogComponent],
                declarations: [JsonDialogComponent],
                entryComponents: [JsonDialogComponent],
                providers: [JsonDialogService]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi1kaWFsb2cubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29tbW9uLyIsInNvdXJjZXMiOlsibGliL2pzb24tZGlhbG9nL2pzb24tZGlhbG9nLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFckUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFaEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFTMUQsTUFBTSxPQUFPLG1CQUFtQjs7OztJQUM5QixNQUFNLENBQUMsT0FBTztRQUNaLE9BQU87WUFDTCxRQUFRLEVBQUUsbUJBQW1CO1NBQzlCLENBQUM7SUFDSixDQUFDOzs7WUFaRixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsaUJBQWlCLENBQUM7Z0JBQzVFLE9BQU8sRUFBRSxDQUFDLG1CQUFtQixDQUFDO2dCQUM5QixZQUFZLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztnQkFDbkMsZUFBZSxFQUFFLENBQUMsbUJBQW1CLENBQUM7Z0JBQ3RDLFNBQVMsRUFBRSxDQUFDLGlCQUFpQixDQUFDO2FBQy9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgTWF0QnV0dG9uTW9kdWxlLCBNYXREaWFsb2dNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcblxyXG5pbXBvcnQgeyBJZ29LZXlWYWx1ZU1vZHVsZSB9IGZyb20gJy4uL2tleXZhbHVlL2tleXZhbHVlLm1vZHVsZSc7XHJcblxyXG5pbXBvcnQgeyBKc29uRGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi9qc29uLWRpYWxvZy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBKc29uRGlhbG9nU2VydmljZSB9IGZyb20gJy4vanNvbi1kaWFsb2cuc2VydmljZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIE1hdEJ1dHRvbk1vZHVsZSwgTWF0RGlhbG9nTW9kdWxlLCBJZ29LZXlWYWx1ZU1vZHVsZV0sXHJcbiAgZXhwb3J0czogW0pzb25EaWFsb2dDb21wb25lbnRdLFxyXG4gIGRlY2xhcmF0aW9uczogW0pzb25EaWFsb2dDb21wb25lbnRdLFxyXG4gIGVudHJ5Q29tcG9uZW50czogW0pzb25EaWFsb2dDb21wb25lbnRdLFxyXG4gIHByb3ZpZGVyczogW0pzb25EaWFsb2dTZXJ2aWNlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgSWdvSnNvbkRpYWxvZ01vZHVsZSB7XHJcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZ01vZHVsZTogSWdvSnNvbkRpYWxvZ01vZHVsZVxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19