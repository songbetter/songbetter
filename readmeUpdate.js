import { writeFileSync } from 'node:fs'
import Parser from 'rss-parser'

/**
 * README.MD에 작성될 페이지 텍스트
 * @type {string}
 */
let header =
  '![header](https://capsule-render.vercel.app/api?type=wave&color=gradient&height=300&section=header&text=better%20than&fontSize=90)'
let text = `## 👋 Hi, I’m @songbetter (=SongNaeun)
- 👀 I’m interested in pilates, driving and coding 🤸‍♀️🚲🛴🚙
- 🌱 I’m currently learning Monorepo
<!-- - 📫 How to reach me :<a href="https://velog.io/@songbetter/series"><img src="https://img.shields.io/badge/Velog-38B2AC?style=flat-square"/></a>
  <a href="mailto:5ongnaeu17@gmail.com"><img src="https://img.shields.io/badge/Gmail-F7342E?style=flat-square&logo=Gmail&logoColor=white"/></a> -->
 
[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=songbetter&layout=compact)](https://github.com/songbetter/github-readme-stats)

## Latest Blog Posts

`
let footer =
  '![footer](https://capsule-render.vercel.app/api?type=wave&color=gradient&height=300&section=footer&text=Yesterday&fontSize=90)'

// rss-parser 생성
const parser = new Parser({
  headers: {
    Accept: 'application/rss+xml, application/xml, text/xml; q=0.1',
  },
})

;(async () => {
  // 피드 목록
  const feed = await parser.parseURL(
    'https://episode-blanketkick.tistory.com/rss',
  )

  // 최신 5개의 글의 제목과 링크를 가져온 후 text에 추가
  for (let i = 0; i < 5; i++) {
    const { title, link } = feed.items[i]
    console.log(`${i + 1}번째 게시물`)
    console.log(`추가될 제목: ${title}`)
    console.log(`추가될 링크: ${link}`)
    text += `<a href=${link}>${title}</a></br>`
  }

  // README.md 파일 작성
  writeFileSync('README.md', header + text + footer, 'utf8', (e) => {
    console.log(e)
  })

  console.log('업데이트 완료')
})()
