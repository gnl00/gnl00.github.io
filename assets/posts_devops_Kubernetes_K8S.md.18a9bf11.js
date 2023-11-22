import{_ as e,o as r,c as l,Q as o}from"./chunks/framework.b41230ea.js";const k=JSON.parse('{"title":"Kubernetes","description":"","frontmatter":{"isPublish":false},"headers":[],"relativePath":"posts/devops/Kubernetes/K8S.md","filePath":"posts/devops/Kubernetes/K8S.md","lastUpdated":1700657743000}'),a={name:"posts/devops/Kubernetes/K8S.md"},t=o('<h1 id="kubernetes" tabindex="-1">Kubernetes <a class="header-anchor" href="#kubernetes" aria-label="Permalink to &quot;Kubernetes&quot;">​</a></h1><h2 id="虚拟化容器" tabindex="-1">虚拟化容器 <a class="header-anchor" href="#虚拟化容器" aria-label="Permalink to &quot;虚拟化容器&quot;">​</a></h2><h3 id="docker" tabindex="-1">Docker <a class="header-anchor" href="#docker" aria-label="Permalink to &quot;Docker&quot;">​</a></h3><p>Docker 与传统虚拟化方式的不同之处：Docker 容器内的应用进程直接运行于宿主的内核，容器内没有自己的内核，没有进行硬件虚拟；而传统虚拟机技术是虚拟出一套硬件后，在其上运行一个完整操作系统，在该系统上再运行所需应用进程。因此容器要比传统虚拟机更为轻便。</p><p>Docker 跟传统的虚拟化方式相比具有众多优势：</p><p>1、<strong>系统资源利用更高效</strong></p><p>因为容器不需要进行硬件虚拟以及运行完整操作系统等额外开销，所以 Docker 对系统资源的利用率更高。</p><p>2、<strong>启动时间更快速</strong></p><p>Docker 容器应用由于直接运行于宿主内核，无需启动完整的操作系统，因此可以做到秒级、甚至毫秒级的启动时间。极大地节省了开发、测试，部署的时间。</p><p>3、<strong>运行环境一致性</strong></p><p>开发过程中比较常见的问题就是环境一致性问题。因为开发环境、测试环境、生产环境不一致，导致有些 bug 并未在开发过程中被发现。而 Docker 的镜像提供了除内核外完整的运行时环境，确保了应用运行环境一致性，从而不会再出现 「这段代码在我机器上没问题啊」 这类问题。</p><p>4、<strong>持续交付与部署</strong></p><p>对开发和运维人员来说，最希望的就是一次创建或配置，可以在任意地方正常运行。使用 Docker 可以通过定制应用镜像来实现持续集成、持续交付、部署。开发人员可以通过 Dockerfile 来进行镜像构建，并结合持续集成(Continuous Integration)系统进行集成测试，而运维人员则可以直接在各种环境中快速部署该镜像，甚至结合持续部署(Continuous Delivery/Deployment) 系统进行自动部署。</p><p>而且使用 Dockerfile 使镜像构建透明化，不仅开发团队可以理解应用运行环境，也方便运维团队理解应用运行所需条件，帮助更好地在生产环境中部署该镜像。</p><p>5、<strong>迁移更轻松</strong></p><p>由于 Docker 确保了执行环境的一致性，使得应用的迁移更加容易。Docker 可以在很多平台上运行，无论是物理机、虚拟机、公有云、私有云，甚至是笔记本，其运行结果是一致的。因此用户可以很轻松地将在一个平台上运行的应用，迁移到另一个平台上，而不用担心运行环境变化导致应用无法正常运行的情况。</p><p>6、<strong>维护和扩展更轻松</strong></p><p>Docker 使用的分层存储以及镜像技术，使得应用重复部分的复用更为容易，也使得应用的维护更新和基于基础镜像进一步扩展镜像变得非常简单。此外，Docker 团队同各个开源项目团队一起维护了一大批高质量的官方镜像，既可以直接在生产环境使用，又可以作为基础进一步定制，大大降低了应用服务的镜像制作成本。</p><h3 id="kubertenes" tabindex="-1">Kubertenes <a class="header-anchor" href="#kubertenes" aria-label="Permalink to &quot;Kubertenes&quot;">​</a></h3><h4 id="kubernetes-是什么" tabindex="-1">Kubernetes 是什么 <a class="header-anchor" href="#kubernetes-是什么" aria-label="Permalink to &quot;Kubernetes 是什么&quot;">​</a></h4><p>Kubernetes 提供了很多的功能，它可以简化应用程序的工作流，加快开发速度。通常一个成功的应用编排系统需要有较强的自动化能力，这也是为什么 Kubernetes 被设计作为构建组件和工具的生态系统平台，以便更轻松地部署、扩展和管理应用程序。</p><p>用户可以使用 Label 以自己的方式组织管理资源，还可以使用 Annotation 来自定义资源的描述信息，比如为管理工具提供状态检查等。</p><p>此外，Kubernetes 控制器也是构建在跟开发人员和用户使用的相同的 API 之上。用户可以编写自己的控制器和调度器，也可以通过各种插件机制扩展系统的功能。这种设计使得用户可以方便地在 Kubernetes 之上构建各种应用系统。</p><p>Kubernetes 通过声明式的 API 和一系列独立、可组合的控制器保证了应用总是在期望的状态，而用户并不需要关心中间状态是如何转换的。这使得整个系统更容易使用，而且更强大、更可靠、更具弹性和可扩展性。</p><h4 id="kubernetes-不是什么" tabindex="-1">Kubernetes 不是什么 <a class="header-anchor" href="#kubernetes-不是什么" aria-label="Permalink to &quot;Kubernetes 不是什么&quot;">​</a></h4><p>Kubernetes 不是一个传统意义上，包罗万象的 PaaS (平台即服务) 系统。它给用户预留了选择的自由。</p><p>1、不限制支持的应用程序类型，它不插手应用程序框架, 也不限制支持的语言 (如 Java, Python, Ruby 等)，Kubernetes 旨在支持极其多样化的工作负载，包括无状态、有状态和数据处理工作负载。只要应用可以在容器中运行，那么它就可以很好地在 Kubernetes 上运行。</p><p>2、不提供内置的中间件 (如消息中间件)、数据处理框架 (如 Spark)、数据库 (如 mysql) 或集群存储系统 (如 Ceph) 等。这些应用直接运行在 Kubernetes 之上。</p><p>3、不提供点击即部署的服务市场。</p><p>4、不直接部署代码，也不会构建用户的应用程序，但用户可以在 Kubernetes 之上构建需要的持续集成 (CI) 工作流。</p><p>5、允许用户选择自己的日志、监控和告警系统。</p><p>6、不提供应用程序配置语言或系统 (如 jsonnet)。</p><p>7、不提供机器配置、维护、管理或自愈系统。</p><h2 id="kubertenes-基本组件" tabindex="-1">Kubertenes 基本组件 <a class="header-anchor" href="#kubertenes-基本组件" aria-label="Permalink to &quot;Kubertenes 基本组件&quot;">​</a></h2><p>Kubernetes 主要由以下几个核心组件组成：</p><ul><li>etcd：保存了整个集群的状态；</li><li>apiserver：提供了资源操作的唯一入口，并提供认证、授权、访问控制、API 注册和发现等机制；</li><li>controller manager：负责维护集群的状态，比如故障检测、自动扩展、滚动更新等；</li><li>scheduler：负责资源的调度，按照预定的调度策略将 Pod 调度到相应的机器上；</li><li>kubelet：负责维护容器的生命周期，同时也负责 Volume（CVI）和网络（CNI）的管理；</li><li>Container runtime：负责镜像管理以及 Pod 和容器的真正运行（CRI）；</li><li>kube-proxy：负责为 Service 提供 cluster 内部的服务发现和负载均衡</li></ul><p>除了核心组件，还有一些推荐的 Add-ons：</p><ul><li>kube-dns：负责为整个集群提供 DNS 服务</li><li>Ingress Controller：为服务提供外网入口</li><li>Heapster：提供资源监控</li><li>Dashboard：提供 GUI</li><li>Federation：提供跨可用区的集群</li><li>Fluentd-elasticsearch：提供集群日志采集、存储与查询</li></ul><h3 id="组件介绍" tabindex="-1">组件介绍 <a class="header-anchor" href="#组件介绍" aria-label="Permalink to &quot;组件介绍&quot;">​</a></h3><h4 id="etcd" tabindex="-1">Etcd <a class="header-anchor" href="#etcd" aria-label="Permalink to &quot;Etcd&quot;">​</a></h4><blockquote><p>Etcd 是 CoreOS 基于 Raft 开发的分布式 key-value 存储，可用于服务发现、共享配置以及一致性保障（如数据库选主、分布式锁等）</p></blockquote><p>Etcd 主要功能：</p><ul><li>基本的 key-value 存储</li><li>监听机制</li><li>key 的过期及续约机制，用于监控和服务发现</li><li>原子 CAS 和 CAD ，用于分布式锁和 leader 选举</li></ul><h4 id="kube-apiserver" tabindex="-1">kube-apiserver <a class="header-anchor" href="#kube-apiserver" aria-label="Permalink to &quot;kube-apiserver&quot;">​</a></h4><blockquote><p>kube-apiserver 是 Kubernetes 最重要的核心组件之一</p></blockquote><p>主要提供以下的功能：</p><ul><li>提供集群管理的 REST API 接口，包括认证授权、数据校验以及集群状态变更等</li><li>提供其他模块之间的数据交互和通信的枢纽（其他模块通过 API Server 查询或修改数据，只有 API Server 才直接操作 etcd）</li></ul><h4 id="kube-controller-manager" tabindex="-1">kube-controller-manager <a class="header-anchor" href="#kube-controller-manager" aria-label="Permalink to &quot;kube-controller-manager&quot;">​</a></h4><blockquote><p>Controller Manager 由 kube-controller-manager 和 cloud-controller-manager 组成，是 Kubernetes 的大脑，它通过 apiserver 监控整个集群的状态，并确保集群处于预期的工作状态</p></blockquote><p>kube-controller-manager由一系列的控制器组成</p><ul><li>Replication Controller</li><li>Node Controller</li><li>CronJob Controller</li><li>Daemon Controller</li><li>Deployment Controller</li><li>Endpoint Controller</li><li>Garbage Collector</li><li>Namespace Controller</li><li>Job Controller</li><li>Pod AutoScaler</li><li>RelicaSet</li><li>Service Controller</li><li>ServiceAccount Controller</li><li>StatefulSet Controller</li><li>Volume Controller</li><li>Resource quota Controller</li></ul><h4 id="cloud-controller-manager" tabindex="-1">cloud-controller-manager <a class="header-anchor" href="#cloud-controller-manager" aria-label="Permalink to &quot;cloud-controller-manager&quot;">​</a></h4><blockquote><p>在 Kubernetes 启用 Cloud Provider 的时候才需要，用来配合云服务提供商的控制</p></blockquote><p>包括一系列的控制器，如：</p><ul><li>Node Controller</li><li>Route Controller</li><li>Service Controller</li></ul><h4 id="kube-scheduler" tabindex="-1">kube-scheduler <a class="header-anchor" href="#kube-scheduler" aria-label="Permalink to &quot;kube-scheduler&quot;">​</a></h4><blockquote><p>kube-scheduler 负责分配调度 Pod 到集群内的节点上，它监听 kube-apiserver，查询还未分配 Node 的 Pod，然后根据调度策略为这些 Pod 分配节点（更新 Pod的 NodeName 字段）</p></blockquote><p>调度器需要充分考虑诸多的因素：</p><ul><li>公平调度</li><li>资源高效利用</li><li>QoS（服务质量）</li><li>affinity 和 anti-affinity</li><li>数据本地化（data locality）</li><li>内部负载干扰（inter-workload interference）</li><li>deadlines</li></ul><h4 id="kubelet" tabindex="-1">Kubelet <a class="header-anchor" href="#kubelet" aria-label="Permalink to &quot;Kubelet&quot;">​</a></h4><blockquote><p>每个节点上都运行一个 kubelet 服务进程，默认监听 10250 端口，接收并执行 master 发来的指令，管理 Pod 及 Pod 中的容器。每个 kubelet 进程会在 API Server 上注册节点自身信息，定期向 master 节点汇报节点的资源使用情况，并通过 cAdvisor 监控节点和容器的资源。</p></blockquote><h4 id="container-runtime" tabindex="-1">Container runtime <a class="header-anchor" href="#container-runtime" aria-label="Permalink to &quot;Container runtime&quot;">​</a></h4><blockquote><p>容器运行时（Container Runtime）是 Kubernetes 最重要的组件之一，负责真正管理镜像和容器的生命周期。Kubelet 通过 Container Runtime Interface (CRI) 与容器运行时交互，以管理镜像和容器</p></blockquote><h4 id="kube-proxy" tabindex="-1">kube-proxy <a class="header-anchor" href="#kube-proxy" aria-label="Permalink to &quot;kube-proxy&quot;">​</a></h4><blockquote><p>每台机器上都运行一个 kube-proxy 服务，它监听 API server 中 service 和 endpoint 的变化情况，并通过 iptables 等来为服务配置负载均衡（仅支持 TCP 和 UDP）。kube-proxy 可以直接运行在物理机上，也可以以 static pod 或者 daemonset 的方式运行。</p></blockquote><p>kube-proxy 当前支持一下几种实现：</p><ul><li>userspace：最早的负载均衡方案，它在用户空间监听一个端口，所有服务通过 iptables 转发到这个端口，然后在其内部负载均衡到实际的 Pod。该方式最主要的问题是效率低，有明显的性能瓶颈。</li><li>iptables：目前推荐的方案，完全以 iptables 规则的方式来实现 service 负载均衡。该方式最主要的问题是在服务多的时候产生太多的 iptables 规则，非增量式更新会引入一定的时延，大规模情况下有明显的性能问题</li><li>ipvs：为解决 iptables 模式的性能问题，v1.8 新增了 ipvs 模式，采用增量式更新，并可以保证 service 更新期间连接保持不断开</li><li>winuserspace：同 userspace，但仅工作在 windows 上。</li></ul><h2 id="参考" tabindex="-1">参考 <a class="header-anchor" href="#参考" aria-label="Permalink to &quot;参考&quot;">​</a></h2><p><a href="https://juejin.cn/post/6844903666789384200" target="_blank" rel="noreferrer">从0到1使用Kubernetes系列——Kubernetes入门</a></p>',69),i=[t];function n(u,s,c,p,b,d){return r(),l("div",null,i)}const m=e(a,[["render",n]]);export{k as __pageData,m as default};
