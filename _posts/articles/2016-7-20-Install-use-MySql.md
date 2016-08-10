---
layout: article
category : articles
title :  Install and use MySQL on CentOS
tagline: ""
tags : [MySQl,CentOS]
image:
  feature:
  teaser: mysql.jpg
---


## Install 
 
For my VM is a new VM, so I don't need to check the previous version.<br/>
MYSQL version is 5.7.13 <br/>
CentOS version is 7 <br/>
### Install repository of MySQL  

There are some versions for Linux<a href="http://dev.mysql.com/downloads/repo/yum/">download</a> <br/>
I don't know choose which one. Just select the first one: Red Hat Enterprise Linux 7 / Oracle Linux 7 (Architecture Independent), RPM Package <br/>
Double click to install, it don't take much time. <br/>
By the way, after install repository, if you want to check the repository, it's at /etc/yum.repos.d 
<br/>

### Install MYSQL server  

http://dev.mysql.com/doc/refman/5.7/en/linux-installation-yum-repo.html
In the terminal, just enter: <br/>
 sudo yum install mysql-community-server
### Change root password  
  
 As it said, after installing the MySQL server, it will create a temporary password for account 'root'<br/>
 It is in /var/log/mysqld.log <br/>
 To get the password, with command: <br/>
  sudo grep 'temporary password' /var/log/mysqld.log
 <br/>
 log in MySQl with the password : <br/>
  mysql -uroot -p 
  <br/>
  Then set your new password: <br/>
  ALTER USER 'root'@'localhost' IDENTIFIED BY 'MyNewPass4!'; 
  <br/>
  Attention: Don't forget the ";" at the end.<br/>
  
 ### Create Database    
 
 I think the client of MySQL is needed,at the beginning, it doesn't matter. With command: <br/>
 CREATE DATABASE dbname;
<br/> dbname is the database's name you want.

For example, <br/>
I created a database named "demo" <br/>
CREATE DATABASE demo;
Then terminal output:Query OK, 1 row affected (0.03 sec) <br/>

If you want to create a table in the new database. <br/>
You need to use it:<br/>
use demo;
<br/>
Then create a table you want: <br/>
create TABLE job(id integer,name varchar(50),recipe varchar(50));

