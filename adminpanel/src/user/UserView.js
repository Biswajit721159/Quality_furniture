import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
    TextField,
    Button,
    Grid,
    Typography,
    Container,
    Select,
    MenuItem,
    InputLabel
} from '@mui/material';
import { useNavigate } from "react-router-dom";
import { updateUser } from '../redux/AllUserSlice';
import { useDispatch, useSelector } from "react-redux";
import { IoMdArrowBack } from "react-icons/io";

const UserView = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const { data } = location.state || {};
    const [formData, setFormData] = useState(data);
    const userinfo = useSelector((state) => state?.user?.user);
    const { UpdatedUserMessage, UpdatedUserLoading } = useSelector((state) => state?.Alluser);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
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
        dispatch(updateUser({ formData, userinfo }));
    };

    const handleBack = () => {
        navigate('/User');
    };

    return (
        <Container>
            <Button size="small" type="button" variant="contained" onClick={handleBack} color="info" sx={{ textAlign: 'center', mt: 1 }}>
                <IoMdArrowBack /> Back
            </Button>
            <Typography variant="h6" sx={{ textAlign: 'center' }}>
                Update User
            </Typography>

            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={4}>
                        <TextField
                            label="User ID"
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
                            label="Created At"
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
                            label="Updated At"
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
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                            size="small"
                            disabled={true}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            fullWidth
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label="Address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            fullWidth
                            size="small"
                            multiline
                            rows={2}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} >
                    <Grid item xs={4}>
                        <InputLabel id="isBlackListUser-label">Blacklisted</InputLabel>
                        <Select
                            labelId="isBlackListUser-label"
                            label="Blacklisted"
                            name="isBlackListUser"
                            value={formData.isBlackListUser}
                            onChange={handleSelectChange}
                            fullWidth
                            size="small"
                        >
                            <MenuItem value={false}>No</MenuItem>
                            <MenuItem value={true}>Yes</MenuItem>
                        </Select>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{ mt: 2 }}>
                    {
                        UpdatedUserLoading === true ?
                            <Button type="submit" size="small" disabled={true} variant="contained" color="success">
                                Please wait...
                            </Button>
                            :
                            <Button type="submit" size="small" variant="contained" color="success">
                                Update User
                            </Button>
                    }
                </Grid>
            </form>
            <Typography variant="body1" sx={{ textAlign: 'center', color: 'red' }}>
                {UpdatedUserMessage}
            </Typography>
        </Container>
    );
};

export default UserView;
