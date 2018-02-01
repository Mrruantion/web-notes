#使用Object.prototype上的原生toString()方法判断数据类型  Object.prototype.toString.call(value)

        Object.prototype.toString.call(null)  //"[object Null]"
        Object.prototype.toString.call(undefined) //"[0bject Undefined]"
        Object.prototype.toString.toString.call('abc') //"[object String]"
        Object.prototype.toString.toString.call(1234) //"[object Number]"
        Object.prototype.toString.toString.call(true) //"[object Boolean]"

#判断原生使用类型

        function fn() {}
        Object.prototype.toString.call(fn) //"[object Function]"

        var date = new Date()
        Object.prototype.toString.call(date) //"[object Date]"

        var arr = new Array()
        Object.prototype.toString.call(arr) //"[object Array]"

        var reg = new RegExp()
        Object.prototype.toString.call(reg) //"[object RegExp]"

        function Persion(name,age) {
            this.name = name;
            this.age = age;
        }
        var persion = new Persion("Rose",18)
        Object.prototype.toString.call(persion) //"[object Object]"
        //判断person是Person类的实例
        persion instanceof Persion //true

#判断原生JSON对象

        var isNativeJSON = window.JSON && Object.prototype.toString.call(JSON)
        console.log(isNativeJSON);//输出结果为"[object JSON]"说明JSON是原生的，否则不是；