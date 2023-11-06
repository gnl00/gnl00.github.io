// 主题独有配置
import { getThemeConfig } from '@sugarat/theme/node'

// 开启RSS支持（RSS配置）
// import type { Theme } from '@sugarat/theme'

// const baseUrl = 'https://sugarat.top'
// const RSS: Theme.RSSOptions = {
//   title: '粥里有勺糖',
//   baseUrl,
//   copyright: 'Copyright (c) 2018-present, 粥里有勺糖',
//   description: '你的指尖,拥有改变世界的力量（大前端相关技术分享）',
//   language: 'zh-cn',
//   image: 'https://img.cdn.sugarat.top/mdImg/MTY3NDk5NTE2NzAzMA==674995167030',
//   favicon: 'https://sugarat.top/favicon.ico',
// }

// 所有配置项，详见文档: https://theme.sugarat.top/
const blogTheme = getThemeConfig({
  hotArticle: {
    title: 'Pinned',
    nextText: '换一组',
    pageSize: 5,
    empty: '暂无内容'
  },
  recommend: false,
  // 开启RSS支持
  // RSS,

  // 搜索
  // 默认开启pagefind离线的全文搜索支持（如使用其它的可以设置为false）
  // 如果npx pagefind 时间过长，可以手动将其安装为项目依赖 pnpm add pagefind
  // search: false,

  // 页脚
  footer: {
    // message: '下面 的内容和图标都是可以修改的噢（当然本条内容也是可以隐藏的）',
    copyright: '2023-Present | Gnl',
    version: false
  },

  // 主题色修改
  themeColor: 'el-green',

  // 文章默认作者
  author: 'Gnl',
  comment: {
    repo: 'gnl00/gnl00.github.io',
    repoId: 'R_kgDOGR5o6w',
    category: 'Announcements',
    categoryId: 'DIC_kwDOGR5o684CatYO'
  }
})

export { blogTheme }
