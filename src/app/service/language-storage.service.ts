import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { LanguageService } from './language.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn:'root'
})
export class LanguageStorageService{
  isLoading = false;
  constructor(private http: HttpClient, private languageService: LanguageService, private toastr: ToastrService){
    this.fetchCulture();
    this.fetchAppType();
  }

  fetchLanguage(pageIndex, pageSize, orderAsc, searchKey?, languageTypeId?, appId?){
    this.isLoading = true;
    this.languageService.setSearchKey(searchKey);
    let params = "?";
    if(searchKey!=null && searchKey!=undefined && searchKey != "") params += "searchKey=" + searchKey + "&";
    
    if(languageTypeId!=null && languageTypeId!=undefined )  params += "langId=" + languageTypeId + "&";

    if(appId!=null && appId!=undefined)  params += "appId=" + appId + "&";

    if(orderAsc==false)  params += "sort=desc";

    return this.http.get(environment.api.languageApi +"/" + pageIndex + "/" + pageSize + params)
      .pipe(map((data: any)=>{
        this.languageService.setTotalItems(data.data.value.totalItems);
        this.languageService.setTotalPages(data.data.value.totalPages);
        return data.data.value.items;
      }))
      .subscribe(data=>{
        this.languageService.setLanguages(data);
        this.isLoading = false;
      },
      error=>{
        console.log(error);
        this.toastr.error("Có lỗi xảy ra, không thể tải dữ liệu!", "Lỗi")
        this.isLoading = false;
      });
  }

  updateLanguage(language:{languageTypeId:number, name:string, appID:number, value:string, updatedUser:string}){
    this.languageService.updateLanguageObj(language);
    return this.http.put(environment.api.languageApi, {
      ...language
    })
  }

  createLanguage(language:{languageTypeId:number, name:string, appID:number, value:string, createdUser:string}){
    return this.http.post(environment.api.languageApi, {
      ...language
    })
  }

  fetchCulture(){
    this.http.get(environment.api.cultureApi+"/cultureType").subscribe((datas:{languageTypeId: number, codeName: string}[])=>{
      this.languageService.listCultureSubject.next(datas);
    })
  }
  
  fetchAppType(){
    this.http.get(environment.api.appTypeApi).subscribe((datas:{appID: number, appName: string}[])=>{
      this.languageService.listAppTypeSubject.next(datas);
    })
  }
}