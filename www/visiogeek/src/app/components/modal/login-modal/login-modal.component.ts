import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {fetchApi} from "../../../utils/Fetch";

@Component({
  selector: 'vg-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {

  public formGroup?: FormGroup = undefined

  private flashMessage: string = "Une erreur est survenue vérifier d'avoir mis les bonnes information"
  private flashMessageDisplay: boolean = false

  @Output() closeModal = new EventEmitter<string>()


  public validator: ValidatorFn[] = [
    Validators.required,
    Validators.minLength(8)
  ]

  constructor() {
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      email: new FormControl('', this.validator),
      password: new FormControl('',this.validator)
    })
  }

  async onSubmit(formValue: {password: string, email: string}) : Promise<void> {
    let response = await fetchApi('user/login', 'POST', true, {...formValue})

    if (response) {
      this.closeModal.emit('Connection reussie')
      sessionStorage.setItem('SSID', response['connexion_token'])
    } else {
      this.flashMessageDisplay = true
      setTimeout(() => {
        this.flashMessageDisplay = false
      }, 1500)
    }
  }

  handleCloseModal() :void {
    this.closeModal.emit()
  }

}
