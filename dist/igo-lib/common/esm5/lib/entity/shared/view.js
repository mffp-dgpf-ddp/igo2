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
        /**
         * Number of entities
         */
        this.count$ = new BehaviorSubject(0);
        /**
         * Whether the store is empty
         */
        this.empty$ = new BehaviorSubject(true);
    }
    Object.defineProperty(EntityView.prototype, "count", {
        get: /**
         * @return {?}
         */
        function () { return this.count$.value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityView.prototype, "empty", {
        get: /**
         * @return {?}
         */
        function () { return this.empty$.value; },
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
            .pipe(skip(1), debounceTime(25))
            .subscribe((/**
         * @param {?} bunch
         * @return {?}
         */
        function (bunch) {
            var _a = tslib_1.__read(bunch, 3), _values = _a[0], filter = _a[1], sort = _a[2];
            /** @type {?} */
            var values = _this.processValues(_values, filter, sort);
            _this.setValues(values);
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
    /**
     * @private
     * @param {?} values
     * @return {?}
     */
    EntityView.prototype.setValues = /**
     * @private
     * @param {?} values
     * @return {?}
     */
    function (values) {
        this.values$.next(values);
        /** @type {?} */
        var count = values.length;
        /** @type {?} */
        var empty = count === 0;
        this.count$.next(count);
        this.empty$.next(empty);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9lbnRpdHkvc2hhcmVkL3ZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsZUFBZSxFQUE0QixhQUFhLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDaEYsT0FBTyxFQUFFLFlBQVksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFekQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGFBQWEsQ0FBQzs7Ozs7OztBQVkxQzs7Ozs7OztJQTRDRSxvQkFBb0IsT0FBNkI7UUFBN0IsWUFBTyxHQUFQLE9BQU8sQ0FBc0I7Ozs7UUF2Q3hDLFlBQU8sR0FBRyxJQUFJLGVBQWUsQ0FBTSxFQUFFLENBQUMsQ0FBQzs7OztRQUt4QyxXQUFNLEdBQUcsS0FBSyxDQUFDOzs7O1FBS2YsVUFBSyxHQUF1QixFQUFFLENBQUM7Ozs7UUFLL0IsWUFBTyxHQUFHLElBQUksZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDOzs7O1FBS3pDLFVBQUssR0FBRyxJQUFJLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQzs7OztRQVV0QyxXQUFNLEdBQUcsSUFBSSxlQUFlLENBQVMsQ0FBQyxDQUFDLENBQUM7Ozs7UUFNeEMsV0FBTSxHQUFHLElBQUksZUFBZSxDQUFVLElBQUksQ0FBQyxDQUFDO0lBR0QsQ0FBQztJQVJyRCxzQkFBSSw2QkFBSzs7OztRQUFULGNBQXNCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQU1qRCxzQkFBSSw2QkFBSzs7OztRQUFULGNBQXVCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUlsRDs7O09BR0c7Ozs7O0lBQ0gsd0JBQUc7Ozs7SUFBSDtRQUNFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxL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LEVBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRUQ7Ozs7O09BS0c7Ozs7Ozs7O0lBQ0ssK0JBQVU7Ozs7Ozs7SUFBbEIsVUFBbUIsTUFBVyxFQUFFLE1BQXdCO1FBQ3RELElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtZQUFFLE9BQU8sTUFBTSxDQUFDO1NBQUU7UUFDNUMsT0FBTyxNQUFNLENBQUMsSUFBSTs7Ozs7UUFBQyxVQUFDLEVBQUssRUFBRSxFQUFLO1lBQzlCLE9BQU8sV0FBVyxDQUFDLGNBQWMsQ0FDL0IsTUFBTSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsRUFDeEIsTUFBTSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsRUFDeEIsTUFBTSxDQUFDLFNBQVMsQ0FDakIsQ0FBQztRQUNKLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7O0lBRU8sOEJBQVM7Ozs7O0lBQWpCLFVBQWtCLE1BQVc7UUFDM0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7O1lBQ3BCLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBTTs7WUFDckIsS0FBSyxHQUFHLEtBQUssS0FBSyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFDSCxpQkFBQztBQUFELENBQUMsQUE3UEQsSUE2UEM7Ozs7Ozs7Ozs7Ozs7SUF4UEMsNkJBQWdEOzs7Ozs7SUFLaEQsNEJBQXVCOzs7Ozs7SUFLdkIsMkJBQXVDOzs7Ozs7SUFLdkMsNkJBQWlEOzs7Ozs7SUFLakQsMkJBQStDOzs7Ozs7SUFLL0MsOEJBQStCOzs7OztJQUsvQiw0QkFBaUQ7Ozs7O0lBTWpELDRCQUFxRDs7Ozs7SUFHekMsNkJBQXFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24sIGNvbWJpbmVMYXRlc3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBtYXAsIHNraXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyBPYmplY3RVdGlscyB9IGZyb20gJ0BpZ28yL3V0aWxzJztcclxuaW1wb3J0IHtcclxuICBFbnRpdHlGaWx0ZXJDbGF1c2UsXHJcbiAgRW50aXR5U29ydENsYXVzZSxcclxuICBFbnRpdHlKb2luQ2xhdXNlXHJcbn0gZnJvbSAnLi9lbnRpdHkuaW50ZXJmYWNlcyc7XHJcblxyXG4vKipcclxuICogQW4gZW50aXR5IHZpZXcgc3RyZWFtcyBlbnRpdGllcyBmcm9tIGFuIG9ic2VydmFibGUgc291cmNlLiBUaGVzZSBlbnRpdGllc1xyXG4gKiBjYW4gYmUgZmlsdGVyZWQgb3Igc29ydGVkIHdpdGhvdXQgYWZmZWN0aW5nIHRoZSBzb3VyY2UuIEEgdmlldyBjYW4gYWxzb1xyXG4gKiBjb21iaW5lIGRhdGEgZnJvbSBtdWx0aXBsZSBzb3VyY2VzLCBqb2luZWQgdG9nZXRoZXIuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRW50aXR5VmlldzxFIGV4dGVuZHMgb2JqZWN0LCBWIGV4dGVuZHMgb2JqZWN0ID0gRT4ge1xyXG5cclxuICAvKipcclxuICAgKiBPYnNlcnZhYmxlIHN0cmVhbSBvZiB2YWx1ZXNcclxuICAgKi9cclxuICByZWFkb25seSB2YWx1ZXMkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxWW10+KFtdKTtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0aGlzIHZpZXcgaGFzIGJlZW4gbGlmdGVkXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBsaWZ0ZWQgPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogSm9pbiBjbGF1c2VzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBqb2luczogRW50aXR5Sm9pbkNsYXVzZVtdID0gW107XHJcblxyXG4gIC8qKlxyXG4gICAqIE9ic2VydmFibGUgb2YgYSBmaWx0ZXIgY2xhdXNlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBmaWx0ZXIkID0gbmV3IEJlaGF2aW9yU3ViamVjdCh1bmRlZmluZWQpO1xyXG5cclxuICAvKipcclxuICAgKiBPYnNlcnZhYmxlIG9mIGEgc29ydCBjbGF1c2VcclxuICAgKi9cclxuICBwcml2YXRlIHNvcnQkID0gbmV3IEJlaGF2aW9yU3ViamVjdCh1bmRlZmluZWQpO1xyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpcHRpb24gdG8gdGhlIHNvdXJjZSAoYW5kIGpvaW5lZCBzb3VyY2VzKSB2YWx1ZXNcclxuICAgKi9cclxuICBwcml2YXRlIHZhbHVlcyQkOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIE51bWJlciBvZiBlbnRpdGllc1xyXG4gICAqL1xyXG4gIHJlYWRvbmx5IGNvdW50JCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcclxuICBnZXQgY291bnQoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuY291bnQkLnZhbHVlOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgdGhlIHN0b3JlIGlzIGVtcHR5XHJcbiAgICovXHJcbiAgcmVhZG9ubHkgZW1wdHkkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPih0cnVlKTtcclxuICBnZXQgZW1wdHkoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLmVtcHR5JC52YWx1ZTsgfVxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNvdXJjZSQ6IEJlaGF2aW9yU3ViamVjdDxFW10+KSB7fVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgYWxsIHRoZSB2YWx1ZXNcclxuICAgKiBAcmV0dXJucyBBcnJheSBvZiB2YWx1ZXNcclxuICAgKi9cclxuICBhbGwoKTogVltdIHtcclxuICAgIHJldHVybiB0aGlzLnZhbHVlcyQudmFsdWU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBPYnNlcnZlIGFsbCB0aGUgdmFsdWVzXHJcbiAgICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiB2YWx1ZXNcclxuICAgKi9cclxuICBhbGwkKCk6IEJlaGF2aW9yU3ViamVjdDxWW10+IHtcclxuICAgIHJldHVybiB0aGlzLnZhbHVlcyQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIGZpcnN0IHZhbHVlIHRoYXQgcmVzcGVjdHMgYSBjcml0ZXJpYVxyXG4gICAqIEByZXR1cm5zIEEgdmFsdWVcclxuICAgKi9cclxuICBmaXJzdEJ5KGNsYXVzZTogRW50aXR5RmlsdGVyQ2xhdXNlPFY+KTogViB7XHJcbiAgICByZXR1cm4gdGhpcy52YWx1ZXMkLnZhbHVlLmZpbmQoY2xhdXNlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9ic2VydmUgdGhlIGZpcnN0IHZhbHVlIHRoYXQgcmVzcGVjdHMgYSBjcml0ZXJpYVxyXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGUgb2YgYSB2YWx1ZVxyXG4gICAqL1xyXG4gIGZpcnN0QnkkKGNsYXVzZTogRW50aXR5RmlsdGVyQ2xhdXNlPFY+KTogT2JzZXJ2YWJsZTxWPiB7XHJcbiAgICByZXR1cm4gdGhpcy52YWx1ZXMkLnBpcGUobWFwKCh2YWx1ZXM6IFZbXSkgPT4gdmFsdWVzLmZpbmQoY2xhdXNlKSkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IGFsbCB0aGUgdmFsdWVzIHRoYXQgcmVzcGVjdCBhIGNyaXRlcmlhXHJcbiAgICogQHJldHVybnMgQXJyYXkgb2YgdmFsdWVzXHJcbiAgICovXHJcbiAgbWFueUJ5KGNsYXVzZTogRW50aXR5RmlsdGVyQ2xhdXNlPFY+KTogVltdIHtcclxuICAgIHJldHVybiB0aGlzLnZhbHVlcyQudmFsdWUuZmlsdGVyKGNsYXVzZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBPYnNlcnZlIGFsbCB0aGUgdmFsdWVzIHRoYXQgcmVzcGVjdCBhIGNyaXRlcmlhXHJcbiAgICogQHJldHVybnMgT2JzZXJ2YWJsZSBvZiB2YWx1ZXNcclxuICAgKi9cclxuICBtYW55QnkkKGNsYXVzZTogRW50aXR5RmlsdGVyQ2xhdXNlPFY+KTogT2JzZXJ2YWJsZTxWW10+IHtcclxuICAgIHJldHVybiB0aGlzLnZhbHVlcyQucGlwZShtYXAoKHZhbHVlczogVltdKSA9PiB2YWx1ZXMuZmlsdGVyKGNsYXVzZSkpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENsZWFyIHRoZSBmaWx0ZXIgYW5kIHNvcnQgYW5kIHVuc3Vic2NyaWJlIGZyb20gdGhlIHNvdXJjZVxyXG4gICAqL1xyXG4gIGNsZWFyKCkge1xyXG4gICAgdGhpcy5maWx0ZXIodW5kZWZpbmVkKTtcclxuICAgIHRoaXMuc29ydCh1bmRlZmluZWQpO1xyXG4gIH1cclxuXHJcbiAgZGVzdHJveSgpIHtcclxuICAgIGlmICh0aGlzLnZhbHVlcyQkICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy52YWx1ZXMkJC51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5jbGVhcigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSm9pbiBhbm90aGVyIHNvdXJjZSB0byB0aGUgc3RyZWFtIChjaGFpbmFibGUpXHJcbiAgICogQHBhcmFtIGNsYXVzZSBKb2luIGNsYXVzZVxyXG4gICAqIEByZXR1cm5zIFRoZSB2aWV3XHJcbiAgICovXHJcbiAgam9pbihjbGF1c2U6IEVudGl0eUpvaW5DbGF1c2UpOiBFbnRpdHlWaWV3PEUsIFY+IHtcclxuICAgIGlmICh0aGlzLmxpZnRlZCA9PT0gdHJ1ZSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoaXMgdmlldyBoYXMgYWxyZWFkeSBiZWVuIGxpZnRlZCwgdGhlcmVmb3JlLCBubyBqb2luIGlzIGFsbG93ZWQuJyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmpvaW5zLnB1c2goY2xhdXNlKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRmlsdGVyIHZhbHVlcyAoY2hhaW5hYmxlKVxyXG4gICAqIEBwYXJhbSBjbGF1c2UgRmlsdGVyIGNsYXVzZVxyXG4gICAqIEByZXR1cm5zIFRoZSB2aWV3XHJcbiAgICovXHJcbiAgZmlsdGVyKGNsYXVzZTogRW50aXR5RmlsdGVyQ2xhdXNlPFY+KTogRW50aXR5VmlldzxFLCBWPiB7XHJcbiAgICB0aGlzLmZpbHRlciQubmV4dChjbGF1c2UpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTb3J0IHZhbHVlcyAoY2hhaW5hYmxlKVxyXG4gICAqIEBwYXJhbSBjbGF1c2VTb3J0IGNsYXVzZVxyXG4gICAqIEByZXR1cm5zIFRoZSB2aWV3XHJcbiAgICovXHJcbiAgc29ydChjbGF1c2U6IEVudGl0eVNvcnRDbGF1c2U8Vj4pOiBFbnRpdHlWaWV3PEUsIFY+IHtcclxuICAgIHRoaXMuc29ydCQubmV4dChjbGF1c2UpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGUgdGhlIGZpbmFsIG9ic2VydmFibGVcclxuICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlXHJcbiAgICovXHJcbiAgbGlmdCgpIHtcclxuICAgIHRoaXMubGlmdGVkID0gdHJ1ZTtcclxuICAgIGNvbnN0IHNvdXJjZSQgPSB0aGlzLmpvaW5zLmxlbmd0aCA+IDAgPyB0aGlzLmxpZnRKb2luZWRTb3VyY2UoKSA6IHRoaXMubGlmdFNvdXJjZSgpO1xyXG4gICAgdGhpcy52YWx1ZXMkJCA9IGNvbWJpbmVMYXRlc3Qoc291cmNlJCwgdGhpcy5maWx0ZXIkLCB0aGlzLnNvcnQkKVxyXG4gICAgICAucGlwZShza2lwKDEpLCBkZWJvdW5jZVRpbWUoMjUpKVxyXG4gICAgICAuc3Vic2NyaWJlKChidW5jaDogW1ZbXSwgRW50aXR5RmlsdGVyQ2xhdXNlLCBFbnRpdHlTb3J0Q2xhdXNlXSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IFtfdmFsdWVzLCBmaWx0ZXIsIHNvcnRdID0gYnVuY2g7XHJcbiAgICAgICAgY29uc3QgdmFsdWVzID0gdGhpcy5wcm9jZXNzVmFsdWVzKF92YWx1ZXMsIGZpbHRlciwgc29ydCk7XHJcbiAgICAgICAgdGhpcy5zZXRWYWx1ZXModmFsdWVzKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGUgdGhlIHNvdXJjZSBvYnNlcnZhYmxlIHdoZW4gbm8gam9pbnMgYXJlIGRlZmluZWRcclxuICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBsaWZ0U291cmNlKCk6IE9ic2VydmFibGU8VltdPiB7XHJcbiAgICByZXR1cm4gdGhpcy5zb3VyY2UkIGFzIGFueSBhcyBPYnNlcnZhYmxlPFZbXT47XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGUgdGhlIHNvdXJjZSBvYnNlcnZhYmxlIHdoZW4gam9pbnMgYXJlIGRlZmluZWRcclxuICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBsaWZ0Sm9pbmVkU291cmNlKCk6IE9ic2VydmFibGU8VltdPiB7XHJcbiAgICBjb25zdCBzb3VyY2VzJCA9IFt0aGlzLnNvdXJjZSQsIGNvbWJpbmVMYXRlc3QoXHJcbiAgICAgIC4uLnRoaXMuam9pbnMubWFwKChqb2luOiBFbnRpdHlKb2luQ2xhdXNlKSA9PiBqb2luLnNvdXJjZSlcclxuICAgICldO1xyXG5cclxuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KC4uLnNvdXJjZXMkKVxyXG4gICAgICAucGlwZShcclxuICAgICAgICBtYXAoKGJ1bmNoOiBbRVtdLCBhbnlbXV0pID0+IHtcclxuICAgICAgICAgIGNvbnN0IFtlbnRpdGllcywgam9pbkRhdGFdID0gYnVuY2g7XHJcbiAgICAgICAgICByZXR1cm4gZW50aXRpZXMucmVkdWNlKCh2YWx1ZXM6IFZbXSwgZW50aXR5OiBFKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5jb21wdXRlSm9pbmVkVmFsdWUoZW50aXR5LCBqb2luRGF0YSk7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgdmFsdWVzLnB1c2godmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZXM7XHJcbiAgICAgICAgICB9LCBbXSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFwcGx5IGpvaW5zIHRvIGEgc291cmNlJ3MgZW50aXR5IGFuZCByZXR1cm4gdGhlIGZpbmFsIHZhbHVlXHJcbiAgICogQHJldHVybnMgRmluYWwgdmFsdWVcclxuICAgKi9cclxuICBwcml2YXRlIGNvbXB1dGVKb2luZWRWYWx1ZShlbnRpdHk6IEUsIGpvaW5EYXRhOiBhbnlbXSk6IFYgfCB1bmRlZmluZWQge1xyXG4gICAgbGV0IHZhbHVlID0gZW50aXR5IGFzIFBhcnRpYWw8Vj47XHJcbiAgICBsZXQgam9pbkluZGV4ID0gMDtcclxuICAgIHdoaWxlICh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIGpvaW5JbmRleCA8IHRoaXMuam9pbnMubGVuZ3RoKSB7XHJcbiAgICAgIHZhbHVlID0gdGhpcy5qb2luc1tqb2luSW5kZXhdLnJlZHVjZSh2YWx1ZSwgam9pbkRhdGFbam9pbkluZGV4XSk7XHJcbiAgICAgIGpvaW5JbmRleCArPSAxO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZhbHVlIGFzIFY7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGaWx0ZXIgYW5kIHNvcnQgdmFsdWVzIGJlZm9yZSBzdHJlYW1pbmcgdGhlbVxyXG4gICAqIEBwYXJhbSB2YWx1ZXMgVmFsdWVzXHJcbiAgICogQHBhcmFtIGZpbHRlciBGaWx0ZXIgY2xhdXNlXHJcbiAgICogQHBhcmFtIHNvcnQgU29ydCBjbGF1c2VcclxuICAgKiBAcmV0dXJucyBGaWx0ZXJlZCBhbmQgc29ydGVkIHZhbHVlc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgcHJvY2Vzc1ZhbHVlcyh2YWx1ZXM6IFZbXSwgZmlsdGVyOiBFbnRpdHlGaWx0ZXJDbGF1c2UsIHNvcnQ6IEVudGl0eVNvcnRDbGF1c2UpOiBWW10ge1xyXG4gICAgdmFsdWVzID0gdmFsdWVzLnNsaWNlKDApO1xyXG4gICAgdmFsdWVzID0gdGhpcy5maWx0ZXJWYWx1ZXModmFsdWVzLCBmaWx0ZXIpO1xyXG4gICAgdmFsdWVzID0gdGhpcy5zb3J0VmFsdWVzKHZhbHVlcywgc29ydCk7XHJcbiAgICByZXR1cm4gdmFsdWVzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRmlsdGVyIHZhbHVlc1xyXG4gICAqIEBwYXJhbSB2YWx1ZXMgVmFsdWVzXHJcbiAgICogQHBhcmFtIGZpbHRlciBGaWx0ZXIgY2xhdXNlXHJcbiAgICogQHJldHVybnMgRmlsdGVyZWQgdmFsdWVzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBmaWx0ZXJWYWx1ZXModmFsdWVzOiBWW10sIGNsYXVzZTogRW50aXR5RmlsdGVyQ2xhdXNlKTogVltdIHtcclxuICAgIGlmIChjbGF1c2UgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdmFsdWVzOyB9XHJcbiAgICByZXR1cm4gdmFsdWVzLmZpbHRlcigodmFsdWU6IFYpID0+IGNsYXVzZSh2YWx1ZSkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU29ydCB2YWx1ZXNcclxuICAgKiBAcGFyYW0gdmFsdWVzIFZhbHVlc1xyXG4gICAqIEBwYXJhbSBzb3J0IFNvcnQgY2xhdXNlXHJcbiAgICogQHJldHVybnMgU29ydGVkIHZhbHVlc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgc29ydFZhbHVlcyh2YWx1ZXM6IFZbXSwgY2xhdXNlOiBFbnRpdHlTb3J0Q2xhdXNlKTogVltdIHtcclxuICAgIGlmIChjbGF1c2UgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdmFsdWVzOyB9XHJcbiAgICByZXR1cm4gdmFsdWVzLnNvcnQoKHYxOiBWLCB2MjogVikgPT4ge1xyXG4gICAgICByZXR1cm4gT2JqZWN0VXRpbHMubmF0dXJhbENvbXBhcmUoXHJcbiAgICAgICAgY2xhdXNlLnZhbHVlQWNjZXNzb3IodjEpLFxyXG4gICAgICAgIGNsYXVzZS52YWx1ZUFjY2Vzc29yKHYyKSxcclxuICAgICAgICBjbGF1c2UuZGlyZWN0aW9uXHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2V0VmFsdWVzKHZhbHVlczogVltdKSB7XHJcbiAgICB0aGlzLnZhbHVlcyQubmV4dCh2YWx1ZXMpO1xyXG4gICAgY29uc3QgY291bnQgPSB2YWx1ZXMubGVuZ3RoO1xyXG4gICAgY29uc3QgZW1wdHkgPSBjb3VudCA9PT0gMDtcclxuICAgIHRoaXMuY291bnQkLm5leHQoY291bnQpO1xyXG4gICAgdGhpcy5lbXB0eSQubmV4dChlbXB0eSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==