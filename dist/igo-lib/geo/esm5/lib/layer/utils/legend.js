/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/**
 * Get all the layers legend
 * @param {?} layers
 * @param {?=} scale
 * @return {?} Array of legend
 */
export function getLayersLegends(layers, scale) {
    var e_1, _a, e_2, _b;
    /** @type {?} */
    var legends = [];
    /** @type {?} */
    var newCanvas = document.createElement('canvas');
    /** @type {?} */
    var newContext = newCanvas.getContext('2d');
    newContext.font = '20px Calibri';
    /** @type {?} */
    var heightPos = 0;
    try {
        for (var layers_1 = tslib_1.__values(layers), layers_1_1 = layers_1.next(); !layers_1_1.done; layers_1_1 = layers_1.next()) {
            var layer = layers_1_1.value;
            if (layer.visible === false) {
                continue;
            }
            /** @type {?} */
            var legendUrls = layer.dataSource.getLegend(scale) || [];
            var _loop_1 = function (legendUrl) {
                if (legendUrl.url === undefined) {
                    return "continue";
                }
                /** @type {?} */
                var title = layer.title;
                // Create an image for the legend
                /** @type {?} */
                var legendImage = new Image();
                legendImage.crossOrigin = 'Anonymous';
                legendImage.src = legendUrl.url;
                legendImage.onload = (/**
                 * @return {?}
                 */
                function () {
                    newContext.fillText(title, 0, heightPos);
                    newContext.drawImage(legendImage, 0, heightPos + 20);
                    heightPos += legendImage.height + 5;
                });
                // Add legend info to the list
                legends.push({
                    title: title,
                    url: legendUrl.url,
                    image: legendImage
                });
            };
            try {
                for (var legendUrls_1 = tslib_1.__values(legendUrls), legendUrls_1_1 = legendUrls_1.next(); !legendUrls_1_1.done; legendUrls_1_1 = legendUrls_1.next()) {
                    var legendUrl = legendUrls_1_1.value;
                    _loop_1(legendUrl);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (legendUrls_1_1 && !legendUrls_1_1.done && (_b = legendUrls_1.return)) _b.call(legendUrls_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (layers_1_1 && !layers_1_1.done && (_a = layers_1.return)) _a.call(layers_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return legends;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVnZW5kLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2xheWVyL3V0aWxzL2xlZ2VuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQU9BLE1BQU0sVUFBVSxnQkFBZ0IsQ0FBQyxNQUFlLEVBQUUsS0FBYzs7O1FBQ3hELE9BQU8sR0FBRyxFQUFFOztRQUNaLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQzs7UUFDNUMsVUFBVSxHQUFHLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO0lBQzdDLFVBQVUsQ0FBQyxJQUFJLEdBQUcsY0FBYyxDQUFDOztRQUU3QixTQUFTLEdBQUcsQ0FBQzs7UUFDakIsS0FBb0IsSUFBQSxXQUFBLGlCQUFBLE1BQU0sQ0FBQSw4QkFBQSxrREFBRTtZQUF2QixJQUFNLEtBQUssbUJBQUE7WUFDZCxJQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUssS0FBSyxFQUFFO2dCQUFFLFNBQVM7YUFBRTs7Z0JBRXBDLFVBQVUsR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFO29DQUMvQyxTQUFTO2dCQUNsQixJQUFJLFNBQVMsQ0FBQyxHQUFHLEtBQUssU0FBUyxFQUFFOztpQkFBYTs7b0JBRXhDLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSzs7O29CQUVuQixXQUFXLEdBQUcsSUFBSSxLQUFLLEVBQUU7Z0JBQy9CLFdBQVcsQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO2dCQUN0QyxXQUFXLENBQUMsR0FBRyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUM7Z0JBQ2hDLFdBQVcsQ0FBQyxNQUFNOzs7Z0JBQUc7b0JBQ25CLFVBQVUsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQztvQkFDekMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxFQUFFLFNBQVMsR0FBRyxFQUFFLENBQUMsQ0FBQztvQkFDckQsU0FBUyxJQUFJLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2dCQUN0QyxDQUFDLENBQUEsQ0FBQztnQkFDRiw4QkFBOEI7Z0JBQzlCLE9BQU8sQ0FBQyxJQUFJLENBQUM7b0JBQ1gsS0FBSyxPQUFBO29CQUNMLEdBQUcsRUFBRSxTQUFTLENBQUMsR0FBRztvQkFDbEIsS0FBSyxFQUFFLFdBQVc7aUJBQ25CLENBQUMsQ0FBQzs7O2dCQWxCTCxLQUF3QixJQUFBLGVBQUEsaUJBQUEsVUFBVSxDQUFBLHNDQUFBO29CQUE3QixJQUFNLFNBQVMsdUJBQUE7NEJBQVQsU0FBUztpQkFtQm5COzs7Ozs7Ozs7U0FDRjs7Ozs7Ozs7O0lBRUQsT0FBTyxPQUFPLENBQUM7QUFDakIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExheWVyIH0gZnJvbSAnLi4vc2hhcmVkL2xheWVycy9sYXllcic7XHJcbmltcG9ydCB7IExheWVyTGVnZW5kIH0gZnJvbSAnLi4vc2hhcmVkL2xheWVycy9sYXllci5pbnRlcmZhY2UnO1xyXG5cclxuLyoqXHJcbiAqIEdldCBhbGwgdGhlIGxheWVycyBsZWdlbmRcclxuICogQHJldHVybiBBcnJheSBvZiBsZWdlbmRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRMYXllcnNMZWdlbmRzKGxheWVyczogTGF5ZXJbXSwgc2NhbGU/OiBudW1iZXIpOiBMYXllckxlZ2VuZFtdIHtcclxuICBjb25zdCBsZWdlbmRzID0gW107XHJcbiAgY29uc3QgbmV3Q2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XHJcbiAgY29uc3QgbmV3Q29udGV4dCA9IG5ld0NhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gIG5ld0NvbnRleHQuZm9udCA9ICcyMHB4IENhbGlicmknO1xyXG5cclxuICBsZXQgaGVpZ2h0UG9zID0gMDtcclxuICBmb3IgKGNvbnN0IGxheWVyIG9mIGxheWVycykge1xyXG4gICAgaWYgKGxheWVyLnZpc2libGUgPT09IGZhbHNlKSB7IGNvbnRpbnVlOyB9XHJcblxyXG4gICAgY29uc3QgbGVnZW5kVXJscyA9IGxheWVyLmRhdGFTb3VyY2UuZ2V0TGVnZW5kKHNjYWxlKSB8fCBbXTtcclxuICAgIGZvciAoY29uc3QgbGVnZW5kVXJsIG9mIGxlZ2VuZFVybHMpIHtcclxuICAgICAgaWYgKGxlZ2VuZFVybC51cmwgPT09IHVuZGVmaW5lZCkgeyBjb250aW51ZTsgfVxyXG5cclxuICAgICAgY29uc3QgdGl0bGUgPSBsYXllci50aXRsZTtcclxuICAgICAgLy8gQ3JlYXRlIGFuIGltYWdlIGZvciB0aGUgbGVnZW5kXHJcbiAgICAgIGNvbnN0IGxlZ2VuZEltYWdlID0gbmV3IEltYWdlKCk7XHJcbiAgICAgIGxlZ2VuZEltYWdlLmNyb3NzT3JpZ2luID0gJ0Fub255bW91cyc7XHJcbiAgICAgIGxlZ2VuZEltYWdlLnNyYyA9IGxlZ2VuZFVybC51cmw7XHJcbiAgICAgIGxlZ2VuZEltYWdlLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICBuZXdDb250ZXh0LmZpbGxUZXh0KHRpdGxlLCAwLCBoZWlnaHRQb3MpO1xyXG4gICAgICAgIG5ld0NvbnRleHQuZHJhd0ltYWdlKGxlZ2VuZEltYWdlLCAwLCBoZWlnaHRQb3MgKyAyMCk7XHJcbiAgICAgICAgaGVpZ2h0UG9zICs9IGxlZ2VuZEltYWdlLmhlaWdodCArIDU7XHJcbiAgICAgIH07XHJcbiAgICAgIC8vIEFkZCBsZWdlbmQgaW5mbyB0byB0aGUgbGlzdFxyXG4gICAgICBsZWdlbmRzLnB1c2goe1xyXG4gICAgICAgIHRpdGxlLFxyXG4gICAgICAgIHVybDogbGVnZW5kVXJsLnVybCxcclxuICAgICAgICBpbWFnZTogbGVnZW5kSW1hZ2VcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbGVnZW5kcztcclxufVxyXG4iXX0=