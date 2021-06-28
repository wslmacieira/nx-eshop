import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'dwll-categories-form',
  templateUrl: './categories-form.component.html',
  styles: [
  ]
})
export class CategoriesFormComponent implements OnInit {
  form!: FormGroup;
  isSubmitted: boolean = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
    })
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return console.log('Form is invalid!');
    }
    console.log(this.categoryForm.name.value)
    console.log(this.categoryForm.icon.value)
  }

  get categoryForm() {
    return this.form.controls;
  }

}
