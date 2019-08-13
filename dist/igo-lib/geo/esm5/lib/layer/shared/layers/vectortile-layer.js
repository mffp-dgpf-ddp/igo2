/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import olLayerVectorTile from 'ol/layer/VectorTile';
import { Layer } from './layer';
var VectorTileLayer = /** @class */ (function (_super) {
    tslib_1.__extends(VectorTileLayer, _super);
    function VectorTileLayer(options) {
        return _super.call(this, options) || this;
    }
    /**
     * @protected
     * @return {?}
     */
    VectorTileLayer.prototype.createOlLayer = /**
     * @protected
     * @return {?}
     */
    function () {
        /** @type {?} */
        var olOptions = Object.assign({}, this.options, {
            source: (/** @type {?} */ (this.options.source.ol))
        });
        return new olLayerVectorTile(olOptions);
    };
    return VectorTileLayer;
}(Layer));
export { VectorTileLayer };
if (false) {
    /** @type {?} */
    VectorTileLayer.prototype.dataSource;
    /** @type {?} */
    VectorTileLayer.prototype.options;
    /** @type {?} */
    VectorTileLayer.prototype.ol;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVjdG9ydGlsZS1sYXllci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9sYXllci9zaGFyZWQvbGF5ZXJzL3ZlY3RvcnRpbGUtbGF5ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLGlCQUFpQixNQUFNLHFCQUFxQixDQUFDO0FBS3BELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFHaEM7SUFBcUMsMkNBQUs7SUFLeEMseUJBQVksT0FBK0I7ZUFDekMsa0JBQU0sT0FBTyxDQUFDO0lBQ2hCLENBQUM7Ozs7O0lBRVMsdUNBQWE7Ozs7SUFBdkI7O1lBQ1EsU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEQsTUFBTSxFQUFFLG1CQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBc0I7U0FDckQsQ0FBQztRQUVGLE9BQU8sSUFBSSxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBQ0gsc0JBQUM7QUFBRCxDQUFDLEFBaEJELENBQXFDLEtBQUssR0FnQnpDOzs7O0lBZkMscUNBQWlDOztJQUNqQyxrQ0FBdUM7O0lBQ3ZDLDZCQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBvbExheWVyVmVjdG9yVGlsZSBmcm9tICdvbC9sYXllci9WZWN0b3JUaWxlJztcclxuaW1wb3J0IG9sU291cmNlVmVjdG9yVGlsZSBmcm9tICdvbC9zb3VyY2UvVmVjdG9yVGlsZSc7XHJcblxyXG5pbXBvcnQgeyBNVlREYXRhU291cmNlIH0gZnJvbSAnLi4vLi4vLi4vZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvbXZ0LWRhdGFzb3VyY2UnO1xyXG5cclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuL2xheWVyJztcclxuaW1wb3J0IHsgVmVjdG9yVGlsZUxheWVyT3B0aW9ucyB9IGZyb20gJy4vdmVjdG9ydGlsZS1sYXllci5pbnRlcmZhY2UnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFZlY3RvclRpbGVMYXllciBleHRlbmRzIExheWVyIHtcclxuICBwdWJsaWMgZGF0YVNvdXJjZTogTVZURGF0YVNvdXJjZTtcclxuICBwdWJsaWMgb3B0aW9uczogVmVjdG9yVGlsZUxheWVyT3B0aW9ucztcclxuICBwdWJsaWMgb2w6IG9sTGF5ZXJWZWN0b3JUaWxlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBWZWN0b3JUaWxlTGF5ZXJPcHRpb25zKSB7XHJcbiAgICBzdXBlcihvcHRpb25zKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBjcmVhdGVPbExheWVyKCk6IG9sTGF5ZXJWZWN0b3JUaWxlIHtcclxuICAgIGNvbnN0IG9sT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMub3B0aW9ucywge1xyXG4gICAgICBzb3VyY2U6IHRoaXMub3B0aW9ucy5zb3VyY2Uub2wgYXMgb2xTb3VyY2VWZWN0b3JUaWxlXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gbmV3IG9sTGF5ZXJWZWN0b3JUaWxlKG9sT3B0aW9ucyk7XHJcbiAgfVxyXG59XHJcbiJdfQ==