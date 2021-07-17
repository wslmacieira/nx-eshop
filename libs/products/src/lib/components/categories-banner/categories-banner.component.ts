import { Component, OnDestroy, OnInit } from '@angular/core';
import { Category } from '../../models/category.model';
import { CategoriesService } from '../../services/categories.service';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'products-categories-banner',
  templateUrl: './categories-banner.component.html',
  styleUrls: ['./categories-banner.component.css']
})
export class CategoriesBannerComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  endSubs$: Subject<any> = new Subject();

  constructor(private ctagoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.ctagoriesService
      .getCategories()
      .pipe(takeUntil(this.endSubs$))
      .subscribe((categories) => (this.categories = categories));
  }

  ngOnDestroy(): void {
    this.endSubs$.next();
    this.endSubs$.complete();
  }
}
