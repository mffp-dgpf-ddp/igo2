/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { BehaviorSubject, combineLatest } from 'rxjs';
import { debounceTime, map, skip } from 'rxjs/operators';
import { ObjectUtils } from '@igo2/utils';
/**
 * An entity view streams entities from an observable source. These entities
 * can be filtered or sorted without affecting the source. A view can also
 * combine data from multiple sources, joined together.
 * @template E, V
 */
var /**
 * An entity view streams entities from an observable source. These entities
 * can be filtered or sorted without affecting the source. A view can also
 * combine data from multiple sources, joined together.
 * @template E, V
 */
EntityView = /** @class */ (function () {
    function EntityView(source$) {
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
    Object.defineProperty(EntityView.prototype, "count", {
        /**
         * Number of entities
         */
        get: /**
         * Number of entities
         * @return {?}
         */
        function () { return this.values$.value.length; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityView.prototype, "empty", {
        /**
         * Whether there are entities in the view
         */
        get: /**
         * Whether there are entities in the view
         * @return {?}
         */
        function () { return this.count === 0; },
        enumerable: true,
        configurable: true
    });
    /**
     * Get all the values
     * @returns Array of values
     */
    /**
     * Get all the values
     * @return {?} Array of values
     */
    EntityView.prototype.all = /**
     * Get all the values
     * @return {?} Array of values
     */
    function () {
        return this.values$.value;
    };
    /**
     * Observe all the values
     * @returns Observable of values
     */
    /**
     * Observe all the values
     * @return {?} Observable of values
     */
    EntityView.prototype.all$ = /**
     * Observe all the values
     * @return {?} Observable of values
     */
    function () {
        return this.values$;
    };
    /**
     * Get the first value that respects a criteria
     * @returns A value
     */
    /**
     * Get the first value that respects a criteria
     * @param {?} clause
     * @return {?} A value
     */
    EntityView.prototype.firstBy = /**
     * Get the first value that respects a criteria
     * @param {?} clause
     * @return {?} A value
     */
    function (clause) {
        return this.values$.value.find(clause);
    };
    /**
     * Observe the first value that respects a criteria
     * @returns Observable of a value
     */
    /**
     * Observe the first value that respects a criteria
     * @param {?} clause
     * @return {?} Observable of a value
     */
    EntityView.prototype.firstBy$ = /**
     * Observe the first value that respects a criteria
     * @param {?} clause
     * @return {?} Observable of a value
     */
    function (clause) {
        return this.values$.pipe(map((/**
         * @param {?} values
         * @return {?}
         */
        function (values) { return values.find(clause); })));
    };
    /**
     * Get all the values that respect a criteria
     * @returns Array of values
     */
    /**
     * Get all the values that respect a criteria
     * @param {?} clause
     * @return {?} Array of values
     */
    EntityView.prototype.manyBy = /**
     * Get all the values that respect a criteria
     * @param {?} clause
     * @return {?} Array of values
     */
    function (clause) {
        return this.values$.value.filter(clause);
    };
    /**
     * Observe all the values that respect a criteria
     * @returns Observable of values
     */
    /**
     * Observe all the values that respect a criteria
     * @param {?} clause
     * @return {?} Observable of values
     */
    EntityView.prototype.manyBy$ = /**
     * Observe all the values that respect a criteria
     * @param {?} clause
     * @return {?} Observable of values
     */
    function (clause) {
        return this.values$.pipe(map((/**
         * @param {?} values
         * @return {?}
         */
        function (values) { return values.filter(clause); })));
    };
    /**
     * Clear the filter and sort and unsubscribe from the source
     */
    /**
     * Clear the filter and sort and unsubscribe from the source
     * @return {?}
     */
    EntityView.prototype.clear = /**
     * Clear the filter and sort and unsubscribe from the source
     * @return {?}
     */
    function () {
        this.filter(undefined);
        this.sort(undefined);
    };
    /**
     * @return {?}
     */
    EntityView.prototype.destroy = /**
     * @return {?}
     */
    function () {
        if (this.values$$ !== undefined) {
            this.values$$.unsubscribe();
        }
        this.clear();
    };
    /**
     * Join another source to the stream (chainable)
     * @param clause Join clause
     * @returns The view
     */
    /**
     * Join another source to the stream (chainable)
     * @param {?} clause Join clause
     * @return {?} The view
     */
    EntityView.prototype.join = /**
     * Join another source to the stream (chainable)
     * @param {?} clause Join clause
     * @return {?} The view
     */
    function (clause) {
        if (this.lifted === true) {
            throw new Error('This view has already been lifted, therefore, no join is allowed.');
        }
        this.joins.push(clause);
        return this;
    };
    /**
     * Filter values (chainable)
     * @param clause Filter clause
     * @returns The view
     */
    /**
     * Filter values (chainable)
     * @param {?} clause Filter clause
     * @return {?} The view
     */
    EntityView.prototype.filter = /**
     * Filter values (chainable)
     * @param {?} clause Filter clause
     * @return {?} The view
     */
    function (clause) {
        this.filter$.next(clause);
        return this;
    };
    /**
     * Sort values (chainable)
     * @param clauseSort clause
     * @returns The view
     */
    /**
     * Sort values (chainable)
     * @param {?} clause
     * @return {?} The view
     */
    EntityView.prototype.sort = /**
     * Sort values (chainable)
     * @param {?} clause
     * @return {?} The view
     */
    function (clause) {
        this.sort$.next(clause);
        return this;
    };
    /**
     * Create the final observable
     * @returns Observable
     */
    /**
     * Create the final observable
     * @return {?} Observable
     */
    EntityView.prototype.lift = /**
     * Create the final observable
     * @return {?} Observable
     */
    function () {
        var _this = this;
        this.lifted = true;
        /** @type {?} */
        var source$ = this.joins.length > 0 ? this.liftJoinedSource() : this.liftSource();
        this.values$$ = combineLatest(source$, this.filter$, this.sort$)
            .pipe(skip(1), debounceTime(50))
            .subscribe((/**
         * @param {?} bunch
         * @return {?}
         */
        function (bunch) {
            var _a = tslib_1.__read(bunch, 3), values = _a[0], filter = _a[1], sort = _a[2];
            _this.values$.next(_this.processValues(values, filter, sort));
        }));
    };
    /**
     * Create the source observable when no joins are defined
     * @returns Observable
     */
    /**
     * Create the source observable when no joins are defined
     * @private
     * @return {?} Observable
     */
    EntityView.prototype.liftSource = /**
     * Create the source observable when no joins are defined
     * @private
     * @return {?} Observable
     */
    function () {
        return (/** @type {?} */ ((/** @type {?} */ (this.source$))));
    };
    /**
     * Create the source observable when joins are defined
     * @returns Observable
     */
    /**
     * Create the source observable when joins are defined
     * @private
     * @return {?} Observable
     */
    EntityView.prototype.liftJoinedSource = /**
     * Create the source observable when joins are defined
     * @private
     * @return {?} Observable
     */
    function () {
        var _this = this;
        /** @type {?} */
        var sources$ = [this.source$, combineLatest.apply(void 0, tslib_1.__spread(this.joins.map((/**
             * @param {?} join
             * @return {?}
             */
            function (join) { return join.source; }))))];
        return combineLatest.apply(void 0, tslib_1.__spread(sources$)).pipe(map((/**
         * @param {?} bunch
         * @return {?}
         */
        function (bunch) {
            var _a = tslib_1.__read(bunch, 2), entities = _a[0], joinData = _a[1];
            return entities.reduce((/**
             * @param {?} values
             * @param {?} entity
             * @return {?}
             */
            function (values, entity) {
                /** @type {?} */
                var value = _this.computeJoinedValue(entity, joinData);
                if (value !== undefined) {
                    values.push(value);
                }
                return values;
            }), []);
        })));
    };
    /**
     * Apply joins to a source's entity and return the final value
     * @returns Final value
     */
    /**
     * Apply joins to a source's entity and return the final value
     * @private
     * @param {?} entity
     * @param {?} joinData
     * @return {?} Final value
     */
    EntityView.prototype.computeJoinedValue = /**
     * Apply joins to a source's entity and return the final value
     * @private
     * @param {?} entity
     * @param {?} joinData
     * @return {?} Final value
     */
    function (entity, joinData) {
        /** @type {?} */
        var value = (/** @type {?} */ (entity));
        /** @type {?} */
        var joinIndex = 0;
        while (value !== undefined && joinIndex < this.joins.length) {
            value = this.joins[joinIndex].reduce(value, joinData[joinIndex]);
            joinIndex += 1;
        }
        return (/** @type {?} */ (value));
    };
    /**
     * Filter and sort values before streaming them
     * @param values Values
     * @param filter Filter clause
     * @param sort Sort clause
     * @returns Filtered and sorted values
     */
    /**
     * Filter and sort values before streaming them
     * @private
     * @param {?} values Values
     * @param {?} filter Filter clause
     * @param {?} sort Sort clause
     * @return {?} Filtered and sorted values
     */
    EntityView.prototype.processValues = /**
     * Filter and sort values before streaming them
     * @private
     * @param {?} values Values
     * @param {?} filter Filter clause
     * @param {?} sort Sort clause
     * @return {?} Filtered and sorted values
     */
    function (values, filter, sort) {
        values = values.slice(0);
        values = this.filterValues(values, filter);
        values = this.sortValues(values, sort);
        return values;
    };
    /**
     * Filter values
     * @param values Values
     * @param filter Filter clause
     * @returns Filtered values
     */
    /**
     * Filter values
     * @private
     * @param {?} values Values
     * @param {?} clause
     * @return {?} Filtered values
     */
    EntityView.prototype.filterValues = /**
     * Filter values
     * @private
     * @param {?} values Values
     * @param {?} clause
     * @return {?} Filtered values
     */
    function (values, clause) {
        if (clause === undefined) {
            return values;
        }
        return values.filter((/**
         * @param {?} value
         * @return {?}
         */
        function (value) { return clause(value); }));
    };
    /**
     * Sort values
     * @param values Values
     * @param sort Sort clause
     * @returns Sorted values
     */
    /**
     * Sort values
     * @private
     * @param {?} values Values
     * @param {?} clause
     * @return {?} Sorted values
     */
    EntityView.prototype.sortValues = /**
     * Sort values
     * @private
     * @param {?} values Values
     * @param {?} clause
     * @return {?} Sorted values
     */
    function (values, clause) {
        if (clause === undefined) {
            return values;
        }
        return values.sort((/**
         * @param {?} v1
         * @param {?} v2
         * @return {?}
         */
        function (v1, v2) {
            return ObjectUtils.naturalCompare(clause.valueAccessor(v1), clause.valueAccessor(v2), clause.direction);
        }));
    };
    return EntityView;
}());
/**
 * An entity view streams entities from an observable source. These entities
 * can be filtered or sorted without affecting the source. A view can also
 * combine data from multiple sources, joined together.
 * @template E, V
 */
export { EntityView };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9lbnRpdHkvc2hhcmVkL3ZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsZUFBZSxFQUE0QixhQUFhLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDaEYsT0FBTyxFQUFFLFlBQVksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFekQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGFBQWEsQ0FBQzs7Ozs7OztBQVkxQzs7Ozs7OztJQTBDRSxvQkFBb0IsT0FBNkI7UUFBN0IsWUFBTyxHQUFQLE9BQU8sQ0FBc0I7Ozs7UUFyQ3hDLFlBQU8sR0FBRyxJQUFJLGVBQWUsQ0FBTSxFQUFFLENBQUMsQ0FBQzs7OztRQUt4QyxXQUFNLEdBQUcsS0FBSyxDQUFDOzs7O1FBS2YsVUFBSyxHQUF1QixFQUFFLENBQUM7Ozs7UUFLL0IsWUFBTyxHQUFHLElBQUksZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDOzs7O1FBS3pDLFVBQUssR0FBRyxJQUFJLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQWlCSyxDQUFDO0lBUHJELHNCQUFJLDZCQUFLO1FBSFQ7O1dBRUc7Ozs7O1FBQ0gsY0FBc0IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUt6RCxzQkFBSSw2QkFBSztRQUhUOztXQUVHOzs7OztRQUNILGNBQXVCLE9BQU8sSUFBSSxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUlqRDs7O09BR0c7Ozs7O0lBQ0gsd0JBQUc7Ozs7SUFBSDtRQUNFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7SUFDNUIsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7SUFDSCx5QkFBSTs7OztJQUFKO1FBQ0UsT0FB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LEVBQUUsTUFBd0I7UUFDdEQsSUFBSSxNQUFNLEtBQUssU0FBUyxFQUFFO1lBQUUsT0FBTyxNQUFNLENBQUM7U0FBRTtRQUM1QyxPQUFPLE1BQU0sQ0FBQyxJQUFJOzs7OztRQUFDLFVBQUMsRUFBSyxFQUFFLEVBQUs7WUFDOUIsT0FBTyxXQUFXLENBQUMsY0FBYyxDQUMvQixNQUFNLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxFQUN4QixNQUFNLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxFQUN4QixNQUFNLENBQUMsU0FBUyxDQUNqQixDQUFDO1FBQ0osQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0gsaUJBQUM7QUFBRCxDQUFDLEFBbFBELElBa1BDOzs7Ozs7Ozs7Ozs7O0lBN09DLDZCQUFnRDs7Ozs7O0lBS2hELDRCQUF1Qjs7Ozs7O0lBS3ZCLDJCQUF1Qzs7Ozs7O0lBS3ZDLDZCQUFpRDs7Ozs7O0lBS2pELDJCQUErQzs7Ozs7O0lBSy9DLDhCQUErQjs7Ozs7SUFZbkIsNkJBQXFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24sIGNvbWJpbmVMYXRlc3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBtYXAsIHNraXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyBPYmplY3RVdGlscyB9IGZyb20gJ0BpZ28yL3V0aWxzJztcclxuaW1wb3J0IHtcclxuICBFbnRpdHlGaWx0ZXJDbGF1c2UsXHJcbiAgRW50aXR5U29ydENsYXVzZSxcclxuICBFbnRpdHlKb2luQ2xhdXNlXHJcbn0gZnJvbSAnLi9lbnRpdHkuaW50ZXJmYWNlcyc7XHJcblxyXG4vKipcclxuICogQW4gZW50aXR5IHZpZXcgc3RyZWFtcyBlbnRpdGllcyBmcm9tIGFuIG9ic2VydmFibGUgc291cmNlLiBUaGVzZSBlbnRpdGllc1xyXG4gKiBjYW4gYmUgZmlsdGVyZWQgb3Igc29ydGVkIHdpdGhvdXQgYWZmZWN0aW5nIHRoZSBzb3VyY2UuIEEgdmlldyBjYW4gYWxzb1xyXG4gKiBjb21iaW5lIGRhdGEgZnJvbSBtdWx0aXBsZSBzb3VyY2VzLCBqb2luZWQgdG9nZXRoZXIuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRW50aXR5VmlldzxFIGV4dGVuZHMgb2JqZWN0LCBWIGV4dGVuZHMgb2JqZWN0ID0gRT4ge1xyXG5cclxuICAvKipcclxuICAgKiBPYnNlcnZhYmxlIHN0cmVhbSBvZiB2YWx1ZXNcclxuICAgKi9cclxuICByZWFkb25seSB2YWx1ZXMkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxWW10+KFtdKTtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0aGlzIHZpZXcgaGFzIGJlZW4gbGlmdGVkXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBsaWZ0ZWQgPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogSm9pbiBjbGF1c2VzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBqb2luczogRW50aXR5Sm9pbkNsYXVzZVtdID0gW107XHJcblxyXG4gIC8qKlxyXG4gICAqIE9ic2VydmFibGUgb2YgYSBmaWx0ZXIgY2xhdXNlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBmaWx0ZXIkID0gbmV3IEJlaGF2aW9yU3ViamVjdCh1bmRlZmluZWQpO1xyXG5cclxuICAvKipcclxuICAgKiBPYnNlcnZhYmxlIG9mIGEgc29ydCBjbGF1c2VcclxuICAgKi9cclxuICBwcml2YXRlIHNvcnQkID0gbmV3IEJlaGF2aW9yU3ViamVjdCh1bmRlZmluZWQpO1xyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpcHRpb24gdG8gdGhlIHNvdXJjZSAoYW5kIGpvaW5lZCBzb3VyY2VzKSB2YWx1ZXNcclxuICAgKi9cclxuICBwcml2YXRlIHZhbHVlcyQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIE51bWJlciBvZiBlbnRpdGllc1xyXG4gICAqL1xyXG4gIGdldCBjb3VudCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy52YWx1ZXMkLnZhbHVlLmxlbmd0aDsgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIHRoZXJlIGFyZSBlbnRpdGllcyBpbiB0aGUgdmlld1xyXG4gICAqL1xyXG4gIGdldCBlbXB0eSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuY291bnQgPT09IDA7IH1cclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzb3VyY2UkOiBCZWhhdmlvclN1YmplY3Q8RVtdPikge31cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IGFsbCB0aGUgdmFsdWVzXHJcbiAgICogQHJldHVybnMgQXJyYXkgb2YgdmFsdWVzXHJcbiAgICovXHJcbiAgYWxsKCk6IFZbXSB7XHJcbiAgICByZXR1cm4gdGhpcy52YWx1ZXMkLnZhbHVlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT2JzZXJ2ZSBhbGwgdGhlIHZhbHVlc1xyXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgdmFsdWVzXHJcbiAgICovXHJcbiAgYWxsJCgpOiBCZWhhdmlvclN1YmplY3Q8VltdPiB7XHJcbiAgICByZXR1cm4gdGhpcy52YWx1ZXMkO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBmaXJzdCB2YWx1ZSB0aGF0IHJlc3BlY3RzIGEgY3JpdGVyaWFcclxuICAgKiBAcmV0dXJucyBBIHZhbHVlXHJcbiAgICovXHJcbiAgZmlyc3RCeShjbGF1c2U6IEVudGl0eUZpbHRlckNsYXVzZTxWPik6IFYge1xyXG4gICAgcmV0dXJuIHRoaXMudmFsdWVzJC52YWx1ZS5maW5kKGNsYXVzZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBPYnNlcnZlIHRoZSBmaXJzdCB2YWx1ZSB0aGF0IHJlc3BlY3RzIGEgY3JpdGVyaWFcclxuICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlIG9mIGEgdmFsdWVcclxuICAgKi9cclxuICBmaXJzdEJ5JChjbGF1c2U6IEVudGl0eUZpbHRlckNsYXVzZTxWPik6IE9ic2VydmFibGU8Vj4ge1xyXG4gICAgcmV0dXJuIHRoaXMudmFsdWVzJC5waXBlKG1hcCgodmFsdWVzOiBWW10pID0+IHZhbHVlcy5maW5kKGNsYXVzZSkpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCBhbGwgdGhlIHZhbHVlcyB0aGF0IHJlc3BlY3QgYSBjcml0ZXJpYVxyXG4gICAqIEByZXR1cm5zIEFycmF5IG9mIHZhbHVlc1xyXG4gICAqL1xyXG4gIG1hbnlCeShjbGF1c2U6IEVudGl0eUZpbHRlckNsYXVzZTxWPik6IFZbXSB7XHJcbiAgICByZXR1cm4gdGhpcy52YWx1ZXMkLnZhbHVlLmZpbHRlcihjbGF1c2UpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT2JzZXJ2ZSBhbGwgdGhlIHZhbHVlcyB0aGF0IHJlc3BlY3QgYSBjcml0ZXJpYVxyXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgdmFsdWVzXHJcbiAgICovXHJcbiAgbWFueUJ5JChjbGF1c2U6IEVudGl0eUZpbHRlckNsYXVzZTxWPik6IE9ic2VydmFibGU8VltdPiB7XHJcbiAgICByZXR1cm4gdGhpcy52YWx1ZXMkLnBpcGUobWFwKCh2YWx1ZXM6IFZbXSkgPT4gdmFsdWVzLmZpbHRlcihjbGF1c2UpKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDbGVhciB0aGUgZmlsdGVyIGFuZCBzb3J0IGFuZCB1bnN1YnNjcmliZSBmcm9tIHRoZSBzb3VyY2VcclxuICAgKi9cclxuICBjbGVhcigpIHtcclxuICAgIHRoaXMuZmlsdGVyKHVuZGVmaW5lZCk7XHJcbiAgICB0aGlzLnNvcnQodW5kZWZpbmVkKTtcclxuICB9XHJcblxyXG4gIGRlc3Ryb3koKSB7XHJcbiAgICBpZiAodGhpcy52YWx1ZXMkJCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMudmFsdWVzJCQudW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuICAgIHRoaXMuY2xlYXIoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEpvaW4gYW5vdGhlciBzb3VyY2UgdG8gdGhlIHN0cmVhbSAoY2hhaW5hYmxlKVxyXG4gICAqIEBwYXJhbSBjbGF1c2UgSm9pbiBjbGF1c2VcclxuICAgKiBAcmV0dXJucyBUaGUgdmlld1xyXG4gICAqL1xyXG4gIGpvaW4oY2xhdXNlOiBFbnRpdHlKb2luQ2xhdXNlKTogRW50aXR5VmlldzxFLCBWPiB7XHJcbiAgICBpZiAodGhpcy5saWZ0ZWQgPT09IHRydWUpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGlzIHZpZXcgaGFzIGFscmVhZHkgYmVlbiBsaWZ0ZWQsIHRoZXJlZm9yZSwgbm8gam9pbiBpcyBhbGxvd2VkLicpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5qb2lucy5wdXNoKGNsYXVzZSk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZpbHRlciB2YWx1ZXMgKGNoYWluYWJsZSlcclxuICAgKiBAcGFyYW0gY2xhdXNlIEZpbHRlciBjbGF1c2VcclxuICAgKiBAcmV0dXJucyBUaGUgdmlld1xyXG4gICAqL1xyXG4gIGZpbHRlcihjbGF1c2U6IEVudGl0eUZpbHRlckNsYXVzZTxWPik6IEVudGl0eVZpZXc8RSwgVj4ge1xyXG4gICAgdGhpcy5maWx0ZXIkLm5leHQoY2xhdXNlKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU29ydCB2YWx1ZXMgKGNoYWluYWJsZSlcclxuICAgKiBAcGFyYW0gY2xhdXNlU29ydCBjbGF1c2VcclxuICAgKiBAcmV0dXJucyBUaGUgdmlld1xyXG4gICAqL1xyXG4gIHNvcnQoY2xhdXNlOiBFbnRpdHlTb3J0Q2xhdXNlPFY+KTogRW50aXR5VmlldzxFLCBWPiB7XHJcbiAgICB0aGlzLnNvcnQkLm5leHQoY2xhdXNlKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIHRoZSBmaW5hbCBvYnNlcnZhYmxlXHJcbiAgICogQHJldHVybnMgT2JzZXJ2YWJsZVxyXG4gICAqL1xyXG4gIGxpZnQoKSB7XHJcbiAgICB0aGlzLmxpZnRlZCA9IHRydWU7XHJcbiAgICBjb25zdCBzb3VyY2UkID0gdGhpcy5qb2lucy5sZW5ndGggPiAwID8gdGhpcy5saWZ0Sm9pbmVkU291cmNlKCkgOiB0aGlzLmxpZnRTb3VyY2UoKTtcclxuICAgIHRoaXMudmFsdWVzJCQgPSBjb21iaW5lTGF0ZXN0KHNvdXJjZSQsIHRoaXMuZmlsdGVyJCwgdGhpcy5zb3J0JClcclxuICAgICAgLnBpcGUoc2tpcCgxKSwgZGVib3VuY2VUaW1lKDUwKSlcclxuICAgICAgLnN1YnNjcmliZSgoYnVuY2g6IFtWW10sIEVudGl0eUZpbHRlckNsYXVzZSwgRW50aXR5U29ydENsYXVzZV0pID0+IHtcclxuICAgICAgICBjb25zdCBbdmFsdWVzLCBmaWx0ZXIsIHNvcnRdID0gYnVuY2g7XHJcbiAgICAgICAgdGhpcy52YWx1ZXMkLm5leHQodGhpcy5wcm9jZXNzVmFsdWVzKHZhbHVlcywgZmlsdGVyLCBzb3J0KSk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIHRoZSBzb3VyY2Ugb2JzZXJ2YWJsZSB3aGVuIG5vIGpvaW5zIGFyZSBkZWZpbmVkXHJcbiAgICogQHJldHVybnMgT2JzZXJ2YWJsZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgbGlmdFNvdXJjZSgpOiBPYnNlcnZhYmxlPFZbXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuc291cmNlJCBhcyBhbnkgYXMgT2JzZXJ2YWJsZTxWW10+O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIHRoZSBzb3VyY2Ugb2JzZXJ2YWJsZSB3aGVuIGpvaW5zIGFyZSBkZWZpbmVkXHJcbiAgICogQHJldHVybnMgT2JzZXJ2YWJsZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgbGlmdEpvaW5lZFNvdXJjZSgpOiBPYnNlcnZhYmxlPFZbXT4ge1xyXG4gICAgY29uc3Qgc291cmNlcyQgPSBbdGhpcy5zb3VyY2UkLCBjb21iaW5lTGF0ZXN0KFxyXG4gICAgICAuLi50aGlzLmpvaW5zLm1hcCgoam9pbjogRW50aXR5Sm9pbkNsYXVzZSkgPT4gam9pbi5zb3VyY2UpXHJcbiAgICApXTtcclxuXHJcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdCguLi5zb3VyY2VzJClcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgbWFwKChidW5jaDogW0VbXSwgYW55W11dKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBbZW50aXRpZXMsIGpvaW5EYXRhXSA9IGJ1bmNoO1xyXG4gICAgICAgICAgcmV0dXJuIGVudGl0aWVzLnJlZHVjZSgodmFsdWVzOiBWW10sIGVudGl0eTogRSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuY29tcHV0ZUpvaW5lZFZhbHVlKGVudGl0eSwgam9pbkRhdGEpO1xyXG4gICAgICAgICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgIHZhbHVlcy5wdXNoKHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWVzO1xyXG4gICAgICAgICAgfSwgW10pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBcHBseSBqb2lucyB0byBhIHNvdXJjZSdzIGVudGl0eSBhbmQgcmV0dXJuIHRoZSBmaW5hbCB2YWx1ZVxyXG4gICAqIEByZXR1cm5zIEZpbmFsIHZhbHVlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjb21wdXRlSm9pbmVkVmFsdWUoZW50aXR5OiBFLCBqb2luRGF0YTogYW55W10pOiBWIHwgdW5kZWZpbmVkIHtcclxuICAgIGxldCB2YWx1ZSA9IGVudGl0eSBhcyBQYXJ0aWFsPFY+O1xyXG4gICAgbGV0IGpvaW5JbmRleCA9IDA7XHJcbiAgICB3aGlsZSAodmFsdWUgIT09IHVuZGVmaW5lZCAmJiBqb2luSW5kZXggPCB0aGlzLmpvaW5zLmxlbmd0aCkge1xyXG4gICAgICB2YWx1ZSA9IHRoaXMuam9pbnNbam9pbkluZGV4XS5yZWR1Y2UodmFsdWUsIGpvaW5EYXRhW2pvaW5JbmRleF0pO1xyXG4gICAgICBqb2luSW5kZXggKz0gMTtcclxuICAgIH1cclxuICAgIHJldHVybiB2YWx1ZSBhcyBWO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRmlsdGVyIGFuZCBzb3J0IHZhbHVlcyBiZWZvcmUgc3RyZWFtaW5nIHRoZW1cclxuICAgKiBAcGFyYW0gdmFsdWVzIFZhbHVlc1xyXG4gICAqIEBwYXJhbSBmaWx0ZXIgRmlsdGVyIGNsYXVzZVxyXG4gICAqIEBwYXJhbSBzb3J0IFNvcnQgY2xhdXNlXHJcbiAgICogQHJldHVybnMgRmlsdGVyZWQgYW5kIHNvcnRlZCB2YWx1ZXNcclxuICAgKi9cclxuICBwcml2YXRlIHByb2Nlc3NWYWx1ZXModmFsdWVzOiBWW10sIGZpbHRlcjogRW50aXR5RmlsdGVyQ2xhdXNlLCBzb3J0OiBFbnRpdHlTb3J0Q2xhdXNlKTogVltdIHtcclxuICAgIHZhbHVlcyA9IHZhbHVlcy5zbGljZSgwKTtcclxuICAgIHZhbHVlcyA9IHRoaXMuZmlsdGVyVmFsdWVzKHZhbHVlcywgZmlsdGVyKTtcclxuICAgIHZhbHVlcyA9IHRoaXMuc29ydFZhbHVlcyh2YWx1ZXMsIHNvcnQpO1xyXG4gICAgcmV0dXJuIHZhbHVlcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZpbHRlciB2YWx1ZXNcclxuICAgKiBAcGFyYW0gdmFsdWVzIFZhbHVlc1xyXG4gICAqIEBwYXJhbSBmaWx0ZXIgRmlsdGVyIGNsYXVzZVxyXG4gICAqIEByZXR1cm5zIEZpbHRlcmVkIHZhbHVlc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgZmlsdGVyVmFsdWVzKHZhbHVlczogVltdLCBjbGF1c2U6IEVudGl0eUZpbHRlckNsYXVzZSk6IFZbXSB7XHJcbiAgICBpZiAoY2xhdXNlID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIHZhbHVlczsgfVxyXG4gICAgcmV0dXJuIHZhbHVlcy5maWx0ZXIoKHZhbHVlOiBWKSA9PiBjbGF1c2UodmFsdWUpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNvcnQgdmFsdWVzXHJcbiAgICogQHBhcmFtIHZhbHVlcyBWYWx1ZXNcclxuICAgKiBAcGFyYW0gc29ydCBTb3J0IGNsYXVzZVxyXG4gICAqIEByZXR1cm5zIFNvcnRlZCB2YWx1ZXNcclxuICAgKi9cclxuICBwcml2YXRlIHNvcnRWYWx1ZXModmFsdWVzOiBWW10sIGNsYXVzZTogRW50aXR5U29ydENsYXVzZSk6IFZbXSB7XHJcbiAgICBpZiAoY2xhdXNlID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIHZhbHVlczsgfVxyXG4gICAgcmV0dXJuIHZhbHVlcy5zb3J0KCh2MTogViwgdjI6IFYpID0+IHtcclxuICAgICAgcmV0dXJuIE9iamVjdFV0aWxzLm5hdHVyYWxDb21wYXJlKFxyXG4gICAgICAgIGNsYXVzZS52YWx1ZUFjY2Vzc29yKHYxKSxcclxuICAgICAgICBjbGF1c2UudmFsdWVBY2Nlc3Nvcih2MiksXHJcbiAgICAgICAgY2xhdXNlLmRpcmVjdGlvblxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==