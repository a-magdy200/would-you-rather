import {createMuiTheme} from "@material-ui/core";
export const MAIN_COLOR = '#01579b';
export const SECONDARY_COLOR = '#546e7a';
const theme = createMuiTheme({
  palette: {
    primary: {main: MAIN_COLOR},
    secondary: {main: SECONDARY_COLOR},
    // type: "dark"
  },
});
export default theme;
