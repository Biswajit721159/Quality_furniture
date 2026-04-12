import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../component/Loading";
import { loadUser } from '../redux/AllUserSlice';
import DataNotFoundPage from "../component/DataNotFoundPage";
import { Allusermethod } from '../redux/AllUserSlice';
import { Eye, ChevronDown, ShieldAlert, ShieldCheck, Users } from "lucide-react";

/* ── tiny helpers ── */
const Avatar = ({ name }) => {
  const initials = (name || '?').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const hue = (name || '').charCodeAt(0) % 6;
  const palettes = [
    'bg-blue-100 text-blue-700',
    'bg-violet-100 text-violet-700',
    'bg-emerald-100 text-emerald-700',
    'bg-amber-100 text-amber-700',
    'bg-rose-100 text-rose-700',
    'bg-cyan-100 text-cyan-700',
  ];
  return (
    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold flex-shrink-0 ${palettes[hue]}`}>
      {initials}
    </span>
  );
};

const Usershow = () => {
  const dispatch = useDispatch();
  const userinfo = useSelector((state) => state?.user?.user);
  const { Alluser, userLoading, LowerLimit, UpperLimit, next, searchvalue } = useSelector((state) => state?.Alluser);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(Allusermethod.setUpdatedOrderMessage(''));
  }, []);

  const handleScroll = () => {
    if (!userLoading && next) {
      dispatch(loadUser({ LowerLimit, UpperLimit, userinfo, searchvalue }));
    }
  };

  const View = (data) => {
    navigate(`/User/${data?._id}`, { state: { data } });
  };

  if (!Alluser || Alluser.length === 0) return <DataNotFoundPage />;

  return (
    <div className="space-y-3">
      {/* Table card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

        {/* Table header bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Users size={15} className="text-slate-400" />
            <span className="text-sm font-semibold text-slate-700">Users</span>
            <span className="ml-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-xs font-medium">
              {Alluser.length}
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50/80">
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-widest whitespace-nowrap border-b border-slate-100">
                  User
                </th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-widest whitespace-nowrap border-b border-slate-100">
                  Email
                </th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-widest whitespace-nowrap border-b border-slate-100">
                  Address
                </th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-widest whitespace-nowrap border-b border-slate-100">
                  Registered
                </th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-widest whitespace-nowrap border-b border-slate-100">
                  Last Updated
                </th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-widest whitespace-nowrap border-b border-slate-100">
                  Status
                </th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-widest whitespace-nowrap border-b border-slate-100">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {Alluser.map((row, idx) => (
                <tr
                  key={row._id}
                  className={`group transition-colors duration-100 hover:bg-blue-50/40 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'}`}
                >
                  {/* User (avatar + name + id) */}
                  <td className="px-5 py-3.5 border-b border-slate-100">
                    <div className="flex items-center gap-3 min-w-[160px]">
                      <Avatar name={row.name} />
                      <div>
                        <p className="font-semibold text-slate-800 leading-tight">{row.name || '—'}</p>
                        <p className="text-[11px] text-slate-400 font-mono mt-0.5" title={row._id}>
                          #{row._id?.slice(-8)}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="px-5 py-3.5 border-b border-slate-100">
                    <span className="text-slate-600 text-sm">{row.email}</span>
                  </td>

                  {/* Address */}
                  <td className="px-5 py-3.5 border-b border-slate-100 max-w-[160px]">
                    <span className="text-slate-500 text-sm truncate block" title={row.address}>
                      {row.address || <span className="text-slate-300 italic">No address</span>}
                    </span>
                  </td>

                  {/* Registered */}
                  <td className="px-5 py-3.5 border-b border-slate-100 whitespace-nowrap">
                    <span className="text-slate-500 text-xs">
                      {new Date(row.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </span>
                  </td>

                  {/* Updated */}
                  <td className="px-5 py-3.5 border-b border-slate-100 whitespace-nowrap">
                    <span className="text-slate-500 text-xs">
                      {new Date(row.updatedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </span>
                  </td>

                  {/* Status badge */}
                  <td className="px-5 py-3.5 border-b border-slate-100">
                    {row.isBlackListUser ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-600 border border-red-100">
                        <ShieldAlert size={11} />
                        Blacklisted
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100">
                        <ShieldCheck size={11} />
                        Active
                      </span>
                    )}
                  </td>

                  {/* Action */}
                  <td className="px-5 py-3.5 border-b border-slate-100">
                    <button
                      onClick={() => View(row)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white border border-blue-100 hover:border-blue-600 rounded-lg transition-all duration-150"
                    >
                      <Eye size={12} />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        {userLoading && (
          <div className="px-5 py-4 border-t border-slate-100">
            <Loading />
          </div>
        )}
        {!userLoading && next && (
          <div className="flex items-center justify-center px-5 py-4 border-t border-slate-100 bg-slate-50/50">
            <button
              onClick={handleScroll}
              className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-slate-600 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl transition-all duration-150 shadow-sm"
            >
              <ChevronDown size={15} />
              Load more users
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(Usershow);
