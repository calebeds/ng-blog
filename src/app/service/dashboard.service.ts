import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Article } from '../model/article';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    // private readonly URL = 'http://localhost:8000';

    constructor (private http: HttpClient) {}

    getArticles(): Observable<Article[]> {
        return this.http.get<Article[]>(`${environment.apiUrl}/dashboard/overview`);
    }

    getArticle(key: string): Observable<Article> {
        return this.http.get<Article>(`${environment.apiUrl}/dashboard/article/${key}`)
    }

    togglePublishState(article: Article): Observable<Article> {
        return this.http.put<Article>(`${environment.apiUrl}/dashboard/article/publish`, article);
    }

    updateArticle(article: Article): Observable<Article> {
        return this.http.put<Article>(`${environment.apiUrl}/dashboard/article`, article);
    }

    deleteArticle(id: number): Observable<unknown> {
        return this.http.delete<unknown>(`${environment.apiUrl}/dashboard/article/${id}`)
    }

    createArticle(article: Article): Observable<Article> {
        return this.http.post<Article>(`${environment.apiUrl}/dashboard/article`, article);
      }
}