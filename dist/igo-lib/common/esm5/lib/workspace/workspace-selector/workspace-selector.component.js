/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { getEntityTitle } from '../../entity';
import { WorkspaceStore } from '../shared/store';
/**
 * Drop list that activates the selected workspace emit an event.
 */
var WorkspaceSelectorComponent = /** @class */ (function () {
    function WorkspaceSelectorComponent() {
        /**
         * Event emitted when an workspace is selected or unselected
         */
        this.selectedChange = new EventEmitter();
    }
    /**
     * @internal
     */
    /**
     * \@internal
     * @param {?} workspace
     * @return {?}
     */
    WorkspaceSelectorComponent.prototype.getWorkspaceTitle = /**
     * \@internal
     * @param {?} workspace
     * @return {?}
     */
    function (workspace) {
        return getEntityTitle(workspace);
    };
    /**
     * When an workspace is manually selected, select it into the
     * store and emit an event.
     * @internal
     * @param event The selection change event
     */
    /**
     * When an workspace is manually selected, select it into the
     * store and emit an event.
     * \@internal
     * @param {?} event The selection change event
     * @return {?}
     */
    WorkspaceSelectorComponent.prototype.onSelectedChange = /**
     * When an workspace is manually selected, select it into the
     * store and emit an event.
     * \@internal
     * @param {?} event The selection change event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var workspace = event.value;
        this.store.activateWorkspace(workspace);
        this.selectedChange.emit({ selected: true, value: workspace });
    };
    WorkspaceSelectorComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-workspace-selector',
                    template: "<igo-entity-selector\r\n  [store]=\"store\"\r\n  [many]=\"false\"\r\n  [titleAccessor]=\"getWorkspaceTitle\"\r\n  (selectedChange)=\"onSelectedChange($event)\">\r\n</igo-entity-selector>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: ["igo-entity-selector ::ng-deep mat-form-field .mat-form-field-infix{padding:0}igo-entity-selector ::ng-deep mat-form-field .mat-form-field-wrapper{padding-bottom:1.75em}"]
                }] }
    ];
    WorkspaceSelectorComponent.propDecorators = {
        store: [{ type: Input }],
        selectedChange: [{ type: Output }]
    };
    return WorkspaceSelectorComponent;
}());
export { WorkspaceSelectorComponent };
if (false) {
    /**
     * Store that holds the available workspaces.
     * @type {?}
     */
    WorkspaceSelectorComponent.prototype.store;
    /**
     * Event emitted when an workspace is selected or unselected
     * @type {?}
     */
    WorkspaceSelectorComponent.prototype.selectedChange;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya3NwYWNlLXNlbGVjdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi93b3Jrc3BhY2Uvd29ya3NwYWNlLXNlbGVjdG9yL3dvcmtzcGFjZS1zZWxlY3Rvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osdUJBQXVCLEVBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFOUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7O0FBS2pEO0lBQUE7Ozs7UUFnQlksbUJBQWMsR0FBRyxJQUFJLFlBQVksRUFHdkMsQ0FBQztJQXFCUCxDQUFDO0lBbkJDOztPQUVHOzs7Ozs7SUFDSCxzREFBaUI7Ozs7O0lBQWpCLFVBQWtCLFNBQW9CO1FBQ3BDLE9BQU8sY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRDs7Ozs7T0FLRzs7Ozs7Ozs7SUFDSCxxREFBZ0I7Ozs7Ozs7SUFBaEIsVUFBaUIsS0FBeUI7O1lBQ2xDLFNBQVMsR0FBRyxLQUFLLENBQUMsS0FBSztRQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFDLENBQUMsQ0FBQztJQUMvRCxDQUFDOztnQkF0Q0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSx3QkFBd0I7b0JBQ2xDLDBNQUFrRDtvQkFFbEQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2lCQUNoRDs7O3dCQU1FLEtBQUs7aUNBS0wsTUFBTTs7SUF3QlQsaUNBQUM7Q0FBQSxBQXhDRCxJQXdDQztTQWxDWSwwQkFBMEI7Ozs7OztJQUtyQywyQ0FBK0I7Ozs7O0lBSy9CLG9EQUdLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneVxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgZ2V0RW50aXR5VGl0bGUgfSBmcm9tICcuLi8uLi9lbnRpdHknO1xyXG5pbXBvcnQgeyBXb3Jrc3BhY2UgfSBmcm9tICcuLi9zaGFyZWQvd29ya3NwYWNlJztcclxuaW1wb3J0IHsgV29ya3NwYWNlU3RvcmUgfSBmcm9tICcuLi9zaGFyZWQvc3RvcmUnO1xyXG5cclxuLyoqXHJcbiAqIERyb3AgbGlzdCB0aGF0IGFjdGl2YXRlcyB0aGUgc2VsZWN0ZWQgd29ya3NwYWNlIGVtaXQgYW4gZXZlbnQuXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby13b3Jrc3BhY2Utc2VsZWN0b3InLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi93b3Jrc3BhY2Utc2VsZWN0b3IuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3dvcmtzcGFjZS1zZWxlY3Rvci5jb21wb25lbnQuc2NzcyddLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBXb3Jrc3BhY2VTZWxlY3RvckNvbXBvbmVudCB7XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0b3JlIHRoYXQgaG9sZHMgdGhlIGF2YWlsYWJsZSB3b3Jrc3BhY2VzLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHN0b3JlOiBXb3Jrc3BhY2VTdG9yZTtcclxuXHJcbiAgLyoqXHJcbiAgICogRXZlbnQgZW1pdHRlZCB3aGVuIGFuIHdvcmtzcGFjZSBpcyBzZWxlY3RlZCBvciB1bnNlbGVjdGVkXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHNlbGVjdGVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjx7XHJcbiAgICBzZWxlY3RlZDogYm9vbGVhbjtcclxuICAgIHZhbHVlOiBXb3Jrc3BhY2U7XHJcbiAgfT4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0V29ya3NwYWNlVGl0bGUod29ya3NwYWNlOiBXb3Jrc3BhY2UpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIGdldEVudGl0eVRpdGxlKHdvcmtzcGFjZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIGFuIHdvcmtzcGFjZSBpcyBtYW51YWxseSBzZWxlY3RlZCwgc2VsZWN0IGl0IGludG8gdGhlXHJcbiAgICogc3RvcmUgYW5kIGVtaXQgYW4gZXZlbnQuXHJcbiAgICogQGludGVybmFsXHJcbiAgICogQHBhcmFtIGV2ZW50IFRoZSBzZWxlY3Rpb24gY2hhbmdlIGV2ZW50XHJcbiAgICovXHJcbiAgb25TZWxlY3RlZENoYW5nZShldmVudDoge3ZhbHVlOiBXb3Jrc3BhY2V9KSB7XHJcbiAgICBjb25zdCB3b3Jrc3BhY2UgPSBldmVudC52YWx1ZTtcclxuICAgIHRoaXMuc3RvcmUuYWN0aXZhdGVXb3Jrc3BhY2Uod29ya3NwYWNlKTtcclxuICAgIHRoaXMuc2VsZWN0ZWRDaGFuZ2UuZW1pdCh7c2VsZWN0ZWQ6IHRydWUsIHZhbHVlOiB3b3Jrc3BhY2V9KTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==