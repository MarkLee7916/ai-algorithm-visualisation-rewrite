import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { PathfindingRoutingModule } from "./pathfinding-routing-module";
import { PageComponent } from "./components/page/page.component";
import { BridgeService } from "./services/bridge";
import { AnimationFrame } from "./models/animation/animation-frame";

@NgModule({
  declarations: [PageComponent],
  imports: [
    CommonModule,
    BrowserModule,
    PathfindingRoutingModule,
  ],
  providers: [
    { provide: 'bridgeFromAnimationFrames', useClass: BridgeService<AnimationFrame[]> },
    { provide: 'bridgeFromAnimationIndex', useClass: BridgeService<number> },
  ]
})
export class PathfindingModule { }
