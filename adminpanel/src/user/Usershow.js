import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { TextField, Container } from '@mui/material';

const Usershow = () => {
  let page = parseInt(useParams().page);
  const user = useSelector((state) => state.Alluser.Alluser);
  const prev = useSelector((state) => state.Alluser.prev);
  const next = useSelector((state) => state.Alluser.next);
  const history = useNavigate();

  function Shownextpage() {
    history(`/User/page/${page + 1}`);
  }

  function View(data) {
    history(`/User/${data._id}`);
  }

  function ShowPrevPage() {
    history(`/User/page/${page - 1}`);
  }

  const [name, setName] = useState('');

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', name);
  };

  return (
    <>
      {user != null && user.length !== 0 && (
        <>
          <Container maxWidth="lg" style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
              <TextField
                variant="outlined"
                value={name}
                onChange={handleInputChange}
                placeholder="Enter Name"
                size="small"
                style={{ marginTop: '5px' }}
              />
            </form>
          </Container>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>User_id</TableCell>
                  <TableCell align="right" className="text-center">User Name</TableCell>
                  <TableCell align="right" className="text-center">Email</TableCell>
                  <TableCell align="right" className="text-center">Address</TableCell>
                  <TableCell align="right" className="text-center">Register Date</TableCell>
                  <TableCell align="right" className="text-center">View</TableCell>
                  <TableCell align="right" className="text-center">Update</TableCell>
                  <TableCell align="right" className="text-center">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {user.map((row) => (
                  <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {row._id}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell align="right">{row.address}</TableCell>
                    <TableCell align="right">{row.createdAt}</TableCell>
                    <TableCell align="right" onClick={() => View(row)}>
                      <Button variant="contained" size="small" color="info">
                        View
                      </Button>
                    </TableCell>
                    <TableCell align="right">
                      <Button variant="contained" size="small" color="success">
                        Update
                      </Button>
                    </TableCell>
                    <TableCell align="right">
                      <Button variant="contained" size="small" color="error">
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
        <Button variant="contained" size="small" color="success" onClick={ShowPrevPage} disabled={!prev}>
          Prev
        </Button>
        <Button variant="contained" size="small" color="success" onClick={Shownextpage} disabled={!next}>
          Next
        </Button>
      </div>
    </>
  );
};

export default Usershow;
