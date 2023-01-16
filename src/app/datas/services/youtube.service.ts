import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

// ********** RXJS **********
import { Observable, catchError } from 'rxjs'

// ********** MODELS **********
import { Youtube } from '../models/youtube'

// ********** UTILS **********
import * as Utils from '../../utils/utils'

@Injectable({ providedIn: 'root' })
export class YoutubeService {
  youtube: Youtube

  getYoutubePlaylist(): Observable<Youtube['playlists'][]> {
    return this.http
      .get<Youtube['playlists'][]>(Utils.youtubeDatasUrl, Utils.httpOptions)
      .pipe(catchError((error) => Utils.handleError(error, error)))
  }

  constructor(private http: HttpClient) {}
}
