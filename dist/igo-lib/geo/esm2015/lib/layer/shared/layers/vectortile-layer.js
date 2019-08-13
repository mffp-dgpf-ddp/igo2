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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVjdG9ydGlsZS1sYXllci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9sYXllci9zaGFyZWQvbGF5ZXJzL3ZlY3RvcnRpbGUtbGF5ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8saUJBQWlCLE1BQU0scUJBQXFCLENBQUM7QUFLcEQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUdoQyxNQUFNLE9BQU8sZUFBZ0IsU0FBUSxLQUFLOzs7O0lBS3hDLFlBQVksT0FBK0I7UUFDekMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pCLENBQUM7Ozs7O0lBRVMsYUFBYTs7Y0FDZixTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoRCxNQUFNLEVBQUUsbUJBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFzQjtTQUNyRCxDQUFDO1FBRUYsT0FBTyxJQUFJLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzFDLENBQUM7Q0FDRjs7O0lBZkMscUNBQWlDOztJQUNqQyxrQ0FBdUM7O0lBQ3ZDLDZCQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBvbExheWVyVmVjdG9yVGlsZSBmcm9tICdvbC9sYXllci9WZWN0b3JUaWxlJztcclxuaW1wb3J0IG9sU291cmNlVmVjdG9yVGlsZSBmcm9tICdvbC9zb3VyY2UvVmVjdG9yVGlsZSc7XHJcblxyXG5pbXBvcnQgeyBNVlREYXRhU291cmNlIH0gZnJvbSAnLi4vLi4vLi4vZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvbXZ0LWRhdGFzb3VyY2UnO1xyXG5cclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuL2xheWVyJztcclxuaW1wb3J0IHsgVmVjdG9yVGlsZUxheWVyT3B0aW9ucyB9IGZyb20gJy4vdmVjdG9ydGlsZS1sYXllci5pbnRlcmZhY2UnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFZlY3RvclRpbGVMYXllciBleHRlbmRzIExheWVyIHtcclxuICBwdWJsaWMgZGF0YVNvdXJjZTogTVZURGF0YVNvdXJjZTtcclxuICBwdWJsaWMgb3B0aW9uczogVmVjdG9yVGlsZUxheWVyT3B0aW9ucztcclxuICBwdWJsaWMgb2w6IG9sTGF5ZXJWZWN0b3JUaWxlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBWZWN0b3JUaWxlTGF5ZXJPcHRpb25zKSB7XHJcbiAgICBzdXBlcihvcHRpb25zKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBjcmVhdGVPbExheWVyKCk6IG9sTGF5ZXJWZWN0b3JUaWxlIHtcclxuICAgIGNvbnN0IG9sT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMub3B0aW9ucywge1xyXG4gICAgICBzb3VyY2U6IHRoaXMub3B0aW9ucy5zb3VyY2Uub2wgYXMgb2xTb3VyY2VWZWN0b3JUaWxlXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gbmV3IG9sTGF5ZXJWZWN0b3JUaWxlKG9sT3B0aW9ucyk7XHJcbiAgfVxyXG59XHJcbiJdfQ==