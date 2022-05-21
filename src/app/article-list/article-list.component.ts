import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { Article } from '../model/article';
import { ArticleService } from '../service/article.service';
import { SharedService } from '../service/shared.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  articles: Article[] = [];

  constructor(
    private articleService: ArticleService,
    private titleService: Title,
    private sharedService: SharedService) { }

  ngOnInit(): void {
    this.getArticles();
    this.titleService.setTitle(this.sharedService.blogTitle);
  }

  getArticles(): void {
    this.articleService
      .getArticles()
      .subscribe(articles => {this.articles = articles});
   
  }

}
