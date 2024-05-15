import { Component } from '@angular/core';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent {
  title = "Sistem inteligent de recomandare a rutelor adaptat vehiculelor ecologice";
  description="Această lucrare de licență dezvoltă o aplicație web inovatoare " +
    "care promovează mobilitatea urbană durabilă prin recomandarea rutelor ecologice, folosind algoritmi de învățare automată " +
    "pentru a oferi rute personalizate și eficiente din punct de vedere al emisiilor. " +
    "Utilizatorii interacționează printr-o interfață web intuitivă și pot participa la funcționalități sociale " +
    "pentru a încuraja comportamente de conducere sustenabile. " +
    "Aplicația creează o comunitate dedicată mobilității verzi și reduce impactul negativ al transportului urban asupra mediului."

}
