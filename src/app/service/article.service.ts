import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Article } from '../model/article';
import { ARTICLES } from '../model/mock-articles';

@Injectable({
    providedIn: 'root'
})
export class ArticleService {
    constructor() {}

    getArticles(): Observable<Article[]> {
        const articles: Article[] = ARTICLES;
        return of(articles);
    }
}