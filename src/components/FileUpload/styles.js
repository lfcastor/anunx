import { makeStyles } from '@material-ui/core/styles'


// Codigo CSS em Java Script
const useStyles = makeStyles((theme) => ({
    mask:{}, //para poder usar como filho de thumb.
    mainImage: {}, 
    thumbContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: 15,
    },
    dropzone: {
        display: 'flex', // deixar os item um ao lado do outro
        justifyContent: 'center', // deixar centralizado da direta para a esquerda
        alignItems: 'center', // deixar centralizado do topo para a borda
        textAlign: 'center', // deixar o texto na box centralizado
        padding: 10,
        width: 200,
        height: 150,
        margin: '0 15px 15px 0',
        background: theme.palette.background.default,
        border: '2px dashed black', // deixar o contorno da box com traço
    },
    thumb: {
        position: 'relative',
        width: 200,
        height: 150,
        backgroundSize: 'cover',
        margin: '0 15px 15px 0',
        backgroundPosition: 'center center',

        '& $mainImage': {
            backgroundColor: 'blue',
            padding: '6px 10px',
            position: 'absolute',
            bottom: 0,
            left: 0,
        },

        //fazer aparecer a mask quando passar o mouse.
        '&:hover $mask': { 
            display: 'flex',
        },

        //a mask só aparece quando passar o mouse.
        '& $mask': { // filho de thumb
            display: 'none',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            width: '100%',
            height: '100%',
        }
    },
}))

export default useStyles