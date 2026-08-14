import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Calendar, Clock, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';
import DataTable from '../components/DataTable';
import { galleryService } from '../../services/galleryService';
import { upcomingEvents as defaultEvents } from '../../data/upcomingEvents';
import EventJournalFormModal from '../components/EventJournalFormModal';

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  // Load events
  const loadEvents = () => {
    setLoading(true);
    galleryService.getEvents()
      .then((adminList) => {
        const validAdminEvents = (adminList || []).filter(evt => {
          const titleLower = (evt.title || '').toLowerCase();
          return !titleLower.includes('2k25') && !titleLower.includes('2025');
        });

        const merged = [...defaultEvents];
        validAdminEvents.forEach((adm) => {
          const existsIdx = merged.findIndex(m => m.id === adm.id || m.title.toLowerCase() === (adm.title || '').toLowerCase());
          if (existsIdx >= 0) {
            merged[existsIdx] = { ...merged[existsIdx], ...adm };
          } else {
            merged.push(adm);
          }
        });
        setEvents(merged);
        setLoading(false);
      })
      .catch((err) => {
        console.warn("Failed to fetch admin events:", err);
        setEvents(defaultEvents);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleOpenAdd = () => {
    setEditingEvent(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (evt) => {
    setEditingEvent(evt);
    setIsModalOpen(true);
  };

  const handleDelete = (evt) => {
    if (confirm(`Are you sure you want to delete the celebration event "${evt.title}"?`)) {
      setEvents((prev) => prev.filter((item) => item.id !== evt.id));
      if (evt.galleryEventId) {
        galleryService.deleteEvent(evt.galleryEventId).catch(() => { });
      }
    }
  };

  const handleSaveEvent = (savedData) => {
    if (editingEvent) {
      setEvents((prev) =>
        prev.map((item) => (item.id === savedData.id ? { ...item, ...savedData } : item))
      );
    } else {
      const newId = savedData.id || `event-${Date.now()}`;
      setEvents((prev) => [{ ...savedData, id: newId }, ...prev]);
    }
    galleryService.addEvent(savedData).catch(() => { });
  };

  const columns = [
    {
      key: 'coverImage',
      label: 'Photo',
      sortable: false,
      width: '70px',
      render: (row) => (
        <div className="w-12 h-10 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shrink-0 shadow-sm">
          <img
            src={row.coverImage}
            alt={row.title}
            className="w-full h-full object-cover"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </div>
      )
    },
    {
      key: 'title',
      label: 'Event Title & Category',
      render: (row) => (
        <div>
          <span className="font-bold text-slate-800 dark:text-white block text-xs sm:text-sm">
            {row.title}
          </span>
          <span className="text-[11px] text-slate-400 dark:text-slate-500 font-semibold block mt-0.5">
            {row.category} • {row.organizer}
          </span>
        </div>
      )
    },
    {
      key: 'date',
      label: 'Date & Venue',
      render: (row) => (
        <div>
          <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200 text-xs">
            <Calendar className="w-3.5 h-3.5 text-brandBlue dark:text-brandSky shrink-0" />
            <span>{row.date}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 truncate max-w-[220px]">
            <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>{row.location}</span>
          </div>
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => row.status === 'completed' ? (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-headline font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
          <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Completed
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-headline font-bold uppercase tracking-wider bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20">
          <Clock className="w-3 h-3 text-amber-500" /> Upcoming
        </span>
      )
    },
    {
      key: 'badge',
      label: 'Badge',
      render: (row) => (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-headline font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <Sparkles className="w-3 h-3 text-brandSky" />
          {row.badge || 'Celebration'}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-6 text-left font-body">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline font-extrabold text-xl text-slate-800 dark:text-white tracking-tight">
            Upcoming Events &amp; Celebrations
          </h1>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-medium mt-1">
            Manage homepage Celebrations Journal, upcoming countdowns and completed milestone albums
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-brandBlue to-brandSky text-white font-headline font-bold text-xs rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer shrink-0 uppercase tracking-wider"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Event</span>
        </button>
      </div>

      {/* Shared Admin DataTable */}
      <DataTable
        columns={columns}
        data={events}
        searchKeys={['title', 'category', 'date', 'location', 'badge']}
        pageSize={10}
        emptyMessage="No celebration events found. Click 'Add New Event' to create one."
        actions={(row) => (
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => handleOpenEdit(row)}
              className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-brandBlue/10 text-slate-600 dark:text-slate-400 hover:text-brandBlue dark:hover:text-brandSky flex items-center justify-center transition-colors cursor-pointer"
              title="Edit Event"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleDelete(row)}
              className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-500/10 text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 flex items-center justify-center transition-colors cursor-pointer"
              title="Delete Event"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      />

      {/* Form Modal */}
      <EventJournalFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEvent}
        eventData={editingEvent}
      />
    </div>
  );
}
