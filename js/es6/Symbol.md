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

