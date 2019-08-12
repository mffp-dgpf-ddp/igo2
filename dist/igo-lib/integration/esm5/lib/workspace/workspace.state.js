/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WorkspaceStore } from '@igo2/common';
import * as i0 from "@angular/core";
/**
 * Service that holds the state of the workspace module
 */
var WorkspaceState = /** @class */ (function () {
    function WorkspaceState() {
        var _this = this;
        /**
         * Observable of the active workspace
         */
        this.workspace$ = new BehaviorSubject(undefined);
        this._store = new WorkspaceStore([]);
        this._store.stateView
            .firstBy$((/**
         * @param {?} record
         * @return {?}
         */
        function (record) { return record.state.active === true; }))
            .subscribe((/**
         * @param {?} record
         * @return {?}
         */
        function (record) {
            /** @type {?} */
            var workspace = record ? record.entity : undefined;
            _this.workspace$.next(workspace);
        }));
    }
    Object.defineProperty(WorkspaceState.prototype, "store", {
        /**
         * Store that holds all the available workspaces
         */
        get: /**
         * Store that holds all the available workspaces
         * @return {?}
         */
        function () { return this._store; },
        enumerable: true,
        configurable: true
    });
    WorkspaceState.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    WorkspaceState.ctorParameters = function () { return []; };
    /** @nocollapse */ WorkspaceState.ngInjectableDef = i0.defineInjectable({ factory: function WorkspaceState_Factory() { return new WorkspaceState(); }, token: WorkspaceState, providedIn: "root" });
    return WorkspaceState;
}());
export { WorkspaceState };
if (false) {
    /**
     * Observable of the active workspace
     * @type {?}
     */
    WorkspaceState.prototype.workspace$;
    /**
     * @type {?}
     * @private
     */
    WorkspaceState.prototype._store;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya3NwYWNlLnN0YXRlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvaW50ZWdyYXRpb24vIiwic291cmNlcyI6WyJsaWIvd29ya3NwYWNlL3dvcmtzcGFjZS5zdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXZDLE9BQU8sRUFBMkIsY0FBYyxFQUFFLE1BQU0sY0FBYyxDQUFDOzs7OztBQUt2RTtJQWdCRTtRQUFBLGlCQVFDOzs7O1FBaEJNLGVBQVUsR0FBRyxJQUFJLGVBQWUsQ0FBWSxTQUFTLENBQUMsQ0FBQztRQVM1RCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUzthQUNsQixRQUFROzs7O1FBQUMsVUFBQyxNQUErQixJQUFLLE9BQUEsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssSUFBSSxFQUE1QixDQUE0QixFQUFDO2FBQzNFLFNBQVM7Ozs7UUFBQyxVQUFDLE1BQStCOztnQkFDbkMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBUztZQUNwRCxLQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNsQyxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7SUFYRCxzQkFBSSxpQ0FBSztRQUhUOztXQUVHOzs7OztRQUNILGNBQThCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7OztPQUFBOztnQkFicEQsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7Ozs7eUJBWEQ7Q0FtQ0MsQUExQkQsSUEwQkM7U0F2QlksY0FBYzs7Ozs7O0lBS3pCLG9DQUE4RDs7Ozs7SUFNOUQsZ0NBQStCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBFbnRpdHlSZWNvcmQsIFdvcmtzcGFjZSwgV29ya3NwYWNlU3RvcmUgfSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5cclxuLyoqXHJcbiAqIFNlcnZpY2UgdGhhdCBob2xkcyB0aGUgc3RhdGUgb2YgdGhlIHdvcmtzcGFjZSBtb2R1bGVcclxuICovXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFdvcmtzcGFjZVN0YXRlIHtcclxuXHJcbiAgLyoqXHJcbiAgICogT2JzZXJ2YWJsZSBvZiB0aGUgYWN0aXZlIHdvcmtzcGFjZVxyXG4gICAqL1xyXG4gIHB1YmxpYyB3b3Jrc3BhY2UkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxXb3Jrc3BhY2U+KHVuZGVmaW5lZCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0b3JlIHRoYXQgaG9sZHMgYWxsIHRoZSBhdmFpbGFibGUgd29ya3NwYWNlc1xyXG4gICAqL1xyXG4gIGdldCBzdG9yZSgpOiBXb3Jrc3BhY2VTdG9yZSB7IHJldHVybiB0aGlzLl9zdG9yZTsgfVxyXG4gIHByaXZhdGUgX3N0b3JlOiBXb3Jrc3BhY2VTdG9yZTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLl9zdG9yZSA9IG5ldyBXb3Jrc3BhY2VTdG9yZShbXSk7XHJcbiAgICB0aGlzLl9zdG9yZS5zdGF0ZVZpZXdcclxuICAgICAgLmZpcnN0QnkkKChyZWNvcmQ6IEVudGl0eVJlY29yZDxXb3Jrc3BhY2U+KSA9PiByZWNvcmQuc3RhdGUuYWN0aXZlID09PSB0cnVlKVxyXG4gICAgICAuc3Vic2NyaWJlKChyZWNvcmQ6IEVudGl0eVJlY29yZDxXb3Jrc3BhY2U+KSA9PiB7XHJcbiAgICAgICAgY29uc3Qgd29ya3NwYWNlID0gcmVjb3JkID8gcmVjb3JkLmVudGl0eSA6IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLndvcmtzcGFjZSQubmV4dCh3b3Jrc3BhY2UpO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==