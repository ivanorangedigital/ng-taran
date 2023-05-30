import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
    standalone: true,
    selector: 'app-section',
    templateUrl: './section.component.html',
    imports: [
        CommonModule
    ]
})

export class SectionComponent {
    @Input() title = 'Qualcosa su di noi';
    @Input() descriptions = [
        'Entrare nel Ristorante Tipico Salernitano significa fare un viaggio nella tradizione locale e mangiare la vera cucina di Salerno sia di mare che di terra. La cultura del luogo attraverso l’enogastronomia. La scoperta di piatti antichi ma nuovi, rivisitati in un connubio perfetto tra passato e presente.',
        'La semplicità, le origini e la ricerca, sono i punti di forza della cucina del Ristorante Classico Salernitano. Antipasti, primi piatti e secondi di mare di gran qualità, tutti preparati al momento da Michelina, la Chef. Due sono i cardini del Ristorante Classico Salernitano: rispetto per la tradizione, rispetto per le caratteristiche dei cibi. Materia prime, ingredienti e prodotti locali, utilizzati nel rispetto delle stagioni. Pesce e carne fresca e una cucina casereccia sono la proposta a tavola.'
    ];
    @Input() src = 'https://www.ristoranteclassicosalernitano.com/wp-content/uploads/2022/11/exterior.jpg';
    @Input() reverse = false;
}