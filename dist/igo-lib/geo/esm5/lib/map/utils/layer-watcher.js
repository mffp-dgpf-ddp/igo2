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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXItd2F0Y2hlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9tYXAvdXRpbHMvbGF5ZXItd2F0Y2hlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXRELE9BQU8sRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBR3JEO0lBQWtDLHdDQUFPO0lBTXZDO1FBQUEsWUFDRSxpQkFBTyxTQUNSO1FBUE8sWUFBTSxHQUFHLENBQUMsQ0FBQztRQUNYLGFBQU8sR0FBRyxDQUFDLENBQUM7UUFDWixZQUFNLEdBQVksRUFBRSxDQUFDO1FBQ3JCLG1CQUFhLEdBQW1CLEVBQUUsQ0FBQzs7SUFJM0MsQ0FBQzs7OztJQUVELDRCQUFLOzs7SUFBTCxjQUFTLENBQUM7Ozs7SUFFViw4QkFBTzs7O0lBQVA7UUFBQSxpQkFFQztRQURDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTzs7OztRQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsRUFBeEIsQ0FBd0IsR0FBRSxJQUFJLENBQUMsQ0FBQztJQUMvRCxDQUFDOzs7OztJQUVELGlDQUFVOzs7O0lBQVYsVUFBVyxLQUFZO1FBQXZCLGlCQXlCQztRQXhCQyxJQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUssU0FBUyxFQUFFO1lBQy9CLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOztZQUVsQixPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU87YUFDMUIsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7YUFDNUIsU0FBUzs7OztRQUFDLFVBQUEsTUFBTTtZQUNmLElBQUksTUFBTSxLQUFLLGFBQWEsQ0FBQyxPQUFPLEVBQUU7Z0JBQ3BDLEtBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDO2FBQ25CO2lCQUFNLElBQUksTUFBTSxLQUFLLGFBQWEsQ0FBQyxJQUFJLEVBQUU7Z0JBQ3hDLEtBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO2FBQ2xCO1lBRUQsSUFBSSxLQUFJLENBQUMsTUFBTSxJQUFJLEtBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQy9CLEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7Z0JBQy9CLEtBQUksQ0FBQyxNQUFNLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQzthQUNsQztpQkFBTSxJQUFJLEtBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxFQUFFO2dCQUMzQixLQUFJLENBQUMsTUFBTSxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUM7YUFDckM7UUFDSCxDQUFDLEVBQUM7UUFFSixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNuQyxDQUFDOzs7OztJQUVELG1DQUFZOzs7O0lBQVosVUFBYSxLQUFZOztZQUNqQixLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQ3hDLElBQUksS0FBSyxJQUFJLENBQUMsRUFBRTs7Z0JBQ1IsUUFBTSxHQUFHLENBQUMsbUJBQUEsS0FBSyxFQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTTtZQUM1QyxJQUNFLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUNyRTtnQkFDQSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQzthQUNsQjtZQUNELElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDeEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM3QixDQUFDLG1CQUFBLEtBQUssRUFBTyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ2xDO0lBQ0gsQ0FBQztJQUNILG1CQUFDO0FBQUQsQ0FBQyxBQTFERCxDQUFrQyxPQUFPLEdBMER4Qzs7Ozs7OztJQXpEQyw4QkFBbUI7Ozs7O0lBQ25CLCtCQUFvQjs7Ozs7SUFDcEIsOEJBQTZCOzs7OztJQUM3QixxQ0FBMkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyBXYXRjaGVyLCBTdWJqZWN0U3RhdHVzIH0gZnJvbSAnQGlnbzIvdXRpbHMnO1xyXG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4uLy4uL2xheWVyL3NoYXJlZC9sYXllcnMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIExheWVyV2F0Y2hlciBleHRlbmRzIFdhdGNoZXIge1xyXG4gIHByaXZhdGUgbG9hZGVkID0gMDtcclxuICBwcml2YXRlIGxvYWRpbmcgPSAwO1xyXG4gIHByaXZhdGUgbGF5ZXJzOiBMYXllcltdID0gW107XHJcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgfVxyXG5cclxuICB3YXRjaCgpIHt9XHJcblxyXG4gIHVud2F0Y2goKSB7XHJcbiAgICB0aGlzLmxheWVycy5mb3JFYWNoKGxheWVyID0+IHRoaXMudW53YXRjaExheWVyKGxheWVyKSwgdGhpcyk7XHJcbiAgfVxyXG5cclxuICB3YXRjaExheWVyKGxheWVyOiBMYXllcikge1xyXG4gICAgaWYgKGxheWVyLnN0YXR1cyQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5sYXllcnMucHVzaChsYXllcik7XHJcblxyXG4gICAgY29uc3QgbGF5ZXIkJCA9IGxheWVyLnN0YXR1cyRcclxuICAgICAgLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKSlcclxuICAgICAgLnN1YnNjcmliZShzdGF0dXMgPT4ge1xyXG4gICAgICAgIGlmIChzdGF0dXMgPT09IFN1YmplY3RTdGF0dXMuV29ya2luZykge1xyXG4gICAgICAgICAgdGhpcy5sb2FkaW5nICs9IDE7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0dXMgPT09IFN1YmplY3RTdGF0dXMuRG9uZSkge1xyXG4gICAgICAgICAgdGhpcy5sb2FkZWQgKz0gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmxvYWRlZCA+PSB0aGlzLmxvYWRpbmcpIHtcclxuICAgICAgICAgIHRoaXMubG9hZGluZyA9IHRoaXMubG9hZGVkID0gMDtcclxuICAgICAgICAgIHRoaXMuc3RhdHVzID0gU3ViamVjdFN0YXR1cy5Eb25lO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5sb2FkaW5nID4gMCkge1xyXG4gICAgICAgICAgdGhpcy5zdGF0dXMgPSBTdWJqZWN0U3RhdHVzLldvcmtpbmc7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChsYXllciQkKTtcclxuICB9XHJcblxyXG4gIHVud2F0Y2hMYXllcihsYXllcjogTGF5ZXIpIHtcclxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5sYXllcnMuaW5kZXhPZihsYXllcik7XHJcbiAgICBpZiAoaW5kZXggPj0gMCkge1xyXG4gICAgICBjb25zdCBzdGF0dXMgPSAobGF5ZXIgYXMgYW55KS53YXRjaGVyLnN0YXR1cztcclxuICAgICAgaWYgKFxyXG4gICAgICAgIFtTdWJqZWN0U3RhdHVzLldvcmtpbmcsIFN1YmplY3RTdGF0dXMuV2FpdGluZ10uaW5kZXhPZihzdGF0dXMpICE9PSAtMVxyXG4gICAgICApIHtcclxuICAgICAgICB0aGlzLmxvYWRlZCArPSAxO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9uc1tpbmRleF0udW5zdWJzY3JpYmUoKTtcclxuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgIHRoaXMubGF5ZXJzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgIChsYXllciBhcyBhbnkpLndhdGNoZXIudW53YXRjaCgpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=