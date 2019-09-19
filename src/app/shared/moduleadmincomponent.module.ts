import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatMenuModule } from "@angular/material/menu";
import { PanelMenuModule } from "primeng/panelmenu";
import { MenuModule } from "primeng/menu";
import { MegaMenuModule } from "primeng/megamenu";
import { AccordionModule } from "primeng/components/accordion/accordion";
import { PanelModule } from "primeng/components/panel/panel";
import { ButtonModule } from "primeng/components/button/button";
import { RadioButtonModule } from "primeng/components/radioButton/radioButton";
import { TableModule } from "primeng/table";
import { DataTableModule } from "primeng/components/datatable/datatable";
import { SliderModule } from "primeng/slider";
import { DropdownModule } from "primeng/dropdown";
import { MultiSelectModule } from "primeng/multiselect";
import { CheckboxModule } from "primeng/checkbox";
import { PasswordModule } from "primeng/password";
import { MessagesModule } from "primeng/messages";
import { MessageModule } from "primeng/message";
import { DialogModule } from 'primeng/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  CloudinaryModule,
  CloudinaryConfiguration
} from "@cloudinary/angular-5.x";
import { Cloudinary } from "cloudinary-core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TableModule,
    DropdownModule,
    MultiSelectModule,
    SliderModule,
    DataTableModule,
    PanelMenuModule,
    MenuModule,
    MegaMenuModule,
    MatMenuModule,
    RadioButtonModule,
    PanelModule,
    AccordionModule,
    ButtonModule,
    MatProgressSpinnerModule,
    DialogModule,
    CloudinaryModule.forRoot({ Cloudinary }, {
      cloud_name: "just-me"
    } as CloudinaryConfiguration),


  ],
  exports: [
    CommonModule,
    TableModule,
    DropdownModule,
    MultiSelectModule,
    SliderModule,
    DataTableModule,
    PanelMenuModule,
    MenuModule,
    MegaMenuModule,
    MatMenuModule,
    RadioButtonModule,
    PanelModule,
    AccordionModule,
    ButtonModule,
    CheckboxModule,
    PasswordModule,
    MessagesModule,
    MessageModule,
    MatProgressSpinnerModule,
    DialogModule,
    CloudinaryModule
  ]
})
export class ModuleadmincomponentModule { }
