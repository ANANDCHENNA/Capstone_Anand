import { Component, OnInit } from "@angular/core";
import { HttpService } from "../../services/http.service";
import { Policy } from "../model/Policy";

@Component({
    selector: 'app-view-policies',
    templateUrl: './view-policies.component.html',
    styleUrls: ['./view-policies.component.scss']
})
export class ViewPoliciesComponent implements OnInit {

    policies: Policy[] = [];

    // Search + Sort
    searchText: string = '';
    sortKey: string = '';
    sortOrder: 'asc' | 'desc' = 'asc';

    constructor(private httpService: HttpService) { }

    ngOnInit(): void {
        this.httpService.getAllPolicies().subscribe((data) => {
            this.policies = data;
        });
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