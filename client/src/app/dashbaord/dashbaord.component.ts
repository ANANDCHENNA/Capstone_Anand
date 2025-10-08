import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Claim } from '../model/Claim';
import { Investigation } from '../model/Investigation';
import { AuthService } from '../../services/auth.service';
import { HttpService } from '../../services/http.service';
declare var bootstrap: any; // Bootstrap Toast API

@Component({
  selector: 'app-dashbaord',
  templateUrl: './dashbaord.component.html',
  styleUrls: ['./dashbaord.component.scss']
})
export class DashbaordComponent implements OnInit {

  role: string | null = '';
  isLoading = false;
  hasError = false;
  errorDetails: string = '';

  // Search + Sort
  searchText: string = '';
  sortKey: string = '';
  sortOrder: 'asc' | 'desc' = 'asc';
  snackbarMessage: string = '';

  // Adjuster
  claimList: Claim[] = [];

  // Underwriter
  underWriterId: string | null = '';
  claimByUnderwriter: Claim[] = [];

  // Investigator
  investigations: Investigation[] = [];

  // Policyholder
  policyholderId: string | null = '';
  claimByPolicyholder: Claim[] = [];
  selectedClaim!: Claim;

  // Policies
  policies: any[] = [];

  // Connection test
  connectionTestResult: string = '';

  constructor(
    private httpService: HttpService,
    private authService: AuthService,
    private router: Router
  ) {
    this.role = this.authService.getRole;
  }

  ngOnInit(): void {
    this.underWriterId = this.authService.getUserId();
    this.policyholderId = this.authService.getUserId();

    if (this.role === 'ADJUSTER') {
      this.httpService.getAllClaims().subscribe(data => this.claimList = data);
    }

    if (this.role === 'UNDERWRITER') {
      this.httpService.getClaimsByUnderwriter(this.underWriterId).subscribe(data => this.claimByUnderwriter = data);
    }

    if (this.role === 'INVESTIGATOR') {
      this.httpService.getInvestigations().subscribe(data => this.investigations = data);
    }

    if (this.role === 'POLICYHOLDER') {
      console.log('Loading claims for policyholder...');
      this.loadPolicyholderClaims();
    }

    if (this.role === 'ADMIN') {
      this.httpService.getAllPolicies().subscribe(data => this.policies = data);
    }
  }

  // ---------------- Toast / Snackbar ----------------
  showSnackbar(message: string, type: 'success' | 'info' | 'danger' = 'success') {
    const toastEl = document.getElementById('snackbarToast');
    if (toastEl) {
      toastEl.innerText = message;
      toastEl.classList.remove('text-bg-success', 'text-bg-info', 'text-bg-danger');
      toastEl.classList.add(`text-bg-${type}`);
      const toast = new bootstrap.Toast(toastEl);
      toast.show();
    }
  }

  // ---------------- Actions ----------------
  onAdjusterAssignClaim(id: number) {
    this.router.navigate([`/assign-claim/${id}`]);
    this.showSnackbar(`Claim #${id} assigned successfully!`, 'success');
  }

  onUpdateClaimAdjuster(id: number) {
    if (id !== undefined) {
      // Hide the modal manually
      const modalEl = document.getElementById('claimModal');
      if (modalEl) {
        const modalInstance = bootstrap.Modal.getInstance(modalEl);
        if (modalInstance) {
          modalInstance.hide();
        }
      }

      // Navigate after modal is hidden
      setTimeout(() => {
        this.router.navigate([`/update-claim/${id}`]);
        this.showSnackbar(`Claim #${id} updated!`, 'info');
      }, 300); // slight delay to allow modal to close smoothly
    }
  }

  testConnection() {
    this.isLoading = true;
    this.connectionTestResult = 'Testing connection...';
    this.showSnackbar('Testing API connection...', 'info');

    this.httpService.testConnection().subscribe({
      next: (response) => {
        console.log('Connection test response:', response);
        this.connectionTestResult = 'Connection successful!';
        this.showSnackbar('API connection successful!', 'success');
        // Try loading claims again
        if (this.role === 'POLICYHOLDER') {
          this.loadPolicyholderClaims();
        }
      },
      error: (err) => {
        console.error('Connection test failed:', err);
        this.connectionTestResult = `Connection failed: ${err.message}`;
        this.showSnackbar('API connection failed: ' + err.message, 'danger');
        this.hasError = true;
        this.errorDetails = JSON.stringify(err, null, 2);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  loadPolicyholderClaims() {
    if (!this.policyholderId) {
      console.error('No policyholder ID found!');
      this.showSnackbar('Error: User ID not found. Please try logging in again.', 'danger');
      return;
    }

    this.isLoading = true;
    this.showSnackbar('Loading your claims...', 'info');

    this.httpService.getClaimsByPolicyholder(this.policyholderId).subscribe({
      next: (data) => {
        console.log('Claims by policyholder:', data);
        this.claimByPolicyholder = data || [];
        this.hasError = false;
        if (this.claimByPolicyholder.length === 0) {
          this.showSnackbar('No claims found. Create a claim from My Policies page.', 'info');
        } else {
          this.showSnackbar(`Successfully loaded ${this.claimByPolicyholder.length} claims.`, 'success');
        }
      },
      error: (err) => {
        console.error('Error fetching claims:', err);
        this.hasError = true;
        this.errorDetails = JSON.stringify(err, null, 2);
        
        let errorMsg = 'Error loading claims. ';
        if (!navigator.onLine) {
          errorMsg += 'Please check your internet connection.';
        } else if (err.status === 0) {
          errorMsg += 'Cannot connect to server. Please try again later.';
        } else if (err.status === 401) {
          errorMsg += 'Session expired. Please log in again.';
          this.router.navigate(['/login']);
        } else {
          errorMsg += err.message || 'Please try again.';
        }
        this.showSnackbar(errorMsg, 'danger');
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  onUnderwriterUpdateClaim(id: number) {
    this.router.navigate([`/update-claim-underwriter/${id}`]);
    this.showSnackbar(`Underwriter updated claim #${id}`, 'info');
  }

  onInvestigatorUpdateInvestigation(id: number) {
    this.router.navigate([`/update-claim-investigation/${id}`]);
    this.showSnackbar(`Investigation #${id} updated!`, 'info');
  }

  // ---------------- Filter + Sort ----------------
  filteredAdjusterClaims(): Claim[] {
    let result = [...this.claimList];

    // Search
    if (this.searchText) {
      result = result.filter(claim =>
        claim.id.toString().includes(this.searchText) ||
        claim.description.toLowerCase().includes(this.searchText.toLowerCase()) ||
        claim.status.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }

    // Sort
    if (this.sortKey) {
      result.sort((a, b) => {
        let valA: any = a[this.sortKey as keyof Claim];
        let valB: any = b[this.sortKey as keyof Claim];

        if (typeof valA === 'string') valA = valA.toLowerCase();
        if (typeof valB === 'string') valB = valB.toLowerCase();

        if (valA < valB) return this.sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return this.sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }

  filteredUnderwriterClaims(): Claim[] {
    let result = [...this.claimByUnderwriter];

    if (this.searchText) {
      result = result.filter(claim =>
        claim.id.toString().includes(this.searchText) ||
        claim.description.toLowerCase().includes(this.searchText.toLowerCase()) ||
        claim.status.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }

    if (this.sortKey) {
      result.sort((a, b) => {
        let valA: any = a[this.sortKey as keyof Claim];
        let valB: any = b[this.sortKey as keyof Claim];

        if (typeof valA === 'string') valA = valA.toLowerCase();
        if (typeof valB === 'string') valB = valB.toLowerCase();

        if (valA < valB) return this.sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return this.sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }

  filteredInvestigatorRecords(): Investigation[] {
    let result = [...this.investigations];

    if (this.searchText) {
      result = result.filter(inv =>
        inv.id.toString().includes(this.searchText) ||
        inv.report.toLowerCase().includes(this.searchText.toLowerCase()) ||
        inv.status.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }

    if (this.sortKey) {
      result.sort((a, b) => {
        let valA: any = (a as any)[this.sortKey];
        let valB: any = (b as any)[this.sortKey];

        if (typeof valA === 'string') valA = valA.toLowerCase();
        if (typeof valB === 'string') valB = valB.toLowerCase();

        if (valA < valB) return this.sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return this.sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }

  filteredPolicyholderClaims(): Claim[] {
    let result = [...this.claimByPolicyholder];

    if (this.searchText) {
      result = result.filter(claim =>
        claim.id.toString().includes(this.searchText) ||
        claim.description.toLowerCase().includes(this.searchText.toLowerCase()) ||
        claim.status.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }

    if (this.sortKey) {
      result.sort((a, b) => {
        let valA: any = a[this.sortKey as keyof Claim];
        let valB: any = b[this.sortKey as keyof Claim];

        if (typeof valA === 'string') valA = valA.toLowerCase();
        if (typeof valB === 'string') valB = valB.toLowerCase();

        if (valA < valB) return this.sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return this.sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }

  filteredPolicies(): any[] {
    let result = [...this.policies];
    if (this.searchText) {
      result = result.filter(policy =>
        policy.policyNumber.toLowerCase().includes(this.searchText.toLowerCase()) ||
        policy.policyType.toLowerCase().includes(this.searchText.toLowerCase()));
    }
    return result;
  }


  // ---------------- Status Colour ----------------
  getStatusClass(status: string): string {
    switch (status) {
      case 'Started': return 'bg-primary';
      case 'In Progress': return 'bg-info';
      case 'Completed': return 'bg-success';
      case 'Rejected': return 'bg-danger';
      default: return 'bg-secondary';
    }
  }

  openClaimModal(claim: Claim) {
    this.selectedClaim = claim;
    const modal = new bootstrap.Modal(document.getElementById('claimModal'));
    modal.show();
  }

  editPolicy(policy: any) {
    this.router.navigate([`/update-policy/${policy.id}`]);
    this.showSnackbar(`Editing Policy #${policy.policyNumber}`, 'info');
  }

  deletePolicy(id: number) {
    if (confirm('Are you sure you want to delete this policy?')) {
      this.httpService.deletePolicy(id).subscribe(() => {
        this.policies = this.policies.filter(p => p.id !== id);
        this.showSnackbar(`Policy deleted successfully!`, 'success');
      });
    }
  }


}
