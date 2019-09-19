import { Component, OnInit } from "@angular/core";
import { animations } from "ack-angular-fx";
import { ComunicacionService } from "../servicios/comunicacion.service";

@Component({
  animations: animations,
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  boolean = true;
  constructor(private comunicacionService: ComunicacionService) {}

  ngOnInit() {
    this.comunicacionService.PrimerToken().subscribe((data: any) => {
      if (data) {
        if (!localStorage.getItem("MainToken")) {
          localStorage.setItem("MainToken", data.tokena);
        }
      } else {
        console.log("no data from server");
      }
    });
  }

  botones() {
    window.location.href =
      "https://www.facebook.com/pg/cumbreandinaciclismoyescalada/shop/?rid=232032350528180&rt=6";
  }
}
