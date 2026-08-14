import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import DataTable from '../components/DataTable';
import TeamFormModal from '../components/TeamFormModal';
import { teamService } from '../../services/teamService';
import { teamDepartments } from '../../data/team';

const DEPT_MAP = Object.fromEntries(teamDepartments.map(d => [d.id, d.label]));

export default function AdminTeam() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  const fetchMembers = () => {
    setLoading(true);
    teamService.getTeamMembers()
      .then(data => { setMembers(data); setLoading(false); })
      .catch(e => { console.error(e); setLoading(false); });
  };

  useEffect(() => { fetchMembers(); }, []);

  const handleAdd = () => { setEditingMember(null); setModalOpen(true); };
  const handleEdit = (m) => { setEditingMember(m); setModalOpen(true); };
  const handleDelete = (m) => {
    if (confirm(`Delete ${m.name}?`)) {
      teamService.deleteTeamMember(m.id).then(fetchMembers);
    }
  };
  const handleSave = (formData) => {
    if (editingMember) {
      teamService.updateTeamMember(editingMember.id, formData).then(fetchMembers);
    } else {
      teamService.addTeamMember(formData).then(fetchMembers);
    }
  };

  const columns = [
    {
      key: 'image', label: 'Photo', sortable: false, width: '56px',
      render: (row) => {
        const initials = row.name.split(' ').filter(Boolean).slice(-2).map(n => n[0]).join('').toUpperCase();
        return (
          <div className="w-9 h-9 rounded-full overflow-hidden bg-gradient-to-br from-brandBlue/20 to-brandSky/20 border border-slate-200 flex items-center justify-center shrink-0 relative">
            <span className="text-[10px] font-extrabold text-brandBlue absolute">{initials}</span>
            {row.image && (
              <img
                src={row.image}
                alt={row.name}
                className="w-full h-full object-cover relative z-10"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            )}
          </div>
        );
      }
    },
    { key: 'name', label: 'Name', render: (row) => <span className="font-bold text-slate-800 dark:text-white">{row.name}</span> },
    { key: 'role', label: 'Role' },
    {
      key: 'department', label: 'Department',
      render: (row) => (
        <span className="text-[10px] font-bold bg-brandBlue/5 text-brandBlue px-2 py-1 rounded-md">
          {DEPT_MAP[row.department] || row.department}
        </span>
      )
    },
    { key: 'branch', label: 'Branch', render: (row) => <span className="text-slate-500 dark:text-slate-400 text-xs">{row.branch}</span> },
    { key: 'sort_order', label: 'Order', sortable: true, width: '60px' },
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
          <h1 className="font-headline font-extrabold text-xl text-slate-800 dark:text-white">Team Members</h1>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-medium mt-1">
            Manage all staff across departments — {members.length} members
          </p>
        </div>
        <button onClick={handleAdd} className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-brandBlue to-brandSky text-white rounded-xl font-headline font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all active:scale-95">
          <Plus className="w-3.5 h-3.5" />
          Add Member
        </button>
      </div>

      <DataTable
        columns={columns}
        data={members}
        searchKeys={['name', 'role', 'department', 'branch']}
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

      <TeamFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        member={editingMember}
      />
    </div>
  );
}
