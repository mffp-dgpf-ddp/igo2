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
        handleFileImportError(file, error, this.messageService, this.languageService, this.config.getConfig('importExport.clientSideFileSizeMaxMb'));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcC1nZW8tZmlsZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AaWdvMi9nZW8vIiwic291cmNlcyI6WyJsaWIvaW1wb3J0LWV4cG9ydC9zaGFyZWQvZHJvcC1nZW8tZmlsZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFJekYsT0FBTyxFQUFFLGNBQWMsRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQzVFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUlwRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUNsRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLHFCQUFxQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDeEYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBS3BFLE1BQU0sT0FBTyxvQkFBcUIsU0FBUSxvQkFBb0I7Ozs7Ozs7Ozs7SUFXNUQsWUFDVSxTQUE4QixFQUM5QixhQUE0QixFQUM1QixlQUFnQyxFQUNoQyxnQkFBa0MsRUFDbEMsWUFBMEIsRUFDMUIsTUFBcUIsRUFDckIsY0FBOEI7UUFFdEMsS0FBSyxFQUFFLENBQUM7UUFSQSxjQUFTLEdBQVQsU0FBUyxDQUFxQjtRQUM5QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixXQUFNLEdBQU4sTUFBTSxDQUFlO1FBQ3JCLG1C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O0lBT25DLHlDQUFzQzs7Ozs7SUFDdEMsNkNBQW9DOzs7OztJQUNwQywrQ0FBd0M7Ozs7O0lBQ3hDLGdEQUEwQzs7Ozs7SUFDMUMsNENBQWtDOzs7OztJQUNsQyxzQ0FBNkI7Ozs7O0lBQzdCLDhDQUFzQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdExpc3RlbmVyLCBFdmVudEVtaXR0ZXIsIE9uSW5pdCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IE1lc3NhZ2VTZXJ2aWNlLCBMYW5ndWFnZVNlcnZpY2UsIENvbmZpZ1NlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuaW1wb3J0IHsgRHJhZ0FuZERyb3BEaXJlY3RpdmUgfSBmcm9tICdAaWdvMi9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgRmVhdHVyZSB9IGZyb20gJy4uLy4uL2ZlYXR1cmUvc2hhcmVkL2ZlYXR1cmUuaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IElnb01hcCB9IGZyb20gJy4uLy4uL21hcC9zaGFyZWQvbWFwJztcclxuaW1wb3J0IHsgTWFwQnJvd3NlckNvbXBvbmVudCB9IGZyb20gJy4uLy4uL21hcC9tYXAtYnJvd3Nlci9tYXAtYnJvd3Nlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBJbXBvcnRTZXJ2aWNlIH0gZnJvbSAnLi9pbXBvcnQuc2VydmljZSc7XHJcbmltcG9ydCB7IGhhbmRsZUZpbGVJbXBvcnRTdWNjZXNzLCBoYW5kbGVGaWxlSW1wb3J0RXJyb3IgfSBmcm9tICcuLi9zaGFyZWQvaW1wb3J0LnV0aWxzJztcclxuaW1wb3J0IHsgU3R5bGVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vbGF5ZXIvc2hhcmVkL3N0eWxlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTdHlsZUxpc3RTZXJ2aWNlIH0gZnJvbSAnLi4vc3R5bGUtbGlzdC9zdHlsZS1saXN0LnNlcnZpY2UnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbaWdvRHJvcEdlb0ZpbGVdJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRHJvcEdlb0ZpbGVEaXJlY3RpdmUgZXh0ZW5kcyBEcmFnQW5kRHJvcERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuXHJcbiAgcHJvdGVjdGVkIGZpbGVzRHJvcHBlZDogRXZlbnRFbWl0dGVyPEZpbGVbXT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgcHJvdGVjdGVkIGZpbGVzSW52YWxpZDogRXZlbnRFbWl0dGVyPEZpbGVbXT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIHByaXZhdGUgZmlsZXNEcm9wcGVkJCQ6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgZ2V0IG1hcCgpOiBJZ29NYXAge1xyXG4gICAgcmV0dXJuIHRoaXMuY29tcG9uZW50Lm1hcDtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBjb21wb25lbnQ6IE1hcEJyb3dzZXJDb21wb25lbnQsXHJcbiAgICBwcml2YXRlIGltcG9ydFNlcnZpY2U6IEltcG9ydFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBzdHlsZUxpc3RTZXJ2aWNlOiBTdHlsZUxpc3RTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBzdHlsZVNlcnZpY2U6IFN0eWxlU2VydmljZSxcclxuICAgIHByaXZhdGUgY29uZmlnOiBDb25maWdTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBtZXNzYWdlU2VydmljZTogTWVzc2FnZVNlcnZpY2VcclxuICApIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuZmlsZXNEcm9wcGVkJCQgPSB0aGlzLmZpbGVzRHJvcHBlZC5zdWJzY3JpYmUoKGZpbGVzOiBGaWxlW10pID0+IHtcclxuICAgICAgdGhpcy5vbkZpbGVzRHJvcHBlZChmaWxlcyk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5maWxlc0Ryb3BwZWQkJC51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignZHJhZ292ZXInLCBbJyRldmVudCddKVxyXG4gIHB1YmxpYyBvbkRyYWdPdmVyKGV2dCkge1xyXG4gICAgc3VwZXIub25EcmFnT3ZlcihldnQpO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignZHJhZ2xlYXZlJywgWyckZXZlbnQnXSlcclxuICBwdWJsaWMgb25EcmFnTGVhdmUoZXZ0KSB7XHJcbiAgICBzdXBlci5vbkRyYWdMZWF2ZShldnQpO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignZHJvcCcsIFsnJGV2ZW50J10pXHJcbiAgcHVibGljIG9uRHJvcChldnQpIHtcclxuICAgIHN1cGVyLm9uRHJvcChldnQpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvbkZpbGVzRHJvcHBlZChmaWxlczogRmlsZVtdKSB7XHJcbiAgICBmb3IgKGNvbnN0IGZpbGUgb2YgZmlsZXMpIHtcclxuICAgICAgdGhpcy5pbXBvcnRTZXJ2aWNlXHJcbiAgICAgICAgLmltcG9ydChmaWxlKVxyXG4gICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAoZmVhdHVyZXM6IEZlYXR1cmVbXSkgPT4gdGhpcy5vbkZpbGVJbXBvcnRTdWNjZXNzKGZpbGUsIGZlYXR1cmVzKSxcclxuICAgICAgICAgIChlcnJvcjogRXJyb3IpID0+IHRoaXMub25GaWxlSW1wb3J0RXJyb3IoZmlsZSwgZXJyb3IpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25GaWxlSW1wb3J0U3VjY2VzcyhmaWxlOiBGaWxlLCBmZWF0dXJlczogRmVhdHVyZVtdKSB7XHJcbiAgICBpZiAoIXRoaXMuY29uZmlnLmdldENvbmZpZygnaW1wb3J0V2l0aFN0eWxlJykpIHtcclxuICAgICAgaGFuZGxlRmlsZUltcG9ydFN1Y2Nlc3MoZmlsZSwgZmVhdHVyZXMsIHRoaXMubWFwLCB0aGlzLm1lc3NhZ2VTZXJ2aWNlLCB0aGlzLmxhbmd1YWdlU2VydmljZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBoYW5kbGVGaWxlSW1wb3J0U3VjY2VzcyhmaWxlLCBmZWF0dXJlcywgdGhpcy5tYXAsIHRoaXMubWVzc2FnZVNlcnZpY2UsIHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdHlsZUxpc3RTZXJ2aWNlLCB0aGlzLnN0eWxlU2VydmljZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG9uRmlsZUltcG9ydEVycm9yKGZpbGU6IEZpbGUsIGVycm9yOiBFcnJvcikge1xyXG4gICAgaGFuZGxlRmlsZUltcG9ydEVycm9yKGZpbGUsIGVycm9yLCB0aGlzLm1lc3NhZ2VTZXJ2aWNlLCB0aGlzLmxhbmd1YWdlU2VydmljZSwgdGhpcy5jb25maWcuZ2V0Q29uZmlnKCdpbXBvcnRFeHBvcnQuY2xpZW50U2lkZUZpbGVTaXplTWF4TWInKSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==