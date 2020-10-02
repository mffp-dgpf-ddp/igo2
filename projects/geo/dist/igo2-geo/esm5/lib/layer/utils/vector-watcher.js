/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { uuid, Watcher } from '@igo2/utils';
var VectorWatcher = /** @class */ (function (_super) {
    tslib_1.__extends(VectorWatcher, _super);
    function VectorWatcher(layer) {
        var _this = _super.call(this) || this;
        _this.loaded = 0;
        _this.loading = 0;
        _this.layer = layer;
        _this.id = uuid();
        return _this;
    }
    /**
     * @protected
     * @return {?}
     */
    VectorWatcher.prototype.watch = /**
     * @protected
     * @return {?}
     */
    function () {
    };
    /**
     * @protected
     * @return {?}
     */
    VectorWatcher.prototype.unwatch = /**
     * @protected
     * @return {?}
     */
    function () {
        this.layer.onUnwatch();
    };
    return VectorWatcher;
}(Watcher));
export { VectorWatcher };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVjdG9yLXdhdGNoZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvbGF5ZXIvdXRpbHMvdmVjdG9yLXdhdGNoZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBaUIsTUFBTSxhQUFhLENBQUM7QUFJM0Q7SUFBbUMseUNBQU87SUFPeEMsdUJBQVksS0FBa0I7UUFBOUIsWUFDRSxpQkFBTyxTQUdSO1FBVE8sWUFBTSxHQUFHLENBQUMsQ0FBQztRQUNYLGFBQU8sR0FBRyxDQUFDLENBQUM7UUFNbEIsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsS0FBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLEVBQUUsQ0FBQzs7SUFDbkIsQ0FBQzs7Ozs7SUFFUyw2QkFBSzs7OztJQUFmO0lBQ0EsQ0FBQzs7Ozs7SUFFUywrQkFBTzs7OztJQUFqQjtRQUNFLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUNILG9CQUFDO0FBQUQsQ0FBQyxBQW5CRCxDQUFtQyxPQUFPLEdBbUJ6Qzs7Ozs7OztJQWxCQywyQkFBbUI7Ozs7O0lBQ25CLCtCQUFtQjs7Ozs7SUFDbkIsZ0NBQW9COzs7OztJQUVwQiw4QkFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgb2xTb3VyY2VWZWN0b3IgZnJvbSAnb2wvc291cmNlL1ZlY3Rvcic7XHJcbmltcG9ydCB7IHV1aWQsIFdhdGNoZXIsIFN1YmplY3RTdGF0dXMgfSBmcm9tICdAaWdvMi91dGlscyc7XHJcblxyXG5pbXBvcnQgeyBWZWN0b3JMYXllciB9IGZyb20gJy4uL3NoYXJlZC9sYXllcnMvdmVjdG9yLWxheWVyJztcclxuXHJcbmV4cG9ydCBjbGFzcyBWZWN0b3JXYXRjaGVyIGV4dGVuZHMgV2F0Y2hlciB7XHJcbiAgcHJpdmF0ZSBpZDogc3RyaW5nO1xyXG4gIHByaXZhdGUgbG9hZGVkID0gMDtcclxuICBwcml2YXRlIGxvYWRpbmcgPSAwO1xyXG5cclxuICBwcml2YXRlIGxheWVyOiBWZWN0b3JMYXllcjtcclxuXHJcbiAgY29uc3RydWN0b3IobGF5ZXI6IFZlY3RvckxheWVyKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5sYXllciA9IGxheWVyO1xyXG4gICAgdGhpcy5pZCA9IHV1aWQoKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCB3YXRjaCgpIHtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCB1bndhdGNoKCkge1xyXG4gICAgdGhpcy5sYXllci5vblVud2F0Y2goKTtcclxuICB9XHJcbn1cclxuIl19