import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../models/user.model';
import { LanguageService } from '../../service/language.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../service/auth.service';
import { LanguageObject } from '../../models/language.model';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-create-new',
  templateUrl: './create-new.component.html',
  styleUrls: ['./create-new.component.scss']
})
export class CreateNewComponent implements OnDestroy{
  isLoading = false;
  subscription: Subscription = new Subscription();
  regex = environment.regex;
  @ViewChild('tbody') tbody: ElementRef;
  user: User;
  listCulture: string[];
  validObjs :{
    language: LanguageObject,
    valid: boolean
  }[] = [];

  constructor(
    private languageService: LanguageService,
    private toastr: ToastrService,
    private authService: AuthService,
  ) {
    this.subscription.add(this.authService.user.subscribe((user) => {
      this.user = user;
    }));
    
    if(this.languageService.creatingLanguages.length > 0) {
      this.setPointerProgress();
      let length = this.languageService.creatingLanguages.length;
      this.languageService.creatingLanguages.forEach((createLang, index)=> {
        setTimeout(() => {
          this.validObjs.push(createLang);
          if(index == length-1) this.setPointerDefault();
        }, 0);
      })
    }
      
    else this.onAddLanguage(10);
    this.listCulture = this.languageService.listCulture;
    this.subscription.add(this.languageService.listCultureSubject.subscribe(cultures=>{
      this.listCulture = cultures;
    }))

    setTimeout(() => {
      this.afterViewInit()
    }, 0);
  }

  ngOnDestroy(){
    this.languageService.setCreatingLanguges(this.validObjs);
    this.subscription.unsubscribe();
    this.setPointerDefault();
  }

  afterViewInit(){
    this.setPointerProgress();
    let inputElements = this.tbody.nativeElement.getElementsByTagName('input');
    let length = inputElements.length;
    let index = 0;
    
      for (const inputElement of inputElements) {
        setTimeout(() => {
          index++;
          if(inputElement.value != '' && inputElement.value != null && inputElement.value!=undefined){
            this.validateRequired(inputElement);
            this.validateNomalTextOnly(inputElement);
          }
          if(index == length-1) this.setPointerDefault();
        }, 0);
      }
  }

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
    if(this.isLoading) return;
    this.validateRequired(inputElement);
    this.onInputChange(inputElement, i, cs);
    
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

  onAddLanguageClick(){
    if(this.isLoading) return;
    this.onAddLanguage(10);
  }

  onSave(){
    if(this.isLoading) return;
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
    this.languageService.addLanguageObjs(validLanguages);
  }

  onClear(){
    if(this.isLoading) return;
    this.validObjs.splice(0, this.validObjs.length);
    this.onAddLanguage(10);
  }

  onChange(inputElement){
    if(this.validateRequired(inputElement) && this.validateNomalTextOnly(inputElement)){
      let cultureName = inputElement.value.trim();
      setTimeout(() => {
        if(!this.listCulture.includes(cultureName)) this.languageService.addListCulture(cultureName);
      }, 0);
    }
  }

  onPasteContent(e){
    this.setPointerProgress();
    console.log(e);
    let inputElementsTemp = [];
    let inputElementsTempIndex = 0;
    console.log(1);
    let text: string = e.clipboardData.getData('text');

    let rows = text.split('\n');
    console.log(2);
    let index = 0;
    if(rows.length>this.validObjs.length){
      if(this.validObjs.length>0) this.validObjs = [];
      this.onAddLanguage(rows.length);
    }
    console.log(3);
    
    //paste
    setTimeout(() => {
      console.log(4);
      let inputElements = this.tbody.nativeElement.getElementsByTagName('input');
      for (const row of rows) {
        let cols = row.split('\t');
        
        console.log(5);
        for (const col of cols) {
          
          console.log(6);
          setTimeout(() => {
            inputElements[index].value = col;
            this.onInputChange(inputElements[index], Math.floor(index/3), index%3==0?'culture': index%3==1?'key':'value');
            inputElementsTemp.push(inputElements[index])
            index++;

            //lưu lại cultures
            setTimeout(() => {
              console.log(7);
              if(inputElementsTempIndex%3==0) 
                this.onChange(inputElementsTemp[inputElementsTempIndex]);
                inputElementsTempIndex++;
                this.setPointerDefault();
            }, 0);
          }, 0);
        }
        
      }
      
      //gán giá trị cho ô đầu tiên
      setTimeout(() => {
        console.log(8);
        let cols = rows[0].split('\t');
        e.target.value = cols[0];
        this.onInputChange(e.target, 0, 'culture');
      }, 0);
    }, 0);
  }

  getDate(){
    return new Date();
  }

  setPointerProgress(){
    document.body.style.cursor = 'progress';
    this.isLoading = true;
  }
  
  setPointerDefault(){
    document.body.style.cursor = 'default ';
    this.isLoading = false;
  }
}