import{_ as s,o as a,c as n,Q as l}from"./chunks/framework.b41230ea.js";const u=JSON.parse('{"title":"Docker","description":"Docker 详解","frontmatter":{"description":"Docker 详解","tag":["Docker","DevOps"]},"headers":[],"relativePath":"posts/devops/Docker/Docker.md","filePath":"posts/devops/Docker/Docker.md","lastUpdated":1700722361000}'),p={name:"posts/devops/Docker/Docker.md"},o=l(`<h1 id="docker" tabindex="-1">Docker <a class="header-anchor" href="#docker" aria-label="Permalink to &quot;Docker&quot;">​</a></h1><h2 id="安装-docker" tabindex="-1">安装 Docker <a class="header-anchor" href="#安装-docker" aria-label="Permalink to &quot;安装 Docker&quot;">​</a></h2><blockquote><p>Windows 先安装 WSL2，再安装 Docker。</p></blockquote><blockquote><p>镜像加速与修改镜像源：</p><ul><li><a href="https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors" target="_blank" rel="noreferrer">阿里云服务器设置 Docker 镜像加速器</a></li><li><a href="https://blog.csdn.net/m0_37886429/article/details/80323149" target="_blank" rel="noreferrer">更改docker仓库源地址 1</a></li><li><a href="https://www.jianshu.com/p/df75f9b5fcf6" target="_blank" rel="noreferrer">更改docker仓库源地址 2</a></li></ul></blockquote><p><strong>安装完成启动</strong></p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># ubuntu</span></span>
<span class="line"><span style="color:#B392F0;">service</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">start</span></span>
<span class="line"><span style="color:#B392F0;">service</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">restart</span></span>
<span class="line"><span style="color:#B392F0;">service</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">stop</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># centos 7</span></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">start</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">docker</span></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">restart</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">docker</span></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">stop</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">docker</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># ubuntu</span></span>
<span class="line"><span style="color:#6F42C1;">service</span><span style="color:#24292E;"> </span><span style="color:#032F62;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">start</span></span>
<span class="line"><span style="color:#6F42C1;">service</span><span style="color:#24292E;"> </span><span style="color:#032F62;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">restart</span></span>
<span class="line"><span style="color:#6F42C1;">service</span><span style="color:#24292E;"> </span><span style="color:#032F62;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">stop</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># centos 7</span></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">start</span><span style="color:#24292E;"> </span><span style="color:#032F62;">docker</span></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">restart</span><span style="color:#24292E;"> </span><span style="color:#032F62;">docker</span></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">stop</span><span style="color:#24292E;"> </span><span style="color:#032F62;">docker</span></span></code></pre></div><h3 id="非-root-用户启动" tabindex="-1">非 root 用户启动 <a class="header-anchor" href="#非-root-用户启动" aria-label="Permalink to &quot;非 root 用户启动&quot;">​</a></h3><ul><li><a href="https://docs.docker.com/engine/install/linux-postinstall/#manage-docker-as-a-non-root-user" target="_blank" rel="noreferrer">manager docker as a non-root user</a></li></ul><h2 id="镜像" tabindex="-1">镜像 <a class="header-anchor" href="#镜像" aria-label="Permalink to &quot;镜像&quot;">​</a></h2><h3 id="mysql" tabindex="-1">MySQL <a class="header-anchor" href="#mysql" aria-label="Permalink to &quot;MySQL&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[root@localhost home]# docker run --name mysql01 -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 -d mysql</span></span>
<span class="line"><span style="color:#B392F0;">438a025d3de0c82a5f58dc96cff8457e3b814f4a98f9732d1cb900c16e144661</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@localhost home]# docker exec -it mysql01 /bin/bash</span></span>
<span class="line"><span style="color:#B392F0;">root@438a025d3de0:/#</span><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">mysql</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-u</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">root</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-p123456</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">mysql&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">show</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">databases</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#B392F0;">+--------------------+</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Database</span><span style="color:#E1E4E8;">           </span><span style="color:#F97583;">|</span></span>
<span class="line"><span style="color:#B392F0;">+--------------------+</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">information_schema</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">mysql</span><span style="color:#E1E4E8;">              </span><span style="color:#F97583;">|</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">performance_schema</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span></span>
<span class="line"><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">sys</span><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">|</span></span>
<span class="line"><span style="color:#B392F0;">+--------------------+</span></span>
<span class="line"><span style="color:#B392F0;">4</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">rows</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">in</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">set</span><span style="color:#E1E4E8;"> (0.01 </span><span style="color:#9ECBFF;">sec</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 更改MySQL密码</span></span>
<span class="line"><span style="color:#B392F0;">mysql&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ALTER</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">USER</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;root&#39;@&#39;%&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">IDENTIFIED</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">WITH</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">mysql_native_password</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">BY</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;123456&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#B392F0;">Query</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">OK,</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">rows</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">affected</span><span style="color:#E1E4E8;"> (0.00 </span><span style="color:#9ECBFF;">sec</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#6A737D;"># 或者</span></span>
<span class="line"><span style="color:#B392F0;">mysql&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ALTER</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">USER</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;root&#39;@&#39;localhost&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">IDENTIFIED</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">WITH</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">mysql_native_password</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">BY</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;123456&#39;</span><span style="color:#E1E4E8;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[root@localhost home]# docker run --name mysql01 -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 -d mysql</span></span>
<span class="line"><span style="color:#6F42C1;">438a025d3de0c82a5f58dc96cff8457e3b814f4a98f9732d1cb900c16e144661</span></span>
<span class="line"><span style="color:#24292E;">[root@localhost home]# docker exec -it mysql01 /bin/bash</span></span>
<span class="line"><span style="color:#6F42C1;">root@438a025d3de0:/#</span><span style="color:#24292E;">  </span><span style="color:#032F62;">mysql</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-u</span><span style="color:#24292E;"> </span><span style="color:#032F62;">root</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-p123456</span><span style="color:#24292E;"> </span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">mysql&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">show</span><span style="color:#24292E;"> </span><span style="color:#032F62;">databases</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6F42C1;">+--------------------+</span></span>
<span class="line"><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Database</span><span style="color:#24292E;">           </span><span style="color:#D73A49;">|</span></span>
<span class="line"><span style="color:#6F42C1;">+--------------------+</span></span>
<span class="line"><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">information_schema</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span></span>
<span class="line"><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">mysql</span><span style="color:#24292E;">              </span><span style="color:#D73A49;">|</span></span>
<span class="line"><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">performance_schema</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span></span>
<span class="line"><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">sys</span><span style="color:#24292E;">                </span><span style="color:#D73A49;">|</span></span>
<span class="line"><span style="color:#6F42C1;">+--------------------+</span></span>
<span class="line"><span style="color:#6F42C1;">4</span><span style="color:#24292E;"> </span><span style="color:#032F62;">rows</span><span style="color:#24292E;"> </span><span style="color:#032F62;">in</span><span style="color:#24292E;"> </span><span style="color:#032F62;">set</span><span style="color:#24292E;"> (0.01 </span><span style="color:#032F62;">sec</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 更改MySQL密码</span></span>
<span class="line"><span style="color:#6F42C1;">mysql&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ALTER</span><span style="color:#24292E;"> </span><span style="color:#032F62;">USER</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;root&#39;@&#39;%&#39;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">IDENTIFIED</span><span style="color:#24292E;"> </span><span style="color:#032F62;">WITH</span><span style="color:#24292E;"> </span><span style="color:#032F62;">mysql_native_password</span><span style="color:#24292E;"> </span><span style="color:#032F62;">BY</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;123456&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6F42C1;">Query</span><span style="color:#24292E;"> </span><span style="color:#032F62;">OK,</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> </span><span style="color:#032F62;">rows</span><span style="color:#24292E;"> </span><span style="color:#032F62;">affected</span><span style="color:#24292E;"> (0.00 </span><span style="color:#032F62;">sec</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#6A737D;"># 或者</span></span>
<span class="line"><span style="color:#6F42C1;">mysql&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ALTER</span><span style="color:#24292E;"> </span><span style="color:#032F62;">USER</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;root&#39;@&#39;localhost&#39;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">IDENTIFIED</span><span style="color:#24292E;"> </span><span style="color:#032F62;">WITH</span><span style="color:#24292E;"> </span><span style="color:#032F62;">mysql_native_password</span><span style="color:#24292E;"> </span><span style="color:#032F62;">BY</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;123456&#39;</span><span style="color:#24292E;">;</span></span></code></pre></div><h3 id="nacos" tabindex="-1">Nacos <a class="header-anchor" href="#nacos" aria-label="Permalink to &quot;Nacos&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">run</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--env</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">MODE=standalone</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--name</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">nacos</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-d</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-p</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">8848</span><span style="color:#9ECBFF;">:8848</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">nacos/nacos-server</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">run</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--env</span><span style="color:#24292E;"> </span><span style="color:#032F62;">MODE=standalone</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--name</span><span style="color:#24292E;"> </span><span style="color:#032F62;">nacos</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-d</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-p</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">8848</span><span style="color:#032F62;">:8848</span><span style="color:#24292E;"> </span><span style="color:#032F62;">nacos/nacos-server</span></span></code></pre></div><h3 id="mongodb" tabindex="-1">MongoDB <a class="header-anchor" href="#mongodb" aria-label="Permalink to &quot;MongoDB&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">run</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--name</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">mymongo</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-d</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-p</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">27017</span><span style="color:#9ECBFF;">:27017</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-v</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">myFolder:/data</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">mongo</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">run</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--name</span><span style="color:#24292E;"> </span><span style="color:#032F62;">mymongo</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-d</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-p</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">27017</span><span style="color:#032F62;">:27017</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-v</span><span style="color:#24292E;"> </span><span style="color:#032F62;">myFolder:/data</span><span style="color:#24292E;"> </span><span style="color:#032F62;">mongo</span></span></code></pre></div><h3 id="redis" tabindex="-1">Redis <a class="header-anchor" href="#redis" aria-label="Permalink to &quot;Redis&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">run</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-itd</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--name</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">redis-test</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-p</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">6379</span><span style="color:#9ECBFF;">:6379</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">redis</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">run</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-itd</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--name</span><span style="color:#24292E;"> </span><span style="color:#032F62;">redis-test</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-p</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">6379</span><span style="color:#032F62;">:6379</span><span style="color:#24292E;"> </span><span style="color:#032F62;">redis</span></span></code></pre></div><h3 id="maven-私服" tabindex="-1">Maven 私服 <a class="header-anchor" href="#maven-私服" aria-label="Permalink to &quot;Maven 私服&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">run</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-d</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--name</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">nexus</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-p</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">8081</span><span style="color:#9ECBFF;">:8081</span><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">-v</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/srv/nexus-data:/var/nexus-data</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--restart=always</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">sonatype/nexus3:latest</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">run</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-d</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--name</span><span style="color:#24292E;"> </span><span style="color:#032F62;">nexus</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-p</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">8081</span><span style="color:#032F62;">:8081</span><span style="color:#24292E;">  </span><span style="color:#005CC5;">-v</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/srv/nexus-data:/var/nexus-data</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--restart=always</span><span style="color:#24292E;"> </span><span style="color:#032F62;">sonatype/nexus3:latest</span></span></code></pre></div><h3 id="alpine" tabindex="-1">Alpine <a class="header-anchor" href="#alpine" aria-label="Permalink to &quot;Alpine&quot;">​</a></h3><blockquote><p>apline 镜像换源：<a href="https://www.jianshu.com/p/791c91b7c2a4" target="_blank" rel="noreferrer">https://www.jianshu.com/p/791c91b7c2a4</a></p></blockquote><h2 id="dockerfile" tabindex="-1">Dockerfile <a class="header-anchor" href="#dockerfile" aria-label="Permalink to &quot;Dockerfile&quot;">​</a></h2><blockquote><p><a href="https://docs.docker.com/develop/develop-images/dockerfile_best-practices/" target="_blank" rel="noreferrer">https://docs.docker.com/develop/develop-images/dockerfile_best-practices/</a></p></blockquote><h3 id="ubuntu" tabindex="-1">Ubuntu <a class="header-anchor" href="#ubuntu" aria-label="Permalink to &quot;Ubuntu&quot;">​</a></h3><div class="language-dockerfile vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dockerfile</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">FROM</span><span style="color:#E1E4E8;"> ubuntu</span></span>
<span class="line"><span style="color:#F97583;">RUN</span><span style="color:#E1E4E8;"> apt-get update</span></span>
<span class="line"><span style="color:#F97583;">RUN</span><span style="color:#E1E4E8;"> apt-get install vim -y</span></span>
<span class="line"><span style="color:#F97583;">RUN</span><span style="color:#E1E4E8;">  apt-get install -y net-tools</span></span>
<span class="line"><span style="color:#F97583;">ENV</span><span style="color:#E1E4E8;"> WORKPATH /usr/local</span></span>
<span class="line"><span style="color:#F97583;">WORKDIR</span><span style="color:#E1E4E8;"> $WORKPATH</span></span>
<span class="line"><span style="color:#F97583;">EXPOSE</span><span style="color:#E1E4E8;"> 8888</span></span>
<span class="line"><span style="color:#F97583;">CMD</span><span style="color:#E1E4E8;"> echo </span><span style="color:#9ECBFF;">&quot;----end----&quot;</span></span>
<span class="line"><span style="color:#F97583;">CMD</span><span style="color:#E1E4E8;"> /bin/bash</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">FROM</span><span style="color:#24292E;"> ubuntu</span></span>
<span class="line"><span style="color:#D73A49;">RUN</span><span style="color:#24292E;"> apt-get update</span></span>
<span class="line"><span style="color:#D73A49;">RUN</span><span style="color:#24292E;"> apt-get install vim -y</span></span>
<span class="line"><span style="color:#D73A49;">RUN</span><span style="color:#24292E;">  apt-get install -y net-tools</span></span>
<span class="line"><span style="color:#D73A49;">ENV</span><span style="color:#24292E;"> WORKPATH /usr/local</span></span>
<span class="line"><span style="color:#D73A49;">WORKDIR</span><span style="color:#24292E;"> $WORKPATH</span></span>
<span class="line"><span style="color:#D73A49;">EXPOSE</span><span style="color:#24292E;"> 8888</span></span>
<span class="line"><span style="color:#D73A49;">CMD</span><span style="color:#24292E;"> echo </span><span style="color:#032F62;">&quot;----end----&quot;</span></span>
<span class="line"><span style="color:#D73A49;">CMD</span><span style="color:#24292E;"> /bin/bash</span></span></code></pre></div><h3 id="java-应用" tabindex="-1">Java 应用 <a class="header-anchor" href="#java-应用" aria-label="Permalink to &quot;Java 应用&quot;">​</a></h3><div class="language-dockerfile vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dockerfile</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">FROM</span><span style="color:#E1E4E8;"> openjdk:8-jre-alpine</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 更换 apline 镜像源</span></span>
<span class="line"><span style="color:#F97583;">RUN</span><span style="color:#E1E4E8;"> sed -i </span><span style="color:#9ECBFF;">&#39;s/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g&#39;</span><span style="color:#E1E4E8;"> /etc/apk/repositories</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 设置镜像内时区</span></span>
<span class="line"><span style="color:#F97583;">RUN</span><span style="color:#E1E4E8;"> apk add tzdata</span></span>
<span class="line"><span style="color:#F97583;">RUN</span><span style="color:#E1E4E8;"> cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime</span></span>
<span class="line"><span style="color:#F97583;">RUN</span><span style="color:#E1E4E8;"> echo </span><span style="color:#9ECBFF;">&quot;Asia/Shanghai&quot;</span><span style="color:#E1E4E8;"> &gt; /etc/timezone</span></span>
<span class="line"><span style="color:#F97583;">RUN</span><span style="color:#E1E4E8;"> apk del tzdata</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">RUN</span><span style="color:#E1E4E8;"> apk add ffmpeg</span></span>
<span class="line"><span style="color:#F97583;">RUN</span><span style="color:#E1E4E8;"> apk add vim</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">WORKDIR</span><span style="color:#E1E4E8;"> application</span></span>
<span class="line"><span style="color:#6A737D;"># jar 相对 Dockerfile 所在的位置</span></span>
<span class="line"><span style="color:#F97583;">ARG</span><span style="color:#E1E4E8;"> JAR_FILE=target/*.jar</span></span>
<span class="line"><span style="color:#F97583;">COPY</span><span style="color:#E1E4E8;"> \${JAR_FILE} application.jar</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Forward logs to Docker</span></span>
<span class="line"><span style="color:#6A737D;"># RUN ln -sf /dev/stdout /application/logs/media-sfu.log &amp;&amp; \\</span></span>
<span class="line"><span style="color:#6A737D;">#    ln -sf /dev/stderr /application/logs/media-sfu-error.log</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">ENTRYPOINT</span><span style="color:#E1E4E8;"> [</span><span style="color:#9ECBFF;">&quot;java&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=0.0.0.0:5005&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;-jar&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;application.jar&quot;</span><span style="color:#E1E4E8;">]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">FROM</span><span style="color:#24292E;"> openjdk:8-jre-alpine</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 更换 apline 镜像源</span></span>
<span class="line"><span style="color:#D73A49;">RUN</span><span style="color:#24292E;"> sed -i </span><span style="color:#032F62;">&#39;s/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g&#39;</span><span style="color:#24292E;"> /etc/apk/repositories</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 设置镜像内时区</span></span>
<span class="line"><span style="color:#D73A49;">RUN</span><span style="color:#24292E;"> apk add tzdata</span></span>
<span class="line"><span style="color:#D73A49;">RUN</span><span style="color:#24292E;"> cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime</span></span>
<span class="line"><span style="color:#D73A49;">RUN</span><span style="color:#24292E;"> echo </span><span style="color:#032F62;">&quot;Asia/Shanghai&quot;</span><span style="color:#24292E;"> &gt; /etc/timezone</span></span>
<span class="line"><span style="color:#D73A49;">RUN</span><span style="color:#24292E;"> apk del tzdata</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">RUN</span><span style="color:#24292E;"> apk add ffmpeg</span></span>
<span class="line"><span style="color:#D73A49;">RUN</span><span style="color:#24292E;"> apk add vim</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">WORKDIR</span><span style="color:#24292E;"> application</span></span>
<span class="line"><span style="color:#6A737D;"># jar 相对 Dockerfile 所在的位置</span></span>
<span class="line"><span style="color:#D73A49;">ARG</span><span style="color:#24292E;"> JAR_FILE=target/*.jar</span></span>
<span class="line"><span style="color:#D73A49;">COPY</span><span style="color:#24292E;"> \${JAR_FILE} application.jar</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Forward logs to Docker</span></span>
<span class="line"><span style="color:#6A737D;"># RUN ln -sf /dev/stdout /application/logs/media-sfu.log &amp;&amp; \\</span></span>
<span class="line"><span style="color:#6A737D;">#    ln -sf /dev/stderr /application/logs/media-sfu-error.log</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">ENTRYPOINT</span><span style="color:#24292E;"> [</span><span style="color:#032F62;">&quot;java&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=0.0.0.0:5005&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;-jar&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;application.jar&quot;</span><span style="color:#24292E;">]</span></span></code></pre></div><h3 id="nginx-rtmp" tabindex="-1">nginx-rtmp <a class="header-anchor" href="#nginx-rtmp" aria-label="Permalink to &quot;nginx-rtmp&quot;">​</a></h3><div class="language-dockerfile vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dockerfile</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">FROM</span><span style="color:#E1E4E8;"> alpine:latest</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">ARG</span><span style="color:#E1E4E8;"> BUILD_DIR=/tmp/build</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">ARG</span><span style="color:#E1E4E8;"> NGINX_CONF=nginx.conf</span></span>
<span class="line"><span style="color:#F97583;">ARG</span><span style="color:#E1E4E8;"> NGINX_CONF_DIR=/etc/nginx</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">ARG</span><span style="color:#E1E4E8;"> NGINX_VERS=nginx-1.25.2</span></span>
<span class="line"><span style="color:#F97583;">ARG</span><span style="color:#E1E4E8;"> NGINX_RTMP_MODULE_VERS=nginx-rtmp-module-1.2.2</span></span>
<span class="line"><span style="color:#F97583;">ARG</span><span style="color:#E1E4E8;"> ZLIB_VERS=zlib-1.3</span></span>
<span class="line"><span style="color:#F97583;">ARG</span><span style="color:#E1E4E8;"> PCRE_VERS=pcre2-10.42</span></span>
<span class="line"><span style="color:#F97583;">ARG</span><span style="color:#E1E4E8;"> OPENSSL_VERS=openssl-3.0.10</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">ARG</span><span style="color:#E1E4E8;"> NGINX_FILE=\${NGINX_VERS}.tar.gz</span></span>
<span class="line"><span style="color:#F97583;">ARG</span><span style="color:#E1E4E8;"> NGINX_RTMP_MODULE_FILE=\${NGINX_RTMP_MODULE_VERS}.tar.gz</span></span>
<span class="line"><span style="color:#F97583;">ARG</span><span style="color:#E1E4E8;"> ZLIB_FILE=\${ZLIB_VERS}.tar.gz</span></span>
<span class="line"><span style="color:#F97583;">ARG</span><span style="color:#E1E4E8;"> PCRE_FILE=\${PCRE_VERS}.tar.gz</span></span>
<span class="line"><span style="color:#F97583;">ARG</span><span style="color:#E1E4E8;"> OPENSSL_FILE=\${OPENSSL_VERS}.tar.gz</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 换源</span></span>
<span class="line"><span style="color:#F97583;">RUN</span><span style="color:#E1E4E8;"> sed -i </span><span style="color:#9ECBFF;">&#39;s/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g&#39;</span><span style="color:#E1E4E8;"> /etc/apk/repositories</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#RUN  sed -i s@/archive.ubuntu.com/@/mirrors.aliyun.com/@g /etc/apt/sources.list &amp;&amp; \\</span></span>
<span class="line"><span style="color:#6A737D;">#     sed -i s@/security.ubuntu.com/@/mirrors.aliyun.com/@g /etc/apt/sources.list &amp;&amp; \\</span></span>
<span class="line"><span style="color:#6A737D;">#     apt clean &amp;&amp; \\</span></span>
<span class="line"><span style="color:#6A737D;">#     apt update -y</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">RUN</span><span style="color:#E1E4E8;"> mkdir -p \${BUILD_DIR}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># download and decompress nginx</span></span>
<span class="line"><span style="color:#6A737D;"># RUN apt install -y -y wget</span></span>
<span class="line"><span style="color:#6A737D;"># RUN wget -O nginx.tar.gz https://nginx.org/download/nginx-1.25.2.tar.gz &amp;&amp;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># download and decompress nginx-rtmp-module</span></span>
<span class="line"><span style="color:#6A737D;"># RUN wget -O nginx-rtmp-module.tar.gz https://github.com/arut/nginx-rtmp-module/archive/refs/tags/v\${NGINX_RTMP_MODULE_VERSION}.tar.gz &amp;&amp; tar -zxf nginx-rtmp-module.tar.gz</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># download extract package</span></span>
<span class="line"><span style="color:#6A737D;"># RUN wget -O \${ZLIB_VERS}.tar.gz http://zlib.net/\${ZLIB_VERS}.tar.gz &amp;&amp; tar -zxf \${ZLIB_VERS}.tar.gz</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">COPY</span><span style="color:#E1E4E8;"> \${NGINX_FILE} \${BUILD_DIR}/</span></span>
<span class="line"><span style="color:#F97583;">COPY</span><span style="color:#E1E4E8;"> \${NGINX_RTMP_MODULE_FILE} \${BUILD_DIR}/</span></span>
<span class="line"><span style="color:#F97583;">COPY</span><span style="color:#E1E4E8;"> \${ZLIB_FILE} \${BUILD_DIR}/</span></span>
<span class="line"><span style="color:#F97583;">COPY</span><span style="color:#E1E4E8;"> \${PCRE_FILE} \${BUILD_DIR}/</span></span>
<span class="line"><span style="color:#F97583;">COPY</span><span style="color:#E1E4E8;"> \${OPENSSL_FILE} \${BUILD_DIR}/</span></span>
<span class="line"><span style="color:#F97583;">COPY</span><span style="color:#E1E4E8;"> \${NGINX_CONF} \${BUILD_DIR}/</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">RUN</span><span style="color:#E1E4E8;"> cd \${BUILD_DIR} &amp;&amp; \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    tar -xvf \${NGINX_FILE} &amp;&amp; \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    tar -xvf \${NGINX_RTMP_MODULE_FILE} &amp;&amp; \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    tar -xvf \${ZLIB_FILE} &amp;&amp; \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    tar -xvf \${PCRE_FILE} &amp;&amp; \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    tar -xvf \${OPENSSL_FILE} &amp;&amp; \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    rm -rf *.tar.gz</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">RUN</span><span style="color:#E1E4E8;"> cd \${BUILD_DIR} &amp;&amp; rm -rf *.tar.gz</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># install compile tools and dependencies, compile nginx with nginx-rtmp-module</span></span>
<span class="line"><span style="color:#F97583;">RUN</span><span style="color:#E1E4E8;"> apk add --no-cache gcc g++ make perl linux-headers &amp;&amp; \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    cd \${BUILD_DIR} &amp;&amp; cd \${NGINX_VERS} &amp;&amp; \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    ./configure \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    --sbin-path=/usr/local/sbin/nginx \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    --conf-path=/etc/nginx/nginx.conf \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    --http-log-path=/var/log/nginx/access.log \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    --error-log-path=/var/log/nginx/error.log \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    --pid-path=/var/run/nginx/nginx.pid \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    --lock-path=/var/lock/nginx/nginx.lock \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    --http-client-body-temp-path=/tmp/nginx-client-body \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    --with-http_ssl_module \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    --with-zlib=../\${ZLIB_VERS} \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    --with-pcre=../\${PCRE_VERS} \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    --with-openssl=../\${OPENSSL_VERS} \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    --add-module=../\${NGINX_RTMP_MODULE_VERS} &amp;&amp; \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    make &amp;&amp; \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    make install &amp;&amp; \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># cp custom conf</span></span>
<span class="line"><span style="color:#E1E4E8;">    cp ../\${NGINX_CONF} \${NGINX_CONF_DIR} &amp;&amp; \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># forward logs to docker</span></span>
<span class="line"><span style="color:#E1E4E8;">    ln -sf /dev/stdout /var/log/nginx/access.log &amp;&amp; \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    ln -sf /dev/stderr /var/log/nginx/error.log &amp;&amp; \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    apk del gcc g++ make linux-headers &amp;&amp; apk add --no-cache vim &amp;&amp; \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    rm -rf ./* &amp;&amp; \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    rm -rf \${BUILD_DIR} &amp;&amp;\\</span></span>
<span class="line"><span style="color:#E1E4E8;">    rm -rf /var/cache/apk/*</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">EXPOSE</span><span style="color:#E1E4E8;"> 80</span></span>
<span class="line"><span style="color:#F97583;">EXPOSE</span><span style="color:#E1E4E8;"> 90</span></span>
<span class="line"><span style="color:#F97583;">EXPOSE</span><span style="color:#E1E4E8;"> 8080</span></span>
<span class="line"><span style="color:#F97583;">EXPOSE</span><span style="color:#E1E4E8;"> 9090</span></span>
<span class="line"><span style="color:#F97583;">EXPOSE</span><span style="color:#E1E4E8;"> 1935</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">CMD</span><span style="color:#E1E4E8;"> [</span><span style="color:#9ECBFF;">&quot;nginx&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;-g&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;daemon off;&quot;</span><span style="color:#E1E4E8;">]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">FROM</span><span style="color:#24292E;"> alpine:latest</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">ARG</span><span style="color:#24292E;"> BUILD_DIR=/tmp/build</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">ARG</span><span style="color:#24292E;"> NGINX_CONF=nginx.conf</span></span>
<span class="line"><span style="color:#D73A49;">ARG</span><span style="color:#24292E;"> NGINX_CONF_DIR=/etc/nginx</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">ARG</span><span style="color:#24292E;"> NGINX_VERS=nginx-1.25.2</span></span>
<span class="line"><span style="color:#D73A49;">ARG</span><span style="color:#24292E;"> NGINX_RTMP_MODULE_VERS=nginx-rtmp-module-1.2.2</span></span>
<span class="line"><span style="color:#D73A49;">ARG</span><span style="color:#24292E;"> ZLIB_VERS=zlib-1.3</span></span>
<span class="line"><span style="color:#D73A49;">ARG</span><span style="color:#24292E;"> PCRE_VERS=pcre2-10.42</span></span>
<span class="line"><span style="color:#D73A49;">ARG</span><span style="color:#24292E;"> OPENSSL_VERS=openssl-3.0.10</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">ARG</span><span style="color:#24292E;"> NGINX_FILE=\${NGINX_VERS}.tar.gz</span></span>
<span class="line"><span style="color:#D73A49;">ARG</span><span style="color:#24292E;"> NGINX_RTMP_MODULE_FILE=\${NGINX_RTMP_MODULE_VERS}.tar.gz</span></span>
<span class="line"><span style="color:#D73A49;">ARG</span><span style="color:#24292E;"> ZLIB_FILE=\${ZLIB_VERS}.tar.gz</span></span>
<span class="line"><span style="color:#D73A49;">ARG</span><span style="color:#24292E;"> PCRE_FILE=\${PCRE_VERS}.tar.gz</span></span>
<span class="line"><span style="color:#D73A49;">ARG</span><span style="color:#24292E;"> OPENSSL_FILE=\${OPENSSL_VERS}.tar.gz</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 换源</span></span>
<span class="line"><span style="color:#D73A49;">RUN</span><span style="color:#24292E;"> sed -i </span><span style="color:#032F62;">&#39;s/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g&#39;</span><span style="color:#24292E;"> /etc/apk/repositories</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">#RUN  sed -i s@/archive.ubuntu.com/@/mirrors.aliyun.com/@g /etc/apt/sources.list &amp;&amp; \\</span></span>
<span class="line"><span style="color:#6A737D;">#     sed -i s@/security.ubuntu.com/@/mirrors.aliyun.com/@g /etc/apt/sources.list &amp;&amp; \\</span></span>
<span class="line"><span style="color:#6A737D;">#     apt clean &amp;&amp; \\</span></span>
<span class="line"><span style="color:#6A737D;">#     apt update -y</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">RUN</span><span style="color:#24292E;"> mkdir -p \${BUILD_DIR}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># download and decompress nginx</span></span>
<span class="line"><span style="color:#6A737D;"># RUN apt install -y -y wget</span></span>
<span class="line"><span style="color:#6A737D;"># RUN wget -O nginx.tar.gz https://nginx.org/download/nginx-1.25.2.tar.gz &amp;&amp;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># download and decompress nginx-rtmp-module</span></span>
<span class="line"><span style="color:#6A737D;"># RUN wget -O nginx-rtmp-module.tar.gz https://github.com/arut/nginx-rtmp-module/archive/refs/tags/v\${NGINX_RTMP_MODULE_VERSION}.tar.gz &amp;&amp; tar -zxf nginx-rtmp-module.tar.gz</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># download extract package</span></span>
<span class="line"><span style="color:#6A737D;"># RUN wget -O \${ZLIB_VERS}.tar.gz http://zlib.net/\${ZLIB_VERS}.tar.gz &amp;&amp; tar -zxf \${ZLIB_VERS}.tar.gz</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">COPY</span><span style="color:#24292E;"> \${NGINX_FILE} \${BUILD_DIR}/</span></span>
<span class="line"><span style="color:#D73A49;">COPY</span><span style="color:#24292E;"> \${NGINX_RTMP_MODULE_FILE} \${BUILD_DIR}/</span></span>
<span class="line"><span style="color:#D73A49;">COPY</span><span style="color:#24292E;"> \${ZLIB_FILE} \${BUILD_DIR}/</span></span>
<span class="line"><span style="color:#D73A49;">COPY</span><span style="color:#24292E;"> \${PCRE_FILE} \${BUILD_DIR}/</span></span>
<span class="line"><span style="color:#D73A49;">COPY</span><span style="color:#24292E;"> \${OPENSSL_FILE} \${BUILD_DIR}/</span></span>
<span class="line"><span style="color:#D73A49;">COPY</span><span style="color:#24292E;"> \${NGINX_CONF} \${BUILD_DIR}/</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">RUN</span><span style="color:#24292E;"> cd \${BUILD_DIR} &amp;&amp; \\</span></span>
<span class="line"><span style="color:#24292E;">    tar -xvf \${NGINX_FILE} &amp;&amp; \\</span></span>
<span class="line"><span style="color:#24292E;">    tar -xvf \${NGINX_RTMP_MODULE_FILE} &amp;&amp; \\</span></span>
<span class="line"><span style="color:#24292E;">    tar -xvf \${ZLIB_FILE} &amp;&amp; \\</span></span>
<span class="line"><span style="color:#24292E;">    tar -xvf \${PCRE_FILE} &amp;&amp; \\</span></span>
<span class="line"><span style="color:#24292E;">    tar -xvf \${OPENSSL_FILE} &amp;&amp; \\</span></span>
<span class="line"><span style="color:#24292E;">    rm -rf *.tar.gz</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">RUN</span><span style="color:#24292E;"> cd \${BUILD_DIR} &amp;&amp; rm -rf *.tar.gz</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># install compile tools and dependencies, compile nginx with nginx-rtmp-module</span></span>
<span class="line"><span style="color:#D73A49;">RUN</span><span style="color:#24292E;"> apk add --no-cache gcc g++ make perl linux-headers &amp;&amp; \\</span></span>
<span class="line"><span style="color:#24292E;">    cd \${BUILD_DIR} &amp;&amp; cd \${NGINX_VERS} &amp;&amp; \\</span></span>
<span class="line"><span style="color:#24292E;">    ./configure \\</span></span>
<span class="line"><span style="color:#24292E;">    --sbin-path=/usr/local/sbin/nginx \\</span></span>
<span class="line"><span style="color:#24292E;">    --conf-path=/etc/nginx/nginx.conf \\</span></span>
<span class="line"><span style="color:#24292E;">    --http-log-path=/var/log/nginx/access.log \\</span></span>
<span class="line"><span style="color:#24292E;">    --error-log-path=/var/log/nginx/error.log \\</span></span>
<span class="line"><span style="color:#24292E;">    --pid-path=/var/run/nginx/nginx.pid \\</span></span>
<span class="line"><span style="color:#24292E;">    --lock-path=/var/lock/nginx/nginx.lock \\</span></span>
<span class="line"><span style="color:#24292E;">    --http-client-body-temp-path=/tmp/nginx-client-body \\</span></span>
<span class="line"><span style="color:#24292E;">    --with-http_ssl_module \\</span></span>
<span class="line"><span style="color:#24292E;">    --with-zlib=../\${ZLIB_VERS} \\</span></span>
<span class="line"><span style="color:#24292E;">    --with-pcre=../\${PCRE_VERS} \\</span></span>
<span class="line"><span style="color:#24292E;">    --with-openssl=../\${OPENSSL_VERS} \\</span></span>
<span class="line"><span style="color:#24292E;">    --add-module=../\${NGINX_RTMP_MODULE_VERS} &amp;&amp; \\</span></span>
<span class="line"><span style="color:#24292E;">    make &amp;&amp; \\</span></span>
<span class="line"><span style="color:#24292E;">    make install &amp;&amp; \\</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># cp custom conf</span></span>
<span class="line"><span style="color:#24292E;">    cp ../\${NGINX_CONF} \${NGINX_CONF_DIR} &amp;&amp; \\</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># forward logs to docker</span></span>
<span class="line"><span style="color:#24292E;">    ln -sf /dev/stdout /var/log/nginx/access.log &amp;&amp; \\</span></span>
<span class="line"><span style="color:#24292E;">    ln -sf /dev/stderr /var/log/nginx/error.log &amp;&amp; \\</span></span>
<span class="line"><span style="color:#24292E;">    apk del gcc g++ make linux-headers &amp;&amp; apk add --no-cache vim &amp;&amp; \\</span></span>
<span class="line"><span style="color:#24292E;">    rm -rf ./* &amp;&amp; \\</span></span>
<span class="line"><span style="color:#24292E;">    rm -rf \${BUILD_DIR} &amp;&amp;\\</span></span>
<span class="line"><span style="color:#24292E;">    rm -rf /var/cache/apk/*</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">EXPOSE</span><span style="color:#24292E;"> 80</span></span>
<span class="line"><span style="color:#D73A49;">EXPOSE</span><span style="color:#24292E;"> 90</span></span>
<span class="line"><span style="color:#D73A49;">EXPOSE</span><span style="color:#24292E;"> 8080</span></span>
<span class="line"><span style="color:#D73A49;">EXPOSE</span><span style="color:#24292E;"> 9090</span></span>
<span class="line"><span style="color:#D73A49;">EXPOSE</span><span style="color:#24292E;"> 1935</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">CMD</span><span style="color:#24292E;"> [</span><span style="color:#032F62;">&quot;nginx&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;-g&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;daemon off;&quot;</span><span style="color:#24292E;">]</span></span></code></pre></div><h2 id="docker-compose" tabindex="-1">Docker Compose <a class="header-anchor" href="#docker-compose" aria-label="Permalink to &quot;Docker Compose&quot;">​</a></h2><h3 id="kibana" tabindex="-1">kibana <a class="header-anchor" href="#kibana" aria-label="Permalink to &quot;kibana&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;3&#39;</span></span>
<span class="line"><span style="color:#85E89D;">services</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">kibana</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">expose</span><span style="color:#E1E4E8;">: </span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">&quot;9200&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">ports</span><span style="color:#E1E4E8;">: </span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">&quot;5601&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">image</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;kibana:7.6.2&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">version</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;3&#39;</span></span>
<span class="line"><span style="color:#22863A;">services</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">kibana</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">expose</span><span style="color:#24292E;">: </span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">&quot;9200&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">ports</span><span style="color:#24292E;">: </span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">&quot;5601&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;kibana:7.6.2&quot;</span></span></code></pre></div><h2 id="docker-镜像瘦身" tabindex="-1">Docker 镜像瘦身 <a class="header-anchor" href="#docker-镜像瘦身" aria-label="Permalink to &quot;Docker 镜像瘦身&quot;">​</a></h2><blockquote><ul><li><a href="https://docs.erda.cloud/blog/post/2021/07/15/docker-compression/" target="_blank" rel="noreferrer">https://docs.erda.cloud/blog/post/2021/07/15/docker-compression/</a> dive 工具的使用</li><li><a href="https://juejin.cn/post/7074981052233711647" target="_blank" rel="noreferrer">https://juejin.cn/post/7074981052233711647</a> 基础镜像的选择</li><li><a href="https://zhuanlan.zhihu.com/p/161685245" target="_blank" rel="noreferrer">https://zhuanlan.zhihu.com/p/161685245</a> Run 指令合并</li></ul></blockquote><h2 id="docker-私有仓库" tabindex="-1">Docker 私有仓库 <a class="header-anchor" href="#docker-私有仓库" aria-label="Permalink to &quot;Docker 私有仓库&quot;">​</a></h2><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">run</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-d</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--name</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">registry</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-p</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">5000</span><span style="color:#9ECBFF;">:5000</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-v</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/srv/docker-registry:/var/lib/registry</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--restart=always</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">registry</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">run</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-d</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--name</span><span style="color:#24292E;"> </span><span style="color:#032F62;">registry</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-p</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">5000</span><span style="color:#032F62;">:5000</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-v</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/srv/docker-registry:/var/lib/registry</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--restart=always</span><span style="color:#24292E;"> </span><span style="color:#032F62;">registry</span></span></code></pre></div><p><strong>配置非 https 仓库地址</strong></p><p>编辑 <code>/etc/docker/daemon.json</code></p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;insecure-registries&quot;</span><span style="color:#E1E4E8;">: [</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;&lt;your-registry-host&gt;:&lt;your-registry-port&gt;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;insecure-registries&quot;</span><span style="color:#24292E;">: [</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;&lt;your-registry-host&gt;:&lt;your-registry-port&gt;&quot;</span></span>
<span class="line"><span style="color:#24292E;">  ]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p><strong>镜像发布</strong></p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">tag</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ubuntu:latest</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">127.0</span><span style="color:#9ECBFF;">.0.1:5000/ubuntu:latest</span></span>
<span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">push</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">127.0</span><span style="color:#9ECBFF;">.0.1:5000/ubuntu:latest</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">tag</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ubuntu:latest</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">127.0</span><span style="color:#032F62;">.0.1:5000/ubuntu:latest</span></span>
<span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">push</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">127.0</span><span style="color:#032F62;">.0.1:5000/ubuntu:latest</span></span></code></pre></div><p><strong>查看仓库中的镜像</strong></p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> curl 127.0.0.1:5000/v2/_catalog</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span><span style="color:#B392F0;">&quot;repositories&quot;</span><span style="color:#79B8FF;">:</span><span style="color:#E1E4E8;">[</span><span style="color:#B392F0;">&quot;&quot;</span><span style="color:#B392F0;">]}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> curl 127.0.0.1:5000/v2/_catalog</span></span>
<span class="line"><span style="color:#24292E;">{</span><span style="color:#6F42C1;">&quot;repositories&quot;</span><span style="color:#005CC5;">:</span><span style="color:#24292E;">[</span><span style="color:#6F42C1;">&quot;&quot;</span><span style="color:#6F42C1;">]}</span></span></code></pre></div>`,43),e=[o];function c(t,r,E,y,i,d){return a(),n("div",null,e)}const m=s(p,[["render",c]]);export{u as __pageData,m as default};
