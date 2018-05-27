aliyuanchen
193696
5..L..1..4.
b'an

guangge
g......

mysql 
mysql -uroot -p
123
ruan
123456

vftpd
testacc
testacc


shell
sudo vi /etc/ssh/sshd_config 打开ssh配置文件
sudo /etc/init.d/sshd restart //重启ssh服务

sudo vi /etc/sysconfig/iptables 打开防火墙配置文件

查询防火墙状态: service iptables status
停止防火墙 service iptables stop


#本地连接云服务器

        grant all on *.* to 'yuancheng'@'%' identified by '123456';
        flush privileges;



#nginx 端口转发
##先在控制台中生成个二级域名
        #Demo2负载均衡池
        upstream <name> {
            server ip:port;
        }
        #Demo2端口转发
        server {
            listern   port;
            server_name   url_name(book.mrruantion.com)
            location / {
                proxy_path  http://name
            }
            
        }