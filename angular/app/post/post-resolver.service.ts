import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { APP_CONFIG, AppConfig } from 'app/app.config';
import { LoadingService, Post, PostResolve } from 'app/shared';
import { environment } from 'environments/environment';

@Injectable()
export class PostResolver implements Resolve<PostResolve> {
  posts: Post[];

  constructor (@Inject(APP_CONFIG) config: AppConfig,
               private loadingService: LoadingService,
               private http: Http) {
    this.posts = config.posts;
  }

  resolve (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PostResolve> {
    this.loadingService.show();

    const slug = route.paramMap.get('slug');
    const i = this.posts.findIndex(post => post.slug === slug);
    const next = this.posts[i - 1];
    const prior = this.posts[i + 1];
    const current = this.posts[i];

    return this.http
      .get(`${environment.origin_url}html/${current.slug}.html`)
      .map(res => res.text())
      .map(html => {
        this.loadingService.hide();
        return {current, prior, next, html};
      });
  }
}
