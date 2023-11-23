import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.b41230ea.js";const h=JSON.parse('{"title":"Node.js","description":"Node.js 笔记","frontmatter":{"description":"Node.js 笔记","tag":["前端"]},"headers":[],"relativePath":"posts/fe/Node.js/Node.js.md","filePath":"posts/fe/Node.js/Node.js.md","lastUpdated":1700722898000}'),p={name:"posts/fe/Node.js/Node.js.md"},o=l(`<h1 id="node-js" tabindex="-1">Node.js <a class="header-anchor" href="#node-js" aria-label="Permalink to &quot;Node.js&quot;">​</a></h1><h2 id="开始" tabindex="-1">开始 <a class="header-anchor" href="#开始" aria-label="Permalink to &quot;开始&quot;">​</a></h2><h3 id="安装" tabindex="-1">安装 <a class="header-anchor" href="#安装" aria-label="Permalink to &quot;安装&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 安装</span></span>
<span class="line"><span style="color:#6A737D;"># 在存储依赖包的目录下新建文件夹</span></span>
<span class="line"><span style="color:#B392F0;">node_cache</span></span>
<span class="line"><span style="color:#B392F0;">node_global</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 查看global配置目录</span></span>
<span class="line"><span style="color:#6A737D;"># 设置cache和global目录</span></span>
<span class="line"><span style="color:#B392F0;">npm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">config</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">set</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">prefix</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;xxx/node_global&quot;</span></span>
<span class="line"><span style="color:#B392F0;">npm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">root</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-g</span></span>
<span class="line"><span style="color:#B392F0;">npm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">config</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">set</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">cache</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;xxx/node_cache&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># path 配置</span></span>
<span class="line"><span style="color:#B392F0;">NODE_PATH</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">xxx/node_global/node_modules</span></span>
<span class="line"><span style="color:#B392F0;">Path</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">xxx/node_global</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 查看配置</span></span>
<span class="line"><span style="color:#B392F0;">npm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">config</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">list</span></span>
<span class="line"><span style="color:#6A737D;"># 配置镜像站</span></span>
<span class="line"><span style="color:#B392F0;">npm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">config</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">set</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">registry=http://registry.npm.taobao.org</span></span>
<span class="line"><span style="color:#6A737D;"># 检查镜像站是否正常</span></span>
<span class="line"><span style="color:#B392F0;">npm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">config</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">get</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">registry</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 安装</span></span>
<span class="line"><span style="color:#6A737D;"># 在存储依赖包的目录下新建文件夹</span></span>
<span class="line"><span style="color:#6F42C1;">node_cache</span></span>
<span class="line"><span style="color:#6F42C1;">node_global</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 查看global配置目录</span></span>
<span class="line"><span style="color:#6A737D;"># 设置cache和global目录</span></span>
<span class="line"><span style="color:#6F42C1;">npm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">config</span><span style="color:#24292E;"> </span><span style="color:#032F62;">set</span><span style="color:#24292E;"> </span><span style="color:#032F62;">prefix</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;xxx/node_global&quot;</span></span>
<span class="line"><span style="color:#6F42C1;">npm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">root</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-g</span></span>
<span class="line"><span style="color:#6F42C1;">npm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">config</span><span style="color:#24292E;"> </span><span style="color:#032F62;">set</span><span style="color:#24292E;"> </span><span style="color:#032F62;">cache</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;xxx/node_cache&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># path 配置</span></span>
<span class="line"><span style="color:#6F42C1;">NODE_PATH</span><span style="color:#24292E;"> </span><span style="color:#032F62;">xxx/node_global/node_modules</span></span>
<span class="line"><span style="color:#6F42C1;">Path</span><span style="color:#24292E;"> </span><span style="color:#032F62;">xxx/node_global</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 查看配置</span></span>
<span class="line"><span style="color:#6F42C1;">npm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">config</span><span style="color:#24292E;"> </span><span style="color:#032F62;">list</span></span>
<span class="line"><span style="color:#6A737D;"># 配置镜像站</span></span>
<span class="line"><span style="color:#6F42C1;">npm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">config</span><span style="color:#24292E;"> </span><span style="color:#032F62;">set</span><span style="color:#24292E;"> </span><span style="color:#032F62;">registry=http://registry.npm.taobao.org</span></span>
<span class="line"><span style="color:#6A737D;"># 检查镜像站是否正常</span></span>
<span class="line"><span style="color:#6F42C1;">npm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">config</span><span style="color:#24292E;"> </span><span style="color:#032F62;">get</span><span style="color:#24292E;"> </span><span style="color:#032F62;">registry</span></span></code></pre></div><h3 id="使用" tabindex="-1">使用 <a class="header-anchor" href="#使用" aria-label="Permalink to &quot;使用&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 查看已安装的依赖包</span></span>
<span class="line"><span style="color:#B392F0;">npm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">list</span></span>
<span class="line"><span style="color:#B392F0;">npm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">list</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-g</span></span>
<span class="line"><span style="color:#B392F0;">npm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">list</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--depth=0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 安装依赖</span></span>
<span class="line"><span style="color:#6A737D;"># 下载到当前目录</span></span>
<span class="line"><span style="color:#6A737D;"># -S 项目运行时使用</span></span>
<span class="line"><span style="color:#6A737D;"># -D 开发中使用</span></span>
<span class="line"><span style="color:#6A737D;"># -g 全局安装</span></span>
<span class="line"><span style="color:#B392F0;">npm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">install</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-S</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-D</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-g</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">package-name@version</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 卸载依赖</span></span>
<span class="line"><span style="color:#B392F0;">npm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">uninstall</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">package-name@version</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 查看已安装的依赖包</span></span>
<span class="line"><span style="color:#6F42C1;">npm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">list</span></span>
<span class="line"><span style="color:#6F42C1;">npm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">list</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-g</span></span>
<span class="line"><span style="color:#6F42C1;">npm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">list</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--depth=0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 安装依赖</span></span>
<span class="line"><span style="color:#6A737D;"># 下载到当前目录</span></span>
<span class="line"><span style="color:#6A737D;"># -S 项目运行时使用</span></span>
<span class="line"><span style="color:#6A737D;"># -D 开发中使用</span></span>
<span class="line"><span style="color:#6A737D;"># -g 全局安装</span></span>
<span class="line"><span style="color:#6F42C1;">npm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">install</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-S</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-D</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-g</span><span style="color:#24292E;"> </span><span style="color:#032F62;">package-name@version</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 卸载依赖</span></span>
<span class="line"><span style="color:#6F42C1;">npm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">uninstall</span><span style="color:#24292E;"> </span><span style="color:#032F62;">package-name@version</span></span></code></pre></div><h2 id="参考" tabindex="-1">参考 <a class="header-anchor" href="#参考" aria-label="Permalink to &quot;参考&quot;">​</a></h2><p><a href="https://blog.csdn.net/qq_27603235/article/details/79022580" target="_blank" rel="noreferrer">Node.js 解压版配置</a></p><p><a href="https://www.jianshu.com/p/115594f64b41" target="_blank" rel="noreferrer">设置npm镜像为cnpm</a></p>`,9),e=[o];function c(t,r,y,i,E,F){return n(),a("div",null,e)}const g=s(p,[["render",c]]);export{h as __pageData,g as default};
