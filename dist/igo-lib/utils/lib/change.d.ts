import { GroupingChanges } from './change.interface';
export declare class ChangeUtils {
    static findChanges(obj1: any[], obj2: any[], ignoreKeys?: string[]): GroupingChanges;
    private static compareObject;
}
