import { BehaviorSubject, Observable } from 'rxjs';
import { EntityFilterClause, EntitySortClause, EntityJoinClause } from './entity.interfaces';
/**
 * An entity view streams entities from an observable source. These entities
 * can be filtered or sorted without affecting the source. A view can also
 * combine data from multiple sources, joined together.
 */
export declare class EntityView<E extends object, V extends object = E> {
    private source$;
    /**
     * Observable stream of values
     */
    readonly values$: BehaviorSubject<V[]>;
    /**
     * Whether this view has been lifted
     */
    private lifted;
    /**
     * Join clauses
     */
    private joins;
    /**
     * Observable of a filter clause
     */
    private filter$;
    /**
     * Observable of a sort clause
     */
    private sort$;
    /**
     * Subscription to the source (and joined sources) values
     */
    private values$$;
    /**
     * Number of entities
     */
    readonly count$: BehaviorSubject<number>;
    readonly count: number;
    /**
     * Whether the store is empty
     */
    readonly empty$: BehaviorSubject<boolean>;
    readonly empty: boolean;
    constructor(source$: BehaviorSubject<E[]>);
    /**
     * Get all the values
     * @returns Array of values
     */
    all(): V[];
    /**
     * Observe all the values
     * @returns Observable of values
     */
    all$(): BehaviorSubject<V[]>;
    /**
     * Get the first value that respects a criteria
     * @returns A value
     */
    firstBy(clause: EntityFilterClause<V>): V;
    /**
     * Observe the first value that respects a criteria
     * @returns Observable of a value
     */
    firstBy$(clause: EntityFilterClause<V>): Observable<V>;
    /**
     * Get all the values that respect a criteria
     * @returns Array of values
     */
    manyBy(clause: EntityFilterClause<V>): V[];
    /**
     * Observe all the values that respect a criteria
     * @returns Observable of values
     */
    manyBy$(clause: EntityFilterClause<V>): Observable<V[]>;
    /**
     * Clear the filter and sort and unsubscribe from the source
     */
    clear(): void;
    destroy(): void;
    /**
     * Join another source to the stream (chainable)
     * @param clause Join clause
     * @returns The view
     */
    join(clause: EntityJoinClause): EntityView<E, V>;
    /**
     * Filter values (chainable)
     * @param clause Filter clause
     * @returns The view
     */
    filter(clause: EntityFilterClause<V>): EntityView<E, V>;
    /**
     * Sort values (chainable)
     * @param clauseSort clause
     * @returns The view
     */
    sort(clause: EntitySortClause<V>): EntityView<E, V>;
    /**
     * Create the final observable
     * @returns Observable
     */
    lift(): void;
    /**
     * Create the source observable when no joins are defined
     * @returns Observable
     */
    private liftSource;
    /**
     * Create the source observable when joins are defined
     * @returns Observable
     */
    private liftJoinedSource;
    /**
     * Apply joins to a source's entity and return the final value
     * @returns Final value
     */
    private computeJoinedValue;
    /**
     * Filter and sort values before streaming them
     * @param values Values
     * @param filter Filter clause
     * @param sort Sort clause
     * @returns Filtered and sorted values
     */
    private processValues;
    /**
     * Filter values
     * @param values Values
     * @param filter Filter clause
     * @returns Filtered values
     */
    private filterValues;
    /**
     * Sort values
     * @param values Values
     * @param sort Sort clause
     * @returns Sorted values
     */
    private sortValues;
    private setValues;
}
