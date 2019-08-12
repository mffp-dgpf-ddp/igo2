/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule, MatTooltipModule, MatListModule, MatMenuModule, MatCardModule } from '@angular/material';
import { IgoLanguageModule } from '@igo2/core';
import { ActionbarComponent } from './actionbar.component';
import { ActionbarItemComponent } from './actionbar-item.component';
/**
 * @ignore
 */
export class IgoActionbarModule {
}
IgoActionbarModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    IgoLanguageModule,
                    MatButtonModule,
                    MatIconModule,
                    MatTooltipModule,
                    MatMenuModule,
                    MatListModule,
                    MatCardModule
                ],
                exports: [ActionbarComponent],
                declarations: [ActionbarComponent, ActionbarItemComponent]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uYmFyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9hY3Rpb24vYWN0aW9uYmFyL2FjdGlvbmJhci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFDTCxlQUFlLEVBQ2YsYUFBYSxFQUNiLGdCQUFnQixFQUNoQixhQUFhLEVBQ2IsYUFBYSxFQUNiLGFBQWEsRUFDZCxNQUFNLG1CQUFtQixDQUFDO0FBRTNCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUUvQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7OztBQW1CcEUsTUFBTSxPQUFPLGtCQUFrQjs7O1lBZDlCLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUU7b0JBQ1AsWUFBWTtvQkFDWixpQkFBaUI7b0JBQ2pCLGVBQWU7b0JBQ2YsYUFBYTtvQkFDYixnQkFBZ0I7b0JBQ2hCLGFBQWE7b0JBQ2IsYUFBYTtvQkFDYixhQUFhO2lCQUNkO2dCQUNELE9BQU8sRUFBRSxDQUFDLGtCQUFrQixDQUFDO2dCQUM3QixZQUFZLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxzQkFBc0IsQ0FBQzthQUMzRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5pbXBvcnQge1xyXG4gIE1hdEJ1dHRvbk1vZHVsZSxcclxuICBNYXRJY29uTW9kdWxlLFxyXG4gIE1hdFRvb2x0aXBNb2R1bGUsXHJcbiAgTWF0TGlzdE1vZHVsZSxcclxuICBNYXRNZW51TW9kdWxlLFxyXG4gIE1hdENhcmRNb2R1bGVcclxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcblxyXG5pbXBvcnQgeyBJZ29MYW5ndWFnZU1vZHVsZSB9IGZyb20gJ0BpZ28yL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgQWN0aW9uYmFyQ29tcG9uZW50IH0gZnJvbSAnLi9hY3Rpb25iYXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQWN0aW9uYmFySXRlbUNvbXBvbmVudCB9IGZyb20gJy4vYWN0aW9uYmFyLWl0ZW0uY29tcG9uZW50JztcclxuXHJcbi8qKlxyXG4gKiBAaWdub3JlXHJcbiAqL1xyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIElnb0xhbmd1YWdlTW9kdWxlLFxyXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxyXG4gICAgTWF0SWNvbk1vZHVsZSxcclxuICAgIE1hdFRvb2x0aXBNb2R1bGUsXHJcbiAgICBNYXRNZW51TW9kdWxlLFxyXG4gICAgTWF0TGlzdE1vZHVsZSxcclxuICAgIE1hdENhcmRNb2R1bGVcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtBY3Rpb25iYXJDb21wb25lbnRdLFxyXG4gIGRlY2xhcmF0aW9uczogW0FjdGlvbmJhckNvbXBvbmVudCwgQWN0aW9uYmFySXRlbUNvbXBvbmVudF1cclxufSlcclxuZXhwb3J0IGNsYXNzIElnb0FjdGlvbmJhck1vZHVsZSB7fVxyXG4iXX0=