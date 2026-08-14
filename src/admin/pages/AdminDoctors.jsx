import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import DataTable from '../components/DataTable';
import DoctorFormModal from '../components/DoctorFormModal';
import { doctorService } from '../../services/doctorService';

export default function AdminDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);

  const fetchDoctors = () => {
    setLoading(true);
    doctorService.getDoctors()
      .then((data) => {
        setDoctors(data);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleAdd = () => {
    setEditingDoctor(null);
    setModalOpen(true);
  };

  const handleEdit = (doc) => {
    setEditingDoctor(doc);
    setModalOpen(true);
  };

  const handleDelete = (doc) => {
    if (confirm(`Delete ${doc.name}?`)) {
      doctorService.deleteDoctor(doc.id).then(() => {
        fetchDoctors();
      });
    }
  };

  const handleSave = (formData) => {
    if (editingDoctor) {
      doctorService.updateDoctor(editingDoctor.id, formData).then(() => {
        fetchDoctors();
      });
    } else {
      doctorService.addDoctor(formData).then(() => {
        fetchDoctors();
      });
    }
  };

  const columns = [
    {
      key: 'image', label: 'Photo', sortable: false, width: '60px',
      render: (row) => (
        <div className="w-9 h-9 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
          <img
            src={row.image || row.fallbackImg}
            alt={row.name}
            className="w-full h-full object-cover"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </div>
      )
    },
    { key: 'name', label: 'Name', render: (row) => <span className="font-bold text-slate-800 dark:text-white">{row.name}</span> },
    { key: 'role', label: 'Role' },
    { key: 'experience', label: 'Experience' },
    {
      key: 'specialties', label: 'Specialties', sortable: false,
      render: (row) => (
        <div className="flex flex-wrap gap-1">
          {(row.specialties || []).slice(0, 2).map((s) => (
            <span key={s} className="text-[9px] font-bold bg-brandBlue/5 text-brandBlue px-2 py-0.5 rounded-md">{s}</span>
          ))}
          {(row.specialties || []).length > 2 && (
            <span className="text-[9px] font-bold text-slate-400">+{row.specialties.length - 2}</span>
          )}
        </div>
      )
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-3 border-brandBlue border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 relative z-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline font-extrabold text-xl text-slate-800 dark:text-white">Doctors</h1>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-medium mt-1">Manage your medical team profiles</p>
        </div>
        <button onClick={handleAdd} className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-brandBlue to-brandSky text-white rounded-xl font-headline font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all active:scale-95">
          <Plus className="w-3.5 h-3.5" />
          Add Doctor
        </button>
      </div>

      <DataTable
        columns={columns}
        data={doctors}
        searchKeys={['name', 'role', 'specialties']}
        actions={(row) => (
          <div className="flex items-center gap-1">
            <button onClick={() => handleEdit(row)} className="p-1.5 rounded-lg text-slate-400 hover:text-brandBlue hover:bg-brandBlue/5 transition-colors">
              <Pencil className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => handleDelete(row)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      />

      <DoctorFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        doctor={editingDoctor}
      />
    </div>
  );
}
