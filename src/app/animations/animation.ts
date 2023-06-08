import { trigger, transition, style, animate, sequence, animateChild, query } from "@angular/animations";

export const ngIfAnimation = trigger('ngIfAnimation', [
  transition(':enter, :leave', [
    query('@*', animateChild())
  ])
]);

export const fadeInAnimation = trigger('fadeIn', [
  transition(':enter', [
    sequence([
      style({ opacity: 0 }),
      animate('500ms {{delay}}ms', style({ opacity: 1 }))
    ])
  ]),
]);

export const openMenu = trigger('openMenu', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translate(-100%, 0) scale(0)' }),
    animate('.3s', style({ opacity: 1, transform: 'translate(0, 0) scale(1.2)' })),
    animate('.1s', style({ transform: 'scale(1)' }))
  ]),
  transition(':leave', [
    animate('.1s', style({ transform: 'translate(0, 0) scale(1.2)' })),
    animate('.3s', style({ opacity: 0, transform: 'translate(100%, 0) scale(0)' })),
  ])
]);

export const TranslateYAnimation = trigger('translateY', [
  transition('void => *', [
    style({
      transform: 'translateY(-100%)'
    }),
    animate("150ms ease-in", style({
      transform: 'translateY(0) scale(1.2)'
    }))
  ]),
  transition('* => void', [
    style({
      transform: 'translateY(0)'
    }),
    animate("150ms ease-out", style({
      transform: 'translateY(-100%)'
    }))
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