/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
var ImportError = /** @class */ (function (_super) {
    tslib_1.__extends(ImportError, _super);
    function ImportError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ImportError;
}(Error));
export { ImportError };
var ImportInvalidFileError = /** @class */ (function (_super) {
    tslib_1.__extends(ImportInvalidFileError, _super);
    function ImportInvalidFileError() {
        var _this = _super.call(this, 'Invalid file') || this;
        Object.setPrototypeOf(_this, ImportInvalidFileError.prototype);
        return _this;
    }
    return ImportInvalidFileError;
}(ImportError));
export { ImportInvalidFileError };
var ImportUnreadableFileError = /** @class */ (function (_super) {
    tslib_1.__extends(ImportUnreadableFileError, _super);
    function ImportUnreadableFileError() {
        var _this = _super.call(this, 'Failed to read file') || this;
        Object.setPrototypeOf(_this, ImportUnreadableFileError.prototype);
        return _this;
    }
    return ImportUnreadableFileError;
}(ImportError));
export { ImportUnreadableFileError };
var ImportNothingToImportError = /** @class */ (function (_super) {
    tslib_1.__extends(ImportNothingToImportError, _super);
    function ImportNothingToImportError() {
        var _this = _super.call(this, 'Nothing to import') || this;
        Object.setPrototypeOf(_this, ImportNothingToImportError.prototype);
        return _this;
    }
    return ImportNothingToImportError;
}(ImportError));
export { ImportNothingToImportError };
var ImportSizeError = /** @class */ (function (_super) {
    tslib_1.__extends(ImportSizeError, _super);
    function ImportSizeError() {
        var _this = _super.call(this, 'File is too large') || this;
        Object.setPrototypeOf(_this, ImportNothingToImportError.prototype);
        return _this;
    }
    return ImportSizeError;
}(ImportError));
export { ImportSizeError };
var ImportSRSError = /** @class */ (function (_super) {
    tslib_1.__extends(ImportSRSError, _super);
    function ImportSRSError() {
        var _this = _super.call(this, 'Invalid SRS definition') || this;
        Object.setPrototypeOf(_this, ImportNothingToImportError.prototype);
        return _this;
    }
    return ImportSRSError;
}(ImportError));
export { ImportSRSError };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1pbXBvcnQuZXJyb3JzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvY29udGV4dC8iLCJzb3VyY2VzIjpbImxpYi9jb250ZXh0LWltcG9ydC1leHBvcnQvc2hhcmVkL2NvbnRleHQtaW1wb3J0LmVycm9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0lBQWlDLHVDQUFLO0lBQXRDOztJQUF3QyxDQUFDO0lBQUQsa0JBQUM7QUFBRCxDQUFDLEFBQXpDLENBQWlDLEtBQUssR0FBRzs7QUFFekM7SUFBNEMsa0RBQVc7SUFDckQ7UUFBQSxZQUNFLGtCQUFNLGNBQWMsQ0FBQyxTQUV0QjtRQURDLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSSxFQUFFLHNCQUFzQixDQUFDLFNBQVMsQ0FBQyxDQUFDOztJQUNoRSxDQUFDO0lBQ0gsNkJBQUM7QUFBRCxDQUFDLEFBTEQsQ0FBNEMsV0FBVyxHQUt0RDs7QUFFRDtJQUErQyxxREFBVztJQUN4RDtRQUFBLFlBQ0ksa0JBQU0scUJBQXFCLENBQUMsU0FFL0I7UUFERyxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUksRUFBRSx5QkFBeUIsQ0FBQyxTQUFTLENBQUMsQ0FBQzs7SUFDckUsQ0FBQztJQUNILGdDQUFDO0FBQUQsQ0FBQyxBQUxELENBQStDLFdBQVcsR0FLekQ7O0FBRUQ7SUFBZ0Qsc0RBQVc7SUFDekQ7UUFBQSxZQUNJLGtCQUFNLG1CQUFtQixDQUFDLFNBRTdCO1FBREcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFJLEVBQUUsMEJBQTBCLENBQUMsU0FBUyxDQUFDLENBQUM7O0lBQ3RFLENBQUM7SUFDSCxpQ0FBQztBQUFELENBQUMsQUFMRCxDQUFnRCxXQUFXLEdBSzFEOztBQUVEO0lBQXFDLDJDQUFXO0lBQzlDO1FBQUEsWUFDSSxrQkFBTSxtQkFBbUIsQ0FBQyxTQUU3QjtRQURHLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSSxFQUFFLDBCQUEwQixDQUFDLFNBQVMsQ0FBQyxDQUFDOztJQUN0RSxDQUFDO0lBQ0gsc0JBQUM7QUFBRCxDQUFDLEFBTEQsQ0FBcUMsV0FBVyxHQUsvQzs7QUFFRDtJQUFvQywwQ0FBVztJQUM3QztRQUFBLFlBQ0ksa0JBQU0sd0JBQXdCLENBQUMsU0FFbEM7UUFERyxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUksRUFBRSwwQkFBMEIsQ0FBQyxTQUFTLENBQUMsQ0FBQzs7SUFDdEUsQ0FBQztJQUNILHFCQUFDO0FBQUQsQ0FBQyxBQUxELENBQW9DLFdBQVcsR0FLOUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgSW1wb3J0RXJyb3IgZXh0ZW5kcyBFcnJvciB7fVxyXG5cclxuZXhwb3J0IGNsYXNzIEltcG9ydEludmFsaWRGaWxlRXJyb3IgZXh0ZW5kcyBJbXBvcnRFcnJvciB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcignSW52YWxpZCBmaWxlJyk7XHJcbiAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YodGhpcywgSW1wb3J0SW52YWxpZEZpbGVFcnJvci5wcm90b3R5cGUpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEltcG9ydFVucmVhZGFibGVGaWxlRXJyb3IgZXh0ZW5kcyBJbXBvcnRFcnJvciB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgIHN1cGVyKCdGYWlsZWQgdG8gcmVhZCBmaWxlJyk7XHJcbiAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZih0aGlzLCBJbXBvcnRVbnJlYWRhYmxlRmlsZUVycm9yLnByb3RvdHlwZSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgSW1wb3J0Tm90aGluZ1RvSW1wb3J0RXJyb3IgZXh0ZW5kcyBJbXBvcnRFcnJvciB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgIHN1cGVyKCdOb3RoaW5nIHRvIGltcG9ydCcpO1xyXG4gICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YodGhpcywgSW1wb3J0Tm90aGluZ1RvSW1wb3J0RXJyb3IucHJvdG90eXBlKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBJbXBvcnRTaXplRXJyb3IgZXh0ZW5kcyBJbXBvcnRFcnJvciB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgIHN1cGVyKCdGaWxlIGlzIHRvbyBsYXJnZScpO1xyXG4gICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YodGhpcywgSW1wb3J0Tm90aGluZ1RvSW1wb3J0RXJyb3IucHJvdG90eXBlKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBJbXBvcnRTUlNFcnJvciBleHRlbmRzIEltcG9ydEVycm9yIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgc3VwZXIoJ0ludmFsaWQgU1JTIGRlZmluaXRpb24nKTtcclxuICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHRoaXMsIEltcG9ydE5vdGhpbmdUb0ltcG9ydEVycm9yLnByb3RvdHlwZSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==