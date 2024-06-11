import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Container } from '@mui/material';
import { useSelector } from "react-redux";
import Loading from "../component/Loading";
import { SetRating } from "./Reviews_show";
import { useNavigate } from "react-router-dom";
const TableShowReview = () => {

    const navigate = useNavigate();
    const { Review, next, orderLoading } = useSelector((state) => state?.review);
    function handleScroll() {

    }

    function View(data) {
        navigate(`View`, { state: { data: data } });
    }
    return (
        <>
            <Container>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="product table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Review id</TableCell>
                                <TableCell>Order id</TableCell>
                                <TableCell >User email</TableCell>
                                <TableCell>Rating</TableCell>
                                <TableCell>createdAt</TableCell>
                                <TableCell>updatedAt</TableCell>
                                <TableCell>Review</TableCell>
                                <TableCell>View</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                Review && Review?.map((data) => (
                                    <TableRow key={data?._id}>
                                        <TableCell>{data?._id}</TableCell>
                                        <TableCell>{data?.order_id}</TableCell>
                                        <TableCell>{data?.email}</TableCell>
                                        <TableCell>
                                            <SetRating rating={data?.rating} />
                                        </TableCell>
                                        <TableCell>{data?.createdAt}</TableCell>
                                        <TableCell>{data?.updatedAt}</TableCell>
                                        <TableCell>
                                            <TextField
                                                variant="outlined"
                                                minRows={4}
                                                defaultValue={data?.review}
                                                disabled={true}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="contained" size="small" onClick={() => { View(data) }} color="info">View</Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody >
                    </Table >
                </TableContainer>
            </Container>
            {
                orderLoading ? <Loading /> : next &&
                    <Button variant="contained" color="secondary" style={{ marginTop: '10px', marginBottom: '10px', display: 'flex', marginLeft: '45%' }} onClick={handleScroll} >
                        Load More
                    </Button>
            }
        </>
    )

}
export default TableShowReview