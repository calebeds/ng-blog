import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../model/article';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  article: Article = {
    id!: 0,
    title: '',
    key: '',
    date: new Date(),
    content: '',
    description: '',
    imageUrl: ''
  };


  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.article = new Article();
      this.article.key = params['key'];
    })
  }

}
