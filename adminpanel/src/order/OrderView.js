import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
    TextField,
    Button,
    Grid,
    Typography,
    Container,
    Select,
    MenuItem
} from '@mui/material';
import { useNavigate } from "react-router-dom";
import { updateOrder } from '../redux/OrderSlice'
import { useDispatch, useSelector } from "react-redux";
import { IoMdArrowBack } from "react-icons/io";

const OrderView = () => {
    const history = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation();
    const { data } = location.state || {};
    const [formData, setFormData] = useState(data);
    const userinfo = useSelector((state) => state?.user?.user);
    const { UpdatedOrderMessage, UpdatedOrderLoading } = useSelector((state) => state?.Order)

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateOrder({ formData, userinfo }))
    };

    const Back = () => {
        history('/Order')
    }

    return (
        <Container>
            <Button size="small" type="submit" variant="contained" onClick={Back} color="info" sx={{ textAlign: 'center', mt: 1 }}>
                <IoMdArrowBack /> Back
            </Button>
            <Typography variant="h6" sx={{ textAlign: 'center' }}>
                Update Order
            </Typography>

            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={4}>
                        <TextField
                            label="Order Id"
                            name="_id"
                            value={formData._id}
                            onChange={handleChange}
                            fullWidth
                            size="small"
                            disabled
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label="createdAt"
                            name="createdAt"
                            value={formData.createdAt}
                            onChange={handleChange}
                            fullWidth
                            size="small"
                            disabled
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label="updatedAt"
                            name="updatedAt"
                            value={formData.updatedAt}
                            onChange={handleChange}
                            fullWidth
                            size="small"
                            disabled
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={4}>
                        <TextField
                            label="Booking Date"
                            name="Date"
                            value={formData.Date}
                            onChange={handleChange}
                            fullWidth
                            size="small"
                            disabled
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label="Total Rupess"
                            name="Total_rupess"
                            value={formData.Total_rupess}
                            onChange={handleChange}
                            fullWidth
                            size="small"
                            disabled
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                            size="small"
                            disabled
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={4}>
                        <TextField
                            label="Product Name"
                            name="product_name"
                            value={formData.product_name}
                            onChange={handleChange}
                            fullWidth
                            size="small"
                            disabled={true}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label="Product Count"
                            name="product_count"
                            value={formData.product_count}
                            onChange={handleChange}
                            fullWidth
                            size="small"
                            disabled
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label="Product ID"
                            name="product_id"
                            value={formData.product_id}
                            onChange={handleChange}
                            fullWidth
                            size="small"
                            disabled
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={4}>
                        <TextField
                            label="Payment Method"
                            name="payment_method"
                            value={formData.payment_method}
                            onChange={handleChange}
                            fullWidth
                            size="small"
                            disabled
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Select
                            label="Status"
                            name="status"
                            value={formData.status}
                            onChange={handleSelectChange}
                            fullWidth
                            size="small"
                        >
                            <MenuItem value="pending">pending</MenuItem>
                            <MenuItem value="cancel">cancel</MenuItem>
                            <MenuItem value="processing">processing</MenuItem>
                            <MenuItem value="done">done</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label="Address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            fullWidth
                            size="small"
                            rows={4}
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{ mt: 2 }}>
                    {
                        UpdatedOrderLoading === true ?
                            <Button type="submit" size="small" disabled={true} variant="contained" color="success">
                                Please wait..
                            </Button>
                            :
                            <Button type="submit" size="small" variant="contained" color="success">
                                Update Order
                            </Button>
                    }
                </Grid>
            </form>
            <Typography variant="body1" sx={{ textAlign: 'center', color: 'red' }}>
                {UpdatedOrderMessage}
            </Typography>
        </Container>
    );
};

export default OrderView;
