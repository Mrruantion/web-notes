#配置信息操作

    http://www.cnblogs.com/sshoub/p/4321640.html


#mysql shell

        use mysql //切换数据库
        
        grant all privileges on *.* to '用户名'@'host' identified by 'password' with grant option; //(%表示是所有的外部机器，如果指定某一台机，就将%改为相应的机器名；‘root’则是指要使用的用户名，里面的password需要自己修改成root的密码)

        flush privileges //刷新

#mysql shell two

        -- show variables like 'character_set_client';#查询字符集
        -- show databases;#列出所有的服务器上的数据库alter
        -- create database if not exists test1;#创建一个数据库
        -- drop database test1;#删除数据库
        -- show tables from test;#显示一个数据库中的表
        -- use docCloud;

        -- create table document2(
        --     Id int primary key auto_increment,#部门编号 整形 主键 自增长
        --     Name varchar(18),#部门名称
        --     description varchar(100)#描述
        -- );

        -- show tables from docCloud;

        -- desc document2;#查看表信息
        -- show create table document2; #查看创建表语句

        #更改表名
        -- rename table document2 to document3
        -- alter table document3 rename document2

        -- alter table document2 add tel varchar(20) #增加列

        -- alter table document2 drop tel; #删除列
        -- alter table document2  drop column tel

        -- alter table document2 add sex varchar(2)
        -- desc document2
        -- alter table document2 modify sex varchar(8) #修改列

        https://www.cnblogs.com/widows/p/7137184.html




