
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'https://Ant1-dev.github.io/Antoine-Morrison/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/Antoine-Morrison"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 784, hash: '4b5cea56ed853d817b02a4a9c2447e7134ab1b26eb9c499f5bf2787db2b44163', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 997, hash: 'fac66b27cad22b5b886eba6bacfa706eef690e302af0def936b3ff3bc8706e1e', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 23443, hash: '566442836f727ec9aa13fba65e285257669970513e2cda357a594694bf92426c', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-M2GGQTTH.css': {size: 175, hash: 'I5ixfWte4Hg', text: () => import('./assets-chunks/styles-M2GGQTTH_css.mjs').then(m => m.default)}
  },
};
