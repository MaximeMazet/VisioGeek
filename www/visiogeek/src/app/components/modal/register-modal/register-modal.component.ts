import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {NavbarComponent} from "../../navbar/navbar.component";
import {fetchApi} from "../../../utils/Fetch";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'vg-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss']
})
export class RegisterModalComponent implements OnInit {

  public formGroup: FormGroup

  @Output() closeModal = new EventEmitter<string>()

  public passwordSameConfirmed:boolean = true


  public validator: ValidatorFn[] = [
    Validators.required,
    Validators.minLength(8)
  ]

  constructor() {
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      username: new FormControl('', this.validator),
      password: new FormControl('',this.validator),
      confirmed_password: new FormControl('', this.validator),
      email: new FormControl('',this.validator)
    })
  }

  async onSubmit(formValue: {username: string, password: string, confirmed_password: string, email: string}) : Promise<void> {
    if (formValue.password == formValue.confirmed_password) {
      let response = await fetchApi('add', 'POST', true, {...formValue})

      if (response) {
        this.closeModal.emit('Votre compte à bien été créer')
      }
    } else {
      this.passwordSameConfirmed = false
    }
  }

  handleCloseModal() :void {
    this.closeModal.emit()
  }

}
