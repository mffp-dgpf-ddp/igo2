/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { EntityStore } from '../../entity';
import { BehaviorSubject } from 'rxjs';
/**
 * The class is a specialized version of an EntityStore that stores
 * workspaces.
 */
var /**
 * The class is a specialized version of an EntityStore that stores
 * workspaces.
 */
WorkspaceStore = /** @class */ (function (_super) {
    tslib_1.__extends(WorkspaceStore, _super);
    function WorkspaceStore() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.activeWorkspace$ = new BehaviorSubject(undefined);
        return _this;
    }
    /**
     * Activate the an workspace workspace and deactivate the one currently active
     * @param workspace Workspace
     */
    /**
     * Activate the an workspace workspace and deactivate the one currently active
     * @param {?} workspace Workspace
     * @return {?}
     */
    WorkspaceStore.prototype.activateWorkspace = /**
     * Activate the an workspace workspace and deactivate the one currently active
     * @param {?} workspace Workspace
     * @return {?}
     */
    function (workspace) {
        /** @type {?} */
        var active = this.activeWorkspace$.value;
        if (active !== undefined) {
            active.deactivate();
        }
        this.deactivateWorkspace();
        if (workspace !== undefined) {
            this.state.update(workspace, { active: true, selected: true }, true);
            this.activeWorkspace$.next(workspace);
            workspace.activate();
        }
    };
    /**
     * Deactivate the current workspace
     * @param workspace Workspace
     */
    /**
     * Deactivate the current workspace
     * @return {?}
     */
    WorkspaceStore.prototype.deactivateWorkspace = /**
     * Deactivate the current workspace
     * @return {?}
     */
    function () {
        /** @type {?} */
        var active = this.activeWorkspace$.value;
        if (active !== undefined) {
            active.deactivate();
            this.activeWorkspace$.next(undefined);
        }
    };
    return WorkspaceStore;
}(EntityStore));
/**
 * The class is a specialized version of an EntityStore that stores
 * workspaces.
 */
export { WorkspaceStore };
if (false) {
    /** @type {?} */
    WorkspaceStore.prototype.activeWorkspace$;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb21tb24vIiwic291cmNlcyI6WyJsaWIvd29ya3NwYWNlL3NoYXJlZC9zdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQzs7Ozs7QUFNdkM7Ozs7O0lBQW9DLDBDQUFzQjtJQUExRDtRQUFBLHFFQWtDQztRQWhDQyxzQkFBZ0IsR0FBK0IsSUFBSSxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7O0lBZ0NoRixDQUFDO0lBOUJDOzs7T0FHRzs7Ozs7O0lBQ0gsMENBQWlCOzs7OztJQUFqQixVQUFrQixTQUFvQjs7WUFDOUIsTUFBTSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLO1FBQzFDLElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtZQUN4QixNQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDckI7UUFFRCxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUMzQixJQUFJLFNBQVMsS0FBSyxTQUFTLEVBQUU7WUFDM0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDbkUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN0QyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDdEI7SUFDSCxDQUFDO0lBRUQ7OztPQUdHOzs7OztJQUNILDRDQUFtQjs7OztJQUFuQjs7WUFDUSxNQUFNLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUs7UUFDMUMsSUFBSSxNQUFNLEtBQUssU0FBUyxFQUFFO1lBQ3hCLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNwQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ3ZDO0lBQ0gsQ0FBQztJQUVILHFCQUFDO0FBQUQsQ0FBQyxBQWxDRCxDQUFvQyxXQUFXLEdBa0M5Qzs7Ozs7Ozs7SUFoQ0MsMENBQThFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW50aXR5U3RvcmUgfSBmcm9tICcuLi8uLi9lbnRpdHknO1xyXG5pbXBvcnQgeyBXb3Jrc3BhY2UgfSBmcm9tICcuL3dvcmtzcGFjZSc7XHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBjbGFzcyBpcyBhIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYW4gRW50aXR5U3RvcmUgdGhhdCBzdG9yZXNcclxuICogd29ya3NwYWNlcy5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBXb3Jrc3BhY2VTdG9yZSBleHRlbmRzIEVudGl0eVN0b3JlPFdvcmtzcGFjZT4ge1xyXG5cclxuICBhY3RpdmVXb3Jrc3BhY2UkOiBCZWhhdmlvclN1YmplY3Q8V29ya3NwYWNlPiA9IG5ldyBCZWhhdmlvclN1YmplY3QodW5kZWZpbmVkKTtcclxuXHJcbiAgLyoqXHJcbiAgICogQWN0aXZhdGUgdGhlIGFuIHdvcmtzcGFjZSB3b3Jrc3BhY2UgYW5kIGRlYWN0aXZhdGUgdGhlIG9uZSBjdXJyZW50bHkgYWN0aXZlXHJcbiAgICogQHBhcmFtIHdvcmtzcGFjZSBXb3Jrc3BhY2VcclxuICAgKi9cclxuICBhY3RpdmF0ZVdvcmtzcGFjZSh3b3Jrc3BhY2U6IFdvcmtzcGFjZSkge1xyXG4gICAgY29uc3QgYWN0aXZlID0gdGhpcy5hY3RpdmVXb3Jrc3BhY2UkLnZhbHVlO1xyXG4gICAgaWYgKGFjdGl2ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGFjdGl2ZS5kZWFjdGl2YXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5kZWFjdGl2YXRlV29ya3NwYWNlKCk7XHJcbiAgICBpZiAod29ya3NwYWNlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5zdGF0ZS51cGRhdGUod29ya3NwYWNlLCB7YWN0aXZlOiB0cnVlLCBzZWxlY3RlZDogdHJ1ZX0sIHRydWUpO1xyXG4gICAgICB0aGlzLmFjdGl2ZVdvcmtzcGFjZSQubmV4dCh3b3Jrc3BhY2UpO1xyXG4gICAgICB3b3Jrc3BhY2UuYWN0aXZhdGUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERlYWN0aXZhdGUgdGhlIGN1cnJlbnQgd29ya3NwYWNlXHJcbiAgICogQHBhcmFtIHdvcmtzcGFjZSBXb3Jrc3BhY2VcclxuICAgKi9cclxuICBkZWFjdGl2YXRlV29ya3NwYWNlKCkge1xyXG4gICAgY29uc3QgYWN0aXZlID0gdGhpcy5hY3RpdmVXb3Jrc3BhY2UkLnZhbHVlO1xyXG4gICAgaWYgKGFjdGl2ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGFjdGl2ZS5kZWFjdGl2YXRlKCk7XHJcbiAgICAgIHRoaXMuYWN0aXZlV29ya3NwYWNlJC5uZXh0KHVuZGVmaW5lZCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=