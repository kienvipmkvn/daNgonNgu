import { Injectable } from '@angular/core';
import { LanguageObject } from '../models/language.model';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  languagesSubject: BehaviorSubject<LanguageObject[]> = new BehaviorSubject<LanguageObject[]>(null);
  languages: LanguageObject[];
  listCultureSubject: Subject<{languageTypeId: number, codeName: string}[]> = new Subject<{languageTypeId: number, codeName: string}[]>();
  listAppTypeSubject: Subject<{appID: number, appName: string}[]> = new Subject<{appID: number, appName: string}[]>();
  listCulture:{languageTypeId: number, codeName: string}[] = [];
  listAppType: {appID: number, appName: string}[] = [];
  creatingLanguages: {
    languageTypeId: number,
    name: string,
    appID:number,
    value: string
  }[] = [];
  editingIndex = -1;
  totalItemsSubject: Subject<number> = new Subject<number>();
  totalPagesSubject: Subject<number> = new Subject<number>();
  serchKeySubject: Subject<string> = new Subject<string>();
  totalItems: number;
  totalPages: number;
  searchKey: string;
  isLoading = false;


  constructor() {
    this.languagesSubject.next(this.languages);
    this.listCultureSubject.subscribe(cultures=>{
      this.listCulture = cultures;
    })
    
    this.listAppTypeSubject.subscribe(appTypes=>{
      this.listAppType = appTypes;
    })

    this.totalItemsSubject.subscribe(totalItems=>{
      this.totalItems = totalItems;
    })

    this.totalPagesSubject.subscribe(totalPage=>{
      this.totalPages = totalPage;
    })

    this.serchKeySubject.subscribe(serchKey=>{
      this.searchKey = serchKey;
    })
  }


  //lưu trữ và xử lý danh sách language đã tạo nhưng chưa được lưu
  getCreatingLanguages(){
    return this.creatingLanguages.slice();
  }

  setCreatingLanguges(creatingLanguages){
    console.log("Đang set creating");
    this.creatingLanguages = creatingLanguages;
  }

  clearCreatingLanguages(){
    this.creatingLanguages = [];
  }

  addCreatingLanguges(creatingLanguage){
    this.creatingLanguages.push(creatingLanguage);
  }


  //lưu trữ và xử ly
  getLanguages() {
    if(this.languages!=null)
    return this.languages.slice();
  }

  setTotalItems(total){
    this.totalItemsSubject.next(total);
  }

  setTotalPages(total){
    this.totalPagesSubject.next(total);
  }

  setSearchKey(searchKey){
    this.serchKeySubject.next(searchKey);
  }

  addLanguageObjs(languageObjs:LanguageObject[]){
    this.languages.push(...languageObjs);
    this.languagesSubject.next(this.languages.slice());
  }

  updateLanguageObj(language:{languageTypeId:number, name:string, appID: number, value:string, updatedUser:string}){
    let index = this.editingIndex;
    this.languages[index].languageTypeId = language.languageTypeId;
    this.languages[index].name = language.name;
    this.languages[index].value = language.value;
    this.languages[index].updatedUser = language.updatedUser;
    this.languagesSubject.next(this.languages.slice());
  }

  setLanguages(languages){
    this.languages = languages.slice();
    this.languagesSubject.next(languages.slice());
  }
}
