/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatSortModule, MatIconModule, MatButtonModule, MatCheckboxModule } from '@angular/material';
import { IgoStopPropagationModule } from '../../stop-propagation/stop-propagation.module';
import { IgoCustomHtmlModule } from '../../custom-html/custom-html.module';
import { EntityTableRowDirective } from './entity-table-row.directive';
import { EntityTableComponent } from './entity-table.component';
/**
 * @ignore
 */
export class IgoEntityTableModule {
}
IgoEntityTableModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    MatTableModule,
                    MatSortModule,
                    MatIconModule,
                    MatButtonModule,
                    MatCheckboxModule,
                    IgoStopPropagationModule,
                    IgoCustomHtmlModule
                ],
                exports: [
                    EntityTableComponent
                ],
                declarations: [
                    EntityTableComponent,
                    EntityTableRowDirective
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50aXR5LXRhYmxlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9lbnRpdHkvZW50aXR5LXRhYmxlL2VudGl0eS10YWJsZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFDTCxjQUFjLEVBQ2QsYUFBYSxFQUNiLGFBQWEsRUFDYixlQUFlLEVBQ2YsaUJBQWlCLEVBQ2xCLE1BQU0sbUJBQW1CLENBQUM7QUFFM0IsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDMUYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDM0UsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDdkUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7Ozs7QUF3QmhFLE1BQU0sT0FBTyxvQkFBb0I7OztZQW5CaEMsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxZQUFZO29CQUNaLGNBQWM7b0JBQ2QsYUFBYTtvQkFDYixhQUFhO29CQUNiLGVBQWU7b0JBQ2YsaUJBQWlCO29CQUNqQix3QkFBd0I7b0JBQ3hCLG1CQUFtQjtpQkFDcEI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLG9CQUFvQjtpQkFDckI7Z0JBQ0QsWUFBWSxFQUFFO29CQUNaLG9CQUFvQjtvQkFDcEIsdUJBQXVCO2lCQUN4QjthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHtcclxuICBNYXRUYWJsZU1vZHVsZSxcclxuICBNYXRTb3J0TW9kdWxlLFxyXG4gIE1hdEljb25Nb2R1bGUsXHJcbiAgTWF0QnV0dG9uTW9kdWxlLFxyXG4gIE1hdENoZWNrYm94TW9kdWxlXHJcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5cclxuaW1wb3J0IHsgSWdvU3RvcFByb3BhZ2F0aW9uTW9kdWxlIH0gZnJvbSAnLi4vLi4vc3RvcC1wcm9wYWdhdGlvbi9zdG9wLXByb3BhZ2F0aW9uLm1vZHVsZSc7XHJcbmltcG9ydCB7IElnb0N1c3RvbUh0bWxNb2R1bGUgfSBmcm9tICcuLi8uLi9jdXN0b20taHRtbC9jdXN0b20taHRtbC5tb2R1bGUnO1xyXG5pbXBvcnQgeyBFbnRpdHlUYWJsZVJvd0RpcmVjdGl2ZSB9IGZyb20gJy4vZW50aXR5LXRhYmxlLXJvdy5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBFbnRpdHlUYWJsZUNvbXBvbmVudCB9IGZyb20gJy4vZW50aXR5LXRhYmxlLmNvbXBvbmVudCc7XHJcblxyXG4vKipcclxuICogQGlnbm9yZVxyXG4gKi9cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBNYXRUYWJsZU1vZHVsZSxcclxuICAgIE1hdFNvcnRNb2R1bGUsXHJcbiAgICBNYXRJY29uTW9kdWxlLFxyXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxyXG4gICAgTWF0Q2hlY2tib3hNb2R1bGUsXHJcbiAgICBJZ29TdG9wUHJvcGFnYXRpb25Nb2R1bGUsXHJcbiAgICBJZ29DdXN0b21IdG1sTW9kdWxlXHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBFbnRpdHlUYWJsZUNvbXBvbmVudFxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBFbnRpdHlUYWJsZUNvbXBvbmVudCxcclxuICAgIEVudGl0eVRhYmxlUm93RGlyZWN0aXZlXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgSWdvRW50aXR5VGFibGVNb2R1bGUge31cclxuIl19