/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { uuid, Watcher, SubjectStatus } from '@igo2/utils';
export class ImageWatcher extends Watcher {
    /**
     * @param {?} layer
     */
    constructor(layer) {
        super();
        this.loaded = 0;
        this.loading = 0;
        this.source = layer.options.source.ol;
        this.id = uuid();
    }
    /**
     * @protected
     * @return {?}
     */
    watch() {
        this.source.on(`imageloadstart`, (/**
         * @param {?} e
         * @return {?}
         */
        e => this.handleLoadStart(e)));
        this.source.on(`imageloadend`, (/**
         * @param {?} e
         * @return {?}
         */
        e => this.handleLoadEnd(e)));
        this.source.on(`imageloaderror`, (/**
         * @param {?} e
         * @return {?}
         */
        e => this.handleLoadEnd(e)));
    }
    /**
     * @protected
     * @return {?}
     */
    unwatch() {
        this.source.un(`imageloadstart`, (/**
         * @param {?} e
         * @return {?}
         */
        e => this.handleLoadStart(e)));
        this.source.un(`imageloadend`, (/**
         * @param {?} e
         * @return {?}
         */
        e => this.handleLoadEnd(e)));
        this.source.un(`imageloaderror`, (/**
         * @param {?} e
         * @return {?}
         */
        e => this.handleLoadEnd(e)));
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    handleLoadStart(event) {
        if (!event.image.__watchers__) {
            event.image.__watchers__ = [];
        }
        event.image.__watchers__.push(this.id);
        this.loading += 1;
        this.status = SubjectStatus.Working;
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    handleLoadEnd(event) {
        if (!event.image.__watchers__) {
            return;
        }
        /** @type {?} */
        const watcherIndex = event.image.__watchers__.indexOf(this.id);
        if (watcherIndex < 0) {
            return;
        }
        event.image.__watchers__.splice(watcherIndex, 1);
        this.loaded += 1;
        /** @type {?} */
        const loading = this.loading;
        if (this.loaded >= loading) {
            if (loading === this.loading) {
                this.status = SubjectStatus.Done;
                this.loaded = this.loading = 0;
            }
        }
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2Utd2F0Y2hlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9sYXllci91dGlscy9pbWFnZS13YXRjaGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFJM0QsTUFBTSxPQUFPLFlBQWEsU0FBUSxPQUFPOzs7O0lBT3ZDLFlBQVksS0FBaUI7UUFDM0IsS0FBSyxFQUFFLENBQUM7UUFOQSxXQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsWUFBTyxHQUFHLENBQUMsQ0FBQztRQU1wQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUN0QyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksRUFBRSxDQUFDO0lBQ25CLENBQUM7Ozs7O0lBRVMsS0FBSztRQUNiLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLGdCQUFnQjs7OztRQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLGNBQWM7Ozs7UUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0I7Ozs7UUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQztJQUMvRCxDQUFDOzs7OztJQUVTLE9BQU87UUFDZixJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0I7Ozs7UUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQztRQUMvRCxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxjQUFjOzs7O1FBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsZ0JBQWdCOzs7O1FBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUM7SUFDL0QsQ0FBQzs7Ozs7O0lBRU8sZUFBZSxDQUFDLEtBQVU7UUFDaEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFO1lBQzdCLEtBQUssQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztTQUMvQjtRQUNELEtBQUssQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFdkMsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUM7UUFDbEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxhQUFhLENBQUMsT0FBTyxDQUFDO0lBQ3RDLENBQUM7Ozs7OztJQUVPLGFBQWEsQ0FBQyxLQUFLO1FBQ3pCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRTtZQUM3QixPQUFPO1NBQ1I7O2NBRUssWUFBWSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQzlELElBQUksWUFBWSxHQUFHLENBQUMsRUFBRTtZQUNwQixPQUFPO1NBQ1I7UUFFRCxLQUFLLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRWpELElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDOztjQUVYLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTztRQUM1QixJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksT0FBTyxFQUFFO1lBQzFCLElBQUksT0FBTyxLQUFLLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQzVCLElBQUksQ0FBQyxNQUFNLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQztnQkFDakMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQzthQUNoQztTQUNGO0lBQ0gsQ0FBQztDQUNGOzs7Ozs7SUF4REMsMEJBQXFCOzs7OztJQUNyQiw4QkFBcUI7Ozs7O0lBQ3JCLCtCQUFzQjs7Ozs7SUFFdEIsOEJBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG9sU291cmNlSW1hZ2UgZnJvbSAnb2wvc291cmNlL0ltYWdlJztcclxuaW1wb3J0IHsgdXVpZCwgV2F0Y2hlciwgU3ViamVjdFN0YXR1cyB9IGZyb20gJ0BpZ28yL3V0aWxzJztcclxuXHJcbmltcG9ydCB7IEltYWdlTGF5ZXIgfSBmcm9tICcuLi9zaGFyZWQvbGF5ZXJzL2ltYWdlLWxheWVyJztcclxuXHJcbmV4cG9ydCBjbGFzcyBJbWFnZVdhdGNoZXIgZXh0ZW5kcyBXYXRjaGVyIHtcclxuICBwcm90ZWN0ZWQgaWQ6IHN0cmluZztcclxuICBwcm90ZWN0ZWQgbG9hZGVkID0gMDtcclxuICBwcm90ZWN0ZWQgbG9hZGluZyA9IDA7XHJcblxyXG4gIHByaXZhdGUgc291cmNlOiBvbFNvdXJjZUltYWdlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihsYXllcjogSW1hZ2VMYXllcikge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIHRoaXMuc291cmNlID0gbGF5ZXIub3B0aW9ucy5zb3VyY2Uub2w7XHJcbiAgICB0aGlzLmlkID0gdXVpZCgpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIHdhdGNoKCkge1xyXG4gICAgdGhpcy5zb3VyY2Uub24oYGltYWdlbG9hZHN0YXJ0YCwgZSA9PiB0aGlzLmhhbmRsZUxvYWRTdGFydChlKSk7XHJcbiAgICB0aGlzLnNvdXJjZS5vbihgaW1hZ2Vsb2FkZW5kYCwgZSA9PiB0aGlzLmhhbmRsZUxvYWRFbmQoZSkpO1xyXG4gICAgdGhpcy5zb3VyY2Uub24oYGltYWdlbG9hZGVycm9yYCwgZSA9PiB0aGlzLmhhbmRsZUxvYWRFbmQoZSkpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIHVud2F0Y2goKSB7XHJcbiAgICB0aGlzLnNvdXJjZS51bihgaW1hZ2Vsb2Fkc3RhcnRgLCBlID0+IHRoaXMuaGFuZGxlTG9hZFN0YXJ0KGUpKTtcclxuICAgIHRoaXMuc291cmNlLnVuKGBpbWFnZWxvYWRlbmRgLCBlID0+IHRoaXMuaGFuZGxlTG9hZEVuZChlKSk7XHJcbiAgICB0aGlzLnNvdXJjZS51bihgaW1hZ2Vsb2FkZXJyb3JgLCBlID0+IHRoaXMuaGFuZGxlTG9hZEVuZChlKSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhhbmRsZUxvYWRTdGFydChldmVudDogYW55KSB7XHJcbiAgICBpZiAoIWV2ZW50LmltYWdlLl9fd2F0Y2hlcnNfXykge1xyXG4gICAgICBldmVudC5pbWFnZS5fX3dhdGNoZXJzX18gPSBbXTtcclxuICAgIH1cclxuICAgIGV2ZW50LmltYWdlLl9fd2F0Y2hlcnNfXy5wdXNoKHRoaXMuaWQpO1xyXG5cclxuICAgIHRoaXMubG9hZGluZyArPSAxO1xyXG4gICAgdGhpcy5zdGF0dXMgPSBTdWJqZWN0U3RhdHVzLldvcmtpbmc7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhhbmRsZUxvYWRFbmQoZXZlbnQpIHtcclxuICAgIGlmICghZXZlbnQuaW1hZ2UuX193YXRjaGVyc19fKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB3YXRjaGVySW5kZXggPSBldmVudC5pbWFnZS5fX3dhdGNoZXJzX18uaW5kZXhPZih0aGlzLmlkKTtcclxuICAgIGlmICh3YXRjaGVySW5kZXggPCAwKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBldmVudC5pbWFnZS5fX3dhdGNoZXJzX18uc3BsaWNlKHdhdGNoZXJJbmRleCwgMSk7XHJcblxyXG4gICAgdGhpcy5sb2FkZWQgKz0gMTtcclxuXHJcbiAgICBjb25zdCBsb2FkaW5nID0gdGhpcy5sb2FkaW5nO1xyXG4gICAgaWYgKHRoaXMubG9hZGVkID49IGxvYWRpbmcpIHtcclxuICAgICAgaWYgKGxvYWRpbmcgPT09IHRoaXMubG9hZGluZykge1xyXG4gICAgICAgIHRoaXMuc3RhdHVzID0gU3ViamVjdFN0YXR1cy5Eb25lO1xyXG4gICAgICAgIHRoaXMubG9hZGVkID0gdGhpcy5sb2FkaW5nID0gMDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=