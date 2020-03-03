/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { uuid, Watcher, SubjectStatus } from '@igo2/utils';
var TileWatcher = /** @class */ (function (_super) {
    tslib_1.__extends(TileWatcher, _super);
    function TileWatcher(layer) {
        var _this = _super.call(this) || this;
        _this.loaded = 0;
        _this.loading = 0;
        _this.source = layer.options.source.ol;
        _this.id = uuid();
        return _this;
    }
    /**
     * @protected
     * @return {?}
     */
    TileWatcher.prototype.watch = /**
     * @protected
     * @return {?}
     */
    function () {
        var _this = this;
        this.source.on("tileloadstart", (/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return _this.handleLoadStart(e); }));
        this.source.on("tileloadend", (/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return _this.handleLoadEnd(e); }));
        this.source.on("tileloaderror", (/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return _this.handleLoadEnd(e); }));
    };
    /**
     * @protected
     * @return {?}
     */
    TileWatcher.prototype.unwatch = /**
     * @protected
     * @return {?}
     */
    function () {
        var _this = this;
        this.source.un("tileloadstart", (/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return _this.handleLoadStart(e); }));
        this.source.un("tileloadend", (/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return _this.handleLoadEnd(e); }));
        this.source.un("tileloaderror", (/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return _this.handleLoadEnd(e); }));
    };
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    TileWatcher.prototype.handleLoadStart = /**
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // This is to avoid increasing
        // the number of loaded tiles if a tile was loading
        // before subscribing to this watcher
        if (!event.tile.__watchers__) {
            event.tile.__watchers__ = [];
        }
        event.tile.__watchers__.push(this.id);
        this.loading += 1;
        this.status = SubjectStatus.Working;
    };
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    TileWatcher.prototype.handleLoadEnd = /**
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!event.tile.__watchers__) {
            return;
        }
        /** @type {?} */
        var watcherIndex = event.tile.__watchers__.indexOf(this.id);
        if (watcherIndex < 0) {
            return;
        }
        event.tile.__watchers__.splice(watcherIndex, 1);
        this.loaded += 1;
        /** @type {?} */
        var loading = this.loading;
        if (this.loaded >= loading) {
            if (loading === this.loading) {
                this.status = SubjectStatus.Done;
                this.loaded = this.loading = 0;
            }
        }
    };
    return TileWatcher;
}(Watcher));
export { TileWatcher };
if (false) {
    /**
     * @type {?}
     * @private
     */
    TileWatcher.prototype.id;
    /**
     * @type {?}
     * @private
     */
    TileWatcher.prototype.loaded;
    /**
     * @type {?}
     * @private
     */
    TileWatcher.prototype.loading;
    /**
     * @type {?}
     * @private
     */
    TileWatcher.prototype.source;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGlsZS13YXRjaGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2xheWVyL3V0aWxzL3RpbGUtd2F0Y2hlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUszRDtJQUFpQyx1Q0FBTztJQU90QyxxQkFBWSxLQUFrQztRQUE5QyxZQUNFLGlCQUFPLFNBR1I7UUFUTyxZQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsYUFBTyxHQUFHLENBQUMsQ0FBQztRQU1sQixLQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUN0QyxLQUFJLENBQUMsRUFBRSxHQUFHLElBQUksRUFBRSxDQUFDOztJQUNuQixDQUFDOzs7OztJQUVTLDJCQUFLOzs7O0lBQWY7UUFBQSxpQkFJQztRQUhDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLGVBQWU7Ozs7UUFBRSxVQUFBLENBQUMsSUFBSSxPQUFBLEtBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLEVBQXZCLENBQXVCLEVBQUMsQ0FBQztRQUM5RCxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxhQUFhOzs7O1FBQUUsVUFBQSxDQUFDLElBQUksT0FBQSxLQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxFQUFyQixDQUFxQixFQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsZUFBZTs7OztRQUFFLFVBQUEsQ0FBQyxJQUFJLE9BQUEsS0FBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBckIsQ0FBcUIsRUFBQyxDQUFDO0lBQzlELENBQUM7Ozs7O0lBRVMsNkJBQU87Ozs7SUFBakI7UUFBQSxpQkFJQztRQUhDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLGVBQWU7Ozs7UUFBRSxVQUFBLENBQUMsSUFBSSxPQUFBLEtBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLEVBQXZCLENBQXVCLEVBQUMsQ0FBQztRQUM5RCxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxhQUFhOzs7O1FBQUUsVUFBQSxDQUFDLElBQUksT0FBQSxLQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxFQUFyQixDQUFxQixFQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsZUFBZTs7OztRQUFFLFVBQUEsQ0FBQyxJQUFJLE9BQUEsS0FBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBckIsQ0FBcUIsRUFBQyxDQUFDO0lBQzlELENBQUM7Ozs7OztJQUVPLHFDQUFlOzs7OztJQUF2QixVQUF3QixLQUFVO1FBQ2hDLDhCQUE4QjtRQUM5QixtREFBbUQ7UUFDbkQscUNBQXFDO1FBQ3JDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUM1QixLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7U0FDOUI7UUFDRCxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRXRDLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxNQUFNLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQztJQUN0QyxDQUFDOzs7Ozs7SUFFTyxtQ0FBYTs7Ozs7SUFBckIsVUFBc0IsS0FBSztRQUN6QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDNUIsT0FBTztTQUNSOztZQUVLLFlBQVksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUM3RCxJQUFJLFlBQVksR0FBRyxDQUFDLEVBQUU7WUFDcEIsT0FBTztTQUNSO1FBRUQsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUVoRCxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQzs7WUFFWCxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU87UUFDNUIsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLE9BQU8sRUFBRTtZQUMxQixJQUFJLE9BQU8sS0FBSyxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUM1QixJQUFJLENBQUMsTUFBTSxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUM7Z0JBQ2pDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7YUFDaEM7U0FDRjtJQUNILENBQUM7SUFDSCxrQkFBQztBQUFELENBQUMsQUE1REQsQ0FBaUMsT0FBTyxHQTREdkM7Ozs7Ozs7SUEzREMseUJBQW1COzs7OztJQUNuQiw2QkFBbUI7Ozs7O0lBQ25CLDhCQUFvQjs7Ozs7SUFFcEIsNkJBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG9sU291cmNlVGlsZSBmcm9tICdvbC9zb3VyY2UvVGlsZSc7XHJcbmltcG9ydCB7IHV1aWQsIFdhdGNoZXIsIFN1YmplY3RTdGF0dXMgfSBmcm9tICdAaWdvMi91dGlscyc7XHJcblxyXG5pbXBvcnQgeyBUaWxlTGF5ZXIgfSBmcm9tICcuLi9zaGFyZWQvbGF5ZXJzL3RpbGUtbGF5ZXInO1xyXG5pbXBvcnQgeyBWZWN0b3JUaWxlTGF5ZXIgfSBmcm9tICcuLi9zaGFyZWQvbGF5ZXJzL3ZlY3RvcnRpbGUtbGF5ZXInO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRpbGVXYXRjaGVyIGV4dGVuZHMgV2F0Y2hlciB7XHJcbiAgcHJpdmF0ZSBpZDogc3RyaW5nO1xyXG4gIHByaXZhdGUgbG9hZGVkID0gMDtcclxuICBwcml2YXRlIGxvYWRpbmcgPSAwO1xyXG5cclxuICBwcml2YXRlIHNvdXJjZTogb2xTb3VyY2VUaWxlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihsYXllcjogVGlsZUxheWVyIHwgVmVjdG9yVGlsZUxheWVyKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5zb3VyY2UgPSBsYXllci5vcHRpb25zLnNvdXJjZS5vbDtcclxuICAgIHRoaXMuaWQgPSB1dWlkKCk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgd2F0Y2goKSB7XHJcbiAgICB0aGlzLnNvdXJjZS5vbihgdGlsZWxvYWRzdGFydGAsIGUgPT4gdGhpcy5oYW5kbGVMb2FkU3RhcnQoZSkpO1xyXG4gICAgdGhpcy5zb3VyY2Uub24oYHRpbGVsb2FkZW5kYCwgZSA9PiB0aGlzLmhhbmRsZUxvYWRFbmQoZSkpO1xyXG4gICAgdGhpcy5zb3VyY2Uub24oYHRpbGVsb2FkZXJyb3JgLCBlID0+IHRoaXMuaGFuZGxlTG9hZEVuZChlKSk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgdW53YXRjaCgpIHtcclxuICAgIHRoaXMuc291cmNlLnVuKGB0aWxlbG9hZHN0YXJ0YCwgZSA9PiB0aGlzLmhhbmRsZUxvYWRTdGFydChlKSk7XHJcbiAgICB0aGlzLnNvdXJjZS51bihgdGlsZWxvYWRlbmRgLCBlID0+IHRoaXMuaGFuZGxlTG9hZEVuZChlKSk7XHJcbiAgICB0aGlzLnNvdXJjZS51bihgdGlsZWxvYWRlcnJvcmAsIGUgPT4gdGhpcy5oYW5kbGVMb2FkRW5kKGUpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGFuZGxlTG9hZFN0YXJ0KGV2ZW50OiBhbnkpIHtcclxuICAgIC8vIFRoaXMgaXMgdG8gYXZvaWQgaW5jcmVhc2luZ1xyXG4gICAgLy8gdGhlIG51bWJlciBvZiBsb2FkZWQgdGlsZXMgaWYgYSB0aWxlIHdhcyBsb2FkaW5nXHJcbiAgICAvLyBiZWZvcmUgc3Vic2NyaWJpbmcgdG8gdGhpcyB3YXRjaGVyXHJcbiAgICBpZiAoIWV2ZW50LnRpbGUuX193YXRjaGVyc19fKSB7XHJcbiAgICAgIGV2ZW50LnRpbGUuX193YXRjaGVyc19fID0gW107XHJcbiAgICB9XHJcbiAgICBldmVudC50aWxlLl9fd2F0Y2hlcnNfXy5wdXNoKHRoaXMuaWQpO1xyXG5cclxuICAgIHRoaXMubG9hZGluZyArPSAxO1xyXG4gICAgdGhpcy5zdGF0dXMgPSBTdWJqZWN0U3RhdHVzLldvcmtpbmc7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhhbmRsZUxvYWRFbmQoZXZlbnQpIHtcclxuICAgIGlmICghZXZlbnQudGlsZS5fX3dhdGNoZXJzX18pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHdhdGNoZXJJbmRleCA9IGV2ZW50LnRpbGUuX193YXRjaGVyc19fLmluZGV4T2YodGhpcy5pZCk7XHJcbiAgICBpZiAod2F0Y2hlckluZGV4IDwgMCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgZXZlbnQudGlsZS5fX3dhdGNoZXJzX18uc3BsaWNlKHdhdGNoZXJJbmRleCwgMSk7XHJcblxyXG4gICAgdGhpcy5sb2FkZWQgKz0gMTtcclxuXHJcbiAgICBjb25zdCBsb2FkaW5nID0gdGhpcy5sb2FkaW5nO1xyXG4gICAgaWYgKHRoaXMubG9hZGVkID49IGxvYWRpbmcpIHtcclxuICAgICAgaWYgKGxvYWRpbmcgPT09IHRoaXMubG9hZGluZykge1xyXG4gICAgICAgIHRoaXMuc3RhdHVzID0gU3ViamVjdFN0YXR1cy5Eb25lO1xyXG4gICAgICAgIHRoaXMubG9hZGVkID0gdGhpcy5sb2FkaW5nID0gMDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=