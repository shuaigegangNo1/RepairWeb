import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {BaseAuthenticateComponent} from "./BaseAuthenticateComponent";
import {BaseModule} from '../entity/BaseModule';
import {MessageService} from '../service/messageService';


export abstract class BaseReactiveFormComponent<T extends BaseModule> extends BaseAuthenticateComponent {
    // form attributes
    active = true;
    aForm: FormGroup;
    domainObject: T;
    formErrors: any = {};
    validationMessages = {};

    constructor(protected a_router: Router, protected fb: FormBuilder,
                protected _messageService: MessageService, authentication: boolean = true) {
        super(a_router,  _messageService, authentication);
        this.formErrors = this.getFormErrors();
        this.validationMessages = this.getValidationMessages();
    }

    abstract _buildForm();

    abstract getFormErrors();

    abstract getValidationMessages();

    buildForm(): void {
        this._buildForm();

        this.aForm.valueChanges
            .subscribe(data => this.onValueChanged(data));

        this.onValueChanged(); // (re)set validation messages now
    }

    onSubmit() {
        this.domainObject = this.aForm.value;
    }

    onValueChanged(data?: any) {
        if (!this.aForm) {
            return;
        }
        const form = this.aForm;

        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = "";
            const control = form.get(field);

            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + "\r\n";
                }
            }
        }
    }
}
