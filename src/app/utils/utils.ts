import { HttpHeaders } from '@angular/common/http'

// ********** RXJS **********
import { of } from 'rxjs'

const isProduction: boolean = false

// ********** HTTP REQUEST ***********
export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
  withCredentials: true,
}

// ***** ENDPOINTS *****
const developmentBaseUrl: string = 'http://localhost:4200/assets/'
const productionBaseUrl: string = ''

export const finalGearUrl = isProduction
  ? productionBaseUrl + 'finalGear.json'
  : developmentBaseUrl + 'finalGear.json'

// ********** LOGS **********
export const handleError = (error: Error, errorValue: any) => {
  console.error(error)
  return of(errorValue)
}

export const log = (resValue: any, res: any) => {
  console.log(`${resValue} =>`, res)
}