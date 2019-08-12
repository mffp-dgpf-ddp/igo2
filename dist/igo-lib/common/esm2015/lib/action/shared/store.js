/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { EntityStore } from '../../entity';
/**
 * The class is a specialized version of an EntityStore that stores
 * actions.
 */
export class ActionStore extends EntityStore {
    /**
     * Update actions availability. That means disabling or enabling some
     * actions based on the conditions they define.
     * @return {?}
     */
    updateActionsAvailability() {
        /** @type {?} */
        const availables = [];
        /** @type {?} */
        const unavailables = [];
        this.entities$.value.forEach((/**
         * @param {?} action
         * @return {?}
         */
        (action) => {
            /** @type {?} */
            const conditions = action.conditions || [];
            /** @type {?} */
            const args = action.conditionArgs || [];
            /** @type {?} */
            const available = conditions.every((/**
             * @param {?} condition
             * @return {?}
             */
            (condition) => {
                return condition(...args);
            }));
            available ? availables.push(action) : unavailables.push(action);
        }));
        if (unavailables.length > 0) {
            this.state.updateMany(unavailables, {
                disabled: true,
                active: false
            });
        }
        if (availables.length > 0) {
            this.state.updateMany(availables, {
                disabled: false
            });
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb21tb24vIiwic291cmNlcyI6WyJsaWIvYWN0aW9uL3NoYXJlZC9zdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGNBQWMsQ0FBQzs7Ozs7QUFPM0MsTUFBTSxPQUFPLFdBQVksU0FBUSxXQUFtQjs7Ozs7O0lBTWxELHlCQUF5Qjs7Y0FDakIsVUFBVSxHQUFHLEVBQUU7O2NBQ2YsWUFBWSxHQUFHLEVBQUU7UUFFdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTzs7OztRQUFDLENBQUMsTUFBYyxFQUFFLEVBQUU7O2tCQUN4QyxVQUFVLEdBQUcsTUFBTSxDQUFDLFVBQVUsSUFBSSxFQUFFOztrQkFDcEMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxhQUFhLElBQUksRUFBRTs7a0JBQ2pDLFNBQVMsR0FBRyxVQUFVLENBQUMsS0FBSzs7OztZQUFDLENBQUMsU0FBc0MsRUFBRSxFQUFFO2dCQUM1RSxPQUFPLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO1lBQzVCLENBQUMsRUFBQztZQUNGLFNBQVMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNsRSxDQUFDLEVBQUMsQ0FBQztRQUVILElBQUksWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDM0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFO2dCQUNsQyxRQUFRLEVBQUUsSUFBSTtnQkFDZCxNQUFNLEVBQUUsS0FBSzthQUNkLENBQUMsQ0FBQztTQUNKO1FBRUQsSUFBSSxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUN6QixJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUU7Z0JBQ2hDLFFBQVEsRUFBRSxLQUFLO2FBQ2hCLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztDQUVGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW50aXR5U3RvcmUgfSBmcm9tICcuLi8uLi9lbnRpdHknO1xyXG5pbXBvcnQgeyBBY3Rpb24gfSBmcm9tICcuL2FjdGlvbi5pbnRlcmZhY2VzJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgY2xhc3MgaXMgYSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGFuIEVudGl0eVN0b3JlIHRoYXQgc3RvcmVzXHJcbiAqIGFjdGlvbnMuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQWN0aW9uU3RvcmUgZXh0ZW5kcyBFbnRpdHlTdG9yZTxBY3Rpb24+IHtcclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlIGFjdGlvbnMgYXZhaWxhYmlsaXR5LiBUaGF0IG1lYW5zIGRpc2FibGluZyBvciBlbmFibGluZyBzb21lXHJcbiAgICogYWN0aW9ucyBiYXNlZCBvbiB0aGUgY29uZGl0aW9ucyB0aGV5IGRlZmluZS5cclxuICAgKi9cclxuICB1cGRhdGVBY3Rpb25zQXZhaWxhYmlsaXR5KCkge1xyXG4gICAgY29uc3QgYXZhaWxhYmxlcyA9IFtdO1xyXG4gICAgY29uc3QgdW5hdmFpbGFibGVzID0gW107XHJcblxyXG4gICAgdGhpcy5lbnRpdGllcyQudmFsdWUuZm9yRWFjaCgoYWN0aW9uOiBBY3Rpb24pID0+IHtcclxuICAgICAgY29uc3QgY29uZGl0aW9ucyA9IGFjdGlvbi5jb25kaXRpb25zIHx8IFtdO1xyXG4gICAgICBjb25zdCBhcmdzID0gYWN0aW9uLmNvbmRpdGlvbkFyZ3MgfHwgW107XHJcbiAgICAgIGNvbnN0IGF2YWlsYWJsZSA9IGNvbmRpdGlvbnMuZXZlcnkoKGNvbmRpdGlvbjogKC4uLmFyZ3M6IGFueVtdKSA9PiBib29sZWFuKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGNvbmRpdGlvbiguLi5hcmdzKTtcclxuICAgICAgfSk7XHJcbiAgICAgIGF2YWlsYWJsZSA/IGF2YWlsYWJsZXMucHVzaChhY3Rpb24pIDogdW5hdmFpbGFibGVzLnB1c2goYWN0aW9uKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGlmICh1bmF2YWlsYWJsZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICB0aGlzLnN0YXRlLnVwZGF0ZU1hbnkodW5hdmFpbGFibGVzLCB7XHJcbiAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgYWN0aXZlOiBmYWxzZVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoYXZhaWxhYmxlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHRoaXMuc3RhdGUudXBkYXRlTWFueShhdmFpbGFibGVzLCB7XHJcbiAgICAgICAgZGlzYWJsZWQ6IGZhbHNlXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn1cclxuIl19