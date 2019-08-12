/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { FeatureDataSource } from './feature-datasource';
export class WebSocketDataSource extends FeatureDataSource {
    /**
     * @protected
     * @return {?}
     */
    createOlSource() {
        this.createWebSocket();
        this.options.format = this.getSourceFormatFromOptions(this.options);
        return super.createOlSource();
    }
    /**
     * @private
     * @return {?}
     */
    createWebSocket() {
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
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onMessage(event) {
        /** @type {?} */
        const featureAdded = this.options.format.readFeature(event.data);
        switch (this.options.onmessage) {
            case 'update':
                // ol don't add if same ID
                /** @type {?} */
                const featureToRemove = this.ol.getFeatureById(featureAdded.getId());
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
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onClose(event) {
        // thrown message to user
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onError(event) {
        // thrown message to user
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onOpen(event) {
        // thrown message to user ?
    }
}
if (false) {
    /** @type {?} */
    WebSocketDataSource.prototype.ws;
    /** @type {?} */
    WebSocketDataSource.prototype.options;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Vic29ja2V0LWRhdGFzb3VyY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvd2Vic29ja2V0LWRhdGFzb3VyY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQVNBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBR3pELE1BQU0sT0FBTyxtQkFBb0IsU0FBUSxpQkFBaUI7Ozs7O0lBSTlDLGNBQWM7UUFDdEIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDcEUsT0FBTyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDaEMsQ0FBQzs7Ozs7SUFFTyxlQUFlO1FBQ3JCLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUU5QyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFO1lBQ3hCLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzNDO1FBRUQsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTtZQUN4QixJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMzQztRQUVELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7WUFDdkIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDekM7SUFDSCxDQUFDOzs7OztJQUVELFNBQVMsQ0FBQyxLQUFLOztjQUNQLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztRQUVoRSxRQUFRLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFO1lBQzlCLEtBQUssUUFBUTs7O3NCQUVMLGVBQWUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ3BFLElBQUksZUFBZSxFQUFFO29CQUNuQixJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQztpQkFDeEM7Z0JBQ0QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ2pDLE1BQU07WUFDUixLQUFLLFFBQVE7Z0JBQ1gsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3BCLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUNqQyxNQUFNO1lBQ1IsS0FBSyxLQUFLLENBQUM7WUFDWDtnQkFDRSxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNwQztJQUNILENBQUM7Ozs7O0lBRUQsT0FBTyxDQUFDLEtBQUs7UUFDWCx5QkFBeUI7SUFDM0IsQ0FBQzs7Ozs7SUFFRCxPQUFPLENBQUMsS0FBSztRQUNYLHlCQUF5QjtJQUMzQixDQUFDOzs7OztJQUVELE1BQU0sQ0FBQyxLQUFLO1FBQ1YsMkJBQTJCO0lBQzdCLENBQUM7Q0FDRjs7O0lBM0RDLGlDQUFxQjs7SUFDckIsc0NBQTJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG9sU291cmNlVmVjdG9yIGZyb20gJ29sL3NvdXJjZS9WZWN0b3InO1xyXG5pbXBvcnQgKiBhcyBvbGZvcm1hdCBmcm9tICdvbC9mb3JtYXQnO1xyXG5pbXBvcnQgeyB1bkJ5S2V5IH0gZnJvbSAnb2wvT2JzZXJ2YWJsZSc7XHJcbmltcG9ydCB7IGVhc2VPdXQgfSBmcm9tICdvbC9lYXNpbmcnO1xyXG5pbXBvcnQgeyBDaXJjbGUgYXMgQ2lyY2xlU3R5bGUsIEZpbGwsIFN0cm9rZSwgU3R5bGUgfSBmcm9tICdvbC9zdHlsZSc7XHJcblxyXG5pbXBvcnQgeyBNZDUgfSBmcm9tICd0cy1tZDUnO1xyXG5cclxuaW1wb3J0IHsgdXVpZCB9IGZyb20gJ0BpZ28yL3V0aWxzJztcclxuaW1wb3J0IHsgRmVhdHVyZURhdGFTb3VyY2UgfSBmcm9tICcuL2ZlYXR1cmUtZGF0YXNvdXJjZSc7XHJcbmltcG9ydCB7IFdlYlNvY2tldERhdGFTb3VyY2VPcHRpb25zIH0gZnJvbSAnLi93ZWJzb2NrZXQtZGF0YXNvdXJjZS5pbnRlcmZhY2UnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFdlYlNvY2tldERhdGFTb3VyY2UgZXh0ZW5kcyBGZWF0dXJlRGF0YVNvdXJjZSB7XHJcbiAgcHVibGljIHdzOiBXZWJTb2NrZXQ7XHJcbiAgcHVibGljIG9wdGlvbnM6IFdlYlNvY2tldERhdGFTb3VyY2VPcHRpb25zO1xyXG5cclxuICBwcm90ZWN0ZWQgY3JlYXRlT2xTb3VyY2UoKTogb2xTb3VyY2VWZWN0b3Ige1xyXG4gICAgdGhpcy5jcmVhdGVXZWJTb2NrZXQoKTtcclxuICAgIHRoaXMub3B0aW9ucy5mb3JtYXQgPSB0aGlzLmdldFNvdXJjZUZvcm1hdEZyb21PcHRpb25zKHRoaXMub3B0aW9ucyk7XHJcbiAgICByZXR1cm4gc3VwZXIuY3JlYXRlT2xTb3VyY2UoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlV2ViU29ja2V0KCkge1xyXG4gICAgdGhpcy53cyA9IG5ldyBXZWJTb2NrZXQodGhpcy5vcHRpb25zLnVybCk7XHJcbiAgICB0aGlzLndzLm9ubWVzc2FnZSA9IHRoaXMub25NZXNzYWdlLmJpbmQodGhpcyk7XHJcblxyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5vbmNsb3NlKSB7XHJcbiAgICAgIHRoaXMud3Mub25jbG9zZSA9IHRoaXMub25DbG9zZS5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLm9wdGlvbnMub25lcnJvcikge1xyXG4gICAgICB0aGlzLndzLm9uZXJyb3IgPSB0aGlzLm9uRXJyb3IuYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5vcHRpb25zLm9ub3Blbikge1xyXG4gICAgICB0aGlzLndzLm9ub3BlbiA9IHRoaXMub25PcGVuLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbk1lc3NhZ2UoZXZlbnQpIHtcclxuICAgIGNvbnN0IGZlYXR1cmVBZGRlZCA9IHRoaXMub3B0aW9ucy5mb3JtYXQucmVhZEZlYXR1cmUoZXZlbnQuZGF0YSk7XHJcblxyXG4gICAgc3dpdGNoICh0aGlzLm9wdGlvbnMub25tZXNzYWdlKSB7XHJcbiAgICAgIGNhc2UgJ3VwZGF0ZSc6XHJcbiAgICAgICAgLy8gb2wgZG9uJ3QgYWRkIGlmIHNhbWUgSURcclxuICAgICAgICBjb25zdCBmZWF0dXJlVG9SZW1vdmUgPSB0aGlzLm9sLmdldEZlYXR1cmVCeUlkKGZlYXR1cmVBZGRlZC5nZXRJZCgpKTtcclxuICAgICAgICBpZiAoZmVhdHVyZVRvUmVtb3ZlKSB7XHJcbiAgICAgICAgICB0aGlzLm9sLnJlbW92ZUZlYXR1cmUoZmVhdHVyZVRvUmVtb3ZlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5vbC5hZGRGZWF0dXJlKGZlYXR1cmVBZGRlZCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2RlbGV0ZSc6XHJcbiAgICAgICAgdGhpcy5vbC5jbGVhcih0cnVlKTtcclxuICAgICAgICB0aGlzLm9sLmFkZEZlYXR1cmUoZmVhdHVyZUFkZGVkKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnYWRkJzpcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICB0aGlzLm9sLmFkZEZlYXR1cmUoZmVhdHVyZUFkZGVkKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uQ2xvc2UoZXZlbnQpIHtcclxuICAgIC8vIHRocm93biBtZXNzYWdlIHRvIHVzZXJcclxuICB9XHJcblxyXG4gIG9uRXJyb3IoZXZlbnQpIHtcclxuICAgIC8vIHRocm93biBtZXNzYWdlIHRvIHVzZXJcclxuICB9XHJcblxyXG4gIG9uT3BlbihldmVudCkge1xyXG4gICAgLy8gdGhyb3duIG1lc3NhZ2UgdG8gdXNlciA/XHJcbiAgfVxyXG59XHJcbiJdfQ==