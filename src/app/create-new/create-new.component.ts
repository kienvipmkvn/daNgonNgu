import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../models/user.model';
import { LanguageService } from '../service/language.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { LanguageObject } from '../models/language.model';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-create-new',
  templateUrl: './create-new.component.html',
  styleUrls: ['./create-new.component.scss']
})
export class CreateNewComponent {
  regex = /^[ .,a-zA-Z0-9_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/

  @ViewChild('tbody') tbody: ElementRef;
  user: User;
  listCulture: string[];

  constructor(
    private languageService: LanguageService,
    private toastr: ToastrService,
    private authService: AuthService,
  ) {
    this.authService.user.subscribe((user) => {
      this.user = user;
    });
    this.onAddLanguage(10);
    this.listCulture = this.languageService.listCulture;
  }

  validObjs :{
    language: LanguageObject,
    valid: boolean
  }[] = [];

  onAddLanguage(num){
    for (let i = 0; i < num; i++) {
      let language = new LanguageObject('','','','',new Date(), this.user, new Date(),this.user);
      this.validObjs.push({
        language: language,
        valid: false
      });
    }

  }

  onInputChange(inputElement:HTMLInputElement, i, cs: string){
    //lưu lại tất cả thay đổi
    switch (cs) {
      case 'culture':
        this.validObjs[i].language.culture = inputElement.value;
        break;
        
      case 'key':
        this.validObjs[i].language.key = inputElement.value;
        break;

      case 'value':
        this.validObjs[i].language.value = inputElement.value;
        break;

      default:
        break;
    }

    //validate lại từng thuộc tính của language
    if(this.validateRequired(inputElement) && this.validateNomalTextOnly(inputElement)){
      let languageUsing = this.validObjs[i].language;
      let r = new RegExp(this.regex);

      if(languageUsing.culture==null || languageUsing.culture=='' ||
        languageUsing.key==null || languageUsing.key==''||
        languageUsing.value==null || languageUsing.value=='') {
          this.validObjs[i].valid = false;
      }

      else if(!r.test(languageUsing.culture) || !r.test(languageUsing.key) || !r.test(languageUsing.value)){
        this.validObjs[i].valid = false;
      }

      else this.validObjs[i].valid = true;
    }
    else this.validObjs[i].valid = false;
  }

  onClick(inputElement, i, cs){
    this.validateRequired(inputElement);
    this.onInputChange(inputElement, i, cs);
    
  }

  onChange(inputElement, i, cs){
    if(cs=='culture'){
      if(this.validateRequired(inputElement) && this.validateNomalTextOnly(inputElement)){
        console.log(inputElement.value);
        let cultureName = inputElement.value;
        if(!this.listCulture.includes(cultureName)) this.listCulture.push(cultureName);
      }
    }
  }

  validateRequired(inputElement){
    if(inputElement.value==null || inputElement.value=='') {
      inputElement.setAttribute('style', 'border: 1px solid red')
      return false;
    }
    else{
      inputElement.setAttribute('style', 'border: 1px solid rgb(206, 212, 218)')
      return true;
    }
  }

  //validate chỉ chứa số hoặc chữ hoặc -, _
  validateNomalTextOnly(inputElement){
    let value: string = inputElement.value;
    let r = new RegExp(this.regex);
    if(!r.test(value)) {
      inputElement.setAttribute('style', 'border: 1px solid red')
    }
    else{
      inputElement.setAttribute('style', 'border: 1px solid rgb(206, 212, 218)')
    }
    return r.test(value)
  }

  onSave(){
    //lưu lại các languge valid
    let validLanguages: LanguageObject[] = [];

    //lưu lại các obj không valid
    let tempValidObjs = [];
    this.validObjs.forEach((validObj, i) => {
      if(validObj.valid){
        validLanguages.push(validObj.language);
      }
      else{
        tempValidObjs.push(validObj);
      }
    });

    this.validObjs = tempValidObjs;
    if(this.validObjs.length == 0) this.validObjs.push(
        {
          language: new LanguageObject('','','','',new Date(), this.user, new Date(),this.user), 
          valid: false
        }
      )
    this.languageService.addLanguageObjs(validLanguages);
  }

  onClear(){
    this.validObjs = [];
    this.onAddLanguage(10);
  }

  onPasteContent(e){
    let text: string = e.clipboardData.getData('text');

    let rows = text.split('\n');
    let index = 0;
    if(rows.length>this.validObjs.length){
      this.onAddLanguage(rows.length - this.validObjs.length);
    }
    
    setTimeout(() => {
      let inputElements = this.tbody.nativeElement.getElementsByTagName('input');
      for (const row of rows) {
        let cols = row.split('\t');
        for (const col of cols) {
          inputElements[index].value = col;
          this.onInputChange(inputElements[index], Math.floor(index/3), index%3==0?'culture': index%3==1?'key':'value');
          if(index%3==0) this.onChange(inputElements[index],  Math.floor(index/3), 'culture');
          index++;
        }
      }
      
      setTimeout(() => {
        let cols = rows[0].split('\t');
        e.target.value = cols[0];
        this.onInputChange(e.target, 0, 'culture');
      }, 0);
    }, 0);
  }

  getDate(){
    return new Date();
  }
}