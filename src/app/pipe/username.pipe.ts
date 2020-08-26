import { Pipe, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';

@Pipe({
  name:"usernamePipe"
})
export class UserNamePipe implements PipeTransform{
  constructor(private http: HttpClient){}

  transform(value: string){
    return this.http.get(environment.api.userApi+ "/" + value)
    .pipe(map((resData: any)=>{
      if(resData.data.status){
        return resData.data.value;
      }
      else{
        return "Null!";
      }
    }),
    catchError(error=>{
      console.log(error);
      return "Lỗi!!!";
    }))
  }
}