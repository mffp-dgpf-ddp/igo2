/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '@igo2/core';
import { ImportInvalidFileError, ImportUnreadableFileError, ImportSizeError } from './context-import.errors';
import { getFileExtension } from './context-import.utils';
import * as i0 from "@angular/core";
import * as i1 from "@igo2/core";
var ContextImportService = /** @class */ (function () {
    function ContextImportService(config) {
        this.config = config;
        /** @type {?} */
        var configFileSizeMb = this.config.getConfig('importExport.clientSideFileSizeMaxMb');
        this.clientSideFileSizeMax =
            (configFileSizeMb ? configFileSizeMb : 30) * Math.pow(1024, 2);
    }
    /**
     * @param {?} file
     * @return {?}
     */
    ContextImportService.prototype.import = /**
     * @param {?} file
     * @return {?}
     */
    function (file) {
        return this.importAsync(file);
    };
    /**
     * @private
     * @param {?} file
     * @return {?}
     */
    ContextImportService.prototype.getFileImporter = /**
     * @private
     * @param {?} file
     * @return {?}
     */
    function (file) {
        /** @type {?} */
        var extension = getFileExtension(file);
        /** @type {?} */
        var mimeType = file.type;
        /** @type {?} */
        var allowedMimeTypes = tslib_1.__spread(ContextImportService.allowedMimeTypes);
        /** @type {?} */
        var allowedExtensions = ContextImportService.allowedExtensions;
        if (allowedMimeTypes.indexOf(mimeType) < 0 &&
            allowedExtensions.indexOf(extension) < 0) {
            return undefined;
        }
        else if (mimeType === 'application/json' ||
            extension === ContextImportService.allowedExtensions) {
            return this.importFile;
        }
        return undefined;
    };
    /**
     * @private
     * @param {?} file
     * @return {?}
     */
    ContextImportService.prototype.importAsync = /**
     * @private
     * @param {?} file
     * @return {?}
     */
    function (file) {
        var _this = this;
        /** @type {?} */
        var doImport = (/**
         * @param {?} observer
         * @return {?}
         */
        function (observer) {
            if (file.size >= _this.clientSideFileSizeMax) {
                observer.error(new ImportSizeError());
                return;
            }
            /** @type {?} */
            var importer = _this.getFileImporter(file);
            if (importer === undefined) {
                observer.error(new ImportInvalidFileError());
                return;
            }
            importer.call(_this, file, observer);
        });
        return new Observable(doImport);
    };
    /**
     * @private
     * @param {?} file
     * @param {?} observer
     * @return {?}
     */
    ContextImportService.prototype.importFile = /**
     * @private
     * @param {?} file
     * @param {?} observer
     * @return {?}
     */
    function (file, observer) {
        var _this = this;
        /** @type {?} */
        var reader = new FileReader();
        reader.onload = (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            try {
                /** @type {?} */
                var context = _this.parseContextFromFile(file, event.target.result);
                observer.next(context);
            }
            catch (e) {
                observer.error(new ImportUnreadableFileError());
            }
            observer.complete();
        });
        reader.onerror = (/**
         * @param {?} evt
         * @return {?}
         */
        function (evt) {
            observer.error(new ImportUnreadableFileError());
        });
        reader.readAsText(file, 'UTF-8');
    };
    /**
     * @private
     * @param {?} file
     * @param {?} data
     * @return {?}
     */
    ContextImportService.prototype.parseContextFromFile = /**
     * @private
     * @param {?} file
     * @param {?} data
     * @return {?}
     */
    function (file, data) {
        /** @type {?} */
        var context = JSON.parse(data);
        return context;
    };
    ContextImportService.allowedMimeTypes = ['application/json'];
    ContextImportService.allowedExtensions = 'json';
    ContextImportService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    ContextImportService.ctorParameters = function () { return [
        { type: ConfigService }
    ]; };
    /** @nocollapse */ ContextImportService.ngInjectableDef = i0.defineInjectable({ factory: function ContextImportService_Factory() { return new ContextImportService(i0.inject(i1.ConfigService)); }, token: ContextImportService, providedIn: "root" });
    return ContextImportService;
}());
export { ContextImportService };
if (false) {
    /** @type {?} */
    ContextImportService.allowedMimeTypes;
    /** @type {?} */
    ContextImportService.allowedExtensions;
    /**
     * @type {?}
     * @private
     */
    ContextImportService.prototype.clientSideFileSizeMax;
    /**
     * @type {?}
     * @private
     */
    ContextImportService.prototype.config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1pbXBvcnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbnRleHQvIiwic291cmNlcyI6WyJsaWIvY29udGV4dC1pbXBvcnQtZXhwb3J0L3NoYXJlZC9jb250ZXh0LWltcG9ydC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFZLE1BQU0sTUFBTSxDQUFDO0FBQzVDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFFM0MsT0FBTyxFQUNMLHNCQUFzQixFQUN0Qix5QkFBeUIsRUFDekIsZUFBZSxFQUNoQixNQUFNLHlCQUF5QixDQUFDO0FBQ2pDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDOzs7QUFHMUQ7SUFVRSw4QkFBb0IsTUFBcUI7UUFBckIsV0FBTSxHQUFOLE1BQU0sQ0FBZTs7WUFDakMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQzVDLHNDQUFzQyxDQUN2QztRQUNELElBQUksQ0FBQyxxQkFBcUI7WUFDeEIsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ25FLENBQUM7Ozs7O0lBRUQscUNBQU07Ozs7SUFBTixVQUFPLElBQVU7UUFDZixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEMsQ0FBQzs7Ozs7O0lBRU8sOENBQWU7Ozs7O0lBQXZCLFVBQ0UsSUFBVTs7WUFPSixTQUFTLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDOztZQUNsQyxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUk7O1lBQ3BCLGdCQUFnQixvQkFBTyxv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Y29yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIE9ic2VydmVyIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuXHJcbmltcG9ydCB7XHJcbiAgSW1wb3J0SW52YWxpZEZpbGVFcnJvcixcclxuICBJbXBvcnRVbnJlYWRhYmxlRmlsZUVycm9yLFxyXG4gIEltcG9ydFNpemVFcnJvclxyXG59IGZyb20gJy4vY29udGV4dC1pbXBvcnQuZXJyb3JzJztcclxuaW1wb3J0IHsgZ2V0RmlsZUV4dGVuc2lvbiB9IGZyb20gJy4vY29udGV4dC1pbXBvcnQudXRpbHMnO1xyXG5pbXBvcnQgeyBEZXRhaWxlZENvbnRleHQgfSBmcm9tICcuLi8uLi9jb250ZXh0LW1hbmFnZXIvc2hhcmVkL2NvbnRleHQuaW50ZXJmYWNlJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIENvbnRleHRJbXBvcnRTZXJ2aWNlIHtcclxuICBzdGF0aWMgYWxsb3dlZE1pbWVUeXBlcyA9IFsnYXBwbGljYXRpb24vanNvbiddO1xyXG5cclxuICBzdGF0aWMgYWxsb3dlZEV4dGVuc2lvbnMgPSAnanNvbic7XHJcblxyXG4gIHByaXZhdGUgY2xpZW50U2lkZUZpbGVTaXplTWF4OiBudW1iZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29uZmlnOiBDb25maWdTZXJ2aWNlKSB7XHJcbiAgICBjb25zdCBjb25maWdGaWxlU2l6ZU1iID0gdGhpcy5jb25maWcuZ2V0Q29uZmlnKFxyXG4gICAgICAnaW1wb3J0RXhwb3J0LmNsaWVudFNpZGVGaWxlU2l6ZU1heE1iJ1xyXG4gICAgKTtcclxuICAgIHRoaXMuY2xpZW50U2lkZUZpbGVTaXplTWF4ID1cclxuICAgICAgKGNvbmZpZ0ZpbGVTaXplTWIgPyBjb25maWdGaWxlU2l6ZU1iIDogMzApICogTWF0aC5wb3coMTAyNCwgMik7XHJcbiAgfVxyXG5cclxuICBpbXBvcnQoZmlsZTogRmlsZSk6IE9ic2VydmFibGU8RGV0YWlsZWRDb250ZXh0PiB7XHJcbiAgICByZXR1cm4gdGhpcy5pbXBvcnRBc3luYyhmaWxlKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0RmlsZUltcG9ydGVyKFxyXG4gICAgZmlsZTogRmlsZVxyXG4gICk6IChcclxuICAgIGZpbGU6IEZpbGUsXHJcbiAgICBvYnNlcnZlcjogT2JzZXJ2ZXI8RGV0YWlsZWRDb250ZXh0PixcclxuICAgIHByb2plY3Rpb25Jbjogc3RyaW5nLFxyXG4gICAgcHJvamVjdGlvbk91dDogc3RyaW5nXHJcbiAgKSA9PiB2b2lkIHtcclxuICAgIGNvbnN0IGV4dGVuc2lvbiA9IGdldEZpbGVFeHRlbnNpb24oZmlsZSk7XHJcbiAgICBjb25zdCBtaW1lVHlwZSA9IGZpbGUudHlwZTtcclxuICAgIGNvbnN0IGFsbG93ZWRNaW1lVHlwZXMgPSBbLi4uQ29udGV4dEltcG9ydFNlcnZpY2UuYWxsb3dlZE1pbWVUeXBlc107XHJcbiAgICBjb25zdCBhbGxvd2VkRXh0ZW5zaW9ucyA9IENvbnRleHRJbXBvcnRTZXJ2aWNlLmFsbG93ZWRFeHRlbnNpb25zO1xyXG5cclxuICAgIGlmIChcclxuICAgICAgYWxsb3dlZE1pbWVUeXBlcy5pbmRleE9mKG1pbWVUeXBlKSA8IDAgJiZcclxuICAgICAgYWxsb3dlZEV4dGVuc2lvbnMuaW5kZXhPZihleHRlbnNpb24pIDwgMFxyXG4gICAgKSB7XHJcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9IGVsc2UgaWYgKFxyXG4gICAgICBtaW1lVHlwZSA9PT0gJ2FwcGxpY2F0aW9uL2pzb24nIHx8XHJcbiAgICAgIGV4dGVuc2lvbiA9PT0gQ29udGV4dEltcG9ydFNlcnZpY2UuYWxsb3dlZEV4dGVuc2lvbnNcclxuICAgICkge1xyXG4gICAgICByZXR1cm4gdGhpcy5pbXBvcnRGaWxlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW1wb3J0QXN5bmMoZmlsZTogRmlsZSk6IE9ic2VydmFibGU8RGV0YWlsZWRDb250ZXh0PiB7XHJcbiAgICBjb25zdCBkb0ltcG9ydCA9IChvYnNlcnZlcjogT2JzZXJ2ZXI8RGV0YWlsZWRDb250ZXh0PikgPT4ge1xyXG4gICAgICBpZiAoZmlsZS5zaXplID49IHRoaXMuY2xpZW50U2lkZUZpbGVTaXplTWF4KSB7XHJcbiAgICAgICAgb2JzZXJ2ZXIuZXJyb3IobmV3IEltcG9ydFNpemVFcnJvcigpKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgaW1wb3J0ZXIgPSB0aGlzLmdldEZpbGVJbXBvcnRlcihmaWxlKTtcclxuICAgICAgaWYgKGltcG9ydGVyID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBvYnNlcnZlci5lcnJvcihuZXcgSW1wb3J0SW52YWxpZEZpbGVFcnJvcigpKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGltcG9ydGVyLmNhbGwodGhpcywgZmlsZSwgb2JzZXJ2ZXIpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoZG9JbXBvcnQpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbXBvcnRGaWxlKGZpbGU6IEZpbGUsIG9ic2VydmVyOiBPYnNlcnZlcjxEZXRhaWxlZENvbnRleHQ+KSB7XHJcbiAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xyXG5cclxuICAgIHJlYWRlci5vbmxvYWQgPSAoZXZlbnQ6IGFueSkgPT4ge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLnBhcnNlQ29udGV4dEZyb21GaWxlKGZpbGUsIGV2ZW50LnRhcmdldC5yZXN1bHQpO1xyXG4gICAgICAgIG9ic2VydmVyLm5leHQoY29udGV4dCk7XHJcbiAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICBvYnNlcnZlci5lcnJvcihuZXcgSW1wb3J0VW5yZWFkYWJsZUZpbGVFcnJvcigpKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcclxuICAgIH07XHJcblxyXG4gICAgcmVhZGVyLm9uZXJyb3IgPSAoZXZ0KSA9PiB7XHJcbiAgICAgIG9ic2VydmVyLmVycm9yKG5ldyBJbXBvcnRVbnJlYWRhYmxlRmlsZUVycm9yKCkpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZWFkZXIucmVhZEFzVGV4dChmaWxlLCAnVVRGLTgnKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcGFyc2VDb250ZXh0RnJvbUZpbGUoZmlsZTogRmlsZSwgZGF0YTogc3RyaW5nKTogRGV0YWlsZWRDb250ZXh0IHtcclxuICAgIGNvbnN0IGNvbnRleHQ6IERldGFpbGVkQ29udGV4dCA9IEpTT04ucGFyc2UoZGF0YSk7XHJcbiAgICByZXR1cm4gY29udGV4dDtcclxuICB9XHJcbn1cclxuIl19