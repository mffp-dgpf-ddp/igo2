/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
var StringUtils = /** @class */ (function () {
    function StringUtils() {
    }
    /**
     * @param {?} s1
     * @param {?} s2
     * @param {?=} p
     * @return {?}
     */
    StringUtils.diff = /**
     * @param {?} s1
     * @param {?} s2
     * @param {?=} p
     * @return {?}
     */
    function (s1, s2, p) {
        if (p === void 0) { p = 4; }
        if (!s1 && !s2) {
            return '';
        }
        if (!s1) {
            return '<span class="inserted">' + s2 + '</span>';
        }
        if (!s2) {
            return '<span class="deleted">' + s1 + '</span>';
        }
        s1 = s1.toString();
        s2 = s2.toString();
        /** @type {?} */
        var changeData = StringUtils.getChanges(s1, s2, '', p);
        /** @type {?} */
        var nextS = s2.slice(changeData.mtc.length + changeData.ins.length + changeData.sbs.length);
        // remaining part of "s"
        /** @type {?} */
        var nextThis = s1.slice(changeData.mtc.length + changeData.del.length + changeData.sbs.length);
        // remaining part of "this"
        /** @type {?} */
        var result = '';
        if (changeData.del.length > 0) {
            changeData.del = '<span class="deleted">' + changeData.del + '</span>';
        }
        if (changeData.ins.length > 0) {
            changeData.ins = '<span class="inserted">' + changeData.ins + '</span>';
        }
        result = changeData.mtc + changeData.del + changeData.ins + changeData.sbs;
        result +=
            nextThis !== '' || nextS !== ''
                ? StringUtils.diff(nextThis, nextS, p)
                : '';
        return result;
    };
    /**
     * @private
     * @param {?} s
     * @param {?} l
     * @param {?} m
     * @return {?}
     */
    StringUtils.getMatchingSubstring = /**
     * @private
     * @param {?} s
     * @param {?} l
     * @param {?} m
     * @return {?}
     */
    function (s, l, m) {
        // returns the first matching substring in-between the two strings
        /** @type {?} */
        var i = 0;
        /** @type {?} */
        var match = false;
        /** @type {?} */
        var slen = s.length;
        /** @type {?} */
        var o = { fis: slen, mtc: m, sbs: '' };
        while (i < slen) {
            l[i] === s[i]
                ? match
                    ? (o.sbs += s[i]) // o.sbs holds the matching substring itsef
                    : ((match = true), (o.fis = i), (o.sbs = s[i]))
                : match
                    ? (i = slen) // stop after the first found substring
                    : (i = i);
            ++i;
        }
        return o;
    };
    /**
     * @private
     * @param {?} s1
     * @param {?} s2
     * @param {?} m
     * @param {?} p
     * @return {?}
     */
    StringUtils.getChanges = /**
     * @private
     * @param {?} s1
     * @param {?} s2
     * @param {?} m
     * @param {?} p
     * @return {?}
     */
    function (s1, s2, m, p) {
        var _a;
        /** @type {?} */
        var isThisLonger = s1.length >= s1.length ? true : false;
        var _b = tslib_1.__read(isThisLonger ? [s1, s2] : [s2, s1], 2), longer = _b[0], shorter = _b[1];
        // assignment of longer and shorter by es6 destructuring
        /** @type {?} */
        var bi = 0;
        while (shorter[bi] === longer[bi] && bi < shorter.length) {
            ++bi;
        } // make bi the index of first mismatching character
        longer = longer.split('').slice(bi); // as the longer string will be rotated it is converted into array
        shorter = shorter.slice(bi); // shorter and longer now starts from the first mismatching character
        // shorter and longer now starts from the first mismatching character
        /** @type {?} */
        var len = longer.length;
        // length of the longer string
        /** @type {?} */
        var cd = {
            fis: shorter.length,
            // the index of matching string in the shorter string
            fil: len,
            // the index of matching string in the longer string
            sbs: '',
            // the matching substring itself
            mtc: m + s2.slice(0, bi)
        };
        // if exists mtc holds the matching string at the front
        /** @type {?} */
        var sub = { sbs: '' };
        if (shorter !== '') {
            for (var rc = 0; rc < len && sub.sbs.length < p; rc++) {
                // rc -> rotate count, p -> precision factor
                sub = StringUtils.getMatchingSubstring(shorter, StringUtils.rotateArray(longer, rc), cd.mtc); // rotate longer string 1 char and get substring
                sub.fil =
                    rc < len - sub.fis
                        ? sub.fis + rc // mismatch is longer than the mismatch in short
                        : sub.fis - len + rc; // mismatch is shorter than the mismatch in short
                if (sub.sbs.length > cd.sbs.length) {
                    cd = sub; // only keep the one with the longest substring.
                }
            }
        }
        // insert the mismatching delete subsrt and insert substr to the cd object and attach the previous substring
        _a = tslib_1.__read(isThisLonger
            ? [longer.slice(0, cd.fil).join(''), shorter.slice(0, cd.fis)]
            : [shorter.slice(0, cd.fis), longer.slice(0, cd.fil).join('')], 2), cd.del = _a[0], cd.ins = _a[1];
        return cd.del.indexOf(' ') === -1 ||
            cd.ins.indexOf(' ') === -1 ||
            cd.del === '' ||
            cd.ins === '' ||
            cd.sbs === ''
            ? cd
            : StringUtils.getChanges(cd.del, cd.ins, cd.mtc, p);
    };
    /**
     * @private
     * @param {?} array
     * @param {?} n
     * @return {?}
     */
    StringUtils.rotateArray = /**
     * @private
     * @param {?} array
     * @param {?} n
     * @return {?}
     */
    function (array, n) {
        /** @type {?} */
        var len = array.length;
        /** @type {?} */
        var res = new Array(array.length);
        if (n % len === 0) {
            return array.slice();
        }
        else {
            for (var i = 0; i < len; i++) {
                res[i] = array[(i + (len + (n % len))) % len];
            }
        }
        return res;
    };
    return StringUtils;
}());
export { StringUtils };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nLXV0aWxzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvdXRpbHMvIiwic291cmNlcyI6WyJsaWIvc3RyaW5nLXV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7SUFBQTtJQXFIQSxDQUFDOzs7Ozs7O0lBcEhRLGdCQUFJOzs7Ozs7SUFBWCxVQUFZLEVBQVUsRUFBRSxFQUFVLEVBQUUsQ0FBSztRQUFMLGtCQUFBLEVBQUEsS0FBSztRQUN2QyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFO1lBQ2QsT0FBTyxFQUFFLENBQUM7U0FDWDtRQUNELElBQUksQ0FBQyxFQUFFLEVBQUU7WUFDUCxPQUFPLHlCQUF5QixHQUFHLEVBQUUsR0FBRyxTQUFTLENBQUM7U0FDbkQ7UUFDRCxJQUFJLENBQUMsRUFBRSxFQUFFO1lBQ1AsT0FBTyx3QkFBd0IsR0FBRyxFQUFFLEdBQUcsU0FBUyxDQUFDO1NBQ2xEO1FBQ0QsRUFBRSxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNuQixFQUFFLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDOztZQUNiLFVBQVUsR0FBRyxXQUFXLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQzs7WUFDbEQsS0FBSyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQ3BCLFVBQVUsQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUN0RTs7O1lBQ0ssUUFBUSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQ3ZCLFVBQVUsQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUN0RTs7O1lBQ0csTUFBTSxHQUFHLEVBQUU7UUFDZixJQUFJLFVBQVUsQ0FB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RSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzFCLEVBQUUsQ0FBQyxHQUFHLEtBQUssRUFBRTtZQUNiLEVBQUUsQ0FBQyxHQUFHLEtBQUssRUFBRTtZQUNiLEVBQUUsQ0FBQyxHQUFHLEtBQUssRUFBRTtZQUNiLENBQUMsQ0FBQyxFQUFFO1lBQ0osQ0FBQyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDeEQsQ0FBQzs7Ozs7OztJQUVjLHVCQUFXOzs7Ozs7SUFBMUIsVUFBMkIsS0FBSyxFQUFFLENBQUM7O1lBQzNCLEdBQUcsR0FBRyxLQUFLLENBQUMsTUFBTTs7WUFDbEIsR0FBRyxHQUFHLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDbkMsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsRUFBRTtZQUNqQixPQUFPLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUN0QjthQUFNO1lBQ0wsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDNUIsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7YUFDL0M7U0FDRjtRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUNILGtCQUFDO0FBQUQsQ0FBQyxBQXJIRCxJQXFIQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBTdHJpbmdVdGlscyB7XHJcbiAgc3RhdGljIGRpZmYoczE6IHN0cmluZywgczI6IHN0cmluZywgcCA9IDQpOiBzdHJpbmcge1xyXG4gICAgaWYgKCFzMSAmJiAhczIpIHtcclxuICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG4gICAgaWYgKCFzMSkge1xyXG4gICAgICByZXR1cm4gJzxzcGFuIGNsYXNzPVwiaW5zZXJ0ZWRcIj4nICsgczIgKyAnPC9zcGFuPic7XHJcbiAgICB9XHJcbiAgICBpZiAoIXMyKSB7XHJcbiAgICAgIHJldHVybiAnPHNwYW4gY2xhc3M9XCJkZWxldGVkXCI+JyArIHMxICsgJzwvc3Bhbj4nO1xyXG4gICAgfVxyXG4gICAgczEgPSBzMS50b1N0cmluZygpO1xyXG4gICAgczIgPSBzMi50b1N0cmluZygpO1xyXG4gICAgY29uc3QgY2hhbmdlRGF0YSA9IFN0cmluZ1V0aWxzLmdldENoYW5nZXMoczEsIHMyLCAnJywgcCk7XHJcbiAgICBjb25zdCBuZXh0UyA9IHMyLnNsaWNlKFxyXG4gICAgICBjaGFuZ2VEYXRhLm10Yy5sZW5ndGggKyBjaGFuZ2VEYXRhLmlucy5sZW5ndGggKyBjaGFuZ2VEYXRhLnNicy5sZW5ndGhcclxuICAgICk7IC8vIHJlbWFpbmluZyBwYXJ0IG9mIFwic1wiXHJcbiAgICBjb25zdCBuZXh0VGhpcyA9IHMxLnNsaWNlKFxyXG4gICAgICBjaGFuZ2VEYXRhLm10Yy5sZW5ndGggKyBjaGFuZ2VEYXRhLmRlbC5sZW5ndGggKyBjaGFuZ2VEYXRhLnNicy5sZW5ndGhcclxuICAgICk7IC8vIHJlbWFpbmluZyBwYXJ0IG9mIFwidGhpc1wiXHJcbiAgICBsZXQgcmVzdWx0ID0gJyc7IC8vIHRoZSBnbG9yaW91cyByZXN1bHRcclxuICAgIGlmIChjaGFuZ2VEYXRhLmRlbC5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGNoYW5nZURhdGEuZGVsID0gJzxzcGFuIGNsYXNzPVwiZGVsZXRlZFwiPicgKyBjaGFuZ2VEYXRhLmRlbCArICc8L3NwYW4+JztcclxuICAgIH1cclxuICAgIGlmIChjaGFuZ2VEYXRhLmlucy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGNoYW5nZURhdGEuaW5zID0gJzxzcGFuIGNsYXNzPVwiaW5zZXJ0ZWRcIj4nICsgY2hhbmdlRGF0YS5pbnMgKyAnPC9zcGFuPic7XHJcbiAgICB9XHJcbiAgICByZXN1bHQgPSBjaGFuZ2VEYXRhLm10YyArIGNoYW5nZURhdGEuZGVsICsgY2hhbmdlRGF0YS5pbnMgKyBjaGFuZ2VEYXRhLnNicztcclxuICAgIHJlc3VsdCArPVxyXG4gICAgICBuZXh0VGhpcyAhPT0gJycgfHwgbmV4dFMgIT09ICcnXHJcbiAgICAgICAgPyBTdHJpbmdVdGlscy5kaWZmKG5leHRUaGlzLCBuZXh0UywgcClcclxuICAgICAgICA6ICcnO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc3RhdGljIGdldE1hdGNoaW5nU3Vic3RyaW5nKHMsIGwsIG0pIHtcclxuICAgIC8vIHJldHVybnMgdGhlIGZpcnN0IG1hdGNoaW5nIHN1YnN0cmluZyBpbi1iZXR3ZWVuIHRoZSB0d28gc3RyaW5nc1xyXG4gICAgbGV0IGkgPSAwO1xyXG4gICAgbGV0IG1hdGNoID0gZmFsc2U7XHJcbiAgICBjb25zdCBzbGVuID0gcy5sZW5ndGg7XHJcbiAgICBjb25zdCBvID0geyBmaXM6IHNsZW4sIG10YzogbSwgc2JzOiAnJyB9OyAvLyB0ZW1wb3Jhcnkgb2JqZWN0IHVzZWQgdG8gY29uc3RydWN0IHRoZSBjZCAoY2hhbmdlIGRhdGEpIG9iamVjdFxyXG5cclxuICAgIHdoaWxlIChpIDwgc2xlbikge1xyXG4gICAgICBsW2ldID09PSBzW2ldXHJcbiAgICAgICAgPyBtYXRjaFxyXG4gICAgICAgICAgPyAoby5zYnMgKz0gc1tpXSkgLy8gby5zYnMgaG9sZHMgdGhlIG1hdGNoaW5nIHN1YnN0cmluZyBpdHNlZlxyXG4gICAgICAgICAgOiAoKG1hdGNoID0gdHJ1ZSksIChvLmZpcyA9IGkpLCAoby5zYnMgPSBzW2ldKSlcclxuICAgICAgICA6IG1hdGNoXHJcbiAgICAgICAgICA/IChpID0gc2xlbikgLy8gc3RvcCBhZnRlciB0aGUgZmlyc3QgZm91bmQgc3Vic3RyaW5nXHJcbiAgICAgICAgICA6IChpID0gaSk7XHJcbiAgICAgICsraTtcclxuICAgIH1cclxuICAgIHJldHVybiBvO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzdGF0aWMgZ2V0Q2hhbmdlcyhzMSwgczIsIG0sIHApIHtcclxuICAgIGNvbnN0IGlzVGhpc0xvbmdlciA9IHMxLmxlbmd0aCA+PSBzMS5sZW5ndGggPyB0cnVlIDogZmFsc2U7XHJcbiAgICBsZXQgW2xvbmdlciwgc2hvcnRlcl0gPSBpc1RoaXNMb25nZXIgPyBbczEsIHMyXSA6IFtzMiwgczFdOyAvLyBhc3NpZ25tZW50IG9mIGxvbmdlciBhbmQgc2hvcnRlciBieSBlczYgZGVzdHJ1Y3R1cmluZ1xyXG4gICAgbGV0IGJpID0gMDsgLy8gYmFzZSBpbmRleCBkZXNpZ25hdGluZyB0aGUgaW5kZXggb2YgZmlyc3QgbWlzbWFjdGhpbmcgY2hhcmFjdGVyIGluIGJvdGggc3RyaW5nc1xyXG5cclxuICAgIHdoaWxlIChzaG9ydGVyW2JpXSA9PT0gbG9uZ2VyW2JpXSAmJiBiaSA8IHNob3J0ZXIubGVuZ3RoKSB7XHJcbiAgICAgICsrYmk7XHJcbiAgICB9IC8vIG1ha2UgYmkgdGhlIGluZGV4IG9mIGZpcnN0IG1pc21hdGNoaW5nIGNoYXJhY3RlclxyXG4gICAgbG9uZ2VyID0gbG9uZ2VyLnNwbGl0KCcnKS5zbGljZShiaSk7IC8vIGFzIHRoZSBsb25nZXIgc3RyaW5nIHdpbGwgYmUgcm90YXRlZCBpdCBpcyBjb252ZXJ0ZWQgaW50byBhcnJheVxyXG4gICAgc2hvcnRlciA9IHNob3J0ZXIuc2xpY2UoYmkpOyAvLyBzaG9ydGVyIGFuZCBsb25nZXIgbm93IHN0YXJ0cyBmcm9tIHRoZSBmaXJzdCBtaXNtYXRjaGluZyBjaGFyYWN0ZXJcclxuXHJcbiAgICBjb25zdCBsZW4gPSBsb25nZXIubGVuZ3RoOyAvLyBsZW5ndGggb2YgdGhlIGxvbmdlciBzdHJpbmdcclxuICAgIGxldCBjZDogYW55ID0ge1xyXG4gICAgICBmaXM6IHNob3J0ZXIubGVuZ3RoLCAvLyB0aGUgaW5kZXggb2YgbWF0Y2hpbmcgc3RyaW5nIGluIHRoZSBzaG9ydGVyIHN0cmluZ1xyXG4gICAgICBmaWw6IGxlbiwgLy8gdGhlIGluZGV4IG9mIG1hdGNoaW5nIHN0cmluZyBpbiB0aGUgbG9uZ2VyIHN0cmluZ1xyXG4gICAgICBzYnM6ICcnLCAvLyB0aGUgbWF0Y2hpbmcgc3Vic3RyaW5nIGl0c2VsZlxyXG4gICAgICBtdGM6IG0gKyBzMi5zbGljZSgwLCBiaSlcclxuICAgIH07IC8vIGlmIGV4aXN0cyBtdGMgaG9sZHMgdGhlIG1hdGNoaW5nIHN0cmluZyBhdCB0aGUgZnJvbnRcclxuICAgIGxldCBzdWI6IGFueSA9IHsgc2JzOiAnJyB9OyAvLyByZXR1cm5lZCBzdWJzdHJpbmcgcGVyIDEgY2hhcmFjdGVyIHJvdGF0aW9uIG9mIHRoZSBsb25nZXIgc3RyaW5nXHJcblxyXG4gICAgaWYgKHNob3J0ZXIgIT09ICcnKSB7XHJcbiAgICAgIGZvciAobGV0IHJjID0gMDsgcmMgPCBsZW4gJiYgc3ViLnNicy5sZW5ndGggPCBwOyByYysrKSB7XHJcbiAgICAgICAgLy8gcmMgLT4gcm90YXRlIGNvdW50LCBwIC0+IHByZWNpc2lvbiBmYWN0b3JcclxuICAgICAgICBzdWIgPSBTdHJpbmdVdGlscy5nZXRNYXRjaGluZ1N1YnN0cmluZyhcclxuICAgICAgICAgIHNob3J0ZXIsXHJcbiAgICAgICAgICBTdHJpbmdVdGlscy5yb3RhdGVBcnJheShsb25nZXIsIHJjKSxcclxuICAgICAgICAgIGNkLm10Y1xyXG4gICAgICAgICk7IC8vIHJvdGF0ZSBsb25nZXIgc3RyaW5nIDEgY2hhciBhbmQgZ2V0IHN1YnN0cmluZ1xyXG4gICAgICAgIHN1Yi5maWwgPVxyXG4gICAgICAgICAgcmMgPCBsZW4gLSBzdWIuZmlzXHJcbiAgICAgICAgICAgID8gc3ViLmZpcyArIHJjIC8vIG1pc21hdGNoIGlzIGxvbmdlciB0aGFuIHRoZSBtaXNtYXRjaCBpbiBzaG9ydFxyXG4gICAgICAgICAgICA6IHN1Yi5maXMgLSBsZW4gKyByYzsgLy8gbWlzbWF0Y2ggaXMgc2hvcnRlciB0aGFuIHRoZSBtaXNtYXRjaCBpbiBzaG9ydFxyXG4gICAgICAgIGlmIChzdWIuc2JzLmxlbmd0aCA+IGNkLnNicy5sZW5ndGgpIHtcclxuICAgICAgICAgIGNkID0gc3ViOyAvLyBvbmx5IGtlZXAgdGhlIG9uZSB3aXRoIHRoZSBsb25nZXN0IHN1YnN0cmluZy5cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIGluc2VydCB0aGUgbWlzbWF0Y2hpbmcgZGVsZXRlIHN1YnNydCBhbmQgaW5zZXJ0IHN1YnN0ciB0byB0aGUgY2Qgb2JqZWN0IGFuZCBhdHRhY2ggdGhlIHByZXZpb3VzIHN1YnN0cmluZ1xyXG4gICAgW2NkLmRlbCwgY2QuaW5zXSA9IGlzVGhpc0xvbmdlclxyXG4gICAgICA/IFtsb25nZXIuc2xpY2UoMCwgY2QuZmlsKS5qb2luKCcnKSwgc2hvcnRlci5zbGljZSgwLCBjZC5maXMpXVxyXG4gICAgICA6IFtzaG9ydGVyLnNsaWNlKDAsIGNkLmZpcyksIGxvbmdlci5zbGljZSgwLCBjZC5maWwpLmpvaW4oJycpXTtcclxuICAgIHJldHVybiBjZC5kZWwuaW5kZXhPZignICcpID09PSAtMSB8fFxyXG4gICAgICBjZC5pbnMuaW5kZXhPZignICcpID09PSAtMSB8fFxyXG4gICAgICBjZC5kZWwgPT09ICcnIHx8XHJcbiAgICAgIGNkLmlucyA9PT0gJycgfHxcclxuICAgICAgY2Quc2JzID09PSAnJ1xyXG4gICAgICA/IGNkXHJcbiAgICAgIDogU3RyaW5nVXRpbHMuZ2V0Q2hhbmdlcyhjZC5kZWwsIGNkLmlucywgY2QubXRjLCBwKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc3RhdGljIHJvdGF0ZUFycmF5KGFycmF5LCBuKSB7XHJcbiAgICBjb25zdCBsZW4gPSBhcnJheS5sZW5ndGg7XHJcbiAgICBjb25zdCByZXMgPSBuZXcgQXJyYXkoYXJyYXkubGVuZ3RoKTtcclxuICAgIGlmIChuICUgbGVuID09PSAwKSB7XHJcbiAgICAgIHJldHVybiBhcnJheS5zbGljZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgIHJlc1tpXSA9IGFycmF5WyhpICsgKGxlbiArIChuICUgbGVuKSkpICUgbGVuXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlcztcclxuICB9XHJcbn1cclxuIl19