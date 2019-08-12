import { OnInit, OnDestroy } from '@angular/core';
import { ActivityService } from '@igo2/core';
import { SpinnerComponent } from './spinner.component';
/**
 * A directive to bind a SpinnerComponent to the activity service.
 * The activity service tracks any HTTP request and this directive
 * will display the spinner it's attached to when the activity counter
 * is greater than 0.
 */
export declare class SpinnerActivityDirective implements OnInit, OnDestroy {
    private spinner;
    private activityService;
    /**
     * Subscription to the activity service counter
     */
    private counter$$;
    constructor(spinner: SpinnerComponent, activityService: ActivityService);
    /**
     * Subscribe to the activity service counter and display the spinner
     * when it's is greater than 0.
     * @internal
     */
    ngOnInit(): void;
    /**
     * Unsubcribe to the activity service counter.
     * @internal
     */
    ngOnDestroy(): void;
}
