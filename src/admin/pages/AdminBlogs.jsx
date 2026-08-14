import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Pencil, Trash2, Eye } from 'lucide-react';
import DataTable from '../components/DataTable';
import { blogService } from '../../services/blogService';

export default function AdminBlogs() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = () => {
    setLoading(true);
    blogService.getBlogs()
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = (blog) => {
    if (confirm(`Delete "${blog.title}"?`)) {
      blogService.deleteBlog(blog.slug).then(() => {
        fetchBlogs();
      });
    }
  };

  const handleToggleStatus = (blog) => {
    const updatedStatus = blog.status === 'published' ? 'draft' : 'published';
    blogService.updateBlog(blog.slug, { ...blog, status: updatedStatus }).then(() => {
      fetchBlogs();
    });
  };

  const columns = [
    {
      key: 'featuredImage', label: 'Image', sortable: false, width: '70px',
      render: (row) => (
        <div className="w-14 h-10 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
          <img src={row.featuredImage} alt={row.title} className="w-full h-full object-cover" loading="lazy" />
        </div>
      )
    },
    { key: 'title', label: 'Title', render: (row) => <span className="font-bold text-slate-800 dark:text-white line-clamp-1 max-w-[250px]">{row.title}</span> },
    {
      key: 'category', label: 'Category',
      render: (row) => (
        <span className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-brandBlue/5 dark:bg-brandBlue/10 text-brandBlue dark:text-brandSky border border-brandBlue/10 dark:border-brandBlue/20">
          {row.category}
        </span>
      )
    },
    { key: 'author', label: 'Author', render: (row) => <span className="text-slate-600 dark:text-slate-350">{row.author?.name || '—'}</span> },
    { key: 'publishedDate', label: 'Date' },
    {
      key: 'status', label: 'Status',
      render: (row) => (
        <button
          onClick={() => handleToggleStatus(row)}
          className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border cursor-pointer transition-all ${
            row.status === 'published'
              ? 'bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/30'
              : 'bg-amber-50 text-amber-600 border-amber-200 hover:bg-amber-100 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/30'
          }`}
        >
          {row.status}
        </button>
      )
    },
  ];

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-3 border-brandBlue border-t-transparent rounded-full animate-spin"></div></div>;
  }

  return (
    <div className="space-y-6 relative z-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline font-extrabold text-xl text-slate-800 dark:text-white">Blog</h1>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-medium mt-1">Manage articles, insights, and clinical publications</p>
        </div>
        <button onClick={() => navigate('/admin/blog/new')} className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-brandBlue to-brandSky text-white rounded-xl font-headline font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all active:scale-95">
          <Plus className="w-3.5 h-3.5" /> New Blog Post
        </button>
      </div>

      <DataTable
        columns={columns}
        data={blogs}
        searchKeys={['title', 'category', 'excerpt']}
        actions={(row) => (
          <div className="flex items-center gap-1">
            <button onClick={() => window.open(`/blog/${row.slug}`, '_blank')} className="p-1.5 rounded-lg text-slate-400 hover:text-brandSky hover:bg-brandSky/5 transition-colors" title="Preview"><Eye className="w-3.5 h-3.5" /></button>
            <button onClick={() => navigate(`/admin/blog/new?edit=${row.slug}`)} className="p-1.5 rounded-lg text-slate-400 hover:text-brandBlue hover:bg-brandBlue/5 transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
            <button onClick={() => handleDelete(row)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
          </div>
        )}
      />
    </div>
  );
}
