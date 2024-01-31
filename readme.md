# создание сервера Vite-nodeTS

в папке проекта
<br/>
сначала создаём файл package.json с помощью команды 

``` bash
npm init
```

подключаем vite

``` bash
npm i vite vite-plugin-node -D
```

создаём файл 

``` bash
vite.config.ts
```

в него пишем

``` TypeScript
import { defineConfig } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';

export default defineConfig({
  // ...vite configures
  server: {
    // vite server configs, for details see [vite doc](https://vitejs.dev/config/#server-host)
    port: 3000
  },
  plugins: [
    ...VitePluginNode({
      // Nodejs native Request adapter
      // currently this plugin support 'express', 'nest', 'koa' and 'fastify' out of box,
      // you can also pass a function if you are using other frameworks, see Custom Adapter section
      adapter: 'express',

      // tell the plugin where is your project entry
      appPath: './app.ts',

      // Optional, default: 'viteNodeApp'
      // the name of named export of you app from the appPath file
      exportName: 'viteNodeApp',

      // Optional, default: false
      // if you want to init your app on boot, set this to true
      initAppOnBoot: false,

      // Optional, default: 'esbuild'
      // The TypeScript compiler you want to use
      // by default this plugin is using vite default ts compiler which is esbuild
      // 'swc' compiler is supported to use as well for frameworks
      // like Nestjs (esbuild dont support 'emitDecoratorMetadata' yet)
      // you need to INSTALL `@swc/core` as dev dependency if you want to use swc
      tsCompiler: 'esbuild',

      // Optional, default: {
      // jsc: {
      //   target: 'es2019',
      //   parser: {
      //     syntax: 'typescript',
      //     decorators: true
      //   },
      //  transform: {
      //     legacyDecorator: true,
      //     decoratorMetadata: true
      //   }
      // }
      // }
      // swc configs, see [swc doc](https://swc.rs/docs/configuration/swcrc)
      swcOptions: {}
    })
  ],
  optimizeDeps: {
    // Vite does not work well with optionnal dependencies,
    // you can mark them as ignored for now
    // eg: for nestjs, exlude these optional dependencies:
    // exclude: [
    //   '@nestjs/microservices',
    //   '@nestjs/websockets',
    //   'cache-manager',
    //   'class-transformer',
    //   'class-validator',
    //   'fastify-swagger',
    // ],
  },
});
```

подключаем express

``` bash
npm i express
```

подключаем типы express

``` bash
npm i --save-dev @types/express
```

создаём файл 

``` bash
app.ts
```

в нём пишем

``` TypeScript
import express from 'express'
const app = express()

app.get('/',(req,res)=>{
  res.sent("hi")
})

// Запуск на проде
if (import.meta.env.PROD)
  app.listen(3000)

// Запуск в DEV режиме
export const viteNodeApp = app
```

создаём файл для конфигураций ts

``` bash
tsconfig.json
```

в нём пишем

``` json
{
  "compilerOptions": {
    "baseUrl": ".",
    "moduleResolution": "node",
    "strict": true,
    "declaration": true,
    "noUnusedLocals": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "types": ["node", "vite/client"],
    // compile away optional-chaining-operator
    // node support table: https://node.green/#ES2020-features-optional-chaining-operator-----
    "target": "esnext",
    "module": "esnext",
    "lib": [
      "ESNext"
    ],
    "sourceMap": true,
  },
  "exclude": [
    "dist",
    "node_modules"
  ]
}
```

теперь можно проверить наш сервер сервер
<br/>
открываем package.json и в scripts пишем :

```json
"dev":"vite",
"build":"vite build"
```

запуск сервера :

```bash
npm run dev
```

построить сервер :

```bash
npm run build
```
