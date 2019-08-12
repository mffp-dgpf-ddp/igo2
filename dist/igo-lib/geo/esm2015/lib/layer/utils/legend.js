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
        const legendUrls = layer.dataSource.getLegend(scale) || [];
        for (const legendUrl of legendUrls) {
            if (legendUrl.url === undefined) {
                continue;
            }
            /** @type {?} */
            const title = layer.title;
            // Create an image for the legend
            /** @type {?} */
            const legendImage = new Image();
            legendImage.crossOrigin = 'Anonymous';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVnZW5kLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2xheWVyL3V0aWxzL2xlZ2VuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBT0EsTUFBTSxVQUFVLGdCQUFnQixDQUFDLE1BQWUsRUFBRSxLQUFjOztVQUN4RCxPQUFPLEdBQUcsRUFBRTs7VUFDWixTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUM7O1VBQzVDLFVBQVUsR0FBRyxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztJQUM3QyxVQUFVLENBQUMsSUFBSSxHQUFHLGNBQWMsQ0FBQzs7UUFFN0IsU0FBUyxHQUFHLENBQUM7SUFDakIsS0FBSyxNQUFNLEtBQUssSUFBSSxNQUFNLEVBQUU7UUFDMUIsSUFBSSxLQUFLLENBQUMsT0FBTyxLQUFLLEtBQUssRUFBRTtZQUFFLFNBQVM7U0FBRTs7Y0FFcEMsVUFBVSxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUU7UUFDMUQsS0FBSyxNQUFNLFNBQVMsSUFBSSxVQUFVLEVBQUU7WUFDbEMsSUFBSSxTQUFTLENBQUMsR0FBRyxLQUFLLFNBQVMsRUFBRTtnQkFBRSxTQUFTO2FBQUU7O2tCQUV4QyxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUs7OztrQkFFbkIsV0FBVyxHQUFHLElBQUksS0FBSyxFQUFFO1lBQy9CLFdBQVcsQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1lBQ3RDLFdBQVcsQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQztZQUNoQyxXQUFXLENBQUMsTUFBTTs7O1lBQUcsR0FBRyxFQUFFO2dCQUN4QixVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7Z0JBQ3pDLFVBQVUsQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBRSxTQUFTLEdBQUcsRUFBRSxDQUFDLENBQUM7Z0JBQ3JELFNBQVMsSUFBSSxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUN0QyxDQUFDLENBQUEsQ0FBQztZQUNGLDhCQUE4QjtZQUM5QixPQUFPLENBQUMsSUFBSSxDQUFDO2dCQUNYLEtBQUs7Z0JBQ0wsR0FBRyxFQUFFLFNBQVMsQ0FBQyxHQUFHO2dCQUNsQixLQUFLLEVBQUUsV0FBVzthQUNuQixDQUFDLENBQUM7U0FDSjtLQUNGO0lBRUQsT0FBTyxPQUFPLENBQUM7QUFDakIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExheWVyIH0gZnJvbSAnLi4vc2hhcmVkL2xheWVycy9sYXllcic7XHJcbmltcG9ydCB7IExheWVyTGVnZW5kIH0gZnJvbSAnLi4vc2hhcmVkL2xheWVycy9sYXllci5pbnRlcmZhY2UnO1xyXG5cclxuLyoqXHJcbiAqIEdldCBhbGwgdGhlIGxheWVycyBsZWdlbmRcclxuICogQHJldHVybiBBcnJheSBvZiBsZWdlbmRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRMYXllcnNMZWdlbmRzKGxheWVyczogTGF5ZXJbXSwgc2NhbGU/OiBudW1iZXIpOiBMYXllckxlZ2VuZFtdIHtcclxuICBjb25zdCBsZWdlbmRzID0gW107XHJcbiAgY29uc3QgbmV3Q2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XHJcbiAgY29uc3QgbmV3Q29udGV4dCA9IG5ld0NhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gIG5ld0NvbnRleHQuZm9udCA9ICcyMHB4IENhbGlicmknO1xyXG5cclxuICBsZXQgaGVpZ2h0UG9zID0gMDtcclxuICBmb3IgKGNvbnN0IGxheWVyIG9mIGxheWVycykge1xyXG4gICAgaWYgKGxheWVyLnZpc2libGUgPT09IGZhbHNlKSB7IGNvbnRpbnVlOyB9XHJcblxyXG4gICAgY29uc3QgbGVnZW5kVXJscyA9IGxheWVyLmRhdGFTb3VyY2UuZ2V0TGVnZW5kKHNjYWxlKSB8fCBbXTtcclxuICAgIGZvciAoY29uc3QgbGVnZW5kVXJsIG9mIGxlZ2VuZFVybHMpIHtcclxuICAgICAgaWYgKGxlZ2VuZFVybC51cmwgPT09IHVuZGVmaW5lZCkgeyBjb250aW51ZTsgfVxyXG5cclxuICAgICAgY29uc3QgdGl0bGUgPSBsYXllci50aXRsZTtcclxuICAgICAgLy8gQ3JlYXRlIGFuIGltYWdlIGZvciB0aGUgbGVnZW5kXHJcbiAgICAgIGNvbnN0IGxlZ2VuZEltYWdlID0gbmV3IEltYWdlKCk7XHJcbiAgICAgIGxlZ2VuZEltYWdlLmNyb3NzT3JpZ2luID0gJ0Fub255bW91cyc7XHJcbiAgICAgIGxlZ2VuZEltYWdlLnNyYyA9IGxlZ2VuZFVybC51cmw7XHJcbiAgICAgIGxlZ2VuZEltYWdlLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICBuZXdDb250ZXh0LmZpbGxUZXh0KHRpdGxlLCAwLCBoZWlnaHRQb3MpO1xyXG4gICAgICAgIG5ld0NvbnRleHQuZHJhd0ltYWdlKGxlZ2VuZEltYWdlLCAwLCBoZWlnaHRQb3MgKyAyMCk7XHJcbiAgICAgICAgaGVpZ2h0UG9zICs9IGxlZ2VuZEltYWdlLmhlaWdodCArIDU7XHJcbiAgICAgIH07XHJcbiAgICAgIC8vIEFkZCBsZWdlbmQgaW5mbyB0byB0aGUgbGlzdFxyXG4gICAgICBsZWdlbmRzLnB1c2goe1xyXG4gICAgICAgIHRpdGxlLFxyXG4gICAgICAgIHVybDogbGVnZW5kVXJsLnVybCxcclxuICAgICAgICBpbWFnZTogbGVnZW5kSW1hZ2VcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbGVnZW5kcztcclxufVxyXG4iXX0=