import { trigger, transition, style, animate, sequence } from "@angular/animations";

export const fadeInAnimation = trigger('fadeIn', [
    transition(':enter', [
        sequence([
            style({ opacity: 0 }),
            animate('500ms {{delay}}ms', style({ opacity: 1 }))
        ])
    ]),
]);

export const TranslateYAnimation = trigger('translateY', [
    transition(':enter', [
        style({ 'transform': 'translateY(-100%)' }),
        animate('100ms 200ms ease-in', style({ 'transform': 'translateY(0)' }))
    ]),
    transition(':leave', [
        style({ 'transform': 'translateY(0)' }),
        animate('100ms ease-out', style({ 'transform': 'translateY(-100%)' }))
    ])
]);

export const Opacity = trigger('opacity', [
    transition('void => *', [
      style({
        opacity: 0
      }),
      animate("100ms ease-in", style({
        opacity: 1
      }))
    ]),
    transition('* => void', [
      style({
        opacity: 1
      }),
      animate("100ms ease-out", style({
        opacity: 0
      }))
    ])
  ]);