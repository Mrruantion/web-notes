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
    object.assign(headers, options.headers);

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