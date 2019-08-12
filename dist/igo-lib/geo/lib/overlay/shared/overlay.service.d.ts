import { BehaviorSubject } from 'rxjs';
import { Feature } from '../../feature/shared/feature.interfaces';
import { OverlayAction } from './overlay.enum';
export declare class OverlayService {
    features$: BehaviorSubject<[Feature<{
        [key: string]: any;
    }>[], OverlayAction]>;
    constructor();
    setFeatures(features: Feature[], action?: OverlayAction): void;
    clear(): void;
}
