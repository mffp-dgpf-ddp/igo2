/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, HostListener, EventEmitter } from '@angular/core';
import { MessageService, LanguageService, ConfigService } from '@igo2/core';
import { DragAndDropDirective } from '@igo2/common';
import { MapBrowserComponent } from '../../map/map-browser/map-browser.component';
import { ImportService } from './import.service';
import { handleFileImportSuccess, handleFileImportError } from '../shared/import.utils';
import { StyleService } from '../../layer/shared/style.service';
import { StyleListService } from '../style-list/style-list.service';
var DropGeoFileDirective = /** @class */ (function (_super) {
    tslib_1.__extends(DropGeoFileDirective, _super);
    function DropGeoFileDirective(component, importService, languageService, styleListService, styleService, config, messageService) {
        var _this = _super.call(this) || this;
        _this.component = component;
        _this.importService = importService;
        _this.languageService = languageService;
        _this.styleListService = styleListService;
        _this.styleService = styleService;
        _this.config = config;
        _this.messageService = messageService;
        _this.filesDropped = new EventEmitter();
        _this.filesInvalid = new EventEmitter();
        return _this;
    }
    Object.defineProperty(DropGeoFileDirective.prototype, "map", {
        get: /**
         * @return {?}
         */
        function () {
            return this.component.map;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DropGeoFileDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.filesDropped$$ = this.filesDropped.subscribe((/**
         * @param {?} files
         * @return {?}
         */
        function (files) {
            _this.onFilesDropped(files);
        }));
    };
    /**
     * @return {?}
     */
    DropGeoFileDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.filesDropped$$.unsubscribe();
    };
    /**
     * @param {?} evt
     * @return {?}
     */
    DropGeoFileDirective.prototype.onDragOver = /**
     * @param {?} evt
     * @return {?}
     */
    function (evt) {
        _super.prototype.onDragOver.call(this, evt);
    };
    /**
     * @param {?} evt
     * @return {?}
     */
    DropGeoFileDirective.prototype.onDragLeave = /**
     * @param {?} evt
     * @return {?}
     */
    function (evt) {
        _super.prototype.onDragLeave.call(this, evt);
    };
    /**
     * @param {?} evt
     * @return {?}
     */
    DropGeoFileDirective.prototype.onDrop = /**
     * @param {?} evt
     * @return {?}
     */
    function (evt) {
        _super.prototype.onDrop.call(this, evt);
    };
    /**
     * @private
     * @param {?} files
     * @return {?}
     */
    DropGeoFileDirective.prototype.onFilesDropped = /**
     * @private
     * @param {?} files
     * @return {?}
     */
    function (files) {
        var _this = this;
        var e_1, _a;
        var _loop_1 = function (file) {
            this_1.importService
                .import(file)
                .subscribe((/**
             * @param {?} features
             * @return {?}
             */
            function (features) { return _this.onFileImportSuccess(file, features); }), (/**
             * @param {?} error
             * @return {?}
             */
            function (error) { return _this.onFileImportError(file, error); }));
        };
        var this_1 = this;
        try {
            for (var files_1 = tslib_1.__values(files), files_1_1 = files_1.next(); !files_1_1.done; files_1_1 = files_1.next()) {
                var file = files_1_1.value;
                _loop_1(file);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (files_1_1 && !files_1_1.done && (_a = files_1.return)) _a.call(files_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    /**
     * @private
     * @param {?} file
     * @param {?} features
     * @return {?}
     */
    DropGeoFileDirective.prototype.onFileImportSuccess = /**
     * @private
     * @param {?} file
     * @param {?} features
     * @return {?}
     */
    function (file, features) {
        if (!this.config.getConfig('importWithStyle')) {
            handleFileImportSuccess(file, features, this.map, this.messageService, this.languageService);
        }
        else {
            handleFileImportSuccess(file, features, this.map, this.messageService, this.languageService, this.styleListService, this.styleService);
        }
    };
    /**
     * @private
     * @param {?} file
     * @param {?} error
     * @return {?}
     */
    DropGeoFileDirective.prototype.onFileImportError = /**
     * @private
     * @param {?} file
     * @param {?} error
     * @return {?}
     */
    function (file, error) {
        handleFileImportError(file, error, this.messageService, this.languageService, this.config.getConfig('importExport.clientSideFileSizeMaxMb'));
    };
    DropGeoFileDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[igoDropGeoFile]'
                },] }
    ];
    /** @nocollapse */
    DropGeoFileDirective.ctorParameters = function () { return [
        { type: MapBrowserComponent },
        { type: ImportService },
        { type: LanguageService },
        { type: StyleListService },
        { type: StyleService },
        { type: ConfigService },
        { type: MessageService }
    ]; };
    DropGeoFileDirective.propDecorators = {
        onDragOver: [{ type: HostListener, args: ['dragover', ['$event'],] }],
        onDragLeave: [{ type: HostListener, args: ['dragleave', ['$event'],] }],
        onDrop: [{ type: HostListener, args: ['drop', ['$event'],] }]
    };
    return DropGeoFileDirective;
}(DragAndDropDirective));
export { DropGeoFileDirective };
if (false) {
    /**
     * @type {?}
     * @protected
     */
    DropGeoFileDirective.prototype.filesDropped;
    /**
     * @type {?}
     * @protected
     */
    DropGeoFileDirective.prototype.filesInvalid;
    /**
     * @type {?}
     * @private
     */
    DropGeoFileDirective.prototype.filesDropped$$;
    /**
     * @type {?}
     * @private
     */
    DropGeoFileDirective.prototype.component;
    /**
     * @type {?}
     * @private
     */
    DropGeoFileDirective.prototype.importService;
    /**
     * @type {?}
     * @private
     */
    DropGeoFileDirective.prototype.languageService;
    /**
     * @type {?}
     * @private
     */
    DropGeoFileDirective.prototype.styleListService;
    /**
     * @type {?}
     * @private
     */
    DropGeoFileDirective.prototype.styleService;
    /**
     * @type {?}
     * @private
     */
    DropGeoFileDirective.prototype.config;
    /**
     * @type {?}
     * @private
     */
    DropGeoFileDirective.prototype.messageService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcC1nZW8tZmlsZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvaW1wb3J0LWV4cG9ydC9zaGFyZWQvZHJvcC1nZW8tZmlsZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBSXpGLE9BQU8sRUFBRSxjQUFjLEVBQUUsZUFBZSxFQUFFLGFBQWEsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUM1RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFJcEQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDbEYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3hGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNoRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUVwRTtJQUcwQyxnREFBb0I7SUFXNUQsOEJBQ1UsU0FBOEIsRUFDOUIsYUFBNEIsRUFDNUIsZUFBZ0MsRUFDaEMsZ0JBQWtDLEVBQ2xDLFlBQTBCLEVBQzFCLE1BQXFCLEVBQ3JCLGNBQThCO1FBUHhDLFlBU0UsaUJBQU8sU0FDUjtRQVRTLGVBQVMsR0FBVCxTQUFTLENBQXFCO1FBQzlCLG1CQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLHFCQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxzQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLGtCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLFlBQU0sR0FBTixNQUFNLENBQWU7UUFDckIsb0JBQWMsR0FBZCxjQUFjLENBQWdCO1FB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LENBQUMsUUFBUSxDQUFDOzhCQUtuQyxZQUFZLFNBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDO3lCQUtwQyxZQUFZLFNBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDOztJQTRCbEMsMkJBQUM7Q0FBQSxBQTFFRCxDQUcwQyxvQkFBb0IsR0F1RTdEO1NBdkVZLG9CQUFvQjs7Ozs7O0lBRS9CLDRDQUFrRTs7Ozs7SUFDbEUsNENBQWtFOzs7OztJQUVsRSw4Q0FBcUM7Ozs7O0lBT25DLHlDQUFzQzs7Ozs7SUFDdEMsNkNBQW9DOzs7OztJQUNwQywrQ0FBd0M7Ozs7O0lBQ3hDLGdEQUEwQzs7Ozs7SUFDMUMsNENBQWtDOzs7OztJQUNsQyxzQ0FBNkI7Ozs7O0lBQzdCLDhDQUFzQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdExpc3RlbmVyLCBFdmVudEVtaXR0ZXIsIE9uSW5pdCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IE1lc3NhZ2VTZXJ2aWNlLCBMYW5ndWFnZVNlcnZpY2UsIENvbmZpZ1NlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuaW1wb3J0IHsgRHJhZ0FuZERyb3BEaXJlY3RpdmUgfSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgRmVhdHVyZSB9IGZyb20gJy4uLy4uL2ZlYXR1cmUvc2hhcmVkL2ZlYXR1cmUuaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IElnb01hcCB9IGZyb20gJy4uLy4uL21hcC9zaGFyZWQvbWFwJztcclxuaW1wb3J0IHsgTWFwQnJvd3NlckNvbXBvbmVudCB9IGZyb20gJy4uLy4uL21hcC9tYXAtYnJvd3Nlci9tYXAtYnJvd3Nlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBJbXBvcnRTZXJ2aWNlIH0gZnJvbSAnLi9pbXBvcnQuc2VydmljZSc7XHJcbmltcG9ydCB7IGhhbmRsZUZpbGVJbXBvcnRTdWNjZXNzLCBoYW5kbGVGaWxlSW1wb3J0RXJyb3IgfSBmcm9tICcuLi9zaGFyZWQvaW1wb3J0LnV0aWxzJztcclxuaW1wb3J0IHsgU3R5bGVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vbGF5ZXIvc2hhcmVkL3N0eWxlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTdHlsZUxpc3RTZXJ2aWNlIH0gZnJvbSAnLi4vc3R5bGUtbGlzdC9zdHlsZS1saXN0LnNlcnZpY2UnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbaWdvRHJvcEdlb0ZpbGVdJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRHJvcEdlb0ZpbGVEaXJlY3RpdmUgZXh0ZW5kcyBEcmFnQW5kRHJvcERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuXHJcbiAgcHJvdGVjdGVkIGZpbGVzRHJvcHBlZDogRXZlbnRFbWl0dGVyPEZpbGVbXT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgcHJvdGVjdGVkIGZpbGVzSW52YWxpZDogRXZlbnRFbWl0dGVyPEZpbGVbXT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIHByaXZhdGUgZmlsZXNEcm9wcGVkJCQ6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgZ2V0IG1hcCgpOiBJZ29NYXAge1xyXG4gICAgcmV0dXJuIHRoaXMuY29tcG9uZW50Lm1hcDtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBjb21wb25lbnQ6IE1hcEJyb3dzZXJDb21wb25lbnQsXHJcbiAgICBwcml2YXRlIGltcG9ydFNlcnZpY2U6IEltcG9ydFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBzdHlsZUxpc3RTZXJ2aWNlOiBTdHlsZUxpc3RTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBzdHlsZVNlcnZpY2U6IFN0eWxlU2VydmljZSxcclxuICAgIHByaXZhdGUgY29uZmlnOiBDb25maWdTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBtZXNzYWdlU2VydmljZTogTWVzc2FnZVNlcnZpY2VcclxuICApIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuZmlsZXNEcm9wcGVkJCQgPSB0aGlzLmZpbGVzRHJvcHBlZC5zdWJzY3JpYmUoKGZpbGVzOiBGaWxlW10pID0+IHtcclxuICAgICAgdGhpcy5vbkZpbGVzRHJvcHBlZChmaWxlcyk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5maWxlc0Ryb3BwZWQkJC51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignZHJhZ292ZXInLCBbJyRldmVudCddKVxyXG4gIHB1YmxpYyBvbkRyYWdPdmVyKGV2dCkge1xyXG4gICAgc3VwZXIub25EcmFnT3ZlcihldnQpO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignZHJhZ2xlYXZlJywgWyckZXZlbnQnXSlcclxuICBwdWJsaWMgb25EcmFnTGVhdmUoZXZ0KSB7XHJcbiAgICBzdXBlci5vbkRyYWdMZWF2ZShldnQpO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignZHJvcCcsIFsnJGV2ZW50J10pXHJcbiAgcHVibGljIG9uRHJvcChldnQpIHtcclxuICAgIHN1cGVyLm9uRHJvcChldnQpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvbkZpbGVzRHJvcHBlZChmaWxlczogRmlsZVtdKSB7XHJcbiAgICBmb3IgKGNvbnN0IGZpbGUgb2YgZmlsZXMpIHtcclxuICAgICAgdGhpcy5pbXBvcnRTZXJ2aWNlXHJcbiAgICAgICAgLmltcG9ydChmaWxlKVxyXG4gICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAoZmVhdHVyZXM6IEZlYXR1cmVbXSkgPT4gdGhpcy5vbkZpbGVJbXBvcnRTdWNjZXNzKGZpbGUsIGZlYXR1cmVzKSxcclxuICAgICAgICAgIChlcnJvcjogRXJyb3IpID0+IHRoaXMub25GaWxlSW1wb3J0RXJyb3IoZmlsZSwgZXJyb3IpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25GaWxlSW1wb3J0U3VjY2VzcyhmaWxlOiBGaWxlLCBmZWF0dXJlczogRmVhdHVyZVtdKSB7XHJcbiAgICBpZiAoIXRoaXMuY29uZmlnLmdldENvbmZpZygnaW1wb3J0V2l0aFN0eWxlJykpIHtcclxuICAgICAgaGFuZGxlRmlsZUltcG9ydFN1Y2Nlc3MoZmlsZSwgZmVhdHVyZXMsIHRoaXMubWFwLCB0aGlzLm1lc3NhZ2VTZXJ2aWNlLCB0aGlzLmxhbmd1YWdlU2VydmljZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBoYW5kbGVGaWxlSW1wb3J0U3VjY2VzcyhmaWxlLCBmZWF0dXJlcywgdGhpcy5tYXAsIHRoaXMubWVzc2FnZVNlcnZpY2UsIHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdHlsZUxpc3RTZXJ2aWNlLCB0aGlzLnN0eWxlU2VydmljZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uRmlsZUltcG9ydEVycm9yKGZpbGU6IEZpbGUsIGVycm9yOiBFcnJvcikge1xyXG4gICAgaGFuZGxlRmlsZUltcG9ydEVycm9yKGZpbGUsIGVycm9yLCB0aGlzLm1lc3NhZ2VTZXJ2aWNlLCB0aGlzLmxhbmd1YWdlU2VydmljZSwgdGhpcy5jb25maWcuZ2V0Q29uZmlnKCdpbXBvcnRFeHBvcnQuY2xpZW50U2lkZUZpbGVTaXplTWF4TWInKSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==