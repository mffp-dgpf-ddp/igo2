/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import olLayerVectorTile from 'ol/layer/VectorTile';
import { Layer } from './layer';
import { TileWatcher } from '../../utils';
export class VectorTileLayer extends Layer {
    /**
     * @param {?} options
     */
    constructor(options) {
        super(options);
        this.watcher = new TileWatcher(this);
        this.status$ = this.watcher.status$;
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
    /**
     * @type {?}
     * @private
     */
    VectorTileLayer.prototype.watcher;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVjdG9ydGlsZS1sYXllci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9sYXllci9zaGFyZWQvbGF5ZXJzL3ZlY3RvcnRpbGUtbGF5ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8saUJBQWlCLE1BQU0scUJBQXFCLENBQUM7QUFLcEQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUVoQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRTFDLE1BQU0sT0FBTyxlQUFnQixTQUFRLEtBQUs7Ozs7SUFPeEMsWUFBWSxPQUErQjtRQUN6QyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDZixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7SUFDdEMsQ0FBQzs7Ozs7SUFFUyxhQUFhOztjQUNmLFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hELE1BQU0sRUFBRSxtQkFBQSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQXNCO1NBQ3JELENBQUM7UUFFRixPQUFPLElBQUksaUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDMUMsQ0FBQztDQUNGOzs7SUFuQkMscUNBQWlDOztJQUNqQyxrQ0FBdUM7O0lBQ3ZDLDZCQUE2Qjs7Ozs7SUFFN0Isa0NBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG9sTGF5ZXJWZWN0b3JUaWxlIGZyb20gJ29sL2xheWVyL1ZlY3RvclRpbGUnO1xyXG5pbXBvcnQgb2xTb3VyY2VWZWN0b3JUaWxlIGZyb20gJ29sL3NvdXJjZS9WZWN0b3JUaWxlJztcclxuXHJcbmltcG9ydCB7IE1WVERhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi8uLi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy9tdnQtZGF0YXNvdXJjZSc7XHJcblxyXG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4vbGF5ZXInO1xyXG5pbXBvcnQgeyBWZWN0b3JUaWxlTGF5ZXJPcHRpb25zIH0gZnJvbSAnLi92ZWN0b3J0aWxlLWxheWVyLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IFRpbGVXYXRjaGVyIH0gZnJvbSAnLi4vLi4vdXRpbHMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFZlY3RvclRpbGVMYXllciBleHRlbmRzIExheWVyIHtcclxuICBwdWJsaWMgZGF0YVNvdXJjZTogTVZURGF0YVNvdXJjZTtcclxuICBwdWJsaWMgb3B0aW9uczogVmVjdG9yVGlsZUxheWVyT3B0aW9ucztcclxuICBwdWJsaWMgb2w6IG9sTGF5ZXJWZWN0b3JUaWxlO1xyXG5cclxuICBwcml2YXRlIHdhdGNoZXI6IFRpbGVXYXRjaGVyO1xyXG5cclxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBWZWN0b3JUaWxlTGF5ZXJPcHRpb25zKSB7XHJcbiAgICBzdXBlcihvcHRpb25zKTtcclxuICAgIHRoaXMud2F0Y2hlciA9IG5ldyBUaWxlV2F0Y2hlcih0aGlzKTtcclxuICAgIHRoaXMuc3RhdHVzJCA9IHRoaXMud2F0Y2hlci5zdGF0dXMkO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGNyZWF0ZU9sTGF5ZXIoKTogb2xMYXllclZlY3RvclRpbGUge1xyXG4gICAgY29uc3Qgb2xPcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5vcHRpb25zLCB7XHJcbiAgICAgIHNvdXJjZTogdGhpcy5vcHRpb25zLnNvdXJjZS5vbCBhcyBvbFNvdXJjZVZlY3RvclRpbGVcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBuZXcgb2xMYXllclZlY3RvclRpbGUob2xPcHRpb25zKTtcclxuICB9XHJcbn1cclxuIl19