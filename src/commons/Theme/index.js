import { createMuiTheme } from '@material-ui/core/styles'; 
import { viVN } from '@material-ui/core/locale';
const theme = createMuiTheme({
    color: {
        primary : '#D32F2F',
        black : '#000',
        grey1: '#ccc',
        grey2: '#eee',
        primaryColor: '#3f51b5',
        tertiary : 'rgb(247, 249, 252)'

    }
}, viVN);
export default theme