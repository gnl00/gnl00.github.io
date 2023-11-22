import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.b41230ea.js";const p="/assets/image-20210714143132828.72243e94.png",d=JSON.parse('{"title":"Elasticsearch","description":"Elasticsearch 详解","frontmatter":{"description":"Elasticsearch 详解","outline":[2,3],"tag":["Elasticsearch","中间件"]},"headers":[],"relativePath":"posts/mw/Elasticsearch/Elasticsearch.md","filePath":"posts/mw/Elasticsearch/Elasticsearch.md","lastUpdated":1700657743000}'),o={name:"posts/mw/Elasticsearch/Elasticsearch.md"},e=l(`<h1 id="elasticsearch" tabindex="-1">Elasticsearch <a class="header-anchor" href="#elasticsearch" aria-label="Permalink to &quot;Elasticsearch&quot;">​</a></h1><h2 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言&quot;">​</a></h2><p><strong>全文索引</strong></p><p>一般传统数据库，进行全文检索需要扫描整个表，如果数据量太大，即使对 SQL 的语法优化，效果也不明显。如果建立索引，维护起来也很麻烦，对于 insert 和 update 操作都会重新构建索引。</p><p>在下面的一些情况中，使用常规的搜索方式，性能较差：</p><ul><li>搜索的数据对象是大量的非结构化的文本数据</li><li>文件记录量达到数十万或数百万个甚至更多</li><li>支持大量基于交互式文本的查询</li><li>需求非常灵活的全文搜索查询</li><li>对高度相关的搜索结果的有特殊需求，没有可用的关系数据库可以满足</li><li>对不同记录类型、非文本数据操作或安全事务处理的需求相对较少</li></ul><p>为了解决结构化数据搜索和非结构化数据搜索性能问题，需要全文搜索引擎</p><blockquote><p>全文搜索引擎工作原理是扫描文章中的每一个词，对每一个词建立一个索引，指明该词在文章中出现的次数和位置。当用户查询时，检索程序就根据事先建立的索引进行查找，并将查找的结果反馈给用户。类似于通过字典中的检索字表查字的过程。</p></blockquote><br><p><strong>Lucene</strong></p><blockquote><p>Lucene 是一个全文搜索引擎库，Elasticsearch 是基于 Lucene 的分布式搜索引擎，相比于 Lucene 操作更容易与方便，部署与扩展更简单。Elasticsearch 使用 Lucene 作为其核心搜索引擎，并提供了分布式、支持复杂查询和分析的搜索功能。</p><p>Elasticsearch 将 Lucene 的功能暴露给用户，并提供了许多额外的功能和工具，例如聚合、分布式搜索、集群管理等等。</p></blockquote><blockquote><p>Lucene 索引由多个文档组成，每个文档又由多个字段组成。每个字段可以有一个或多个相应的属性，例如数据类型、是否存储等。当文档被加入索引时，Lucene 会将文档中的字段值解析为词汇单元（term），并对这些词汇单元进行分词、分析和归档操作，生成一个倒排索引（Inverted Index）。</p></blockquote><br><p><strong>倒排索引</strong></p><blockquote><p>倒排索引是一种常用的文本检索技术，常用于搜索引擎中。与传统索引方式不同，倒排索引是通过单词来查找文档，而不是通过文档来查找单词。倒排索引将单词作为索引关键字，把这些单词所在的文档编号作为索引指针，按照单词首字母的字母表顺序建立的一种索引结构。</p></blockquote><blockquote><p>具体来说，倒排索引是由一个映射关系组成的数据结构，将每个单词映射到包含该单词的所有文档列表中。当用户搜索某个单词时，只需要在该单词对应的文档列表中查找即可，不必遍历所有文档。</p><p>倒排索引可以极大地加快搜索速度，并且可以进行复杂的词语查询，如短语匹配和模糊搜索。</p></blockquote><blockquote><p><a href="https://www.elastic.co/guide/cn/elasticsearch/guide/current/inverted-index.html" target="_blank" rel="noreferrer">官方介绍</a></p></blockquote><br><h2 id="概念" tabindex="-1">概念 <a class="header-anchor" href="#概念" aria-label="Permalink to &quot;概念&quot;">​</a></h2><p><strong>数据存储结构</strong></p><table><thead><tr><th>关系型数据库</th><th>Elasticsearch</th></tr></thead><tbody><tr><td>Database</td><td>Index（类似于传统关系数据库中的数据库，是存储关系型文档的地方）</td></tr><tr><td>Table</td><td>Type</td></tr><tr><td>行（Row）</td><td>文档（Document）</td></tr><tr><td>Columns</td><td>Field</td></tr><tr><td>字段（Field）</td><td>Term（搜索的基本单位，如文本中的一个词）</td></tr><tr><td>Schema</td><td>Mapping</td></tr><tr><td>SQL</td><td>DSL</td></tr></tbody></table><br><h3 id="索引" tabindex="-1">索引 <a class="header-anchor" href="#索引" aria-label="Permalink to &quot;索引&quot;">​</a></h3><blockquote><p>Elasticsearch 把数据存放到一个或者多个索引（indices）中，简单来说索引就是相似结构的文档集合。对比关系型数据库，创建索引就等同于创建数据库。</p><p>Elasticsearch 会用到分片（shards）和备份（replicas）机制将一个索引（index）存储多份。</p></blockquote><blockquote><p><strong>索引与文档</strong></p><p>一个索引中包含相同或者类似的文档，比如 goods 索引，包含各种不同的商品，可以是生活用品也可以是其他商品</p></blockquote><blockquote><p><strong>索引结构</strong></p><p>索引的结构包括索引别名、索引的映射信息、索引的设置三部分</p><ul><li>aliases，索引别名</li><li>mappings，用来描述文档包含的字段和字段类型</li><li>settings，索引的配置信息，比如索引的分片信息/索引副本信息/索引创建时间等</li></ul></blockquote><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// put goods index</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;goods&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;aliases&quot;</span><span style="color:#E1E4E8;">: {},</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;mappings&quot;</span><span style="color:#E1E4E8;">: {},</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;settings&quot;</span><span style="color:#E1E4E8;">: {}</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#6A737D;">// get goods index</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;goods&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;aliases&quot;</span><span style="color:#E1E4E8;">: {},</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;mappings&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">&quot;properties&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;price&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#79B8FF;">&quot;score&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">          	</span><span style="color:#79B8FF;">&quot;type&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;float&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        	}</span></span>
<span class="line"><span style="color:#E1E4E8;">        },</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;name&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#79B8FF;">&quot;type&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;text&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#79B8FF;">&quot;fields&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">&quot;keyword&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#79B8FF;">&quot;type&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;keyword&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#79B8FF;">&quot;ignore_above&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">256</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">          }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;settings&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">&quot;index&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;routing&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#79B8FF;">&quot;allocation&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">&quot;include&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#79B8FF;">&quot;_tier_preference&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;data_content&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">          }</span></span>
<span class="line"><span style="color:#E1E4E8;">        },</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;number_of_shards&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;1&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;provided_name&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;person&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;creation_date&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;1680100123619&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;number_of_replicas&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;1&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;uuid&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;7K7_IFlrQPOHohi81GytOw&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;version&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#79B8FF;">&quot;created&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;7170999&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// put goods index</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;goods&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;aliases&quot;</span><span style="color:#24292E;">: {},</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;mappings&quot;</span><span style="color:#24292E;">: {},</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;settings&quot;</span><span style="color:#24292E;">: {}</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6A737D;">// get goods index</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;goods&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;aliases&quot;</span><span style="color:#24292E;">: {},</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;mappings&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">&quot;properties&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;price&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#005CC5;">&quot;score&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">          	</span><span style="color:#005CC5;">&quot;type&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;float&quot;</span></span>
<span class="line"><span style="color:#24292E;">        	}</span></span>
<span class="line"><span style="color:#24292E;">        },</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;name&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#005CC5;">&quot;type&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;text&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#005CC5;">&quot;fields&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#005CC5;">&quot;keyword&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#005CC5;">&quot;type&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;keyword&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#005CC5;">&quot;ignore_above&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">256</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">          }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;settings&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">&quot;index&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;routing&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#005CC5;">&quot;allocation&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#005CC5;">&quot;include&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#005CC5;">&quot;_tier_preference&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;data_content&quot;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">          }</span></span>
<span class="line"><span style="color:#24292E;">        },</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;number_of_shards&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;1&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;provided_name&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;person&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;creation_date&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;1680100123619&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;number_of_replicas&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;1&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;uuid&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;7K7_IFlrQPOHohi81GytOw&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;version&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#005CC5;">&quot;created&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;7170999&quot;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><blockquote><p><strong>不同场景下索引的含义</strong></p><ul><li>在 ES 中，索引是一类文档的集合，是名词</li><li>保存一个文档到 ES 的过程也叫索引（Indexing），是动词，类似 SQL 中的 <code>INSERT</code> 关键词</li><li>倒排索引是 ES 中一个重要的数据结构。关系型数据库通过增加一个索引，比如 B-树 索引 到指定的列上，以便提升数据检索速度。Elasticsearch 和 Lucene 使用了一个叫做<strong>倒排索引</strong>的结构来达到相同的目的</li></ul></blockquote><br><h3 id="类型" tabindex="-1">类型 <a class="header-anchor" href="#类型" aria-label="Permalink to &quot;类型&quot;">​</a></h3><blockquote><p>在 Elasticsearch 6.x 版本及以前，每个索引都可以定义多个类型，用于区分不同种类的文档。例如，一个名为 blog 的索引可以定义两个类型，一个是 post，一个是 comment，用于存储博客文章和评论两种不同类型的文档（相当于 blog 数据库中有 post 和 comment 两张表）</p></blockquote><blockquote><p>每个类型都可以定义自己的映射，包含了字段的数据类型、分词器、分析器、索引选项等信息，不同类型之间可以有不同的映射，从而能够根据具体需求灵活地控制每种类型的索引行为。例如，博客文章的标题和内容可能需要被分词，以便进行全文搜索，而评论则不需要被分词。</p></blockquote><blockquote><p>在 Elasticsearch 7.x 版本中，类型已经被废弃，每个索引只能存在一个默认的 <code>_doc</code> 类型，所有的文档都属于该类型。相应地，所有的映射定义都需要使用 <code>_doc</code> 类型来表示。这是为了简化 Elasticsearch 的内部结构，减少维护和开发的成本。</p></blockquote><br><h3 id="文档" tabindex="-1">文档 <a class="header-anchor" href="#文档" aria-label="Permalink to &quot;文档&quot;">​</a></h3><blockquote><p>ES 是面向文档的，文档是主要的存在实体，是可搜索数据的最小单位</p></blockquote><ul><li>在 ES 中，文档会被序列化成 JSON 格式保存。JSON 对象由字段组成，其中每个字段都有对应的字段类型（字符串/数组/布尔/日期/二进制/范围类型）</li><li>在 ES 中，每个文档都有一个唯一的 ID，可以<strong>自己指定 ID</strong>，也可以通过 <strong>ES 自动生成</strong></li><li>JSON 每个字段都有对应的数据类型，ES 会自动进行数据类型推断，在 ES 中数据还支持<strong>数组和嵌套</strong>。</li></ul><p><strong>ES 数据内容</strong></p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// _index、_id 和 _source 是必须存在的元数据，其他元数据都是可选的</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;_index&quot;</span><span style="color:#E1E4E8;"> : </span><span style="color:#9ECBFF;">&quot;movies&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// 文档元数据，代表文档所属的索引名</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;_type&quot;</span><span style="color:#E1E4E8;"> : </span><span style="color:#9ECBFF;">&quot;_doc&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// 文档元数据，表示文档所属的类型名</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;_id&quot;</span><span style="color:#E1E4E8;"> : </span><span style="color:#9ECBFF;">&quot;1&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// 文档元数据，文档唯一 id</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;_score&quot;</span><span style="color:#E1E4E8;"> : </span><span style="color:#79B8FF;">1.0</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// 文档元数据，为查询结果相关性打分</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;_source&quot;</span><span style="color:#E1E4E8;"> : { </span><span style="color:#6A737D;">// 文档的原始 JSON 数据</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;title&quot;</span><span style="color:#E1E4E8;"> : </span><span style="color:#9ECBFF;">&quot;Blackbeard&#39;s Ghost&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;genre&quot;</span><span style="color:#E1E4E8;"> : [</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;Children&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;Comedy&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    ],</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;@version&quot;</span><span style="color:#E1E4E8;"> : </span><span style="color:#9ECBFF;">&quot;1&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// 文档的版本信息，解决版本冲突的问题</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// _index、_id 和 _source 是必须存在的元数据，其他元数据都是可选的</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;_index&quot;</span><span style="color:#24292E;"> : </span><span style="color:#032F62;">&quot;movies&quot;</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// 文档元数据，代表文档所属的索引名</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;_type&quot;</span><span style="color:#24292E;"> : </span><span style="color:#032F62;">&quot;_doc&quot;</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// 文档元数据，表示文档所属的类型名</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;_id&quot;</span><span style="color:#24292E;"> : </span><span style="color:#032F62;">&quot;1&quot;</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// 文档元数据，文档唯一 id</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;_score&quot;</span><span style="color:#24292E;"> : </span><span style="color:#005CC5;">1.0</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// 文档元数据，为查询结果相关性打分</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;_source&quot;</span><span style="color:#24292E;"> : { </span><span style="color:#6A737D;">// 文档的原始 JSON 数据</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;title&quot;</span><span style="color:#24292E;"> : </span><span style="color:#032F62;">&quot;Blackbeard&#39;s Ghost&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;genre&quot;</span><span style="color:#24292E;"> : [</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;Children&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;Comedy&quot;</span></span>
<span class="line"><span style="color:#24292E;">    ],</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;@version&quot;</span><span style="color:#24292E;"> : </span><span style="color:#032F62;">&quot;1&quot;</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// 文档的版本信息，解决版本冲突的问题</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><br><h3 id="节点" tabindex="-1">节点 <a class="header-anchor" href="#节点" aria-label="Permalink to &quot;节点&quot;">​</a></h3><blockquote><p>每个 ES 实例都是一个节点，节点<strong>本质上是一个 Java 进程</strong>。一台机器上可以运行多个节点，但是生产环境一般建议一台机器上只运行一个节点，利于进行容灾备份</p></blockquote><blockquote><p><strong>节点名称</strong></p><p>每个节点都有名字（方便运维管理操作），可以通过配置文件进行配置，或启动的时候添加环境变量 <code>-E node.name=node1</code> 指定名称。每一个节点在启动之后，会分配一个 UID，保存在 data 目录下</p></blockquote><blockquote><p><strong>节点与集群</strong></p><p>节点默认会加入名为 elasticsearch 的集群，如果直接启动很多节点，它们会自动组成一个 elasticsearch 集群。当然，一个节点也可以组成一个 elasticsearch 集群，称为单一节点集群</p></blockquote><p><img src="`+p+`" alt="image-20210714143132828"></p><br><h4 id="节点分类" tabindex="-1">节点分类 <a class="header-anchor" href="#节点分类" aria-label="Permalink to &quot;节点分类&quot;">​</a></h4><blockquote><p><strong>候选主节点和主节点</strong></p><ul><li>每一个节点启动后，默认就是一个候选主节点（<em>Master-eligible Node</em>），可以在配置文件中修改 <code>node.master: false</code> 禁止。候选主节点可以参加选主流程，成为主节点（Master Node）。当第一个节点启动时候，它会将自己选举成 Master 节点</li><li>每个节点上都保存了集群的状态，但只有 Master 节点才能修改集群的状态信息。如果是任意节点都能修改信息，就会导致数据的不一致性</li></ul></blockquote><blockquote><p><strong>数据节点与协调节点</strong></p><ul><li>数据节点（<em>Data Node</em>），可以保存数据的节点。负责保存分片上存储的所有数据，当集群无法保存现有数据时，可以通过增加数据节点来解决存储上的问题</li><li>协调节点（<em>Coordinating Node</em>），负责接收客户端请求，将请求分发到合适的节点。最终把结果汇集到一起返回给客户端，每个节点默认都起到了协调节点的职责</li></ul></blockquote><blockquote><p><strong>其他节点类型</strong></p><ul><li><p>冷热节点（<em>Hot/Warm Node</em>），降低集群部署的成本</p><p>热节点（<em>Hot Node</em>），配置高的节点，有更好的磁盘吞吐量和 CPU；</p><p>冷节点（<em>Warm Node</em>），存储旧数据，节点的机器配置会比较低。</p></li><li><p>机器学习节点（<em>Machine Learning Node</em>），负责执行机器学习任务</p></li><li><p>部落节点（<em>Tribe Node</em>），连接不同的 ES 集群</p></li><li><p>预处理节点（<em>Ingest Node</em>）</p><p>预处理操作允许在索引文档之前（写入数据之前），通过事先定义好的一系列的 processors（处理器）和 pipeline（管道），对数据进行转换、加工</p></li></ul></blockquote><br><h4 id="节点类型配置" tabindex="-1">节点类型配置 <a class="header-anchor" href="#节点类型配置" aria-label="Permalink to &quot;节点类型配置&quot;">​</a></h4><blockquote><p>开发环境中，一个节点可以承担多种角色；生产环境中，应该设置单一的角色的节点（<em>Dedicated Node</em>）</p></blockquote><table><thead><tr><th>节点类型</th><th>配置参数</th><th>默认值</th></tr></thead><tbody><tr><td>master-eligible</td><td>node.master</td><td>true</td></tr><tr><td>data</td><td>node.data</td><td>true</td></tr><tr><td>ingest</td><td>node.ingest</td><td>true</td></tr><tr><td>coordinating only</td><td>无</td><td>每个节点默认都是 coordinating 节点</td></tr><tr><td>machine learning</td><td>node.ml</td><td>true</td></tr></tbody></table><br><h3 id="集群" tabindex="-1">集群 <a class="header-anchor" href="#集群" aria-label="Permalink to &quot;集群&quot;">​</a></h3><blockquote><p>ES 集群其实是一个分布式系统，要满足高可用性。需要保证当集群中有节点服务停止响应的时候，整个服务还能正常工作，即<strong>服务可用性</strong>；整个集群中有部分节点丢失的情况下，不会有数据丢失，即<strong>数据可用性</strong>。</p></blockquote><blockquote><p><strong>集群的作用</strong></p><p>当用户的请求量越来越高，数据的增长越来越多的时候，系统需要把数据分散到其他节点上，实现水平扩展。当集群中有节点出现问题的时候，整个集群的服务也不会受到影响。</p><p><strong>集群命名</strong></p><p>不同的集群是通过不同的名字来区分的，默认的名字为 elasticsearch，可以在配置文件中进行修改，或者在命令行中使用 <code>-E cluster.name=customName</code> 设定，一个集群可以有一个或多个节点。</p></blockquote><blockquote><p><strong>集群健康状态</strong></p><ul><li><p>Green 主分片与副本都正常分配</p></li><li><p>Yellow 主分片全部正常分配，有副本分片未能正常分配</p></li><li><p>Red 有主分片未能分配。例如，当服务器的磁盘容量超过 85% 时，去创建了一个新的索引</p></li></ul></blockquote><blockquote><p>集群状态信息（<em>Cluster State</em>），维护一个集群中必要的信息，其中的信息只能由 master 节点进行修改。主要包括：</p><ul><li><p>所有的节点信息</p></li><li><p>所有的索引和其相关的 mapping 与 setting 信息</p></li><li><p>分片的路由信息</p></li></ul></blockquote><br><h3 id="分片" tabindex="-1">分片 <a class="header-anchor" href="#分片" aria-label="Permalink to &quot;分片&quot;">​</a></h3><blockquote><p>由于单台机器无法存储大量数据，ES 可以将一个索引中的数据切分为多个分片（Shard），分布在多台服务器上存储。有了分片就可以横向扩展，存储更多数据，让搜索和分析等操作分布到多台服务器上去执行，提升吞吐量和性能。当一个节点失效时，数据仍然可以通过其他节点进行查询。</p></blockquote><blockquote><p>在 Elasticsearch 中，每个索引都可以被分成多个分片，每个分片是一个独立的 Lucene 索引，可以独立执行建立索引和搜索任务。</p><p>分片是数据的容器，文档保存在分片内，分片又被分配到集群内的各个节点里。当集群规模扩大或者缩小时，Elasticsearch 会自动的在各节点中迁移分片，使得数据仍然均匀分布在集群里。</p></blockquote><blockquote><p><strong>易混淆概念</strong></p><p>Elasticsearch 是分片的集合，每个分片是一个独立的 Lucene 索引。</p><p>当 Elasticsearch 在索引中搜索的时候，它发送查询到每一个属于该索引的分片（Lucene 索引），合并每个分片的结果到一个全局的结果集。</p></blockquote><br><p><strong>主副分片</strong></p><blockquote><p>一个分片可以是<strong>主分片（<em>Primary Shard</em>）<strong>或者</strong>副本分片（<em>Replica Shard</em>）</strong></p><ul><li>索引内任意一个文档都归属于一个主分片，主分片的数目决定着索引能够保存的最大数据量</li><li>副本分片只是主分片的拷贝，副本分片作为硬件故障时保护数据不丢失的冗余备份，并为搜索和返回文档等读操作提供服务。</li></ul><p>在索引建立的时候就已经确定了主分片数，但是副本分片数可以随时修改。主分片数默认为 5，副本数默认为 1，表示每个分片都会有一个副本。副本数设置为 0 表示没有副本。</p><p>增加分片数会带来以下好处</p><ol><li>改善索引和搜索性能，因为更多的分片可以提高并发处理的能力</li><li>允许更多的数据存储</li></ol><br><p>增加分片数也会带来以下问题</p><ol><li>每个分片都需要占用一定的内存和磁盘空间，增加了硬件成本</li><li>每个分片都需要占用一定的网络带宽，增加了网络负载</li><li>增加分片数会增加集群维护和管理的复杂度</li></ol><br><p><strong>为索引设置主分片和副本分片</strong></p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// PUT /blogs</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;settings&quot;</span><span style="color:#E1E4E8;"> :{</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;number_of_shards&quot;</span><span style="color:#E1E4E8;"> : </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// # 3 份主分片</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;number_of_repicas&quot;</span><span style="color:#E1E4E8;"> : </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// # 1 份副本</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#6A737D;">// 索引被分成了 3 个主分片，即便增加再多节点，索引也只能分散在 3 个节点上</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// PUT /blogs</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;settings&quot;</span><span style="color:#24292E;"> :{</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;number_of_shards&quot;</span><span style="color:#24292E;"> : </span><span style="color:#005CC5;">3</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// # 3 份主分片</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;number_of_repicas&quot;</span><span style="color:#24292E;"> : </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">// # 1 份副本</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6A737D;">// 索引被分成了 3 个主分片，即便增加再多节点，索引也只能分散在 3 个节点上</span></span></code></pre></div><br><p><strong>自适应副本</strong></p><p>Elasticsearch 中的自适应副本是一种动态调整副本数量的功能。它根据当前集群的状态和负载情况自动调整分片的副本数量，以提供更好的性能和可靠性。</p></blockquote><br><p><strong>分片的设定</strong></p><blockquote><p>分片的设定需要提前做好容量规划，分片设置过大可能会带来副作用：</p><ul><li>影响搜索结果的打分，影响统计结果的准确性</li><li>单个节点上过多的分片，导致资源浪费，影响性能</li></ul><p>主分片数在索引创建时指定，后续不允许修改；副分片数量可以动态调整，通过增加副本数，可以在一定程度上提高服务的查询性能（读取吞吐提高）</p></blockquote><br><p><strong>分段</strong></p><blockquote><p>在 Elasticsearch 中，分段（segment）是对每个分片内部的数据进行分割的一种方式，它是索引的最小单元。每个分片内部包含一个或多个分段，每个分段存储一部分文档数据。</p></blockquote><blockquote><p>Lucene 索引由很多分段组成，每个分段都是一个倒排索引。ES 每次 refresh 都会生成一个新的分段，其中包含若干文档的数据。在每个分段内部，文档的不同字段被单独建立索引。<strong>每个字段的值由若干词（Term）组成，Term 是原文本内容经过分词器处理和语言处理后的最终结果</strong></p></blockquote><br><h3 id="rest-api" tabindex="-1">REST API <a class="header-anchor" href="#rest-api" aria-label="Permalink to &quot;REST API&quot;">​</a></h3><ul><li>GET</li><li>PUT</li><li>POST</li><li>DELETE</li><li>HEAD</li></ul><br><h2 id="安装启动" tabindex="-1">安装启动 <a class="header-anchor" href="#安装启动" aria-label="Permalink to &quot;安装启动&quot;">​</a></h2><p><strong>Docker</strong></p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># es</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 1、拉取镜像</span></span>
<span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">pull</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">elasticsearch:7.6.2</span></span>
<span class="line"><span style="color:#6A737D;"># 2、创建挂载的目录</span></span>
<span class="line"><span style="color:#B392F0;">mkdir</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-p</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/mydata/elasticsearch/config</span></span>
<span class="line"><span style="color:#B392F0;">mkdir</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-p</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/mydata/elasticsearch/data</span></span>
<span class="line"><span style="color:#6A737D;"># 3、创建配置文件</span></span>
<span class="line"><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;http.host: 0.0.0.0&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/mydata/elasticsearch/config/elasticsearch.yml</span></span>
<span class="line"><span style="color:#6A737D;"># 4、创建容器并启动，单节点启动</span></span>
<span class="line"><span style="color:#6A737D;"># 9300 端口为 Elasticsearch 集群间组件的通信端口， 9200 端口为浏览器访问的 http协议 RESTful 端口</span></span>
<span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">run</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--name</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">es</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--net</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">esnet</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-p</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">9200</span><span style="color:#9ECBFF;">:9200</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-p</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">9300</span><span style="color:#9ECBFF;">:9300</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-e</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;discovery.type=single-node&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-e</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ES_JAVA_OPTS=&quot;-Xms1024m -Xmx1024m&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-v</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">~/Workspace/Docker/es/elasticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-d</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">elasticsearch:7.17.9</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">-v</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/es/config/elasticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#B392F0;">-v</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/es/data:/usr/share/elasticsearch/data</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#B392F0;">-v</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/es/plugins:/usr/share/elasticsearch/plugins</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># elasticsearch.yml 是挂载的配置文件</span></span>
<span class="line"><span style="color:#6A737D;"># data 是挂载的数据</span></span>
<span class="line"><span style="color:#6A737D;"># plugins 是 es 的插件，如ik，数据挂载需要权限，需要设置data文件的权限为可读可写,需要下边的指令。</span></span>
<span class="line"><span style="color:#6A737D;"># -e &quot;discovery.type=single-node&quot; 设置为单节点</span></span>
<span class="line"><span style="color:#6A737D;"># -e ES_JAVA_OPTS=&quot;-Xms256m -Xmx256m&quot; 设置 ES 的初始内存和最大内存，过大可能无法启动 ES</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 访问 http://localhost:9200 查看 es 启动情况</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># es</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 1、拉取镜像</span></span>
<span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">pull</span><span style="color:#24292E;"> </span><span style="color:#032F62;">elasticsearch:7.6.2</span></span>
<span class="line"><span style="color:#6A737D;"># 2、创建挂载的目录</span></span>
<span class="line"><span style="color:#6F42C1;">mkdir</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-p</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/mydata/elasticsearch/config</span></span>
<span class="line"><span style="color:#6F42C1;">mkdir</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-p</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/mydata/elasticsearch/data</span></span>
<span class="line"><span style="color:#6A737D;"># 3、创建配置文件</span></span>
<span class="line"><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;http.host: 0.0.0.0&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/mydata/elasticsearch/config/elasticsearch.yml</span></span>
<span class="line"><span style="color:#6A737D;"># 4、创建容器并启动，单节点启动</span></span>
<span class="line"><span style="color:#6A737D;"># 9300 端口为 Elasticsearch 集群间组件的通信端口， 9200 端口为浏览器访问的 http协议 RESTful 端口</span></span>
<span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">run</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--name</span><span style="color:#24292E;"> </span><span style="color:#032F62;">es</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--net</span><span style="color:#24292E;"> </span><span style="color:#032F62;">esnet</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-p</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">9200</span><span style="color:#032F62;">:9200</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-p</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">9300</span><span style="color:#032F62;">:9300</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-e</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;discovery.type=single-node&quot;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-e</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ES_JAVA_OPTS=&quot;-Xms1024m -Xmx1024m&quot;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-v</span><span style="color:#24292E;"> </span><span style="color:#032F62;">~/Workspace/Docker/es/elasticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-d</span><span style="color:#24292E;"> </span><span style="color:#032F62;">elasticsearch:7.17.9</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">-v</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/es/config/elasticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#6F42C1;">-v</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/es/data:/usr/share/elasticsearch/data</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#6F42C1;">-v</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/es/plugins:/usr/share/elasticsearch/plugins</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># elasticsearch.yml 是挂载的配置文件</span></span>
<span class="line"><span style="color:#6A737D;"># data 是挂载的数据</span></span>
<span class="line"><span style="color:#6A737D;"># plugins 是 es 的插件，如ik，数据挂载需要权限，需要设置data文件的权限为可读可写,需要下边的指令。</span></span>
<span class="line"><span style="color:#6A737D;"># -e &quot;discovery.type=single-node&quot; 设置为单节点</span></span>
<span class="line"><span style="color:#6A737D;"># -e ES_JAVA_OPTS=&quot;-Xms256m -Xmx256m&quot; 设置 ES 的初始内存和最大内存，过大可能无法启动 ES</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 访问 http://localhost:9200 查看 es 启动情况</span></span></code></pre></div><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># kibana</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 1、拉取镜像</span></span>
<span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">pull</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kibana:7.6.2</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 2、创建容器并启动</span></span>
<span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">run</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--name</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kibana</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-e</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ELASTICSEARCH_HOSTS=http://IP地址:9200</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-p</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">5601</span><span style="color:#9ECBFF;">:5601</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-d</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kibana:7.6.2</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 查看kibana启动日志</span></span>
<span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">logs</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kibana</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 3、进入kibana容器修改相应内容</span></span>
<span class="line"><span style="color:#6A737D;"># 修改docker内kibana的配置文件 kibana/config/kibana.yml</span></span>
<span class="line"><span style="color:#B392F0;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">exec</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-it</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kibana</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">bash</span></span>
<span class="line"><span style="color:#79B8FF;">cd</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">config</span></span>
<span class="line"><span style="color:#B392F0;">cp</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kibana.yml</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kibana.yml.bak</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">vi</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kibana.yml</span></span>
<span class="line"><span style="color:#B392F0;">server.port:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">5601</span></span>
<span class="line"><span style="color:#B392F0;">server.host:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0.0</span><span style="color:#9ECBFF;">.0.0</span></span>
<span class="line"><span style="color:#B392F0;">elasticsearch.hosts:</span><span style="color:#E1E4E8;"> [ </span><span style="color:#9ECBFF;">&quot;http://公网IP地址:9200&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">]</span></span>
<span class="line"><span style="color:#B392F0;">i18n.locale:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Zh-CN&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 4、重启kibana</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 5、访问页面</span></span>
<span class="line"><span style="color:#6A737D;"># http://IP地址:5601/app/kibana</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># kibana</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 1、拉取镜像</span></span>
<span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">pull</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kibana:7.6.2</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 2、创建容器并启动</span></span>
<span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">run</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--name</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kibana</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-e</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ELASTICSEARCH_HOSTS=http://IP地址:9200</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-p</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">5601</span><span style="color:#032F62;">:5601</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-d</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kibana:7.6.2</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 查看kibana启动日志</span></span>
<span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">logs</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kibana</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 3、进入kibana容器修改相应内容</span></span>
<span class="line"><span style="color:#6A737D;"># 修改docker内kibana的配置文件 kibana/config/kibana.yml</span></span>
<span class="line"><span style="color:#6F42C1;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">exec</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-it</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kibana</span><span style="color:#24292E;"> </span><span style="color:#032F62;">bash</span></span>
<span class="line"><span style="color:#005CC5;">cd</span><span style="color:#24292E;"> </span><span style="color:#032F62;">config</span></span>
<span class="line"><span style="color:#6F42C1;">cp</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kibana.yml</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kibana.yml.bak</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">vi</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kibana.yml</span></span>
<span class="line"><span style="color:#6F42C1;">server.port:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">5601</span></span>
<span class="line"><span style="color:#6F42C1;">server.host:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0.0</span><span style="color:#032F62;">.0.0</span></span>
<span class="line"><span style="color:#6F42C1;">elasticsearch.hosts:</span><span style="color:#24292E;"> [ </span><span style="color:#032F62;">&quot;http://公网IP地址:9200&quot;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">]</span></span>
<span class="line"><span style="color:#6F42C1;">i18n.locale:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Zh-CN&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 4、重启kibana</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 5、访问页面</span></span>
<span class="line"><span style="color:#6A737D;"># http://IP地址:5601/app/kibana</span></span></code></pre></div><br><h2 id="操作" tabindex="-1">操作 <a class="header-anchor" href="#操作" aria-label="Permalink to &quot;操作&quot;">​</a></h2><h3 id="节点操作" tabindex="-1">节点操作 <a class="header-anchor" href="#节点操作" aria-label="Permalink to &quot;节点操作&quot;">​</a></h3><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;"># 查看 _cat 能进行的操作</span></span>
<span class="line"><span style="color:#E1E4E8;">GET _cat</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"># 查看所有节点</span></span>
<span class="line"><span style="color:#E1E4E8;">GET _cat/nodes</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"># 查看健康状态</span></span>
<span class="line"><span style="color:#E1E4E8;">GET _cat/health</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"># 查看所有索引</span></span>
<span class="line"><span style="color:#E1E4E8;">GET _cat/indices</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"># 查看所有索引信息</span></span>
<span class="line"><span style="color:#E1E4E8;">GET /_all</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;"># 查看 _cat 能进行的操作</span></span>
<span class="line"><span style="color:#24292E;">GET _cat</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"># 查看所有节点</span></span>
<span class="line"><span style="color:#24292E;">GET _cat/nodes</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"># 查看健康状态</span></span>
<span class="line"><span style="color:#24292E;">GET _cat/health</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"># 查看所有索引</span></span>
<span class="line"><span style="color:#24292E;">GET _cat/indices</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"># 查看所有索引信息</span></span>
<span class="line"><span style="color:#24292E;">GET /_all</span></span></code></pre></div><h3 id="索引操作" tabindex="-1">索引操作 <a class="header-anchor" href="#索引操作" aria-label="Permalink to &quot;索引操作&quot;">​</a></h3><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;"># 创建 customer 的索引</span></span>
<span class="line"><span style="color:#E1E4E8;"># pretty 要求返回漂亮的 json 结果</span></span>
<span class="line"><span style="color:#E1E4E8;">PUT /customer?pretty</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"># update</span></span>
<span class="line"><span style="color:#E1E4E8;">POST</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"># delete</span></span>
<span class="line"><span style="color:#E1E4E8;">DELETE</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"># 判断索引是否存在</span></span>
<span class="line"><span style="color:#E1E4E8;">HEAD /indexName</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;"># 创建 customer 的索引</span></span>
<span class="line"><span style="color:#24292E;"># pretty 要求返回漂亮的 json 结果</span></span>
<span class="line"><span style="color:#24292E;">PUT /customer?pretty</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"># update</span></span>
<span class="line"><span style="color:#24292E;">POST</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"># delete</span></span>
<span class="line"><span style="color:#24292E;">DELETE</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"># 判断索引是否存在</span></span>
<span class="line"><span style="color:#24292E;">HEAD /indexName</span></span></code></pre></div><br><h3 id="文档操作" tabindex="-1">文档操作 <a class="header-anchor" href="#文档操作" aria-label="Permalink to &quot;文档操作&quot;">​</a></h3><blockquote><p>在 Elasticsearch 中，<code>_create</code> 和 <code>_doc</code> 是两种不同的文档创建方式，其区别如下：</p><ul><li><p><code>_create</code> 创建文档时，如果已经存在具有相同 ID 的文档，则会抛出异常，因此 <code>_create</code> 操作会要求文档必须不存在才能执行，否则会失败。而 <code>_doc</code> 则是直接创建文档，如果已经存在具有相同 ID 的文档，则会覆盖原有文档</p></li><li><p><code>_create</code> 创建文档时，如果不存在对应的索引，则会自动创建索引，而 <code>_doc</code> 则不会自动创建索引，需要在创建文档之前先创建好对应的索引</p></li></ul><p>一般来说，<code>_create</code> 和 <code>_doc</code> 操作适用于不同的场景。<code>_create</code> 更适用于幂等操作，保证一个 ID 只会创建一次，常用于索引建立时的初始化工作。<code>_doc</code> 则更适用于实际业务场景，常用于文档的新增、修改等操作。</p></blockquote><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;"># 创建文档</span></span>
<span class="line"><span style="color:#E1E4E8;">POST /phone/_doc</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;brand&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;xiaomi&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;title&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;xiaomi Mi6&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;price&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1999.00</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"># 创建指定 Id 文档</span></span>
<span class="line"><span style="color:#E1E4E8;">POST /phone/_doc/</span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;brand&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;xiaomi&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;title&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;xiaomi Mi6&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;price&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1999.00</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"># 查找指定 id 文档</span></span>
<span class="line"><span style="color:#E1E4E8;">GET phone/_doc/</span><span style="color:#79B8FF;">1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"># 查找指定 index 下的所有数据</span></span>
<span class="line"><span style="color:#E1E4E8;">GET phone/_search</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"># 局部更新</span></span>
<span class="line"><span style="color:#E1E4E8;"># 会覆盖原有的数据，新的数据结构无 price 字段，覆盖更新后 price 字段的数据将会被丢弃 </span></span>
<span class="line"><span style="color:#E1E4E8;">POST /phone/_update/</span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;doc&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;brand&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;XiaoMi&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;title&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;XiaoMi Mi6&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"># 删除</span></span>
<span class="line"><span style="color:#E1E4E8;">DELETE phone/_doc/</span><span style="color:#79B8FF;">1</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;"># 创建文档</span></span>
<span class="line"><span style="color:#24292E;">POST /phone/_doc</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;brand&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;xiaomi&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;title&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;xiaomi Mi6&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;price&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1999.00</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"># 创建指定 Id 文档</span></span>
<span class="line"><span style="color:#24292E;">POST /phone/_doc/</span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;brand&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;xiaomi&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;title&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;xiaomi Mi6&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;price&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1999.00</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"># 查找指定 id 文档</span></span>
<span class="line"><span style="color:#24292E;">GET phone/_doc/</span><span style="color:#005CC5;">1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"># 查找指定 index 下的所有数据</span></span>
<span class="line"><span style="color:#24292E;">GET phone/_search</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"># 局部更新</span></span>
<span class="line"><span style="color:#24292E;"># 会覆盖原有的数据，新的数据结构无 price 字段，覆盖更新后 price 字段的数据将会被丢弃 </span></span>
<span class="line"><span style="color:#24292E;">POST /phone/_update/</span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;doc&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;brand&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;XiaoMi&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;title&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;XiaoMi Mi6&quot;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"># 删除</span></span>
<span class="line"><span style="color:#24292E;">DELETE phone/_doc/</span><span style="color:#005CC5;">1</span></span></code></pre></div><br><h3 id="查询操作" tabindex="-1">查询操作 <a class="header-anchor" href="#查询操作" aria-label="Permalink to &quot;查询操作&quot;">​</a></h3><h4 id="条件查询" tabindex="-1">条件查询 <a class="header-anchor" href="#条件查询" aria-label="Permalink to &quot;条件查询&quot;">​</a></h4><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;"># URL 带参查询</span></span>
<span class="line"><span style="color:#E1E4E8;">GET phone/_search?q=brand:小米</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"># 请求体带参查询</span></span>
<span class="line"><span style="color:#E1E4E8;">GET phone/_search</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;query&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;match&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">&quot;category&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;小米&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"># 请求体带参查询所有</span></span>
<span class="line"><span style="color:#E1E4E8;">GET phone/_search</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;query&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;match_all&quot;</span><span style="color:#E1E4E8;">: {}</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"># 查询指定字段</span></span>
<span class="line"><span style="color:#E1E4E8;">GET phone/_search</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">&quot;query&quot;</span><span style="color:#E1E4E8;">:{</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#79B8FF;">&quot;match_all&quot;</span><span style="color:#E1E4E8;">:{}</span></span>
<span class="line"><span style="color:#E1E4E8;">	},</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">&quot;_source&quot;</span><span style="color:#E1E4E8;">:[</span><span style="color:#9ECBFF;">&quot;title&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;"># URL 带参查询</span></span>
<span class="line"><span style="color:#24292E;">GET phone/_search?q=brand:小米</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"># 请求体带参查询</span></span>
<span class="line"><span style="color:#24292E;">GET phone/_search</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;query&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;match&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">&quot;category&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;小米&quot;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"># 请求体带参查询所有</span></span>
<span class="line"><span style="color:#24292E;">GET phone/_search</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;query&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;match_all&quot;</span><span style="color:#24292E;">: {}</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"># 查询指定字段</span></span>
<span class="line"><span style="color:#24292E;">GET phone/_search</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">&quot;query&quot;</span><span style="color:#24292E;">:{</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#005CC5;">&quot;match_all&quot;</span><span style="color:#24292E;">:{}</span></span>
<span class="line"><span style="color:#24292E;">	},</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">&quot;_source&quot;</span><span style="color:#24292E;">:[</span><span style="color:#032F62;">&quot;title&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h4 id="分页查询" tabindex="-1">分页查询 <a class="header-anchor" href="#分页查询" aria-label="Permalink to &quot;分页查询&quot;">​</a></h4><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">GET phone/_search</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">&quot;query&quot;</span><span style="color:#E1E4E8;">:{</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#79B8FF;">&quot;match_all&quot;</span><span style="color:#E1E4E8;">:{}</span></span>
<span class="line"><span style="color:#E1E4E8;">	},</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">&quot;from&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">&quot;size&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">2</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">GET phone/_search</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">&quot;query&quot;</span><span style="color:#24292E;">:{</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#005CC5;">&quot;match_all&quot;</span><span style="color:#24292E;">:{}</span></span>
<span class="line"><span style="color:#24292E;">	},</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">&quot;from&quot;</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">&quot;size&quot;</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">2</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h4 id="排序查询" tabindex="-1">排序查询 <a class="header-anchor" href="#排序查询" aria-label="Permalink to &quot;排序查询&quot;">​</a></h4><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">GET phone/_search</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">&quot;query&quot;</span><span style="color:#E1E4E8;">:{</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#79B8FF;">&quot;match_all&quot;</span><span style="color:#E1E4E8;">:{}</span></span>
<span class="line"><span style="color:#E1E4E8;">	},</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">&quot;sort&quot;</span><span style="color:#E1E4E8;">:{</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#79B8FF;">&quot;price&quot;</span><span style="color:#E1E4E8;">:{ </span><span style="color:#FDAEB7;font-style:italic;">#</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">根据price字段排序</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#79B8FF;">&quot;order&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;desc&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">GET phone/_search</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">&quot;query&quot;</span><span style="color:#24292E;">:{</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#005CC5;">&quot;match_all&quot;</span><span style="color:#24292E;">:{}</span></span>
<span class="line"><span style="color:#24292E;">	},</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">&quot;sort&quot;</span><span style="color:#24292E;">:{</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#005CC5;">&quot;price&quot;</span><span style="color:#24292E;">:{ </span><span style="color:#B31D28;font-style:italic;">#</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">根据price字段排序</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#005CC5;">&quot;order&quot;</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;desc&quot;</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h4 id="多条件-范围查询" tabindex="-1">多条件/范围查询 <a class="header-anchor" href="#多条件-范围查询" aria-label="Permalink to &quot;多条件/范围查询&quot;">​</a></h4><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">GET phone/_search</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">&quot;query&quot;</span><span style="color:#E1E4E8;">:{</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#79B8FF;">&quot;bool&quot;</span><span style="color:#E1E4E8;">:{</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#79B8FF;">&quot;must&quot;</span><span style="color:#E1E4E8;">:[{ </span><span style="color:#FDAEB7;font-style:italic;">#</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">must</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">相当于</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">&amp;&amp;</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#79B8FF;">&quot;match&quot;</span><span style="color:#E1E4E8;">:{</span></span>
<span class="line"><span style="color:#E1E4E8;">					</span><span style="color:#79B8FF;">&quot;category&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;小米&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">				}</span></span>
<span class="line"><span style="color:#E1E4E8;">			},</span></span>
<span class="line"><span style="color:#E1E4E8;">			{</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#79B8FF;">&quot;match&quot;</span><span style="color:#E1E4E8;">:{</span></span>
<span class="line"><span style="color:#E1E4E8;">					</span><span style="color:#79B8FF;">&quot;price&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">3999.00</span></span>
<span class="line"><span style="color:#E1E4E8;">				}</span></span>
<span class="line"><span style="color:#E1E4E8;">			}]</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">GET phone/_search</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">&quot;query&quot;</span><span style="color:#E1E4E8;">:{</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#79B8FF;">&quot;bool&quot;</span><span style="color:#E1E4E8;">:{</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#79B8FF;">&quot;should&quot;</span><span style="color:#E1E4E8;">:[{ </span><span style="color:#FDAEB7;font-style:italic;">#</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">should</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">相当于</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">||</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#79B8FF;">&quot;match&quot;</span><span style="color:#E1E4E8;">:{</span></span>
<span class="line"><span style="color:#E1E4E8;">					</span><span style="color:#79B8FF;">&quot;category&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;小米&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">				}</span></span>
<span class="line"><span style="color:#E1E4E8;">			},{</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#79B8FF;">&quot;match&quot;</span><span style="color:#E1E4E8;">:{</span></span>
<span class="line"><span style="color:#E1E4E8;">					</span><span style="color:#79B8FF;">&quot;category&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;华为&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">				}</span></span>
<span class="line"><span style="color:#E1E4E8;">			}]</span></span>
<span class="line"><span style="color:#E1E4E8;">		},</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;filter&quot;</span><span style="color:#E1E4E8;">:{</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">&quot;range&quot;</span><span style="color:#E1E4E8;">:{ </span><span style="color:#FDAEB7;font-style:italic;">#</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">range</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">范围查询</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#79B8FF;">&quot;price&quot;</span><span style="color:#E1E4E8;">:{</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#79B8FF;">&quot;gt&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">2000</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">#</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">greater</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">than</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">GET phone/_search</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">&quot;query&quot;</span><span style="color:#24292E;">:{</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#005CC5;">&quot;bool&quot;</span><span style="color:#24292E;">:{</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#005CC5;">&quot;must&quot;</span><span style="color:#24292E;">:[{ </span><span style="color:#B31D28;font-style:italic;">#</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">must</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">相当于</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">&amp;&amp;</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#005CC5;">&quot;match&quot;</span><span style="color:#24292E;">:{</span></span>
<span class="line"><span style="color:#24292E;">					</span><span style="color:#005CC5;">&quot;category&quot;</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;小米&quot;</span></span>
<span class="line"><span style="color:#24292E;">				}</span></span>
<span class="line"><span style="color:#24292E;">			},</span></span>
<span class="line"><span style="color:#24292E;">			{</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#005CC5;">&quot;match&quot;</span><span style="color:#24292E;">:{</span></span>
<span class="line"><span style="color:#24292E;">					</span><span style="color:#005CC5;">&quot;price&quot;</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">3999.00</span></span>
<span class="line"><span style="color:#24292E;">				}</span></span>
<span class="line"><span style="color:#24292E;">			}]</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">GET phone/_search</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">&quot;query&quot;</span><span style="color:#24292E;">:{</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#005CC5;">&quot;bool&quot;</span><span style="color:#24292E;">:{</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#005CC5;">&quot;should&quot;</span><span style="color:#24292E;">:[{ </span><span style="color:#B31D28;font-style:italic;">#</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">should</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">相当于</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">||</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#005CC5;">&quot;match&quot;</span><span style="color:#24292E;">:{</span></span>
<span class="line"><span style="color:#24292E;">					</span><span style="color:#005CC5;">&quot;category&quot;</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;小米&quot;</span></span>
<span class="line"><span style="color:#24292E;">				}</span></span>
<span class="line"><span style="color:#24292E;">			},{</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#005CC5;">&quot;match&quot;</span><span style="color:#24292E;">:{</span></span>
<span class="line"><span style="color:#24292E;">					</span><span style="color:#005CC5;">&quot;category&quot;</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;华为&quot;</span></span>
<span class="line"><span style="color:#24292E;">				}</span></span>
<span class="line"><span style="color:#24292E;">			}]</span></span>
<span class="line"><span style="color:#24292E;">		},</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;filter&quot;</span><span style="color:#24292E;">:{</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#005CC5;">&quot;range&quot;</span><span style="color:#24292E;">:{ </span><span style="color:#B31D28;font-style:italic;">#</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">range</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">范围查询</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#005CC5;">&quot;price&quot;</span><span style="color:#24292E;">:{</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#005CC5;">&quot;gt&quot;</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">2000</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">#</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">greater</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">than</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h4 id="完全匹配" tabindex="-1">完全匹配 <a class="header-anchor" href="#完全匹配" aria-label="Permalink to &quot;完全匹配&quot;">​</a></h4><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">GET phone/_search</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">&quot;query&quot;</span><span style="color:#E1E4E8;">:{</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#79B8FF;">&quot;match_phrase&quot;</span><span style="color:#E1E4E8;">:{</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#79B8FF;">&quot;category&quot;</span><span style="color:#E1E4E8;"> : </span><span style="color:#9ECBFF;">&quot;小&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">GET phone/_search</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">&quot;query&quot;</span><span style="color:#24292E;">:{</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#005CC5;">&quot;match_phrase&quot;</span><span style="color:#24292E;">:{</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#005CC5;">&quot;category&quot;</span><span style="color:#24292E;"> : </span><span style="color:#032F62;">&quot;小&quot;</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h4 id="高亮查询" tabindex="-1">高亮查询 <a class="header-anchor" href="#高亮查询" aria-label="Permalink to &quot;高亮查询&quot;">​</a></h4><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">GET phone/_search</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">&quot;query&quot;</span><span style="color:#E1E4E8;">:{</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#79B8FF;">&quot;match_phrase&quot;</span><span style="color:#E1E4E8;">:{</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#79B8FF;">&quot;category&quot;</span><span style="color:#E1E4E8;"> : </span><span style="color:#9ECBFF;">&quot;小&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"><span style="color:#E1E4E8;">	},</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;highlight&quot;</span><span style="color:#E1E4E8;">:{</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;fields&quot;</span><span style="color:#E1E4E8;">:{</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">&quot;category&quot;</span><span style="color:#E1E4E8;">:{}</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">GET phone/_search</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">&quot;query&quot;</span><span style="color:#24292E;">:{</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#005CC5;">&quot;match_phrase&quot;</span><span style="color:#24292E;">:{</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#005CC5;">&quot;category&quot;</span><span style="color:#24292E;"> : </span><span style="color:#032F62;">&quot;小&quot;</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"><span style="color:#24292E;">	},</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;highlight&quot;</span><span style="color:#24292E;">:{</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;fields&quot;</span><span style="color:#24292E;">:{</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#005CC5;">&quot;category&quot;</span><span style="color:#24292E;">:{}</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h4 id="聚合查询" tabindex="-1">聚合查询 <a class="header-anchor" href="#聚合查询" aria-label="Permalink to &quot;聚合查询&quot;">​</a></h4><blockquote><p>对 ES 文档进行统计分析，类似与关系型数据库中的 <code>group by</code>，还有例如取最大值 max、平均值 avg 等聚合</p></blockquote><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;"># 以 price 聚合查询，查询结果附带原始数据</span></span>
<span class="line"><span style="color:#E1E4E8;">GET phone/_search</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">&quot;aggs&quot;</span><span style="color:#E1E4E8;">:{</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#79B8FF;">&quot;price_group&quot;</span><span style="color:#E1E4E8;">:{</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#79B8FF;">&quot;terms&quot;</span><span style="color:#E1E4E8;">:{</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#79B8FF;">&quot;field&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;price&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">			}</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"># 不附带原始数据</span></span>
<span class="line"><span style="color:#E1E4E8;">GET phone/_search</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">&quot;aggs&quot;</span><span style="color:#E1E4E8;">:{</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#79B8FF;">&quot;price_group&quot;</span><span style="color:#E1E4E8;">:{</span></span>
<span class="line"><span style="color:#E1E4E8;">			</span><span style="color:#79B8FF;">&quot;terms&quot;</span><span style="color:#E1E4E8;">:{</span></span>
<span class="line"><span style="color:#E1E4E8;">				</span><span style="color:#79B8FF;">&quot;field&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#9ECBFF;">&quot;price&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">			}</span></span>
<span class="line"><span style="color:#E1E4E8;">		}</span></span>
<span class="line"><span style="color:#E1E4E8;">	},</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">&quot;size&quot;</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;"># 以 price 聚合查询，查询结果附带原始数据</span></span>
<span class="line"><span style="color:#24292E;">GET phone/_search</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">&quot;aggs&quot;</span><span style="color:#24292E;">:{</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#005CC5;">&quot;price_group&quot;</span><span style="color:#24292E;">:{</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#005CC5;">&quot;terms&quot;</span><span style="color:#24292E;">:{</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#005CC5;">&quot;field&quot;</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;price&quot;</span></span>
<span class="line"><span style="color:#24292E;">			}</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"># 不附带原始数据</span></span>
<span class="line"><span style="color:#24292E;">GET phone/_search</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#005CC5;">&quot;aggs&quot;</span><span style="color:#24292E;">:{</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#005CC5;">&quot;price_group&quot;</span><span style="color:#24292E;">:{</span></span>
<span class="line"><span style="color:#24292E;">			</span><span style="color:#005CC5;">&quot;terms&quot;</span><span style="color:#24292E;">:{</span></span>
<span class="line"><span style="color:#24292E;">				</span><span style="color:#005CC5;">&quot;field&quot;</span><span style="color:#24292E;">:</span><span style="color:#032F62;">&quot;price&quot;</span></span>
<span class="line"><span style="color:#24292E;">			}</span></span>
<span class="line"><span style="color:#24292E;">		}</span></span>
<span class="line"><span style="color:#24292E;">	},</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;size&quot;</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><br><h3 id="映射关系" tabindex="-1">映射关系 <a class="header-anchor" href="#映射关系" aria-label="Permalink to &quot;映射关系&quot;">​</a></h3><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;"># 创建索引</span></span>
<span class="line"><span style="color:#E1E4E8;">PUT /user</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"># 创建映射</span></span>
<span class="line"><span style="color:#E1E4E8;">PUT /user/_mapping</span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;properties&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">&quot;name&quot;</span><span style="color:#E1E4E8;">:{</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;type&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;text&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#FDAEB7;font-style:italic;">#</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">可进行模糊查询</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;index&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">&quot;gender&quot;</span><span style="color:#E1E4E8;">:{</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;type&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;keyword&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#FDAEB7;font-style:italic;">#</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">必须全文匹配才有结果</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;index&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">&quot;tel&quot;</span><span style="color:#E1E4E8;">:{</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;type&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;keyword&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">&quot;index&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">#</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">当前字段不作为索引使用</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"># 查询映射</span></span>
<span class="line"><span style="color:#E1E4E8;">GET user/_mapping</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;"># 创建索引</span></span>
<span class="line"><span style="color:#24292E;">PUT /user</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"># 创建映射</span></span>
<span class="line"><span style="color:#24292E;">PUT /user/_mapping</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;properties&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">&quot;name&quot;</span><span style="color:#24292E;">:{</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;type&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;text&quot;</span><span style="color:#24292E;">, </span><span style="color:#B31D28;font-style:italic;">#</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">可进行模糊查询</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;index&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">&quot;gender&quot;</span><span style="color:#24292E;">:{</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;type&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;keyword&quot;</span><span style="color:#24292E;">, </span><span style="color:#B31D28;font-style:italic;">#</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">必须全文匹配才有结果</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;index&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">&quot;tel&quot;</span><span style="color:#24292E;">:{</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;type&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;keyword&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">&quot;index&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">false</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">#</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">当前字段不作为索引使用</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"># 查询映射</span></span>
<span class="line"><span style="color:#24292E;">GET user/_mapping</span></span></code></pre></div><br><h2 id="集群-1" tabindex="-1">集群 <a class="header-anchor" href="#集群-1" aria-label="Permalink to &quot;集群&quot;">​</a></h2><blockquote><p>单台 Elasticsearch 服务器提供服务，往往都有最大的负载能力，超过这个阈值，服务器性能就会大大降低甚至不可用。单点服务器存在以下问题</p><ul><li>单台机器存储容量有限</li><li>单服务器容易出现单点故障，无法实现高可用</li><li>单服务的并发处理能力有限</li></ul></blockquote><blockquote><p>一个 Elasticsearch 集群有一个唯一的名字标识，集群默认名称为 elasticsearch。一个节点只能通过指定某个集群的名字，来加入集群</p></blockquote><br><h2 id="java-api" tabindex="-1">Java API <a class="header-anchor" href="#java-api" aria-label="Permalink to &quot;Java API&quot;">​</a></h2><p><strong>依赖</strong></p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">dependencies</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;org.elasticsearch&lt;/</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;elasticsearch&lt;/</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt;7.6.2&lt;/</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">&lt;!-- elasticsearch 的客户端 --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;org.elasticsearch.client&lt;/</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;elasticsearch-rest-high-level-client&lt;/</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt;7.6.2&lt;/</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">&lt;!-- elasticsearch 依赖 2.x 的 log4j --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;org.apache.logging.log4j&lt;/</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;log4j-api&lt;/</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt;2.8.2&lt;/</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;org.apache.logging.log4j&lt;/</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;log4j-core&lt;/</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt;2.8.2&lt;/</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;com.fasterxml.jackson.core&lt;/</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;jackson-databind&lt;/</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt;2.9.9&lt;/</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">&lt;!-- junit 单元测试 --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;junit&lt;/</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;junit&lt;/</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt;4.13&lt;/</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">dependencies</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">dependencies</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;org.elasticsearch&lt;/</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;elasticsearch&lt;/</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt;7.6.2&lt;/</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">&lt;!-- elasticsearch 的客户端 --&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;org.elasticsearch.client&lt;/</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;elasticsearch-rest-high-level-client&lt;/</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt;7.6.2&lt;/</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">&lt;!-- elasticsearch 依赖 2.x 的 log4j --&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;org.apache.logging.log4j&lt;/</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;log4j-api&lt;/</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt;2.8.2&lt;/</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;org.apache.logging.log4j&lt;/</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;log4j-core&lt;/</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt;2.8.2&lt;/</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;com.fasterxml.jackson.core&lt;/</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;jackson-databind&lt;/</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt;2.9.9&lt;/</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">&lt;!-- junit 单元测试 --&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;junit&lt;/</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;junit&lt;/</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt;4.13&lt;/</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">dependencies</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p><strong>代码</strong></p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ESIndexTest</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> RestHighLevelClient restHighLevelClient </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 建立连接</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Before</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">init</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 创建客户端对象</span></span>
<span class="line"><span style="color:#E1E4E8;">        restHighLevelClient </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">RestHighLevelClient</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">                RestClient.</span><span style="color:#B392F0;">builder</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">HttpHost</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;localhost&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">9200</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;http&quot;</span><span style="color:#E1E4E8;">))</span></span>
<span class="line"><span style="color:#E1E4E8;">        );</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 创建索引</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Test</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">addIndexTest</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> IOException {</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#6A737D;">// 创建索引</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#6A737D;">// CreateIndexRequest createIndexRequest = new CreateIndexRequest(&quot;user&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#6A737D;">// 发送请求，获取响应</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#6A737D;">// CreateIndexResponse response = restHighLevelClient.indices().create(createIndexRequest, RequestOptions.DEFAULT);</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#6A737D;">// boolean acknowledged = response.isAcknowledged();</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#6A737D;">// Assert.assertTrue(acknowledged);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 查询索引</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// GetIndexRequest getIndexRequest = new GetIndexRequest(&quot;user&quot;, &quot;phone&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// GetIndexResponse response = restHighLevelClient.indices().get(getIndexRequest, RequestOptions.DEFAULT);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 删除索引</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// DeleteIndexRequest deleteIndexRequest = new DeleteIndexRequest(&quot;user&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// restHighLevelClient.indices().delete(deleteIndexRequest, RequestOptions.DEFAULT);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        restHighLevelClient.</span><span style="color:#B392F0;">close</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ESIndexTest</span><span style="color:#24292E;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> RestHighLevelClient restHighLevelClient </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 建立连接</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Before</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">init</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 创建客户端对象</span></span>
<span class="line"><span style="color:#24292E;">        restHighLevelClient </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">RestHighLevelClient</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">                RestClient.</span><span style="color:#6F42C1;">builder</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">HttpHost</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;localhost&quot;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">9200</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;http&quot;</span><span style="color:#24292E;">))</span></span>
<span class="line"><span style="color:#24292E;">        );</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 创建索引</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Test</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">addIndexTest</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> IOException {</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6A737D;">// 创建索引</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6A737D;">// CreateIndexRequest createIndexRequest = new CreateIndexRequest(&quot;user&quot;);</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6A737D;">// 发送请求，获取响应</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6A737D;">// CreateIndexResponse response = restHighLevelClient.indices().create(createIndexRequest, RequestOptions.DEFAULT);</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6A737D;">// boolean acknowledged = response.isAcknowledged();</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6A737D;">// Assert.assertTrue(acknowledged);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 查询索引</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// GetIndexRequest getIndexRequest = new GetIndexRequest(&quot;user&quot;, &quot;phone&quot;);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// GetIndexResponse response = restHighLevelClient.indices().get(getIndexRequest, RequestOptions.DEFAULT);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 删除索引</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// DeleteIndexRequest deleteIndexRequest = new DeleteIndexRequest(&quot;user&quot;);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// restHighLevelClient.indices().delete(deleteIndexRequest, RequestOptions.DEFAULT);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        restHighLevelClient.</span><span style="color:#6F42C1;">close</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">DocTest</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 文档 crud 操作</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Test</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">documentTest</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> IOException {</span></span>
<span class="line"><span style="color:#E1E4E8;">        ElasticsearchConnector.</span><span style="color:#B392F0;">connect</span><span style="color:#E1E4E8;">(client </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            IndexRequest indexRequest </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">IndexRequest</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 设置索引及唯一性标识</span></span>
<span class="line"><span style="color:#E1E4E8;">            indexRequest.</span><span style="color:#B392F0;">index</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;user&quot;</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">id</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;1001&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">            User user </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> User.</span><span style="color:#B392F0;">builder</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">name</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;zhangsan&quot;</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">gender</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;male&quot;</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">age</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">20</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">build</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">            ObjectMapper objectMapper </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ObjectMapper</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">            String userStr </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> objectMapper.</span><span style="color:#B392F0;">writeValueAsString</span><span style="color:#E1E4E8;">(user);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 添加文档数据，数据格式为 JSON 格式</span></span>
<span class="line"><span style="color:#E1E4E8;">            indexRequest.</span><span style="color:#B392F0;">source</span><span style="color:#E1E4E8;">(userStr, XContentType.JSON);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 新增</span></span>
<span class="line"><span style="color:#E1E4E8;">            IndexResponse response </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> client.</span><span style="color:#B392F0;">index</span><span style="color:#E1E4E8;">(indexRequest, RequestOptions.DEFAULT);</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 修改</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// client.update(indexRequest, RequestOptions.DEFAULT);</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 查询</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// client.get(indexRequest, RequestOptions.DEFAULT);</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 删除</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// client.delete(indexRequest, RequestOptions.DEFAULT);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(response.</span><span style="color:#B392F0;">getIndex</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(response.</span><span style="color:#B392F0;">getId</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(response.</span><span style="color:#B392F0;">getResult</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 批量操作</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Test</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">bulkTest</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> IOException {</span></span>
<span class="line"><span style="color:#E1E4E8;">        ElasticsearchConnector.</span><span style="color:#B392F0;">connect</span><span style="color:#E1E4E8;">(client </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            BulkRequest bulkRequest </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">BulkRequest</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 批量新增</span></span>
<span class="line"><span style="color:#E1E4E8;">            bulkRequest</span></span>
<span class="line"><span style="color:#E1E4E8;">                    .</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">IndexRequest</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">index</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;user&quot;</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">id</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;1002&quot;</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">source</span><span style="color:#E1E4E8;">(XContentType.JSON, </span><span style="color:#9ECBFF;">&quot;name&quot;</span><span style="color:#E1E4E8;">,</span><span style="color:#9ECBFF;">&quot;lisi&quot;</span><span style="color:#E1E4E8;">))</span></span>
<span class="line"><span style="color:#E1E4E8;">                    .</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">IndexRequest</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">index</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;user&quot;</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">id</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;1003&quot;</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">source</span><span style="color:#E1E4E8;">(XContentType.JSON, </span><span style="color:#9ECBFF;">&quot;name&quot;</span><span style="color:#E1E4E8;">,</span><span style="color:#9ECBFF;">&quot;wangwu&quot;</span><span style="color:#E1E4E8;">))</span></span>
<span class="line"><span style="color:#E1E4E8;">                    .</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">IndexRequest</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">index</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;user&quot;</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">id</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;1003&quot;</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">source</span><span style="color:#E1E4E8;">(XContentType.JSON, </span><span style="color:#9ECBFF;">&quot;name&quot;</span><span style="color:#E1E4E8;">,</span><span style="color:#9ECBFF;">&quot;zhaoliu&quot;</span><span style="color:#E1E4E8;">));</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">            BulkResponse response </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> client.</span><span style="color:#B392F0;">bulk</span><span style="color:#E1E4E8;">(bulkRequest, RequestOptions.DEFAULT);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 批量删除</span></span>
<span class="line"><span style="color:#6A737D;">//            bulkRequest</span></span>
<span class="line"><span style="color:#6A737D;">//                    .add(new DeleteRequest().index(&quot;user&quot;).id(&quot;1001&quot;))</span></span>
<span class="line"><span style="color:#6A737D;">//                    .add(new DeleteRequest().index(&quot;user&quot;).id(&quot;1002&quot;));</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(response.</span><span style="color:#B392F0;">getTook</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(response.</span><span style="color:#B392F0;">getItems</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 查询索引下的所有数据</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Test</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">queryIndexAllTest</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> IOException {</span></span>
<span class="line"><span style="color:#E1E4E8;">        ElasticsearchConnector.</span><span style="color:#B392F0;">connect</span><span style="color:#E1E4E8;">(client </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">            SearchRequest request </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">SearchRequest</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">            request.</span><span style="color:#B392F0;">indices</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;user&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 构建查询的请求体</span></span>
<span class="line"><span style="color:#E1E4E8;">            SearchSourceBuilder sourceBuilder </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">SearchSourceBuilder</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 查询所有数据</span></span>
<span class="line"><span style="color:#E1E4E8;">            sourceBuilder.</span><span style="color:#B392F0;">query</span><span style="color:#E1E4E8;">(QueryBuilders.</span><span style="color:#B392F0;">matchAllQuery</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">            request.</span><span style="color:#B392F0;">source</span><span style="color:#E1E4E8;">(sourceBuilder);</span></span>
<span class="line"><span style="color:#E1E4E8;">            SearchResponse response </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> client.</span><span style="color:#B392F0;">search</span><span style="color:#E1E4E8;">(request, RequestOptions.DEFAULT);</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 查询匹配</span></span>
<span class="line"><span style="color:#E1E4E8;">            SearchHits hits </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> response.</span><span style="color:#B392F0;">getHits</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;took:&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> response.</span><span style="color:#B392F0;">getTook</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;timeout:&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> response.</span><span style="color:#B392F0;">isTimedOut</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;total:&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> hits.</span><span style="color:#B392F0;">getTotalHits</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;MaxScore:&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> hits.</span><span style="color:#B392F0;">getMaxScore</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;hits========&gt;&gt;&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (SearchHit hit </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> hits) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#6A737D;">//输出每条查询的结果信息</span></span>
<span class="line"><span style="color:#E1E4E8;">                System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(hit.</span><span style="color:#B392F0;">getSourceAsString</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;&lt;&lt;========&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        });</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 条件查询</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Test</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">conditionQueryTest</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> IOException {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        ElasticsearchConnector.</span><span style="color:#B392F0;">connect</span><span style="color:#E1E4E8;">(client </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 创建搜索请求对象</span></span>
<span class="line"><span style="color:#E1E4E8;">            SearchRequest request </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">SearchRequest</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">            request.</span><span style="color:#B392F0;">indices</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;user&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 构建查询的请求体</span></span>
<span class="line"><span style="color:#E1E4E8;">            SearchSourceBuilder sourceBuilder </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">SearchSourceBuilder</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">            sourceBuilder.</span><span style="color:#B392F0;">query</span><span style="color:#E1E4E8;">(QueryBuilders.</span><span style="color:#B392F0;">termQuery</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;name&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;lisi&quot;</span><span style="color:#E1E4E8;">));</span></span>
<span class="line"><span style="color:#E1E4E8;">            request.</span><span style="color:#B392F0;">source</span><span style="color:#E1E4E8;">(sourceBuilder);</span></span>
<span class="line"><span style="color:#E1E4E8;">            SearchResponse response </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> client.</span><span style="color:#B392F0;">search</span><span style="color:#E1E4E8;">(request, RequestOptions.DEFAULT);</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 查询匹配</span></span>
<span class="line"><span style="color:#E1E4E8;">            SearchHits hits </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> response.</span><span style="color:#B392F0;">getHits</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;took:&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> response.</span><span style="color:#B392F0;">getTook</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;timeout:&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> response.</span><span style="color:#B392F0;">isTimedOut</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;total:&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> hits.</span><span style="color:#B392F0;">getTotalHits</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;MaxScore:&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> hits.</span><span style="color:#B392F0;">getMaxScore</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;hits========&gt;&gt;&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (SearchHit hit </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> hits) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#6A737D;">//输出每条查询的结果信息</span></span>
<span class="line"><span style="color:#E1E4E8;">                System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(hit.</span><span style="color:#B392F0;">getSourceAsString</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;&lt;&lt;========&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 分页查询</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Test</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">queryByPageTest</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> IOException {</span></span>
<span class="line"><span style="color:#E1E4E8;">        ElasticsearchConnector.</span><span style="color:#B392F0;">connect</span><span style="color:#E1E4E8;">(client </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 创建搜索请求对象</span></span>
<span class="line"><span style="color:#E1E4E8;">            SearchRequest request </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">SearchRequest</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">            request.</span><span style="color:#B392F0;">indices</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;user&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 构建查询的请求体</span></span>
<span class="line"><span style="color:#E1E4E8;">            SearchSourceBuilder sourceBuilder </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">SearchSourceBuilder</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">            sourceBuilder.</span><span style="color:#B392F0;">query</span><span style="color:#E1E4E8;">(QueryBuilders.</span><span style="color:#B392F0;">matchAllQuery</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 分页查询</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 当前页其实索引(第一条数据的顺序号)， from</span></span>
<span class="line"><span style="color:#E1E4E8;">            sourceBuilder.</span><span style="color:#B392F0;">from</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 每页显示多少条 size</span></span>
<span class="line"><span style="color:#E1E4E8;">            sourceBuilder.</span><span style="color:#B392F0;">size</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">            request.</span><span style="color:#B392F0;">source</span><span style="color:#E1E4E8;">(sourceBuilder);</span></span>
<span class="line"><span style="color:#E1E4E8;">            SearchResponse response </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> client.</span><span style="color:#B392F0;">search</span><span style="color:#E1E4E8;">(request, RequestOptions.DEFAULT);</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 查询匹配</span></span>
<span class="line"><span style="color:#E1E4E8;">            SearchHits hits </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> response.</span><span style="color:#B392F0;">getHits</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;took:&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> response.</span><span style="color:#B392F0;">getTook</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;timeout:&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> response.</span><span style="color:#B392F0;">isTimedOut</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;total:&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> hits.</span><span style="color:#B392F0;">getTotalHits</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;MaxScore:&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> hits.</span><span style="color:#B392F0;">getMaxScore</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;hits========&gt;&gt;&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (SearchHit hit </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> hits) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#6A737D;">//输出每条查询的结果信息</span></span>
<span class="line"><span style="color:#E1E4E8;">                System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(hit.</span><span style="color:#B392F0;">getSourceAsString</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;&lt;&lt;========&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        });</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 查询排序</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Test</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">queryByOrderTest</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> IOException {</span></span>
<span class="line"><span style="color:#E1E4E8;">        ElasticsearchConnector.</span><span style="color:#B392F0;">connect</span><span style="color:#E1E4E8;">(client </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 创建搜索请求对象</span></span>
<span class="line"><span style="color:#E1E4E8;">            SearchRequest request </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">SearchRequest</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">            request.</span><span style="color:#B392F0;">indices</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;user&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 构建查询的请求体</span></span>
<span class="line"><span style="color:#E1E4E8;">            SearchSourceBuilder sourceBuilder </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">SearchSourceBuilder</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">            sourceBuilder.</span><span style="color:#B392F0;">query</span><span style="color:#E1E4E8;">(QueryBuilders.</span><span style="color:#B392F0;">matchAllQuery</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 排序</span></span>
<span class="line"><span style="color:#E1E4E8;">            sourceBuilder.</span><span style="color:#B392F0;">sort</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;age&quot;</span><span style="color:#E1E4E8;">, SortOrder.ASC);</span></span>
<span class="line"><span style="color:#E1E4E8;">            request.</span><span style="color:#B392F0;">source</span><span style="color:#E1E4E8;">(sourceBuilder);</span></span>
<span class="line"><span style="color:#E1E4E8;">            SearchResponse response </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> client.</span><span style="color:#B392F0;">search</span><span style="color:#E1E4E8;">(request, RequestOptions.DEFAULT);</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 查询匹配</span></span>
<span class="line"><span style="color:#E1E4E8;">            SearchHits hits </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> response.</span><span style="color:#B392F0;">getHits</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;took:&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> response.</span><span style="color:#B392F0;">getTook</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;timeout:&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> response.</span><span style="color:#B392F0;">isTimedOut</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;total:&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> hits.</span><span style="color:#B392F0;">getTotalHits</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;MaxScore:&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> hits.</span><span style="color:#B392F0;">getMaxScore</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;hits========&gt;&gt;&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (SearchHit hit </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> hits) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#6A737D;">//输出每条查询的结果信息</span></span>
<span class="line"><span style="color:#E1E4E8;">                System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(hit.</span><span style="color:#B392F0;">getSourceAsString</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;&lt;&lt;========&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        });</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Test</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">combineQueryTest</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> IOException {</span></span>
<span class="line"><span style="color:#E1E4E8;">        ElasticsearchConnector.</span><span style="color:#B392F0;">connect</span><span style="color:#E1E4E8;">(client </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 创建搜索请求对象</span></span>
<span class="line"><span style="color:#E1E4E8;">            SearchRequest request </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">SearchRequest</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">            request.</span><span style="color:#B392F0;">indices</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;user&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 构建查询的请求体</span></span>
<span class="line"><span style="color:#E1E4E8;">            SearchSourceBuilder sourceBuilder </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">SearchSourceBuilder</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">            BoolQueryBuilder boolQueryBuilder </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> QueryBuilders.</span><span style="color:#B392F0;">boolQuery</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 必须包含</span></span>
<span class="line"><span style="color:#E1E4E8;">            boolQueryBuilder.</span><span style="color:#B392F0;">must</span><span style="color:#E1E4E8;">(QueryBuilders.</span><span style="color:#B392F0;">matchQuery</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;age&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;20&quot;</span><span style="color:#E1E4E8;">));</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 一定不含</span></span>
<span class="line"><span style="color:#E1E4E8;">            boolQueryBuilder.</span><span style="color:#B392F0;">mustNot</span><span style="color:#E1E4E8;">(QueryBuilders.</span><span style="color:#B392F0;">matchQuery</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;name&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;lisi&quot;</span><span style="color:#E1E4E8;">));</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 可能包含</span></span>
<span class="line"><span style="color:#E1E4E8;">            boolQueryBuilder.</span><span style="color:#B392F0;">should</span><span style="color:#E1E4E8;">(QueryBuilders.</span><span style="color:#B392F0;">matchQuery</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;sex&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;male&quot;</span><span style="color:#E1E4E8;">));</span></span>
<span class="line"><span style="color:#E1E4E8;">            sourceBuilder.</span><span style="color:#B392F0;">query</span><span style="color:#E1E4E8;">(boolQueryBuilder);</span></span>
<span class="line"><span style="color:#E1E4E8;">            request.</span><span style="color:#B392F0;">source</span><span style="color:#E1E4E8;">(sourceBuilder);</span></span>
<span class="line"><span style="color:#E1E4E8;">            SearchResponse response </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> client.</span><span style="color:#B392F0;">search</span><span style="color:#E1E4E8;">(request, RequestOptions.DEFAULT);</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 查询匹配</span></span>
<span class="line"><span style="color:#E1E4E8;">            SearchHits hits </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> response.</span><span style="color:#B392F0;">getHits</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;took:&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> response.</span><span style="color:#B392F0;">getTook</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;timeout:&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> response.</span><span style="color:#B392F0;">isTimedOut</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;total:&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> hits.</span><span style="color:#B392F0;">getTotalHits</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;MaxScore:&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> hits.</span><span style="color:#B392F0;">getMaxScore</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;hits========&gt;&gt;&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (SearchHit hit </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> hits) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#6A737D;">//输出每条查询的结果信息</span></span>
<span class="line"><span style="color:#E1E4E8;">                System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(hit.</span><span style="color:#B392F0;">getSourceAsString</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;&lt;&lt;========&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        });</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 范围查询</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Test</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">rangeQueryTest</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> IOException {</span></span>
<span class="line"><span style="color:#E1E4E8;">        ElasticsearchConnector.</span><span style="color:#B392F0;">connect</span><span style="color:#E1E4E8;">(client </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 创建搜索请求对象</span></span>
<span class="line"><span style="color:#E1E4E8;">            SearchRequest request </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">SearchRequest</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">            request.</span><span style="color:#B392F0;">indices</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;user&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 构建查询的请求体</span></span>
<span class="line"><span style="color:#E1E4E8;">            SearchSourceBuilder sourceBuilder </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">SearchSourceBuilder</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">            RangeQueryBuilder rangeQuery </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> QueryBuilders.</span><span style="color:#B392F0;">rangeQuery</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;age&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 大于等于</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">//rangeQuery.gte(&quot;30&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 小于等于</span></span>
<span class="line"><span style="color:#E1E4E8;">            rangeQuery.</span><span style="color:#B392F0;">lte</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;40&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">            sourceBuilder.</span><span style="color:#B392F0;">query</span><span style="color:#E1E4E8;">(rangeQuery);</span></span>
<span class="line"><span style="color:#E1E4E8;">            request.</span><span style="color:#B392F0;">source</span><span style="color:#E1E4E8;">(sourceBuilder);</span></span>
<span class="line"><span style="color:#E1E4E8;">            SearchResponse response </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> client.</span><span style="color:#B392F0;">search</span><span style="color:#E1E4E8;">(request, RequestOptions.DEFAULT);</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 查询匹配</span></span>
<span class="line"><span style="color:#E1E4E8;">            SearchHits hits </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> response.</span><span style="color:#B392F0;">getHits</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;took:&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> response.</span><span style="color:#B392F0;">getTook</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;timeout:&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> response.</span><span style="color:#B392F0;">isTimedOut</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;total:&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> hits.</span><span style="color:#B392F0;">getTotalHits</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;MaxScore:&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> hits.</span><span style="color:#B392F0;">getMaxScore</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;hits========&gt;&gt;&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (SearchHit hit </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> hits) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#6A737D;">//输出每条查询的结果信息</span></span>
<span class="line"><span style="color:#E1E4E8;">                System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(hit.</span><span style="color:#B392F0;">getSourceAsString</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;&lt;&lt;========&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        });</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 模糊查询</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Test</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">fuzzyQueryTest</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> IOException {</span></span>
<span class="line"><span style="color:#E1E4E8;">        ElasticsearchConnector.</span><span style="color:#B392F0;">connect</span><span style="color:#E1E4E8;">(client </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 创建搜索请求对象</span></span>
<span class="line"><span style="color:#E1E4E8;">            SearchRequest request </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">SearchRequest</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">            request.</span><span style="color:#B392F0;">indices</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;user&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 构建查询的请求体</span></span>
<span class="line"><span style="color:#E1E4E8;">            SearchSourceBuilder sourceBuilder </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">SearchSourceBuilder</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">            sourceBuilder.</span><span style="color:#B392F0;">query</span><span style="color:#E1E4E8;">(QueryBuilders.</span><span style="color:#B392F0;">fuzzyQuery</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;name&quot;</span><span style="color:#E1E4E8;">,</span><span style="color:#9ECBFF;">&quot;lisi&quot;</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">fuzziness</span><span style="color:#E1E4E8;">(Fuzziness.ONE));</span></span>
<span class="line"><span style="color:#E1E4E8;">            request.</span><span style="color:#B392F0;">source</span><span style="color:#E1E4E8;">(sourceBuilder);</span></span>
<span class="line"><span style="color:#E1E4E8;">            SearchResponse response </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> client.</span><span style="color:#B392F0;">search</span><span style="color:#E1E4E8;">(request, RequestOptions.DEFAULT);</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 查询匹配</span></span>
<span class="line"><span style="color:#E1E4E8;">            SearchHits hits </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> response.</span><span style="color:#B392F0;">getHits</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;took:&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> response.</span><span style="color:#B392F0;">getTook</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;timeout:&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> response.</span><span style="color:#B392F0;">isTimedOut</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;total:&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> hits.</span><span style="color:#B392F0;">getTotalHits</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;MaxScore:&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> hits.</span><span style="color:#B392F0;">getMaxScore</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;hits========&gt;&gt;&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (SearchHit hit </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> hits) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#6A737D;">//输出每条查询的结果信息</span></span>
<span class="line"><span style="color:#E1E4E8;">                System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(hit.</span><span style="color:#B392F0;">getSourceAsString</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;&lt;&lt;========&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        });</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 高亮查询</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Test</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">highlightQueryTest</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> IOException {</span></span>
<span class="line"><span style="color:#E1E4E8;">        ElasticsearchConnector.</span><span style="color:#B392F0;">connect</span><span style="color:#E1E4E8;">(client </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 高亮查询</span></span>
<span class="line"><span style="color:#E1E4E8;">            SearchRequest request </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">SearchRequest</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">indices</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;user&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">//2.创建查询请求体构建器</span></span>
<span class="line"><span style="color:#E1E4E8;">            SearchSourceBuilder sourceBuilder </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">SearchSourceBuilder</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">//构建查询方式：高亮查询</span></span>
<span class="line"><span style="color:#E1E4E8;">            TermsQueryBuilder termsQueryBuilder </span><span style="color:#F97583;">=</span></span>
<span class="line"><span style="color:#E1E4E8;">                    QueryBuilders.</span><span style="color:#B392F0;">termsQuery</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;name&quot;</span><span style="color:#E1E4E8;">,</span><span style="color:#9ECBFF;">&quot;zhangsan&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">//设置查询方式</span></span>
<span class="line"><span style="color:#E1E4E8;">            sourceBuilder.</span><span style="color:#B392F0;">query</span><span style="color:#E1E4E8;">(termsQueryBuilder);</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">//构建高亮字段</span></span>
<span class="line"><span style="color:#E1E4E8;">            HighlightBuilder highlightBuilder </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">HighlightBuilder</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">            highlightBuilder.</span><span style="color:#B392F0;">preTags</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;&lt;font color=&#39;red&#39;&gt;&quot;</span><span style="color:#E1E4E8;">);</span><span style="color:#6A737D;">//设置标签前缀</span></span>
<span class="line"><span style="color:#E1E4E8;">            highlightBuilder.</span><span style="color:#B392F0;">postTags</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;&lt;/font&gt;&quot;</span><span style="color:#E1E4E8;">);</span><span style="color:#6A737D;">//设置标签后缀</span></span>
<span class="line"><span style="color:#E1E4E8;">            highlightBuilder.</span><span style="color:#B392F0;">field</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;name&quot;</span><span style="color:#E1E4E8;">);</span><span style="color:#6A737D;">//设置高亮字段</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">//设置高亮构建对象</span></span>
<span class="line"><span style="color:#E1E4E8;">            sourceBuilder.</span><span style="color:#B392F0;">highlighter</span><span style="color:#E1E4E8;">(highlightBuilder);</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">//设置请求体</span></span>
<span class="line"><span style="color:#E1E4E8;">            request.</span><span style="color:#B392F0;">source</span><span style="color:#E1E4E8;">(sourceBuilder);</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">//3.客户端发送请求，获取响应对象</span></span>
<span class="line"><span style="color:#E1E4E8;">            SearchResponse response </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> client.</span><span style="color:#B392F0;">search</span><span style="color:#E1E4E8;">(request, RequestOptions.DEFAULT);</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">//4.打印响应结果</span></span>
<span class="line"><span style="color:#E1E4E8;">            SearchHits hits </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> response.</span><span style="color:#B392F0;">getHits</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;took::&quot;</span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;">response.</span><span style="color:#B392F0;">getTook</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;time_out::&quot;</span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;">response.</span><span style="color:#B392F0;">isTimedOut</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;total::&quot;</span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;">hits.</span><span style="color:#B392F0;">getTotalHits</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;max_score::&quot;</span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;">hits.</span><span style="color:#B392F0;">getMaxScore</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;hits::::&gt;&gt;&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (SearchHit hit </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> hits) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                String sourceAsString </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> hit.</span><span style="color:#B392F0;">getSourceAsString</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">                System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(sourceAsString);</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#6A737D;">//打印高亮结果</span></span>
<span class="line"><span style="color:#E1E4E8;">                Map&lt;</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">HighlightField</span><span style="color:#E1E4E8;">&gt; highlightFields </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> hit.</span><span style="color:#B392F0;">getHighlightFields</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">                System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(highlightFields);</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;&lt;&lt;::::&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        });</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 查询最大值</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Test</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">maxValueQueryTest</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> IOException {</span></span>
<span class="line"><span style="color:#E1E4E8;">        ElasticsearchConnector.</span><span style="color:#B392F0;">connect</span><span style="color:#E1E4E8;">(client </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 高亮查询</span></span>
<span class="line"><span style="color:#E1E4E8;">            SearchRequest request </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">SearchRequest</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">indices</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;user&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">            SearchSourceBuilder sourceBuilder </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">SearchSourceBuilder</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">            sourceBuilder.</span><span style="color:#B392F0;">aggregation</span><span style="color:#E1E4E8;">(AggregationBuilders.</span><span style="color:#B392F0;">max</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;maxAge&quot;</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">field</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;age&quot;</span><span style="color:#E1E4E8;">));</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">//设置请求体</span></span>
<span class="line"><span style="color:#E1E4E8;">            request.</span><span style="color:#B392F0;">source</span><span style="color:#E1E4E8;">(sourceBuilder);</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">//3.客户端发送请求，获取响应对象</span></span>
<span class="line"><span style="color:#E1E4E8;">            SearchResponse response </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> client.</span><span style="color:#B392F0;">search</span><span style="color:#E1E4E8;">(request, RequestOptions.DEFAULT);</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">//4.打印响应结果</span></span>
<span class="line"><span style="color:#E1E4E8;">            SearchHits hits </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> response.</span><span style="color:#B392F0;">getHits</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(response);</span></span>
<span class="line"><span style="color:#E1E4E8;">        });</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 分组查询</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Test</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">queryByGroup</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> IOException {</span></span>
<span class="line"><span style="color:#E1E4E8;">        ElasticsearchConnector.</span><span style="color:#B392F0;">connect</span><span style="color:#E1E4E8;">(client </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            SearchRequest request </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">SearchRequest</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">indices</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;user&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">            SearchSourceBuilder sourceBuilder </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">SearchSourceBuilder</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">            sourceBuilder.</span><span style="color:#B392F0;">aggregation</span><span style="color:#E1E4E8;">(AggregationBuilders.</span><span style="color:#B392F0;">terms</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;age_groupby&quot;</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">field</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;age&quot;</span><span style="color:#E1E4E8;">));</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">//设置请求体</span></span>
<span class="line"><span style="color:#E1E4E8;">            request.</span><span style="color:#B392F0;">source</span><span style="color:#E1E4E8;">(sourceBuilder);</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">//3.客户端发送请求，获取响应对象</span></span>
<span class="line"><span style="color:#E1E4E8;">            SearchResponse response </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> client.</span><span style="color:#B392F0;">search</span><span style="color:#E1E4E8;">(request, RequestOptions.DEFAULT);</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">//4.打印响应结果</span></span>
<span class="line"><span style="color:#E1E4E8;">            SearchHits hits </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> response.</span><span style="color:#B392F0;">getHits</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(response);</span></span>
<span class="line"><span style="color:#E1E4E8;">        });</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">DocTest</span><span style="color:#24292E;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 文档 crud 操作</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Test</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">documentTest</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> IOException {</span></span>
<span class="line"><span style="color:#24292E;">        ElasticsearchConnector.</span><span style="color:#6F42C1;">connect</span><span style="color:#24292E;">(client </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            IndexRequest indexRequest </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">IndexRequest</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 设置索引及唯一性标识</span></span>
<span class="line"><span style="color:#24292E;">            indexRequest.</span><span style="color:#6F42C1;">index</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;user&quot;</span><span style="color:#24292E;">).</span><span style="color:#6F42C1;">id</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;1001&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">            User user </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> User.</span><span style="color:#6F42C1;">builder</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">name</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;zhangsan&quot;</span><span style="color:#24292E;">).</span><span style="color:#6F42C1;">gender</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;male&quot;</span><span style="color:#24292E;">).</span><span style="color:#6F42C1;">age</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">20</span><span style="color:#24292E;">).</span><span style="color:#6F42C1;">build</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">            ObjectMapper objectMapper </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ObjectMapper</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">            String userStr </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> objectMapper.</span><span style="color:#6F42C1;">writeValueAsString</span><span style="color:#24292E;">(user);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 添加文档数据，数据格式为 JSON 格式</span></span>
<span class="line"><span style="color:#24292E;">            indexRequest.</span><span style="color:#6F42C1;">source</span><span style="color:#24292E;">(userStr, XContentType.JSON);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 新增</span></span>
<span class="line"><span style="color:#24292E;">            IndexResponse response </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> client.</span><span style="color:#6F42C1;">index</span><span style="color:#24292E;">(indexRequest, RequestOptions.DEFAULT);</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 修改</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// client.update(indexRequest, RequestOptions.DEFAULT);</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 查询</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// client.get(indexRequest, RequestOptions.DEFAULT);</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 删除</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// client.delete(indexRequest, RequestOptions.DEFAULT);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(response.</span><span style="color:#6F42C1;">getIndex</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(response.</span><span style="color:#6F42C1;">getId</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(response.</span><span style="color:#6F42C1;">getResult</span><span style="color:#24292E;">());</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 批量操作</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Test</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">bulkTest</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> IOException {</span></span>
<span class="line"><span style="color:#24292E;">        ElasticsearchConnector.</span><span style="color:#6F42C1;">connect</span><span style="color:#24292E;">(client </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            BulkRequest bulkRequest </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">BulkRequest</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 批量新增</span></span>
<span class="line"><span style="color:#24292E;">            bulkRequest</span></span>
<span class="line"><span style="color:#24292E;">                    .</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">IndexRequest</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">index</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;user&quot;</span><span style="color:#24292E;">).</span><span style="color:#6F42C1;">id</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;1002&quot;</span><span style="color:#24292E;">).</span><span style="color:#6F42C1;">source</span><span style="color:#24292E;">(XContentType.JSON, </span><span style="color:#032F62;">&quot;name&quot;</span><span style="color:#24292E;">,</span><span style="color:#032F62;">&quot;lisi&quot;</span><span style="color:#24292E;">))</span></span>
<span class="line"><span style="color:#24292E;">                    .</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">IndexRequest</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">index</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;user&quot;</span><span style="color:#24292E;">).</span><span style="color:#6F42C1;">id</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;1003&quot;</span><span style="color:#24292E;">).</span><span style="color:#6F42C1;">source</span><span style="color:#24292E;">(XContentType.JSON, </span><span style="color:#032F62;">&quot;name&quot;</span><span style="color:#24292E;">,</span><span style="color:#032F62;">&quot;wangwu&quot;</span><span style="color:#24292E;">))</span></span>
<span class="line"><span style="color:#24292E;">                    .</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">IndexRequest</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">index</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;user&quot;</span><span style="color:#24292E;">).</span><span style="color:#6F42C1;">id</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;1003&quot;</span><span style="color:#24292E;">).</span><span style="color:#6F42C1;">source</span><span style="color:#24292E;">(XContentType.JSON, </span><span style="color:#032F62;">&quot;name&quot;</span><span style="color:#24292E;">,</span><span style="color:#032F62;">&quot;zhaoliu&quot;</span><span style="color:#24292E;">));</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">            BulkResponse response </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> client.</span><span style="color:#6F42C1;">bulk</span><span style="color:#24292E;">(bulkRequest, RequestOptions.DEFAULT);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 批量删除</span></span>
<span class="line"><span style="color:#6A737D;">//            bulkRequest</span></span>
<span class="line"><span style="color:#6A737D;">//                    .add(new DeleteRequest().index(&quot;user&quot;).id(&quot;1001&quot;))</span></span>
<span class="line"><span style="color:#6A737D;">//                    .add(new DeleteRequest().index(&quot;user&quot;).id(&quot;1002&quot;));</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(response.</span><span style="color:#6F42C1;">getTook</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(response.</span><span style="color:#6F42C1;">getItems</span><span style="color:#24292E;">());</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 查询索引下的所有数据</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Test</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">queryIndexAllTest</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> IOException {</span></span>
<span class="line"><span style="color:#24292E;">        ElasticsearchConnector.</span><span style="color:#6F42C1;">connect</span><span style="color:#24292E;">(client </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">            SearchRequest request </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">SearchRequest</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">            request.</span><span style="color:#6F42C1;">indices</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;user&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 构建查询的请求体</span></span>
<span class="line"><span style="color:#24292E;">            SearchSourceBuilder sourceBuilder </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">SearchSourceBuilder</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 查询所有数据</span></span>
<span class="line"><span style="color:#24292E;">            sourceBuilder.</span><span style="color:#6F42C1;">query</span><span style="color:#24292E;">(QueryBuilders.</span><span style="color:#6F42C1;">matchAllQuery</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">            request.</span><span style="color:#6F42C1;">source</span><span style="color:#24292E;">(sourceBuilder);</span></span>
<span class="line"><span style="color:#24292E;">            SearchResponse response </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> client.</span><span style="color:#6F42C1;">search</span><span style="color:#24292E;">(request, RequestOptions.DEFAULT);</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 查询匹配</span></span>
<span class="line"><span style="color:#24292E;">            SearchHits hits </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> response.</span><span style="color:#6F42C1;">getHits</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;took:&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> response.</span><span style="color:#6F42C1;">getTook</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;timeout:&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> response.</span><span style="color:#6F42C1;">isTimedOut</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;total:&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> hits.</span><span style="color:#6F42C1;">getTotalHits</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;MaxScore:&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> hits.</span><span style="color:#6F42C1;">getMaxScore</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;hits========&gt;&gt;&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (SearchHit hit </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> hits) {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6A737D;">//输出每条查询的结果信息</span></span>
<span class="line"><span style="color:#24292E;">                System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(hit.</span><span style="color:#6F42C1;">getSourceAsString</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;&lt;&lt;========&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        });</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 条件查询</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Test</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">conditionQueryTest</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> IOException {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        ElasticsearchConnector.</span><span style="color:#6F42C1;">connect</span><span style="color:#24292E;">(client </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 创建搜索请求对象</span></span>
<span class="line"><span style="color:#24292E;">            SearchRequest request </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">SearchRequest</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">            request.</span><span style="color:#6F42C1;">indices</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;user&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 构建查询的请求体</span></span>
<span class="line"><span style="color:#24292E;">            SearchSourceBuilder sourceBuilder </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">SearchSourceBuilder</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">            sourceBuilder.</span><span style="color:#6F42C1;">query</span><span style="color:#24292E;">(QueryBuilders.</span><span style="color:#6F42C1;">termQuery</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;name&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;lisi&quot;</span><span style="color:#24292E;">));</span></span>
<span class="line"><span style="color:#24292E;">            request.</span><span style="color:#6F42C1;">source</span><span style="color:#24292E;">(sourceBuilder);</span></span>
<span class="line"><span style="color:#24292E;">            SearchResponse response </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> client.</span><span style="color:#6F42C1;">search</span><span style="color:#24292E;">(request, RequestOptions.DEFAULT);</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 查询匹配</span></span>
<span class="line"><span style="color:#24292E;">            SearchHits hits </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> response.</span><span style="color:#6F42C1;">getHits</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;took:&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> response.</span><span style="color:#6F42C1;">getTook</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;timeout:&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> response.</span><span style="color:#6F42C1;">isTimedOut</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;total:&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> hits.</span><span style="color:#6F42C1;">getTotalHits</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;MaxScore:&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> hits.</span><span style="color:#6F42C1;">getMaxScore</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;hits========&gt;&gt;&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (SearchHit hit </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> hits) {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6A737D;">//输出每条查询的结果信息</span></span>
<span class="line"><span style="color:#24292E;">                System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(hit.</span><span style="color:#6F42C1;">getSourceAsString</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;&lt;&lt;========&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 分页查询</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Test</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">queryByPageTest</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> IOException {</span></span>
<span class="line"><span style="color:#24292E;">        ElasticsearchConnector.</span><span style="color:#6F42C1;">connect</span><span style="color:#24292E;">(client </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 创建搜索请求对象</span></span>
<span class="line"><span style="color:#24292E;">            SearchRequest request </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">SearchRequest</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">            request.</span><span style="color:#6F42C1;">indices</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;user&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 构建查询的请求体</span></span>
<span class="line"><span style="color:#24292E;">            SearchSourceBuilder sourceBuilder </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">SearchSourceBuilder</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">            sourceBuilder.</span><span style="color:#6F42C1;">query</span><span style="color:#24292E;">(QueryBuilders.</span><span style="color:#6F42C1;">matchAllQuery</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 分页查询</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 当前页其实索引(第一条数据的顺序号)， from</span></span>
<span class="line"><span style="color:#24292E;">            sourceBuilder.</span><span style="color:#6F42C1;">from</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 每页显示多少条 size</span></span>
<span class="line"><span style="color:#24292E;">            sourceBuilder.</span><span style="color:#6F42C1;">size</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">            request.</span><span style="color:#6F42C1;">source</span><span style="color:#24292E;">(sourceBuilder);</span></span>
<span class="line"><span style="color:#24292E;">            SearchResponse response </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> client.</span><span style="color:#6F42C1;">search</span><span style="color:#24292E;">(request, RequestOptions.DEFAULT);</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 查询匹配</span></span>
<span class="line"><span style="color:#24292E;">            SearchHits hits </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> response.</span><span style="color:#6F42C1;">getHits</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;took:&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> response.</span><span style="color:#6F42C1;">getTook</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;timeout:&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> response.</span><span style="color:#6F42C1;">isTimedOut</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;total:&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> hits.</span><span style="color:#6F42C1;">getTotalHits</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;MaxScore:&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> hits.</span><span style="color:#6F42C1;">getMaxScore</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;hits========&gt;&gt;&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (SearchHit hit </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> hits) {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6A737D;">//输出每条查询的结果信息</span></span>
<span class="line"><span style="color:#24292E;">                System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(hit.</span><span style="color:#6F42C1;">getSourceAsString</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;&lt;&lt;========&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        });</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 查询排序</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Test</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">queryByOrderTest</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> IOException {</span></span>
<span class="line"><span style="color:#24292E;">        ElasticsearchConnector.</span><span style="color:#6F42C1;">connect</span><span style="color:#24292E;">(client </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 创建搜索请求对象</span></span>
<span class="line"><span style="color:#24292E;">            SearchRequest request </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">SearchRequest</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">            request.</span><span style="color:#6F42C1;">indices</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;user&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 构建查询的请求体</span></span>
<span class="line"><span style="color:#24292E;">            SearchSourceBuilder sourceBuilder </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">SearchSourceBuilder</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">            sourceBuilder.</span><span style="color:#6F42C1;">query</span><span style="color:#24292E;">(QueryBuilders.</span><span style="color:#6F42C1;">matchAllQuery</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 排序</span></span>
<span class="line"><span style="color:#24292E;">            sourceBuilder.</span><span style="color:#6F42C1;">sort</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;age&quot;</span><span style="color:#24292E;">, SortOrder.ASC);</span></span>
<span class="line"><span style="color:#24292E;">            request.</span><span style="color:#6F42C1;">source</span><span style="color:#24292E;">(sourceBuilder);</span></span>
<span class="line"><span style="color:#24292E;">            SearchResponse response </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> client.</span><span style="color:#6F42C1;">search</span><span style="color:#24292E;">(request, RequestOptions.DEFAULT);</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 查询匹配</span></span>
<span class="line"><span style="color:#24292E;">            SearchHits hits </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> response.</span><span style="color:#6F42C1;">getHits</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;took:&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> response.</span><span style="color:#6F42C1;">getTook</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;timeout:&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> response.</span><span style="color:#6F42C1;">isTimedOut</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;total:&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> hits.</span><span style="color:#6F42C1;">getTotalHits</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;MaxScore:&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> hits.</span><span style="color:#6F42C1;">getMaxScore</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;hits========&gt;&gt;&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (SearchHit hit </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> hits) {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6A737D;">//输出每条查询的结果信息</span></span>
<span class="line"><span style="color:#24292E;">                System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(hit.</span><span style="color:#6F42C1;">getSourceAsString</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;&lt;&lt;========&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        });</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Test</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">combineQueryTest</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> IOException {</span></span>
<span class="line"><span style="color:#24292E;">        ElasticsearchConnector.</span><span style="color:#6F42C1;">connect</span><span style="color:#24292E;">(client </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 创建搜索请求对象</span></span>
<span class="line"><span style="color:#24292E;">            SearchRequest request </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">SearchRequest</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">            request.</span><span style="color:#6F42C1;">indices</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;user&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 构建查询的请求体</span></span>
<span class="line"><span style="color:#24292E;">            SearchSourceBuilder sourceBuilder </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">SearchSourceBuilder</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">            BoolQueryBuilder boolQueryBuilder </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> QueryBuilders.</span><span style="color:#6F42C1;">boolQuery</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 必须包含</span></span>
<span class="line"><span style="color:#24292E;">            boolQueryBuilder.</span><span style="color:#6F42C1;">must</span><span style="color:#24292E;">(QueryBuilders.</span><span style="color:#6F42C1;">matchQuery</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;age&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;20&quot;</span><span style="color:#24292E;">));</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 一定不含</span></span>
<span class="line"><span style="color:#24292E;">            boolQueryBuilder.</span><span style="color:#6F42C1;">mustNot</span><span style="color:#24292E;">(QueryBuilders.</span><span style="color:#6F42C1;">matchQuery</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;name&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;lisi&quot;</span><span style="color:#24292E;">));</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 可能包含</span></span>
<span class="line"><span style="color:#24292E;">            boolQueryBuilder.</span><span style="color:#6F42C1;">should</span><span style="color:#24292E;">(QueryBuilders.</span><span style="color:#6F42C1;">matchQuery</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;sex&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;male&quot;</span><span style="color:#24292E;">));</span></span>
<span class="line"><span style="color:#24292E;">            sourceBuilder.</span><span style="color:#6F42C1;">query</span><span style="color:#24292E;">(boolQueryBuilder);</span></span>
<span class="line"><span style="color:#24292E;">            request.</span><span style="color:#6F42C1;">source</span><span style="color:#24292E;">(sourceBuilder);</span></span>
<span class="line"><span style="color:#24292E;">            SearchResponse response </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> client.</span><span style="color:#6F42C1;">search</span><span style="color:#24292E;">(request, RequestOptions.DEFAULT);</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 查询匹配</span></span>
<span class="line"><span style="color:#24292E;">            SearchHits hits </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> response.</span><span style="color:#6F42C1;">getHits</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;took:&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> response.</span><span style="color:#6F42C1;">getTook</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;timeout:&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> response.</span><span style="color:#6F42C1;">isTimedOut</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;total:&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> hits.</span><span style="color:#6F42C1;">getTotalHits</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;MaxScore:&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> hits.</span><span style="color:#6F42C1;">getMaxScore</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;hits========&gt;&gt;&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (SearchHit hit </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> hits) {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6A737D;">//输出每条查询的结果信息</span></span>
<span class="line"><span style="color:#24292E;">                System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(hit.</span><span style="color:#6F42C1;">getSourceAsString</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;&lt;&lt;========&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        });</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 范围查询</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Test</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">rangeQueryTest</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> IOException {</span></span>
<span class="line"><span style="color:#24292E;">        ElasticsearchConnector.</span><span style="color:#6F42C1;">connect</span><span style="color:#24292E;">(client </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 创建搜索请求对象</span></span>
<span class="line"><span style="color:#24292E;">            SearchRequest request </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">SearchRequest</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">            request.</span><span style="color:#6F42C1;">indices</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;user&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 构建查询的请求体</span></span>
<span class="line"><span style="color:#24292E;">            SearchSourceBuilder sourceBuilder </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">SearchSourceBuilder</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">            RangeQueryBuilder rangeQuery </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> QueryBuilders.</span><span style="color:#6F42C1;">rangeQuery</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;age&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 大于等于</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">//rangeQuery.gte(&quot;30&quot;);</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 小于等于</span></span>
<span class="line"><span style="color:#24292E;">            rangeQuery.</span><span style="color:#6F42C1;">lte</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;40&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">            sourceBuilder.</span><span style="color:#6F42C1;">query</span><span style="color:#24292E;">(rangeQuery);</span></span>
<span class="line"><span style="color:#24292E;">            request.</span><span style="color:#6F42C1;">source</span><span style="color:#24292E;">(sourceBuilder);</span></span>
<span class="line"><span style="color:#24292E;">            SearchResponse response </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> client.</span><span style="color:#6F42C1;">search</span><span style="color:#24292E;">(request, RequestOptions.DEFAULT);</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 查询匹配</span></span>
<span class="line"><span style="color:#24292E;">            SearchHits hits </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> response.</span><span style="color:#6F42C1;">getHits</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;took:&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> response.</span><span style="color:#6F42C1;">getTook</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;timeout:&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> response.</span><span style="color:#6F42C1;">isTimedOut</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;total:&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> hits.</span><span style="color:#6F42C1;">getTotalHits</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;MaxScore:&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> hits.</span><span style="color:#6F42C1;">getMaxScore</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;hits========&gt;&gt;&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (SearchHit hit </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> hits) {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6A737D;">//输出每条查询的结果信息</span></span>
<span class="line"><span style="color:#24292E;">                System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(hit.</span><span style="color:#6F42C1;">getSourceAsString</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;&lt;&lt;========&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        });</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 模糊查询</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Test</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">fuzzyQueryTest</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> IOException {</span></span>
<span class="line"><span style="color:#24292E;">        ElasticsearchConnector.</span><span style="color:#6F42C1;">connect</span><span style="color:#24292E;">(client </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 创建搜索请求对象</span></span>
<span class="line"><span style="color:#24292E;">            SearchRequest request </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">SearchRequest</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">            request.</span><span style="color:#6F42C1;">indices</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;user&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 构建查询的请求体</span></span>
<span class="line"><span style="color:#24292E;">            SearchSourceBuilder sourceBuilder </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">SearchSourceBuilder</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">            sourceBuilder.</span><span style="color:#6F42C1;">query</span><span style="color:#24292E;">(QueryBuilders.</span><span style="color:#6F42C1;">fuzzyQuery</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;name&quot;</span><span style="color:#24292E;">,</span><span style="color:#032F62;">&quot;lisi&quot;</span><span style="color:#24292E;">).</span><span style="color:#6F42C1;">fuzziness</span><span style="color:#24292E;">(Fuzziness.ONE));</span></span>
<span class="line"><span style="color:#24292E;">            request.</span><span style="color:#6F42C1;">source</span><span style="color:#24292E;">(sourceBuilder);</span></span>
<span class="line"><span style="color:#24292E;">            SearchResponse response </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> client.</span><span style="color:#6F42C1;">search</span><span style="color:#24292E;">(request, RequestOptions.DEFAULT);</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 查询匹配</span></span>
<span class="line"><span style="color:#24292E;">            SearchHits hits </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> response.</span><span style="color:#6F42C1;">getHits</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;took:&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> response.</span><span style="color:#6F42C1;">getTook</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;timeout:&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> response.</span><span style="color:#6F42C1;">isTimedOut</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;total:&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> hits.</span><span style="color:#6F42C1;">getTotalHits</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;MaxScore:&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> hits.</span><span style="color:#6F42C1;">getMaxScore</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;hits========&gt;&gt;&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (SearchHit hit </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> hits) {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6A737D;">//输出每条查询的结果信息</span></span>
<span class="line"><span style="color:#24292E;">                System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(hit.</span><span style="color:#6F42C1;">getSourceAsString</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;&lt;&lt;========&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        });</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 高亮查询</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Test</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">highlightQueryTest</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> IOException {</span></span>
<span class="line"><span style="color:#24292E;">        ElasticsearchConnector.</span><span style="color:#6F42C1;">connect</span><span style="color:#24292E;">(client </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 高亮查询</span></span>
<span class="line"><span style="color:#24292E;">            SearchRequest request </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">SearchRequest</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">indices</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;user&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">//2.创建查询请求体构建器</span></span>
<span class="line"><span style="color:#24292E;">            SearchSourceBuilder sourceBuilder </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">SearchSourceBuilder</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">//构建查询方式：高亮查询</span></span>
<span class="line"><span style="color:#24292E;">            TermsQueryBuilder termsQueryBuilder </span><span style="color:#D73A49;">=</span></span>
<span class="line"><span style="color:#24292E;">                    QueryBuilders.</span><span style="color:#6F42C1;">termsQuery</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;name&quot;</span><span style="color:#24292E;">,</span><span style="color:#032F62;">&quot;zhangsan&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">//设置查询方式</span></span>
<span class="line"><span style="color:#24292E;">            sourceBuilder.</span><span style="color:#6F42C1;">query</span><span style="color:#24292E;">(termsQueryBuilder);</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">//构建高亮字段</span></span>
<span class="line"><span style="color:#24292E;">            HighlightBuilder highlightBuilder </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">HighlightBuilder</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">            highlightBuilder.</span><span style="color:#6F42C1;">preTags</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;&lt;font color=&#39;red&#39;&gt;&quot;</span><span style="color:#24292E;">);</span><span style="color:#6A737D;">//设置标签前缀</span></span>
<span class="line"><span style="color:#24292E;">            highlightBuilder.</span><span style="color:#6F42C1;">postTags</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;&lt;/font&gt;&quot;</span><span style="color:#24292E;">);</span><span style="color:#6A737D;">//设置标签后缀</span></span>
<span class="line"><span style="color:#24292E;">            highlightBuilder.</span><span style="color:#6F42C1;">field</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;name&quot;</span><span style="color:#24292E;">);</span><span style="color:#6A737D;">//设置高亮字段</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">//设置高亮构建对象</span></span>
<span class="line"><span style="color:#24292E;">            sourceBuilder.</span><span style="color:#6F42C1;">highlighter</span><span style="color:#24292E;">(highlightBuilder);</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">//设置请求体</span></span>
<span class="line"><span style="color:#24292E;">            request.</span><span style="color:#6F42C1;">source</span><span style="color:#24292E;">(sourceBuilder);</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">//3.客户端发送请求，获取响应对象</span></span>
<span class="line"><span style="color:#24292E;">            SearchResponse response </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> client.</span><span style="color:#6F42C1;">search</span><span style="color:#24292E;">(request, RequestOptions.DEFAULT);</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">//4.打印响应结果</span></span>
<span class="line"><span style="color:#24292E;">            SearchHits hits </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> response.</span><span style="color:#6F42C1;">getHits</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;took::&quot;</span><span style="color:#D73A49;">+</span><span style="color:#24292E;">response.</span><span style="color:#6F42C1;">getTook</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;time_out::&quot;</span><span style="color:#D73A49;">+</span><span style="color:#24292E;">response.</span><span style="color:#6F42C1;">isTimedOut</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;total::&quot;</span><span style="color:#D73A49;">+</span><span style="color:#24292E;">hits.</span><span style="color:#6F42C1;">getTotalHits</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;max_score::&quot;</span><span style="color:#D73A49;">+</span><span style="color:#24292E;">hits.</span><span style="color:#6F42C1;">getMaxScore</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;hits::::&gt;&gt;&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (SearchHit hit </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> hits) {</span></span>
<span class="line"><span style="color:#24292E;">                String sourceAsString </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> hit.</span><span style="color:#6F42C1;">getSourceAsString</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">                System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(sourceAsString);</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6A737D;">//打印高亮结果</span></span>
<span class="line"><span style="color:#24292E;">                Map&lt;</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">HighlightField</span><span style="color:#24292E;">&gt; highlightFields </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> hit.</span><span style="color:#6F42C1;">getHighlightFields</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">                System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(highlightFields);</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;&lt;&lt;::::&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        });</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 查询最大值</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Test</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">maxValueQueryTest</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> IOException {</span></span>
<span class="line"><span style="color:#24292E;">        ElasticsearchConnector.</span><span style="color:#6F42C1;">connect</span><span style="color:#24292E;">(client </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 高亮查询</span></span>
<span class="line"><span style="color:#24292E;">            SearchRequest request </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">SearchRequest</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">indices</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;user&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">            SearchSourceBuilder sourceBuilder </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">SearchSourceBuilder</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">            sourceBuilder.</span><span style="color:#6F42C1;">aggregation</span><span style="color:#24292E;">(AggregationBuilders.</span><span style="color:#6F42C1;">max</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;maxAge&quot;</span><span style="color:#24292E;">).</span><span style="color:#6F42C1;">field</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;age&quot;</span><span style="color:#24292E;">));</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">//设置请求体</span></span>
<span class="line"><span style="color:#24292E;">            request.</span><span style="color:#6F42C1;">source</span><span style="color:#24292E;">(sourceBuilder);</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">//3.客户端发送请求，获取响应对象</span></span>
<span class="line"><span style="color:#24292E;">            SearchResponse response </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> client.</span><span style="color:#6F42C1;">search</span><span style="color:#24292E;">(request, RequestOptions.DEFAULT);</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">//4.打印响应结果</span></span>
<span class="line"><span style="color:#24292E;">            SearchHits hits </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> response.</span><span style="color:#6F42C1;">getHits</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(response);</span></span>
<span class="line"><span style="color:#24292E;">        });</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 分组查询</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Test</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">queryByGroup</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> IOException {</span></span>
<span class="line"><span style="color:#24292E;">        ElasticsearchConnector.</span><span style="color:#6F42C1;">connect</span><span style="color:#24292E;">(client </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            SearchRequest request </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">SearchRequest</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">indices</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;user&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">            SearchSourceBuilder sourceBuilder </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">SearchSourceBuilder</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">            sourceBuilder.</span><span style="color:#6F42C1;">aggregation</span><span style="color:#24292E;">(AggregationBuilders.</span><span style="color:#6F42C1;">terms</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;age_groupby&quot;</span><span style="color:#24292E;">).</span><span style="color:#6F42C1;">field</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;age&quot;</span><span style="color:#24292E;">));</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">//设置请求体</span></span>
<span class="line"><span style="color:#24292E;">            request.</span><span style="color:#6F42C1;">source</span><span style="color:#24292E;">(sourceBuilder);</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">//3.客户端发送请求，获取响应对象</span></span>
<span class="line"><span style="color:#24292E;">            SearchResponse response </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> client.</span><span style="color:#6F42C1;">search</span><span style="color:#24292E;">(request, RequestOptions.DEFAULT);</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">//4.打印响应结果</span></span>
<span class="line"><span style="color:#24292E;">            SearchHits hits </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> response.</span><span style="color:#6F42C1;">getHits</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(response);</span></span>
<span class="line"><span style="color:#24292E;">        });</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><br><h2 id="springboot-集成" tabindex="-1">SpringBoot 集成 <a class="header-anchor" href="#springboot-集成" aria-label="Permalink to &quot;SpringBoot 集成&quot;">​</a></h2><p><strong>依赖</strong></p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">dependencies</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">&lt;!-- es --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;org.springframework.boot&lt;/</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;spring-boot-starter-data-elasticsearch&lt;/</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;org.projectlombok&lt;/</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;lombok&lt;/</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">optional</span><span style="color:#E1E4E8;">&gt;true&lt;/</span><span style="color:#85E89D;">optional</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;junit&lt;/</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;junit&lt;/</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt;4.13.2&lt;/</span><span style="color:#85E89D;">version</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">scope</span><span style="color:#E1E4E8;">&gt;test&lt;/</span><span style="color:#85E89D;">scope</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;org.springframework.boot&lt;/</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;spring-boot-starter-test&lt;/</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        &lt;</span><span style="color:#85E89D;">scope</span><span style="color:#E1E4E8;">&gt;test&lt;/</span><span style="color:#85E89D;">scope</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">dependencies</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">dependencies</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">&lt;!-- es --&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;org.springframework.boot&lt;/</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;spring-boot-starter-data-elasticsearch&lt;/</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;org.projectlombok&lt;/</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;lombok&lt;/</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">optional</span><span style="color:#24292E;">&gt;true&lt;/</span><span style="color:#22863A;">optional</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;junit&lt;/</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;junit&lt;/</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt;4.13.2&lt;/</span><span style="color:#22863A;">version</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">scope</span><span style="color:#24292E;">&gt;test&lt;/</span><span style="color:#22863A;">scope</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;org.springframework.boot&lt;/</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;spring-boot-starter-test&lt;/</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        &lt;</span><span style="color:#22863A;">scope</span><span style="color:#24292E;">&gt;test&lt;/</span><span style="color:#22863A;">scope</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">dependencies</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p><strong>配置</strong></p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">server</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">port</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">8888</span></span>
<span class="line"></span>
<span class="line"><span style="color:#85E89D;">spring</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">application</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">demo-es-boot</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">data</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">elasticsearch</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">repositories</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">enabled</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">elasticsearch</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">rest</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">uris</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">http://localhost:9200</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">server</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">port</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">8888</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">spring</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">application</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">demo-es-boot</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">data</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">elasticsearch</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">repositories</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">enabled</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">elasticsearch</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">rest</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">uris</span><span style="color:#24292E;">: </span><span style="color:#032F62;">http://localhost:9200</span></span></code></pre></div><p><strong>代码</strong></p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 实体类</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Data</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">ToString</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">NoArgsConstructor</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">AllArgsConstructor</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Builder</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Document</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">indexName</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;user&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">User</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">implements</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Serializable</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">long</span><span style="color:#E1E4E8;"> serialVersionUID </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1L</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Id</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> Long id;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Field</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">type</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> FieldType.Text)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> String name;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> Integer age;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> String gender;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// elasticsearch repository类</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">UserRepository</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ElasticsearchRepository</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#F97583;">User</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">Long</span><span style="color:#E1E4E8;">&gt; {</span></span>
<span class="line"><span style="color:#E1E4E8;">    User </span><span style="color:#B392F0;">findUserByName</span><span style="color:#E1E4E8;">(String </span><span style="color:#FFAB70;">name</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 单元测试类</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">RunWith</span><span style="color:#E1E4E8;">(SpringRunner.class)</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">SpringBootTest</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ServiceTest</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Resource</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> UserRepository userRepository;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Autowired</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> UserService userService;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Test</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">test02</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        Iterable&lt;</span><span style="color:#F97583;">User</span><span style="color:#E1E4E8;">&gt; users </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> userRepository.</span><span style="color:#B392F0;">findAll</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (User user </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> users) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(user.</span><span style="color:#B392F0;">toString</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Autowired</span></span>
<span class="line"><span style="color:#E1E4E8;">    ElasticsearchRestTemplate esTemplate;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Test</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">test03</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        User user </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> User.</span><span style="color:#B392F0;">builder</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">name</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;wangwu&quot;</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">id</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">12L</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">age</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">21</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">gender</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;male&quot;</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">build</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        esTemplate.</span><span style="color:#B392F0;">save</span><span style="color:#E1E4E8;">(user);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Test</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">test04</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        MatchQueryBuilder matchQuery </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> QueryBuilders.</span><span style="color:#B392F0;">matchQuery</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;gender&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;male&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        NativeSearchQuery query </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">NativeSearchQueryBuilder</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">withQuery</span><span style="color:#E1E4E8;">(matchQuery).</span><span style="color:#B392F0;">build</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">long</span><span style="color:#E1E4E8;"> count </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> esTemplate.</span><span style="color:#B392F0;">count</span><span style="color:#E1E4E8;">(query, User.class);</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(count);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 实体类</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Data</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">ToString</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">NoArgsConstructor</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">AllArgsConstructor</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Builder</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Document</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">indexName</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;user&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">User</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">implements</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Serializable</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">long</span><span style="color:#24292E;"> serialVersionUID </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1L</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Id</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> Long id;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Field</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">type</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> FieldType.Text)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> String name;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> Integer age;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> String gender;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// elasticsearch repository类</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">UserRepository</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ElasticsearchRepository</span><span style="color:#24292E;">&lt;</span><span style="color:#D73A49;">User</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">Long</span><span style="color:#24292E;">&gt; {</span></span>
<span class="line"><span style="color:#24292E;">    User </span><span style="color:#6F42C1;">findUserByName</span><span style="color:#24292E;">(String </span><span style="color:#E36209;">name</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 单元测试类</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">RunWith</span><span style="color:#24292E;">(SpringRunner.class)</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">SpringBootTest</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ServiceTest</span><span style="color:#24292E;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Resource</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> UserRepository userRepository;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Autowired</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> UserService userService;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Test</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">test02</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        Iterable&lt;</span><span style="color:#D73A49;">User</span><span style="color:#24292E;">&gt; users </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> userRepository.</span><span style="color:#6F42C1;">findAll</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (User user </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> users) {</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(user.</span><span style="color:#6F42C1;">toString</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Autowired</span></span>
<span class="line"><span style="color:#24292E;">    ElasticsearchRestTemplate esTemplate;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Test</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">test03</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        User user </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> User.</span><span style="color:#6F42C1;">builder</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">name</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;wangwu&quot;</span><span style="color:#24292E;">).</span><span style="color:#6F42C1;">id</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">12L</span><span style="color:#24292E;">).</span><span style="color:#6F42C1;">age</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">21</span><span style="color:#24292E;">).</span><span style="color:#6F42C1;">gender</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;male&quot;</span><span style="color:#24292E;">).</span><span style="color:#6F42C1;">build</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        esTemplate.</span><span style="color:#6F42C1;">save</span><span style="color:#24292E;">(user);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Test</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">test04</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        MatchQueryBuilder matchQuery </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> QueryBuilders.</span><span style="color:#6F42C1;">matchQuery</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;gender&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;male&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        NativeSearchQuery query </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">NativeSearchQueryBuilder</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">withQuery</span><span style="color:#24292E;">(matchQuery).</span><span style="color:#6F42C1;">build</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">long</span><span style="color:#24292E;"> count </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> esTemplate.</span><span style="color:#6F42C1;">count</span><span style="color:#24292E;">(query, User.class);</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(count);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><br><h2 id="思考" tabindex="-1">思考 <a class="header-anchor" href="#思考" aria-label="Permalink to &quot;思考&quot;">​</a></h2><p><strong>Elasticsearch 的优化</strong></p><p>Elasticsearch 个人使用得不是很频繁，暂时只能从以下几个方面出发：</p><ul><li>mapping，创建 index 的时候连带创建好对应的映射</li><li>副本，大量读操作的情况下，通过增加副本量可以增加吞吐量，但副本数量不是越多越好，要视情况而定，可打开自适应副本</li></ul><br><h2 id="参考" tabindex="-1">参考 <a class="header-anchor" href="#参考" aria-label="Permalink to &quot;参考&quot;">​</a></h2><p><a href="https://mp.weixin.qq.com/s/tsoBovXDcB02KxvWu2_SpQ" target="_blank" rel="noreferrer"> 一篇文章带你搞定 Elasticsearch 术语 </a></p><p><a href="https://blog.csdn.net/u011863024/article/details/115721328" target="_blank" rel="noreferrer">Elasticsearch 学习笔记</a></p><p><a href="https://segmentfault.com/a/1190000042059652" target="_blank" rel="noreferrer">Elasticsearch 操作整理</a></p>`,142),t=[e];function c(r,E,y,i,u,F){return n(),a("div",null,t)}const h=s(o,[["render",c]]);export{d as __pageData,h as default};