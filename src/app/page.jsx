import Button from '@mui/material/Button';
import { Box, Container } from '@mui/material';
import NavBar from '@/components/NavBar'
import Typography from '@mui/material/Typography'
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Box>
        <NavBar />
        <Box className='banner-background' sx={{
          display: 'flex',
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap-reverse',
        }}>
          <Box sx={{
            display: 'flex',
            width: '45%',
            '&>img': {
              width: '100%'
            }
          }}>
            <img src={"/images/LibraryBanner3.svg"} alt="" />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', p: '2rem' }}>
            <Box sx={{
              maxWidth: '25rem'
            }}>
              <Typography variant='h2' fontWeight='600' color='primary.dark' marginBottom={3}>¡Pídelo ya!</Typography>
              <Typography variant='body1' color='secondary.dark' marginBottom={4}>Encuentra el libro que necesitas y resérvalo. Nunca fue tan rápido reservar un libro.</Typography>
              <Link href="/signup">
                <Button variant="contained" size='large' color='green'>Comenzar ahora</Button>
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
      <Container>
        <Box sx={{
          display: 'flex',
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
          flexWrap: 'wrap'
        }}>
          <Box sx={{ p: 2, width: '50%', maxWidth: '30rem' }}>
            <Typography variant='h3' fontWeight='500' color='green.dark' marginBottom={2}>Lo que encontrarás</Typography>
            <Typography variant='body1' color='secondary.dark'>
              En TechLibrary encontrarás todos los libros que necesitas para llevar a cabo tus actividades de estudio en todas las áreas.
            </Typography>
          </Box>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '45%',
            '&>img': {
              width: '100%',
              maxWidth: '430px'
            }
          }}>
            <img src={"/images/Library-rafiki.svg"} alt="" />
          </Box>
        </Box>
      </Container>
      <Box sx={{ backgroundColor: 'primary.light', p: 3, textAlign: 'center' }}>
        <Typography variant='body1' color='secondary.dark'>
          Creado por: Steven Reales y Cristian Suarez
        </Typography>
      </Box>
    </>
  )
}
