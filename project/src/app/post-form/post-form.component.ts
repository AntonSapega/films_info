import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../app.component';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {

  @Output() onAdd: EventEmitter<Todo> = new EventEmitter<Todo>()
  @ViewChild('newPostName', {static: false}) inputTitle: ElementRef

  public title: string = ''
  public completed: string = ''
  public id: string = ''

  constructor() { }

  ngOnInit(): void {
  }

  onClick(): void {
    let newPost: Todo | null = null

    if (this.title.trim() && this.completed.trim() && this.id.trim()) {
      newPost = {
        title: this.title,
        completed: Boolean(this.completed),
        id: Number(this.id)
      }
    }

    console.log(newPost)
    this.title = ''
    this.completed = ''
    this.id = ''

    newPost === null ? alert('You should specify the required fields') : this.onAdd.emit(newPost)
  }

  setFocus(): void {
    console.log(this.inputTitle.nativeElement.focus())
  }
}
