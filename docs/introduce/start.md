# Hello DN11

DN11全称为 “11号去中心化网络”（Decentralized Network 11），~~围绕杭电11楼建设~~。也接纳来自其他宿舍楼其他院校的同志。

目前主要采用[WireGuard](https://www.wireguard.com/)接入，后续应该会开放IKEv2等协议的接入，方便其他同学接入。

按照愿景，每个自治域（默认以寝室为单位）都会分配到172.16.x.0/24这样的一个网段，因此，DN11目前设计上最多接纳255个主要节点接入。

关于接入DN11，请参照wiki和群友博客操作

<!-- 接入后可以[加群](https://jq.qq.com/?_wv=1027&k=wlfajEoS)来吹水 -->

[DN11信息表](https://github.com/dn-11/metadata/blob/main/README.md)

我应该在 DN11 做些什么？

```mermaid
mindmap
    root((DN11))
        链路质量
            隧道
                WireGuard
                OpenVPN
                L2TP
                隧道套娃
                隧道开发
            BFD
            物理层与硬件
            物理 IX
        内部建设
            OSPF
            IBGP
                RR
                    多级RR
                BGP联邦
        网络安全
            路由安全
                ROA
                    RPKI
                AS-SET
                BGPSec
            攻击面管理
            DN11 CA
                ACME
        内容建设
            DNS
                DN11 DNS
                权威 DNS
                rDNS
            媒体库
            BT/PT
            游戏服务器
        外部路由
            BGP
                Large Community
                Auto Peer
                IX

