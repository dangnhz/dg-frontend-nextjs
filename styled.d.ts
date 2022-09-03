import 'styled-components'
import { dgColor } from './theme/color'
import breakpoints from './theme/theme'

declare module 'styled-components' {
    export interface DefaultTheme {
        breakpoints: {
            xs: string
            small: string
            smallMedium: string
            medium: string
            large: string
            larger: string
            xl: string
            xl2: string
            xl3: string
            xl4: string
            xl5: string
            xl6: string
            xl7: string
        }
        primaryColor:string;
        colors: dgColor
    }
}
