/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Get all the layers legend
 * @param {?} layers
 * @param {?=} scale
 * @return {?} Array of legend
 */
export function getLayersLegends(layers, scale) {
    /** @type {?} */
    const legends = [];
    /** @type {?} */
    const newCanvas = document.createElement('canvas');
    /** @type {?} */
    const newContext = newCanvas.getContext('2d');
    newContext.font = '20px Calibri';
    /** @type {?} */
    let heightPos = 0;
    for (const layer of layers) {
        if (layer.visible === false) {
            continue;
        }
        /** @type {?} */
        const legendUrls = layer.dataSource.getLegend(undefined, scale) || [];
        for (const legendUrl of legendUrls) {
            if (legendUrl.url === undefined) {
                continue;
            }
            /** @type {?} */
            const title = layer.title;
            // Create an image for the legend
            /** @type {?} */
            const legendImage = new Image();
            legendImage.crossOrigin = 'anonymous';
            legendImage.src = legendUrl.url;
            legendImage.onload = (/**
             * @return {?}
             */
            () => {
                newContext.fillText(title, 0, heightPos);
                newContext.drawImage(legendImage, 0, heightPos + 20);
                heightPos += legendImage.height + 5;
            });
            // Add legend info to the list
            legends.push({
                title,
                url: legendUrl.url,
                image: legendImage
            });
        }
    }
    return legends;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0TGVnZW5kLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2xheWVyL3V0aWxzL291dHB1dExlZ2VuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBT0EsTUFBTSxVQUFVLGdCQUFnQixDQUFDLE1BQWUsRUFBRSxLQUFjOztVQUN4RCxPQUFPLEdBQUcsRUFBRTs7VUFDWixTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUM7O1VBQzVDLFVBQVUsR0FBRyxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztJQUM3QyxVQUFVLENBQUMsSUFBSSxHQUFHLGNBQWMsQ0FBQzs7UUFFN0IsU0FBUyxHQUFHLENBQUM7SUFDakIsS0FBSyxNQUFNLEtBQUssSUFBSSxNQUFNLEVBQUU7UUFDMUIsSUFBSSxLQUFLLENBQUMsT0FBTyxLQUFLLEtBQUssRUFBRTtZQUFFLFNBQVM7U0FBRTs7Y0FFcEMsVUFBVSxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsSUFBSSxFQUFFO1FBQ3JFLEtBQUssTUFBTSxTQUFTLElBQUksVUFBVSxFQUFFO1lBQ2xDLElBQUksU0FBUyxDQUFDLEdBQUcsS0FBSyxTQUFTLEVBQUU7Z0JBQUUsU0FBUzthQUFFOztrQkFFeEMsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLOzs7a0JBRW5CLFdBQVcsR0FBRyxJQUFJLEtBQUssRUFBRTtZQUMvQixXQUFXLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztZQUN0QyxXQUFXLENBQUMsR0FBRyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUM7WUFDaEMsV0FBVyxDQUFDLE1BQU07OztZQUFHLEdBQUcsRUFBRTtnQkFDeEIsVUFBVSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO2dCQUN6QyxVQUFVLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDLEVBQUUsU0FBUyxHQUFHLEVBQUUsQ0FBQyxDQUFDO2dCQUNyRCxTQUFTLElBQUksV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDdEMsQ0FBQyxDQUFBLENBQUM7WUFDRiw4QkFBOEI7WUFDOUIsT0FBTyxDQUFDLElBQUksQ0FBQztnQkFDWCxLQUFLO2dCQUNMLEdBQUcsRUFBRSxTQUFTLENBQUMsR0FBRztnQkFDbEIsS0FBSyxFQUFFLFdBQVc7YUFDbkIsQ0FBQyxDQUFDO1NBQ0o7S0FDRjtJQUVELE9BQU8sT0FBTyxDQUFDO0FBQ2pCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMYXllciB9IGZyb20gJy4uL3NoYXJlZC9sYXllcnMvbGF5ZXInO1xyXG5pbXBvcnQgeyBPdXRwdXRMYXllckxlZ2VuZCB9IGZyb20gJy4uL3NoYXJlZC9sYXllcnMvbGF5ZXIuaW50ZXJmYWNlJztcclxuXHJcbi8qKlxyXG4gKiBHZXQgYWxsIHRoZSBsYXllcnMgbGVnZW5kXHJcbiAqIEByZXR1cm4gQXJyYXkgb2YgbGVnZW5kXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TGF5ZXJzTGVnZW5kcyhsYXllcnM6IExheWVyW10sIHNjYWxlPzogbnVtYmVyKTogT3V0cHV0TGF5ZXJMZWdlbmRbXSB7XHJcbiAgY29uc3QgbGVnZW5kcyA9IFtdO1xyXG4gIGNvbnN0IG5ld0NhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xyXG4gIGNvbnN0IG5ld0NvbnRleHQgPSBuZXdDYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICBuZXdDb250ZXh0LmZvbnQgPSAnMjBweCBDYWxpYnJpJztcclxuXHJcbiAgbGV0IGhlaWdodFBvcyA9IDA7XHJcbiAgZm9yIChjb25zdCBsYXllciBvZiBsYXllcnMpIHtcclxuICAgIGlmIChsYXllci52aXNpYmxlID09PSBmYWxzZSkgeyBjb250aW51ZTsgfVxyXG5cclxuICAgIGNvbnN0IGxlZ2VuZFVybHMgPSBsYXllci5kYXRhU291cmNlLmdldExlZ2VuZCh1bmRlZmluZWQsIHNjYWxlKSB8fCBbXTtcclxuICAgIGZvciAoY29uc3QgbGVnZW5kVXJsIG9mIGxlZ2VuZFVybHMpIHtcclxuICAgICAgaWYgKGxlZ2VuZFVybC51cmwgPT09IHVuZGVmaW5lZCkgeyBjb250aW51ZTsgfVxyXG5cclxuICAgICAgY29uc3QgdGl0bGUgPSBsYXllci50aXRsZTtcclxuICAgICAgLy8gQ3JlYXRlIGFuIGltYWdlIGZvciB0aGUgbGVnZW5kXHJcbiAgICAgIGNvbnN0IGxlZ2VuZEltYWdlID0gbmV3IEltYWdlKCk7XHJcbiAgICAgIGxlZ2VuZEltYWdlLmNyb3NzT3JpZ2luID0gJ2Fub255bW91cyc7XHJcbiAgICAgIGxlZ2VuZEltYWdlLnNyYyA9IGxlZ2VuZFVybC51cmw7XHJcbiAgICAgIGxlZ2VuZEltYWdlLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICBuZXdDb250ZXh0LmZpbGxUZXh0KHRpdGxlLCAwLCBoZWlnaHRQb3MpO1xyXG4gICAgICAgIG5ld0NvbnRleHQuZHJhd0ltYWdlKGxlZ2VuZEltYWdlLCAwLCBoZWlnaHRQb3MgKyAyMCk7XHJcbiAgICAgICAgaGVpZ2h0UG9zICs9IGxlZ2VuZEltYWdlLmhlaWdodCArIDU7XHJcbiAgICAgIH07XHJcbiAgICAgIC8vIEFkZCBsZWdlbmQgaW5mbyB0byB0aGUgbGlzdFxyXG4gICAgICBsZWdlbmRzLnB1c2goe1xyXG4gICAgICAgIHRpdGxlLFxyXG4gICAgICAgIHVybDogbGVnZW5kVXJsLnVybCxcclxuICAgICAgICBpbWFnZTogbGVnZW5kSW1hZ2VcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbGVnZW5kcztcclxufVxyXG4iXX0=