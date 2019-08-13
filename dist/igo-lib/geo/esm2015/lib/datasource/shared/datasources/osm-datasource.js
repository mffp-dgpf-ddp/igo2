/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import olSourceOSM from 'ol/source/OSM';
import { DataSource } from './datasource';
export class OSMDataSource extends DataSource {
    /**
     * @protected
     * @return {?}
     */
    createOlSource() {
        this.options.url = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
        return new olSourceOSM(this.options);
    }
    /**
     * @return {?}
     */
    onUnwatch() { }
}
if (false) {
    /** @type {?} */
    OSMDataSource.prototype.options;
    /** @type {?} */
    OSMDataSource.prototype.ol;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3NtLWRhdGFzb3VyY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvb3NtLWRhdGFzb3VyY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sV0FBVyxNQUFNLGVBQWUsQ0FBQztBQUV4QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRzFDLE1BQU0sT0FBTyxhQUFjLFNBQVEsVUFBVTs7Ozs7SUFJakMsY0FBYztRQUN0QixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxnREFBZ0QsQ0FBQztRQUNwRSxPQUFPLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN2QyxDQUFDOzs7O0lBRU0sU0FBUyxLQUFJLENBQUM7Q0FDdEI7OztJQVRDLGdDQUFxQzs7SUFDckMsMkJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG9sU291cmNlT1NNIGZyb20gJ29sL3NvdXJjZS9PU00nO1xyXG5cclxuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJy4vZGF0YXNvdXJjZSc7XHJcbmltcG9ydCB7IE9TTURhdGFTb3VyY2VPcHRpb25zIH0gZnJvbSAnLi9vc20tZGF0YXNvdXJjZS5pbnRlcmZhY2UnO1xyXG5cclxuZXhwb3J0IGNsYXNzIE9TTURhdGFTb3VyY2UgZXh0ZW5kcyBEYXRhU291cmNlIHtcclxuICBwdWJsaWMgb3B0aW9uczogT1NNRGF0YVNvdXJjZU9wdGlvbnM7XHJcbiAgcHVibGljIG9sOiBvbFNvdXJjZU9TTTtcclxuXHJcbiAgcHJvdGVjdGVkIGNyZWF0ZU9sU291cmNlKCk6IG9sU291cmNlT1NNIHtcclxuICAgIHRoaXMub3B0aW9ucy51cmwgPSAnaHR0cHM6Ly90aWxlLm9wZW5zdHJlZXRtYXAub3JnL3t6fS97eH0ve3l9LnBuZyc7XHJcbiAgICByZXR1cm4gbmV3IG9sU291cmNlT1NNKHRoaXMub3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb25VbndhdGNoKCkge31cclxufVxyXG4iXX0=