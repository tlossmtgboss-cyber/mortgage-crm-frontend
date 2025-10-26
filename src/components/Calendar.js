import React, { useState, useEffect } from 'react';
import './Calendar.css';

const Calendar = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch('/api/calendar');
      if (response.ok) {
        const data = await response.json();
        setAppointments(data);
      }
    } catch (err) {
      console.error('Failed to load appointments:', err);
    } finally {
      setLoading(false);
    }
  };

  const getDayAppointments = () => {
    const dateStr = selectedDate.toDateString();
    return appointments.filter(apt => 
      new Date(apt.date).toDateString() === dateStr
    );
  };

  const getAppointmentTypeColor = (type) => {
    const colors = {
      'Consultation': '#3b82f6',
      'Closing': '#10b981',
      'Follow-up': '#f59e0b',
      'Meeting': '#8b5cf6'
    };
    return colors[type] || '#6b7280';
  };

  if (loading) return <div className="loading">Loading calendar...</div>;

  return (
    <div className="calendar-container">
      <div className="page-header">
        <div>
          <h1>📅 Calendar</h1>
          <p>Scheduling and appointment management</p>
        </div>
        <button className="btn-new-appointment">+ New Appointment</button>
      </div>

      <div className="calendar-layout">
        <div className="calendar-view">
          <div className="calendar-header">
            <button onClick={() => {
              const newDate = new Date(selectedDate);
              newDate.setMonth(newDate.getMonth() - 1);
              setSelectedDate(newDate);
            }}>←</button>
            <h2>
              {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
            <button onClick={() => {
              const newDate = new Date(selectedDate);
              newDate.setMonth(newDate.getMonth() + 1);
              setSelectedDate(newDate);
            }}>→</button>
          </div>
          <div className="calendar-grid">
            <div className="day-header">Sun</div>
            <div className="day-header">Mon</div>
            <div className="day-header">Tue</div>
            <div className="day-header">Wed</div>
            <div className="day-header">Thu</div>
            <div className="day-header">Fri</div>
            <div className="day-header">Sat</div>
            {/* Calendar days would be rendered here */}
          </div>
        </div>

        <div className="appointments-list">
          <h3>Appointments for {selectedDate.toLocaleDateString()}</h3>
          {getDayAppointments().length === 0 ? (
            <div className="empty-state">
              <p>No appointments scheduled</p>
            </div>
          ) : (
            getDayAppointments().map((apt) => (
              <div key={apt.id} className="appointment-card">
                <div 
                  className="appointment-indicator"
                  style={{ backgroundColor: getAppointmentTypeColor(apt.type) }}
                ></div>
                <div className="appointment-content">
                  <div className="appointment-header">
                    <h4>{apt.title}</h4>
                    <span className="appointment-time">{apt.time}</span>
                  </div>
                  <p className="appointment-type">{apt.type}</p>
                  {apt.client_name && (
                    <p className="appointment-client">Client: {apt.client_name}</p>
                  )}
                  {apt.location && (
                    <p className="appointment-location">📍 {apt.location}</p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
