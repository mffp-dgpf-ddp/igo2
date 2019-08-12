import { EventEmitter } from '@angular/core';
export declare class DragAndDropDirective {
    allowedExtensions: Array<string>;
    protected filesDropped: EventEmitter<File[]>;
    protected filesInvalid: EventEmitter<File[]>;
    private background;
    onDragOver(evt: any): void;
    onDragLeave(evt: any): void;
    onDrop(evt: any): void;
    private validExtensions;
}
