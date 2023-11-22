import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.b41230ea.js";const p="/assets/bean创建流程.ae169a58.png",o="/assets/image-20200505171612265.12893bb9.png",g=JSON.parse('{"title":"Spring","description":"Spring IOC&DI","frontmatter":{"description":"Spring IOC&DI","tag":["Spring","后端"]},"headers":[],"relativePath":"posts/be/Spring/IOC&DI/IOC&DI.md","filePath":"posts/be/Spring/IOC&DI/IOC&DI.md","lastUpdated":1700657743000}'),e={name:"posts/be/Spring/IOC&DI/IOC&DI.md"},t=l(`<h1 id="spring" tabindex="-1">Spring <a class="header-anchor" href="#spring" aria-label="Permalink to &quot;Spring&quot;">​</a></h1><h2 id="ioc" tabindex="-1">IOC <a class="header-anchor" href="#ioc" aria-label="Permalink to &quot;IOC&quot;">​</a></h2><p><strong>IOC的底层实际上是很多个不同的 map，BeanFacroty 负责创建 bean，之后存到相应的 map 中，下次再需要某个 bean 时，直接从 map 中获取即可。</strong></p><p>例如，单例非懒加载的 bean 在第一次创建完成之后都存储在同一个类型为 CurrentHashMap 的 map 中交由 spring 管理，之后每次需要只要从 map 中获取即可。</p><p>默认加在 IOC 容器的组件，容器启动的时候就会调用无参构造器创建对象，再进行初始化赋值等操作。</p><h3 id="xml配置" tabindex="-1">XML配置 <a class="header-anchor" href="#xml配置" aria-label="Permalink to &quot;XML配置&quot;">​</a></h3><h4 id="context-annotation-config" tabindex="-1">context:annotation-config <a class="header-anchor" href="#context-annotation-config" aria-label="Permalink to &quot;context:annotation-config&quot;">​</a></h4><p><strong>&lt; context:annotation-config&gt; 是用于激活那些已经在spring容器里注册过的bean上面的注解</strong>。并且使用&lt;context:annotation- config/&gt;即隐式地向 Spring容器注册<code>AutowiredAnnotationBeanPostProcessor</code>、<code>RequiredAnnotationBeanPostProcessor</code>、<code>CommonAnnotationBeanPostProcessor</code>以及<code>PersistenceAnnotationBeanPostProcessor</code>、<code>ConfigurationClassPostProcessor</code>这5个BeanPostProcessor。注册这5个BeanPostProcessor的作用，就是<strong>为了让你的系统能够识别相应的注解</strong>（@Required、@Autowired、@PostConstruct,、@PreDestroy and @Resource）。BeanPostProcessor就是处理注解的处理器。</p><p><strong>&lt; context:annotation-config &gt;仅能够在已经在已经注册过的bean上面起作用。对于没有在spring容器中注册的bean，它并不能执行任何操作。</strong></p><h4 id="context-component-scan" tabindex="-1">context:component-scan <a class="header-anchor" href="#context-component-scan" aria-label="Permalink to &quot;context:component-scan&quot;">​</a></h4><p><strong>&lt; context:annotation-config &gt;的简化配置</strong></p><p>除了<strong>具有&lt; context:annotation-config &gt;的功能</strong>之外，&lt; context:component-scan &gt;还可以在指定的package下扫描以及注册java bean 。还<strong>具有自动将带有@component，@service，@Repository等注解的对象注册到spring容器中的功能。</strong></p><p><strong>因此当使用 context:component-scan 后，就可以将 context:annotation-config移除。</strong></p><h3 id="注解配置" tabindex="-1">注解配置 <a class="header-anchor" href="#注解配置" aria-label="Permalink to &quot;注解配置&quot;">​</a></h3><p><strong>在配置类上标注@Configuration注解即可</strong></p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">* 配置类 == 以前的xml配置</span></span>
<span class="line"><span style="color:#6A737D;">* */</span></span>
<span class="line"><span style="color:#6A737D;">//告诉spring这是一个配置类</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Configuration</span></span>
<span class="line"><span style="color:#6A737D;">/*配置包扫描 == component-scan</span></span>
<span class="line"><span style="color:#6A737D;">Filter[] includeFilters 扫描时只要扫描哪些被包含在内的组件</span></span>
<span class="line"><span style="color:#6A737D;">excludeFilters = Filter[] 扫描的时候要排除哪些注解组件，配置内容和xml文件一致</span></span>
<span class="line"><span style="color:#6A737D;">@ComponentScan(value = &quot;com.demo.spring&quot;,excludeFilters = {</span></span>
<span class="line"><span style="color:#6A737D;">        @ComponentScan.Filter(type = FilterType.ANNOTATION,classes = {</span></span>
<span class="line"><span style="color:#6A737D;">                Controller.class, Service.class</span></span>
<span class="line"><span style="color:#6A737D;">        })</span></span>
<span class="line"><span style="color:#6A737D;">})*/</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">ComponentScan</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">basePackages</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;com.demo.spring&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">MainConfig</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">    * 给容器中注册组件：</span></span>
<span class="line"><span style="color:#6A737D;">    *   1）、包扫描+组件标注解【自己写的类】</span></span>
<span class="line"><span style="color:#6A737D;">    *   2）、@Bean【导入第三方包里的组件】</span></span>
<span class="line"><span style="color:#6A737D;">    *   3）、@Import【快速给容器中注册组件】</span></span>
<span class="line"><span style="color:#6A737D;">    *       1）、@Import({要导入到容器中的组件})；@Import({Color.class})容器中就会自动注册这个					组件，id默认是全类名</span></span>
<span class="line"><span style="color:#6A737D;">    *       2）、实现ImportSelector接口，返回需要导入的组件的全类名数组；</span></span>
<span class="line"><span style="color:#6A737D;">    *       3）、实现ImportBeanDefinitionRegistrar接口，手动注册bean</span></span>
<span class="line"><span style="color:#6A737D;">    *   4）、使用Spring提供的FactoryBean</span></span>
<span class="line"><span style="color:#6A737D;">    *       1）、默认获取到的是FactoryBean调用getObject创建的对像</span></span>
<span class="line"><span style="color:#6A737D;">    *               获取FactoryBean创建的bean对象</span></span>
<span class="line"><span style="color:#6A737D;">                    Object o = applicationContext.getBean(&quot;colorFactoryBean&quot;);</span></span>
<span class="line"><span style="color:#6A737D;">    *       2）、要获取FactoryBean本身需要给id前面加一个&amp;colorFactoryBean</span></span>
<span class="line"><span style="color:#6A737D;">    */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Bean</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> ColorFactoryBean </span><span style="color:#B392F0;">colorFactoryBean</span><span style="color:#E1E4E8;">(){</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ColorFactoryBean</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">* 配置类 == 以前的xml配置</span></span>
<span class="line"><span style="color:#6A737D;">* */</span></span>
<span class="line"><span style="color:#6A737D;">//告诉spring这是一个配置类</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Configuration</span></span>
<span class="line"><span style="color:#6A737D;">/*配置包扫描 == component-scan</span></span>
<span class="line"><span style="color:#6A737D;">Filter[] includeFilters 扫描时只要扫描哪些被包含在内的组件</span></span>
<span class="line"><span style="color:#6A737D;">excludeFilters = Filter[] 扫描的时候要排除哪些注解组件，配置内容和xml文件一致</span></span>
<span class="line"><span style="color:#6A737D;">@ComponentScan(value = &quot;com.demo.spring&quot;,excludeFilters = {</span></span>
<span class="line"><span style="color:#6A737D;">        @ComponentScan.Filter(type = FilterType.ANNOTATION,classes = {</span></span>
<span class="line"><span style="color:#6A737D;">                Controller.class, Service.class</span></span>
<span class="line"><span style="color:#6A737D;">        })</span></span>
<span class="line"><span style="color:#6A737D;">})*/</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">ComponentScan</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">basePackages</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;com.demo.spring&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">MainConfig</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">    * 给容器中注册组件：</span></span>
<span class="line"><span style="color:#6A737D;">    *   1）、包扫描+组件标注解【自己写的类】</span></span>
<span class="line"><span style="color:#6A737D;">    *   2）、@Bean【导入第三方包里的组件】</span></span>
<span class="line"><span style="color:#6A737D;">    *   3）、@Import【快速给容器中注册组件】</span></span>
<span class="line"><span style="color:#6A737D;">    *       1）、@Import({要导入到容器中的组件})；@Import({Color.class})容器中就会自动注册这个					组件，id默认是全类名</span></span>
<span class="line"><span style="color:#6A737D;">    *       2）、实现ImportSelector接口，返回需要导入的组件的全类名数组；</span></span>
<span class="line"><span style="color:#6A737D;">    *       3）、实现ImportBeanDefinitionRegistrar接口，手动注册bean</span></span>
<span class="line"><span style="color:#6A737D;">    *   4）、使用Spring提供的FactoryBean</span></span>
<span class="line"><span style="color:#6A737D;">    *       1）、默认获取到的是FactoryBean调用getObject创建的对像</span></span>
<span class="line"><span style="color:#6A737D;">    *               获取FactoryBean创建的bean对象</span></span>
<span class="line"><span style="color:#6A737D;">                    Object o = applicationContext.getBean(&quot;colorFactoryBean&quot;);</span></span>
<span class="line"><span style="color:#6A737D;">    *       2）、要获取FactoryBean本身需要给id前面加一个&amp;colorFactoryBean</span></span>
<span class="line"><span style="color:#6A737D;">    */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Bean</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> ColorFactoryBean </span><span style="color:#6F42C1;">colorFactoryBean</span><span style="color:#24292E;">(){</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ColorFactoryBean</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="bean注册" tabindex="-1">Bean注册 <a class="header-anchor" href="#bean注册" aria-label="Permalink to &quot;Bean注册&quot;">​</a></h3><ol><li><p><strong>xml</strong></p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">bean id</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;person&quot;</span><span style="color:#E1E4E8;"> class</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;com.demo.spring.entity.Person&quot;</span><span style="color:#E1E4E8;"> scope</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;"> init</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">method</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;"> destroy</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">method</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">property name</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;"> value</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">/&gt;</span></span>
<span class="line"><span style="color:#F97583;">&lt;/</span><span style="color:#E1E4E8;">bean</span><span style="color:#F97583;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">bean id</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;person&quot;</span><span style="color:#24292E;"> class</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;com.demo.spring.entity.Person&quot;</span><span style="color:#24292E;"> scope</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;"> init</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">method</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;"> destroy</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">method</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">property name</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;"> value</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">/&gt;</span></span>
<span class="line"><span style="color:#D73A49;">&lt;/</span><span style="color:#24292E;">bean</span><span style="color:#D73A49;">&gt;</span></span></code></pre></div><p><strong>特点</strong></p><ul><li><p>IOC 会根据 xml 中 bean 配置的顺序创建 bean，bean 销毁的顺序和创建的顺序相反。</p><p>可以通过调整bean之间的依赖来控制bean创建的顺序。</p><blockquote><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">depends-on=&quot;ccc,bbb&quot;：表示aaa创建依赖ccc和bbb</span></span>
<span class="line"><span style="color:#E1E4E8;">创建顺序为ccc  -&gt;  bbb -&gt;  aaa</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">bean</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">id</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;aaa&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">depends-on</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;ccc,bbb&quot;</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#85E89D;">bean</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">bean</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">id</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;bbb&quot;</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#85E89D;">bean</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">bean</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">id</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;ccc&quot;</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#85E89D;">bean</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">depends-on=&quot;ccc,bbb&quot;：表示aaa创建依赖ccc和bbb</span></span>
<span class="line"><span style="color:#24292E;">创建顺序为ccc  -&gt;  bbb -&gt;  aaa</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">bean</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">id</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;aaa&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">depends-on</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;ccc,bbb&quot;</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#22863A;">bean</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">bean</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">id</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;bbb&quot;</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#22863A;">bean</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">bean</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">id</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;ccc&quot;</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#22863A;">bean</span><span style="color:#24292E;">&gt;</span></span></code></pre></div></blockquote></li><li><p>默认为单例，跟随着容器启动而创建并保存到IOC容器中。可以修改scope属性为单例或原型（多实例）。原型对象不随着容器的启动创建，直到获取对象的时候才会创建。任何时候获取到的单例对象都是同一个，任何时候获取多实例对象都会创建新对象。</p></li><li><p>bean的赋值</p><ul><li><p>Setter设置</p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">&lt;!-- property name=&quot;userDao&quot; 其中的属性名由getter/setter方法决定，即去掉get/set后的属性名 --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">property</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">name</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;userDao&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ref</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;userDao&quot;</span><span style="color:#E1E4E8;"> /&gt;</span></span>
<span class="line"><span style="color:#6A737D;">&lt;!--</span></span>
<span class="line"><span style="color:#6A737D;">    关于property标签的赋值</span></span>
<span class="line"><span style="color:#6A737D;">    设置null值</span></span>
<span class="line"><span style="color:#6A737D;">     &lt;property name=&quot;register&quot;&gt;</span></span>
<span class="line"><span style="color:#6A737D;">        &lt;null&gt;&lt;/null&gt;</span></span>
<span class="line"><span style="color:#6A737D;">    &lt;/property&gt;</span></span>
<span class="line"><span style="color:#6A737D;">    为关联对象赋值</span></span>
<span class="line"><span style="color:#6A737D;">      ①引用</span></span>
<span class="line"><span style="color:#6A737D;">     &lt;bean id=&quot;xxx&quot; class=&quot;xxx&quot;&gt;</span></span>
<span class="line"><span style="color:#6A737D;">        &lt;property /&gt;...</span></span>
<span class="line"><span style="color:#6A737D;">        &lt;property /&gt;...</span></span>
<span class="line"><span style="color:#6A737D;">     &lt;/bean&gt;</span></span>
<span class="line"><span style="color:#6A737D;">    &lt;property name=&quot;register&quot; ref=&quot;xxx&quot;&gt;&lt;/property&gt;</span></span>
<span class="line"><span style="color:#6A737D;">      ②在property内嵌套bean标签赋值</span></span>
<span class="line"><span style="color:#6A737D;">      &lt;property&gt;</span></span>
<span class="line"><span style="color:#6A737D;">      内部bean的id只能用作标识不能被引用，不能根据此id通过getBean创建对象</span></span>
<span class="line"><span style="color:#6A737D;">        &lt;bean id=&quot;xxx&quot; /&gt;</span></span>
<span class="line"><span style="color:#6A737D;">      &lt;/property&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">      级联赋值：为引用对象的属性赋值</span></span>
<span class="line"><span style="color:#6A737D;">      User中关联Car对象</span></span>
<span class="line"><span style="color:#6A737D;">      注意：级联赋值后原来的bean属性可能也会被修改</span></span>
<span class="line"><span style="color:#6A737D;">      &lt;property name=&quot;car.name&quot; value=&quot;xxx&quot;&gt;&lt;/property&gt;</span></span>
<span class="line"><span style="color:#6A737D;">--&gt;</span></span>
<span class="line"><span style="color:#6A737D;">&lt;!--关于bean的赋值</span></span>
<span class="line"><span style="color:#6A737D;">    为List&lt;Object&gt;赋值 ==》 为List赋值</span></span>
<span class="line"><span style="color:#6A737D;">    &lt;property&gt;</span></span>
<span class="line"><span style="color:#6A737D;">        &lt;list&gt;</span></span>
<span class="line"><span style="color:#6A737D;">            &lt;bean /&gt;</span></span>
<span class="line"><span style="color:#6A737D;">            &lt;ref /&gt;</span></span>
<span class="line"><span style="color:#6A737D;">        &lt;/list</span></span>
<span class="line"><span style="color:#6A737D;">    &lt;/property&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    为Map赋值</span></span>
<span class="line"><span style="color:#6A737D;">     &lt;property&gt;</span></span>
<span class="line"><span style="color:#6A737D;">        &lt;map&gt;</span></span>
<span class="line"><span style="color:#6A737D;">            基本属性</span></span>
<span class="line"><span style="color:#6A737D;">            &lt;entry key=&quot;&quot; value=&quot;&quot;&gt;&lt;/entry&gt;</span></span>
<span class="line"><span style="color:#6A737D;">            对象</span></span>
<span class="line"><span style="color:#6A737D;">            &lt;entry key=&quot;&quot;&gt;</span></span>
<span class="line"><span style="color:#6A737D;">                &lt;bean&gt;</span></span>
<span class="line"><span style="color:#6A737D;">                    &lt;property /&gt;</span></span>
<span class="line"><span style="color:#6A737D;">                &lt;/bean&gt;</span></span>
<span class="line"><span style="color:#6A737D;">            &lt;/entry&gt;</span></span>
<span class="line"><span style="color:#6A737D;">        &lt;/map&gt;</span></span>
<span class="line"><span style="color:#6A737D;">    &lt;/property&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    为properties赋值</span></span>
<span class="line"><span style="color:#6A737D;">    &lt;property&gt;</span></span>
<span class="line"><span style="color:#6A737D;">        &lt;props&gt;</span></span>
<span class="line"><span style="color:#6A737D;">        也是key=value类型数据，k=v都是String</span></span>
<span class="line"><span style="color:#6A737D;">            &lt;prop key=&quot;&quot; &gt;value&lt;/prop&gt;</span></span>
<span class="line"><span style="color:#6A737D;">        &lt;/props&gt;</span></span>
<span class="line"><span style="color:#6A737D;">    &lt;/property&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">--&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">&lt;!--</span></span>
<span class="line"><span style="color:#6A737D;">    通过继承实现bean配置信息可重用，与Java中的继承类似</span></span>
<span class="line"><span style="color:#6A737D;">    &lt;bean id=&quot;parentId&quot; class=&quot;&quot;&gt;&lt;/bean&gt;</span></span>
<span class="line"><span style="color:#6A737D;">    &lt;bean id=&quot;childId&quot; parent=&quot;parentId&quot; class=&quot;此处class可以省略&quot;&gt;&lt;/bean&gt;</span></span>
<span class="line"><span style="color:#6A737D;">--&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">&lt;!--</span></span>
<span class="line"><span style="color:#6A737D;">    通过abstract创建一个模板（抽象）bean，不能通过getBean()获取实例，只能被继承</span></span>
<span class="line"><span style="color:#6A737D;">    与Java中的abstract类似</span></span>
<span class="line"><span style="color:#6A737D;">    &lt;bean id=&quot;beanId&quot; class=&quot;&quot; abstract=&quot;true&quot;&gt;&lt;/bean&gt;</span></span>
<span class="line"><span style="color:#6A737D;">--&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">&lt;!-- property name=&quot;userDao&quot; 其中的属性名由getter/setter方法决定，即去掉get/set后的属性名 --&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">property</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">name</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;userDao&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ref</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;userDao&quot;</span><span style="color:#24292E;"> /&gt;</span></span>
<span class="line"><span style="color:#6A737D;">&lt;!--</span></span>
<span class="line"><span style="color:#6A737D;">    关于property标签的赋值</span></span>
<span class="line"><span style="color:#6A737D;">    设置null值</span></span>
<span class="line"><span style="color:#6A737D;">     &lt;property name=&quot;register&quot;&gt;</span></span>
<span class="line"><span style="color:#6A737D;">        &lt;null&gt;&lt;/null&gt;</span></span>
<span class="line"><span style="color:#6A737D;">    &lt;/property&gt;</span></span>
<span class="line"><span style="color:#6A737D;">    为关联对象赋值</span></span>
<span class="line"><span style="color:#6A737D;">      ①引用</span></span>
<span class="line"><span style="color:#6A737D;">     &lt;bean id=&quot;xxx&quot; class=&quot;xxx&quot;&gt;</span></span>
<span class="line"><span style="color:#6A737D;">        &lt;property /&gt;...</span></span>
<span class="line"><span style="color:#6A737D;">        &lt;property /&gt;...</span></span>
<span class="line"><span style="color:#6A737D;">     &lt;/bean&gt;</span></span>
<span class="line"><span style="color:#6A737D;">    &lt;property name=&quot;register&quot; ref=&quot;xxx&quot;&gt;&lt;/property&gt;</span></span>
<span class="line"><span style="color:#6A737D;">      ②在property内嵌套bean标签赋值</span></span>
<span class="line"><span style="color:#6A737D;">      &lt;property&gt;</span></span>
<span class="line"><span style="color:#6A737D;">      内部bean的id只能用作标识不能被引用，不能根据此id通过getBean创建对象</span></span>
<span class="line"><span style="color:#6A737D;">        &lt;bean id=&quot;xxx&quot; /&gt;</span></span>
<span class="line"><span style="color:#6A737D;">      &lt;/property&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">      级联赋值：为引用对象的属性赋值</span></span>
<span class="line"><span style="color:#6A737D;">      User中关联Car对象</span></span>
<span class="line"><span style="color:#6A737D;">      注意：级联赋值后原来的bean属性可能也会被修改</span></span>
<span class="line"><span style="color:#6A737D;">      &lt;property name=&quot;car.name&quot; value=&quot;xxx&quot;&gt;&lt;/property&gt;</span></span>
<span class="line"><span style="color:#6A737D;">--&gt;</span></span>
<span class="line"><span style="color:#6A737D;">&lt;!--关于bean的赋值</span></span>
<span class="line"><span style="color:#6A737D;">    为List&lt;Object&gt;赋值 ==》 为List赋值</span></span>
<span class="line"><span style="color:#6A737D;">    &lt;property&gt;</span></span>
<span class="line"><span style="color:#6A737D;">        &lt;list&gt;</span></span>
<span class="line"><span style="color:#6A737D;">            &lt;bean /&gt;</span></span>
<span class="line"><span style="color:#6A737D;">            &lt;ref /&gt;</span></span>
<span class="line"><span style="color:#6A737D;">        &lt;/list</span></span>
<span class="line"><span style="color:#6A737D;">    &lt;/property&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    为Map赋值</span></span>
<span class="line"><span style="color:#6A737D;">     &lt;property&gt;</span></span>
<span class="line"><span style="color:#6A737D;">        &lt;map&gt;</span></span>
<span class="line"><span style="color:#6A737D;">            基本属性</span></span>
<span class="line"><span style="color:#6A737D;">            &lt;entry key=&quot;&quot; value=&quot;&quot;&gt;&lt;/entry&gt;</span></span>
<span class="line"><span style="color:#6A737D;">            对象</span></span>
<span class="line"><span style="color:#6A737D;">            &lt;entry key=&quot;&quot;&gt;</span></span>
<span class="line"><span style="color:#6A737D;">                &lt;bean&gt;</span></span>
<span class="line"><span style="color:#6A737D;">                    &lt;property /&gt;</span></span>
<span class="line"><span style="color:#6A737D;">                &lt;/bean&gt;</span></span>
<span class="line"><span style="color:#6A737D;">            &lt;/entry&gt;</span></span>
<span class="line"><span style="color:#6A737D;">        &lt;/map&gt;</span></span>
<span class="line"><span style="color:#6A737D;">    &lt;/property&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    为properties赋值</span></span>
<span class="line"><span style="color:#6A737D;">    &lt;property&gt;</span></span>
<span class="line"><span style="color:#6A737D;">        &lt;props&gt;</span></span>
<span class="line"><span style="color:#6A737D;">        也是key=value类型数据，k=v都是String</span></span>
<span class="line"><span style="color:#6A737D;">            &lt;prop key=&quot;&quot; &gt;value&lt;/prop&gt;</span></span>
<span class="line"><span style="color:#6A737D;">        &lt;/props&gt;</span></span>
<span class="line"><span style="color:#6A737D;">    &lt;/property&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">--&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">&lt;!--</span></span>
<span class="line"><span style="color:#6A737D;">    通过继承实现bean配置信息可重用，与Java中的继承类似</span></span>
<span class="line"><span style="color:#6A737D;">    &lt;bean id=&quot;parentId&quot; class=&quot;&quot;&gt;&lt;/bean&gt;</span></span>
<span class="line"><span style="color:#6A737D;">    &lt;bean id=&quot;childId&quot; parent=&quot;parentId&quot; class=&quot;此处class可以省略&quot;&gt;&lt;/bean&gt;</span></span>
<span class="line"><span style="color:#6A737D;">--&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">&lt;!--</span></span>
<span class="line"><span style="color:#6A737D;">    通过abstract创建一个模板（抽象）bean，不能通过getBean()获取实例，只能被继承</span></span>
<span class="line"><span style="color:#6A737D;">    与Java中的abstract类似</span></span>
<span class="line"><span style="color:#6A737D;">    &lt;bean id=&quot;beanId&quot; class=&quot;&quot; abstract=&quot;true&quot;&gt;&lt;/bean&gt;</span></span>
<span class="line"><span style="color:#6A737D;">--&gt;</span></span></code></pre></div></li><li><p>构造函数设置</p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">bean</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">id</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;userService2&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;com.demo.spring.service.impl.UserServiceImpl2&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">&lt;!--调用有参构造器创建对象并赋值</span></span>
<span class="line"><span style="color:#6A737D;">        若有多个参数则要用到多条&lt;constructor-arg /&gt;标签</span></span>
<span class="line"><span style="color:#6A737D;">        同时在赋值的时候可以省略属性名（但是必须按照构造方法中参数的顺序赋值）</span></span>
<span class="line"><span style="color:#6A737D;">        若要赋值顺序不一致，则要将&lt;constructor-arg /&gt;标签中index的值设为与构造方法中参数位置对应的数值</span></span>
<span class="line"><span style="color:#6A737D;">        除了index还可以设置type参数，对应类型的参数才会被赋值</span></span>
<span class="line"><span style="color:#6A737D;">    --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">&lt;!--通过构造方法注入userDao--&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">constructor-arg</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">name</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;userDao&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ref</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;userDao&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">type</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">index</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;"> /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">&lt;!--name的值需要和构造方法中形参名一致--&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">constructor-arg</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">name</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;isRegister&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">value</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;true&quot;</span><span style="color:#E1E4E8;"> /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">bean</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">bean</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">id</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;userService2&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;com.demo.spring.service.impl.UserServiceImpl2&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">&lt;!--调用有参构造器创建对象并赋值</span></span>
<span class="line"><span style="color:#6A737D;">        若有多个参数则要用到多条&lt;constructor-arg /&gt;标签</span></span>
<span class="line"><span style="color:#6A737D;">        同时在赋值的时候可以省略属性名（但是必须按照构造方法中参数的顺序赋值）</span></span>
<span class="line"><span style="color:#6A737D;">        若要赋值顺序不一致，则要将&lt;constructor-arg /&gt;标签中index的值设为与构造方法中参数位置对应的数值</span></span>
<span class="line"><span style="color:#6A737D;">        除了index还可以设置type参数，对应类型的参数才会被赋值</span></span>
<span class="line"><span style="color:#6A737D;">    --&gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">&lt;!--通过构造方法注入userDao--&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">constructor-arg</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">name</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;userDao&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ref</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;userDao&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">type</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">index</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;"> /&gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">&lt;!--name的值需要和构造方法中形参名一致--&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">constructor-arg</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">name</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;isRegister&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">value</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;true&quot;</span><span style="color:#24292E;"> /&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">bean</span><span style="color:#24292E;">&gt;</span></span></code></pre></div></li></ul></li></ul></li><li><p><strong>使用注解</strong></p><p>@Component、@Configuration或者@Bean</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Component</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Dog</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Dog</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Dog...Construct&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// JSR205引入，对象创建并赋值之后调用，相当于init-method</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">PostConstruct</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">init</span><span style="color:#E1E4E8;">(){</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Dog...init&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// JSR205引入，对象移除之前调用，相当于destroy-method</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">PreDestroy</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">destroy</span><span style="color:#E1E4E8;">(){</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Dog...destroy&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Component</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Dog</span><span style="color:#24292E;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Dog</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Dog...Construct&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// JSR205引入，对象创建并赋值之后调用，相当于init-method</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">PostConstruct</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">init</span><span style="color:#24292E;">(){</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Dog...init&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// JSR205引入，对象移除之前调用，相当于destroy-method</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">PreDestroy</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">destroy</span><span style="color:#24292E;">(){</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Dog...destroy&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * @Description 生命周期配置类</span></span>
<span class="line"><span style="color:#6A737D;"> * @Author Gnl</span></span>
<span class="line"><span style="color:#6A737D;"> * @Time 2020/3/21 12:16</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/*配置包扫描 == component-scan</span></span>
<span class="line"><span style="color:#6A737D;">Filter[] includeFilters 扫描时只要扫描哪些被包含在内的组件</span></span>
<span class="line"><span style="color:#6A737D;">excludeFilters = Filter[] 扫描的时候要排除哪些注解组件，配置内容和xml文件一致</span></span>
<span class="line"><span style="color:#6A737D;">@ComponentScan(value = &quot;com.demo.spring&quot;,excludeFilters = {</span></span>
<span class="line"><span style="color:#6A737D;">        @ComponentScan.Filter(type = FilterType.ANNOTATION,classes = {</span></span>
<span class="line"><span style="color:#6A737D;">                Controller.class, Service.class</span></span>
<span class="line"><span style="color:#6A737D;">        })</span></span>
<span class="line"><span style="color:#6A737D;">})*/</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">ComponentScans</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">        @</span><span style="color:#F97583;">ComponentScan</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;com.demo.spring.bean&quot;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">        @</span><span style="color:#F97583;">ComponentScan</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;com.demo.spring.utils&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"><span style="color:#6A737D;">//使用@PropertySource读取外部配置文件中的k-v保存到运行环境变量中；</span></span>
<span class="line"><span style="color:#6A737D;">// 加载完外部配置文件后在pojo类中使用@Value(&quot;\${k}&quot;)取值</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">PropertySource</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">value</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span><span style="color:#9ECBFF;">&quot;classpath:person.properties&quot;</span><span style="color:#E1E4E8;">})</span></span>
<span class="line"><span style="color:#6A737D;">//@Profile(value = {&quot;dev&quot;})  写在配置类上，只有指定环境的时候整个配置类中的配置才会生效</span></span>
<span class="line"><span style="color:#6A737D;">// -Dspring.profiles.active=test</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Configuration</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">LifeCycleConfig</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">    * bean的生命周期</span></span>
<span class="line"><span style="color:#6A737D;">    	创建 -- 初始化 -- 销毁</span></span>
<span class="line"><span style="color:#6A737D;">    * 1）、指定初始化和销毁方法 @Bean(initMethod = &quot;&quot;,destroyMethod = &quot;&quot;)</span></span>
<span class="line"><span style="color:#6A737D;">    		也可使用@PostConstruct和@PreDestroy，若两种方式都存在，只会执行一次初始化			  方法和销毁方法</span></span>
<span class="line"><span style="color:#6A737D;">    *   构造（对象创建）</span></span>
<span class="line"><span style="color:#6A737D;">    *       单实例：在容器启动的时候创建对象</span></span>
<span class="line"><span style="color:#6A737D;">    *       多实例：在每次获取实例的时候都重新创建对象</span></span>
<span class="line"><span style="color:#6A737D;">    *   初始化：</span></span>
<span class="line"><span style="color:#6A737D;">    *       对象创建完成，并赋值好，调用初始化方法。</span></span>
<span class="line"><span style="color:#6A737D;">    *   销毁：</span></span>
<span class="line"><span style="color:#6A737D;">    *       单例：容器关闭的时候销毁</span></span>
<span class="line"><span style="color:#6A737D;">    *       原型：容器不会管理这个原型bean，容器关闭的时候不会调用销毁方法</span></span>
<span class="line"><span style="color:#6A737D;">    *</span></span>
<span class="line"><span style="color:#6A737D;">    *  2）、通过让bean实现InitializingBean接口（实现初始化逻辑）</span></span>
<span class="line"><span style="color:#6A737D;">    *                 实现DisposableBean接口（实现销毁逻辑）</span></span>
<span class="line"><span style="color:#6A737D;">    *</span></span>
<span class="line"><span style="color:#6A737D;">    *  3）、可以使用JSR250</span></span>
<span class="line"><span style="color:#6A737D;">    *           @PostConstruct : 在bean完成创建并且属性赋值完成；来执行初始化方法。</span></span>
<span class="line"><span style="color:#6A737D;">    *           @PreDestroy：在容器销毁bean之前通知我们进行清理工作</span></span>
<span class="line"><span style="color:#6A737D;">    *</span></span>
<span class="line"><span style="color:#6A737D;">    *  4）、实现BeanPostProcessor : bean的后置处理器</span></span>
<span class="line"><span style="color:#6A737D;">    *           在bean初始化前后进行一些处理工作</span></span>
<span class="line"><span style="color:#6A737D;">    *           postProcessBeforeInitialization：在初始化工作之前</span></span>
<span class="line"><span style="color:#6A737D;">    *           postProcessAfterInitialization：在初始化工作之后</span></span>
<span class="line"><span style="color:#6A737D;">    使用InitializingBean和@PostConstruct和@PreDestroy需要修改代码，不适用与第三方引用	 	包</span></span>
<span class="line"><span style="color:#6A737D;">    * */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">     * 标上Profile注解，只有在指定的环境下才注册比被标识的bean，</span></span>
<span class="line"><span style="color:#6A737D;">     *       默认环境为default</span></span>
<span class="line"><span style="color:#6A737D;">     * */</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Profile</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">value</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span><span style="color:#9ECBFF;">&quot;dev&quot;</span><span style="color:#E1E4E8;">})</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Conditional</span><span style="color:#E1E4E8;">({WinCondition.class})</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">    @Conditional()</span></span>
<span class="line"><span style="color:#6A737D;">        可以标在类上和方法上</span></span>
<span class="line"><span style="color:#6A737D;">        类上：满足当前条件，这个类中配置的所有bean注册才能生效</span></span>
<span class="line"><span style="color:#6A737D;">       方法上：满足当前条件，这个方法上的@Bean才生效</span></span>
<span class="line"><span style="color:#6A737D;">        按照条件给容器中注册bean</span></span>
<span class="line"><span style="color:#6A737D;">        value必须是实现了Condition的类</span></span>
<span class="line"><span style="color:#6A737D;">    */</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//给容器中注册一个bean；类型为返回值类型，id默认就是方法名</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//默认注册的组件为单例模式</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//@Lazy懒加载</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//@Scope(&quot;singleton&quot;)修改生命周期</span></span>
<span class="line"><span style="color:#E1E4E8;">    	</span><span style="color:#6A737D;">//singleton : 跟随容器的启动创建</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//prototype： 不跟随容器的启动创建，获取的时候才创建,每次获取都创建一个新的对象</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//session： 同一个请求创建一个实例</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//request： 同一个session创建一个实例</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//@Bean(initMethod = &quot;init&quot;,destroyMethod = &quot;destroy&quot;)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> Car </span><span style="color:#B392F0;">car</span><span style="color:#E1E4E8;">(){</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Car</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * @Description 生命周期配置类</span></span>
<span class="line"><span style="color:#6A737D;"> * @Author Gnl</span></span>
<span class="line"><span style="color:#6A737D;"> * @Time 2020/3/21 12:16</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/*配置包扫描 == component-scan</span></span>
<span class="line"><span style="color:#6A737D;">Filter[] includeFilters 扫描时只要扫描哪些被包含在内的组件</span></span>
<span class="line"><span style="color:#6A737D;">excludeFilters = Filter[] 扫描的时候要排除哪些注解组件，配置内容和xml文件一致</span></span>
<span class="line"><span style="color:#6A737D;">@ComponentScan(value = &quot;com.demo.spring&quot;,excludeFilters = {</span></span>
<span class="line"><span style="color:#6A737D;">        @ComponentScan.Filter(type = FilterType.ANNOTATION,classes = {</span></span>
<span class="line"><span style="color:#6A737D;">                Controller.class, Service.class</span></span>
<span class="line"><span style="color:#6A737D;">        })</span></span>
<span class="line"><span style="color:#6A737D;">})*/</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">ComponentScans</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">        @</span><span style="color:#D73A49;">ComponentScan</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;com.demo.spring.bean&quot;</span><span style="color:#24292E;">),</span></span>
<span class="line"><span style="color:#24292E;">        @</span><span style="color:#D73A49;">ComponentScan</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;com.demo.spring.utils&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"><span style="color:#6A737D;">//使用@PropertySource读取外部配置文件中的k-v保存到运行环境变量中；</span></span>
<span class="line"><span style="color:#6A737D;">// 加载完外部配置文件后在pojo类中使用@Value(&quot;\${k}&quot;)取值</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">PropertySource</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">value</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span><span style="color:#032F62;">&quot;classpath:person.properties&quot;</span><span style="color:#24292E;">})</span></span>
<span class="line"><span style="color:#6A737D;">//@Profile(value = {&quot;dev&quot;})  写在配置类上，只有指定环境的时候整个配置类中的配置才会生效</span></span>
<span class="line"><span style="color:#6A737D;">// -Dspring.profiles.active=test</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Configuration</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">LifeCycleConfig</span><span style="color:#24292E;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">    * bean的生命周期</span></span>
<span class="line"><span style="color:#6A737D;">    	创建 -- 初始化 -- 销毁</span></span>
<span class="line"><span style="color:#6A737D;">    * 1）、指定初始化和销毁方法 @Bean(initMethod = &quot;&quot;,destroyMethod = &quot;&quot;)</span></span>
<span class="line"><span style="color:#6A737D;">    		也可使用@PostConstruct和@PreDestroy，若两种方式都存在，只会执行一次初始化			  方法和销毁方法</span></span>
<span class="line"><span style="color:#6A737D;">    *   构造（对象创建）</span></span>
<span class="line"><span style="color:#6A737D;">    *       单实例：在容器启动的时候创建对象</span></span>
<span class="line"><span style="color:#6A737D;">    *       多实例：在每次获取实例的时候都重新创建对象</span></span>
<span class="line"><span style="color:#6A737D;">    *   初始化：</span></span>
<span class="line"><span style="color:#6A737D;">    *       对象创建完成，并赋值好，调用初始化方法。</span></span>
<span class="line"><span style="color:#6A737D;">    *   销毁：</span></span>
<span class="line"><span style="color:#6A737D;">    *       单例：容器关闭的时候销毁</span></span>
<span class="line"><span style="color:#6A737D;">    *       原型：容器不会管理这个原型bean，容器关闭的时候不会调用销毁方法</span></span>
<span class="line"><span style="color:#6A737D;">    *</span></span>
<span class="line"><span style="color:#6A737D;">    *  2）、通过让bean实现InitializingBean接口（实现初始化逻辑）</span></span>
<span class="line"><span style="color:#6A737D;">    *                 实现DisposableBean接口（实现销毁逻辑）</span></span>
<span class="line"><span style="color:#6A737D;">    *</span></span>
<span class="line"><span style="color:#6A737D;">    *  3）、可以使用JSR250</span></span>
<span class="line"><span style="color:#6A737D;">    *           @PostConstruct : 在bean完成创建并且属性赋值完成；来执行初始化方法。</span></span>
<span class="line"><span style="color:#6A737D;">    *           @PreDestroy：在容器销毁bean之前通知我们进行清理工作</span></span>
<span class="line"><span style="color:#6A737D;">    *</span></span>
<span class="line"><span style="color:#6A737D;">    *  4）、实现BeanPostProcessor : bean的后置处理器</span></span>
<span class="line"><span style="color:#6A737D;">    *           在bean初始化前后进行一些处理工作</span></span>
<span class="line"><span style="color:#6A737D;">    *           postProcessBeforeInitialization：在初始化工作之前</span></span>
<span class="line"><span style="color:#6A737D;">    *           postProcessAfterInitialization：在初始化工作之后</span></span>
<span class="line"><span style="color:#6A737D;">    使用InitializingBean和@PostConstruct和@PreDestroy需要修改代码，不适用与第三方引用	 	包</span></span>
<span class="line"><span style="color:#6A737D;">    * */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">     * 标上Profile注解，只有在指定的环境下才注册比被标识的bean，</span></span>
<span class="line"><span style="color:#6A737D;">     *       默认环境为default</span></span>
<span class="line"><span style="color:#6A737D;">     * */</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Profile</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">value</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span><span style="color:#032F62;">&quot;dev&quot;</span><span style="color:#24292E;">})</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Conditional</span><span style="color:#24292E;">({WinCondition.class})</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">    @Conditional()</span></span>
<span class="line"><span style="color:#6A737D;">        可以标在类上和方法上</span></span>
<span class="line"><span style="color:#6A737D;">        类上：满足当前条件，这个类中配置的所有bean注册才能生效</span></span>
<span class="line"><span style="color:#6A737D;">       方法上：满足当前条件，这个方法上的@Bean才生效</span></span>
<span class="line"><span style="color:#6A737D;">        按照条件给容器中注册bean</span></span>
<span class="line"><span style="color:#6A737D;">        value必须是实现了Condition的类</span></span>
<span class="line"><span style="color:#6A737D;">    */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//给容器中注册一个bean；类型为返回值类型，id默认就是方法名</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//默认注册的组件为单例模式</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//@Lazy懒加载</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//@Scope(&quot;singleton&quot;)修改生命周期</span></span>
<span class="line"><span style="color:#24292E;">    	</span><span style="color:#6A737D;">//singleton : 跟随容器的启动创建</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//prototype： 不跟随容器的启动创建，获取的时候才创建,每次获取都创建一个新的对象</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//session： 同一个请求创建一个实例</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//request： 同一个session创建一个实例</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//@Bean(initMethod = &quot;init&quot;,destroyMethod = &quot;destroy&quot;)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> Car </span><span style="color:#6F42C1;">car</span><span style="color:#24292E;">(){</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Car</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">WinCondition</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">implements</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Condition</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">    * ConditionContext context 判断条件能使用的上下文</span></span>
<span class="line"><span style="color:#6A737D;">    * AnnotatedTypeMetadata：注释信息</span></span>
<span class="line"><span style="color:#6A737D;">    * */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">boolean</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">matches</span><span style="color:#E1E4E8;">(ConditionContext </span><span style="color:#FFAB70;">context</span><span style="color:#E1E4E8;">, AnnotatedTypeMetadata </span><span style="color:#FFAB70;">metadata</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        String osName </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> context.</span><span style="color:#B392F0;">getEnvironment</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">getProperty</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;os.name&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 获取到bean定义的注册类</span></span>
<span class="line"><span style="color:#E1E4E8;">        BeanDefinitionRegistry registry </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> context.</span><span style="color:#B392F0;">getRegistry</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//可以判断容器中bean注册的情况，也可以给容器中注册bean</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">boolean</span><span style="color:#E1E4E8;"> person </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> registry.</span><span style="color:#B392F0;">containsBeanDefinition</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;person&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// person为true即为已经注册</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (osName.</span><span style="color:#B392F0;">toLowerCase</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">contains</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;windows&quot;</span><span style="color:#E1E4E8;">)){</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">WinCondition</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">implements</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Condition</span><span style="color:#24292E;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">    * ConditionContext context 判断条件能使用的上下文</span></span>
<span class="line"><span style="color:#6A737D;">    * AnnotatedTypeMetadata：注释信息</span></span>
<span class="line"><span style="color:#6A737D;">    * */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">boolean</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">matches</span><span style="color:#24292E;">(ConditionContext </span><span style="color:#E36209;">context</span><span style="color:#24292E;">, AnnotatedTypeMetadata </span><span style="color:#E36209;">metadata</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        String osName </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> context.</span><span style="color:#6F42C1;">getEnvironment</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">getProperty</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;os.name&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 获取到bean定义的注册类</span></span>
<span class="line"><span style="color:#24292E;">        BeanDefinitionRegistry registry </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> context.</span><span style="color:#6F42C1;">getRegistry</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//可以判断容器中bean注册的情况，也可以给容器中注册bean</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">boolean</span><span style="color:#24292E;"> person </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> registry.</span><span style="color:#6F42C1;">containsBeanDefinition</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;person&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// person为true即为已经注册</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (osName.</span><span style="color:#6F42C1;">toLowerCase</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">contains</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;windows&quot;</span><span style="color:#24292E;">)){</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div></li><li><p><strong>@Import</strong>，快速给容器中注册组件。</p><p><strong>使用</strong></p><ol><li><p>创建MyImportSelector类</p><ul><li>实现ImportSelectorXXX接口，返回需要导入的组件的全类名数组</li><li>实现ImportBeanDefinitionRegistrar接口，手动注册bean</li></ul></li><li><p>@Import({要导入到容器中的组件})；</p><p>@Import({Color.class})容器中就会自动注册这个组件，id默认是全类名</p></li></ol><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">MyImportSelector</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">implements</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ImportSelector</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">     * @Description:  返回值就是要注册到容器中的组件的全类名</span></span>
<span class="line"><span style="color:#6A737D;">     * @Author: Gnl</span></span>
<span class="line"><span style="color:#6A737D;">     * @Time: 2020/3/20 19:40</span></span>
<span class="line"><span style="color:#6A737D;">     * @param AnnotationMetadata importingClassMetadata ： 当前标注@Import注解类的所有注解信息</span></span>
<span class="line"><span style="color:#6A737D;">     * @return: java.lang.String[]</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] </span><span style="color:#B392F0;">selectImports</span><span style="color:#E1E4E8;">(AnnotationMetadata </span><span style="color:#FFAB70;">importingClassMetadata</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#6A737D;">//        MergedAnnotations annotations = importingClassMetadata.getAnnotations();</span></span>
<span class="line"><span style="color:#6A737D;">//        for (MergedAnnotation&lt;Annotation&gt; annotation : annotations) {</span></span>
<span class="line"><span style="color:#6A737D;">//            System.out.println(annotation);</span></span>
<span class="line"><span style="color:#6A737D;">//        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;"> [] strings </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span><span style="color:#9ECBFF;">&quot;com.demo.spring.bean.Green&quot;</span><span style="color:#E1E4E8;">,</span><span style="color:#9ECBFF;">&quot;com.demo.spring.bean.Red&quot;</span><span style="color:#E1E4E8;">};</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//方法不要返回null值，否则会空指针异常</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> strings;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">MyImportSelector</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">implements</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ImportSelector</span><span style="color:#24292E;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">     * @Description:  返回值就是要注册到容器中的组件的全类名</span></span>
<span class="line"><span style="color:#6A737D;">     * @Author: Gnl</span></span>
<span class="line"><span style="color:#6A737D;">     * @Time: 2020/3/20 19:40</span></span>
<span class="line"><span style="color:#6A737D;">     * @param AnnotationMetadata importingClassMetadata ： 当前标注@Import注解类的所有注解信息</span></span>
<span class="line"><span style="color:#6A737D;">     * @return: java.lang.String[]</span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] </span><span style="color:#6F42C1;">selectImports</span><span style="color:#24292E;">(AnnotationMetadata </span><span style="color:#E36209;">importingClassMetadata</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#6A737D;">//        MergedAnnotations annotations = importingClassMetadata.getAnnotations();</span></span>
<span class="line"><span style="color:#6A737D;">//        for (MergedAnnotation&lt;Annotation&gt; annotation : annotations) {</span></span>
<span class="line"><span style="color:#6A737D;">//            System.out.println(annotation);</span></span>
<span class="line"><span style="color:#6A737D;">//        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">String</span><span style="color:#24292E;"> [] strings </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span><span style="color:#032F62;">&quot;com.demo.spring.bean.Green&quot;</span><span style="color:#24292E;">,</span><span style="color:#032F62;">&quot;com.demo.spring.bean.Red&quot;</span><span style="color:#24292E;">};</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//方法不要返回null值，否则会空指针异常</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> strings;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">MyImportBeanDefinitionRegistrar</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">implements</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ImportBeanDefinitionRegistrar</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">     * @Description</span></span>
<span class="line"><span style="color:#6A737D;">     * @Author: Gnl</span></span>
<span class="line"><span style="color:#6A737D;">     * @Time: 2020/3/20 19:41</span></span>
<span class="line"><span style="color:#6A737D;">     * @param importingClassMetadata 当前类的注解信息</span></span>
<span class="line"><span style="color:#6A737D;">     * @param registry ： BeanDefinition 注册类</span></span>
<span class="line"><span style="color:#6A737D;">     *      把所有需要添加到容器中的bean：</span></span>
<span class="line"><span style="color:#6A737D;">     *          调用BeanDefinitionRegistry.registerBeanDefinition手动注册进来</span></span>
<span class="line"><span style="color:#6A737D;">     * @return: void </span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">registerBeanDefinitions</span><span style="color:#E1E4E8;">(AnnotationMetadata </span><span style="color:#FFAB70;">importingClassMetadata</span><span style="color:#E1E4E8;">, BeanDefinitionRegistry </span><span style="color:#FFAB70;">registry</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">boolean</span><span style="color:#E1E4E8;"> red </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> registry.</span><span style="color:#B392F0;">containsBeanDefinition</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;com.demo.spring.bean.Red&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">boolean</span><span style="color:#E1E4E8;"> green </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> registry.</span><span style="color:#B392F0;">containsBeanDefinition</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;com.demo.spring.bean.Green&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 若容器中已经注册了com.demo.spring.bean.Red和com.demo.spring.bean.Green，则手动注册一个id叫rainBow的bean</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (red </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> green) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 指定bean的信息；bean的类型</span></span>
<span class="line"><span style="color:#E1E4E8;">            RootBeanDefinition beanDefinition </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">RootBeanDefinition</span><span style="color:#E1E4E8;">(RainBow.class);</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 指定bean名</span></span>
<span class="line"><span style="color:#E1E4E8;">            registry.</span><span style="color:#B392F0;">registerBeanDefinition</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;rainBow&quot;</span><span style="color:#E1E4E8;">,beanDefinition);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">MyImportBeanDefinitionRegistrar</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">implements</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ImportBeanDefinitionRegistrar</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">     * @Description</span></span>
<span class="line"><span style="color:#6A737D;">     * @Author: Gnl</span></span>
<span class="line"><span style="color:#6A737D;">     * @Time: 2020/3/20 19:41</span></span>
<span class="line"><span style="color:#6A737D;">     * @param importingClassMetadata 当前类的注解信息</span></span>
<span class="line"><span style="color:#6A737D;">     * @param registry ： BeanDefinition 注册类</span></span>
<span class="line"><span style="color:#6A737D;">     *      把所有需要添加到容器中的bean：</span></span>
<span class="line"><span style="color:#6A737D;">     *          调用BeanDefinitionRegistry.registerBeanDefinition手动注册进来</span></span>
<span class="line"><span style="color:#6A737D;">     * @return: void </span></span>
<span class="line"><span style="color:#6A737D;">     *</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">registerBeanDefinitions</span><span style="color:#24292E;">(AnnotationMetadata </span><span style="color:#E36209;">importingClassMetadata</span><span style="color:#24292E;">, BeanDefinitionRegistry </span><span style="color:#E36209;">registry</span><span style="color:#24292E;">) {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">boolean</span><span style="color:#24292E;"> red </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> registry.</span><span style="color:#6F42C1;">containsBeanDefinition</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;com.demo.spring.bean.Red&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">boolean</span><span style="color:#24292E;"> green </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> registry.</span><span style="color:#6F42C1;">containsBeanDefinition</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;com.demo.spring.bean.Green&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 若容器中已经注册了com.demo.spring.bean.Red和com.demo.spring.bean.Green，则手动注册一个id叫rainBow的bean</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (red </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> green) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 指定bean的信息；bean的类型</span></span>
<span class="line"><span style="color:#24292E;">            RootBeanDefinition beanDefinition </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">RootBeanDefinition</span><span style="color:#24292E;">(RainBow.class);</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 指定bean名</span></span>
<span class="line"><span style="color:#24292E;">            registry.</span><span style="color:#6F42C1;">registerBeanDefinition</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;rainBow&quot;</span><span style="color:#24292E;">,beanDefinition);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div></li><li><p><strong>静态工厂</strong>。工厂本身不用创建对象，通过调用工厂的静态方法，对象 = 工厂.工厂方法名。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">StaticFactory</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> UserService </span><span style="color:#B392F0;">createUserService</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        UserDao userDao </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">UserDaoImpl</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        UserServiceImpl userService </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">UserServiceImpl</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        userService.</span><span style="color:#B392F0;">setUserDao</span><span style="color:#E1E4E8;">(userDao);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> userService;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">StaticFactory</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> UserService </span><span style="color:#6F42C1;">createUserService</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        UserDao userDao </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">UserDaoImpl</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        UserServiceImpl userService </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">UserServiceImpl</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        userService.</span><span style="color:#6F42C1;">setUserDao</span><span style="color:#24292E;">(userDao);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> userService;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">&lt;!--静态工厂</span></span>
<span class="line"><span style="color:#6A737D;">    class指定为静态工厂的全类名</span></span>
<span class="line"><span style="color:#6A737D;">    factory-method指定哪个方法是工厂方法</span></span>
<span class="line"><span style="color:#6A737D;">--&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">bean</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">id</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;staticFactory&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;com.demo.spring.util.StaticFactory&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">factory-method</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;createUserService&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">&lt;!--若factory-method中指定的方法需要传参，使用&lt;constructor-arg /&gt;设置参数--&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">bean</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">&lt;!--静态工厂</span></span>
<span class="line"><span style="color:#6A737D;">    class指定为静态工厂的全类名</span></span>
<span class="line"><span style="color:#6A737D;">    factory-method指定哪个方法是工厂方法</span></span>
<span class="line"><span style="color:#6A737D;">--&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">bean</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">id</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;staticFactory&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;com.demo.spring.util.StaticFactory&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">factory-method</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;createUserService&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">&lt;!--若factory-method中指定的方法需要传参，使用&lt;constructor-arg /&gt;设置参数--&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">bean</span><span style="color:#24292E;">&gt;</span></span></code></pre></div></li><li><p><strong>实例工厂</strong>。工厂本身需要创建对象</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">InstanceFactory</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> UserService </span><span style="color:#B392F0;">createUserService</span><span style="color:#E1E4E8;">(){</span></span>
<span class="line"><span style="color:#E1E4E8;">        UserDaoImpl userDao </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">UserDaoImpl</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        UserServiceImpl userService </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">UserServiceImpl</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        userService.</span><span style="color:#B392F0;">setUserDao</span><span style="color:#E1E4E8;">(userDao);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> userService;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">InstanceFactory</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> UserService </span><span style="color:#6F42C1;">createUserService</span><span style="color:#24292E;">(){</span></span>
<span class="line"><span style="color:#24292E;">        UserDaoImpl userDao </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">UserDaoImpl</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        UserServiceImpl userService </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">UserServiceImpl</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        userService.</span><span style="color:#6F42C1;">setUserDao</span><span style="color:#24292E;">(userDao);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> userService;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">&lt;!--实例工厂--&gt;</span></span>
<span class="line"><span style="color:#6A737D;">&lt;!--首先创建一个实例工厂的对象--&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">bean</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">id</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;instanceFactory&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;com.demo.spring.util.InstanceFactory&quot;</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#85E89D;">bean</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#6A737D;">&lt;!--</span></span>
<span class="line"><span style="color:#6A737D;">    配置要创建的对象使用哪个工厂创建</span></span>
<span class="line"><span style="color:#6A737D;">        factory-bean指定使用的工厂实例</span></span>
<span class="line"><span style="color:#6A737D;">        factory-method指定使用的工厂方法</span></span>
<span class="line"><span style="color:#6A737D;">--&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">bean</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">id</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;factoryUserService&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">factory-bean</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;instanceFactory&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">factory-method</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;createUserService&quot;</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#85E89D;">bean</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">&lt;!--实例工厂--&gt;</span></span>
<span class="line"><span style="color:#6A737D;">&lt;!--首先创建一个实例工厂的对象--&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">bean</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">id</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;instanceFactory&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;com.demo.spring.util.InstanceFactory&quot;</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#22863A;">bean</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#6A737D;">&lt;!--</span></span>
<span class="line"><span style="color:#6A737D;">    配置要创建的对象使用哪个工厂创建</span></span>
<span class="line"><span style="color:#6A737D;">        factory-bean指定使用的工厂实例</span></span>
<span class="line"><span style="color:#6A737D;">        factory-method指定使用的工厂方法</span></span>
<span class="line"><span style="color:#6A737D;">--&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">bean</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">id</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;factoryUserService&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">factory-bean</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;instanceFactory&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">factory-method</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;createUserService&quot;</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#22863A;">bean</span><span style="color:#24292E;">&gt;</span></span></code></pre></div></li><li><p><strong>FactoryBean</strong></p><p>IOC 容器启动的时候不会创建实例，不管是单例还是原型模式都只是在使用的时候才创建</p><ul><li><p>默认获取到的是FactoryBean调用getObject创建的对像</p><p>获取FactoryBean创建的bean对象</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">Object o </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> applicationContext.</span><span style="color:#B392F0;">getBean</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;colorFactoryBean&quot;</span><span style="color:#E1E4E8;">);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">Object o </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> applicationContext.</span><span style="color:#6F42C1;">getBean</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;colorFactoryBean&quot;</span><span style="color:#24292E;">);</span></span></code></pre></div></li><li><p>要获取FactoryBean本身需要给id前面加一个&quot;&amp;&quot;，即<code>&amp;colorFactoryBean</code></p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">Object factoryBean </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> applicationContext.</span><span style="color:#B392F0;">getBean</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;&amp;colorFactoryBean&quot;</span><span style="color:#E1E4E8;">);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">Object factoryBean </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> applicationContext.</span><span style="color:#6F42C1;">getBean</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;&amp;colorFactoryBean&quot;</span><span style="color:#24292E;">);</span></span></code></pre></div></li></ul><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">MyFactoryBean</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">implements</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">FactoryBean</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> Object </span><span style="color:#B392F0;">getObject</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> Exception {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;使用MyFactoryBean来创建Bean&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        UserServiceImpl userService </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">UserServiceImpl</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        userService.</span><span style="color:#B392F0;">setUserDao</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">UserDaoImpl</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> userService;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> Class&lt;</span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;">&gt; </span><span style="color:#B392F0;">getObjectType</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> UserService.class;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">MyFactoryBean</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">implements</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">FactoryBean</span><span style="color:#24292E;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> Object </span><span style="color:#6F42C1;">getObject</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> Exception {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;使用MyFactoryBean来创建Bean&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        UserServiceImpl userService </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">UserServiceImpl</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        userService.</span><span style="color:#6F42C1;">setUserDao</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">UserDaoImpl</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> userService;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> Class&lt;</span><span style="color:#D73A49;">?</span><span style="color:#24292E;">&gt; </span><span style="color:#6F42C1;">getObjectType</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> UserService.class;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">&lt;!--FactoryBean--&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">&lt;!--默认单例</span></span>
<span class="line"><span style="color:#6A737D;">        IOC容器启动的时候不会创建实例</span></span>
<span class="line"><span style="color:#6A737D;">        不管是单例还是原型模式都只是在使用的时候才创建</span></span>
<span class="line"><span style="color:#6A737D;">    --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">bean</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">id</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;myFactoryService&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;com.demo.spring.util.MyFactoryBean&quot;</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#85E89D;">bean</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">&lt;!--FactoryBean--&gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">&lt;!--默认单例</span></span>
<span class="line"><span style="color:#6A737D;">        IOC容器启动的时候不会创建实例</span></span>
<span class="line"><span style="color:#6A737D;">        不管是单例还是原型模式都只是在使用的时候才创建</span></span>
<span class="line"><span style="color:#6A737D;">    --&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">bean</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">id</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;myFactoryService&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;com.demo.spring.util.MyFactoryBean&quot;</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#22863A;">bean</span><span style="color:#24292E;">&gt;</span></span></code></pre></div></li></ol><h3 id="bean创建流程" tabindex="-1">Bean创建流程 <a class="header-anchor" href="#bean创建流程" aria-label="Permalink to &quot;Bean创建流程&quot;">​</a></h3><p><strong>代码验证</strong></p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">ClassPathXmlApplicationContext ac </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ClassPathXmlApplicationContext</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;classpath:spring/spring-context.xml&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//**********************************************************************************</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// org.springframework.context.support.ClassPathXmlApplicationContext.java</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ClassPathXmlApplicationContext</span><span style="color:#E1E4E8;">(String configLocation) throws BeansException {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] {configLocation}, </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//**********************************************************************************</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ClassPathXmlApplicationContext</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] configLocations, </span><span style="color:#F97583;">boolean</span><span style="color:#E1E4E8;"> refresh, @</span><span style="color:#F97583;">Nullable</span><span style="color:#E1E4E8;"> ApplicationContext parent)</span></span>
<span class="line"><span style="color:#E1E4E8;">    throws BeansException {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">super</span><span style="color:#E1E4E8;">(parent);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">setConfigLocations</span><span style="color:#E1E4E8;">(configLocations);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (refresh) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">refresh</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//**********************************************************************************</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// org.springframework.context.support.AbstractApplicationContext.java</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">refresh</span><span style="color:#E1E4E8;">() throws BeansException, IllegalStateException {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 此处同步锁保证多线程情况下 IOC 容器指只会被创建一次</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">synchronized</span><span style="color:#E1E4E8;"> (</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.startupShutdownMonitor) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// Prepare this context for refreshing.</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">prepareRefresh</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 获取BeanFactory，spring解析xml文件，将xml文件中bean的配置信息保存起来</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// Tell the subclass to refresh the internal bean factory.</span></span>
<span class="line"><span style="color:#E1E4E8;">        ConfigurableListableBeanFactory beanFactory </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">obtainFreshBeanFactory</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 准备BeanFactory</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// Prepare the bean factory for use in this context.</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">prepareBeanFactory</span><span style="color:#E1E4E8;">(beanFactory);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// Allows post-processing of the bean factory in context subclasses.</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">postProcessBeanFactory</span><span style="color:#E1E4E8;">(beanFactory);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 调用在上下文中注册为bean的工厂处理器</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// Invoke factory processors registered as beans in the context.</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">invokeBeanFactoryPostProcessors</span><span style="color:#E1E4E8;">(beanFactory);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 注册spring自家的BeanPostProcessor（Bean后置处理器）</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// Register bean processors that intercept bean creation.</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">registerBeanPostProcessors</span><span style="color:#E1E4E8;">(beanFactory);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 支持国际化功能</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// Initialize message source for this context.</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">initMessageSource</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// Initialize event multicaster for this context.</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">initApplicationEventMulticaster</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 在特定上下文子类中初始化其他特殊bean</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// Initialize other special beans in specific context subclasses.</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">onRefresh</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// Check for listener beans and register them.</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">registerListeners</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 完成beanFacroty的初始化</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 初始化所有非懒加载的单实例bean</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// Instantiate all remaining (non-lazy-init) singletons.</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">finishBeanFactoryInitialization</span><span style="color:#E1E4E8;">(beanFactory);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// Last step: publish corresponding event.</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">finishRefresh</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">catch</span><span style="color:#E1E4E8;"> (BeansException </span><span style="color:#FFAB70;">ex</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (logger.</span><span style="color:#B392F0;">isWarnEnabled</span><span style="color:#E1E4E8;">()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                logger.</span><span style="color:#B392F0;">warn</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Exception encountered during context initialization - &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span></span>
<span class="line"><span style="color:#E1E4E8;">                            </span><span style="color:#9ECBFF;">&quot;cancelling refresh attempt: &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> ex);</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// Destroy already created singletons to avoid dangling resources.</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">destroyBeans</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// Reset &#39;active&#39; flag.</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">cancelRefresh</span><span style="color:#E1E4E8;">(ex);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// Propagate exception to caller.</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> ex;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">finally</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// Reset common introspection caches in Spring&#39;s core, since we</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// might not ever need metadata for singleton beans anymore...</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">resetCommonCaches</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//**********************************************************************************</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// org.springframework.context.support.AbstractApplicationContext.java</span></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 完成此上下文的bean工厂的初始化，初始化所有剩余的单例bean</span></span>
<span class="line"><span style="color:#6A737D;"> * Finish the initialization of this context&#39;s bean factory,</span></span>
<span class="line"><span style="color:#6A737D;"> * initializing all remaining singleton beans.</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">protected</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">finishBeanFactoryInitialization</span><span style="color:#E1E4E8;">(ConfigurableListableBeanFactory beanFactory) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 为此上下文初始化转换服务</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// Initialize conversion service for this context.</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (beanFactory.</span><span style="color:#B392F0;">containsBean</span><span style="color:#E1E4E8;">(CONVERSION_SERVICE_BEAN_NAME) </span><span style="color:#F97583;">&amp;&amp;</span></span>
<span class="line"><span style="color:#E1E4E8;">        beanFactory.</span><span style="color:#B392F0;">isTypeMatch</span><span style="color:#E1E4E8;">(CONVERSION_SERVICE_BEAN_NAME, ConversionService.class)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        beanFactory.</span><span style="color:#B392F0;">setConversionService</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">            beanFactory.</span><span style="color:#B392F0;">getBean</span><span style="color:#E1E4E8;">(CONVERSION_SERVICE_BEAN_NAME, ConversionService.class));</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 如果之前没有任何bean后处理器（例如PropertyPlaceholderConfigurer bean）之前进行过注册，	 // 请注册一个默认的嵌入式值解析器，主要用于注释属性值的解析。</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// Register a default embedded value resolver if no bean post-processor</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// (such as a PropertyPlaceholderConfigurer bean) registered any before:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// at this point, primarily for resolution in annotation attribute values.</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">beanFactory.</span><span style="color:#B392F0;">hasEmbeddedValueResolver</span><span style="color:#E1E4E8;">()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        beanFactory.</span><span style="color:#B392F0;">addEmbeddedValueResolver</span><span style="color:#E1E4E8;">(strVal </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getEnvironment</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">resolvePlaceholders</span><span style="color:#E1E4E8;">(strVal));</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 尽早初始化LoadTimeWeaverAware Bean，以便尽早注册其转换器。</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// Initialize LoadTimeWeaverAware beans early to allow for registering their transformers early.</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] weaverAwareNames </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> beanFactory.</span><span style="color:#B392F0;">getBeanNamesForType</span><span style="color:#E1E4E8;">(LoadTimeWeaverAware.class, </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (String weaverAwareName </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> weaverAwareNames) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">getBean</span><span style="color:#E1E4E8;">(weaverAwareName);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 停止使用临时ClassLoader进行类型匹配</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// Stop using the temporary ClassLoader for type matching.</span></span>
<span class="line"><span style="color:#E1E4E8;">    beanFactory.</span><span style="color:#B392F0;">setTempClassLoader</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 冻结bean配置，不允许再对其进行修改</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 允许缓存所有bean定义元数据，不希望有进一步的更改</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// Allow for caching all bean definition metadata, not expecting further changes.</span></span>
<span class="line"><span style="color:#E1E4E8;">    beanFactory.</span><span style="color:#B392F0;">freezeConfiguration</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 初始化所有非懒加载的单实例bean</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// Instantiate all remaining (non-lazy-init) singletons.</span></span>
<span class="line"><span style="color:#E1E4E8;">    beanFactory.</span><span style="color:#B392F0;">preInstantiateSingletons</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//**********************************************************************************</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// org.springframework.beans.factory.support.DefaultListableBeanFactory.java</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">preInstantiateSingletons</span><span style="color:#E1E4E8;">() throws BeansException {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (logger.</span><span style="color:#B392F0;">isTraceEnabled</span><span style="color:#E1E4E8;">()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        logger.</span><span style="color:#B392F0;">trace</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Pre-instantiating singletons in &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 遍历beanDefinitionNames拿到所有要创建的bean名</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// Iterate over a copy to allow for init methods which in turn register new bean definitions.</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// While this may not be part of the regular factory bootstrap, it does otherwise work fine.</span></span>
<span class="line"><span style="color:#E1E4E8;">    List&lt;</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">&gt; beanNames </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> ArrayList&lt;&gt;(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.beanDefinitionNames);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 开始按照xml中配置的顺序初始化所有非懒加载的单实例bean</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// Trigger initialization of all non-lazy singleton beans...</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (String beanName </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> beanNames) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 根据bean的id获取xml中bean的定义信息</span></span>
<span class="line"><span style="color:#E1E4E8;">        RootBeanDefinition bd </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getMergedLocalBeanDefinition</span><span style="color:#E1E4E8;">(beanName);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 判断bean是否是抽象，非懒加载的单例bean</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">bd.</span><span style="color:#B392F0;">isAbstract</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> bd.</span><span style="color:#B392F0;">isSingleton</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">bd.</span><span style="color:#B392F0;">isLazyInit</span><span style="color:#E1E4E8;">()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 判断是否是工厂bean</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#B392F0;">isFactoryBean</span><span style="color:#E1E4E8;">(beanName)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                Object bean </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getBean</span><span style="color:#E1E4E8;">(FACTORY_BEAN_PREFIX </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> beanName);</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (bean </span><span style="color:#F97583;">instanceof</span><span style="color:#E1E4E8;"> FactoryBean) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> FactoryBean&lt;</span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;">&gt; factory </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (FactoryBean</span><span style="color:#F97583;">&lt;?&gt;</span><span style="color:#E1E4E8;">) bean;</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#F97583;">boolean</span><span style="color:#E1E4E8;"> isEagerInit;</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (System.</span><span style="color:#B392F0;">getSecurityManager</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> factory </span><span style="color:#F97583;">instanceof</span><span style="color:#E1E4E8;"> SmartFactoryBean) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                        isEagerInit </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> AccessController.</span><span style="color:#B392F0;">doPrivileged</span><span style="color:#E1E4E8;">((PrivilegedAction</span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">Boolean</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">                                                                    ((SmartFactoryBean</span><span style="color:#F97583;">&lt;?&gt;</span><span style="color:#E1E4E8;">) factory)</span><span style="color:#F97583;">::</span><span style="color:#E1E4E8;">isEagerInit,</span></span>
<span class="line"><span style="color:#E1E4E8;">                                                                    </span><span style="color:#B392F0;">getAccessControlContext</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">                    }</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">                        isEagerInit </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (factory </span><span style="color:#F97583;">instanceof</span><span style="color:#E1E4E8;"> SmartFactoryBean </span><span style="color:#F97583;">&amp;&amp;</span></span>
<span class="line"><span style="color:#E1E4E8;">                                       ((SmartFactoryBean</span><span style="color:#F97583;">&lt;?&gt;</span><span style="color:#E1E4E8;">) factory).</span><span style="color:#B392F0;">isEagerInit</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">                    }</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (isEagerInit) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                        </span><span style="color:#B392F0;">getBean</span><span style="color:#E1E4E8;">(beanName);</span></span>
<span class="line"><span style="color:#E1E4E8;">                    }</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#6A737D;">// 获取bean</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#B392F0;">getBean</span><span style="color:#E1E4E8;">(beanName);</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// Trigger post-initialization callback for all applicable beans...</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (String beanName </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> beanNames) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        Object singletonInstance </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getSingleton</span><span style="color:#E1E4E8;">(beanName);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (singletonInstance </span><span style="color:#F97583;">instanceof</span><span style="color:#E1E4E8;"> SmartInitializingSingleton) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> SmartInitializingSingleton smartSingleton </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (SmartInitializingSingleton) singletonInstance;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (System.</span><span style="color:#B392F0;">getSecurityManager</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                AccessController.</span><span style="color:#B392F0;">doPrivileged</span><span style="color:#E1E4E8;">((PrivilegedAction</span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">Object</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;">) () </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    smartSingleton.</span><span style="color:#B392F0;">afterSingletonsInstantiated</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">                }, </span><span style="color:#B392F0;">getAccessControlContext</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">                smartSingleton.</span><span style="color:#B392F0;">afterSingletonsInstantiated</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//**********************************************************************************</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// org.springframework.beans.factory.support.AbstractBeanFactory.java</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> Object </span><span style="color:#B392F0;">getBean</span><span style="color:#E1E4E8;">(String name) throws BeansException {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 所有的getBean()方法都是调用doGetBean()</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">doGetBean</span><span style="color:#E1E4E8;">(name, </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// org.springframework.beans.factory.support.AbstractBeanFactory.java</span></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 返回可以与指定bean共享或独立的实例</span></span>
<span class="line"><span style="color:#6A737D;"> * Return an instance, which may be shared or independent, of the specified bean.</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">SuppressWarnings</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;unchecked&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#F97583;">protected</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">T</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> T </span><span style="color:#B392F0;">doGetBean</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> String name, @</span><span style="color:#F97583;">Nullable</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> Class</span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">T</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> requiredType,</span></span>
<span class="line"><span style="color:#E1E4E8;">                          @</span><span style="color:#F97583;">Nullable</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">Object</span><span style="color:#E1E4E8;">[] args, </span><span style="color:#F97583;">boolean</span><span style="color:#E1E4E8;"> typeCheckOnly) throws BeansException {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> String beanName </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">transformedBeanName</span><span style="color:#E1E4E8;">(name);</span></span>
<span class="line"><span style="color:#E1E4E8;">    Object bean;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 先在注册过的单实例bean缓存中检查是否有已经手动注册过的单例bean</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// Eagerly check singleton cache for manually registered singletons.</span></span>
<span class="line"><span style="color:#E1E4E8;">    Object sharedInstance </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getSingleton</span><span style="color:#E1E4E8;">(beanName);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (sharedInstance </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> args </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (logger.</span><span style="color:#B392F0;">isTraceEnabled</span><span style="color:#E1E4E8;">()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#B392F0;">isSingletonCurrentlyInCreation</span><span style="color:#E1E4E8;">(beanName)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                logger.</span><span style="color:#B392F0;">trace</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Returning eagerly cached instance of singleton bean &#39;&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> beanName </span><span style="color:#F97583;">+</span></span>
<span class="line"><span style="color:#E1E4E8;">                             </span><span style="color:#9ECBFF;">&quot;&#39; that is not fully initialized yet - a consequence of a circular reference&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">                logger.</span><span style="color:#B392F0;">trace</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Returning cached instance of singleton bean &#39;&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> beanName </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;&#39;&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        bean </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getObjectForBeanInstance</span><span style="color:#E1E4E8;">(sharedInstance, name, beanName, </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 如果已经在创建这个bean实例，则失败，抛出异常</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// Fail if we&#39;re already creating this bean instance:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// We&#39;re assumably within a circular reference.</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#B392F0;">isPrototypeCurrentlyInCreation</span><span style="color:#E1E4E8;">(beanName)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">BeanCurrentlyInCreationException</span><span style="color:#E1E4E8;">(beanName);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// Check if bean definition exists in this factory.</span></span>
<span class="line"><span style="color:#E1E4E8;">        BeanFactory parentBeanFactory </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getParentBeanFactory</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (parentBeanFactory </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">!</span><span style="color:#B392F0;">containsBeanDefinition</span><span style="color:#E1E4E8;">(beanName)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// Not found -&gt; check parent.</span></span>
<span class="line"><span style="color:#E1E4E8;">            String nameToLookup </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">originalBeanName</span><span style="color:#E1E4E8;">(name);</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (parentBeanFactory </span><span style="color:#F97583;">instanceof</span><span style="color:#E1E4E8;"> AbstractBeanFactory) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> ((AbstractBeanFactory) parentBeanFactory).</span><span style="color:#B392F0;">doGetBean</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">                    nameToLookup, requiredType, args, typeCheckOnly);</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (args </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#6A737D;">// Delegation to parent with explicit args.</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (T) parentBeanFactory.</span><span style="color:#B392F0;">getBean</span><span style="color:#E1E4E8;">(nameToLookup, args);</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (requiredType </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#6A737D;">// No args -&gt; delegate to standard getBean method.</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> parentBeanFactory.</span><span style="color:#B392F0;">getBean</span><span style="color:#E1E4E8;">(nameToLookup, requiredType);</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (T) parentBeanFactory.</span><span style="color:#B392F0;">getBean</span><span style="color:#E1E4E8;">(nameToLookup);</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">typeCheckOnly) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 将bean标记为已创建，保证多线程下的单实例</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">markBeanAsCreated</span><span style="color:#E1E4E8;">(beanName);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> RootBeanDefinition mbd </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getMergedLocalBeanDefinition</span><span style="color:#E1E4E8;">(beanName);</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">checkMergedBeanDefinition</span><span style="color:#E1E4E8;">(mbd, beanName, args);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 确保当前bean依赖的bean的初始化</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// Guarantee initialization of beans that the current bean depends on.</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] dependsOn </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> mbd.</span><span style="color:#B392F0;">getDependsOn</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 如果当前的bean依赖其他bean，则先初始化依赖的bean（depends-on属性）</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (dependsOn </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (String dep </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> dependsOn) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#6A737D;">// 判断当前的bean和所依赖的bean之间是否形成了循环依赖，是则报异常</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#B392F0;">isDependent</span><span style="color:#E1E4E8;">(beanName, dep)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                        </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">BeanCreationException</span><span style="color:#E1E4E8;">(mbd.</span><span style="color:#B392F0;">getResourceDescription</span><span style="color:#E1E4E8;">(), beanName,</span></span>
<span class="line"><span style="color:#E1E4E8;">                                                        </span><span style="color:#9ECBFF;">&quot;Circular depends-on relationship between &#39;&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> beanName </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;&#39; and &#39;&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> dep </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;&#39;&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">                    }</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#B392F0;">registerDependentBean</span><span style="color:#E1E4E8;">(dep, beanName);</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">                        </span><span style="color:#B392F0;">getBean</span><span style="color:#E1E4E8;">(dep);</span></span>
<span class="line"><span style="color:#E1E4E8;">                    }</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#F97583;">catch</span><span style="color:#E1E4E8;"> (NoSuchBeanDefinitionException </span><span style="color:#FFAB70;">ex</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                        </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">BeanCreationException</span><span style="color:#E1E4E8;">(mbd.</span><span style="color:#B392F0;">getResourceDescription</span><span style="color:#E1E4E8;">(), beanName,</span></span>
<span class="line"><span style="color:#E1E4E8;">                                                        </span><span style="color:#9ECBFF;">&quot;&#39;&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> beanName </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;&#39; depends on missing bean &#39;&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> dep </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;&#39;&quot;</span><span style="color:#E1E4E8;">, ex);</span></span>
<span class="line"><span style="color:#E1E4E8;">                    }</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 如果bean是单例的，则创建bean实例</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// Create bean instance.</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (mbd.</span><span style="color:#B392F0;">isSingleton</span><span style="color:#E1E4E8;">()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                sharedInstance </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getSingleton</span><span style="color:#E1E4E8;">(beanName, () </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">                        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createBean</span><span style="color:#E1E4E8;">(beanName, mbd, args);</span></span>
<span class="line"><span style="color:#E1E4E8;">                    }</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#F97583;">catch</span><span style="color:#E1E4E8;"> (BeansException </span><span style="color:#FFAB70;">ex</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                        </span><span style="color:#6A737D;">// Explicitly remove instance from singleton cache: It might have been put there</span></span>
<span class="line"><span style="color:#E1E4E8;">                        </span><span style="color:#6A737D;">// eagerly by the creation process, to allow for circular reference resolution.</span></span>
<span class="line"><span style="color:#E1E4E8;">                        </span><span style="color:#6A737D;">// Also remove any beans that received a temporary reference to the bean.</span></span>
<span class="line"><span style="color:#E1E4E8;">                        </span><span style="color:#B392F0;">destroySingleton</span><span style="color:#E1E4E8;">(beanName);</span></span>
<span class="line"><span style="color:#E1E4E8;">                        </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> ex;</span></span>
<span class="line"><span style="color:#E1E4E8;">                    }</span></span>
<span class="line"><span style="color:#E1E4E8;">                });</span></span>
<span class="line"><span style="color:#E1E4E8;">                bean </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getObjectForBeanInstance</span><span style="color:#E1E4E8;">(sharedInstance, name, beanName, mbd);</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (mbd.</span><span style="color:#B392F0;">isPrototype</span><span style="color:#E1E4E8;">()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#6A737D;">// It&#39;s a prototype -&gt; create a new instance.</span></span>
<span class="line"><span style="color:#E1E4E8;">                Object prototypeInstance </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#B392F0;">beforePrototypeCreation</span><span style="color:#E1E4E8;">(beanName);</span></span>
<span class="line"><span style="color:#E1E4E8;">                    prototypeInstance </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createBean</span><span style="color:#E1E4E8;">(beanName, mbd, args);</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">finally</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#B392F0;">afterPrototypeCreation</span><span style="color:#E1E4E8;">(beanName);</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">                bean </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getObjectForBeanInstance</span><span style="color:#E1E4E8;">(prototypeInstance, name, beanName, mbd);</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">                String scopeName </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> mbd.</span><span style="color:#B392F0;">getScope</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> Scope scope </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.scopes.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(scopeName);</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (scope </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">IllegalStateException</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;No Scope registered for scope name &#39;&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> scopeName </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;&#39;&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    Object scopedInstance </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> scope.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(beanName, () </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">                        </span><span style="color:#B392F0;">beforePrototypeCreation</span><span style="color:#E1E4E8;">(beanName);</span></span>
<span class="line"><span style="color:#E1E4E8;">                        </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">                            </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createBean</span><span style="color:#E1E4E8;">(beanName, mbd, args);</span></span>
<span class="line"><span style="color:#E1E4E8;">                        }</span></span>
<span class="line"><span style="color:#E1E4E8;">                        </span><span style="color:#F97583;">finally</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">                            </span><span style="color:#B392F0;">afterPrototypeCreation</span><span style="color:#E1E4E8;">(beanName);</span></span>
<span class="line"><span style="color:#E1E4E8;">                        }</span></span>
<span class="line"><span style="color:#E1E4E8;">                    });</span></span>
<span class="line"><span style="color:#E1E4E8;">                    bean </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getObjectForBeanInstance</span><span style="color:#E1E4E8;">(scopedInstance, name, beanName, mbd);</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">catch</span><span style="color:#E1E4E8;"> (IllegalStateException </span><span style="color:#FFAB70;">ex</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">BeanCreationException</span><span style="color:#E1E4E8;">(beanName,</span></span>
<span class="line"><span style="color:#E1E4E8;">                                                    </span><span style="color:#9ECBFF;">&quot;Scope &#39;&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> scopeName </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;&#39; is not active for the current thread; consider &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span></span>
<span class="line"><span style="color:#E1E4E8;">                                                    </span><span style="color:#9ECBFF;">&quot;defining a scoped proxy for this bean if you intend to refer to it from a singleton&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                                                    ex);</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">catch</span><span style="color:#E1E4E8;"> (BeansException </span><span style="color:#FFAB70;">ex</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">cleanupAfterBeanCreationFailure</span><span style="color:#E1E4E8;">(beanName);</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> ex;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// Check if required type matches the type of the actual bean instance.</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (requiredType </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">requiredType.</span><span style="color:#B392F0;">isInstance</span><span style="color:#E1E4E8;">(bean)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            T convertedBean </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getTypeConverter</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">convertIfNecessary</span><span style="color:#E1E4E8;">(bean, requiredType);</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (convertedBean </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">BeanNotOfRequiredTypeException</span><span style="color:#E1E4E8;">(name, requiredType, bean.</span><span style="color:#B392F0;">getClass</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> convertedBean;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">catch</span><span style="color:#E1E4E8;"> (TypeMismatchException </span><span style="color:#FFAB70;">ex</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (logger.</span><span style="color:#B392F0;">isTraceEnabled</span><span style="color:#E1E4E8;">()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                logger.</span><span style="color:#B392F0;">trace</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Failed to convert bean &#39;&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> name </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;&#39; to required type &#39;&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span></span>
<span class="line"><span style="color:#E1E4E8;">                             ClassUtils.</span><span style="color:#B392F0;">getQualifiedName</span><span style="color:#E1E4E8;">(requiredType) </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;&#39;&quot;</span><span style="color:#E1E4E8;">, ex);</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">BeanNotOfRequiredTypeException</span><span style="color:#E1E4E8;">(name, requiredType, bean.</span><span style="color:#B392F0;">getClass</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (T) bean;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//**********************************************************************************</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// org.springframework.beans.factory.support.DefaultSingletonBeanRegistry</span></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 返回以给定名称注册的（原始）单例对象，如果尚未注册，则创建并注册一个新对象。</span></span>
<span class="line"><span style="color:#6A737D;"> * Return the (raw) singleton object registered under the given name,</span></span>
<span class="line"><span style="color:#6A737D;"> * creating and registering a new one if none registered yet.</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> Object </span><span style="color:#B392F0;">getSingleton</span><span style="color:#E1E4E8;">(String beanName, ObjectFactory</span><span style="color:#F97583;">&lt;?&gt;</span><span style="color:#E1E4E8;"> singletonFactory) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    Assert.</span><span style="color:#B392F0;">notNull</span><span style="color:#E1E4E8;">(beanName, </span><span style="color:#9ECBFF;">&quot;Bean name must not be null&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">synchronized</span><span style="color:#E1E4E8;"> (</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.singletonObjects) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 将bean从singletonObjects中get出来</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// singletonObjects：IOC容器之一。仅用来保存单实例bean。</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 用来缓存单例对象，将单例对象保存到一个map中，key==beanName，value==beanInstance</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#6A737D;">// private final Map&lt;String, Object&gt; singletonObjects = new ConcurrentHashMap&lt;&gt;(256);</span></span>
<span class="line"><span style="color:#E1E4E8;">        Object singletonObject </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.singletonObjects.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(beanName);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (singletonObject </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.singletonsCurrentlyInDestruction) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">BeanCreationNotAllowedException</span><span style="color:#E1E4E8;">(beanName,</span></span>
<span class="line"><span style="color:#E1E4E8;">                                                          </span><span style="color:#9ECBFF;">&quot;Singleton bean creation not allowed while singletons of this factory are in destruction &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span></span>
<span class="line"><span style="color:#E1E4E8;">                                                          </span><span style="color:#9ECBFF;">&quot;(Do not request a bean from a BeanFactory in a destroy method implementation!)&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (logger.</span><span style="color:#B392F0;">isDebugEnabled</span><span style="color:#E1E4E8;">()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                logger.</span><span style="color:#B392F0;">debug</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Creating shared instance of singleton bean &#39;&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> beanName </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;&#39;&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">beforeSingletonCreation</span><span style="color:#E1E4E8;">(beanName);</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">boolean</span><span style="color:#E1E4E8;"> newSingleton </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">boolean</span><span style="color:#E1E4E8;"> recordSuppressedExceptions </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.suppressedExceptions </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (recordSuppressedExceptions) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.suppressedExceptions </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> LinkedHashSet&lt;&gt;();</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#6A737D;">// 创建bean</span></span>
<span class="line"><span style="color:#E1E4E8;">                singletonObject </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> singletonFactory.</span><span style="color:#B392F0;">getObject</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">                newSingleton </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">catch</span><span style="color:#E1E4E8;"> (IllegalStateException </span><span style="color:#FFAB70;">ex</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#6A737D;">// Has the singleton object implicitly appeared in the meantime -&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#6A737D;">// if yes, proceed with it since the exception indicates that state.</span></span>
<span class="line"><span style="color:#E1E4E8;">                singletonObject </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.singletonObjects.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(beanName);</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (singletonObject </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> ex;</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">catch</span><span style="color:#E1E4E8;"> (BeanCreationException </span><span style="color:#FFAB70;">ex</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (recordSuppressedExceptions) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (Exception suppressedException </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.suppressedExceptions) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                        ex.</span><span style="color:#B392F0;">addRelatedCause</span><span style="color:#E1E4E8;">(suppressedException);</span></span>
<span class="line"><span style="color:#E1E4E8;">                    }</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> ex;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">finally</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (recordSuppressedExceptions) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.suppressedExceptions </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#B392F0;">afterSingletonCreation</span><span style="color:#E1E4E8;">(beanName);</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (newSingleton) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#6A737D;">// 添加创建的bean</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#B392F0;">addSingleton</span><span style="color:#E1E4E8;">(beanName, singletonObject);</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> singletonObject;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//**********************************************************************************</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// org.springframework.beans.factory.support.DefaultSingletonBeanRegistry</span></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 将给定的单例对象添加到该工厂的单例缓存中</span></span>
<span class="line"><span style="color:#6A737D;"> * 即将创建好的单例bean添加到singletonObject这个map中，以后从容器中获取bean只要从这个map中获取即可。</span></span>
<span class="line"><span style="color:#6A737D;"> * Add the given singleton object to the singleton cache of this factory.</span></span>
<span class="line"><span style="color:#6A737D;"> * &lt;p&gt;To be called for eager registration of singletons.</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">protected</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">addSingleton</span><span style="color:#E1E4E8;">(String beanName, Object singletonObject) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">synchronized</span><span style="color:#E1E4E8;"> (</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.singletonObjects) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.singletonObjects.</span><span style="color:#B392F0;">put</span><span style="color:#E1E4E8;">(beanName, singletonObject);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.singletonFactories.</span><span style="color:#B392F0;">remove</span><span style="color:#E1E4E8;">(beanName);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.earlySingletonObjects.</span><span style="color:#B392F0;">remove</span><span style="color:#E1E4E8;">(beanName);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.registeredSingletons.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(beanName);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">ClassPathXmlApplicationContext ac </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ClassPathXmlApplicationContext</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;classpath:spring/spring-context.xml&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//**********************************************************************************</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// org.springframework.context.support.ClassPathXmlApplicationContext.java</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ClassPathXmlApplicationContext</span><span style="color:#24292E;">(String configLocation) throws BeansException {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] {configLocation}, </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//**********************************************************************************</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ClassPathXmlApplicationContext</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] configLocations, </span><span style="color:#D73A49;">boolean</span><span style="color:#24292E;"> refresh, @</span><span style="color:#D73A49;">Nullable</span><span style="color:#24292E;"> ApplicationContext parent)</span></span>
<span class="line"><span style="color:#24292E;">    throws BeansException {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">super</span><span style="color:#24292E;">(parent);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">setConfigLocations</span><span style="color:#24292E;">(configLocations);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (refresh) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">refresh</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//**********************************************************************************</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// org.springframework.context.support.AbstractApplicationContext.java</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">refresh</span><span style="color:#24292E;">() throws BeansException, IllegalStateException {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 此处同步锁保证多线程情况下 IOC 容器指只会被创建一次</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">synchronized</span><span style="color:#24292E;"> (</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.startupShutdownMonitor) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// Prepare this context for refreshing.</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">prepareRefresh</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 获取BeanFactory，spring解析xml文件，将xml文件中bean的配置信息保存起来</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// Tell the subclass to refresh the internal bean factory.</span></span>
<span class="line"><span style="color:#24292E;">        ConfigurableListableBeanFactory beanFactory </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">obtainFreshBeanFactory</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 准备BeanFactory</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// Prepare the bean factory for use in this context.</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">prepareBeanFactory</span><span style="color:#24292E;">(beanFactory);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// Allows post-processing of the bean factory in context subclasses.</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">postProcessBeanFactory</span><span style="color:#24292E;">(beanFactory);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 调用在上下文中注册为bean的工厂处理器</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// Invoke factory processors registered as beans in the context.</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">invokeBeanFactoryPostProcessors</span><span style="color:#24292E;">(beanFactory);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 注册spring自家的BeanPostProcessor（Bean后置处理器）</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// Register bean processors that intercept bean creation.</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">registerBeanPostProcessors</span><span style="color:#24292E;">(beanFactory);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 支持国际化功能</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// Initialize message source for this context.</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">initMessageSource</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// Initialize event multicaster for this context.</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">initApplicationEventMulticaster</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 在特定上下文子类中初始化其他特殊bean</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// Initialize other special beans in specific context subclasses.</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">onRefresh</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// Check for listener beans and register them.</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">registerListeners</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 完成beanFacroty的初始化</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 初始化所有非懒加载的单实例bean</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// Instantiate all remaining (non-lazy-init) singletons.</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">finishBeanFactoryInitialization</span><span style="color:#24292E;">(beanFactory);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// Last step: publish corresponding event.</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">finishRefresh</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">catch</span><span style="color:#24292E;"> (BeansException </span><span style="color:#E36209;">ex</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (logger.</span><span style="color:#6F42C1;">isWarnEnabled</span><span style="color:#24292E;">()) {</span></span>
<span class="line"><span style="color:#24292E;">                logger.</span><span style="color:#6F42C1;">warn</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Exception encountered during context initialization - &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span></span>
<span class="line"><span style="color:#24292E;">                            </span><span style="color:#032F62;">&quot;cancelling refresh attempt: &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> ex);</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// Destroy already created singletons to avoid dangling resources.</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">destroyBeans</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// Reset &#39;active&#39; flag.</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">cancelRefresh</span><span style="color:#24292E;">(ex);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// Propagate exception to caller.</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> ex;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">finally</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// Reset common introspection caches in Spring&#39;s core, since we</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// might not ever need metadata for singleton beans anymore...</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">resetCommonCaches</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//**********************************************************************************</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// org.springframework.context.support.AbstractApplicationContext.java</span></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 完成此上下文的bean工厂的初始化，初始化所有剩余的单例bean</span></span>
<span class="line"><span style="color:#6A737D;"> * Finish the initialization of this context&#39;s bean factory,</span></span>
<span class="line"><span style="color:#6A737D;"> * initializing all remaining singleton beans.</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">protected</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">finishBeanFactoryInitialization</span><span style="color:#24292E;">(ConfigurableListableBeanFactory beanFactory) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 为此上下文初始化转换服务</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// Initialize conversion service for this context.</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (beanFactory.</span><span style="color:#6F42C1;">containsBean</span><span style="color:#24292E;">(CONVERSION_SERVICE_BEAN_NAME) </span><span style="color:#D73A49;">&amp;&amp;</span></span>
<span class="line"><span style="color:#24292E;">        beanFactory.</span><span style="color:#6F42C1;">isTypeMatch</span><span style="color:#24292E;">(CONVERSION_SERVICE_BEAN_NAME, ConversionService.class)) {</span></span>
<span class="line"><span style="color:#24292E;">        beanFactory.</span><span style="color:#6F42C1;">setConversionService</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">            beanFactory.</span><span style="color:#6F42C1;">getBean</span><span style="color:#24292E;">(CONVERSION_SERVICE_BEAN_NAME, ConversionService.class));</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 如果之前没有任何bean后处理器（例如PropertyPlaceholderConfigurer bean）之前进行过注册，	 // 请注册一个默认的嵌入式值解析器，主要用于注释属性值的解析。</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// Register a default embedded value resolver if no bean post-processor</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// (such as a PropertyPlaceholderConfigurer bean) registered any before:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// at this point, primarily for resolution in annotation attribute values.</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">beanFactory.</span><span style="color:#6F42C1;">hasEmbeddedValueResolver</span><span style="color:#24292E;">()) {</span></span>
<span class="line"><span style="color:#24292E;">        beanFactory.</span><span style="color:#6F42C1;">addEmbeddedValueResolver</span><span style="color:#24292E;">(strVal </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getEnvironment</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">resolvePlaceholders</span><span style="color:#24292E;">(strVal));</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 尽早初始化LoadTimeWeaverAware Bean，以便尽早注册其转换器。</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// Initialize LoadTimeWeaverAware beans early to allow for registering their transformers early.</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] weaverAwareNames </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> beanFactory.</span><span style="color:#6F42C1;">getBeanNamesForType</span><span style="color:#24292E;">(LoadTimeWeaverAware.class, </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (String weaverAwareName </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> weaverAwareNames) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">getBean</span><span style="color:#24292E;">(weaverAwareName);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 停止使用临时ClassLoader进行类型匹配</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// Stop using the temporary ClassLoader for type matching.</span></span>
<span class="line"><span style="color:#24292E;">    beanFactory.</span><span style="color:#6F42C1;">setTempClassLoader</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">null</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 冻结bean配置，不允许再对其进行修改</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 允许缓存所有bean定义元数据，不希望有进一步的更改</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// Allow for caching all bean definition metadata, not expecting further changes.</span></span>
<span class="line"><span style="color:#24292E;">    beanFactory.</span><span style="color:#6F42C1;">freezeConfiguration</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 初始化所有非懒加载的单实例bean</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// Instantiate all remaining (non-lazy-init) singletons.</span></span>
<span class="line"><span style="color:#24292E;">    beanFactory.</span><span style="color:#6F42C1;">preInstantiateSingletons</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//**********************************************************************************</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// org.springframework.beans.factory.support.DefaultListableBeanFactory.java</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">preInstantiateSingletons</span><span style="color:#24292E;">() throws BeansException {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (logger.</span><span style="color:#6F42C1;">isTraceEnabled</span><span style="color:#24292E;">()) {</span></span>
<span class="line"><span style="color:#24292E;">        logger.</span><span style="color:#6F42C1;">trace</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Pre-instantiating singletons in &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 遍历beanDefinitionNames拿到所有要创建的bean名</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// Iterate over a copy to allow for init methods which in turn register new bean definitions.</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// While this may not be part of the regular factory bootstrap, it does otherwise work fine.</span></span>
<span class="line"><span style="color:#24292E;">    List&lt;</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">&gt; beanNames </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> ArrayList&lt;&gt;(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.beanDefinitionNames);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 开始按照xml中配置的顺序初始化所有非懒加载的单实例bean</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// Trigger initialization of all non-lazy singleton beans...</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (String beanName </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> beanNames) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 根据bean的id获取xml中bean的定义信息</span></span>
<span class="line"><span style="color:#24292E;">        RootBeanDefinition bd </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getMergedLocalBeanDefinition</span><span style="color:#24292E;">(beanName);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 判断bean是否是抽象，非懒加载的单例bean</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">bd.</span><span style="color:#6F42C1;">isAbstract</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> bd.</span><span style="color:#6F42C1;">isSingleton</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">!</span><span style="color:#24292E;">bd.</span><span style="color:#6F42C1;">isLazyInit</span><span style="color:#24292E;">()) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 判断是否是工厂bean</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#6F42C1;">isFactoryBean</span><span style="color:#24292E;">(beanName)) {</span></span>
<span class="line"><span style="color:#24292E;">                Object bean </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getBean</span><span style="color:#24292E;">(FACTORY_BEAN_PREFIX </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> beanName);</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (bean </span><span style="color:#D73A49;">instanceof</span><span style="color:#24292E;"> FactoryBean) {</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> FactoryBean&lt;</span><span style="color:#D73A49;">?</span><span style="color:#24292E;">&gt; factory </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (FactoryBean</span><span style="color:#D73A49;">&lt;?&gt;</span><span style="color:#24292E;">) bean;</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#D73A49;">boolean</span><span style="color:#24292E;"> isEagerInit;</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (System.</span><span style="color:#6F42C1;">getSecurityManager</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> factory </span><span style="color:#D73A49;">instanceof</span><span style="color:#24292E;"> SmartFactoryBean) {</span></span>
<span class="line"><span style="color:#24292E;">                        isEagerInit </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> AccessController.</span><span style="color:#6F42C1;">doPrivileged</span><span style="color:#24292E;">((PrivilegedAction</span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">Boolean</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">                                                                    ((SmartFactoryBean</span><span style="color:#D73A49;">&lt;?&gt;</span><span style="color:#24292E;">) factory)</span><span style="color:#D73A49;">::</span><span style="color:#24292E;">isEagerInit,</span></span>
<span class="line"><span style="color:#24292E;">                                                                    </span><span style="color:#6F42C1;">getAccessControlContext</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">                    }</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">                        isEagerInit </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (factory </span><span style="color:#D73A49;">instanceof</span><span style="color:#24292E;"> SmartFactoryBean </span><span style="color:#D73A49;">&amp;&amp;</span></span>
<span class="line"><span style="color:#24292E;">                                       ((SmartFactoryBean</span><span style="color:#D73A49;">&lt;?&gt;</span><span style="color:#24292E;">) factory).</span><span style="color:#6F42C1;">isEagerInit</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">                    }</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (isEagerInit) {</span></span>
<span class="line"><span style="color:#24292E;">                        </span><span style="color:#6F42C1;">getBean</span><span style="color:#24292E;">(beanName);</span></span>
<span class="line"><span style="color:#24292E;">                    }</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6A737D;">// 获取bean</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6F42C1;">getBean</span><span style="color:#24292E;">(beanName);</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// Trigger post-initialization callback for all applicable beans...</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (String beanName </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> beanNames) {</span></span>
<span class="line"><span style="color:#24292E;">        Object singletonInstance </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getSingleton</span><span style="color:#24292E;">(beanName);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (singletonInstance </span><span style="color:#D73A49;">instanceof</span><span style="color:#24292E;"> SmartInitializingSingleton) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> SmartInitializingSingleton smartSingleton </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (SmartInitializingSingleton) singletonInstance;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (System.</span><span style="color:#6F42C1;">getSecurityManager</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">                AccessController.</span><span style="color:#6F42C1;">doPrivileged</span><span style="color:#24292E;">((PrivilegedAction</span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">Object</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;">) () </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">                    smartSingleton.</span><span style="color:#6F42C1;">afterSingletonsInstantiated</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">                }, </span><span style="color:#6F42C1;">getAccessControlContext</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">                smartSingleton.</span><span style="color:#6F42C1;">afterSingletonsInstantiated</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//**********************************************************************************</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// org.springframework.beans.factory.support.AbstractBeanFactory.java</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> Object </span><span style="color:#6F42C1;">getBean</span><span style="color:#24292E;">(String name) throws BeansException {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 所有的getBean()方法都是调用doGetBean()</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">doGetBean</span><span style="color:#24292E;">(name, </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// org.springframework.beans.factory.support.AbstractBeanFactory.java</span></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 返回可以与指定bean共享或独立的实例</span></span>
<span class="line"><span style="color:#6A737D;"> * Return an instance, which may be shared or independent, of the specified bean.</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">SuppressWarnings</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;unchecked&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#D73A49;">protected</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">T</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> T </span><span style="color:#6F42C1;">doGetBean</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> String name, @</span><span style="color:#D73A49;">Nullable</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> Class</span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">T</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> requiredType,</span></span>
<span class="line"><span style="color:#24292E;">                          @</span><span style="color:#D73A49;">Nullable</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">Object</span><span style="color:#24292E;">[] args, </span><span style="color:#D73A49;">boolean</span><span style="color:#24292E;"> typeCheckOnly) throws BeansException {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> String beanName </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">transformedBeanName</span><span style="color:#24292E;">(name);</span></span>
<span class="line"><span style="color:#24292E;">    Object bean;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 先在注册过的单实例bean缓存中检查是否有已经手动注册过的单例bean</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// Eagerly check singleton cache for manually registered singletons.</span></span>
<span class="line"><span style="color:#24292E;">    Object sharedInstance </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getSingleton</span><span style="color:#24292E;">(beanName);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (sharedInstance </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> args </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (logger.</span><span style="color:#6F42C1;">isTraceEnabled</span><span style="color:#24292E;">()) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#6F42C1;">isSingletonCurrentlyInCreation</span><span style="color:#24292E;">(beanName)) {</span></span>
<span class="line"><span style="color:#24292E;">                logger.</span><span style="color:#6F42C1;">trace</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Returning eagerly cached instance of singleton bean &#39;&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> beanName </span><span style="color:#D73A49;">+</span></span>
<span class="line"><span style="color:#24292E;">                             </span><span style="color:#032F62;">&quot;&#39; that is not fully initialized yet - a consequence of a circular reference&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">                logger.</span><span style="color:#6F42C1;">trace</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Returning cached instance of singleton bean &#39;&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> beanName </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;&#39;&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        bean </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getObjectForBeanInstance</span><span style="color:#24292E;">(sharedInstance, name, beanName, </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 如果已经在创建这个bean实例，则失败，抛出异常</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// Fail if we&#39;re already creating this bean instance:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// We&#39;re assumably within a circular reference.</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#6F42C1;">isPrototypeCurrentlyInCreation</span><span style="color:#24292E;">(beanName)) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">BeanCurrentlyInCreationException</span><span style="color:#24292E;">(beanName);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// Check if bean definition exists in this factory.</span></span>
<span class="line"><span style="color:#24292E;">        BeanFactory parentBeanFactory </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getParentBeanFactory</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (parentBeanFactory </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">!</span><span style="color:#6F42C1;">containsBeanDefinition</span><span style="color:#24292E;">(beanName)) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// Not found -&gt; check parent.</span></span>
<span class="line"><span style="color:#24292E;">            String nameToLookup </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">originalBeanName</span><span style="color:#24292E;">(name);</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (parentBeanFactory </span><span style="color:#D73A49;">instanceof</span><span style="color:#24292E;"> AbstractBeanFactory) {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> ((AbstractBeanFactory) parentBeanFactory).</span><span style="color:#6F42C1;">doGetBean</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">                    nameToLookup, requiredType, args, typeCheckOnly);</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (args </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6A737D;">// Delegation to parent with explicit args.</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (T) parentBeanFactory.</span><span style="color:#6F42C1;">getBean</span><span style="color:#24292E;">(nameToLookup, args);</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (requiredType </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6A737D;">// No args -&gt; delegate to standard getBean method.</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> parentBeanFactory.</span><span style="color:#6F42C1;">getBean</span><span style="color:#24292E;">(nameToLookup, requiredType);</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (T) parentBeanFactory.</span><span style="color:#6F42C1;">getBean</span><span style="color:#24292E;">(nameToLookup);</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">typeCheckOnly) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 将bean标记为已创建，保证多线程下的单实例</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">markBeanAsCreated</span><span style="color:#24292E;">(beanName);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> RootBeanDefinition mbd </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getMergedLocalBeanDefinition</span><span style="color:#24292E;">(beanName);</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">checkMergedBeanDefinition</span><span style="color:#24292E;">(mbd, beanName, args);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 确保当前bean依赖的bean的初始化</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// Guarantee initialization of beans that the current bean depends on.</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] dependsOn </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> mbd.</span><span style="color:#6F42C1;">getDependsOn</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 如果当前的bean依赖其他bean，则先初始化依赖的bean（depends-on属性）</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (dependsOn </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (String dep </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> dependsOn) {</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#6A737D;">// 判断当前的bean和所依赖的bean之间是否形成了循环依赖，是则报异常</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#6F42C1;">isDependent</span><span style="color:#24292E;">(beanName, dep)) {</span></span>
<span class="line"><span style="color:#24292E;">                        </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">BeanCreationException</span><span style="color:#24292E;">(mbd.</span><span style="color:#6F42C1;">getResourceDescription</span><span style="color:#24292E;">(), beanName,</span></span>
<span class="line"><span style="color:#24292E;">                                                        </span><span style="color:#032F62;">&quot;Circular depends-on relationship between &#39;&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> beanName </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;&#39; and &#39;&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> dep </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;&#39;&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">                    }</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#6F42C1;">registerDependentBean</span><span style="color:#24292E;">(dep, beanName);</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">                        </span><span style="color:#6F42C1;">getBean</span><span style="color:#24292E;">(dep);</span></span>
<span class="line"><span style="color:#24292E;">                    }</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#D73A49;">catch</span><span style="color:#24292E;"> (NoSuchBeanDefinitionException </span><span style="color:#E36209;">ex</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">                        </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">BeanCreationException</span><span style="color:#24292E;">(mbd.</span><span style="color:#6F42C1;">getResourceDescription</span><span style="color:#24292E;">(), beanName,</span></span>
<span class="line"><span style="color:#24292E;">                                                        </span><span style="color:#032F62;">&quot;&#39;&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> beanName </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;&#39; depends on missing bean &#39;&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> dep </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;&#39;&quot;</span><span style="color:#24292E;">, ex);</span></span>
<span class="line"><span style="color:#24292E;">                    }</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 如果bean是单例的，则创建bean实例</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// Create bean instance.</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (mbd.</span><span style="color:#6F42C1;">isSingleton</span><span style="color:#24292E;">()) {</span></span>
<span class="line"><span style="color:#24292E;">                sharedInstance </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getSingleton</span><span style="color:#24292E;">(beanName, () </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">                        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createBean</span><span style="color:#24292E;">(beanName, mbd, args);</span></span>
<span class="line"><span style="color:#24292E;">                    }</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#D73A49;">catch</span><span style="color:#24292E;"> (BeansException </span><span style="color:#E36209;">ex</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">                        </span><span style="color:#6A737D;">// Explicitly remove instance from singleton cache: It might have been put there</span></span>
<span class="line"><span style="color:#24292E;">                        </span><span style="color:#6A737D;">// eagerly by the creation process, to allow for circular reference resolution.</span></span>
<span class="line"><span style="color:#24292E;">                        </span><span style="color:#6A737D;">// Also remove any beans that received a temporary reference to the bean.</span></span>
<span class="line"><span style="color:#24292E;">                        </span><span style="color:#6F42C1;">destroySingleton</span><span style="color:#24292E;">(beanName);</span></span>
<span class="line"><span style="color:#24292E;">                        </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> ex;</span></span>
<span class="line"><span style="color:#24292E;">                    }</span></span>
<span class="line"><span style="color:#24292E;">                });</span></span>
<span class="line"><span style="color:#24292E;">                bean </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getObjectForBeanInstance</span><span style="color:#24292E;">(sharedInstance, name, beanName, mbd);</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (mbd.</span><span style="color:#6F42C1;">isPrototype</span><span style="color:#24292E;">()) {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6A737D;">// It&#39;s a prototype -&gt; create a new instance.</span></span>
<span class="line"><span style="color:#24292E;">                Object prototypeInstance </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#6F42C1;">beforePrototypeCreation</span><span style="color:#24292E;">(beanName);</span></span>
<span class="line"><span style="color:#24292E;">                    prototypeInstance </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createBean</span><span style="color:#24292E;">(beanName, mbd, args);</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">finally</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#6F42C1;">afterPrototypeCreation</span><span style="color:#24292E;">(beanName);</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">                bean </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getObjectForBeanInstance</span><span style="color:#24292E;">(prototypeInstance, name, beanName, mbd);</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">                String scopeName </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> mbd.</span><span style="color:#6F42C1;">getScope</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> Scope scope </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.scopes.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(scopeName);</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (scope </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">IllegalStateException</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;No Scope registered for scope name &#39;&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> scopeName </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;&#39;&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">                    Object scopedInstance </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> scope.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(beanName, () </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">                        </span><span style="color:#6F42C1;">beforePrototypeCreation</span><span style="color:#24292E;">(beanName);</span></span>
<span class="line"><span style="color:#24292E;">                        </span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">                            </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createBean</span><span style="color:#24292E;">(beanName, mbd, args);</span></span>
<span class="line"><span style="color:#24292E;">                        }</span></span>
<span class="line"><span style="color:#24292E;">                        </span><span style="color:#D73A49;">finally</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">                            </span><span style="color:#6F42C1;">afterPrototypeCreation</span><span style="color:#24292E;">(beanName);</span></span>
<span class="line"><span style="color:#24292E;">                        }</span></span>
<span class="line"><span style="color:#24292E;">                    });</span></span>
<span class="line"><span style="color:#24292E;">                    bean </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getObjectForBeanInstance</span><span style="color:#24292E;">(scopedInstance, name, beanName, mbd);</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">catch</span><span style="color:#24292E;"> (IllegalStateException </span><span style="color:#E36209;">ex</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">BeanCreationException</span><span style="color:#24292E;">(beanName,</span></span>
<span class="line"><span style="color:#24292E;">                                                    </span><span style="color:#032F62;">&quot;Scope &#39;&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> scopeName </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;&#39; is not active for the current thread; consider &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span></span>
<span class="line"><span style="color:#24292E;">                                                    </span><span style="color:#032F62;">&quot;defining a scoped proxy for this bean if you intend to refer to it from a singleton&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                                                    ex);</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">catch</span><span style="color:#24292E;"> (BeansException </span><span style="color:#E36209;">ex</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">cleanupAfterBeanCreationFailure</span><span style="color:#24292E;">(beanName);</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> ex;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// Check if required type matches the type of the actual bean instance.</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (requiredType </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">!</span><span style="color:#24292E;">requiredType.</span><span style="color:#6F42C1;">isInstance</span><span style="color:#24292E;">(bean)) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            T convertedBean </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getTypeConverter</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">convertIfNecessary</span><span style="color:#24292E;">(bean, requiredType);</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (convertedBean </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">BeanNotOfRequiredTypeException</span><span style="color:#24292E;">(name, requiredType, bean.</span><span style="color:#6F42C1;">getClass</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> convertedBean;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">catch</span><span style="color:#24292E;"> (TypeMismatchException </span><span style="color:#E36209;">ex</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (logger.</span><span style="color:#6F42C1;">isTraceEnabled</span><span style="color:#24292E;">()) {</span></span>
<span class="line"><span style="color:#24292E;">                logger.</span><span style="color:#6F42C1;">trace</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Failed to convert bean &#39;&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> name </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;&#39; to required type &#39;&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span></span>
<span class="line"><span style="color:#24292E;">                             ClassUtils.</span><span style="color:#6F42C1;">getQualifiedName</span><span style="color:#24292E;">(requiredType) </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;&#39;&quot;</span><span style="color:#24292E;">, ex);</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">BeanNotOfRequiredTypeException</span><span style="color:#24292E;">(name, requiredType, bean.</span><span style="color:#6F42C1;">getClass</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (T) bean;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//**********************************************************************************</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// org.springframework.beans.factory.support.DefaultSingletonBeanRegistry</span></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 返回以给定名称注册的（原始）单例对象，如果尚未注册，则创建并注册一个新对象。</span></span>
<span class="line"><span style="color:#6A737D;"> * Return the (raw) singleton object registered under the given name,</span></span>
<span class="line"><span style="color:#6A737D;"> * creating and registering a new one if none registered yet.</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> Object </span><span style="color:#6F42C1;">getSingleton</span><span style="color:#24292E;">(String beanName, ObjectFactory</span><span style="color:#D73A49;">&lt;?&gt;</span><span style="color:#24292E;"> singletonFactory) {</span></span>
<span class="line"><span style="color:#24292E;">    Assert.</span><span style="color:#6F42C1;">notNull</span><span style="color:#24292E;">(beanName, </span><span style="color:#032F62;">&quot;Bean name must not be null&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">synchronized</span><span style="color:#24292E;"> (</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.singletonObjects) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 将bean从singletonObjects中get出来</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// singletonObjects：IOC容器之一。仅用来保存单实例bean。</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 用来缓存单例对象，将单例对象保存到一个map中，key==beanName，value==beanInstance</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6A737D;">// private final Map&lt;String, Object&gt; singletonObjects = new ConcurrentHashMap&lt;&gt;(256);</span></span>
<span class="line"><span style="color:#24292E;">        Object singletonObject </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.singletonObjects.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(beanName);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (singletonObject </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.singletonsCurrentlyInDestruction) {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">BeanCreationNotAllowedException</span><span style="color:#24292E;">(beanName,</span></span>
<span class="line"><span style="color:#24292E;">                                                          </span><span style="color:#032F62;">&quot;Singleton bean creation not allowed while singletons of this factory are in destruction &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span></span>
<span class="line"><span style="color:#24292E;">                                                          </span><span style="color:#032F62;">&quot;(Do not request a bean from a BeanFactory in a destroy method implementation!)&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (logger.</span><span style="color:#6F42C1;">isDebugEnabled</span><span style="color:#24292E;">()) {</span></span>
<span class="line"><span style="color:#24292E;">                logger.</span><span style="color:#6F42C1;">debug</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Creating shared instance of singleton bean &#39;&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> beanName </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;&#39;&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">beforeSingletonCreation</span><span style="color:#24292E;">(beanName);</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">boolean</span><span style="color:#24292E;"> newSingleton </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">boolean</span><span style="color:#24292E;"> recordSuppressedExceptions </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.suppressedExceptions </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (recordSuppressedExceptions) {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.suppressedExceptions </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> LinkedHashSet&lt;&gt;();</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6A737D;">// 创建bean</span></span>
<span class="line"><span style="color:#24292E;">                singletonObject </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> singletonFactory.</span><span style="color:#6F42C1;">getObject</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">                newSingleton </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">catch</span><span style="color:#24292E;"> (IllegalStateException </span><span style="color:#E36209;">ex</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6A737D;">// Has the singleton object implicitly appeared in the meantime -&gt;</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6A737D;">// if yes, proceed with it since the exception indicates that state.</span></span>
<span class="line"><span style="color:#24292E;">                singletonObject </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.singletonObjects.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(beanName);</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (singletonObject </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> ex;</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">catch</span><span style="color:#24292E;"> (BeanCreationException </span><span style="color:#E36209;">ex</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (recordSuppressedExceptions) {</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (Exception suppressedException </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.suppressedExceptions) {</span></span>
<span class="line"><span style="color:#24292E;">                        ex.</span><span style="color:#6F42C1;">addRelatedCause</span><span style="color:#24292E;">(suppressedException);</span></span>
<span class="line"><span style="color:#24292E;">                    }</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> ex;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">finally</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (recordSuppressedExceptions) {</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.suppressedExceptions </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6F42C1;">afterSingletonCreation</span><span style="color:#24292E;">(beanName);</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (newSingleton) {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6A737D;">// 添加创建的bean</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6F42C1;">addSingleton</span><span style="color:#24292E;">(beanName, singletonObject);</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> singletonObject;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">//**********************************************************************************</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// org.springframework.beans.factory.support.DefaultSingletonBeanRegistry</span></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 将给定的单例对象添加到该工厂的单例缓存中</span></span>
<span class="line"><span style="color:#6A737D;"> * 即将创建好的单例bean添加到singletonObject这个map中，以后从容器中获取bean只要从这个map中获取即可。</span></span>
<span class="line"><span style="color:#6A737D;"> * Add the given singleton object to the singleton cache of this factory.</span></span>
<span class="line"><span style="color:#6A737D;"> * &lt;p&gt;To be called for eager registration of singletons.</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">protected</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">addSingleton</span><span style="color:#24292E;">(String beanName, Object singletonObject) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">synchronized</span><span style="color:#24292E;"> (</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.singletonObjects) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.singletonObjects.</span><span style="color:#6F42C1;">put</span><span style="color:#24292E;">(beanName, singletonObject);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.singletonFactories.</span><span style="color:#6F42C1;">remove</span><span style="color:#24292E;">(beanName);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.earlySingletonObjects.</span><span style="color:#6F42C1;">remove</span><span style="color:#24292E;">(beanName);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.registeredSingletons.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(beanName);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p><img src="`+p+`" alt="bean创建流程"></p><h3 id="bean装配" tabindex="-1">Bean装配 <a class="header-anchor" href="#bean装配" aria-label="Permalink to &quot;Bean装配&quot;">​</a></h3><h4 id="定义初始化和销毁逻辑" tabindex="-1">定义初始化和销毁逻辑 <a class="header-anchor" href="#定义初始化和销毁逻辑" aria-label="Permalink to &quot;定义初始化和销毁逻辑&quot;">​</a></h4><h5 id="bean的初始化和销毁方法" tabindex="-1">bean的初始化和销毁方法 <a class="header-anchor" href="#bean的初始化和销毁方法" aria-label="Permalink to &quot;bean的初始化和销毁方法&quot;">​</a></h5><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">&lt;!-- xml配置 --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">bean</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">id</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">init-method</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">destroy-method</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;"> &gt;&lt;/</span><span style="color:#85E89D;">bean</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">&lt;!-- xml配置 --&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">bean</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">id</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">init-method</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">destroy-method</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;"> &gt;&lt;/</span><span style="color:#22863A;">bean</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Bean</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">initMethod</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">,</span><span style="color:#79B8FF;">destroyMethod</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">或</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">PostConstruct和</span><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">PreDestroy</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Bean</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">initMethod</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">,</span><span style="color:#005CC5;">destroyMethod</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">或</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">PostConstruct和</span><span style="color:#24292E;">@</span><span style="color:#D73A49;">PreDestroy</span></span></code></pre></div><h5 id="initializingbean-disposablebean" tabindex="-1">InitializingBean&amp;DisposableBean <a class="header-anchor" href="#initializingbean-disposablebean" aria-label="Permalink to &quot;InitializingBean&amp;DisposableBean&quot;">​</a></h5><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Person</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">implements</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">InitializingBean</span><span style="color:#E1E4E8;">, </span><span style="color:#B392F0;">DisposableBean</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> String name;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> age;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Person</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;person...NoArgsConstructor&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">setAge</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">age</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;person...setAge&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.age </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> age;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">PostConstruct</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">initMethod</span><span style="color:#E1E4E8;">(){</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;person...initMethod&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">PreDestroy</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">destroyMethod</span><span style="color:#E1E4E8;">(){</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;person...destroyMethod&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">afterPropertiesSet</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> Exception {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;person...InitializingBean...afterPropertiesSet&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">destroy</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> Exception {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;person...DisposableBean...destroy&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Person</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">implements</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">InitializingBean</span><span style="color:#24292E;">, </span><span style="color:#6F42C1;">DisposableBean</span><span style="color:#24292E;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> String name;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> age;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Person</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;person...NoArgsConstructor&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">setAge</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> </span><span style="color:#E36209;">age</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;person...setAge&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.age </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> age;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">PostConstruct</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">initMethod</span><span style="color:#24292E;">(){</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;person...initMethod&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">PreDestroy</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">destroyMethod</span><span style="color:#24292E;">(){</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;person...destroyMethod&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">afterPropertiesSet</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> Exception {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;person...InitializingBean...afterPropertiesSet&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">destroy</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> Exception {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;person...DisposableBean...destroy&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h5 id="beanpostprocessor" tabindex="-1">BeanPostProcessor <a class="header-anchor" href="#beanpostprocessor" aria-label="Permalink to &quot;BeanPostProcessor&quot;">​</a></h5><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 为了了让Bean后置处理器工作，需要将它加入到容器中</span></span>
<span class="line"><span style="color:#6A737D;"> *</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@author</span><span style="color:#6A737D;"> gnl</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@since</span><span style="color:#6A737D;"> 2020-05-05 16:09</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Component</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">MyBeanPostProcessor</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">implements</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">BeanPostProcessor</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> Object </span><span style="color:#B392F0;">postProcessBeforeInitialization</span><span style="color:#E1E4E8;">(Object </span><span style="color:#FFAB70;">bean</span><span style="color:#E1E4E8;">, String </span><span style="color:#FFAB70;">beanName</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> BeansException {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(beanName</span><span style="color:#F97583;">+</span><span style="color:#9ECBFF;">&quot;...BeanPostProcessor...postProcessBeforeInitialization&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> bean;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> Object </span><span style="color:#B392F0;">postProcessAfterInitialization</span><span style="color:#E1E4E8;">(Object </span><span style="color:#FFAB70;">bean</span><span style="color:#E1E4E8;">, String </span><span style="color:#FFAB70;">beanName</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> BeansException {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(beanName</span><span style="color:#F97583;">+</span><span style="color:#9ECBFF;">&quot;...BeanPostProcessor...postProcessAfterInitialization&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> bean;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 为了了让Bean后置处理器工作，需要将它加入到容器中</span></span>
<span class="line"><span style="color:#6A737D;"> *</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@author</span><span style="color:#6A737D;"> gnl</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@since</span><span style="color:#6A737D;"> 2020-05-05 16:09</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Component</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">MyBeanPostProcessor</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">implements</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">BeanPostProcessor</span><span style="color:#24292E;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> Object </span><span style="color:#6F42C1;">postProcessBeforeInitialization</span><span style="color:#24292E;">(Object </span><span style="color:#E36209;">bean</span><span style="color:#24292E;">, String </span><span style="color:#E36209;">beanName</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> BeansException {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(beanName</span><span style="color:#D73A49;">+</span><span style="color:#032F62;">&quot;...BeanPostProcessor...postProcessBeforeInitialization&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> bean;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> Object </span><span style="color:#6F42C1;">postProcessAfterInitialization</span><span style="color:#24292E;">(Object </span><span style="color:#E36209;">bean</span><span style="color:#24292E;">, String </span><span style="color:#E36209;">beanName</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> BeansException {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(beanName</span><span style="color:#D73A49;">+</span><span style="color:#032F62;">&quot;...BeanPostProcessor...postProcessAfterInitialization&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> bean;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p><strong>源码解析</strong></p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">populateBean</span><span style="color:#E1E4E8;">(beanName, mbd, instanceWrapper); </span><span style="color:#6A737D;">//设置当前bean属性值</span></span>
<span class="line"><span style="color:#F97583;">protected</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">populateBean</span><span style="color:#E1E4E8;">(){</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// ......</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">mbd.</span><span style="color:#B392F0;">isSynthetic</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">hasInstantiationAwareBeanPostProcessors</span><span style="color:#E1E4E8;">()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (BeanPostProcessor bp </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getBeanPostProcessors</span><span style="color:#E1E4E8;">()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (bp </span><span style="color:#F97583;">instanceof</span><span style="color:#E1E4E8;"> InstantiationAwareBeanPostProcessor) {</span></span>
<span class="line"><span style="color:#E1E4E8;">					InstantiationAwareBeanPostProcessor ibp </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (InstantiationAwareBeanPostProcessor) bp;</span></span>
<span class="line"><span style="color:#E1E4E8;">					</span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">ibp.</span><span style="color:#B392F0;">postProcessAfterInstantiation</span><span style="color:#E1E4E8;">(bw.</span><span style="color:#B392F0;">getWrappedInstance</span><span style="color:#E1E4E8;">(), beanName)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">						</span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">					}</span></span>
<span class="line"><span style="color:#E1E4E8;">				}</span></span>
<span class="line"><span style="color:#E1E4E8;">			}</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// ......</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 赋值完成后开始初始化</span></span>
<span class="line"><span style="color:#E1E4E8;">exposedObject </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">initializeBean</span><span style="color:#E1E4E8;">(beanName, exposedObject, mbd);</span></span>
<span class="line"><span style="color:#F97583;">protected</span><span style="color:#E1E4E8;"> Object </span><span style="color:#B392F0;">initializeBean</span><span style="color:#E1E4E8;">(){</span></span>
<span class="line"><span style="color:#E1E4E8;">    wrappedBean </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">applyBeanPostProcessorsBeforeInitialization</span><span style="color:#E1E4E8;">(wrappedBean, beanName);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">invokeInitMethods</span><span style="color:#E1E4E8;">(beanName, wrappedBean, mbd); </span><span style="color:#6A737D;">// 执行初始化方法</span></span>
<span class="line"><span style="color:#E1E4E8;">    wrappedBean </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">applyBeanPostProcessorsAfterInitialization</span><span style="color:#E1E4E8;">(wrappedBean, beanName);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> Object </span><span style="color:#B392F0;">applyBeanPostProcessorsBeforeInitialization</span><span style="color:#E1E4E8;">(Object existingBean, String beanName)</span></span>
<span class="line"><span style="color:#E1E4E8;">    throws BeansException {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    Object result </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> existingBean;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 循环遍历得到容器中所有的bean后置处理器，挨个执行postProcessBeforeInitialization</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (BeanPostProcessor processor </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getBeanPostProcessors</span><span style="color:#E1E4E8;">()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        Object current </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> processor.</span><span style="color:#B392F0;">postProcessBeforeInitialization</span><span style="color:#E1E4E8;">(result, beanName);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 一旦返回null，跳出循环，后面的bean后置处理器都不会执行</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (current </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> result;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        result </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> current;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> result;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> Object </span><span style="color:#B392F0;">applyBeanPostProcessorsAfterInitialization</span><span style="color:#E1E4E8;">(Object existingBean, String beanName)</span></span>
<span class="line"><span style="color:#E1E4E8;">    throws BeansException {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    Object result </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> existingBean;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 循环遍历得到容器中所有的bean后置处理器，挨个执行postProcessAfterInitialization</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (BeanPostProcessor processor </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getBeanPostProcessors</span><span style="color:#E1E4E8;">()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        Object current </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> processor.</span><span style="color:#B392F0;">postProcessAfterInitialization</span><span style="color:#E1E4E8;">(result, beanName);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (current </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> result;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        result </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> current;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> result;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">populateBean</span><span style="color:#24292E;">(beanName, mbd, instanceWrapper); </span><span style="color:#6A737D;">//设置当前bean属性值</span></span>
<span class="line"><span style="color:#D73A49;">protected</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">populateBean</span><span style="color:#24292E;">(){</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// ......</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">mbd.</span><span style="color:#6F42C1;">isSynthetic</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">hasInstantiationAwareBeanPostProcessors</span><span style="color:#24292E;">()) {</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (BeanPostProcessor bp </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getBeanPostProcessors</span><span style="color:#24292E;">()) {</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (bp </span><span style="color:#D73A49;">instanceof</span><span style="color:#24292E;"> InstantiationAwareBeanPostProcessor) {</span></span>
<span class="line"><span style="color:#24292E;">					InstantiationAwareBeanPostProcessor ibp </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (InstantiationAwareBeanPostProcessor) bp;</span></span>
<span class="line"><span style="color:#24292E;">					</span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">ibp.</span><span style="color:#6F42C1;">postProcessAfterInstantiation</span><span style="color:#24292E;">(bw.</span><span style="color:#6F42C1;">getWrappedInstance</span><span style="color:#24292E;">(), beanName)) {</span></span>
<span class="line"><span style="color:#24292E;">						</span><span style="color:#D73A49;">return</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">					}</span></span>
<span class="line"><span style="color:#24292E;">				}</span></span>
<span class="line"><span style="color:#24292E;">			}</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// ......</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 赋值完成后开始初始化</span></span>
<span class="line"><span style="color:#24292E;">exposedObject </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">initializeBean</span><span style="color:#24292E;">(beanName, exposedObject, mbd);</span></span>
<span class="line"><span style="color:#D73A49;">protected</span><span style="color:#24292E;"> Object </span><span style="color:#6F42C1;">initializeBean</span><span style="color:#24292E;">(){</span></span>
<span class="line"><span style="color:#24292E;">    wrappedBean </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">applyBeanPostProcessorsBeforeInitialization</span><span style="color:#24292E;">(wrappedBean, beanName);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">invokeInitMethods</span><span style="color:#24292E;">(beanName, wrappedBean, mbd); </span><span style="color:#6A737D;">// 执行初始化方法</span></span>
<span class="line"><span style="color:#24292E;">    wrappedBean </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">applyBeanPostProcessorsAfterInitialization</span><span style="color:#24292E;">(wrappedBean, beanName);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> Object </span><span style="color:#6F42C1;">applyBeanPostProcessorsBeforeInitialization</span><span style="color:#24292E;">(Object existingBean, String beanName)</span></span>
<span class="line"><span style="color:#24292E;">    throws BeansException {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    Object result </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> existingBean;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 循环遍历得到容器中所有的bean后置处理器，挨个执行postProcessBeforeInitialization</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (BeanPostProcessor processor </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getBeanPostProcessors</span><span style="color:#24292E;">()) {</span></span>
<span class="line"><span style="color:#24292E;">        Object current </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> processor.</span><span style="color:#6F42C1;">postProcessBeforeInitialization</span><span style="color:#24292E;">(result, beanName);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 一旦返回null，跳出循环，后面的bean后置处理器都不会执行</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (current </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> result;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        result </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> current;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> result;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> Object </span><span style="color:#6F42C1;">applyBeanPostProcessorsAfterInitialization</span><span style="color:#24292E;">(Object existingBean, String beanName)</span></span>
<span class="line"><span style="color:#24292E;">    throws BeansException {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    Object result </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> existingBean;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 循环遍历得到容器中所有的bean后置处理器，挨个执行postProcessAfterInitialization</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (BeanPostProcessor processor </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getBeanPostProcessors</span><span style="color:#24292E;">()) {</span></span>
<span class="line"><span style="color:#24292E;">        Object current </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> processor.</span><span style="color:#6F42C1;">postProcessAfterInitialization</span><span style="color:#24292E;">(result, beanName);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (current </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> result;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        result </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> current;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> result;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h4 id="装配流程" tabindex="-1">装配流程 <a class="header-anchor" href="#装配流程" aria-label="Permalink to &quot;装配流程&quot;">​</a></h4><p><strong>代码验证</strong></p><p>spring-context.xml</p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;?</span><span style="color:#85E89D;">xml</span><span style="color:#B392F0;"> version</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;1.0&quot;</span><span style="color:#B392F0;"> encoding</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;UTF-8&quot;</span><span style="color:#E1E4E8;">?&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">beans</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">xmlns</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;http://www.springframework.org/schema/beans&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#B392F0;">xmlns:xsi</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;http://www.w3.org/2001/XMLSchema-instance&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#B392F0;">xmlns:context</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;http://www.springframework.org/schema/context&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">       </span><span style="color:#B392F0;">xsi:schemaLocation</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">context:component-scan</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">base-package</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;com.demo.spring&quot;</span><span style="color:#E1E4E8;"> /&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">bean</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">id</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;person&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;com.demo.spring.entity.Person&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">init-method</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;initMethod&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">destroy-method</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;destroyMethod&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">property</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">name</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;name&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">value</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;z3&quot;</span><span style="color:#E1E4E8;"> /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">property</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">name</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;age&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">value</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;20&quot;</span><span style="color:#E1E4E8;"> /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#85E89D;">bean</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">bean</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">id</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;postProcessor&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;com.demo.spring.util.MyBeanPostProcessor&quot;</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#85E89D;">bean</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">&lt;!--    &lt;bean id=&quot;myFactoryBean&quot; class=&quot;com.demo.spring.util.MyFactoryBean&quot; &gt;&lt;/bean&gt;--&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">beans</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;?</span><span style="color:#22863A;">xml</span><span style="color:#6F42C1;"> version</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;1.0&quot;</span><span style="color:#6F42C1;"> encoding</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;UTF-8&quot;</span><span style="color:#24292E;">?&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">beans</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">xmlns</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;http://www.springframework.org/schema/beans&quot;</span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#6F42C1;">xmlns:xsi</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;http://www.w3.org/2001/XMLSchema-instance&quot;</span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#6F42C1;">xmlns:context</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;http://www.springframework.org/schema/context&quot;</span></span>
<span class="line"><span style="color:#24292E;">       </span><span style="color:#6F42C1;">xsi:schemaLocation</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">context:component-scan</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">base-package</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;com.demo.spring&quot;</span><span style="color:#24292E;"> /&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">bean</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">id</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;person&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;com.demo.spring.entity.Person&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">init-method</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;initMethod&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">destroy-method</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;destroyMethod&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">property</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">name</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;name&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">value</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;z3&quot;</span><span style="color:#24292E;"> /&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">property</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">name</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;age&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">value</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;20&quot;</span><span style="color:#24292E;"> /&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#22863A;">bean</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">bean</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">id</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;postProcessor&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;com.demo.spring.util.MyBeanPostProcessor&quot;</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#22863A;">bean</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">&lt;!--    &lt;bean id=&quot;myFactoryBean&quot; class=&quot;com.demo.spring.util.MyFactoryBean&quot; &gt;&lt;/bean&gt;--&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">beans</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>com.demo.spring.entity.Person.java</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">package</span><span style="color:#E1E4E8;"> com.demo.spring.entity;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> lombok.AllArgsConstructor;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> lombok.Data;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> lombok.experimental.Accessors;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.springframework.beans.BeansException;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.springframework.beans.factory.</span><span style="color:#79B8FF;">*</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.springframework.context.ApplicationContext;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.springframework.context.ApplicationContextAware;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * TODO</span></span>
<span class="line"><span style="color:#6A737D;"> *</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@author</span><span style="color:#6A737D;"> gnl</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@since</span><span style="color:#6A737D;"> 2020-05-04 18:57</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Data</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">AllArgsConstructor</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Accessors</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Person</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">implements</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">BeanNameAware</span><span style="color:#E1E4E8;">, </span><span style="color:#B392F0;">BeanFactoryAware</span><span style="color:#E1E4E8;">, </span><span style="color:#B392F0;">ApplicationContextAware</span><span style="color:#E1E4E8;">, </span><span style="color:#B392F0;">InitializingBean</span><span style="color:#E1E4E8;">, </span><span style="color:#B392F0;">DisposableBean</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> String name;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> age;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Person</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;person...NoArgsConstructor&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">setAge</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">age</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;person...setAge&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.age </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> age;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 设置bean在ioc容器中的名字</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@author</span><span style="color:#6A737D;"> gnl</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#FFAB70;">name</span><span style="color:#6A737D;"> 即为xml中配置的id的值，若使用注解的方式注入，默认即为@Bean的方法名</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#F97583;">@return</span><span style="color:#6A737D;"> void</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">setBeanName</span><span style="color:#E1E4E8;">(String </span><span style="color:#FFAB70;">name</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;person...BeanNameAware...setBeanName...&quot;</span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;">name);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">setBeanFactory</span><span style="color:#E1E4E8;">(BeanFactory </span><span style="color:#FFAB70;">beanFactory</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> BeansException {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;person...BeanFactoryAware...setBeanFactory...&quot;</span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;">beanFactory);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">setApplicationContext</span><span style="color:#E1E4E8;">(ApplicationContext </span><span style="color:#FFAB70;">applicationContext</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> BeansException {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;person...ApplicationContextAware...setApplicationContext...&quot;</span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;">applicationContext);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">initMethod</span><span style="color:#E1E4E8;">(){</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;person...initMethod&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">destroyMethod</span><span style="color:#E1E4E8;">(){</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;person...destroyMethod&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">afterPropertiesSet</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> Exception {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;person...InitializingBean...afterPropertiesSet&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">destroy</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> Exception {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;person...DisposableBean...destroy&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">package</span><span style="color:#24292E;"> com.demo.spring.entity;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> lombok.AllArgsConstructor;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> lombok.Data;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> lombok.experimental.Accessors;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.springframework.beans.BeansException;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.springframework.beans.factory.</span><span style="color:#005CC5;">*</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.springframework.context.ApplicationContext;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.springframework.context.ApplicationContextAware;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * TODO</span></span>
<span class="line"><span style="color:#6A737D;"> *</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@author</span><span style="color:#6A737D;"> gnl</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@since</span><span style="color:#6A737D;"> 2020-05-04 18:57</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Data</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">AllArgsConstructor</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Accessors</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Person</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">implements</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">BeanNameAware</span><span style="color:#24292E;">, </span><span style="color:#6F42C1;">BeanFactoryAware</span><span style="color:#24292E;">, </span><span style="color:#6F42C1;">ApplicationContextAware</span><span style="color:#24292E;">, </span><span style="color:#6F42C1;">InitializingBean</span><span style="color:#24292E;">, </span><span style="color:#6F42C1;">DisposableBean</span><span style="color:#24292E;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> String name;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> age;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Person</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;person...NoArgsConstructor&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">setAge</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> </span><span style="color:#E36209;">age</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;person...setAge&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.age </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> age;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">    /**</span></span>
<span class="line"><span style="color:#6A737D;">     * 设置bean在ioc容器中的名字</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@author</span><span style="color:#6A737D;"> gnl</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#E36209;">name</span><span style="color:#6A737D;"> 即为xml中配置的id的值，若使用注解的方式注入，默认即为@Bean的方法名</span></span>
<span class="line"><span style="color:#6A737D;">     * </span><span style="color:#D73A49;">@return</span><span style="color:#6A737D;"> void</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">setBeanName</span><span style="color:#24292E;">(String </span><span style="color:#E36209;">name</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;person...BeanNameAware...setBeanName...&quot;</span><span style="color:#D73A49;">+</span><span style="color:#24292E;">name);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">setBeanFactory</span><span style="color:#24292E;">(BeanFactory </span><span style="color:#E36209;">beanFactory</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> BeansException {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;person...BeanFactoryAware...setBeanFactory...&quot;</span><span style="color:#D73A49;">+</span><span style="color:#24292E;">beanFactory);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">setApplicationContext</span><span style="color:#24292E;">(ApplicationContext </span><span style="color:#E36209;">applicationContext</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> BeansException {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;person...ApplicationContextAware...setApplicationContext...&quot;</span><span style="color:#D73A49;">+</span><span style="color:#24292E;">applicationContext);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">initMethod</span><span style="color:#24292E;">(){</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;person...initMethod&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">destroyMethod</span><span style="color:#24292E;">(){</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;person...destroyMethod&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">afterPropertiesSet</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> Exception {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;person...InitializingBean...afterPropertiesSet&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">destroy</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> Exception {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;person...DisposableBean...destroy&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>MyBeanPostProcessor.java</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">package</span><span style="color:#E1E4E8;"> com.demo.spring.util;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.springframework.beans.BeansException;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.springframework.beans.factory.config.BeanPostProcessor;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 为了了让Bean后置处理器工作，需要将它加入到容器中</span></span>
<span class="line"><span style="color:#6A737D;"> *</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@author</span><span style="color:#6A737D;"> gnl</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@since</span><span style="color:#6A737D;"> 2020-05-05 16:09</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">MyBeanPostProcessor</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">implements</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">BeanPostProcessor</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> Object </span><span style="color:#B392F0;">postProcessBeforeInitialization</span><span style="color:#E1E4E8;">(Object </span><span style="color:#FFAB70;">bean</span><span style="color:#E1E4E8;">, String </span><span style="color:#FFAB70;">beanName</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> BeansException {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(beanName</span><span style="color:#F97583;">+</span><span style="color:#9ECBFF;">&quot;...BeanPostProcessor...postProcessBeforeInitialization&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> bean;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> Object </span><span style="color:#B392F0;">postProcessAfterInitialization</span><span style="color:#E1E4E8;">(Object </span><span style="color:#FFAB70;">bean</span><span style="color:#E1E4E8;">, String </span><span style="color:#FFAB70;">beanName</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> BeansException {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(beanName</span><span style="color:#F97583;">+</span><span style="color:#9ECBFF;">&quot;...BeanPostProcessor...postProcessAfterInitialization&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> bean;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">package</span><span style="color:#24292E;"> com.demo.spring.util;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.springframework.beans.BeansException;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.springframework.beans.factory.config.BeanPostProcessor;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 为了了让Bean后置处理器工作，需要将它加入到容器中</span></span>
<span class="line"><span style="color:#6A737D;"> *</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@author</span><span style="color:#6A737D;"> gnl</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@since</span><span style="color:#6A737D;"> 2020-05-05 16:09</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">MyBeanPostProcessor</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">implements</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">BeanPostProcessor</span><span style="color:#24292E;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> Object </span><span style="color:#6F42C1;">postProcessBeforeInitialization</span><span style="color:#24292E;">(Object </span><span style="color:#E36209;">bean</span><span style="color:#24292E;">, String </span><span style="color:#E36209;">beanName</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> BeansException {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(beanName</span><span style="color:#D73A49;">+</span><span style="color:#032F62;">&quot;...BeanPostProcessor...postProcessBeforeInitialization&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> bean;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> Object </span><span style="color:#6F42C1;">postProcessAfterInitialization</span><span style="color:#24292E;">(Object </span><span style="color:#E36209;">bean</span><span style="color:#24292E;">, String </span><span style="color:#E36209;">beanName</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> BeansException {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(beanName</span><span style="color:#D73A49;">+</span><span style="color:#032F62;">&quot;...BeanPostProcessor...postProcessAfterInitialization&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> bean;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>MainApplication.java</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">package</span><span style="color:#E1E4E8;"> com.demo.spring;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> com.demo.spring.entity.Person;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.springframework.context.support.ClassPathXmlApplicationContext;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * TODO</span></span>
<span class="line"><span style="color:#6A737D;"> *</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@author</span><span style="color:#6A737D;"> gnl</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@since</span><span style="color:#6A737D;"> 2020-05-04 20:04</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">MainApplication</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] </span><span style="color:#FFAB70;">args</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        ClassPathXmlApplicationContext ac </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ClassPathXmlApplicationContext</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;classpath:spring/spring-context.xml&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;ac..getBean&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        Person person </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> ac.</span><span style="color:#B392F0;">getBean</span><span style="color:#E1E4E8;">(Person.class);</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;================================================&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(person);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;================================================&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;ac...关闭&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        ac.</span><span style="color:#B392F0;">close</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">package</span><span style="color:#24292E;"> com.demo.spring;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> com.demo.spring.entity.Person;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.springframework.context.support.ClassPathXmlApplicationContext;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * TODO</span></span>
<span class="line"><span style="color:#6A737D;"> *</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@author</span><span style="color:#6A737D;"> gnl</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@since</span><span style="color:#6A737D;"> 2020-05-04 20:04</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">MainApplication</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] </span><span style="color:#E36209;">args</span><span style="color:#24292E;">) {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        ClassPathXmlApplicationContext ac </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ClassPathXmlApplicationContext</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;classpath:spring/spring-context.xml&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;ac..getBean&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        Person person </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> ac.</span><span style="color:#6F42C1;">getBean</span><span style="color:#24292E;">(Person.class);</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;================================================&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(person);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;================================================&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;ac...关闭&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        ac.</span><span style="color:#6F42C1;">close</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p><strong>输出结果</strong></p><p>bean为单例时</p><div class="language-powershell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">powershell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">person...NoArgsConstructor</span></span>
<span class="line"><span style="color:#E1E4E8;">person...setAge</span></span>
<span class="line"><span style="color:#E1E4E8;">person...BeanNameAware...setBeanName...person</span></span>
<span class="line"><span style="color:#E1E4E8;">person...BeanFactoryAware...setBeanFactory</span></span>
<span class="line"><span style="color:#E1E4E8;">person...ApplicationContextAware...setApplicationContext</span></span>
<span class="line"><span style="color:#E1E4E8;">person...BeanPostProcessor...postProcessBeforeInitialization</span></span>
<span class="line"><span style="color:#E1E4E8;">person...InitializingBean...afterPropertiesSet</span></span>
<span class="line"><span style="color:#E1E4E8;">person...initMethod</span></span>
<span class="line"><span style="color:#E1E4E8;">person...BeanPostProcessor...postProcessAfterInitialization</span></span>
<span class="line"><span style="color:#E1E4E8;">ac..getBean</span></span>
<span class="line"><span style="color:#F97583;">================================================</span></span>
<span class="line"><span style="color:#E1E4E8;">Person(name</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">z3</span><span style="color:#F97583;">,</span><span style="color:#E1E4E8;"> age</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">20</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#F97583;">================================================</span></span>
<span class="line"><span style="color:#E1E4E8;">ac...关闭</span></span>
<span class="line"><span style="color:#E1E4E8;">person...DisposableBean...destroy</span></span>
<span class="line"><span style="color:#E1E4E8;">person...destroyMethod</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">person...NoArgsConstructor</span></span>
<span class="line"><span style="color:#24292E;">person...setAge</span></span>
<span class="line"><span style="color:#24292E;">person...BeanNameAware...setBeanName...person</span></span>
<span class="line"><span style="color:#24292E;">person...BeanFactoryAware...setBeanFactory</span></span>
<span class="line"><span style="color:#24292E;">person...ApplicationContextAware...setApplicationContext</span></span>
<span class="line"><span style="color:#24292E;">person...BeanPostProcessor...postProcessBeforeInitialization</span></span>
<span class="line"><span style="color:#24292E;">person...InitializingBean...afterPropertiesSet</span></span>
<span class="line"><span style="color:#24292E;">person...initMethod</span></span>
<span class="line"><span style="color:#24292E;">person...BeanPostProcessor...postProcessAfterInitialization</span></span>
<span class="line"><span style="color:#24292E;">ac..getBean</span></span>
<span class="line"><span style="color:#D73A49;">================================================</span></span>
<span class="line"><span style="color:#24292E;">Person(name</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">z3</span><span style="color:#D73A49;">,</span><span style="color:#24292E;"> age</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">20</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#D73A49;">================================================</span></span>
<span class="line"><span style="color:#24292E;">ac...关闭</span></span>
<span class="line"><span style="color:#24292E;">person...DisposableBean...destroy</span></span>
<span class="line"><span style="color:#24292E;">person...destroyMethod</span></span></code></pre></div><p>若bean为单例懒加载或原型</p><div class="language-powershell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">powershell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">ac..getBean</span></span>
<span class="line"><span style="color:#E1E4E8;">person...NoArgsConstructor</span></span>
<span class="line"><span style="color:#E1E4E8;">person...setAge</span></span>
<span class="line"><span style="color:#E1E4E8;">person...BeanNameAware...setBeanName...person</span></span>
<span class="line"><span style="color:#E1E4E8;">person...BeanFactoryAware...setBeanFactory</span></span>
<span class="line"><span style="color:#E1E4E8;">person...ApplicationContextAware...setApplicationContext</span></span>
<span class="line"><span style="color:#E1E4E8;">person...BeanPostProcessor...postProcessBeforeInitialization</span></span>
<span class="line"><span style="color:#E1E4E8;">person...InitializingBean...afterPropertiesSet</span></span>
<span class="line"><span style="color:#E1E4E8;">person...initMethod</span></span>
<span class="line"><span style="color:#E1E4E8;">person...BeanPostProcessor...postProcessAfterInitialization</span></span>
<span class="line"><span style="color:#F97583;">================================================</span></span>
<span class="line"><span style="color:#E1E4E8;">Person(name</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">z3</span><span style="color:#F97583;">,</span><span style="color:#E1E4E8;"> age</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">20</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#F97583;">================================================</span></span>
<span class="line"><span style="color:#E1E4E8;">ac...关闭</span></span>
<span class="line"><span style="color:#E1E4E8;">person...DisposableBean...destroy</span></span>
<span class="line"><span style="color:#E1E4E8;">person...destroyMethod</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">ac..getBean</span></span>
<span class="line"><span style="color:#24292E;">person...NoArgsConstructor</span></span>
<span class="line"><span style="color:#24292E;">person...setAge</span></span>
<span class="line"><span style="color:#24292E;">person...BeanNameAware...setBeanName...person</span></span>
<span class="line"><span style="color:#24292E;">person...BeanFactoryAware...setBeanFactory</span></span>
<span class="line"><span style="color:#24292E;">person...ApplicationContextAware...setApplicationContext</span></span>
<span class="line"><span style="color:#24292E;">person...BeanPostProcessor...postProcessBeforeInitialization</span></span>
<span class="line"><span style="color:#24292E;">person...InitializingBean...afterPropertiesSet</span></span>
<span class="line"><span style="color:#24292E;">person...initMethod</span></span>
<span class="line"><span style="color:#24292E;">person...BeanPostProcessor...postProcessAfterInitialization</span></span>
<span class="line"><span style="color:#D73A49;">================================================</span></span>
<span class="line"><span style="color:#24292E;">Person(name</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">z3</span><span style="color:#D73A49;">,</span><span style="color:#24292E;"> age</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">20</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#D73A49;">================================================</span></span>
<span class="line"><span style="color:#24292E;">ac...关闭</span></span>
<span class="line"><span style="color:#24292E;">person...DisposableBean...destroy</span></span>
<span class="line"><span style="color:#24292E;">person...destroyMethod</span></span></code></pre></div><p><strong>容器启动</strong></p><ol><li><p><strong>构造方法</strong></p></li><li><p><strong>设置属性值</strong></p></li><li><p>如果实现了BeanNameAware接口，调用<strong>setBeanName</strong>设置Bean的ID或者Name</p></li><li><p>如果实现BeanFactoryAware接口，调用<strong>setBeanFactory</strong> 设置BeanFactory</p></li><li><p>如果实现ApplicationContextAware，调用<strong>setApplicationContext</strong>，为组件注入IOC容器</p></li><li><p>调用BeanPostProcessor的postProcess<strong>BeforeInitialization</strong>方法，在任何初始化方法之前调用</p></li><li><p>调用InitializingBean的**afterPropertiesSet()**方法，定义初始化逻辑</p></li><li><p>调用定制<strong>init-method</strong>方法</p></li><li><p>调用BeanPostProcessor的postProcess<strong>AfterInitialization</strong>方法，在任何初始化方法之后调用</p></li></ol><p><strong>容器关闭</strong></p><ol start="10"><li>调用DisposableBean的<strong>destroy()</strong>，定义销毁逻辑</li><li>调用定制的<strong>destroy-method</strong>方法</li></ol><p><img src="`+o+`" alt="image-20200505171612265"></p><h2 id="di" tabindex="-1">DI <a class="header-anchor" href="#di" aria-label="Permalink to &quot;DI&quot;">​</a></h2><p>依赖注入</p><p><strong>@Autowired 自动装配</strong>，Spring 会到容器中找到这个属性对应的组件，自动为属性赋值。</p><p>可以标在构造函数，方法，参数，属性上，都是从IOC容器中获取相应的组件值注入。</p><blockquote><p>@Resource 的作用相当于 @Autowired，只不过 @Autowired 按 byType 自动注入，而 @Resource 默认按 byName 自动注入罢了</p></blockquote><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Autowired</span></span>
<span class="line"><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> BookService bookService;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">）、先按照类型去容器中找相应组件, </span></span>
<span class="line"><span style="color:#E1E4E8;">		bookService </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> applicationContext.</span><span style="color:#B392F0;">getBean</span><span style="color:#E1E4E8;">(BookService.class);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">)、没找到则抛异常</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">）、找到多个？</span></span>
<span class="line"><span style="color:#E1E4E8;">        按照变量名作为id继续匹配，</span></span>
<span class="line"><span style="color:#E1E4E8;">		bookService </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> applicationContext.</span><span style="color:#B392F0;">getBean</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;bookService&quot;</span><span style="color:#E1E4E8;">,BookService.class);</span></span>
<span class="line"><span style="color:#E1E4E8;">        可以使用@</span><span style="color:#F97583;">Qualifier修改id</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Autowired</span><span style="color:#E1E4E8;">、@</span><span style="color:#F97583;">Resource</span><span style="color:#E1E4E8;">、@</span><span style="color:#F97583;">Inject这三个注解都能实现自动注入</span></span>
<span class="line"><span style="color:#E1E4E8;">	@</span><span style="color:#F97583;">Autowired</span><span style="color:#E1E4E8;">：最强大，Spring自己的注解</span></span>
<span class="line"><span style="color:#E1E4E8;">	@</span><span style="color:#F97583;">Resource</span><span style="color:#E1E4E8;">：j2ee、Java的标准、扩展性强</span></span>
<span class="line"><span style="color:#E1E4E8;">	@</span><span style="color:#F97583;">Inject</span><span style="color:#E1E4E8;">：EJB</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 方法上有@Autowired的话</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">     * 1）、spring容器创建当前对象的时候就会调用方法，完成赋值。</span></span>
<span class="line"><span style="color:#6A737D;">     * 2）、这个方法上的每一个参数都会从ioc中获取并自动注入</span></span>
<span class="line"><span style="color:#6A737D;">     * 3）、方法自动装配顺序与上面一致</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Autowired</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ha</span><span style="color:#E1E4E8;">(BookDao bookDao){</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(bookDao);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// 标在造器方法上，构造方法中需要用的组件都会从容器中获取。</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// 如果类中只有一个有参构造器，@Autowired可以省略，参数位置的组件还是可以从容器中获取。</span></span>
<span class="line"><span style="color:#E1E4E8;">	@</span><span style="color:#F97583;">Autowired</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Person</span><span style="color:#E1E4E8;">(Car car) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.car </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> car;</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(car);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Autowired</span></span>
<span class="line"><span style="color:#D73A49;">private</span><span style="color:#24292E;"> BookService bookService;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">）、先按照类型去容器中找相应组件, </span></span>
<span class="line"><span style="color:#24292E;">		bookService </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> applicationContext.</span><span style="color:#6F42C1;">getBean</span><span style="color:#24292E;">(BookService.class);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">)、没找到则抛异常</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">3</span><span style="color:#24292E;">）、找到多个？</span></span>
<span class="line"><span style="color:#24292E;">        按照变量名作为id继续匹配，</span></span>
<span class="line"><span style="color:#24292E;">		bookService </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> applicationContext.</span><span style="color:#6F42C1;">getBean</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;bookService&quot;</span><span style="color:#24292E;">,BookService.class);</span></span>
<span class="line"><span style="color:#24292E;">        可以使用@</span><span style="color:#D73A49;">Qualifier修改id</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Autowired</span><span style="color:#24292E;">、@</span><span style="color:#D73A49;">Resource</span><span style="color:#24292E;">、@</span><span style="color:#D73A49;">Inject这三个注解都能实现自动注入</span></span>
<span class="line"><span style="color:#24292E;">	@</span><span style="color:#D73A49;">Autowired</span><span style="color:#24292E;">：最强大，Spring自己的注解</span></span>
<span class="line"><span style="color:#24292E;">	@</span><span style="color:#D73A49;">Resource</span><span style="color:#24292E;">：j2ee、Java的标准、扩展性强</span></span>
<span class="line"><span style="color:#24292E;">	@</span><span style="color:#D73A49;">Inject</span><span style="color:#24292E;">：EJB</span></span>
<span class="line"><span style="color:#24292E;">            </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 方法上有@Autowired的话</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">     * 1）、spring容器创建当前对象的时候就会调用方法，完成赋值。</span></span>
<span class="line"><span style="color:#6A737D;">     * 2）、这个方法上的每一个参数都会从ioc中获取并自动注入</span></span>
<span class="line"><span style="color:#6A737D;">     * 3）、方法自动装配顺序与上面一致</span></span>
<span class="line"><span style="color:#6A737D;">     */</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Autowired</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ha</span><span style="color:#24292E;">(BookDao bookDao){</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(bookDao);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// 标在造器方法上，构造方法中需要用的组件都会从容器中获取。</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// 如果类中只有一个有参构造器，@Autowired可以省略，参数位置的组件还是可以从容器中获取。</span></span>
<span class="line"><span style="color:#24292E;">	@</span><span style="color:#D73A49;">Autowired</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Person</span><span style="color:#24292E;">(Car car) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.car </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> car;</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(car);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span></code></pre></div><p><strong>自定义组件使用Spring底层组件</strong>，例如<code>ApplicationContextAware</code>，<code>BeanFactory</code></p><p>自定义组件只需要实现<code>XXXAware</code>接口，在创建对象的时候，会调用接口规定的方法注入相关组件。</p><p>把spring底层的组件注入到自定义的bean中。</p><p><code>XXXAware</code>底层的实现都是<code>XXXProcessor</code>：<code>ApplicationContextAware</code> =&gt; <code>ApplicationContextAwareProcessor</code></p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Data</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Accessors</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Component</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">User</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">implements</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ApplicationContextAware</span><span style="color:#E1E4E8;">, </span><span style="color:#B392F0;">BeanNameAware</span><span style="color:#E1E4E8;">, </span><span style="color:#B392F0;">EmbeddedValueResolverAware</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> String name;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> age;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> ApplicationContext applicationContext;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">User</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;user...NoArgsConstructor&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">User</span><span style="color:#E1E4E8;">(String </span><span style="color:#FFAB70;">name</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">age</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.name </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> name;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.age </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> age;</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;user...AllArgsConstructor&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">PostConstruct</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">init</span><span style="color:#E1E4E8;">(){</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;user...init-method&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">PreDestroy</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">destroy</span><span style="color:#E1E4E8;">(){</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;user...destroy-method&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">setApplicationContext</span><span style="color:#E1E4E8;">(ApplicationContext </span><span style="color:#FFAB70;">applicationContext</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> BeansException {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.applicationContext </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> applicationContext;</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;user...applicationContext: &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> applicationContext);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">setBeanName</span><span style="color:#E1E4E8;">(String </span><span style="color:#FFAB70;">name</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;user...beanName: &quot;</span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> name);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">setEmbeddedValueResolver</span><span style="color:#E1E4E8;">(StringValueResolver </span><span style="color:#FFAB70;">resolver</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        String value </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> resolver.</span><span style="color:#B392F0;">resolveStringValue</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;\${os.name}...#{20*10}&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;字符串解析的值: &quot;</span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;">value);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Data</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Accessors</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Component</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">User</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">implements</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ApplicationContextAware</span><span style="color:#24292E;">, </span><span style="color:#6F42C1;">BeanNameAware</span><span style="color:#24292E;">, </span><span style="color:#6F42C1;">EmbeddedValueResolverAware</span><span style="color:#24292E;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> String name;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> age;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> ApplicationContext applicationContext;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">User</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;user...NoArgsConstructor&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">User</span><span style="color:#24292E;">(String </span><span style="color:#E36209;">name</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> </span><span style="color:#E36209;">age</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.name </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> name;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.age </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> age;</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;user...AllArgsConstructor&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">PostConstruct</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">init</span><span style="color:#24292E;">(){</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;user...init-method&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">PreDestroy</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">destroy</span><span style="color:#24292E;">(){</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;user...destroy-method&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">setApplicationContext</span><span style="color:#24292E;">(ApplicationContext </span><span style="color:#E36209;">applicationContext</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> BeansException {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.applicationContext </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> applicationContext;</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;user...applicationContext: &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> applicationContext);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">setBeanName</span><span style="color:#24292E;">(String </span><span style="color:#E36209;">name</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;user...beanName: &quot;</span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> name);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">setEmbeddedValueResolver</span><span style="color:#24292E;">(StringValueResolver </span><span style="color:#E36209;">resolver</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        String value </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> resolver.</span><span style="color:#6F42C1;">resolveStringValue</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;\${os.name}...#{20*10}&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;字符串解析的值: &quot;</span><span style="color:#D73A49;">+</span><span style="color:#24292E;">value);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div>`,64),c=[t];function r(E,y,i,F,A,u){return n(),a("div",null,c)}const d=s(e,[["render",r]]);export{g as __pageData,d as default};
