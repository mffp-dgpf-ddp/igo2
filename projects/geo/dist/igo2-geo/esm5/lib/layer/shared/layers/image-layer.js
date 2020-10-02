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
    function ImageLayer(options, authInterceptor) {
        var _this = _super.call(this, options, authInterceptor) || this;
        _this.authInterceptor = authInterceptor;
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
        if (this.authInterceptor) {
            ((/** @type {?} */ (image.getSource()))).setImageLoadFunction((/**
             * @param {?} tile
             * @param {?} src
             * @return {?}
             */
            function (tile, src) {
                _this.customLoader(tile, src);
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
     * @return {?}
     */
    ImageLayer.prototype.customLoader = /**
     * @private
     * @param {?} tile
     * @param {?} src
     * @return {?}
     */
    function (tile, src) {
        /** @type {?} */
        var xhr = new XMLHttpRequest();
        xhr.open('GET', src);
        /** @type {?} */
        var intercepted = this.authInterceptor.interceptXhr(xhr, src);
        if (!intercepted) {
            xhr.abort();
            tile.getImage().src = src;
            return;
        }
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
    /** @type {?} */
    ImageLayer.prototype.authInterceptor;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UtbGF5ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvbGF5ZXIvc2hhcmVkL2xheWVycy9pbWFnZS1sYXllci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sWUFBWSxNQUFNLGdCQUFnQixDQUFDO0FBSzFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFLM0MsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUdoQztJQUFnQyxzQ0FBSztJQU9uQyxvQkFDRSxPQUEwQixFQUNuQixlQUFpQztRQUYxQyxZQUlFLGtCQUFNLE9BQU8sRUFBRSxlQUFlLENBQUMsU0FHaEM7UUFMUSxxQkFBZSxHQUFmLGVBQWUsQ0FBa0I7UUFHeEMsS0FBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLFlBQVksQ0FBQyxLQUFJLENBQUMsQ0FBQztRQUN0QyxLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDOztJQUN0QyxDQUFDOzs7OztJQUVTLGtDQUFhOzs7O0lBQXZCO1FBQUEsaUJBYUM7O1lBWk8sU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEQsTUFBTSxFQUFFLG1CQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBaUI7U0FDaEQsQ0FBQzs7WUFFSSxLQUFLLEdBQUcsSUFBSSxZQUFZLENBQUMsU0FBUyxDQUFDO1FBQ3pDLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN4QixDQUFDLG1CQUFBLEtBQUssQ0FBQyxTQUFTLEVBQUUsRUFBTyxDQUFDLENBQUMsb0JBQW9COzs7OztZQUFDLFVBQUMsSUFBSSxFQUFFLEdBQUc7Z0JBQ3hELEtBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQy9CLENBQUMsRUFBQyxDQUFDO1NBQ0o7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7Ozs7O0lBRU0sMkJBQU07Ozs7SUFBYixVQUFjLEdBQXVCO1FBQ25DLElBQUksR0FBRyxLQUFLLFNBQVMsRUFBRTtZQUNyQixJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQzVCO2FBQU07WUFDTCxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVM7OztZQUFDLGNBQU8sQ0FBQyxFQUFDLENBQUM7U0FDbEM7UUFDRCxpQkFBTSxNQUFNLFlBQUMsR0FBRyxDQUFDLENBQUM7SUFDcEIsQ0FBQzs7Ozs7OztJQUVPLGlDQUFZOzs7Ozs7SUFBcEIsVUFBcUIsSUFBSSxFQUFFLEdBQUc7O1lBQ3RCLEdBQUcsR0FBRyxJQUFJLGNBQWMsRUFBRTtRQUNoQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQzs7WUFFZixXQUFXLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztRQUMvRCxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2hCLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNaLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQzFCLE9BQU87U0FDUjtRQUVELEdBQUcsQ0FBQyxZQUFZLEdBQUcsYUFBYSxDQUFDO1FBRWpDLEdBQUcsQ0FBQyxNQUFNOzs7UUFBRzs7Z0JBQ0wsZUFBZSxHQUFHLElBQUksVUFBVSxDQUFDLENBQUMsbUJBQUEsSUFBSSxFQUFPLENBQUMsQ0FBQyxRQUFRLENBQUM7O2dCQUN4RCxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxlQUFlLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsQ0FBQzs7Z0JBQ3pELFVBQVUsR0FBRyxNQUFNLENBQUMsR0FBRzs7Z0JBQ3ZCLFFBQVEsR0FBRyxVQUFVLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQztZQUNqRCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQztRQUNqQyxDQUFDLENBQUEsQ0FBQztRQUNGLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNiLENBQUM7SUFDSCxpQkFBQztBQUFELENBQUMsQUE5REQsQ0FBZ0MsS0FBSyxHQThEcEM7Ozs7SUE3REMsZ0NBQWlDOztJQUNqQyw2QkFBa0M7O0lBQ2xDLHdCQUF3Qjs7Ozs7SUFFeEIsNkJBQThCOztJQUk1QixxQ0FBd0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgb2xMYXllckltYWdlIGZyb20gJ29sL2xheWVyL0ltYWdlJztcclxuaW1wb3J0IG9sU291cmNlSW1hZ2UgZnJvbSAnb2wvc291cmNlL0ltYWdlJztcclxuXHJcbmltcG9ydCB7IEF1dGhJbnRlcmNlcHRvciB9IGZyb20gJ0BpZ28yL2F1dGgnO1xyXG5cclxuaW1wb3J0IHsgSW1hZ2VXYXRjaGVyIH0gZnJvbSAnLi4vLi4vdXRpbHMnO1xyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICcuLi8uLi8uLi9tYXAnO1xyXG5cclxuaW1wb3J0IHsgV01TRGF0YVNvdXJjZSB9IGZyb20gJy4uLy4uLy4uL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2VzL3dtcy1kYXRhc291cmNlJztcclxuXHJcbmltcG9ydCB7IExheWVyIH0gZnJvbSAnLi9sYXllcic7XHJcbmltcG9ydCB7IEltYWdlTGF5ZXJPcHRpb25zIH0gZnJvbSAnLi9pbWFnZS1sYXllci5pbnRlcmZhY2UnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEltYWdlTGF5ZXIgZXh0ZW5kcyBMYXllciB7XHJcbiAgcHVibGljIGRhdGFTb3VyY2U6IFdNU0RhdGFTb3VyY2U7XHJcbiAgcHVibGljIG9wdGlvbnM6IEltYWdlTGF5ZXJPcHRpb25zO1xyXG4gIHB1YmxpYyBvbDogb2xMYXllckltYWdlO1xyXG5cclxuICBwcml2YXRlIHdhdGNoZXI6IEltYWdlV2F0Y2hlcjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBvcHRpb25zOiBJbWFnZUxheWVyT3B0aW9ucyxcclxuICAgIHB1YmxpYyBhdXRoSW50ZXJjZXB0b3I/OiBBdXRoSW50ZXJjZXB0b3JcclxuICApIHtcclxuICAgIHN1cGVyKG9wdGlvbnMsIGF1dGhJbnRlcmNlcHRvcik7XHJcbiAgICB0aGlzLndhdGNoZXIgPSBuZXcgSW1hZ2VXYXRjaGVyKHRoaXMpO1xyXG4gICAgdGhpcy5zdGF0dXMkID0gdGhpcy53YXRjaGVyLnN0YXR1cyQ7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgY3JlYXRlT2xMYXllcigpOiBvbExheWVySW1hZ2Uge1xyXG4gICAgY29uc3Qgb2xPcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5vcHRpb25zLCB7XHJcbiAgICAgIHNvdXJjZTogdGhpcy5vcHRpb25zLnNvdXJjZS5vbCBhcyBvbFNvdXJjZUltYWdlXHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBpbWFnZSA9IG5ldyBvbExheWVySW1hZ2Uob2xPcHRpb25zKTtcclxuICAgIGlmICh0aGlzLmF1dGhJbnRlcmNlcHRvcikge1xyXG4gICAgICAoaW1hZ2UuZ2V0U291cmNlKCkgYXMgYW55KS5zZXRJbWFnZUxvYWRGdW5jdGlvbigodGlsZSwgc3JjKSA9PiB7XHJcbiAgICAgICAgdGhpcy5jdXN0b21Mb2FkZXIodGlsZSwgc3JjKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGltYWdlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldE1hcChtYXA6IElnb01hcCB8IHVuZGVmaW5lZCkge1xyXG4gICAgaWYgKG1hcCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMud2F0Y2hlci51bnN1YnNjcmliZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy53YXRjaGVyLnN1YnNjcmliZSgoKSA9PiB7fSk7XHJcbiAgICB9XHJcbiAgICBzdXBlci5zZXRNYXAobWFwKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3VzdG9tTG9hZGVyKHRpbGUsIHNyYykge1xyXG4gICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICB4aHIub3BlbignR0VUJywgc3JjKTtcclxuXHJcbiAgICBjb25zdCBpbnRlcmNlcHRlZCA9IHRoaXMuYXV0aEludGVyY2VwdG9yLmludGVyY2VwdFhocih4aHIsIHNyYyk7XHJcbiAgICBpZiAoIWludGVyY2VwdGVkKSB7XHJcbiAgICAgIHhoci5hYm9ydCgpO1xyXG4gICAgICB0aWxlLmdldEltYWdlKCkuc3JjID0gc3JjO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdhcnJheWJ1ZmZlcic7XHJcblxyXG4gICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICBjb25zdCBhcnJheUJ1ZmZlclZpZXcgPSBuZXcgVWludDhBcnJheSgodGhpcyBhcyBhbnkpLnJlc3BvbnNlKTtcclxuICAgICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFthcnJheUJ1ZmZlclZpZXddLCB7IHR5cGU6ICdpbWFnZS9wbmcnIH0pO1xyXG4gICAgICBjb25zdCB1cmxDcmVhdG9yID0gd2luZG93LlVSTDtcclxuICAgICAgY29uc3QgaW1hZ2VVcmwgPSB1cmxDcmVhdG9yLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcclxuICAgICAgdGlsZS5nZXRJbWFnZSgpLnNyYyA9IGltYWdlVXJsO1xyXG4gICAgfTtcclxuICAgIHhoci5zZW5kKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==