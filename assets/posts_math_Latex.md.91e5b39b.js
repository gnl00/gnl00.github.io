import{_ as t,o as d,c as e,Q as o}from"./chunks/framework.519d889f.js";const u=JSON.parse('{"title":"LateX","description":"LateX 常用语法","frontmatter":{"description":"LateX 常用语法","tag":["LateX"]},"headers":[],"relativePath":"posts/math/Latex.md","filePath":"posts/math/Latex.md","lastUpdated":1699262313000}'),r={name:"posts/math/Latex.md"},a=o('<h1 id="latex" tabindex="-1">LateX <a class="header-anchor" href="#latex" aria-label="Permalink to &quot;LateX&quot;">​</a></h1><h2 id="语法" tabindex="-1">语法 <a class="header-anchor" href="#语法" aria-label="Permalink to &quot;语法&quot;">​</a></h2><h3 id="显示样式" tabindex="-1">显示样式 <a class="header-anchor" href="#显示样式" aria-label="Permalink to &quot;显示样式&quot;">​</a></h3><ul><li><p><strong>单行</strong>公式 <code>$内容$</code></p><p>$ f(x) = a + b $</p></li><li><p><strong>多行</strong>公式 <code>$$ 内容 内容 $$</code> $$ 原函数 \\ y = f(x) 反函数 \\ x = f^{-1}(y) $$</p></li></ul><h3 id="排版" tabindex="-1">排版 <a class="header-anchor" href="#排版" aria-label="Permalink to &quot;排版&quot;">​</a></h3><table><thead><tr><th>输入</th><th>显示</th><th>含义</th></tr></thead><tbody><tr><td><code>\\</code></td><td>$\\theta \\ 中间空格 \\ \\Theta$</td><td>空格</td></tr><tr><td><code>\\quad</code>或<code>\\qquad</code></td><td>$ 默认间距 a \\ b \\ 使用quad \\ a \\quad b \\ 使用qqaud \\ a \\qquad b $</td><td>增大空格间隙</td></tr><tr><td><code>\\\\</code></td><td>$\\theta \\ \\Theta$</td><td>换行</td></tr><tr><td><code>\\\\[nex]</code></td><td>$ a \\[2ex] b $</td><td>增加垂直间距，默认间距为<code>\\\\[1ex]</code></td></tr><tr><td><code>{\\mathbf 加粗内容}</code></td><td>${\\mathbf h}$</td><td>加粗</td></tr><tr><td><code>\\tag{n.m}</code></td><td>无法在表格内渲染，在表格下方显示</td><td>结尾标号</td></tr><tr><td><code>\\begin{case}...\\end{case}</code></td><td>在表格下方显示</td><td>分类表达式</td></tr><tr><td><code>\\begin{array}...\\end{array}</code>，与<code>\\left{ \\right.</code>组合</td><td>在表格下方显示</td><td>方程组</td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr></tbody></table><ul><li><p><strong>结尾标号</strong> $$ f(x) = a + b \\tag1 $$</p><p>$$ f(x) = a - b \\tag{1.1} $$</p></li><li><p><strong>分类表达式</strong> $$ f(x) \\begin{cases} \\frac 1x, &amp; 如果 \\ x \\ 是奇数 \\ 3x + 2, &amp; 如果 \\ x \\ 是偶数 \\ \\end{cases} $$ 使用<code>&amp;</code> 表示需要对齐的位置</p></li><li><p><strong>多行算式</strong></p></li></ul><p>$$ \\begin{equation} \\begin{split} f(a) &amp;= b + c - d \\ &amp; \\quad + e - f \\ &amp; = g + h \\ &amp; = i \\end{split} \\end{equation} $$</p><p><code>begin{equation}</code> 表示方程开始，<code>end{equation}</code> 表示方程结束；<code>begin{split}</code> 表示开始多行公式，<code>end{split}</code> 表示结束。</p><ul><li><p><strong>方程组</strong> $$ \\left{ \\begin{array}{占位} a_1x + b_1y - c_1z = d_1 \\ a_2x + b_2y - c_2z = d_2 \\ a_3x + b_3y - c_3z = d_3 \\end{array} \\right. $$</p></li><li><p>Other</p></li></ul><h3 id="符号" tabindex="-1">符号 <a class="header-anchor" href="#符号" aria-label="Permalink to &quot;符号&quot;">​</a></h3><table><thead><tr><th>输入</th><th>显示</th><th>含义</th></tr></thead><tbody><tr><td><code>\\geq</code></td><td>$\\geq$</td><td>大于等于</td></tr><tr><td><code>\\leq</code></td><td>$\\leq$</td><td>小于等于</td></tr><tr><td><code>&gt;</code>或<code>\\gt</code></td><td>$ \\gt \\quad &gt; $</td><td>大于</td></tr><tr><td><code>&lt;</code>或<code>\\lt</code></td><td>$&lt; \\quad \\lt $</td><td>小于</td></tr><tr><td><code>=</code></td><td>$=$</td><td>等于</td></tr><tr><td><code>\\ne</code></td><td>$ \\ne $</td><td>不等于</td></tr><tr><td><code>\\not</code></td><td>$ \\not\\gt \\not\\lt \\not\\ge \\not\\le \\not= $</td><td><strong>不</strong>大于/小于/大于等于/小于等于/等于</td></tr><tr><td><code>\\exist</code></td><td>$\\exist$</td><td>存在</td></tr><tr><td><code>\\forall</code></td><td>$\\forall$</td><td>任意的</td></tr><tr><td><code>^</code></td><td>$x^2$</td><td>上标</td></tr><tr><td><code>_</code></td><td>$x_1$</td><td>下标</td></tr><tr><td><code>()</code></td><td>$ f(x) = a + b$</td><td>小括号</td></tr><tr><td><code>[]</code></td><td>$ x \\in[1, 100]$</td><td>中括号</td></tr><tr><td><code>\\{ \\}</code></td><td>$ { (1 - 2) + [ 3 - ( 4 + 5) ]} $</td><td>大括号<br>由于大括号<code>{}</code> 被用于分组，因此需要使用<code>\\{</code>和<code>\\}</code>表示大括号</td></tr><tr><td><code>\\left(</code>或<code>\\right}</code></td><td>$ \\left( \\frac{ \\frac{1}{2} } { \\frac{2}{3} } \\right) $</td><td>自适应括号<br>适用于大中小三种括号类型</td></tr><tr><td><code>\\sum</code></td><td>$ 普通求和 \\sum , 带上下限的求和 \\sum_{k = 1}^{n} $</td><td>求和（累加）</td></tr><tr><td><code>\\prod</code></td><td>$ \\prod_{n=1}^{10} $</td><td>连乘（累乘）</td></tr><tr><td><code>\\infty</code></td><td>$ 正无穷 \\infty , 负无穷 -\\infty $</td><td>无穷</td></tr><tr><td><code>\\int</code></td><td>$ 普通积分 \\int , 带上下限积分 \\int_{k = 1}^{\\infty} $</td><td>积分</td></tr><tr><td><code>\\多个i + nt</code></td><td>$ \\iint , \\iiint , \\iiiint $</td><td>多重积分，增加<code>i</code></td></tr><tr><td><code>\\bigcup</code></td><td>$ \\bigcup $</td><td>并集</td></tr><tr><td><code>\\bigcap</code></td><td>$ \\bigcap $</td><td>交集</td></tr><tr><td><code>\\subset</code></td><td>$ \\subset $</td><td>包含于/子集（子集合被包含于某个父集合）</td></tr><tr><td><code>\\subseteq</code></td><td>$ \\subseteq $</td><td>包含于/子集（子集合被包含于某个父集合）</td></tr><tr><td><code>\\subsetneq</code></td><td>$\\subsetneq $</td><td>不包含于/非子集</td></tr><tr><td><code>\\supset</code></td><td>$ \\supset $</td><td>包含/父集</td></tr><tr><td><code>\\in</code></td><td>$ \\in $</td><td>属于（元素属于某个集合）</td></tr><tr><td><code>\\lim</code></td><td>$\\lim_{x \\to \\infty}$</td><td>极限</td></tr><tr><td><code>\\xlongequal</code></td><td>$\\xlongequal[down]{up}$</td><td>长等于号</td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td><code>\\max</code></td><td>$ \\max $</td><td>最大</td></tr><tr><td><code>\\min</code></td><td>$ \\min $</td><td>最小</td></tr><tr><td><code>\\langle</code>或<code>\\rangle</code></td><td>$ \\langle X \\rangle $</td><td>尖括号</td></tr><tr><td><code>\\lceil</code>或<code>\\rceil</code></td><td>$ \\lceil X \\rceil $</td><td>向上取整</td></tr><tr><td><code>\\lflorr</code>或<code>\\rfloor</code></td><td>$ \\lfloor X \\rfloor $</td><td>向下取整</td></tr></tbody></table><h3 id="数学运算" tabindex="-1">数学运算 <a class="header-anchor" href="#数学运算" aria-label="Permalink to &quot;数学运算&quot;">​</a></h3><table><thead><tr><th>输入</th><th>显示</th><th>含义</th></tr></thead><tbody><tr><td><code>\\frac{1}{2}</code></td><td>简单$ \\frac 12 $ 复杂$ \\frac{1}{2} $</td><td>分数形式</td></tr><tr><td><code>\\over</code></td><td>$ {1 + 2 + 3 \\over 4+5+6} $</td><td>分数形式，使用<code>\\over</code>分隔组内的内容</td></tr><tr><td><code>\\cfrac</code></td><td>$ x = a_0 + \\cfrac{1^2}{a_1 + \\cfrac{2^2}{a_2 + \\cfrac{3^2}{a_4 + ...}} } $</td><td>连分数</td></tr><tr><td><code>\\sqrt</code></td><td>$ \\sqrt a $</td><td>开根号</td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr></tbody></table><h3 id="函数" tabindex="-1">函数 <a class="header-anchor" href="#函数" aria-label="Permalink to &quot;函数&quot;">​</a></h3><table><thead><tr><th>输入</th><th>显示</th><th>含义</th></tr></thead><tbody><tr><td><code>\\ogn</code></td><td>$\\log2$</td><td>对数函数</td></tr><tr><td><code>\\sin空格x</code></td><td>$\\sin x$</td><td>正弦</td></tr><tr><td><code>\\cos空格x</code></td><td>$\\cos x$</td><td>余弦</td></tr><tr><td><code>\\tan空格x</code></td><td>$\\tan x$</td><td>正切</td></tr><tr><td><code>\\arctan x</code></td><td>$ \\arctan x $</td><td>反正切</td></tr><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr></tbody></table><h3 id="希腊字母" tabindex="-1">希腊字母 <a class="header-anchor" href="#希腊字母" aria-label="Permalink to &quot;希腊字母&quot;">​</a></h3><table><thead><tr><th>输入</th><th>小写</th><th>大写</th><th>含义</th><th>音标</th></tr></thead><tbody><tr><td><code>\\alpha</code></td><td>$\\alpha$</td><td>$\\Alpha$</td><td>alpha</td><td></td></tr><tr><td><code>\\bata</code></td><td>$\\beta$</td><td>$\\Beta$</td><td>beta</td><td></td></tr><tr><td><code>\\gamma</code></td><td>$\\gamma$</td><td>$\\Gamma$</td><td>gamma</td><td></td></tr><tr><td><code>\\delta</code></td><td>$\\delta$</td><td>$\\Delta$</td><td>delta</td><td></td></tr><tr><td><code>\\epsilon</code></td><td>$\\epsilon$</td><td>$\\Epsilon$</td><td>epsilon</td><td><code>/&#39;epsɪlɒn/</code></td></tr><tr><td><code>\\zeta</code></td><td>$\\zeta$</td><td>$\\Zeta$</td><td>zeta</td><td></td></tr><tr><td><code>\\eta</code></td><td>$\\eta$</td><td>$\\Eta$</td><td>eta</td><td></td></tr><tr><td><code>\\theta</code></td><td>$\\theta$</td><td>$\\Theta$</td><td>theta</td><td></td></tr><tr><td><code>\\iota</code></td><td>$\\iota$</td><td>$\\Iota$</td><td>iota</td><td></td></tr><tr><td><code>\\kappa</code></td><td>$\\kappa$</td><td>$\\Kappa$</td><td>kappa</td><td></td></tr><tr><td><code>\\lambda</code></td><td>$\\lambda$</td><td>$\\Lambda$</td><td>lambda</td><td></td></tr><tr><td><code>\\mu</code></td><td>$\\mu$</td><td>$\\Mu$</td><td>mu</td><td></td></tr><tr><td><code>\\nu</code></td><td>$\\nu$</td><td>$\\Nu$</td><td>nu</td><td></td></tr><tr><td><code>\\xi</code></td><td>$\\xi$</td><td>$\\Xi$</td><td>xi</td><td><code>/ksi/</code></td></tr><tr><td><code>\\omicron</code></td><td>$\\omicron$</td><td>$\\Omicron$</td><td>omicron</td><td></td></tr><tr><td><code>\\pi</code></td><td>$\\pi$</td><td>$\\Pi$</td><td>pi</td><td></td></tr><tr><td><code>\\rho</code></td><td>$\\rho$</td><td>$\\Rho$</td><td>rho</td><td></td></tr><tr><td><code>\\sigma</code></td><td>$\\sigma$</td><td>$\\Sigma$</td><td>sigma</td><td></td></tr><tr><td><code>\\tau</code></td><td>$\\tau$</td><td>$\\Tau$</td><td>tau</td><td><code>/taʊ/</code>或者<code>/tɔ:/ </code></td></tr><tr><td><code>\\upsilon</code></td><td>$\\upsilon$</td><td>$\\Upsilon$</td><td>upsilon</td><td><code>/ˈipsɪlon/</code>或<code>/ˈʌpsɪlɒn/</code></td></tr><tr><td><code>\\phi</code></td><td>$\\phi$</td><td>$\\Phi$</td><td>phi</td><td></td></tr><tr><td><code>\\chi</code></td><td>$\\chi$</td><td>$\\Chi$</td><td>chi</td><td><code>/kaɪ/</code></td></tr><tr><td><code>\\psi</code></td><td>$\\psi$</td><td>$\\Psi$</td><td>psi</td><td><code>/psaɪ/</code></td></tr><tr><td><code>\\omega</code></td><td>$\\omega$</td><td>$\\Omega$</td><td>omega</td><td><code>/&#39;əʊmɪɡə/</code>或<code>/oʊ&#39;meɡə/</code></td></tr></tbody></table><p>$$ T(n) = 2T(\\frac{n}{2}) $$</p>',19),c=[a];function $(i,n,l,h,s,p){return d(),e("div",null,c)}const m=t(r,[["render",$]]);export{u as __pageData,m as default};
