/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as bowser from 'bowser';
var Clipboard = /** @class */ (function () {
    function Clipboard() {
    }
    /**
     * @param {?} element
     * @return {?}
     */
    Clipboard.copy = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        /** @type {?} */
        var successful = false;
        if (typeof element === 'string') {
            /** @type {?} */
            var textArea = Clipboard.createTextArea(element);
            Clipboard.selectText(textArea);
            successful = Clipboard.copyTextToClipboard();
            Clipboard.destroyTextArea(textArea);
        }
        else {
            Clipboard.selectText(element);
            successful = Clipboard.copyTextToClipboard();
        }
        return successful;
    };
    /**
     * @private
     * @param {?} text
     * @return {?}
     */
    Clipboard.createTextArea = /**
     * @private
     * @param {?} text
     * @return {?}
     */
    function (text) {
        /** @type {?} */
        var textArea = (/** @type {?} */ (document.createElement('textArea')));
        textArea.value = text;
        document.body.appendChild(textArea);
        return textArea;
    };
    /**
     * @private
     * @param {?} textArea
     * @return {?}
     */
    Clipboard.destroyTextArea = /**
     * @private
     * @param {?} textArea
     * @return {?}
     */
    function (textArea) {
        document.body.removeChild(textArea);
    };
    /**
     * @private
     * @param {?} textArea
     * @return {?}
     */
    Clipboard.selectText = /**
     * @private
     * @param {?} textArea
     * @return {?}
     */
    function (textArea) {
        if (bowser.ios) {
            /** @type {?} */
            var oldContentEditable = textArea.contentEditable;
            /** @type {?} */
            var oldReadOnly = textArea.readOnly;
            /** @type {?} */
            var range = document.createRange();
            /** @type {?} */
            var selection = window.getSelection();
            textArea.contenteditable = true;
            textArea.readonly = false;
            range.selectNodeContents(textArea);
            selection.removeAllRanges();
            selection.addRange(range);
            textArea.setSelectionRange(0, 999999);
            textArea.contentEditable = oldContentEditable;
            textArea.readOnly = oldReadOnly;
        }
        else {
            textArea.select();
        }
    };
    /**
     * @private
     * @return {?}
     */
    Clipboard.copyTextToClipboard = /**
     * @private
     * @return {?}
     */
    function () {
        if (!(bowser.ios && bowser.version < 10)) {
            return document.execCommand('copy');
        }
        return false;
    };
    return Clipboard;
}());
export { Clipboard };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpcGJvYXJkLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvdXRpbHMvIiwic291cmNlcyI6WyJsaWIvY2xpcGJvYXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEtBQUssTUFBTSxNQUFNLFFBQVEsQ0FBQztBQUVqQztJQUFBO0lBb0RBLENBQUM7Ozs7O0lBbkRRLGNBQUk7Ozs7SUFBWCxVQUFZLE9BQXFDOztZQUMzQyxVQUFVLEdBQUcsS0FBSztRQUN0QixJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVEsRUFBRTs7Z0JBQ3pCLFFBQVEsR0FBRyxTQUFTLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQztZQUNsRCxTQUFTLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQy9CLFVBQVUsR0FBRyxTQUFTLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztZQUM3QyxTQUFTLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3JDO2FBQU07WUFDTCxTQUFTLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzlCLFVBQVUsR0FBRyxTQUFTLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztTQUM5QztRQUNELE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7Ozs7OztJQUVjLHdCQUFjOzs7OztJQUE3QixVQUE4QixJQUFZOztZQUNsQyxRQUFRLEdBQUcsbUJBQUEsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsRUFBdUI7UUFDMUUsUUFBUSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDdEIsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDcEMsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQzs7Ozs7O0lBRWMseUJBQWU7Ozs7O0lBQTlCLFVBQStCLFFBQVE7UUFDckMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdEMsQ0FBQzs7Ozs7O0lBRWMsb0JBQVU7Ozs7O0lBQXpCLFVBQTBCLFFBQVE7UUFDaEMsSUFBSSxNQUFNLENBQUMsR0FBRyxFQUFFOztnQkFDUixrQkFBa0IsR0FBRyxRQUFRLENBQUMsZUFBZTs7Z0JBQzdDLFdBQVcsR0FBRyxRQUFRLENBQUMsUUFBUTs7Z0JBQy9CLEtBQUssR0FBRyxRQUFRLENBQUMsV0FBVyxFQUFFOztnQkFDOUIsU0FBUyxHQUFHLE1BQU0sQ0FBQyxZQUFZLEVBQUU7WUFFdkMsUUFBUSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7WUFDaEMsUUFBUSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDMUIsS0FBSyxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ25DLFNBQVMsQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUM1QixTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzFCLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDdEMsUUFBUSxDQUFDLGVBQWUsR0FBRyxrQkFBa0IsQ0FBQztZQUM5QyxRQUFRLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQztTQUNqQzthQUFNO1lBQ0wsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ25CO0lBQ0gsQ0FBQzs7Ozs7SUFFYyw2QkFBbUI7Ozs7SUFBbEM7UUFDRSxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLEVBQUU7WUFDeEMsT0FBTyxRQUFRLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3JDO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBQ0gsZ0JBQUM7QUFBRCxDQUFDLEFBcERELElBb0RDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgYm93c2VyIGZyb20gJ2Jvd3Nlcic7XHJcblxyXG5leHBvcnQgY2xhc3MgQ2xpcGJvYXJkIHtcclxuICBzdGF0aWMgY29weShlbGVtZW50OiBIVE1MVGV4dEFyZWFFbGVtZW50IHwgc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICBsZXQgc3VjY2Vzc2Z1bCA9IGZhbHNlO1xyXG4gICAgaWYgKHR5cGVvZiBlbGVtZW50ID09PSAnc3RyaW5nJykge1xyXG4gICAgICBjb25zdCB0ZXh0QXJlYSA9IENsaXBib2FyZC5jcmVhdGVUZXh0QXJlYShlbGVtZW50KTtcclxuICAgICAgQ2xpcGJvYXJkLnNlbGVjdFRleHQodGV4dEFyZWEpO1xyXG4gICAgICBzdWNjZXNzZnVsID0gQ2xpcGJvYXJkLmNvcHlUZXh0VG9DbGlwYm9hcmQoKTtcclxuICAgICAgQ2xpcGJvYXJkLmRlc3Ryb3lUZXh0QXJlYSh0ZXh0QXJlYSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBDbGlwYm9hcmQuc2VsZWN0VGV4dChlbGVtZW50KTtcclxuICAgICAgc3VjY2Vzc2Z1bCA9IENsaXBib2FyZC5jb3B5VGV4dFRvQ2xpcGJvYXJkKCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3VjY2Vzc2Z1bDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc3RhdGljIGNyZWF0ZVRleHRBcmVhKHRleHQ6IHN0cmluZyk6IEhUTUxUZXh0QXJlYUVsZW1lbnQge1xyXG4gICAgY29uc3QgdGV4dEFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0QXJlYScpIGFzIEhUTUxUZXh0QXJlYUVsZW1lbnQ7XHJcbiAgICB0ZXh0QXJlYS52YWx1ZSA9IHRleHQ7XHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRleHRBcmVhKTtcclxuICAgIHJldHVybiB0ZXh0QXJlYTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc3RhdGljIGRlc3Ryb3lUZXh0QXJlYSh0ZXh0QXJlYSkge1xyXG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0ZXh0QXJlYSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHN0YXRpYyBzZWxlY3RUZXh0KHRleHRBcmVhKSB7XHJcbiAgICBpZiAoYm93c2VyLmlvcykge1xyXG4gICAgICBjb25zdCBvbGRDb250ZW50RWRpdGFibGUgPSB0ZXh0QXJlYS5jb250ZW50RWRpdGFibGU7XHJcbiAgICAgIGNvbnN0IG9sZFJlYWRPbmx5ID0gdGV4dEFyZWEucmVhZE9ubHk7XHJcbiAgICAgIGNvbnN0IHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcclxuICAgICAgY29uc3Qgc2VsZWN0aW9uID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xyXG5cclxuICAgICAgdGV4dEFyZWEuY29udGVudGVkaXRhYmxlID0gdHJ1ZTtcclxuICAgICAgdGV4dEFyZWEucmVhZG9ubHkgPSBmYWxzZTtcclxuICAgICAgcmFuZ2Uuc2VsZWN0Tm9kZUNvbnRlbnRzKHRleHRBcmVhKTtcclxuICAgICAgc2VsZWN0aW9uLnJlbW92ZUFsbFJhbmdlcygpO1xyXG4gICAgICBzZWxlY3Rpb24uYWRkUmFuZ2UocmFuZ2UpO1xyXG4gICAgICB0ZXh0QXJlYS5zZXRTZWxlY3Rpb25SYW5nZSgwLCA5OTk5OTkpO1xyXG4gICAgICB0ZXh0QXJlYS5jb250ZW50RWRpdGFibGUgPSBvbGRDb250ZW50RWRpdGFibGU7XHJcbiAgICAgIHRleHRBcmVhLnJlYWRPbmx5ID0gb2xkUmVhZE9ubHk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0ZXh0QXJlYS5zZWxlY3QoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgc3RhdGljIGNvcHlUZXh0VG9DbGlwYm9hcmQoKTogYm9vbGVhbiB7XHJcbiAgICBpZiAoIShib3dzZXIuaW9zICYmIGJvd3Nlci52ZXJzaW9uIDwgMTApKSB7XHJcbiAgICAgIHJldHVybiBkb2N1bWVudC5leGVjQ29tbWFuZCgnY29weScpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxufVxyXG4iXX0=