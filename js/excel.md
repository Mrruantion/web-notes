#根据json生成excel用到js-xlsx

        function downloadExl(json, type) {
            var tmpDown; //导出的二进制对象
            var keyMap = []; //获取键
            for (var o in json[0]) {
                keyMap.push(o);
            }
            var tmpdata = []; //用来保存转换好的json
            json
                .map((v, i) =>
                    keyMap.map((k, j) =>
                        Object.assign(
                            {},
                            {
                                //运用ES6内容
                                v: v[k],
                                position:
                                    (j > 25 ? getCharCol(j) : String.fromCharCode(65 + j)) +
                                    (i + 1)
                            }
                        )
                    )
                )
                .reduce((prev, next) => prev.concat(next))
                .forEach(
                    (v, i) =>
                        (tmpdata[v.position] = {
                            v: v.v
                        })
                );

            var outputPos = Object.keys(tmpdata); //设置区域,比如表格从A1到D10
            var tmpWB = {
                SheetNames: ["mySheet"], //保存的表标题
                Sheets: {
                    mySheet: Object.assign(
                        {},
                        tmpdata, //内容
                        {
                            "!ref": outputPos[0] + ":" + outputPos[outputPos.length - 1] //设置填充区域
                        }
                    )
                }
            };
            tmpDown = new Blob(
                [
                    s2ab(
                        XLSX.write(
                            tmpWB,
                            {
                                bookType: type == undefined ? "xlsx" : type,
                                bookSST: false,
                                type: "binary"
                            } //这里的数据是用来定义导出的格式类型
                        )
                    )
                ],
                {
                    type: ""
                }
            ); //创建二进制对象写入转换好的字节流

            var a = document.createElement("a");
            a.id = "hf";

            var href = URL.createObjectURL(tmpDown); //创建对象超链接
            a.href = href; //绑定a标签
            a.download = "data.xlsx";
            document.body.appendChild(a);
            a.click(); //模拟点击实现下载
            setTimeout(function () {
                //延时释放
                URL.revokeObjectURL(tmpDown); //用URL.revokeObjectURL()来释放这个object URL
            }, 100);
        }


#生成带图的excel文件可以使用excel4node

        https://github.com/wangfengyuan/ExportExcel.git