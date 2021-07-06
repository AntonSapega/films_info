import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

export interface Todo {
  completed: boolean,
  title: string,
  id?: number
}

export interface FilmsDBResponse {
  adult: boolean,
  imgPath: string,
  homepage: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  todos: Todo[] = []
  // poster: any = 'https://image.tmdb.org/t/p/original/'
  // test: any
  resp: Object
  poster: FilmsDBResponse

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos?_limit=2')
      .subscribe(todos => {
        console.log('Response', todos)
        this.todos = todos
      })

    this.http.get<Object>('https://api.themoviedb.org/3/movie/550?api_key=235947a0441502b62ad0d04d5a5abfcd')
      .subscribe(response => {
        console.log('Response from TMBD', response)
        this.resp = response
        // this.poster = {
        //   adult: (this.resp as any).(adult as any),
        //   imgPath: response.backdrop_path,
        //   homepage: response.homepage
        // }



        // this.test = response
        // console.log(this.test.backdrop_path)
        // const resp: any = response
        // this.poster  = resp.backdrop_path
      })

    // setTimeout(() => {
    //   console.log(this.test.adult)
    // }, 1000)
  }
}
