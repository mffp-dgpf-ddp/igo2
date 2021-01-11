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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1pbXBvcnQuZXJyb3JzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29udGV4dC8iLCJzb3VyY2VzIjpbImxpYi9jb250ZXh0LWltcG9ydC1leHBvcnQvc2hhcmVkL2NvbnRleHQtaW1wb3J0LmVycm9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBTSxPQUFPLFdBQVksU0FBUSxLQUFLO0NBQUc7QUFFekMsTUFBTSxPQUFPLHNCQUF1QixTQUFRLFdBQVc7SUFDckQ7UUFDRSxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDdEIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsc0JBQXNCLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDaEUsQ0FBQztDQUNGO0FBRUQsTUFBTSxPQUFPLHlCQUEwQixTQUFRLFdBQVc7SUFDeEQ7UUFDSSxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUM3QixNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSx5QkFBeUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNyRSxDQUFDO0NBQ0Y7QUFFRCxNQUFNLE9BQU8sMEJBQTJCLFNBQVEsV0FBVztJQUN6RDtRQUNJLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQzNCLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLDBCQUEwQixDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7Q0FDRjtBQUVELE1BQU0sT0FBTyxlQUFnQixTQUFRLFdBQVc7SUFDOUM7UUFDSSxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUMzQixNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSwwQkFBMEIsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN0RSxDQUFDO0NBQ0Y7QUFFRCxNQUFNLE9BQU8sY0FBZSxTQUFRLFdBQVc7SUFDN0M7UUFDSSxLQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQztRQUNoQyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSwwQkFBMEIsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN0RSxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgSW1wb3J0RXJyb3IgZXh0ZW5kcyBFcnJvciB7fVxyXG5cclxuZXhwb3J0IGNsYXNzIEltcG9ydEludmFsaWRGaWxlRXJyb3IgZXh0ZW5kcyBJbXBvcnRFcnJvciB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcignSW52YWxpZCBmaWxlJyk7XHJcbiAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YodGhpcywgSW1wb3J0SW52YWxpZEZpbGVFcnJvci5wcm90b3R5cGUpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEltcG9ydFVucmVhZGFibGVGaWxlRXJyb3IgZXh0ZW5kcyBJbXBvcnRFcnJvciB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgIHN1cGVyKCdGYWlsZWQgdG8gcmVhZCBmaWxlJyk7XHJcbiAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZih0aGlzLCBJbXBvcnRVbnJlYWRhYmxlRmlsZUVycm9yLnByb3RvdHlwZSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgSW1wb3J0Tm90aGluZ1RvSW1wb3J0RXJyb3IgZXh0ZW5kcyBJbXBvcnRFcnJvciB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgIHN1cGVyKCdOb3RoaW5nIHRvIGltcG9ydCcpO1xyXG4gICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YodGhpcywgSW1wb3J0Tm90aGluZ1RvSW1wb3J0RXJyb3IucHJvdG90eXBlKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBJbXBvcnRTaXplRXJyb3IgZXh0ZW5kcyBJbXBvcnRFcnJvciB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgIHN1cGVyKCdGaWxlIGlzIHRvbyBsYXJnZScpO1xyXG4gICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YodGhpcywgSW1wb3J0Tm90aGluZ1RvSW1wb3J0RXJyb3IucHJvdG90eXBlKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBJbXBvcnRTUlNFcnJvciBleHRlbmRzIEltcG9ydEVycm9yIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgc3VwZXIoJ0ludmFsaWQgU1JTIGRlZmluaXRpb24nKTtcclxuICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHRoaXMsIEltcG9ydE5vdGhpbmdUb0ltcG9ydEVycm9yLnByb3RvdHlwZSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==