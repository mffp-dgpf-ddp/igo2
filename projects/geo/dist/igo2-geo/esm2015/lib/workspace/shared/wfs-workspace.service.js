/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { ActionStore } from '@igo2/common';
import { FeatureStore, FeatureStoreLoadingLayerStrategy, FeatureStoreSelectionStrategy } from '../../feature';
import { WfsWorkspace } from './wfs-workspace';
import * as i0 from "@angular/core";
export class WfsWorkspaceService {
    constructor() { }
    /**
     * @param {?} layer
     * @param {?} map
     * @return {?}
     */
    createWorkspace(layer, map) {
        return new WfsWorkspace({
            id: layer.id,
            title: layer.title,
            layer,
            map,
            entityStore: this.createFeatureStore(layer, map),
            actionStore: new ActionStore([]),
            meta: {
                tableTemplate: this.createTableTemplate(layer)
            }
        });
    }
    /**
     * @private
     * @param {?} layer
     * @param {?} map
     * @return {?}
     */
    createFeatureStore(layer, map) {
        /** @type {?} */
        const store = new FeatureStore([], { map });
        store.bindLayer(layer);
        /** @type {?} */
        const loadingStrategy = new FeatureStoreLoadingLayerStrategy({});
        /** @type {?} */
        const selectionStrategy = new FeatureStoreSelectionStrategy({
            map,
            hitTolerance: 5
        });
        store.addStrategy(loadingStrategy, true);
        store.addStrategy(selectionStrategy, true);
        return store;
    }
    /**
     * @private
     * @param {?} layer
     * @return {?}
     */
    createTableTemplate(layer) {
        /** @type {?} */
        const fields = layer.dataSource.options.sourceFields || [];
        /** @type {?} */
        const columns = fields.map((/**
         * @param {?} field
         * @return {?}
         */
        (field) => {
            return {
                name: `properties.${field.name}`,
                title: field.alias ? field.alias : field.name
            };
        }));
        return {
            selection: true,
            sort: true,
            columns
        };
    }
}
WfsWorkspaceService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
WfsWorkspaceService.ctorParameters = () => [];
/** @nocollapse */ WfsWorkspaceService.ngInjectableDef = i0.defineInjectable({ factory: function WfsWorkspaceService_Factory() { return new WfsWorkspaceService(); }, token: WfsWorkspaceService, providedIn: "root" });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ZzLXdvcmtzcGFjZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL3dvcmtzcGFjZS9zaGFyZWQvd2ZzLXdvcmtzcGFjZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFDTCxXQUFXLEVBRVosTUFBTSxjQUFjLENBQUM7QUFFdEIsT0FBTyxFQUNMLFlBQVksRUFDWixnQ0FBZ0MsRUFDaEMsNkJBQTZCLEVBQzlCLE1BQU0sZUFBZSxDQUFDO0FBS3ZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7QUFLL0MsTUFBTSxPQUFPLG1CQUFtQjtJQUU5QixnQkFBZSxDQUFDOzs7Ozs7SUFFaEIsZUFBZSxDQUFDLEtBQWtCLEVBQUUsR0FBVztRQUM3QyxPQUFPLElBQUksWUFBWSxDQUFDO1lBQ3RCLEVBQUUsRUFBRSxLQUFLLENBQUMsRUFBRTtZQUNaLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSztZQUNsQixLQUFLO1lBQ0wsR0FBRztZQUNILFdBQVcsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQztZQUNoRCxXQUFXLEVBQUUsSUFBSSxXQUFXLENBQUMsRUFBRSxDQUFDO1lBQ2hDLElBQUksRUFBRTtnQkFDSixhQUFhLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQzthQUMvQztTQUNGLENBQUMsQ0FBQztJQUNMLENBQUM7Ozs7Ozs7SUFFTyxrQkFBa0IsQ0FBQyxLQUFrQixFQUFFLEdBQVc7O2NBQ2xELEtBQUssR0FBRyxJQUFJLFlBQVksQ0FBQyxFQUFFLEVBQUUsRUFBQyxHQUFHLEVBQUMsQ0FBQztRQUN6QyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDOztjQUVqQixlQUFlLEdBQUcsSUFBSSxnQ0FBZ0MsQ0FBQyxFQUFFLENBQUM7O2NBQzFELGlCQUFpQixHQUFHLElBQUksNkJBQTZCLENBQUM7WUFDMUQsR0FBRztZQUNILFlBQVksRUFBRSxDQUFDO1NBQ2hCLENBQUM7UUFDRixLQUFLLENBQUMsV0FBVyxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN6QyxLQUFLLENBQUMsV0FBVyxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxDQUFDO1FBRTNDLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQzs7Ozs7O0lBRU8sbUJBQW1CLENBQUMsS0FBa0I7O2NBQ3RDLE1BQU0sR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxZQUFZLElBQUksRUFBRTs7Y0FDcEQsT0FBTyxHQUFHLE1BQU0sQ0FBQyxHQUFHOzs7O1FBQUMsQ0FBQyxLQUFnQyxFQUFFLEVBQUU7WUFDOUQsT0FBTztnQkFDTCxJQUFJLEVBQUUsY0FBYyxLQUFLLENBQUMsSUFBSSxFQUFFO2dCQUNoQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUk7YUFDOUMsQ0FBQztRQUNKLENBQUMsRUFBQztRQUVGLE9BQU87WUFDTCxTQUFTLEVBQUUsSUFBSTtZQUNmLElBQUksRUFBRSxJQUFJO1lBQ1YsT0FBTztTQUNSLENBQUM7SUFDSixDQUFDOzs7WUFsREYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHtcclxuICBBY3Rpb25TdG9yZSxcclxuICBFbnRpdHlUYWJsZVRlbXBsYXRlXHJcbn0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7XHJcbiAgRmVhdHVyZVN0b3JlLFxyXG4gIEZlYXR1cmVTdG9yZUxvYWRpbmdMYXllclN0cmF0ZWd5LFxyXG4gIEZlYXR1cmVTdG9yZVNlbGVjdGlvblN0cmF0ZWd5XHJcbn0gZnJvbSAnLi4vLi4vZmVhdHVyZSc7XHJcbmltcG9ydCB7IFZlY3RvckxheWVyIH0gZnJvbSAnLi4vLi4vbGF5ZXInO1xyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICcuLi8uLi9tYXAnO1xyXG5pbXBvcnQgeyBTb3VyY2VGaWVsZHNPcHRpb25zUGFyYW1zIH0gZnJvbSAnLi4vLi4vZGF0YXNvdXJjZSc7XHJcblxyXG5pbXBvcnQgeyBXZnNXb3Jrc3BhY2UgfSBmcm9tICcuL3dmcy13b3Jrc3BhY2UnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgV2ZzV29ya3NwYWNlU2VydmljZSB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgY3JlYXRlV29ya3NwYWNlKGxheWVyOiBWZWN0b3JMYXllciwgbWFwOiBJZ29NYXApOiBXZnNXb3Jrc3BhY2Uge1xyXG4gICAgcmV0dXJuIG5ldyBXZnNXb3Jrc3BhY2Uoe1xyXG4gICAgICBpZDogbGF5ZXIuaWQsXHJcbiAgICAgIHRpdGxlOiBsYXllci50aXRsZSxcclxuICAgICAgbGF5ZXIsXHJcbiAgICAgIG1hcCxcclxuICAgICAgZW50aXR5U3RvcmU6IHRoaXMuY3JlYXRlRmVhdHVyZVN0b3JlKGxheWVyLCBtYXApLFxyXG4gICAgICBhY3Rpb25TdG9yZTogbmV3IEFjdGlvblN0b3JlKFtdKSxcclxuICAgICAgbWV0YToge1xyXG4gICAgICAgIHRhYmxlVGVtcGxhdGU6IHRoaXMuY3JlYXRlVGFibGVUZW1wbGF0ZShsYXllcilcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZUZlYXR1cmVTdG9yZShsYXllcjogVmVjdG9yTGF5ZXIsIG1hcDogSWdvTWFwKTogRmVhdHVyZVN0b3JlIHtcclxuICAgIGNvbnN0IHN0b3JlID0gbmV3IEZlYXR1cmVTdG9yZShbXSwge21hcH0pO1xyXG4gICAgc3RvcmUuYmluZExheWVyKGxheWVyKTtcclxuXHJcbiAgICBjb25zdCBsb2FkaW5nU3RyYXRlZ3kgPSBuZXcgRmVhdHVyZVN0b3JlTG9hZGluZ0xheWVyU3RyYXRlZ3koe30pO1xyXG4gICAgY29uc3Qgc2VsZWN0aW9uU3RyYXRlZ3kgPSBuZXcgRmVhdHVyZVN0b3JlU2VsZWN0aW9uU3RyYXRlZ3koe1xyXG4gICAgICBtYXAsXHJcbiAgICAgIGhpdFRvbGVyYW5jZTogNVxyXG4gICAgfSk7XHJcbiAgICBzdG9yZS5hZGRTdHJhdGVneShsb2FkaW5nU3RyYXRlZ3ksIHRydWUpO1xyXG4gICAgc3RvcmUuYWRkU3RyYXRlZ3koc2VsZWN0aW9uU3RyYXRlZ3ksIHRydWUpO1xyXG5cclxuICAgIHJldHVybiBzdG9yZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlVGFibGVUZW1wbGF0ZShsYXllcjogVmVjdG9yTGF5ZXIpOiBFbnRpdHlUYWJsZVRlbXBsYXRlIHtcclxuICAgIGNvbnN0IGZpZWxkcyA9IGxheWVyLmRhdGFTb3VyY2Uub3B0aW9ucy5zb3VyY2VGaWVsZHMgfHwgW107XHJcbiAgICBjb25zdCBjb2x1bW5zID0gZmllbGRzLm1hcCgoZmllbGQ6IFNvdXJjZUZpZWxkc09wdGlvbnNQYXJhbXMpID0+IHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBuYW1lOiBgcHJvcGVydGllcy4ke2ZpZWxkLm5hbWV9YCxcclxuICAgICAgICB0aXRsZTogZmllbGQuYWxpYXMgPyBmaWVsZC5hbGlhcyA6IGZpZWxkLm5hbWVcclxuICAgICAgfTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIHNlbGVjdGlvbjogdHJ1ZSxcclxuICAgICAgc29ydDogdHJ1ZSxcclxuICAgICAgY29sdW1uc1xyXG4gICAgfTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==