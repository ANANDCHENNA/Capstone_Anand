import { Component, OnInit, Optional } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpService } from '../../services/http.service';
import { Underwriter } from '../model/Underwriter';

@Component({
    selector: 'app-update-claim',
    templateUrl: './update-claim-underwriter.component.html',
    styleUrls: ['./update-claim-underwriter.component.scss']
})
export class UpdateClaimUnderwriterComponent implements OnInit {
    itemForm: FormGroup;
    claimId: number | undefined;
    userRole: string | null | undefined
    constructor(
        private formBuilder: FormBuilder,
        private httpService: HttpService,
        private authService: AuthService,
        private router: Router,
        @Optional() private route: ActivatedRoute
    ) {
        this.itemForm = this.formBuilder.group({
            description: [null, Validators.required],
            date: [ {value : '', disabled : true}, Validators.required],
            status: ['', Validators.required]
        });
    }

    ngOnInit() {
        this.claimId = this.route?.snapshot?.params?.['id'] ?? null;

        this.httpService.getClaimByIdUnderwriter?.(this.claimId).subscribe((data) => {
            console.log(data)
            if (data.date) {
                const formattedDate = new Date(data.date).toISOString().split('T')[0]; // "YYYY-MM-DD"
                data.date = formattedDate;
            }
            if (data.underwriter.id) {
                data.underwriterId = data.underwriter.id;
            }
            this.itemForm.patchValue(data);
        })
    }
    onSubmit() {
        this.userRole = this.authService.getRole;
        if (this.itemForm.valid) {
            console.log(this.itemForm.getRawValue())
            this.httpService.updateClaimsStatus(this.itemForm.getRawValue(), this.claimId).subscribe({
                next: () => {
                    this.router.navigate(['/dashboard']);
                },
                error: (error) => {
                    console.error('Error updating claim:', error);
                }
            });
        }
    }
}
