/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/* tslint:disable */
// See this issue: https://github.com/Microsoft/TypeScript/issues/13965
// And the solution: https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
// for an explanation as to why the prototype is set manually
/* tslint:enable */
var GeometrySliceError = /** @class */ (function (_super) {
    tslib_1.__extends(GeometrySliceError, _super);
    function GeometrySliceError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return GeometrySliceError;
}(Error));
export { GeometrySliceError };
var GeometrySliceMultiPolygonError = /** @class */ (function (_super) {
    tslib_1.__extends(GeometrySliceMultiPolygonError, _super);
    function GeometrySliceMultiPolygonError() {
        var _this = _super.call(this, 'Can\'t slice a MultiPolygon.') || this;
        Object.setPrototypeOf(_this, GeometrySliceMultiPolygonError.prototype);
        return _this;
    }
    return GeometrySliceMultiPolygonError;
}(GeometrySliceError));
export { GeometrySliceMultiPolygonError };
var GeometrySliceLineStringError = /** @class */ (function (_super) {
    tslib_1.__extends(GeometrySliceLineStringError, _super);
    function GeometrySliceLineStringError() {
        var _this = _super.call(this, 'Can\'t slice with a line that has more than 2 points.') || this;
        Object.setPrototypeOf(_this, GeometrySliceLineStringError.prototype);
        return _this;
    }
    return GeometrySliceLineStringError;
}(GeometrySliceError));
export { GeometrySliceLineStringError };
var GeometrySliceTooManyIntersectionError = /** @class */ (function (_super) {
    tslib_1.__extends(GeometrySliceTooManyIntersectionError, _super);
    function GeometrySliceTooManyIntersectionError() {
        var _this = _super.call(this, 'More than 2 intersections found between the target polygon and the slicing line.') || this;
        Object.setPrototypeOf(_this, GeometrySliceTooManyIntersectionError.prototype);
        return _this;
    }
    return GeometrySliceTooManyIntersectionError;
}(GeometrySliceError));
export { GeometrySliceTooManyIntersectionError };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvbWV0cnkuZXJyb3JzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2dlb21ldHJ5L3NoYXJlZC9nZW9tZXRyeS5lcnJvcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQU1BO0lBQXdDLDhDQUFLO0lBQTdDOztJQUErQyxDQUFDO0lBQUQseUJBQUM7QUFBRCxDQUFDLEFBQWhELENBQXdDLEtBQUssR0FBRzs7QUFFaEQ7SUFBb0QsMERBQWtCO0lBQ3BFO1FBQUEsWUFDRSxrQkFBTSw4QkFBOEIsQ0FBQyxTQUV0QztRQURDLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSSxFQUFFLDhCQUE4QixDQUFDLFNBQVMsQ0FBQyxDQUFDOztJQUN4RSxDQUFDO0lBQ0gscUNBQUM7QUFBRCxDQUFDLEFBTEQsQ0FBb0Qsa0JBQWtCLEdBS3JFOztBQUVEO0lBQWtELHdEQUFrQjtJQUNsRTtRQUFBLFlBQ0Usa0JBQU0sdURBQXVELENBQUMsU0FFL0Q7UUFEQyxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUksRUFBRSw0QkFBNEIsQ0FBQyxTQUFTLENBQUMsQ0FBQzs7SUFDdEUsQ0FBQztJQUNILG1DQUFDO0FBQUQsQ0FBQyxBQUxELENBQWtELGtCQUFrQixHQUtuRTs7QUFFRDtJQUEyRCxpRUFBa0I7SUFDM0U7UUFBQSxZQUNFLGtCQUFNLGtGQUFrRixDQUFDLFNBRTFGO1FBREMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFJLEVBQUUscUNBQXFDLENBQUMsU0FBUyxDQUFDLENBQUM7O0lBQy9FLENBQUM7SUFDSCw0Q0FBQztBQUFELENBQUMsQUFMRCxDQUEyRCxrQkFBa0IsR0FLNUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xyXG4vLyBTZWUgdGhpcyBpc3N1ZTogaHR0cHM6Ly9naXRodWIuY29tL01pY3Jvc29mdC9UeXBlU2NyaXB0L2lzc3Vlcy8xMzk2NVxyXG4vLyBBbmQgdGhlIHNvbHV0aW9uOiBodHRwczovL2dpdGh1Yi5jb20vTWljcm9zb2Z0L1R5cGVTY3JpcHQvd2lraS9CcmVha2luZy1DaGFuZ2VzI2V4dGVuZGluZy1idWlsdC1pbnMtbGlrZS1lcnJvci1hcnJheS1hbmQtbWFwLW1heS1uby1sb25nZXItd29ya1xyXG4vLyBmb3IgYW4gZXhwbGFuYXRpb24gYXMgdG8gd2h5IHRoZSBwcm90b3R5cGUgaXMgc2V0IG1hbnVhbGx5XHJcbi8qIHRzbGludDplbmFibGUgKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBHZW9tZXRyeVNsaWNlRXJyb3IgZXh0ZW5kcyBFcnJvciB7fVxyXG5cclxuZXhwb3J0IGNsYXNzIEdlb21ldHJ5U2xpY2VNdWx0aVBvbHlnb25FcnJvciBleHRlbmRzIEdlb21ldHJ5U2xpY2VFcnJvciB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcignQ2FuXFwndCBzbGljZSBhIE11bHRpUG9seWdvbi4nKTtcclxuICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZih0aGlzLCBHZW9tZXRyeVNsaWNlTXVsdGlQb2x5Z29uRXJyb3IucHJvdG90eXBlKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBHZW9tZXRyeVNsaWNlTGluZVN0cmluZ0Vycm9yIGV4dGVuZHMgR2VvbWV0cnlTbGljZUVycm9yIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKCdDYW5cXCd0IHNsaWNlIHdpdGggYSBsaW5lIHRoYXQgaGFzIG1vcmUgdGhhbiAyIHBvaW50cy4nKTtcclxuICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZih0aGlzLCBHZW9tZXRyeVNsaWNlTGluZVN0cmluZ0Vycm9yLnByb3RvdHlwZSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgR2VvbWV0cnlTbGljZVRvb01hbnlJbnRlcnNlY3Rpb25FcnJvciBleHRlbmRzIEdlb21ldHJ5U2xpY2VFcnJvciB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcignTW9yZSB0aGFuIDIgaW50ZXJzZWN0aW9ucyBmb3VuZCBiZXR3ZWVuIHRoZSB0YXJnZXQgcG9seWdvbiBhbmQgdGhlIHNsaWNpbmcgbGluZS4nKTtcclxuICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZih0aGlzLCBHZW9tZXRyeVNsaWNlVG9vTWFueUludGVyc2VjdGlvbkVycm9yLnByb3RvdHlwZSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==