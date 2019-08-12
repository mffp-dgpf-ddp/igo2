import { BreakpointObserver } from '@angular/cdk/layout';
import { BehaviorSubject } from 'rxjs';
import { Media, MediaOrientation } from './media.enum';
export declare class MediaService {
    media$: BehaviorSubject<Media>;
    orientation$: BehaviorSubject<MediaOrientation>;
    constructor(breakpointObserver: BreakpointObserver);
    getMedia(): Media;
    getOrientation(): MediaOrientation;
}
