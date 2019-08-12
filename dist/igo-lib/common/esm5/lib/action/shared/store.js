/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { EntityStore } from '../../entity';
/**
 * The class is a specialized version of an EntityStore that stores
 * actions.
 */
var /**
 * The class is a specialized version of an EntityStore that stores
 * actions.
 */
ActionStore = /** @class */ (function (_super) {
    tslib_1.__extends(ActionStore, _super);
    function ActionStore() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Update actions availability. That means disabling or enabling some
     * actions based on the conditions they define.
     */
    /**
     * Update actions availability. That means disabling or enabling some
     * actions based on the conditions they define.
     * @return {?}
     */
    ActionStore.prototype.updateActionsAvailability = /**
     * Update actions availability. That means disabling or enabling some
     * actions based on the conditions they define.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var availables = [];
        /** @type {?} */
        var unavailables = [];
        this.entities$.value.forEach((/**
         * @param {?} action
         * @return {?}
         */
        function (action) {
            /** @type {?} */
            var conditions = action.conditions || [];
            /** @type {?} */
            var args = action.conditionArgs || [];
            /** @type {?} */
            var available = conditions.every((/**
             * @param {?} condition
             * @return {?}
             */
            function (condition) {
                return condition.apply(void 0, tslib_1.__spread(args));
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
    };
    return ActionStore;
}(EntityStore));
/**
 * The class is a specialized version of an EntityStore that stores
 * actions.
 */
export { ActionStore };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9jb21tb24vIiwic291cmNlcyI6WyJsaWIvYWN0aW9uL3NoYXJlZC9zdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxjQUFjLENBQUM7Ozs7O0FBTzNDOzs7OztJQUFpQyx1Q0FBbUI7SUFBcEQ7O0lBaUNBLENBQUM7SUEvQkM7OztPQUdHOzs7Ozs7SUFDSCwrQ0FBeUI7Ozs7O0lBQXpCOztZQUNRLFVBQVUsR0FBRyxFQUFFOztZQUNmLFlBQVksR0FBRyxFQUFFO1FBRXZCLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU87Ozs7UUFBQyxVQUFDLE1BQWM7O2dCQUNwQyxVQUFVLEdBQUcsTUFBTSxDQUFDLFVBQVUsSUFBSSxFQUFFOztnQkFDcEMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxhQUFhLElBQUksRUFBRTs7Z0JBQ2pDLFNBQVMsR0FBRyxVQUFVLENBQUMsS0FBSzs7OztZQUFDLFVBQUMsU0FBc0M7Z0JBQ3hFLE9BQU8sU0FBUyxnQ0FBSSxJQUFJLEdBQUU7WUFDNUIsQ0FBQyxFQUFDO1lBQ0YsU0FBUyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2xFLENBQUMsRUFBQyxDQUFDO1FBRUgsSUFBSSxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUMzQixJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUU7Z0JBQ2xDLFFBQVEsRUFBRSxJQUFJO2dCQUNkLE1BQU0sRUFBRSxLQUFLO2FBQ2QsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxJQUFJLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3pCLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRTtnQkFDaEMsUUFBUSxFQUFFLEtBQUs7YUFDaEIsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRUgsa0JBQUM7QUFBRCxDQUFDLEFBakNELENBQWlDLFdBQVcsR0FpQzNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW50aXR5U3RvcmUgfSBmcm9tICcuLi8uLi9lbnRpdHknO1xyXG5pbXBvcnQgeyBBY3Rpb24gfSBmcm9tICcuL2FjdGlvbi5pbnRlcmZhY2VzJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgY2xhc3MgaXMgYSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGFuIEVudGl0eVN0b3JlIHRoYXQgc3RvcmVzXHJcbiAqIGFjdGlvbnMuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQWN0aW9uU3RvcmUgZXh0ZW5kcyBFbnRpdHlTdG9yZTxBY3Rpb24+IHtcclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlIGFjdGlvbnMgYXZhaWxhYmlsaXR5LiBUaGF0IG1lYW5zIGRpc2FibGluZyBvciBlbmFibGluZyBzb21lXHJcbiAgICogYWN0aW9ucyBiYXNlZCBvbiB0aGUgY29uZGl0aW9ucyB0aGV5IGRlZmluZS5cclxuICAgKi9cclxuICB1cGRhdGVBY3Rpb25zQXZhaWxhYmlsaXR5KCkge1xyXG4gICAgY29uc3QgYXZhaWxhYmxlcyA9IFtdO1xyXG4gICAgY29uc3QgdW5hdmFpbGFibGVzID0gW107XHJcblxyXG4gICAgdGhpcy5lbnRpdGllcyQudmFsdWUuZm9yRWFjaCgoYWN0aW9uOiBBY3Rpb24pID0+IHtcclxuICAgICAgY29uc3QgY29uZGl0aW9ucyA9IGFjdGlvbi5jb25kaXRpb25zIHx8IFtdO1xyXG4gICAgICBjb25zdCBhcmdzID0gYWN0aW9uLmNvbmRpdGlvbkFyZ3MgfHwgW107XHJcbiAgICAgIGNvbnN0IGF2YWlsYWJsZSA9IGNvbmRpdGlvbnMuZXZlcnkoKGNvbmRpdGlvbjogKC4uLmFyZ3M6IGFueVtdKSA9PiBib29sZWFuKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGNvbmRpdGlvbiguLi5hcmdzKTtcclxuICAgICAgfSk7XHJcbiAgICAgIGF2YWlsYWJsZSA/IGF2YWlsYWJsZXMucHVzaChhY3Rpb24pIDogdW5hdmFpbGFibGVzLnB1c2goYWN0aW9uKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGlmICh1bmF2YWlsYWJsZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICB0aGlzLnN0YXRlLnVwZGF0ZU1hbnkodW5hdmFpbGFibGVzLCB7XHJcbiAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgYWN0aXZlOiBmYWxzZVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoYXZhaWxhYmxlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHRoaXMuc3RhdGUudXBkYXRlTWFueShhdmFpbGFibGVzLCB7XHJcbiAgICAgICAgZGlzYWJsZWQ6IGZhbHNlXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn1cclxuIl19