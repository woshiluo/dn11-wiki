# CA

在互联网中，我们常常会通过 TLS 来创建并使用加密 Socket 访问互联网上的资源，这能够有效阻止任何中间人看到两端通信的消息。而在 DN11 的网络架构中，流量可能途径每一个个人，中间人攻击的风险也已依然存在。

CA 全称为 Certificate Authority，是一个可信任的实体，它通过颁发证书的方式来为网络上所有的用户校验服务器的身份，DN11 也有自己的 CA。  

## 根证书

DN11 目前有一个 CA —— DN11 CA，DN11 CA 的根证书目前由 Potat0 离线保存，同时，根证书在签发的时候就已经限制了仅能在 `.dn11` TLD(顶级域名) 下使用，不会影响到 dn11 外的流量，还请放心使用。

如果您已经接入了 dn11 dns，可以通过 https://acme.dn11/roots.pem 获取 DN11 根证书，请临时允许不安全的 CA 证书。

### Linux 安装

```sh
curl -k https://acme.dn11/roots.pem -O roots.pem
chmod 644 roots.pem
sudo mv roots.pem /usr/local/share/ca-certificates/DN11_CA.crt
sudo chown root /usr/local/share/ca-certificates/DN11_CA.crt
sudo update-ca-certificates
```

看到控制台输出 `1 added` 就说明证书被添加到系统了。

### Windows 安装

点击链接下载，下载后把后缀名改成 crt 双击安装，如果 windows 提示您选择打开方式，请选择加密外壳扩展。

![windowsinstallroot](/img/ca/windowsinstallrootca.png)

安装的时候不要让 windows 自动选择证书存储位置，大概率选的是错的，请手动选择**受信任的根证书颁发机构**

## ACME 签发证书

:::tip
由于下述签发工具都并非为 DN11 开发，请尽量在 DN11 DNS + DN11 根证书的环境下签发以尽量避免意料之外的问题
:::

### certbot

#### dns-01

以手动 DNS 验证为例

```bash
certbot certonly -d <你的域名> --manual --server https://acme.dn11/acme/acme/directory
```

和一般的 certbot 签发命令没有大的区别，添加 `--server` 参数即可。

### acme.sh

#### http-01

以 nginx 为例

```bash
./acme.sh --issue -d <你的域名> --server https://acme.dn11/acme/acme/directory --nginx
```

http-01 通过向域名指向的服务器发起一个 HTTP 请求来验证你对这个服务器的所有权。在这个过程中 acme.sh 会修改你的 nginx 配置文件, 最终会恢复现场。

#### dns-01

acme.sh 会检查您用于 DNS 校验的 TXT 记录是否生效，但是它不支持指定 DNS 服务器，只支持在少数几个内置的 DNS 服务器中进行选择，这会导致检查 TXT 解析是否生效这一步卡住。幸运的是他有超时控制，超时后会继续执行而不是直接退出，所以只会卡 5 分钟，如果要改变这个行为只能魔改 acme.sh 了。

当然等五分钟也是没有问题的，下面以 PowerDNS-Admin 为例

```bash
export PDNS_Url="<PowerDNS-Admin地址>"
export PDNS_ServerId="localhost"
export PDNS_Token="<你的token>"
export PDNS_Ttl=60
./acme.sh --issue --dns dns_pdns -d <你的域名> --server https://acme.dn11/acme/acme/directory
```

- PDNS_ServerId 默认为 localhost，如果有修改也要跟着修改
- PDNS_Token 可以在管理面板的 API Keys 里申请，申请时 Role 选择 User，Domain Access Control 选择对于的域

等待五六分钟即可，所有的环境变量都会被 acme.sh 保存为配置文件，下次无需重新写环境变量

### caddy

如果您有 DN11 内的建站需求，我们推荐您使用 Caddy。

```nginx
{
        acme_ca https://acme.dn11/acme/acme/directory
        acme_ca_root /etc/caddy/roots.pem
}
```

请在 Caddyfile 中添加以上内容，并将 acme_ca_root 改为 DN11 根证书路径 caddy 会自动签发证书。

您也可以把以上配置放在某个站点块中来为某个特定站点添加 DN11 CA 支持。

## 搭建 CA 服务

这个章节阐述了目前 DN11 CA ACME 服务的搭建方法，一般不需要二次搭建。

### 1. 初始化 step-ca

step-ca 提供了很多种安装方式，裸机，docker，k8s等等。由于计划部署 step-ca 的机器上并没有集群环境，裸机又不方便 remake，通过 docker 镜像安装便成为了最佳选择。

<https://hub.docker.com/r/smallstep/step-ca>

```bash
docker pull smallstep/step-ca
docker run -it --rm -v step:/home/step smallstep/step-ca step ca init --remote-management
```

上面的命令会拉取 step-ca 的镜像，使用`step ca init --remote-management`替换原有的启动命令启动容器同时创建一个名为 step 的卷挂载到 `/home/step`，还使用了`-it`参数进入交互式。

```shell
✔ What would you like to name your new PKI? (e.g. Smallstep): DN11
✔ What DNS names or IP addresses would you like to add to your new CA? (e.g. ca.smallstep.com[,1.1.1.1,etc.]): acme.dn11
✔ What address will your new CA listen at? (e.g. :443): :443
✔ What would you like to name the first provisioner for your new CA? (e.g. you@smallstep.com): <你的账户名>
✔ What do you want your password to be? [leave empty and we'll generate one]:
```

在交互式终端中，我们根据他的指引完成配置，其中：

- PKI name 无所谓。
- DNS names 填写我们预先解析过来的域名，后续将使用这个域名访问 ACME 服务
- 端口无所谓，后续使用 docker 映射到外部
- first provisioner name 的邮箱可以不存在，但是邮箱域必须在中间证书签发范围内，在本实验中可以使用`abc@acme.dn11`，下面以此为例。
- 密码留空让他自己生成

```shell
✔ Admin provisioner: abc@acme.dn11 (JWK)
✔ Super admin subject: step
```

完成上面的初始化后，终端会告诉你 Admin provisioner 的名称和超级管理的名称，后续我们将使用这两项和上面的 password 来管理 step-ca，务必牢记。

此外我们还需要手动把密码写入到容器里

挂载 step 卷并打开容器 shell `docker run -it --rm -v step:/home/step smallstep/step-ca sh`

将上面生成的密码写入到 `secrets/password`

### 2. 启动 step ca 并配置

可以初次启动step ca了，下面配置一下 admin 账户和证书。

```bash
docker run -d -p 172.16.255.2:443:443 -v step:/home/step smallstep/step-ca
```

启动容器，映射容器内的 443 端口到外部 `172.16.255.2:443`

启动后使用 `docker exec -it <容器ID> /bin/bash` 进入容器环境。

#### 切换 admin 账户到 DN11 域

由于我们手上的根证书只能签发给 dn11 域名，所以需要先把 super admin 的账户名改到 dn11 域，不然后续无法管理只能 remake

```bash
step ca admin add abc@acme.dn11 abc@acme.dn11 --super
```

依次输入 step 和你的密码添加一个超级用户

```bash
step ca admin remove step
```

依次输入你的 abc@acme.dn11 和你的密码来删除 step 账户

```bash
step ca admin list
```

你可以用这个命令检查 admin 的删改是否正确

#### 替换证书

可以使用 vi 把原有的 `certs/intermediate_ca.crt` `certs/root_ca.crt` `certs/root_ca.crt` `secrets/intermediate_ca_key` 替换为你的中间证书，根证书，中间证书签名秘钥

注意格式，全部都是 pem 纯文本格式，如果你的格式不对请使用 openssl 转换

`secrets/root_ca_key`已经没有用了，删除即可。

替换完证书后输入 exit 退出 shell。

```shell
docker stop <容器ID>
docker start <容器ID>
```

重启容器

### 3. step-ca 远程管理

我们现在的 step-ca 他位于 docker 内，那我们其实不好每次都 docker exec 进去管理，所以最好能在其他地方管理，至少是宿主机吧。

其实 step-ca 提供了这样的接口而且我们一开始部署的时候就打开了远程管理。按照 step-ca 的原版教程，我们可以使用`step ca bootstrap`命令创建远程配置文件，但是我并没有创建成功，提示根证书下载失败，这里提供一个手动的安装方法。

```bash
mkdir -p .step/certs
mkdir -p .step/config
docker cp <容器ID>:/home/step/config/defaults.json .step/config/defaults.json
docker cp <容器ID>:/home/step/certs/root_ca.crt .step/certs/root_ca.crt
```

先把配置从 docker 里拷贝出来，然后再修改一下`defaults.json`文件。`ca-config`字段可以删除了，root 字段的内容改为刚刚拷贝出来的`root_ca.crt`的绝对路径。

可以通过列出 provisioner 的方式`step ca provisioner list`检查一下配置文件，列 provisioner 无需鉴权。

### 4. ACME 服务配置

下面在 step-ca 上配置 ACME 服务

```bash
step ca provisioner add acme --type ACME
step ca provisioner update acme \
   --x509-min-dur=20m \
   --x509-max-dur=8760h \
   --x509-default-dur=2160h
```

上面的两个命令首先添加了一个名为 acme 类型为 ACME 的 provisioner，然后修改了证书的默认有效期最长有效期和最短有效期

step-ca 默认的默认有效期为一天，如果正式使用 step-ca 签发的证书那最好换一个比较长的时间。

上面的命令默认签发为30天，最长签发为365天，不要签发超过一年的证书，APPLE 公司在新版本的系统中拒绝了签发有效期超过一年的证书，这可能会导致你的证书在 APPLE 的设备上无法使用。

## 参考资料

- [ACME Basics](https://smallstep.com/docs/step-ca/acme-basics)
- [smallstep/step-ca](https://hub.docker.com/r/smallstep/step-ca)
- [Configuring step-ca Provisioners](https://smallstep.com/docs/step-ca/provisioners)
- [acme.sh](https://github.com/acmesh-official/acme.sh/wiki/%E8%AF%B4%E6%98%8E)