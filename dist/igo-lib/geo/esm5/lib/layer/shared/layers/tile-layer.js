/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import olLayerTile from 'ol/layer/Tile';
import { TileWatcher } from '../../utils';
import { Layer } from './layer';
var TileLayer = /** @class */ (function (_super) {
    tslib_1.__extends(TileLayer, _super);
    function TileLayer(options) {
        var _this = _super.call(this, options) || this;
        _this.watcher = new TileWatcher(_this);
        _this.status$ = _this.watcher.status$;
        return _this;
    }
    /**
     * @protected
     * @return {?}
     */
    TileLayer.prototype.createOlLayer = /**
     * @protected
     * @return {?}
     */
    function () {
        /** @type {?} */
        var olOptions = Object.assign({}, this.options, {
            source: (/** @type {?} */ (this.options.source.ol))
        });
        return new olLayerTile(olOptions);
    };
    /**
     * @param {?} map
     * @return {?}
     */
    TileLayer.prototype.setMap = /**
     * @param {?} map
     * @return {?}
     */
    function (map) {
        if (map === undefined) {
            this.watcher.unsubscribe();
        }
        else {
            this.watcher.subscribe((/**
             * @return {?}
             */
            function () { }));
        }
        _super.prototype.setMap.call(this, map);
    };
    return TileLayer;
}(Layer));
export { TileLayer };
if (false) {
    /** @type {?} */
    TileLayer.prototype.dataSource;
    /** @type {?} */
    TileLayer.prototype.options;
    /** @type {?} */
    TileLayer.prototype.ol;
    /**
     * @type {?}
     * @private
     */
    TileLayer.prototype.watcher;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGlsZS1sYXllci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9sYXllci9zaGFyZWQvbGF5ZXJzL3RpbGUtbGF5ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLFdBQVcsTUFBTSxlQUFlLENBQUM7QUFHeEMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQVMxQyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBR2hDO0lBQStCLHFDQUFLO0lBWWxDLG1CQUFZLE9BQXlCO1FBQXJDLFlBQ0Usa0JBQU0sT0FBTyxDQUFDLFNBSWY7UUFGQyxLQUFJLENBQUMsT0FBTyxHQUFHLElBQUksV0FBVyxDQUFDLEtBQUksQ0FBQyxDQUFDO1FBQ3JDLEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7O0lBQ3RDLENBQUM7Ozs7O0lBRVMsaUNBQWE7Ozs7SUFBdkI7O1lBQ1EsU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEQsTUFBTSxFQUFFLG1CQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBZ0I7U0FDL0MsQ0FBQztRQUVGLE9BQU8sSUFBSSxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDcEMsQ0FBQzs7Ozs7SUFFTSwwQkFBTTs7OztJQUFiLFVBQWMsR0FBdUI7UUFDbkMsSUFBSSxHQUFHLEtBQUssU0FBUyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDNUI7YUFBTTtZQUNMLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUzs7O1lBQUMsY0FBTyxDQUFDLEVBQUMsQ0FBQztTQUNsQztRQUNELGlCQUFNLE1BQU0sWUFBQyxHQUFHLENBQUMsQ0FBQztJQUNwQixDQUFDO0lBQ0gsZ0JBQUM7QUFBRCxDQUFDLEFBbkNELENBQStCLEtBQUssR0FtQ25DOzs7O0lBbENDLCtCQUs2Qjs7SUFDN0IsNEJBQWlDOztJQUNqQyx1QkFBdUI7Ozs7O0lBRXZCLDRCQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBvbExheWVyVGlsZSBmcm9tICdvbC9sYXllci9UaWxlJztcclxuaW1wb3J0IG9sU291cmNlVGlsZSBmcm9tICdvbC9zb3VyY2UvVGlsZSc7XHJcblxyXG5pbXBvcnQgeyBUaWxlV2F0Y2hlciB9IGZyb20gJy4uLy4uL3V0aWxzJztcclxuaW1wb3J0IHsgSWdvTWFwIH0gZnJvbSAnLi4vLi4vLi4vbWFwJztcclxuXHJcbmltcG9ydCB7IE9TTURhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi8uLi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy9vc20tZGF0YXNvdXJjZSc7XHJcbmltcG9ydCB7IFdNVFNEYXRhU291cmNlIH0gZnJvbSAnLi4vLi4vLi4vZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvd210cy1kYXRhc291cmNlJztcclxuaW1wb3J0IHsgWFlaRGF0YVNvdXJjZSB9IGZyb20gJy4uLy4uLy4uL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2VzL3h5ei1kYXRhc291cmNlJztcclxuaW1wb3J0IHsgQ2FydG9EYXRhU291cmNlIH0gZnJvbSAnLi4vLi4vLi4vZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvY2FydG8tZGF0YXNvdXJjZSc7XHJcbmltcG9ydCB7IFRpbGVBcmNHSVNSZXN0RGF0YVNvdXJjZSB9IGZyb20gJy4uLy4uLy4uL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2VzL3RpbGVhcmNnaXNyZXN0LWRhdGFzb3VyY2UnO1xyXG5cclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuL2xheWVyJztcclxuaW1wb3J0IHsgVGlsZUxheWVyT3B0aW9ucyB9IGZyb20gJy4vdGlsZS1sYXllci5pbnRlcmZhY2UnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRpbGVMYXllciBleHRlbmRzIExheWVyIHtcclxuICBwdWJsaWMgZGF0YVNvdXJjZTpcclxuICAgIHwgT1NNRGF0YVNvdXJjZVxyXG4gICAgfCBXTVRTRGF0YVNvdXJjZVxyXG4gICAgfCBYWVpEYXRhU291cmNlXHJcbiAgICB8IENhcnRvRGF0YVNvdXJjZVxyXG4gICAgfCBUaWxlQXJjR0lTUmVzdERhdGFTb3VyY2U7XHJcbiAgcHVibGljIG9wdGlvbnM6IFRpbGVMYXllck9wdGlvbnM7XHJcbiAgcHVibGljIG9sOiBvbExheWVyVGlsZTtcclxuXHJcbiAgcHJpdmF0ZSB3YXRjaGVyOiBUaWxlV2F0Y2hlcjtcclxuXHJcbiAgY29uc3RydWN0b3Iob3B0aW9uczogVGlsZUxheWVyT3B0aW9ucykge1xyXG4gICAgc3VwZXIob3B0aW9ucyk7XHJcblxyXG4gICAgdGhpcy53YXRjaGVyID0gbmV3IFRpbGVXYXRjaGVyKHRoaXMpO1xyXG4gICAgdGhpcy5zdGF0dXMkID0gdGhpcy53YXRjaGVyLnN0YXR1cyQ7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgY3JlYXRlT2xMYXllcigpOiBvbExheWVyVGlsZSB7XHJcbiAgICBjb25zdCBvbE9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLm9wdGlvbnMsIHtcclxuICAgICAgc291cmNlOiB0aGlzLm9wdGlvbnMuc291cmNlLm9sIGFzIG9sU291cmNlVGlsZVxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBvbExheWVyVGlsZShvbE9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldE1hcChtYXA6IElnb01hcCB8IHVuZGVmaW5lZCkge1xyXG4gICAgaWYgKG1hcCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMud2F0Y2hlci51bnN1YnNjcmliZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy53YXRjaGVyLnN1YnNjcmliZSgoKSA9PiB7fSk7XHJcbiAgICB9XHJcbiAgICBzdXBlci5zZXRNYXAobWFwKTtcclxuICB9XHJcbn1cclxuIl19