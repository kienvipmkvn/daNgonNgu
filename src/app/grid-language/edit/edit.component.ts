import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { LanguageService } from '../../service/language.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../service/auth.service';
import { LanguageObject } from '../../models/language.model';
import { environment } from 'src/environments/environment';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnDestroy {
  @ViewChild('form') form: NgForm;
  subscription: Subscription = new Subscription();
  user: User;
  languages: LanguageObject[] = [];
  edittingLanguage: LanguageObject;
  edittingIndex: number;
  edited: number[] = [];
  currentPage = 1;
  regex = environment.regex;
  listCulture: string[];

  constructor(
    private languageService: LanguageService,
    private toastr: ToastrService,
    private authService: AuthService
  ) {
    this.languages = this.languageService.getLanguages();
    this.listCulture = this.languageService.getListCulture();
    this.subscription.add(this.authService.user.subscribe((user) => {
      this.user = user;
    }));
    this.subscription.add(this.languageService.languagesSubject.subscribe((objs) => {
      this.languages = objs;
    }));
    this.subscription.add(this.languageService.listCultureSubject.subscribe((cultures)=>{
      this.listCulture = cultures;
    }));
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }


  onSubmit(){
    if(this.form.invalid) return;
    let id = this.form.value['id'];
    let culture = this.form.value['culture'];
    let key = this.form.value['key'];
    let value = this.form.value['value'];
    
    let createUser = this.edittingLanguage.createdUser;
    let createDate = this.edittingLanguage.createdDate;
    let language = new LanguageObject(id, culture, key, value, createDate, createUser, new Date(), this.user);

    if(this.languageService.checkIsConcident(language)){
      this.toastr.error("Cặp culture và key đã tồn tại!", "Lỗi");
      return;
    }
    
    this.languages[this.edittingIndex] = language;
    this.edited.push(this.edittingIndex);
    this.form.reset();
    this.onRowSelect(language, this.edittingIndex);
    this.languageService.dirty = true;
  }

  isEditted(i){
    return this.edited.includes(i);
  }

  onRowSelect(language, i){
    this.edittingLanguage = language;
    this.edittingIndex = i;
    this.form.controls['id'].setValue(language.id);
    this.form.controls['culture'].setValue(language.culture);
    this.form.controls['key'].setValue(language.key);
    this.form.controls['value'].setValue(language.value);
  }

  onReset(language){
    this.form.reset();
    this.form.controls['id'].setValue(language.id);
    this.form.controls['culture'].setValue(language.culture);
    this.form.controls['key'].setValue(language.key);
    this.form.controls['value'].setValue(language.value);
  }

  onSave(){
    this.languageService.setLanguages(this.languages);
    this.edited = [];
    this.toastr.success("Lưu thành công");
    this.languageService.dirty = false;
  }

  getDate(){
    return new Date();
  }

  onChange(culture){
    if(culture.valid){
      this.listCulture.push(culture.value);
    }
  }

  changePage(page){
    if(page>0) this.currentPage = page;
    console.log('change to page ' + page);
    if(page<=0) this.toastr.warning('<= 0 thì go cmm à!', 'Nqu')
  }
}