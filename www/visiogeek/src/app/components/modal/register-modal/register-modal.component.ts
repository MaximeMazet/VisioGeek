import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {NavbarComponent} from "../../navbar/navbar.component";
import {fetchApi} from "../../../utils/Fetch";

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

  async onSubmit(formValue: {}) : Promise<void> {
    let response = await fetchApi('add', 'POST', true, {...formValue})
  }

  handleCloseModal() :void {
    this.closeModal.emit()
  }

}
