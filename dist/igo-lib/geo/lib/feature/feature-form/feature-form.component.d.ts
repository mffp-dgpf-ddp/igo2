import { EventEmitter, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Form } from '@igo2/common';
import { Feature } from '../shared/feature.interfaces';
import { FeatureStore } from '../shared/store';
/**
 * A configurable form, optionnally bound to a feature.
 * This component creates an entity form and, on submit,
 * returns a feature made out of the submitted data. It also
 * does things like managing the feature visibility while it's being updated
 * as well as disabling the selection of another feature.
 */
export declare class FeatureFormComponent implements OnChanges, OnDestroy {
    feature$: BehaviorSubject<Feature>;
    /**
     * Form
     */
    form: Form;
    /**
     * Feature to update
     */
    feature: Feature | undefined;
    /**
     * The store the feature belongs to. Required to manage the
     * visiblity and selection.
     */
    store: FeatureStore | undefined;
    /**
     * Event emitted when the form is submitted
     */
    submitForm: EventEmitter<Feature<{
        [key: string]: any;
    }>>;
    constructor();
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * Show the original feature and reactivate the selection
     * @internal
     */
    ngOnDestroy(): void;
    /**
     * Transform the form data to a feature and emit an event
     * @param event Form submit event
     * @internal
     */
    onSubmit(data: {
        [key: string]: any;
    }): void;
    /**
     * Transform the form data to a feature
     * @param data Form data
     * @returns A feature
     */
    private formDataToFeature;
    private setStore;
    /**
     * Deactivate feature selection from the store and from the map
     */
    private deactivateStoreSelection;
    /**
     * Reactivate feature selection from the store and from the map
     */
    private activateStoreSelection;
}
