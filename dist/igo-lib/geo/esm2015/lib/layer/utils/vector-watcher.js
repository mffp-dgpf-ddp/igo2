/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { uuid, Watcher } from '@igo2/utils';
export class VectorWatcher extends Watcher {
    /**
     * @param {?} layer
     */
    constructor(layer) {
        super();
        this.loaded = 0;
        this.loading = 0;
        this.layer = layer;
        this.id = uuid();
    }
    /**
     * @protected
     * @return {?}
     */
    watch() {
    }
    /**
     * @protected
     * @return {?}
     */
    unwatch() {
        this.layer.onUnwatch();
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    VectorWatcher.prototype.id;
    /**
     * @type {?}
     * @private
     */
    VectorWatcher.prototype.loaded;
    /**
     * @type {?}
     * @private
     */
    VectorWatcher.prototype.loading;
    /**
     * @type {?}
     * @private
     */
    VectorWatcher.prototype.layer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVjdG9yLXdhdGNoZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvbGF5ZXIvdXRpbHMvdmVjdG9yLXdhdGNoZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFpQixNQUFNLGFBQWEsQ0FBQztBQUkzRCxNQUFNLE9BQU8sYUFBYyxTQUFRLE9BQU87Ozs7SUFPeEMsWUFBWSxLQUFrQjtRQUM1QixLQUFLLEVBQUUsQ0FBQztRQU5GLFdBQU0sR0FBRyxDQUFDLENBQUM7UUFDWCxZQUFPLEdBQUcsQ0FBQyxDQUFDO1FBTWxCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxFQUFFLENBQUM7SUFDbkIsQ0FBQzs7Ozs7SUFFUyxLQUFLO0lBQ2YsQ0FBQzs7Ozs7SUFFUyxPQUFPO1FBQ2YsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUN6QixDQUFDO0NBQ0Y7Ozs7OztJQWxCQywyQkFBbUI7Ozs7O0lBQ25CLCtCQUFtQjs7Ozs7SUFDbkIsZ0NBQW9COzs7OztJQUVwQiw4QkFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgb2xTb3VyY2VWZWN0b3IgZnJvbSAnb2wvc291cmNlL1ZlY3Rvcic7XHJcbmltcG9ydCB7IHV1aWQsIFdhdGNoZXIsIFN1YmplY3RTdGF0dXMgfSBmcm9tICdAaWdvMi91dGlscyc7XHJcblxyXG5pbXBvcnQgeyBWZWN0b3JMYXllciB9IGZyb20gJy4uL3NoYXJlZC9sYXllcnMvdmVjdG9yLWxheWVyJztcclxuXHJcbmV4cG9ydCBjbGFzcyBWZWN0b3JXYXRjaGVyIGV4dGVuZHMgV2F0Y2hlciB7XHJcbiAgcHJpdmF0ZSBpZDogc3RyaW5nO1xyXG4gIHByaXZhdGUgbG9hZGVkID0gMDtcclxuICBwcml2YXRlIGxvYWRpbmcgPSAwO1xyXG5cclxuICBwcml2YXRlIGxheWVyOiBWZWN0b3JMYXllcjtcclxuXHJcbiAgY29uc3RydWN0b3IobGF5ZXI6IFZlY3RvckxheWVyKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5sYXllciA9IGxheWVyO1xyXG4gICAgdGhpcy5pZCA9IHV1aWQoKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCB3YXRjaCgpIHtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCB1bndhdGNoKCkge1xyXG4gICAgdGhpcy5sYXllci5vblVud2F0Y2goKTtcclxuICB9XHJcbn1cclxuIl19