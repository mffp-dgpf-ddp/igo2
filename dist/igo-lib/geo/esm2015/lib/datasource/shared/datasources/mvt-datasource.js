/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Md5 } from 'ts-md5';
import feature from 'ol/Feature';
import olSourceVectorTile from 'ol/source/VectorTile';
import olFormatMVT from 'ol/format/MVT';
import { uuid } from '@igo2/utils';
import { DataSource } from './datasource';
export class MVTDataSource extends DataSource {
    /**
     * @protected
     * @return {?}
     */
    createOlSource() {
        /** @type {?} */
        const mvtFormat = new olFormatMVT({ featureClass: feature });
        this.options.format = mvtFormat;
        return new olSourceVectorTile(this.options);
    }
    /**
     * @protected
     * @return {?}
     */
    generateId() {
        if (!this.options.url) {
            return uuid();
        }
        /** @type {?} */
        const chain = 'mvt' + this.options.url;
        return (/** @type {?} */ (Md5.hashStr(chain)));
    }
    /**
     * @param {?} status
     * @return {?}
     */
    onLayerStatusChange(status) { }
}
if (false) {
    /** @type {?} */
    MVTDataSource.prototype.ol;
    /** @type {?} */
    MVTDataSource.prototype.options;
    /** @type {?} */
    MVTDataSource.prototype.status;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXZ0LWRhdGFzb3VyY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvbXZ0LWRhdGFzb3VyY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFDN0IsT0FBTyxPQUFPLE1BQU0sWUFBWSxDQUFDO0FBQ2pDLE9BQU8sa0JBQWtCLE1BQU0sc0JBQXNCLENBQUM7QUFDdEQsT0FBTyxXQUFXLE1BQU0sZUFBZSxDQUFDO0FBRXhDLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sYUFBYSxDQUFDO0FBRWxELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFHMUMsTUFBTSxPQUFPLGFBQWMsU0FBUSxVQUFVOzs7OztJQUtqQyxjQUFjOztjQUNoQixTQUFTLEdBQUcsSUFBSSxXQUFXLENBQUMsRUFBQyxZQUFZLEVBQUUsT0FBTyxFQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO1FBQ2hDLE9BQU8sSUFBSSxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDOUMsQ0FBQzs7Ozs7SUFFUyxVQUFVO1FBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRTtZQUNuQixPQUFPLElBQUksRUFBRSxDQUFDO1NBQ2pCOztjQUNLLEtBQUssR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHO1FBQ3RDLE9BQU8sbUJBQUEsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBVSxDQUFDO0lBQ3RDLENBQUM7Ozs7O0lBQ0QsbUJBQW1CLENBQUMsTUFBcUIsSUFBUyxDQUFDO0NBQ3BEOzs7SUFsQkMsMkJBQThCOztJQUM5QixnQ0FBcUM7O0lBQ3JDLCtCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1kNSB9IGZyb20gJ3RzLW1kNSc7XHJcbmltcG9ydCBmZWF0dXJlIGZyb20gJ29sL0ZlYXR1cmUnO1xyXG5pbXBvcnQgb2xTb3VyY2VWZWN0b3JUaWxlIGZyb20gJ29sL3NvdXJjZS9WZWN0b3JUaWxlJztcclxuaW1wb3J0IG9sRm9ybWF0TVZUIGZyb20gJ29sL2Zvcm1hdC9NVlQnO1xyXG5cclxuaW1wb3J0IHsgdXVpZCwgU3ViamVjdFN0YXR1cyB9IGZyb20gJ0BpZ28yL3V0aWxzJztcclxuXHJcbmltcG9ydCB7IERhdGFTb3VyY2UgfSBmcm9tICcuL2RhdGFzb3VyY2UnO1xyXG5pbXBvcnQgeyBNVlREYXRhU291cmNlT3B0aW9ucyB9IGZyb20gJy4vbXZ0LWRhdGFzb3VyY2UuaW50ZXJmYWNlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBNVlREYXRhU291cmNlIGV4dGVuZHMgRGF0YVNvdXJjZSB7XHJcbiAgcHVibGljIG9sOiBvbFNvdXJjZVZlY3RvclRpbGU7XHJcbiAgcHVibGljIG9wdGlvbnM6IE1WVERhdGFTb3VyY2VPcHRpb25zO1xyXG4gIHB1YmxpYyBzdGF0dXM6IGJvb2xlYW47XHJcblxyXG4gIHByb3RlY3RlZCBjcmVhdGVPbFNvdXJjZSgpOiBvbFNvdXJjZVZlY3RvclRpbGUge1xyXG4gICAgY29uc3QgbXZ0Rm9ybWF0ID0gbmV3IG9sRm9ybWF0TVZUKHtmZWF0dXJlQ2xhc3M6IGZlYXR1cmV9KTtcclxuICAgIHRoaXMub3B0aW9ucy5mb3JtYXQgPSBtdnRGb3JtYXQ7XHJcbiAgICByZXR1cm4gbmV3IG9sU291cmNlVmVjdG9yVGlsZSh0aGlzLm9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGdlbmVyYXRlSWQoKSB7XHJcbiAgICBpZiAoIXRoaXMub3B0aW9ucy51cmwpIHtcclxuICAgICAgICByZXR1cm4gdXVpZCgpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgY2hhaW4gPSAnbXZ0JyArIHRoaXMub3B0aW9ucy51cmw7XHJcbiAgICByZXR1cm4gTWQ1Lmhhc2hTdHIoY2hhaW4pIGFzIHN0cmluZztcclxuICB9XHJcbiAgb25MYXllclN0YXR1c0NoYW5nZShzdGF0dXM6IFN1YmplY3RTdGF0dXMpOiB2b2lkIHt9XHJcbn1cclxuIl19