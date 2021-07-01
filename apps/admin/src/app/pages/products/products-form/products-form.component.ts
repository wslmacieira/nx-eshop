import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category, ProductsService } from '@dwll/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'dwll-products-form',
  templateUrl: './products-form.component.html',
  styles: []
})
export class ProductsFormComponent implements OnInit {
  form!: FormGroup;
  editMode = false;
  isSubmitted = false;
  categories: Category[] = [];
  imageDisplay: string | ArrayBuffer = '';
  currentProductId: string = ''

  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._initForm();
    this._getCategories();
    this._checkEditMode();
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
      image: ['', Validators.required],
      isFeatured: [false]
    });
  }

  private _getCategories() {
    this.categoriesService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  private _updateProduct(productFormData: FormData) {
    this.productsService.updateProduct(productFormData, this.currentProductId).subscribe(
      (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Product is updated!'
        });
        timer(2000).toPromise().then((done) => {
          this.location.back()
        })
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Product is not updated!'
        });
      }
    );
  }


  private _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.editMode = true;
        this.currentProductId = params.id;
        this.productsService.getProduct(params.id).subscribe(
          (product) => {
            this.productForm.name.setValue(product.name);
            this.productForm.category.setValue(product.category?.id);
            this.productForm.brand.setValue(product.brand);
            this.productForm.price.setValue(product.price);
            this.productForm.countInStock.setValue(product.countInStock);
            this.productForm.isFeatured.setValue(product.isFeatured);
            this.productForm.description.setValue(product.description);
            this.productForm.richDescription.setValue(product.richDescription);
            this.imageDisplay = product.image ?? '';
            this.productForm.image.setValidators([]);
            this.productForm.image.updateValueAndValidity();
        })
      }
    })
  }

  get productForm() {
    return this.form.controls;
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.form.invalid) {
      return;
    }

    let productFormData = new FormData();

    Object.keys(this.productForm).map((key) => {
      productFormData.append(key, this.productForm[key].value);
    });
    console.log(this.productForm);


    if(this.editMode) {
      this._updateProduct(productFormData);

    } else {
      console.log(productFormData);
      this._addProduct(productFormData);
    }

  }

  private _addProduct(productData: FormData) {
    this.productsService.createProduct(productData).subscribe(
      (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Product is created!'
        });
        timer(2000)
          .toPromise()
          .then((done) => {
            this.location.back();
          });
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Product is not created!'
        });
      }
    );
  }

  onCancel() {}

  onImageUpload(event: any) {
    const file = event.target.files[0];

    if (file) {
      this.form.patchValue({ image: file });
      this.form.get('image')?.updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result ?? '';
      };
      fileReader.readAsDataURL(file);
    }
  }
}
