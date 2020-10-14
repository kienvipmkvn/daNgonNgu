import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../models/user.model';
import { LanguageService } from '../../service/language.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../service/auth.service';
import { LanguageObject } from '../../models/language.model';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { LanguageStorageService } from 'src/app/service/language-storage.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-create-new',
  templateUrl: './create-new.component.html',
  styleUrls: ['./create-new.component.scss']
})
export class CreateNewComponent implements OnInit{
  subscription: Subscription = new Subscription();
  regex = environment.regex;
  @ViewChild('tbody') tbody: ElementRef;
  user: User;
  //listCulture: {languageTypeId: number, codeName: string}[];
  //listAppType: {appID: number, appName: string}[];
  
  errorMessageType : string[] = environment.errorList.slice();

  languages: {
    languageTypeId: number,
    name: string,
    appID: number,
    value: string
  }[] = [];
  valid: boolean[] = [];

  constructor(
    public languageService: LanguageService,
    private toastr: ToastrService,
    private authService: AuthService,
    private languageStorage: LanguageStorageService
  ) {
    
  }

  ngOnInit(){
    this.authService.user.subscribe((user) => {
      this.user = user;
    });
    
    if(this.languageService.creatingLanguages.length > 0) {
      this.languages = this.languageService.creatingLanguages;
    }
    else this.onAddLanguage(10);
    
    setTimeout(() => {
      this.afterViewInit()
    }, 0);
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
      this.languages.push({
        languageTypeId: i%2?2:1,
        name: '',
        appID: 0,
        value: ''
      })
      this.valid.push(false);
    }
  }

  onInputChange(inputElement, i, cs: string){
    //lưu lại tất cả thay đổi
    switch (cs) {
      case 'culture':
        this.languages[i].languageTypeId = this.languageService.listCulture[+inputElement.selectedIndex].languageTypeId;
        break;

      case 'name':
        this.languages[i].name = inputElement.value;
        break;

      case 'appID':
        this.languages[i].appID = this.languageService.listAppType[+inputElement.selectedIndex].appID;
        break;

      case 'value':
        this.languages[i].value = inputElement.value;
        break;

      default:
        break;
    }

    if(cs=="culture" || cs=="appID"){
      let languageUsing = this.languages[i];
      if(this.checkIsConcidentClient(languageUsing, i)) this.valid[i] = false;
      else{
        if(languageUsing.name!='' && languageUsing.value!=''){
          let r = new RegExp(this.regex);
          if(r.test(languageUsing.name) && r.test(languageUsing.value)) this.valid[i] = true;
        }
      }
    }
    //validate lại từng thuộc tính của language
    if(cs=='name' || cs=='value'){
      if(this.validateRequired(inputElement) && this.validateNomalTextOnly(inputElement)){
        let languageUsing = this.languages[i];
        let r = new RegExp(this.regex);

        if(languageUsing.languageTypeId==null || languageUsing.appID==null ||
          languageUsing.name==null || languageUsing.name==''||
          languageUsing.value==null || languageUsing.value=='') {
            this.valid[i] = false;
        }

        else if(!r.test(languageUsing.name) || !r.test(languageUsing.value)){
          this.valid[i] = false;
        }

        else if(this.checkIsConcidentClient(languageUsing, i)){
          this.valid[i] = false;
        } 

        else{
          this.valid[i] = true;
        } 
      }
      else{
        this.valid[i] = false;
      } 
    }
  }

  onClick(inputElement, i, cs){
    this.validateRequired(inputElement);
    this.onInputChange(inputElement, i, cs);
  }

  checkIsConcidentClient(language:{
      languageTypeId: number,
      name: string,
      appID: number,
      value: string
    }, index){
    for (let i = 0; i < this.languages.length; i++) {
      const lang = this.languages[i];
      if(i!=index && lang.name!=''){
        if(lang.appID==language.appID && lang.languageTypeId==language.languageTypeId && lang.name==language.name){
          return true;
        }
      }
    }
    return false;
  }
  
  validateRequired(inputElement: HTMLInputElement){
    if(inputElement.value==null || inputElement.value=='') {
      inputElement.setAttribute('style', 'border: 1px solid red');
      inputElement.setAttribute('title', 'Không được để trống trường này!')
      return false;
    }
    else{
      inputElement.setAttribute('style', 'border: 1px solid rgb(206, 212, 218)');
      inputElement.setAttribute('title', '')
      return true;
    }
  }

  //validate chỉ chứa số hoặc chữ hoặc -, _
  validateNomalTextOnly(inputElement){
    let value: string = inputElement.value;
    let r = new RegExp(this.regex);
    if(!r.test(value)) {
      inputElement.setAttribute('style', 'border: 1px solid red');
      inputElement.setAttribute('title', 'Không được chứa ký tự đặc biệt!')
    }
    else{
      inputElement.setAttribute('style', 'border: 1px solid rgb(206, 212, 218)');
      inputElement.setAttribute('title', '')
    }
    return r.test(value)
  }

  onAddLanguageClick(){
    this.onAddLanguage(10);
  }

  onSave(){
    //lưu lại các languge valid
    let validLanguages = [];

    //lưu lại các language không valid
    let invalidLanguages = [];
    this.languages.forEach((language, i) => {
      if(this.valid[i]){
        validLanguages.push(language);
      }
      else{
        invalidLanguages.push(language);
      }
    });

    this.languages = invalidLanguages;
    this.valid = [];
    for (let i = 0; i < invalidLanguages.length; i++) {
      this.valid.push(false);
    }
    //check trùng
    //100ms mỗi request
    let i = 0;
    const interval = setInterval(() => {
      this.languageStorage.createLanguage({
        languageTypeId: validLanguages[i].languageTypeId,
        name: validLanguages[i].name,
        appID: validLanguages[i].appID,
        value: validLanguages[i].value,
        createdUser: this.user.userId
      }).subscribe((response:any)=>{
        if(response.data.status == true){
          this.toastr.success("Thêm mới thành công")
        }
        else{
          let errorMsg = "Có lỗi xảy ra!";
          console.log(errorMsg)
          this.languages.unshift(validLanguages[i]);
          this.valid.unshift(false);
          const error:string = response.data.value.Message;
          if(error.includes(this.errorMessageType[0])){
            errorMsg = "Key đã tồn tại!"
          }
          this.toastr.error(`Thêm mới thất bại!\nLỗi: ${errorMsg}`);
        }
      }, error=>{
        console.log(error);
        this.languages.unshift(validLanguages[i]);
        this.valid.unshift(true);
        this.toastr.error("Có lỗi xảy ra, không thể tạo mới!", "Lỗi")
      })
      i++;
      if(i==validLanguages.length) clearInterval(interval);
    }, 100);
  }

  onClear(){
    if(confirm("Bạn muốn huỷ bỏ tất cả thay đổi?")){
      this.languages.splice(0, this.languages.length);
      this.onAddLanguage(10);
    }
  }

  onChange(inputElement){
    if(this.validateRequired(inputElement) && this.validateNomalTextOnly(inputElement)){
      //let cultureName = inputElement.value.trim();
      // setTimeout(() => {
      //   if(!this.listCulture.includes(cultureName)) this.languageService.addListCulture(cultureName);
      // }, 0);
    }
  }


  onPasteContent(e){
    // this.setPointerProgress();
    // let text: string = e.clipboardData.getData('text');

    // let rows = text.split('\n');
    // let index = 0;
    // if(rows.length>this.languages.length){
    //   if(this.languages.length>0) this.languages = [];
    //   this.onAddLanguage(rows.length);
    // }
    // setTimeout(() => {
      
    //   let inputElements = this.tbody.nativeElement.getElementsByTagName('input');
    //   for (const row of rows) {
    //     let cols = row.split('\t');
    //     for (const col of cols) {
    //         inputElements[index].value = col;
    //         this.onInputChange(inputElements[index], Math.floor(index/3), index%3==0?'culture': index%3==1?'key':'value');
    //         index++;
    //       }
    //     this.setPointerDefault();
    //   }
      
    //   //gán giá trị cho ô đầu tiên
    //   setTimeout(() => {
    //     console.log(8);
    //     let cols = rows[0].split('\t');
    //     e.target.value = cols[0];
    //     this.onInputChange(e.target, 0, 'culture');
    //   }, 0);
    // }, 0);
  }

  getDate(){
    return new Date();
  }

  setPointerProgress(){
    document.body.style.cursor = 'progress';
  }
  
  setPointerDefault(){
    document.body.style.cursor = 'default ';
  }
}