const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main () {
  const author = {
    name: 'Ana Beatriz',
    username: 'anabeatriz_dev',
    avatar: 'https://raw.githubusercontent.com/viniciosneves/code-connect-assets/main/authors/anabeatriz_dev.png',
    email: 'anabeatriz_dev@gmail.com'
  }

  const ana = await prisma.user.upsert({
    where: { email: author.email },
    update: {},
    create: author
  })

  console.log('Author criado com sucesso: ', ana)

  const posts = [
    {
      'cover': 'https://raw.githubusercontent.com/viniciosneves/code-connect-assets/main/posts/introducao-ao-typescript.png',
      'title': 'Introdução ao TypeScript',
      'slug': 'introducao-ao-typescript',
      'body': 'Este post é um guia introdutório ao TypeScript, explicando como ele aumenta a produtividade e melhora a manutenção do código JavaScript.',
      'markdown': '```typescript\nfunction greeter(person: string) {\n  return \'Hello, \' + person;\n}\n```',
      'author_id': ana.id
    },
    {
      'cover': 'https://raw.githubusercontent.com/viniciosneves/code-connect-assets/main/posts/otimizacao-de-performance-no-react.png',
      'title': 'Otimização de Performance no React',
      'slug': 'otimizacao-de-performance-no-react',
      'body': 'Discutindo técnicas avançadas para otimizar a performance de aplicações React, este post aborda conceitos como memoização e lazy loading.',
      'markdown': '```javascript\nconst MemoizedComponent = React.memo(function MyComponent(props) {\n  /* render using props */\n});\n```',
      'author_id': ana.id
    },
    {
      'cover': 'https://raw.githubusercontent.com/viniciosneves/code-connect-assets/main/posts/explorando-flexbox-no-css.png',
      'title': 'Explorando Flexbox no CSS',
      'slug': 'explorando-flexbox-no-css',
      'body': 'Este post detalha o uso do Flexbox para criar layouts responsivos e flexíveis no CSS, com exemplos práticos para um entendimento fácil.',
      'markdown': '```css\n.flex-container {\n  display: flex;\n  justify-content: space-around;\n}\n```',
      'author_id': ana.id
    },
    {
      'cover': 'https://raw.githubusercontent.com/viniciosneves/code-connect-assets/main/posts/angular-primeiros-passos.png',
      'title': 'Angular: Primeiros Passos',
      'slug': 'angular-primeiros-passos',
      'body': 'Ideal para iniciantes, este post introduz o Angular, um poderoso framework para desenvolvimento de aplicações web, com um exemplo básico.',
      'markdown': '```typescript\n@Component({\n  selector: \'my-app\',\n  template: \'<h1>Olá Angular</h1>\'\n})\nexport class AppComponent { }\n```',
      'author_id': ana.id
    },
    {
      'cover': 'https://raw.githubusercontent.com/viniciosneves/code-connect-assets/main/posts/gerenciamento-de-estado-com-redux.png',
      'title': 'Gerenciamento de Estado com Redux',
      'slug': 'gerenciamento-de-estado-com-redux',
      'body': 'Abordando um dos aspectos cruciais no desenvolvimento de aplicações React, este post ensina como gerenciar o estado de forma eficiente com Redux.',
      'markdown': '```javascript\nconst reducer = (state = initialState, action) => {\n  switch (action.type) {\n    case \'ACTION_TYPE\':\n      return { ...state, ...action.payload };\n    default:\n      return state;\n  }\n};\n```',
      'author_id': ana.id
    },
    {
      'cover': 'https://raw.githubusercontent.com/viniciosneves/code-connect-assets/main/posts/sass-simplificando-o-css.png',
      'title': 'Sass: Simplificando o CSS',
      'slug': 'sass-simplificando-o-css',
      'body': 'Este post explora como o pré-processador Sass pode simplificar e melhorar a escrita de CSS, através de variáveis, mixins e funções.',
      'markdown': '```scss\n$primary-color: #333;\nbody {\n  color: $primary-color;\n}\n```',
      'author_id': ana.id
    },
    {
      'cover': 'https://raw.githubusercontent.com/viniciosneves/code-connect-assets/main/posts/webpack-um-guia-para-iniciantes.png',
      'title': 'Webpack: Um Guia para Iniciantes',
      'slug': 'webpack-um-guia-para-iniciantes',
      'body': 'Aprenda a configurar o Webpack, uma poderosa ferramenta de empacotamento de módulos, neste guia passo a passo para iniciantes.',
      'markdown': '```javascript\nmodule.exports = {\n  entry: \'./path/to/my/entry/file.js\'\n};\n```',
      'author_id': ana.id
    },
    {
      'cover': 'https://raw.githubusercontent.com/viniciosneves/code-connect-assets/main/posts/construindo-spa-com-vuejs.png',
      'title': 'Construindo SPA com Vue.js',
      'slug': 'construindo-spa-com-vuejs',
      'body': 'Este post oferece um tutorial detalhado sobre como construir uma Single Page Application (SPA) eficiente e interativa usando o framework Vue.js.',
      'markdown': '```javascript\nnew Vue({\n  el: \'#app\',\n  data: {\n    message: \'Bem-vindo à sua SPA Vue.js!\'\n  }\n});\n```',
      'author_id': ana.id
    }
  ]

  posts.forEach(async (post) => {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: {},
      create: post
    })
  })

  console.log('Seed OK')
}

main()
.then(async () => {
  await prisma.$disconnect()
})
.catch(async (e) => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
})
