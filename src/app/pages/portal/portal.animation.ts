import {
  trigger,
  state,
  style,
  transition,
  animate,
  AnimationTriggerMetadata
} from '@angular/animations';

export function expansionPanelAnimation(): AnimationTriggerMetadata {
  return trigger('expansionPanelSize', [
    state(
      'full',
      style({
        left: '0px',
        'max-width': '100%'
      })
    ),
    state(
      'reduced',
      style({
        left: '405px',
        'max-width': 'calc(100% - 405px)'
      })
    ),
    transition('* => *', animate('200ms'))
  ]);
}

export function toastPanelAnimation(): AnimationTriggerMetadata[] {
  return [
    trigger('toastPanelOffsetX', [
      state(
        'false',
        style({
          left: '50%'
        })
      ),
      state(
        'true',
        style({
          left: 'calc(50% + 202px)'
        })
      ),
      transition('* => *', animate('200ms'))
    ]),
    trigger('toastPanelOffsetY', [
      state(
        'false',
        style({
          bottom: '0'
        })
      ),
      state(
        'true',
        style({
          bottom: '285px'
        })
      ),
      transition('* => *', animate('200ms'))
    ])
  ];
}

export function baselayersAnimation(): AnimationTriggerMetadata[] {
  return [
    trigger('baselayersStateX', [
      state(
        'left',
        style({
          left: '5px'
        })
      ),
      state(
        'right',
        style({
          left: '405px'
        })
      ),
      transition('* => *', animate('200ms'))
    ]),
    trigger('baselayersStateY', [
      state('close', style({})),
      state(
        'down',
        style({
          bottom: '55px'
        })
      ),
      state(
        'up',
        style({
          bottom: '285px'
        })
      ),
      transition('* => *', animate('200ms'))
    ])
  ];
}

export function controlSlideX(): AnimationTriggerMetadata {
  return trigger('controlStateX', [
    state(
      'left',
      style({
        left: '60px'
      })
    ),
    state(
      'right',
      style({
        left: '465px'
      })
    ),
    transition('* => *', animate('200ms'))
  ]);
}

export function controlSlideY(): AnimationTriggerMetadata {
  return trigger('controlStateY', [
    state('close', style({})),
    state(
      'down',
      style({
        bottom: '2px',
        'margin-left': '0px'
      })
    ),
    state(
      'up',
      style({
        bottom: '285px',
        'margin-left': '-55px'
      })
    ),
    transition('* => *', animate('200ms'))
  ]);
}

export function mapSlideX(): AnimationTriggerMetadata {
  return trigger('mapStateX', [
    state(
      'left',
      style({
        left: '0'
      })
    ),
    state(
      'right',
      style({
        left: '0'
      })
    ),
    transition('* => *', animate('250ms'))
  ]);
}
export function mapSlideY(): AnimationTriggerMetadata {
  return trigger('mapStateY', [
    state(
      'close',
      style({
        bottom: '0'
      })
    ),
    state(
      'down',
      style({
        bottom: '0'
      })
    ),
    state(
      'up',
      style({
        bottom: '0'
      })
    ),
    transition('* => *', animate('250ms'))
  ]);
}