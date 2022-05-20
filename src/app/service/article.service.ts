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

    getArticle(key: string): Observable<Article> {
        const articles: Article[] = ARTICLES.filter(a => a.key === key);//Return the article whose key is equal to the key of the article passed
        return of(articles[0]);//There will be only one article so return it as observable
    }
}