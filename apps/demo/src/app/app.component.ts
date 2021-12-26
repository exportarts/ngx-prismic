import { Component, OnInit } from '@angular/core';
import { PrismicDocument } from '@prismicio/types';
import { from, Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Component({
  selector: 'ngx-prismic-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  data: Observable<PrismicDocument[]>;

  ngOnInit() {
    this.data = from(environment.prismic.client.getAllByType('demo'));
  }

}
