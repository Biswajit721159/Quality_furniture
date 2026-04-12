import React from "react";
import { SearchX } from "lucide-react";

const DataNotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
        <SearchX size={28} className="text-slate-400" />
      </div>
      <h3 className="text-slate-700 font-semibold text-lg">No records found</h3>
      <p className="text-slate-400 text-sm mt-1">Try adjusting your search or refresh the list.</p>
    </div>
  );
};

export default DataNotFoundPage;
