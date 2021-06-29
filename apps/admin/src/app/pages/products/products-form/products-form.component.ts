import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Category } from '@dwll/products';

@Component({
  selector: 'dwll-products-form',
  templateUrl: './products-form.component.html',
  styles: [
  ]
})
export class ProductsFormComponent implements OnInit {
  form!: FormGroup;
  editMode = false;
  isSubmitted = false;
  categories: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService
    ) { }

  ngOnInit(): void {
    this._initForm();
    this._getCategories();
  }

  private _initForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: [''],
      isFeatured: ['']
    });
  }

  private _getCategories() {
    this.categoriesService.getCategories().subscribe((categories) => {
      this.categories = categories;
    })
  }

  get productForm() {
    return this.form.controls;
  }

  onSubmit() {

  }

}
