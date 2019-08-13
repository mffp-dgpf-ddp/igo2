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
        /**
         * Number of entities
         */
        this.count$ = new BehaviorSubject(0);
        /**
         * Whether the store is empty
         */
        this.empty$ = new BehaviorSubject(true);
    }
    /**
     * @return {?}
     */
    get count() { return this.count$.value; }
    /**
     * @return {?}
     */
    get empty() { return this.empty$.value; }
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
            .pipe(skip(1), debounceTime(25))
            .subscribe((/**
         * @param {?} bunch
         * @return {?}
         */
        (bunch) => {
            const [_values, filter, sort] = bunch;
            /** @type {?} */
            const values = this.processValues(_values, filter, sort);
            this.setValues(values);
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
    /**
     * @private
     * @param {?} values
     * @return {?}
     */
    setValues(values) {
        this.values$.next(values);
        /** @type {?} */
        const count = values.length;
        /** @type {?} */
        const empty = count === 0;
        this.count$.next(count);
        this.empty$.next(empty);
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
     * Number of entities
     * @type {?}
     */
    EntityView.prototype.count$;
    /**
     * Whether the store is empty
     * @type {?}
     */
    EntityView.prototype.empty$;
    /**
     * @type {?}
     * @private
     */
    EntityView.prototype.source$;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9lbnRpdHkvc2hhcmVkL3ZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQTRCLGFBQWEsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNoRixPQUFPLEVBQUUsWUFBWSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV6RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sYUFBYSxDQUFDOzs7Ozs7O0FBWTFDLE1BQU0sT0FBTyxVQUFVOzs7O0lBNENyQixZQUFvQixPQUE2QjtRQUE3QixZQUFPLEdBQVAsT0FBTyxDQUFzQjs7OztRQXZDeEMsWUFBTyxHQUFHLElBQUksZUFBZSxDQUFNLEVBQUUsQ0FBQyxDQUFDOzs7O1FBS3hDLFdBQU0sR0FBRyxLQUFLLENBQUM7Ozs7UUFLZixVQUFLLEdBQXVCLEVBQUUsQ0FBQzs7OztRQUsvQixZQUFPLEdBQUcsSUFBSSxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7Ozs7UUFLekMsVUFBSyxHQUFHLElBQUksZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDOzs7O1FBVXRDLFdBQU0sR0FBRyxJQUFJLGVBQWUsQ0FBUyxDQUFDLENBQUMsQ0FBQzs7OztRQU14QyxXQUFNLEdBQUcsSUFBSSxlQUFlLENBQVUsSUFBSSxDQUFDLENBQUM7SUFHRCxDQUFDOzs7O0lBUnJELElBQUksS0FBSyxLQUFhLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDOzs7O0lBTWpELElBQUksS0FBSyxLQUFjLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDOzs7OztJQVFsRCxHQUFHO1FBQ0QsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztJQUM1QixDQUFDOzs7OztJQU1ELElBQUk7UUFDRixP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QyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7O2NBQ3BCLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBTTs7Y0FDckIsS0FBSyxHQUFHLEtBQUssS0FBSyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFCLENBQUM7Q0FDRjs7Ozs7O0lBeFBDLDZCQUFnRDs7Ozs7O0lBS2hELDRCQUF1Qjs7Ozs7O0lBS3ZCLDJCQUF1Qzs7Ozs7O0lBS3ZDLDZCQUFpRDs7Ozs7O0lBS2pELDJCQUErQzs7Ozs7O0lBSy9DLDhCQUErQjs7Ozs7SUFLL0IsNEJBQWlEOzs7OztJQU1qRCw0QkFBcUQ7Ozs7O0lBR3pDLDZCQUFxQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uLCBjb21iaW5lTGF0ZXN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgbWFwLCBza2lwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHsgT2JqZWN0VXRpbHMgfSBmcm9tICdAaWdvMi91dGlscyc7XHJcbmltcG9ydCB7XHJcbiAgRW50aXR5RmlsdGVyQ2xhdXNlLFxyXG4gIEVudGl0eVNvcnRDbGF1c2UsXHJcbiAgRW50aXR5Sm9pbkNsYXVzZVxyXG59IGZyb20gJy4vZW50aXR5LmludGVyZmFjZXMnO1xyXG5cclxuLyoqXHJcbiAqIEFuIGVudGl0eSB2aWV3IHN0cmVhbXMgZW50aXRpZXMgZnJvbSBhbiBvYnNlcnZhYmxlIHNvdXJjZS4gVGhlc2UgZW50aXRpZXNcclxuICogY2FuIGJlIGZpbHRlcmVkIG9yIHNvcnRlZCB3aXRob3V0IGFmZmVjdGluZyB0aGUgc291cmNlLiBBIHZpZXcgY2FuIGFsc29cclxuICogY29tYmluZSBkYXRhIGZyb20gbXVsdGlwbGUgc291cmNlcywgam9pbmVkIHRvZ2V0aGVyLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEVudGl0eVZpZXc8RSBleHRlbmRzIG9iamVjdCwgViBleHRlbmRzIG9iamVjdCA9IEU+IHtcclxuXHJcbiAgLyoqXHJcbiAgICogT2JzZXJ2YWJsZSBzdHJlYW0gb2YgdmFsdWVzXHJcbiAgICovXHJcbiAgcmVhZG9ubHkgdmFsdWVzJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8VltdPihbXSk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgdGhpcyB2aWV3IGhhcyBiZWVuIGxpZnRlZFxyXG4gICAqL1xyXG4gIHByaXZhdGUgbGlmdGVkID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIEpvaW4gY2xhdXNlc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgam9pbnM6IEVudGl0eUpvaW5DbGF1c2VbXSA9IFtdO1xyXG5cclxuICAvKipcclxuICAgKiBPYnNlcnZhYmxlIG9mIGEgZmlsdGVyIGNsYXVzZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZmlsdGVyJCA9IG5ldyBCZWhhdmlvclN1YmplY3QodW5kZWZpbmVkKTtcclxuXHJcbiAgLyoqXHJcbiAgICogT2JzZXJ2YWJsZSBvZiBhIHNvcnQgY2xhdXNlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzb3J0JCA9IG5ldyBCZWhhdmlvclN1YmplY3QodW5kZWZpbmVkKTtcclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaXB0aW9uIHRvIHRoZSBzb3VyY2UgKGFuZCBqb2luZWQgc291cmNlcykgdmFsdWVzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB2YWx1ZXMkJDogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBOdW1iZXIgb2YgZW50aXRpZXNcclxuICAgKi9cclxuICByZWFkb25seSBjb3VudCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XHJcbiAgZ2V0IGNvdW50KCk6IG51bWJlciB7IHJldHVybiB0aGlzLmNvdW50JC52YWx1ZTsgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIHRoZSBzdG9yZSBpcyBlbXB0eVxyXG4gICAqL1xyXG4gIHJlYWRvbmx5IGVtcHR5JCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4odHJ1ZSk7XHJcbiAgZ2V0IGVtcHR5KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5lbXB0eSQudmFsdWU7IH1cclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzb3VyY2UkOiBCZWhhdmlvclN1YmplY3Q8RVtdPikge31cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IGFsbCB0aGUgdmFsdWVzXHJcbiAgICogQHJldHVybnMgQXJyYXkgb2YgdmFsdWVzXHJcbiAgICovXHJcbiAgYWxsKCk6IFZbXSB7XHJcbiAgICByZXR1cm4gdGhpcy52YWx1ZXMkLnZhbHVlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT2JzZXJ2ZSBhbGwgdGhlIHZhbHVlc1xyXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgdmFsdWVzXHJcbiAgICovXHJcbiAgYWxsJCgpOiBCZWhhdmlvclN1YmplY3Q8VltdPiB7XHJcbiAgICByZXR1cm4gdGhpcy52YWx1ZXMkO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBmaXJzdCB2YWx1ZSB0aGF0IHJlc3BlY3RzIGEgY3JpdGVyaWFcclxuICAgKiBAcmV0dXJucyBBIHZhbHVlXHJcbiAgICovXHJcbiAgZmlyc3RCeShjbGF1c2U6IEVudGl0eUZpbHRlckNsYXVzZTxWPik6IFYge1xyXG4gICAgcmV0dXJuIHRoaXMudmFsdWVzJC52YWx1ZS5maW5kKGNsYXVzZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBPYnNlcnZlIHRoZSBmaXJzdCB2YWx1ZSB0aGF0IHJlc3BlY3RzIGEgY3JpdGVyaWFcclxuICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIGEgdmFsdWVcclxuICAgKi9cclxuICBmaXJzdEJ5JChjbGF1c2U6IEVudGl0eUZpbHRlckNsYXVzZTxWPik6IE9ic2VydmFibGU8Vj4ge1xyXG4gICAgcmV0dXJuIHRoaXMudmFsdWVzJC5waXBlKG1hcCgodmFsdWVzOiBWW10pID0+IHZhbHVlcy5maW5kKGNsYXVzZSkpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCBhbGwgdGhlIHZhbHVlcyB0aGF0IHJlc3BlY3QgYSBjcml0ZXJpYVxyXG4gICAqIEByZXR1cm5zIEFycmF5IG9mIHZhbHVlc1xyXG4gICAqL1xyXG4gIG1hbnlCeShjbGF1c2U6IEVudGl0eUZpbHRlckNsYXVzZTxWPik6IFZbXSB7XHJcbiAgICByZXR1cm4gdGhpcy52YWx1ZXMkLnZhbHVlLmZpbHRlcihjbGF1c2UpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT2JzZXJ2ZSBhbGwgdGhlIHZhbHVlcyB0aGF0IHJlc3BlY3QgYSBjcml0ZXJpYVxyXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgdmFsdWVzXHJcbiAgICovXHJcbiAgbWFueUJ5JChjbGF1c2U6IEVudGl0eUZpbHRlckNsYXVzZTxWPik6IE9ic2VydmFibGU8VltdPiB7XHJcbiAgICByZXR1cm4gdGhpcy52YWx1ZXMkLnBpcGUobWFwKCh2YWx1ZXM6IFZbXSkgPT4gdmFsdWVzLmZpbHRlcihjbGF1c2UpKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDbGVhciB0aGUgZmlsdGVyIGFuZCBzb3J0IGFuZCB1bnN1YnNjcmliZSBmcm9tIHRoZSBzb3VyY2VcclxuICAgKi9cclxuICBjbGVhcigpIHtcclxuICAgIHRoaXMuZmlsdGVyKHVuZGVmaW5lZCk7XHJcbiAgICB0aGlzLnNvcnQodW5kZWZpbmVkKTtcclxuICB9XHJcblxyXG4gIGRlc3Ryb3koKSB7XHJcbiAgICBpZiAodGhpcy52YWx1ZXMkJCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMudmFsdWVzJCQudW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuICAgIHRoaXMuY2xlYXIoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEpvaW4gYW5vdGhlciBzb3VyY2UgdG8gdGhlIHN0cmVhbSAoY2hhaW5hYmxlKVxyXG4gICAqIEBwYXJhbSBjbGF1c2UgSm9pbiBjbGF1c2VcclxuICAgKiBAcmV0dXJucyBUaGUgdmlld1xyXG4gICAqL1xyXG4gIGpvaW4oY2xhdXNlOiBFbnRpdHlKb2luQ2xhdXNlKTogRW50aXR5VmlldzxFLCBWPiB7XHJcbiAgICBpZiAodGhpcy5saWZ0ZWQgPT09IHRydWUpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGlzIHZpZXcgaGFzIGFscmVhZHkgYmVlbiBsaWZ0ZWQsIHRoZXJlZm9yZSwgbm8gam9pbiBpcyBhbGxvd2VkLicpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5qb2lucy5wdXNoKGNsYXVzZSk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZpbHRlciB2YWx1ZXMgKGNoYWluYWJsZSlcclxuICAgKiBAcGFyYW0gY2xhdXNlIEZpbHRlciBjbGF1c2VcclxuICAgKiBAcmV0dXJucyBUaGUgdmlld1xyXG4gICAqL1xyXG4gIGZpbHRlcihjbGF1c2U6IEVudGl0eUZpbHRlckNsYXVzZTxWPik6IEVudGl0eVZpZXc8RSwgVj4ge1xyXG4gICAgdGhpcy5maWx0ZXIkLm5leHQoY2xhdXNlKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU29ydCB2YWx1ZXMgKGNoYWluYWJsZSlcclxuICAgKiBAcGFyYW0gY2xhdXNlU29ydCBjbGF1c2VcclxuICAgKiBAcmV0dXJucyBUaGUgdmlld1xyXG4gICAqL1xyXG4gIHNvcnQoY2xhdXNlOiBFbnRpdHlTb3J0Q2xhdXNlPFY+KTogRW50aXR5VmlldzxFLCBWPiB7XHJcbiAgICB0aGlzLnNvcnQkLm5leHQoY2xhdXNlKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIHRoZSBmaW5hbCBvYnNlcnZhYmxlXHJcbiAgICogQHJldHVybnMgT2JzZXJ2YWJsZVxyXG4gICAqL1xyXG4gIGxpZnQoKSB7XHJcbiAgICB0aGlzLmxpZnRlZCA9IHRydWU7XHJcbiAgICBjb25zdCBzb3VyY2UkID0gdGhpcy5qb2lucy5sZW5ndGggPiAwID8gdGhpcy5saWZ0Sm9pbmVkU291cmNlKCkgOiB0aGlzLmxpZnRTb3VyY2UoKTtcclxuICAgIHRoaXMudmFsdWVzJCQgPSBjb21iaW5lTGF0ZXN0KHNvdXJjZSQsIHRoaXMuZmlsdGVyJCwgdGhpcy5zb3J0JClcclxuICAgICAgLnBpcGUoc2tpcCgxKSwgZGVib3VuY2VUaW1lKDI1KSlcclxuICAgICAgLnN1YnNjcmliZSgoYnVuY2g6IFtWW10sIEVudGl0eUZpbHRlckNsYXVzZSwgRW50aXR5U29ydENsYXVzZV0pID0+IHtcclxuICAgICAgICBjb25zdCBbX3ZhbHVlcywgZmlsdGVyLCBzb3J0XSA9IGJ1bmNoO1xyXG4gICAgICAgIGNvbnN0IHZhbHVlcyA9IHRoaXMucHJvY2Vzc1ZhbHVlcyhfdmFsdWVzLCBmaWx0ZXIsIHNvcnQpO1xyXG4gICAgICAgIHRoaXMuc2V0VmFsdWVzKHZhbHVlcyk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIHRoZSBzb3VyY2Ugb2JzZXJ2YWJsZSB3aGVuIG5vIGpvaW5zIGFyZSBkZWZpbmVkXHJcbiAgICogQHJldHVybnMgT2JzZXJ2YWJsZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgbGlmdFNvdXJjZSgpOiBPYnNlcnZhYmxlPFZbXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuc291cmNlJCBhcyBhbnkgYXMgT2JzZXJ2YWJsZTxWW10+O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIHRoZSBzb3VyY2Ugb2JzZXJ2YWJsZSB3aGVuIGpvaW5zIGFyZSBkZWZpbmVkXHJcbiAgICogQHJldHVybnMgT2JzZXJ2YWJsZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgbGlmdEpvaW5lZFNvdXJjZSgpOiBPYnNlcnZhYmxlPFZbXT4ge1xyXG4gICAgY29uc3Qgc291cmNlcyQgPSBbdGhpcy5zb3VyY2UkLCBjb21iaW5lTGF0ZXN0KFxyXG4gICAgICAuLi50aGlzLmpvaW5zLm1hcCgoam9pbjogRW50aXR5Sm9pbkNsYXVzZSkgPT4gam9pbi5zb3VyY2UpXHJcbiAgICApXTtcclxuXHJcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdCguLi5zb3VyY2VzJClcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgbWFwKChidW5jaDogW0VbXSwgYW55W11dKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBbZW50aXRpZXMsIGpvaW5EYXRhXSA9IGJ1bmNoO1xyXG4gICAgICAgICAgcmV0dXJuIGVudGl0aWVzLnJlZHVjZSgodmFsdWVzOiBWW10sIGVudGl0eTogRSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuY29tcHV0ZUpvaW5lZFZhbHVlKGVudGl0eSwgam9pbkRhdGEpO1xyXG4gICAgICAgICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgIHZhbHVlcy5wdXNoKHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWVzO1xyXG4gICAgICAgICAgfSwgW10pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBcHBseSBqb2lucyB0byBhIHNvdXJjZSdzIGVudGl0eSBhbmQgcmV0dXJuIHRoZSBmaW5hbCB2YWx1ZVxyXG4gICAqIEByZXR1cm5zIEZpbmFsIHZhbHVlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjb21wdXRlSm9pbmVkVmFsdWUoZW50aXR5OiBFLCBqb2luRGF0YTogYW55W10pOiBWIHwgdW5kZWZpbmVkIHtcclxuICAgIGxldCB2YWx1ZSA9IGVudGl0eSBhcyBQYXJ0aWFsPFY+O1xyXG4gICAgbGV0IGpvaW5JbmRleCA9IDA7XHJcbiAgICB3aGlsZSAodmFsdWUgIT09IHVuZGVmaW5lZCAmJiBqb2luSW5kZXggPCB0aGlzLmpvaW5zLmxlbmd0aCkge1xyXG4gICAgICB2YWx1ZSA9IHRoaXMuam9pbnNbam9pbkluZGV4XS5yZWR1Y2UodmFsdWUsIGpvaW5EYXRhW2pvaW5JbmRleF0pO1xyXG4gICAgICBqb2luSW5kZXggKz0gMTtcclxuICAgIH1cclxuICAgIHJldHVybiB2YWx1ZSBhcyBWO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRmlsdGVyIGFuZCBzb3J0IHZhbHVlcyBiZWZvcmUgc3RyZWFtaW5nIHRoZW1cclxuICAgKiBAcGFyYW0gdmFsdWVzIFZhbHVlc1xyXG4gICAqIEBwYXJhbSBmaWx0ZXIgRmlsdGVyIGNsYXVzZVxyXG4gICAqIEBwYXJhbSBzb3J0IFNvcnQgY2xhdXNlXHJcbiAgICogQHJldHVybnMgRmlsdGVyZWQgYW5kIHNvcnRlZCB2YWx1ZXNcclxuICAgKi9cclxuICBwcml2YXRlIHByb2Nlc3NWYWx1ZXModmFsdWVzOiBWW10sIGZpbHRlcjogRW50aXR5RmlsdGVyQ2xhdXNlLCBzb3J0OiBFbnRpdHlTb3J0Q2xhdXNlKTogVltdIHtcclxuICAgIHZhbHVlcyA9IHZhbHVlcy5zbGljZSgwKTtcclxuICAgIHZhbHVlcyA9IHRoaXMuZmlsdGVyVmFsdWVzKHZhbHVlcywgZmlsdGVyKTtcclxuICAgIHZhbHVlcyA9IHRoaXMuc29ydFZhbHVlcyh2YWx1ZXMsIHNvcnQpO1xyXG4gICAgcmV0dXJuIHZhbHVlcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZpbHRlciB2YWx1ZXNcclxuICAgKiBAcGFyYW0gdmFsdWVzIFZhbHVlc1xyXG4gICAqIEBwYXJhbSBmaWx0ZXIgRmlsdGVyIGNsYXVzZVxyXG4gICAqIEByZXR1cm5zIEZpbHRlcmVkIHZhbHVlc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgZmlsdGVyVmFsdWVzKHZhbHVlczogVltdLCBjbGF1c2U6IEVudGl0eUZpbHRlckNsYXVzZSk6IFZbXSB7XHJcbiAgICBpZiAoY2xhdXNlID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIHZhbHVlczsgfVxyXG4gICAgcmV0dXJuIHZhbHVlcy5maWx0ZXIoKHZhbHVlOiBWKSA9PiBjbGF1c2UodmFsdWUpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNvcnQgdmFsdWVzXHJcbiAgICogQHBhcmFtIHZhbHVlcyBWYWx1ZXNcclxuICAgKiBAcGFyYW0gc29ydCBTb3J0IGNsYXVzZVxyXG4gICAqIEByZXR1cm5zIFNvcnRlZCB2YWx1ZXNcclxuICAgKi9cclxuICBwcml2YXRlIHNvcnRWYWx1ZXModmFsdWVzOiBWW10sIGNsYXVzZTogRW50aXR5U29ydENsYXVzZSk6IFZbXSB7XHJcbiAgICBpZiAoY2xhdXNlID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIHZhbHVlczsgfVxyXG4gICAgcmV0dXJuIHZhbHVlcy5zb3J0KCh2MTogViwgdjI6IFYpID0+IHtcclxuICAgICAgcmV0dXJuIE9iamVjdFV0aWxzLm5hdHVyYWxDb21wYXJlKFxyXG4gICAgICAgIGNsYXVzZS52YWx1ZUFjY2Vzc29yKHYxKSxcclxuICAgICAgICBjbGF1c2UudmFsdWVBY2Nlc3Nvcih2MiksXHJcbiAgICAgICAgY2xhdXNlLmRpcmVjdGlvblxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNldFZhbHVlcyh2YWx1ZXM6IFZbXSkge1xyXG4gICAgdGhpcy52YWx1ZXMkLm5leHQodmFsdWVzKTtcclxuICAgIGNvbnN0IGNvdW50ID0gdmFsdWVzLmxlbmd0aDtcclxuICAgIGNvbnN0IGVtcHR5ID0gY291bnQgPT09IDA7XHJcbiAgICB0aGlzLmNvdW50JC5uZXh0KGNvdW50KTtcclxuICAgIHRoaXMuZW1wdHkkLm5leHQoZW1wdHkpO1xyXG4gIH1cclxufVxyXG4iXX0=