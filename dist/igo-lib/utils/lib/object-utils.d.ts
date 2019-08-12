export declare class ObjectUtils {
    static resolve(obj: object, key: string): any;
    static isObject(item: object): boolean;
    static mergeDeep(target: object, source: object, ignoreUndefined?: boolean): any;
    static removeUndefined(obj: object): any;
    static removeNull(obj: object): any;
    static naturalCompare(a: any, b: any, direction?: string, nullFirst?: boolean): any;
    /**
     * Return true if two object are equivalent.
     * Objects are considered equivalent if they have the same properties and
     * if all of their properties (first-level only) share the same value.
     * @param obj1 First object
     * @param obj2 Second object
     * @returns Whether two objects arer equivalent
     */
    static objectsAreEquivalent(obj1: object, obj2: object): boolean;
    /**
     * Return a new object with an array of keys removed
     * @param obj Source object
     * @param keys Keys to remove
     * @returns A new object
     */
    static removeKeys(obj: object, keys: string[]): object;
}
