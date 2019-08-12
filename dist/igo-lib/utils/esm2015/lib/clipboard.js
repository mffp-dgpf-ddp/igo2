/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as bowser from 'bowser';
export class Clipboard {
    /**
     * @param {?} element
     * @return {?}
     */
    static copy(element) {
        /** @type {?} */
        let successful = false;
        if (typeof element === 'string') {
            /** @type {?} */
            const textArea = Clipboard.createTextArea(element);
            Clipboard.selectText(textArea);
            successful = Clipboard.copyTextToClipboard();
            Clipboard.destroyTextArea(textArea);
        }
        else {
            Clipboard.selectText(element);
            successful = Clipboard.copyTextToClipboard();
        }
        return successful;
    }
    /**
     * @private
     * @param {?} text
     * @return {?}
     */
    static createTextArea(text) {
        /** @type {?} */
        const textArea = (/** @type {?} */ (document.createElement('textArea')));
        textArea.value = text;
        document.body.appendChild(textArea);
        return textArea;
    }
    /**
     * @private
     * @param {?} textArea
     * @return {?}
     */
    static destroyTextArea(textArea) {
        document.body.removeChild(textArea);
    }
    /**
     * @private
     * @param {?} textArea
     * @return {?}
     */
    static selectText(textArea) {
        if (bowser.ios) {
            /** @type {?} */
            const oldContentEditable = textArea.contentEditable;
            /** @type {?} */
            const oldReadOnly = textArea.readOnly;
            /** @type {?} */
            const range = document.createRange();
            /** @type {?} */
            const selection = window.getSelection();
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
    }
    /**
     * @private
     * @return {?}
     */
    static copyTextToClipboard() {
        if (!(bowser.ios && bowser.version < 10)) {
            return document.execCommand('copy');
        }
        return false;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpcGJvYXJkLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvdXRpbHMvIiwic291cmNlcyI6WyJsaWIvY2xpcGJvYXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEtBQUssTUFBTSxNQUFNLFFBQVEsQ0FBQztBQUVqQyxNQUFNLE9BQU8sU0FBUzs7Ozs7SUFDcEIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFxQzs7WUFDM0MsVUFBVSxHQUFHLEtBQUs7UUFDdEIsSUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRLEVBQUU7O2tCQUN6QixRQUFRLEdBQUcsU0FBUyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUM7WUFDbEQsU0FBUyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMvQixVQUFVLEdBQUcsU0FBUyxDQUFDLG1CQUFtQixFQUFFLENBQUM7WUFDN0MsU0FBUyxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNyQzthQUFNO1lBQ0wsU0FBUyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM5QixVQUFVLEdBQUcsU0FBUyxDQUFDLG1CQUFtQixFQUFFLENBQUM7U0FDOUM7UUFDRCxPQUFPLFVBQVUsQ0FBQztJQUNwQixDQUFDOzs7Ozs7SUFFTyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQVk7O2NBQ2xDLFFBQVEsR0FBRyxtQkFBQSxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxFQUF1QjtRQUMxRSxRQUFRLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUN0QixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNwQyxPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDOzs7Ozs7SUFFTyxNQUFNLENBQUMsZUFBZSxDQUFDLFFBQVE7UUFDckMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdEMsQ0FBQzs7Ozs7O0lBRU8sTUFBTSxDQUFDLFVBQVUsQ0FBQyxRQUFRO1FBQ2hDLElBQUksTUFBTSxDQUFDLEdBQUcsRUFBRTs7a0JBQ1Isa0JBQWtCLEdBQUcsUUFBUSxDQUFDLGVBQWU7O2tCQUM3QyxXQUFXLEdBQUcsUUFBUSxDQUFDLFFBQVE7O2tCQUMvQixLQUFLLEdBQUcsUUFBUSxDQUFDLFdBQVcsRUFBRTs7a0JBQzlCLFNBQVMsR0FBRyxNQUFNLENBQUMsWUFBWSxFQUFFO1lBRXZDLFFBQVEsQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1lBQ2hDLFFBQVEsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQzFCLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNuQyxTQUFTLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDNUIsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMxQixRQUFRLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ3RDLFFBQVEsQ0FBQyxlQUFlLEdBQUcsa0JBQWtCLENBQUM7WUFDOUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUM7U0FDakM7YUFBTTtZQUNMLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNuQjtJQUNILENBQUM7Ozs7O0lBRU8sTUFBTSxDQUFDLG1CQUFtQjtRQUNoQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLEVBQUU7WUFDeEMsT0FBTyxRQUFRLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3JDO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBib3dzZXIgZnJvbSAnYm93c2VyJztcclxuXHJcbmV4cG9ydCBjbGFzcyBDbGlwYm9hcmQge1xyXG4gIHN0YXRpYyBjb3B5KGVsZW1lbnQ6IEhUTUxUZXh0QXJlYUVsZW1lbnQgfCBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgIGxldCBzdWNjZXNzZnVsID0gZmFsc2U7XHJcbiAgICBpZiAodHlwZW9mIGVsZW1lbnQgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIGNvbnN0IHRleHRBcmVhID0gQ2xpcGJvYXJkLmNyZWF0ZVRleHRBcmVhKGVsZW1lbnQpO1xyXG4gICAgICBDbGlwYm9hcmQuc2VsZWN0VGV4dCh0ZXh0QXJlYSk7XHJcbiAgICAgIHN1Y2Nlc3NmdWwgPSBDbGlwYm9hcmQuY29weVRleHRUb0NsaXBib2FyZCgpO1xyXG4gICAgICBDbGlwYm9hcmQuZGVzdHJveVRleHRBcmVhKHRleHRBcmVhKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIENsaXBib2FyZC5zZWxlY3RUZXh0KGVsZW1lbnQpO1xyXG4gICAgICBzdWNjZXNzZnVsID0gQ2xpcGJvYXJkLmNvcHlUZXh0VG9DbGlwYm9hcmQoKTtcclxuICAgIH1cclxuICAgIHJldHVybiBzdWNjZXNzZnVsO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzdGF0aWMgY3JlYXRlVGV4dEFyZWEodGV4dDogc3RyaW5nKTogSFRNTFRleHRBcmVhRWxlbWVudCB7XHJcbiAgICBjb25zdCB0ZXh0QXJlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRBcmVhJykgYXMgSFRNTFRleHRBcmVhRWxlbWVudDtcclxuICAgIHRleHRBcmVhLnZhbHVlID0gdGV4dDtcclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGV4dEFyZWEpO1xyXG4gICAgcmV0dXJuIHRleHRBcmVhO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzdGF0aWMgZGVzdHJveVRleHRBcmVhKHRleHRBcmVhKSB7XHJcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRleHRBcmVhKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc3RhdGljIHNlbGVjdFRleHQodGV4dEFyZWEpIHtcclxuICAgIGlmIChib3dzZXIuaW9zKSB7XHJcbiAgICAgIGNvbnN0IG9sZENvbnRlbnRFZGl0YWJsZSA9IHRleHRBcmVhLmNvbnRlbnRFZGl0YWJsZTtcclxuICAgICAgY29uc3Qgb2xkUmVhZE9ubHkgPSB0ZXh0QXJlYS5yZWFkT25seTtcclxuICAgICAgY29uc3QgcmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xyXG4gICAgICBjb25zdCBzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XHJcblxyXG4gICAgICB0ZXh0QXJlYS5jb250ZW50ZWRpdGFibGUgPSB0cnVlO1xyXG4gICAgICB0ZXh0QXJlYS5yZWFkb25seSA9IGZhbHNlO1xyXG4gICAgICByYW5nZS5zZWxlY3ROb2RlQ29udGVudHModGV4dEFyZWEpO1xyXG4gICAgICBzZWxlY3Rpb24ucmVtb3ZlQWxsUmFuZ2VzKCk7XHJcbiAgICAgIHNlbGVjdGlvbi5hZGRSYW5nZShyYW5nZSk7XHJcbiAgICAgIHRleHRBcmVhLnNldFNlbGVjdGlvblJhbmdlKDAsIDk5OTk5OSk7XHJcbiAgICAgIHRleHRBcmVhLmNvbnRlbnRFZGl0YWJsZSA9IG9sZENvbnRlbnRFZGl0YWJsZTtcclxuICAgICAgdGV4dEFyZWEucmVhZE9ubHkgPSBvbGRSZWFkT25seTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRleHRBcmVhLnNlbGVjdCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzdGF0aWMgY29weVRleHRUb0NsaXBib2FyZCgpOiBib29sZWFuIHtcclxuICAgIGlmICghKGJvd3Nlci5pb3MgJiYgYm93c2VyLnZlcnNpb24gPCAxMCkpIHtcclxuICAgICAgcmV0dXJuIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdjb3B5Jyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG59XHJcbiJdfQ==