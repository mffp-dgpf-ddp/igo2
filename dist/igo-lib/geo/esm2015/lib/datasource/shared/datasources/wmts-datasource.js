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
     * @param {?} networkService
     */
    constructor(options, networkService) {
        super(options, networkService);
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
}
if (false) {
    /** @type {?} */
    WMTSDataSource.prototype.options;
    /** @type {?} */
    WMTSDataSource.prototype.ol;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid210cy1kYXRhc291cmNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2VzL3dtdHMtZGF0YXNvdXJjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxZQUFZLE1BQU0sZ0JBQWdCLENBQUM7QUFFMUMsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDN0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUsxQyxNQUFNLE9BQU8sY0FBZSxTQUFRLFVBQVU7Ozs7O0lBSTVDLFlBQ0UsT0FBOEIsRUFDOUIsY0FBOEI7UUFFOUIsS0FBSyxDQUFDLE9BQU8sRUFBRSxjQUFjLENBQUMsQ0FBQztJQUNqQyxDQUFDOzs7OztJQUVTLGNBQWM7O2NBQ2hCLGFBQWEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUNqQztZQUNFLFFBQVEsRUFBRSxxQkFBcUIsQ0FBQyxtQkFBQSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBVSxDQUFDO1NBQ25FLEVBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FDYjtRQUVELE9BQU8sSUFBSSxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDekMsQ0FBQztDQUVGOzs7SUFyQkMsaUNBQXNDOztJQUN0Qyw0QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgb2xTb3VyY2VXTVRTIGZyb20gJ29sL3NvdXJjZS9XTVRTJztcclxuXHJcbmltcG9ydCB7IGNyZWF0ZURlZmF1bHRUaWxlR3JpZCB9IGZyb20gJy4uLy4uL3V0aWxzL3RpbGVncmlkJztcclxuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJy4vZGF0YXNvdXJjZSc7XHJcbmltcG9ydCB7IFdNVFNEYXRhU291cmNlT3B0aW9ucyB9IGZyb20gJy4vd210cy1kYXRhc291cmNlLmludGVyZmFjZSc7XHJcblxyXG5pbXBvcnQgeyBOZXR3b3JrU2VydmljZSB9IGZyb20gJ0BpZ28yL2NvcmUvaWdvMi1jb3JlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBXTVRTRGF0YVNvdXJjZSBleHRlbmRzIERhdGFTb3VyY2Uge1xyXG4gIHB1YmxpYyBvcHRpb25zOiBXTVRTRGF0YVNvdXJjZU9wdGlvbnM7XHJcbiAgcHVibGljIG9sOiBvbFNvdXJjZVdNVFM7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgb3B0aW9uczogV01UU0RhdGFTb3VyY2VPcHRpb25zLFxyXG4gICAgbmV0d29ya1NlcnZpY2U6IE5ldHdvcmtTZXJ2aWNlXHJcbiAgICApIHtcclxuICAgIHN1cGVyKG9wdGlvbnMsIG5ldHdvcmtTZXJ2aWNlKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBjcmVhdGVPbFNvdXJjZSgpOiBvbFNvdXJjZVdNVFMge1xyXG4gICAgY29uc3Qgc291cmNlT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oXHJcbiAgICAgIHtcclxuICAgICAgICB0aWxlR3JpZDogY3JlYXRlRGVmYXVsdFRpbGVHcmlkKHRoaXMub3B0aW9ucy5wcm9qZWN0aW9uIGFzIHN0cmluZylcclxuICAgICAgfSxcclxuICAgICAgdGhpcy5vcHRpb25zXHJcbiAgICApO1xyXG5cclxuICAgIHJldHVybiBuZXcgb2xTb3VyY2VXTVRTKHNvdXJjZU9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbn1cclxuIl19