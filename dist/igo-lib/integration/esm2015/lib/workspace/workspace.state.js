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
export class WorkspaceState {
    constructor() {
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
        (record) => record.state.active === true))
            .subscribe((/**
         * @param {?} record
         * @return {?}
         */
        (record) => {
            /** @type {?} */
            const workspace = record ? record.entity : undefined;
            this.workspace$.next(workspace);
        }));
    }
    /**
     * Store that holds all the available workspaces
     * @return {?}
     */
    get store() { return this._store; }
}
WorkspaceState.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
WorkspaceState.ctorParameters = () => [];
/** @nocollapse */ WorkspaceState.ngInjectableDef = i0.defineInjectable({ factory: function WorkspaceState_Factory() { return new WorkspaceState(); }, token: WorkspaceState, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya3NwYWNlLnN0YXRlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvaW50ZWdyYXRpb24vIiwic291cmNlcyI6WyJsaWIvd29ya3NwYWNlL3dvcmtzcGFjZS5zdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXZDLE9BQU8sRUFBMkIsY0FBYyxFQUFFLE1BQU0sY0FBYyxDQUFDOzs7OztBQVF2RSxNQUFNLE9BQU8sY0FBYztJQWF6Qjs7OztRQVJPLGVBQVUsR0FBRyxJQUFJLGVBQWUsQ0FBWSxTQUFTLENBQUMsQ0FBQztRQVM1RCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUzthQUNsQixRQUFROzs7O1FBQUMsQ0FBQyxNQUErQixFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxJQUFJLEVBQUM7YUFDM0UsU0FBUzs7OztRQUFDLENBQUMsTUFBK0IsRUFBRSxFQUFFOztrQkFDdkMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBUztZQUNwRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNsQyxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7O0lBWEQsSUFBSSxLQUFLLEtBQXFCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7OztZQWJwRCxVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7Ozs7Ozs7SUFNQyxvQ0FBOEQ7Ozs7O0lBTTlELGdDQUErQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgRW50aXR5UmVjb3JkLCBXb3Jrc3BhY2UsIFdvcmtzcGFjZVN0b3JlIH0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuXHJcbi8qKlxyXG4gKiBTZXJ2aWNlIHRoYXQgaG9sZHMgdGhlIHN0YXRlIG9mIHRoZSB3b3Jrc3BhY2UgbW9kdWxlXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBXb3Jrc3BhY2VTdGF0ZSB7XHJcblxyXG4gIC8qKlxyXG4gICAqIE9ic2VydmFibGUgb2YgdGhlIGFjdGl2ZSB3b3Jrc3BhY2VcclxuICAgKi9cclxuICBwdWJsaWMgd29ya3NwYWNlJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8V29ya3NwYWNlPih1bmRlZmluZWQpO1xyXG5cclxuICAvKipcclxuICAgKiBTdG9yZSB0aGF0IGhvbGRzIGFsbCB0aGUgYXZhaWxhYmxlIHdvcmtzcGFjZXNcclxuICAgKi9cclxuICBnZXQgc3RvcmUoKTogV29ya3NwYWNlU3RvcmUgeyByZXR1cm4gdGhpcy5fc3RvcmU7IH1cclxuICBwcml2YXRlIF9zdG9yZTogV29ya3NwYWNlU3RvcmU7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5fc3RvcmUgPSBuZXcgV29ya3NwYWNlU3RvcmUoW10pO1xyXG4gICAgdGhpcy5fc3RvcmUuc3RhdGVWaWV3XHJcbiAgICAgIC5maXJzdEJ5JCgocmVjb3JkOiBFbnRpdHlSZWNvcmQ8V29ya3NwYWNlPikgPT4gcmVjb3JkLnN0YXRlLmFjdGl2ZSA9PT0gdHJ1ZSlcclxuICAgICAgLnN1YnNjcmliZSgocmVjb3JkOiBFbnRpdHlSZWNvcmQ8V29ya3NwYWNlPikgPT4ge1xyXG4gICAgICAgIGNvbnN0IHdvcmtzcGFjZSA9IHJlY29yZCA/IHJlY29yZC5lbnRpdHkgOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy53b3Jrc3BhY2UkLm5leHQod29ya3NwYWNlKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=