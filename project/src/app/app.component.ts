import { HttpBackend, HttpClient, HttpEvent, HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

export interface Todo {
  completed: boolean,
  title: string,
  id?: number
}
export interface FilmsDBResponse {
  title: string,
  overview: string,
  backdropPath: string,
  posterPath: string,
  voteAverage: string
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  todos: Todo[] = []
  poster: string = 'https://image.tmdb.org/t/p/original/'

  postTest: Todo[] = [
    {completed: true, title: 'The first post', id: 1111},
    {completed: false, title: 'The second post', id: 2222},
    {completed: true, title: 'The three post', id: 3333}
  ]

  searchingValue: string = ''
  movies: FilmsDBResponse | null = null

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos?_limit=2')
      .subscribe(todos => {
        console.log('Response', todos)
        this.todos = todos
      })

    // this.http.get<Object[]>('https://jsonplaceholder.typicode.com/todos?_limit=2')
    //   .subscribe(response => {
    //     console.log(response[1])
    //   })

    // this.http.get<any>('https://api.themoviedb.org/3/movie/550?api_key=235947a0441502b62ad0d04d5a5abfcd')
    //   .subscribe(response => {
    //     console.log('Response from TMBD', response.backdrop_path)

    //     // this.poster += response.backdrop_path
    //   })

    // this.http.get<HttpEventType>('https://api.themoviedb.org/3/movie/550?api_key=235947a0441502b62ad0d04d5a5abfcd')  // recently working version
    //   .subscribe(response => {
    //     console.log('Response from TMBD', (<any>response).backdrop_path)

    //     this.poster += (<any>response).backdrop_path
    //   })

      // this.http.get<Observable<any>>('https://api.themoviedb.org/3/movie/550?api_key=235947a0441502b62ad0d04d5a5abfcd')
      // .subscribe(response => {
      //   console.log('Response from TMBD', (response as any).backdrop_path)

      //   this.poster += (<any>response).backdrop_path
      // })


      // https://api.themoviedb.org/3/discover/movie?primary_release_year=2010&sort_by=vote_average.desc
  }

  updatePostTest(newP: Todo): void {
    this.postTest.unshift(newP)
  }

  search() {
    if (this.searchingValue.trim()) {
      this.http.get<any>('https://api.themoviedb.org/3/search/movie?api_key=235947a0441502b62ad0d04d5a5abfcd&language=en-US&query=' + this.searchingValue + '&page=1&include_adult=false')
        .subscribe(response => {
          console.log(response)

          if (response.results.length === 0) {
            alert('We could not find anything')
            this.movies = null
            return
          }

          this.movies = {
            title: response.results[0].original_title,
            overview: response.results[0].overview,
            backdropPath: response.results[0].backdropPath,
            posterPath: this.poster + response.results[0].poster_path,
            voteAverage: response.results[0].vote_average
          }
        })
    }
  }
}


