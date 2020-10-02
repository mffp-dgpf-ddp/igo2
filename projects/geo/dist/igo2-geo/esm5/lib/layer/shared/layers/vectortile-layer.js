/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import olLayerVectorTile from 'ol/layer/VectorTile';
import { Layer } from './layer';
import { TileWatcher } from '../../utils';
var VectorTileLayer = /** @class */ (function (_super) {
    tslib_1.__extends(VectorTileLayer, _super);
    function VectorTileLayer(options) {
        var _this = _super.call(this, options) || this;
        _this.watcher = new TileWatcher(_this);
        _this.status$ = _this.watcher.status$;
        return _this;
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
    /**
     * @type {?}
     * @private
     */
    VectorTileLayer.prototype.watcher;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVjdG9ydGlsZS1sYXllci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9sYXllci9zaGFyZWQvbGF5ZXJzL3ZlY3RvcnRpbGUtbGF5ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLGlCQUFpQixNQUFNLHFCQUFxQixDQUFDO0FBS3BELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFFaEMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUUxQztJQUFxQywyQ0FBSztJQU94Qyx5QkFBWSxPQUErQjtRQUEzQyxZQUNFLGtCQUFNLE9BQU8sQ0FBQyxTQUdmO1FBRkMsS0FBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLFdBQVcsQ0FBQyxLQUFJLENBQUMsQ0FBQztRQUNyQyxLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDOztJQUN0QyxDQUFDOzs7OztJQUVTLHVDQUFhOzs7O0lBQXZCOztZQUNRLFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hELE1BQU0sRUFBRSxtQkFBQSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQXNCO1NBQ3JELENBQUM7UUFFRixPQUFPLElBQUksaUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUNILHNCQUFDO0FBQUQsQ0FBQyxBQXBCRCxDQUFxQyxLQUFLLEdBb0J6Qzs7OztJQW5CQyxxQ0FBaUM7O0lBQ2pDLGtDQUF1Qzs7SUFDdkMsNkJBQTZCOzs7OztJQUU3QixrQ0FBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgb2xMYXllclZlY3RvclRpbGUgZnJvbSAnb2wvbGF5ZXIvVmVjdG9yVGlsZSc7XHJcbmltcG9ydCBvbFNvdXJjZVZlY3RvclRpbGUgZnJvbSAnb2wvc291cmNlL1ZlY3RvclRpbGUnO1xyXG5cclxuaW1wb3J0IHsgTVZURGF0YVNvdXJjZSB9IGZyb20gJy4uLy4uLy4uL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2VzL212dC1kYXRhc291cmNlJztcclxuXHJcbmltcG9ydCB7IExheWVyIH0gZnJvbSAnLi9sYXllcic7XHJcbmltcG9ydCB7IFZlY3RvclRpbGVMYXllck9wdGlvbnMgfSBmcm9tICcuL3ZlY3RvcnRpbGUtbGF5ZXIuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgVGlsZVdhdGNoZXIgfSBmcm9tICcuLi8uLi91dGlscyc7XHJcblxyXG5leHBvcnQgY2xhc3MgVmVjdG9yVGlsZUxheWVyIGV4dGVuZHMgTGF5ZXIge1xyXG4gIHB1YmxpYyBkYXRhU291cmNlOiBNVlREYXRhU291cmNlO1xyXG4gIHB1YmxpYyBvcHRpb25zOiBWZWN0b3JUaWxlTGF5ZXJPcHRpb25zO1xyXG4gIHB1YmxpYyBvbDogb2xMYXllclZlY3RvclRpbGU7XHJcblxyXG4gIHByaXZhdGUgd2F0Y2hlcjogVGlsZVdhdGNoZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IFZlY3RvclRpbGVMYXllck9wdGlvbnMpIHtcclxuICAgIHN1cGVyKG9wdGlvbnMpO1xyXG4gICAgdGhpcy53YXRjaGVyID0gbmV3IFRpbGVXYXRjaGVyKHRoaXMpO1xyXG4gICAgdGhpcy5zdGF0dXMkID0gdGhpcy53YXRjaGVyLnN0YXR1cyQ7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgY3JlYXRlT2xMYXllcigpOiBvbExheWVyVmVjdG9yVGlsZSB7XHJcbiAgICBjb25zdCBvbE9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLm9wdGlvbnMsIHtcclxuICAgICAgc291cmNlOiB0aGlzLm9wdGlvbnMuc291cmNlLm9sIGFzIG9sU291cmNlVmVjdG9yVGlsZVxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBvbExheWVyVmVjdG9yVGlsZShvbE9wdGlvbnMpO1xyXG4gIH1cclxufVxyXG4iXX0=