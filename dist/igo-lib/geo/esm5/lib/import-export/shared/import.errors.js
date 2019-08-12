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
        var _this = _super.call(this, 'Invalid file.') || this;
        Object.setPrototypeOf(_this, ImportInvalidFileError.prototype);
        return _this;
    }
    return ImportInvalidFileError;
}(ImportError));
export { ImportInvalidFileError };
var ImportUnreadableFileError = /** @class */ (function (_super) {
    tslib_1.__extends(ImportUnreadableFileError, _super);
    function ImportUnreadableFileError() {
        var _this = _super.call(this, 'Failed to read file.') || this;
        Object.setPrototypeOf(_this, ImportUnreadableFileError.prototype);
        return _this;
    }
    return ImportUnreadableFileError;
}(ImportError));
export { ImportUnreadableFileError };
var ImportNothingToImportError = /** @class */ (function (_super) {
    tslib_1.__extends(ImportNothingToImportError, _super);
    function ImportNothingToImportError() {
        var _this = _super.call(this, 'Nothing to import.') || this;
        Object.setPrototypeOf(_this, ImportNothingToImportError.prototype);
        return _this;
    }
    return ImportNothingToImportError;
}(ImportError));
export { ImportNothingToImportError };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0LmVycm9ycy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2dlby8iLCJzb3VyY2VzIjpbImxpYi9pbXBvcnQtZXhwb3J0L3NoYXJlZC9pbXBvcnQuZXJyb3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7SUFBaUMsdUNBQUs7SUFBdEM7O0lBQXdDLENBQUM7SUFBRCxrQkFBQztBQUFELENBQUMsQUFBekMsQ0FBaUMsS0FBSyxHQUFHOztBQUV6QztJQUE0QyxrREFBVztJQUNyRDtRQUFBLFlBQ0Usa0JBQU0sZUFBZSxDQUFDLFNBRXZCO1FBREMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFJLEVBQUUsc0JBQXNCLENBQUMsU0FBUyxDQUFDLENBQUM7O0lBQ2hFLENBQUM7SUFDSCw2QkFBQztBQUFELENBQUMsQUFMRCxDQUE0QyxXQUFXLEdBS3REOztBQUVEO0lBQStDLHFEQUFXO0lBQ3hEO1FBQUEsWUFDSSxrQkFBTSxzQkFBc0IsQ0FBQyxTQUVoQztRQURHLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSSxFQUFFLHlCQUF5QixDQUFDLFNBQVMsQ0FBQyxDQUFDOztJQUNyRSxDQUFDO0lBQ0gsZ0NBQUM7QUFBRCxDQUFDLEFBTEQsQ0FBK0MsV0FBVyxHQUt6RDs7QUFFRDtJQUFnRCxzREFBVztJQUN6RDtRQUFBLFlBQ0ksa0JBQU0sb0JBQW9CLENBQUMsU0FFOUI7UUFERyxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUksRUFBRSwwQkFBMEIsQ0FBQyxTQUFTLENBQUMsQ0FBQzs7SUFDdEUsQ0FBQztJQUNILGlDQUFDO0FBQUQsQ0FBQyxBQUxELENBQWdELFdBQVcsR0FLMUQiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgSW1wb3J0RXJyb3IgZXh0ZW5kcyBFcnJvciB7fVxyXG5cclxuZXhwb3J0IGNsYXNzIEltcG9ydEludmFsaWRGaWxlRXJyb3IgZXh0ZW5kcyBJbXBvcnRFcnJvciB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcignSW52YWxpZCBmaWxlLicpO1xyXG4gICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHRoaXMsIEltcG9ydEludmFsaWRGaWxlRXJyb3IucHJvdG90eXBlKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBJbXBvcnRVbnJlYWRhYmxlRmlsZUVycm9yIGV4dGVuZHMgSW1wb3J0RXJyb3Ige1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICBzdXBlcignRmFpbGVkIHRvIHJlYWQgZmlsZS4nKTtcclxuICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHRoaXMsIEltcG9ydFVucmVhZGFibGVGaWxlRXJyb3IucHJvdG90eXBlKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBJbXBvcnROb3RoaW5nVG9JbXBvcnRFcnJvciBleHRlbmRzIEltcG9ydEVycm9yIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgc3VwZXIoJ05vdGhpbmcgdG8gaW1wb3J0LicpO1xyXG4gICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YodGhpcywgSW1wb3J0Tm90aGluZ1RvSW1wb3J0RXJyb3IucHJvdG90eXBlKTtcclxuICB9XHJcbn1cclxuIl19