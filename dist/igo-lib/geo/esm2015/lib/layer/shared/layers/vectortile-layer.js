/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import olLayerVectorTile from 'ol/layer/VectorTile';
import { Layer } from './layer';
export class VectorTileLayer extends Layer {
    /**
     * @param {?} options
     */
    constructor(options) {
        super(options);
    }
    /**
     * @protected
     * @return {?}
     */
    createOlLayer() {
        /** @type {?} */
        const olOptions = Object.assign({}, this.options, {
            source: (/** @type {?} */ (this.options.source.ol))
        });
        return new olLayerVectorTile(olOptions);
    }
}
if (false) {
    /** @type {?} */
    VectorTileLayer.prototype.dataSource;
    /** @type {?} */
    VectorTileLayer.prototype.options;
    /** @type {?} */
    VectorTileLayer.prototype.ol;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVjdG9ydGlsZS1sYXllci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9sYXllci9zaGFyZWQvbGF5ZXJzL3ZlY3RvcnRpbGUtbGF5ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8saUJBQWlCLE1BQU0scUJBQXFCLENBQUM7QUFLcEQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUdoQyxNQUFNLE9BQU8sZUFBZ0IsU0FBUSxLQUFLOzs7O0lBTXhDLFlBQVksT0FBK0I7UUFDekMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pCLENBQUM7Ozs7O0lBRVMsYUFBYTs7Y0FDZixTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoRCxNQUFNLEVBQUUsbUJBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFzQjtTQUVyRCxDQUFDO1FBRUYsT0FBTyxJQUFJLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzFDLENBQUM7Q0FDRjs7O0lBakJDLHFDQUNrQjs7SUFDbEIsa0NBQXVDOztJQUN2Qyw2QkFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgb2xMYXllclZlY3RvclRpbGUgZnJvbSAnb2wvbGF5ZXIvVmVjdG9yVGlsZSc7XHJcbmltcG9ydCBvbFNvdXJjZVZlY3RvclRpbGUgZnJvbSAnb2wvc291cmNlL1ZlY3RvclRpbGUnO1xyXG5cclxuaW1wb3J0IHsgTVZURGF0YVNvdXJjZSB9IGZyb20gJy4uLy4uLy4uL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2VzL212dC1kYXRhc291cmNlJztcclxuXHJcbmltcG9ydCB7IExheWVyIH0gZnJvbSAnLi9sYXllcic7XHJcbmltcG9ydCB7IFZlY3RvclRpbGVMYXllck9wdGlvbnMgfSBmcm9tICcuL3ZlY3RvcnRpbGUtbGF5ZXIuaW50ZXJmYWNlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBWZWN0b3JUaWxlTGF5ZXIgZXh0ZW5kcyBMYXllciB7XHJcbiAgcHVibGljIGRhdGFTb3VyY2U6XHJcbiAgICB8IE1WVERhdGFTb3VyY2U7XHJcbiAgcHVibGljIG9wdGlvbnM6IFZlY3RvclRpbGVMYXllck9wdGlvbnM7XHJcbiAgcHVibGljIG9sOiBvbExheWVyVmVjdG9yVGlsZTtcclxuXHJcbiAgY29uc3RydWN0b3Iob3B0aW9uczogVmVjdG9yVGlsZUxheWVyT3B0aW9ucykge1xyXG4gICAgc3VwZXIob3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgY3JlYXRlT2xMYXllcigpOiBvbExheWVyVmVjdG9yVGlsZSB7XHJcbiAgICBjb25zdCBvbE9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLm9wdGlvbnMsIHtcclxuICAgICAgc291cmNlOiB0aGlzLm9wdGlvbnMuc291cmNlLm9sIGFzIG9sU291cmNlVmVjdG9yVGlsZVxyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBuZXcgb2xMYXllclZlY3RvclRpbGUob2xPcHRpb25zKTtcclxuICB9XHJcbn1cclxuIl19