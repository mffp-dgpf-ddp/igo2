/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/* tslint:disable */
// See this issue: https://github.com/Microsoft/TypeScript/issues/13965
// And the solution: https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
// for an explanation as to why the prototype is set manually
/* tslint:enable */
export class GeometrySliceError extends Error {
}
export class GeometrySliceMultiPolygonError extends GeometrySliceError {
    constructor() {
        super('Can\'t slice a MultiPolygon.');
        Object.setPrototypeOf(this, GeometrySliceMultiPolygonError.prototype);
    }
}
export class GeometrySliceLineStringError extends GeometrySliceError {
    constructor() {
        super('Can\'t slice with a line that has more than 2 points.');
        Object.setPrototypeOf(this, GeometrySliceLineStringError.prototype);
    }
}
export class GeometrySliceTooManyIntersectionError extends GeometrySliceError {
    constructor() {
        super('More than 2 intersections found between the target polygon and the slicing line.');
        Object.setPrototypeOf(this, GeometrySliceTooManyIntersectionError.prototype);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvbWV0cnkuZXJyb3JzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvZ2VvLyIsInNvdXJjZXMiOlsibGliL2dlb21ldHJ5L3NoYXJlZC9nZW9tZXRyeS5lcnJvcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBTUEsTUFBTSxPQUFPLGtCQUFtQixTQUFRLEtBQUs7Q0FBRztBQUVoRCxNQUFNLE9BQU8sOEJBQStCLFNBQVEsa0JBQWtCO0lBQ3BFO1FBQ0UsS0FBSyxDQUFDLDhCQUE4QixDQUFDLENBQUM7UUFDdEMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsOEJBQThCLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDeEUsQ0FBQztDQUNGO0FBRUQsTUFBTSxPQUFPLDRCQUE2QixTQUFRLGtCQUFrQjtJQUNsRTtRQUNFLEtBQUssQ0FBQyx1REFBdUQsQ0FBQyxDQUFDO1FBQy9ELE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLDRCQUE0QixDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7Q0FDRjtBQUVELE1BQU0sT0FBTyxxQ0FBc0MsU0FBUSxrQkFBa0I7SUFDM0U7UUFDRSxLQUFLLENBQUMsa0ZBQWtGLENBQUMsQ0FBQztRQUMxRixNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxxQ0FBcUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMvRSxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xyXG4vLyBTZWUgdGhpcyBpc3N1ZTogaHR0cHM6Ly9naXRodWIuY29tL01pY3Jvc29mdC9UeXBlU2NyaXB0L2lzc3Vlcy8xMzk2NVxyXG4vLyBBbmQgdGhlIHNvbHV0aW9uOiBodHRwczovL2dpdGh1Yi5jb20vTWljcm9zb2Z0L1R5cGVTY3JpcHQvd2lraS9CcmVha2luZy1DaGFuZ2VzI2V4dGVuZGluZy1idWlsdC1pbnMtbGlrZS1lcnJvci1hcnJheS1hbmQtbWFwLW1heS1uby1sb25nZXItd29ya1xyXG4vLyBmb3IgYW4gZXhwbGFuYXRpb24gYXMgdG8gd2h5IHRoZSBwcm90b3R5cGUgaXMgc2V0IG1hbnVhbGx5XHJcbi8qIHRzbGludDplbmFibGUgKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBHZW9tZXRyeVNsaWNlRXJyb3IgZXh0ZW5kcyBFcnJvciB7fVxyXG5cclxuZXhwb3J0IGNsYXNzIEdlb21ldHJ5U2xpY2VNdWx0aVBvbHlnb25FcnJvciBleHRlbmRzIEdlb21ldHJ5U2xpY2VFcnJvciB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcignQ2FuXFwndCBzbGljZSBhIE11bHRpUG9seWdvbi4nKTtcclxuICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZih0aGlzLCBHZW9tZXRyeVNsaWNlTXVsdGlQb2x5Z29uRXJyb3IucHJvdG90eXBlKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBHZW9tZXRyeVNsaWNlTGluZVN0cmluZ0Vycm9yIGV4dGVuZHMgR2VvbWV0cnlTbGljZUVycm9yIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKCdDYW5cXCd0IHNsaWNlIHdpdGggYSBsaW5lIHRoYXQgaGFzIG1vcmUgdGhhbiAyIHBvaW50cy4nKTtcclxuICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZih0aGlzLCBHZW9tZXRyeVNsaWNlTGluZVN0cmluZ0Vycm9yLnByb3RvdHlwZSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgR2VvbWV0cnlTbGljZVRvb01hbnlJbnRlcnNlY3Rpb25FcnJvciBleHRlbmRzIEdlb21ldHJ5U2xpY2VFcnJvciB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcignTW9yZSB0aGFuIDIgaW50ZXJzZWN0aW9ucyBmb3VuZCBiZXR3ZWVuIHRoZSB0YXJnZXQgcG9seWdvbiBhbmQgdGhlIHNsaWNpbmcgbGluZS4nKTtcclxuICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZih0aGlzLCBHZW9tZXRyeVNsaWNlVG9vTWFueUludGVyc2VjdGlvbkVycm9yLnByb3RvdHlwZSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==