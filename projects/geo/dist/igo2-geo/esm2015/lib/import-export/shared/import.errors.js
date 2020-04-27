/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class ImportError extends Error {
}
export class ImportInvalidFileError extends ImportError {
    constructor() {
        super('Invalid file');
        Object.setPrototypeOf(this, ImportInvalidFileError.prototype);
    }
}
export class ImportUnreadableFileError extends ImportError {
    constructor() {
        super('Failed to read file');
        Object.setPrototypeOf(this, ImportUnreadableFileError.prototype);
    }
}
export class ImportNothingToImportError extends ImportError {
    constructor() {
        super('Nothing to import');
        Object.setPrototypeOf(this, ImportNothingToImportError.prototype);
    }
}
export class ImportSizeError extends ImportError {
    constructor() {
        super('File is too large');
        Object.setPrototypeOf(this, ImportNothingToImportError.prototype);
    }
}
export class ImportSRSError extends ImportError {
    constructor() {
        super('Invalid SRS definition');
        Object.setPrototypeOf(this, ImportNothingToImportError.prototype);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0LmVycm9ycy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9pbXBvcnQtZXhwb3J0L3NoYXJlZC9pbXBvcnQuZXJyb3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNLE9BQU8sV0FBWSxTQUFRLEtBQUs7Q0FBRztBQUV6QyxNQUFNLE9BQU8sc0JBQXVCLFNBQVEsV0FBVztJQUNyRDtRQUNFLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUN0QixNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxzQkFBc0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNoRSxDQUFDO0NBQ0Y7QUFFRCxNQUFNLE9BQU8seUJBQTBCLFNBQVEsV0FBVztJQUN4RDtRQUNJLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQzdCLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLHlCQUF5QixDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7Q0FDRjtBQUVELE1BQU0sT0FBTywwQkFBMkIsU0FBUSxXQUFXO0lBQ3pEO1FBQ0ksS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDM0IsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsMEJBQTBCLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDdEUsQ0FBQztDQUNGO0FBRUQsTUFBTSxPQUFPLGVBQWdCLFNBQVEsV0FBVztJQUM5QztRQUNJLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQzNCLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLDBCQUEwQixDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7Q0FDRjtBQUVELE1BQU0sT0FBTyxjQUFlLFNBQVEsV0FBVztJQUM3QztRQUNJLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQ2hDLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLDBCQUEwQixDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBJbXBvcnRFcnJvciBleHRlbmRzIEVycm9yIHt9XHJcblxyXG5leHBvcnQgY2xhc3MgSW1wb3J0SW52YWxpZEZpbGVFcnJvciBleHRlbmRzIEltcG9ydEVycm9yIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKCdJbnZhbGlkIGZpbGUnKTtcclxuICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZih0aGlzLCBJbXBvcnRJbnZhbGlkRmlsZUVycm9yLnByb3RvdHlwZSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgSW1wb3J0VW5yZWFkYWJsZUZpbGVFcnJvciBleHRlbmRzIEltcG9ydEVycm9yIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgc3VwZXIoJ0ZhaWxlZCB0byByZWFkIGZpbGUnKTtcclxuICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHRoaXMsIEltcG9ydFVucmVhZGFibGVGaWxlRXJyb3IucHJvdG90eXBlKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBJbXBvcnROb3RoaW5nVG9JbXBvcnRFcnJvciBleHRlbmRzIEltcG9ydEVycm9yIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgc3VwZXIoJ05vdGhpbmcgdG8gaW1wb3J0Jyk7XHJcbiAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZih0aGlzLCBJbXBvcnROb3RoaW5nVG9JbXBvcnRFcnJvci5wcm90b3R5cGUpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEltcG9ydFNpemVFcnJvciBleHRlbmRzIEltcG9ydEVycm9yIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgc3VwZXIoJ0ZpbGUgaXMgdG9vIGxhcmdlJyk7XHJcbiAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZih0aGlzLCBJbXBvcnROb3RoaW5nVG9JbXBvcnRFcnJvci5wcm90b3R5cGUpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEltcG9ydFNSU0Vycm9yIGV4dGVuZHMgSW1wb3J0RXJyb3Ige1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICBzdXBlcignSW52YWxpZCBTUlMgZGVmaW5pdGlvbicpO1xyXG4gICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YodGhpcywgSW1wb3J0Tm90aGluZ1RvSW1wb3J0RXJyb3IucHJvdG90eXBlKTtcclxuICB9XHJcbn1cclxuIl19