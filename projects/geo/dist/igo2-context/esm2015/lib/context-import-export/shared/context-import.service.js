/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '@igo2/core';
import { ImportInvalidFileError, ImportUnreadableFileError, ImportSizeError } from './context-import.errors';
import { getFileExtension } from './context-import.utils';
import * as i0 from "@angular/core";
import * as i1 from "@igo2/core";
export class ContextImportService {
    /**
     * @param {?} config
     */
    constructor(config) {
        this.config = config;
        /** @type {?} */
        const configFileSizeMb = this.config.getConfig('importExport.clientSideFileSizeMaxMb');
        this.clientSideFileSizeMax =
            (configFileSizeMb ? configFileSizeMb : 30) * Math.pow(1024, 2);
    }
    /**
     * @param {?} file
     * @return {?}
     */
    import(file) {
        return this.importAsync(file);
    }
    /**
     * @private
     * @param {?} file
     * @return {?}
     */
    getFileImporter(file) {
        /** @type {?} */
        const extension = getFileExtension(file);
        /** @type {?} */
        const mimeType = file.type;
        /** @type {?} */
        const allowedMimeTypes = [...ContextImportService.allowedMimeTypes];
        /** @type {?} */
        const allowedExtensions = ContextImportService.allowedExtensions;
        if (allowedMimeTypes.indexOf(mimeType) < 0 &&
            allowedExtensions.indexOf(extension) < 0) {
            return undefined;
        }
        else if (mimeType === 'application/json' ||
            extension === ContextImportService.allowedExtensions) {
            return this.importFile;
        }
        return undefined;
    }
    /**
     * @private
     * @param {?} file
     * @return {?}
     */
    importAsync(file) {
        /** @type {?} */
        const doImport = (/**
         * @param {?} observer
         * @return {?}
         */
        (observer) => {
            if (file.size >= this.clientSideFileSizeMax) {
                observer.error(new ImportSizeError());
                return;
            }
            /** @type {?} */
            const importer = this.getFileImporter(file);
            if (importer === undefined) {
                observer.error(new ImportInvalidFileError());
                return;
            }
            importer.call(this, file, observer);
        });
        return new Observable(doImport);
    }
    /**
     * @private
     * @param {?} file
     * @param {?} observer
     * @return {?}
     */
    importFile(file, observer) {
        /** @type {?} */
        const reader = new FileReader();
        reader.onload = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            try {
                /** @type {?} */
                const context = this.parseContextFromFile(file, event.target.result);
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
        (evt) => {
            observer.error(new ImportUnreadableFileError());
        });
        reader.readAsText(file, 'UTF-8');
    }
    /**
     * @private
     * @param {?} file
     * @param {?} data
     * @return {?}
     */
    parseContextFromFile(file, data) {
        /** @type {?} */
        const context = JSON.parse(data);
        return context;
    }
}
ContextImportService.allowedMimeTypes = ['application/json'];
ContextImportService.allowedExtensions = 'json';
ContextImportService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
ContextImportService.ctorParameters = () => [
    { type: ConfigService }
];
/** @nocollapse */ ContextImportService.ngInjectableDef = i0.defineInjectable({ factory: function ContextImportService_Factory() { return new ContextImportService(i0.inject(i1.ConfigService)); }, token: ContextImportService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1pbXBvcnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbnRleHQvIiwic291cmNlcyI6WyJsaWIvY29udGV4dC1pbXBvcnQtZXhwb3J0L3NoYXJlZC9jb250ZXh0LWltcG9ydC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQVksTUFBTSxNQUFNLENBQUM7QUFDNUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUUzQyxPQUFPLEVBQ0wsc0JBQXNCLEVBQ3RCLHlCQUF5QixFQUN6QixlQUFlLEVBQ2hCLE1BQU0seUJBQXlCLENBQUM7QUFDakMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7OztBQU0xRCxNQUFNLE9BQU8sb0JBQW9COzs7O0lBTy9CLFlBQW9CLE1BQXFCO1FBQXJCLFdBQU0sR0FBTixNQUFNLENBQWU7O2NBQ2pDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUM1QyxzQ0FBc0MsQ0FDdkM7UUFDRCxJQUFJLENBQUMscUJBQXFCO1lBQ3hCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNuRSxDQUFDOzs7OztJQUVELE1BQU0sQ0FBQyxJQUFVO1FBQ2YsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hDLENBQUM7Ozs7OztJQUVPLGVBQWUsQ0FDckIsSUFBVTs7Y0FPSixTQUFTLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDOztjQUNsQyxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUk7O2NBQ3BCLGdCQUFnQixHQUFHLENBQUMsR0FBRyxvQkFBb0IsQ0FBQyxnQkFBZ0IsQ0FBQzs7Y0FDN0QsaUJBQWlCLEdBQUcsb0JBQW9CLENBQUMsaUJBQWlCO1FBRWhFLElBQ0UsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7WUFDdEMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFDeEM7WUFDQSxPQUFPLFNBQVMsQ0FBQztTQUNsQjthQUFNLElBQ0wsUUFBUSxLQUFLLGtCQUFrQjtZQUMvQixTQUFTLEtBQUssb0JBQW9CLENBQUMsaUJBQWlCLEVBQ3BEO1lBQ0EsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO1NBQ3hCO1FBQ0QsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQzs7Ozs7O0lBRU8sV0FBVyxDQUFDLElBQVU7O2NBQ3RCLFFBQVE7Ozs7UUFBRyxDQUFDLFFBQW1DLEVBQUUsRUFBRTtZQUN2RCxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLHFCQUFxQixFQUFFO2dCQUMzQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksZUFBZSxFQUFFLENBQUMsQ0FBQztnQkFDdEMsT0FBTzthQUNSOztrQkFDSyxRQUFRLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUM7WUFDM0MsSUFBSSxRQUFRLEtBQUssU0FBUyxFQUFFO2dCQUMxQixRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksc0JBQXNCLEVBQUUsQ0FBQyxDQUFDO2dCQUM3QyxPQUFPO2FBQ1I7WUFFRCxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDdEMsQ0FBQyxDQUFBO1FBRUQsT0FBTyxJQUFJLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNsQyxDQUFDOzs7Ozs7O0lBRU8sVUFBVSxDQUFDLElBQVUsRUFBRSxRQUFtQzs7Y0FDMUQsTUFBTSxHQUFHLElBQUksVUFBVSxFQUFFO1FBRS9CLE1BQU0sQ0FBQyxNQUFNOzs7O1FBQUcsQ0FBQyxLQUFVLEVBQUUsRUFBRTtZQUM3QixJQUFJOztzQkFDSSxPQUFPLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztnQkFDcEUsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUN4QjtZQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNWLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSx5QkFBeUIsRUFBRSxDQUFDLENBQUM7YUFDakQ7WUFFRCxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDdEIsQ0FBQyxDQUFBLENBQUM7UUFFRixNQUFNLENBQUMsT0FBTzs7OztRQUFHLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDdkIsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLHlCQUF5QixFQUFFLENBQUMsQ0FBQztRQUNsRCxDQUFDLENBQUEsQ0FBQztRQUVGLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ25DLENBQUM7Ozs7Ozs7SUFFTyxvQkFBb0IsQ0FBQyxJQUFVLEVBQUUsSUFBWTs7Y0FDN0MsT0FBTyxHQUFvQixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztRQUNqRCxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDOztBQXZGTSxxQ0FBZ0IsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFFeEMsc0NBQWlCLEdBQUcsTUFBTSxDQUFDOztZQU5uQyxVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7WUFaUSxhQUFhOzs7OztJQWNwQixzQ0FBK0M7O0lBRS9DLHVDQUFrQzs7Ozs7SUFFbEMscURBQXNDOzs7OztJQUUxQixzQ0FBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIE9ic2VydmVyIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICdAaWdvMi9jb3JlJztcclxuXHJcbmltcG9ydCB7XHJcbiAgSW1wb3J0SW52YWxpZEZpbGVFcnJvcixcclxuICBJbXBvcnRVbnJlYWRhYmxlRmlsZUVycm9yLFxyXG4gIEltcG9ydFNpemVFcnJvclxyXG59IGZyb20gJy4vY29udGV4dC1pbXBvcnQuZXJyb3JzJztcclxuaW1wb3J0IHsgZ2V0RmlsZUV4dGVuc2lvbiB9IGZyb20gJy4vY29udGV4dC1pbXBvcnQudXRpbHMnO1xyXG5pbXBvcnQgeyBEZXRhaWxlZENvbnRleHQgfSBmcm9tICcuLi8uLi9jb250ZXh0LW1hbmFnZXIvc2hhcmVkL2NvbnRleHQuaW50ZXJmYWNlJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIENvbnRleHRJbXBvcnRTZXJ2aWNlIHtcclxuICBzdGF0aWMgYWxsb3dlZE1pbWVUeXBlcyA9IFsnYXBwbGljYXRpb24vanNvbiddO1xyXG5cclxuICBzdGF0aWMgYWxsb3dlZEV4dGVuc2lvbnMgPSAnanNvbic7XHJcblxyXG4gIHByaXZhdGUgY2xpZW50U2lkZUZpbGVTaXplTWF4OiBudW1iZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29uZmlnOiBDb25maWdTZXJ2aWNlKSB7XHJcbiAgICBjb25zdCBjb25maWdGaWxlU2l6ZU1iID0gdGhpcy5jb25maWcuZ2V0Q29uZmlnKFxyXG4gICAgICAnaW1wb3J0RXhwb3J0LmNsaWVudFNpZGVGaWxlU2l6ZU1heE1iJ1xyXG4gICAgKTtcclxuICAgIHRoaXMuY2xpZW50U2lkZUZpbGVTaXplTWF4ID1cclxuICAgICAgKGNvbmZpZ0ZpbGVTaXplTWIgPyBjb25maWdGaWxlU2l6ZU1iIDogMzApICogTWF0aC5wb3coMTAyNCwgMik7XHJcbiAgfVxyXG5cclxuICBpbXBvcnQoZmlsZTogRmlsZSk6IE9ic2VydmFibGU8RGV0YWlsZWRDb250ZXh0PiB7XHJcbiAgICByZXR1cm4gdGhpcy5pbXBvcnRBc3luYyhmaWxlKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0RmlsZUltcG9ydGVyKFxyXG4gICAgZmlsZTogRmlsZVxyXG4gICk6IChcclxuICAgIGZpbGU6IEZpbGUsXHJcbiAgICBvYnNlcnZlcjogT2JzZXJ2ZXI8RGV0YWlsZWRDb250ZXh0PixcclxuICAgIHByb2plY3Rpb25Jbjogc3RyaW5nLFxyXG4gICAgcHJvamVjdGlvbk91dDogc3RyaW5nXHJcbiAgKSA9PiB2b2lkIHtcclxuICAgIGNvbnN0IGV4dGVuc2lvbiA9IGdldEZpbGVFeHRlbnNpb24oZmlsZSk7XHJcbiAgICBjb25zdCBtaW1lVHlwZSA9IGZpbGUudHlwZTtcclxuICAgIGNvbnN0IGFsbG93ZWRNaW1lVHlwZXMgPSBbLi4uQ29udGV4dEltcG9ydFNlcnZpY2UuYWxsb3dlZE1pbWVUeXBlc107XHJcbiAgICBjb25zdCBhbGxvd2VkRXh0ZW5zaW9ucyA9IENvbnRleHRJbXBvcnRTZXJ2aWNlLmFsbG93ZWRFeHRlbnNpb25zO1xyXG5cclxuICAgIGlmIChcclxuICAgICAgYWxsb3dlZE1pbWVUeXBlcy5pbmRleE9mKG1pbWVUeXBlKSA8IDAgJiZcclxuICAgICAgYWxsb3dlZEV4dGVuc2lvbnMuaW5kZXhPZihleHRlbnNpb24pIDwgMFxyXG4gICAgKSB7XHJcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9IGVsc2UgaWYgKFxyXG4gICAgICBtaW1lVHlwZSA9PT0gJ2FwcGxpY2F0aW9uL2pzb24nIHx8XHJcbiAgICAgIGV4dGVuc2lvbiA9PT0gQ29udGV4dEltcG9ydFNlcnZpY2UuYWxsb3dlZEV4dGVuc2lvbnNcclxuICAgICkge1xyXG4gICAgICByZXR1cm4gdGhpcy5pbXBvcnRGaWxlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW1wb3J0QXN5bmMoZmlsZTogRmlsZSk6IE9ic2VydmFibGU8RGV0YWlsZWRDb250ZXh0PiB7XHJcbiAgICBjb25zdCBkb0ltcG9ydCA9IChvYnNlcnZlcjogT2JzZXJ2ZXI8RGV0YWlsZWRDb250ZXh0PikgPT4ge1xyXG4gICAgICBpZiAoZmlsZS5zaXplID49IHRoaXMuY2xpZW50U2lkZUZpbGVTaXplTWF4KSB7XHJcbiAgICAgICAgb2JzZXJ2ZXIuZXJyb3IobmV3IEltcG9ydFNpemVFcnJvcigpKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgaW1wb3J0ZXIgPSB0aGlzLmdldEZpbGVJbXBvcnRlcihmaWxlKTtcclxuICAgICAgaWYgKGltcG9ydGVyID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBvYnNlcnZlci5lcnJvcihuZXcgSW1wb3J0SW52YWxpZEZpbGVFcnJvcigpKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGltcG9ydGVyLmNhbGwodGhpcywgZmlsZSwgb2JzZXJ2ZXIpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoZG9JbXBvcnQpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbXBvcnRGaWxlKGZpbGU6IEZpbGUsIG9ic2VydmVyOiBPYnNlcnZlcjxEZXRhaWxlZENvbnRleHQ+KSB7XHJcbiAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xyXG5cclxuICAgIHJlYWRlci5vbmxvYWQgPSAoZXZlbnQ6IGFueSkgPT4ge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLnBhcnNlQ29udGV4dEZyb21GaWxlKGZpbGUsIGV2ZW50LnRhcmdldC5yZXN1bHQpO1xyXG4gICAgICAgIG9ic2VydmVyLm5leHQoY29udGV4dCk7XHJcbiAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICBvYnNlcnZlci5lcnJvcihuZXcgSW1wb3J0VW5yZWFkYWJsZUZpbGVFcnJvcigpKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcclxuICAgIH07XHJcblxyXG4gICAgcmVhZGVyLm9uZXJyb3IgPSAoZXZ0KSA9PiB7XHJcbiAgICAgIG9ic2VydmVyLmVycm9yKG5ldyBJbXBvcnRVbnJlYWRhYmxlRmlsZUVycm9yKCkpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZWFkZXIucmVhZEFzVGV4dChmaWxlLCAnVVRGLTgnKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcGFyc2VDb250ZXh0RnJvbUZpbGUoZmlsZTogRmlsZSwgZGF0YTogc3RyaW5nKTogRGV0YWlsZWRDb250ZXh0IHtcclxuICAgIGNvbnN0IGNvbnRleHQ6IERldGFpbGVkQ29udGV4dCA9IEpTT04ucGFyc2UoZGF0YSk7XHJcbiAgICByZXR1cm4gY29udGV4dDtcclxuICB9XHJcbn1cclxuIl19