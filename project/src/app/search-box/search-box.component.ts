import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

interface AdditionalParams {
  quantityPages: string,
  adult: string
}

export interface RequestedFilm {
  results: number,
  title: string,
  overview: string,
  backdropPath: string,
  posterPath: string,
  voteAverage: string,
  releaseDate: string,
  originalLanguage: string
}

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {

  @Output() responseListener: EventEmitter<RequestedFilm> = new EventEmitter<RequestedFilm>()

  public query: string = ''
  public poster: string = 'https://image.tmdb.org/t/p/original/'
  private APIKey: string = '235947a0441502b62ad0d04d5a5abfcd'
  private additionalQueryParams: AdditionalParams = {
    quantityPages: '&page=1',
    adult: '&include_adult=false'
  }
   // private searchMovieURL: string = `https://api.themoviedb.org/3/search/movie?api_key=${this.APIKey}&language=en-US&query=${this.query}`

  public filmsDBResponse: RequestedFilm | null = null

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  get searchMovieURL() {
    return `https://api.themoviedb.org/3/search/movie?api_key=${this.APIKey}&language=en-US&query=` + this.query.toLocaleLowerCase()
  }

  startSearch(): void {
    this.http.get<any>(this.searchMovieURL + this.additionalQueryParams.quantityPages + this.additionalQueryParams.quantityPages)
      .subscribe(response => {
        console.log(response)
        this.filmsDBResponse = {
          results: response.results.length,
          title: response.results[0].title,
          overview: response.results[0].overview,
          backdropPath: response.results[0].backdrop_path,
          posterPath: this.poster + response.results[0].poster_path,
          voteAverage: response.results[0].vote_average,
          releaseDate: response.results[0].release_date,
          originalLanguage: response.results[0].original_language
        }

        this.responseListener.emit(this.filmsDBResponse)
      })

      this.query = ''
  }
}
