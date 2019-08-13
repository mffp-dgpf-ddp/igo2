/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { FeatureDataSource } from './feature-datasource';
var WebSocketDataSource = /** @class */ (function (_super) {
    tslib_1.__extends(WebSocketDataSource, _super);
    function WebSocketDataSource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @protected
     * @return {?}
     */
    WebSocketDataSource.prototype.createOlSource = /**
     * @protected
     * @return {?}
     */
    function () {
        this.createWebSocket();
        this.options.format = this.getSourceFormatFromOptions(this.options);
        return _super.prototype.createOlSource.call(this);
    };
    /**
     * @private
     * @return {?}
     */
    WebSocketDataSource.prototype.createWebSocket = /**
     * @private
     * @return {?}
     */
    function () {
        this.ws = new WebSocket(this.options.url);
        this.ws.onmessage = this.onMessage.bind(this);
        if (this.options.onclose) {
            this.ws.onclose = this.onClose.bind(this);
        }
        if (this.options.onerror) {
            this.ws.onerror = this.onError.bind(this);
        }
        if (this.options.onopen) {
            this.ws.onopen = this.onOpen.bind(this);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    WebSocketDataSource.prototype.onMessage = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var featureAdded = this.options.format.readFeature(event.data);
        switch (this.options.onmessage) {
            case 'update':
                // ol don't add if same ID
                /** @type {?} */
                var featureToRemove = this.ol.getFeatureById(featureAdded.getId());
                if (featureToRemove) {
                    this.ol.removeFeature(featureToRemove);
                }
                this.ol.addFeature(featureAdded);
                break;
            case 'delete':
                this.ol.clear(true);
                this.ol.addFeature(featureAdded);
                break;
            case 'add':
            default:
                this.ol.addFeature(featureAdded);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    WebSocketDataSource.prototype.onClose = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // thrown message to user
    };
    /**
     * @param {?} event
     * @return {?}
     */
    WebSocketDataSource.prototype.onError = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // thrown message to user
    };
    /**
     * @param {?} event
     * @return {?}
     */
    WebSocketDataSource.prototype.onOpen = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // thrown message to user ?
    };
    /**
     * @return {?}
     */
    WebSocketDataSource.prototype.onUnwatch = /**
     * @return {?}
     */
    function () {
        this.ws.close();
    };
    return WebSocketDataSource;
}(FeatureDataSource));
export { WebSocketDataSource };
if (false) {
    /** @type {?} */
    WebSocketDataSource.prototype.ws;
    /** @type {?} */
    WebSocketDataSource.prototype.options;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Vic29ja2V0LWRhdGFzb3VyY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvd2Vic29ja2V0LWRhdGFzb3VyY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFTQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUd6RDtJQUF5QywrQ0FBaUI7SUFBMUQ7O0lBZ0VBLENBQUM7Ozs7O0lBNURXLDRDQUFjOzs7O0lBQXhCO1FBQ0UsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDcEUsT0FBTyxpQkFBTSxjQUFjLFdBQUUsQ0FBQztJQUNoQyxDQUFDOzs7OztJQUVPLDZDQUFlOzs7O0lBQXZCO1FBQ0UsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTlDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7WUFDeEIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDM0M7UUFFRCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFO1lBQ3hCLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzNDO1FBRUQsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUN2QixJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN6QztJQUNILENBQUM7Ozs7O0lBRUQsdUNBQVM7Ozs7SUFBVCxVQUFVLEtBQUs7O1lBQ1AsWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1FBRWhFLFFBQVEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUU7WUFDOUIsS0FBSyxRQUFROzs7b0JBRUwsZUFBZSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDcEUsSUFBSSxlQUFlLEVBQUU7b0JBQ25CLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2lCQUN4QztnQkFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDakMsTUFBTTtZQUNSLEtBQUssUUFBUTtnQkFDWCxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDcEIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ2pDLE1BQU07WUFDUixLQUFLLEtBQUssQ0FBQztZQUNYO2dCQUNFLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3BDO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxxQ0FBTzs7OztJQUFQLFVBQVEsS0FBSztRQUNYLHlCQUF5QjtJQUMzQixDQUFDOzs7OztJQUVELHFDQUFPOzs7O0lBQVAsVUFBUSxLQUFLO1FBQ1gseUJBQXlCO0lBQzNCLENBQUM7Ozs7O0lBRUQsb0NBQU07Ozs7SUFBTixVQUFPLEtBQUs7UUFDViwyQkFBMkI7SUFDN0IsQ0FBQzs7OztJQUVNLHVDQUFTOzs7SUFBaEI7UUFDRSxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFDSCwwQkFBQztBQUFELENBQUMsQUFoRUQsQ0FBeUMsaUJBQWlCLEdBZ0V6RDs7OztJQS9EQyxpQ0FBcUI7O0lBQ3JCLHNDQUEyQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBvbFNvdXJjZVZlY3RvciBmcm9tICdvbC9zb3VyY2UvVmVjdG9yJztcclxuaW1wb3J0ICogYXMgb2xmb3JtYXQgZnJvbSAnb2wvZm9ybWF0JztcclxuaW1wb3J0IHsgdW5CeUtleSB9IGZyb20gJ29sL09ic2VydmFibGUnO1xyXG5pbXBvcnQgeyBlYXNlT3V0IH0gZnJvbSAnb2wvZWFzaW5nJztcclxuaW1wb3J0IHsgQ2lyY2xlIGFzIENpcmNsZVN0eWxlLCBGaWxsLCBTdHJva2UsIFN0eWxlIH0gZnJvbSAnb2wvc3R5bGUnO1xyXG5cclxuaW1wb3J0IHsgTWQ1IH0gZnJvbSAndHMtbWQ1JztcclxuXHJcbmltcG9ydCB7IHV1aWQgfSBmcm9tICdAaWdvMi91dGlscyc7XHJcbmltcG9ydCB7IEZlYXR1cmVEYXRhU291cmNlIH0gZnJvbSAnLi9mZWF0dXJlLWRhdGFzb3VyY2UnO1xyXG5pbXBvcnQgeyBXZWJTb2NrZXREYXRhU291cmNlT3B0aW9ucyB9IGZyb20gJy4vd2Vic29ja2V0LWRhdGFzb3VyY2UuaW50ZXJmYWNlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBXZWJTb2NrZXREYXRhU291cmNlIGV4dGVuZHMgRmVhdHVyZURhdGFTb3VyY2Uge1xyXG4gIHB1YmxpYyB3czogV2ViU29ja2V0O1xyXG4gIHB1YmxpYyBvcHRpb25zOiBXZWJTb2NrZXREYXRhU291cmNlT3B0aW9ucztcclxuXHJcbiAgcHJvdGVjdGVkIGNyZWF0ZU9sU291cmNlKCk6IG9sU291cmNlVmVjdG9yIHtcclxuICAgIHRoaXMuY3JlYXRlV2ViU29ja2V0KCk7XHJcbiAgICB0aGlzLm9wdGlvbnMuZm9ybWF0ID0gdGhpcy5nZXRTb3VyY2VGb3JtYXRGcm9tT3B0aW9ucyh0aGlzLm9wdGlvbnMpO1xyXG4gICAgcmV0dXJuIHN1cGVyLmNyZWF0ZU9sU291cmNlKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZVdlYlNvY2tldCgpIHtcclxuICAgIHRoaXMud3MgPSBuZXcgV2ViU29ja2V0KHRoaXMub3B0aW9ucy51cmwpO1xyXG4gICAgdGhpcy53cy5vbm1lc3NhZ2UgPSB0aGlzLm9uTWVzc2FnZS5iaW5kKHRoaXMpO1xyXG5cclxuICAgIGlmICh0aGlzLm9wdGlvbnMub25jbG9zZSkge1xyXG4gICAgICB0aGlzLndzLm9uY2xvc2UgPSB0aGlzLm9uQ2xvc2UuYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5vcHRpb25zLm9uZXJyb3IpIHtcclxuICAgICAgdGhpcy53cy5vbmVycm9yID0gdGhpcy5vbkVycm9yLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5vbm9wZW4pIHtcclxuICAgICAgdGhpcy53cy5vbm9wZW4gPSB0aGlzLm9uT3Blbi5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25NZXNzYWdlKGV2ZW50KSB7XHJcbiAgICBjb25zdCBmZWF0dXJlQWRkZWQgPSB0aGlzLm9wdGlvbnMuZm9ybWF0LnJlYWRGZWF0dXJlKGV2ZW50LmRhdGEpO1xyXG5cclxuICAgIHN3aXRjaCAodGhpcy5vcHRpb25zLm9ubWVzc2FnZSkge1xyXG4gICAgICBjYXNlICd1cGRhdGUnOlxyXG4gICAgICAgIC8vIG9sIGRvbid0IGFkZCBpZiBzYW1lIElEXHJcbiAgICAgICAgY29uc3QgZmVhdHVyZVRvUmVtb3ZlID0gdGhpcy5vbC5nZXRGZWF0dXJlQnlJZChmZWF0dXJlQWRkZWQuZ2V0SWQoKSk7XHJcbiAgICAgICAgaWYgKGZlYXR1cmVUb1JlbW92ZSkge1xyXG4gICAgICAgICAgdGhpcy5vbC5yZW1vdmVGZWF0dXJlKGZlYXR1cmVUb1JlbW92ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMub2wuYWRkRmVhdHVyZShmZWF0dXJlQWRkZWQpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdkZWxldGUnOlxyXG4gICAgICAgIHRoaXMub2wuY2xlYXIodHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5vbC5hZGRGZWF0dXJlKGZlYXR1cmVBZGRlZCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2FkZCc6XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgdGhpcy5vbC5hZGRGZWF0dXJlKGZlYXR1cmVBZGRlZCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbkNsb3NlKGV2ZW50KSB7XHJcbiAgICAvLyB0aHJvd24gbWVzc2FnZSB0byB1c2VyXHJcbiAgfVxyXG5cclxuICBvbkVycm9yKGV2ZW50KSB7XHJcbiAgICAvLyB0aHJvd24gbWVzc2FnZSB0byB1c2VyXHJcbiAgfVxyXG5cclxuICBvbk9wZW4oZXZlbnQpIHtcclxuICAgIC8vIHRocm93biBtZXNzYWdlIHRvIHVzZXIgP1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uVW53YXRjaCgpIHtcclxuICAgIHRoaXMud3MuY2xvc2UoKTtcclxuICB9XHJcbn1cclxuIl19