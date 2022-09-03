import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
   :root {
    --black: #000;
    --white: #fff;
    --bg-grey: #fbfbfb;
    --green: ${({ theme }) => theme.colors.green};
    --purple: ${({ theme }) => theme.colors.purple};
    --orange: ${({ theme }) => theme.colors.orange};
    --pink: ${({ theme }) => theme.colors.pink};
    --blue: ${({ theme }) => theme.colors.blue};
    --red: ${({ theme }) => theme.colors.red};
    --page-main-color: ${({ theme }) => theme.primaryColor};
    --font-primary-bold: 'Gilroy-Bold';
    --font-primary-regular: 'Gilroy-Regular';
    --font-primary-medium: 'Gilroy-Medium';
    --font-primary-light: 'Gilroy-Light';
    --font-secondary-regular: 'Crimson-Regular';
  }
`

export default GlobalStyle
