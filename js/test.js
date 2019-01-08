if (show) {
    // Reset the inline display of this element to learn if it is
    // being hidden by cascaded rules or not
    if (!values[index] && elem.style.display === "none") {
        elem.style.display = "";
    }
    // Set elements which have been overridden with display: none
    // in a stylesheet to whatever the default browser style is
    // for such an element
    if ((elem.style.display === "" && curCSS(elem, "display") === "none") || !jQuery.contains(elem.ownerDocument.documentElement, elem)) {
        values[index] = jQuery._data(elem, "olddisplay", defaultDisplay(elem.nodeName));
    }
} else {
    display = curCSS(elem, "display"); if (!values[index] && display !== "none") { jQuery._data(elem, "olddisplay", display); }
}

W.ajax = function (url, options) {
    var json = {
        dataType: "json",
        timeout: 10000,
        type: 'get',
        success: W.noop,
        error: W.noop,
    }

    var headers = {
        "X-Requested-With": "XMLHttpRequest",
        "Accept": "*/*",
        "Content-Type": "application/x-www-form-urlencoded"
    }

    json.url = url;
    Object.assign(json, options);
    Object.assign(headers, options.headers);

    json.type = json.type.toUpperCase();

    var data = "";
    if (json.data) {
        for (item in json.data) {
            data = "&" + item + "=" + json.data[item];
        }
        if (json.type == "GET") {
            if (json.url.indexOf('?') == -1) {
                json.url += "?" + data.slice(1);
            } else {
                json.url += data
            }
        }
    }

    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xml.responseType = json.dataType || 'json';

    if (json.timeout > 0) {
        xmlhttp.timeout = json.timeout;
        xmlhttp.ontimeout = function () {
            json.error(xmlhttp, 'timeout', json)
        }
    }

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            xmlhttp.onreadystatechange = W.noop;
            if ((xmlhttp.status >= 200 && xmlhttp.status < 300) || xmlhttp.status == 304 || xmlhttp.status == 0) {
                var result = xmlhttp.response || { "status_code": -1, "err_msg": "无返回信息" };
                json.success(result, xmlhttp, json);
            } else {
                json.error(xmlhttp, xmlhttp.status ? "error" : "abort", json);
            }
        }
    }

    xmlhttp.open(json.type, json.url, true);

    for (var name in json.headers) {
        xmlhttp.setRequestHeader(name, json.headers[name])
    }

    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(data);
    return xmlhttp;

}


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

const getJSON = function (url) {
    var promise = new Promise(function (resolve, reject) {
        const handler = function () {
            if (this.readyState !== 4) {
                return;
            }
            if (this.status == 200) {
                resolve(this.response)
            } else {
                reject(new Error(this.statusText));
            }
        };
        const client = new XMLHttpRequest();
        client.open("GET", url);
        client.onreadystatechange = handler;
        client.responseType = "json";
        client.setRequestHeader("Accept", "application/json");
        client.send();
    })
    console.log(promise);
    return promise;

}

getJSON('/posts.json').then(function (json) { console.log(json) }, function (err) { console.log(err) })


local_api._list('docProp', { id: '>27' }, '', 'did', 1, -1, 'dd', function (res) {
    res.data.forEach(ele => {
        var update_json = { did: ele.did };
        var query_json = { id: ele.fid };
        local_api._update('document', query_json, update_json, 'access_token', function (res) { console.log(res) })
    })
})


local_api._list('document', { id: '>967', type: 2 }, 'did,tree_path,id', '', 1, -1, '', function (res) {
    // res.data.forEach(ele => {
    var data = res.data;
    var i = 0;
    function start() {
        var update_json = { tree_path: ',0,1,185,265,' + data[i].id };
        var tree_path = ',0,1,185,265,' + data[i].id + ',';
        var query_json = { id: data[i].id };
        local_api._update('document', query_json, update_json, 'access_token', function (res) {
            local_api._list('document', { pid: data[i].id, type: 3 }, 'did,tree_path,id', '', 1, -1, '', function (res) {
                var _datas = res.data;
                if (res.data.length) {
                    res.data.forEach((ele, _index) => {
                        var update_json = { tree_path: tree_path + ele.id };
                        var query_json = { id: ele.id };
                        local_api._update('document', query_json, update_json, 'access_token', function (res) {
                            // callback()
                            if (_index == _datas.length - 1) {
                                if (data[i].id) {
                                    console.log(data[i].id)
                                    i++;
                                    start()
                                }
                            }

                        })
                    })
                } else {
                    if (data[i].id) {
                        console.log(data[i].id)
                        i++;
                        start()
                    }
                }

            })
        })
    }
    start()
})