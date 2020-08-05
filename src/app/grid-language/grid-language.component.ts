import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '../service/language.service';

@Component({
  selector: 'app-grid-language',
  templateUrl: './grid-language.component.html',
  styleUrls: ['./grid-language.component.scss'],
})
export class GridLanguageComponent {
  isCreating = false;
  constructor(private router: Router, private languageService: LanguageService) {}

  onCreateClick() {
    if (this.router.url === '/quan-ly/them-moi') {
      this.isCreating = false;
      this.router.navigate(['quan-ly/chinh-sua']);
      this.languageService.dirty = false;
    } else {
      if(this.languageService.dirty) {
        if(!confirm('Các chỉnh sửa có thể chưa được lưu!\nBạn có chắc chắn muốn thoát?')) return;
      };
      this.isCreating = true;
      this.router.navigate(['quan-ly/them-moi']);
    }
  }

  //lưu lại hàng và dữ liệu đã sửa
  // oldElement: HTMLCollectionOf<HTMLTableCellElement>[] = []
  // oldSelectedLanguage: LanguageObject[] = [];

  onCreateClick1() {
    // let language = new LanguageObject(
    //   '',
    //   '',
    //   '',
    //   '',
    //   new Date(),
    //   this.user,
    //   new Date(),
    //   this.user
    // )
    // this.languageService.insertFirstLanguage(language);
    // setTimeout(() => {
    //   let a:HTMLCollection = this.table.nativeElement.getElementsByTagName('tbody')
    //   let tdElements =  a[0].getElementsByTagName('tr')[0].getElementsByTagName('td');
    //   tdElements[0].innerHTML = `
    //     <td class="align-middle">
    //       <input class="form-control align-self-center culture" value="${language.culture}">
    //     </td>`
    //   tdElements[1].innerHTML = `<td class="align-middle"><input class="form-control key" value="${language.key}"></td>`
    //   tdElements[2].innerHTML = `<td class="align-middle"><input class="form-control value" value="${language.value}"></td>`
    //   this.oldElement.push(tdElements);
    //   this.oldSelectedLanguage.push(language);
    // }, 10);
  }

  onRowClick() {
    // //click vào hàng đang chọn -> bỏ qua
    // if (
    //   element.innerHTML.includes('<input') ||
    //   element.innerHTML.includes('<textarea')
    //   )
    //   return;
    // //nếu không phải click lần đầu
    // if(this.oldElement.length > 0){
    //   //trả lại giao diện cho element cũ
    //   let i = this.oldSelectedLanguage.length - 1;
    //   //trả lại các text trong <td>
    //   this.oldElement[this.oldElement.length-1][0].innerHTML = `<td class="align-middle">${this.oldSelectedLanguage[i].culture}</td>`
    //   this.oldElement[this.oldElement.length-1][1].innerHTML = `<td class="align-middle">${this.oldSelectedLanguage[i].key}</td>`
    //   this.oldElement[this.oldElement.length-1][2].innerHTML = `<td class="align-middle">${this.oldSelectedLanguage[i].value}</td>`
    // }
    // //Lấy các element <td>
    // let tdElement = element.getElementsByTagName('td');
    // //lưu lại các trạng thái cũ
    // this.oldSelectedLanguage.push(language);
    // this.oldElement.push(tdElement);
    // //thay đổi kiểu HTML thành input để nhập dữ liệu
    // tdElement[0].innerHTML = `
    //   <td class="align-middle">
    //     <input class="form-control align-self-center culture" value="${language.culture}">
    //   </td>`
    // tdElement[1].innerHTML = `<td class="align-middle"><input class="form-control key" value="${language.key}"></td>`
    // tdElement[2].innerHTML = `<td class="align-middle"><input class="form-control value" value="${language.value}"></td>`
    // //#region lưu lại trạng thái nếu có thay đổi
    // let inputCulture = element.getElementsByClassName('culture')[0];
    // inputCulture.addEventListener('change', (e: any)=>{
    //   language.culture = e.target.value;
    //   language.updatedUser = this.user;
    //   this.languages[i] = language;
    //   console.log(this.languages);
    //   //màu xanh nếu đã sửa đổi, màu đỏ nếu không hợp lệ
    //   if(language.culture!='' && language.culture!=null)
    //     inputCulture.parentElement.style.backgroundColor = '#b0cbf5';
    //   else inputCulture.parentElement.style.backgroundColor = '#ffabab';
    // })
    // //key
    // let inputKey = element.getElementsByClassName('key')[0];
    // inputKey.addEventListener('change', (e: any)=>{
    //   language.key = e.target.value;
    //   language.updatedUser = this.user;
    //   this.languages[i] = language;
    //   console.log(this.languages);
    //   //màu xanh nếu đã sửa đổi, màu đỏ nếu không hợp lệ
    //   if(language.key!='' && language.key!=null)
    //     inputKey.parentElement.style.backgroundColor = '#b0cbf5';
    //   else inputKey.parentElement.style.backgroundColor = '#ffabab';
    // })
    // //value
    // let inputValue = element.getElementsByClassName('value')[0];
    // inputValue.addEventListener('change', (e: any)=>{
    //   language.value = e.target.value;
    //   language.updatedUser = this.user;
    //   this.languages[i] = language;
    //   console.log(this.languages);
    //   //màu xanh nếu đã sửa đổi, màu đỏ nếu không hợp lệ
    //   if(language.value!='' && language.value!=null)
    //     inputValue.parentElement.style.backgroundColor = '#b0cbf5';
    //   else inputValue.parentElement.style.backgroundColor = '#ffabab';
    // })
    // //#endregion
  }

  onSaveClick() {
    //trả lại content cho <td> cuối cùng (loại bỏ input)
    // let i = this.oldSelectedLanguage.length-1;
    // let lastTdElement = this.oldElement[this.oldElement.length-1];
    // lastTdElement[0].innerHTML = `<td>${this.oldSelectedLanguage[i].culture}</td>`
    // lastTdElement[1].innerHTML = `<td>${this.oldSelectedLanguage[i].key}</td>`
    // lastTdElement[2].innerHTML = `<td>${this.oldSelectedLanguage[i].value}</td>`
    // //trả lại màu cho các ô đã chỉnh sửa
    // this.oldElement.forEach((tdElement: HTMLCollectionOf<HTMLTableCellElement>)=>{
    //   tdElement[0].style.backgroundColor = 'transparent'
    //   tdElement[1].style.backgroundColor = 'transparent'
    //   tdElement[2].style.backgroundColor = 'transparent'
    // });
    // //lưu lại trạng thái
    // this.languageService.setLanguages(this.languages.slice());
    // this.toastr.success('Save success!', 'SAVE');
  }
}
