import { BehaviorSubject } from 'rxjs';
export declare class SpinnerComponent {
    shown$: BehaviorSubject<boolean>;
    shown: boolean;
    constructor();
    show(): void;
    hide(): void;
}
