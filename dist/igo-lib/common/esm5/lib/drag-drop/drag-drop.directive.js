/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, HostListener, HostBinding, EventEmitter, Output, Input } from '@angular/core';
var DragAndDropDirective = /** @class */ (function () {
    function DragAndDropDirective() {
        this.allowedExtensions = [];
        this.filesDropped = new EventEmitter();
        this.filesInvalid = new EventEmitter();
        this.background = 'inherit';
    }
    /**
     * @param {?} evt
     * @return {?}
     */
    DragAndDropDirective.prototype.onDragOver = /**
     * @param {?} evt
     * @return {?}
     */
    function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = '#999';
    };
    /**
     * @param {?} evt
     * @return {?}
     */
    DragAndDropDirective.prototype.onDragLeave = /**
     * @param {?} evt
     * @return {?}
     */
    function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = 'inherit';
    };
    /**
     * @param {?} evt
     * @return {?}
     */
    DragAndDropDirective.prototype.onDrop = /**
     * @param {?} evt
     * @return {?}
     */
    function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = 'inherit';
        /** @type {?} */
        var filesObj = this.validExtensions(evt);
        if (filesObj.valid.length) {
            this.filesDropped.emit(filesObj.valid);
        }
        if (filesObj.invalid.length) {
            this.filesInvalid.emit(filesObj.invalid);
        }
    };
    /**
     * @private
     * @param {?} evt
     * @return {?}
     */
    DragAndDropDirective.prototype.validExtensions = /**
     * @private
     * @param {?} evt
     * @return {?}
     */
    function (evt) {
        var e_1, _a;
        /** @type {?} */
        var files = evt.dataTransfer.files;
        /** @type {?} */
        var filesObj = {
            valid: [],
            invalid: []
        };
        if (files.length > 0) {
            try {
                for (var files_1 = tslib_1.__values(files), files_1_1 = files_1.next(); !files_1_1.done; files_1_1 = files_1.next()) {
                    var file = files_1_1.value;
                    /** @type {?} */
                    var ext = file.name.split('.')[file.name.split('.').length - 1];
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
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (files_1_1 && !files_1_1.done && (_a = files_1.return)) _a.call(files_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        return filesObj;
    };
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
    return DragAndDropDirective;
}());
export { DragAndDropDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZy1kcm9wLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BpZ28yL2NvbW1vbi8iLCJzb3VyY2VzIjpbImxpYi9kcmFnLWRyb3AvZHJhZy1kcm9wLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLFdBQVcsRUFDWCxZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFDTixNQUFNLGVBQWUsQ0FBQztBQUV2QjtJQUFBO1FBS1csc0JBQWlCLEdBQWtCLEVBQUUsQ0FBQztRQUUzQixpQkFBWSxHQUF5QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXhELGlCQUFZLEdBQXlCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFbkMsZUFBVSxHQUFHLFNBQVMsQ0FBQztJQXVEbEUsQ0FBQzs7Ozs7SUFwRFEseUNBQVU7Ozs7SUFEakIsVUFDa0IsR0FBRztRQUNuQixHQUFHLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDckIsR0FBRyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDO0lBQzNCLENBQUM7Ozs7O0lBR00sMENBQVc7Ozs7SUFEbEIsVUFDbUIsR0FBRztRQUNwQixHQUFHLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDckIsR0FBRyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO0lBQzlCLENBQUM7Ozs7O0lBR00scUNBQU07Ozs7SUFEYixVQUNjLEdBQUc7UUFDZixHQUFHLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDckIsR0FBRyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDOztZQUN0QixRQUFRLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUM7UUFDMUMsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUN6QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDeEM7UUFDRCxJQUFJLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO1lBQzNCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUMxQztJQUNILENBQUM7Ozs7OztJQUVPLDhDQUFlOzs7OztJQUF2QixVQUF3QixHQUFHOzs7WUFDbkIsS0FBSyxHQUFHLEdBQUcsQ0FBQyxZQUFZLENBQUMsS0FBSzs7WUFDOUIsUUFBUSxHQUFHO1lBQ2YsS0FBSyxFQUFFLEVBQUU7WUFDVCxPQUFPLEVBQUUsRUFBRTtTQUNaO1FBQ0QsSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTs7Z0JBQ3BCLEtBQW1CLElBQUEsVUFBQSxpQkFBQSxLQUFLLENBQUEsNEJBQUEsK0NBQUU7b0JBQXJCLElBQU0sSUFBSSxrQkFBQTs7d0JBQ1AsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7b0JBQ2pFLElBQ0UsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sS0FBSyxDQUFDO3dCQUNuQyxDQUNFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDOzRCQUM5QyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FDaEIsRUFDRDt3QkFDQSxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztxQkFDM0I7eUJBQU07d0JBQ0wsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7cUJBQzdCO2lCQUNGOzs7Ozs7Ozs7U0FDRjtRQUVELE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7O2dCQWpFRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtpQkFDN0I7OztvQ0FHRSxLQUFLOytCQUVMLE1BQU07K0JBRU4sTUFBTTs2QkFFTixXQUFXLFNBQUMsa0JBQWtCOzZCQUU5QixZQUFZLFNBQUMsVUFBVSxFQUFFLENBQUMsUUFBUSxDQUFDOzhCQU9uQyxZQUFZLFNBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDO3lCQU9wQyxZQUFZLFNBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDOztJQXVDbEMsMkJBQUM7Q0FBQSxBQWxFRCxJQWtFQztTQS9EWSxvQkFBb0I7OztJQUUvQixpREFBK0M7Ozs7O0lBRS9DLDRDQUE0RTs7Ozs7SUFFNUUsNENBQTRFOzs7OztJQUU1RSwwQ0FBZ0UiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIERpcmVjdGl2ZSxcclxuICBIb3N0TGlzdGVuZXIsXHJcbiAgSG9zdEJpbmRpbmcsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIE91dHB1dCxcclxuICBJbnB1dFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbaWdvRHJhZ0FuZERyb3BdJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRHJhZ0FuZERyb3BEaXJlY3RpdmUge1xyXG5cclxuICBASW5wdXQoKSBhbGxvd2VkRXh0ZW5zaW9uczogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG5cclxuICBAT3V0cHV0KCkgcHJvdGVjdGVkIGZpbGVzRHJvcHBlZDogRXZlbnRFbWl0dGVyPEZpbGVbXT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIEBPdXRwdXQoKSBwcm90ZWN0ZWQgZmlsZXNJbnZhbGlkOiBFdmVudEVtaXR0ZXI8RmlsZVtdPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5iYWNrZ3JvdW5kJykgcHJpdmF0ZSBiYWNrZ3JvdW5kID0gJ2luaGVyaXQnO1xyXG5cclxuICBASG9zdExpc3RlbmVyKCdkcmFnb3ZlcicsIFsnJGV2ZW50J10pXHJcbiAgcHVibGljIG9uRHJhZ092ZXIoZXZ0KSB7XHJcbiAgICBldnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIHRoaXMuYmFja2dyb3VuZCA9ICcjOTk5JztcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIFsnJGV2ZW50J10pXHJcbiAgcHVibGljIG9uRHJhZ0xlYXZlKGV2dCkge1xyXG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBldnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB0aGlzLmJhY2tncm91bmQgPSAnaW5oZXJpdCc7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdkcm9wJywgWyckZXZlbnQnXSlcclxuICBwdWJsaWMgb25Ecm9wKGV2dCkge1xyXG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBldnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB0aGlzLmJhY2tncm91bmQgPSAnaW5oZXJpdCc7XHJcbiAgICBjb25zdCBmaWxlc09iaiA9IHRoaXMudmFsaWRFeHRlbnNpb25zKGV2dCk7XHJcbiAgICBpZiAoZmlsZXNPYmoudmFsaWQubGVuZ3RoKSB7XHJcbiAgICAgIHRoaXMuZmlsZXNEcm9wcGVkLmVtaXQoZmlsZXNPYmoudmFsaWQpO1xyXG4gICAgfVxyXG4gICAgaWYgKGZpbGVzT2JqLmludmFsaWQubGVuZ3RoKSB7XHJcbiAgICAgIHRoaXMuZmlsZXNJbnZhbGlkLmVtaXQoZmlsZXNPYmouaW52YWxpZCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHZhbGlkRXh0ZW5zaW9ucyhldnQpIHtcclxuICAgIGNvbnN0IGZpbGVzID0gZXZ0LmRhdGFUcmFuc2Zlci5maWxlcztcclxuICAgIGNvbnN0IGZpbGVzT2JqID0ge1xyXG4gICAgICB2YWxpZDogW10sXHJcbiAgICAgIGludmFsaWQ6IFtdXHJcbiAgICB9O1xyXG4gICAgaWYgKGZpbGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgZm9yIChjb25zdCBmaWxlIG9mIGZpbGVzKSB7XHJcbiAgICAgICAgY29uc3QgZXh0ID0gZmlsZS5uYW1lLnNwbGl0KCcuJylbZmlsZS5uYW1lLnNwbGl0KCcuJykubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgdGhpcy5hbGxvd2VkRXh0ZW5zaW9ucy5sZW5ndGggPT09IDAgfHxcclxuICAgICAgICAgIChcclxuICAgICAgICAgICAgdGhpcy5hbGxvd2VkRXh0ZW5zaW9ucy5sYXN0SW5kZXhPZihleHQpICE9PSAtMSAmJlxyXG4gICAgICAgICAgICBmaWxlLnNpemUgIT09IDBcclxuICAgICAgICAgIClcclxuICAgICAgICApIHtcclxuICAgICAgICAgIGZpbGVzT2JqLnZhbGlkLnB1c2goZmlsZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGZpbGVzT2JqLmludmFsaWQucHVzaChmaWxlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZmlsZXNPYmo7XHJcbiAgfVxyXG59XHJcbiJdfQ==