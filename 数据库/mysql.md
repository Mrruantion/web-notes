#配置信息操作

    http://www.cnblogs.com/sshoub/p/4321640.html


#mysql shell

        use mysql //切换数据库
        
        grant all privileges on *.* to '用户名'@'host' identified by 'password' with grant option; //(%表示是所有的外部机器，如果指定某一台机，就将%改为相应的机器名；‘root’则是指要使用的用户名，里面的password需要自己修改成root的密码)

        flush privileges //刷新
