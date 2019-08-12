import { Subject, Subscription } from 'rxjs';
export declare enum SubjectStatus {
    Error = 0,
    Done = 1,
    Working = 2,
    Waiting = 3
}
export declare abstract class Watcher {
    status$: Subject<SubjectStatus>;
    protected status$$: Subscription;
    status: SubjectStatus;
    private _status;
    protected abstract watch(): any;
    protected abstract unwatch(): any;
    subscribe(callback: Function, scope?: any): void;
    unsubscribe(): void;
    protected handleStatusChange(status: SubjectStatus): void;
}
