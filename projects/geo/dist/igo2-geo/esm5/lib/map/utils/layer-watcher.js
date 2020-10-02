/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { distinctUntilChanged } from 'rxjs/operators';
import { Watcher, SubjectStatus } from '@igo2/utils';
var LayerWatcher = /** @class */ (function (_super) {
    tslib_1.__extends(LayerWatcher, _super);
    function LayerWatcher() {
        var _this = _super.call(this) || this;
        _this.loaded = 0;
        _this.loading = 0;
        _this.layers = [];
        _this.subscriptions = [];
        return _this;
    }
    /**
     * @return {?}
     */
    LayerWatcher.prototype.watch = /**
     * @return {?}
     */
    function () { };
    /**
     * @return {?}
     */
    LayerWatcher.prototype.unwatch = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.layers.forEach((/**
         * @param {?} layer
         * @return {?}
         */
        function (layer) { return _this.unwatchLayer(layer); }), this);
    };
    /**
     * @param {?} layer
     * @return {?}
     */
    LayerWatcher.prototype.watchLayer = /**
     * @param {?} layer
     * @return {?}
     */
    function (layer) {
        var _this = this;
        if (layer.status$ === undefined) {
            return;
        }
        this.layers.push(layer);
        /** @type {?} */
        var layer$$ = layer.status$
            .pipe(distinctUntilChanged())
            .subscribe((/**
         * @param {?} status
         * @return {?}
         */
        function (status) {
            if (status === SubjectStatus.Working) {
                _this.loading += 1;
            }
            else if (status === SubjectStatus.Done) {
                _this.loaded += 1;
            }
            if (_this.loaded >= _this.loading) {
                _this.loading = _this.loaded = 0;
                _this.status = SubjectStatus.Done;
            }
            else if (_this.loading > 0) {
                _this.status = SubjectStatus.Working;
            }
        }));
        this.subscriptions.push(layer$$);
    };
    /**
     * @param {?} layer
     * @return {?}
     */
    LayerWatcher.prototype.unwatchLayer = /**
     * @param {?} layer
     * @return {?}
     */
    function (layer) {
        layer.status$.next(SubjectStatus.Done);
        /** @type {?} */
        var index = this.layers.indexOf(layer);
        if (index >= 0) {
            /** @type {?} */
            var status_1 = ((/** @type {?} */ (layer))).watcher.status;
            if ([SubjectStatus.Working, SubjectStatus.Waiting].indexOf(status_1) !== -1) {
                this.loaded += 1;
            }
            this.subscriptions[index].unsubscribe();
            this.subscriptions.splice(index, 1);
            this.layers.splice(index, 1);
            ((/** @type {?} */ (layer))).watcher.unwatch();
        }
    };
    return LayerWatcher;
}(Watcher));
export { LayerWatcher };
if (false) {
    /**
     * @type {?}
     * @private
     */
    LayerWatcher.prototype.loaded;
    /**
     * @type {?}
     * @private
     */
    LayerWatcher.prototype.loading;
    /**
     * @type {?}
     * @private
     */
    LayerWatcher.prototype.layers;
    /**
     * @type {?}
     * @private
     */
    LayerWatcher.prototype.subscriptions;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXItd2F0Y2hlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9tYXAvdXRpbHMvbGF5ZXItd2F0Y2hlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXRELE9BQU8sRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBR3JEO0lBQWtDLHdDQUFPO0lBTXZDO1FBQUEsWUFDRSxpQkFBTyxTQUNSO1FBUE8sWUFBTSxHQUFHLENBQUMsQ0FBQztRQUNYLGFBQU8sR0FBRyxDQUFDLENBQUM7UUFDWixZQUFNLEdBQVksRUFBRSxDQUFDO1FBQ3JCLG1CQUFhLEdBQW1CLEVBQUUsQ0FBQzs7SUFJM0MsQ0FBQzs7OztJQUVELDRCQUFLOzs7SUFBTCxjQUFTLENBQUM7Ozs7SUFFViw4QkFBTzs7O0lBQVA7UUFBQSxpQkFFQztRQURDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTzs7OztRQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsRUFBeEIsQ0FBd0IsR0FBRSxJQUFJLENBQUMsQ0FBQztJQUMvRCxDQUFDOzs7OztJQUVELGlDQUFVOzs7O0lBQVYsVUFBVyxLQUFZO1FBQXZCLGlCQXlCQztRQXhCQyxJQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUssU0FBUyxFQUFFO1lBQy9CLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOztZQUVsQixPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU87YUFDMUIsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7YUFDNUIsU0FBUzs7OztRQUFDLFVBQUEsTUFBTTtZQUNmLElBQUksTUFBTSxLQUFLLGFBQWEsQ0FBQyxPQUFPLEVBQUU7Z0JBQ3BDLEtBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDO2FBQ25CO2lCQUFNLElBQUksTUFBTSxLQUFLLGFBQWEsQ0FBQyxJQUFJLEVBQUU7Z0JBQ3hDLEtBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO2FBQ2xCO1lBRUQsSUFBSSxLQUFJLENBQUMsTUFBTSxJQUFJLEtBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQy9CLEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7Z0JBQy9CLEtBQUksQ0FBQyxNQUFNLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQzthQUNsQztpQkFBTSxJQUFJLEtBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxFQUFFO2dCQUMzQixLQUFJLENBQUMsTUFBTSxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUM7YUFDckM7UUFDSCxDQUFDLEVBQUM7UUFFSixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNuQyxDQUFDOzs7OztJQUVELG1DQUFZOzs7O0lBQVosVUFBYSxLQUFZO1FBQ3ZCLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7WUFDakMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUN4QyxJQUFJLEtBQUssSUFBSSxDQUFDLEVBQUU7O2dCQUNSLFFBQU0sR0FBRyxDQUFDLG1CQUFBLEtBQUssRUFBTyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU07WUFDNUMsSUFDRSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFDckU7Z0JBQ0EsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUM7YUFDbEI7WUFDRCxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3hDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDN0IsQ0FBQyxtQkFBQSxLQUFLLEVBQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUNsQztJQUNILENBQUM7SUFDSCxtQkFBQztBQUFELENBQUMsQUEzREQsQ0FBa0MsT0FBTyxHQTJEeEM7Ozs7Ozs7SUExREMsOEJBQW1COzs7OztJQUNuQiwrQkFBb0I7Ozs7O0lBQ3BCLDhCQUE2Qjs7Ozs7SUFDN0IscUNBQTJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHsgV2F0Y2hlciwgU3ViamVjdFN0YXR1cyB9IGZyb20gJ0BpZ28yL3V0aWxzJztcclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuLi8uLi9sYXllci9zaGFyZWQvbGF5ZXJzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBMYXllcldhdGNoZXIgZXh0ZW5kcyBXYXRjaGVyIHtcclxuICBwcml2YXRlIGxvYWRlZCA9IDA7XHJcbiAgcHJpdmF0ZSBsb2FkaW5nID0gMDtcclxuICBwcml2YXRlIGxheWVyczogTGF5ZXJbXSA9IFtdO1xyXG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gIH1cclxuXHJcbiAgd2F0Y2goKSB7fVxyXG5cclxuICB1bndhdGNoKCkge1xyXG4gICAgdGhpcy5sYXllcnMuZm9yRWFjaChsYXllciA9PiB0aGlzLnVud2F0Y2hMYXllcihsYXllciksIHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgd2F0Y2hMYXllcihsYXllcjogTGF5ZXIpIHtcclxuICAgIGlmIChsYXllci5zdGF0dXMkID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubGF5ZXJzLnB1c2gobGF5ZXIpO1xyXG5cclxuICAgIGNvbnN0IGxheWVyJCQgPSBsYXllci5zdGF0dXMkXHJcbiAgICAgIC5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpXHJcbiAgICAgIC5zdWJzY3JpYmUoc3RhdHVzID0+IHtcclxuICAgICAgICBpZiAoc3RhdHVzID09PSBTdWJqZWN0U3RhdHVzLldvcmtpbmcpIHtcclxuICAgICAgICAgIHRoaXMubG9hZGluZyArPSAxO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzID09PSBTdWJqZWN0U3RhdHVzLkRvbmUpIHtcclxuICAgICAgICAgIHRoaXMubG9hZGVkICs9IDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5sb2FkZWQgPj0gdGhpcy5sb2FkaW5nKSB7XHJcbiAgICAgICAgICB0aGlzLmxvYWRpbmcgPSB0aGlzLmxvYWRlZCA9IDA7XHJcbiAgICAgICAgICB0aGlzLnN0YXR1cyA9IFN1YmplY3RTdGF0dXMuRG9uZTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMubG9hZGluZyA+IDApIHtcclxuICAgICAgICAgIHRoaXMuc3RhdHVzID0gU3ViamVjdFN0YXR1cy5Xb3JraW5nO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2gobGF5ZXIkJCk7XHJcbiAgfVxyXG5cclxuICB1bndhdGNoTGF5ZXIobGF5ZXI6IExheWVyKSB7XHJcbiAgICBsYXllci5zdGF0dXMkLm5leHQoU3ViamVjdFN0YXR1cy5Eb25lKTtcclxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5sYXllcnMuaW5kZXhPZihsYXllcik7XHJcbiAgICBpZiAoaW5kZXggPj0gMCkge1xyXG4gICAgICBjb25zdCBzdGF0dXMgPSAobGF5ZXIgYXMgYW55KS53YXRjaGVyLnN0YXR1cztcclxuICAgICAgaWYgKFxyXG4gICAgICAgIFtTdWJqZWN0U3RhdHVzLldvcmtpbmcsIFN1YmplY3RTdGF0dXMuV2FpdGluZ10uaW5kZXhPZihzdGF0dXMpICE9PSAtMVxyXG4gICAgICApIHtcclxuICAgICAgICB0aGlzLmxvYWRlZCArPSAxO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9uc1tpbmRleF0udW5zdWJzY3JpYmUoKTtcclxuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgIHRoaXMubGF5ZXJzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgIChsYXllciBhcyBhbnkpLndhdGNoZXIudW53YXRjaCgpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=