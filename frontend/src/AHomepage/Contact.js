import React, { useState } from 'react';
import { Container, TextField, Button, Box, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const api = process.env.REACT_APP_API
const theme = createTheme({
    palette: {
        background: {
            default: '#f5f5f5'
        }
    }
});

const ContactForm = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [submitform, setsubmitform] = useState('');
    const [success, setsuccess] = useState(false);

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validate = () => {
        let tempErrors = {};
        tempErrors.name = formData.name.trim() ? "" : "Name is required.";
        tempErrors.email = /.+@.+\..+/.test(formData.email) ? "" : "Email is not valid.";
        tempErrors.subject = formData.subject.trim() ? "" : "Subject is required.";
        tempErrors.message = formData.message.trim() ? "" : "Message is required.";

        if (formData.name.trim() && (formData.name.length < 3 || formData.name.length > 50)) {
            tempErrors.name = "Name should be between 3 and 50 characters.";
        }

        if (formData.email.trim() && formData.email.length > 100) {
            tempErrors.email = "Email should not exceed 100 characters.";
        }

        if (formData.subject.trim() && (formData.subject.length < 10 || formData.subject.length > 100)) {
            tempErrors.subject = "Subject should be between 10 and 100 characters.";
        }

        if (formData.message.trim() && formData.message.length > 300 || formData.message.length < 20) {
            tempErrors.message = "Message should be between 20 and 500 characters.";
        }

        setErrors(tempErrors);

        return Object.values(tempErrors).every(x => x === "");
    };

    const handleSubmit = async (e) => {
        setsubmitform('');
        setsuccess(false);
        e.preventDefault();
        if (validate()) {
            let responce = await fetch(`${api}/contact/addContactInfo`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    subject: formData.subject
                })
            });
            let data = await responce.json()
            setsubmitform(data?.message)
            if (data.statusCode === 201) {
                setsuccess(true)
                formData.name = ''
                formData.email = ''
                formData.message = ''
                formData.subject = ''
                setTimeout(() => {
                    setsuccess(false)
                    setsubmitform('')
                }, 4000);
            }
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    backgroundColor: theme.palette.background.default,
                    minHeight: '70vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 2
                }}
            >
                <Container maxWidth="md" sx={{ backgroundColor: '#fff', padding: 3, borderRadius: 1, boxShadow: 3 }}>
                    <Typography variant="h5" component="h1" sx={{ textAlign: 'center' }} gutterBottom>
                        Contact Us
                    </Typography>
                    <form onSubmit={handleSubmit} style={{ marginBottom: 0 }}>
                        <Box mb={2}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                error={!!errors.name}
                                helperText={errors.name}
                            />
                        </Box>
                        <Box mb={2}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                error={!!errors.email}
                                helperText={errors.email}
                            />
                        </Box>
                        <Box mb={2}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                error={!!errors.subject}
                                helperText={errors.subject}
                            />
                        </Box>
                        <Box mb={2}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Message"
                                name="message"
                                multiline
                                rows={4}
                                value={formData.message}
                                onChange={handleChange}
                                error={!!errors.message}
                                helperText={errors.message}
                            />
                        </Box>
                        <Box textAlign="center" mt={2} mb={2}>
                            <Button variant="contained" color="primary" type="submit">
                                Submit
                            </Button>
                        </Box>
                    </form>
                    <Typography variant="h6" component="h1" color={success === true ? 'green' : 'red'} sx={{ textAlign: 'center' }} gutterBottom>
                        {submitform}
                    </Typography>
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default ContactForm;
