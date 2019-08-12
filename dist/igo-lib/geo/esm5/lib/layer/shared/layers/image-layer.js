/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import olLayerImage from 'ol/layer/Image';
import { ImageWatcher } from '../../utils';
import { Layer } from './layer';
var ImageLayer = /** @class */ (function (_super) {
    tslib_1.__extends(ImageLayer, _super);
    function ImageLayer(options) {
        var _this = _super.call(this, options) || this;
        _this.watcher = new ImageWatcher(_this);
        _this.status$ = _this.watcher.status$;
        return _this;
    }
    /**
     * @protected
     * @return {?}
     */
    ImageLayer.prototype.createOlLayer = /**
     * @protected
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var olOptions = Object.assign({}, this.options, {
            source: (/** @type {?} */ (this.options.source.ol))
        });
        /** @type {?} */
        var image = new olLayerImage(olOptions);
        /** @type {?} */
        var token = this.options.token;
        if (token) {
            ((/** @type {?} */ (image.getSource()))).setImageLoadFunction((/**
             * @param {?} tile
             * @param {?} src
             * @return {?}
             */
            function (tile, src) {
                _this.customLoader(tile, src, token);
            }));
        }
        return image;
    };
    /**
     * @param {?} map
     * @return {?}
     */
    ImageLayer.prototype.setMap = /**
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
    /**
     * @private
     * @param {?} tile
     * @param {?} src
     * @param {?=} token
     * @return {?}
     */
    ImageLayer.prototype.customLoader = /**
     * @private
     * @param {?} tile
     * @param {?} src
     * @param {?=} token
     * @return {?}
     */
    function (tile, src, token) {
        /** @type {?} */
        var xhr = new XMLHttpRequest();
        xhr.open('GET', src);
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        xhr.responseType = 'arraybuffer';
        xhr.onload = (/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var arrayBufferView = new Uint8Array(((/** @type {?} */ (this))).response);
            /** @type {?} */
            var blob = new Blob([arrayBufferView], { type: 'image/png' });
            /** @type {?} */
            var urlCreator = window.URL;
            /** @type {?} */
            var imageUrl = urlCreator.createObjectURL(blob);
            tile.getImage().src = imageUrl;
        });
        xhr.send();
    };
    return ImageLayer;
}(Layer));
export { ImageLayer };
if (false) {
    /** @type {?} */
    ImageLayer.prototype.dataSource;
    /** @type {?} */
    ImageLayer.prototype.options;
    /** @type {?} */
    ImageLayer.prototype.ol;
    /**
     * @type {?}
     * @private
     */
    ImageLayer.prototype.watcher;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UtbGF5ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvbGF5ZXIvc2hhcmVkL2xheWVycy9pbWFnZS1sYXllci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sWUFBWSxNQUFNLGdCQUFnQixDQUFDO0FBRzFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFLM0MsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUdoQztJQUFnQyxzQ0FBSztJQU9uQyxvQkFBWSxPQUEwQjtRQUF0QyxZQUNFLGtCQUFNLE9BQU8sQ0FBQyxTQUlmO1FBRkMsS0FBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLFlBQVksQ0FBQyxLQUFJLENBQUMsQ0FBQztRQUN0QyxLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDOztJQUN0QyxDQUFDOzs7OztJQUVTLGtDQUFhOzs7O0lBQXZCO1FBQUEsaUJBY0M7O1lBYk8sU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEQsTUFBTSxFQUFFLG1CQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBaUI7U0FDaEQsQ0FBQzs7WUFFSSxLQUFLLEdBQUcsSUFBSSxZQUFZLENBQUMsU0FBUyxDQUFDOztZQUNuQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLO1FBQ2hDLElBQUksS0FBSyxFQUFFO1lBQ1QsQ0FBQyxtQkFBQSxLQUFLLENBQUMsU0FBUyxFQUFFLEVBQU8sQ0FBQyxDQUFDLG9CQUFvQjs7Ozs7WUFBQyxVQUFDLElBQUksRUFBRSxHQUFHO2dCQUN4RCxLQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDdEMsQ0FBQyxFQUFDLENBQUM7U0FDSjtRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQzs7Ozs7SUFFTSwyQkFBTTs7OztJQUFiLFVBQWMsR0FBdUI7UUFDbkMsSUFBSSxHQUFHLEtBQUssU0FBUyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDNUI7YUFBTTtZQUNMLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUzs7O1lBQUMsY0FBTyxDQUFDLEVBQUMsQ0FBQztTQUNsQztRQUNELGlCQUFNLE1BQU0sWUFBQyxHQUFHLENBQUMsQ0FBQztJQUNwQixDQUFDOzs7Ozs7OztJQUVPLGlDQUFZOzs7Ozs7O0lBQXBCLFVBQXFCLElBQUksRUFBRSxHQUFHLEVBQUUsS0FBTTs7WUFDOUIsR0FBRyxHQUFHLElBQUksY0FBYyxFQUFFO1FBQ2hDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRXJCLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLEVBQUUsU0FBUyxHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQ3pELEdBQUcsQ0FBQyxZQUFZLEdBQUcsYUFBYSxDQUFDO1FBRWpDLEdBQUcsQ0FBQyxNQUFNOzs7UUFBRzs7Z0JBQ0wsZUFBZSxHQUFHLElBQUksVUFBVSxDQUFDLENBQUMsbUJBQUEsSUFBSSxFQUFPLENBQUMsQ0FBQyxRQUFRLENBQUM7O2dCQUN4RCxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxlQUFlLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsQ0FBQzs7Z0JBQ3pELFVBQVUsR0FBRyxNQUFNLENBQUMsR0FBRzs7Z0JBQ3ZCLFFBQVEsR0FBRyxVQUFVLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQztZQUNqRCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQztRQUNqQyxDQUFDLENBQUEsQ0FBQztRQUNGLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNiLENBQUM7SUFDSCxpQkFBQztBQUFELENBQUMsQUF2REQsQ0FBZ0MsS0FBSyxHQXVEcEM7Ozs7SUF0REMsZ0NBQWlDOztJQUNqQyw2QkFBa0M7O0lBQ2xDLHdCQUF3Qjs7Ozs7SUFFeEIsNkJBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG9sTGF5ZXJJbWFnZSBmcm9tICdvbC9sYXllci9JbWFnZSc7XHJcbmltcG9ydCBvbFNvdXJjZUltYWdlIGZyb20gJ29sL3NvdXJjZS9JbWFnZSc7XHJcblxyXG5pbXBvcnQgeyBJbWFnZVdhdGNoZXIgfSBmcm9tICcuLi8uLi91dGlscyc7XHJcbmltcG9ydCB7IElnb01hcCB9IGZyb20gJy4uLy4uLy4uL21hcCc7XHJcblxyXG5pbXBvcnQgeyBXTVNEYXRhU291cmNlIH0gZnJvbSAnLi4vLi4vLi4vZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvd21zLWRhdGFzb3VyY2UnO1xyXG5cclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuL2xheWVyJztcclxuaW1wb3J0IHsgSW1hZ2VMYXllck9wdGlvbnMgfSBmcm9tICcuL2ltYWdlLWxheWVyLmludGVyZmFjZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgSW1hZ2VMYXllciBleHRlbmRzIExheWVyIHtcclxuICBwdWJsaWMgZGF0YVNvdXJjZTogV01TRGF0YVNvdXJjZTtcclxuICBwdWJsaWMgb3B0aW9uczogSW1hZ2VMYXllck9wdGlvbnM7XHJcbiAgcHVibGljIG9sOiBvbExheWVySW1hZ2U7XHJcblxyXG4gIHByaXZhdGUgd2F0Y2hlcjogSW1hZ2VXYXRjaGVyO1xyXG5cclxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBJbWFnZUxheWVyT3B0aW9ucykge1xyXG4gICAgc3VwZXIob3B0aW9ucyk7XHJcblxyXG4gICAgdGhpcy53YXRjaGVyID0gbmV3IEltYWdlV2F0Y2hlcih0aGlzKTtcclxuICAgIHRoaXMuc3RhdHVzJCA9IHRoaXMud2F0Y2hlci5zdGF0dXMkO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGNyZWF0ZU9sTGF5ZXIoKTogb2xMYXllckltYWdlIHtcclxuICAgIGNvbnN0IG9sT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMub3B0aW9ucywge1xyXG4gICAgICBzb3VyY2U6IHRoaXMub3B0aW9ucy5zb3VyY2Uub2wgYXMgb2xTb3VyY2VJbWFnZVxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgaW1hZ2UgPSBuZXcgb2xMYXllckltYWdlKG9sT3B0aW9ucyk7XHJcbiAgICBjb25zdCB0b2tlbiA9IHRoaXMub3B0aW9ucy50b2tlbjtcclxuICAgIGlmICh0b2tlbikge1xyXG4gICAgICAoaW1hZ2UuZ2V0U291cmNlKCkgYXMgYW55KS5zZXRJbWFnZUxvYWRGdW5jdGlvbigodGlsZSwgc3JjKSA9PiB7XHJcbiAgICAgICAgdGhpcy5jdXN0b21Mb2FkZXIodGlsZSwgc3JjLCB0b2tlbik7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBpbWFnZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXRNYXAobWFwOiBJZ29NYXAgfCB1bmRlZmluZWQpIHtcclxuICAgIGlmIChtYXAgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLndhdGNoZXIudW5zdWJzY3JpYmUoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMud2F0Y2hlci5zdWJzY3JpYmUoKCkgPT4ge30pO1xyXG4gICAgfVxyXG4gICAgc3VwZXIuc2V0TWFwKG1hcCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGN1c3RvbUxvYWRlcih0aWxlLCBzcmMsIHRva2VuPykge1xyXG4gICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICB4aHIub3BlbignR0VUJywgc3JjKTtcclxuXHJcbiAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQXV0aG9yaXphdGlvbicsICdCZWFyZXIgJyArIHRva2VuKTtcclxuICAgIHhoci5yZXNwb25zZVR5cGUgPSAnYXJyYXlidWZmZXInO1xyXG5cclxuICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgY29uc3QgYXJyYXlCdWZmZXJWaWV3ID0gbmV3IFVpbnQ4QXJyYXkoKHRoaXMgYXMgYW55KS5yZXNwb25zZSk7XHJcbiAgICAgIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbYXJyYXlCdWZmZXJWaWV3XSwgeyB0eXBlOiAnaW1hZ2UvcG5nJyB9KTtcclxuICAgICAgY29uc3QgdXJsQ3JlYXRvciA9IHdpbmRvdy5VUkw7XHJcbiAgICAgIGNvbnN0IGltYWdlVXJsID0gdXJsQ3JlYXRvci5jcmVhdGVPYmplY3RVUkwoYmxvYik7XHJcbiAgICAgIHRpbGUuZ2V0SW1hZ2UoKS5zcmMgPSBpbWFnZVVybDtcclxuICAgIH07XHJcbiAgICB4aHIuc2VuZCgpO1xyXG4gIH1cclxufVxyXG4iXX0=