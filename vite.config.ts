import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'

// Vite plugins
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import PurgeIcons from 'vite-plugin-purge-icons'
import { HeadlessUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Markdown from 'vite-plugin-md'
import WindiCSS from 'vite-plugin-windicss'
import { VitePWA } from 'vite-plugin-pwa'
import VueI18n from '@intlify/vite-plugin-vue-i18n'
import Inspect from 'vite-plugin-inspect'
import Prism from 'markdown-it-prism'
import LinkAttributes from 'markdown-it-link-attributes'

// Other imports
import pkg from './package.json'
import {
  appConstant,
  DEV_PORT,
  NETLIFY_PORT,
} from './src/constants/appConstant'

const markdownWrapperClasses = 'prose max-w-prose prose-sm m-auto text-left'

process.env.VITE_BUILD_EPOCH = new Date().getTime().toString()
process.env.VITE_VERSION = pkg.version

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    // Vue
    Vue({
      include: [/\.vue$/, /\.md$/],
      script: {
        refTransform: true,
      },
      // Recognise custom elements
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('lottie-player'),
        },
      },
    }),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      pagesDir: 'src/pages',
      exclude: ['**/components/*.vue'],
      extensions: ['vue', 'md'],
    }),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      // targets to transform
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue\??/, // .vue
      ],
      imports: [
        'vue',
        'vue-router',
        'vue-i18n',
        '@vueuse/head',
        '@vueuse/core',
        'vee-validate',
      ],
      dts: 'src/auto-imports.d.ts',
    }),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],

      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],

      // custom resolvers
      resolvers: [
        // auto import icons
        // https://github.com/antfu/unplugin-icons
        IconsResolver({
          alias: {
            hes: 'heroicons-solid',
            heo: 'heroicons-outline',
          },
          componentPrefix: '',
          // enabledCollections: ['carbon']
        }),

        // HeadlessUI
        HeadlessUiResolver(),
      ],

      dts: 'src/components.d.ts',
    }),

    // https://github.com/antfu/unplugin-icons
    Icons(),

    // https://github.com/antfu/purge-icons
    PurgeIcons({
      // globs for searching source file to analyze
      content: [
        'src/**/*.html',
        'src/**/*.ts',
        'src/**/*.md',
        'src/**/*.vue', // scan for .vue file as well
      ],
      // whitelist for icons that might be used dynamically
      // included: [
      //   'heroicons-solid:eye',
      //   'heroicons-solid:support',
      //   'heroicons-solid:cube-transparent',
      // ],
      // format: 'mjs',
    }),

    // https://github.com/antfu/vite-plugin-md
    Markdown({
      wrapperClasses: markdownWrapperClasses,
      headEnabled: true,
      markdownItSetup(md) {
        // https://prismjs.com/
        // @ts-expect-error types mismatch
        md.use(Prism)
        // @ts-expect-error types mismatch
        md.use(LinkAttributes, {
          pattern: /^https?:\/\//,
          attrs: {
            target: '_blank',
            rel: 'noopener',
          },
        })
      },
    }),

    // https://github.com/antfu/vite-plugin-windicss
    WindiCSS({
      safelist: markdownWrapperClasses,
    }),

    // https://github.com/antfu/vite-plugin-pwa
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'safari-pinned-tab.svg'],
      manifest: {
        name: appConstant.NAME,
        short_name: appConstant.SHORT_NAME,
        theme_color: appConstant.THEME_COLOR,
        icons: [
          {
            src: '/img/icons/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/img/icons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/img/icons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),

    // https://github.com/intlify/bundle-tools/tree/main/packages/vite-plugin-vue-i18n
    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      include: [path.resolve(__dirname, 'src/intl/**')],
    }),

    // https://github.com/antfu/vite-plugin-inspect
    Inspect({
      // change this to enable inspect for debugging
      enabled: false,
    }),
  ],

  server: {
    port: DEV_PORT,
    proxy: {
      '/api': {
        target: `http://localhost:${NETLIFY_PORT}/.netlify/functions`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    fs: {
      strict: true,
    },
  },

  // https://github.com/antfu/vite-ssg
  // @ts-expect-error types mismatch
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
  },

  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      '@vueuse/core',
      '@vueuse/head',
      'vee-validate',
    ],
    exclude: ['vue-demi'],
  },

  // Build
  // build: {
  //   chunkSizeWarningLimit: 700, // Default is 500
  // },
})
