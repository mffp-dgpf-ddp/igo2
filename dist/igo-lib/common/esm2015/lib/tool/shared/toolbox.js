/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { EntityStore } from '../../entity';
import { BehaviorSubject } from 'rxjs';
/**
 * Service where all available tools and their component are registered.
 */
export class Toolbox {
    /**
     * @param {?=} options
     */
    constructor(options = {}) {
        this.options = options;
        /**
         * Observable of the active tool
         */
        this.activeTool$ = new BehaviorSubject(undefined);
        /**
         * Ordered list of tool names to display in a toolbar
         */
        this.toolbar$ = new BehaviorSubject([]);
        /**
         * Active tool history. Useful for activating the previous tool.
         */
        this.activeToolHistory = [];
        /**
         * Tool store
         */
        this.store = new EntityStore([], {
            getKey: (/**
             * @param {?} tool
             * @return {?}
             */
            (tool) => tool.name)
        });
        this.setToolbar(options.toolbar);
        this.initStore();
    }
    /**
     * @return {?}
     */
    get tools$() {
        return this.store.entities$;
    }
    /**
     * Destroy the toolbox
     * @return {?}
     */
    destroy() {
        this.activeTool$$.unsubscribe();
        this.store.destroy();
    }
    /**
     * Return a tool
     * @param {?} name Tool name
     * @return {?} tool Tool
     */
    getTool(name) {
        return this.store.get(name);
    }
    /**
     * Return all tools
     * @return {?} Array of tools
     */
    getTools() {
        return this.store.all();
    }
    /**
     * Set tool configurations
     * @param {?} tools Tools
     * @return {?}
     */
    setTools(tools) {
        this.store.load(tools);
    }
    /**
     * Set toolbar
     * @param {?} toolbar A list of tool names
     * @return {?}
     */
    setToolbar(toolbar) {
        this.toolbar$.next(toolbar || []);
    }
    /**
     * Activate a tool (and deactivate other tools)
     * @param {?} name Tool name
     * @param {?=} options Tool options
     * @return {?}
     */
    activateTool(name, options = {}) {
        /** @type {?} */
        const tool = this.getTool(name);
        if (tool === undefined) {
            return;
        }
        this.store.state.update(tool, { active: true, options }, true);
    }
    /**
     * Activate the previous tool, if any
     * @return {?}
     */
    activatePreviousTool() {
        if (this.activeToolHistory.length <= 1) {
            this.deactivateTool();
            return;
        }
        const [previous, current] = this.activeToolHistory.splice(-2, 2);
        this.activateTool(previous);
    }
    /**
     * Deactivate the active tool
     * @return {?}
     */
    deactivateTool() {
        this.clearActiveToolHistory();
        this.store.state.updateAll({ active: false });
    }
    /**
     * Initialize the tool store and start observing the active tool
     * @private
     * @return {?}
     */
    initStore() {
        this.store = new EntityStore([], {
            getKey: (/**
             * @param {?} entity
             * @return {?}
             */
            (entity) => entity.name)
        });
        this.activeTool$$ = this.store.stateView
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
            if (record === undefined) {
                this.setActiveTool(undefined);
                return;
            }
            /** @type {?} */
            const tool = record.entity;
            /** @type {?} */
            const options = Object.assign({}, tool.options || {}, record.state.options || {});
            this.setActiveTool(Object.assign({}, tool, { options }));
        }));
    }
    /**
     * Set the active tool and update the tool history
     * @private
     * @param {?} tool Tool
     * @return {?}
     */
    setActiveTool(tool) {
        this.activeTool$.next(tool);
        if (tool === undefined) {
            this.clearActiveToolHistory();
        }
        else {
            this.activeToolHistory = this.activeToolHistory
                .filter((/**
             * @param {?} name
             * @return {?}
             */
            (name) => name !== tool.name))
                .concat([tool.name]);
        }
    }
    /**
     * Clear the tool history
     * @private
     * @return {?}
     */
    clearActiveToolHistory() {
        this.activeToolHistory = [];
    }
}
if (false) {
    /**
     * Observable of the active tool
     * @type {?}
     */
    Toolbox.prototype.activeTool$;
    /**
     * Ordered list of tool names to display in a toolbar
     * @type {?}
     */
    Toolbox.prototype.toolbar$;
    /**
     * Observable of the active tool
     * @type {?}
     * @private
     */
    Toolbox.prototype.activeTool$$;
    /**
     * Active tool history. Useful for activating the previous tool.
     * @type {?}
     * @private
     */
    Toolbox.prototype.activeToolHistory;
    /**
     * Tool store
     * @type {?}
     * @private
     */
    Toolbox.prototype.store;
    /**
     * @type {?}
     * @private
     */
    Toolbox.prototype.options;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbGJveC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi90b29sL3NoYXJlZC90b29sYm94LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWdCLFdBQVcsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUV6RCxPQUFPLEVBQUUsZUFBZSxFQUFnQixNQUFNLE1BQU0sQ0FBQzs7OztBQUtyRCxNQUFNLE9BQU8sT0FBTzs7OztJQWdDbEIsWUFBb0IsVUFBMEIsRUFBRTtRQUE1QixZQUFPLEdBQVAsT0FBTyxDQUFxQjs7OztRQTVCaEQsZ0JBQVcsR0FBMEIsSUFBSSxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7Ozs7UUFLcEUsYUFBUSxHQUE4QixJQUFJLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQzs7OztRQVV0RCxzQkFBaUIsR0FBYSxFQUFFLENBQUM7Ozs7UUFLakMsVUFBSyxHQUFHLElBQUksV0FBVyxDQUFPLEVBQUUsRUFBRTtZQUN4QyxNQUFNOzs7O1lBQUUsQ0FBQyxJQUFVLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUE7U0FDbEMsQ0FBQyxDQUFDO1FBT0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ25CLENBQUM7Ozs7SUFQRCxJQUFJLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO0lBQzlCLENBQUM7Ozs7O0lBVUQsT0FBTztRQUNMLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDaEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUN2QixDQUFDOzs7Ozs7SUFPRCxPQUFPLENBQUMsSUFBWTtRQUNsQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFD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LGlCQUFpQjtpQkFDNUMsTUFBTTs7OztZQUFDLENBQUMsSUFBWSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLElBQUksRUFBQztpQkFDNUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDeEI7SUFDSCxDQUFDOzs7Ozs7SUFLTyxzQkFBc0I7UUFDNUIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztJQUM5QixDQUFDO0NBQ0Y7Ozs7OztJQTNKQyw4QkFBb0U7Ozs7O0lBS3BFLDJCQUE4RDs7Ozs7O0lBSzlELCtCQUFtQzs7Ozs7O0lBS25DLG9DQUF5Qzs7Ozs7O0lBS3pDLHdCQUVHOzs7OztJQU1TLDBCQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVudGl0eVJlY29yZCwgRW50aXR5U3RvcmUgfSBmcm9tICcuLi8uLi9lbnRpdHknO1xyXG5pbXBvcnQgeyBUb29sLCBUb29sYm94T3B0aW9ucyB9IGZyb20gJy4vdG9vbC5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5cclxuLyoqXHJcbiAqIFNlcnZpY2Ugd2hlcmUgYWxsIGF2YWlsYWJsZSB0b29scyBhbmQgdGhlaXIgY29tcG9uZW50IGFyZSByZWdpc3RlcmVkLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFRvb2xib3gge1xyXG4gIC8qKlxyXG4gICAqIE9ic2VydmFibGUgb2YgdGhlIGFjdGl2ZSB0b29sXHJcbiAgICovXHJcbiAgYWN0aXZlVG9vbCQ6IEJlaGF2aW9yU3ViamVjdDxUb29sPiA9IG5ldyBCZWhhdmlvclN1YmplY3QodW5kZWZpbmVkKTtcclxuXHJcbiAgLyoqXHJcbiAgICogT3JkZXJlZCBsaXN0IG9mIHRvb2wgbmFtZXMgdG8gZGlzcGxheSBpbiBhIHRvb2xiYXJcclxuICAgKi9cclxuICB0b29sYmFyJDogQmVoYXZpb3JTdWJqZWN0PHN0cmluZ1tdPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoW10pO1xyXG5cclxuICAvKipcclxuICAgKiBPYnNlcnZhYmxlIG9mIHRoZSBhY3RpdmUgdG9vbFxyXG4gICAqL1xyXG4gIHByaXZhdGUgYWN0aXZlVG9vbCQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIEFjdGl2ZSB0b29sIGhpc3RvcnkuIFVzZWZ1bCBmb3IgYWN0aXZhdGluZyB0aGUgcHJldmlvdXMgdG9vbC5cclxuICAgKi9cclxuICBwcml2YXRlIGFjdGl2ZVRvb2xIaXN0b3J5OiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICAvKipcclxuICAgKiBUb29sIHN0b3JlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzdG9yZSA9IG5ldyBFbnRpdHlTdG9yZTxUb29sPihbXSwge1xyXG4gICAgZ2V0S2V5OiAodG9vbDogVG9vbCkgPT4gdG9vbC5uYW1lXHJcbiAgfSk7XHJcblxyXG4gIGdldCB0b29scyQoKTogQmVoYXZpb3JTdWJqZWN0PFRvb2xbXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuZW50aXRpZXMkO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBvcHRpb25zOiBUb29sYm94T3B0aW9ucyA9IHt9KSB7XHJcbiAgICB0aGlzLnNldFRvb2xiYXIob3B0aW9ucy50b29sYmFyKTtcclxuICAgIHRoaXMuaW5pdFN0b3JlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZXN0cm95IHRoZSB0b29sYm94XHJcbiAgICovXHJcbiAgZGVzdHJveSgpIHtcclxuICAgIHRoaXMuYWN0aXZlVG9vbCQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB0aGlzLnN0b3JlLmRlc3Ryb3koKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybiBhIHRvb2xcclxuICAgKiBAcGFyYW0gbmFtZSBUb29sIG5hbWVcclxuICAgKiBAcmV0dXJucyB0b29sIFRvb2xcclxuICAgKi9cclxuICBnZXRUb29sKG5hbWU6IHN0cmluZyk6IFRvb2wge1xyXG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuZ2V0KG5hbWUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJuIGFsbCB0b29sc1xyXG4gICAqIEByZXR1cm5zIEFycmF5IG9mIHRvb2xzXHJcbiAgICovXHJcbiAgZ2V0VG9vbHMoKTogVG9vbFtdIHtcclxuICAgIHJldHVybiB0aGlzLnN0b3JlLmFsbCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IHRvb2wgY29uZmlndXJhdGlvbnNcclxuICAgKiBAcGFyYW0gdG9vbHMgVG9vbHNcclxuICAgKi9cclxuICBzZXRUb29scyh0b29sczogVG9vbFtdKSB7XHJcbiAgICB0aGlzLnN0b3JlLmxvYWQodG9vbHMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IHRvb2xiYXJcclxuICAgKiBAcGFyYW0gdG9vbGJhciBBIGxpc3Qgb2YgdG9vbCBuYW1lc1xyXG4gICAqL1xyXG4gIHNldFRvb2xiYXIodG9vbGJhcjogc3RyaW5nW10pIHtcclxuICAgIHRoaXMudG9vbGJhciQubmV4dCh0b29sYmFyIHx8IFtdKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFjdGl2YXRlIGEgdG9vbCAoYW5kIGRlYWN0aXZhdGUgb3RoZXIgdG9vbHMpXHJcbiAgICogQHBhcmFtIG5hbWUgVG9vbCBuYW1lXHJcbiAgICogQHBhcmFtIG9wdGlvbnMgVG9vbCBvcHRpb25zXHJcbiAgICovXHJcbiAgYWN0aXZhdGVUb29sKG5hbWU6IHN0cmluZywgb3B0aW9uczogeyBba2V5OiBzdHJpbmddOiBhbnkgfSA9IHt9KSB7XHJcbiAgICBjb25zdCB0b29sID0gdGhpcy5nZXRUb29sKG5hbWUpO1xyXG4gICAgaWYgKHRvb2wgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zdG9yZS5zdGF0ZS51cGRhdGUodG9vbCwgeyBhY3RpdmU6IHRydWUsIG9wdGlvbnMgfSwgdHJ1ZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBY3RpdmF0ZSB0aGUgcHJldmlvdXMgdG9vbCwgaWYgYW55XHJcbiAgICovXHJcbiAgYWN0aXZhdGVQcmV2aW91c1Rvb2woKSB7XHJcbiAgICBpZiAodGhpcy5hY3RpdmVUb29sSGlzdG9yeS5sZW5ndGggPD0gMSkge1xyXG4gICAgICB0aGlzLmRlYWN0aXZhdGVUb29sKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IFtwcmV2aW91cywgY3VycmVudF0gPSB0aGlzLmFjdGl2ZVRvb2xIaXN0b3J5LnNwbGljZSgtMiwgMik7XHJcbiAgICB0aGlzLmFjdGl2YXRlVG9vbChwcmV2aW91cyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZWFjdGl2YXRlIHRoZSBhY3RpdmUgdG9vbFxyXG4gICAqL1xyXG4gIGRlYWN0aXZhdGVUb29sKCkge1xyXG4gICAgdGhpcy5jbGVhckFjdGl2ZVRvb2xIaXN0b3J5KCk7XHJcbiAgICB0aGlzLnN0b3JlLnN0YXRlLnVwZGF0ZUFsbCh7IGFjdGl2ZTogZmFsc2UgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbml0aWFsaXplIHRoZSB0b29sIHN0b3JlIGFuZCBzdGFydCBvYnNlcnZpbmcgdGhlIGFjdGl2ZSB0b29sXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBpbml0U3RvcmUoKSB7XHJcbiAgICB0aGlzLnN0b3JlID0gbmV3IEVudGl0eVN0b3JlPFRvb2w+KFtdLCB7XHJcbiAgICAgIGdldEtleTogKGVudGl0eTogVG9vbCkgPT4gZW50aXR5Lm5hbWVcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuYWN0aXZlVG9vbCQkID0gdGhpcy5zdG9yZS5zdGF0ZVZpZXdcclxuICAgICAgLmZpcnN0QnkkKChyZWNvcmQ6IEVudGl0eVJlY29yZDxUb29sPikgPT4gcmVjb3JkLnN0YXRlLmFjdGl2ZSA9PT0gdHJ1ZSlcclxuICAgICAgLnN1YnNjcmliZSgocmVjb3JkOiBFbnRpdHlSZWNvcmQ8VG9vbD4pID0+IHtcclxuICAgICAgICBpZiAocmVjb3JkID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIHRoaXMuc2V0QWN0aXZlVG9vbCh1bmRlZmluZWQpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgdG9vbCA9IHJlY29yZC5lbnRpdHk7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oXHJcbiAgICAgICAgICB7fSxcclxuICAgICAgICAgIHRvb2wub3B0aW9ucyB8fCB7fSxcclxuICAgICAgICAgIHJlY29yZC5zdGF0ZS5vcHRpb25zIHx8IHt9XHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLnNldEFjdGl2ZVRvb2woT2JqZWN0LmFzc2lnbih7fSwgdG9vbCwgeyBvcHRpb25zIH0pKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgdGhlIGFjdGl2ZSB0b29sIGFuZCB1cGRhdGUgdGhlIHRvb2wgaGlzdG9yeVxyXG4gICAqIEBwYXJhbSB0b29sIFRvb2xcclxuICAgKi9cclxuICBwcml2YXRlIHNldEFjdGl2ZVRvb2wodG9vbDogVG9vbCB8IHVuZGVmaW5lZCkge1xyXG4gICAgdGhpcy5hY3RpdmVUb29sJC5uZXh0KHRvb2wpO1xyXG4gICAgaWYgKHRvb2wgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLmNsZWFyQWN0aXZlVG9vbEhpc3RvcnkoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuYWN0aXZlVG9vbEhpc3RvcnkgPSB0aGlzLmFjdGl2ZVRvb2xIaXN0b3J5XHJcbiAgICAgICAgLmZpbHRlcigobmFtZTogc3RyaW5nKSA9PiBuYW1lICE9PSB0b29sLm5hbWUpXHJcbiAgICAgICAgLmNvbmNhdChbdG9vbC5uYW1lXSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDbGVhciB0aGUgdG9vbCBoaXN0b3J5XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjbGVhckFjdGl2ZVRvb2xIaXN0b3J5KCkge1xyXG4gICAgdGhpcy5hY3RpdmVUb29sSGlzdG9yeSA9IFtdO1xyXG4gIH1cclxufVxyXG4iXX0=