import {bootstrap, View, Component} from 'angular2/angular2';
import { HTTP_PROVIDERS } from 'angular2/http'

@Component({
    selector: 'my-app',
    template: '<h1>My First Angular 2 App</h1>'
})
class AppComponent {
    constructor(){
        console.log('my-app')
    }
}
bootstrap(AppComponent);