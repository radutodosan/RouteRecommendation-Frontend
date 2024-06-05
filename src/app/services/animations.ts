import {trigger, transition, style, animate} from '@angular/animations';

export const slideRightLeftAnimation =
  trigger('routeAnimations', [
    transition('* => isLeft', [
      style({ transform: 'translateX(100%)' }),
      animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
    ]),
    transition('isLeft => *', [
      style({ transform: 'translateX(-100%)' }),
      animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
    ])

  ]);

