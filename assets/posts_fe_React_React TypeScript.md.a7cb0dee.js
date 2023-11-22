import{_ as s,o as n,c as a,Q as p}from"./chunks/framework.b41230ea.js";const A=JSON.parse('{"title":"React + TypeScript","description":"React + TypeScript 笔记","frontmatter":{"description":"React + TypeScript 笔记","tag":["React","TypeScript","前端"]},"headers":[],"relativePath":"posts/fe/React/React TypeScript.md","filePath":"posts/fe/React/React TypeScript.md","lastUpdated":1700657743000}'),l={name:"posts/fe/React/React TypeScript.md"},o=p(`<h1 id="react-typescript" tabindex="-1">React + TypeScript <a class="header-anchor" href="#react-typescript" aria-label="Permalink to &quot;React + TypeScript&quot;">​</a></h1><h2 id="组件值传递" tabindex="-1">组件值传递 <a class="header-anchor" href="#组件值传递" aria-label="Permalink to &quot;组件值传递&quot;">​</a></h2><h3 id="父传子-props" tabindex="-1">父传子 props <a class="header-anchor" href="#父传子-props" aria-label="Permalink to &quot;父传子 props&quot;">​</a></h3><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// father component</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> Son </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;@/components/Test/Son&#39;</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Father</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#B392F0;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#B392F0;">h2</span><span style="color:#E1E4E8;">&gt;This is father</span><span style="color:#F97583;">&lt;/</span><span style="color:#E1E4E8;">h2</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">Son num</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{</span><span style="color:#79B8FF;">100</span><span style="color:#E1E4E8;">} </span><span style="color:#F97583;">/&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">&lt;/</span><span style="color:#E1E4E8;">div</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  )</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// son component</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ISonProps</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">num</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">number</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Son</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">props</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ISonProps</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#B392F0;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#B392F0;">h2</span><span style="color:#E1E4E8;">&gt;This is son</span><span style="color:#F97583;">&lt;/</span><span style="color:#E1E4E8;">h2</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#B392F0;">p</span><span style="color:#E1E4E8;">&gt;{props.num}</span><span style="color:#F97583;">&lt;/</span><span style="color:#E1E4E8;">p</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">&lt;/</span><span style="color:#E1E4E8;">div</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  )</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// father component</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> Son </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;@/components/Test/Son&#39;</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Father</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#6F42C1;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#6F42C1;">h2</span><span style="color:#24292E;">&gt;This is father</span><span style="color:#D73A49;">&lt;/</span><span style="color:#24292E;">h2</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">Son num</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{</span><span style="color:#005CC5;">100</span><span style="color:#24292E;">} </span><span style="color:#D73A49;">/&gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">&lt;/</span><span style="color:#24292E;">div</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  )</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// son component</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ISonProps</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">num</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">number</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Son</span><span style="color:#24292E;">(</span><span style="color:#E36209;">props</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ISonProps</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#6F42C1;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#6F42C1;">h2</span><span style="color:#24292E;">&gt;This is son</span><span style="color:#D73A49;">&lt;/</span><span style="color:#24292E;">h2</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#6F42C1;">p</span><span style="color:#24292E;">&gt;{props.num}</span><span style="color:#D73A49;">&lt;/</span><span style="color:#24292E;">p</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">&lt;/</span><span style="color:#24292E;">div</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  )</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>…</p><hr><h3 id="子传父-useref" tabindex="-1">子传父 useRef <a class="header-anchor" href="#子传父-useref" aria-label="Permalink to &quot;子传父 useRef&quot;">​</a></h3><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// father</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { useEffect, useRef } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ISonRef</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">getValueFromSon</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">number</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Father</span><span style="color:#E1E4E8;">() </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">sonRef</span><span style="color:#E1E4E8;"> = </span><span style="color:#B392F0;">useRef</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#B392F0;">ISonRef</span><span style="color:#E1E4E8;">&gt;(</span><span style="color:#FFAB70;">null</span><span style="color:#E1E4E8;">) </span><span style="color:#6A737D;">// 引用子组件</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">useEffect</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">sonRef</span><span style="color:#E1E4E8;"> &amp;&amp; sonRef.current)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">console</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">sonRef</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">current</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">getValueFromSon</span><span style="color:#E1E4E8;">())</span></span>
<span class="line"><span style="color:#E1E4E8;">  }, [])</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#B392F0;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#B392F0;">h2</span><span style="color:#E1E4E8;">&gt;This is father</span><span style="color:#F97583;">&lt;/</span><span style="color:#E1E4E8;">h2</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">Son num</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{</span><span style="color:#79B8FF;">100</span><span style="color:#E1E4E8;">} ref</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{sonRef} </span><span style="color:#F97583;">/&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">&lt;/</span><span style="color:#E1E4E8;">div</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  )</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// son</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> React, { useImperativeHandle } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;react&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ISonProps</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">num</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">number</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Son</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> React.</span><span style="color:#B392F0;">forwardRef</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">props</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ISonProps</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">ref</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 子组件通过方法将值返回给父组件</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// useImperativeHandle is a React Hook that lets you customize the handle exposed as a ref.</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// https://react.dev/reference/react/useImperativeHandle</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">useImperativeHandle</span><span style="color:#E1E4E8;">(ref, () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> ({</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">getValueFromSon</span><span style="color:#E1E4E8;">: ()</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">number</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">200</span></span>
<span class="line"><span style="color:#E1E4E8;">  }))</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#B392F0;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#B392F0;">h2</span><span style="color:#E1E4E8;">&gt;This is son</span><span style="color:#F97583;">&lt;/</span><span style="color:#E1E4E8;">h2</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#B392F0;">p</span><span style="color:#E1E4E8;">&gt;{props.num}</span><span style="color:#F97583;">&lt;/</span><span style="color:#E1E4E8;">p</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">&lt;/</span><span style="color:#E1E4E8;">div</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  )</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> Son</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// father</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { useEffect, useRef } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ISonRef</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">getValueFromSon</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">number</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Father</span><span style="color:#24292E;">() </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">sonRef</span><span style="color:#24292E;"> = </span><span style="color:#6F42C1;">useRef</span><span style="color:#24292E;">&lt;</span><span style="color:#6F42C1;">ISonRef</span><span style="color:#24292E;">&gt;(</span><span style="color:#E36209;">null</span><span style="color:#24292E;">) </span><span style="color:#6A737D;">// 引用子组件</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">useEffect</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">if</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">sonRef</span><span style="color:#24292E;"> &amp;&amp; sonRef.current)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">console</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">sonRef</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">current</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">getValueFromSon</span><span style="color:#24292E;">())</span></span>
<span class="line"><span style="color:#24292E;">  }, [])</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#6F42C1;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#6F42C1;">h2</span><span style="color:#24292E;">&gt;This is father</span><span style="color:#D73A49;">&lt;/</span><span style="color:#24292E;">h2</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">Son num</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{</span><span style="color:#005CC5;">100</span><span style="color:#24292E;">} ref</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{sonRef} </span><span style="color:#D73A49;">/&gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">&lt;/</span><span style="color:#24292E;">div</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  )</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// son</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> React, { useImperativeHandle } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;react&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ISonProps</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">num</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">number</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Son</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> React.</span><span style="color:#6F42C1;">forwardRef</span><span style="color:#24292E;">((</span><span style="color:#E36209;">props</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ISonProps</span><span style="color:#24292E;">, </span><span style="color:#E36209;">ref</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 子组件通过方法将值返回给父组件</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// useImperativeHandle is a React Hook that lets you customize the handle exposed as a ref.</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// https://react.dev/reference/react/useImperativeHandle</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">useImperativeHandle</span><span style="color:#24292E;">(ref, () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> ({</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">getValueFromSon</span><span style="color:#24292E;">: ()</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">number</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">200</span></span>
<span class="line"><span style="color:#24292E;">  }))</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#6F42C1;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#6F42C1;">h2</span><span style="color:#24292E;">&gt;This is son</span><span style="color:#D73A49;">&lt;/</span><span style="color:#24292E;">h2</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#6F42C1;">p</span><span style="color:#24292E;">&gt;{props.num}</span><span style="color:#D73A49;">&lt;/</span><span style="color:#24292E;">p</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">&lt;/</span><span style="color:#24292E;">div</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  )</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> Son</span></span></code></pre></div><h3 id="子调用父方法" tabindex="-1">子调用父方法 <a class="header-anchor" href="#子调用父方法" aria-label="Permalink to &quot;子调用父方法&quot;">​</a></h3><p>父组件通过 props 将自己的方法转递给子组件执行</p><div class="language-tsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// father</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">fatherFunc</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> { console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;father func&#39;</span><span style="color:#E1E4E8;">) }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">h2</span><span style="color:#E1E4E8;">&gt;This is father&lt;/</span><span style="color:#85E89D;">h2</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#79B8FF;">Son</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">invokeFunc</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{fatherFunc} /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#6A737D;">// son</span></span>
<span class="line"><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ISonProps</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">invokeFunc</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">void</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Son</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> React.</span><span style="color:#B392F0;">forwardRef</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">props</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ISonProps</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">ref</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#85E89D;">h2</span><span style="color:#E1E4E8;">&gt;This is son&lt;/</span><span style="color:#85E89D;">h2</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#85E89D;">button</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">onClick</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{props.invokeFunc}&gt;son click&lt;/</span><span style="color:#85E89D;">button</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  )</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// father</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">fatherFunc</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> { console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;father func&#39;</span><span style="color:#24292E;">) }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">h2</span><span style="color:#24292E;">&gt;This is father&lt;/</span><span style="color:#22863A;">h2</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#005CC5;">Son</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">invokeFunc</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{fatherFunc} /&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#6A737D;">// son</span></span>
<span class="line"><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ISonProps</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">invokeFunc</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">void</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Son</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> React.</span><span style="color:#6F42C1;">forwardRef</span><span style="color:#24292E;">((</span><span style="color:#E36209;">props</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ISonProps</span><span style="color:#24292E;">, </span><span style="color:#E36209;">ref</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#22863A;">h2</span><span style="color:#24292E;">&gt;This is son&lt;/</span><span style="color:#22863A;">h2</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#22863A;">button</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">onClick</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{props.invokeFunc}&gt;son click&lt;/</span><span style="color:#22863A;">button</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  )</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><p>…</p>`,12),e=[o];function t(c,r,E,y,i,F){return n(),a("div",null,e)}const d=s(l,[["render",t]]);export{A as __pageData,d as default};
