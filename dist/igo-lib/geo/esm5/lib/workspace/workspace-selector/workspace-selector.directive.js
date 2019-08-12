/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Input } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { WorkspaceSelectorComponent } from '@igo2/common';
import { IgoMap } from '../../map';
import { WFSDataSource, WMSDataSource } from '../../datasource';
import { WfsWorkspaceService } from '../shared/wfs-workspace.service';
import { WmsWorkspaceService } from '../shared/wms-workspace.service';
var WorkspaceSelectorDirective = /** @class */ (function () {
    function WorkspaceSelectorDirective(component, wfsWorkspaceService, wmsWorkspaceService) {
        this.component = component;
        this.wfsWorkspaceService = wfsWorkspaceService;
        this.wmsWorkspaceService = wmsWorkspaceService;
    }
    Object.defineProperty(WorkspaceSelectorDirective.prototype, "workspaceStore", {
        get: /**
         * @return {?}
         */
        function () {
            return this.component.store;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    WorkspaceSelectorDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.layers$$ = this.map.layers$
            .pipe(debounceTime(50))
            .subscribe((/**
         * @param {?} layers
         * @return {?}
         */
        function (layers) {
            return _this.onLayersChange(layers);
        }));
    };
    /**
     * @return {?}
     */
    WorkspaceSelectorDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.layers$$.unsubscribe();
    };
    /**
     * @private
     * @param {?} layers
     * @return {?}
     */
    WorkspaceSelectorDirective.prototype.onLayersChange = /**
     * @private
     * @param {?} layers
     * @return {?}
     */
    function (layers) {
        var _this = this;
        /** @type {?} */
        var editableLayers = layers.filter((/**
         * @param {?} layer
         * @return {?}
         */
        function (layer) {
            return _this.layerIsEditable(layer);
        }));
        /** @type {?} */
        var editableLayersIds = editableLayers.map((/**
         * @param {?} layer
         * @return {?}
         */
        function (layer) { return layer.id; }));
        /** @type {?} */
        var workspacesToAdd = editableLayers
            .map((/**
         * @param {?} layer
         * @return {?}
         */
        function (layer) { return _this.getOrCreateWorkspace(layer); }))
            .filter((/**
         * @param {?} workspace
         * @return {?}
         */
        function (workspace) { return workspace !== undefined; }));
        /** @type {?} */
        var workspacesToRemove = this.workspaceStore.all()
            .filter((/**
         * @param {?} workspace
         * @return {?}
         */
        function (workspace) {
            return editableLayersIds.indexOf(workspace.id) < 0;
        }));
        if (workspacesToRemove.length > 0) {
            workspacesToRemove.forEach((/**
             * @param {?} workspace
             * @return {?}
             */
            function (workspace) {
                workspace.deactivate();
            }));
            this.workspaceStore.state.updateMany(workspacesToRemove, { active: false, selected: false });
            this.workspaceStore.deleteMany(workspacesToRemove);
        }
        if (workspacesToAdd.length > 0) {
            this.workspaceStore.insertMany(workspacesToAdd);
        }
    };
    /**
     * @private
     * @param {?} layer
     * @return {?}
     */
    WorkspaceSelectorDirective.prototype.getOrCreateWorkspace = /**
     * @private
     * @param {?} layer
     * @return {?}
     */
    function (layer) {
        /** @type {?} */
        var workspace = this.workspaceStore.get(layer.id);
        if (workspace !== undefined) {
            return;
        }
        if (layer.dataSource instanceof WFSDataSource) {
            return this.wfsWorkspaceService.createWorkspace((/** @type {?} */ (layer)), this.map);
        }
        else if (layer.dataSource instanceof WMSDataSource) {
            return this.wmsWorkspaceService.createWorkspace((/** @type {?} */ (layer)), this.map);
        }
        return;
    };
    /**
     * @private
     * @param {?} layer
     * @return {?}
     */
    WorkspaceSelectorDirective.prototype.layerIsEditable = /**
     * @private
     * @param {?} layer
     * @return {?}
     */
    function (layer) {
        /** @type {?} */
        var dataSource = layer.dataSource;
        if (dataSource instanceof WFSDataSource) {
            return true;
        }
        if (dataSource instanceof WMSDataSource) {
            /** @type {?} */
            var dataSourceOptions = (/** @type {?} */ ((dataSource.options ||
                {})));
            return (dataSourceOptions.ogcFilters && dataSourceOptions.ogcFilters.enabled);
        }
        return false;
    };
    WorkspaceSelectorDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[igoWorkspaceSelector]'
                },] }
    ];
    /** @nocollapse */
    WorkspaceSelectorDirective.ctorParameters = function () { return [
        { type: WorkspaceSelectorComponent },
        { type: WfsWorkspaceService },
        { type: WmsWorkspaceService }
    ]; };
    WorkspaceSelectorDirective.propDecorators = {
        map: [{ type: Input }]
    };
    return WorkspaceSelectorDirective;
}());
export { WorkspaceSelectorDirective };
if (false) {
    /**
     * @type {?}
     * @private
     */
    WorkspaceSelectorDirective.prototype.layers$$;
    /** @type {?} */
    WorkspaceSelectorDirective.prototype.map;
    /**
     * @type {?}
     * @private
     */
    WorkspaceSelectorDirective.prototype.component;
    /**
     * @type {?}
     * @private
     */
    WorkspaceSelectorDirective.prototype.wfsWorkspaceService;
    /**
     * @type {?}
     * @private
     */
    WorkspaceSelectorDirective.prototype.wmsWorkspaceService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya3NwYWNlLXNlbGVjdG9yLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi93b3Jrc3BhY2Uvd29ya3NwYWNlLXNlbGVjdG9yL3dvcmtzcGFjZS1zZWxlY3Rvci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUdwRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFOUMsT0FBTyxFQUE2QiwwQkFBMEIsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUdyRixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ25DLE9BQU8sRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFHaEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDdEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFFdEU7SUFhRSxvQ0FDVSxTQUFxQyxFQUNyQyxtQkFBd0MsRUFDeEMsbUJBQXdDO1FBRnhDLGNBQVMsR0FBVCxTQUFTLENBQTRCO1FBQ3JDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtJQUMvQyxDQUFDO0lBUkosc0JBQUksc0RBQWM7Ozs7UUFBbEI7WUFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO1FBQzlCLENBQUM7OztPQUFBOzs7O0lBUUQsNkNBQVE7OztJQUFSO1FBQUEsaUJBTUM7UUFMQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTzthQUM3QixJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ3RCLFNBQVM7Ozs7UUFBQyxVQUFDLE1BQWU7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TztnQkFDM0MsRUFBRSxDQUFDLEVBQWtDO1lBQ3ZDLE9BQU8sQ0FDTCxpQkFBaUIsQ0FBQyxVQUFVLElBQUksaUJBQWlCLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FDckUsQ0FBQztTQUNIO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDOztnQkF4RkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSx3QkFBd0I7aUJBQ25DOzs7O2dCQVptQywwQkFBMEI7Z0JBT3JELG1CQUFtQjtnQkFDbkIsbUJBQW1COzs7c0JBU3pCLEtBQUs7O0lBa0ZSLGlDQUFDO0NBQUEsQUF6RkQsSUF5RkM7U0F0RlksMEJBQTBCOzs7Ozs7SUFFckMsOENBQStCOztJQUUvQix5Q0FBcUI7Ozs7O0lBT25CLCtDQUE2Qzs7Ozs7SUFDN0MseURBQWdEOzs7OztJQUNoRCx5REFBZ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBPbkluaXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGRlYm91bmNlVGltZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7IFdvcmtzcGFjZSwgV29ya3NwYWNlU3RvcmUsIFdvcmtzcGFjZVNlbGVjdG9yQ29tcG9uZW50IH0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IExheWVyLCBJbWFnZUxheWVyLCBWZWN0b3JMYXllciB9IGZyb20gJy4uLy4uL2xheWVyJztcclxuaW1wb3J0IHsgSWdvTWFwIH0gZnJvbSAnLi4vLi4vbWFwJztcclxuaW1wb3J0IHsgV0ZTRGF0YVNvdXJjZSwgV01TRGF0YVNvdXJjZSB9IGZyb20gJy4uLy4uL2RhdGFzb3VyY2UnO1xyXG5pbXBvcnQgeyBPZ2NGaWx0ZXJhYmxlRGF0YVNvdXJjZU9wdGlvbnMgfSBmcm9tICcuLi8uLi9maWx0ZXInO1xyXG5cclxuaW1wb3J0IHsgV2ZzV29ya3NwYWNlU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC93ZnMtd29ya3NwYWNlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBXbXNXb3Jrc3BhY2VTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL3dtcy13b3Jrc3BhY2Uuc2VydmljZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tpZ29Xb3Jrc3BhY2VTZWxlY3Rvcl0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBXb3Jrc3BhY2VTZWxlY3RvckRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuXHJcbiAgcHJpdmF0ZSBsYXllcnMkJDogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBASW5wdXQoKSBtYXA6IElnb01hcDtcclxuXHJcbiAgZ2V0IHdvcmtzcGFjZVN0b3JlKCk6IFdvcmtzcGFjZVN0b3JlIHtcclxuICAgIHJldHVybiB0aGlzLmNvbXBvbmVudC5zdG9yZTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBjb21wb25lbnQ6IFdvcmtzcGFjZVNlbGVjdG9yQ29tcG9uZW50LFxyXG4gICAgcHJpdmF0ZSB3ZnNXb3Jrc3BhY2VTZXJ2aWNlOiBXZnNXb3Jrc3BhY2VTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSB3bXNXb3Jrc3BhY2VTZXJ2aWNlOiBXbXNXb3Jrc3BhY2VTZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMubGF5ZXJzJCQgPSB0aGlzLm1hcC5sYXllcnMkXHJcbiAgICAgIC5waXBlKGRlYm91bmNlVGltZSg1MCkpXHJcbiAgICAgIC5zdWJzY3JpYmUoKGxheWVyczogTGF5ZXJbXSkgPT5cclxuICAgICAgICB0aGlzLm9uTGF5ZXJzQ2hhbmdlKGxheWVycylcclxuICAgICAgKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5sYXllcnMkJC51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvbkxheWVyc0NoYW5nZShsYXllcnM6IExheWVyW10pIHtcclxuICAgIGNvbnN0IGVkaXRhYmxlTGF5ZXJzID0gbGF5ZXJzLmZpbHRlcigobGF5ZXI6IExheWVyKSA9PlxyXG4gICAgICB0aGlzLmxheWVySXNFZGl0YWJsZShsYXllcilcclxuICAgICk7XHJcbiAgICBjb25zdCBlZGl0YWJsZUxheWVyc0lkcyA9IGVkaXRhYmxlTGF5ZXJzLm1hcCgobGF5ZXI6IExheWVyKSA9PiBsYXllci5pZCk7XHJcblxyXG4gICAgY29uc3Qgd29ya3NwYWNlc1RvQWRkID0gZWRpdGFibGVMYXllcnNcclxuICAgICAgLm1hcCgobGF5ZXI6IFZlY3RvckxheWVyKSA9PiB0aGlzLmdldE9yQ3JlYXRlV29ya3NwYWNlKGxheWVyKSlcclxuICAgICAgLmZpbHRlcigod29ya3NwYWNlOiBXb3Jrc3BhY2UgfCB1bmRlZmluZWQpID0+IHdvcmtzcGFjZSAhPT0gdW5kZWZpbmVkKTtcclxuXHJcbiAgICBjb25zdCB3b3Jrc3BhY2VzVG9SZW1vdmUgPSB0aGlzLndvcmtzcGFjZVN0b3JlLmFsbCgpXHJcbiAgICAgIC5maWx0ZXIoKHdvcmtzcGFjZTogV29ya3NwYWNlKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGVkaXRhYmxlTGF5ZXJzSWRzLmluZGV4T2Yod29ya3NwYWNlLmlkKSA8IDA7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIGlmICh3b3Jrc3BhY2VzVG9SZW1vdmUubGVuZ3RoID4gMCkge1xyXG4gICAgICB3b3Jrc3BhY2VzVG9SZW1vdmUuZm9yRWFjaCgod29ya3NwYWNlOiBXb3Jrc3BhY2UpID0+IHtcclxuICAgICAgICB3b3Jrc3BhY2UuZGVhY3RpdmF0ZSgpO1xyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy53b3Jrc3BhY2VTdG9yZS5zdGF0ZS51cGRhdGVNYW55KHdvcmtzcGFjZXNUb1JlbW92ZSwge2FjdGl2ZTogZmFsc2UsIHNlbGVjdGVkOiBmYWxzZX0pO1xyXG4gICAgICB0aGlzLndvcmtzcGFjZVN0b3JlLmRlbGV0ZU1hbnkod29ya3NwYWNlc1RvUmVtb3ZlKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAod29ya3NwYWNlc1RvQWRkLmxlbmd0aCA+IDApIHtcclxuICAgICAgdGhpcy53b3Jrc3BhY2VTdG9yZS5pbnNlcnRNYW55KHdvcmtzcGFjZXNUb0FkZCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldE9yQ3JlYXRlV29ya3NwYWNlKGxheWVyOiBWZWN0b3JMYXllciB8IEltYWdlTGF5ZXIpOiBXb3Jrc3BhY2UgfCB1bmRlZmluZWQge1xyXG4gICAgY29uc3Qgd29ya3NwYWNlID0gdGhpcy53b3Jrc3BhY2VTdG9yZS5nZXQobGF5ZXIuaWQpO1xyXG4gICAgaWYgKHdvcmtzcGFjZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChsYXllci5kYXRhU291cmNlIGluc3RhbmNlb2YgV0ZTRGF0YVNvdXJjZSkge1xyXG4gICAgICByZXR1cm4gdGhpcy53ZnNXb3Jrc3BhY2VTZXJ2aWNlLmNyZWF0ZVdvcmtzcGFjZShsYXllciBhcyBWZWN0b3JMYXllciwgdGhpcy5tYXApO1xyXG4gICAgfSBlbHNlIGlmIChsYXllci5kYXRhU291cmNlIGluc3RhbmNlb2YgV01TRGF0YVNvdXJjZSkge1xyXG4gICAgICByZXR1cm4gdGhpcy53bXNXb3Jrc3BhY2VTZXJ2aWNlLmNyZWF0ZVdvcmtzcGFjZShsYXllciBhcyBJbWFnZUxheWVyLCB0aGlzLm1hcCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBsYXllcklzRWRpdGFibGUobGF5ZXI6IExheWVyKTogYm9vbGVhbiB7XHJcbiAgICBjb25zdCBkYXRhU291cmNlID0gbGF5ZXIuZGF0YVNvdXJjZTtcclxuICAgIGlmIChkYXRhU291cmNlIGluc3RhbmNlb2YgV0ZTRGF0YVNvdXJjZSkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZGF0YVNvdXJjZSBpbnN0YW5jZW9mIFdNU0RhdGFTb3VyY2UpIHtcclxuICAgICAgY29uc3QgZGF0YVNvdXJjZU9wdGlvbnMgPSAoZGF0YVNvdXJjZS5vcHRpb25zIHx8XHJcbiAgICAgICAge30pIGFzIE9nY0ZpbHRlcmFibGVEYXRhU291cmNlT3B0aW9ucztcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICBkYXRhU291cmNlT3B0aW9ucy5vZ2NGaWx0ZXJzICYmIGRhdGFTb3VyY2VPcHRpb25zLm9nY0ZpbHRlcnMuZW5hYmxlZFxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbn1cclxuIl19