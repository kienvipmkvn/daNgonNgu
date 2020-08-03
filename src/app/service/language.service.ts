import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { LanguageObject } from '../models/language.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  languagesSubject: Subject<LanguageObject[]> = new Subject<LanguageObject[]>();
  languages: LanguageObject[] = [
    new LanguageObject(
      '1',
      'us',
      'Sitetitle',
      'Angular Multi Language Site',
      new Date(),
      new User('1', 'test1@test.com', '', null),
      new Date(),
      new User('1', 'test1@test.com', '', null)
    ),
    new LanguageObject(
      '2',
      'us',
      'Name',
      'Name',
      new Date(),
      new User('1', 'test1@test.com', '', null),
      new Date(),
      new User('1', 'test1@test.com', '', null)
    ),
    new LanguageObject(
      '3',
      'us',
      'NameError',
      'I am sure you must have a name!',
      new Date(),
      new User('1', 'test1@test.com', '', null),
      new Date(),
      new User('1', 'test1@test.com', '', null)
    ),
    new LanguageObject(
      '4',
      'us',
      'Email',
      'Email address',
      new Date(),
      new User('1', 'test1@test.com', '', null),
      new Date(),
      new User('1', 'test1@test.com', '', null)
    ),
    new LanguageObject(
      '5',
      'us',
      'PhoneNo',
      'Phone No',
      new Date(),
      new User('1', 'test1@test.com', '', null),
      new Date(),
      new User('1', 'test1@test.com', '', null)
    ),
    new LanguageObject(
      '6',
      'vn',
      'Sitetitle',
      'Đa ngôn ngữ',
      new Date(),
      new User('1', 'test1@test.com', '', null),
      new Date(),
      new User('1', 'test1@test.com', '', null)
    ),
    new LanguageObject(
      '7',
      'vn',
      'Name',
      'Tên',
      new Date(),
      new User('1', 'test1@test.com', '', null),
      new Date(),
      new User('1', 'test1@test.com', '', null)
    ),
    new LanguageObject(
      '8',
      'vn',
      'NameError',
      'Tên không hợp lệ',
      new Date(),
      new User('1', 'test1@test.com', '', null),
      new Date(),
      new User('1', 'test1@test.com', '', null)
    ),
    new LanguageObject(
      '9',
      'vn',
      'Email',
      'Địa chỉ Email',
      new Date(),
      new User('1', 'test1@test.com', '', null),
      new Date(),
      new User('1', 'test1@test.com', '', null)
    ),
    new LanguageObject(
      '10',
      'vn',
      'PhoneNo',
      'Số điện thoại',
      new Date(),
      new User('1', 'test1@test.com', '', null),
      new Date(),
      new User('1', 'test1@test.com', '', null)
    ),
  ];
  listCulture = ['vn', 'us'];
  listCultureSubject: Subject<string[]> = new Subject<string[]>();

  constructor() {}

  getListCulture(){
    return this.listCulture.slice();
  }

  setListCulture(listCulture){
    this.listCulture = listCulture;
    this.listCultureSubject.next(this.listCulture.slice());
  }

  getLanguages() {
    return this.languages.slice();
  }

  getLanguage(i) {
    return this.languages.slice()[i];
  }

  insertFirstLanguage(languageObj: LanguageObject){
    let lgs = [languageObj];
    lgs.push(...this.languages.slice())
    this.languages = lgs;
    this.languagesSubject.next(this.languages.slice());
  }

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
}
