/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import olSourceWMTS from 'ol/source/WMTS';
import { createDefaultTileGrid } from '../../utils/tilegrid';
import { DataSource } from './datasource';
export class WMTSDataSource extends DataSource {
    /**
     * @param {?} options
     */
    constructor(options) {
        super(options);
    }
    /**
     * @protected
     * @return {?}
     */
    createOlSource() {
        /** @type {?} */
        const sourceOptions = Object.assign({
            tileGrid: createDefaultTileGrid((/** @type {?} */ (this.options.projection)))
        }, this.options);
        return new olSourceWMTS(sourceOptions);
    }
    /**
     * @return {?}
     */
    onUnwatch() { }
}
if (false) {
    /** @type {?} */
    WMTSDataSource.prototype.options;
    /** @type {?} */
    WMTSDataSource.prototype.ol;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid210cy1kYXRhc291cmNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2VzL3dtdHMtZGF0YXNvdXJjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxZQUFZLE1BQU0sZ0JBQWdCLENBQUM7QUFFMUMsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDN0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUcxQyxNQUFNLE9BQU8sY0FBZSxTQUFRLFVBQVU7Ozs7SUFJNUMsWUFBWSxPQUE4QjtRQUN4QyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakIsQ0FBQzs7Ozs7SUFFUyxjQUFjOztjQUNoQixhQUFhLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FDakM7WUFDRSxRQUFRLEVBQUUscUJBQXFCLENBQUMsbUJBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQVUsQ0FBQztTQUNuRSxFQUNELElBQUksQ0FBQyxPQUFPLENBQ2I7UUFFRCxPQUFPLElBQUksWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7Ozs7SUFFTSxTQUFTLEtBQUksQ0FBQztDQUV0Qjs7O0lBcEJDLGlDQUFzQzs7SUFDdEMsNEJBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG9sU291cmNlV01UUyBmcm9tICdvbC9zb3VyY2UvV01UUyc7XHJcblxyXG5pbXBvcnQgeyBjcmVhdGVEZWZhdWx0VGlsZUdyaWQgfSBmcm9tICcuLi8uLi91dGlscy90aWxlZ3JpZCc7XHJcbmltcG9ydCB7IERhdGFTb3VyY2UgfSBmcm9tICcuL2RhdGFzb3VyY2UnO1xyXG5pbXBvcnQgeyBXTVRTRGF0YVNvdXJjZU9wdGlvbnMgfSBmcm9tICcuL3dtdHMtZGF0YXNvdXJjZS5pbnRlcmZhY2UnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFdNVFNEYXRhU291cmNlIGV4dGVuZHMgRGF0YVNvdXJjZSB7XHJcbiAgcHVibGljIG9wdGlvbnM6IFdNVFNEYXRhU291cmNlT3B0aW9ucztcclxuICBwdWJsaWMgb2w6IG9sU291cmNlV01UUztcclxuXHJcbiAgY29uc3RydWN0b3Iob3B0aW9uczogV01UU0RhdGFTb3VyY2VPcHRpb25zKSB7XHJcbiAgICBzdXBlcihvcHRpb25zKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBjcmVhdGVPbFNvdXJjZSgpOiBvbFNvdXJjZVdNVFMge1xyXG4gICAgY29uc3Qgc291cmNlT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oXHJcbiAgICAgIHtcclxuICAgICAgICB0aWxlR3JpZDogY3JlYXRlRGVmYXVsdFRpbGVHcmlkKHRoaXMub3B0aW9ucy5wcm9qZWN0aW9uIGFzIHN0cmluZylcclxuICAgICAgfSxcclxuICAgICAgdGhpcy5vcHRpb25zXHJcbiAgICApO1xyXG5cclxuICAgIHJldHVybiBuZXcgb2xTb3VyY2VXTVRTKHNvdXJjZU9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uVW53YXRjaCgpIHt9XHJcblxyXG59XHJcbiJdfQ==