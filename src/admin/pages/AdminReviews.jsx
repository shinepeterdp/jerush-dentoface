import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Star as StarIcon } from 'lucide-react';
import DataTable from '../components/DataTable';
import ReviewFormModal from '../components/ReviewFormModal';
import { reviewService } from '../../services/reviewService';

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const fetchReviews = () => {
    setLoading(true);
    reviewService.getReviews()
      .then((data) => {
        setReviews(data);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSave = (formData) => {
    if (editingItem) {
      reviewService.updateReview(editingItem.id, formData).then(() => {
        fetchReviews();
      });
    } else {
      reviewService.addReview(formData).then(() => {
        fetchReviews();
      });
    }
  };

  const handleDelete = (item) => {
    if (confirm(`Delete review from "${item.name}"?`)) {
      reviewService.deleteReview(item.id).then(() => {
        fetchReviews();
      });
    }
  };

  const columns = [
    {
      key: 'image', label: 'Photo', sortable: false, width: '50px',
      render: (row) => (
        <div className="w-8 h-8 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
          {(row.image || row.video_thumbnail) ? (
            <img src={row.image || row.video_thumbnail} alt={row.name} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-brandBlue to-brandSky flex items-center justify-center text-white text-[9px] font-black">
              {row.name.replace(/^(Shri\.|Mr\.|Mrs\.)\s+/i, '').slice(0, 2).toUpperCase()}
            </div>
          )}
        </div>
      )
    },
    { key: 'name', label: 'Patient', render: (row) => (
      <div className="flex flex-col text-left">
        <span className="font-bold text-slate-800 dark:text-white">{row.name}</span>
        {row.type && row.type !== 'text' && (
          <span className={`text-[8px] font-extrabold uppercase tracking-widest px-1.5 py-0.5 rounded w-max mt-0.5 ${
            row.type === 'video' 
              ? 'bg-red-500/10 text-red-600 border border-red-500/20 dark:bg-red-500/20 dark:text-red-400 dark:border-red-500/30' 
              : 'bg-pink-500/10 text-pink-600 border border-pink-500/20 dark:bg-pink-500/20 dark:text-pink-400 dark:border-pink-500/30'
          }`}>
            {row.type === 'video' ? 'YouTube Video' : 'Instagram Reel'}
          </span>
        )}
      </div>
    ) },
    { key: 'location', label: 'Location' },
    { key: 'treatment', label: 'Treatment', render: (row) => <span className="line-clamp-1 max-w-[150px] text-slate-700 dark:text-slate-300">{row.treatment}</span> },
    {
      key: 'rating', label: 'Rating',
      render: (row) => (
        <div className="flex items-center gap-0.5">
          {[...Array(row.rating || 0)].map((_, i) => <StarIcon key={i} className="w-3 h-3 text-amber-400 fill-current" />)}
        </div>
      )
    },
    { key: 'text', label: 'Review', render: (row) => <span className="line-clamp-1 max-w-[200px] text-slate-500 dark:text-slate-400">{row.text}</span> },
  ];

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-3 border-brandBlue border-t-transparent rounded-full animate-spin"></div></div>;
  }

  return (
    <div className="space-y-6 relative z-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline font-extrabold text-xl text-slate-800 dark:text-white">Reviews</h1>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-medium mt-1">Manage patient testimonials and ratings</p>
        </div>
        <button onClick={() => { setEditingItem(null); setModalOpen(true); }} className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-brandBlue to-brandSky text-white rounded-xl font-headline font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all active:scale-95">
          <Plus className="w-3.5 h-3.5" /> Add Review
        </button>
      </div>

      <DataTable
        columns={columns}
        data={reviews}
        searchKeys={['name', 'location', 'treatment', 'text']}
        actions={(row) => (
          <div className="flex items-center gap-1">
            <button onClick={() => { setEditingItem(row); setModalOpen(true); }} className="p-1.5 rounded-lg text-slate-400 hover:text-brandBlue hover:bg-brandBlue/5 transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
            <button onClick={() => handleDelete(row)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
          </div>
        )}
      />

      <ReviewFormModal open={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSave} review={editingItem} />
    </div>
  );
}
