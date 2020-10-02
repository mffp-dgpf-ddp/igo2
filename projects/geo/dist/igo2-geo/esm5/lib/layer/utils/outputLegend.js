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
            var legendUrls = layer.dataSource.getLegend(undefined, scale) || [];
            var _loop_1 = function (legendUrl) {
                if (legendUrl.url === undefined) {
                    return "continue";
                }
                /** @type {?} */
                var title = layer.title;
                // Create an image for the legend
                /** @type {?} */
                var legendImage = new Image();
                legendImage.crossOrigin = 'anonymous';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0TGVnZW5kLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2xheWVyL3V0aWxzL291dHB1dExlZ2VuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQU9BLE1BQU0sVUFBVSxnQkFBZ0IsQ0FBQyxNQUFlLEVBQUUsS0FBYzs7O1FBQ3hELE9BQU8sR0FBRyxFQUFFOztRQUNaLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQzs7UUFDNUMsVUFBVSxHQUFHLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO0lBQzdDLFVBQVUsQ0FBQyxJQUFJLEdBQUcsY0FBYyxDQUFDOztRQUU3QixTQUFTLEdBQUcsQ0FBQzs7UUFDakIsS0FBb0IsSUFBQSxXQUFBLGlCQUFBLE1BQU0sQ0FBQSw4QkFBQSxrREFBRTtZQUF2QixJQUFNLEtBQUssbUJBQUE7WUFDZCxJQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUssS0FBSyxFQUFFO2dCQUFFLFNBQVM7YUFBRTs7Z0JBRXBDLFVBQVUsR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLElBQUksRUFBRTtvQ0FDMUQsU0FBUztnQkFDbEIsSUFBSSxTQUFTLENBQUMsR0FBRyxLQUFLLFNBQVMsRUFBRTs7aUJBQWE7O29CQUV4QyxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUs7OztvQkFFbkIsV0FBVyxHQUFHLElBQUksS0FBSyxFQUFFO2dCQUMvQixXQUFXLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztnQkFDdEMsV0FBVyxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDO2dCQUNoQyxXQUFXLENBQUMsTUFBTTs7O2dCQUFHO29CQUNuQixVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7b0JBQ3pDLFVBQVUsQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBRSxTQUFTLEdBQUcsRUFBRSxDQUFDLENBQUM7b0JBQ3JELFNBQVMsSUFBSSxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztnQkFDdEMsQ0FBQyxDQUFBLENBQUM7Z0JBQ0YsOEJBQThCO2dCQUM5QixPQUFPLENBQUMsSUFBSSxDQUFDO29CQUNYLEtBQUssT0FBQTtvQkFDTCxHQUFHLEVBQUUsU0FBUyxDQUFDLEdBQUc7b0JBQ2xCLEtBQUssRUFBRSxXQUFXO2lCQUNuQixDQUFDLENBQUM7OztnQkFsQkwsS0FBd0IsSUFBQSxlQUFBLGlCQUFBLFVBQVUsQ0FBQSxzQ0FBQTtvQkFBN0IsSUFBTSxTQUFTLHVCQUFBOzRCQUFULFNBQVM7aUJBbUJuQjs7Ozs7Ozs7O1NBQ0Y7Ozs7Ozs7OztJQUVELE9BQU8sT0FBTyxDQUFDO0FBQ2pCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMYXllciB9IGZyb20gJy4uL3NoYXJlZC9sYXllcnMvbGF5ZXInO1xyXG5pbXBvcnQgeyBPdXRwdXRMYXllckxlZ2VuZCB9IGZyb20gJy4uL3NoYXJlZC9sYXllcnMvbGF5ZXIuaW50ZXJmYWNlJztcclxuXHJcbi8qKlxyXG4gKiBHZXQgYWxsIHRoZSBsYXllcnMgbGVnZW5kXHJcbiAqIEByZXR1cm4gQXJyYXkgb2YgbGVnZW5kXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TGF5ZXJzTGVnZW5kcyhsYXllcnM6IExheWVyW10sIHNjYWxlPzogbnVtYmVyKTogT3V0cHV0TGF5ZXJMZWdlbmRbXSB7XHJcbiAgY29uc3QgbGVnZW5kcyA9IFtdO1xyXG4gIGNvbnN0IG5ld0NhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xyXG4gIGNvbnN0IG5ld0NvbnRleHQgPSBuZXdDYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICBuZXdDb250ZXh0LmZvbnQgPSAnMjBweCBDYWxpYnJpJztcclxuXHJcbiAgbGV0IGhlaWdodFBvcyA9IDA7XHJcbiAgZm9yIChjb25zdCBsYXllciBvZiBsYXllcnMpIHtcclxuICAgIGlmIChsYXllci52aXNpYmxlID09PSBmYWxzZSkgeyBjb250aW51ZTsgfVxyXG5cclxuICAgIGNvbnN0IGxlZ2VuZFVybHMgPSBsYXllci5kYXRhU291cmNlLmdldExlZ2VuZCh1bmRlZmluZWQsIHNjYWxlKSB8fCBbXTtcclxuICAgIGZvciAoY29uc3QgbGVnZW5kVXJsIG9mIGxlZ2VuZFVybHMpIHtcclxuICAgICAgaWYgKGxlZ2VuZFVybC51cmwgPT09IHVuZGVmaW5lZCkgeyBjb250aW51ZTsgfVxyXG5cclxuICAgICAgY29uc3QgdGl0bGUgPSBsYXllci50aXRsZTtcclxuICAgICAgLy8gQ3JlYXRlIGFuIGltYWdlIGZvciB0aGUgbGVnZW5kXHJcbiAgICAgIGNvbnN0IGxlZ2VuZEltYWdlID0gbmV3IEltYWdlKCk7XHJcbiAgICAgIGxlZ2VuZEltYWdlLmNyb3NzT3JpZ2luID0gJ2Fub255bW91cyc7XHJcbiAgICAgIGxlZ2VuZEltYWdlLnNyYyA9IGxlZ2VuZFVybC51cmw7XHJcbiAgICAgIGxlZ2VuZEltYWdlLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICBuZXdDb250ZXh0LmZpbGxUZXh0KHRpdGxlLCAwLCBoZWlnaHRQb3MpO1xyXG4gICAgICAgIG5ld0NvbnRleHQuZHJhd0ltYWdlKGxlZ2VuZEltYWdlLCAwLCBoZWlnaHRQb3MgKyAyMCk7XHJcbiAgICAgICAgaGVpZ2h0UG9zICs9IGxlZ2VuZEltYWdlLmhlaWdodCArIDU7XHJcbiAgICAgIH07XHJcbiAgICAgIC8vIEFkZCBsZWdlbmQgaW5mbyB0byB0aGUgbGlzdFxyXG4gICAgICBsZWdlbmRzLnB1c2goe1xyXG4gICAgICAgIHRpdGxlLFxyXG4gICAgICAgIHVybDogbGVnZW5kVXJsLnVybCxcclxuICAgICAgICBpbWFnZTogbGVnZW5kSW1hZ2VcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbGVnZW5kcztcclxufVxyXG4iXX0=