import { DefaultTheme } from 'styled-components';
import {color} from './color';

const theme: DefaultTheme = {
   breakpoints: {
    xs: '(min-width: 320px)',
    small: '(min-width: 375px)',
    smallMedium: '(min-width: 650px)',
    medium: '(min-width: 768px)',
    large: '(min-width: 920px)',
    larger: '(min-width: 1024px)',
    xl: '(min-width: 1224px)',
    xl2: '(min-width: 1350px)',
    xl3: '(min-width: 1500px)',
    xl4: '(min-width: 1700px)',
    xl5: '(min-width: 1920px)',
    xl6: '(min-width: 2160px)',
    xl7: '(min-width: 2560px)',
  },
  primaryColor:'',
  colors: {...color}
};

export { theme };








