
const api = process.env.REACT_APP_API
const login = () => {

}
const register = () => {

}
const verifyOTP = async (email, otpFromdata, password) => {
    try {
        let response = await fetch(`${api}/Verification/VerifyOTP`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                otp: otpFromdata,
                password: password
            })
        })
        response = await response.json();
        return response;
    } catch (e) {

    }
}

const forgotPassword = () => {

}

export { login, register, verifyOTP, forgotPassword }