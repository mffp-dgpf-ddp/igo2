mpiler release */
    ts.version = ts.versionMajorMinor + ".4";
})(ts || (ts = {}));
(function (ts) {
    /* @internal */
    var Comparison;
    (function (Comparison) {
        Comparison[Comparison["LessThan"] = -1] = "LessThan";
        Comparison[Comparison["EqualTo"] = 0] = "EqualTo";
        Comparison[Comparison["GreaterThan"] = 1] = "GreaterThan";
    })(Comparison = ts.Comparison || (ts.Comparison = {}));
})(ts || (ts = {}));
/* @internal */
(function (ts) {
    ts.emptyArray = [];
    /** Create a MapLike with good performance. */
    function createDictionaryObject() {
        var map = Object.create(/*prototype*/ null); // tslint:disable-line:no-null-keyword
        // Using 'delete' on an object causes V8 to put the object in dictionary mode.
        // This disables creation of hidden classes, which are expensive when an object is
        // constantly changing shape.
        map.__ = undefined;
        delete map.__;
        return map;
    }
    /** Create a new map. If a template object is provided, the map will copy entries from it. */
    function createMap() {
        return new ts.MapCtr();
    }
    ts.createMap = createMap;
    function createMapFromEntries(entries) {
        var map = createMap();
        for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
            var _a = entries_1[_i], key = _a[0], value = _a[1];
            map.set(key, value);
        }
        return map;
    }
    ts.createMapFromEntries = createMapFromEntries;
    function createMapFromTemplate(template) {
        var map = new ts.MapCtr();
        // Copies keys/values from template. Note that for..in will not throw if
        // template is undefined, and instead will just exit the loop.
        for (var key in template) {
            if (hasOwnProperty.call(template, key)) {
                map.set(key, template[key]);
            }
        }
        return map;
    }
    ts.createMapFromTemplate = createMapFromTemplate;
    // Internet Explorer's Map doesn't support iteration, so don't use it.
    // tslint:disable-next-line no-in-operator variable-name
    ts.MapCtr = typeof Map !== "undefined" && "entries" in Map.prototype ? Map : shimMap();
    // Keep the class inside a function so it doesn't get compiled if it's not used.
    function shimMap() {
        var MapIterator = /** @class */ (function () {
            function MapIterator(data, selector) {
                this.index = 0;
                this.data = data;
                this.selector = selector;
                this.keys = Object.keys(data);
            }
            MapIterator.prototype.next = function () {
                var index = this.index;
                if (index < this.keys.length) {
                    this.index++;
                    return { value: this.selector(this.data, this.keys[index]), done: false };
                }
                return { value: undefined, done: true };
            };
            return MapIterator;
        }());
        return /** @class */ (function () {
            function class_1() {
                this.data = createDictionaryObject();
                this.size = 0;
            }
            class_1.prototype.get = function (key) {
                return this.data[key];
            };
            class_1.prototype.set = function (key, value) {
                if (!this.has(key)) {
                    this.size++;
                }
                this.data[key] = value;
                return this;
            };
            class_1.prototype.has = function (key) {
                // tslint:disable-next-line:no-in-operator
                return key in this.data;
            };
            class_1.prototype.delete = function (key) {
                if (this.has(key)) {
                    this.size--;
                    delete this.data[key];
                    return true;
                }
                return false;
            };
            class_1.prototype.clear = function () {
                this.data = createDictionaryObject();
                this.size = 0;
            };
            class_1.prototype.keys = function () {
                return new MapIterator(this.data, function (_data, key) { return key; });
            };
            class_1.prototype.values = function () {
                return new MapIterator(this.data, function (data, key) { return data[key]; });
            };
            class_1.prototype.entries = function () {
                return new MapIterator(this.data, function (data, key) { return [key, data[key]]; });
            };
            class_1.prototype.forEach = function (action) {
                for (var key in this.data) {
                    action(this.data[key], key);
                }
            };
            return class_1;
        }());
    }
    function length(array) {
        return array ? array.length : 0;
    }
    ts.length = length;
    /**
     * Iterates through 'array' by index and performs the callback on each element of array until the callback
     * returns a truthy value, then returns that value.
     * If no such value is found, the callback is applied to each element of array and undefined is returned.
     */
    function forEach(array, callback) {
        if (array) {
            for (var i = 0; i < array.length; i++) {
                var result = callback(array[i], i);
                if (result) {
                    return result;
                }
            }
        }
        return undefined;
    }
    ts.forEach = forEach;
    /** Like `forEach`, but suitable for use with numbers and strings (which may be falsy). */
    function firstDefined(array, callback) {
        if (array === undefined) {
            return undefined;
        }
        for (var i = 0; i < array.length; i++) {
            var result = callback(array[i], i);
            if (result !== undefined) {
                return result;
            }
        }
        return undefined;
    }
    ts.firstDefined = firstDefined;
    function firstDefinedIterator(iter, callback) {
        while (true) {
            var _a = iter.next(), value = _a.value, done = _a.done;
            if (done) {
                return undefined;
            }
            var result = callback(value);
            if (result !== undefined) {
                return result;
            }
        }
    }
    ts.firstDefinedIterator = firstDefinedIterator;
    function zipWith(arrayA, arrayB, callback) {
        var result = [];
        Debug.assertEqual(arrayA.length, arrayB.length);
        for (var i = 0; i < arrayA.length; i++) {
            result.push(callback(arrayA[i], arrayB[i], i));
        }
        return result;
    }
    ts.zipWith = zipWith;
    function zipToIterator(arrayA, arrayB) {
        Debug.assertEqual(arrayA.length, arrayB.length);
        var i = 0;
        return {
            next: function () {
                if (i === arrayA.length) {
                    return { value: undefined, done: true };
                }
                i++;
                return { value: [arrayA[i - 1], arrayB[i - 1]], done: false };
            }
        };
    }
    ts.zipToIterator = zipToIterator;
    function zipToMap(keys, values) {
        Debug.assert(keys.length === values.length);
        var map = createMap();
        for (var i = 0; i < keys.length; ++i) {
            map.set(keys[i], values[i]);
        }
        return map;
    }
    ts.zipToMap = zipToMap;
    /**
     * Iterates through `array` by index and performs the callback on each element of array until the callback
     * returns a falsey value, then returns false.
     * If no such value is found, the callback is applied to each element of array and `true` is returned.
     */
    function every(array, callback) {
        if (array) {
            for (var i = 0; i < array.length; i++) {
                if (!callback(array[i], i)) {
                    return false;
                }
            }
        }
        return true;
    }
    ts.every = every;
    function find(array, predicate) {
        for (var i = 0; i < array.length; i++) {
            var value = array[i];
            if (predicate(value, i)) {
                return value;
            }
        }
        return undefined;
    }
    ts.find = find;
    function findLast(array, predicate) {
        for (var i = array.length - 1; i >= 0; i--) {
            var value = array[i];
            if (predicate(value, i)) {
                return value;
            }
        }
        return undefined;
    }
    ts.findLast = findLast;
    /** Works like Array.prototype.findIndex, returning `-1` if no element satisfying the predicate is found. */
    function findIndex(array, predicate, startIndex) {
        for (var i = startIndex || 0; i < array.length; i++) {
            if (predicate(array[i], i)) {
                return i;
            }
        }
        return -1;
    }
    ts.findIndex = findIndex;
    function findLastIndex(array, predicate, startIndex) {
        for (var i = startIndex === undefined ? array.length - 1 : startIndex; i >= 0; i--) {
            if (predicate(array[i], i)) {
                return i;
            }
        }
        return -1;
    }
    ts.findLastIndex = findLastIndex;
    /**
     * Returns the first truthy result of `callback`, or else fails.
     * This is like `forEach`, but never returns undefined.
     */
    function findMap(array, callback) {
        for (var i = 0; i < array.length; i++) {
            var result = callback(array[i], i);
            if (result) {
                return result;
            }
        }
        return Debug.fail();
    }
    ts.findMap = findMap;
    function contains(array, value, equalityComparer) {
        if (equalityComparer === void 0) { equalityComparer = equateValues; }
        if (array) {
            for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
                var v = array_1[_i];
                if (equalityComparer(v, value)) {
                    return true;
                }
            }
        }
        return false;
    }
    ts.contains = contains;
    function arraysEqual(a, b, equalityComparer) {
        if (equalityComparer === void 0) { equalityComparer = equateValues; }
        return a.length === b.length && a.every(function (x, i) { return equalityComparer(x, b[i]); });
    }
    ts.arraysEqual = arraysEqual;
    function indexOfAnyCharCode(text, charCodes, start) {
        for (var i = start || 0; i < text.length; i++) {
            if (contains(charCodes, text.charCodeAt(i))) {
                return i;
            }
        }
        return -1;
    }
    ts.indexOfAnyCharCode = indexOfAnyCharCode;
    function countWhere(array, predicate) {
        var count = 0;
        if (array) {
            for (var i = 0; i < array.length; i++) {
                var v = array[i];
                if (predicate(v, i)) {
                    count++;
                }
            }
        }
        return count;
    }
    ts.countWhere = countWhere;
    function filter(array, f) {
        if (array) {
            var len = array.length;
            var i = 0;
            while (i < len && f(array[i]))
                i++;
            if (i < len) {
                var result = array.slice(0, i);
                i++;
                while (i < len) {
                    var item = array[i];
                    if (f(item)) {
                        result.push(item);
                    }
                    i++;
                }
                return result;
            }
        }
        return array;
    }
    ts.filter = filter;
    function filterMutate(array, f) {
        var outIndex = 0;
        for (var i = 0; i < array.length; i++) {
            if (f(array[i], i, array)) {
                array[outIndex] = array[i];
                outIndex++;
            }
        }
        array.length = outIndex;
    }
    ts.filterMutate = filterMutate;
    function clear(array) {
        array.length = 0;
    }
    ts.clear = clear;
    function map(array, f) {
        var result;
        if (array) {
            result = [];
            for (var i = 0; i < array.length; i++) {
                result.push(f(array[i], i));
            }
        }
        return result;
    }
    ts.map = map;
    function mapIterator(iter, mapFn) {
        return {
            next: function () {
                var iterRes = iter.next();
                return iterRes.done ? iterRes : { value: mapFn(iterRes.value), done: false };
            }
        };
    }
    ts.mapIterator = mapIterator;
    function sameMap(array, f) {
        if (array) {
            for (var i = 0; i < array.length; i++) {
                var item = array[i];
                var mapped = f(item, i);
                if (item !== mapped) {
                    var result = array.slice(0, i);
                    result.push(mapped);
                    for (i++; i < array.length; i++) {
                        result.push(f(array[i], i));
                    }
                    return result;
                }
            }
        }
        return array;
    }
    ts.sameMap = sameMap;
    function flatten(array) {
        var result;
        if (array) {
            result = [];
            for (var _i = 0, array_2 = array; _i < array_2.length; _i++) {
                var v = array_2[_i];
                if (v) {
                    if (isArray(v)) {
                        addRange(result, v);
                    }
                    else {
                        result.push(v);
                    }
                }
            }
        }
        return result;
    }
    ts.flatten = flatten;
    /**
     * Maps an array. If the mapped value is an array, it is spread into the result.
     *
     * @param array The array to map.
     * @param mapfn The callback used to map the result into one or more values.
     */
    function flatMap(array, mapfn) {
        var result;
        if (array) {
            for (var i = 0; i < array.length; i++) {
                var v = mapfn(array[i], i);
                if (v) {
                    if (isArray(v)) {
                        result = addRange(result, v);
                    }
                    else {
                        result = append(result, v);
                    }
                }
            }
        }
        return result || ts.emptyArray;
    }
    ts.flatMap = flatMap;
    function flatMapToMutable(array, mapfn) {
        var result = [];
        if (array) {
            for (var i = 0; i < array.length; i++) {
                var v = mapfn(array[i], i);
                if (v) {
                    if (isArray(v)) {
                        addRange(result, v);
                    }
                    else {
                        result.push(v);
                    }
                }
            }
        }
        return result;
    }
    ts.flatMapToMutable = flatMapToMutable;
    function flatMapIterator(iter, mapfn) {
        var first = iter.next();
        if (first.done) {
            return ts.emptyIterator;
        }
        var currentIter = getIterator(first.value);
        return {
            next: function () {
                while (true) {
                    var currentRes = currentIter.next();
                    if (!currentRes.done) {
                        return currentRes;
                    }
                    var iterRes = iter.next();
                    if (iterRes.done) {
                        return iterRes;
                    }
                    currentIter = getIterator(iterRes.value);
                }
            },
        };
        function getIterator(x) {
            var res = mapfn(x);
            return res === undefined ? ts.emptyIterator : isArray(res) ? arrayIterator(res) : res;
        }
    }
    ts.flatMapIterator = flatMapIterator;
    function sameFlatMap(array, mapfn) {
        var result;
        if (array) {
            for (var i = 0; i < array.length; i++) {
                var item = array[i];
                var mapped = mapfn(item, i);
                if (result || item !== mapped || isArray(mapped)) {
                    if (!result) {
                        result = array.slice(0, i);
                    }
                    if (isArray(mapped)) {
                        addRange(result, mapped);
                    }
                    else {
                        result.push(mapped);
                    }
                }
            }
        }
        return result || array;
    }
    ts.sameFlatMap = sameFlatMap;
    function mapAllOrFail(array, mapFn) {
        var result = [];
        for (var i = 0; i < array.length; i++) {
            var mapped = mapFn(array[i], i);
            if (mapped === undefined) {
                return undefined;
            }
            result.push(mapped);
        }
        return result;
    }
    ts.mapAllOrFail = mapAllOrFail;
    function mapDefined(array, mapFn) {
        var result = [];
        if (array) {
            for (var i = 0; i < array.length; i++) {
                var mapped = mapFn(array[i], i);
                if (mapped !== undefined) {
                    result.push(mapped);
                }
            }
        }
        return result;
    }
    ts.mapDefined = mapDefined;
    function mapDefinedIterator(iter, mapFn) {
        return {
            next: function () {
                while (true) {
                    var res = iter.next();
                    if (res.done) {
                        return res;
                    }
                    var value = mapFn(res.value);
                    if (value !== undefined) {
                        return { value: value, done: false };
                    }
                }
            }
        };
    }
    ts.mapDefinedIterator = mapDefinedIterator;
    ts.emptyIterator = { next: function () { return ({ value: undefined, done: true }); } };
    function singleIterator(value) {
        var done = false;
        return {
            next: function () {
                var wasDone = done;
                done = true;
                return wasDone ? { value: undefined, done: true } : { value: value, done: false };
            }
        };
    }
    ts.singleIterator = singleIterator;
    function spanMap(array, keyfn, mapfn) {
        var result;
        if (array) {
            result = [];
            var len = array.length;
            var previousKey = void 0;
            var key = void 0;
            var start = 0;
            var pos = 0;
            while (start < len) {
                while (pos < len) {
                    var value = array[pos];
                    key = keyfn(value, pos);
                    if (pos === 0) {
                        previousKey = key;
                    }
                    else if (key !== previousKey) {
                        break;
                    }
                    pos++;
                }
                if (start < pos) {
                    var v = mapfn(array.slice(start, pos), previousKey, start, pos);
                    if (v) {
                        result.push(v);
                    }
                    start = pos;
                }
                previousKey = key;
                pos++;
            }
        }
        return result;
    }
    ts.spanMap = spanMap;
    function mapEntries(map, f) {
        if (!map) {
            return undefined;
        }
        var result = createMap();
        map.forEach(function (value, key) {
            var _a = f(key, value), newKey = _a[0], newValue = _a[1];
            result.set(newKey, newValue);
        });
        return result;
    }
    ts.mapEntries = mapEntries;
    function some(array, predicate) {
        if (array) {
            if (predicate) {
                for (var _i = 0, array_3 = array; _i < array_3.length; _i++) {
                    var v = array_3[_i];
                    if (predicate(v)) {
                        return true;
                    }
                }
            }
            else {
                return array.length > 0;
            }
        }
        return false;
    }
    ts.some = some;
    /** Calls the callback with (start, afterEnd) index pairs for each range where 'pred' is true. */
    function getRangesWhere(arr, pred, cb) {
        var start;
        for (var i = 0; i < arr.length; i++) {
            if (pred(arr[i])) {
                start = start === undefined ? i : start;
            }
            else {
                if (start !== undefined) {
                    cb(start, i);
                    start = undefined;
                }
            }
        }
        if (start !== undefined)
            cb(start, arr.length);
    }
    ts.getRangesWhere = getRangesWhere;
    function concatenate(array1, array2) {
        if (!some(array2))
            return array1;
        if (!some(array1))
            return array2;
        return array1.concat(array2);
    }
    ts.concatenate = concatenate;
    function deduplicateRelational(array, equalityComparer, comparer) {
        // Perform a stable sort of the array. This ensures the first entry in a list of
        // duplicates remains the first entry in the result.
        var indices = array.map(function (_, i) { return i; });
        stableSortIndices(array, indices, comparer);
        var last = array[indices[0]];
        var deduplicated = [indices[0]];
        for (var i = 1; i < indices.length; i++) {
            var index = indices[i];
            var item = array[index];
            if (!equalityComparer(last, item)) {
                deduplicated.push(index);
                last = item;
            }
        }
        // restore original order
        deduplicated.sort();
        return deduplicated.map(function (i) { return array[i]; });
    }
    function deduplicateEquality(array, equalityComparer) {
        var result = [];
        for (var _i = 0, array_4 = array; _i < array_4.length; _i++) {
            var item = array_4[_i];
            pushIfUnique(result, item, equalityComparer);
        }
        return result;
    }
    /**
     * Deduplicates an unsorted array.
     * @param equalityComparer An optional `EqualityComparer` used to determine if two values are duplicates.
     * @param comparer An optional `Comparer` used to sort entries before comparison, though the
     * result will remain in the original order in `array`.
     */
    function deduplicate(array, equalityComparer, comparer) {
        return array.length === 0 ? [] :
            array.length === 1 ? array.slice() :
                comparer ? deduplicateRelational(array, equalityComparer, comparer) :
                    deduplicateEquality(array, equalityComparer);
    }
    ts.deduplicate = deduplicate;
    /**
     * Deduplicates an array that has already been sorted.
     */
    function deduplicateSorted(array, comparer) {
        if (array.length === 0)
            return ts.emptyArray;
        var last = array[0];
        var deduplicated = [last];
        for (var i = 1; i < array.length; i++) {
            var next = array[i];
            switch (comparer(next, last)) {
                // equality comparison
                case true:
                // relational comparison
                case 0 /* EqualTo */:
                    continue;
                case -1 /* LessThan */:
                    // If `array` is sorted, `next` should **never** be less than `last`.
                    return Debug.fail("Array is unsorted.");
            }
            deduplicated.push(last = next);
        }
        return deduplicated;
    }
    function insertSorted(array, insert, compare) {
        if (array.length === 0) {
            array.push(insert);
            return;
        }
        var insertIndex = binarySearch(array, insert, identity, compare);
        if (insertIndex < 0) {
            array.splice(~insertIndex, 0, insert);
        }
    }
    ts.insertSorted = insertSorted;
    function sortAndDeduplicate(array, comparer, equalityComparer) {
        return deduplicateSorted(sort(array, comparer), equalityComparer || comparer || compareStringsCaseSensitive);
    }
    ts.sortAndDeduplicate = sortAndDeduplicate;
    function arrayIsEqualTo(array1, array2, equalityComparer) {
        if (equalityComparer === void 0) { equalityComparer = equateValues; }
        if (!array1 || !array2) {
            return array1 === array2;
        }
        if (array1.length !== array2.length) {
            return false;
        }
        for (var i = 0; i < array1.length; i++) {
            if (!equalityComparer(array1[i], array2[i], i)) {
                return false;
            }
        }
        return true;
    }
    ts.arrayIsEqualTo = arrayIsEqualTo;
    function compact(array) {
        var result;
        if (array) {
            for (var i = 0; i < array.length; i++) {
                var v = array[i];
                if (result || !v) {
                    if (!result) {
                        result = array.slice(0, i);
                    }
                    if (v) {
                        result.push(v);
                    }
                }
            }
        }
        return result || array;
    }
    ts.compact = compact;
    /**
     * Gets the relative complement of `arrayA` with respect to `arrayB`, returning the elements that
     * are not present in `arrayA` but are present in `arrayB`. Assumes both arrays are sorted
     * based on the provided comparer.
     */
    function relativeComplement(arrayA, arrayB, comparer) {
        if (!arrayB || !arrayA || arrayB.length === 0 || arrayA.length === 0)
            return arrayB;
        var result = [];
        loopB: for (var offsetA = 0, offsetB = 0; offsetB < arrayB.length; offsetB++) {
            if (offsetB > 0) {
                // Ensure `arrayB` is properly sorted.
                Debug.assertGreaterThanOrEqual(comparer(arrayB[offsetB], arrayB[offsetB - 1]), 0 /* EqualTo */);
            }
            loopA: for (var startA = offsetA; offsetA < arrayA.length; offsetA++) {
                if (offsetA > startA) {
                    // Ensure `arrayA` is properly sorted. We only need to perform this check if
                    // `offsetA` has changed since we entered the loop.
                    Debug.assertGreaterThanOrEqual(comparer(arrayA[offsetA], arrayA[offsetA - 1]), 0 /* EqualTo */);
                }
                switch (comparer(arrayB[offsetB], arrayA[offsetA])) {
                    case -1 /* LessThan */:
                        // If B is less than A, B does not exist in arrayA. Add B to the result and
                        // move to the next element in arrayB without changing the current position
                        // in arrayA.
                        result.push(arrayB[offsetB]);
                        continue loopB;
                    case 0 /* EqualTo */:
                        // If B is equal to A, B exists in arrayA. Move to the next element in
                        // arrayB without adding B to the result or changing the current position
                        // in arrayA.
                        continue loopB;
                    case 1 /* GreaterThan */:
                        // If B is greater than A, we need to keep looking for B in arrayA. Move to
                        // the next element in arrayA and recheck.
                        continue loopA;
                }
            }
        }
        return result;
    }
    ts.relativeComplement = relativeComplement;
    function sum(array, prop) {
        var result = 0;
        for (var _i = 0, array_5 = array; _i < array_5.length; _i++) {
            var v = array_5[_i];
            result += v[prop];
        }
        return result;
    }
    ts.sum = sum;
    function append(to, value) {
        if (value === undefined)
            return to;
        if (to === undefined)
            return [value];
        to.push(value);
        return to;
    }
    ts.append = append;
    /**
     * Gets the actual offset into an array for a relative offset. Negative offsets indicate a
     * position offset from the end of the array.
     */
    function toOffset(array, offset) {
        return offset < 0 ? array.length + offset : offset;
    }
    function addRange(to, from, start, end) {
        if (from === undefined || from.length === 0)
            return to;
        if (to === undefined)
            return from.slice(start, end);
        start = start === undefined ? 0 : toOffset(from, start);
        end = end === undefined ? from.length : toOffset(from, end);
        for (var i = start; i < end && i < from.length; i++) {
            if (from[i] !== undefined) {
                to.push(from[i]);
            }
        }
        return to;
    }
    ts.addRange = addRange;
    /**
     * @return Whether the value was added.
     */
    function pushIfUnique(array, toAdd, equalityComparer) {
        if (contains(array, toAdd, equalityComparer)) {
            return false;
        }
        else {
            array.push(toAdd);
            return true;
        }
    }
    ts.pushIfUnique = pushIfUnique;
    /**
     * Unlike `pushIfUnique`, this can take `undefined` as an input, and returns a new array.
     */
    function appendIfUnique(array, toAdd, equalityComparer) {
        if (array) {
            pushIfUnique(array, toAdd, equalityComparer);
            return array;
        }
        else {
            return [toAdd];
        }
    }
    ts.appendIfUnique = appendIfUnique;
    function stableSortIndices(array, indices, comparer) {
        // sort indices by value then position
        indices.sort(function (x, y) { return comparer(array[x], array[y]) || compareValues(x, y); });
    }
    /**
     * Returns a new sorted array.
     */
    function sort(array, comparer) {
        return (array.length === 0 ? array : array.slice().sort(comparer));
    }
    ts.sort = sort;
    function arrayIterator(array) {
        var i = 0;
        return { next: function () {
                if (i === array.length) {
                    return { value: undefined, done: true };
                }
                else {
                    i++;
                    return { value: array[i - 1], done: false };
                }
            } };
    }
    ts.arrayIterator = arrayIterator;
    /**
     * Stable sort of an array. Elements equal to each other maintain their relative position in the array.
     */
    function stableSort(array, comparer) {
        var indices = array.map(function (_, i) { return i; });
        stableSortIndices(array, indices, comparer);
        return indices.map(function (i) { return array[i]; });
    }
    ts.stableSort = stableSort;
    function rangeEquals(array1, array2, pos, end) {
        while (pos < end) {
            if (array1[pos] !== array2[pos]) {
                return false;
            }
            pos++;
        }
        return true;
    }
    ts.rangeEquals = rangeEquals;
    /**
     * Returns the element at a specific offset in an array if non-empty, `undefined` otherwise.
     * A negative offset indicates the element should be retrieved from the end of the array.
     */
    function elementAt(array, offset) {
        if (array) {
            offset = toOffset(array, offset);
            if (offset < array.length) {
                return array[offset];
            }
        }
        return undefined;
    }
    ts.elementAt = elementAt;
    /**
     * Returns the first element of an array if non-empty, `undefined` otherwise.
     */
    function firstOrUndefined(array) {
        return array.length === 0 ? undefined : array[0];
    }
    ts.firstOrUndefined = firstOrUndefined;
    function first(array) {
        Debug.assert(array.length !== 0);
        return array[0];
    }
    ts.first = first;
    /**
     * Returns the last element of an array if non-empty, `undefined` otherwise.
     */
    function lastOrUndefined(array) {
        return array.length === 0 ? undefined : array[array.length - 1];
    }
    ts.lastOrUndefined = lastOrUndefined;
    function last(array) {
        Debug.assert(array.length !== 0);
        return array[array.length - 1];
    }
    ts.last = last;
    /**
     * Returns the only element of an array if it contains only one element, `undefined` otherwise.
     */
    function singleOrUndefined(array) {
        return array && array.length === 1
            ? array[0]
            : undefined;
    }
    ts.singleOrUndefined = singleOrUndefined;
    function singleOrMany(array) {
        return array && array.length === 1
            ? array[0]
            : array;
    }
    ts.singleOrMany = singleOrMany;
    function replaceElement(array, index, value) {
        var result = array.slice(0);
        result[index] = value;
        return result;
    }
    ts.replaceElement = replaceElement;
    /**
     * Performs a binary search, finding the index at which `value` occurs in `array`.
     * If no such index is found, returns the 2's-complement of first index at which
     * `array[index]` exceeds `value`.
     * @param array A sorted array whose first element must be no larger than number
     * @param value The value to be searched for in the array.
     * @param keySelector A callback used to select the search key from `value` and each element of
     * `array`.
     * @param keyComparer A callback used to compare two keys in a sorted array.
     * @param offset An offset into `array` at which to start the search.
     */
    function binarySearch(array, value, keySelector, keyComparer, offset) {
        return binarySearchKey(array, keySelector(value), keySelector, keyComparer, offset);
    }
    ts.binarySearch = binarySearch;
    /**
     * Performs a binary search, finding the index at which an object with `key` occurs in `array`.
     * If no such index is found, returns the 2's-complement of first index at which
     * `array[index]` exceeds `key`.
     * @param array A sorted array whose first element must be no larger than number
     * @param key The key to be searched for in the array.
     * @param keySelector A callback used to select the search key from each element of `array`.
     * @param keyComparer A callback used to compare two keys in a sorted array.
     * @param offset An offset into `array` at which to start the search.
     */
    function binarySearchKey(array, key, keySelector, keyComparer, offset) {
        if (!some(array)) {
            return -1;
        }
        var low = offset || 0;
        var high = array.length - 1;
        while (low <= high) {
            var middle = low + ((high - low) >> 1);
            var midKey = keySelector(array[middle]);
            switch (keyComparer(midKey, key)) {
                case -1 /* LessThan */:
                    low = middle + 1;
                    break;
                case 0 /* EqualTo */:
                    return middle;
                case 1 /* GreaterThan */:
                    high = middle - 1;
                    break;
            }
        }
        return ~low;
    }
    ts.binarySearchKey = binarySearchKey;
    function reduceLeft(array, f, initial, start, count) {
        if (array && array.length > 0) {
            var size = array.length;
            if (size > 0) {
                var pos = start === undefined || start < 0 ? 0 : start;
                var end = count === undefined || pos + count > size - 1 ? size - 1 : pos + count;
                var result = void 0;
                if (arguments.length <= 2) {
                    result = array[pos];
                    pos++;
                }
                else {
                    result = initial;
                }
                while (pos <= end) {
                    result = f(result, array[pos], pos);
                    pos++;
                }
                return result;
            }
        }
        return initial;
    }
    ts.reduceLeft = reduceLeft;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    /**
     * Indicates whether a map-like contains an own property with the specified key.
     *
     * @param map A map-like.
     * @param key A property key.
     */
    function hasProperty(map, key) {
        return hasOwnProperty.call(map, key);
    }
    ts.hasProperty = hasProperty;
    /**
     * Gets the value of an owned property in a map-like.
     *
     * @param map A map-like.
     * @param key A property key.
     */
    function getProperty(map, key) {
        return hasOwnProperty.call(map, key) ? map[key] : undefined;
    }
    ts.getProperty = getProperty;
    /**
     * Gets the owned, enumerable property keys of a map-like.
     */
    function getOwnKeys(map) (function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/compiler/testing/src/output/source_map_util.ngfactory", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    /**
     * @fileoverview This file was generated by the Angular template compiler. Do not edit.
     *
     * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
     * tslint:disable
     */ 
    Object.defineProperty(exports, "__esModule", { value: true });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic291cmNlX21hcF91dGlsLm5nZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyL3Rlc3Rpbmcvc3JjL291dHB1dC9zb3VyY2VfbWFwX3V0aWwubmdmYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBpMCBmcm9tICdAYW5ndWxhci9jb3JlJztcbmkwLkNvbXBvbmVudEZhY3Rvcnk7XG4iXX0=                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   /**
    Licensed to the Apache Software Foundation (ASF) under one
    or more contributor license agreements.  See the NOTICE file
    distributed with this work for additional information
    regarding copyright ownership.  The ASF licenses this file
    to you under the Apache License, Version 2.0 (the
    "License"); you may not use this file except in compliance
    with the License.  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing,
    software distributed under the License is distributed on an
    "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, either express or implied.  See the License for the
    specific language governing permissions and limitations
    under the License.
*/

/* jshint sub:true, laxcomma:true, laxbreak:true */

var fs = require('fs');
var path = require('path');
var PluginInfo = require('./PluginInfo');
var events = require('../events');

function PluginInfoProvider () {
    this._cache = {};
    this._getAllCache = {};
}

PluginInfoProvider.prototype.get = function (dirName) {
    var absPath = path.resolve(dirName);
    if (!this._cache[absPath]) {
        this._cache[absPath] = new PluginInfo(dirName);
    }
    return this._cache[absPath];
};

// Normally you don't need to put() entries, but it's used
// when copying plugins, and in unit tests.
PluginInfoProvider.prototype.put = function (pluginInfo) {
    var absPath = path.resolve(pluginInfo.dir);
    this._cache[absPath] = pluginInfo;
};

// Used for plugin search path processing.
// Given a dir containing multiple plugins, create a PluginInfo object for
// each of them and return as array.
// Should load them all in parallel and return a promise, but not yet.
PluginInfoProvider.prototype.getAllWithinSearchPath = function (dirName) {
    var absPath = path.resolve(dirName);
    if (!this._getAllCache[absPath]) {
        this._getAllCache[absPath] = getAllHelper(absPath, this);
    }
    return this._getAllCache[absPath];
};

function getAllHelper (absPath, provider) {
    if (!fs.existsSync(absPath)) {
        return [];
    }
    // If dir itself is a plugin, return it in an array with one element.
    if (fs.existsSync(path.join(absPath, 'plugin.xml'))) {
        return [provider.get(absPath)];
    }
    var subdirs = fs.readdirSync(absPath);
    var plugins = [];
    subdirs.forEach(function (subdir) {
        var d = path.join(absPath, subdir);
        if (fs.existsSync(path.join(d, 'plugin.xml'))) {
            try {
                plugins.push(provider.get(d));
            } catch (e) {
                events.emit('warn', 'Error parsing ' + path.join(d, 'plugin.xml.\n' + e.stack));
            }
        }
    });
    return plugins;
}

module.exports = PluginInfoProvider;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    this.unsubscribe();
        } else {
          this.__tryOrSetError(_parentSubscriber, wrappedComplete);
          this.unsubscribe();
        }
      } else {
        this.unsubscribe();
      }
    }
  }

  private __tryOrUnsub(fn: Function, value?: any): void {
    try {
      fn.call(this._context, value);
    } catch (err) {
      this.unsubscribe();
      if (config.useDeprecatedSynchronousErrorHandling) {
        throw err;
      } else {
        hostReportError(err);
      }
    }
  }

  private __tryOrSetError(parent: Subscriber<T>, fn: Function, value?: any): boolean {
    if (!config.useDeprecatedSynchronousErrorHandling) {
      throw new Error('bad call');
    }
    try {
      fn.call(this._context, value);
    } catch (err) {
      if (config.useDeprecatedSynchronousErrorHandling) {
        parent.syncErrorValue = err;
        parent.syncErrorThrown = true;
        return true;
      } else {
        hostReportError(err);
        return true;
      }
    }
    return false;
  }

  /** @internal This is an internal implementation detail, do not use. */
  _unsubscribe(): void {
    const { _parentSubscriber } = this;
    this._context = null;
    this._parentSubscriber = null;
    _parentSubscriber.unsubscribe();
  }
}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       ### Javascript porting of Markus Kuhn's wcwidth() implementation

The following explanation comes from the original C implementation:

This is an implementation of wcwidth() and wcswidth() (defined in
IEEE Std 1002.1-2001) for Unicode.

http://www.opengroup.org/onlinepubs/007904975/functions/wcwidth.html
http://www.opengroup.org/onlinepubs/007904975/functions/wcswidth.html

In fixed-width output devices, Latin characters all occupy a single
"cell" position of equal width, whereas ideographic CJK characters
occupy two such cells. Interoperability between terminal-line
applications and (teletype-style) character terminals using the
UTF-8 encoding requires agreement on which character should advance
the cursor by how many cell positions. No established formal
standards exist at present on which Unicode character shall occupy
how many cell positions on character terminals. These routines are
a first attempt of defining such behavior based on simple rules
applied to data provided by the Unicode Consortium.

For some graphical characters, the Unicode standard explicitly
defines a character-cell width via the definition of the East Asian
FullWidth (F), Wide (W), Half-width (H), and Narrow (Na) classes.
In all these cases, there is no ambiguity about which width a
terminal shall use. For characters in the East Asian Ambiguous (A)
class, the width choice depends purely on a preference of backward
compatibility with either historic CJK or Western practice.
Choosing single-width for these characters is easy to justify as
the appropriate long-term solution, as the CJK practice of
displaying these characters as double-width comes from historic
implementation simplicity (8-bit encoded characters were displayed
single-width and 16-bit ones double-width, even for Greek,
Cyrillic, etc.) and not any typographic considerations.

Much less clear is the choice of width for the Not East Asian
(Neutral) class. Existing practice does not dictate a width for any
of these characters. It would nevertheless make sense
typographically to allocate two character cells to characters such
as for instance EM SPACE or VOLUME INTEGRAL, which cannot be
represented adequately with a single-width glyph. The following
routines at present merely assign a single-cell width to all
neutral characters, in the interest of simplicity. This is not
entirely satisfactory and should be reconsidered before
establishing a formal standard in this area. At the moment, the
decision which Not East Asian (Neutral) characters should be
represented by double-width glyphs cannot yet be answered by
applying a simple rule from the Unicode database content. Setting
up a proper standard for the behavior of UTF-8 character terminals
will require a careful analysis not only of each Unicode character,
but also of each presentation form, something the author of these
routines has avoided to do so far.

http://www.unicode.org/unicode/reports/tr11/

Markus Kuhn -- 2007-05-26 (Unicode 5.0)

Permission to use, copy, modify, and distribute this software
for any purpose and without fee is hereby granted. The author
disclaims all warranties with regard to this software.

Latest version: http://www.cl.cam.ac.uk/~mgk25/ucs/wcwidth.c



                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              import { SchedulerLike, SchedulerAction } from '../types';
import { Subscriber } from '../Subscriber';
import { Subscription } from '../Subscription';
import { Observable } from '../Observable';
import { asap } from '../scheduler/asap';
import { isNumeric } from '../util/isNumeric';

export interface DispatchArg<T> {
  source: Observable<T>;
  subscriber: Subscriber<T>;
}

/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
export class SubscribeOnObservable<T> extends Observable<T> {
  /** @nocollapse */
  static create<T>(source: Observable<T>, delay: number = 0, scheduler: SchedulerLike = asap): Observable<T> {
    return new SubscribeOnObservable(source, delay, scheduler);
  }

  /** @nocollapse */
  static dispatch<T>(this: SchedulerAction<T>, arg: DispatchArg<T>): Subscription {
    const { source, subscriber } = arg;
    return this.add(source.subscribe(subscriber));
  }

  constructor(public source: Observable<T>,
              private delayTime: number = 0,
              private scheduler: SchedulerLike = asap) {
    super();
    if (!isNumeric(delayTime) || delayTime < 0) {
      this.delayTime = 0;
    }
    if (!scheduler || typeof scheduler.schedule !== 'function') {
      this.scheduler = asap;
    }
  }

  /** @deprecated This is an internal implementation detail, do not use. */
  _subscribe(subscriber: Subscriber<T>) {
    const delay = this.delayTime;
    const source = this.source;
    const scheduler = this.scheduler;

    return scheduler.schedule<DispatchArg<any>>(SubscribeOnObservable.dispatch, delay, {
      source, subscriber
    });
  }
}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               import { DateAdapter } from "@angular/material/core";
import { DatetimeAdapter } from "./datetime-adapter";
import * as ɵngcc0 from '@angular/core';
export declare class NativeDatetimeAdapter extends DatetimeAdapter<Date> {
    constructor(matDateLocale: string, _delegate: DateAdapter<Date>);
    clone(date: Date): Date;
    getHour(date: Date): number;
    getMinute(date: Date): number;
    isInNextMonth(startDate: Date, endDate: Date): boolean;
    createDatetime(year: number, month: number, date: number, hour: number, minute: number): Date;
    private getDateInNextMonth;
    getFirstDateOfMonth(date: Date): Date;
    getHourNames(): string[];
    getMinuteNames(): string[];
    addCalendarYears(date: Date, years: number): Date;
    addCalendarMonths(date: Date, months: number): Date;
    addCalendarDays(date: Date, days: number): Date;
    addCalendarHours(date: Date, hours: number): Date;
    addCalendarMinutes(date: Date, minutes: number): Date;
    toIso8601(date: Date): string;
    /**
     * Strip out unicode LTR and RTL characters. Edge and IE insert these into formatted dates while
     * other browsers do not. We remove them to make output consistent and because they interfere with
     * date parsing.
     * @param str The string to strip direction characters from.
     * @returns The stripped string.
     */
    private _stripDirectionalityCharacters;
    /**
     * Pads a number to make it two digits.
     * @param n The number to pad.
     * @returns The padded number.
     */
    private _2digit;
    /** Creates a date but allows the month and date to overflow. */
    private _createDateWithOverflow;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NativeDatetimeAdapter, [{ optional: true; }, null]>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<NativeDatetimeAdapter>;
}

//# sourceMappingURL=native-datetime-adapter.d.ts.map                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   /** PURE_IMPORTS_START _Observable,_from,_util_isArray,_empty PURE_IMPORTS_END */
import { Observable } from '../Observable';
import { from } from './from';
import { isArray } from '../util/isArray';
import { EMPTY } from './empty';
export function onErrorResumeNext() {
    var sources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i] = arguments[_i];
    }
    if (sources.length === 0) {
        return EMPTY;
    }
    var first = sources[0], remainder = sources.slice(1);
    if (sources.length === 1 && isArray(first)) {
        return onErrorResumeNext.apply(void 0, first);
    }
    return new Observable(function (subscriber) {
        var subNext = function () { return subscriber.add(onErrorResumeNext.apply(void 0, remainder).subscribe(subscriber)); };
        return from(first).subscribe({
            next: function (value) { subscriber.next(value); },
            error: subNext,
            complete: subNext,
        });
    });
}
//# sourceMappingURL=onErrorResumeNext.js.map
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               /**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/core/schematics/migrations/undecorated-classes-with-di/find_base_classes", ["require", "exports", "typescript", "@angular/core/schematics/utils/typescript/class_declaration"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const ts = require("typescript");
    const class_declaration_1 = require("@angular/core/schematics/utils/typescript/class_declaration");
    /** Gets all base class declarations of the specified class declaration. */
    function findBaseClassDeclarations(node, typeChecker) {
        const result = [];
        let currentClass = node;
        while (currentClass) {
            const baseTypes = class_declaration_1.getBaseTypeIdentifiers(currentClass);
            if (!baseTypes || baseTypes.length !== 1) {
                break;
            }
            const symbol = typeChecker.getTypeAtLocation(baseTypes[0]).getSymbol();
            if (!symbol || !ts.isClassDeclaration(symbol.valueDeclaration)) {
                break;
            }
            result.push({ identifier: baseTypes[0], node: symbol.valueDeclaration });
            currentClass = symbol.valueDeclaration;
        }
        return result;
    }
    exports.findBaseClassDeclarations = findBaseClassDeclarations;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZF9iYXNlX2NsYXNzZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NjaGVtYXRpY3MvbWlncmF0aW9ucy91bmRlY29yYXRlZC1jbGFzc2VzLXdpdGgtZGkvZmluZF9iYXNlX2NsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7Ozs7Ozs7SUFFSCxpQ0FBaUM7SUFDakMsbUdBQWdGO0lBRWhGLDJFQUEyRTtJQUMzRSxTQUFnQix5QkFBeUIsQ0FBQyxJQUF5QixFQUFFLFdBQTJCO1FBQzlGLE1BQU0sTUFBTSxHQUE2RCxFQUFFLENBQUM7UUFDNUUsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBRXhCLE9BQU8sWUFBWSxFQUFFO1lBQ25CLE1BQU0sU0FBUyxHQUFHLDBDQUFzQixDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3ZELElBQUksQ0FBQyxTQUFTLElBQUksU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQ3hDLE1BQU07YUFDUDtZQUNELE1BQU0sTUFBTSxHQUFHLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUN2RSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO2dCQUM5RCxNQUFNO2FBQ1A7WUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLGdCQUFnQixFQUFDLENBQUMsQ0FBQztZQUN2RSxZQUFZLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDO1NBQ3hDO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQWpCRCw4REFpQkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCAqIGFzIHRzIGZyb20gJ3R5cGVzY3JpcHQnO1xuaW1wb3J0IHtnZXRCYXNlVHlwZUlkZW50aWZpZXJzfSBmcm9tICcuLi8uLi91dGlscy90eXBlc2NyaXB0L2NsYXNzX2RlY2xhcmF0aW9uJztcblxuLyoqIEdldHMgYWxsIGJhc2UgY2xhc3MgZGVjbGFyYXRpb25zIG9mIHRoZSBzcGVjaWZpZWQgY2xhc3MgZGVjbGFyYXRpb24uICovXG5leHBvcnQgZnVuY3Rpb24gZmluZEJhc2VDbGFzc0RlY2xhcmF0aW9ucyhub2RlOiB0cy5DbGFzc0RlY2xhcmF0aW9uLCB0eXBlQ2hlY2tlcjogdHMuVHlwZUNoZWNrZXIpIHtcbiAgY29uc3QgcmVzdWx0OiB7aWRlbnRpZmllcjogdHMuSWRlbnRpZmllciwgbm9kZTogdHMuQ2xhc3NEZWNsYXJhdGlvbn1bXSA9IFtdO1xuICBsZXQgY3VycmVudENsYXNzID0gbm9kZTtcblxuICB3aGlsZSAoY3VycmVudENsYXNzKSB7XG4gICAgY29uc3QgYmFzZVR5cGVzID0gZ2V0QmFzZVR5cGVJZGVudGlmaWVycyhjdXJyZW50Q2xhc3MpO1xuICAgIGlmICghYmFzZVR5cGVzIHx8IGJhc2VUeXBlcy5sZW5ndGggIT09IDEpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBjb25zdCBzeW1ib2wgPSB0eXBlQ2hlY2tlci5nZXRUeXBlQXRMb2NhdGlvbihiYXNlVHlwZXNbMF0pLmdldFN5bWJvbCgpO1xuICAgIGlmICghc3ltYm9sIHx8ICF0cy5pc0NsYXNzRGVjbGFyYXRpb24oc3ltYm9sLnZhbHVlRGVjbGFyYXRpb24pKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgcmVzdWx0LnB1c2goe2lkZW50aWZpZXI6IGJhc2VUeXBlc1swXSwgbm9kZTogc3ltYm9sLnZhbHVlRGVjbGFyYXRpb259KTtcbiAgICBjdXJyZW50Q2xhc3MgPSBzeW1ib2wudmFsdWVEZWNsYXJhdGlvbjtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuIl19                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               