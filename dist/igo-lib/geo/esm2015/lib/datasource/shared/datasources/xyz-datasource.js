/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import olSourceXYZ from 'ol/source/XYZ';
import { DataSource } from './datasource';
export class XYZDataSource extends DataSource {
    /**
     * @protected
     * @return {?}
     */
    createOlSource() {
        return new olSourceXYZ(this.options);
    }
    /**
     * @return {?}
     */
    onUnwatch() { }
}
if (false) {
    /** @type {?} */
    XYZDataSource.prototype.options;
    /** @type {?} */
    XYZDataSource.prototype.ol;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieHl6LWRhdGFzb3VyY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMveHl6LWRhdGFzb3VyY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sV0FBVyxNQUFNLGVBQWUsQ0FBQztBQUV4QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRzFDLE1BQU0sT0FBTyxhQUFjLFNBQVEsVUFBVTs7Ozs7SUFJakMsY0FBYztRQUN0QixPQUFPLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN2QyxDQUFDOzs7O0lBRU0sU0FBUyxLQUFJLENBQUM7Q0FFdEI7OztJQVRDLGdDQUFxQzs7SUFDckMsMkJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG9sU291cmNlWFlaIGZyb20gJ29sL3NvdXJjZS9YWVonO1xyXG5cclxuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJy4vZGF0YXNvdXJjZSc7XHJcbmltcG9ydCB7IFhZWkRhdGFTb3VyY2VPcHRpb25zIH0gZnJvbSAnLi94eXotZGF0YXNvdXJjZS5pbnRlcmZhY2UnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFhZWkRhdGFTb3VyY2UgZXh0ZW5kcyBEYXRhU291cmNlIHtcclxuICBwdWJsaWMgb3B0aW9uczogWFlaRGF0YVNvdXJjZU9wdGlvbnM7XHJcbiAgcHVibGljIG9sOiBvbFNvdXJjZVhZWjtcclxuXHJcbiAgcHJvdGVjdGVkIGNyZWF0ZU9sU291cmNlKCk6IG9sU291cmNlWFlaIHtcclxuICAgIHJldHVybiBuZXcgb2xTb3VyY2VYWVoodGhpcy5vcHRpb25zKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBvblVud2F0Y2goKSB7fVxyXG5cclxufVxyXG4iXX0=