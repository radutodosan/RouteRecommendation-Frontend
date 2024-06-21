import { Component } from '@angular/core';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent {
  title = "Sistem inteligent de recomandare a rutelor adaptat vehiculelor ecologice";
  description="Această aplicație web este dedicată promovării mobilității urbane sustenabile. " +
    "Utilizând seturi date istorice și algoritmi de învățare automată, aplicația recomandă rute eficiente și ecologice " +
    "pentru mașini electrice, transport public, biciclete și mersul pe jos. " +
    "Descoperă cum poți reduce emisiile de CO2, evita congestia rutieră și contribui la un mediu mai curat, " +
    "în timp ce te bucuri de o experiență interactivă și socială alături de prieteni și comunitate."

}
