import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.519d889f.js";const u=JSON.parse('{"title":"mybatis-plus-generator","description":"MyBatis 代码生成器","frontmatter":{"description":"MyBatis 代码生成器","tag":["MyBatis","后端"]},"headers":[],"relativePath":"posts/be/MyBitis/mybatis-plus-generator.md","filePath":"posts/be/MyBitis/mybatis-plus-generator.md","lastUpdated":1699262313000}'),p={name:"posts/be/MyBitis/mybatis-plus-generator.md"},o=l(`<h1 id="mybatis-plus-generator" tabindex="-1">mybatis-plus-generator <a class="header-anchor" href="#mybatis-plus-generator" aria-label="Permalink to &quot;mybatis-plus-generator&quot;">​</a></h1><h2 id="mybatis-plus-代码生成器" tabindex="-1">MyBatis Plus 代码生成器 <a class="header-anchor" href="#mybatis-plus-代码生成器" aria-label="Permalink to &quot;MyBatis Plus 代码生成器&quot;">​</a></h2><p><strong>依赖</strong></p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;com.baomidou&lt;/</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;mybatis-plus-generator&lt;/</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt;latest&lt;/</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;com.baomidou&lt;/</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;mybatis-plus-generator&lt;/</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt;latest&lt;/</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p><strong>CodeGenerator 类</strong></p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">CodeGenerator</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] </span><span style="color:#FFAB70;">args</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        String moduleName </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;cms&quot;</span><span style="color:#E1E4E8;">;	</span><span style="color:#6A737D;">//生成的模块名</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 1、创建代码生成器</span></span>
<span class="line"><span style="color:#E1E4E8;">        AutoGenerator mpg </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">AutoGenerator</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 2、全局配置</span></span>
<span class="line"><span style="color:#E1E4E8;">        GlobalConfig gc </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">GlobalConfig</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">      	</span><span style="color:#6A737D;">// 输出路径 需要绝对路径</span></span>
<span class="line"><span style="color:#E1E4E8;">        gc.</span><span style="color:#B392F0;">setOutputDir</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;generate/src/main/java&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        gc.</span><span style="color:#B392F0;">setAuthor</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        gc.</span><span style="color:#B392F0;">setOpen</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">); </span><span style="color:#6A737D;">// 生成后是否打开资源管理器</span></span>
<span class="line"><span style="color:#E1E4E8;">        gc.</span><span style="color:#B392F0;">setFileOverride</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">); </span><span style="color:#6A737D;">// 重新生成时文件是否覆盖</span></span>
<span class="line"><span style="color:#E1E4E8;">        gc.</span><span style="color:#B392F0;">setServiceName</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;%sService&quot;</span><span style="color:#E1E4E8;">);	</span><span style="color:#6A737D;">// 去掉 Service 接口的首字母 I</span></span>
<span class="line"><span style="color:#E1E4E8;">        gc.</span><span style="color:#B392F0;">setIdType</span><span style="color:#E1E4E8;">(IdType.AUTO); </span><span style="color:#6A737D;">// 主键策略</span></span>
<span class="line"><span style="color:#E1E4E8;">        gc.</span><span style="color:#B392F0;">setDateType</span><span style="color:#E1E4E8;">(DateType.ONLY_DATE);</span><span style="color:#6A737D;">// 定义生成的实体类中日期类型</span></span>
<span class="line"><span style="color:#E1E4E8;">        gc.</span><span style="color:#B392F0;">setSwagger2</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">);</span><span style="color:#6A737D;">// 开启 Swagger2 模式</span></span>
<span class="line"><span style="color:#E1E4E8;">        gc.</span><span style="color:#B392F0;">setBaseColumnList</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        mpg.</span><span style="color:#B392F0;">setGlobalConfig</span><span style="color:#E1E4E8;">(gc);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 3、数据源配置</span></span>
<span class="line"><span style="color:#E1E4E8;">        DataSourceConfig dsc </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">DataSourceConfig</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        dsc.</span><span style="color:#B392F0;">setUrl</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;jdbc:mysql://127.0.0.1:3306/test?useUnicode=true&amp;useSSL=false&amp;characterEncoding=utf8&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        dsc.</span><span style="color:#B392F0;">setDriverName</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;com.mysql.jdbc.Driver&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        dsc.</span><span style="color:#B392F0;">setUsername</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;root&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        dsc.</span><span style="color:#B392F0;">setPassword</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;root&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        dsc.</span><span style="color:#B392F0;">setDbType</span><span style="color:#E1E4E8;">(DbType.MYSQL);</span></span>
<span class="line"><span style="color:#E1E4E8;">        mpg.</span><span style="color:#B392F0;">setDataSource</span><span style="color:#E1E4E8;">(dsc);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 4、包配置</span></span>
<span class="line"><span style="color:#E1E4E8;">        PackageConfig pc </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">PackageConfig</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        pc.</span><span style="color:#B392F0;">setModuleName</span><span style="color:#E1E4E8;">(moduleName); </span><span style="color:#6A737D;">// 模块名</span></span>
<span class="line"><span style="color:#E1E4E8;">        pc.</span><span style="color:#B392F0;">setParent</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;com.atguigu.gmall&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        pc.</span><span style="color:#B392F0;">setController</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;controller&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        pc.</span><span style="color:#B392F0;">setEntity</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;entity&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        pc.</span><span style="color:#B392F0;">setService</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;service&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        pc.</span><span style="color:#B392F0;">setMapper</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;mapper&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        mpg.</span><span style="color:#B392F0;">setPackageInfo</span><span style="color:#E1E4E8;">(pc);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 5、策略配置</span></span>
<span class="line"><span style="color:#E1E4E8;">        StrategyConfig strategy </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">StrategyConfig</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        strategy.</span><span style="color:#B392F0;">setInclude</span><span style="color:#E1E4E8;">(moduleName </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;_</span><span style="color:#79B8FF;">\\\\</span><span style="color:#9ECBFF;">w*&quot;</span><span style="color:#E1E4E8;">); </span><span style="color:#6A737D;">// 设置要映射的表名</span></span>
<span class="line"><span style="color:#E1E4E8;">      	</span><span style="color:#6A737D;">// 数据库表映射到实体的命名策略</span></span>
<span class="line"><span style="color:#E1E4E8;">        strategy.</span><span style="color:#B392F0;">setNaming</span><span style="color:#E1E4E8;">(NamingStrategy.underline_to_camel);</span></span>
<span class="line"><span style="color:#E1E4E8;">        strategy.</span><span style="color:#B392F0;">setTablePrefix</span><span style="color:#E1E4E8;">(pc.</span><span style="color:#B392F0;">getModuleName</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;_&quot;</span><span style="color:#E1E4E8;">);</span><span style="color:#6A737D;">//设置表前缀不生成</span></span>
<span class="line"><span style="color:#E1E4E8;">      	</span><span style="color:#6A737D;">//是否生成实体时，生成字段注解</span></span>
<span class="line"><span style="color:#E1E4E8;">        strategy.</span><span style="color:#B392F0;">setEntityTableFieldAnnotationEnable</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">      	</span><span style="color:#6A737D;">// 数据库表字段映射到实体的命名策略</span></span>
<span class="line"><span style="color:#E1E4E8;">        strategy.</span><span style="color:#B392F0;">setColumnNaming</span><span style="color:#E1E4E8;">(NamingStrategy.underline_to_camel);</span></span>
<span class="line"><span style="color:#E1E4E8;">      	</span><span style="color:#6A737D;">// lombok 模型 @Accessors(chain = true) setter 链式操作</span></span>
<span class="line"><span style="color:#E1E4E8;">        strategy.</span><span style="color:#B392F0;">setEntityLombokModel</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">); </span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//strategy.setLogicDeleteFieldName(&quot;is_deleted&quot;);// 逻辑删除字段名</span></span>
<span class="line"><span style="color:#E1E4E8;">      	</span><span style="color:#6A737D;">// 去掉布尔值的 is_ 前缀</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//strategy.setEntityBooleanColumnRemoveIsPrefix(true);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 自动填充</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//TableFill gmtCreate = new TableFill(&quot;gmt_create&quot;, FieldFill.INSERT);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//TableFill gmtModified = new TableFill(&quot;gmt_modified&quot;, FieldFill.INSERT_UPDATE);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//ArrayList&lt;TableFill&gt; tableFills = new ArrayList&lt;&gt;();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//tableFills.add(gmtCreate);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//tableFills.add(gmtModified);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//strategy.setTableFillList(tableFills);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//strategy.setVersionFieldName(&quot;version&quot;); //乐观锁列</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        strategy.</span><span style="color:#B392F0;">setRestControllerStyle</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">);  </span><span style="color:#6A737D;">// restful api 风格控制器</span></span>
<span class="line"><span style="color:#E1E4E8;">        strategy.</span><span style="color:#B392F0;">setControllerMappingHyphenStyle</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">); </span><span style="color:#6A737D;">// url 驼峰转连字符</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        mpg.</span><span style="color:#B392F0;">setStrategy</span><span style="color:#E1E4E8;">(strategy);</span></span>
<span class="line"><span style="color:#E1E4E8;">        mpg.</span><span style="color:#B392F0;">setTemplateEngine</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">FreemarkerTemplateEngine</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 6、执行</span></span>
<span class="line"><span style="color:#E1E4E8;">        mpg.</span><span style="color:#B392F0;">execute</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">CodeGenerator</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] </span><span style="color:#E36209;">args</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        String moduleName </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;cms&quot;</span><span style="color:#24292E;">;	</span><span style="color:#6A737D;">//生成的模块名</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 1、创建代码生成器</span></span>
<span class="line"><span style="color:#24292E;">        AutoGenerator mpg </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">AutoGenerator</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 2、全局配置</span></span>
<span class="line"><span style="color:#24292E;">        GlobalConfig gc </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">GlobalConfig</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">      	</span><span style="color:#6A737D;">// 输出路径 需要绝对路径</span></span>
<span class="line"><span style="color:#24292E;">        gc.</span><span style="color:#6F42C1;">setOutputDir</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;generate/src/main/java&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        gc.</span><span style="color:#6F42C1;">setAuthor</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        gc.</span><span style="color:#6F42C1;">setOpen</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">false</span><span style="color:#24292E;">); </span><span style="color:#6A737D;">// 生成后是否打开资源管理器</span></span>
<span class="line"><span style="color:#24292E;">        gc.</span><span style="color:#6F42C1;">setFileOverride</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">false</span><span style="color:#24292E;">); </span><span style="color:#6A737D;">// 重新生成时文件是否覆盖</span></span>
<span class="line"><span style="color:#24292E;">        gc.</span><span style="color:#6F42C1;">setServiceName</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;%sService&quot;</span><span style="color:#24292E;">);	</span><span style="color:#6A737D;">// 去掉 Service 接口的首字母 I</span></span>
<span class="line"><span style="color:#24292E;">        gc.</span><span style="color:#6F42C1;">setIdType</span><span style="color:#24292E;">(IdType.AUTO); </span><span style="color:#6A737D;">// 主键策略</span></span>
<span class="line"><span style="color:#24292E;">        gc.</span><span style="color:#6F42C1;">setDateType</span><span style="color:#24292E;">(DateType.ONLY_DATE);</span><span style="color:#6A737D;">// 定义生成的实体类中日期类型</span></span>
<span class="line"><span style="color:#24292E;">        gc.</span><span style="color:#6F42C1;">setSwagger2</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">true</span><span style="color:#24292E;">);</span><span style="color:#6A737D;">// 开启 Swagger2 模式</span></span>
<span class="line"><span style="color:#24292E;">        gc.</span><span style="color:#6F42C1;">setBaseColumnList</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">true</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        mpg.</span><span style="color:#6F42C1;">setGlobalConfig</span><span style="color:#24292E;">(gc);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 3、数据源配置</span></span>
<span class="line"><span style="color:#24292E;">        DataSourceConfig dsc </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">DataSourceConfig</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        dsc.</span><span style="color:#6F42C1;">setUrl</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;jdbc:mysql://127.0.0.1:3306/test?useUnicode=true&amp;useSSL=false&amp;characterEncoding=utf8&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        dsc.</span><span style="color:#6F42C1;">setDriverName</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;com.mysql.jdbc.Driver&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        dsc.</span><span style="color:#6F42C1;">setUsername</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;root&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        dsc.</span><span style="color:#6F42C1;">setPassword</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;root&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        dsc.</span><span style="color:#6F42C1;">setDbType</span><span style="color:#24292E;">(DbType.MYSQL);</span></span>
<span class="line"><span style="color:#24292E;">        mpg.</span><span style="color:#6F42C1;">setDataSource</span><span style="color:#24292E;">(dsc);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 4、包配置</span></span>
<span class="line"><span style="color:#24292E;">        PackageConfig pc </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">PackageConfig</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        pc.</span><span style="color:#6F42C1;">setModuleName</span><span style="color:#24292E;">(moduleName); </span><span style="color:#6A737D;">// 模块名</span></span>
<span class="line"><span style="color:#24292E;">        pc.</span><span style="color:#6F42C1;">setParent</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;com.atguigu.gmall&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        pc.</span><span style="color:#6F42C1;">setController</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;controller&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        pc.</span><span style="color:#6F42C1;">setEntity</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;entity&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        pc.</span><span style="color:#6F42C1;">setService</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;service&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        pc.</span><span style="color:#6F42C1;">setMapper</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;mapper&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        mpg.</span><span style="color:#6F42C1;">setPackageInfo</span><span style="color:#24292E;">(pc);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 5、策略配置</span></span>
<span class="line"><span style="color:#24292E;">        StrategyConfig strategy </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">StrategyConfig</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        strategy.</span><span style="color:#6F42C1;">setInclude</span><span style="color:#24292E;">(moduleName </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;_</span><span style="color:#005CC5;">\\\\</span><span style="color:#032F62;">w*&quot;</span><span style="color:#24292E;">); </span><span style="color:#6A737D;">// 设置要映射的表名</span></span>
<span class="line"><span style="color:#24292E;">      	</span><span style="color:#6A737D;">// 数据库表映射到实体的命名策略</span></span>
<span class="line"><span style="color:#24292E;">        strategy.</span><span style="color:#6F42C1;">setNaming</span><span style="color:#24292E;">(NamingStrategy.underline_to_camel);</span></span>
<span class="line"><span style="color:#24292E;">        strategy.</span><span style="color:#6F42C1;">setTablePrefix</span><span style="color:#24292E;">(pc.</span><span style="color:#6F42C1;">getModuleName</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;_&quot;</span><span style="color:#24292E;">);</span><span style="color:#6A737D;">//设置表前缀不生成</span></span>
<span class="line"><span style="color:#24292E;">      	</span><span style="color:#6A737D;">//是否生成实体时，生成字段注解</span></span>
<span class="line"><span style="color:#24292E;">        strategy.</span><span style="color:#6F42C1;">setEntityTableFieldAnnotationEnable</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">true</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">      	</span><span style="color:#6A737D;">// 数据库表字段映射到实体的命名策略</span></span>
<span class="line"><span style="color:#24292E;">        strategy.</span><span style="color:#6F42C1;">setColumnNaming</span><span style="color:#24292E;">(NamingStrategy.underline_to_camel);</span></span>
<span class="line"><span style="color:#24292E;">      	</span><span style="color:#6A737D;">// lombok 模型 @Accessors(chain = true) setter 链式操作</span></span>
<span class="line"><span style="color:#24292E;">        strategy.</span><span style="color:#6F42C1;">setEntityLombokModel</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">true</span><span style="color:#24292E;">); </span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//strategy.setLogicDeleteFieldName(&quot;is_deleted&quot;);// 逻辑删除字段名</span></span>
<span class="line"><span style="color:#24292E;">      	</span><span style="color:#6A737D;">// 去掉布尔值的 is_ 前缀</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//strategy.setEntityBooleanColumnRemoveIsPrefix(true);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 自动填充</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//TableFill gmtCreate = new TableFill(&quot;gmt_create&quot;, FieldFill.INSERT);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//TableFill gmtModified = new TableFill(&quot;gmt_modified&quot;, FieldFill.INSERT_UPDATE);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//ArrayList&lt;TableFill&gt; tableFills = new ArrayList&lt;&gt;();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//tableFills.add(gmtCreate);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//tableFills.add(gmtModified);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//strategy.setTableFillList(tableFills);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//strategy.setVersionFieldName(&quot;version&quot;); //乐观锁列</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        strategy.</span><span style="color:#6F42C1;">setRestControllerStyle</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">true</span><span style="color:#24292E;">);  </span><span style="color:#6A737D;">// restful api 风格控制器</span></span>
<span class="line"><span style="color:#24292E;">        strategy.</span><span style="color:#6F42C1;">setControllerMappingHyphenStyle</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">true</span><span style="color:#24292E;">); </span><span style="color:#6A737D;">// url 驼峰转连字符</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        mpg.</span><span style="color:#6F42C1;">setStrategy</span><span style="color:#24292E;">(strategy);</span></span>
<span class="line"><span style="color:#24292E;">        mpg.</span><span style="color:#6F42C1;">setTemplateEngine</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">FreemarkerTemplateEngine</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 6、执行</span></span>
<span class="line"><span style="color:#24292E;">        mpg.</span><span style="color:#6F42C1;">execute</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>3、将逆向工程生成的代码复制进对应的工程模块</p><p>① 先复制 Mapper</p><p>② 新建 <code>service.impl</code> 包</p><p>③ 将相应的实现类复制过来</p><br><h2 id="参考" tabindex="-1">参考 <a class="header-anchor" href="#参考" aria-label="Permalink to &quot;参考&quot;">​</a></h2><ul><li><a href="https://baomidou.com/" target="_blank" rel="noreferrer">https://baomidou.com/</a></li></ul>`,13),e=[o];function t(c,r,E,y,i,F){return n(),a("div",null,e)}const d=s(p,[["render",t]]);export{u as __pageData,d as default};
