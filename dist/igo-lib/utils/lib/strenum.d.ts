/** Utility function to create a K:V from a list of strings */
export declare function strEnum<T extends string>(o: Array<T>): {
    [K in T]: K;
};
