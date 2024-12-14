import axios from "axios";
const api = process.env.REACT_APP_API;
const login = async (body) => {
	try {
		const response = await axios.post(`${api}/authUser/login`, body);
		return response.data;
	} catch (e) {
		throw new Error(e?.response?.data?.message || e?.message);
	}
};

const register = async (body = {}) => {
	try {
		const response = await axios.post(`${api}/authUser/register`, body);
		return response.data;
	} catch (e) {
		throw new Error(e?.response?.data?.message || e?.message);
	}
};

const forgotPassword = async (body = {}) => {
	try {
		const response = await axios.post(`${api}/authUser/forgotPassword`, body);
		return response.data;
	} catch (e) {
		throw new Error(e?.response?.data?.message || e?.message);
	}
};

const checkTokenData = async (token) => {
	try {
		const response = await axios.get(`${api}/authUser/getResetData/${token}`);
		return response.data;
	} catch (e) {
		throw new Error(e?.response?.data?.message || e?.message);
	}
};

const savePassword = async (body = {}) => {
	try {
		const response = await axios.post(`${api}/authUser/savePassword`, body);
		return response.data;
	} catch (e) {
		throw new Error(e?.response?.data?.message || e?.message);
	}
};

const verifyOTP = async (body = {}) => {
	try {
		const response = await axios.post(`${api}/Verification/VerifyOTP`, body);
		return response.data;
	} catch (e) {
		throw new Error(e?.response?.data?.message || e?.message);
	}
};

const sendOTP = async (email) => {
	try {
		const response = await axios.post(`${api}/authUser/sendOTP`, { email });
		return response.data;
	} catch (e) {
		throw new Error(e?.response?.data?.message || e?.message);
	}
};

export { verifyOTP, login, register, forgotPassword, checkTokenData, savePassword, sendOTP };
