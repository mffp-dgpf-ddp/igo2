/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
var ContextListComponent = /** @class */ (function () {
    function ContextListComponent(cdRef) {
        this.cdRef = cdRef;
        this._contexts = { ours: [] };
        this.select = new EventEmitter();
        this.unselect = new EventEmitter();
        this.edit = new EventEmitter();
        this.delete = new EventEmitter();
        this.save = new EventEmitter();
        this.clone = new EventEmitter();
        this.favorite = new EventEmitter();
        this.managePermissions = new EventEmitter();
        this.manageTools = new EventEmitter();
        this.titleMapping = {
            ours: 'igo.context.contextManager.ourContexts',
            shared: 'igo.context.contextManager.sharedContexts',
            public: 'igo.context.contextManager.publicContexts'
        };
    }
    Object.defineProperty(ContextListComponent.prototype, "contexts", {
        get: /**
         * @return {?}
         */
        function () {
            return this._contexts;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._contexts = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContextListComponent.prototype, "selectedContext", {
        get: /**
         * @return {?}
         */
        function () {
            return this._selectedContext;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._selectedContext = value;
            this.cdRef.detectChanges();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContextListComponent.prototype, "defaultContextId", {
        get: /**
         * @return {?}
         */
        function () {
            return this._defaultContextId;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._defaultContextId = value;
        },
        enumerable: true,
        configurable: true
    });
    ContextListComponent.decorators = [
        { type: Component, args: [{
                    selector: 'igo-context-list',
                    template: "<igo-list [navigation]=\"true\">\r\n  <ng-template ngFor let-groupContexts [ngForOf]=\"contexts | keyvalue\">\r\n    <igo-collapsible *ngIf=\"groupContexts.value.length\" [title]=\"titleMapping[groupContexts.key] | translate\">\r\n\r\n      <ng-template ngFor let-context [ngForOf]=\"groupContexts.value\">\r\n        <igo-context-item\r\n          igoListItem\r\n          color=\"accent\"\r\n          [selected]=\"selectedContext && selectedContext.uri === context.uri\"\r\n          [context]=\"context\"\r\n          [default]=\"this.defaultContextId === context.id\"\r\n          (edit)=\"edit.emit(context)\"\r\n          (delete)=\"delete.emit(context)\"\r\n          (clone)=\"clone.emit(context)\"\r\n          (save)=\"save.emit(context)\"\r\n          (favorite)=\"favorite.emit(context)\"\r\n          (manageTools)=\"manageTools.emit(context)\"\r\n          (managePermissions)=\"managePermissions.emit(context)\"\r\n          (select)=\"select.emit(context)\"\r\n          (unselect)=\"unselect.emit(context)\">\r\n        </igo-context-item>\r\n      </ng-template>\r\n\r\n    </igo-collapsible>\r\n  </ng-template>\r\n</igo-list>\r\n"
                }] }
    ];
    /** @nocollapse */
    ContextListComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    ContextListComponent.propDecorators = {
        contexts: [{ type: Input }],
        selectedContext: [{ type: Input }],
        defaultContextId: [{ type: Input }],
        select: [{ type: Output }],
        unselect: [{ type: Output }],
        edit: [{ type: Output }],
        delete: [{ type: Output }],
        save: [{ type: Output }],
        clone: [{ type: Output }],
        favorite: [{ type: Output }],
        managePermissions: [{ type: Output }],
        manageTools: [{ type: Output }]
    };
    return ContextListComponent;
}());
export { ContextListComponent };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ContextListComponent.prototype._contexts;
    /**
     * @type {?}
     * @private
     */
    ContextListComponent.prototype._selectedContext;
    /**
     * @type {?}
     * @private
     */
    ContextListComponent.prototype._defaultContextId;
    /** @type {?} */
    ContextListComponent.prototype.select;
    /** @type {?} */
    ContextListComponent.prototype.unselect;
    /** @type {?} */
    ContextListComponent.prototype.edit;
    /** @type {?} */
    ContextListComponent.prototype.delete;
    /** @type {?} */
    ContextListComponent.prototype.save;
    /** @type {?} */
    ContextListComponent.prototype.clone;
    /** @type {?} */
    ContextListComponent.prototype.favorite;
    /** @type {?} */
    ContextListComponent.prototype.managePermissions;
    /** @type {?} */
    ContextListComponent.prototype.manageTools;
    /** @type {?} */
    ContextListComponent.prototype.titleMapping;
    /**
     * @type {?}
     * @private
     */
    ContextListComponent.prototype.cdRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbnRleHQvIiwic291cmNlcyI6WyJsaWIvY29udGV4dC1tYW5hZ2VyL2NvbnRleHQtbGlzdC9jb250ZXh0LWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUl2QjtJQWlERSw4QkFBb0IsS0FBd0I7UUFBeEIsVUFBSyxHQUFMLEtBQUssQ0FBbUI7UUFyQ3BDLGNBQVMsR0FBaUIsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLENBQUM7UUFxQnJDLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBbUIsQ0FBQztRQUM3QyxhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQW1CLENBQUM7UUFDL0MsU0FBSSxHQUFHLElBQUksWUFBWSxFQUFtQixDQUFDO1FBQzNDLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBbUIsQ0FBQztRQUM3QyxTQUFJLEdBQUcsSUFBSSxZQUFZLEVBQW1CLENBQUM7UUFDM0MsVUFBSyxHQUFHLElBQUksWUFBWSxFQUFtQixDQUFDO1FBQzVDLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBbUIsQ0FBQztRQUMvQyxzQkFBaUIsR0FBRyxJQUFJLFlBQVksRUFBbUIsQ0FBQztRQUN4RCxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFtQixDQUFDO1FBRXJELGlCQUFZLEdBQUc7WUFDcEIsSUFBSSxFQUFFLHdDQUF3QztZQUM5QyxNQUFNLEVBQUUsMkNBQTJDO1lBQ25ELE1BQU0sRUFBRSwyQ0FBMkM7U0FDcEQsQ0FBQztJQUU2QyxDQUFDO0lBNUNoRCxzQkFDSSwwQ0FBUTs7OztRQURaO1lBRUUsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ3hCLENBQUM7Ozs7O1FBQ0QsVUFBYSxLQUFtQjtZQUM5QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN6QixDQUFDOzs7T0FIQTtJQU1ELHNCQUNJLGlEQUFlOzs7O1FBRG5CO1lBRUUsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7UUFDL0IsQ0FBQzs7Ozs7UUFDRCxVQUFvQixLQUFzQjtZQUN4QyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO1lBQzlCLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDN0IsQ0FBQzs7O09BSkE7SUFPRCxzQkFDSSxrREFBZ0I7Ozs7UUFEcEI7WUFFRSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztRQUNoQyxDQUFDOzs7OztRQUNELFVBQXFCLEtBQWE7WUFDaEMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztRQUNqQyxDQUFDOzs7T0FIQTs7Z0JBM0JGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsa0JBQWtCO29CQUM1Qiwwb0NBQTRDO2lCQUM3Qzs7OztnQkFSQyxpQkFBaUI7OzsyQkFVaEIsS0FBSztrQ0FTTCxLQUFLO21DQVVMLEtBQUs7eUJBU0wsTUFBTTsyQkFDTixNQUFNO3VCQUNOLE1BQU07eUJBQ04sTUFBTTt1QkFDTixNQUFNO3dCQUNOLE1BQU07MkJBQ04sTUFBTTtvQ0FDTixNQUFNOzhCQUNOLE1BQU07O0lBU1QsMkJBQUM7Q0FBQSxBQWxERCxJQWtEQztTQTlDWSxvQkFBb0I7Ozs7OztJQVEvQix5Q0FBK0M7Ozs7O0lBVS9DLGdEQUEwQzs7Ozs7SUFTMUMsaURBQWtDOztJQUVsQyxzQ0FBdUQ7O0lBQ3ZELHdDQUF5RDs7SUFDekQsb0NBQXFEOztJQUNyRCxzQ0FBdUQ7O0lBQ3ZELG9DQUFxRDs7SUFDckQscUNBQXNEOztJQUN0RCx3Q0FBeUQ7O0lBQ3pELGlEQUFrRTs7SUFDbEUsMkNBQTREOztJQUU1RCw0Q0FJRTs7Ozs7SUFFVSxxQ0FBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIENoYW5nZURldGVjdG9yUmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBEZXRhaWxlZENvbnRleHQsIENvbnRleHRzTGlzdCB9IGZyb20gJy4uL3NoYXJlZC9jb250ZXh0LmludGVyZmFjZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2lnby1jb250ZXh0LWxpc3QnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9jb250ZXh0LWxpc3QuY29tcG9uZW50Lmh0bWwnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb250ZXh0TGlzdENvbXBvbmVudCB7XHJcbiAgQElucHV0KClcclxuICBnZXQgY29udGV4dHMoKTogQ29udGV4dHNMaXN0IHtcclxuICAgIHJldHVybiB0aGlzLl9jb250ZXh0cztcclxuICB9XHJcbiAgc2V0IGNvbnRleHRzKHZhbHVlOiBDb250ZXh0c0xpc3QpIHtcclxuICAgIHRoaXMuX2NvbnRleHRzID0gdmFsdWU7XHJcbiAgfVxyXG4gIHByaXZhdGUgX2NvbnRleHRzOiBDb250ZXh0c0xpc3QgPSB7IG91cnM6IFtdIH07XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IHNlbGVjdGVkQ29udGV4dCgpOiBEZXRhaWxlZENvbnRleHQge1xyXG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkQ29udGV4dDtcclxuICB9XHJcbiAgc2V0IHNlbGVjdGVkQ29udGV4dCh2YWx1ZTogRGV0YWlsZWRDb250ZXh0KSB7XHJcbiAgICB0aGlzLl9zZWxlY3RlZENvbnRleHQgPSB2YWx1ZTtcclxuICAgIHRoaXMuY2RSZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gIH1cclxuICBwcml2YXRlIF9zZWxlY3RlZENvbnRleHQ6IERldGFpbGVkQ29udGV4dDtcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgZGVmYXVsdENvbnRleHRJZCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RlZmF1bHRDb250ZXh0SWQ7XHJcbiAgfVxyXG4gIHNldCBkZWZhdWx0Q29udGV4dElkKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuX2RlZmF1bHRDb250ZXh0SWQgPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfZGVmYXVsdENvbnRleHRJZDogc3RyaW5nO1xyXG5cclxuICBAT3V0cHV0KCkgc2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcjxEZXRhaWxlZENvbnRleHQ+KCk7XHJcbiAgQE91dHB1dCgpIHVuc2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcjxEZXRhaWxlZENvbnRleHQ+KCk7XHJcbiAgQE91dHB1dCgpIGVkaXQgPSBuZXcgRXZlbnRFbWl0dGVyPERldGFpbGVkQ29udGV4dD4oKTtcclxuICBAT3V0cHV0KCkgZGVsZXRlID0gbmV3IEV2ZW50RW1pdHRlcjxEZXRhaWxlZENvbnRleHQ+KCk7XHJcbiAgQE91dHB1dCgpIHNhdmUgPSBuZXcgRXZlbnRFbWl0dGVyPERldGFpbGVkQ29udGV4dD4oKTtcclxuICBAT3V0cHV0KCkgY2xvbmUgPSBuZXcgRXZlbnRFbWl0dGVyPERldGFpbGVkQ29udGV4dD4oKTtcclxuICBAT3V0cHV0KCkgZmF2b3JpdGUgPSBuZXcgRXZlbnRFbWl0dGVyPERldGFpbGVkQ29udGV4dD4oKTtcclxuICBAT3V0cHV0KCkgbWFuYWdlUGVybWlzc2lvbnMgPSBuZXcgRXZlbnRFbWl0dGVyPERldGFpbGVkQ29udGV4dD4oKTtcclxuICBAT3V0cHV0KCkgbWFuYWdlVG9vbHMgPSBuZXcgRXZlbnRFbWl0dGVyPERldGFpbGVkQ29udGV4dD4oKTtcclxuXHJcbiAgcHVibGljIHRpdGxlTWFwcGluZyA9IHtcclxuICAgIG91cnM6ICdpZ28uY29udGV4dC5jb250ZXh0TWFuYWdlci5vdXJDb250ZXh0cycsXHJcbiAgICBzaGFyZWQ6ICdpZ28uY29udGV4dC5jb250ZXh0TWFuYWdlci5zaGFyZWRDb250ZXh0cycsXHJcbiAgICBwdWJsaWM6ICdpZ28uY29udGV4dC5jb250ZXh0TWFuYWdlci5wdWJsaWNDb250ZXh0cydcclxuICB9O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge31cclxufVxyXG4iXX0=