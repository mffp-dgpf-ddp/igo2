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
var WorkspaceWidgetOutletComponent = /** @class */ (function () {
    function WorkspaceWidgetOutletComponent() {
        /**
         * Event emitted when a widget is deactivate which happens
         * when the widget's component emits the 'cancel' or 'complete' event.
         */
        this.deactivateWidget = new EventEmitter();
    }
    Object.defineProperty(WorkspaceWidgetOutletComponent.prototype, "widget$", {
        /**
         * Observable of the workspace's active widget
         * @internal
         */
        get: /**
         * Observable of the workspace's active widget
         * \@internal
         * @return {?}
         */
        function () { return this.workspace.widget$; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WorkspaceWidgetOutletComponent.prototype, "widgetInputs$", {
        /**
         * Observable of the workspace's widget inputs
         * @internal
         */
        get: /**
         * Observable of the workspace's widget inputs
         * \@internal
         * @return {?}
         */
        function () {
            return this.workspace.widgetInputs$;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WorkspaceWidgetOutletComponent.prototype, "widgetSubscribers$", {
        /**
         * Observable of the workspace's widget inputs
         * @internal
         */
        get: /**
         * Observable of the workspace's widget inputs
         * \@internal
         * @return {?}
         */
        function () {
            return this.workspace.widgetSubscribers$;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * When a widget's component emit the 'cancel' event,
     * deactivate that widget and emit the 'deactivateWidget' event.
     * @param widget Widget
     * @internal
     */
    /**
     * When a widget's component emit the 'cancel' event,
     * deactivate that widget and emit the 'deactivateWidget' event.
     * \@internal
     * @param {?} widget Widget
     * @return {?}
     */
    WorkspaceWidgetOutletComponent.prototype.onWidgetCancel = /**
     * When a widget's component emit the 'cancel' event,
     * deactivate that widget and emit the 'deactivateWidget' event.
     * \@internal
     * @param {?} widget Widget
     * @return {?}
     */
    function (widget) {
        this.workspace.deactivateWidget();
        this.deactivateWidget.emit(widget);
    };
    /**
     * When a widget's component emit the 'cancel' event,
     * deactivate that widget and emit the 'deactivateWidget' event.
     * @param widget Widget
     * @internal
     */
    /**
     * When a widget's component emit the 'cancel' event,
     * deactivate that widget and emit the 'deactivateWidget' event.
     * \@internal
     * @param {?} widget Widget
     * @return {?}
     */
    WorkspaceWidgetOutletComponent.prototype.onWidgetComplete = /**
     * When a widget's component emit the 'cancel' event,
     * deactivate that widget and emit the 'deactivateWidget' event.
     * \@internal
     * @param {?} widget Widget
     * @return {?}
     */
    function (widget) {
        this.workspace.deactivateWidget();
        this.deactivateWidget.emit(widget);
    };
    WorkspaceWidgetOutletComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-workspace-widget-outlet',
                    template: "<ng-container *ngIf=\"widget$ | async as widget\">\r\n  <igo-widget-outlet\r\n    [widget]=\"widget\"\r\n    [inputs]=\"widgetInputs$ | async\"\r\n    [subscribers]=\"widgetSubscribers$ | async\"\r\n    (cancel)=\"onWidgetCancel(widget)\"\r\n    (complete)=\"onWidgetComplete(widget)\">\r\n  </igo-widget-outlet>\r\n</ng-container>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: ["igo-widget-outlet{height:100%}"]
                }] }
    ];
    /** @nocollapse */
    WorkspaceWidgetOutletComponent.ctorParameters = function () { return []; };
    WorkspaceWidgetOutletComponent.propDecorators = {
        workspace: [{ type: Input }],
        deactivateWidget: [{ type: Output }]
    };
    return WorkspaceWidgetOutletComponent;
}());
export { WorkspaceWidgetOutletComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya3NwYWNlLXdpZGdldC1vdXRsZXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29tbW9uLyIsInNvdXJjZXMiOlsibGliL3dvcmtzcGFjZS93b3Jrc3BhY2Utd2lkZ2V0LW91dGxldC93b3Jrc3BhY2Utd2lkZ2V0LW91dGxldC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osdUJBQXVCLEVBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBS3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7Ozs7O0FBT2hEO0lBeUNFOzs7OztRQXhCVSxxQkFBZ0IsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO0lBd0J6QyxDQUFDO0lBbEJoQixzQkFBSSxtREFBTztRQUpYOzs7V0FHRzs7Ozs7O1FBQ0gsY0FBeUMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBTXpFLHNCQUFJLHlEQUFhO1FBSmpCOzs7V0FHRzs7Ozs7O1FBQ0g7WUFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDO1FBQ3RDLENBQUM7OztPQUFBO0lBTUQsc0JBQUksOERBQWtCO1FBSnRCOzs7V0FHRzs7Ozs7O1FBQ0g7WUFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUM7UUFDM0MsQ0FBQzs7O09BQUE7SUFJRDs7Ozs7T0FLRzs7Ozs7Ozs7SUFDSCx1REFBYzs7Ozs7OztJQUFkLFVBQWUsTUFBYztRQUMzQixJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQ7Ozs7O09BS0c7Ozs7Ozs7O0lBQ0gseURBQWdCOzs7Ozs7O0lBQWhCLFVBQWlCLE1BQWM7UUFDN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDckMsQ0FBQzs7Z0JBL0RGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsNkJBQTZCO29CQUN2QywyVkFBdUQ7b0JBRXZELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztpQkFDaEQ7Ozs7OzRCQU1FLEtBQUs7bUNBTUwsTUFBTTs7SUFnRFQscUNBQUM7Q0FBQSxBQWpFRCxJQWlFQztTQTNEWSw4QkFBOEI7Ozs7OztJQUt6QyxtREFBOEI7Ozs7OztJQU05QiwwREFBd0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IFdpZGdldCB9IGZyb20gJy4uLy4uL3dpZGdldCc7XHJcbmltcG9ydCB7IFdvcmtzcGFjZSB9IGZyb20gJy4uL3NoYXJlZC93b3Jrc3BhY2UnO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgY29tcG9uZW50IGR5bmFtaWNhbGx5IHJlbmRlciBhbiBXb3Jrc3BhY2UncyBhY3RpdmUgd2lkZ2V0LlxyXG4gKiBJdCBhbHNvIGRlYWN0aXZhdGUgdGhhdCB3aWRnZXQgd2hlbmV2ZXIgdGhlIHdpZGdldCdzIGNvbXBvbmVudFxyXG4gKiBlbWl0IHRoZSAnY2FuY2VsJyBvciAnY29tcGxldGUnIGV2ZW50LlxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdpZ28td29ya3NwYWNlLXdpZGdldC1vdXRsZXQnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi93b3Jrc3BhY2Utd2lkZ2V0LW91dGxldC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vd29ya3NwYWNlLXdpZGdldC1vdXRsZXQuY29tcG9uZW50LnNjc3MnXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgV29ya3NwYWNlV2lkZ2V0T3V0bGV0Q29tcG9uZW50IHtcclxuXHJcbiAgLyoqXHJcbiAgICogV29ya3NwYWNlXHJcbiAgICovXHJcbiAgQElucHV0KCkgd29ya3NwYWNlOiBXb3Jrc3BhY2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIEV2ZW50IGVtaXR0ZWQgd2hlbiBhIHdpZGdldCBpcyBkZWFjdGl2YXRlIHdoaWNoIGhhcHBlbnNcclxuICAgKiB3aGVuIHRoZSB3aWRnZXQncyBjb21wb25lbnQgZW1pdHMgdGhlICdjYW5jZWwnIG9yICdjb21wbGV0ZScgZXZlbnQuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIGRlYWN0aXZhdGVXaWRnZXQgPSBuZXcgRXZlbnRFbWl0dGVyPFdpZGdldD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogT2JzZXJ2YWJsZSBvZiB0aGUgd29ya3NwYWNlJ3MgYWN0aXZlIHdpZGdldFxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGdldCB3aWRnZXQkKCk6IEJlaGF2aW9yU3ViamVjdDxXaWRnZXQ+IHsgcmV0dXJuIHRoaXMud29ya3NwYWNlLndpZGdldCQ7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogT2JzZXJ2YWJsZSBvZiB0aGUgd29ya3NwYWNlJ3Mgd2lkZ2V0IGlucHV0c1xyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGdldCB3aWRnZXRJbnB1dHMkKCk6IEJlaGF2aW9yU3ViamVjdDx7W2tleTogc3RyaW5nXTogYW55fT4ge1xyXG4gICAgcmV0dXJuIHRoaXMud29ya3NwYWNlLndpZGdldElucHV0cyQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBPYnNlcnZhYmxlIG9mIHRoZSB3b3Jrc3BhY2UncyB3aWRnZXQgaW5wdXRzXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgZ2V0IHdpZGdldFN1YnNjcmliZXJzJCgpOiBCZWhhdmlvclN1YmplY3Q8e1trZXk6IHN0cmluZ106IChldmVudDogYW55KSA9PiB2b2lkfT4ge1xyXG4gICAgcmV0dXJuIHRoaXMud29ya3NwYWNlLndpZGdldFN1YnNjcmliZXJzJDtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiBhIHdpZGdldCdzIGNvbXBvbmVudCBlbWl0IHRoZSAnY2FuY2VsJyBldmVudCxcclxuICAgKiBkZWFjdGl2YXRlIHRoYXQgd2lkZ2V0IGFuZCBlbWl0IHRoZSAnZGVhY3RpdmF0ZVdpZGdldCcgZXZlbnQuXHJcbiAgICogQHBhcmFtIHdpZGdldCBXaWRnZXRcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBvbldpZGdldENhbmNlbCh3aWRnZXQ6IFdpZGdldCkge1xyXG4gICAgdGhpcy53b3Jrc3BhY2UuZGVhY3RpdmF0ZVdpZGdldCgpO1xyXG4gICAgdGhpcy5kZWFjdGl2YXRlV2lkZ2V0LmVtaXQod2lkZ2V0KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gYSB3aWRnZXQncyBjb21wb25lbnQgZW1pdCB0aGUgJ2NhbmNlbCcgZXZlbnQsXHJcbiAgICogZGVhY3RpdmF0ZSB0aGF0IHdpZGdldCBhbmQgZW1pdCB0aGUgJ2RlYWN0aXZhdGVXaWRnZXQnIGV2ZW50LlxyXG4gICAqIEBwYXJhbSB3aWRnZXQgV2lkZ2V0XHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgb25XaWRnZXRDb21wbGV0ZSh3aWRnZXQ6IFdpZGdldCkge1xyXG4gICAgdGhpcy53b3Jrc3BhY2UuZGVhY3RpdmF0ZVdpZGdldCgpO1xyXG4gICAgdGhpcy5kZWFjdGl2YXRlV2lkZ2V0LmVtaXQod2lkZ2V0KTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==