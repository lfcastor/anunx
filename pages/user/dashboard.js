import {
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Container,
  Typography,
  Grid, 
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core'
import TemplateDefault from '../../src/templates/Default'

//useStyles, como se fosse um CSS, para ajustar os componentes
const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(8, 0, 6)
  },
  cardMedia: {
    paddingTop: '56%'
  },
  buttonAdd: {
    margin: '30px auto',
    display: 'block'
  }
}))

export default function Home() {
  const classes = useStyles() //Usando o useStyle que foi definido acima.
  return (
    <TemplateDefault>
      <Container maxWidth="sm" className={classes.container}>
        <Typography component="h1" variant="h2" align="center">
          Meus Anúncios
        </Typography>
        <Button variant="contained" color="primary" className={classes.buttonAdd}>
          Publicar novo anúncio
        </Button>
      </Container>
      <Container maxWidth="md">
        <Grid container spacing={4}>
          <Grid item xs={12} sd={6} md={4}>
            <Card>
              <CardMedia
                className={classes.cardMedia}
                image={'https://source.unsplash.com/random'}
                title="Titulo da Imagem"
              />
              <CardContent>
                <Typography variant="h5" component="h2">
                  Produto X
                </Typography>
                <Typography>
                  R$ 60,00
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  Editar
                </Button>
                <Button size="small" color="primary">
                  Remover
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sd={6} md={4}>
            <Card>
              <CardMedia
                className={classes.cardMedia}
                image={'https://source.unsplash.com/random'}
                title="Titulo da Imagem"
              />
              <CardContent>
                <Typography variant="h5" component="h2">
                  Produto X
                </Typography>
                <Typography>
                  R$ 60,00
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  Editar
                </Button>
                <Button size="small" color="primary">
                  Remover
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sd={6} md={4}>
            <Card>
              <CardMedia
                className={classes.cardMedia}
                image={'https://source.unsplash.com/random'}
                title="Titulo da Imagem"
              />
              <CardContent>
                <Typography variant="h5" component="h2">
                  Produto X
                </Typography>
                <Typography>
                  R$ 60,00
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  Editar
                </Button>
                <Button size="small" color="primary">
                  Remover
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sd={6} md={4}>
            <Card>
              <CardMedia
                className={classes.cardMedia}
                image={'https://source.unsplash.com/random'}
                title="Titulo da Imagem"
              />
              <CardContent>
                <Typography variant="h5" component="h2">
                  Produto X
                </Typography>
                <Typography>
                  R$ 60,00
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  Editar
                </Button>
                <Button size="small" color="primary">
                  Remover
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </TemplateDefault>
  )
}
