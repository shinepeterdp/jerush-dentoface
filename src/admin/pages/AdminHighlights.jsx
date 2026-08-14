import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Calendar, Tag } from 'lucide-react';
import DataTable from '../components/DataTable';
import HighlightFormModal from '../components/HighlightFormModal';
import { highlightService } from '../../services/highlightService';

export default function AdminHighlights() {
  const [highlights, setHighlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const fetchHighlights = () => {
    setLoading(true);
    highlightService.getHighlights()
      .then((data) => {
        setHighlights(data);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchHighlights();
  }, []);

  const handleSave = (formData) => {
    if (editingItem) {
      highlightService.updateHighlight(editingItem.id, formData).then(() => {
        fetchHighlights();
      });
    } else {
      highlightService.addHighlight(formData).then(() => {
        fetchHighlights();
      });
    }
  };

  const handleDelete = (item) => {
    if (confirm(`Delete highlight event "${item.title}"?`)) {
      highlightService.deleteHighlight(item.id).then(() => {
        fetchHighlights();
      });
    }
  };

  const columns = [
    {
      key: 'image', label: 'Photo', sortable: false, width: '60px',
      render: (row) => (
        <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
          {row.image ? (
            <img src={row.image} alt={row.title} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-brandBlue to-brandSky flex items-center justify-center text-white text-[9px] font-black">
              HL
            </div>
          )}
        </div>
      )
    },
    { key: 'title', label: 'Title', render: (row) => (
      <div className="flex flex-col text-left max-w-[200px]">
        <span className="font-bold text-slate-800 dark:text-white line-clamp-1">{row.title}</span>
      </div>
    ) },
    { key: 'category', label: 'Category', render: (row) => (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-brandBlue/10 text-brandBlue dark:bg-brandBlue/20 dark:text-brandSky uppercase tracking-wider">
        {row.category || 'General'}
      </span>
    ) },
    { key: 'date', label: 'Date', render: (row) => (
      <span className="text-slate-500 dark:text-slate-400 text-xs font-medium">{row.date}</span>
    ) },
    { key: 'status', label: 'Status', render: (row) => (
      <span className={`text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded ${
        row.status === 'published' 
          ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30' 
          : 'bg-slate-405/10 text-slate-500 border border-slate-350 dark:bg-slate-800 dark:text-slate-400'
      }`}>
        {row.status || 'published'}
      </span>
    ) },
    { key: 'description', label: 'Description', render: (row) => <span className="line-clamp-1 max-w-[250px] text-slate-500 dark:text-slate-450">{row.description}</span> },
  ];

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-3 border-brandBlue border-t-transparent rounded-full animate-spin"></div></div>;
  }

  return (
    <div className="space-y-6 relative z-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline font-extrabold text-xl text-slate-800 dark:text-white">Spotlight Events</h1>
          <p className="text-xs text-slate-400 dark:text-slate-505 font-medium mt-1">Manage homepage highlights, news announcements, and clinic milestones</p>
        </div>
        <button onClick={() => { setEditingItem(null); setModalOpen(true); }} className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-brandBlue to-brandSky text-white rounded-xl font-headline font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all active:scale-95">
          <Plus className="w-3.5 h-3.5" /> Add Highlight
        </button>
      </div>

      <DataTable
        columns={columns}
        data={highlights}
        searchKeys={['title', 'category', 'date', 'description']}
        actions={(row) => (
          <div className="flex items-center gap-1">
            <button onClick={() => { setEditingItem(row); setModalOpen(true); }} className="p-1.5 rounded-lg text-slate-400 hover:text-brandBlue hover:bg-brandBlue/5 transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
            <button onClick={() => handleDelete(row)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
          </div>
        )}
      />

      <HighlightFormModal open={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSave} highlight={editingItem} />
    </div>
  );
}
