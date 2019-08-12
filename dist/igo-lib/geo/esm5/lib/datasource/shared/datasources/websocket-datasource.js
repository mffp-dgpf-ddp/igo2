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
    return WebSocketDataSource;
}(FeatureDataSource));
export { WebSocketDataSource };
if (false) {
    /** @type {?} */
    WebSocketDataSource.prototype.ws;
    /** @type {?} */
    WebSocketDataSource.prototype.options;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Vic29ja2V0LWRhdGFzb3VyY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvd2Vic29ja2V0LWRhdGFzb3VyY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFTQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUd6RDtJQUF5QywrQ0FBaUI7SUFBMUQ7O0lBNERBLENBQUM7Ozs7O0lBeERXLDRDQUFjOzs7O0lBQXhCO1FBQ0UsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDcEUsT0FBTyxpQkFBTSxjQUFjLFdBQUUsQ0FBQztJQUNoQyxDQUFDOzs7OztJQUVPLDZDQUFlOzs7O0lBQXZCO1FBQ0UsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTlDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7WUFDeEIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDM0M7UUFFRCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFO1lBQ3hCLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzNDO1FBRUQsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUN2QixJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN6QztJQUNILENBQUM7Ozs7O0lBRUQsdUNBQVM7Ozs7SUFBVCxVQUFVLEtBQUs7O1lBQ1AsWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1FBRWhFLFFBQVEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUU7WUFDOUIsS0FBSyxRQUFROzs7b0JBRUwsZUFBZSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDcEUsSUFBSSxlQUFlLEVBQUU7b0JBQ25CLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2lCQUN4QztnQkFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDakMsTUFBTTtZQUNSLEtBQUssUUFBUTtnQkFDWCxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDcEIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ2pDLE1BQU07WUFDUixLQUFLLEtBQUssQ0FBQztZQUNYO2dCQUNFLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3BDO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxxQ0FBTzs7OztJQUFQLFVBQVEsS0FBSztRQUNYLHlCQUF5QjtJQUMzQixDQUFDOzs7OztJQUVELHFDQUFPOzs7O0lBQVAsVUFBUSxLQUFLO1FBQ1gseUJBQXlCO0lBQzNCLENBQUM7Ozs7O0lBRUQsb0NBQU07Ozs7SUFBTixVQUFPLEtBQUs7UUFDViwyQkFBMkI7SUFDN0IsQ0FBQztJQUNILDBCQUFDO0FBQUQsQ0FBQyxBQTVERCxDQUF5QyxpQkFBaUIsR0E0RHpEOzs7O0lBM0RDLGlDQUFxQjs7SUFDckIsc0NBQTJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG9sU291cmNlVmVjdG9yIGZyb20gJ29sL3NvdXJjZS9WZWN0b3InO1xyXG5pbXBvcnQgKiBhcyBvbGZvcm1hdCBmcm9tICdvbC9mb3JtYXQnO1xyXG5pbXBvcnQgeyB1bkJ5S2V5IH0gZnJvbSAnb2wvT2JzZXJ2YWJsZSc7XHJcbmltcG9ydCB7IGVhc2VPdXQgfSBmcm9tICdvbC9lYXNpbmcnO1xyXG5pbXBvcnQgeyBDaXJjbGUgYXMgQ2lyY2xlU3R5bGUsIEZpbGwsIFN0cm9rZSwgU3R5bGUgfSBmcm9tICdvbC9zdHlsZSc7XHJcblxyXG5pbXBvcnQgeyBNZDUgfSBmcm9tICd0cy1tZDUnO1xyXG5cclxuaW1wb3J0IHsgdXVpZCB9IGZyb20gJ0BpZ28yL3V0aWxzJztcclxuaW1wb3J0IHsgRmVhdHVyZURhdGFTb3VyY2UgfSBmcm9tICcuL2ZlYXR1cmUtZGF0YXNvdXJjZSc7XHJcbmltcG9ydCB7IFdlYlNvY2tldERhdGFTb3VyY2VPcHRpb25zIH0gZnJvbSAnLi93ZWJzb2NrZXQtZGF0YXNvdXJjZS5pbnRlcmZhY2UnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFdlYlNvY2tldERhdGFTb3VyY2UgZXh0ZW5kcyBGZWF0dXJlRGF0YVNvdXJjZSB7XHJcbiAgcHVibGljIHdzOiBXZWJTb2NrZXQ7XHJcbiAgcHVibGljIG9wdGlvbnM6IFdlYlNvY2tldERhdGFTb3VyY2VPcHRpb25zO1xyXG5cclxuICBwcm90ZWN0ZWQgY3JlYXRlT2xTb3VyY2UoKTogb2xTb3VyY2VWZWN0b3Ige1xyXG4gICAgdGhpcy5jcmVhdGVXZWJTb2NrZXQoKTtcclxuICAgIHRoaXMub3B0aW9ucy5mb3JtYXQgPSB0aGlzLmdldFNvdXJjZUZvcm1hdEZyb21PcHRpb25zKHRoaXMub3B0aW9ucyk7XHJcbiAgICByZXR1cm4gc3VwZXIuY3JlYXRlT2xTb3VyY2UoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlV2ViU29ja2V0KCkge1xyXG4gICAgdGhpcy53cyA9IG5ldyBXZWJTb2NrZXQodGhpcy5vcHRpb25zLnVybCk7XHJcbiAgICB0aGlzLndzLm9ubWVzc2FnZSA9IHRoaXMub25NZXNzYWdlLmJpbmQodGhpcyk7XHJcblxyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5vbmNsb3NlKSB7XHJcbiAgICAgIHRoaXMud3Mub25jbG9zZSA9IHRoaXMub25DbG9zZS5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLm9wdGlvbnMub25lcnJvcikge1xyXG4gICAgICB0aGlzLndzLm9uZXJyb3IgPSB0aGlzLm9uRXJyb3IuYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5vcHRpb25zLm9ub3Blbikge1xyXG4gICAgICB0aGlzLndzLm9ub3BlbiA9IHRoaXMub25PcGVuLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbk1lc3NhZ2UoZXZlbnQpIHtcclxuICAgIGNvbnN0IGZlYXR1cmVBZGRlZCA9IHRoaXMub3B0aW9ucy5mb3JtYXQucmVhZEZlYXR1cmUoZXZlbnQuZGF0YSk7XHJcblxyXG4gICAgc3dpdGNoICh0aGlzLm9wdGlvbnMub25tZXNzYWdlKSB7XHJcbiAgICAgIGNhc2UgJ3VwZGF0ZSc6XHJcbiAgICAgICAgLy8gb2wgZG9uJ3QgYWRkIGlmIHNhbWUgSURcclxuICAgICAgICBjb25zdCBmZWF0dXJlVG9SZW1vdmUgPSB0aGlzLm9sLmdldEZlYXR1cmVCeUlkKGZlYXR1cmVBZGRlZC5nZXRJZCgpKTtcclxuICAgICAgICBpZiAoZmVhdHVyZVRvUmVtb3ZlKSB7XHJcbiAgICAgICAgICB0aGlzLm9sLnJlbW92ZUZlYXR1cmUoZmVhdHVyZVRvUmVtb3ZlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5vbC5hZGRGZWF0dXJlKGZlYXR1cmVBZGRlZCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2RlbGV0ZSc6XHJcbiAgICAgICAgdGhpcy5vbC5jbGVhcih0cnVlKTtcclxuICAgICAgICB0aGlzLm9sLmFkZEZlYXR1cmUoZmVhdHVyZUFkZGVkKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnYWRkJzpcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICB0aGlzLm9sLmFkZEZlYXR1cmUoZmVhdHVyZUFkZGVkKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uQ2xvc2UoZXZlbnQpIHtcclxuICAgIC8vIHRocm93biBtZXNzYWdlIHRvIHVzZXJcclxuICB9XHJcblxyXG4gIG9uRXJyb3IoZXZlbnQpIHtcclxuICAgIC8vIHRocm93biBtZXNzYWdlIHRvIHVzZXJcclxuICB9XHJcblxyXG4gIG9uT3BlbihldmVudCkge1xyXG4gICAgLy8gdGhyb3duIG1lc3NhZ2UgdG8gdXNlciA/XHJcbiAgfVxyXG59XHJcbiJdfQ==