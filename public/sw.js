if (!self.define) {
  const e = (e) => {
      'require' !== e && (e += '.js')
      let s = Promise.resolve()
      return (
        a[e] ||
          (s = new Promise(async (s) => {
            if ('document' in self) {
              const a = document.createElement('script')
              ;(a.src = e), document.head.appendChild(a), (a.onload = s)
            } else importScripts(e), s()
          })),
        s.then(() => {
          if (!a[e]) throw new Error(`Module ${e} didn’t register its module`)
          return a[e]
        })
      )
    },
    s = (s, a) => {
      Promise.all(s.map(e)).then((e) => a(1 === e.length ? e[0] : e))
    },
    a = { require: Promise.resolve(s) }
  self.define = (s, t, n) => {
    a[s] ||
      (a[s] = Promise.resolve().then(() => {
        let a = {}
        const i = { uri: location.origin + s.slice(1) }
        return Promise.all(
          t.map((s) => {
            switch (s) {
              case 'exports':
                return a
              case 'module':
                return i
              default:
                return e(s)
            }
          })
        ).then((e) => {
          const s = n(...e)
          return a.default || (a.default = s), a
        })
      }))
  }
}
define('./sw.js', ['./workbox-21b21c9a'], function (e) {
  'use strict'
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: '/_next/static/OPlIO0lNva60LcPJAGtAb/_buildManifest.js',
          revision: 'OPlIO0lNva60LcPJAGtAb',
        },
        {
          url: '/_next/static/OPlIO0lNva60LcPJAGtAb/_ssgManifest.js',
          revision: 'OPlIO0lNva60LcPJAGtAb',
        },
        {
          url: '/_next/static/chunks/605-fbbea721156e701167ab.js',
          revision: 'OPlIO0lNva60LcPJAGtAb',
        },
        {
          url: '/_next/static/chunks/main-2416fb0777febd9c688a.js',
          revision: 'OPlIO0lNva60LcPJAGtAb',
        },
        {
          url: '/_next/static/chunks/pages/404-278b54dceed0fb40672f.js',
          revision: 'OPlIO0lNva60LcPJAGtAb',
        },
        {
          url: '/_next/static/chunks/pages/_app-81a4130637dc7393efcf.js',
          revision: 'OPlIO0lNva60LcPJAGtAb',
        },
        {
          url: '/_next/static/chunks/pages/_error-cc9ed718d2e503e1510e.js',
          revision: 'OPlIO0lNva60LcPJAGtAb',
        },
        {
          url: '/_next/static/chunks/pages/about-4b7e9e8e1ef4bd0f9ad2.js',
          revision: 'OPlIO0lNva60LcPJAGtAb',
        },
        {
          url: '/_next/static/chunks/pages/auth/signin-ccc3a0bdba2600f0a57a.js',
          revision: 'OPlIO0lNva60LcPJAGtAb',
        },
        {
          url: '/_next/static/chunks/pages/blog-380362e45d08661afa1c.js',
          revision: 'OPlIO0lNva60LcPJAGtAb',
        },
        {
          url: '/_next/static/chunks/pages/blog/%5B...slug%5D-7d18d697ac3c0ddeea03.js',
          revision: 'OPlIO0lNva60LcPJAGtAb',
        },
        {
          url: '/_next/static/chunks/pages/guestbook-4a82c297a28c55d47df5.js',
          revision: 'OPlIO0lNva60LcPJAGtAb',
        },
        {
          url: '/_next/static/chunks/pages/index-2a82054bada49d579a37.js',
          revision: 'OPlIO0lNva60LcPJAGtAb',
        },
        {
          url: '/_next/static/chunks/pages/projects-da0a85a19592b5a32e8d.js',
          revision: 'OPlIO0lNva60LcPJAGtAb',
        },
        {
          url: '/_next/static/chunks/pages/tags-55816a86dd78fb8e9cbb.js',
          revision: 'OPlIO0lNva60LcPJAGtAb',
        },
        {
          url: '/_next/static/chunks/pages/tags/%5Btag%5D-cdc9871e47a99555040d.js',
          revision: 'OPlIO0lNva60LcPJAGtAb',
        },
        {
          url: '/_next/static/chunks/polyfills-a40ef1678bae11e696dba45124eadd70.js',
          revision: 'OPlIO0lNva60LcPJAGtAb',
        },
        {
          url: '/_next/static/chunks/webpack-fb76148cfcfb42ca18eb.js',
          revision: 'OPlIO0lNva60LcPJAGtAb',
        },
        { url: '/_next/static/css/1a3506e112173a059e46.css', revision: 'OPlIO0lNva60LcPJAGtAb' },
        { url: '/fonts/inter-var-latin.woff2', revision: '812b3dd29751112389e93387c4f7dd0a' },
        { url: '/manifest.json', revision: '01e15680acb5a3c86f9d079fd03bf3b8' },
        { url: '/sitemap.xml', revision: '787f3a8765484e952a3a23bdc5888f02' },
        {
          url: '/static/favicons/android-chrome-192x192.png',
          revision: '47bd869f3583b46868a6a213a3ae9eda',
        },
        {
          url: '/static/favicons/android-chrome-384x384.png',
          revision: 'c3da7ecda65e43fd312f17e8476777d8',
        },
        {
          url: '/static/favicons/apple-touch-icon.png',
          revision: '37763e886faf89821588e1c329a553c6',
        },
        { url: '/static/favicons/browserconfig.xml', revision: 'fb71e74a4c2fd5524a4afbfd5bc5fa6b' },
        { url: '/static/favicons/favicon-16x16.png', revision: 'c64bb9222d8769c2086982301b6317da' },
        { url: '/static/favicons/favicon-32x32.png', revision: 'fbf42009d8cd278a94c24a137893cb13' },
        { url: '/static/favicons/favicon.ico', revision: '1359c8b1e3c26206541de3cb8c13fee9' },
        {
          url: '/static/favicons/mstile-150x150.png',
          revision: '68cf54b2731cb84e2344b9ad023dbd29',
        },
        {
          url: '/static/favicons/safari-pinned-tab.svg',
          revision: '5e65686e8b862ec00e3d23abb5e4edf9',
        },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({ request: e, response: s, event: a, state: t }) =>
              s && 'opaqueredirect' === s.type
                ? new Response(s.body, { status: 200, statusText: 'OK', headers: s.headers })
                : s,
          },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: 'static-video-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1
        const s = e.pathname
        return !s.startsWith('/api/auth/') && !!s.startsWith('/api/')
      },
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1
        return !e.pathname.startsWith('/api/')
      },
      new e.NetworkFirst({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 })],
      }),
      'GET'
    )
})
