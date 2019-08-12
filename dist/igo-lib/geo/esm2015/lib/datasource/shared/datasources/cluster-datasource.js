/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import olSourceCluster from 'ol/source/Cluster';
import { uuid } from '@igo2/utils';
import { FeatureDataSource } from './feature-datasource';
export class ClusterDataSource extends FeatureDataSource {
    /**
     * @protected
     * @return {?}
     */
    createOlSource() {
        this.options.format = this.getSourceFormatFromOptions(this.options);
        this.options.source = super.createOlSource();
        return new olSourceCluster(this.options);
    }
    /**
     * @protected
     * @return {?}
     */
    generateId() {
        return uuid();
    }
}
if (false) {
    /** @type {?} */
    ClusterDataSource.prototype.options;
    /** @type {?} */
    ClusterDataSource.prototype.ol;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1c3Rlci1kYXRhc291cmNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2VzL2NsdXN0ZXItZGF0YXNvdXJjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxlQUFlLE1BQU0sbUJBQW1CLENBQUM7QUFFaEQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUVuQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUd6RCxNQUFNLE9BQU8saUJBQWtCLFNBQVEsaUJBQWlCOzs7OztJQUk1QyxjQUFjO1FBQ3RCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDcEUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQzdDLE9BQU8sSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzNDLENBQUM7Ozs7O0lBRVMsVUFBVTtRQUNsQixPQUFPLElBQUksRUFBRSxDQUFDO0lBQ2hCLENBQUM7Q0FDRjs7O0lBWkMsb0NBQXlDOztJQUN6QywrQkFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgb2xTb3VyY2VDbHVzdGVyIGZyb20gJ29sL3NvdXJjZS9DbHVzdGVyJztcclxuXHJcbmltcG9ydCB7IHV1aWQgfSBmcm9tICdAaWdvMi91dGlscyc7XHJcblxyXG5pbXBvcnQgeyBGZWF0dXJlRGF0YVNvdXJjZSB9IGZyb20gJy4vZmVhdHVyZS1kYXRhc291cmNlJztcclxuaW1wb3J0IHsgQ2x1c3RlckRhdGFTb3VyY2VPcHRpb25zIH0gZnJvbSAnLi9jbHVzdGVyLWRhdGFzb3VyY2UuaW50ZXJmYWNlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBDbHVzdGVyRGF0YVNvdXJjZSBleHRlbmRzIEZlYXR1cmVEYXRhU291cmNlIHtcclxuICBwdWJsaWMgb3B0aW9uczogQ2x1c3RlckRhdGFTb3VyY2VPcHRpb25zO1xyXG4gIHB1YmxpYyBvbDogb2xTb3VyY2VDbHVzdGVyO1xyXG5cclxuICBwcm90ZWN0ZWQgY3JlYXRlT2xTb3VyY2UoKTogb2xTb3VyY2VDbHVzdGVyIHtcclxuICAgIHRoaXMub3B0aW9ucy5mb3JtYXQgPSB0aGlzLmdldFNvdXJjZUZvcm1hdEZyb21PcHRpb25zKHRoaXMub3B0aW9ucyk7XHJcbiAgICB0aGlzLm9wdGlvbnMuc291cmNlID0gc3VwZXIuY3JlYXRlT2xTb3VyY2UoKTtcclxuICAgIHJldHVybiBuZXcgb2xTb3VyY2VDbHVzdGVyKHRoaXMub3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgZ2VuZXJhdGVJZCgpIHtcclxuICAgIHJldHVybiB1dWlkKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==