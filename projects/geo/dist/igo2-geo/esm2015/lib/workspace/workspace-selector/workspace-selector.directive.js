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
export class WorkspaceSelectorDirective {
    /**
     * @param {?} component
     * @param {?} wfsWorkspaceService
     * @param {?} wmsWorkspaceService
     */
    constructor(component, wfsWorkspaceService, wmsWorkspaceService) {
        this.component = component;
        this.wfsWorkspaceService = wfsWorkspaceService;
        this.wmsWorkspaceService = wmsWorkspaceService;
    }
    /**
     * @return {?}
     */
    get workspaceStore() {
        return this.component.store;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.layers$$ = this.map.layers$
            .pipe(debounceTime(50))
            .subscribe((/**
         * @param {?} layers
         * @return {?}
         */
        (layers) => this.onLayersChange(layers)));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.layers$$.unsubscribe();
    }
    /**
     * @private
     * @param {?} layers
     * @return {?}
     */
    onLayersChange(layers) {
        /** @type {?} */
        const editableLayers = layers.filter((/**
         * @param {?} layer
         * @return {?}
         */
        (layer) => this.layerIsEditable(layer)));
        /** @type {?} */
        const editableLayersIds = editableLayers.map((/**
         * @param {?} layer
         * @return {?}
         */
        (layer) => layer.id));
        /** @type {?} */
        const workspacesToAdd = editableLayers
            .map((/**
         * @param {?} layer
         * @return {?}
         */
        (layer) => this.getOrCreateWorkspace(layer)))
            .filter((/**
         * @param {?} workspace
         * @return {?}
         */
        (workspace) => workspace !== undefined));
        /** @type {?} */
        const workspacesToRemove = this.workspaceStore.all()
            .filter((/**
         * @param {?} workspace
         * @return {?}
         */
        (workspace) => {
            return editableLayersIds.indexOf(workspace.id) < 0;
        }));
        if (workspacesToRemove.length > 0) {
            workspacesToRemove.forEach((/**
             * @param {?} workspace
             * @return {?}
             */
            (workspace) => {
                workspace.deactivate();
            }));
            this.workspaceStore.state.updateMany(workspacesToRemove, { active: false, selected: false });
            this.workspaceStore.deleteMany(workspacesToRemove);
        }
        if (workspacesToAdd.length > 0) {
            this.workspaceStore.insertMany(workspacesToAdd);
        }
    }
    /**
     * @private
     * @param {?} layer
     * @return {?}
     */
    getOrCreateWorkspace(layer) {
        /** @type {?} */
        const workspace = this.workspaceStore.get(layer.id);
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
    }
    /**
     * @private
     * @param {?} layer
     * @return {?}
     */
    layerIsEditable(layer) {
        /** @type {?} */
        const dataSource = layer.dataSource;
        if (dataSource instanceof WFSDataSource) {
            return true;
        }
        if (dataSource instanceof WMSDataSource) {
            /** @type {?} */
            const dataSourceOptions = (/** @type {?} */ ((dataSource.options ||
                {})));
            return (dataSourceOptions.ogcFilters && dataSourceOptions.ogcFilters.enabled);
        }
        return false;
    }
}
WorkspaceSelectorDirective.decorators = [
    { type: Directive, args: [{
                selector: '[igoWorkspaceSelector]'
            },] }
];
/** @nocollapse */
WorkspaceSelectorDirective.ctorParameters = () => [
    { type: WorkspaceSelectorComponent },
    { type: WfsWorkspaceService },
    { type: WmsWorkspaceService }
];
WorkspaceSelectorDirective.propDecorators = {
    map: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya3NwYWNlLXNlbGVjdG9yLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi93b3Jrc3BhY2Uvd29ya3NwYWNlLXNlbGVjdG9yL3dvcmtzcGFjZS1zZWxlY3Rvci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUdwRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFOUMsT0FBTyxFQUE2QiwwQkFBMEIsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUdyRixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ25DLE9BQU8sRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFHaEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDdEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFLdEUsTUFBTSxPQUFPLDBCQUEwQjs7Ozs7O0lBVXJDLFlBQ1UsU0FBcUMsRUFDckMsbUJBQXdDLEVBQ3hDLG1CQUF3QztRQUZ4QyxjQUFTLEdBQVQsU0FBUyxDQUE0QjtRQUNyQyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7SUFDL0MsQ0FBQzs7OztJQVJKLElBQUksY0FBYztRQUNoQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO0lBQzlCLENBQUM7Ozs7SUFRRCxRQUFRO1FBQ04sSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU87YUFDN0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUN0QixTQUFTOzs7O1FBQUMsQ0FBQyxNQUFlLEVBQUUsRUFBRSxD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Q0FBQyxPQUFPLENBQ3JFLENBQUM7U0FDSDtRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQzs7O1lBeEZGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsd0JBQXdCO2FBQ25DOzs7O1lBWm1DLDBCQUEwQjtZQU9yRCxtQkFBbUI7WUFDbkIsbUJBQW1COzs7a0JBU3pCLEtBQUs7Ozs7Ozs7SUFGTiw4Q0FBK0I7O0lBRS9CLHlDQUFxQjs7Ozs7SUFPbkIsK0NBQTZDOzs7OztJQUM3Qyx5REFBZ0Q7Ozs7O0lBQ2hELHlEQUFnRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIE9uSW5pdCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgZGVib3VuY2VUaW1lIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHsgV29ya3NwYWNlLCBXb3Jrc3BhY2VTdG9yZSwgV29ya3NwYWNlU2VsZWN0b3JDb21wb25lbnQgfSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgTGF5ZXIsIEltYWdlTGF5ZXIsIFZlY3RvckxheWVyIH0gZnJvbSAnLi4vLi4vbGF5ZXInO1xyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICcuLi8uLi9tYXAnO1xyXG5pbXBvcnQgeyBXRlNEYXRhU291cmNlLCBXTVNEYXRhU291cmNlIH0gZnJvbSAnLi4vLi4vZGF0YXNvdXJjZSc7XHJcbmltcG9ydCB7IE9nY0ZpbHRlcmFibGVEYXRhU291cmNlT3B0aW9ucyB9IGZyb20gJy4uLy4uL2ZpbHRlcic7XHJcblxyXG5pbXBvcnQgeyBXZnNXb3Jrc3BhY2VTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL3dmcy13b3Jrc3BhY2Uuc2VydmljZSc7XHJcbmltcG9ydCB7IFdtc1dvcmtzcGFjZVNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvd21zLXdvcmtzcGFjZS5zZXJ2aWNlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW2lnb1dvcmtzcGFjZVNlbGVjdG9yXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIFdvcmtzcGFjZVNlbGVjdG9yRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG5cclxuICBwcml2YXRlIGxheWVycyQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIEBJbnB1dCgpIG1hcDogSWdvTWFwO1xyXG5cclxuICBnZXQgd29ya3NwYWNlU3RvcmUoKTogV29ya3NwYWNlU3RvcmUge1xyXG4gICAgcmV0dXJuIHRoaXMuY29tcG9uZW50LnN0b3JlO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGNvbXBvbmVudDogV29ya3NwYWNlU2VsZWN0b3JDb21wb25lbnQsXHJcbiAgICBwcml2YXRlIHdmc1dvcmtzcGFjZVNlcnZpY2U6IFdmc1dvcmtzcGFjZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHdtc1dvcmtzcGFjZVNlcnZpY2U6IFdtc1dvcmtzcGFjZVNlcnZpY2VcclxuICApIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5sYXllcnMkJCA9IHRoaXMubWFwLmxheWVycyRcclxuICAgICAgLnBpcGUoZGVib3VuY2VUaW1lKDUwKSlcclxuICAgICAgLnN1YnNjcmliZSgobGF5ZXJzOiBMYXllcltdKSA9PlxyXG4gICAgICAgIHRoaXMub25MYXllcnNDaGFuZ2UobGF5ZXJzKVxyXG4gICAgICApO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmxheWVycyQkLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uTGF5ZXJzQ2hhbmdlKGxheWVyczogTGF5ZXJbXSkge1xyXG4gICAgY29uc3QgZWRpdGFibGVMYXllcnMgPSBsYXllcnMuZmlsdGVyKChsYXllcjogTGF5ZXIpID0+XHJcbiAgICAgIHRoaXMubGF5ZXJJc0VkaXRhYmxlKGxheWVyKVxyXG4gICAgKTtcclxuICAgIGNvbnN0IGVkaXRhYmxlTGF5ZXJzSWRzID0gZWRpdGFibGVMYXllcnMubWFwKChsYXllcjogTGF5ZXIpID0+IGxheWVyLmlkKTtcclxuXHJcbiAgICBjb25zdCB3b3Jrc3BhY2VzVG9BZGQgPSBlZGl0YWJsZUxheWVyc1xyXG4gICAgICAubWFwKChsYXllcjogVmVjdG9yTGF5ZXIpID0+IHRoaXMuZ2V0T3JDcmVhdGVXb3Jrc3BhY2UobGF5ZXIpKVxyXG4gICAgICAuZmlsdGVyKCh3b3Jrc3BhY2U6IFdvcmtzcGFjZSB8IHVuZGVmaW5lZCkgPT4gd29ya3NwYWNlICE9PSB1bmRlZmluZWQpO1xyXG5cclxuICAgIGNvbnN0IHdvcmtzcGFjZXNUb1JlbW92ZSA9IHRoaXMud29ya3NwYWNlU3RvcmUuYWxsKClcclxuICAgICAgLmZpbHRlcigod29ya3NwYWNlOiBXb3Jrc3BhY2UpID0+IHtcclxuICAgICAgICByZXR1cm4gZWRpdGFibGVMYXllcnNJZHMuaW5kZXhPZih3b3Jrc3BhY2UuaWQpIDwgMDtcclxuICAgICAgfSk7XHJcblxyXG4gICAgaWYgKHdvcmtzcGFjZXNUb1JlbW92ZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHdvcmtzcGFjZXNUb1JlbW92ZS5mb3JFYWNoKCh3b3Jrc3BhY2U6IFdvcmtzcGFjZSkgPT4ge1xyXG4gICAgICAgIHdvcmtzcGFjZS5kZWFjdGl2YXRlKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLndvcmtzcGFjZVN0b3JlLnN0YXRlLnVwZGF0ZU1hbnkod29ya3NwYWNlc1RvUmVtb3ZlLCB7YWN0aXZlOiBmYWxzZSwgc2VsZWN0ZWQ6IGZhbHNlfSk7XHJcbiAgICAgIHRoaXMud29ya3NwYWNlU3RvcmUuZGVsZXRlTWFueSh3b3Jrc3BhY2VzVG9SZW1vdmUpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh3b3Jrc3BhY2VzVG9BZGQubGVuZ3RoID4gMCkge1xyXG4gICAgICB0aGlzLndvcmtzcGFjZVN0b3JlLmluc2VydE1hbnkod29ya3NwYWNlc1RvQWRkKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0T3JDcmVhdGVXb3Jrc3BhY2UobGF5ZXI6IFZlY3RvckxheWVyIHwgSW1hZ2VMYXllcik6IFdvcmtzcGFjZSB8IHVuZGVmaW5lZCB7XHJcbiAgICBjb25zdCB3b3Jrc3BhY2UgPSB0aGlzLndvcmtzcGFjZVN0b3JlLmdldChsYXllci5pZCk7XHJcbiAgICBpZiAod29ya3NwYWNlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKGxheWVyLmRhdGFTb3VyY2UgaW5zdGFuY2VvZiBXRlNEYXRhU291cmNlKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLndmc1dvcmtzcGFjZVNlcnZpY2UuY3JlYXRlV29ya3NwYWNlKGxheWVyIGFzIFZlY3RvckxheWVyLCB0aGlzLm1hcCk7XHJcbiAgICB9IGVsc2UgaWYgKGxheWVyLmRhdGFTb3VyY2UgaW5zdGFuY2VvZiBXTVNEYXRhU291cmNlKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLndtc1dvcmtzcGFjZVNlcnZpY2UuY3JlYXRlV29ya3NwYWNlKGxheWVyIGFzIEltYWdlTGF5ZXIsIHRoaXMubWFwKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGxheWVySXNFZGl0YWJsZShsYXllcjogTGF5ZXIpOiBib29sZWFuIHtcclxuICAgIGNvbnN0IGRhdGFTb3VyY2UgPSBsYXllci5kYXRhU291cmNlO1xyXG4gICAgaWYgKGRhdGFTb3VyY2UgaW5zdGFuY2VvZiBXRlNEYXRhU291cmNlKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChkYXRhU291cmNlIGluc3RhbmNlb2YgV01TRGF0YVNvdXJjZSkge1xyXG4gICAgICBjb25zdCBkYXRhU291cmNlT3B0aW9ucyA9IChkYXRhU291cmNlLm9wdGlvbnMgfHxcclxuICAgICAgICB7fSkgYXMgT2djRmlsdGVyYWJsZURhdGFTb3VyY2VPcHRpb25zO1xyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIGRhdGFTb3VyY2VPcHRpb25zLm9nY0ZpbHRlcnMgJiYgZGF0YVNvdXJjZU9wdGlvbnMub2djRmlsdGVycy5lbmFibGVkXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxufVxyXG4iXX0=