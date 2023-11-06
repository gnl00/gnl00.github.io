import { defineConfig } from 'vitepress'

// 导入主题的配置
import { blogTheme } from './blog-theme'

const navbar = [
  { text: '首页', link: '/' },
  { 
    text: '前端', 
    items: [
      { text: '前端项目工程化', link: '/posts/fe/项目配置' },
      { text: 'JavaScript', link: '/posts/fe/JavaScript/JavaScript' },
      { text: 'TypeScript', link: '/posts/fe/TypeScript/TypeScript' },
      { text: 'React', link: '/posts/fe/React/React' },
      { text: 'Vue.js', link: '/posts/fe/Vuejs/Vuejs' },
    ]
  },
  { 
    text: '后端', 
    items: [
      { text: 'Java', link: '/posts/be/Java/Java' },
      { text: 'Spring', link: '/posts/be/Spring/Spring' },
      { text: 'SpringBoot', link: '/posts/be/SpringBoot/SpringBoot' },
      { text: 'SpringCloud', link: '/posts/be/SpringCloud/SpringCloud' },
      { text: 'Dubbo', link: '/posts/be/Dubbo/Dubbo' },
    ]
  },
  { 
    text: '数据库', 
    items: [
      { text: 'MySQL', link: '/posts/db/MySQL/MySQL' },
      { text: 'PostgreSQL', link: '/posts/db/PostgreSQL/PostgreSQL' },
      { text: 'Redis', link: '/posts/db/Redis/Redis' },
    ]
  },
  { 
    text: '中间件', 
    items: [
      { text: 'Netty', link: '/posts/mw/Netty/Netty' },
      { text: 'RocketMQ', link: '/posts/mw/RocketMQ/RocketMQ/RocketMQ' },
      { text: 'Kafka', link: '/posts/mw/Kafka/Kafka' },
      { text: 'Elesticsearch', link: '/posts/mw/Elesticsearch/Elesticsearch' },
    ]
  },
  { 
    text: 'DevOps', 
    items: [
      { text: 'Docker', link: '/posts/mw/Docker/Docker' },
      { text: 'Kubernetes', link: '/posts/mw/Kubernetes/Kubernetes' },
      { text: 'GitLab', link: '/posts/mw/GitLab/GitLab' },
    ]
  },
  { text: '关于', link: '/about' }
]

// Vitepress 默认配置
// 详见文档：https://vitepress.dev/reference/site-config
export default defineConfig({
  // 继承博客主题(@sugarat/theme)
  extends: blogTheme,
  lang: 'zh-cn',
  title: 'Gnl',
  description: "Gnl's blog",
  lastUpdated: true,
  themeConfig: {
    lastUpdatedText: '上次更新',
    logo: '/logo-transform.png',
    // editLink: {
    //   pattern:
    //     'https://github.com/ATQQ/sugar-blog/tree/master/packages/blogpress/:path',
    //   text: '去 GitHub 上编辑内容'
    // },
    nav: navbar,
    // socialLinks: [
    //   {
    //     icon: 'github',
    //     link: 'https://github.com/ATQQ/sugar-blog/tree/master/packages/theme'
    //   }
    // ]
  }
})
