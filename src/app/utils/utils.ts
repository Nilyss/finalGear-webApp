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
// localIpAddress: string = 'http://192.168.1.23:4200 // FOR MOBILE TESTING

const developmentBaseUrl: string = 'http://localhost:4200/assets/datas/'
const productionBaseUrl: string =
  'https://nilyss.github.io/finalGear-webApp/assets/datas/'

// ***** FINAL GEAR *****
export const finalGearUrl = isProduction
  ? productionBaseUrl + 'finalGear.json'
  : developmentBaseUrl + 'finalGear.json'

// ***** YOUTUBE *****
export const youtubeDatasUrl = isProduction
  ? productionBaseUrl + 'youtubeDatas.json'
  : developmentBaseUrl + 'youtubeDatas.json'

// ********** LOGS **********
export const handleError = (error: Error, errorValue: any) => {
  console.error(error)
  return of(errorValue)
}

export const log = (resValue: any, res: any) => {
  console.log(`${resValue} =>`, res)
}
