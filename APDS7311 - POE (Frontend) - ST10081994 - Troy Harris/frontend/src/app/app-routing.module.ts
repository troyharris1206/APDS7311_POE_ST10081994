import { NgModule } from "@angular/core"; 
import { RouterModule, Routes } from "@angular/router"; 
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup/signup.component";
import { MessageCreateComponent } from "./message/message-create/message-create.component";
import { MessageDisplayComponent } from "./message/message-display/message-display.component";

const routes: Routes = 
[
    {path: 'Messages', component: MessageDisplayComponent}, 
    {path: 'Add', component: MessageCreateComponent}, 
    {path: 'Login', component: LoginComponent}, 
    {path: 'Signup', component: SignupComponent}
];

@NgModule ({
    imports: [RouterModule.forRoot (routes)], 
    exports: [RouterModule]
})

export class AppRoutingModule {}