import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
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
      const data = await leadService.getAllLeads();
      setRows(data);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const handleOpenNew = () => {
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setSaving(true);
    setError('');
    try {
      if (editing) {
        await leadService.updateLead(editing._id, form);
      } else {
        await leadService.createLead(form);
      }
      handleClose();
      loadLeads();
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this lead?')) return;
    try {
      await leadService.deleteLead(id);
      loadLeads();
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  };

  const columns = [
    { field: 'borrowerName', headerName: 'Borrower Name', width: 180 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone', headerName: 'Phone', width: 140 },
    { field: 'loanPurpose', headerName: 'Loan Purpose', width: 150 },
    { field: 'requestedLoanAmount', headerName: 'Loan Amount', width: 150 },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={
            params.value === 'NEW'
              ? 'default'
              : params.value === 'CONTACTED'
              ? 'primary'
              : params.value === 'QUALIFIED'
              ? 'info'
              : params.value === 'APPLICATION_SUBMITTED'
              ? 'warning'
              : 'success'
          }
          size="small"
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <Tooltip title="Edit">
            <IconButton size="small" onClick={() => handleOpenEdit(params.row)}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              size="small"
              color="error"
              onClick={() => handleDelete(params.row._id)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  const filteredRows = useMemo(() => {
    if (!search) return rows;
    return rows.filter(
      (r) =>
        r.borrowerName?.toLowerCase().includes(search.toLowerCase()) ||
        r.email?.toLowerCase().includes(search.toLowerCase()) ||
        r.phone?.toLowerCase().includes(search.toLowerCase()) ||
        r.loanPurpose?.toLowerCase().includes(search.toLowerCase())
    );
  }, [rows, search]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" mb={3}>
        Leads
      </Typography>
      <Stack direction="row" spacing={2} mb={3}>
        <TextField
          placeholder="Search leads..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          InputProps={{
            startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
          }}
          sx={{ width: 300 }}
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenNew}
        >
          Add Lead
        </Button>
      </Stack>
      <DataGrid
        rows={filteredRows}
        columns={columns}
        loading={loading}
        getRowId={(row) => row._id}
        disableRowSelectionOnClick
        autoHeight
        initialState={{
          pagination: { paginationModel: { pageSize: 25 } },
        }}
        pageSizeOptions={[10, 25, 50]}
      />

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h6">
              {editing ? 'Edit Lead' : 'Add New Lead'}
            </Typography>
            <IconButton onClick={handleClose} size="small">
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          <Box sx={{ mt: 1 }}>
            <Stack spacing={1.5}>
              <Grid container spacing={1.5}>
                <Grid item xs={6}>
                  <TextField
                    name="borrowerName"
                    label="Borrower Name"
                    value={form.borrowerName}
                    onChange={handleChange}
                    fullWidth
                    required
                    size="small"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="email"
                    label="Email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    fullWidth
                    required
                    size="small"
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1.5}>
                <Grid item xs={6}>
                  <TextField
                    name="phone"
                    label="Phone"
                    value={form.phone}
                    onChange={handleChange}
                    fullWidth
                    required
                    size="small"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="loanPurpose"
                    label="Loan Purpose"
                    value={form.loanPurpose}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1.5}>
                <Grid item xs={6}>
                  <TextField
                    name="requestedLoanAmount"
                    label="Requested Loan Amount"
                    value={form.requestedLoanAmount}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="propertyType"
                    label="Property Type"
                    value={form.propertyType}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1.5}>
                <Grid item xs={6}>
                  <TextField
                    name="estimatedCreditScore"
                    label="Estimated Credit Score"
                    value={form.estimatedCreditScore}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="estimatedClosingDate"
                    label="Estimated Closing Date"
                    type="date"
                    value={form.estimatedClosingDate}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    size="small"
                  />
                </Grid>
              </Grid>
              <TextField
                name="propertyAddress"
                label="Property Address"
                value={form.propertyAddress}
                onChange={handleChange}
                fullWidth
                size="small"
              />
              <Grid container spacing={1.5}>
                <Grid item xs={6}>
                  <TextField
                    name="preferredContactMethod"
                    label="Preferred Contact Method"
                    value={form.preferredContactMethod}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="referralSource"
                    label="Referral Source"
                    value={form.referralSource}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                  />
                </Grid>
              </Grid>
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
                rows={2}
                size="small"
              />
            </Stack>
          </Box>
        </DialogContent>
        <DialogActions sx={{
          borderTop: 1,
          borderColor: 'divider',
          px: 2,
          py: 1.5
        }}>
          <Button
            onClick={handleClose}
            disabled={saving}
            variant="outlined"
            size="small"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={saving}
            size="small"
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
