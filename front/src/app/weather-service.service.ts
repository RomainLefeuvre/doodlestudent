import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from'moment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http: HttpClient) { }
  private key = 'b758b8cf956740b8bff95022e6d6bc8a';
  private list=[];

  public  getWeatherIcon(zipCode:string,date:Date):string{
    var weather=this.list.filter(element =>{
      return (moment(element.datetime,'YYYY-MM-DD').diff(moment(date),'days')==0);

    })
    return weather[0]?.weather?.icon

  }

  public loadData(zipCode):Observable<any>{
    const params= new HttpParams()
    .set('key',this.key)
    .set('postal_code',zipCode)
    .set('country','FR')
    return this.http.get<any>('https://api.weatherbit.io/v2.0/forecast/daily',{params:params})
      .pipe<any>(
        map(result =>{ 
          this.list=result.data 
          console.log(this.list)
          return 
        })
      );
  }
}
