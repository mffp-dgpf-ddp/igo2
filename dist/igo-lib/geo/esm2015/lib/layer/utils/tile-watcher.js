/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { uuid, Watcher, SubjectStatus } from '@igo2/utils';
export class TileWatcher extends Watcher {
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
        this.source.on(`tileloadstart`, (/**
         * @param {?} e
         * @return {?}
         */
        e => this.handleLoadStart(e)));
        this.source.on(`tileloadend`, (/**
         * @param {?} e
         * @return {?}
         */
        e => this.handleLoadEnd(e)));
        this.source.on(`tileloaderror`, (/**
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
        this.source.un(`tileloadstart`, (/**
         * @param {?} e
         * @return {?}
         */
        e => this.handleLoadStart(e)));
        this.source.un(`tileloadend`, (/**
         * @param {?} e
         * @return {?}
         */
        e => this.handleLoadEnd(e)));
        this.source.un(`tileloaderror`, (/**
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
        // This is to avoid increasing
        // the number of loaded tiles if a tile was loading
        // before subscribing to this watcher
        if (!event.tile.__watchers__) {
            event.tile.__watchers__ = [];
        }
        event.tile.__watchers__.push(this.id);
        this.loading += 1;
        this.status = SubjectStatus.Working;
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    handleLoadEnd(event) {
        if (!event.tile.__watchers__) {
            return;
        }
        /** @type {?} */
        const watcherIndex = event.tile.__watchers__.indexOf(this.id);
        if (watcherIndex < 0) {
            return;
        }
        event.tile.__watchers__.splice(watcherIndex, 1);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGlsZS13YXRjaGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2xheWVyL3V0aWxzL3RpbGUtd2F0Y2hlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBSTNELE1BQU0sT0FBTyxXQUFZLFNBQVEsT0FBTzs7OztJQU90QyxZQUFZLEtBQWdCO1FBQzFCLEtBQUssRUFBRSxDQUFDO1FBTkYsV0FBTSxHQUFHLENBQUMsQ0FBQztRQUNYLFlBQU8sR0FBRyxDQUFDLENBQUM7UUFNbEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLEVBQUUsQ0FBQztJQUNuQixDQUFDOzs7OztJQUVTLEtBQUs7UUFDYixJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxlQUFlOzs7O1FBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsYUFBYTs7OztRQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLGVBQWU7Ozs7UUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQztJQUM5RCxDQUFDOzs7OztJQUVTLE9BQU87UUFDZixJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxlQUFlOzs7O1FBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsYUFBYTs7OztRQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLGVBQWU7Ozs7UUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQztJQUM5RCxDQUFDOzs7Ozs7SUFFTyxlQUFlLENBQUMsS0FBVTtRQUNoQyw4QkFBOEI7UUFDOUIsbURBQW1EO1FBQ25ELHFDQUFxQztRQUNyQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDNUIsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1NBQzlCO1FBQ0QsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUV0QyxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQztRQUNsQixJQUFJLENBQUMsTUFBTSxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUM7SUFDdEMsQ0FBQzs7Ozs7O0lBRU8sYUFBYSxDQUFDLEtBQUs7UUFDekIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQzVCLE9BQU87U0FDUjs7Y0FFSyxZQUFZLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDN0QsSUFBSSxZQUFZLEdBQUcsQ0FBQyxFQUFFO1lBQ3BCLE9BQU87U0FDUjtRQUVELEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFaEQsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUM7O2NBRVgsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPO1FBQzVCLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxPQUFPLEVBQUU7WUFDMUIsSUFBSSxPQUFPLEtBQUssSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDNUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDO2dCQUNqQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO2FBQ2hDO1NBQ0Y7SUFDSCxDQUFDO0NBQ0Y7Ozs7OztJQTNEQyx5QkFBbUI7Ozs7O0lBQ25CLDZCQUFtQjs7Ozs7SUFDbkIsOEJBQW9COzs7OztJQUVwQiw2QkFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgb2xTb3VyY2VUaWxlIGZyb20gJ29sL3NvdXJjZS9UaWxlJztcclxuaW1wb3J0IHsgdXVpZCwgV2F0Y2hlciwgU3ViamVjdFN0YXR1cyB9IGZyb20gJ0BpZ28yL3V0aWxzJztcclxuXHJcbmltcG9ydCB7IFRpbGVMYXllciB9IGZyb20gJy4uL3NoYXJlZC9sYXllcnMvdGlsZS1sYXllcic7XHJcblxyXG5leHBvcnQgY2xhc3MgVGlsZVdhdGNoZXIgZXh0ZW5kcyBXYXRjaGVyIHtcclxuICBwcml2YXRlIGlkOiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBsb2FkZWQgPSAwO1xyXG4gIHByaXZhdGUgbG9hZGluZyA9IDA7XHJcblxyXG4gIHByaXZhdGUgc291cmNlOiBvbFNvdXJjZVRpbGU7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGxheWVyOiBUaWxlTGF5ZXIpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLnNvdXJjZSA9IGxheWVyLm9wdGlvbnMuc291cmNlLm9sO1xyXG4gICAgdGhpcy5pZCA9IHV1aWQoKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCB3YXRjaCgpIHtcclxuICAgIHRoaXMuc291cmNlLm9uKGB0aWxlbG9hZHN0YXJ0YCwgZSA9PiB0aGlzLmhhbmRsZUxvYWRTdGFydChlKSk7XHJcbiAgICB0aGlzLnNvdXJjZS5vbihgdGlsZWxvYWRlbmRgLCBlID0+IHRoaXMuaGFuZGxlTG9hZEVuZChlKSk7XHJcbiAgICB0aGlzLnNvdXJjZS5vbihgdGlsZWxvYWRlcnJvcmAsIGUgPT4gdGhpcy5oYW5kbGVMb2FkRW5kKGUpKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCB1bndhdGNoKCkge1xyXG4gICAgdGhpcy5zb3VyY2UudW4oYHRpbGVsb2Fkc3RhcnRgLCBlID0+IHRoaXMuaGFuZGxlTG9hZFN0YXJ0KGUpKTtcclxuICAgIHRoaXMuc291cmNlLnVuKGB0aWxlbG9hZGVuZGAsIGUgPT4gdGhpcy5oYW5kbGVMb2FkRW5kKGUpKTtcclxuICAgIHRoaXMuc291cmNlLnVuKGB0aWxlbG9hZGVycm9yYCwgZSA9PiB0aGlzLmhhbmRsZUxvYWRFbmQoZSkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBoYW5kbGVMb2FkU3RhcnQoZXZlbnQ6IGFueSkge1xyXG4gICAgLy8gVGhpcyBpcyB0byBhdm9pZCBpbmNyZWFzaW5nXHJcbiAgICAvLyB0aGUgbnVtYmVyIG9mIGxvYWRlZCB0aWxlcyBpZiBhIHRpbGUgd2FzIGxvYWRpbmdcclxuICAgIC8vIGJlZm9yZSBzdWJzY3JpYmluZyB0byB0aGlzIHdhdGNoZXJcclxuICAgIGlmICghZXZlbnQudGlsZS5fX3dhdGNoZXJzX18pIHtcclxuICAgICAgZXZlbnQudGlsZS5fX3dhdGNoZXJzX18gPSBbXTtcclxuICAgIH1cclxuICAgIGV2ZW50LnRpbGUuX193YXRjaGVyc19fLnB1c2godGhpcy5pZCk7XHJcblxyXG4gICAgdGhpcy5sb2FkaW5nICs9IDE7XHJcbiAgICB0aGlzLnN0YXR1cyA9IFN1YmplY3RTdGF0dXMuV29ya2luZztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGFuZGxlTG9hZEVuZChldmVudCkge1xyXG4gICAgaWYgKCFldmVudC50aWxlLl9fd2F0Y2hlcnNfXykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgd2F0Y2hlckluZGV4ID0gZXZlbnQudGlsZS5fX3dhdGNoZXJzX18uaW5kZXhPZih0aGlzLmlkKTtcclxuICAgIGlmICh3YXRjaGVySW5kZXggPCAwKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBldmVudC50aWxlLl9fd2F0Y2hlcnNfXy5zcGxpY2Uod2F0Y2hlckluZGV4LCAxKTtcclxuXHJcbiAgICB0aGlzLmxvYWRlZCArPSAxO1xyXG5cclxuICAgIGNvbnN0IGxvYWRpbmcgPSB0aGlzLmxvYWRpbmc7XHJcbiAgICBpZiAodGhpcy5sb2FkZWQgPj0gbG9hZGluZykge1xyXG4gICAgICBpZiAobG9hZGluZyA9PT0gdGhpcy5sb2FkaW5nKSB7XHJcbiAgICAgICAgdGhpcy5zdGF0dXMgPSBTdWJqZWN0U3RhdHVzLkRvbmU7XHJcbiAgICAgICAgdGhpcy5sb2FkZWQgPSB0aGlzLmxvYWRpbmcgPSAwO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==