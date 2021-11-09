import { useState } from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'

import {
    Container,
    Box,
    Typography,
    Select,
    Button,
    IconButton,
    FormControl,
    InputLabel,
    InputAdornment,
    MenuItem,
    FormHelperText,
    Input,
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
    inputLabel: {
        fontWeight: 400,
        color: theme.palette.primary.main,
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
    category: yup.string().required('Campo obrigatório'),
    discription: yup.string()
        .min(50, 'Escreva um descrição com pelo menos 50 caracteres.')
        .required('Campo obrigatório'),
    price: yup.number().required('Campo obrgatório'),
    email: yup.string().email('Digite um e-mail válido').required('Campo obrigatório'),
    name: yup.string().required('Campo obrigatório'),
    phone: yup.number().required('Campo obrigatório'),
    files: yup.array().min(1, 'Envie pelo menos uma foto').required('Campo obrigatório')
})

const Publish = () => {
    const classes = useStyles()
    
    return (
        <TemplateDefault>

            <Formik
                initialValues={{
                    title: '',
                    category: '',
                    discription: '',
                    price: '',
                    email: '',
                    name: '',
                    phone: '',
                    files: [],
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    console.log('ok enviou o formu', values)
                }}
            >
                {
                    ({
                        touched,
                        values,
                        errors,
                        handleChange,
                        handleSubmit,
                        setFieldValue,
                    }) => {

                        const { getRootProps, getInputProps } = useDropzone({
                            accept: 'image/*',
                            onDrop: (acceptFile) => {
                                const newFiles = acceptFile.map(file => {
                                    return Object.assign(file, {
                                        preview: URL.createObjectURL(file)
                                    })
                                })
                    
                                setFieldValue('files', [
                                    ...values.files,
                                    ...newFiles,
                                ])
                            }
                        })
                    
                        const handleRemoveFile = fileName => {
                            const newFileState = values.files.filter(file => file.name !== fileName)
                            setFieldValue('files', newFileState)
                        }

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
                                        
                                        <FormControl error={ errors.title && touched.title} fullWidth>
                                            <InputLabel className={classes.inputLabel}>Título do Anúncio</InputLabel>
                                            <Input
                                                name="title"
                                                value={values.title}
                                                onChange={handleChange}
                                            />
                                            <FormHelperText>
                                                { errors.title && touched.title ? errors.title : null }
                                            </FormHelperText>
                                        </FormControl>
                                        <br/><br/>

                                        <FormControl error={ errors.category && touched.category} fullWidth>
                                            <InputLabel className={classes.inputLabel}>Categoria</InputLabel>
                                            <Select 
                                                name="category"
                                                value={values.category}
                                                fullWidth
                                                onChange={handleChange}
                                            >
                                                <MenuItem value="Bebê e Criança">Bebê e Criança</MenuItem>
                                                <MenuItem value="Agricultura">Agricultura</MenuItem>
                                                <MenuItem value="Moda">Moda</MenuItem>
                                                <MenuItem value="Carros, Motos e Barcos">Carros, Motos e Barcos</MenuItem>
                                                <MenuItem value="Serviços">Serviços</MenuItem>
                                                <MenuItem value="Lazer">Lazer</MenuItem>
                                                <MenuItem value="Animais">Animais</MenuItem>
                                                <MenuItem value="Moveis, Casa e Jardim">Moveis, Casa e Jardim</MenuItem>
                                                <MenuItem value="Imóveis">Imóveis</MenuItem>
                                                <MenuItem value="Equipamentos e Ferramentas">Equipamentos e Ferramentas</MenuItem>
                                                <MenuItem value="Celulares e Tablets">Celulares e Tablets</MenuItem>
                                                <MenuItem value="Esportes">Esportes</MenuItem>
                                                <MenuItem value="Tecnologia">Tecnologia</MenuItem>
                                                <MenuItem value="Emprego">Emprego</MenuItem>
                                                <MenuItem value="Outros">Outros</MenuItem>
                                            </Select>
                                            <FormHelperText>
                                            { errors.category && touched.category ? errors.category : null }
                                            </FormHelperText>
                                        </FormControl>    
                                    
                                    </Box>
                                </Container>

                                <Container maxWidth="md" className={classes.boxContainer}>
                                    <Box className={classes.box}>
                                        
                                        <Typography component="h6" variant="h6" color={errors.files && touched.files ? 'error' : 'textPrimary'}>
                                            Imagens
                                        </Typography>
                                        <Typography component="div" variant="body2" color={errors.files && touched.files ? 'error' : 'textPrimary'}>
                                            A primeira imagem é a foto principal do seu anúncio.
                                        </Typography>
                                        {
                                            errors.files && touched.files
                                            ? <Typography variant="body2" color="error" gutterBottom>{errors.files}</Typography>
                                            : null
                                        }
                                        <Box className={classes.thumbContainer}>
                                            <Box className={classes.dropzone} {...getRootProps()}>
                                                <input name="files" {...getInputProps()} />
                                                <Typography variant="body2" color={errors.files && touched.files ? 'error' : 'textPrimary'}>
                                                    Clique para adicionar ou arraste a imagem para aqui.
                                                </Typography>
                                            </Box>

                                            {
                                                values.files.map((file, index) => (
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
                                        
                                        <FormControl error={ errors.discription && touched.discription} fullWidth>
                                            <InputLabel className={classes.inputLabel}>Escreva os detalhes do que está vendendo.</InputLabel>
                                            <Input
                                                name="discription" 
                                                multiline
                                                rows={6}
                                                variant="outlined"
                                                onChange={handleChange}
                                            />
                                            <FormHelperText>
                                            { errors.discription && touched.discription ? errors.discription : null }
                                            </FormHelperText>
                                        </FormControl>

                                    </Box>
                                </Container>

                                <Container maxWidth="md" className={classes.boxContainer}>
                                    <Box className={classes.box}>

                                        <FormControl error={ errors.price && touched.price} fullWidth>
                                            <InputLabel className={classes.inputLabel}>Preço de venda</InputLabel>
                                            <Input
                                                name="price" 
                                                variant="outlined"
                                                onChange={handleChange}
                                                startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                                            />
                                            <FormHelperText>
                                            { errors.price && touched.price ? errors.price : null }
                                            </FormHelperText>
                                        </FormControl>

                                    </Box>
                                </Container>
            
                                <Container maxWidth="md" className={classes.boxContainer}>
                                    <Box className={classes.box}>
                                        <Typography component="h6" variant="h6" color="textPrimary" gutterBottom>
                                            Dados de Contato
                                        </Typography>

                                        <FormControl error={ errors.name && touched.name} fullWidth>
                                            <InputLabel className={classes.inputLabel}>Nome</InputLabel>
                                            <Input
                                                name="name"
                                                value={values.name}
                                                onChange={handleChange}
                                            />
                                            <FormHelperText>
                                            { errors.name && touched.name ? errors.name : null }
                                            </FormHelperText>
                                        </FormControl>

                                        <br/><br/>

                                        <FormControl error={ errors.email && touched.email} fullWidth>
                                            <InputLabel className={classes.inputLabel}>E-mail</InputLabel>
                                            <Input
                                                name="email"
                                                value={values.email}
                                                onChange={handleChange}
                                            />
                                            <FormHelperText>
                                            { errors.email && touched.email ? errors.email : null }
                                            </FormHelperText>
                                        </FormControl>

                                        <br/><br/>

                                        <FormControl error={ errors.phone && touched.phone} fullWidth>
                                            <InputLabel className={classes.inputLabel}>Telefone</InputLabel>
                                            <Input
                                                name="phone"
                                                value={values.phone}
                                                onChange={handleChange}
                                            />
                                            <FormHelperText>
                                            { errors.phone && touched.phone ? errors.phone : null }
                                            </FormHelperText>
                                        </FormControl>

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