import { Component, OnInit } from "@angular/core";
import { HttpService } from "../../services/http.service";
import { Underwriter } from "../model/Underwriter";

@Component({
  selector: 'app-view-underwriters',
  templateUrl: './view-underwriters.component.html',
  styleUrls: ['./view-underwriters.component.scss']
})
export class ViewUnderwritersComponent implements OnInit {

  underwriters: Underwriter[] = [];

  // Search + Sort
  searchText: string = '';
  sortKey: string = '';
  sortOrder: 'asc' | 'desc' = 'asc';

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.httpService.GetAllUnderwriter().subscribe((data) => {
      this.underwriters = data;
    });
  }

  // ---------------- Filter ----------------
  filteredUnderwriters(): Underwriter[] {
    let result = [...this.underwriters];

    // Search
    if (this.searchText) {
      result = result.filter(u =>
        u.id.toString().includes(this.searchText) ||
        u.username.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }

    return result;
  }
}
