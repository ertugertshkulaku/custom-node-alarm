import {Component, ElementRef, forwardRef, Input, OnInit, ViewChild} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {debounceTime, distinctUntilChanged, map, Observable, of, switchMap} from 'rxjs';
import {Store} from '@ngrx/store';
import {MessageType} from '@shared/models/rule-node.models';
import {SubscriptSizing} from '@angular/material/form-field';

@Component({
  selector: 'tb-output-message-type-autocomplete',
  templateUrl: './output-message-type-autocomplete.component.html',
  styleUrls: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OutputMessageTypeAutocompleteComponent),
      multi: true
    }
  ]
})
export class OutputMessageTypeAutocompleteComponent implements OnInit, ControlValueAccessor {
  @Input() autocompleteHint: string;
  @Input() subscriptSizing: SubscriptSizing = 'dynamic';
  @Input() required: boolean;
  @ViewChild('messageTypeInput', { static: true }) messageTypeInput: ElementRef;

  outputMessageTypes: Observable<string[]>;
  searchText: string;
  dirty: boolean;
  modelValue: string;
  messageTypeFormGroup: FormGroup;
  messageTypes: Array<MessageType | string> = [];

  constructor(private store: Store, private fb: FormBuilder) {
    this.messageTypes = ['POST_ATTRIBUTES_REQUEST', 'POST_TELEMETRY_REQUEST'];
    this.messageTypeFormGroup = this.fb.group({
      messageType: [null, []]
    });
  }

  ngOnInit(): void {
    this.outputMessageTypes = this.messageTypeFormGroup.get('messageType').valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => this.fetchMessageTypes(value))
    );
  }

  writeValue(value: string): void {
    this.searchText = '';
    this.modelValue = value;
    this.messageTypeFormGroup.get('messageType').patchValue(value, { emitEvent: false });
    this.dirty = true;
  }

  onFocus(): void {
    if (this.dirty) {
      this.messageTypeFormGroup.get('messageType').updateValueAndValidity({
        onlySelf: true,
        emitEvent: true
      });
      this.dirty = false;
    }
  }

  updateView(value: string): void {
    if (this.modelValue !== value) {
      this.modelValue = value;
      this.propagateChange(this.modelValue);
    }
  }

  displayMessageTypeFn(value: string): string {
    return value || '';
  }

  fetchMessageTypes(searchText?: string): Observable<Array<MessageType | string>> {
    this.searchText = searchText;
    const result: Array<MessageType | string> = this.messageTypes.filter(value =>
      value.toUpperCase().includes(searchText.toUpperCase())
    );

    return of(result.length ? result : [searchText]);
  }

  clear(): void {
    this.messageTypeFormGroup.get('messageType').patchValue(null, { emitEvent: true });
    setTimeout(() => {
      this.messageTypeInput.nativeElement.blur();
      this.messageTypeInput.nativeElement.focus();
    }, 0);
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.messageTypeFormGroup.disable({ emitEvent: false });
    } else {
      this.messageTypeFormGroup.enable({ emitEvent: false });
    }
  }

  updateValidators(): void {
    const validators = this.required ? [Validators.required] : [];
    this.messageTypeFormGroup.get('messageType').setValidators(validators);
    this.messageTypeFormGroup.get('messageType').updateValueAndValidity({ emitEvent: false });
  }

  registerOnTouched(): void {}

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  propagateChange = (value: string) => {};
}
