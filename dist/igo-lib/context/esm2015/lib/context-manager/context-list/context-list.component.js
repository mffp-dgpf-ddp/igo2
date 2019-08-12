/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
export class ContextListComponent {
    /**
     * @param {?} cdRef
     */
    constructor(cdRef) {
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
    /**
     * @return {?}
     */
    get contexts() {
        return this._contexts;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set contexts(value) {
        this._contexts = value;
    }
    /**
     * @return {?}
     */
    get selectedContext() {
        return this._selectedContext;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set selectedContext(value) {
        this._selectedContext = value;
        this.cdRef.detectChanges();
    }
    /**
     * @return {?}
     */
    get defaultContextId() {
        return this._defaultContextId;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set defaultContextId(value) {
        this._defaultContextId = value;
    }
}
ContextListComponent.decorators = [
    { type: Component, args: [{
                selector: 'igo-context-list',
                template: "<igo-list [navigation]=\"true\">\r\n  <ng-template ngFor let-groupContexts [ngForOf]=\"contexts | keyvalue\">\r\n    <igo-collapsible *ngIf=\"groupContexts.value.length\" [title]=\"titleMapping[groupContexts.key] | translate\">\r\n\r\n      <ng-template ngFor let-context [ngForOf]=\"groupContexts.value\">\r\n        <igo-context-item\r\n          igoListItem\r\n          color=\"accent\"\r\n          [selected]=\"selectedContext && selectedContext.uri === context.uri\"\r\n          [context]=\"context\"\r\n          [default]=\"this.defaultContextId === context.id\"\r\n          (edit)=\"edit.emit(context)\"\r\n          (delete)=\"delete.emit(context)\"\r\n          (clone)=\"clone.emit(context)\"\r\n          (save)=\"save.emit(context)\"\r\n          (favorite)=\"favorite.emit(context)\"\r\n          (manageTools)=\"manageTools.emit(context)\"\r\n          (managePermissions)=\"managePermissions.emit(context)\"\r\n          (select)=\"select.emit(context)\"\r\n          (unselect)=\"unselect.emit(context)\">\r\n        </igo-context-item>\r\n      </ng-template>\r\n\r\n    </igo-collapsible>\r\n  </ng-template>\r\n</igo-list>\r\n"
            }] }
];
/** @nocollapse */
ContextListComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbnRleHQvIiwic291cmNlcyI6WyJsaWIvY29udGV4dC1tYW5hZ2VyL2NvbnRleHQtbGlzdC9jb250ZXh0LWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQVF2QixNQUFNLE9BQU8sb0JBQW9COzs7O0lBNkMvQixZQUFvQixLQUF3QjtRQUF4QixVQUFLLEdBQUwsS0FBSyxDQUFtQjtRQXJDcEMsY0FBUyxHQUFpQixFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsQ0FBQztRQXFCckMsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFtQixDQUFDO1FBQzdDLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBbUIsQ0FBQztRQUMvQyxTQUFJLEdBQUcsSUFBSSxZQUFZLEVBQW1CLENBQUM7UUFDM0MsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFtQixDQUFDO1FBQzdDLFNBQUksR0FBRyxJQUFJLFlBQVksRUFBbUIsQ0FBQztRQUMzQyxVQUFLLEdBQUcsSUFBSSxZQUFZLEVBQW1CLENBQUM7UUFDNUMsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFtQixDQUFDO1FBQy9DLHNCQUFpQixHQUFHLElBQUksWUFBWSxFQUFtQixDQUFDO1FBQ3hELGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQW1CLENBQUM7UUFFckQsaUJBQVksR0FBRztZQUNwQixJQUFJLEVBQUUsd0NBQXdDO1lBQzlDLE1BQU0sRUFBRSwyQ0FBMkM7WUFDbkQsTUFBTSxFQUFFLDJDQUEyQztTQUNwRCxDQUFDO0lBRTZDLENBQUM7Ozs7SUE1Q2hELElBQ0ksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDOzs7OztJQUNELElBQUksUUFBUSxDQUFDLEtBQW1CO1FBQzlCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO0lBQ3pCLENBQUM7Ozs7SUFHRCxJQUNJLGVBQWU7UUFDakIsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7SUFDL0IsQ0FBQzs7Ozs7SUFDRCxJQUFJLGVBQWUsQ0FBQyxLQUFzQjtRQUN4QyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO1FBQzlCLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDN0IsQ0FBQzs7OztJQUdELElBQ0ksZ0JBQWdCO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDO0lBQ2hDLENBQUM7Ozs7O0lBQ0QsSUFBSSxnQkFBZ0IsQ0FBQyxLQUFhO1FBQ2hDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7SUFDakMsQ0FBQzs7O1lBOUJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1Qiwwb0NBQTRDO2FBQzdDOzs7O1lBUkMsaUJBQWlCOzs7dUJBVWhCLEtBQUs7OEJBU0wsS0FBSzsrQkFVTCxLQUFLO3FCQVNMLE1BQU07dUJBQ04sTUFBTTttQkFDTixNQUFNO3FCQUNOLE1BQU07bUJBQ04sTUFBTTtvQkFDTixNQUFNO3VCQUNOLE1BQU07Z0NBQ04sTUFBTTswQkFDTixNQUFNOzs7Ozs7O0lBN0JQLHlDQUErQzs7Ozs7SUFVL0MsZ0RBQTBDOzs7OztJQVMxQyxpREFBa0M7O0lBRWxDLHNDQUF1RDs7SUFDdkQsd0NBQXlEOztJQUN6RCxvQ0FBcUQ7O0lBQ3JELHNDQUF1RDs7SUFDdkQsb0NBQXFEOztJQUNyRCxxQ0FBc0Q7O0lBQ3RELHdDQUF5RDs7SUFDekQsaURBQWtFOztJQUNsRSwyQ0FBNEQ7O0lBRTVELDRDQUlFOzs7OztJQUVVLHFDQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IERldGFpbGVkQ29udGV4dCwgQ29udGV4dHNMaXN0IH0gZnJvbSAnLi4vc2hhcmVkL2NvbnRleHQuaW50ZXJmYWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnaWdvLWNvbnRleHQtbGlzdCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2NvbnRleHQtbGlzdC5jb21wb25lbnQuaHRtbCdcclxufSlcclxuZXhwb3J0IGNsYXNzIENvbnRleHRMaXN0Q29tcG9uZW50IHtcclxuICBASW5wdXQoKVxyXG4gIGdldCBjb250ZXh0cygpOiBDb250ZXh0c0xpc3Qge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NvbnRleHRzO1xyXG4gIH1cclxuICBzZXQgY29udGV4dHModmFsdWU6IENvbnRleHRzTGlzdCkge1xyXG4gICAgdGhpcy5fY29udGV4dHMgPSB2YWx1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfY29udGV4dHM6IENvbnRleHRzTGlzdCA9IHsgb3VyczogW10gfTtcclxuXHJcbiAgQElucHV0KClcclxuICBnZXQgc2VsZWN0ZWRDb250ZXh0KCk6IERldGFpbGVkQ29udGV4dCB7XHJcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWRDb250ZXh0O1xyXG4gIH1cclxuICBzZXQgc2VsZWN0ZWRDb250ZXh0KHZhbHVlOiBEZXRhaWxlZENvbnRleHQpIHtcclxuICAgIHRoaXMuX3NlbGVjdGVkQ29udGV4dCA9IHZhbHVlO1xyXG4gICAgdGhpcy5jZFJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgfVxyXG4gIHByaXZhdGUgX3NlbGVjdGVkQ29udGV4dDogRGV0YWlsZWRDb250ZXh0O1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGdldCBkZWZhdWx0Q29udGV4dElkKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5fZGVmYXVsdENvbnRleHRJZDtcclxuICB9XHJcbiAgc2V0IGRlZmF1bHRDb250ZXh0SWQodmFsdWU6IHN0cmluZykge1xyXG4gICAgdGhpcy5fZGVmYXVsdENvbnRleHRJZCA9IHZhbHVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9kZWZhdWx0Q29udGV4dElkOiBzdHJpbmc7XHJcblxyXG4gIEBPdXRwdXQoKSBzZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyPERldGFpbGVkQ29udGV4dD4oKTtcclxuICBAT3V0cHV0KCkgdW5zZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyPERldGFpbGVkQ29udGV4dD4oKTtcclxuICBAT3V0cHV0KCkgZWRpdCA9IG5ldyBFdmVudEVtaXR0ZXI8RGV0YWlsZWRDb250ZXh0PigpO1xyXG4gIEBPdXRwdXQoKSBkZWxldGUgPSBuZXcgRXZlbnRFbWl0dGVyPERldGFpbGVkQ29udGV4dD4oKTtcclxuICBAT3V0cHV0KCkgc2F2ZSA9IG5ldyBFdmVudEVtaXR0ZXI8RGV0YWlsZWRDb250ZXh0PigpO1xyXG4gIEBPdXRwdXQoKSBjbG9uZSA9IG5ldyBFdmVudEVtaXR0ZXI8RGV0YWlsZWRDb250ZXh0PigpO1xyXG4gIEBPdXRwdXQoKSBmYXZvcml0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8RGV0YWlsZWRDb250ZXh0PigpO1xyXG4gIEBPdXRwdXQoKSBtYW5hZ2VQZXJtaXNzaW9ucyA9IG5ldyBFdmVudEVtaXR0ZXI8RGV0YWlsZWRDb250ZXh0PigpO1xyXG4gIEBPdXRwdXQoKSBtYW5hZ2VUb29scyA9IG5ldyBFdmVudEVtaXR0ZXI8RGV0YWlsZWRDb250ZXh0PigpO1xyXG5cclxuICBwdWJsaWMgdGl0bGVNYXBwaW5nID0ge1xyXG4gICAgb3VyczogJ2lnby5jb250ZXh0LmNvbnRleHRNYW5hZ2VyLm91ckNvbnRleHRzJyxcclxuICAgIHNoYXJlZDogJ2lnby5jb250ZXh0LmNvbnRleHRNYW5hZ2VyLnNoYXJlZENvbnRleHRzJyxcclxuICAgIHB1YmxpYzogJ2lnby5jb250ZXh0LmNvbnRleHRNYW5hZ2VyLnB1YmxpY0NvbnRleHRzJ1xyXG4gIH07XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmKSB7fVxyXG59XHJcbiJdfQ==