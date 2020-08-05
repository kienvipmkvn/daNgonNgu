import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { LanguageObject } from '../models/language.model';
import { Subject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  user: User;
  languagesSubject: Subject<LanguageObject[]> = new Subject<LanguageObject[]>();
  languages: LanguageObject[];
  listCulture = ['vn', 'us'];
  listCultureSubject: Subject<string[]> = new Subject<string[]>();
  creatingLanguages: {language: LanguageObject, valid: boolean}[] = [];
  dirty:boolean = false;

  constructor(private authService: AuthService) {
    this.authService.user.subscribe((user)=>{
      this.user = user;
      this.languages = [
        new LanguageObject(
          '1',
          'us',
          'Sitetitle',
          'Angular Multi Language Site',
          new Date(),
          this.user,
          new Date(),
          this.user
        ),
        new LanguageObject(
          '2',
          'us',
          'Name',
          'Name',
          new Date(),
          this.user,
          new Date(),
          this.user,
        ),
        new LanguageObject(
          '3',
          'us',
          'NameError',
          'I am sure you must have a name!',
          new Date(),
          this.user,
          new Date(),
          this.user,
        ),
        new LanguageObject(
          '4',
          'us',
          'Email',
          'Email address',
          new Date(),
          this.user,
          new Date(),
          this.user,
        ),
        new LanguageObject(
          '5',
          'us',
          'PhoneNo',
          'Phone No',
          new Date(),
          this.user,
          new Date(),
          this.user,
        ),
        new LanguageObject(
          '6',
          'vn',
          'Sitetitle',
          'Đa ngôn ngữ',
          new Date(),
          this.user,
          new Date(),
          this.user,
        ),
        new LanguageObject(
          '7',
          'vn',
          'Name',
          'Tên',
          new Date(),
          this.user,
          new Date(),
          this.user,
        ),
        new LanguageObject(
          '8',
          'vn',
          'NameError',
          'Tên không hợp lệ',
          new Date(),
          this.user,
          new Date(),
          this.user,
        ),
        new LanguageObject(
          '9',
          'vn',
          'Email',
          'Địa chỉ Email',
          new Date(),
          this.user,
          new Date(),
          this.user,
        ),
        new LanguageObject(
          '10',
          'vn',
          'PhoneNo',
          'Số điện thoại',
          new Date(),
          this.user,
          new Date(),
          this.user,
        ),
      ];
      this.languagesSubject.next(this.languages);
    })
  }

  //lưu trữ và xử lý danh sách các culture
  getListCulture(){
    return this.listCulture.slice();
  }

  setListCulture(listCulture){
    this.listCulture = listCulture;
    this.listCultureSubject.next(this.listCulture.slice());
  }

  addListCulture(culture){
    this.listCulture.push(culture);
    this.listCultureSubject.next(this.listCulture.slice())
  }


  //lưu trữ và xử lý danh sách language đã tạo nhưng chưa được lưu
  getCreatingLanguages(){
    return this.creatingLanguages.slice();
  }

  setCreatingLanguges(creatingLanguages){
    this.creatingLanguages = creatingLanguages;
  }

  clearCreatingLanguages(){
    this.creatingLanguages = [];
  }

  addCreatingLanguges(creatingLanguage){
    this.creatingLanguages.push(creatingLanguage);
  }


  //lưu trữ và xử l
  getLanguages() {
    return this.languages.slice();
  }

  getLanguage(i) {
    return this.languages.slice()[i];
  }

  // insertFirstLanguage(languageObj: LanguageObject){
  //   let lgs = [languageObj];
  //   lgs.push(...this.languages.slice())
  //   this.languages = lgs;
  //   this.languagesSubject.next(this.languages.slice());
  // }

  addLanguageObj(languageObj: LanguageObject){
    this.languages.push(languageObj);
    this.languagesSubject.next(this.languages.slice());
  }

  addLanguageObjs(languageObjs:LanguageObject[]){
    this.languages.push(...languageObjs);
    this.languagesSubject.next(this.languages.slice());
  }

  updateLanguageObj(language: LanguageObject, id: string){
    let index = this.getIndex(id);
    this.languages[index] = language;
    this.languagesSubject.next(this.languages.slice());
  }

  getIndex(id){
    let index = this.languages.findIndex(data=>{
      return data.id === id;
    })
    return index;
  }

  setLanguages(languages){
    this.languages = languages;
    this.languagesSubject.next(languages);
  }

  checkIsConcident(lang: LanguageObject){
    for (const language of this.languages) {
      if(lang.culture.trim() == language.culture.trim() && lang.key.trim() == language.key.trim()) return true;
    }
    return false;
  }
}
