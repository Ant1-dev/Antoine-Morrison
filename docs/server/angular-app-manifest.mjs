
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/Antoine-Morrison/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/Antoine-Morrison"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 758, hash: 'f3c5e46f4276fe6ec4eea88d520df0e829bd6c2958d2e43f22af6e377963438d', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 971, hash: '3e615a40998a8343a4c10fdcce9d62814386ff907ca03fccf4cb4f8df788eb2c', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 23417, hash: 'c798d5563b3f6a0e50016b647a7a91710425973c7572ee84493c7271752e79d7', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-M2GGQTTH.css': {size: 175, hash: 'I5ixfWte4Hg', text: () => import('./assets-chunks/styles-M2GGQTTH_css.mjs').then(m => m.default)}
  },
};
