/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Workspace } from '../shared/workspace';
/**
 * This component dynamically render an Workspace's active widget.
 * It also deactivate that widget whenever the widget's component
 * emit the 'cancel' or 'complete' event.
 */
export class WorkspaceWidgetOutletComponent {
    constructor() {
        /**
         * Event emitted when a widget is deactivate which happens
         * when the widget's component emits the 'cancel' or 'complete' event.
         */
        this.deactivateWidget = new EventEmitter();
    }
    /**
     * Observable of the workspace's active widget
     * \@internal
     * @return {?}
     */
    get widget$() { return this.workspace.widget$; }
    /**
     * Observable of the workspace's widget inputs
     * \@internal
     * @return {?}
     */
    get widgetInputs$() {
        return this.workspace.widgetInputs$;
    }
    /**
     * Observable of the workspace's widget inputs
     * \@internal
     * @return {?}
     */
    get widgetSubscribers$() {
        return this.workspace.widgetSubscribers$;
    }
    /**
     * When a widget's component emit the 'cancel' event,
     * deactivate that widget and emit the 'deactivateWidget' event.
     * \@internal
     * @param {?} widget Widget
     * @return {?}
     */
    onWidgetCancel(widget) {
        this.workspace.deactivateWidget();
        this.deactivateWidget.emit(widget);
    }
    /**
     * When a widget's component emit the 'cancel' event,
     * deactivate that widget and emit the 'deactivateWidget' event.
     * \@internal
     * @param {?} widget Widget
     * @return {?}
     */
    onWidgetComplete(widget) {
        this.workspace.deactivateWidget();
        this.deactivateWidget.emit(widget);
    }
}
WorkspaceWidgetOutletComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-workspace-widget-outlet',
                template: "<ng-container *ngIf=\"widget$ | async as widget\">\r\n  <igo-widget-outlet\r\n    [widget]=\"widget\"\r\n    [inputs]=\"widgetInputs$ | async\"\r\n    [subscribers]=\"widgetSubscribers$ | async\"\r\n    (cancel)=\"onWidgetCancel(widget)\"\r\n    (complete)=\"onWidgetComplete(widget)\">\r\n  </igo-widget-outlet>\r\n</ng-container>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["igo-widget-outlet{height:100%}"]
            }] }
];
/** @nocollapse */
WorkspaceWidgetOutletComponent.ctorParameters = () => [];
WorkspaceWidgetOutletComponent.propDecorators = {
    workspace: [{ type: Input }],
    deactivateWidget: [{ type: Output }]
};
if (false) {
    /**
     * Workspace
     * @type {?}
     */
    WorkspaceWidgetOutletComponent.prototype.workspace;
    /**
     * Event emitted when a widget is deactivate which happens
     * when the widget's component emits the 'cancel' or 'complete' event.
     * @type {?}
     */
    WorkspaceWidgetOutletComponent.prototype.deactivateWidget;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya3NwYWNlLXdpZGdldC1vdXRsZXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29tbW9uLyIsInNvdXJjZXMiOlsibGliL3dvcmtzcGFjZS93b3Jrc3BhY2Utd2lkZ2V0LW91dGxldC93b3Jrc3BhY2Utd2lkZ2V0LW91dGxldC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osdUJBQXVCLEVBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBS3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7Ozs7O0FBYWhELE1BQU0sT0FBTyw4QkFBOEI7SUFtQ3pDOzs7OztRQXhCVSxxQkFBZ0IsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO0lBd0J6QyxDQUFDOzs7Ozs7SUFsQmhCLElBQUksT0FBTyxLQUE4QixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzs7Ozs7O0lBTXpFLElBQUksYUFBYTtRQUNmLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUM7SUFDdEMsQ0FBQzs7Ozs7O0lBTUQsSUFBSSxrQkFBa0I7UUFDcEIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDO0lBQzNDLENBQUM7Ozs7Ozs7O0lBVUQsY0FBYyxDQUFDLE1BQWM7UUFDM0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDckMsQ0FBQzs7Ozs7Ozs7SUFRRCxnQkFBZ0IsQ0FBQyxNQUFjO1FBQzdCLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUNsQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3JDLENBQUM7OztZQS9ERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDZCQUE2QjtnQkFDdkMsMlZBQXVEO2dCQUV2RCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7YUFDaEQ7Ozs7O3dCQU1FLEtBQUs7K0JBTUwsTUFBTTs7Ozs7OztJQU5QLG1EQUE4Qjs7Ozs7O0lBTTlCLDBEQUF3RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3lcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgV2lkZ2V0IH0gZnJvbSAnLi4vLi4vd2lkZ2V0JztcclxuaW1wb3J0IHsgV29ya3NwYWNlIH0gZnJvbSAnLi4vc2hhcmVkL3dvcmtzcGFjZSc7XHJcblxyXG4vKipcclxuICogVGhpcyBjb21wb25lbnQgZHluYW1pY2FsbHkgcmVuZGVyIGFuIFdvcmtzcGFjZSdzIGFjdGl2ZSB3aWRnZXQuXHJcbiAqIEl0IGFsc28gZGVhY3RpdmF0ZSB0aGF0IHdpZGdldCB3aGVuZXZlciB0aGUgd2lkZ2V0J3MgY29tcG9uZW50XHJcbiAqIGVtaXQgdGhlICdjYW5jZWwnIG9yICdjb21wbGV0ZScgZXZlbnQuXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby13b3Jrc3BhY2Utd2lkZ2V0LW91dGxldCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3dvcmtzcGFjZS13aWRnZXQtb3V0bGV0LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi93b3Jrc3BhY2Utd2lkZ2V0LW91dGxldC5jb21wb25lbnQuc2NzcyddLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBXb3Jrc3BhY2VXaWRnZXRPdXRsZXRDb21wb25lbnQge1xyXG5cclxuICAvKipcclxuICAgKiBXb3Jrc3BhY2VcclxuICAgKi9cclxuICBASW5wdXQoKSB3b3Jrc3BhY2U6IFdvcmtzcGFjZTtcclxuXHJcbiAgLyoqXHJcbiAgICogRXZlbnQgZW1pdHRlZCB3aGVuIGEgd2lkZ2V0IGlzIGRlYWN0aXZhdGUgd2hpY2ggaGFwcGVuc1xyXG4gICAqIHdoZW4gdGhlIHdpZGdldCdzIGNvbXBvbmVudCBlbWl0cyB0aGUgJ2NhbmNlbCcgb3IgJ2NvbXBsZXRlJyBldmVudC5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgZGVhY3RpdmF0ZVdpZGdldCA9IG5ldyBFdmVudEVtaXR0ZXI8V2lkZ2V0PigpO1xyXG5cclxuICAvKipcclxuICAgKiBPYnNlcnZhYmxlIG9mIHRoZSB3b3Jrc3BhY2UncyBhY3RpdmUgd2lkZ2V0XHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0IHdpZGdldCQoKTogQmVoYXZpb3JTdWJqZWN0PFdpZGdldD4geyByZXR1cm4gdGhpcy53b3Jrc3BhY2Uud2lkZ2V0JDsgfVxyXG5cclxuICAvKipcclxuICAgKiBPYnNlcnZhYmxlIG9mIHRoZSB3b3Jrc3BhY2UncyB3aWRnZXQgaW5wdXRzXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0IHdpZGdldElucHV0cyQoKTogQmVoYXZpb3JTdWJqZWN0PHtba2V5OiBzdHJpbmddOiBhbnl9PiB7XHJcbiAgICByZXR1cm4gdGhpcy53b3Jrc3BhY2Uud2lkZ2V0SW5wdXRzJDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9ic2VydmFibGUgb2YgdGhlIHdvcmtzcGFjZSdzIHdpZGdldCBpbnB1dHNcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBnZXQgd2lkZ2V0U3Vic2NyaWJlcnMkKCk6IEJlaGF2aW9yU3ViamVjdDx7W2tleTogc3RyaW5nXTogKGV2ZW50OiBhbnkpID0+IHZvaWR9PiB7XHJcbiAgICByZXR1cm4gdGhpcy53b3Jrc3BhY2Uud2lkZ2V0U3Vic2NyaWJlcnMkO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIGEgd2lkZ2V0J3MgY29tcG9uZW50IGVtaXQgdGhlICdjYW5jZWwnIGV2ZW50LFxyXG4gICAqIGRlYWN0aXZhdGUgdGhhdCB3aWRnZXQgYW5kIGVtaXQgdGhlICdkZWFjdGl2YXRlV2lkZ2V0JyBldmVudC5cclxuICAgKiBAcGFyYW0gd2lkZ2V0IFdpZGdldFxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG9uV2lkZ2V0Q2FuY2VsKHdpZGdldDogV2lkZ2V0KSB7XHJcbiAgICB0aGlzLndvcmtzcGFjZS5kZWFjdGl2YXRlV2lkZ2V0KCk7XHJcbiAgICB0aGlzLmRlYWN0aXZhdGVXaWRnZXQuZW1pdCh3aWRnZXQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiBhIHdpZGdldCdzIGNvbXBvbmVudCBlbWl0IHRoZSAnY2FuY2VsJyBldmVudCxcclxuICAgKiBkZWFjdGl2YXRlIHRoYXQgd2lkZ2V0IGFuZCBlbWl0IHRoZSAnZGVhY3RpdmF0ZVdpZGdldCcgZXZlbnQuXHJcbiAgICogQHBhcmFtIHdpZGdldCBXaWRnZXRcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBvbldpZGdldENvbXBsZXRlKHdpZGdldDogV2lkZ2V0KSB7XHJcbiAgICB0aGlzLndvcmtzcGFjZS5kZWFjdGl2YXRlV2lkZ2V0KCk7XHJcbiAgICB0aGlzLmRlYWN0aXZhdGVXaWRnZXQuZW1pdCh3aWRnZXQpO1xyXG4gIH1cclxuXHJcbn1cclxuIl19