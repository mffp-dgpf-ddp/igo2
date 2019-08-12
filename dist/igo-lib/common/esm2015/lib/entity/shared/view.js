/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { BehaviorSubject, combineLatest } from 'rxjs';
import { debounceTime, map, skip } from 'rxjs/operators';
import { ObjectUtils } from '@igo2/utils';
/**
 * An entity view streams entities from an observable source. These entities
 * can be filtered or sorted without affecting the source. A view can also
 * combine data from multiple sources, joined together.
 * @template E, V
 */
export class EntityView {
    /**
     * @param {?} source$
     */
    constructor(source$) {
        this.source$ = source$;
        /**
         * Observable stream of values
         */
        this.values$ = new BehaviorSubject([]);
        /**
         * Whether this view has been lifted
         */
        this.lifted = false;
        /**
         * Join clauses
         */
        this.joins = [];
        /**
         * Observable of a filter clause
         */
        this.filter$ = new BehaviorSubject(undefined);
        /**
         * Observable of a sort clause
         */
        this.sort$ = new BehaviorSubject(undefined);
    }
    /**
     * Number of entities
     * @return {?}
     */
    get count() { return this.values$.value.length; }
    /**
     * Whether there are entities in the view
     * @return {?}
     */
    get empty() { return this.count === 0; }
    /**
     * Get all the values
     * @return {?} Array of values
     */
    all() {
        return this.values$.value;
    }
    /**
     * Observe all the values
     * @return {?} Observable of values
     */
    all$() {
        return this.values$;
    }
    /**
     * Get the first value that respects a criteria
     * @param {?} clause
     * @return {?} A value
     */
    firstBy(clause) {
        return this.values$.value.find(clause);
    }
    /**
     * Observe the first value that respects a criteria
     * @param {?} clause
     * @return {?} Observable of a value
     */
    firstBy$(clause) {
        return this.values$.pipe(map((/**
         * @param {?} values
         * @return {?}
         */
        (values) => values.find(clause))));
    }
    /**
     * Get all the values that respect a criteria
     * @param {?} clause
     * @return {?} Array of values
     */
    manyBy(clause) {
        return this.values$.value.filter(clause);
    }
    /**
     * Observe all the values that respect a criteria
     * @param {?} clause
     * @return {?} Observable of values
     */
    manyBy$(clause) {
        return this.values$.pipe(map((/**
         * @param {?} values
         * @return {?}
         */
        (values) => values.filter(clause))));
    }
    /**
     * Clear the filter and sort and unsubscribe from the source
     * @return {?}
     */
    clear() {
        this.filter(undefined);
        this.sort(undefined);
    }
    /**
     * @return {?}
     */
    destroy() {
        if (this.values$$ !== undefined) {
            this.values$$.unsubscribe();
        }
        this.clear();
    }
    /**
     * Join another source to the stream (chainable)
     * @param {?} clause Join clause
     * @return {?} The view
     */
    join(clause) {
        if (this.lifted === true) {
            throw new Error('This view has already been lifted, therefore, no join is allowed.');
        }
        this.joins.push(clause);
        return this;
    }
    /**
     * Filter values (chainable)
     * @param {?} clause Filter clause
     * @return {?} The view
     */
    filter(clause) {
        this.filter$.next(clause);
        return this;
    }
    /**
     * Sort values (chainable)
     * @param {?} clause
     * @return {?} The view
     */
    sort(clause) {
        this.sort$.next(clause);
        return this;
    }
    /**
     * Create the final observable
     * @return {?} Observable
     */
    lift() {
        this.lifted = true;
        /** @type {?} */
        const source$ = this.joins.length > 0 ? this.liftJoinedSource() : this.liftSource();
        this.values$$ = combineLatest(source$, this.filter$, this.sort$)
            .pipe(skip(1), debounceTime(50))
            .subscribe((/**
         * @param {?} bunch
         * @return {?}
         */
        (bunch) => {
            const [values, filter, sort] = bunch;
            this.values$.next(this.processValues(values, filter, sort));
        }));
    }
    /**
     * Create the source observable when no joins are defined
     * @private
     * @return {?} Observable
     */
    liftSource() {
        return (/** @type {?} */ ((/** @type {?} */ (this.source$))));
    }
    /**
     * Create the source observable when joins are defined
     * @private
     * @return {?} Observable
     */
    liftJoinedSource() {
        /** @type {?} */
        const sources$ = [this.source$, combineLatest(...this.joins.map((/**
             * @param {?} join
             * @return {?}
             */
            (join) => join.source)))];
        return combineLatest(...sources$)
            .pipe(map((/**
         * @param {?} bunch
         * @return {?}
         */
        (bunch) => {
            const [entities, joinData] = bunch;
            return entities.reduce((/**
             * @param {?} values
             * @param {?} entity
             * @return {?}
             */
            (values, entity) => {
                /** @type {?} */
                const value = this.computeJoinedValue(entity, joinData);
                if (value !== undefined) {
                    values.push(value);
                }
                return values;
            }), []);
        })));
    }
    /**
     * Apply joins to a source's entity and return the final value
     * @private
     * @param {?} entity
     * @param {?} joinData
     * @return {?} Final value
     */
    computeJoinedValue(entity, joinData) {
        /** @type {?} */
        let value = (/** @type {?} */ (entity));
        /** @type {?} */
        let joinIndex = 0;
        while (value !== undefined && joinIndex < this.joins.length) {
            value = this.joins[joinIndex].reduce(value, joinData[joinIndex]);
            joinIndex += 1;
        }
        return (/** @type {?} */ (value));
    }
    /**
     * Filter and sort values before streaming them
     * @private
     * @param {?} values Values
     * @param {?} filter Filter clause
     * @param {?} sort Sort clause
     * @return {?} Filtered and sorted values
     */
    processValues(values, filter, sort) {
        values = values.slice(0);
        values = this.filterValues(values, filter);
        values = this.sortValues(values, sort);
        return values;
    }
    /**
     * Filter values
     * @private
     * @param {?} values Values
     * @param {?} clause
     * @return {?} Filtered values
     */
    filterValues(values, clause) {
        if (clause === undefined) {
            return values;
        }
        return values.filter((/**
         * @param {?} value
         * @return {?}
         */
        (value) => clause(value)));
    }
    /**
     * Sort values
     * @private
     * @param {?} values Values
     * @param {?} clause
     * @return {?} Sorted values
     */
    sortValues(values, clause) {
        if (clause === undefined) {
            return values;
        }
        return values.sort((/**
         * @param {?} v1
         * @param {?} v2
         * @return {?}
         */
        (v1, v2) => {
            return ObjectUtils.naturalCompare(clause.valueAccessor(v1), clause.valueAccessor(v2), clause.direction);
        }));
    }
}
if (false) {
    /**
     * Observable stream of values
     * @type {?}
     */
    EntityView.prototype.values$;
    /**
     * Whether this view has been lifted
     * @type {?}
     * @private
     */
    EntityView.prototype.lifted;
    /**
     * Join clauses
     * @type {?}
     * @private
     */
    EntityView.prototype.joins;
    /**
     * Observable of a filter clause
     * @type {?}
     * @private
     */
    EntityView.prototype.filter$;
    /**
     * Observable of a sort clause
     * @type {?}
     * @private
     */
    EntityView.prototype.sort$;
    /**
     * Subscription to the source (and joined sources) values
     * @type {?}
     * @private
     */
    EntityView.prototype.values$$;
    /**
     * @type {?}
     * @private
     */
    EntityView.prototype.source$;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9lbnRpdHkvc2hhcmVkL3ZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQTRCLGFBQWEsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNoRixPQUFPLEVBQUUsWUFBWSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV6RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sYUFBYSxDQUFDOzs7Ozs7O0FBWTFDLE1BQU0sT0FBTyxVQUFVOzs7O0lBMENyQixZQUFvQixPQUE2QjtRQUE3QixZQUFPLEdBQVAsT0FBTyxDQUFzQjs7OztRQXJDeEMsWUFBTyxHQUFHLElBQUksZUFBZSxDQUFNLEVBQUUsQ0FBQyxDQUFDOzs7O1FBS3hDLFdBQU0sR0FBRyxLQUFLLENBQUM7Ozs7UUFLZixVQUFLLEdBQXVCLEVBQUUsQ0FBQzs7OztRQUsvQixZQUFPLEdBQUcsSUFBSSxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7Ozs7UUFLekMsVUFBSyxHQUFHLElBQUksZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBaUJLLENBQUM7Ozs7O0lBUHJELElBQUksS0FBSyxLQUFhLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFLekQsSUFBSSxLQUFLLEtBQWMsT0FBTyxJQUFJLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7O0lBUWpELEdBQUc7UUFDRCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO0lBQzVCLENBQUM7Ozs7O0lBTUQsSUFBSTtRQUNGLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDOzs7Ozs7SUFNRCxPQUFPLENBQUMsTUFBNkI7UUFDbkMsT0FBTyxJQUFJLENBQUMsT0FB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OlsiaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24sIGNvbWJpbmVMYXRlc3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBtYXAsIHNraXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyBPYmplY3RVdGlscyB9IGZyb20gJ0BpZ28yL3V0aWxzJztcclxuaW1wb3J0IHtcclxuICBFbnRpdHlGaWx0ZXJDbGF1c2UsXHJcbiAgRW50aXR5U29ydENsYXVzZSxcclxuICBFbnRpdHlKb2luQ2xhdXNlXHJcbn0gZnJvbSAnLi9lbnRpdHkuaW50ZXJmYWNlcyc7XHJcblxyXG4vKipcclxuICogQW4gZW50aXR5IHZpZXcgc3RyZWFtcyBlbnRpdGllcyBmcm9tIGFuIG9ic2VydmFibGUgc291cmNlLiBUaGVzZSBlbnRpdGllc1xyXG4gKiBjYW4gYmUgZmlsdGVyZWQgb3Igc29ydGVkIHdpdGhvdXQgYWZmZWN0aW5nIHRoZSBzb3VyY2UuIEEgdmlldyBjYW4gYWxzb1xyXG4gKiBjb21iaW5lIGRhdGEgZnJvbSBtdWx0aXBsZSBzb3VyY2VzLCBqb2luZWQgdG9nZXRoZXIuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRW50aXR5VmlldzxFIGV4dGVuZHMgb2JqZWN0LCBWIGV4dGVuZHMgb2JqZWN0ID0gRT4ge1xyXG5cclxuICAvKipcclxuICAgKiBPYnNlcnZhYmxlIHN0cmVhbSBvZiB2YWx1ZXNcclxuICAgKi9cclxuICByZWFkb25seSB2YWx1ZXMkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxWW10+KFtdKTtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0aGlzIHZpZXcgaGFzIGJlZW4gbGlmdGVkXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBsaWZ0ZWQgPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogSm9pbiBjbGF1c2VzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBqb2luczogRW50aXR5Sm9pbkNsYXVzZVtdID0gW107XHJcblxyXG4gIC8qKlxyXG4gICAqIE9ic2VydmFibGUgb2YgYSBmaWx0ZXIgY2xhdXNlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBmaWx0ZXIkID0gbmV3IEJlaGF2aW9yU3ViamVjdCh1bmRlZmluZWQpO1xyXG5cclxuICAvKipcclxuICAgKiBPYnNlcnZhYmxlIG9mIGEgc29ydCBjbGF1c2VcclxuICAgKi9cclxuICBwcml2YXRlIHNvcnQkID0gbmV3IEJlaGF2aW9yU3ViamVjdCh1bmRlZmluZWQpO1xyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpcHRpb24gdG8gdGhlIHNvdXJjZSAoYW5kIGpvaW5lZCBzb3VyY2VzKSB2YWx1ZXNcclxuICAgKi9cclxuICBwcml2YXRlIHZhbHVlcyQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIE51bWJlciBvZiBlbnRpdGllc1xyXG4gICAqL1xyXG4gIGdldCBjb3VudCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy52YWx1ZXMkLnZhbHVlLmxlbmd0aDsgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIHRoZXJlIGFyZSBlbnRpdGllcyBpbiB0aGUgdmlld1xyXG4gICAqL1xyXG4gIGdldCBlbXB0eSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuY291bnQgPT09IDA7IH1cclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzb3VyY2UkOiBCZWhhdmlvclN1YmplY3Q8RVtdPikge31cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IGFsbCB0aGUgdmFsdWVzXHJcbiAgICogQHJldHVybnMgQXJyYXkgb2YgdmFsdWVzXHJcbiAgICovXHJcbiAgYWxsKCk6IFZbXSB7XHJcbiAgICByZXR1cm4gdGhpcy52YWx1ZXMkLnZhbHVlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT2JzZXJ2ZSBhbGwgdGhlIHZhbHVlc1xyXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgdmFsdWVzXHJcbiAgICovXHJcbiAgYWxsJCgpOiBCZWhhdmlvclN1YmplY3Q8VltdPiB7XHJcbiAgICByZXR1cm4gdGhpcy52YWx1ZXMkO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBmaXJzdCB2YWx1ZSB0aGF0IHJlc3BlY3RzIGEgY3JpdGVyaWFcclxuICAgKiBAcmV0dXJucyBBIHZhbHVlXHJcbiAgICovXHJcbiAgZmlyc3RCeShjbGF1c2U6IEVudGl0eUZpbHRlckNsYXVzZTxWPik6IFYge1xyXG4gICAgcmV0dXJuIHRoaXMudmFsdWVzJC52YWx1ZS5maW5kKGNsYXVzZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBPYnNlcnZlIHRoZSBmaXJzdCB2YWx1ZSB0aGF0IHJlc3BlY3RzIGEgY3JpdGVyaWFcclxuICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIGEgdmFsdWVcclxuICAgKi9cclxuICBmaXJzdEJ5JChjbGF1c2U6IEVudGl0eUZpbHRlckNsYXVzZTxWPik6IE9ic2VydmFibGU8Vj4ge1xyXG4gICAgcmV0dXJuIHRoaXMudmFsdWVzJC5waXBlKG1hcCgodmFsdWVzOiBWW10pID0+IHZhbHVlcy5maW5kKGNsYXVzZSkpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCBhbGwgdGhlIHZhbHVlcyB0aGF0IHJlc3BlY3QgYSBjcml0ZXJpYVxyXG4gICAqIEByZXR1cm5zIEFycmF5IG9mIHZhbHVlc1xyXG4gICAqL1xyXG4gIG1hbnlCeShjbGF1c2U6IEVudGl0eUZpbHRlckNsYXVzZTxWPik6IFZbXSB7XHJcbiAgICByZXR1cm4gdGhpcy52YWx1ZXMkLnZhbHVlLmZpbHRlcihjbGF1c2UpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT2JzZXJ2ZSBhbGwgdGhlIHZhbHVlcyB0aGF0IHJlc3BlY3QgYSBjcml0ZXJpYVxyXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgdmFsdWVzXHJcbiAgICovXHJcbiAgbWFueUJ5JChjbGF1c2U6IEVudGl0eUZpbHRlckNsYXVzZTxWPik6IE9ic2VydmFibGU8VltdPiB7XHJcbiAgICByZXR1cm4gdGhpcy52YWx1ZXMkLnBpcGUobWFwKCh2YWx1ZXM6IFZbXSkgPT4gdmFsdWVzLmZpbHRlcihjbGF1c2UpKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDbGVhciB0aGUgZmlsdGVyIGFuZCBzb3J0IGFuZCB1bnN1YnNjcmliZSBmcm9tIHRoZSBzb3VyY2VcclxuICAgKi9cclxuICBjbGVhcigpIHtcclxuICAgIHRoaXMuZmlsdGVyKHVuZGVmaW5lZCk7XHJcbiAgICB0aGlzLnNvcnQodW5kZWZpbmVkKTtcclxuICB9XHJcblxyXG4gIGRlc3Ryb3koKSB7XHJcbiAgICBpZiAodGhpcy52YWx1ZXMkJCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMudmFsdWVzJCQudW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuICAgIHRoaXMuY2xlYXIoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEpvaW4gYW5vdGhlciBzb3VyY2UgdG8gdGhlIHN0cmVhbSAoY2hhaW5hYmxlKVxyXG4gICAqIEBwYXJhbSBjbGF1c2UgSm9pbiBjbGF1c2VcclxuICAgKiBAcmV0dXJucyBUaGUgdmlld1xyXG4gICAqL1xyXG4gIGpvaW4oY2xhdXNlOiBFbnRpdHlKb2luQ2xhdXNlKTogRW50aXR5VmlldzxFLCBWPiB7XHJcbiAgICBpZiAodGhpcy5saWZ0ZWQgPT09IHRydWUpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGlzIHZpZXcgaGFzIGFscmVhZHkgYmVlbiBsaWZ0ZWQsIHRoZXJlZm9yZSwgbm8gam9pbiBpcyBhbGxvd2VkLicpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5qb2lucy5wdXNoKGNsYXVzZSk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZpbHRlciB2YWx1ZXMgKGNoYWluYWJsZSlcclxuICAgKiBAcGFyYW0gY2xhdXNlIEZpbHRlciBjbGF1c2VcclxuICAgKiBAcmV0dXJucyBUaGUgdmlld1xyXG4gICAqL1xyXG4gIGZpbHRlcihjbGF1c2U6IEVudGl0eUZpbHRlckNsYXVzZTxWPik6IEVudGl0eVZpZXc8RSwgVj4ge1xyXG4gICAgdGhpcy5maWx0ZXIkLm5leHQoY2xhdXNlKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU29ydCB2YWx1ZXMgKGNoYWluYWJsZSlcclxuICAgKiBAcGFyYW0gY2xhdXNlU29ydCBjbGF1c2VcclxuICAgKiBAcmV0dXJucyBUaGUgdmlld1xyXG4gICAqL1xyXG4gIHNvcnQoY2xhdXNlOiBFbnRpdHlTb3J0Q2xhdXNlPFY+KTogRW50aXR5VmlldzxFLCBWPiB7XHJcbiAgICB0aGlzLnNvcnQkLm5leHQoY2xhdXNlKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIHRoZSBmaW5hbCBvYnNlcnZhYmxlXHJcbiAgICogQHJldHVybnMgT2JzZXJ2YWJsZVxyXG4gICAqL1xyXG4gIGxpZnQoKSB7XHJcbiAgICB0aGlzLmxpZnRlZCA9IHRydWU7XHJcbiAgICBjb25zdCBzb3VyY2UkID0gdGhpcy5qb2lucy5sZW5ndGggPiAwID8gdGhpcy5saWZ0Sm9pbmVkU291cmNlKCkgOiB0aGlzLmxpZnRTb3VyY2UoKTtcclxuICAgIHRoaXMudmFsdWVzJCQgPSBjb21iaW5lTGF0ZXN0KHNvdXJjZSQsIHRoaXMuZmlsdGVyJCwgdGhpcy5zb3J0JClcclxuICAgICAgLnBpcGUoc2tpcCgxKSwgZGVib3VuY2VUaW1lKDUwKSlcclxuICAgICAgLnN1YnNjcmliZSgoYnVuY2g6IFtWW10sIEVudGl0eUZpbHRlckNsYXVzZSwgRW50aXR5U29ydENsYXVzZV0pID0+IHtcclxuICAgICAgICBjb25zdCBbdmFsdWVzLCBmaWx0ZXIsIHNvcnRdID0gYnVuY2g7XHJcbiAgICAgICAgdGhpcy52YWx1ZXMkLm5leHQodGhpcy5wcm9jZXNzVmFsdWVzKHZhbHVlcywgZmlsdGVyLCBzb3J0KSk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIHRoZSBzb3VyY2Ugb2JzZXJ2YWJsZSB3aGVuIG5vIGpvaW5zIGFyZSBkZWZpbmVkXHJcbiAgICogQHJldHVybnMgT2JzZXJ2YWJsZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgbGlmdFNvdXJjZSgpOiBPYnNlcnZhYmxlPFZbXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuc291cmNlJCBhcyBhbnkgYXMgT2JzZXJ2YWJsZTxWW10+O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIHRoZSBzb3VyY2Ugb2JzZXJ2YWJsZSB3aGVuIGpvaW5zIGFyZSBkZWZpbmVkXHJcbiAgICogQHJldHVybnMgT2JzZXJ2YWJsZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgbGlmdEpvaW5lZFNvdXJjZSgpOiBPYnNlcnZhYmxlPFZbXT4ge1xyXG4gICAgY29uc3Qgc291cmNlcyQgPSBbdGhpcy5zb3VyY2UkLCBjb21iaW5lTGF0ZXN0KFxyXG4gICAgICAuLi50aGlzLmpvaW5zLm1hcCgoam9pbjogRW50aXR5Sm9pbkNsYXVzZSkgPT4gam9pbi5zb3VyY2UpXHJcbiAgICApXTtcclxuXHJcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdCguLi5zb3VyY2VzJClcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgbWFwKChidW5jaDogW0VbXSwgYW55W11dKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBbZW50aXRpZXMsIGpvaW5EYXRhXSA9IGJ1bmNoO1xyXG4gICAgICAgICAgcmV0dXJuIGVudGl0aWVzLnJlZHVjZSgodmFsdWVzOiBWW10sIGVudGl0eTogRSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuY29tcHV0ZUpvaW5lZFZhbHVlKGVudGl0eSwgam9pbkRhdGEpO1xyXG4gICAgICAgICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgIHZhbHVlcy5wdXNoKHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWVzO1xyXG4gICAgICAgICAgfSwgW10pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBcHBseSBqb2lucyB0byBhIHNvdXJjZSdzIGVudGl0eSBhbmQgcmV0dXJuIHRoZSBmaW5hbCB2YWx1ZVxyXG4gICAqIEByZXR1cm5zIEZpbmFsIHZhbHVlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjb21wdXRlSm9pbmVkVmFsdWUoZW50aXR5OiBFLCBqb2luRGF0YTogYW55W10pOiBWIHwgdW5kZWZpbmVkIHtcclxuICAgIGxldCB2YWx1ZSA9IGVudGl0eSBhcyBQYXJ0aWFsPFY+O1xyXG4gICAgbGV0IGpvaW5JbmRleCA9IDA7XHJcbiAgICB3aGlsZSAodmFsdWUgIT09IHVuZGVmaW5lZCAmJiBqb2luSW5kZXggPCB0aGlzLmpvaW5zLmxlbmd0aCkge1xyXG4gICAgICB2YWx1ZSA9IHRoaXMuam9pbnNbam9pbkluZGV4XS5yZWR1Y2UodmFsdWUsIGpvaW5EYXRhW2pvaW5JbmRleF0pO1xyXG4gICAgICBqb2luSW5kZXggKz0gMTtcclxuICAgIH1cclxuICAgIHJldHVybiB2YWx1ZSBhcyBWO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRmlsdGVyIGFuZCBzb3J0IHZhbHVlcyBiZWZvcmUgc3RyZWFtaW5nIHRoZW1cclxuICAgKiBAcGFyYW0gdmFsdWVzIFZhbHVlc1xyXG4gICAqIEBwYXJhbSBmaWx0ZXIgRmlsdGVyIGNsYXVzZVxyXG4gICAqIEBwYXJhbSBzb3J0IFNvcnQgY2xhdXNlXHJcbiAgICogQHJldHVybnMgRmlsdGVyZWQgYW5kIHNvcnRlZCB2YWx1ZXNcclxuICAgKi9cclxuICBwcml2YXRlIHByb2Nlc3NWYWx1ZXModmFsdWVzOiBWW10sIGZpbHRlcjogRW50aXR5RmlsdGVyQ2xhdXNlLCBzb3J0OiBFbnRpdHlTb3J0Q2xhdXNlKTogVltdIHtcclxuICAgIHZhbHVlcyA9IHZhbHVlcy5zbGljZSgwKTtcclxuICAgIHZhbHVlcyA9IHRoaXMuZmlsdGVyVmFsdWVzKHZhbHVlcywgZmlsdGVyKTtcclxuICAgIHZhbHVlcyA9IHRoaXMuc29ydFZhbHVlcyh2YWx1ZXMsIHNvcnQpO1xyXG4gICAgcmV0dXJuIHZhbHVlcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZpbHRlciB2YWx1ZXNcclxuICAgKiBAcGFyYW0gdmFsdWVzIFZhbHVlc1xyXG4gICAqIEBwYXJhbSBmaWx0ZXIgRmlsdGVyIGNsYXVzZVxyXG4gICAqIEByZXR1cm5zIEZpbHRlcmVkIHZhbHVlc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgZmlsdGVyVmFsdWVzKHZhbHVlczogVltdLCBjbGF1c2U6IEVudGl0eUZpbHRlckNsYXVzZSk6IFZbXSB7XHJcbiAgICBpZiAoY2xhdXNlID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIHZhbHVlczsgfVxyXG4gICAgcmV0dXJuIHZhbHVlcy5maWx0ZXIoKHZhbHVlOiBWKSA9PiBjbGF1c2UodmFsdWUpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNvcnQgdmFsdWVzXHJcbiAgICogQHBhcmFtIHZhbHVlcyBWYWx1ZXNcclxuICAgKiBAcGFyYW0gc29ydCBTb3J0IGNsYXVzZVxyXG4gICAqIEByZXR1cm5zIFNvcnRlZCB2YWx1ZXNcclxuICAgKi9cclxuICBwcml2YXRlIHNvcnRWYWx1ZXModmFsdWVzOiBWW10sIGNsYXVzZTogRW50aXR5U29ydENsYXVzZSk6IFZbXSB7XHJcbiAgICBpZiAoY2xhdXNlID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIHZhbHVlczsgfVxyXG4gICAgcmV0dXJuIHZhbHVlcy5zb3J0KCh2MTogViwgdjI6IFYpID0+IHtcclxuICAgICAgcmV0dXJuIE9iamVjdFV0aWxzLm5hdHVyYWxDb21wYXJlKFxyXG4gICAgICAgIGNsYXVzZS52YWx1ZUFjY2Vzc29yKHYxKSxcclxuICAgICAgICBjbGF1c2UudmFsdWVBY2Nlc3Nvcih2MiksXHJcbiAgICAgICAgY2xhdXNlLmRpcmVjdGlvblxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==