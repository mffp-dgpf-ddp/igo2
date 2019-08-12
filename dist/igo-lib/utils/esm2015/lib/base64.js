/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/* tslint:disable */
/** @type {?} */
const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
export class Base64 {
    /**
     * @private
     * @param {?} s
     * @param {?} i
     * @return {?}
     */
    static getByte(s, i) {
        /** @type {?} */
        const x = s.charCodeAt(i);
        return x;
    }
    /**
     * @private
     * @param {?} s
     * @param {?} i
     * @return {?}
     */
    static getByte64(s, i) {
        /** @type {?} */
        const idx = this.ALPHA.indexOf(s.charAt(i));
        return idx;
    }
    /**
     * @param {?} s
     * @return {?}
     */
    static decode(s) {
        /** @type {?} */
        let pads = 0;
        /** @type {?} */
        let i;
        /** @type {?} */
        let b10;
        /** @type {?} */
        let imax = s.length;
        /** @type {?} */
        let x = [];
        s = String(s);
        if (imax === 0) {
            return s;
        }
        if (s.charAt(imax - 1) === this.PADCHAR) {
            pads = 1;
            if (s.charAt(imax - 2) === this.PADCHAR) {
                pads = 2;
            }
            imax -= 4;
        }
        for (i = 0; i < imax; i += 4) {
            b10 =
                (this.getByte64(s, i) << 18) |
                    (this.getByte64(s, i + 1) << 12) |
                    (this.getByte64(s, i + 2) << 6) |
                    this.getByte64(s, i + 3);
            x.push(String.fromCharCode(b10 >> 16, (b10 >> 8) & 255, b10 & 255));
        }
        switch (pads) {
            case 1:
                b10 =
                    (this.getByte64(s, i) << 18) |
                        (this.getByte64(s, i + 1) << 12) |
                        (this.getByte64(s, i + 2) << 6);
                x.push(String.fromCharCode(b10 >> 16, (b10 >> 8) & 255));
                break;
            case 2:
                b10 = (this.getByte64(s, i) << 18) | (this.getByte64(s, i + 1) << 12);
                x.push(String.fromCharCode(b10 >> 16));
                break;
        }
        return x.join('');
    }
    /**
     * @param {?} s
     * @return {?}
     */
    static encode(s) {
        s = String(s);
        /** @type {?} */
        let i;
        /** @type {?} */
        let b10;
        /** @type {?} */
        let x = [];
        /** @type {?} */
        let imax = s.length - s.length % 3;
        if (s.length === 0) {
            return s;
        }
        for (i = 0; i < imax; i += 3) {
            b10 =
                (this.getByte(s, i) << 16) |
                    (this.getByte(s, i + 1) << 8) |
                    this.getByte(s, i + 2);
            x.push(this.ALPHA.charAt(b10 >> 18));
            x.push(this.ALPHA.charAt((b10 >> 12) & 63));
            x.push(this.ALPHA.charAt((b10 >> 6) & 63));
            x.push(this.ALPHA.charAt(b10 & 63));
        }
        switch (s.length - imax) {
            case 1:
                b10 = this.getByte(s, i) << 16;
                x.push(this.ALPHA.charAt(b10 >> 18) +
                    this.ALPHA.charAt((b10 >> 12) & 63) +
                    this.PADCHAR +
                    this.PADCHAR);
                break;
            case 2:
                b10 = (this.getByte(s, i) << 16) | (this.getByte(s, i + 1) << 8);
                x.push(this.ALPHA.charAt(b10 >> 18) +
                    this.ALPHA.charAt((b10 >> 12) & 63) +
                    this.ALPHA.charAt((b10 >> 6) & 63) +
                    this.PADCHAR);
                break;
        }
        return x.join('');
    }
}
Base64.PADCHAR = '=';
Base64.ALPHA = ALPHA;
if (false) {
    /**
     * @type {?}
     * @private
     */
    Base64.PADCHAR;
    /**
     * @type {?}
     * @private
     */
    Base64.ALPHA;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZTY0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvdXRpbHMvIiwic291cmNlcyI6WyJsaWIvYmFzZTY0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztNQUVNLEtBQUssR0FDVCxrRUFBa0U7QUFFcEUsTUFBTSxPQUFPLE1BQU07Ozs7Ozs7SUFJVCxNQUFNLENBQUMsT0FBTyxDQUFDLENBQVMsRUFBRSxDQUFTOztjQUNuQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDekIsT0FBTyxDQUFDLENBQUM7SUFDWCxDQUFDOzs7Ozs7O0lBRU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFTLEVBQUUsQ0FBUzs7Y0FDckMsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0MsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDOzs7OztJQUVNLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBUzs7WUFDeEIsSUFBSSxHQUFHLENBQUM7O1lBQ1YsQ0FBQzs7WUFDRCxHQUFHOztZQUNILElBQUksR0FBRyxDQUFDLENBQUMsTUFBTTs7WUFDZixDQUFDLEdBQUcsRUFBRTtRQUVSLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFZCxJQUFJLElBQUksS0FBSyxDQUFDLEVBQUU7WUFDZCxPQUFPLENBQUMsQ0FBQztTQUNWO1FBRUQsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ3ZDLElBQUksR0FBRyxDQUFDLENBQUM7WUFDVCxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ3ZDLElBQUksR0FBRyxDQUFDLENBQUM7YUFDVjtZQUNELElBQUksSUFBSSxDQUFD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SixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDO29CQUMxQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUM7b0JBQ25DLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztvQkFDbEMsSUFBSSxDQUFDLE9BQU8sQ0FDZixDQUFDO2dCQUNGLE1BQU07U0FDVDtRQUVELE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNwQixDQUFDOztBQXpHYyxjQUFPLEdBQVcsR0FBRyxDQUFDO0FBQ3RCLFlBQUssR0FBVyxLQUFLLENBQUM7Ozs7OztJQURyQyxlQUFxQzs7Ozs7SUFDckMsYUFBcUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xyXG5cclxuY29uc3QgQUxQSEEgPVxyXG4gICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvJztcclxuXHJcbmV4cG9ydCBjbGFzcyBCYXNlNjQge1xyXG4gIHByaXZhdGUgc3RhdGljIFBBRENIQVI6IHN0cmluZyA9ICc9JztcclxuICBwcml2YXRlIHN0YXRpYyBBTFBIQTogc3RyaW5nID0gQUxQSEE7XHJcblxyXG4gIHByaXZhdGUgc3RhdGljIGdldEJ5dGUoczogc3RyaW5nLCBpOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgY29uc3QgeCA9IHMuY2hhckNvZGVBdChpKTtcclxuICAgIHJldHVybiB4O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzdGF0aWMgZ2V0Qnl0ZTY0KHM6IHN0cmluZywgaTogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgIGNvbnN0IGlkeCA9IHRoaXMuQUxQSEEuaW5kZXhPZihzLmNoYXJBdChpKSk7XHJcbiAgICByZXR1cm4gaWR4O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBkZWNvZGUoczogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIGxldCBwYWRzID0gMCxcclxuICAgICAgaSxcclxuICAgICAgYjEwLFxyXG4gICAgICBpbWF4ID0gcy5sZW5ndGgsXHJcbiAgICAgIHggPSBbXTtcclxuXHJcbiAgICBzID0gU3RyaW5nKHMpO1xyXG5cclxuICAgIGlmIChpbWF4ID09PSAwKSB7XHJcbiAgICAgIHJldHVybiBzO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChzLmNoYXJBdChpbWF4IC0gMSkgPT09IHRoaXMuUEFEQ0hBUikge1xyXG4gICAgICBwYWRzID0gMTtcclxuICAgICAgaWYgKHMuY2hhckF0KGltYXggLSAyKSA9PT0gdGhpcy5QQURDSEFSKSB7XHJcbiAgICAgICAgcGFkcyA9IDI7XHJcbiAgICAgIH1cclxuICAgICAgaW1heCAtPSA0O1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAoaSA9IDA7IGkgPCBpbWF4OyBpICs9IDQpIHtcclxuICAgICAgYjEwID1cclxuICAgICAgICAodGhpcy5nZXRCeXRlNjQocywgaSkgPDwgMTgpIHxcclxuICAgICAgICAodGhpcy5nZXRCeXRlNjQocywgaSArIDEpIDw8IDEyKSB8XHJcbiAgICAgICAgKHRoaXMuZ2V0Qnl0ZTY0KHMsIGkgKyAyKSA8PCA2KSB8XHJcbiAgICAgICAgdGhpcy5nZXRCeXRlNjQocywgaSArIDMpO1xyXG4gICAgICB4LnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZShiMTAgPj4gMTYsIChiMTAgPj4gOCkgJiAyNTUsIGIxMCAmIDI1NSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHN3aXRjaCAocGFkcykge1xyXG4gICAgICBjYXNlIDE6XHJcbiAgICAgICAgYjEwID1cclxuICAgICAgICAgICh0aGlzLmdldEJ5dGU2NChzLCBpKSA8PCAxOCkgfFxyXG4gICAgICAgICAgKHRoaXMuZ2V0Qnl0ZTY0KHMsIGkgKyAxKSA8PCAxMikgfFxyXG4gICAgICAgICAgKHRoaXMuZ2V0Qnl0ZTY0KHMsIGkgKyAyKSA8PCA2KTtcclxuICAgICAgICB4LnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZShiMTAgPj4gMTYsIChiMTAgPj4gOCkgJiAyNTUpKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAyOlxyXG4gICAgICAgIGIxMCA9ICh0aGlzLmdldEJ5dGU2NChzLCBpKSA8PCAxOCkgfCAodGhpcy5nZXRCeXRlNjQocywgaSArIDEpIDw8IDEyKTtcclxuICAgICAgICB4LnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZShiMTAgPj4gMTYpKTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4geC5qb2luKCcnKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgZW5jb2RlKHM6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICBzID0gU3RyaW5nKHMpO1xyXG5cclxuICAgIGxldCBpLFxyXG4gICAgICBiMTAsXHJcbiAgICAgIHggPSBbXSxcclxuICAgICAgaW1heCA9IHMubGVuZ3RoIC0gcy5sZW5ndGggJSAzO1xyXG5cclxuICAgIGlmIChzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICByZXR1cm4gcztcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgaW1heDsgaSArPSAzKSB7XHJcbiAgICAgIGIxMCA9XHJcbiAgICAgICAgKHRoaXMuZ2V0Qnl0ZShzLCBpKSA8PCAxNikgfFxyXG4gICAgICAgICh0aGlzLmdldEJ5dGUocywgaSArIDEpIDw8IDgpIHxcclxuICAgICAgICB0aGlzLmdldEJ5dGUocywgaSArIDIpO1xyXG4gICAgICB4LnB1c2godGhpcy5BTFBIQS5jaGFyQXQoYjEwID4+IDE4KSk7XHJcbiAgICAgIHgucHVzaCh0aGlzLkFMUEhBLmNoYXJBdCgoYjEwID4+IDEyKSAmIDYzKSk7XHJcbiAgICAgIHgucHVzaCh0aGlzLkFMUEhBLmNoYXJBdCgoYjEwID4+IDYpICYgNjMpKTtcclxuICAgICAgeC5wdXNoKHRoaXMuQUxQSEEuY2hhckF0KGIxMCAmIDYzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3dpdGNoIChzLmxlbmd0aCAtIGltYXgpIHtcclxuICAgICAgY2FzZSAxOlxyXG4gICAgICAgIGIxMCA9IHRoaXMuZ2V0Qnl0ZShzLCBpKSA8PCAxNjtcclxuICAgICAgICB4LnB1c2goXHJcbiAgICAgICAgICB0aGlzLkFMUEhBLmNoYXJBdChiMTAgPj4gMTgpICtcclxuICAgICAgICAgICAgdGhpcy5BTFBIQS5jaGFyQXQoKGIxMCA+PiAxMikgJiA2MykgK1xyXG4gICAgICAgICAgICB0aGlzLlBBRENIQVIgK1xyXG4gICAgICAgICAgICB0aGlzLlBBRENIQVJcclxuICAgICAgICApO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDI6XHJcbiAgICAgICAgYjEwID0gKHRoaXMuZ2V0Qnl0ZShzLCBpKSA8PCAxNikgfCAodGhpcy5nZXRCeXRlKHMsIGkgKyAxKSA8PCA4KTtcclxuICAgICAgICB4LnB1c2goXHJcbiAgICAgICAgICB0aGlzLkFMUEhBLmNoYXJBdChiMTAgPj4gMTgpICtcclxuICAgICAgICAgICAgdGhpcy5BTFBIQS5jaGFyQXQoKGIxMCA+PiAxMikgJiA2MykgK1xyXG4gICAgICAgICAgICB0aGlzLkFMUEhBLmNoYXJBdCgoYjEwID4+IDYpICYgNjMpICtcclxuICAgICAgICAgICAgdGhpcy5QQURDSEFSXHJcbiAgICAgICAgKTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4geC5qb2luKCcnKTtcclxuICB9XHJcbn1cclxuIl19