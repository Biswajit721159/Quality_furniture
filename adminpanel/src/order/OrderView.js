import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updateOrder } from '../redux/OrderSlice'
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft, Loader2, CheckCircle } from "lucide-react";

const statusOptions = ['pending', 'processing', 'done', 'cancel'];

const statusColors = {
  pending:    'bg-amber-50 text-amber-700 border-amber-200',
  processing: 'bg-blue-50 text-blue-700 border-blue-200',
  done:       'bg-green-50 text-green-700 border-green-200',
  cancel:     'bg-red-50 text-red-700 border-red-200',
};

const OrderView = () => {
  const history  = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation();
  const { data }  = location.state || {};
  const [formData, setFormData] = useState(data);
  const userinfo  = useSelector((state) => state?.user?.user);
  const { UpdatedOrderMessage, UpdatedOrderLoading } = useSelector((state) => state?.Order)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateOrder({ formData, userinfo }))
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
    <div className="space-y-5 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-800">Update Order</h1>
        <p className="text-slate-500 text-sm mt-1">Modify order status and delivery address</p>
      </div>

      <button
        onClick={() => history('/Order')}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors shadow-sm"
      >
        <ArrowLeft size={14} /> Back to Orders
      </button>

      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-xl border border-slate-100 shadow-card p-6 space-y-5">
          {/* Row 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Field label="Order ID"   name="_id"       value={formData._id}       disabled />
            <Field label="Created At" name="createdAt" value={formData.createdAt} disabled />
            <Field label="Updated At" name="updatedAt" value={formData.updatedAt} disabled />
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Field label="Booking Date"  name="Date"         value={formData.Date}         disabled />
            <Field label="Total Amount"  name="Total_rupess" value={`₹${formData.Total_rupess}`} disabled />
            <Field label="Email"         name="email"        value={formData.email}        disabled />
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Field label="Product Name"  name="product_name"  value={formData.product_name}  disabled />
            <Field label="Product Count" name="product_count" value={formData.product_count} disabled />
            <Field label="Product ID"    name="product_id"    value={formData.product_id}    disabled />
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Field label="Payment Method" name="payment_method" value={formData.payment_method} disabled />

            {/* Status Select */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                {statusOptions.map(s => (
                  <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                ))}
              </select>
              <span className={`inline-flex mt-1.5 px-2 py-0.5 rounded-full text-xs font-medium border capitalize ${statusColors[formData.status] || ''}`}>
                {formData.status}
              </span>
            </div>

            <Field label="Address" name="address" value={formData.address} multiline />
          </div>

          {/* Message */}
          {UpdatedOrderMessage && (
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-100 rounded-lg text-green-700 text-sm">
              <CheckCircle size={15} />
              {UpdatedOrderMessage}
            </div>
          )}

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={UpdatedOrderLoading}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-md shadow-blue-600/20"
            >
              {UpdatedOrderLoading ? (
                <><Loader2 size={15} className="animate-spin" /> Updating...</>
              ) : 'Update Order'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default OrderView;
