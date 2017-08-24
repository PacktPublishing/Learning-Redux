import { Component } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs/Rx';

import { Post, IAppState } from './types';
import { createPost, editPost } from './actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Redux <3 Angular';
  @select() posts$: Observable<Array<Post>>;

  constructor (private ngRedux: NgRedux<IAppState>) {
    this.ngRedux.dispatch(createPost('dan', 'hello world'))
    this.ngRedux.dispatch(createPost('johann', 'second post'))
  }

  editPost (id: number, text: string) {
    this.ngRedux.dispatch(editPost(id, text))
  }
}
