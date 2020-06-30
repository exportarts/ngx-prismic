import { Component, OnInit } from '@angular/core';
import { PrismicService } from '@ngx-prismic/client';
import { Observable } from 'rxjs';
import Prismic from 'prismic-javascript';

@Component({
  selector: 'ngx-prismic-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  data: Observable<any>;
  
  constructor(
    private readonly prismic: PrismicService
  ) {}

  ngOnInit() {
    this.data = this.prismic.query([
      Prismic.Predicates.at('document.type', 'demo')
    ]);
  }
  
}
