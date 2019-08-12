/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, HostListener, HostBinding, EventEmitter, Output, Input } from '@angular/core';
export class DragAndDropDirective {
    constructor() {
        this.allowedExtensions = [];
        this.filesDropped = new EventEmitter();
        this.filesInvalid = new EventEmitter();
        this.background = 'inherit';
    }
    /**
     * @param {?} evt
     * @return {?}
     */
    onDragOver(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = '#999';
    }
    /**
     * @param {?} evt
     * @return {?}
     */
    onDragLeave(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = 'inherit';
    }
    /**
     * @param {?} evt
     * @return {?}
     */
    onDrop(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = 'inherit';
        /** @type {?} */
        const filesObj = this.validExtensions(evt);
        if (filesObj.valid.length) {
            this.filesDropped.emit(filesObj.valid);
        }
        if (filesObj.invalid.length) {
            this.filesInvalid.emit(filesObj.invalid);
        }
    }
    /**
     * @private
     * @param {?} evt
     * @return {?}
     */
    validExtensions(evt) {
        /** @type {?} */
        const files = evt.dataTransfer.files;
        /** @type {?} */
        const filesObj = {
            valid: [],
            invalid: []
        };
        if (files.length > 0) {
            for (const file of files) {
                /** @type {?} */
                const ext = file.name.split('.')[file.name.split('.').length - 1];
                if (this.allowedExtensions.length === 0 ||
                    (this.allowedExtensions.lastIndexOf(ext) !== -1 &&
                        file.size !== 0)) {
                    filesObj.valid.push(file);
                }
                else {
                    filesObj.invalid.push(file);
                }
            }
        }
        return filesObj;
    }
}
DragAndDropDirective.decorators = [
    { type: Directive, args: [{
                selector: '[igoDragAndDrop]'
            },] }
];
DragAndDropDirective.propDecorators = {
    allowedExtensions: [{ type: Input }],
    filesDropped: [{ type: Output }],
    filesInvalid: [{ type: Output }],
    background: [{ type: HostBinding, args: ['style.background',] }],
    onDragOver: [{ type: HostListener, args: ['dragover', ['$event'],] }],
    onDragLeave: [{ type: HostListener, args: ['dragleave', ['$event'],] }],
    onDrop: [{ type: HostListener, args: ['drop', ['$event'],] }]
};
if (false) {
    /** @type {?} */
    DragAndDropDirective.prototype.allowedExtensions;
    /**
     * @type {?}
     * @protected
     */
    DragAndDropDirective.prototype.filesDropped;
    /**
     * @type {?}
     * @protected
     */
    DragAndDropDirective.prototype.filesInvalid;
    /**
     * @type {?}
     * @private
     */
    DragAndDropDirective.prototype.background;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZy1kcm9wLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9kcmFnLWRyb3AvZHJhZy1kcm9wLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxZQUFZLEVBQ1osV0FBVyxFQUNYLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUNOLE1BQU0sZUFBZSxDQUFDO0FBS3ZCLE1BQU0sT0FBTyxvQkFBb0I7SUFIakM7UUFLVyxzQkFBaUIsR0FBa0IsRUFBRSxDQUFDO1FBRTNCLGlCQUFZLEdBQXlCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFeEQsaUJBQVksR0FBeUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVuQyxlQUFVLEdBQUcsU0FBUyxDQUFDO0lBdURsRSxDQUFDOzs7OztJQXBEUSxVQUFVLENBQUMsR0FBRztRQUNuQixHQUFHLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDckIsR0FBRyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDO0lBQzNCLENBQUM7Ozs7O0lBR00sV0FBVyxDQUFDLEdBQUc7UUFDcEIsR0FBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztJQUM5QixDQUFDOzs7OztJQUdNLE1BQU0sQ0FBQyxHQUFHO1FBQ2YsR0FBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQzs7Y0FDdEIsUUFBUSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDO1FBQzFDLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDekIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3hDO1FBQ0QsSUFBSSxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUMzQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDMUM7SUFDSCxDQUFDOzs7Ozs7SUFFTyxlQUFlLENBQUMsR0FBRzs7Y0FDbkIsS0FBSyxHQUFHLEdBQUcsQ0FBQyxZQUFZLENBQUMsS0FBSzs7Y0FDOUIsUUFBUSxHQUFHO1lBQ2YsS0FBSyxFQUFFLEVBQUU7WUFDVCxPQUFPLEVBQUUsRUFBRTtTQUNaO1FBQ0QsSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNwQixLQUFLLE1BQU0sSUFBSSxJQUFJLEtBQUssRUFBRTs7c0JBQ2xCLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2dCQUNqRSxJQUNFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEtBQUssQ0FBQztvQkFDbkMsQ0FDRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDOUMsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLENBQ2hCLEVBQ0Q7b0JBQ0EsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQzNCO3FCQUFNO29CQUNMLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUM3QjthQUNGO1NBQ0Y7UUFFRCxPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDOzs7WUFqRUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrQkFBa0I7YUFDN0I7OztnQ0FHRSxLQUFLOzJCQUVMLE1BQU07MkJBRU4sTUFBTTt5QkFFTixXQUFXLFNBQUMsa0JBQWtCO3lCQUU5QixZQUFZLFNBQUMsVUFBVSxFQUFFLENBQUMsUUFBUSxDQUFDOzBCQU9uQyxZQUFZLFNBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDO3FCQU9wQyxZQUFZLFNBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDOzs7O0lBdEJoQyxpREFBK0M7Ozs7O0lBRS9DLDRDQUE0RTs7Ozs7SUFFNUUsNENBQTRFOzs7OztJQUU1RSwwQ0FBZ0UiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIERpcmVjdGl2ZSxcclxuICBIb3N0TGlzdGVuZXIsXHJcbiAgSG9zdEJpbmRpbmcsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIE91dHB1dCxcclxuICBJbnB1dFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbaWdvRHJhZ0FuZERyb3BdJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRHJhZ0FuZERyb3BEaXJlY3RpdmUge1xyXG5cclxuICBASW5wdXQoKSBhbGxvd2VkRXh0ZW5zaW9uczogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG5cclxuICBAT3V0cHV0KCkgcHJvdGVjdGVkIGZpbGVzRHJvcHBlZDogRXZlbnRFbWl0dGVyPEZpbGVbXT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIEBPdXRwdXQoKSBwcm90ZWN0ZWQgZmlsZXNJbnZhbGlkOiBFdmVudEVtaXR0ZXI8RmlsZVtdPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5iYWNrZ3JvdW5kJykgcHJpdmF0ZSBiYWNrZ3JvdW5kID0gJ2luaGVyaXQnO1xyXG5cclxuICBASG9zdExpc3RlbmVyKCdkcmFnb3ZlcicsIFsnJGV2ZW50J10pXHJcbiAgcHVibGljIG9uRHJhZ092ZXIoZXZ0KSB7XHJcbiAgICBldnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIHRoaXMuYmFja2dyb3VuZCA9ICcjOTk5JztcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIFsnJGV2ZW50J10pXHJcbiAgcHVibGljIG9uRHJhZ0xlYXZlKGV2dCkge1xyXG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBldnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB0aGlzLmJhY2tncm91bmQgPSAnaW5oZXJpdCc7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdkcm9wJywgWyckZXZlbnQnXSlcclxuICBwdWJsaWMgb25Ecm9wKGV2dCkge1xyXG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBldnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB0aGlzLmJhY2tncm91bmQgPSAnaW5oZXJpdCc7XHJcbiAgICBjb25zdCBmaWxlc09iaiA9IHRoaXMudmFsaWRFeHRlbnNpb25zKGV2dCk7XHJcbiAgICBpZiAoZmlsZXNPYmoudmFsaWQubGVuZ3RoKSB7XHJcbiAgICAgIHRoaXMuZmlsZXNEcm9wcGVkLmVtaXQoZmlsZXNPYmoudmFsaWQpO1xyXG4gICAgfVxyXG4gICAgaWYgKGZpbGVzT2JqLmludmFsaWQubGVuZ3RoKSB7XHJcbiAgICAgIHRoaXMuZmlsZXNJbnZhbGlkLmVtaXQoZmlsZXNPYmouaW52YWxpZCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHZhbGlkRXh0ZW5zaW9ucyhldnQpIHtcclxuICAgIGNvbnN0IGZpbGVzID0gZXZ0LmRhdGFUcmFuc2Zlci5maWxlcztcclxuICAgIGNvbnN0IGZpbGVzT2JqID0ge1xyXG4gICAgICB2YWxpZDogW10sXHJcbiAgICAgIGludmFsaWQ6IFtdXHJcbiAgICB9O1xyXG4gICAgaWYgKGZpbGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgZm9yIChjb25zdCBmaWxlIG9mIGZpbGVzKSB7XHJcbiAgICAgICAgY29uc3QgZXh0ID0gZmlsZS5uYW1lLnNwbGl0KCcuJylbZmlsZS5uYW1lLnNwbGl0KCcuJykubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgdGhpcy5hbGxvd2VkRXh0ZW5zaW9ucy5sZW5ndGggPT09IDAgfHxcclxuICAgICAgICAgIChcclxuICAgICAgICAgICAgdGhpcy5hbGxvd2VkRXh0ZW5zaW9ucy5sYXN0SW5kZXhPZihleHQpICE9PSAtMSAmJlxyXG4gICAgICAgICAgICBmaWxlLnNpemUgIT09IDBcclxuICAgICAgICAgIClcclxuICAgICAgICApIHtcclxuICAgICAgICAgIGZpbGVzT2JqLnZhbGlkLnB1c2goZmlsZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGZpbGVzT2JqLmludmFsaWQucHVzaChmaWxlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZmlsZXNPYmo7XHJcbiAgfVxyXG59XHJcbiJdfQ==