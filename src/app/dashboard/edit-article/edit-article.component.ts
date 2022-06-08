import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/model/article';
import { DashboardService } from 'src/app/service/dashboard.service';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {

  article: Article = new Article();
  saved = false;

  constructor(
    private dashboardService: DashboardService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const key:string = params['key'];
      this.getArticle(key);
    });
  }

  getArticle(key: string): void {
    this.dashboardService.getArticle(key).subscribe(
      (article: Article) => {
        if(article === null) {
          this.router.navigateByUrl('404');
          return;
        }
        this.article = article;
      }
    );
  }

  updateArticle(): void {
    this.saved = false;
    this.dashboardService.updateArticle(this.article).subscribe(result => {
      this.article = result;
      this.saved = true;
    })
  }

  viewPreview():void {
    this.router.navigateByUrl(`/dashboard/preview/${this.article.key}`)
  }

}
