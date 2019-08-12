/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class StringUtils {
    /**
     * @param {?} s1
     * @param {?} s2
     * @param {?=} p
     * @return {?}
     */
    static diff(s1, s2, p = 4) {
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
        const changeData = StringUtils.getChanges(s1, s2, '', p);
        /** @type {?} */
        const nextS = s2.slice(changeData.mtc.length + changeData.ins.length + changeData.sbs.length);
        // remaining part of "s"
        /** @type {?} */
        const nextThis = s1.slice(changeData.mtc.length + changeData.del.length + changeData.sbs.length);
        // remaining part of "this"
        /** @type {?} */
        let result = '';
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
    }
    /**
     * @private
     * @param {?} s
     * @param {?} l
     * @param {?} m
     * @return {?}
     */
    static getMatchingSubstring(s, l, m) {
        // returns the first matching substring in-between the two strings
        /** @type {?} */
        let i = 0;
        /** @type {?} */
        let match = false;
        /** @type {?} */
        const slen = s.length;
        /** @type {?} */
        const o = { fis: slen, mtc: m, sbs: '' };
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
    }
    /**
     * @private
     * @param {?} s1
     * @param {?} s2
     * @param {?} m
     * @param {?} p
     * @return {?}
     */
    static getChanges(s1, s2, m, p) {
        /** @type {?} */
        const isThisLonger = s1.length >= s1.length ? true : false;
        let [longer, shorter] = isThisLonger ? [s1, s2] : [s2, s1];
        // assignment of longer and shorter by es6 destructuring
        /** @type {?} */
        let bi = 0;
        while (shorter[bi] === longer[bi] && bi < shorter.length) {
            ++bi;
        } // make bi the index of first mismatching character
        longer = longer.split('').slice(bi); // as the longer string will be rotated it is converted into array
        shorter = shorter.slice(bi); // shorter and longer now starts from the first mismatching character
        // shorter and longer now starts from the first mismatching character
        /** @type {?} */
        const len = longer.length;
        // length of the longer string
        /** @type {?} */
        let cd = {
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
        let sub = { sbs: '' };
        if (shorter !== '') {
            for (let rc = 0; rc < len && sub.sbs.length < p; rc++) {
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
        [cd.del, cd.ins] = isThisLonger
            ? [longer.slice(0, cd.fil).join(''), shorter.slice(0, cd.fis)]
            : [shorter.slice(0, cd.fis), longer.slice(0, cd.fil).join('')];
        return cd.del.indexOf(' ') === -1 ||
            cd.ins.indexOf(' ') === -1 ||
            cd.del === '' ||
            cd.ins === '' ||
            cd.sbs === ''
            ? cd
            : StringUtils.getChanges(cd.del, cd.ins, cd.mtc, p);
    }
    /**
     * @private
     * @param {?} array
     * @param {?} n
     * @return {?}
     */
    static rotateArray(array, n) {
        /** @type {?} */
        const len = array.length;
        /** @type {?} */
        const res = new Array(array.length);
        if (n % len === 0) {
            return array.slice();
        }
        else {
            for (let i = 0; i < len; i++) {
                res[i] = array[(i + (len + (n % len))) % len];
            }
        }
        return res;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nLXV0aWxzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGlnbzIvdXRpbHMvIiwic291cmNlcyI6WyJsaWIvc3RyaW5nLXV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNLE9BQU8sV0FBVzs7Ozs7OztJQUN0QixNQUFNLENBQUMsSUFBSSxDQUFDLEVBQVUsRUFBRSxFQUFVLEVBQUUsQ0FBQyxHQUFHLENBQUM7UUFDdkMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRTtZQUNkLE9BQU8sRUFBRSxDQUFDO1NBQ1g7UUFDRCxJQUFJLENBQUMsRUFBRSxFQUFFO1lBQ1AsT0FBTyx5QkFBeUIsR0FBRyxFQUFFLEdBQUcsU0FBUyxDQUFDO1NBQ25EO1FBQ0QsSUFBSSxDQUFDLEVBQUUsRUFBRTtZQUNQLE9BQU8sd0JBQXdCLEdBQUcsRUFBRSxHQUFHLFNBQVMsQ0FBQztTQUNsRDtRQUNELEVBQUUsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDbkIsRUFBRSxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7Y0FDYixVQUFVLEdBQUcsV0FBVyxDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7O2NBQ2xELEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUNwQixVQUFVLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FDdEU7OztjQUNLLFFBQVEsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUN2QixVQUFVLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FDdEU7OztZQUNHLE1BQU0sR0FBRyxFQUFFO1FBQ2YsSUFBSSxVQUFVLENBQUMsR0FBRyxDQUFDLE1B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TCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUM1QixHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQzthQUMvQztTQUNGO1FBQ0QsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgU3RyaW5nVXRpbHMge1xyXG4gIHN0YXRpYyBkaWZmKHMxOiBzdHJpbmcsIHMyOiBzdHJpbmcsIHAgPSA0KTogc3RyaW5nIHtcclxuICAgIGlmICghczEgJiYgIXMyKSB7XHJcbiAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuICAgIGlmICghczEpIHtcclxuICAgICAgcmV0dXJuICc8c3BhbiBjbGFzcz1cImluc2VydGVkXCI+JyArIHMyICsgJzwvc3Bhbj4nO1xyXG4gICAgfVxyXG4gICAgaWYgKCFzMikge1xyXG4gICAgICByZXR1cm4gJzxzcGFuIGNsYXNzPVwiZGVsZXRlZFwiPicgKyBzMSArICc8L3NwYW4+JztcclxuICAgIH1cclxuICAgIHMxID0gczEudG9TdHJpbmcoKTtcclxuICAgIHMyID0gczIudG9TdHJpbmcoKTtcclxuICAgIGNvbnN0IGNoYW5nZURhdGEgPSBTdHJpbmdVdGlscy5nZXRDaGFuZ2VzKHMxLCBzMiwgJycsIHApO1xyXG4gICAgY29uc3QgbmV4dFMgPSBzMi5zbGljZShcclxuICAgICAgY2hhbmdlRGF0YS5tdGMubGVuZ3RoICsgY2hhbmdlRGF0YS5pbnMubGVuZ3RoICsgY2hhbmdlRGF0YS5zYnMubGVuZ3RoXHJcbiAgICApOyAvLyByZW1haW5pbmcgcGFydCBvZiBcInNcIlxyXG4gICAgY29uc3QgbmV4dFRoaXMgPSBzMS5zbGljZShcclxuICAgICAgY2hhbmdlRGF0YS5tdGMubGVuZ3RoICsgY2hhbmdlRGF0YS5kZWwubGVuZ3RoICsgY2hhbmdlRGF0YS5zYnMubGVuZ3RoXHJcbiAgICApOyAvLyByZW1haW5pbmcgcGFydCBvZiBcInRoaXNcIlxyXG4gICAgbGV0IHJlc3VsdCA9ICcnOyAvLyB0aGUgZ2xvcmlvdXMgcmVzdWx0XHJcbiAgICBpZiAoY2hhbmdlRGF0YS5kZWwubGVuZ3RoID4gMCkge1xyXG4gICAgICBjaGFuZ2VEYXRhLmRlbCA9ICc8c3BhbiBjbGFzcz1cImRlbGV0ZWRcIj4nICsgY2hhbmdlRGF0YS5kZWwgKyAnPC9zcGFuPic7XHJcbiAgICB9XHJcbiAgICBpZiAoY2hhbmdlRGF0YS5pbnMubGVuZ3RoID4gMCkge1xyXG4gICAgICBjaGFuZ2VEYXRhLmlucyA9ICc8c3BhbiBjbGFzcz1cImluc2VydGVkXCI+JyArIGNoYW5nZURhdGEuaW5zICsgJzwvc3Bhbj4nO1xyXG4gICAgfVxyXG4gICAgcmVzdWx0ID0gY2hhbmdlRGF0YS5tdGMgKyBjaGFuZ2VEYXRhLmRlbCArIGNoYW5nZURhdGEuaW5zICsgY2hhbmdlRGF0YS5zYnM7XHJcbiAgICByZXN1bHQgKz1cclxuICAgICAgbmV4dFRoaXMgIT09ICcnIHx8IG5leHRTICE9PSAnJ1xyXG4gICAgICAgID8gU3RyaW5nVXRpbHMuZGlmZihuZXh0VGhpcywgbmV4dFMsIHApXHJcbiAgICAgICAgOiAnJztcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHN0YXRpYyBnZXRNYXRjaGluZ1N1YnN0cmluZyhzLCBsLCBtKSB7XHJcbiAgICAvLyByZXR1cm5zIHRoZSBmaXJzdCBtYXRjaGluZyBzdWJzdHJpbmcgaW4tYmV0d2VlbiB0aGUgdHdvIHN0cmluZ3NcclxuICAgIGxldCBpID0gMDtcclxuICAgIGxldCBtYXRjaCA9IGZhbHNlO1xyXG4gICAgY29uc3Qgc2xlbiA9IHMubGVuZ3RoO1xyXG4gICAgY29uc3QgbyA9IHsgZmlzOiBzbGVuLCBtdGM6IG0sIHNiczogJycgfTsgLy8gdGVtcG9yYXJ5IG9iamVjdCB1c2VkIHRvIGNvbnN0cnVjdCB0aGUgY2QgKGNoYW5nZSBkYXRhKSBvYmplY3RcclxuXHJcbiAgICB3aGlsZSAoaSA8IHNsZW4pIHtcclxuICAgICAgbFtpXSA9PT0gc1tpXVxyXG4gICAgICAgID8gbWF0Y2hcclxuICAgICAgICAgID8gKG8uc2JzICs9IHNbaV0pIC8vIG8uc2JzIGhvbGRzIHRoZSBtYXRjaGluZyBzdWJzdHJpbmcgaXRzZWZcclxuICAgICAgICAgIDogKChtYXRjaCA9IHRydWUpLCAoby5maXMgPSBpKSwgKG8uc2JzID0gc1tpXSkpXHJcbiAgICAgICAgOiBtYXRjaFxyXG4gICAgICAgICAgPyAoaSA9IHNsZW4pIC8vIHN0b3AgYWZ0ZXIgdGhlIGZpcnN0IGZvdW5kIHN1YnN0cmluZ1xyXG4gICAgICAgICAgOiAoaSA9IGkpO1xyXG4gICAgICArK2k7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc3RhdGljIGdldENoYW5nZXMoczEsIHMyLCBtLCBwKSB7XHJcbiAgICBjb25zdCBpc1RoaXNMb25nZXIgPSBzMS5sZW5ndGggPj0gczEubGVuZ3RoID8gdHJ1ZSA6IGZhbHNlO1xyXG4gICAgbGV0IFtsb25nZXIsIHNob3J0ZXJdID0gaXNUaGlzTG9uZ2VyID8gW3MxLCBzMl0gOiBbczIsIHMxXTsgLy8gYXNzaWdubWVudCBvZiBsb25nZXIgYW5kIHNob3J0ZXIgYnkgZXM2IGRlc3RydWN0dXJpbmdcclxuICAgIGxldCBiaSA9IDA7IC8vIGJhc2UgaW5kZXggZGVzaWduYXRpbmcgdGhlIGluZGV4IG9mIGZpcnN0IG1pc21hY3RoaW5nIGNoYXJhY3RlciBpbiBib3RoIHN0cmluZ3NcclxuXHJcbiAgICB3aGlsZSAoc2hvcnRlcltiaV0gPT09IGxvbmdlcltiaV0gJiYgYmkgPCBzaG9ydGVyLmxlbmd0aCkge1xyXG4gICAgICArK2JpO1xyXG4gICAgfSAvLyBtYWtlIGJpIHRoZSBpbmRleCBvZiBmaXJzdCBtaXNtYXRjaGluZyBjaGFyYWN0ZXJcclxuICAgIGxvbmdlciA9IGxvbmdlci5zcGxpdCgnJykuc2xpY2UoYmkpOyAvLyBhcyB0aGUgbG9uZ2VyIHN0cmluZyB3aWxsIGJlIHJvdGF0ZWQgaXQgaXMgY29udmVydGVkIGludG8gYXJyYXlcclxuICAgIHNob3J0ZXIgPSBzaG9ydGVyLnNsaWNlKGJpKTsgLy8gc2hvcnRlciBhbmQgbG9uZ2VyIG5vdyBzdGFydHMgZnJvbSB0aGUgZmlyc3QgbWlzbWF0Y2hpbmcgY2hhcmFjdGVyXHJcblxyXG4gICAgY29uc3QgbGVuID0gbG9uZ2VyLmxlbmd0aDsgLy8gbGVuZ3RoIG9mIHRoZSBsb25nZXIgc3RyaW5nXHJcbiAgICBsZXQgY2Q6IGFueSA9IHtcclxuICAgICAgZmlzOiBzaG9ydGVyLmxlbmd0aCwgLy8gdGhlIGluZGV4IG9mIG1hdGNoaW5nIHN0cmluZyBpbiB0aGUgc2hvcnRlciBzdHJpbmdcclxuICAgICAgZmlsOiBsZW4sIC8vIHRoZSBpbmRleCBvZiBtYXRjaGluZyBzdHJpbmcgaW4gdGhlIGxvbmdlciBzdHJpbmdcclxuICAgICAgc2JzOiAnJywgLy8gdGhlIG1hdGNoaW5nIHN1YnN0cmluZyBpdHNlbGZcclxuICAgICAgbXRjOiBtICsgczIuc2xpY2UoMCwgYmkpXHJcbiAgICB9OyAvLyBpZiBleGlzdHMgbXRjIGhvbGRzIHRoZSBtYXRjaGluZyBzdHJpbmcgYXQgdGhlIGZyb250XHJcbiAgICBsZXQgc3ViOiBhbnkgPSB7IHNiczogJycgfTsgLy8gcmV0dXJuZWQgc3Vic3RyaW5nIHBlciAxIGNoYXJhY3RlciByb3RhdGlvbiBvZiB0aGUgbG9uZ2VyIHN0cmluZ1xyXG5cclxuICAgIGlmIChzaG9ydGVyICE9PSAnJykge1xyXG4gICAgICBmb3IgKGxldCByYyA9IDA7IHJjIDwgbGVuICYmIHN1Yi5zYnMubGVuZ3RoIDwgcDsgcmMrKykge1xyXG4gICAgICAgIC8vIHJjIC0+IHJvdGF0ZSBjb3VudCwgcCAtPiBwcmVjaXNpb24gZmFjdG9yXHJcbiAgICAgICAgc3ViID0gU3RyaW5nVXRpbHMuZ2V0TWF0Y2hpbmdTdWJzdHJpbmcoXHJcbiAgICAgICAgICBzaG9ydGVyLFxyXG4gICAgICAgICAgU3RyaW5nVXRpbHMucm90YXRlQXJyYXkobG9uZ2VyLCByYyksXHJcbiAgICAgICAgICBjZC5tdGNcclxuICAgICAgICApOyAvLyByb3RhdGUgbG9uZ2VyIHN0cmluZyAxIGNoYXIgYW5kIGdldCBzdWJzdHJpbmdcclxuICAgICAgICBzdWIuZmlsID1cclxuICAgICAgICAgIHJjIDwgbGVuIC0gc3ViLmZpc1xyXG4gICAgICAgICAgICA/IHN1Yi5maXMgKyByYyAvLyBtaXNtYXRjaCBpcyBsb25nZXIgdGhhbiB0aGUgbWlzbWF0Y2ggaW4gc2hvcnRcclxuICAgICAgICAgICAgOiBzdWIuZmlzIC0gbGVuICsgcmM7IC8vIG1pc21hdGNoIGlzIHNob3J0ZXIgdGhhbiB0aGUgbWlzbWF0Y2ggaW4gc2hvcnRcclxuICAgICAgICBpZiAoc3ViLnNicy5sZW5ndGggPiBjZC5zYnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICBjZCA9IHN1YjsgLy8gb25seSBrZWVwIHRoZSBvbmUgd2l0aCB0aGUgbG9uZ2VzdCBzdWJzdHJpbmcuXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBpbnNlcnQgdGhlIG1pc21hdGNoaW5nIGRlbGV0ZSBzdWJzcnQgYW5kIGluc2VydCBzdWJzdHIgdG8gdGhlIGNkIG9iamVjdCBhbmQgYXR0YWNoIHRoZSBwcmV2aW91cyBzdWJzdHJpbmdcclxuICAgIFtjZC5kZWwsIGNkLmluc10gPSBpc1RoaXNMb25nZXJcclxuICAgICAgPyBbbG9uZ2VyLnNsaWNlKDAsIGNkLmZpbCkuam9pbignJyksIHNob3J0ZXIuc2xpY2UoMCwgY2QuZmlzKV1cclxuICAgICAgOiBbc2hvcnRlci5zbGljZSgwLCBjZC5maXMpLCBsb25nZXIuc2xpY2UoMCwgY2QuZmlsKS5qb2luKCcnKV07XHJcbiAgICByZXR1cm4gY2QuZGVsLmluZGV4T2YoJyAnKSA9PT0gLTEgfHxcclxuICAgICAgY2QuaW5zLmluZGV4T2YoJyAnKSA9PT0gLTEgfHxcclxuICAgICAgY2QuZGVsID09PSAnJyB8fFxyXG4gICAgICBjZC5pbnMgPT09ICcnIHx8XHJcbiAgICAgIGNkLnNicyA9PT0gJydcclxuICAgICAgPyBjZFxyXG4gICAgICA6IFN0cmluZ1V0aWxzLmdldENoYW5nZXMoY2QuZGVsLCBjZC5pbnMsIGNkLm10YywgcCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHN0YXRpYyByb3RhdGVBcnJheShhcnJheSwgbikge1xyXG4gICAgY29uc3QgbGVuID0gYXJyYXkubGVuZ3RoO1xyXG4gICAgY29uc3QgcmVzID0gbmV3IEFycmF5KGFycmF5Lmxlbmd0aCk7XHJcbiAgICBpZiAobiAlIGxlbiA9PT0gMCkge1xyXG4gICAgICByZXR1cm4gYXJyYXkuc2xpY2UoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICByZXNbaV0gPSBhcnJheVsoaSArIChsZW4gKyAobiAlIGxlbikpKSAlIGxlbl07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiByZXM7XHJcbiAgfVxyXG59XHJcbiJdfQ==