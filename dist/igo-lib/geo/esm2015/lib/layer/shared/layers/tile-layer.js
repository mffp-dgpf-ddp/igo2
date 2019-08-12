/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import olLayerTile from 'ol/layer/Tile';
import { TileWatcher } from '../../utils';
import { Layer } from './layer';
export class TileLayer extends Layer {
    /**
     * @param {?} options
     */
    constructor(options) {
        super(options);
        this.watcher = new TileWatcher(this);
        this.status$ = this.watcher.status$;
    }
    /**
     * @protected
     * @return {?}
     */
    createOlLayer() {
        /** @type {?} */
        const olOptions = Object.assign({}, this.options, {
            source: (/** @type {?} */ (this.options.source.ol))
        });
        return new olLayerTile(olOptions);
    }
    /**
     * @param {?} map
     * @return {?}
     */
    setMap(map) {
        if (map === undefined) {
            this.watcher.unsubscribe();
        }
        else {
            this.watcher.subscribe((/**
             * @return {?}
             */
            () => { }));
        }
        super.setMap(map);
    }
}
if (false) {
    /** @type {?} */
    TileLayer.prototype.dataSource;
    /** @type {?} */
    TileLayer.prototype.options;
    /** @type {?} */
    TileLayer.prototype.ol;
    /**
     * @type {?}
     * @private
     */
    TileLayer.prototype.watcher;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGlsZS1sYXllci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9sYXllci9zaGFyZWQvbGF5ZXJzL3RpbGUtbGF5ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sV0FBVyxNQUFNLGVBQWUsQ0FBQztBQUd4QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBUzFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFHaEMsTUFBTSxPQUFPLFNBQVUsU0FBUSxLQUFLOzs7O0lBWWxDLFlBQVksT0FBeUI7UUFDbkMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRWYsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO0lBQ3RDLENBQUM7Ozs7O0lBRVMsYUFBYTs7Y0FDZixTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoRCxNQUFNLEVBQUUsbUJBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFnQjtTQUMvQyxDQUFDO1FBRUYsT0FBTyxJQUFJLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNwQyxDQUFDOzs7OztJQUVNLE1BQU0sQ0FBQyxHQUF1QjtRQUNuQyxJQUFJLEdBQUcsS0FBSyxTQUFTLEVBQUU7WUFDckIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUM1QjthQUFNO1lBQ0wsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTOzs7WUFBQyxHQUFHLEVBQUUsR0FBRSxDQUFDLEVBQUMsQ0FBQztTQUNsQztRQUNELEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDcEIsQ0FBQztDQUNGOzs7SUFsQ0MsK0JBSzZCOztJQUM3Qiw0QkFBaUM7O0lBQ2pDLHVCQUF1Qjs7Ozs7SUFFdkIsNEJBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG9sTGF5ZXJUaWxlIGZyb20gJ29sL2xheWVyL1RpbGUnO1xyXG5pbXBvcnQgb2xTb3VyY2VUaWxlIGZyb20gJ29sL3NvdXJjZS9UaWxlJztcclxuXHJcbmltcG9ydCB7IFRpbGVXYXRjaGVyIH0gZnJvbSAnLi4vLi4vdXRpbHMnO1xyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICcuLi8uLi8uLi9tYXAnO1xyXG5cclxuaW1wb3J0IHsgT1NNRGF0YVNvdXJjZSB9IGZyb20gJy4uLy4uLy4uL2RhdGFzb3VyY2Uvc2hhcmVkL2RhdGFzb3VyY2VzL29zbS1kYXRhc291cmNlJztcclxuaW1wb3J0IHsgV01UU0RhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi8uLi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy93bXRzLWRhdGFzb3VyY2UnO1xyXG5pbXBvcnQgeyBYWVpEYXRhU291cmNlIH0gZnJvbSAnLi4vLi4vLi4vZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMveHl6LWRhdGFzb3VyY2UnO1xyXG5pbXBvcnQgeyBDYXJ0b0RhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi8uLi9kYXRhc291cmNlL3NoYXJlZC9kYXRhc291cmNlcy9jYXJ0by1kYXRhc291cmNlJztcclxuaW1wb3J0IHsgVGlsZUFyY0dJU1Jlc3REYXRhU291cmNlIH0gZnJvbSAnLi4vLi4vLi4vZGF0YXNvdXJjZS9zaGFyZWQvZGF0YXNvdXJjZXMvdGlsZWFyY2dpc3Jlc3QtZGF0YXNvdXJjZSc7XHJcblxyXG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4vbGF5ZXInO1xyXG5pbXBvcnQgeyBUaWxlTGF5ZXJPcHRpb25zIH0gZnJvbSAnLi90aWxlLWxheWVyLmludGVyZmFjZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgVGlsZUxheWVyIGV4dGVuZHMgTGF5ZXIge1xyXG4gIHB1YmxpYyBkYXRhU291cmNlOlxyXG4gICAgfCBPU01EYXRhU291cmNlXHJcbiAgICB8IFdNVFNEYXRhU291cmNlXHJcbiAgICB8IFhZWkRhdGFTb3VyY2VcclxuICAgIHwgQ2FydG9EYXRhU291cmNlXHJcbiAgICB8IFRpbGVBcmNHSVNSZXN0RGF0YVNvdXJjZTtcclxuICBwdWJsaWMgb3B0aW9uczogVGlsZUxheWVyT3B0aW9ucztcclxuICBwdWJsaWMgb2w6IG9sTGF5ZXJUaWxlO1xyXG5cclxuICBwcml2YXRlIHdhdGNoZXI6IFRpbGVXYXRjaGVyO1xyXG5cclxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBUaWxlTGF5ZXJPcHRpb25zKSB7XHJcbiAgICBzdXBlcihvcHRpb25zKTtcclxuXHJcbiAgICB0aGlzLndhdGNoZXIgPSBuZXcgVGlsZVdhdGNoZXIodGhpcyk7XHJcbiAgICB0aGlzLnN0YXR1cyQgPSB0aGlzLndhdGNoZXIuc3RhdHVzJDtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBjcmVhdGVPbExheWVyKCk6IG9sTGF5ZXJUaWxlIHtcclxuICAgIGNvbnN0IG9sT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMub3B0aW9ucywge1xyXG4gICAgICBzb3VyY2U6IHRoaXMub3B0aW9ucy5zb3VyY2Uub2wgYXMgb2xTb3VyY2VUaWxlXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gbmV3IG9sTGF5ZXJUaWxlKG9sT3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0TWFwKG1hcDogSWdvTWFwIHwgdW5kZWZpbmVkKSB7XHJcbiAgICBpZiAobWFwID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy53YXRjaGVyLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLndhdGNoZXIuc3Vic2NyaWJlKCgpID0+IHt9KTtcclxuICAgIH1cclxuICAgIHN1cGVyLnNldE1hcChtYXApO1xyXG4gIH1cclxufVxyXG4iXX0=