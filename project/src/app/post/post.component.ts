import {Component, Input} from '@angular/core'
import { Todo } from '../app.component';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss']
})

export class PostComponent {

  @Input() post: Todo

}
