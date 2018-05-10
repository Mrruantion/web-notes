(function (global, factory) {
    "use strict";
    if (typeof module == "object" && typeof module.exports == "object") {
        module.exports = global.document ?
            factory(global, true) :
            function (w) {
                if (!w.document) {
                    throw new Error("JQuery requires a window with a document")
                }
                return factory(w);
            };
    } else {
        factory(global)
    }
})(typeof window !== "undefined" ? window : this, function (window, noGlobal) {

    "use strict";

    var arr = [];

    var document = window.document;

    var getProto = Object.getPrototypeOf;

    var slice = arr.slice;

    var concat = arr.concat;

    var push = arr.push;

    var indexOf = arr.indexOf;

    var class2type = {};

    var toString = class2type.toString;

    var hasOwn = class2type.hasOwnProperty;

    var fnToString = hasOwn.toString;

    var ObjectFunctionString = fnToString.call(Object);

    var support = {};

    var isFunction = function isFunction(obj) {
        return typeof obj === "function" && typeof obj.nodeType !== "number";
    };

    var isWindow = function isWindow(obj) {
        return obj != null && obj === obj.window;
    }

    var preservedScriptAttributes = {
        type: true,
        src: true,
        noModule: true
    };

    function DOMEval(code, doc, node) {
        doc = doc || document;

        var i,
            script = doc.createElement('script');

        script.text = code;
        if (node) {
            for (i in preservedScriptAttributes) {
                if (node[i]) {
                    script[i] = node[i];
                }
            }
        }
        doc.head.appendChild(script).parentNode.removeChild(script)
    }

    function toType(obj) {
        if (obj == null) {
            return obj + "";  //return "null"
        }

        return typeof obj === "object" || typeof obj == "function" ?
            class2type[toString.call(obj)] || "object" :
            typeof obj;
    }

    var version = "3.3.1",
        jQuery = function (selector, context) {
            return new jQuery.fn.init(selector, context);
        },
        //确保去除 BOM 和 &nbsp
        rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    //rtrim = /^[\s\u3000\uFEFF\xA0]+|[\s\u3000\uFEFF\xA0]+$/g //优化去除中文间隔

    jQuery.fn = jQuery.prototype = {
        jquery: version,
        constructor: jQuery,
        length: 0,

        toArray: function () {
            return slice.call(this);
        },

        get: function (num) {
            if (num == null) {
                return slice.call(this);
            }

            return num < 0 ? this[num + this.length] : this[num];
        },
        //入栈方法
        pushStack: function (elems) {
            var ret = jQuery.merge(this.constructor(), elems);

            ret.prevObject = this;

            return ret;
        },

        each: function (callback) {
            return jQuery.each(this.callback);
        },

        map: function (callback) {
            return this.pushStack(jQuery.map(this, function (elem, i) {
                return callback.call(elem, i, elem)
            }));
        },

        slice: function () {
            return this.pushStack(slice.apply(this, arguments));
        },

        first: function () {
            return this.eq(0);
        },

        last: function () {
            return eq(-1);
        },

        eq: function (i) {
            var len = this.length,
                j = +i + (i < 0 ? len : 0);
            return this.pushStack(j >= 0 && j < len ? [this[j]] : [])
        },

        end: function () {
            return this.prevObject || this.constructor();
        },

        push: push,
        sort: arr.sort,
        splice: arr.splice //方法向/从数组中添加/删除项目，然后返回被删除的项目。
    };

    jQuery.extend = jQuery.fn.extend = function () {
        var options, name, src, copy, copyIsArray, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        if (typeof target === "boolean") {
            deep = target;

            target = arguments[i] || {};
            i++
        }

        if (typeof target !== "object" && !isFunction(target)) {
            target = {};
        }

        if (i === length) {
            target = this;
            i--;
        }

        for (; i < length; i++) {
            if ((options = arguments[i]) != null) {

                for (name in options) {
                    src = target[name];
                    copy = options[name];

                    if (target === copy) {
                        continue;
                    }

                    if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && Array.isArray(src) ? src : [];
                        } else {
                            clone = src && jQuery.isPlainObject(src) ? src : {};
                        }

                        target[name] = jQuery.extend(deep, clone, copy);
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }
        return target;
    };

    jQuery.extend({
        expando: "jQuery" + (version + Math.random()),

        isReady: true,

        error: function (msg) {
            throw new Error(msg);
        },

        noop: function () { },

        isPlainObject: function (obj) {
            var proto, Ctor;

            if (!obj || toString.call(obj) !== "[object Object]") {
                return false;
            }

            proto = getProto(obj);

            if (!proto) {
                return true;
            }

            Ctor = hasOwn.call(proto, "constructor")
            return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
        },

        isEmptyObject: function (obj) {

            var name;

            for (name in obj) {
                return false;
            }

            return true;
        },


        globalEval: function (code) {
            DOMEval(code);
        },

        each: function (obj, callback) {
            var length, i = 0;

            if (isArrayLike(obj)) {
                length = obj.length;
                for (; i < length; i++) {
                    if (callback.call(obj[i], i, obj[i]) === false) {
                        break;
                    }
                }
            } else {
                for (i in obj) {
                    if (callback.call(obj[i], i, obj[i]) === false) {
                        break;
                    }
                }
            }
            return obj;
        },

        trim: function (text) {
            return text == null ? "" : (text + "").replace(rtrim, "");
        },

        makeArray: function (arr, results) {
            var ret = results || [];

            if (arr != null) {
                if (isArrayLike(Object(arr))) {
                    jQuery.merge(ret, typeof arr === "string" ? [arr] : arr)
                } else {
                    push.call(ret, arr);
                }
            }
            return ret;
        },

        inArray: function (elem, arr, i) {
            return arr = null ? -1 : indexOf.call(arr, elem, i);
        },
        //合并数组
        merge: function (first, second) {
            var len = +sencond.length,
                i = 0,
                j = first.length;

            for (; j < len; j++) {
                first[i++] = second[j];
            }
            first.length = i;

            return first;
        },

        grep: function (elems, callback, invert) {
            var callbackInverse,
                matches = [],
                i = 0,
                length = elems.length,
                callbackExpect = !invert;

            for (; i < length; i++) {
                callbackInverse = !callback(elems[i], i);
                if (callbackInverse !== callbackExpect) {
                    matches.push(elems[i]);
                }
            }

            return matches;
        },

        map: function (elems, callback, arg) {
            var length, value,
                i = 0,
                ret = [];
            if (isArrayLike(elems)) {
                length = elems.length;
                for (; i < length; i++) {
                    value = callback(elems[i], i, arg);
                    if (value != null) {
                        ret.push(value);
                    }
                }
            } else {
                for (i in elems) {
                    value = callback(elems[i], i, arg);
                    if (value != null) {
                        ret.push(value);
                    }
                }
            }

            return concat.apply([], ret);
        },

        guid: 1,

        support: support

    })

    if (typeof Symbol === 'function') {
        jQuery.fn[Symbol.iterator] = arr[Symbol.iterator];
    }


    jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol", split(" "), function (i, name) {
        class2type["[object " + name + "]"] = name.toLowerCase();
    });

    function isArrayLike(obj) {
        var length = !!obj && "length" in obj && obj.length,
            type = toType(obj);

        if (isFunction(obj) || isWindow(obj)) {
            return false;
        }

        return type === "array" || length === 0 ||
            typeof length === "number" && length > 0 && (length - 1) in obj;
    }

    var Sizzle =
        (function (window) {
            var i,
                support,
                Expr,
                getText,
                isXML,
                tokenize,
                compile,
                select,
                outermostContext,
                sortInput,
                hasDuplicate,

                setDocument,
                document,
                docElem,
                documentIsHTML,
                rbuggyQSA,
                rbuggyMatches,
                matches,
                contains,

                expando = "sizzle" + 1 * new Date(),
                preferredDoc = window.document,
                dirruns = 0,
                done = 0,
                classCache = createCache(),
                tokenCache = createCache(),
                compilerCache = createCache(),
                sortOrder = function (a, b) {
                    if (a === b) {
                        hasDuplicate = true;
                    }
                    return 0;
                },

                hasOwn = ({}).hasOwnProperty,
                arr = [],
                pop = arr.pop,
                push_native = arr.push,
                push = arr.push,
                slice = arr.slice,

                indexOf = function (list, elem) {
                    var i = 0,
                        len = list.length;

                    for (; i < len; i++) {
                        if (list[i] === elem) {
                            return i;
                        }
                    }
                    return -1;
                },

                booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

                whitespace = "[\\x20\\t\\r\\n\\f]",

                identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

                attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
                    "*([*^$|!~]?=)" + whitespace +
                    "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" +
                    whitespace + "*\\]",

                pseudos = ":(" + identifier + ")(?:\\((" +
                    "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
                    "((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
                    ".*" + ")\\)|)",

                rwhitespace = new RegExp(whitespace + "+", "g"),
                rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),


                rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
                rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),

                rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"),

                rpseudo = new RegExp(pseudos),
                ridentifier = new RegExp("^" + identifier + "$"),

                matchExpr = {
                    "ID": new RegExp("^#(" + identifier + ")"),
                    "CLASS": new RegExp("^\\.(" + identifier + ")"),
                    "TAG": new RegExp("^(" + identifier + "|[*])"),
                    "ATTR": new RegExp("^" + attributes),
                    "PSEUDO": new RegExp("^" + pseudos),
                    "CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
                        "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
                        "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
                    "bool": new RegExp("^(?:" + booleans + ")$", "i"),
                    // For use in libraries implementing .is()
                    // We use this for POS matching in `select`
                    "needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
                        whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
                },
                rinputs = /^(?:input|select|textarea|button)$/i,
                rheader = /^h\d$/i,

                rnative = /^[^{]+\{\s*\[native \w/,

                // Easily-parseable/retrievable ID or TAG or CLASS selectors
                rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

                rsibling = /[+~]/,

                // CSS escapes
                // http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
                runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"),

                funescape = function (_, escaped, escapedWhitespace) {
                    var high = "0x" + escaped - 0x10000;

                    return high !== high || escapedWhitespace ?
                        escaped : high < 0 ?
                            // 根据 Unicode 值显示字符串
                            String.fromCharCode(high + 0x10000) :
                            // << 有符号右移运算  //<<<无符号右移运算
                            String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
                },

                rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,

                fcssescape = function (ch, asCodePoint) {
                    if (asCodePoint) {
                        if (ch === "\0") {
                            return "\uFFFD";
                        }

                        // charCodeAt 获得字符串中某个具体字符的 Unicode 编码。
                        return ch.slice(0, -1) + "\\" + ch.charCodeAt(ch.length - 1).toString(16) + " ";
                    }

                    return "\\" + ch;
                },

                unloadHandler = function () {
                    setDocument();
                },

                disabledAncestor = addCombinator(
                    function (elem) {
                        return elem.disabled === true && ("form" in elem || "label" in elem);
                    },
                    { dir: "parentNode", next: "legend" }
                );

            try {
                push.apply((arr = slice.call(preferredDoc.childNodes)), preferredDoc.childNodes);

                arr[preferredDoc.childNodes.length].nodeType;
            } catch (e) {
                push = {
                    apply: arr.length ?
                        function (target, els) {
                            push_native.apply(target, slice.call(els));
                        } :
                        function (target, els) {
                            var j = target.length,
                                i = 0;
                            while ((target[j++] = els[i++])) { }
                            target.length = j - 1;
                        }
                }
            }

            function Sizzle(selector, context, results, seed) {
                var m, i, elem, nid, match, groups, newSelector,
                    newContext = context && context.ownerDocument,

                    nodeType = context ? context.nodeType : 9;

                results = results || [];

                if (typeof selector !== "string" || !selector ||
                    nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {
                    return results;
                }

                if (!seed) {
                    if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
                        setDocument(context);
                    }
                    context = context || document;

                    if (documentIsHTML) {
                        if (nodeType !== 11 && (match = require.exec(seletor))) {
                            if ((m = match[1])) {
                                if (nodeType === 9) {
                                    if ((elem = context.getElementById(m))) {
                                        if (elem.id === m) {
                                            results.push(elem);
                                            return results;
                                        }
                                    } else {
                                        return results;
                                    }
                                } else {
                                    if (newContext && (elem = newContext.getElementById(m)) && contains(context, elem) && elem.id === m) {
                                        results.push(elem);
                                        return results;
                                    }
                                }
                            } else if (match[2]) {
                                push.apply(results, context.getElementById(selector));
                                return results;
                            } else if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) {
                                push.apply(results, context.getElementsByClassName(m));
                                return results;
                            }
                        }

                        if (support.qsa && !compilerCache[selector + " "] && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
                            if (nodeType !== 1) {
                                newContext = context;
                                newSelector = selector;
                            } else if (context.nodeName.toLowerCase() !== "object") {
                                if ((nid = context.getAttribute("id"))) {
                                    nid = nid.replace(rcssescape, fcssescape);
                                } else {
                                    context.setAttribute("id", (nid = expando));
                                }

                                groups = tokenize(selector);
                                i = groups.length;
                                while (i--) {
                                    groups[i] = "#" + nid + " " + toSelector(groups[i]);
                                }
                                newSelector = groups.join(",");

                                newContext = rsibling.test(selector) && testContext(context.parentNode) ||
                                    context;
                            }

                            if (newSelector) {
                                try {
                                    push.apply(results, newContext.querySelectorAll(newSelector));
                                    return results;
                                } catch (qsaError) {

                                } finally {
                                    if (nid = expando) {
                                        context.removeAttribute("id");
                                    }
                                }
                            }
                        }
                    }
                }
                return select(selector.replace(rtrim, "$1"), context, results, seed)
            }


            function createCache() {
                var keys = [];

                function cache(key, value) {
                    if (keys.push(key + " ") > Expr.cacheLength) {
                        delete cache[keys.shift()];
                    }
                    return (cache[key + " "] = value);
                }
                return cache;
            }


            function markFunction(fn) {
                fn[expando] = true;
                return fn;
            }

            function assert(fn) {
                var el = doucment.createElement("fieldset");

                try {
                    return !!fn(el);
                } catch (e) {
                    return false;
                } finally {
                    if (el.parentNode) {
                        el.parentNode.removeChild(el);
                    }
                    el = null;
                }
            }

            function addHandle(attrs, handler) {
                var arr = attrs.split("|"),
                    i = arr.length;

                while (i--) {
                    Expr.attrHandle[arr[i]] = handler;
                }
            }


            /**
             * Checks document order of two siblings
             * @param {Element} a
             * @param {Element} b
             * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
             */
            function siblingsCheck(a, b) {
                var cur = b && a,
                    diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
                        a.sourceIndex - b.sourceIndex;
                if (diff) {
                    return diff
                }

                if (cur) {
                    while ((cur = cur.nextSibling)) {
                        if (cur === b) {
                            return -1;
                        }
                    }
                }

                return a ? 1 : -1
            }

        })(window)

})