import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ArticleComponent } from '../article/article.component';
import { Article } from '../model/article';

@Injectable({
    providedIn: 'root'
})
export class ArticleService {
    // private readonly URL = 'http://localhost:8000';

    constructor(private http: HttpClient) {

    }

    getArticles(): Observable<Article[]> {
       return this.http.get<Article[]>(`${environment.apiUrl}/articles`);
    }

    getArticle(key: string): Observable<Article> {
        return this.http.get<Article>(`${environment.apiUrl}/articles/${key}`);
    }
}