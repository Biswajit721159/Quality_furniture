import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Loading from "../component/Loading";
import { loadUser } from '../redux/AllUserSlice'
import DataNotFoundPage from "../component/DataNotFoundPage";
import { Allusermethod } from '../redux/AllUserSlice'

const Usershow = () => {
  const dispatch = useDispatch()
  const userinfo = useSelector((state) => state?.user?.user);
  const { Alluser, userLoading, LowerLimit, UpperLimit, next, searchvalue } = useSelector((state) => state?.Alluser);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(Allusermethod.setUpdatedOrderMessage(''))
  }, [])

  const handleScroll = () => {
    if (!userLoading && next) {
      dispatch(loadUser({ LowerLimit, UpperLimit, userinfo, searchvalue }));
    }
  };

  const View = (data) => {
    navigate(`/User/${data?._id}`, { state: { data: data } });
  }

  return (
    <>
      {Alluser !== null && Alluser?.length !== 0 ?
        <Container maxWidth="lg">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="user table">
              <TableHead>
                <TableRow>
                  <TableCell>User_id</TableCell>
                  <TableCell align="right" className="text-center">User Name</TableCell>
                  <TableCell align="right" className="text-center">Email</TableCell>
                  <TableCell align="right" className="text-center">Address</TableCell>
                  <TableCell align="right" className="text-center">Register Date</TableCell>
                  <TableCell align="right" className="text-center">Last Update</TableCell>
                  <TableCell align="right" className="text-center">isBlackListUser</TableCell>
                  <TableCell align="right" className="text-center">Action-1</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Alluser.map((row) => (
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
                    <TableCell align="right">{row.updatedAt}</TableCell>
                    <TableCell align="right">{row.isBlackListUser === true ? "Yes" : "No"}</TableCell>
                    <TableCell align="right" onClick={() => View(row)}>
                      <Button variant="contained" size="small" onClick={() => View(row)} color="info">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
        : <DataNotFoundPage />
      }
      {userLoading ? <Loading /> : next &&
        <Button variant="contained" color="secondary" style={{ marginTop: '10px', marginBottom: '10px', display: 'flex', marginLeft: '45%' }} onClick={handleScroll} >
          Load More
        </Button>
      }
    </>
  );
};

export default React.memo(Usershow);
