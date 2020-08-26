import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '../service/language.service';
import { LanguageStorageService } from '../service/language-storage.service';

@Component({
  selector: 'app-grid-language',
  templateUrl: './grid-language.component.html',
  styleUrls: ['./grid-language.component.scss'],
})
export class GridLanguageComponent {
  isCreating = false;
  constructor(private router: Router) {
    if (this.router.url === '/quan-ly/them-moi') {
      this.isCreating = true;
    }
  }

  onCreateClick() {
    if (this.router.url === '/quan-ly/them-moi') {
      if(confirm("Bạn có chắc chắn muốn huỷ bỏ các thay đổi?")){
        this.isCreating = false;
        this.router.navigate(['quan-ly/chinh-sua']);
      }
    } else {
      this.isCreating = true;
      this.router.navigate(['quan-ly/them-moi']);
    }
  }
}
