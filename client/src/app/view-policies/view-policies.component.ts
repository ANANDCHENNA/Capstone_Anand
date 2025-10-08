import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { HttpService } from "../../services/http.service";
import { Policy } from "../model/Policy";

@Component({
    selector: 'app-view-policies',
    templateUrl: './view-policies.component.html',
    styleUrls: ['./view-policies.component.scss']
})
export class ViewPoliciesComponent implements OnInit {

    policies: Policy[] = [];
    roleName: string | null;

    // Search + Sort
    searchText: string = '';
    sortKey: string = '';
    sortOrder: 'asc' | 'desc' = 'asc';

    constructor(
        private httpService: HttpService,
        public router: Router,
        private authService: AuthService
    ) {
        this.roleName = authService.getRole;
    }

    ngOnInit(): void {
        this.loadPolicies();
    }

    loadPolicies() {
        this.httpService.getAllPolicies().subscribe({
            next: (data) => {
                this.policies = data;
            },
            error: (error) => {
                console.error('Error loading policies:', error);
                this.showToast('Error loading policies', 'error');
            }
        });
    }

    deletePolicy(id: number) {
        if (confirm('Are you sure you want to delete this policy?')) {
            this.httpService.deletePolicy(id).subscribe({
                next: () => {
                    this.showToast('Policy deleted successfully!', 'success');
                    this.loadPolicies(); // Reload the list
                },
                error: (error) => {
                    console.error('Error deleting policy:', error);
                    this.showToast('Policy already bought', 'error');
                }
            });
        }
    }

    private showToast(message: string, type: 'success' | 'error') {
        const toast = document.getElementById('snackbarToast');
        if (toast) {
            toast.classList.remove('text-bg-success', 'text-bg-danger');
            toast.classList.add(type === 'success' ? 'text-bg-success' : 'text-bg-danger');
            const toastBody = toast.querySelector('.toast-body');
            if (toastBody) {
                toastBody.textContent = message;
            }
            // @ts-ignore
            const bsToast = new bootstrap.Toast(toast);
            bsToast.show();
        }
    }

    // ---------------- Filter ----------------
    filteredPolicies(): Policy[] {
        let result = [...this.policies];

        // Search
        if (this.searchText) {
            result = result.filter(policy =>
                policy.id.toString().includes(this.searchText) ||
                policy.name.toLowerCase().includes(this.searchText.toLowerCase()
                )
            );
        }

        return result;
    }
}