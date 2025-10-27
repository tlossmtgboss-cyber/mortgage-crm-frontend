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
      setRows(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleOpenAdd = () => {
    setForm(defaultForm);
    setEditing(null);
    setOpen(true);
  };

  const handleOpenEdit = (row) => {
    setForm(row);
    setEditing(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setForm(defaultForm);
    setEditing(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      if (editing) {
        await leadService.updateLead(editing.id, form);
      } else {
        await leadService.createLead(form);
      }
      await loadLeads();
      handleClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this lead?')) return;
    setError('');
    try {
      await leadService.deleteLead(id);
      await loadLeads();
    } catch (err) {
      setError(err.message);
    }
  };

  const filteredRows = useMemo(() => {
    if (!search.trim()) return rows;
    const searchLower = search.toLowerCase();
    return rows.filter((row) =>
      Object.values(row).some((val) =>
        String(val).toLowerCase().includes(searchLower)
      )
    );
  }, [rows, search]);

  const columns = [
    { field: 'borrowerName', headerName: 'Borrower Name', width: 180 },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Chip label={params.value} size="small" color={params.value === 'NEW' ? 'primary' : 'default'} />
      ),
    },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone', headerName: 'Phone', width: 140 },
    { field: 'loanPurpose', headerName: 'Loan Purpose', width: 140 },
    { field: 'requestedLoanAmount', headerName: 'Loan Amount', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => (
        <Stack direction="row" spacing={0.5}>
          <Tooltip title="Edit">
            <IconButton size="small" color="primary" onClick={() => handleOpenEdit(params.row)}>
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
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Lead Management
      </Typography>
      <Stack direction="row" spacing={2} mb={2}>
        <TextField
          placeholder="Search leads..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'action.active' }} />,
          }}
          sx={{ flexGrow: 1, maxWidth: 400 }}
        />
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenAdd}>
          Add New Lead
        </Button>
      </Stack>
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          loading={loading}
          pageSizeOptions={[10, 25, 50]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
        />
      </div>

      {/* Enhanced Modal Dialog for Lead Form */}
      <Dialog 
        open={open} 
        onClose={handleClose} 
        maxWidth="md" 
        fullWidth
        scroll="paper"
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: 24,
          }
        }}
      >
        <DialogTitle sx={{ 
          borderBottom: 1, 
          borderColor: 'divider',
          pb: 2,
          pr: 6
        }}>
          {editing ? 'Edit Lead' : 'Add New Lead'}
          <IconButton 
            onClick={handleClose} 
            sx={{ 
              position: 'absolute', 
              right: 8, 
              top: 8,
              color: 'grey.500',
              '&:hover': {
                color: 'grey.700',
                backgroundColor: 'grey.100',
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 3, pb: 2 }}>
          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2.5}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField 
                  name="borrowerName" 
                  label="Borrower Name" 
                  value={form.borrowerName} 
                  onChange={handleChange} 
                  fullWidth 
                  required
                  size="small"
                />
                <TextField 
                  name="status" 
                  label="Status" 
                  value={form.status} 
                  onChange={handleChange} 
                  fullWidth
                  size="small"
                />
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField 
                  name="email" 
                  label="Email" 
                  type="email"
                  value={form.email} 
                  onChange={handleChange} 
                  fullWidth
                  size="small"
                />
                <TextField 
                  name="phone" 
                  label="Phone" 
                  value={form.phone} 
                  onChange={handleChange} 
                  fullWidth
                  size="small"
                />
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField 
                  name="propertyAddress" 
                  label="Property Address" 
                  value={form.propertyAddress} 
                  onChange={handleChange} 
                  fullWidth
                  size="small"
                />
                <TextField 
                  name="loanPurpose" 
                  label="Loan Purpose" 
                  value={form.loanPurpose} 
                  onChange={handleChange} 
                  fullWidth
                  size="small"
                />
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField 
                  name="requestedLoanAmount" 
                  label="Requested Loan Amount" 
                  value={form.requestedLoanAmount} 
                  onChange={handleChange} 
                  fullWidth
                  size="small"
                />
                <TextField 
                  name="propertyType" 
                  label="Property Type" 
                  value={form.propertyType} 
                  onChange={handleChange} 
                  fullWidth
                  size="small"
                />
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField 
                  name="estimatedCreditScore" 
                  label="Est. Credit Score" 
                  value={form.estimatedCreditScore} 
                  onChange={handleChange} 
                  fullWidth
                  size="small"
                />
                <TextField 
                  name="estimatedClosingDate" 
                  label="Est. Closing Date" 
                  type="date"
                  value={form.estimatedClosingDate} 
                  onChange={handleChange} 
                  fullWidth
                  size="small"
                  InputLabelProps={{ shrink: true }}
                />
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField 
                  name="preferredContactMethod" 
                  label="Preferred Contact" 
                  value={form.preferredContactMethod} 
                  onChange={handleChange} 
                  fullWidth
                  size="small"
                />
                <TextField 
                  name="referralSource" 
                  label="Referral Source" 
                  value={form.referralSource} 
                  onChange={handleChange} 
                  fullWidth
                  size="small"
                />
              </Stack>
              <TextField 
                name="coBorrowerInfo" 
                label="Co-borrower Info" 
                value={form.coBorrowerInfo} 
                onChange={handleChange} 
                fullWidth
                size="small"
              />
              <TextField 
                name="notes" 
                label="Notes" 
                value={form.notes} 
                onChange={handleChange} 
                fullWidth 
                multiline 
                rows={3}
                size="small"
              />
            </Stack>
          </Box>
        </DialogContent>
        <DialogActions sx={{ 
          borderTop: 1, 
          borderColor: 'divider',
          px: 3,
          py: 2
        }}>
          <Button 
            onClick={handleClose} 
            disabled={saving}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained" 
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Lead'}
          </Button>
        </DialogActions>
      </Dialog>

      {error && (
        <Typography color="error" mt={2}>
          {error}
        </Typography>
      )}
    </Box>
  );
}
