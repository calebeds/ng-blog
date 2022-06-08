import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../model/article';
import { ArticleService } from '../service/article.service';
import { DashboardService } from '../service/dashboard.service';
import { SharedService } from '../service/shared.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  article: Article = new Article();


  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private router: Router,
    private titleService: Title,
    private sharedService: SharedService,
    private meta: Meta,
    private dashboardService: DashboardService
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const key: string = params['key'];

      if(this.router.url.indexOf('dashboard/preview') === -1) {
        this.articleService.getArticle(key).subscribe((article: Article) => {
          this.displayArticle(article);
        });
      } else {
        this.dashboardService.getArticle(key).subscribe((article: Article) => {
          this.displayArticle(article);
        });
      }
    });
  }

  displayArticle(article: Article): void {
    if(article === undefined || article === null) {
      this.router.navigateByUrl('404');
      return;
    }
    const concatdTitle = this.sharedService.concatTitle(article.title);
    this.article = article;
    this.titleService.setTitle(concatdTitle.value);
    this.meta.addTags([
      {name: 'description', content: this.article.description},
      {
        property: "og:title", 
        content: concatdTitle.value
      },
      {
        property: 'og:type',
        content: 'website'
      },
      {
        property: 'og:url',
        content: this.sharedService.baseUrl.value + this.article.key
      },
      {
        property: 'og:image',
        content: this.article.imageUrl
      },
      {
        property: 'og:description',
        content: this.article.description
      },
      {
        property: 'og:site_name',
        content: this.sharedService.blogTitle
      }
    ]);
  }


}
