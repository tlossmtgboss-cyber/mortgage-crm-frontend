import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import leadService from '../services/leadService';

const defaultForm = {
  borrowerName: '',
  email: '',
  phone: '',
  propertyAddress: '',
  loanPurpose: '',
  requestedLoanAmount: '',
  propertyType: '',
  estimatedCreditScore: '',
  estimatedClosingDate: '',
  preferredContactMethod: '',
  referralSource: '',
  coBorrowerInfo: '',
  notes: '',
  status: 'NEW',
};

export default function LeadList() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null); // row or null
  const [form, setForm] = useState(defaultForm);
  const [saving, setSaving] = useState(false);

  const loadLeads = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await leadService.getLeads();
      setRows(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e?.message || 'Failed to load leads');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) =>
      [
        r.borrowerName,
        r.email,
        r.phone,
        r.propertyAddress,
        r.loanPurpose,
        r.status,
      ]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q))
    );
  }, [rows, search]);

  const handleOpenAdd = () => {
    setEditing(null);
    setForm(defaultForm);
    setOpen(true);
  };

  const handleOpenEdit = (row) => {
    setEditing(row);
    setForm({ ...defaultForm, ...row });
    setOpen(true);
  };

  const handleClose = () => {
    if (!saving) setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this lead?')) return;
    try {
      await leadService.deleteLead(id);
      await loadLeads();
    } catch (e) {
      alert(e?.message || 'Failed to delete lead');
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault?.();
    setSaving(true);
    try {
      if (editing?.id) {
        await leadService.updateLead(editing.id, form);
      } else {
        await leadService.createLead(form);
      }
      setOpen(false);
      await loadLeads();
    } catch (e2) {
      alert(e2?.message || 'Failed to save lead');
    } finally {
      setSaving(false);
    }
  };

  const columns = [
    { field: 'borrowerName', headerName: 'Borrower', flex: 1, minWidth: 160 },
    { field: 'email', headerName: 'Email', flex: 1, minWidth: 160 },
    { field: 'phone', headerName: 'Phone', flex: 1, minWidth: 140 },
    { field: 'loanPurpose', headerName: 'Purpose', flex: 1, minWidth: 140 },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => (
        <Chip
          size="small"
          label={params.value || 'NEW'}
          color={
            params.value === 'CLOSED'
              ? 'success'
              : params.value === 'LOST'
              ? 'error'
              : 'default'
          }
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      filterable: false,
      width: 120,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Edit">
            <IconButton size="small" onClick={() => handleOpenEdit(params.row)}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton size="small" color="error" onClick={() => handleDelete(params.row.id)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  return (
    <Box p={2}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ xs: 'stretch', sm: 'center' }} justifyContent="space-between" mb={2}>
        <Typography variant="h5">Leads</Typography>
        <Stack direction="row" spacing={1} alignItems="center" flex={1}>
          <SearchIcon color="action" />
          <TextField
            placeholder="Search leads"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            fullWidth
          />
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenAdd}>
            Add Lead
          </Button>
        </Stack>
      </Stack>

      <div style={{ height: 520, width: '100%' }}>
        <DataGrid
          rows={filtered}
          columns={columns}
          loading={loading}
          disableRowSelectionOnClick
          pageSizeOptions={[10, 25, 50]}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          getRowId={(row) => row.id || row._id || row.email + row.phone}
        />
      </div>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>
          {editing ? 'Edit Lead' : 'Add Lead'}
          <IconButton onClick={handleClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField name="borrowerName" label="Borrower Name" value={form.borrowerName} onChange={handleChange} fullWidth required />
              <TextField name="status" label="Status" value={form.status} onChange={handleChange} fullWidth />
            </Stack>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mt={2}>
              <TextField name="email" label="Email" value={form.email} onChange={handleChange} fullWidth />
              <TextField name="phone" label="Phone" value={form.phone} onChange={handleChange} fullWidth />
            </Stack>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mt={2}>
              <TextField name="propertyAddress" label="Property Address" value={form.propertyAddress} onChange={handleChange} fullWidth />
              <TextField name="loanPurpose" label="Loan Purpose" value={form.loanPurpose} onChange={handleChange} fullWidth />
            </Stack>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mt={2}>
              <TextField name="requestedLoanAmount" label="Requested Loan Amount" value={form.requestedLoanAmount} onChange={handleChange} fullWidth />
              <TextField name="propertyType" label="Property Type" value={form.propertyType} onChange={handleChange} fullWidth />
            </Stack>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mt={2}>
              <TextField name="estimatedCreditScore" label="Est. Credit Score" value={form.estimatedCreditScore} onChange={handleChange} fullWidth />
              <TextField name="estimatedClosingDate" label="Est. Closing Date" value={form.estimatedClosingDate} onChange={handleChange} fullWidth />
            </Stack>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mt={2}>
              <TextField name="preferredContactMethod" label="Preferred Contact" value={form.preferredContactMethod} onChange={handleChange} fullWidth />
              <TextField name="referralSource" label="Referral Source" value={form.referralSource} onChange={handleChange} fullWidth />
            </Stack>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mt={2}>
              <TextField name="coBorrowerInfo" label="Co-borrower Info" value={form.coBorrowerInfo} onChange={handleChange} fullWidth />
              <TextField name="notes" label="Notes" value={form.notes} onChange={handleChange} fullWidth multiline rows={2} />
            </Stack>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={saving}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" disabled={saving}>
            {saving ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      {error && (
        <Typography color="error" mt={1}>
          {error}
        </Typography>
      )}
    </Box>
  );
}
