/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, HostListener, EventEmitter } from '@angular/core';
import { MessageService, LanguageService, ConfigService } from '@igo2/core';
import { DragAndDropDirective } from '@igo2/common';
import { MapBrowserComponent } from '../../map/map-browser/map-browser.component';
import { ImportService } from './import.service';
import { handleFileImportSuccess, handleFileImportError } from '../shared/import.utils';
import { StyleService } from '../../layer/shared/style.service';
import { StyleListService } from '../style-list/style-list.service';
export class DropGeoFileDirective extends DragAndDropDirective {
    /**
     * @param {?} component
     * @param {?} importService
     * @param {?} languageService
     * @param {?} styleListService
     * @param {?} styleService
     * @param {?} config
     * @param {?} messageService
     */
    constructor(component, importService, languageService, styleListService, styleService, config, messageService) {
        super();
        this.component = component;
        this.importService = importService;
        this.languageService = languageService;
        this.styleListService = styleListService;
        this.styleService = styleService;
        this.config = config;
        this.messageService = messageService;
        this.filesDropped = new EventEmitter();
        this.filesInvalid = new EventEmitter();
    }
    /**
     * @return {?}
     */
    get map() {
        return this.component.map;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.filesDropped$$ = this.filesDropped.subscribe((/**
         * @param {?} files
         * @return {?}
         */
        (files) => {
            this.onFilesDropped(files);
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.filesDropped$$.unsubscribe();
    }
    /**
     * @param {?} evt
     * @return {?}
     */
    onDragOver(evt) {
        super.onDragOver(evt);
    }
    /**
     * @param {?} evt
     * @return {?}
     */
    onDragLeave(evt) {
        super.onDragLeave(evt);
    }
    /**
     * @param {?} evt
     * @return {?}
     */
    onDrop(evt) {
        super.onDrop(evt);
    }
    /**
     * @private
     * @param {?} files
     * @return {?}
     */
    onFilesDropped(files) {
        for (const file of files) {
            this.importService
                .import(file)
                .subscribe((/**
             * @param {?} features
             * @return {?}
             */
            (features) => this.onFileImportSuccess(file, features)), (/**
             * @param {?} error
             * @return {?}
             */
            (error) => this.onFileImportError(file, error)));
        }
    }
    /**
     * @private
     * @param {?} file
     * @param {?} features
     * @return {?}
     */
    onFileImportSuccess(file, features) {
        if (!this.config.getConfig('importWithStyle')) {
            handleFileImportSuccess(file, features, this.map, this.messageService, this.languageService);
        }
        else {
            handleFileImportSuccess(file, features, this.map, this.messageService, this.languageService, this.styleListService, this.styleService);
        }
    }
    /**
     * @private
     * @param {?} file
     * @param {?} error
     * @return {?}
     */
    onFileImportError(file, error) {
        handleFileImportError(file, error, this.messageService, this.languageService);
    }
}
DropGeoFileDirective.decorators = [
    { type: Directive, args: [{
                selector: '[igoDropGeoFile]'
            },] }
];
/** @nocollapse */
DropGeoFileDirective.ctorParameters = () => [
    { type: MapBrowserComponent },
    { type: ImportService },
    { type: LanguageService },
    { type: StyleListService },
    { type: StyleService },
    { type: ConfigService },
    { type: MessageService }
];
DropGeoFileDirective.propDecorators = {
    onDragOver: [{ type: HostListener, args: ['dragover', ['$event'],] }],
    onDragLeave: [{ type: HostListener, args: ['dragleave', ['$event'],] }],
    onDrop: [{ type: HostListener, args: ['drop', ['$event'],] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcC1nZW8tZmlsZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvaW1wb3J0LWV4cG9ydC9zaGFyZWQvZHJvcC1nZW8tZmlsZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFJekYsT0FBTyxFQUFFLGNBQWMsRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQzVFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUlwRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUNsRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLHFCQUFxQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDeEYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBS3BFLE1BQU0sT0FBTyxvQkFBcUIsU0FBUSxvQkFBb0I7Ozs7Ozs7Ozs7SUFXNUQsWUFDVSxTQUE4QixFQUM5QixhQUE0QixFQUM1QixlQUFnQyxFQUNoQyxnQkFBa0MsRUFDbEMsWUFBMEIsRUFDMUIsTUFBcUIsRUFDckIsY0FBOEI7UUFFdEMsS0FBSyxFQUFFLENBQUM7UUFSQSxjQUFTLEdBQVQsU0FBUyxDQUFxQjtRQUM5QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixXQUFNLEdBQU4sTUFBTSxDQUFlO1FBQ3JCLG1C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Ozs7OztJQUN4QyxnREFBMEM7Ozs7O0lBQzFDLDRDQUFrQzs7Ozs7SUFDbEMsc0NBQTZCOzs7OztJQUM3Qiw4Q0FBc0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgRXZlbnRFbWl0dGVyLCBPbkluaXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBNZXNzYWdlU2VydmljZSwgTGFuZ3VhZ2VTZXJ2aWNlLCBDb25maWdTZXJ2aWNlIH0gZnJvbSAnQGlnbzIvY29yZSc7XHJcbmltcG9ydCB7IERyYWdBbmREcm9wRGlyZWN0aXZlIH0gZnJvbSAnQGlnbzIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IEZlYXR1cmUgfSBmcm9tICcuLi8uLi9mZWF0dXJlL3NoYXJlZC9mZWF0dXJlLmludGVyZmFjZXMnO1xyXG5pbXBvcnQgeyBJZ29NYXAgfSBmcm9tICcuLi8uLi9tYXAvc2hhcmVkL21hcCc7XHJcbmltcG9ydCB7IE1hcEJyb3dzZXJDb21wb25lbnQgfSBmcm9tICcuLi8uLi9tYXAvbWFwLWJyb3dzZXIvbWFwLWJyb3dzZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgSW1wb3J0U2VydmljZSB9IGZyb20gJy4vaW1wb3J0LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBoYW5kbGVGaWxlSW1wb3J0U3VjY2VzcywgaGFuZGxlRmlsZUltcG9ydEVycm9yIH0gZnJvbSAnLi4vc2hhcmVkL2ltcG9ydC51dGlscyc7XHJcbmltcG9ydCB7IFN0eWxlU2VydmljZSB9IGZyb20gJy4uLy4uL2xheWVyL3NoYXJlZC9zdHlsZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU3R5bGVMaXN0U2VydmljZSB9IGZyb20gJy4uL3N0eWxlLWxpc3Qvc3R5bGUtbGlzdC5zZXJ2aWNlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW2lnb0Ryb3BHZW9GaWxlXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIERyb3BHZW9GaWxlRGlyZWN0aXZlIGV4dGVuZHMgRHJhZ0FuZERyb3BEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcblxyXG4gIHByb3RlY3RlZCBmaWxlc0Ryb3BwZWQ6IEV2ZW50RW1pdHRlcjxGaWxlW10+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIHByb3RlY3RlZCBmaWxlc0ludmFsaWQ6IEV2ZW50RW1pdHRlcjxGaWxlW10+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBwcml2YXRlIGZpbGVzRHJvcHBlZCQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIGdldCBtYXAoKTogSWdvTWFwIHtcclxuICAgIHJldHVybiB0aGlzLmNvbXBvbmVudC5tYXA7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgY29tcG9uZW50OiBNYXBCcm93c2VyQ29tcG9uZW50LFxyXG4gICAgcHJpdmF0ZSBpbXBvcnRTZXJ2aWNlOiBJbXBvcnRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBsYW5ndWFnZVNlcnZpY2U6IExhbmd1YWdlU2VydmljZSxcclxuICAgIHByaXZhdGUgc3R5bGVMaXN0U2VydmljZTogU3R5bGVMaXN0U2VydmljZSxcclxuICAgIHByaXZhdGUgc3R5bGVTZXJ2aWNlOiBTdHlsZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGNvbmZpZzogQ29uZmlnU2VydmljZSxcclxuICAgIHByaXZhdGUgbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmZpbGVzRHJvcHBlZCQkID0gdGhpcy5maWxlc0Ryb3BwZWQuc3Vic2NyaWJlKChmaWxlczogRmlsZVtdKSA9PiB7XHJcbiAgICAgIHRoaXMub25GaWxlc0Ryb3BwZWQoZmlsZXMpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuZmlsZXNEcm9wcGVkJCQudW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2RyYWdvdmVyJywgWyckZXZlbnQnXSlcclxuICBwdWJsaWMgb25EcmFnT3ZlcihldnQpIHtcclxuICAgIHN1cGVyLm9uRHJhZ092ZXIoZXZ0KTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIFsnJGV2ZW50J10pXHJcbiAgcHVibGljIG9uRHJhZ0xlYXZlKGV2dCkge1xyXG4gICAgc3VwZXIub25EcmFnTGVhdmUoZXZ0KTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2Ryb3AnLCBbJyRldmVudCddKVxyXG4gIHB1YmxpYyBvbkRyb3AoZXZ0KSB7XHJcbiAgICBzdXBlci5vbkRyb3AoZXZ0KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25GaWxlc0Ryb3BwZWQoZmlsZXM6IEZpbGVbXSkge1xyXG4gICAgZm9yIChjb25zdCBmaWxlIG9mIGZpbGVzKSB7XHJcbiAgICAgIHRoaXMuaW1wb3J0U2VydmljZVxyXG4gICAgICAgIC5pbXBvcnQoZmlsZSlcclxuICAgICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgKGZlYXR1cmVzOiBGZWF0dXJlW10pID0+IHRoaXMub25GaWxlSW1wb3J0U3VjY2VzcyhmaWxlLCBmZWF0dXJlcyksXHJcbiAgICAgICAgICAoZXJyb3I6IEVycm9yKSA9PiB0aGlzLm9uRmlsZUltcG9ydEVycm9yKGZpbGUsIGVycm9yKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uRmlsZUltcG9ydFN1Y2Nlc3MoZmlsZTogRmlsZSwgZmVhdHVyZXM6IEZlYXR1cmVbXSkge1xyXG4gICAgaWYgKCF0aGlzLmNvbmZpZy5nZXRDb25maWcoJ2ltcG9ydFdpdGhTdHlsZScpKSB7XHJcbiAgICAgIGhhbmRsZUZpbGVJbXBvcnRTdWNjZXNzKGZpbGUsIGZlYXR1cmVzLCB0aGlzLm1hcCwgdGhpcy5tZXNzYWdlU2VydmljZSwgdGhpcy5sYW5ndWFnZVNlcnZpY2UpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaGFuZGxlRmlsZUltcG9ydFN1Y2Nlc3MoZmlsZSwgZmVhdHVyZXMsIHRoaXMubWFwLCB0aGlzLm1lc3NhZ2VTZXJ2aWNlLCB0aGlzLmxhbmd1YWdlU2VydmljZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3R5bGVMaXN0U2VydmljZSwgdGhpcy5zdHlsZVNlcnZpY2UpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvbkZpbGVJbXBvcnRFcnJvcihmaWxlOiBGaWxlLCBlcnJvcjogRXJyb3IpIHtcclxuICAgIGhhbmRsZUZpbGVJbXBvcnRFcnJvcihmaWxlLCBlcnJvciwgdGhpcy5tZXNzYWdlU2VydmljZSwgdGhpcy5sYW5ndWFnZVNlcnZpY2UpO1xyXG4gIH1cclxufVxyXG4iXX0=