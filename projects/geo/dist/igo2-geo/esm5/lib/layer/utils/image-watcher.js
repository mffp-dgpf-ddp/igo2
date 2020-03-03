/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { uuid, Watcher, SubjectStatus } from '@igo2/utils';
var ImageWatcher = /** @class */ (function (_super) {
    tslib_1.__extends(ImageWatcher, _super);
    function ImageWatcher(layer) {
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
    ImageWatcher.prototype.watch = /**
     * @protected
     * @return {?}
     */
    function () {
        var _this = this;
        this.source.on("imageloadstart", (/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return _this.handleLoadStart(e); }));
        this.source.on("imageloadend", (/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return _this.handleLoadEnd(e); }));
        this.source.on("imageloaderror", (/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return _this.handleLoadEnd(e); }));
    };
    /**
     * @protected
     * @return {?}
     */
    ImageWatcher.prototype.unwatch = /**
     * @protected
     * @return {?}
     */
    function () {
        var _this = this;
        this.source.un("imageloadstart", (/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return _this.handleLoadStart(e); }));
        this.source.un("imageloadend", (/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return _this.handleLoadEnd(e); }));
        this.source.un("imageloaderror", (/**
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
    ImageWatcher.prototype.handleLoadStart = /**
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!event.image.__watchers__) {
            event.image.__watchers__ = [];
        }
        event.image.__watchers__.push(this.id);
        this.loading += 1;
        this.status = SubjectStatus.Working;
    };
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    ImageWatcher.prototype.handleLoadEnd = /**
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!event.image.__watchers__) {
            return;
        }
        /** @type {?} */
        var watcherIndex = event.image.__watchers__.indexOf(this.id);
        if (watcherIndex < 0) {
            return;
        }
        event.image.__watchers__.splice(watcherIndex, 1);
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
    return ImageWatcher;
}(Watcher));
export { ImageWatcher };
if (false) {
    /**
     * @type {?}
     * @protected
     */
    ImageWatcher.prototype.id;
    /**
     * @type {?}
     * @protected
     */
    ImageWatcher.prototype.loaded;
    /**
     * @type {?}
     * @protected
     */
    ImageWatcher.prototype.loading;
    /**
     * @type {?}
     * @private
     */
    ImageWatcher.prototype.source;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2Utd2F0Y2hlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9sYXllci91dGlscy9pbWFnZS13YXRjaGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBSTNEO0lBQWtDLHdDQUFPO0lBT3ZDLHNCQUFZLEtBQWlCO1FBQTdCLFlBQ0UsaUJBQU8sU0FHUjtRQVRTLFlBQU0sR0FBRyxDQUFDLENBQUM7UUFDWCxhQUFPLEdBQUcsQ0FBQyxDQUFDO1FBTXBCLEtBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ3RDLEtBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxFQUFFLENBQUM7O0lBQ25CLENBQUM7Ozs7O0lBRVMsNEJBQUs7Ozs7SUFBZjtRQUFBLGlCQUlDO1FBSEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsZ0JBQWdCOzs7O1FBQUUsVUFBQSxDQUFDLElBQUksT0FBQSxLQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxFQUF2QixDQUF1QixFQUFDLENBQUM7UUFDL0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsY0FBYzs7OztRQUFFLFVBQUEsQ0FBQyxJQUFJLE9BQUEsS0FBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBckIsQ0FBcUIsRUFBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLGdCQUFnQjs7OztRQUFFLFVBQUEsQ0FBQyxJQUFJLE9BQUEsS0FBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBckIsQ0FBcUIsRUFBQyxDQUFDO0lBQy9ELENBQUM7Ozs7O0lBRVMsOEJBQU87Ozs7SUFBakI7UUFBQSxpQkFJQztRQUhDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLGdCQUFnQjs7OztRQUFFLFVBQUEsQ0FBQyxJQUFJLE9BQUEsS0FBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsRUFBdkIsQ0FBdUIsRUFBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLGNBQWM7Ozs7UUFBRSxVQUFBLENBQUMsSUFBSSxPQUFBLEtBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQXJCLENBQXFCLEVBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0I7Ozs7UUFBRSxVQUFBLENBQUMsSUFBSSxPQUFBLEtBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQXJCLENBQXFCLEVBQUMsQ0FBQztJQUMvRCxDQUFDOzs7Ozs7SUFFTyxzQ0FBZTs7Ozs7SUFBdkIsVUFBd0IsS0FBVTtRQUNoQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUU7WUFDN0IsS0FBSyxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1NBQy9CO1FBQ0QsS0FBSyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUV2QyxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQztRQUNsQixJQUFJLENBQUMsTUFBTSxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUM7SUFDdEMsQ0FBQzs7Ozs7O0lBRU8sb0NBQWE7Ozs7O0lBQXJCLFVBQXNCLEtBQUs7UUFDekIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFO1lBQzdCLE9BQU87U0FDUjs7WUFFSyxZQUFZLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDOUQsSUFBSSxZQUFZLEdBQUcsQ0FBQyxFQUFFO1lBQ3BCLE9BQU87U0FDUjtRQUVELEtBQUssQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFakQsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUM7O1lBRVgsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPO1FBQzVCLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxPQUFPLEVBQUU7WUFDMUIsSUFBSSxPQUFPLEtBQUssSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDNUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDO2dCQUNqQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO2FBQ2hDO1NBQ0Y7SUFDSCxDQUFDO0lBQ0gsbUJBQUM7QUFBRCxDQUFDLEFBekRELENBQWtDLE9BQU8sR0F5RHhDOzs7Ozs7O0lBeERDLDBCQUFxQjs7Ozs7SUFDckIsOEJBQXFCOzs7OztJQUNyQiwrQkFBc0I7Ozs7O0lBRXRCLDhCQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBvbFNvdXJjZUltYWdlIGZyb20gJ29sL3NvdXJjZS9JbWFnZSc7XHJcbmltcG9ydCB7IHV1aWQsIFdhdGNoZXIsIFN1YmplY3RTdGF0dXMgfSBmcm9tICdAaWdvMi91dGlscyc7XHJcblxyXG5pbXBvcnQgeyBJbWFnZUxheWVyIH0gZnJvbSAnLi4vc2hhcmVkL2xheWVycy9pbWFnZS1sYXllcic7XHJcblxyXG5leHBvcnQgY2xhc3MgSW1hZ2VXYXRjaGVyIGV4dGVuZHMgV2F0Y2hlciB7XHJcbiAgcHJvdGVjdGVkIGlkOiBzdHJpbmc7XHJcbiAgcHJvdGVjdGVkIGxvYWRlZCA9IDA7XHJcbiAgcHJvdGVjdGVkIGxvYWRpbmcgPSAwO1xyXG5cclxuICBwcml2YXRlIHNvdXJjZTogb2xTb3VyY2VJbWFnZTtcclxuXHJcbiAgY29uc3RydWN0b3IobGF5ZXI6IEltYWdlTGF5ZXIpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLnNvdXJjZSA9IGxheWVyLm9wdGlvbnMuc291cmNlLm9sO1xyXG4gICAgdGhpcy5pZCA9IHV1aWQoKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCB3YXRjaCgpIHtcclxuICAgIHRoaXMuc291cmNlLm9uKGBpbWFnZWxvYWRzdGFydGAsIGUgPT4gdGhpcy5oYW5kbGVMb2FkU3RhcnQoZSkpO1xyXG4gICAgdGhpcy5zb3VyY2Uub24oYGltYWdlbG9hZGVuZGAsIGUgPT4gdGhpcy5oYW5kbGVMb2FkRW5kKGUpKTtcclxuICAgIHRoaXMuc291cmNlLm9uKGBpbWFnZWxvYWRlcnJvcmAsIGUgPT4gdGhpcy5oYW5kbGVMb2FkRW5kKGUpKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCB1bndhdGNoKCkge1xyXG4gICAgdGhpcy5zb3VyY2UudW4oYGltYWdlbG9hZHN0YXJ0YCwgZSA9PiB0aGlzLmhhbmRsZUxvYWRTdGFydChlKSk7XHJcbiAgICB0aGlzLnNvdXJjZS51bihgaW1hZ2Vsb2FkZW5kYCwgZSA9PiB0aGlzLmhhbmRsZUxvYWRFbmQoZSkpO1xyXG4gICAgdGhpcy5zb3VyY2UudW4oYGltYWdlbG9hZGVycm9yYCwgZSA9PiB0aGlzLmhhbmRsZUxvYWRFbmQoZSkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBoYW5kbGVMb2FkU3RhcnQoZXZlbnQ6IGFueSkge1xyXG4gICAgaWYgKCFldmVudC5pbWFnZS5fX3dhdGNoZXJzX18pIHtcclxuICAgICAgZXZlbnQuaW1hZ2UuX193YXRjaGVyc19fID0gW107XHJcbiAgICB9XHJcbiAgICBldmVudC5pbWFnZS5fX3dhdGNoZXJzX18ucHVzaCh0aGlzLmlkKTtcclxuXHJcbiAgICB0aGlzLmxvYWRpbmcgKz0gMTtcclxuICAgIHRoaXMuc3RhdHVzID0gU3ViamVjdFN0YXR1cy5Xb3JraW5nO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBoYW5kbGVMb2FkRW5kKGV2ZW50KSB7XHJcbiAgICBpZiAoIWV2ZW50LmltYWdlLl9fd2F0Y2hlcnNfXykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgd2F0Y2hlckluZGV4ID0gZXZlbnQuaW1hZ2UuX193YXRjaGVyc19fLmluZGV4T2YodGhpcy5pZCk7XHJcbiAgICBpZiAod2F0Y2hlckluZGV4IDwgMCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgZXZlbnQuaW1hZ2UuX193YXRjaGVyc19fLnNwbGljZSh3YXRjaGVySW5kZXgsIDEpO1xyXG5cclxuICAgIHRoaXMubG9hZGVkICs9IDE7XHJcblxyXG4gICAgY29uc3QgbG9hZGluZyA9IHRoaXMubG9hZGluZztcclxuICAgIGlmICh0aGlzLmxvYWRlZCA+PSBsb2FkaW5nKSB7XHJcbiAgICAgIGlmIChsb2FkaW5nID09PSB0aGlzLmxvYWRpbmcpIHtcclxuICAgICAgICB0aGlzLnN0YXR1cyA9IFN1YmplY3RTdGF0dXMuRG9uZTtcclxuICAgICAgICB0aGlzLmxvYWRlZCA9IHRoaXMubG9hZGluZyA9IDA7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19