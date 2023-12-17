import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PathfindingModule } from './pathfinding/pathfinding.module';

@NgModule({
  declarations: [AppComponent],
  providers: [],
  imports: [
    PathfindingModule,
    AppRoutingModule,
    RouterModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
