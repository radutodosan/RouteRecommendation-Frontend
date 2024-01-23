import { Component } from '@angular/core';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent {
  title = "Route Recommendation"
  description="Lucrarea mea de licență are ca scop dezvoltarea și implementarea unui sistem inteligent de recomandare" +
    " a rutelor adaptat vehiculelor ecologice, concentrându-se pe promovarea mobilității urbane durabile. " +
    "Sistemul utilizează algoritmi de machine learning pentru  analiza datelor în timp real și pentru a furniza recomandări" +
    " de rute personalizate și eficiente din punct de vedere al emisiilor pentru șoferii de vehicule ecologice."

}
