/* tslint:disable:no-console */

import 'zone.js/dist/zone-node';

import { renderModuleFactory } from '@angular/platform-server';
import { outputFileSync, readFileSync } from 'fs-extra';
import { join, resolve } from 'path';
import { minify } from 'html-minifier';

import { posts } from '../src/config';

const dist = resolve('dist');
const document = readFileSync(join(dist, 'index.html'), 'utf8');
const { AppServerModuleNgFactory } = require(join(
  dist,
  'dist-server/main.bundle',
));

const pages: { [key: string]: string } = {};

const pushPage = (url: string, path?: string) => {
  pages[url] = path ? path : join(url, 'index.html');
};

// add default pages
pushPage('/');
pushPage('/about');
pushPage('/link');
pushPage('/404', '/404.html');

for (const post of posts) {
  // add post page
  pushPage(`/post/${post.slug}`);

  for (const tag of post.tags) {
    // add tag page
    pushPage(`/tag/${tag}`);
  }
}

// render
for (const [url, path] of Object.entries(pages)) {
  renderModuleFactory(AppServerModuleNgFactory, { url, document })
    .then(html =>
      minify(html, {
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: true,
      }),
    )
    .then(html => {
      console.info(`Saving "${url}" as "${path}"`);
      outputFileSync(join(dist, path), html);
    });
}
