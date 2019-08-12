/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { distinctUntilChanged } from 'rxjs/operators';
import { Watcher, SubjectStatus } from '@igo2/utils';
export class LayerWatcher extends Watcher {
    constructor() {
        super();
        this.loaded = 0;
        this.loading = 0;
        this.layers = [];
        this.subscriptions = [];
    }
    /**
     * @return {?}
     */
    watch() { }
    /**
     * @return {?}
     */
    unwatch() {
        this.layers.forEach((/**
         * @param {?} layer
         * @return {?}
         */
        layer => this.unwatchLayer(layer)), this);
    }
    /**
     * @param {?} layer
     * @return {?}
     */
    watchLayer(layer) {
        if (layer.status$ === undefined) {
            return;
        }
        this.layers.push(layer);
        /** @type {?} */
        const layer$$ = layer.status$
            .pipe(distinctUntilChanged())
            .subscribe((/**
         * @param {?} status
         * @return {?}
         */
        status => {
            if (status === SubjectStatus.Working) {
                this.loading += 1;
            }
            else if (status === SubjectStatus.Done) {
                this.loaded += 1;
            }
            if (this.loaded >= this.loading) {
                this.loading = this.loaded = 0;
                this.status = SubjectStatus.Done;
            }
            else if (this.loading > 0) {
                this.status = SubjectStatus.Working;
            }
        }));
        this.subscriptions.push(layer$$);
    }
    /**
     * @param {?} layer
     * @return {?}
     */
    unwatchLayer(layer) {
        /** @type {?} */
        const index = this.layers.indexOf(layer);
        if (index >= 0) {
            /** @type {?} */
            const status = ((/** @type {?} */ (layer))).watcher.status;
            if ([SubjectStatus.Working, SubjectStatus.Waiting].indexOf(status) !== -1) {
                this.loaded += 1;
            }
            this.subscriptions[index].unsubscribe();
            this.subscriptions.splice(index, 1);
            this.layers.splice(index, 1);
        }
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXItd2F0Y2hlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9tYXAvdXRpbHMvbGF5ZXItd2F0Y2hlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFdEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFHckQsTUFBTSxPQUFPLFlBQWEsU0FBUSxPQUFPO0lBTXZDO1FBQ0UsS0FBSyxFQUFFLENBQUM7UUFORixXQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsWUFBTyxHQUFHLENBQUMsQ0FBQztRQUNaLFdBQU0sR0FBWSxFQUFFLENBQUM7UUFDckIsa0JBQWEsR0FBbUIsRUFBRSxDQUFDO0lBSTNDLENBQUM7Ozs7SUFFRCxLQUFLLEtBQUksQ0FBQzs7OztJQUVWLE9BQU87UUFDTCxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU87Ozs7UUFBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEdBQUUsSUFBSSxDQUFDLENBQUM7SUFDL0QsQ0FBQzs7Ozs7SUFFRCxVQUFVLENBQUMsS0FBWTtRQUNyQixJQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUssU0FBUyxFQUFFO1lBQy9CLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOztjQUVsQixPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU87YUFDMUIsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7YUFDNUIsU0FBUzs7OztRQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ2xCLElBQUksTUFBTSxLQUFLLGFBQWEsQ0FBQyxPQUFPLEVBQUU7Z0JBQ3BDLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDO2FBQ25CO2lCQUFNLElBQUksTUFBTSxLQUFLLGFBQWEsQ0FBQyxJQUFJLEVBQUU7Z0JBQ3hDLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO2FBQ2xCO1lBRUQsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQy9CLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxNQUFNLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQzthQUNsQztpQkFBTSxJQUFJLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxFQUFFO2dCQUMzQixJQUFJLENBQUMsTUFBTSxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUM7YUFDckM7UUFDSCxDQUFDLEVBQUM7UUFFSixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNuQyxDQUFDOzs7OztJQUVELFlBQVksQ0FBQyxLQUFZOztjQUNqQixLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQ3hDLElBQUksS0FBSyxJQUFJLENBQUMsRUFBRTs7a0JBQ1IsTUFBTSxHQUFHLENBQUMsbUJBQUEsS0FBSyxFQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTTtZQUM1QyxJQUNFLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUNyRTtnQkFDQSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQzthQUNsQjtZQUNELElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDeEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztTQUM5QjtJQUNILENBQUM7Q0FDRjs7Ozs7O0lBeERDLDhCQUFtQjs7Ozs7SUFDbkIsK0JBQW9COzs7OztJQUNwQiw4QkFBNkI7Ozs7O0lBQzdCLHFDQUEyQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7IFdhdGNoZXIsIFN1YmplY3RTdGF0dXMgfSBmcm9tICdAaWdvMi91dGlscyc7XHJcbmltcG9ydCB7IExheWVyIH0gZnJvbSAnLi4vLi4vbGF5ZXIvc2hhcmVkL2xheWVycyc7XHJcblxyXG5leHBvcnQgY2xhc3MgTGF5ZXJXYXRjaGVyIGV4dGVuZHMgV2F0Y2hlciB7XHJcbiAgcHJpdmF0ZSBsb2FkZWQgPSAwO1xyXG4gIHByaXZhdGUgbG9hZGluZyA9IDA7XHJcbiAgcHJpdmF0ZSBsYXllcnM6IExheWVyW10gPSBbXTtcclxuICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoKTtcclxuICB9XHJcblxyXG4gIHdhdGNoKCkge31cclxuXHJcbiAgdW53YXRjaCgpIHtcclxuICAgIHRoaXMubGF5ZXJzLmZvckVhY2gobGF5ZXIgPT4gdGhpcy51bndhdGNoTGF5ZXIobGF5ZXIpLCB0aGlzKTtcclxuICB9XHJcblxyXG4gIHdhdGNoTGF5ZXIobGF5ZXI6IExheWVyKSB7XHJcbiAgICBpZiAobGF5ZXIuc3RhdHVzJCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmxheWVycy5wdXNoKGxheWVyKTtcclxuXHJcbiAgICBjb25zdCBsYXllciQkID0gbGF5ZXIuc3RhdHVzJFxyXG4gICAgICAucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKVxyXG4gICAgICAuc3Vic2NyaWJlKHN0YXR1cyA9PiB7XHJcbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gU3ViamVjdFN0YXR1cy5Xb3JraW5nKSB7XHJcbiAgICAgICAgICB0aGlzLmxvYWRpbmcgKz0gMTtcclxuICAgICAgICB9IGVsc2UgaWYgKHN0YXR1cyA9PT0gU3ViamVjdFN0YXR1cy5Eb25lKSB7XHJcbiAgICAgICAgICB0aGlzLmxvYWRlZCArPSAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMubG9hZGVkID49IHRoaXMubG9hZGluZykge1xyXG4gICAgICAgICAgdGhpcy5sb2FkaW5nID0gdGhpcy5sb2FkZWQgPSAwO1xyXG4gICAgICAgICAgdGhpcy5zdGF0dXMgPSBTdWJqZWN0U3RhdHVzLkRvbmU7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmxvYWRpbmcgPiAwKSB7XHJcbiAgICAgICAgICB0aGlzLnN0YXR1cyA9IFN1YmplY3RTdGF0dXMuV29ya2luZztcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKGxheWVyJCQpO1xyXG4gIH1cclxuXHJcbiAgdW53YXRjaExheWVyKGxheWVyOiBMYXllcikge1xyXG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmxheWVycy5pbmRleE9mKGxheWVyKTtcclxuICAgIGlmIChpbmRleCA+PSAwKSB7XHJcbiAgICAgIGNvbnN0IHN0YXR1cyA9IChsYXllciBhcyBhbnkpLndhdGNoZXIuc3RhdHVzO1xyXG4gICAgICBpZiAoXHJcbiAgICAgICAgW1N1YmplY3RTdGF0dXMuV29ya2luZywgU3ViamVjdFN0YXR1cy5XYWl0aW5nXS5pbmRleE9mKHN0YXR1cykgIT09IC0xXHJcbiAgICAgICkge1xyXG4gICAgICAgIHRoaXMubG9hZGVkICs9IDE7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zW2luZGV4XS51bnN1YnNjcmliZSgpO1xyXG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgdGhpcy5sYXllcnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19