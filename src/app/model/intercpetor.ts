import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export class Interceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({ headers: this.getHeaders()})
        return next.handle(req);
    }

    getHeaders(): HttpHeaders {
        let token = '';
        if(typeof localStorage !== 'undefined') {
            token = localStorage.getItem('token') ? <string>localStorage.getItem('token') : '';
        }

        const headers = new HttpHeaders({
            Authorization: token
        });

        return headers;
    }
}