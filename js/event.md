# 自定义事件的定义和触发

        var $ = function (el) {
            return new _$(el);
        }

        var _$ = function (el) {
            this.el = (el && el.nodeType == 1) ? el : document;
        }

        _$.prototype = {
            constructor: _$,
            addEvent: function (type, fn, capture) {
                var el = this.el;
                if (window.addEventListener) {
                    el.addEventListener(type, fn, capture);
                    var ev = document.createEvent('HTMLEvents');
                    ev.initEvent(type, capture || false, false);
                    if (!el["ev" + type]) {
                        // 在元素上存储创建的事件，方便自定义触发
                        el["ev" + type] = ev
                    }
                } else if (window.attachEvent) {
                    el.attachEvent('on' + type, fn);
                    if (isNaN(el["cu" + type])) {
                        // 自定义属性，触发事件用
                        el["cu" + type] = 0;
                    }

                    var fnEv = function (event) {
                        if (event.prototypeName == "cu" + type) {
                            fn.call(el)
                        }
                    }

                    el.attachEvent("onpropertychange", fnEv);
                    // 在元素上存储绑定的propertychange事件，方便删除
                    if (!el["ev" + type]) {
                        el["ev" + type] = [fnEv];
                    } else {
                        el["ev" + type].push(fnEv);
                    }
                }

                return this;
            },

            fireEvent: function (type) {
                var el = this.el;
                if (typeof type === "string") {
                    if (document.dispatchEvent) {
                        if (el["ev" + type]) {
                            el.dispatchEvent(el["ev" + type]);
                        }
                    } else if (document.attachEvent) {
                        // 改变对应自定义属性，触发自定义事件
                        el["cu" + type]++;
                    }
                }
                return this;
            },
            removeEvent: function (type, fn, capture) {
                var el = this.el;
                if (window.removeEventListener) {
                    delete el["ev" + type]
                    el.removeEventListener(type, fn, capture || false)
                } else if (document.attachEvent) {
                    el.detachEvent("on" + type, fn);
                    delete el["cu" + type]
                    var arrEv = el["ev" + type];
                    if (arrEv instanceof Array) {
                        for (var i = 0; i < arrEv.length; i++) {
                            // 删除该方法名下所有绑定的propertychange事件
                            el.detachEvent("onpropertypechange", arrEv[i]);
                        }
                    }
                }
            }
        }