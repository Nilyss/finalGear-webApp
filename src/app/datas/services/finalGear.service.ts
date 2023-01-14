import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

// ********** RXJS **********
import { Observable, tap, catchError } from 'rxjs'

// ********** MODELS **********
import { FinalGear } from '../models/finalGear'

// ********** UTILS **********
import * as Utils from '../../utils/utils'

@Injectable({ providedIn: 'root' })
export class FinalGearService {
  finalGear: FinalGear

  getFinalGearInfos(): Observable<FinalGear> {
    return this.http.get<FinalGear>(Utils.finalGearUrl, Utils.httpOptions).pipe(
      tap((res: FinalGear) => Utils.log('service: getFinalGearInfos', res)),
      catchError((error) => Utils.handleError(error, error))
    )
  }
  constructor(private http: HttpClient) {}
}
