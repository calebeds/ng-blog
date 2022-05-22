import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/model/article';
import { DashboardService } from 'src/app/service/dashboard.service';

@Component({
  selector: 'app-article-overview',
  templateUrl: './article-overview.component.html',
  styleUrls: ['./article-overview.component.css']
})
export class ArticleOverviewComponent implements OnInit {
  articles: Article[] = [];


  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.getArticles();
  }

  getArticles(): void {
    this.dashboardService.getArticles().subscribe(articles => {
      this.articles = articles;
      console.log(this.articles);
    })
  }

  togglePublishState(article: Article): void {
    article.published = !article.published;
    this.dashboardService.togglePublishState(article).subscribe(
      article => {
        const index: number = this.articles.findIndex(
          currentArticle => {
            return currentArticle.id === article.id
          }
        );
        this.articles[index] = article;
      },
      error => {
        article.published = !article.published;
        console.error(error);
      }
    );
  }
}
