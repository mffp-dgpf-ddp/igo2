import { BehaviorSubject } from 'rxjs';
export declare class ActivityService {
    counter$: BehaviorSubject<number>;
    private ids;
    constructor();
    register(): string;
    unregister(id: string): void;
}
