import React from 'react';

const LeadsTable = ({ leads, onLeadSelect }) => {
  const defaultLeads = [
    { id: 1, name: 'John Smith', email: 'john@email.com', phone: '555-0101', status: 'New', value: '$350,000', lastContact: '2 hours ago' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@email.com', phone: '555-0102', status: 'In Progress', value: '$420,000', lastContact: '1 day ago' },
    { id: 3, name: 'Michael Brown', email: 'michael@email.com', phone: '555-0103', status: 'Qualified', value: '$280,000', lastContact: '3 days ago' },
    { id: 4, name: 'Emily Davis', email: 'emily@email.com', phone: '555-0104', status: 'New', value: '$500,000', lastContact: '4 hours ago' },
    { id: 5, name: 'Robert Wilson', email: 'robert@email.com', phone: '555-0105', status: 'In Progress', value: '$375,000', lastContact: '2 days ago' }
  ];

  const displayLeads = leads || defaultLeads;

  const getStatusClass = (status) => {
    return status.toLowerCase().replace(' ', '-');
  };

  return (
    <div className="leads-table">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Loan Value</th>
            <th>Last Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayLeads.map((lead) => (
            <tr key={lead.id} onClick={() => onLeadSelect && onLeadSelect(lead)}>
              <td>{lead.name}</td>
              <td>{lead.email}</td>
              <td>{lead.phone}</td>
              <td>
                <span className={`status-badge ${getStatusClass(lead.status)}`}>
                  {lead.status}
                </span>
              </td>
              <td>{lead.value}</td>
              <td>{lead.lastContact}</td>
              <td>
                <button className="btn-view">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadsTable;
