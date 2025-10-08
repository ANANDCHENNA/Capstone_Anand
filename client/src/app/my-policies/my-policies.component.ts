import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Policy } from '../model/Policy';


@Component({
  selector: 'app-my-policies',
  templateUrl: './my-policies.component.html',
  styleUrls: ['./my-policies.component.scss']
})
export class MyPoliciesComponent implements OnInit {
  myPolicies: Policy[] = [];
  userId = localStorage.getItem('userId') || '';
  constructor(
    private httpService: HttpService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMyPolicies();
  }

  loadMyPolicies() {
    this.httpService.getPoliciesByOwnedUser(6).subscribe({
      next: (data: Policy[]) => {
        console.log(data)
        this.myPolicies = data;
      },
      error: (err) => {
        console.error('Error fetching my policies', err);
      }
    });
  }

  // Simple claim flow: prompt for description and create claim
  claimPolicy(policy: Policy) {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('User not identified. Please login again.');
      return;
    }

    const description = prompt(`Enter claim description for policy "${policy.name}":`);
    if (description === null) return; // user cancelled
    if (description.trim().length === 0) {
      alert('Description required.');
      return;
    }

    const payload: any = {
      description: description,
      date: new Date().toISOString(), // backend expects Date; ISO string is safe
      status: 'STARTED',
      policy_id: policy.id
    };

    this.httpService.createClaims(payload, userId).subscribe({
      next: (res) => {
        alert('Claim created successfully.');
        // optionally route to my-claims page:
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Error creating claim', err);
        alert('Error creating claim. Try again.');
      }
    });
  }
}

