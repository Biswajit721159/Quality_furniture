import React, { useState } from 'react';
import { FiUser, FiMail, FiMessageSquare, FiSend } from 'react-icons/fi';
import { MdOutlineTopic } from "react-icons/md";

const api = process.env.REACT_APP_API

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [submitform, setsubmitform] = useState('');
    const [success, setsuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) setErrors({ ...errors, [name]: '' });
    };

    const validate = () => {
        let tempErrors = {};
        if (!formData.name.trim()) tempErrors.name = "Name is required.";
        else if (formData.name.length < 3 || formData.name.length > 50) tempErrors.name = "Name must be 3-50 characters.";

        if (!formData.email.trim()) tempErrors.email = "Email is required.";
        else if (!/.+@.+\..+/.test(formData.email)) tempErrors.email = "Email is not valid.";
        else if (formData.email.length > 100) tempErrors.email = "Email too long.";

        if (!formData.subject.trim()) tempErrors.subject = "Subject is required.";
        else if (formData.subject.length < 10 || formData.subject.length > 100) tempErrors.subject = "Subject must be 10-100 characters.";

        if (!formData.message.trim()) tempErrors.message = "Message is required.";
        else if (formData.message.length < 20 || formData.message.length > 300) tempErrors.message = "Message must be 20-300 characters.";

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setsubmitform('');
        setsuccess(false);
        
        if (validate()) {
            setLoading(true);
            try {
                let responce = await fetch(`${api}/contact/addContactInfo`, {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
                let data = await responce.json()
                
                setsubmitform(data?.message)
                if (data.statusCode === 201) {
                    setsuccess(true)
                    setFormData({ name: '', email: '', subject: '', message: '' })
                    setTimeout(() => {
                        setsuccess(false)
                        setsubmitform('')
                    }, 4000);
                }
            } catch (err) {
                setsubmitform("Something went wrong. Please try again.")
            } finally {
                setLoading(false);
            }
        }
    };

    const inputClasses = (name) => `input-base pl-10 ${errors[name] ? 'border-red-400 focus:ring-red-400' : ''}`;

    return (
        <div className="bg-stone-50 rounded-3xl p-6 lg:p-12 border border-stone-100">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-10">
                    <span className="text-brand font-bold tracking-wider uppercase text-xs">Get In Touch</span>
                    <h2 className="text-3xl font-black text-stone-900 mt-2">Contact Us</h2>
                    <p className="text-stone-500 text-sm mt-3">Have a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-card border border-stone-100 space-y-5">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-semibold text-stone-700 mb-1.5">Your Name</label>
                            <div className="relative">
                                <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" size={17} />
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={inputClasses('name')}
                                    placeholder="John Doe"
                                    spellCheck={false}
                                />
                            </div>
                            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-semibold text-stone-700 mb-1.5">Email Address</label>
                            <div className="relative">
                                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" size={17} />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={inputClasses('email')}
                                    placeholder="you@example.com"
                                    spellCheck={false}
                                />
                            </div>
                            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                        </div>
                    </div>

                    {/* Subject */}
                    <div>
                        <label className="block text-sm font-semibold text-stone-700 mb-1.5">Subject</label>
                        <div className="relative">
                            <MdOutlineTopic className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" size={19} />
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className={inputClasses('subject')}
                                placeholder="How can we help you?"
                                spellCheck={false}
                            />
                        </div>
                        {errors.subject && <p className="text-xs text-red-500 mt-1">{errors.subject}</p>}
                    </div>

                    {/* Message */}
                    <div>
                        <label className="block text-sm font-semibold text-stone-700 mb-1.5">Message</label>
                        <div className="relative">
                            <FiMessageSquare className="absolute left-3.5 top-3.5 text-stone-400" size={17} />
                            <textarea
                                name="message"
                                rows={5}
                                value={formData.message}
                                onChange={handleChange}
                                className={`input-base pl-10 resize-none ${errors.message ? 'border-red-400 focus:ring-red-400' : ''}`}
                                placeholder="Write your message here..."
                                spellCheck={false}
                            />
                        </div>
                        <div className="flex justify-between items-start mt-1">
                            {errors.message ? (
                                <p className="text-xs text-red-500">{errors.message}</p>
                            ) : (
                                <span></span>
                            )}
                            <span className="text-[10px] text-stone-400">{formData.message.length}/300</span>
                        </div>
                    </div>

                    {/* Status Message */}
                    {submitform && (
                        <div className={`p-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 ${success ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                            {success ? '✓' : '⚠️'} {submitform}
                        </div>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white transition-all shadow-md
                            ${loading ? 'bg-stone-400 cursor-not-allowed' : 'bg-brand hover:bg-brand-light hover:shadow-lg active:scale-95'}`}
                    >
                        <FiSend size={16} />
                        {loading ? "Sending..." : "Send Message"}
                    </button>
                    
                </form>
            </div>
        </div>
    );
};

export default ContactForm;
