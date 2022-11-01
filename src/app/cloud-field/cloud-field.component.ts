import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CloudForm } from '../element';

@Component({
  selector: 'app-cloud-field',
  templateUrl: './cloud-field.component.html',
  styleUrls: ['./cloud-field.component.scss']
})
export class CloudFieldComponent implements OnInit {
  @Input() formGroup: FormGroup = new FormGroup({});
  @Input() field: CloudForm = {
    id: 'no',
    label: '',
    type: 'text',
   
  };
  public ram:any
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup.addControl(
      this.field.id ?? 'No ID',
      this.fb.control(this.field.value)
    );
    if(this.field.validators){
      var keys = Object.keys(this.field.validators);
      for(var key of keys){
        if(key == "required" && this.field.validators[key]){
          this.formGroup.get(this.field.id)?.addValidators(Validators.required);
        }

        if(key == "minlength" && this.field.validators[key] != undefined){
          this.formGroup.get(this.field.id)?.addValidators(Validators.minLength(this.field.validators[key] ?? 1));
        }
        if(key == "maxlength" && this.field.validators[key] != undefined){
          this.formGroup.get(this.field.id)?.addValidators(Validators.maxLength(this.field.validators[key] ?? 10));
        }
      }
    }
  }

  get formControlNode(){
    return this.formGroup.get(this.field.id);
  }

}
