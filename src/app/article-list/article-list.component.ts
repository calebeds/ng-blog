import { Component, OnInit } from '@angular/core';
import { Article } from '../model/article';
import { ARTICLES } from '../model/mock-articles';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  articles: Article[] = [];

  constructor() { }

  ngOnInit(): void {
    this.articles = ARTICLES;

    console.log(this.articles);
  }

}
