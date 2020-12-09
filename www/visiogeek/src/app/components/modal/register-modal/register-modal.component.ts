import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {NavbarComponent} from "../../navbar/navbar.component";

@Component({
  selector: 'vg-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss']
})
export class RegisterModalComponent implements OnInit {

  public formGroup: FormGroup

  @Output() closeModal = new EventEmitter<string>()

  constructor() {
    this.formGroup = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
      confirmed_password: new FormControl(''),
      email: new FormControl('')
    })
  }

  ngOnInit(): void {
  }

  onSubmit(formValue: {}) : void {
    console.log(formValue)
  }

  handleCloseModal() :void {
    this.closeModal.emit()
  }

}
