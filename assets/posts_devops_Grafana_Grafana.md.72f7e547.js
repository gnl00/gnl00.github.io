import{_ as s,o as a,c as n,Q as l}from"./chunks/framework.519d889f.js";const p="/assets/image-20231024171116053.0a63a1bd.png",o="/assets/image-20231024171139054.fee965eb.png",e="/assets/image-20231024171344216.c389609c.png",F=JSON.parse('{"title":"Grafana","description":"Grafana 监控搭建","frontmatter":{"description":"Grafana 监控搭建","top":2,"tag":["Grafana","DevOps"]},"headers":[],"relativePath":"posts/devops/Grafana/Grafana.md","filePath":"posts/devops/Grafana/Grafana.md","lastUpdated":1699262313000}'),t={name:"posts/devops/Grafana/Grafana.md"},r=l(`<h1 id="grafana" tabindex="-1">Grafana <a class="header-anchor" href="#grafana" aria-label="Permalink to &quot;Grafana&quot;">​</a></h1><h2 id="服务监控" tabindex="-1">服务监控 <a class="header-anchor" href="#服务监控" aria-label="Permalink to &quot;服务监控&quot;">​</a></h2><h3 id="prometheus" tabindex="-1">Prometheus <a class="header-anchor" href="#prometheus" aria-label="Permalink to &quot;Prometheus&quot;">​</a></h3><p>1、安装 Prometheus</p><p>1.1、创建配置 <code>/etc/prometheus.yaml</code></p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># my global config</span></span>
<span class="line"><span style="color:#85E89D;">global</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">scrape_interval</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">15s</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;"># Set the scrape interval to every 15 seconds. Default is every 1 minute.</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">evaluation_interval</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">15s</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;"># Evaluate rules every 15 seconds. The default is every 1 minute.</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># scrape_timeout is set to the global default (10s).</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Alertmanager configuration</span></span>
<span class="line"><span style="color:#85E89D;">alerting</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">alertmanagers</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    - </span><span style="color:#85E89D;">static_configs</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        - </span><span style="color:#85E89D;">targets</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#6A737D;"># - alertmanager:9093</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Load rules once and periodically evaluate them according to the global &#39;evaluation_interval&#39;.</span></span>
<span class="line"><span style="color:#85E89D;">rule_files</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># - &quot;first_rules.yml&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># - &quot;second_rules.yml&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># A scrape configuration containing exactly one endpoint to scrape:</span></span>
<span class="line"><span style="color:#6A737D;"># Here it&#39;s Prometheus itself.</span></span>
<span class="line"><span style="color:#85E89D;">scrape_configs</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># The job name is added as a label \`job=&lt;job_name&gt;\` to any timeseries scraped from this config.</span></span>
<span class="line"><span style="color:#E1E4E8;">  - </span><span style="color:#85E89D;">job_name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;prometheus&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># metrics_path defaults to &#39;/metrics&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># scheme defaults to &#39;http&#39;.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">static_configs</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">targets</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;192.168.2.203:9990&quot;</span><span style="color:#E1E4E8;">]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># my global config</span></span>
<span class="line"><span style="color:#22863A;">global</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">scrape_interval</span><span style="color:#24292E;">: </span><span style="color:#032F62;">15s</span><span style="color:#24292E;"> </span><span style="color:#6A737D;"># Set the scrape interval to every 15 seconds. Default is every 1 minute.</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">evaluation_interval</span><span style="color:#24292E;">: </span><span style="color:#032F62;">15s</span><span style="color:#24292E;"> </span><span style="color:#6A737D;"># Evaluate rules every 15 seconds. The default is every 1 minute.</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># scrape_timeout is set to the global default (10s).</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Alertmanager configuration</span></span>
<span class="line"><span style="color:#22863A;">alerting</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">alertmanagers</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    - </span><span style="color:#22863A;">static_configs</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        - </span><span style="color:#22863A;">targets</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6A737D;"># - alertmanager:9093</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Load rules once and periodically evaluate them according to the global &#39;evaluation_interval&#39;.</span></span>
<span class="line"><span style="color:#22863A;">rule_files</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># - &quot;first_rules.yml&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># - &quot;second_rules.yml&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># A scrape configuration containing exactly one endpoint to scrape:</span></span>
<span class="line"><span style="color:#6A737D;"># Here it&#39;s Prometheus itself.</span></span>
<span class="line"><span style="color:#22863A;">scrape_configs</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># The job name is added as a label \`job=&lt;job_name&gt;\` to any timeseries scraped from this config.</span></span>
<span class="line"><span style="color:#24292E;">  - </span><span style="color:#22863A;">job_name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;prometheus&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># metrics_path defaults to &#39;/metrics&#39;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># scheme defaults to &#39;http&#39;.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">static_configs</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">targets</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;192.168.2.203:9990&quot;</span><span style="color:#24292E;">]</span></span></code></pre></div><p>1.2、<a href="https://prometheus.io/docs/prometheus/latest/installation/" target="_blank" rel="noreferrer">Docker 安装</a></p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">run</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">-p</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">9990</span><span style="color:#9ECBFF;">:9090</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">-v</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/path/to/prometheus.yml:/etc/prometheus/prometheus.yml</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">prom/prometheus</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">run</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">-p</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">9990</span><span style="color:#032F62;">:9090</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">-v</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/path/to/prometheus.yml:/etc/prometheus/prometheus.yml</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">prom/prometheus</span></span></code></pre></div><p>可以通过 <code>http://localhost:9990</code> 来检查服务状态。</p><p>Prometheus 只是一个时序数据库，作为数据源用来保存监控信息。需要配合各种 exporter 来获取到对应的平台/软件/监控信息。</p><h3 id="node-exporter" tabindex="-1">Node Exporter <a class="header-anchor" href="#node-exporter" aria-label="Permalink to &quot;Node Exporter&quot;">​</a></h3><p>2、安装启动 <a href="https://github.com/prometheus/node_exporter" target="_blank" rel="noreferrer">node_exporter</a> 进行 Linux 服务器监控</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">run</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--name=node-exporter</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-p</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">9100</span><span style="color:#9ECBFF;">:9100</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-d</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--net=</span><span style="color:#9ECBFF;">&quot;host&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--pid=</span><span style="color:#9ECBFF;">&quot;host&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">-v</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;/:/host:ro,rslave&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">quay.io/prometheus/node-exporter:latest</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--path.rootfs=/host</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">run</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--name=node-exporter</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-p</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">9100</span><span style="color:#032F62;">:9100</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-d</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">--net=</span><span style="color:#032F62;">&quot;host&quot;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">--pid=</span><span style="color:#032F62;">&quot;host&quot;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">-v</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;/:/host:ro,rslave&quot;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">quay.io/prometheus/node-exporter:latest</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">--path.rootfs=/host</span></span></code></pre></div><p>访问 <code>&lt;ip&gt;:9100</code> 检查 node_exporter 是否启动成功。</p><p>…</p><p>3、使用 Prometheus 收集 node_exporter 数据，修改配置</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">scrape_configs</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># The job name is added as a label \`job=&lt;job_name&gt;\` to any timeseries scraped from this config.</span></span>
<span class="line"><span style="color:#E1E4E8;">  - </span><span style="color:#85E89D;">job_name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;linux_monitor&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># metrics_path defaults to &#39;/metrics&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># scheme defaults to &#39;http&#39;.</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">static_configs</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">targets</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;192.168.2.203:9100&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;192.168.2.230:9100&quot;</span><span style="color:#E1E4E8;">]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">scrape_configs</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># The job name is added as a label \`job=&lt;job_name&gt;\` to any timeseries scraped from this config.</span></span>
<span class="line"><span style="color:#24292E;">  - </span><span style="color:#22863A;">job_name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;linux_monitor&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># metrics_path defaults to &#39;/metrics&#39;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># scheme defaults to &#39;http&#39;.</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">static_configs</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">targets</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;192.168.2.203:9100&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;192.168.2.230:9100&quot;</span><span style="color:#24292E;">]</span></span></code></pre></div><h3 id="grafana-1" tabindex="-1">Grafana <a class="header-anchor" href="#grafana-1" aria-label="Permalink to &quot;Grafana&quot;">​</a></h3><p>4、安装 <a href="https://grafana.com/docs/grafana/latest/setup-grafana/installation/docker/" target="_blank" rel="noreferrer">Grafana</a>，作为监控面板。启动并访问，初始用户名密码为 <code>admin/admin</code></p><p>5、使用 Grafana 添加 Prometheus 数据源</p><p><img src="`+p+'" alt="image-20231024171116053"></p><p><img src="'+o+'" alt="image-20231024171139054"></p><p>编辑完连接信息点击保存。</p><p>6、导入 Dashboard 模板</p><p><img src="'+e+`" alt="image-20231024171344216"></p><p>Linux 服务器可以选择：8919 或者 12633，可以<a href="https://grafana.com/grafana/dashboards/" target="_blank" rel="noreferrer">选择自己喜欢的模板</a></p><h3 id="postgresql-exporter" tabindex="-1">PostgreSQL Exporter <a class="header-anchor" href="#postgresql-exporter" aria-label="Permalink to &quot;PostgreSQL Exporter&quot;">​</a></h3><p>7、添加 <a href="https://github.com/prometheus-community/postgres_exporter" target="_blank" rel="noreferrer">postgresql_exporter</a></p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">run</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--name=pg-exporter</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-d</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--net=host</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-p</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">9187</span><span style="color:#9ECBFF;">:9187</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-e</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">DATA_SOURCE_NAME=&quot;postgresql://root:pg.ldzl@192.168.2.200:5432/ldzl_rt?sslmode=disable&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">quay.io/prometheuscommunity/postgres-exporter</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">run</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--name=pg-exporter</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-d</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--net=host</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-p</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">9187</span><span style="color:#032F62;">:9187</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-e</span><span style="color:#24292E;"> </span><span style="color:#032F62;">DATA_SOURCE_NAME=&quot;postgresql://root:pg.ldzl@192.168.2.200:5432/ldzl_rt?sslmode=disable&quot;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">quay.io/prometheuscommunity/postgres-exporter</span></span></code></pre></div><p>访问 <code>localhost:9187</code> 无误，添加到 <code>prometheus.yaml</code>。</p><h3 id="patroni" tabindex="-1">Patroni <a class="header-anchor" href="#patroni" aria-label="Permalink to &quot;Patroni&quot;">​</a></h3><p>8、添加 Patroni 监控。</p><p>因为 Patroni 本身提供了 REST API 来监控状态，因此不需要额外安装 exporter。只需要将 REST API 路径配置在 Prometheus 配置文件中即可。</p><p>patroni.yml</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">restapi</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">listen</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">0.0.0.0:8890</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">connect_address</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">192.168.2.230:8890</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">restapi</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">listen</span><span style="color:#24292E;">: </span><span style="color:#032F62;">0.0.0.0:8890</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">connect_address</span><span style="color:#24292E;">: </span><span style="color:#032F62;">192.168.2.230:8890</span></span></code></pre></div><p>prometheus.yml</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">scrape_configs</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># The job name is added as a label \`job=&lt;job_name&gt;\` to any timeseries scraped from this config.</span></span>
<span class="line"><span style="color:#E1E4E8;">  - </span><span style="color:#85E89D;">job_name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;patroni_monitor&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># metrics_path defaults to &#39;/metrics&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># scheme defaults to &#39;http&#39;.</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">static_configs</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#85E89D;">targets</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;192.168.2.203:8890&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;192.168.2.230:8890&quot;</span><span style="color:#E1E4E8;">]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">scrape_configs</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># The job name is added as a label \`job=&lt;job_name&gt;\` to any timeseries scraped from this config.</span></span>
<span class="line"><span style="color:#24292E;">  - </span><span style="color:#22863A;">job_name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;patroni_monitor&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># metrics_path defaults to &#39;/metrics&#39;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># scheme defaults to &#39;http&#39;.</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">static_configs</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#22863A;">targets</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;192.168.2.203:8890&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;192.168.2.230:8890&quot;</span><span style="color:#24292E;">]</span></span></code></pre></div><p>在 Grafana 中添加 Patroni 模板。</p><h2 id="参考" tabindex="-1">参考 <a class="header-anchor" href="#参考" aria-label="Permalink to &quot;参考&quot;">​</a></h2><ul><li><a href="https://www.cnblogs.com/hong-fithing/p/14695803.html" target="_blank" rel="noreferrer">https://www.cnblogs.com/hong-fithing/p/14695803.html</a></li><li><a href="https://www.modb.pro/db/154937" target="_blank" rel="noreferrer">https://www.modb.pro/db/154937</a></li></ul>`,40),c=[r];function y(E,i,d,h,u,m){return a(),n("div",null,c)}const f=s(t,[["render",y]]);export{F as __pageData,f as default};
