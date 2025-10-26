import React, { useState, useEffect } from 'react';
import './Scorecard.css';

const Scorecard = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timePeriod, setTimePeriod] = useState('month');

  useEffect(() => {
    fetchMetrics();
  }, [timePeriod]);

  const fetchMetrics = async () => {
    try {
      const response = await fetch(`/api/scorecard?period=${timePeriod}`);
      if (response.ok) {
        const data = await response.json();
        setMetrics(data);
      }
    } catch (err) {
      console.error('Failed to load metrics:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading scorecard...</div>;

  const defaultMetrics = metrics || {
    leads_generated: 0,
    conversion_rate: 0,
    active_pipeline: 0,
    loans_closed: 0,
    total_volume: 0,
    avg_loan_size: 0,
    revenue: 0,
    client_satisfaction: 0
  };

  const metricCards = [
    {
      title: 'Leads Generated',
      value: defaultMetrics.leads_generated,
      change: '+12%',
      positive: true,
      icon: '🎯'
    },
    {
      title: 'Conversion Rate',
      value: `${defaultMetrics.conversion_rate}%`,
      change: '+5%',
      positive: true,
      icon: '📈'
    },
    {
      title: 'Active Pipeline',
      value: defaultMetrics.active_pipeline,
      change: '+8',
      positive: true,
      icon: '💼'
    },
    {
      title: 'Loans Closed',
      value: defaultMetrics.loans_closed,
      change: '+3',
      positive: true,
      icon: '✅'
    },
    {
      title: 'Total Volume',
      value: `$${(defaultMetrics.total_volume / 1000000).toFixed(1)}M`,
      change: '+18%',
      positive: true,
      icon: '💰'
    },
    {
      title: 'Avg Loan Size',
      value: `$${(defaultMetrics.avg_loan_size / 1000).toFixed(0)}K`,
      change: '+2%',
      positive: true,
      icon: '📄'
    },
    {
      title: 'Revenue',
      value: `$${(defaultMetrics.revenue / 1000).toFixed(1)}K`,
      change: '+22%',
      positive: true,
      icon: '💵'
    },
    {
      title: 'Client Satisfaction',
      value: `${defaultMetrics.client_satisfaction}%`,
      change: '+3%',
      positive: true,
      icon: '⭐'
    }
  ];

  return (
    <div className="scorecard-container">
      <div className="page-header">
        <div>
          <h1>📈 Scorecard</h1>
          <p>Business metrics and performance analytics</p>
        </div>
        <div className="period-selector">
          <button 
            className={timePeriod === 'week' ? 'active' : ''}
            onClick={() => setTimePeriod('week')}
          >
            Week
          </button>
          <button 
            className={timePeriod === 'month' ? 'active' : ''}
            onClick={() => setTimePeriod('month')}
          >
            Month
          </button>
          <button 
            className={timePeriod === 'quarter' ? 'active' : ''}
            onClick={() => setTimePeriod('quarter')}
          >
            Quarter
          </button>
          <button 
            className={timePeriod === 'year' ? 'active' : ''}
            onClick={() => setTimePeriod('year')}
          >
            Year
          </button>
        </div>
      </div>

      <div className="metrics-grid">
        {metricCards.map((metric, index) => (
          <div key={index} className="metric-card">
            <div className="metric-icon">{metric.icon}</div>
            <div className="metric-content">
              <h3>{metric.title}</h3>
              <div className="metric-value">{metric.value}</div>
              <div className={`metric-change ${metric.positive ? 'positive' : 'negative'}`}>
                {metric.positive ? '↑' : '↓'} {metric.change} from last period
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Scorecard;
