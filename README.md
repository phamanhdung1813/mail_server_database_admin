# SECURE POSTFIX AND DOVECOT ON MAIL SERVER, MARIADB, AND DATABASE
### IN THIS PROJECT, WE WORK ON AZURE CLOUD SERVICE 
### WE CONFIGURE THE MAIL SERVER, AND DATABASE SERVER ON LINUX MACHINE (az-lsXX)
### ESTABLISHING THE IPTABLES TO ALLOW CONNECTION FROM WINDOW SERVER MACHINE AND MANAGE MAIL FROM IPTABLES RULES

![Diagram](https://user-images.githubusercontent.com/71564211/139774868-07aa1bde-0e80-42b9-beaa-2be8124c09db.JPG)

## FIRST VM INSTALLATION (SEE MY DOCUMENT FOR DETAILS EXPLANATION) 

![ssh](https://user-images.githubusercontent.com/71564211/139775701-c0a8a3da-65ce-4310-ba9d-bd7a0b67a776.JPG)

![dns](https://user-images.githubusercontent.com/71564211/139775715-8f800752-0bbd-4bee-8b18-f2fde321603f.JPG)


## MAIL SERVER INSTALLATION

### WINDOW DNS FOR MAIL MACHINE
![mail](https://user-images.githubusercontent.com/71564211/139775773-99ce51f2-aa76-4069-ad73-21622620d955.JPG)

1. INSTALL SERVICE
* yum install postfix
* systemctl enable postfix
* systemctl start postfix
* yum install dovecot
* systemctl enable dovecot
* systemctl start dovecot

2. CONFIGURE POSTFIX AND DOVECOT
### POSTFIX
* vi /etc/postfix/main.cf
* mydomain = mail.ndd43021.com
* myorigin = $mydomain
* inet_interfaces = all
* mydestination = $mydomain, $myhostname, localhost.$mydomain, localhost
* mailbox_command = /usr/libexec/dovecot/dovecot-lda -f "$SENDER" -a "$RECIPIENT" systemctl restart postfix

![mail_conf](https://user-images.githubusercontent.com/71564211/139776019-a55d8a99-ac47-47f4-a0bf-04ded74e099b.PNG)


### DOVECOT 
* vi /etc/dovecot/dovecot.conf
* protocols = imap
* vi /etc/dovecot/conf.d/10-ssl.conf
* ssl = yes
* vi /etc/dovecot/conf.d/10-auth.conf
* disable_plaintext_auth = no
* vi /etc/dovecot/conf.d/10-mail.conf
* mail_location = maildir:~/Maildir

### NETWORK MANAGER
* sudo vim /etc/sysconfig/network-scripts/ifcfg-eth0
* sudo systemctl restart network.service

![network](https://user-images.githubusercontent.com/71564211/139776108-9d3b7c6a-330e-40a6-a691-533b6bc77aac.JPG)

### IPTABLES-SERVICES

#### MAIL SERVICE
* sudo iptables -A INPUT -p tcp --dport 25 -j ACCEPT
* sudo iptables -A INPUT -p tcp --dport 143 -j ACCEPT
* sudo service iptables save

![iptables](https://user-images.githubusercontent.com/71564211/139776149-ceb019f2-055e-4fc7-acb7-e11010ad3a77.JPG)

![resolveconfig](https://user-images.githubusercontent.com/71564211/139776189-825462f0-dd5a-4134-9f13-580636d6736d.JPG)

#### MYSQL SERVICE
sudo iptables -A INPUT -p tcp --dport 3306 -j ACCEPT
sudo service iptables save

![3306](https://user-images.githubusercontent.com/71564211/139776275-f8fade74-2bbd-4f3a-965f-33983aecbbaf.JPG)


4. SET-UP 2 MAILS ACCOUNT
* useradd -m username
* passwd username

![3](https://user-images.githubusercontent.com/71564211/139775909-9a7c45c3-ddb5-449a-9f18-0cfffb7cea57.JPG)


## MARIADB SERVER
1. INSTALL SERVICE
* yum install mariadb-server
* systemctl enable mariadb
* systemctl start mariadb

2. CONFIGURING MARIADB
* mysql_secure_installation
* Enter current password for root (enter for none): hit Enter button
* Set root password? [Y/n] Y
* New password: type password root for mariadb
* Re-enter new password: type password root again for mariadb
* Remove anonymous users? [Y/n] Y
* Disallow root login remotely? [Y/n] Y
* Remove test database and access to it? [Y/n] Y
* Reload privilege tables now? [Y/n] Y

3. CREATE DATABASE ACCOUNT AND GRANT PERMISSION
* mysql -u root -p
* GRANT SELECT ON namedb.* TO 'adpham1'@'%' identified by 'password';
* FLUSH PRIVILEGES;

# MAIL CLIENT CONFIGURATION
### DOWNLOAD THUNDERBIRD AND SQLHEIDI TO TEST POSTFIX AND DOVECOT CONFIG
![5](https://user-images.githubusercontent.com/71564211/139775445-2edeef98-121f-476e-8905-da5352e6f6be.JPG)

![6](https://user-images.githubusercontent.com/71564211/139775451-e94aa58c-0258-4b1b-bace-25f595639200.JPG)

![m1](https://user-images.githubusercontent.com/71564211/139775529-cf2f1de6-c6ad-4d9d-9fa2-fca9d1ce5761.JPG)

![m2](https://user-images.githubusercontent.com/71564211/139775539-1db5ee52-6729-4812-b46d-02df87068960.JPG)

![hedi](https://user-images.githubusercontent.com/71564211/139775607-a6b99055-2f34-40c1-a586-e08a9e394483.JPG)

![hediI](https://user-images.githubusercontent.com/71564211/139775608-7e07fc90-96c7-403b-b975-5936fcfe407f.JPG)



