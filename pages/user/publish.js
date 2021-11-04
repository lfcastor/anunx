import { useState } from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'

import {
    Container,
    Box,
    Typography,
    TextField,
    Select,
    Button,
    IconButton,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
} from '@material-ui/core'

import { useDropzone } from 'react-dropzone'
import { DeleteForever } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

import TemplateDefault from '../../src/templates/Default'

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

const validationSchema = yup.object().shape({
    title: yup.string()
        .min(6, 'Escreva um título maior')
        .max(100, 'Título muito grande')
        .required('Campo obrigatório'),
})

const Publish = () => {
    const classes = useStyles()
    const [files, setFiles] = useState([])

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: (acceptFile) => {
            const newFiles = acceptFile.map(file => {
                return Object.assign(file, {
                    preview: URL.createObjectURL(file)
                })
            })

            setFiles([
                ...files,
                ...newFiles,
            ])
        }
    })

    const handleRemoveFile = fileName => {
        const newFileState = files.filter(file => file.name !== fileName)
        setFiles(newFileState)
    }
    
    return (
        <TemplateDefault>

            <Formik
                initialValues={{
                    title: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    console.log('ok enviou o formu', values)
                }}
            >
                {
                    ({
                        values,
                        errors,
                        handleChange,
                        handleSubmit,
                    }) => {
                        console.log(errors)

                        return (
                            <form onSubmit={handleSubmit}>
                                <Container maxWidth="sm">
                                    <Typography component="h1" variant="h2" align="center" color="textPrimary">
                                        Publicar Anúncio
                                    </Typography>
                                    <Typography component="h5" variant="h5" align="center" color="textPrimary">
                                        Quanto mais detalhado, melhor!
                                    </Typography>
                                </Container>
                                <br/><br/>
                                <Container maxWidth="md" className={classes.boxContainer}>
                                    <Box className={classes.box}>
                                        <Typography component="h6" variant="h6" color="textPrimary">
                                            Título do Anúncio
                                        </Typography>
                                        <TextField
                                            name="title"
                                            value={values.title}
                                            onChange={handleChange}
                                            label="ex.: Bicicleta Aro 18 com garantia"
                                            size="small"
                                            fullWidth
                                            error={errors.title}
                                            helperText={errors.title}
                                        />
                                        <br/><br/>

                                        <Typography component="h6" variant="h6" color="textPrimary">
                                            Categoria
                                        </Typography>
                                        <Select 
                                            native
                                            value=""
                                            fullWidth
                                            onChange={() => {}}
                                            inputProps={{
                                                name: 'age'
                                            }}
                                        >
                                            <option value="">Selecione</option>
                                            <option value={1}>Bebê e Criança</option>
                                            <option value={2}>Agricultura</option>
                                            <option value={3}>Moda</option>
                                            <option value={3}>Carros, Motos e Barcos</option>
                                            <option value={3}>Serviços</option>
                                            <option value={3}>Lazer</option>
                                            <option value={3}>Animais</option>
                                            <option value={3}>Moveis, Casa e Jardim</option>
                                            <option value={3}>Imóveis</option>
                                            <option value={3}>Equipamentos e Ferramentas</option>
                                            <option value={3}>Celulares e Tablets</option>
                                            <option value={3}>Esportes</option>
                                            <option value={3}>Tecnologia</option>
                                            <option value={3}>Emprego</option>
                                            <option value={3}>Outros</option>
                                        </Select>    
                                    </Box>
                                </Container>

                                <Container maxWidth="md" className={classes.boxContainer}>
                                    <Box className={classes.box}>
                                        <Typography component="h6" variant="h6" color="textPrimary">
                                            Imagens
                                        </Typography>
                                        <Typography component="div" variant="body2" color="textPrimary">
                                            A primeira imagem é a foto principal do seu anúncio.
                                        </Typography>
                                        <Box className={classes.thumbContainer}>
                                            <Box className={classes.dropzone} {...getRootProps()}>
                                                <input {...getInputProps()} />
                                                <Typography variant="body2" color="textPrimary">
                                                    Clique para adicionar ou arraste a imagem para aqui.
                                                </Typography>
                                            </Box>

                                            {
                                                files.map((file, index) => (
                                                    <Box 
                                                        key={file.name}
                                                        className={classes.thumb}
                                                        style={{backgroundImage: `url(${file.preview})`}}
                                                    >
                                                        {
                                                            index === 0 ?
                                                                <Box className={classes.mainImage}>
                                                                    <Typography variant="body2" color="Secondary">
                                                                        Principal
                                                                    </Typography>
                                                                </Box>
                                                            : null
                                                        }
                                                        <Box className={classes.mask}>
                                                            <IconButton color="Secondary" onClick={() => handleRemoveFile(file.name)}>
                                                                <DeleteForever fontSize="large" />
                                                            </IconButton>
                                                        </Box>
                                                    </Box>
                                                ))
                                            }
                                            
                                        </Box>    
                                    </Box>
                                </Container>

                                <Container maxWidth="md" className={classes.boxContainer}>
                                    <Box className={classes.box}>
                                        <Typography component="h6" variant="h6" color="textPrimary">
                                            Descrição
                                        </Typography>
                                        <Typography component="div" variant="body2" color="textPrimary">
                                            Escreva os detalhes do que está vendendo.
                                        </Typography>
                                        <TextField 
                                            multiline
                                            rows={6}
                                            variant="outlined"
                                            fullWidth
                                        />
                                    </Box>
                                </Container>

                                <Container maxWidth="md" className={classes.boxContainer}>
                                    <Box className={classes.box}>
                                        <Typography component="h6" variant="h6" color="textPrimary">
                                            Preço
                                        </Typography>
                                        <br />
                                        <FormControl fullWidth variant="outlined">
                                            <InputLabel>Valor</InputLabel>
                                            <OutlinedInput
                                                onChange={() => {}}
                                                startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                                                labelWidth={40}
                                            />
                                        </FormControl>
                                    </Box>
                                </Container>
            
                                <Container maxWidth="md" className={classes.boxContainer}>
                                    <Box className={classes.box}>
                                        <Typography component="h6" variant="h6" color="textPrimary" gutterBottom>
                                            Dados de Contato
                                        </Typography>
                                        <TextField 
                                            label="Nome"
                                            size="small"
                                            variant="outlined"
                                            fullWidth
                                        />
                                        <br/><br/>
                                        <TextField 
                                            label="E-mail"
                                            size="small"
                                            variant="outlined"
                                            fullWidth
                                        />
                                        <br/><br/>
                                        <TextField 
                                            label="Telefone"
                                            size="small"
                                            variant="outlined"
                                            fullWidth
                                        />
                                    </Box>
                                </Container>

                                <Container maxWidth="md" className={classes.boxContainer}>
                                    <Box textAlign="right">
                                        <Button type="submit" variant="contained" color="primary">
                                            Publicar Anúncio
                                        </Button>
                                    </Box>
                                </Container>
                            </form>
                        )
                    }
                }

            </Formik>

            

        </TemplateDefault>
    )
}

export default Publish