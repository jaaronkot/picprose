declare module 'react-color' {
  import * as React from 'react';
  
  export interface ColorResult {
    hex: string;
    rgb: { r: number; g: number; b: number; a?: number };
    hsl: { h: number; s: number; l: number; a?: number };
  }
  
  export interface ColorPickerProps {
    color?: string | object;
    onChangeComplete?: (color: ColorResult) => void;
    onChange?: (color: ColorResult) => void;
    [key: string]: any;
  }
  
  export class TwitterPicker extends React.Component<ColorPickerProps> {}
  export class CirclePicker extends React.Component<ColorPickerProps> {}
} 