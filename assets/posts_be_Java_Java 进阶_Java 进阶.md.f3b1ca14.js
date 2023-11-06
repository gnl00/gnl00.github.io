import{_ as s,o as a,c as n,Q as p}from"./chunks/framework.519d889f.js";const u=JSON.parse('{"title":"Java 进阶","description":"Java 进阶内容，包括: SPI、JNDI","frontmatter":{"description":"Java 进阶内容，包括: SPI、JNDI","tag":["Java","后端"]},"headers":[],"relativePath":"posts/be/Java/Java 进阶/Java 进阶.md","filePath":"posts/be/Java/Java 进阶/Java 进阶.md","lastUpdated":1699262313000}'),l={name:"posts/be/Java/Java 进阶/Java 进阶.md"},o=p(`<h1 id="java-进阶" tabindex="-1">Java 进阶 <a class="header-anchor" href="#java-进阶" aria-label="Permalink to &quot;Java 进阶&quot;">​</a></h1><h2 id="spi" tabindex="-1">SPI <a class="header-anchor" href="#spi" aria-label="Permalink to &quot;SPI&quot;">​</a></h2><p><strong>是什么</strong></p><p>SPI 全称 Service Provider Interface 服务提供接口。以数据库访问接口为例，Java 定义了访问接口 <code>java.sql.Driver</code> ，并规定了常用的方法。因为存在如 MySQL/PostGreSQL 等不同的数据库，其中数据库连接操作的实现不同的，Java 管不过来那么多实现。</p><p>所以 Java 说，我把 <code>java.sql.Driver</code> 接口暴露来，让你们外部各种各样的数据库们（也就是服务提供者）自己来实现，实现类必须带一个无参构造方法；之后在 <code>classpath:META-INF/services</code> 目录下，名字为 <code>java.sql.Driver</code> 的文件，将实现类的全限定类名保存在里面。</p><p>当服务调用者需要访问数据库的时候，不关心连接具体是如何实现的。只需要导入对应的 jar 包，Java 程序内部会利用 <code>java.util.ServiceLoader</code> 工具类从对应的位置加载到对应的数据库实现类。</p><p>如果想连接 MySQL 数据库，通过 <code>DriverManager</code> 加载 MySQL 的驱动，即可调用 <code>java.sql.Driver</code> 接口的对应方法。其中，<code>DriverManager</code> 内部使用的就是 <code>java.util.ServiceLoader</code> 来加载 MySQL 驱动实现类。之后如果想换成别的数据库，只需要将 jar 包替换即可，内部代码无需做大改动。</p><p>在上面的例子中存在着 3 个角色，服务接口定义（Java），服务提供者（各种数据库），服务调用者（客户端），SPI 的实现和使用就是围绕这三者展开的。</p><p><strong>SPI 和 API 的区别</strong></p><ul><li><p>和 SPI 不同，SPI 是接口的定义和实现分开进行的，API 则是接口的定义和实现捆绑在一起的；</p></li><li><p>使用 SPI 的需要客户端加载对应的实现，而调用 API 服务则不需要。</p></li></ul><p><strong>How to use</strong></p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">CusDriver</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">load</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">CusDriverMySQL</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">implements</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">CusDriver</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">load</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;MySQL driver loaded&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">CusDriverPgSQL</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">implements</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">CusDriver</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">load</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;PgSQL driver loaded&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// META-INF/spi.CusDriver</span></span>
<span class="line"><span style="color:#E1E4E8;">spi.CusDriverMySQL</span></span>
<span class="line"><span style="color:#E1E4E8;">spi.CusDriverPgSQL</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">SPITest</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] </span><span style="color:#FFAB70;">args</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        ServiceLoader&lt;</span><span style="color:#F97583;">CusDriver</span><span style="color:#E1E4E8;">&gt; serviceLoader </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> ServiceLoader.</span><span style="color:#B392F0;">load</span><span style="color:#E1E4E8;">(CusDriver.class);</span></span>
<span class="line"><span style="color:#E1E4E8;">        Iterator&lt;</span><span style="color:#F97583;">CusDriver</span><span style="color:#E1E4E8;">&gt; iterator </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> serviceLoader.</span><span style="color:#B392F0;">iterator</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> (iterator.</span><span style="color:#B392F0;">hasNext</span><span style="color:#E1E4E8;">()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(iterator.</span><span style="color:#B392F0;">next</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">CusDriver</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">load</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">CusDriverMySQL</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">implements</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">CusDriver</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">load</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;MySQL driver loaded&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">CusDriverPgSQL</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">implements</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">CusDriver</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">load</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;PgSQL driver loaded&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// META-INF/spi.CusDriver</span></span>
<span class="line"><span style="color:#24292E;">spi.CusDriverMySQL</span></span>
<span class="line"><span style="color:#24292E;">spi.CusDriverPgSQL</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">SPITest</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] </span><span style="color:#E36209;">args</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        ServiceLoader&lt;</span><span style="color:#D73A49;">CusDriver</span><span style="color:#24292E;">&gt; serviceLoader </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> ServiceLoader.</span><span style="color:#6F42C1;">load</span><span style="color:#24292E;">(CusDriver.class);</span></span>
<span class="line"><span style="color:#24292E;">        Iterator&lt;</span><span style="color:#D73A49;">CusDriver</span><span style="color:#24292E;">&gt; iterator </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> serviceLoader.</span><span style="color:#6F42C1;">iterator</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">while</span><span style="color:#24292E;"> (iterator.</span><span style="color:#6F42C1;">hasNext</span><span style="color:#24292E;">()) {</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(iterator.</span><span style="color:#6F42C1;">next</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><br><h2 id="jndi" tabindex="-1">JNDI <a class="header-anchor" href="#jndi" aria-label="Permalink to &quot;JNDI&quot;">​</a></h2><p><strong>是什么</strong></p><p>JNDI（Java Naming and Directory Interface），即 Java 命名服务和目录接口。是 Java 的一个标准 API，用于管理和访问各种命名和目录服务。</p><blockquote><p>首先明确一点：JNDI 是一套 Java 提供的 API。</p></blockquote><p>它允许 Java 应用程序使用统一的方式来访问不同的命名和目录服务，无论这些服务是基于文件、LDAP（轻量级目录访问协议）、DNS（域名系统）还是其他协议实现的。</p><p>举个例子，假设有一个 Web 应用程序，需要使用一个数据库。通常情况下，需要在应用程序代码中指定数据库连接信息，如主机名、端口号、用户名和密码等。但是这种做法有一些缺点，比如数据库连接信息可能会因为环境的变化而需要修改，如果连接信息写死在代码中，则每次修改连接信息都需要重新编译和部署应用程序。</p><p>JNDI 提供了一种更加灵活和可配置的方式来解决这个问题。你可以将数据库连接信息存储在 JNDI 命名空间中，应用程序只需要从 JNDI 中获取连接信息即可，无需知道连接信息的具体细节。</p><p>总的来说，JNDI 是 Java 平台的一个标准 API，提供了一种通用的、统一的方式来访问各种命名和目录服务。它可以将应用程序与特定的命名和目录服务的实现分离开来，提高应用程序的灵活性和可配置性。</p><br><p>假设有一个 Java 应用程序，需要访问一个名为 &quot;jdbc/mydb&quot; 的数据库连接池。可以先在 Web 服务器上配置这个连接池，然后在应用程序中使用 JNDI 查找这个连接池，从而获得连接池的引用。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 获取 JNDI 上下文</span></span>
<span class="line"><span style="color:#E1E4E8;">Context initCtx </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">InitialContext</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 查找数据库连接池</span></span>
<span class="line"><span style="color:#E1E4E8;">DataSource dataSource </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (DataSource) initCtx.</span><span style="color:#B392F0;">lookup</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;java:comp/env/jdbc/mydb&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 获取数据库连接</span></span>
<span class="line"><span style="color:#E1E4E8;">Connection connection </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> dataSource.</span><span style="color:#B392F0;">getConnection</span><span style="color:#E1E4E8;">();</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 获取 JNDI 上下文</span></span>
<span class="line"><span style="color:#24292E;">Context initCtx </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">InitialContext</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 查找数据库连接池</span></span>
<span class="line"><span style="color:#24292E;">DataSource dataSource </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (DataSource) initCtx.</span><span style="color:#6F42C1;">lookup</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;java:comp/env/jdbc/mydb&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 获取数据库连接</span></span>
<span class="line"><span style="color:#24292E;">Connection connection </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> dataSource.</span><span style="color:#6F42C1;">getConnection</span><span style="color:#24292E;">();</span></span></code></pre></div><p>在上面的示例中，首先获取了 JNDI 上下文，然后使用 <code>lookup</code> 方法查找名为 &quot;java:comp/env/jdbc/mydb&quot; 的对象，也就是预先在 Web 服务器上配置好的数据库连接池。最后，使用连接池获取了一个数据库连接。</p><p>在查找 JNDI 对象时，需要指定一个 JNDI 名称，这个名称通常是由 &quot;java:&quot; 前缀和一个特定的名称空间组成。在上面的示例中，&quot;comp/env&quot; 是 Web 应用程序的默认名称空间，&quot;jdbc/mydb&quot; 是配置的 JNDI 名称。</p><br><h2 id="参考" tabindex="-1">参考 <a class="header-anchor" href="#参考" aria-label="Permalink to &quot;参考&quot;">​</a></h2><p><a href="https://zhuanlan.zhihu.com/p/28909673" target="_blank" rel="noreferrer">Java SPI思想梳理</a></p>`,29),e=[o];function t(c,r,E,y,i,d){return a(),n("div",null,e)}const D=s(l,[["render",t]]);export{u as __pageData,D as default};
