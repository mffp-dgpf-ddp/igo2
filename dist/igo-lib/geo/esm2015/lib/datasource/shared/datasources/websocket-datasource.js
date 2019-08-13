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
    /**
     * @return {?}
     */
    onUnwatch() {
        this.ws.close();
    }
}
if (false) {
    /** @type {?} */
    WebSocketDataSource.prototype.ws;
    /** @type {?} */
    WebSocketDataSource.prototype.options;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Vic29ja2V0LWRhdGFzb3VyY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvd2Vic29ja2V0LWRhdGFzb3VyY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQVNBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBR3pELE1BQU0sT0FBTyxtQkFBb0IsU0FBUSxpQkFBaUI7Ozs7O0lBSTlDLGNBQWM7UUFDdEIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDcEUsT0FBTyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDaEMsQ0FBQzs7Ozs7SUFFTyxlQUFlO1FBQ3JCLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUU5QyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFO1lBQ3hCLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzNDO1FBRUQsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTtZQUN4QixJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMzQztRQUVELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7WUFDdkIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDekM7SUFDSCxDQUFDOzs7OztJQUVELFNBQVMsQ0FBQyxLQUFLOztjQUNQLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztRQUVoRSxRQUFRLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFO1lBQzlCLEtBQUssUUFBUTs7O3NCQUVMLGVBQWUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ3BFLElBQUksZUFBZSxFQUFFO29CQUNuQixJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQztpQkFDeEM7Z0JBQ0QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ2pDLE1BQU07WUFDUixLQUFLLFFBQVE7Z0JBQ1gsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3BCLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUNqQyxNQUFNO1lBQ1IsS0FBSyxLQUFLLENBQUM7WUFDWDtnQkFDRSxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNwQztJQUNILENBQUM7Ozs7O0lBRUQsT0FBTyxDQUFDLEtBQUs7UUFDWCx5QkFBeUI7SUFDM0IsQ0FBQzs7Ozs7SUFFRCxPQUFPLENBQUMsS0FBSztRQUNYLHlCQUF5QjtJQUMzQixDQUFDOzs7OztJQUVELE1BQU0sQ0FBQyxLQUFLO1FBQ1YsMkJBQTJCO0lBQzdCLENBQUM7Ozs7SUFFTSxTQUFTO1FBQ2QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNsQixDQUFDO0NBQ0Y7OztJQS9EQyxpQ0FBcUI7O0lBQ3JCLHNDQUEyQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBvbFNvdXJjZVZlY3RvciBmcm9tICdvbC9zb3VyY2UvVmVjdG9yJztcclxuaW1wb3J0ICogYXMgb2xmb3JtYXQgZnJvbSAnb2wvZm9ybWF0JztcclxuaW1wb3J0IHsgdW5CeUtleSB9IGZyb20gJ29sL09ic2VydmFibGUnO1xyXG5pbXBvcnQgeyBlYXNlT3V0IH0gZnJvbSAnb2wvZWFzaW5nJztcclxuaW1wb3J0IHsgQ2lyY2xlIGFzIENpcmNsZVN0eWxlLCBGaWxsLCBTdHJva2UsIFN0eWxlIH0gZnJvbSAnb2wvc3R5bGUnO1xyXG5cclxuaW1wb3J0IHsgTWQ1IH0gZnJvbSAndHMtbWQ1JztcclxuXHJcbmltcG9ydCB7IHV1aWQgfSBmcm9tICdAaWdvMi91dGlscyc7XHJcbmltcG9ydCB7IEZlYXR1cmVEYXRhU291cmNlIH0gZnJvbSAnLi9mZWF0dXJlLWRhdGFzb3VyY2UnO1xyXG5pbXBvcnQgeyBXZWJTb2NrZXREYXRhU291cmNlT3B0aW9ucyB9IGZyb20gJy4vd2Vic29ja2V0LWRhdGFzb3VyY2UuaW50ZXJmYWNlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBXZWJTb2NrZXREYXRhU291cmNlIGV4dGVuZHMgRmVhdHVyZURhdGFTb3VyY2Uge1xyXG4gIHB1YmxpYyB3czogV2ViU29ja2V0O1xyXG4gIHB1YmxpYyBvcHRpb25zOiBXZWJTb2NrZXREYXRhU291cmNlT3B0aW9ucztcclxuXHJcbiAgcHJvdGVjdGVkIGNyZWF0ZU9sU291cmNlKCk6IG9sU291cmNlVmVjdG9yIHtcclxuICAgIHRoaXMuY3JlYXRlV2ViU29ja2V0KCk7XHJcbiAgICB0aGlzLm9wdGlvbnMuZm9ybWF0ID0gdGhpcy5nZXRTb3VyY2VGb3JtYXRGcm9tT3B0aW9ucyh0aGlzLm9wdGlvbnMpO1xyXG4gICAgcmV0dXJuIHN1cGVyLmNyZWF0ZU9sU291cmNlKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZVdlYlNvY2tldCgpIHtcclxuICAgIHRoaXMud3MgPSBuZXcgV2ViU29ja2V0KHRoaXMub3B0aW9ucy51cmwpO1xyXG4gICAgdGhpcy53cy5vbm1lc3NhZ2UgPSB0aGlzLm9uTWVzc2FnZS5iaW5kKHRoaXMpO1xyXG5cclxuICAgIGlmICh0aGlzLm9wdGlvbnMub25jbG9zZSkge1xyXG4gICAgICB0aGlzLndzLm9uY2xvc2UgPSB0aGlzLm9uQ2xvc2UuYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5vcHRpb25zLm9uZXJyb3IpIHtcclxuICAgICAgdGhpcy53cy5vbmVycm9yID0gdGhpcy5vbkVycm9yLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5vbm9wZW4pIHtcclxuICAgICAgdGhpcy53cy5vbm9wZW4gPSB0aGlzLm9uT3Blbi5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25NZXNzYWdlKGV2ZW50KSB7XHJcbiAgICBjb25zdCBmZWF0dXJlQWRkZWQgPSB0aGlzLm9wdGlvbnMuZm9ybWF0LnJlYWRGZWF0dXJlKGV2ZW50LmRhdGEpO1xyXG5cclxuICAgIHN3aXRjaCAodGhpcy5vcHRpb25zLm9ubWVzc2FnZSkge1xyXG4gICAgICBjYXNlICd1cGRhdGUnOlxyXG4gICAgICAgIC8vIG9sIGRvbid0IGFkZCBpZiBzYW1lIElEXHJcbiAgICAgICAgY29uc3QgZmVhdHVyZVRvUmVtb3ZlID0gdGhpcy5vbC5nZXRGZWF0dXJlQnlJZChmZWF0dXJlQWRkZWQuZ2V0SWQoKSk7XHJcbiAgICAgICAgaWYgKGZlYXR1cmVUb1JlbW92ZSkge1xyXG4gICAgICAgICAgdGhpcy5vbC5yZW1vdmVGZWF0dXJlKGZlYXR1cmVUb1JlbW92ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMub2wuYWRkRmVhdHVyZShmZWF0dXJlQWRkZWQpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdkZWxldGUnOlxyXG4gICAgICAgIHRoaXMub2wuY2xlYXIodHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5vbC5hZGRGZWF0dXJlKGZlYXR1cmVBZGRlZCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2FkZCc6XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgdGhpcy5vbC5hZGRGZWF0dXJlKGZlYXR1cmVBZGRlZCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbkNsb3NlKGV2ZW50KSB7XHJcbiAgICAvLyB0aHJvd24gbWVzc2FnZSB0byB1c2VyXHJcbiAgfVxyXG5cclxuICBvbkVycm9yKGV2ZW50KSB7XHJcbiAgICAvLyB0aHJvd24gbWVzc2FnZSB0byB1c2VyXHJcbiAgfVxyXG5cclxuICBvbk9wZW4oZXZlbnQpIHtcclxuICAgIC8vIHRocm93biBtZXNzYWdlIHRvIHVzZXIgP1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uVW53YXRjaCgpIHtcclxuICAgIHRoaXMud3MuY2xvc2UoKTtcclxuICB9XHJcbn1cclxuIl19