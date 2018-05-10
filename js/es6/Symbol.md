# Symbol 新的原始数据类型

## 凡是属性名输入Symbol类型，就都是独一无二的。

        let s = Symbol(); //不能用new,Symbole生成的是原始类型
        typeof s  //Symbol

### 在Symbol里面加参数可以区分变量

        var s = Symbol('abc') //Symbol('abc')
        var s2 = Symbol('abc') //Symbol('abc')

        s == s2 //false 独一无二

#### 在Symbol的参数是一个对象，会调用toString方法将其转化为字符串

        const obj = {
            toString() {
                return 'abc'
            }
        }
        const sy = Symbol(obj)
        sy //Symbol('abc')

## Symbol用到的方法和属性

        Object.defineProperty//将对象的属性名指定为一个 Symbol 值。
        Object.getOwnPropertySymbols//获取指定对象的所有 Symbol 属性名。
        Symbol.keyFor//返回一个已登记的 Symbol 类型值的key。

## 内置的Symbol值

        Symbol.hasInstance //当其他对象使用instanceof运算符，判断是否为该对象的实例
        Symbol.isConcatSpreadable //属性等于一个布尔值，表示该对象用于Array.prototype.concat()时，是否可以展开
        Symbol.species指向一个构造函数，创建衍生对象时使用该属性


