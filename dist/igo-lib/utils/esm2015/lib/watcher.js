/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Subject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
/** @enum {number} */
const SubjectStatus = {
    Error: 0,
    Done: 1,
    Working: 2,
    Waiting: 3,
};
export { SubjectStatus };
SubjectStatus[SubjectStatus.Error] = 'Error';
SubjectStatus[SubjectStatus.Done] = 'Done';
SubjectStatus[SubjectStatus.Working] = 'Working';
SubjectStatus[SubjectStatus.Waiting] = 'Waiting';
/**
 * @abstract
 */
export class Watcher {
    constructor() {
        this.status$ = new Subject();
    }
    /**
     * @return {?}
     */
    get status() {
        return this._status;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set status(value) {
        this._status = value;
        this.status$.next(value);
    }
    // tslint:disable-next-line:ban-types
    /**
     * @param {?} callback
     * @param {?=} scope
     * @return {?}
     */
    subscribe(callback, scope) {
        this.watch();
        this.status$$ = this.status$
            .pipe(distinctUntilChanged())
            .subscribe((/**
         * @param {?} status
         * @return {?}
         */
        (status) => {
            this.handleStatusChange(status);
            callback.call(scope, this);
        }));
    }
    /**
     * @return {?}
     */
    unsubscribe() {
        this.unwatch();
        if (this.status$$ !== undefined) {
            this.status$$.unsubscribe();
            this.status$$ = undefined;
        }
        this.status = SubjectStatus.Waiting;
    }
    /**
     * @protected
     * @param {?} status
     * @return {?}
     */
    handleStatusChange(status) { }
}
if (false) {
    /** @type {?} */
    Watcher.prototype.status$;
    /**
     * @type {?}
     * @protected
     */
    Watcher.prototype.status$$;
    /**
     * @type {?}
     * @private
     */
    Watcher.prototype._status;
    /**
     * @abstract
     * @protected
     * @return {?}
     */
    Watcher.prototype.watch = function () { };
    /**
     * @abstract
     * @protected
     * @return {?}
     */
    Watcher.prototype.unwatch = function () { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2F0Y2hlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL3V0aWxzLyIsInNvdXJjZXMiOlsibGliL3dhdGNoZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQzdDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7SUFHcEQsUUFBUztJQUNULE9BQVE7SUFDUixVQUFXO0lBQ1gsVUFBVzs7Ozs7Ozs7OztBQUdiLE1BQU0sT0FBZ0IsT0FBTztJQUE3QjtRQUNTLFlBQU8sR0FBRyxJQUFJLE9BQU8sRUFBaUIsQ0FBQztJQXNDaEQsQ0FBQzs7OztJQW5DQyxJQUFJLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQzs7Ozs7SUFDRCxJQUFJLE1BQU0sQ0FBQyxLQUFvQjtRQUM3QixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzQixDQUFDOzs7Ozs7O0lBUUQsU0FBUyxDQUFDLFFBQWtCLEVBQUUsS0FBVztRQUN2QyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFYixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPO2FBQ3pCLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO2FBQzVCLFNBQVM7Ozs7UUFBQyxDQUFDLE1BQXFCLEVBQUUsRUFBRTtZQUNuQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDaEMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDN0IsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7O0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNmLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxTQUFTLEVBQUU7WUFDL0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQztTQUMzQjtRQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQztJQUN0QyxDQUFDOzs7Ozs7SUFFUyxrQkFBa0IsQ0FBQyxNQUFxQixJQUFHLENBQUM7Q0FDdkQ7OztJQXRDQywwQkFBOEM7Ozs7O0lBQzlDLDJCQUFpQzs7Ozs7SUFTakMsMEJBQStCOzs7Ozs7SUFFL0IsMENBQTJCOzs7Ozs7SUFFM0IsNENBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuZXhwb3J0IGVudW0gU3ViamVjdFN0YXR1cyB7XHJcbiAgRXJyb3IgPSAwLFxyXG4gIERvbmUgPSAxLFxyXG4gIFdvcmtpbmcgPSAyLFxyXG4gIFdhaXRpbmcgPSAzXHJcbn1cclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBXYXRjaGVyIHtcclxuICBwdWJsaWMgc3RhdHVzJCA9IG5ldyBTdWJqZWN0PFN1YmplY3RTdGF0dXM+KCk7XHJcbiAgcHJvdGVjdGVkIHN0YXR1cyQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIGdldCBzdGF0dXMoKTogU3ViamVjdFN0YXR1cyB7XHJcbiAgICByZXR1cm4gdGhpcy5fc3RhdHVzO1xyXG4gIH1cclxuICBzZXQgc3RhdHVzKHZhbHVlOiBTdWJqZWN0U3RhdHVzKSB7XHJcbiAgICB0aGlzLl9zdGF0dXMgPSB2YWx1ZTtcclxuICAgIHRoaXMuc3RhdHVzJC5uZXh0KHZhbHVlKTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfc3RhdHVzOiBTdWJqZWN0U3RhdHVzO1xyXG5cclxuICBwcm90ZWN0ZWQgYWJzdHJhY3Qgd2F0Y2goKTtcclxuXHJcbiAgcHJvdGVjdGVkIGFic3RyYWN0IHVud2F0Y2goKTtcclxuXHJcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmJhbi10eXBlc1xyXG4gIHN1YnNjcmliZShjYWxsYmFjazogRnVuY3Rpb24sIHNjb3BlPzogYW55KSB7XHJcbiAgICB0aGlzLndhdGNoKCk7XHJcblxyXG4gICAgdGhpcy5zdGF0dXMkJCA9IHRoaXMuc3RhdHVzJFxyXG4gICAgICAucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKVxyXG4gICAgICAuc3Vic2NyaWJlKChzdGF0dXM6IFN1YmplY3RTdGF0dXMpID0+IHtcclxuICAgICAgICB0aGlzLmhhbmRsZVN0YXR1c0NoYW5nZShzdGF0dXMpO1xyXG4gICAgICAgIGNhbGxiYWNrLmNhbGwoc2NvcGUsIHRoaXMpO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIHVuc3Vic2NyaWJlKCkge1xyXG4gICAgdGhpcy51bndhdGNoKCk7XHJcbiAgICBpZiAodGhpcy5zdGF0dXMkJCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuc3RhdHVzJCQudW5zdWJzY3JpYmUoKTtcclxuICAgICAgdGhpcy5zdGF0dXMkJCA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuICAgIHRoaXMuc3RhdHVzID0gU3ViamVjdFN0YXR1cy5XYWl0aW5nO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGhhbmRsZVN0YXR1c0NoYW5nZShzdGF0dXM6IFN1YmplY3RTdGF0dXMpIHt9XHJcbn1cclxuIl19