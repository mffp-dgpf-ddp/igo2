/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { EntityStore } from '../../entity';
import { BehaviorSubject } from 'rxjs';
/**
 * The class is a specialized version of an EntityStore that stores
 * workspaces.
 */
export class WorkspaceStore extends EntityStore {
    constructor() {
        super(...arguments);
        this.activeWorkspace$ = new BehaviorSubject(undefined);
    }
    /**
     * Activate the an workspace workspace and deactivate the one currently active
     * @param {?} workspace Workspace
     * @return {?}
     */
    activateWorkspace(workspace) {
        /** @type {?} */
        const active = this.activeWorkspace$.value;
        if (active !== undefined) {
            active.deactivate();
        }
        this.deactivateWorkspace();
        if (workspace !== undefined) {
            this.state.update(workspace, { active: true, selected: true }, true);
            this.activeWorkspace$.next(workspace);
            workspace.activate();
        }
    }
    /**
     * Deactivate the current workspace
     * @return {?}
     */
    deactivateWorkspace() {
        /** @type {?} */
        const active = this.activeWorkspace$.value;
        if (active !== undefined) {
            active.deactivate();
            this.activeWorkspace$.next(undefined);
        }
    }
}
if (false) {
    /** @type {?} */
    WorkspaceStore.prototype.activeWorkspace$;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb21tb24vIiwic291cmNlcyI6WyJsaWIvd29ya3NwYWNlL3NoYXJlZC9zdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUUzQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7OztBQU12QyxNQUFNLE9BQU8sY0FBZSxTQUFRLFdBQXNCO0lBQTFEOztRQUVFLHFCQUFnQixHQUErQixJQUFJLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQWdDaEYsQ0FBQzs7Ozs7O0lBMUJDLGlCQUFpQixDQUFDLFNBQW9COztjQUM5QixNQUFNLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUs7UUFDMUMsSUFBSSxNQUFNLEtBQUssU0FBUyxFQUFFO1lBQ3hCLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNyQjtRQUVELElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQzNCLElBQUksU0FBUyxLQUFLLFNBQVMsRUFBRTtZQUMzQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNuRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3RDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUN0QjtJQUNILENBQUM7Ozs7O0lBTUQsbUJBQW1COztjQUNYLE1BQU0sR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSztRQUMxQyxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7WUFDeEIsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDdkM7SUFDSCxDQUFDO0NBRUY7OztJQWhDQywwQ0FBOEUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbnRpdHlTdG9yZSB9IGZyb20gJy4uLy4uL2VudGl0eSc7XHJcbmltcG9ydCB7IFdvcmtzcGFjZSB9IGZyb20gJy4vd29ya3NwYWNlJztcclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG4vKipcclxuICogVGhlIGNsYXNzIGlzIGEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBhbiBFbnRpdHlTdG9yZSB0aGF0IHN0b3Jlc1xyXG4gKiB3b3Jrc3BhY2VzLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFdvcmtzcGFjZVN0b3JlIGV4dGVuZHMgRW50aXR5U3RvcmU8V29ya3NwYWNlPiB7XHJcblxyXG4gIGFjdGl2ZVdvcmtzcGFjZSQ6IEJlaGF2aW9yU3ViamVjdDxXb3Jrc3BhY2U+ID0gbmV3IEJlaGF2aW9yU3ViamVjdCh1bmRlZmluZWQpO1xyXG5cclxuICAvKipcclxuICAgKiBBY3RpdmF0ZSB0aGUgYW4gd29ya3NwYWNlIHdvcmtzcGFjZSBhbmQgZGVhY3RpdmF0ZSB0aGUgb25lIGN1cnJlbnRseSBhY3RpdmVcclxuICAgKiBAcGFyYW0gd29ya3NwYWNlIFdvcmtzcGFjZVxyXG4gICAqL1xyXG4gIGFjdGl2YXRlV29ya3NwYWNlKHdvcmtzcGFjZTogV29ya3NwYWNlKSB7XHJcbiAgICBjb25zdCBhY3RpdmUgPSB0aGlzLmFjdGl2ZVdvcmtzcGFjZSQudmFsdWU7XHJcbiAgICBpZiAoYWN0aXZlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgYWN0aXZlLmRlYWN0aXZhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmRlYWN0aXZhdGVXb3Jrc3BhY2UoKTtcclxuICAgIGlmICh3b3Jrc3BhY2UgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLnN0YXRlLnVwZGF0ZSh3b3Jrc3BhY2UsIHthY3RpdmU6IHRydWUsIHNlbGVjdGVkOiB0cnVlfSwgdHJ1ZSk7XHJcbiAgICAgIHRoaXMuYWN0aXZlV29ya3NwYWNlJC5uZXh0KHdvcmtzcGFjZSk7XHJcbiAgICAgIHdvcmtzcGFjZS5hY3RpdmF0ZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGVhY3RpdmF0ZSB0aGUgY3VycmVudCB3b3Jrc3BhY2VcclxuICAgKiBAcGFyYW0gd29ya3NwYWNlIFdvcmtzcGFjZVxyXG4gICAqL1xyXG4gIGRlYWN0aXZhdGVXb3Jrc3BhY2UoKSB7XHJcbiAgICBjb25zdCBhY3RpdmUgPSB0aGlzLmFjdGl2ZVdvcmtzcGFjZSQudmFsdWU7XHJcbiAgICBpZiAoYWN0aXZlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgYWN0aXZlLmRlYWN0aXZhdGUoKTtcclxuICAgICAgdGhpcy5hY3RpdmVXb3Jrc3BhY2UkLm5leHQodW5kZWZpbmVkKTtcclxuICAgIH1cclxuICB9XHJcblxyXG59XHJcbiJdfQ==