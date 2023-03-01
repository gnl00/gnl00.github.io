import{_ as s,c as a,d as e,b as i,a as r,r as t,o as l}from"./app.d8a09d34.js";const w='{"title":"Redis \u914D\u7F6E\u8BE6\u89E3","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u524D\u8A00","slug":"\u524D\u8A00"},{"level":2,"title":"\u7EBF\u7A0B\u4E0E IO","slug":"\u7EBF\u7A0B\u4E0E-io"},{"level":2,"title":"\u6570\u636E\u6301\u4E45\u5316","slug":"\u6570\u636E\u6301\u4E45\u5316"},{"level":3,"title":"RDB","slug":"rdb"},{"level":3,"title":"AOF","slug":"aof"},{"level":2,"title":"\u5185\u5B58\u7BA1\u7406","slug":"\u5185\u5B58\u7BA1\u7406"},{"level":3,"title":"\u5185\u5B58\u56DE\u6536\u7B56\u7565","slug":"\u5185\u5B58\u56DE\u6536\u7B56\u7565"},{"level":3,"title":"\u8FC7\u671F\u6570\u636E\u56DE\u6536\u7B56\u7565","slug":"\u8FC7\u671F\u6570\u636E\u56DE\u6536\u7B56\u7565"},{"level":3,"title":"Key \u5220\u9664\u539F\u8BED","slug":"key-\u5220\u9664\u539F\u8BED"},{"level":2,"title":"\u9AD8\u7EA7\u914D\u7F6E","slug":"\u9AD8\u7EA7\u914D\u7F6E"},{"level":3,"title":"Rehash","slug":"rehash"},{"level":2,"title":"\u5185\u5B58\u788E\u7247\u6574\u7406","slug":"\u5185\u5B58\u788E\u7247\u6574\u7406"},{"level":2,"title":"\u4E3B\u4ECE\u914D\u7F6E","slug":"\u4E3B\u4ECE\u914D\u7F6E"},{"level":2,"title":"\u96C6\u7FA4\u914D\u7F6E","slug":"\u96C6\u7FA4\u914D\u7F6E"},{"level":2,"title":"\u53C2\u8003","slug":"\u53C2\u8003"}],"relativePath":"posts/renew/redis/Redis-\u914D\u7F6E\u8BE6\u89E3.md"}',o={},p=r(`<h1 id="redis-\u914D\u7F6E\u8BE6\u89E3" tabindex="-1">Redis \u914D\u7F6E\u8BE6\u89E3 <a class="header-anchor" href="#redis-\u914D\u7F6E\u8BE6\u89E3" aria-hidden="true">#</a></h1><h2 id="\u524D\u8A00" tabindex="-1">\u524D\u8A00 <a class="header-anchor" href="#\u524D\u8A00" aria-hidden="true">#</a></h2><blockquote><p>\u8BE6\u8BFB Redis \u914D\u7F6E\u6587\u4EF6\u4F1A\u53D1\u73B0\u4E00\u4E2A\u8BCD \u201CASAP\u201D \u7ECF\u5E38\u51FA\u73B0\u5728\u6587\u4EF6\u4E2D\uFF0C\u662F &quot;As Soon As Possible&quot; \u7684\u7F29\u5199</p></blockquote><h2 id="\u7EBF\u7A0B\u4E0E-io" tabindex="-1">\u7EBF\u7A0B\u4E0E IO <a class="header-anchor" href="#\u7EBF\u7A0B\u4E0E-io" aria-hidden="true">#</a></h2><blockquote><p>Redis is mostly single threaded, however there are certain threaded operations such as UNLINK, slow I/O accesses and other things that are performed on side threads.</p><p>Redis \u57FA\u672C\u4E0A\u53EF\u4EE5\u8BF4\u662F\u5355\u7EBF\u7A0B\u8FD0\u884C\u7684\uFF0C\u9664\u4E86\u67D0\u4E9B\u5982 <code>UNLINK</code> \u4EE5\u53CA\u6162 IO \u8BBF\u95EE\u7B49\u9700\u8981\u5176\u4ED6\u9700\u8981\u591A\u7EBF\u7A0B\u8BBF\u95EE\u7684\u60C5\u51B5</p></blockquote><blockquote><p>Now it is also possible to handle Redis clients socket reads and writes in different I/O threads.</p><p>Redis \u76EE\u524D\u53EF\u4EE5\u4F7F\u7528\u4E0D\u540C\u7684\u8BFB\u5199\u7EBF\u7A0B\u6765\u8FDB\u884C\u8BFB\u5199\u64CD\u4F5C</p><p>Since especially writing is so slow, normally Redis users use pipelining in order to speed up the Redis performances per core, and spawn multiple instances in order to scale more.</p><p>\u7531\u4E8E\u5199\u5165\u64CD\u4F5C\u6BD4\u8F83\u6162\uFF0CRedis \u901A\u5E38\u4F7F\u7528\u7BA1\u9053\u4EE5\u52A0\u901F\u6BCF\u4E2A\u6838\u5FC3\u7684\u5199\u5165\u6027\u80FD\uFF0C\u5E76\u4E14\u9762\u5BF9\u5927\u91CF\u7684\u5199\u5165\u573A\u666F\u4F1A\u542F\u7528\u591A\u4E2A\u7EBF\u7A0B\u5B9E\u4F8B</p><p>Using I/O threads it is possible to easily speedup two times Redis without resorting to pipelining nor sharding of the instance.</p><p>\u4F7F\u7528\u591A\u4E2A\u8BFB\u5199\u7EBF\u7A0B\u53EF\u4EE5\u4E0D\u501F\u52A9\u7BA1\u9053\u6216\u8005\u5B9E\u4F8B\u5206\u7247\uFF0C\u5C06 Redis \u7684\u8BFB\u5199\u901F\u7387\u63D0\u9AD8 2 \u500D</p></blockquote><br><h2 id="\u6570\u636E\u6301\u4E45\u5316" tabindex="-1">\u6570\u636E\u6301\u4E45\u5316 <a class="header-anchor" href="#\u6570\u636E\u6301\u4E45\u5316" aria-hidden="true">#</a></h2><h3 id="rdb" tabindex="-1">RDB <a class="header-anchor" href="#rdb" aria-hidden="true">#</a></h3><h4 id="\u540C\u6B65\u7B56\u7565" tabindex="-1">\u540C\u6B65\u7B56\u7565 <a class="header-anchor" href="#\u540C\u6B65\u7B56\u7565" aria-hidden="true">#</a></h4><blockquote><p>Save the DB to disk.</p><p><code>save &lt;seconds&gt; &lt;changes&gt; [&lt;seconds&gt; &lt;changes&gt; ...]</code></p><p>Redis will save the DB if the given number of seconds elapsed and it surpassed the given number of write operations against the DB.</p><p>Snapshotting can be completely disabled with a single empty string argument</p><p>as in following example:</p><p><code>save &quot;&quot;</code></p><p>Unless specified otherwise, by default Redis will save the DB:</p><ul><li>After 3600 seconds (an hour) if at least 1 change was performed</li><li>After 300 seconds (5 minutes) if at least 100 changes were performed</li><li>After 60 seconds if at least 10000 changes were performed</li></ul><p>You can set these explicitly by uncommenting the following line.</p><p><code>save 3600 1 300 100 60 10000</code></p></blockquote><h4 id="\u540D\u79F0\u4E0E\u8DEF\u5F84" tabindex="-1">\u540D\u79F0\u4E0E\u8DEF\u5F84 <a class="header-anchor" href="#\u540D\u79F0\u4E0E\u8DEF\u5F84" aria-hidden="true">#</a></h4><blockquote><p>The filename where to dump the DB</p><p><code>dbfilename dump.rdb</code></p><p>The working directory.</p><p>The DB will be written inside this directory, with the filename specified above using the &#39;dbfilename&#39; configuration directive. The Append Only File will also be created inside this directory.</p><p>Note that you must specify a directory here, not a file name.</p><p><code>dir /usr/local/var/db/redis/</code></p></blockquote><h4 id="\u9519\u8BEF\u6062\u590D" tabindex="-1">\u9519\u8BEF\u6062\u590D <a class="header-anchor" href="#\u9519\u8BEF\u6062\u590D" aria-hidden="true">#</a></h4><div class="language-conf line-numbers-mode"><pre><code># By default Redis will stop accepting writes if RDB snapshots are enabled
# (at least one save point) and the latest background save failed.
# \u9ED8\u8BA4\u60C5\u51B5\u4E0B\uFF0C\u5982\u679C\u5F00\u542F\u4E86 RDB \u5FEB\u7167\uFF0C\u4E14\u6700\u8FD1\u4E00\u6B21 RDB \u540E\u53F0\u4FDD\u5B58\u5931\u8D25\uFF0C\u5C31\u4F1A\u505C\u6B62\u5199\u64CD\u4F5C
#
# This will make the user aware (in a hard way) that data is not persisting
# on disk properly, otherwise chances are that no one will notice and some
# disaster will happen.
# \u8FD9\u4F1A\u4EE5\u4E00\u79CD\u5F3A\u786C\u7684\u65B9\u5F0F\u8BA9\u7528\u6237\u77E5\u9053\uFF0C\u6570\u636E\u6CA1\u80FD\u6B63\u786E\u7684\u5728\u78C1\u76D8\u4E0A\u8FDB\u884C\u6301\u4E45\u5316
#
# If the background saving process will start working again Redis will
# automatically allow writes again.
# \u5982\u679C\u540E\u53F0\u6267\u884C\u4FDD\u5B58\u5DE5\u4F5C\u7684\u8FDB\u7A0B\u91CD\u65B0\u8FD0\u884C\uFF0CRedis \u4F1A\u91CD\u65B0\u81EA\u52A8\u5141\u8BB8\u5199\u64CD\u4F5C\u53D1\u751F
#
# However if you have setup your proper monitoring of the Redis server
# and persistence, you may want to disable this feature so that Redis will
# continue to work as usual even if there are problems with disk,
# permissions, and so forth.
# \u5982\u679C\u8BBE\u7F6E\u4E86\u81EA\u5B9A\u4E49\u7684\u76D1\u89C6\u5668\u6765\u76D1\u89C6 Redis \u670D\u52A1\u5668\u7684\u6301\u4E45\u5316\uFF0C\u5C06\u6B64\u529F\u80FD\u5173\u95ED\u540E\uFF0C\u5373\u4F7F
# \u78C1\u76D8\u5199\u5165\u51FA\u73B0\u95EE\u9898 Redis \u4E5F\u4F1A\u7167\u5E38\u5DE5\u4F5C
stop-writes-on-bgsave-error yes
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><h4 id="\u538B\u7F29\u4E0E\u6821\u9A8C" tabindex="-1">\u538B\u7F29\u4E0E\u6821\u9A8C <a class="header-anchor" href="#\u538B\u7F29\u4E0E\u6821\u9A8C" aria-hidden="true">#</a></h4><div class="language-"><pre><code># Compress string objects using LZF when dump .rdb databases?
# \u542F\u52A8 LZF \u538B\u7F29\u7B97\u6CD5
# By default compression is enabled as it&#39;s almost always a win.
# If you want to save some CPU in the saving child set it to &#39;no&#39; but
# the dataset will likely be bigger if you have compressible values or keys.
rdbcompression yes

# RDB \u6587\u4EF6\u6821\u9A8C\u7801\uFF0C\u4E00\u822C\u51FA\u73B0\u5728 RDB \u6587\u4EF6\u7684\u5C3E\u90E8
# Since version 5 of RDB a CRC64 checksum is placed at the end of the file.
# This makes the format more resistant to corruption but there is a performance
# hit to pay (around 10%) when saving and loading RDB files, so you can disable it
# for maximum performances.
# \u5728\u4FDD\u8BC1\u6587\u4EF6\u5B8C\u6574\u6027\u548C\u51C6\u786E\u6027\u4E0A\u6709\u5F88\u5927\u4FDD\u8BC1\uFF0C\u4F46\u662F\u5728\u4FDD\u5B58 RDB \u6587\u4EF6\u7684\u65F6\u5019\u4F1A\u591A\u5927\u7EA6 10% \u7684\u6027\u80FD\u635F\u8017
# \u53EF\u5C06\u5176\u7981\u7528\u4EE5\u83B7\u5F97\u66F4\u7684\u9AD8\u6027\u80FD
#
# RDB files created with checksum disabled have a checksum of zero that will
# tell the loading code to skip the check.
# \u5C06\u6821\u9A8C\u5173\u95ED\u540E\uFF0CRDB \u6587\u4EF6\u5C3E\u90E8\u4F1A\u4F7F\u7528 0 \u6765\u4F5C\u4E3A\u6807\u8BC6\uFF0C\u52A0\u8F7D\u5230\u62E5\u6709 0 \u6807\u8BC6\u7684\u6587\u4EF6\u65F6\u4F1A\u8DF3\u8FC7\u6821\u9A8C
rdbchecksum yes
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><h3 id="aof" tabindex="-1">AOF <a class="header-anchor" href="#aof" aria-hidden="true">#</a></h3><blockquote><p>By default Redis asynchronously dumps the dataset on disk. This mode is good enough in many applications, but an issue with the Redis process or a power outage may result into a few minutes of writes lost (depending on the configured save points).</p><p>Redis \u8FDB\u7A0B\u6216\u8005\u670D\u52A1\u5668\u65AD\u7535\u7B49\u95EE\u9898\u4F1A\u5BFC\u81F4\u5B58\u5728\u51E0\u5206\u949F\u7684\u6570\u636E\u4E22\u5931</p><p>The Append Only File is an alternative persistence mode that provides much better durability. For instance using the default data fsync policy Redis can lose just one second of writes in a dramatic event like a server power outage, or a single write if something wrong with the Redis process itself happens, but the operating system is still running correctly.</p><p>AOF \u53EF\u4EE5\u63D0\u4F9B\u4E00\u4E2A\u66F4\u52A0\u5B8C\u5584\u7684\u6301\u4E45\u5316\u65B9\u5F0F\uFF0C\u5BF9\u4E8E\u9ED8\u8BA4\u4F7F\u7528 <code>fsync</code> \u7B56\u7565\u7684 Redis \u670D\u52A1\u5668\uFF0C\u5728\u9047\u5230\u670D\u52A1\u5668\u65AD\u7535\u6216\u8005\u5355\u4E2A\u5199\u7A0B\u5E8F\u7EBF\u7A0B\u5728\u9047\u5230\u95EE\u9898\u65F6\uFF0C\u4EC5\u4F1A\u4E22\u5931\u51E0\u79D2\u949F\u7684\u6570\u636E</p><p>AOF and RDB persistence can be enabled at the same time without problems. If the AOF is enabled on startup Redis will load the AOF, that is the file with the better durability guarantees.</p><p>AOF \u548C RDB \u6301\u4E45\u5316\u53EF\u540C\u65F6\u5F00\u542F\uFF0C\u5728 Redis \u542F\u52A8\u65F6\uFF0C\u5982\u679C\u540C\u65F6\u5B58\u5728 AOF \u548C RDB \u6570\u636E\uFF0C\u4F1A\u4F18\u5148\u9009\u62E9\u4F7F\u7528 AOF \u6301\u4E45\u5316\u7684\u6570\u636E\u6765\u6062\u590D\uFF0C\u56E0\u4E3A AOF \u5177\u6709\u66F4\u597D\u7684\u6570\u636E\u6301\u4E45\u5316\u4FDD\u8BC1</p></blockquote><p>\u5728 Redis \u4E2D\u914D\u7F6E <code>appendonly &lt;yes|no&gt;</code> \u6765\u4FEE\u6539 AOF \u72B6\u6001\u3002</p><h4 id="\u540C\u6B65\u7B56\u7565-1" tabindex="-1">\u540C\u6B65\u7B56\u7565 <a class="header-anchor" href="#\u540C\u6B65\u7B56\u7565-1" aria-hidden="true">#</a></h4><p>\u5F53 Redis \u5F00\u542F AOF \u6301\u4E45\u5316\u65F6\uFF0CRedis \u4F1A\u5C06\u6240\u6709\u7684\u5199\u547D\u4EE4\u4EE5\u65E5\u5FD7\u7684\u5F62\u5F0F\u8FFD\u52A0\u5230 AOF \u6587\u4EF6\u4E2D\u3002\u5F53 AOF \u6587\u4EF6\u8FC7\u5927\u65F6\uFF0CRedis \u4F1A\u542F\u52A8 AOF \u91CD\u5199\u64CD\u4F5C\uFF0C\u4EE5\u6B64\u6765\u538B\u7F29 AOF \u6587\u4EF6\u3002AOF \u91CD\u5199\u7684\u8FC7\u7A0B\u662F\u5C06\u5185\u5B58\u4E2D\u7684\u6570\u636E\u5E93\u72B6\u6001\u5199\u5165\u5230\u65B0\u7684 AOF \u6587\u4EF6\u4E2D\u3002\u5728\u8FD9\u4E2A\u8FC7\u7A0B\u4E2D\uFF0CRedis \u53EF\u4EE5\u91C7\u7528\u4E24\u79CD\u540C\u6B65\u7B56\u7565\uFF1A</p><ul><li>\u6BCF\u6B21\u5199\u5165 AOF \u6587\u4EF6\u65F6\uFF0C\u90FD\u8FDB\u884C\u4E00\u6B21 fsync \u64CD\u4F5C\uFF0C\u5C06\u7F13\u51B2\u533A\u7684\u6570\u636E\u5237\u5165\u78C1\u76D8\u3002\u8FD9\u79CD\u65B9\u5F0F\u4F1A\u4FDD\u8BC1 AOF \u6587\u4EF6\u7684\u6301\u4E45\u5316\u548C\u5B89\u5168\u6027\uFF0C\u4F46\u662F\u4F1A\u5BFC\u81F4\u5199\u5165\u6027\u80FD\u4E0B\u964D\u3002</li><li>Redis \u4ECE\u4E0A\u6B21 fsync \u64CD\u4F5C\u4EE5\u6765\uFF0C\u7D2F\u8BA1\u5199\u5165\u4E00\u5B9A\u6570\u91CF\u7684\u6570\u636E\u540E\uFF0C\u624D\u8FDB\u884C\u4E00\u6B21 fsync \u64CD\u4F5C\u3002\u8FD9\u79CD\u65B9\u5F0F\u4F1A\u63D0\u9AD8\u5199\u5165\u6027\u80FD\uFF0C\u4F46\u662F\u4F1A\u5E26\u6765\u6570\u636E\u5B89\u5168\u6027\u7684\u98CE\u9669\u3002\u56E0\u4E3A\u5728 fsync \u4E4B\u524D\uFF0C\u6570\u636E\u4EC5\u505C\u7559\u5728\u7F13\u51B2\u533A\u4E2D\uFF0C\u5982\u679C\u7CFB\u7EDF\u51FA\u73B0\u5B95\u673A\u7B49\u5F02\u5E38\u60C5\u51B5\uFF0C\u90A3\u4E48\u8FD9\u90E8\u5206\u6570\u636E\u5C31\u4F1A\u4E22\u5931\u3002</li></ul><blockquote><p>The <code>fsync()</code> call tells the Operating System to actually write data on disk instead of waiting for more data in the output buffer. Some OS will really flush data on disk, some other OS will just try to do it ASAP.</p><p>Redis supports three different modes:</p><ul><li>no: don&#39;t fsync, just let the OS flush the data when it wants. Faster.</li><li>always: fsync after every write to the append only log. Slow, Safest.</li><li>everysec: fsync only one time every second. Compromise.</li></ul><p>The default is &quot;everysec&quot;, as that&#39;s usually the right compromise between speed and data safety. It&#39;s up to you to understand if you can relax this to &quot;no&quot; that will let the operating system flush the output buffer when it wants, for better performances (but if you can live with the idea of some data loss consider the default persistence mode that&#39;s snapshotting), or on the contrary, use &quot;always&quot; that&#39;s very slow but a bit safer than everysec.</p><p><code>#appendfsync always</code></p><p><code>appendfsync everysec</code></p><p><code>#appendfsync no</code></p><p>\u8C03\u7528 <code>fsync()</code> \uFF08Append-only file sync\uFF09\u4F1A\u8BA9\u64CD\u4F5C\u7CFB\u7EDF\u5C06 AOF \u6587\u4EF6\u76F4\u63A5\u5199\u5230\u78C1\u76D8\u4E0A\uFF0C\u65E0\u9700\u7B49\u7F13\u5B58\u4E2D\u6709\u8DB3\u591F AOF \u6587\u4EF6\u6570\u636E\u518D\u8F6C\u5B58\u81F3\u78C1\u76D8\uFF08\u4E0D\u540C\u7684\u64CD\u4F5C\u7CFB\u7EDF\u4F1A\u6709\u4E0D\u540C\u7684\u54CD\u5E94\uFF0C\u6709\u4E9B\u64CD\u4F5C\u7CFB\u7EDF\u76F4\u63A5\u5199\u5165\u78C1\u76D8\uFF0C\u800C\u6709\u4E9B\u64CD\u4F5C\u7CFB\u7EDF\u53EA\u662F\u5C1D\u8BD5\u5C3D\u91CF\u8FD9\u6837\u505A\uFF09</p><p><code>appendfsync</code> \u9009\u9879\u51B3\u5B9A\u4E86\u5199\u547D\u4EE4\u88AB\u8FFD\u52A0\u5230 AOF \u6587\u4EF6\u540E\u662F\u5426\u9700\u8981\u7ACB\u5373\u540C\u6B65\u5230\u78C1\u76D8\uFF1A</p><ul><li>no \u4E0D\u4F1A\u6267\u884C\u540C\u6B65\u64CD\u4F5C\uFF0C\u8BA9\u7CFB\u7EDF\u51B3\u5B9A\u4F55\u65F6\u5C06 AOF \u6587\u4EF6\u540C\u6B65\u5230\u78C1\u76D8</li><li>always \u6BCF\u6B21\u5199\u547D\u4EE4\u88AB\u8FFD\u52A0\u5230 AOF \u6587\u4EF6\u540E\u90FD\u4F1A\u7ACB\u5373\u540C\u6B65\u5230\u78C1\u76D8</li><li>everysec \u6BCF\u79D2\u949F\u4F1A\u6267\u884C\u4E00\u6B21\u540C\u6B65\u64CD\u4F5C</li></ul></blockquote><blockquote><p>When the AOF fsync policy is set to always or everysec, and a background saving process (a background save or AOF log background rewriting) is performing a lot of I/O against the disk, in some Linux configurations Redis may block too long on the fsync() call. Note that there is no fix for this currently, as even performing fsync in a different thread will block our synchronous write(2) call.</p><p>\u5F53 AOF \u6587\u4EF6\u540C\u6B65\u7B56\u7565\u8BBE\u7F6E\u4E3A <em>always</em> \u6216 <em>everysec</em>\uFF0C\u4E14\u5B58\u5728\u4E00\u4E2A\u540E\u53F0\u8FDB\u7A0B\u6B63\u5728\u6267\u884C\u5927\u91CF\u7684\u78C1\u76D8 IO \u64CD\u4F5C\uFF0C\u5728\u67D0\u4E9B Linux \u4E0A Redis \u53EF\u80FD\u4F1A\u5728\u8C03\u7528 <code>fsync</code> \u65F6\u963B\u585E\u5F88\u957F\u7684\u65F6\u95F4\u3002\u76EE\u524D\u8FD8\u6CA1\u6709\u529E\u6CD5\u4FEE\u590D\u3002</p><p>In order to mitigate this problem it&#39;s possible to use the following option that will prevent fsync() from being called in the main process while a BGSAVE or BGREWRITEAOF is in progress.</p><p>\u4E3A\u4E86\u7F13\u89E3\u8FD9\u4E2A\u95EE\u9898\uFF0C\u53EF\u4EE5\u542F\u7528 <code>no-appendfsync-on-rewrite</code> \u963B\u6B62\u4E3B\u7EBF\u7A0B\u5728\u6267\u884C <code>BGSAVE</code> \u6216 <code>BGREWRITEAOF</code> \u7684\u65F6\u5019\u8C03\u7528 <code>fsync</code></p><p>This means that while another child is saving, the durability of Redis is the same as &quot;appendfsync no&quot;. In practical terms, this means that it is possible to lose up to 30 seconds of log in the worst scenario (with the default Linux settings).</p><p>\u5F53\u5B58\u5728\u5B50\u7EBF\u7A0B\u8FDB\u884C\u4FDD\u5B58\u5907\u4EFD\u64CD\u4F5C\u7684\u65F6\u5019 Redis \u7684 AOF \u6587\u4EF6\u540C\u6B65\u7B56\u7565\u76F8\u5F53\u4E8E <code>appendfsync no</code>\uFF0C\u4E5F\u5C31\u662F\u8BF4\u6B64\u65F6\u53EF\u80FD\u4F1A\u4E22\u5931\u5927\u6982 30s \u5DE6\u53F3\u65F6\u95F4\u7684\u6570\u636E</p><p><code>no-appendfsync-on-rewrite no</code></p></blockquote><h4 id="\u521B\u5EFA\u7B56\u7565" tabindex="-1">\u521B\u5EFA\u7B56\u7565 <a class="header-anchor" href="#\u521B\u5EFA\u7B56\u7565" aria-hidden="true">#</a></h4><blockquote><p>Redis can create append-only base files in either RDB or AOF formats. Using the RDB format is always faster and more efficient, and disabling it is only supported for backward compatibility purposes. \u9ED8\u8BA4\u4F7F\u7528 RDB \u6587\u4EF6\u4F5C\u4E3A\u57FA\u51C6\u521B\u5EFA AOF \u6587\u4EF6</p><p><code>aof-use-rdb-preamble yes</code></p><p>Redis supports recording timestamp annotations in the AOF to support restoring the data from a specific point-in-time. However, using this capability changes the AOF format in a way that may not be compatible with existing AOF parsers. \u662F\u5426\u7ED9 AOF \u8BB0\u5F55\u52A0\u65F6\u95F4\u6233\uFF0C\u53EF\u80FD\u5B58\u5728\u517C\u5BB9\u6027\u95EE\u9898</p><p><code>aof-timestamp-enabled no</code></p></blockquote><h4 id="\u540D\u79F0\u4E0E\u8DEF\u5F84-1" tabindex="-1">\u540D\u79F0\u4E0E\u8DEF\u5F84 <a class="header-anchor" href="#\u540D\u79F0\u4E0E\u8DEF\u5F84-1" aria-hidden="true">#</a></h4><p><strong>\u6587\u4EF6\u7C7B\u578B</strong></p><blockquote><p>Redis 7 and newer use a set of append-only files to persist the dataset and changes applied to it. Redis 7 \u4E4B\u540E\u4F7F\u7528\u4E00\u7CFB\u5217\u6587\u4EF6\u6765\u8FDB\u884C\u6570\u636E\u6301\u4E45\u5316\u4EE5\u53CA\u5E94\u7528\u6570\u636E\u66F4\u6539\u3002</p><ul><li><p>Base files, which are a snapshot representing the complete state of the dataset at the time the file was created. Base files can be either in the form of RDB (binary serialized) or AOF (textual commands).</p><p>\u57FA\u7840\u6587\u4EF6\uFF0C\u8868\u793A\u5FEB\u7167\u6587\u4EF6\u521B\u5EFA\u65F6\u6574\u4E2A\u6570\u636E\u5E93\u4E2D\u6570\u636E\u7684\u72B6\u6001\uFF0C\u57FA\u7840\u6587\u4EF6\u53EF\u4EE5\u662F RDB \u5F62\u5F0F\u7684\u6587\u4EF6\uFF0C\u4E5F\u53EF\u4EE5\u662F AOF \u6587\u4EF6</p></li><li><p>Incremental files, which contain additional commands that were applied to the dataset following the previous file.</p><p>\u589E\u91CF\u6587\u4EF6\uFF0C\u5305\u542B\u5BF9\u57FA\u7840\u6587\u4EF6\u4E4B\u540E\u9488\u5BF9\u6570\u636E\u96C6\u64CD\u4F5C\u7684\u9644\u52A0\u547D\u4EE4</p></li></ul></blockquote><p><strong>\u6587\u4EF6\u540D\u79F0</strong></p><blockquote><p>Append-only file names are created by Redis following a specific pattern. The file name&#39;s prefix is based on the &#39;appendfilename&#39; configuration parameter, followed by additional information about the sequence and type.</p><p><code>appendfilename &quot;appendonly.aof&quot;</code></p><p>For example, if appendfilename is set to appendonly.aof, the following file names could be derived:</p><p>---- appendonly.aof.1.base.rdb as a base file.</p><p>----- appendonly.aof.1.incr.aof, appendonly.aof.2.incr.aof as incremental files.</p><p>---- appendonly.aof.manifest as a manifest file.</p></blockquote><p><strong>\u6587\u4EF6\u4FDD\u5B58\u8DEF\u5F84</strong></p><blockquote><p>For convenience, Redis stores all persistent append-only files in a dedicated directory. The name of the directory is determined by the appenddirname configuration parameter.</p><p><code>appenddirname &quot;appendonlydir&quot;</code></p></blockquote><h4 id="\u6587\u4EF6\u91CD\u5199" tabindex="-1">\u6587\u4EF6\u91CD\u5199 <a class="header-anchor" href="#\u6587\u4EF6\u91CD\u5199" aria-hidden="true">#</a></h4><blockquote><p>Automatic rewrite of the append only file. Redis is able to automatically rewrite the log file implicitly calling BGREWRITEAOF when the AOF log size grows by the specified percentage.</p><p>\u5728 AOF \u6587\u4EF6\u5927\u5C0F\u589E\u957F\u5230\u6307\u5B9A\u8303\u56F4\u65F6\uFF0CRedis \u80FD\u591F\u901A\u8FC7\u9690\u5F0F\u8C03\u7528 BGREWRITEAOF \u6765\u91CD\u5199 AOF \u6587\u4EF6\u3002</p><p>Redis remembers the size of the AOF file after the latest rewrite (if no rewrite has happened since the restart, the size of the AOF at startup is used).</p><p>This base size is compared to the current size. If the current size is bigger than the specified percentage, the rewrite is triggered. Also you need to specify a minimal size for the AOF file to be rewritten, this is useful to avoid rewriting the AOF file even if the percentage increase is reached but it is still pretty small.</p><p>Redis \u4F1A\u4F7F\u7528\u6700\u65B0\u4E00\u6B21\u91CD\u5199\u65F6 AOF \u6587\u4EF6\u7684\u5927\u5C0F\u6765\u4F5C\u4E3A\u57FA\u51C6\uFF0C\u5982\u679C\u8FD8\u6CA1\u8FDB\u884C\u8FC7\u91CD\u5199\u64CD\u4F5C\uFF0C\u5219\u4F7F\u7528 Redis \u542F\u52A8\u65F6 AOF \u6587\u4EF6\u7684\u5927\u5C0F\u6765\u4F5C\u4E3A\u57FA\u51C6\u3002</p><p>\u7528\u5F53\u524D\u6587\u4EF6\u5927\u4E8E\u6765\u548C\u57FA\u51C6\u5927\u5C0F\u505A\u6BD4\u8F83\uFF0C\u5F53\u524D\u6587\u4EF6\u5927\u5C0F\u8D85\u8FC7\u6307\u5B9A\u9608\u503C\uFF0C\u4E14\u5927\u4E8E\u57FA\u51C6\u5927\u5C0F\u4E58\u4E0A\u5BF9\u5E94\u767E\u5206\u6BD4\uFF0C\u5C31\u4F1A\u89E6\u53D1\u91CD\u5199\u64CD\u4F5C\u3002\u9ED8\u8BA4\u662F\u5F53 AOF \u6587\u4EF6\u5927\u4E8E 64m \u4E14\u5927\u4E8E\u4E0A\u4E00\u6B21\u91CD\u5199\u6587\u4EF6\u7684 2 \u500D\u89E6\u53D1\u91CD\u5199</p><p>Specify a percentage of zero in order to disable the automatic AOF rewrite feature.</p><p><code>auto-aof-rewrite-percentage 100</code><code>auto-aof-rewrite-min-size 64mb</code></p></blockquote><blockquote><p>When a child rewrites the AOF file, if the following option is enabled the file will be fsync-ed every 4 MB of data generated. This is useful in order to commit the file to the disk more incrementally and avoid big latency spikes.</p><p><code>aof-rewrite-incremental-fsync yes</code></p></blockquote><h4 id="\u6587\u4EF6\u6821\u9A8C" tabindex="-1">\u6587\u4EF6\u6821\u9A8C <a class="header-anchor" href="#\u6587\u4EF6\u6821\u9A8C" aria-hidden="true">#</a></h4><blockquote><p>An AOF file may be found to be truncated at the end during the Redis startup process, when the AOF data gets loaded back into memory. This may happen when the system where Redis is running crashes, especially when an ext4 filesystem is mounted without the data=ordered option (however this can&#39;t happen when Redis itself crashes or aborts but the operating system still works correctly).</p><p>Redis can either exit with an error when this happens, or load as much data as possible (the default now) and start if the AOF file is found to be truncated at the end. The following option controls this behavior.</p><p>If aof-load-truncated is set to yes, a truncated AOF file is loaded and the Redis server starts emitting a log to inform the user of the event. Otherwise if the option is set to no, the server aborts with an error and refuses to start. When the option is set to no, the user requires to fix the AOF file using the &quot;redis-check-aof&quot; utility before to restart the server.</p><p>Note that if the AOF file will be found to be corrupted in the middle, the server will still exit with an error. This option only applies when Redis will try to read more data from the AOF file but not enough bytes will be found.</p><p><code>aof-load-truncated yes</code></p><p>Redis \u542F\u52A8\u8FC7\u7A0B\u4E2D\uFF0C\u5C06 AOF \u6570\u636E\u52A0\u8F7D\u56DE\u5185\u5B58\u65F6\uFF0C\u53EF\u80FD\u4F1A\u53D1\u73B0 AOF \u6587\u4EF6\u5728\u672B\u5C3E\u88AB\u622A\u65AD\u3002Redis \u53EF\u80FD\u4F1A\u56E0\u6B64\u9000\u51FA\uFF0C\u4E5F\u53EF\u80FD\u7EE7\u7EED\u52A0\u8F7D\u6570\u636E\u5E76\u542F\u52A8\u3002</p><p>\u5982\u679C <code>aof-load-truncated</code> \u8BBE\u7F6E\u4E3A <em>yes</em>\uFF0CRedis \u4F1A\u53D1\u9001\u76F8\u5173\u65E5\u5FD7\u901A\u77E5\u7528\u6237\u6B64\u4E8B\u4EF6\uFF1B\u5426\u5219 Redis \u4F1A\u51FA\u9519\u5E76\u62D2\u7EDD\u542F\u52A8\u3002\u5F53\u8BBE\u7F6E\u4E3A <em>no</em> \u65F6\uFF0C\u9700\u8981\u4F7F\u7528 <code>redis-check-aof</code> \u547D\u4EE4\u4FEE\u590D AOF \u6587\u4EF6\u624D\u80FD\u91CD\u65B0\u542F\u52A8\uFF1B\u5982\u679C\u5728\u52A0\u8F7D AOF \u6587\u4EF6\u65F6\u53D1\u73B0\u6587\u4EF6\u635F\u574F\uFF0CRedis \u670D\u52A1\u4F1A\u62A5\u9519\u5E76\u9000\u51FA\u3002</p></blockquote><br><h2 id="\u5185\u5B58\u7BA1\u7406" tabindex="-1">\u5185\u5B58\u7BA1\u7406 <a class="header-anchor" href="#\u5185\u5B58\u7BA1\u7406" aria-hidden="true">#</a></h2><h3 id="\u5185\u5B58\u56DE\u6536\u7B56\u7565" tabindex="-1">\u5185\u5B58\u56DE\u6536\u7B56\u7565 <a class="header-anchor" href="#\u5185\u5B58\u56DE\u6536\u7B56\u7565" aria-hidden="true">#</a></h3><p>Redis \u8BBE\u7F6E\u6700\u5927\u5185\u5B58\u5BB9\u91CF <code>maxmemory &lt;bytes&gt;</code></p><blockquote><p>When the memory limit is reached Redis will try to remove keys according to the eviction policy selected.</p><p>If Redis can&#39;t remove keys according to the policy, or if the policy is set to <code>noeviction</code>, Redis will start to reply with errors to commands that would use more memory, like SET, LPUSH, and so on, and will continue to reply to read-only commands like GET.</p></blockquote><p><strong>POLICY</strong>:</p><ul><li>volatile-lru\uFF08Least Recently Used\uFF09 -&gt; \u4ECE<strong>\u5DF2\u8BBE\u7F6E\u8FC7\u671F</strong>\u65F6\u95F4\u6570\u636E\u4E2D\u6DD8\u6C70<strong>\u6700\u8FD1\u6700\u5C11\u4F7F\u7528</strong>\u6570\u636E</li><li>allkeys-lru -&gt; \u4ECE<strong>\u6240\u6709</strong>\u6570\u636E\u4E2D\u6DD8\u6C70<strong>\u6700\u8FD1\u6700\u5C11\u4F7F\u7528</strong>\u6570\u636E</li><li>volatile-lfu\uFF08Least Frequently Used\uFF09 -&gt; \u4ECE<strong>\u5DF2\u8BBE\u7F6E\u8FC7\u671F</strong>\u65F6\u95F4\u6570\u636E\u4E2D\u6DD8\u6C70<strong>\u6700\u4E0D\u7ECF\u5E38\u4F7F\u7528</strong>\u6570\u636E</li><li>allkeys-lfu -&gt; \u4ECE<strong>\u6240\u6709</strong>\u6570\u636E\u4E2D\u6DD8\u6C70<strong>\u6700\u4E0D\u7ECF\u5E38\u4F7F\u7528</strong>\u6570\u636E</li><li>volatile-random -&gt; \u4ECE<strong>\u5DF2\u8BBE\u7F6E\u8FC7\u671F</strong>\u65F6\u95F4\u6570\u636E\u4E2D<strong>\u968F\u673A</strong>\u6DD8\u6C70\u6570\u636E</li><li>allkeys-random -&gt; \u4ECE<strong>\u6240\u6709</strong>\u65F6\u95F4\u6570\u636E\u4E2D<strong>\u968F\u673A</strong>\u6DD8\u6C70\u6570\u636E</li><li>volatile-ttl -&gt; \u4ECE<strong>\u5DF2\u8BBE\u7F6E\u8FC7\u671F</strong>\u65F6\u95F4\u6570\u636E\u4E2D\u79FB\u9664\u5C06\u8981\u8FC7\u671F\u6570\u636E</li><li>noeviction -&gt; \u4E0D\u6DD8\u6C70\u6570\u636E\uFF0C\u5199\u5165\u64CD\u4F5C\u62A5\u9519</li></ul><blockquote><p>Both LRU, LFU and volatile-ttl are implemented using approximated randomized algorithms(in order to save memory).</p></blockquote><blockquote><p>By default Redis will check five keys and pick the one that was used least recently, you can change the sample size using the following configuration directive.</p><p>\u9ED8\u8BA4\u4E00\u6B21\u68C0\u67E5 5 \u4E2A key\uFF0C\u4ECE\u5176\u4E2D\u4E00\u4E2A\u9009\u51FA\u6EE1\u8DB3\u7B56\u7565\u7684 key \u5E76\u5C06\u5176\u6DD8\u6C70</p><p>The default of 5 produces good enough results. 10 Approximates very closely true LRU but costs more CPU. 3 is faster but not very accurate.</p></blockquote><h3 id="\u8FC7\u671F\u6570\u636E\u56DE\u6536\u7B56\u7565" tabindex="-1">\u8FC7\u671F\u6570\u636E\u56DE\u6536\u7B56\u7565 <a class="header-anchor" href="#\u8FC7\u671F\u6570\u636E\u56DE\u6536\u7B56\u7565" aria-hidden="true">#</a></h3><ul><li>\u5728\u8BBF\u95EE\u5230\u8FC7\u671F key \u65F6\u5C06\u5176\u5220\u9664\uFF1B</li><li><strong>\u4E3B\u52A8\u56DE\u6536</strong>\uFF0C\u5728\u540E\u53F0\u7F13\u6162\u626B\u63CF\u5BFB\u627E\u8FC7\u671F\u7684 key\uFF0C\u5C31\u53EF\u4EE5\u91CA\u653E\u8FC7\u671F/\u4E0D\u4F1A\u518D\u88AB\u8BBF\u95EE\u5230\u7684 key \u5360\u7528\u7684\u7A7A\u95F4\u3002</li></ul><p>Redis \u7684\u9ED8\u8BA4\u7B56\u7565\u4F1A\u5C3D\u91CF\u907F\u514D\u5185\u5B58\u4E2D\u5B58\u5728\u8D85\u8FC7 10% \u7684\u8FC7\u671F Key\uFF0C\u5E76\u5C3D\u91CF\u907F\u514D\u8FC7\u671F\u7684 Key \u6D88\u8017\u8D85\u8FC7\u603B\u5185\u5B58 25% \u7684\u7A7A\u95F4\u3002</p><h3 id="key-\u5220\u9664\u539F\u8BED" tabindex="-1">Key \u5220\u9664\u539F\u8BED <a class="header-anchor" href="#key-\u5220\u9664\u539F\u8BED" aria-hidden="true">#</a></h3><p>Redis \u4E2D\u6709\u4E24\u4E2A\u5220\u9664 key \u7684\u539F\u8BED\uFF1A</p><ul><li><p>DEL</p><blockquote><p>DEL is a blocking deletion of the object. It means that the server stops processing new commands in order to reclaim all the memory associated with an object in a synchronous way.</p></blockquote><blockquote><p>If the key deleted is associated with a small object, the time needed in order to execute the DEL command is very small and comparable to most other O(1) or O(log_N) commands in Redis. However if the key is associated with an aggregated value containing millions of elements, the server can block for a long time (even seconds) in order to complete the operation.</p></blockquote></li><li><p>UNLINK</p><blockquote><p>For the above reasons Redis also offers non blocking deletion primitives UNLINK (non blocking DEL) and the ASYNC option of FLUSHALL and FLUSHDB commands, in order to reclaim memory in background.</p><p>Those commands are executed in constant time. Another thread will incrementally free the object in the background as fast as possible.</p><p>\u8FD9\u4E9B\u547D\u4EE4\u7531\u4E00\u4E2A\u7EBF\u7A0B\u5728\u4E00\u5B9A\u7684\u65F6\u95F4\u5185\u6267\u884C\uFF0C\u53E6\u4E00\u4E2A\u7EBF\u7A0B\u5728\u540E\u53F0\u5C3D\u53EF\u80FD\u5FEB\u7684\u91CA\u653E\u5185\u5B58</p></blockquote></li></ul><blockquote><p>DEL, UNLINK and ASYNC option of FLUSHALL and FLUSHDB are user-controlled. It&#39;s up to the design of the application to understand when it is a good idea to use one or the other.</p><p>\u4EE5\u4E0A\u5220\u9664\u547D\u4EE4\u662F\u4F9B\u7528\u6237\u4F7F\u7528\u7684\uFF0C\u7531\u5E94\u7528\u5F00\u53D1\u8005\u6765\u51B3\u5B9A\u4F7F\u7528\u4F55\u79CD\u65B9\u5F0F\u3002</p></blockquote><blockquote><p>However the Redis server sometimes has to delete keys or flush the whole database as a side effect of other operations.</p><p>Redis \u670D\u52A1\u5668\u6709\u4E9B\u65F6\u5019\u4E5F\u4F1A\u4E3B\u52A8\u7684\u5220\u9664\u6216\u8005\u6E05\u7A7A\u6574\u4E2A\u6570\u636E\u5E93\u6570\u636E\uFF0C\u7279\u522B\u662F\u4EE5\u4E0B\u8FD9\u4E9B\u573A\u666F\uFF1A</p><p>Specifically Redis deletes objects independently of a user call in the following scenarios:</p><ol><li><p>On eviction, because of the maxmemory and maxmemory policy configurations, in order to make room for new data, without going over the specified memory limit.</p><p>\u8FBE\u5230\u6700\u5927\u5185\u5B58\u9650\u5236</p></li><li><p>Because of expire: when a key with an associated time to live must be deleted from memory.</p><p>\u5F53 key \u8FC7\u671F</p></li><li><p>Because of a side effect of a command that stores data on a key that may already exist. For example the RENAME command may delete the old key content when it is replaced with another one. Similarly SUNIONSTORE or SORT with STORE option may delete existing keys. The SET command itself removes any old content of the specified key in order to replace it with the specified string.</p><p>\u6267\u884C\u76F8\u5173\u7684\u547D\u4EE4\u53EF\u80FD\u4F1A\u5C06\u4EE5\u5B58\u5728\u7684\u6570\u636E\u5220\u9664\uFF0C\u5982 RENAME \u547D\u4EE4\u4F1A\u5C06\u65E7\u7684\u952E\u503C\u5220\u9664\uFF1B\u7C7B\u4F3C\u7684\u8FD8\u6709 SUNIONSTORE \u548C \u5E26\u6709 STORE \u53C2\u6570\u7684 SORT \u547D\u4EE4\u4E5F\u4F1A\u5220\u9664\u5DF2\u5B58\u5728\u7684 key\uFF1B\u5E38\u7528\u7684 SET \u547D\u4EE4\u672C\u8EAB\u4E5F\u4F1A\u5C06\u65E7\u7684\u5185\u5BB9\uFF08\u5982\u679C\u5B58\u5728\uFF09\u5220\u9664\uFF0C\u5E76\u66FF\u6362\u6210\u65B0\u7684\u5185\u5BB9</p></li><li><p>During replication, when a replica performs a full resynchronization with its master, the content of the whole database is removed in order to load the RDB file just transferred.</p><p>\u4ECE\u5E93\u4ECE\u4E3B\u5E93\u63A5\u6536\u5230\u4E00\u4E2A\u5B8C\u6574\u7684 resynchronization \u8BF7\u6C42\u65F6\uFF0C\u6574\u4E2A\u4ECE\u5E93\u7684\u6570\u636E\u90FD\u4F1A\u88AB\u79FB\u9664\uFF0C\u7136\u540E\u91CD\u65B0\u52A0\u8F7D\u521A\u4F20\u8F93\u8FC7\u6765\u7684 RDB \u6587\u4EF6\u6570\u636E</p></li></ol><p>In all the above cases the default is to delete objects in a blocking way, like if DEL was called. However you can configure each case specifically in order to instead release memory in a non-blocking way like if UNLINK was called, using the following configuration directives. \u4EE5\u4E0A\u5220\u9664 Key \u7684\u65B9\u5F0F\u90FD\u662F\u963B\u585E\u8FDB\u884C\u7684</p></blockquote><br><h2 id="\u9AD8\u7EA7\u914D\u7F6E" tabindex="-1">\u9AD8\u7EA7\u914D\u7F6E <a class="header-anchor" href="#\u9AD8\u7EA7\u914D\u7F6E" aria-hidden="true">#</a></h2><h3 id="rehash" tabindex="-1">Rehash <a class="header-anchor" href="#rehash" aria-hidden="true">#</a></h3><blockquote><p>Active rehashing uses 1 millisecond every 100 milliseconds of CPU time in order to help rehashing the main Redis hash table (the one mapping top-level keys to values). The hash table implementation Redis uses (see dict.c) performs a lazy rehashing: the more operation you run into a hash table that is rehashing, the more rehashing &quot;steps&quot; are performed, so if the server is idle the rehashing is never complete and some more memory is used by the hash table.</p><p><code>activerehashing yes</code></p></blockquote><br><h2 id="\u5185\u5B58\u788E\u7247\u6574\u7406" tabindex="-1">\u5185\u5B58\u788E\u7247\u6574\u7406 <a class="header-anchor" href="#\u5185\u5B58\u788E\u7247\u6574\u7406" aria-hidden="true">#</a></h2><h2 id="\u4E3B\u4ECE\u914D\u7F6E" tabindex="-1">\u4E3B\u4ECE\u914D\u7F6E <a class="header-anchor" href="#\u4E3B\u4ECE\u914D\u7F6E" aria-hidden="true">#</a></h2><div class="language-"><pre><code># Master-Replica replication. Use replicaof to make a Redis instance a copy of
# another Redis server. A few things to understand ASAP about Redis replication.
#
#   +------------------+      +---------------+
#   |      Master      | ---&gt; |    Replica    |
#   | (receive writes) |      |  (exact copy) |
#   +------------------+      +---------------+
#
# 1) Redis replication is asynchronous, but you can configure a master to
#    stop accepting writes if it appears to be not connected with at least
#    a given number of replicas.
# 2) Redis replicas are able to perform a partial resynchronization with the
#    master if the replication link is lost for a relatively small amount of
#    time. You may want to configure the replication backlog size (see the next
#    sections of this file) with a sensible value depending on your needs.
# 3) Replication is automatic and does not need user intervention. After a
#    network partition replicas automatically try to reconnect to masters
#    and resynchronize with them.
#
# replicaof &lt;masterip&gt; &lt;masterport&gt;

# If the master is password protected (using the &quot;requirepass&quot; configuration
# directive below) it is possible to tell the replica to authenticate before
# starting the replication synchronization process, otherwise the master will
# refuse the replica request.
#
# masterauth &lt;master-password&gt;
#
# However this is not enough if you are using Redis ACLs (for Redis version
# 6 or greater), and the default user is not capable of running the PSYNC
# command and/or other commands needed for replication. In this case it&#39;s
# better to configure a special user to use with replication, and specify the
# masteruser configuration as such:
#
# masteruser &lt;username&gt;
#
# When masteruser is specified, the replica will authenticate against its
# master using the new AUTH form: AUTH &lt;username&gt; &lt;password&gt;.

# When a replica loses its connection with the master, or when the replication
# is still in progress, the replica can act in two different ways:
#
# 1) if replica-serve-stale-data is set to &#39;yes&#39; (the default) the replica will
#    still reply to client requests, possibly with out of date data, or the
#    data set may just be empty if this is the first synchronization.
#
# 2) If replica-serve-stale-data is set to &#39;no&#39; the replica will reply with error
#    &quot;MASTERDOWN Link with MASTER is down and replica-serve-stale-data is set to &#39;no&#39;&quot;
#    to all data access commands, excluding commands such as:
#    INFO, REPLICAOF, AUTH, SHUTDOWN, REPLCONF, ROLE, CONFIG, SUBSCRIBE,
#    UNSUBSCRIBE, PSUBSCRIBE, PUNSUBSCRIBE, PUBLISH, PUBSUB, COMMAND, POST,
#    HOST and LATENCY.
#
replica-serve-stale-data yes

# You can configure a replica instance to accept writes or not. Writing against
# a replica instance may be useful to store some ephemeral data (because data
# written on a replica will be easily deleted after resync with the master) but
# may also cause problems if clients are writing to it because of a
# misconfiguration.
#
# Since Redis 2.6 by default replicas are read-only.
#
# Note: read only replicas are not designed to be exposed to untrusted clients
# on the internet. It&#39;s just a protection layer against misuse of the instance.
# Still a read only replica exports by default all the administrative commands
# such as CONFIG, DEBUG, and so forth. To a limited extent you can improve
# security of read only replicas using &#39;rename-command&#39; to shadow all the
# administrative / dangerous commands.
replica-read-only yes

# Replication SYNC strategy: disk or socket.
#
# New replicas and reconnecting replicas that are not able to continue the
# replication process just receiving differences, need to do what is called a
# &quot;full synchronization&quot;. An RDB file is transmitted from the master to the
# replicas.
#
# The transmission can happen in two different ways:
#
# 1) Disk-backed: The Redis master creates a new process that writes the RDB
#                 file on disk. Later the file is transferred by the parent
#                 process to the replicas incrementally.
# 2) Diskless: The Redis master creates a new process that directly writes the
#              RDB file to replica sockets, without touching the disk at all.
#
# With disk-backed replication, while the RDB file is generated, more replicas
# can be queued and served with the RDB file as soon as the current child
# producing the RDB file finishes its work. With diskless replication instead
# once the transfer starts, new replicas arriving will be queued and a new
# transfer will start when the current one terminates.
#
# When diskless replication is used, the master waits a configurable amount of
# time (in seconds) before starting the transfer in the hope that multiple
# replicas will arrive and the transfer can be parallelized.
#
# With slow disks and fast (large bandwidth) networks, diskless replication
# works better.
repl-diskless-sync yes

# When diskless replication is enabled, it is possible to configure the delay
# the server waits in order to spawn the child that transfers the RDB via socket
# to the replicas.
#
# This is important since once the transfer starts, it is not possible to serve
# new replicas arriving, that will be queued for the next RDB transfer, so the
# server waits a delay in order to let more replicas arrive.
#
# The delay is specified in seconds, and by default is 5 seconds. To disable
# it entirely just set it to 0 seconds and the transfer will start ASAP.
repl-diskless-sync-delay 5

# When diskless replication is enabled with a delay, it is possible to let
# the replication start before the maximum delay is reached if the maximum
# number of replicas expected have connected. Default of 0 means that the
# maximum is not defined and Redis will wait the full delay.
repl-diskless-sync-max-replicas 0

# -----------------------------------------------------------------------------
# WARNING: RDB diskless load is experimental. Since in this setup the replica
# does not immediately store an RDB on disk, it may cause data loss during
# failovers. RDB diskless load + Redis modules not handling I/O reads may also
# cause Redis to abort in case of I/O errors during the initial synchronization
# stage with the master. Use only if you know what you are doing.
# -----------------------------------------------------------------------------
#
# Replica can load the RDB it reads from the replication link directly from the
# socket, or store the RDB to a file and read that file after it was completely
# received from the master.
#
# In many cases the disk is slower than the network, and storing and loading
# the RDB file may increase replication time (and even increase the master&#39;s
# Copy on Write memory and replica buffers).
# However, parsing the RDB file directly from the socket may mean that we have
# to flush the contents of the current database before the full rdb was
# received. For this reason we have the following options:
#
# &quot;disabled&quot;    - Don&#39;t use diskless load (store the rdb file to the disk first)
# &quot;on-empty-db&quot; - Use diskless load only when it is completely safe.
# &quot;swapdb&quot;      - Keep current db contents in RAM while parsing the data directly
#                 from the socket. Replicas in this mode can keep serving current
#                 data set while replication is in progress, except for cases where
#                 they can&#39;t recognize master as having a data set from same
#                 replication history.
#                 Note that this requires sufficient memory, if you don&#39;t have it,
#                 you risk an OOM kill.
repl-diskless-load disabled

# Master send PINGs to its replicas in a predefined interval. It&#39;s possible to
# change this interval with the repl_ping_replica_period option. The default
# value is 10 seconds.
#
# repl-ping-replica-period 10

# The following option sets the replication timeout for:
#
# 1) Bulk transfer I/O during SYNC, from the point of view of replica.
# 2) Master timeout from the point of view of replicas (data, pings).
# 3) Replica timeout from the point of view of masters (REPLCONF ACK pings).
#
# It is important to make sure that this value is greater than the value
# specified for repl-ping-replica-period otherwise a timeout will be detected
# every time there is low traffic between the master and the replica. The default
# value is 60 seconds.
#
# repl-timeout 60

# Disable TCP_NODELAY on the replica socket after SYNC?
#
# If you select &quot;yes&quot; Redis will use a smaller number of TCP packets and
# less bandwidth to send data to replicas. But this can add a delay for
# the data to appear on the replica side, up to 40 milliseconds with
# Linux kernels using a default configuration.
#
# If you select &quot;no&quot; the delay for data to appear on the replica side will
# be reduced but more bandwidth will be used for replication.
#
# By default we optimize for low latency, but in very high traffic conditions
# or when the master and replicas are many hops away, turning this to &quot;yes&quot; may
# be a good idea.
repl-disable-tcp-nodelay no

# Set the replication backlog size. The backlog is a buffer that accumulates
# replica data when replicas are disconnected for some time, so that when a
# replica wants to reconnect again, often a full resync is not needed, but a
# partial resync is enough, just passing the portion of data the replica
# missed while disconnected.
#
# The bigger the replication backlog, the longer the replica can endure the
# disconnect and later be able to perform a partial resynchronization.
#
# The backlog is only allocated if there is at least one replica connected.
#
# repl-backlog-size 1mb

# After a master has no connected replicas for some time, the backlog will be
# freed. The following option configures the amount of seconds that need to
# elapse, starting from the time the last replica disconnected, for the backlog
# buffer to be freed.
#
# Note that replicas never free the backlog for timeout, since they may be
# promoted to masters later, and should be able to correctly &quot;partially
# resynchronize&quot; with other replicas: hence they should always accumulate backlog.
#
# A value of 0 means to never release the backlog.
#
# repl-backlog-ttl 3600

# The replica priority is an integer number published by Redis in the INFO
# output. It is used by Redis Sentinel in order to select a replica to promote
# into a master if the master is no longer working correctly.
#
# A replica with a low priority number is considered better for promotion, so
# for instance if there are three replicas with priority 10, 100, 25 Sentinel
# will pick the one with priority 10, that is the lowest.
#
# However a special priority of 0 marks the replica as not able to perform the
# role of master, so a replica with priority of 0 will never be selected by
# Redis Sentinel for promotion.
#
# By default the priority is 100.
replica-priority 100

# The propagation error behavior controls how Redis will behave when it is
# unable to handle a command being processed in the replication stream from a master
# or processed while reading from an AOF file. Errors that occur during propagation
# are unexpected, and can cause data inconsistency. However, there are edge cases
# in earlier versions of Redis where it was possible for the server to replicate or persist
# commands that would fail on future versions. For this reason the default behavior
# is to ignore such errors and continue processing commands.
#
# If an application wants to ensure there is no data divergence, this configuration
# should be set to &#39;panic&#39; instead. The value can also be set to &#39;panic-on-replicas&#39;
# to only panic when a replica encounters an error on the replication stream. One of
# these two panic values will become the default value in the future once there are
# sufficient safety mechanisms in place to prevent false positive crashes.
#
# propagation-error-behavior ignore

# Replica ignore disk write errors controls the behavior of a replica when it is
# unable to persist a write command received from its master to disk. By default,
# this configuration is set to &#39;no&#39; and will crash the replica in this condition.
# It is not recommended to change this default, however in order to be compatible
# with older versions of Redis this config can be toggled to &#39;yes&#39; which will just
# log a warning and execute the write command it got from the master.
#
# replica-ignore-disk-write-errors no

# -----------------------------------------------------------------------------
# By default, Redis Sentinel includes all replicas in its reports. A replica
# can be excluded from Redis Sentinel&#39;s announcements. An unannounced replica
# will be ignored by the &#39;sentinel replicas &lt;master&gt;&#39; command and won&#39;t be
# exposed to Redis Sentinel&#39;s clients.
#
# This option does not change the behavior of replica-priority. Even with
# replica-announced set to &#39;no&#39;, the replica can be promoted to master. To
# prevent this behavior, set replica-priority to 0.
#
# replica-announced yes

# It is possible for a master to stop accepting writes if there are less than
# N replicas connected, having a lag less or equal than M seconds.
#
# The N replicas need to be in &quot;online&quot; state.
#
# The lag in seconds, that must be &lt;= the specified value, is calculated from
# the last ping received from the replica, that is usually sent every second.
#
# This option does not GUARANTEE that N replicas will accept the write, but
# will limit the window of exposure for lost writes in case not enough replicas
# are available, to the specified number of seconds.
#
# For example to require at least 3 replicas with a lag &lt;= 10 seconds use:
#
# min-replicas-to-write 3
# min-replicas-max-lag 10
#
# Setting one or the other to 0 disables the feature.
#
# By default min-replicas-to-write is set to 0 (feature disabled) and
# min-replicas-max-lag is set to 10.

# A Redis master is able to list the address and port of the attached
# replicas in different ways. For example the &quot;INFO replication&quot; section
# offers this information, which is used, among other tools, by
# Redis Sentinel in order to discover replica instances.
# Another place where this info is available is in the output of the
# &quot;ROLE&quot; command of a master.
#
# The listed IP address and port normally reported by a replica is
# obtained in the following way:
#
#   IP: The address is auto detected by checking the peer address
#   of the socket used by the replica to connect with the master.
#
#   Port: The port is communicated by the replica during the replication
#   handshake, and is normally the port that the replica is using to
#   listen for connections.
#
# However when port forwarding or Network Address Translation (NAT) is
# used, the replica may actually be reachable via different IP and port
# pairs. The following two options can be used by a replica in order to
# report to its master a specific set of IP and port, so that both INFO
# and ROLE will report those values.
#
# There is no need to use both the options if you need to override just
# the port or the IP address.
#
# replica-announce-ip 5.5.5.5
# replica-announce-port 1234
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br><span class="line-number">128</span><br><span class="line-number">129</span><br><span class="line-number">130</span><br><span class="line-number">131</span><br><span class="line-number">132</span><br><span class="line-number">133</span><br><span class="line-number">134</span><br><span class="line-number">135</span><br><span class="line-number">136</span><br><span class="line-number">137</span><br><span class="line-number">138</span><br><span class="line-number">139</span><br><span class="line-number">140</span><br><span class="line-number">141</span><br><span class="line-number">142</span><br><span class="line-number">143</span><br><span class="line-number">144</span><br><span class="line-number">145</span><br><span class="line-number">146</span><br><span class="line-number">147</span><br><span class="line-number">148</span><br><span class="line-number">149</span><br><span class="line-number">150</span><br><span class="line-number">151</span><br><span class="line-number">152</span><br><span class="line-number">153</span><br><span class="line-number">154</span><br><span class="line-number">155</span><br><span class="line-number">156</span><br><span class="line-number">157</span><br><span class="line-number">158</span><br><span class="line-number">159</span><br><span class="line-number">160</span><br><span class="line-number">161</span><br><span class="line-number">162</span><br><span class="line-number">163</span><br><span class="line-number">164</span><br><span class="line-number">165</span><br><span class="line-number">166</span><br><span class="line-number">167</span><br><span class="line-number">168</span><br><span class="line-number">169</span><br><span class="line-number">170</span><br><span class="line-number">171</span><br><span class="line-number">172</span><br><span class="line-number">173</span><br><span class="line-number">174</span><br><span class="line-number">175</span><br><span class="line-number">176</span><br><span class="line-number">177</span><br><span class="line-number">178</span><br><span class="line-number">179</span><br><span class="line-number">180</span><br><span class="line-number">181</span><br><span class="line-number">182</span><br><span class="line-number">183</span><br><span class="line-number">184</span><br><span class="line-number">185</span><br><span class="line-number">186</span><br><span class="line-number">187</span><br><span class="line-number">188</span><br><span class="line-number">189</span><br><span class="line-number">190</span><br><span class="line-number">191</span><br><span class="line-number">192</span><br><span class="line-number">193</span><br><span class="line-number">194</span><br><span class="line-number">195</span><br><span class="line-number">196</span><br><span class="line-number">197</span><br><span class="line-number">198</span><br><span class="line-number">199</span><br><span class="line-number">200</span><br><span class="line-number">201</span><br><span class="line-number">202</span><br><span class="line-number">203</span><br><span class="line-number">204</span><br><span class="line-number">205</span><br><span class="line-number">206</span><br><span class="line-number">207</span><br><span class="line-number">208</span><br><span class="line-number">209</span><br><span class="line-number">210</span><br><span class="line-number">211</span><br><span class="line-number">212</span><br><span class="line-number">213</span><br><span class="line-number">214</span><br><span class="line-number">215</span><br><span class="line-number">216</span><br><span class="line-number">217</span><br><span class="line-number">218</span><br><span class="line-number">219</span><br><span class="line-number">220</span><br><span class="line-number">221</span><br><span class="line-number">222</span><br><span class="line-number">223</span><br><span class="line-number">224</span><br><span class="line-number">225</span><br><span class="line-number">226</span><br><span class="line-number">227</span><br><span class="line-number">228</span><br><span class="line-number">229</span><br><span class="line-number">230</span><br><span class="line-number">231</span><br><span class="line-number">232</span><br><span class="line-number">233</span><br><span class="line-number">234</span><br><span class="line-number">235</span><br><span class="line-number">236</span><br><span class="line-number">237</span><br><span class="line-number">238</span><br><span class="line-number">239</span><br><span class="line-number">240</span><br><span class="line-number">241</span><br><span class="line-number">242</span><br><span class="line-number">243</span><br><span class="line-number">244</span><br><span class="line-number">245</span><br><span class="line-number">246</span><br><span class="line-number">247</span><br><span class="line-number">248</span><br><span class="line-number">249</span><br><span class="line-number">250</span><br><span class="line-number">251</span><br><span class="line-number">252</span><br><span class="line-number">253</span><br><span class="line-number">254</span><br><span class="line-number">255</span><br><span class="line-number">256</span><br><span class="line-number">257</span><br><span class="line-number">258</span><br><span class="line-number">259</span><br><span class="line-number">260</span><br><span class="line-number">261</span><br><span class="line-number">262</span><br><span class="line-number">263</span><br><span class="line-number">264</span><br><span class="line-number">265</span><br><span class="line-number">266</span><br><span class="line-number">267</span><br><span class="line-number">268</span><br><span class="line-number">269</span><br><span class="line-number">270</span><br><span class="line-number">271</span><br><span class="line-number">272</span><br><span class="line-number">273</span><br><span class="line-number">274</span><br><span class="line-number">275</span><br><span class="line-number">276</span><br><span class="line-number">277</span><br><span class="line-number">278</span><br><span class="line-number">279</span><br><span class="line-number">280</span><br><span class="line-number">281</span><br><span class="line-number">282</span><br><span class="line-number">283</span><br><span class="line-number">284</span><br><span class="line-number">285</span><br><span class="line-number">286</span><br><span class="line-number">287</span><br><span class="line-number">288</span><br><span class="line-number">289</span><br><span class="line-number">290</span><br><span class="line-number">291</span><br><span class="line-number">292</span><br><span class="line-number">293</span><br><span class="line-number">294</span><br><span class="line-number">295</span><br><span class="line-number">296</span><br><span class="line-number">297</span><br><span class="line-number">298</span><br><span class="line-number">299</span><br><span class="line-number">300</span><br><span class="line-number">301</span><br><span class="line-number">302</span><br><span class="line-number">303</span><br><span class="line-number">304</span><br><span class="line-number">305</span><br><span class="line-number">306</span><br><span class="line-number">307</span><br><span class="line-number">308</span><br><span class="line-number">309</span><br><span class="line-number">310</span><br></div></div><h2 id="\u96C6\u7FA4\u914D\u7F6E" tabindex="-1">\u96C6\u7FA4\u914D\u7F6E <a class="header-anchor" href="#\u96C6\u7FA4\u914D\u7F6E" aria-hidden="true">#</a></h2><br><h2 id="\u53C2\u8003" tabindex="-1">\u53C2\u8003 <a class="header-anchor" href="#\u53C2\u8003" aria-hidden="true">#</a></h2><p><a href="https://redis.io/topics/persistence" target="_blank" rel="noopener noreferrer">Redis#persistence</a></p>`,68),c=e("a",{href:"http://antirez.com/post/redis-persistence-demystified.html",target:"_blank",rel:"noopener noreferrer"},"redis-persistence-demystified",-1);function d(b,u,h,m,f,y){const n=t("Catalog");return l(),a("div",null,[p,e("p",null,[c,i(n)])])}var v=s(o,[["render",d]]);export{w as __pageData,v as default};
