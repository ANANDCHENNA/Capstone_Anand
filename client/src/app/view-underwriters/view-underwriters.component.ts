import { Component, OnInit } from "@angular/core";
import { HttpService } from "../../services/http.service";
import { Underwriter } from "../model/Underwriter";

@Component({
    selector: 'app-view-underwriters',
    templateUrl: './view-underwriters.component.html',
    styleUrls: ['./view-underwriters.component.scss']
})

export class ViewUnderwritersComponent implements OnInit {

    underwriters: Underwriter[] = []

    constructor( private httpService: HttpService) {}

    ngOnInit(): void {
        this.httpService.GetAllUnderwriter().subscribe((data) => {
            this.underwriters = data
        })
    }
}

