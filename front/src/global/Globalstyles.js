import { createGlobalStyle } from "styled-components";
// createGlobalStyle() : 모든 컴포넌트에 동일한 스타일을 적용하고 싶을때 이 함수를 사용한다.
// createGlobalStyle() 함수로 생성한 전역 스타일 컴포넌트를 애플리케이션의 최상위 컴포넌트에 추가해주면 아위 모든 컴포넌트에 해당 스타일이 일괄 적용된다. 

const GlobalStyle =  createGlobalStyle`

/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

@font-face {
    font-family: 'Y_Spotlight';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts-20-12@1.0/Y_Spotlight.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

a{
    text-decoration : none;
    color: inherit;
}

* {
    box-sizing :  border-box;
}

button {
    outline : none;
    border : none;
    background: none;
}

body {
	font-family: "Y_Spotlight", sans-serif;
}

`;

export default GlobalStyle;