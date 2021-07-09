import { Component } from '@angular/core';
import { RequestedFilm } from './search-box/search-box.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title: string
  rating: string
  poster: string
  plot: string
  releaseDate: string
  originalLanguage: string

  prepareDescription(info: RequestedFilm): void {
    console.log(info.results)
    if (info.results > 0) {
      this.title = info.title
      this.rating = info.voteAverage
      this.poster = info.posterPath
      this.plot = info.overview
      this.releaseDate = info.releaseDate
      this.originalLanguage = info.originalLanguage
    } else {
      alert('We could not find your request')
    }
  }
}
