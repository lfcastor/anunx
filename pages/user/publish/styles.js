import { makeStyles } from '@material-ui/core/styles'


// Codigo CSS em Java Script
const useStyles = makeStyles((theme) => ({
    mask:{}, //para poder usar como filho de thumb.
    mainImage: {}, 
    boxContainer: {
        paddingBottom: theme.spacing(3),
    },
    box: {
        backgroundColor: theme.palette.background.white,
        padding: theme.spacing(3)
    },
    inputLabel: {
        fontWeight: 400,
        color: theme.palette.primary.main,
    },
}))

export default useStyles