/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import olLayerImage from 'ol/layer/Image';
import { ImageWatcher } from '../../utils';
import { Layer } from './layer';
export class ImageLayer extends Layer {
    /**
     * @param {?} options
     */
    constructor(options) {
        super(options);
        this.watcher = new ImageWatcher(this);
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
        /** @type {?} */
        const image = new olLayerImage(olOptions);
        /** @type {?} */
        const token = this.options.token;
        if (token) {
            ((/** @type {?} */ (image.getSource()))).setImageLoadFunction((/**
             * @param {?} tile
             * @param {?} src
             * @return {?}
             */
            (tile, src) => {
                this.customLoader(tile, src, token);
            }));
        }
        return image;
    }
    /**
     * @param {?} map
     * @return {?}
     */
    setMap(map) {
        if (map === undefined) {
            this.watcher.unsubscribe();
        }
        else {
            this.watcher.subscribe((/**
             * @return {?}
             */
            () => { }));
        }
        super.setMap(map);
    }
    /**
     * @private
     * @param {?} tile
     * @param {?} src
     * @param {?=} token
     * @return {?}
     */
    customLoader(tile, src, token) {
        /** @type {?} */
        const xhr = new XMLHttpRequest();
        xhr.open('GET', src);
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        xhr.responseType = 'arraybuffer';
        xhr.onload = (/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            const arrayBufferView = new Uint8Array(((/** @type {?} */ (this))).response);
            /** @type {?} */
            const blob = new Blob([arrayBufferView], { type: 'image/png' });
            /** @type {?} */
            const urlCreator = window.URL;
            /** @type {?} */
            const imageUrl = urlCreator.createObjectURL(blob);
            tile.getImage().src = imageUrl;
        });
        xhr.send();
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UtbGF5ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvbGF5ZXIvc2hhcmVkL2xheWVycy9pbWFnZS1sYXllci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxZQUFZLE1BQU0sZ0JBQWdCLENBQUM7QUFHMUMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUszQyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBR2hDLE1BQU0sT0FBTyxVQUFXLFNBQVEsS0FBSzs7OztJQU9uQyxZQUFZLE9BQTBCO1FBQ3BDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVmLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztJQUN0QyxDQUFDOzs7OztJQUVTLGFBQWE7O2NBQ2YsU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEQsTUFBTSxFQUFFLG1CQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBaUI7U0FDaEQsQ0FBQzs7Y0FFSSxLQUFLLEdBQUcsSUFBSSxZQUFZLENBQUMsU0FBUyxDQUFDOztjQUNuQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLO1FBQ2hDLElBQUksS0FBSyxFQUFFO1lBQ1QsQ0FBQyxtQkFBQSxLQUFLLENBQUMsU0FBUyxFQUFFLEVBQU8sQ0FBQyxDQUFDLG9CQUFvQjs7Ozs7WUFBQyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRTtnQkFDNUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3RDLENBQUMsRUFBQyxDQUFDO1NBQ0o7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7Ozs7O0lBRU0sTUFBTSxDQUFDLEdBQXVCO1FBQ25DLElBQUksR0FBRyxLQUFLLFNBQVMsRUFBRTtZQUNyQixJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQzVCO2FBQU07WUFDTCxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVM7OztZQUFDLEdBQUcsRUFBRSxHQUFFLENBQUMsRUFBQyxDQUFDO1NBQ2xDO1FBQ0QsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNwQixDQUFDOzs7Ozs7OztJQUVPLFlBQVksQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQU07O2NBQzlCLEdBQUcsR0FBRyxJQUFJLGNBQWMsRUFBRTtRQUNoQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztRQUVyQixHQUFHLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxFQUFFLFNBQVMsR0FBRyxLQUFLLENBQUMsQ0FBQztRQUN6RCxHQUFHLENBQUMsWUFBWSxHQUFHLGFBQWEsQ0FBQztRQUVqQyxHQUFHLENBQUMsTUFBTTs7O1FBQUc7O2tCQUNMLGVBQWUsR0FBRyxJQUFJLFVBQVUsQ0FBQyxDQUFDLG1CQUFBLElBQUksRUFBTyxDQUFDLENBQUMsUUFBUSxDQUFDOztrQkFDeEQsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsZUFBZSxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLENBQUM7O2tCQUN6RCxVQUFVLEdBQUcsTUFBTSxDQUFDLEdBQUc7O2tCQUN2QixRQUFRLEdBQUcsVUFBVSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUM7WUFDakQsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUM7UUFDakMsQ0FBQyxDQUFBLENBQUM7UUFDRixHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDYixDQUFDO0NBQ0Y7OztJQXREQyxnQ0FBaUM7O0lBQ2pDLDZCQUFrQzs7SUFDbEMsd0JBQXdCOzs7OztJQUV4Qiw2QkFBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgb2xMYXllckltYWdlIGZyb20gJ29sL2xheWVyL0ltYWdlJztcclxuaW1wb3J0IG9sU291cmNlSW1hZ2UgZnJvbSAnb2wvc291cmNlL0ltYWdlJztcclxuXHJcbmltcG9ydCB7IEltYWdlV2F0Y2hlciB9IGZyb20gJy4uLy4uL3V0aWxzJztcclxuaW1wb3J0IHsgSWdvTWFwIH0gZnJvbSAnLi4vLi4vLi4vbWFwJztcclxuXHJcbmltcG9ydCB7IFdNU0RhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi8uLi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy93bXMtZGF0YXNvdXJjZSc7XHJcblxyXG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4vbGF5ZXInO1xyXG5pbXBvcnQgeyBJbWFnZUxheWVyT3B0aW9ucyB9IGZyb20gJy4vaW1hZ2UtbGF5ZXIuaW50ZXJmYWNlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBJbWFnZUxheWVyIGV4dGVuZHMgTGF5ZXIge1xyXG4gIHB1YmxpYyBkYXRhU291cmNlOiBXTVNEYXRhU291cmNlO1xyXG4gIHB1YmxpYyBvcHRpb25zOiBJbWFnZUxheWVyT3B0aW9ucztcclxuICBwdWJsaWMgb2w6IG9sTGF5ZXJJbWFnZTtcclxuXHJcbiAgcHJpdmF0ZSB3YXRjaGVyOiBJbWFnZVdhdGNoZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IEltYWdlTGF5ZXJPcHRpb25zKSB7XHJcbiAgICBzdXBlcihvcHRpb25zKTtcclxuXHJcbiAgICB0aGlzLndhdGNoZXIgPSBuZXcgSW1hZ2VXYXRjaGVyKHRoaXMpO1xyXG4gICAgdGhpcy5zdGF0dXMkID0gdGhpcy53YXRjaGVyLnN0YXR1cyQ7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgY3JlYXRlT2xMYXllcigpOiBvbExheWVySW1hZ2Uge1xyXG4gICAgY29uc3Qgb2xPcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5vcHRpb25zLCB7XHJcbiAgICAgIHNvdXJjZTogdGhpcy5vcHRpb25zLnNvdXJjZS5vbCBhcyBvbFNvdXJjZUltYWdlXHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBpbWFnZSA9IG5ldyBvbExheWVySW1hZ2Uob2xPcHRpb25zKTtcclxuICAgIGNvbnN0IHRva2VuID0gdGhpcy5vcHRpb25zLnRva2VuO1xyXG4gICAgaWYgKHRva2VuKSB7XHJcbiAgICAgIChpbWFnZS5nZXRTb3VyY2UoKSBhcyBhbnkpLnNldEltYWdlTG9hZEZ1bmN0aW9uKCh0aWxlLCBzcmMpID0+IHtcclxuICAgICAgICB0aGlzLmN1c3RvbUxvYWRlcih0aWxlLCBzcmMsIHRva2VuKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGltYWdlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldE1hcChtYXA6IElnb01hcCB8IHVuZGVmaW5lZCkge1xyXG4gICAgaWYgKG1hcCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMud2F0Y2hlci51bnN1YnNjcmliZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy53YXRjaGVyLnN1YnNjcmliZSgoKSA9PiB7fSk7XHJcbiAgICB9XHJcbiAgICBzdXBlci5zZXRNYXAobWFwKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3VzdG9tTG9hZGVyKHRpbGUsIHNyYywgdG9rZW4/KSB7XHJcbiAgICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgIHhoci5vcGVuKCdHRVQnLCBzcmMpO1xyXG5cclxuICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdBdXRob3JpemF0aW9uJywgJ0JlYXJlciAnICsgdG9rZW4pO1xyXG4gICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdhcnJheWJ1ZmZlcic7XHJcblxyXG4gICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICBjb25zdCBhcnJheUJ1ZmZlclZpZXcgPSBuZXcgVWludDhBcnJheSgodGhpcyBhcyBhbnkpLnJlc3BvbnNlKTtcclxuICAgICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFthcnJheUJ1ZmZlclZpZXddLCB7IHR5cGU6ICdpbWFnZS9wbmcnIH0pO1xyXG4gICAgICBjb25zdCB1cmxDcmVhdG9yID0gd2luZG93LlVSTDtcclxuICAgICAgY29uc3QgaW1hZ2VVcmwgPSB1cmxDcmVhdG9yLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcclxuICAgICAgdGlsZS5nZXRJbWFnZSgpLnNyYyA9IGltYWdlVXJsO1xyXG4gICAgfTtcclxuICAgIHhoci5zZW5kKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==