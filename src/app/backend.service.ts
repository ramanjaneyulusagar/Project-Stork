import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { AppElement, AppFunction } from './element';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  public isMultiple = false;
  openDialog: boolean = false;
  private els: AppElement[] = [
    {
      type: 'element',
      name: 'Name',
      func: null,
      source: 'HDR: Data A',
      id: 'name',
    },
    { type: 'element', name: 'Date', func: null, source: '', id: 'date' },
    { type: 'element', name: 'Price', func: null, source: '', id: 'price' },
    { type: 'element', name: 'Address', func: null, source: '', id: 'address' },
    {
      type: 'element',
      name: 'Policy No',
      func: null,
      source: '',
      id: 'pol-no',
    },
  ];
  private funcs: AppFunction[] = [
    { type: 'function', name: 'Trim Spaces' },
    {
      type: 'function',
      name: 'Date format',
      fields: [
        {
          id: 'before',
          label: 'Before Format',
          type: 'text',
          validators: { required: true },
        },
        {
          id: 'after',
          label: 'After Format',
          type: 'text',
          validators: { required: true },
        },
      ],
    },
    { type: 'function', name: 'Numeric' },
    {
      type: 'function',
      name: 'Extract City',
      fields: [
        {
          id: 'format',
          label: 'Format',
          type: 'text',
          validators: { required: true },
        },
      ],
    },
  ];
  private tble: any[] = [];
  dialogObj: any = null;
  dialogType: string = '';
  private funcIndex = -1;
  constructor() {}

  addToTable(el: any) {
    if (
      (<AppElement>el).source != undefined &&
      (!this.tble.some((t) => t.id == el.id) || this.isMultiple)
    ) {
      this.tble.push(el);
    }
  }

  removeFromTable(index: number) {
    this.tble.splice(index, 1);
  }

  get columns() {
    return this.els;
  }

  get functions() {
    return this.funcs;
  }

  get table() {
    return of(this.tble);
  }

  changeIsMultiple(): boolean {
    this.isMultiple = !this.isMultiple;
    return this.isMultiple;
  }

  addFunction(index: number, func: any) {
    // console.log(Object.entries(func).filter((key, value) => !["type", "name"].includes(key[0])));
    if(func.fields){
      this.dialogObj = func;
      this.funcIndex = index;
      this.dialogType = "add";
      this.openDialog = true;
      return;
    }
    this.tble[index].func = func;
  }

  confirmAddFunction(func: any){
    if(this.funcIndex < 0) return;
    this.tble[this.funcIndex].func = func;
    this.resetDialog();
  }

  resetDialog(){
    this.dialogObj = null;
    this.funcIndex = -1;
  }

  removeFunction(index: number) {
    this.tble[index].func = null;
  }

  contains(el: any) {
    return this.tble.some((t) => t.name === el.name);
  }
}