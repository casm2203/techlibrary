"use client"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import { useState } from 'react';

const BookTable = ({ books, onDelete, setBookToEdit }) => {

  const [open, setOpen] = useState(false);
  const [book, setBook] = useState(null);

  const handleClickOpen = (id) => {
    setBook(id)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = (id) => {
    onDelete(id, () => { setOpen(false) })
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="Libros">
          <TableHead>
            <TableRow sx={{ '& > th': { fontWeight: 'bold' } }}>
              <TableCell>Título</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Autor</TableCell>
              <TableCell>Año</TableCell>
              <TableCell>Disponibilidad</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book.id}>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.description}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.year}</TableCell>
                <TableCell>{book.available ? 'Disponible' : 'No Disponible'}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    aria-label="Editar"
                    onClick={() => setBookToEdit(book)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    aria-label="Eliminar"
                    onClick={() => handleClickOpen(book.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"¿Desea eliminar el libro?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Recuerde que al eliminar el libro desaparecerá toda la información relacionada a él.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button color='error' onClick={() => handleAgree(book)} autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BookTable;
