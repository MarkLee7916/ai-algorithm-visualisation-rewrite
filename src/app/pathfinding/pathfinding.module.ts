import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { PathfindingRoutingModule } from "./pathfinding-routing-module";
import { PageComponent } from "./components/page/page.component";

@NgModule({
  declarations: [PageComponent],
  imports: [
    CommonModule,
    BrowserModule,
    PathfindingRoutingModule,
  ],
})
export class PathfindingModule { }
