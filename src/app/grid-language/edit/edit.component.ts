import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../models/user.model';
import { LanguageService } from '../../service/language.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../service/auth.service';
import { LanguageObject } from '../../models/language.model';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { LanguageStorageService } from 'src/app/service/language-storage.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnDestroy, OnInit {
  @ViewChild('form') form: NgForm;
  subscription: Subscription = new Subscription();
  user: User;
  languages: LanguageObject[] = [];
  edittingLanguage: LanguageObject;
  edittingIndex: number;
  currentPage = 1;
  regex = environment.regex;
  pageSize = 10;
  //totalPages = 0;
  //totalItems = 0;
  //searchKey = "";
  //listCulture: {languageTypeId: number, codeName: string}[] = [];
  //listAppType: {appID: number, appName: string}[] = [];
  languageTypeId = null;
  appTypeId = null;
  orderAsc = true;
  oldLanguage: LanguageObject;

  constructor(
    public languageService: LanguageService,
    public languageStorage: LanguageStorageService,
    private toastr: ToastrService,
    private authService: AuthService,
  ) {
    
  }

  ngOnInit(){
    this.subscription.add(this.authService.user.subscribe((user) => {
      this.user = user;
    }));
    this.subscription.add(this.languageService.languagesSubject.subscribe((objs) => { 
      this.languages = objs;
      if(this.languages == null || this.languages == undefined)
        this.languageStorage.fetchLanguage(1, this.pageSize, this.orderAsc);
    }));
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  
  
  onSubmit(){
    if(this.form.invalid) return;
    let value = this.form.value['value'];
    this.edittingLanguage.value = value;
    this.edittingLanguage.updatedUser = this.user.userId;
    
    this.languages[this.edittingIndex] = this.edittingLanguage;
    this.form.reset();
    this.setFormValue(this.edittingLanguage, this.edittingIndex);
    this.languageStorage.updateLanguage(this.edittingLanguage).subscribe((response:any)=>{
      console.log(this.edittingLanguage);
      if(response.data.status == true){
        this.toastr.success("Cập nhật thành công");
      }
      else{
        this.toastr.error(`Cập nhật thất bại!\nLỗi: ${response.value}`);
        console.log(this.oldLanguage)
        this.edittingLanguage = this.oldLanguage;
        this.languages[this.edittingIndex] = this.edittingLanguage;
      }
    }, error=>{
      console.log(error);
      this.toastr.error("Có lỗi xảy ra, không thể cập nhật!", "Lỗi")
      console.log(this.oldLanguage);
      this.edittingLanguage = this.oldLanguage;
      this.languages[this.edittingIndex] = this.edittingLanguage;
    });
  }

  onRowSelect(language: LanguageObject, i){
    this.oldLanguage = new LanguageObject(language.languageTypeId, language.name, language.appID, language.value, language.created, language.createdUser, language.updated, language.updatedUser, language.isActive, language.version);
    this.setFormValue(language, i);
  }

  setFormValue(language: LanguageObject, i){
    this.languageService.editingIndex = this.edittingIndex;
    this.edittingLanguage = language;
    this.edittingIndex = i;
    this.form.controls['culture'].setValue(language.languageTypeId);
    this.form.controls['name'].setValue(language.name);
    this.form.controls['appID'].setValue(language.appID);
    this.form.controls['value'].setValue(language.value);
  }

  onReset(language){
    this.form.reset();
    this.form.controls['culture'].setValue(language.languageTypeId);
    this.form.controls['name'].setValue(language.name);
    this.form.controls['appID'].setValue(language.appID);
    this.form.controls['value'].setValue(language.value);
  }

  getDate(){
    return new Date();
  }

  getCulture(languageTypeId){
    for (const culture of this.languageService.listCulture) {
      if(culture.languageTypeId === languageTypeId) return culture.codeName;
    }
    return "Error";
  }

  getAppType(appId){
    for (const appType of this.languageService.listAppType) {
      if(appType.appID === appId) return appType.appName;
    }
    return "Error";
  }

  changePage(pageIndex: number){
    if(pageIndex>0 && pageIndex<=this.languageService.totalPages) {
      if(pageIndex!=this.currentPage){
        this.languageStorage.fetchLanguage(pageIndex, this.pageSize, this.orderAsc, this.languageService.searchKey, this.languageTypeId, this.appTypeId);
        this.currentPage = pageIndex;
        this.form.reset();
      }
    }
    else{
      this.toastr.warning("Số trang không hợp lệ", "Lỗi");
    }
  }

  onSearchClick(el: HTMLInputElement){
    let searchKey = el.value;
    this.languageStorage.fetchLanguage(1, this.pageSize, this.orderAsc, searchKey, this.languageTypeId, this.appTypeId);
  }

  onCultureChange(el: HTMLSelectElement){
    if(el.selectedIndex==0){
      this.languageTypeId = null;
    }
    else{
      this.languageTypeId = this.languageService.listCulture[el.selectedIndex-1].languageTypeId;
    }
  }

  onAppTypeChange(el: HTMLSelectElement){
    if(el.selectedIndex==0){
      this.appTypeId = null;
    }
    else{
      this.appTypeId = this.languageService.listAppType[el.selectedIndex-1].appID;
    }
  }
  
  onSortChange(){
    this.orderAsc = !this.orderAsc;
  }
}
