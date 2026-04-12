import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updateUser } from '../redux/AllUserSlice';
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft, Loader2, CheckCircle } from "lucide-react";

const UserView = () => {
  const navigate  = useNavigate();
  const dispatch  = useDispatch();
  const location  = useLocation();
  const { data }  = location.state || {};
  const [formData, setFormData] = useState(data);
  const userinfo  = useSelector((state) => state?.user?.user);
  const { UpdatedUserMessage, UpdatedUserLoading } = useSelector((state) => state?.Alluser);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ formData, userinfo }));
  };

  const Field = ({ label, name, value, disabled = false, multiline = false }) => (
    <div>
      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">{label}</label>
      {multiline ? (
        <textarea
          name={name}
          value={value || ''}
          onChange={handleChange}
          disabled={disabled}
          rows={2}
          className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-800 bg-white disabled:bg-slate-50 disabled:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
        />
      ) : (
        <input
          type="text"
          name={name}
          value={value || ''}
          onChange={handleChange}
          disabled={disabled}
          className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-800 bg-white disabled:bg-slate-50 disabled:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
      )}
    </div>
  );

  return (
    <div className="space-y-5 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-800">Update User</h1>
        <p className="text-slate-500 text-sm mt-1">Edit user details and blacklist status</p>
      </div>

      <button
        onClick={() => navigate('/User')}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors shadow-sm"
      >
        <ArrowLeft size={14} /> Back to Users
      </button>

      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-xl border border-slate-100 shadow-card p-6 space-y-5">
          {/* Row 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Field label="User ID"    name="_id"       value={formData._id}       disabled />
            <Field label="Created At" name="createdAt" value={formData.createdAt} disabled />
            <Field label="Updated At" name="updatedAt" value={formData.updatedAt} disabled />
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Field label="Email"   name="email"   value={formData.email}   disabled />
            <Field label="Name"    name="name"    value={formData.name} />
            <Field label="Address" name="address" value={formData.address} multiline />
          </div>

          {/* Blacklist */}
          <div className="max-w-xs">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Blacklisted</label>
            <select
              name="isBlackListUser"
              value={formData.isBlackListUser}
              onChange={(e) => setFormData({ ...formData, isBlackListUser: e.target.value === 'true' })}
              className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value={false}>No — Active User</option>
              <option value={true}>Yes — Blacklisted</option>
            </select>
          </div>

          {/* Message */}
          {UpdatedUserMessage && (
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-100 rounded-lg text-green-700 text-sm">
              <CheckCircle size={15} />
              {UpdatedUserMessage}
            </div>
          )}

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={UpdatedUserLoading}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-md shadow-blue-600/20"
            >
              {UpdatedUserLoading ? (
                <><Loader2 size={15} className="animate-spin" /> Updating...</>
              ) : 'Update User'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserView;
