/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { EntityStore } from '../../entity';
import { BehaviorSubject } from 'rxjs';
/**
 * Service where all available tools and their component are registered.
 */
var /**
 * Service where all available tools and their component are registered.
 */
Toolbox = /** @class */ (function () {
    function Toolbox(options) {
        if (options === void 0) { options = {}; }
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
            function (tool) { return tool.name; })
        });
        this.setToolbar(options.toolbar);
        this.initStore();
    }
    Object.defineProperty(Toolbox.prototype, "tools$", {
        get: /**
         * @return {?}
         */
        function () {
            return this.store.entities$;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Destroy the toolbox
     */
    /**
     * Destroy the toolbox
     * @return {?}
     */
    Toolbox.prototype.destroy = /**
     * Destroy the toolbox
     * @return {?}
     */
    function () {
        this.activeTool$$.unsubscribe();
        this.store.destroy();
    };
    /**
     * Return a tool
     * @param name Tool name
     * @returns tool Tool
     */
    /**
     * Return a tool
     * @param {?} name Tool name
     * @return {?} tool Tool
     */
    Toolbox.prototype.getTool = /**
     * Return a tool
     * @param {?} name Tool name
     * @return {?} tool Tool
     */
    function (name) {
        return this.store.get(name);
    };
    /**
     * Return all tools
     * @returns Array of tools
     */
    /**
     * Return all tools
     * @return {?} Array of tools
     */
    Toolbox.prototype.getTools = /**
     * Return all tools
     * @return {?} Array of tools
     */
    function () {
        return this.store.all();
    };
    /**
     * Set tool configurations
     * @param tools Tools
     */
    /**
     * Set tool configurations
     * @param {?} tools Tools
     * @return {?}
     */
    Toolbox.prototype.setTools = /**
     * Set tool configurations
     * @param {?} tools Tools
     * @return {?}
     */
    function (tools) {
        this.store.load(tools);
    };
    /**
     * Set toolbar
     * @param toolbar A list of tool names
     */
    /**
     * Set toolbar
     * @param {?} toolbar A list of tool names
     * @return {?}
     */
    Toolbox.prototype.setToolbar = /**
     * Set toolbar
     * @param {?} toolbar A list of tool names
     * @return {?}
     */
    function (toolbar) {
        this.toolbar$.next(toolbar || []);
    };
    /**
     * Activate a tool (and deactivate other tools)
     * @param name Tool name
     * @param options Tool options
     */
    /**
     * Activate a tool (and deactivate other tools)
     * @param {?} name Tool name
     * @param {?=} options Tool options
     * @return {?}
     */
    Toolbox.prototype.activateTool = /**
     * Activate a tool (and deactivate other tools)
     * @param {?} name Tool name
     * @param {?=} options Tool options
     * @return {?}
     */
    function (name, options) {
        if (options === void 0) { options = {}; }
        /** @type {?} */
        var tool = this.getTool(name);
        if (tool === undefined) {
            return;
        }
        this.store.state.update(tool, { active: true, options: options }, true);
    };
    /**
     * Activate the previous tool, if any
     */
    /**
     * Activate the previous tool, if any
     * @return {?}
     */
    Toolbox.prototype.activatePreviousTool = /**
     * Activate the previous tool, if any
     * @return {?}
     */
    function () {
        if (this.activeToolHistory.length <= 1) {
            this.deactivateTool();
            return;
        }
        var _a = tslib_1.__read(this.activeToolHistory.splice(-2, 2), 2), previous = _a[0], current = _a[1];
        this.activateTool(previous);
    };
    /**
     * Deactivate the active tool
     */
    /**
     * Deactivate the active tool
     * @return {?}
     */
    Toolbox.prototype.deactivateTool = /**
     * Deactivate the active tool
     * @return {?}
     */
    function () {
        this.clearActiveToolHistory();
        this.store.state.updateAll({ active: false });
    };
    /**
     * Initialize the tool store and start observing the active tool
     */
    /**
     * Initialize the tool store and start observing the active tool
     * @private
     * @return {?}
     */
    Toolbox.prototype.initStore = /**
     * Initialize the tool store and start observing the active tool
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.store = new EntityStore([], {
            getKey: (/**
             * @param {?} entity
             * @return {?}
             */
            function (entity) { return entity.name; })
        });
        this.activeTool$$ = this.store.stateView
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
            if (record === undefined) {
                _this.setActiveTool(undefined);
                return;
            }
            /** @type {?} */
            var tool = record.entity;
            /** @type {?} */
            var options = Object.assign({}, tool.options || {}, record.state.options || {});
            _this.setActiveTool(Object.assign({}, tool, { options: options }));
        }));
    };
    /**
     * Set the active tool and update the tool history
     * @param tool Tool
     */
    /**
     * Set the active tool and update the tool history
     * @private
     * @param {?} tool Tool
     * @return {?}
     */
    Toolbox.prototype.setActiveTool = /**
     * Set the active tool and update the tool history
     * @private
     * @param {?} tool Tool
     * @return {?}
     */
    function (tool) {
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
            function (name) { return name !== tool.name; }))
                .concat([tool.name]);
        }
    };
    /**
     * Clear the tool history
     */
    /**
     * Clear the tool history
     * @private
     * @return {?}
     */
    Toolbox.prototype.clearActiveToolHistory = /**
     * Clear the tool history
     * @private
     * @return {?}
     */
    function () {
        this.activeToolHistory = [];
    };
    return Toolbox;
}());
/**
 * Service where all available tools and their component are registered.
 */
export { Toolbox };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbGJveC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi90b29sL3NoYXJlZC90b29sYm94LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFnQixXQUFXLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFekQsT0FBTyxFQUFFLGVBQWUsRUFBZ0IsTUFBTSxNQUFNLENBQUM7Ozs7QUFLckQ7Ozs7SUFnQ0UsaUJBQW9CLE9BQTRCO1FBQTVCLHdCQUFBLEVBQUEsWUFBNEI7UUFBNUIsWUFBTyxHQUFQLE9BQU8sQ0FBcUI7Ozs7UUE1QmhELGdCQUFXLEdBQTBCLElBQUksZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDOzs7O1FBS3BFLGFBQVEsR0FBOEIsSUFBSSxlQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7Ozs7UUFVdEQsc0JBQWlCLEdBQWEsRUFBRSxDQUFDOzs7O1FBS2pDLFVBQUssR0FBRyxJQUFJLFdBQVcsQ0FBTyxFQUFFLEVBQUU7WUFDeEMsTUFBTTs7OztZQUFFLFVBQUMsSUFBVSxJQUFLLE9BQUEsSUFBSSxDQUFDLElBQUksRUFBVCxDQUFTLENBQUE7U0FDbEMsQ0FBQyxDQUFDO1FBT0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFQRCxzQkFBSSwyQkFBTTs7OztRQUFWO1lBQ0UsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztRQUM5QixDQUFDOzs7T0FBQTtJQU9EOztPQUVHOzs7OztJQUNILHlCQUFPOzs7O0lBQVA7UUFDRSxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVEOzs7O09BSUc7Ozs7OztJQUNILHlCQUFPOzs7OztJQUFQ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QUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7O09BR0c7Ozs7Ozs7SUFDSywrQkFBYTs7Ozs7O0lBQXJCLFVBQXNCLElBQXNCO1FBQzFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRTtZQUN0QixJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztTQUMvQjthQUFNO1lBQ0wsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxpQkFBaUI7aUJBQzVDLE1BQU07Ozs7WUFBQyxVQUFDLElBQVksSUFBSyxPQUFBLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxFQUFsQixDQUFrQixFQUFDO2lCQUM1QyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUN4QjtJQUNILENBQUM7SUFFRDs7T0FFRzs7Ozs7O0lBQ0ssd0NBQXNCOzs7OztJQUE5QjtRQUNFLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUNILGNBQUM7QUFBRCxDQUFDLEFBL0pELElBK0pDOzs7Ozs7Ozs7O0lBM0pDLDhCQUFvRTs7Ozs7SUFLcEUsMkJBQThEOzs7Ozs7SUFLOUQsK0JBQW1DOzs7Ozs7SUFLbkMsb0NBQXlDOzs7Ozs7SUFLekMsd0JBRUc7Ozs7O0lBTVMsMEJBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW50aXR5UmVjb3JkLCBFbnRpdHlTdG9yZSB9IGZyb20gJy4uLy4uL2VudGl0eSc7XHJcbmltcG9ydCB7IFRvb2wsIFRvb2xib3hPcHRpb25zIH0gZnJvbSAnLi90b29sLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcblxyXG4vKipcclxuICogU2VydmljZSB3aGVyZSBhbGwgYXZhaWxhYmxlIHRvb2xzIGFuZCB0aGVpciBjb21wb25lbnQgYXJlIHJlZ2lzdGVyZWQuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVG9vbGJveCB7XHJcbiAgLyoqXHJcbiAgICogT2JzZXJ2YWJsZSBvZiB0aGUgYWN0aXZlIHRvb2xcclxuICAgKi9cclxuICBhY3RpdmVUb29sJDogQmVoYXZpb3JTdWJqZWN0PFRvb2w+ID0gbmV3IEJlaGF2aW9yU3ViamVjdCh1bmRlZmluZWQpO1xyXG5cclxuICAvKipcclxuICAgKiBPcmRlcmVkIGxpc3Qgb2YgdG9vbCBuYW1lcyB0byBkaXNwbGF5IGluIGEgdG9vbGJhclxyXG4gICAqL1xyXG4gIHRvb2xiYXIkOiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nW10+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChbXSk7XHJcblxyXG4gIC8qKlxyXG4gICAqIE9ic2VydmFibGUgb2YgdGhlIGFjdGl2ZSB0b29sXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhY3RpdmVUb29sJCQ6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogQWN0aXZlIHRvb2wgaGlzdG9yeS4gVXNlZnVsIGZvciBhY3RpdmF0aW5nIHRoZSBwcmV2aW91cyB0b29sLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgYWN0aXZlVG9vbEhpc3Rvcnk6IHN0cmluZ1tdID0gW107XHJcblxyXG4gIC8qKlxyXG4gICAqIFRvb2wgc3RvcmVcclxuICAgKi9cclxuICBwcml2YXRlIHN0b3JlID0gbmV3IEVudGl0eVN0b3JlPFRvb2w+KFtdLCB7XHJcbiAgICBnZXRLZXk6ICh0b29sOiBUb29sKSA9PiB0b29sLm5hbWVcclxuICB9KTtcclxuXHJcbiAgZ2V0IHRvb2xzJCgpOiBCZWhhdmlvclN1YmplY3Q8VG9vbFtdPiB7XHJcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5lbnRpdGllcyQ7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG9wdGlvbnM6IFRvb2xib3hPcHRpb25zID0ge30pIHtcclxuICAgIHRoaXMuc2V0VG9vbGJhcihvcHRpb25zLnRvb2xiYXIpO1xyXG4gICAgdGhpcy5pbml0U3RvcmUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERlc3Ryb3kgdGhlIHRvb2xib3hcclxuICAgKi9cclxuICBkZXN0cm95KCkge1xyXG4gICAgdGhpcy5hY3RpdmVUb29sJCQudW5zdWJzY3JpYmUoKTtcclxuICAgIHRoaXMuc3RvcmUuZGVzdHJveSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJuIGEgdG9vbFxyXG4gICAqIEBwYXJhbSBuYW1lIFRvb2wgbmFtZVxyXG4gICAqIEByZXR1cm5zIHRvb2wgVG9vbFxyXG4gICAqL1xyXG4gIGdldFRvb2wobmFtZTogc3RyaW5nKTogVG9vbCB7XHJcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5nZXQobmFtZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm4gYWxsIHRvb2xzXHJcbiAgICogQHJldHVybnMgQXJyYXkgb2YgdG9vbHNcclxuICAgKi9cclxuICBnZXRUb29scygpOiBUb29sW10ge1xyXG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuYWxsKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgdG9vbCBjb25maWd1cmF0aW9uc1xyXG4gICAqIEBwYXJhbSB0b29scyBUb29sc1xyXG4gICAqL1xyXG4gIHNldFRvb2xzKHRvb2xzOiBUb29sW10pIHtcclxuICAgIHRoaXMuc3RvcmUubG9hZCh0b29scyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgdG9vbGJhclxyXG4gICAqIEBwYXJhbSB0b29sYmFyIEEgbGlzdCBvZiB0b29sIG5hbWVzXHJcbiAgICovXHJcbiAgc2V0VG9vbGJhcih0b29sYmFyOiBzdHJpbmdbXSkge1xyXG4gICAgdGhpcy50b29sYmFyJC5uZXh0KHRvb2xiYXIgfHwgW10pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWN0aXZhdGUgYSB0b29sIChhbmQgZGVhY3RpdmF0ZSBvdGhlciB0b29scylcclxuICAgKiBAcGFyYW0gbmFtZSBUb29sIG5hbWVcclxuICAgKiBAcGFyYW0gb3B0aW9ucyBUb29sIG9wdGlvbnNcclxuICAgKi9cclxuICBhY3RpdmF0ZVRvb2wobmFtZTogc3RyaW5nLCBvcHRpb25zOiB7IFtrZXk6IHN0cmluZ106IGFueSB9ID0ge30pIHtcclxuICAgIGNvbnN0IHRvb2wgPSB0aGlzLmdldFRvb2wobmFtZSk7XHJcbiAgICBpZiAodG9vbCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnN0b3JlLnN0YXRlLnVwZGF0ZSh0b29sLCB7IGFjdGl2ZTogdHJ1ZSwgb3B0aW9ucyB9LCB0cnVlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFjdGl2YXRlIHRoZSBwcmV2aW91cyB0b29sLCBpZiBhbnlcclxuICAgKi9cclxuICBhY3RpdmF0ZVByZXZpb3VzVG9vbCgpIHtcclxuICAgIGlmICh0aGlzLmFjdGl2ZVRvb2xIaXN0b3J5Lmxlbmd0aCA8PSAxKSB7XHJcbiAgICAgIHRoaXMuZGVhY3RpdmF0ZVRvb2woKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY29uc3QgW3ByZXZpb3VzLCBjdXJyZW50XSA9IHRoaXMuYWN0aXZlVG9vbEhpc3Rvcnkuc3BsaWNlKC0yLCAyKTtcclxuICAgIHRoaXMuYWN0aXZhdGVUb29sKHByZXZpb3VzKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERlYWN0aXZhdGUgdGhlIGFjdGl2ZSB0b29sXHJcbiAgICovXHJcbiAgZGVhY3RpdmF0ZVRvb2woKSB7XHJcbiAgICB0aGlzLmNsZWFyQWN0aXZlVG9vbEhpc3RvcnkoKTtcclxuICAgIHRoaXMuc3RvcmUuc3RhdGUudXBkYXRlQWxsKHsgYWN0aXZlOiBmYWxzZSB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEluaXRpYWxpemUgdGhlIHRvb2wgc3RvcmUgYW5kIHN0YXJ0IG9ic2VydmluZyB0aGUgYWN0aXZlIHRvb2xcclxuICAgKi9cclxuICBwcml2YXRlIGluaXRTdG9yZSgpIHtcclxuICAgIHRoaXMuc3RvcmUgPSBuZXcgRW50aXR5U3RvcmU8VG9vbD4oW10sIHtcclxuICAgICAgZ2V0S2V5OiAoZW50aXR5OiBUb29sKSA9PiBlbnRpdHkubmFtZVxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5hY3RpdmVUb29sJCQgPSB0aGlzLnN0b3JlLnN0YXRlVmlld1xyXG4gICAgICAuZmlyc3RCeSQoKHJlY29yZDogRW50aXR5UmVjb3JkPFRvb2w+KSA9PiByZWNvcmQuc3RhdGUuYWN0aXZlID09PSB0cnVlKVxyXG4gICAgICAuc3Vic2NyaWJlKChyZWNvcmQ6IEVudGl0eVJlY29yZDxUb29sPikgPT4ge1xyXG4gICAgICAgIGlmIChyZWNvcmQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgdGhpcy5zZXRBY3RpdmVUb29sKHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB0b29sID0gcmVjb3JkLmVudGl0eTtcclxuICAgICAgICBjb25zdCBvcHRpb25zID0gT2JqZWN0LmFzc2lnbihcclxuICAgICAgICAgIHt9LFxyXG4gICAgICAgICAgdG9vbC5vcHRpb25zIHx8IHt9LFxyXG4gICAgICAgICAgcmVjb3JkLnN0YXRlLm9wdGlvbnMgfHwge31cclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMuc2V0QWN0aXZlVG9vbChPYmplY3QuYXNzaWduKHt9LCB0b29sLCB7IG9wdGlvbnMgfSkpO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCB0aGUgYWN0aXZlIHRvb2wgYW5kIHVwZGF0ZSB0aGUgdG9vbCBoaXN0b3J5XHJcbiAgICogQHBhcmFtIHRvb2wgVG9vbFxyXG4gICAqL1xyXG4gIHByaXZhdGUgc2V0QWN0aXZlVG9vbCh0b29sOiBUb29sIHwgdW5kZWZpbmVkKSB7XHJcbiAgICB0aGlzLmFjdGl2ZVRvb2wkLm5leHQodG9vbCk7XHJcbiAgICBpZiAodG9vbCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuY2xlYXJBY3RpdmVUb29sSGlzdG9yeSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5hY3RpdmVUb29sSGlzdG9yeSA9IHRoaXMuYWN0aXZlVG9vbEhpc3RvcnlcclxuICAgICAgICAuZmlsdGVyKChuYW1lOiBzdHJpbmcpID0+IG5hbWUgIT09IHRvb2wubmFtZSlcclxuICAgICAgICAuY29uY2F0KFt0b29sLm5hbWVdKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENsZWFyIHRoZSB0b29sIGhpc3RvcnlcclxuICAgKi9cclxuICBwcml2YXRlIGNsZWFyQWN0aXZlVG9vbEhpc3RvcnkoKSB7XHJcbiAgICB0aGlzLmFjdGl2ZVRvb2xIaXN0b3J5ID0gW107XHJcbiAgfVxyXG59XHJcbiJdfQ==