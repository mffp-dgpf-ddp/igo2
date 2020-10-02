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
     * @param {?=} authInterceptor
     */
    constructor(options, authInterceptor) {
        super(options, authInterceptor);
        this.authInterceptor = authInterceptor;
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
        if (this.authInterceptor) {
            ((/** @type {?} */ (image.getSource()))).setImageLoadFunction((/**
             * @param {?} tile
             * @param {?} src
             * @return {?}
             */
            (tile, src) => {
                this.customLoader(tile, src);
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
     * @return {?}
     */
    customLoader(tile, src) {
        /** @type {?} */
        const xhr = new XMLHttpRequest();
        xhr.open('GET', src);
        /** @type {?} */
        const intercepted = this.authInterceptor.interceptXhr(xhr, src);
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
    /** @type {?} */
    ImageLayer.prototype.authInterceptor;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UtbGF5ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvbGF5ZXIvc2hhcmVkL2xheWVycy9pbWFnZS1sYXllci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxZQUFZLE1BQU0sZ0JBQWdCLENBQUM7QUFLMUMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUszQyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBR2hDLE1BQU0sT0FBTyxVQUFXLFNBQVEsS0FBSzs7Ozs7SUFPbkMsWUFDRSxPQUEwQixFQUNuQixlQUFpQztRQUV4QyxLQUFLLENBQUMsT0FBTyxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBRnpCLG9CQUFlLEdBQWYsZUFBZSxDQUFrQjtRQUd4QyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7SUFDdEMsQ0FBQzs7Ozs7SUFFUyxhQUFhOztjQUNmLFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hELE1BQU0sRUFBRSxtQkFBQSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQWlCO1NBQ2hELENBQUM7O2NBRUksS0FBSyxHQUFHLElBQUksWUFBWSxDQUFDLFNBQVMsQ0FBQztRQUN6QyxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDeEIsQ0FBQyxtQkFBQSxLQUFLLENBQUMsU0FBUyxFQUFFLEVBQU8sQ0FBQyxDQUFDLG9CQUFvQjs7Ozs7WUFBQyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRTtnQkFDNUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDL0IsQ0FBQyxFQUFDLENBQUM7U0FDSjtRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQzs7Ozs7SUFFTSxNQUFNLENBQUMsR0FBdUI7UUFDbkMsSUFBSSxHQUFHLEtBQUssU0FBUyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDNUI7YUFBTTtZQUNMLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUzs7O1lBQUMsR0FBRyxFQUFFLEdBQUUsQ0FBQyxFQUFDLENBQUM7U0FDbEM7UUFDRCxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3BCLENBQUM7Ozs7Ozs7SUFFTyxZQUFZLENBQUMsSUFBSSxFQUFFLEdBQUc7O2NBQ3RCLEdBQUcsR0FBRyxJQUFJLGNBQWMsRUFBRTtRQUNoQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQzs7Y0FFZixXQUFXLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztRQUMvRCxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2hCLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNaLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQzFCLE9BQU87U0FDUjtRQUVELEdBQUcsQ0FBQyxZQUFZLEdBQUcsYUFBYSxDQUFDO1FBRWpDLEdBQUcsQ0FBQyxNQUFNOzs7UUFBRzs7a0JBQ0wsZUFBZSxHQUFHLElBQUksVUFBVSxDQUFDLENBQUMsbUJBQUEsSUFBSSxFQUFPLENBQUMsQ0FBQyxRQUFRLENBQUM7O2tCQUN4RCxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxlQUFlLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsQ0FBQzs7a0JBQ3pELFVBQVUsR0FBRyxNQUFNLENBQUMsR0FBRzs7a0JBQ3ZCLFFBQVEsR0FBRyxVQUFVLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQztZQUNqRCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQztRQUNqQyxDQUFDLENBQUEsQ0FBQztRQUNGLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNiLENBQUM7Q0FDRjs7O0lBN0RDLGdDQUFpQzs7SUFDakMsNkJBQWtDOztJQUNsQyx3QkFBd0I7Ozs7O0lBRXhCLDZCQUE4Qjs7SUFJNUIscUNBQXdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG9sTGF5ZXJJbWFnZSBmcm9tICdvbC9sYXllci9JbWFnZSc7XHJcbmltcG9ydCBvbFNvdXJjZUltYWdlIGZyb20gJ29sL3NvdXJjZS9JbWFnZSc7XHJcblxyXG5pbXBvcnQgeyBBdXRoSW50ZXJjZXB0b3IgfSBmcm9tICdAaWdvMi9hdXRoJztcclxuXHJcbmltcG9ydCB7IEltYWdlV2F0Y2hlciB9IGZyb20gJy4uLy4uL3V0aWxzJztcclxuaW1wb3J0IHsgSWdvTWFwIH0gZnJvbSAnLi4vLi4vLi4vbWFwJztcclxuXHJcbmltcG9ydCB7IFdNU0RhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi8uLi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy93bXMtZGF0YXNvdXJjZSc7XHJcblxyXG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4vbGF5ZXInO1xyXG5pbXBvcnQgeyBJbWFnZUxheWVyT3B0aW9ucyB9IGZyb20gJy4vaW1hZ2UtbGF5ZXIuaW50ZXJmYWNlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBJbWFnZUxheWVyIGV4dGVuZHMgTGF5ZXIge1xyXG4gIHB1YmxpYyBkYXRhU291cmNlOiBXTVNEYXRhU291cmNlO1xyXG4gIHB1YmxpYyBvcHRpb25zOiBJbWFnZUxheWVyT3B0aW9ucztcclxuICBwdWJsaWMgb2w6IG9sTGF5ZXJJbWFnZTtcclxuXHJcbiAgcHJpdmF0ZSB3YXRjaGVyOiBJbWFnZVdhdGNoZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgb3B0aW9uczogSW1hZ2VMYXllck9wdGlvbnMsXHJcbiAgICBwdWJsaWMgYXV0aEludGVyY2VwdG9yPzogQXV0aEludGVyY2VwdG9yXHJcbiAgKSB7XHJcbiAgICBzdXBlcihvcHRpb25zLCBhdXRoSW50ZXJjZXB0b3IpO1xyXG4gICAgdGhpcy53YXRjaGVyID0gbmV3IEltYWdlV2F0Y2hlcih0aGlzKTtcclxuICAgIHRoaXMuc3RhdHVzJCA9IHRoaXMud2F0Y2hlci5zdGF0dXMkO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGNyZWF0ZU9sTGF5ZXIoKTogb2xMYXllckltYWdlIHtcclxuICAgIGNvbnN0IG9sT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMub3B0aW9ucywge1xyXG4gICAgICBzb3VyY2U6IHRoaXMub3B0aW9ucy5zb3VyY2Uub2wgYXMgb2xTb3VyY2VJbWFnZVxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgaW1hZ2UgPSBuZXcgb2xMYXllckltYWdlKG9sT3B0aW9ucyk7XHJcbiAgICBpZiAodGhpcy5hdXRoSW50ZXJjZXB0b3IpIHtcclxuICAgICAgKGltYWdlLmdldFNvdXJjZSgpIGFzIGFueSkuc2V0SW1hZ2VMb2FkRnVuY3Rpb24oKHRpbGUsIHNyYykgPT4ge1xyXG4gICAgICAgIHRoaXMuY3VzdG9tTG9hZGVyKHRpbGUsIHNyYyk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBpbWFnZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXRNYXAobWFwOiBJZ29NYXAgfCB1bmRlZmluZWQpIHtcclxuICAgIGlmIChtYXAgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLndhdGNoZXIudW5zdWJzY3JpYmUoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMud2F0Y2hlci5zdWJzY3JpYmUoKCkgPT4ge30pO1xyXG4gICAgfVxyXG4gICAgc3VwZXIuc2V0TWFwKG1hcCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGN1c3RvbUxvYWRlcih0aWxlLCBzcmMpIHtcclxuICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgeGhyLm9wZW4oJ0dFVCcsIHNyYyk7XHJcblxyXG4gICAgY29uc3QgaW50ZXJjZXB0ZWQgPSB0aGlzLmF1dGhJbnRlcmNlcHRvci5pbnRlcmNlcHRYaHIoeGhyLCBzcmMpO1xyXG4gICAgaWYgKCFpbnRlcmNlcHRlZCkge1xyXG4gICAgICB4aHIuYWJvcnQoKTtcclxuICAgICAgdGlsZS5nZXRJbWFnZSgpLnNyYyA9IHNyYztcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHhoci5yZXNwb25zZVR5cGUgPSAnYXJyYXlidWZmZXInO1xyXG5cclxuICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgY29uc3QgYXJyYXlCdWZmZXJWaWV3ID0gbmV3IFVpbnQ4QXJyYXkoKHRoaXMgYXMgYW55KS5yZXNwb25zZSk7XHJcbiAgICAgIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbYXJyYXlCdWZmZXJWaWV3XSwgeyB0eXBlOiAnaW1hZ2UvcG5nJyB9KTtcclxuICAgICAgY29uc3QgdXJsQ3JlYXRvciA9IHdpbmRvdy5VUkw7XHJcbiAgICAgIGNvbnN0IGltYWdlVXJsID0gdXJsQ3JlYXRvci5jcmVhdGVPYmplY3RVUkwoYmxvYik7XHJcbiAgICAgIHRpbGUuZ2V0SW1hZ2UoKS5zcmMgPSBpbWFnZVVybDtcclxuICAgIH07XHJcbiAgICB4aHIuc2VuZCgpO1xyXG4gIH1cclxufVxyXG4iXX0=