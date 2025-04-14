// challenge/frontend/src/pages/Dashboard.tsx

import React, { useEffect, useState } from 'react';
import styles from './Dashboard.module.css';
import {
  getOpenCases,
  getClosedCases,
  getTopComplaintTypes,
  getResidentComplaints,
} from '../services/complaintService';

interface Complaint {
  id: number;
  complaint_type: string;
  descriptor: string;
  status: string;
}

interface TopComplaintType {
  complaint_type: string;
  count: number;
}

const Dashboard = () => {
  const [view, setView] = useState<'open' | 'closed' | 'top' | 'resident'>('open');
  const [openCases, setOpenCases] = useState<Complaint[]>([]);
  const [closedCases, setClosedCases] = useState<Complaint[]>([]);
  const [topComplaintTypes, setTopComplaintTypes] = useState<TopComplaintType[]>([]);
  const [residentComplaints, setResidentComplaints] = useState<Complaint[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState('D01');

  const isAdmin = localStorage.getItem('email') === 'admin@council.gov';

  useEffect(() => {
    if (view === 'open') {
      getOpenCases(isAdmin ? selectedDistrict : undefined).then(setOpenCases).catch(console.error);
    } else if (view === 'closed') {
      getClosedCases(isAdmin ? selectedDistrict : undefined).then(setClosedCases).catch(console.error);
    } else if (view === 'top') {
      getTopComplaintTypes(isAdmin ? selectedDistrict : undefined).then(setTopComplaintTypes).catch(console.error);
    } else if (view === 'resident') {
      getResidentComplaints(isAdmin ? selectedDistrict : undefined).then(setResidentComplaints).catch(console.error);
    }
  }, [view, selectedDistrict]);

  return (
    <>
      <div className={styles.dashboardContainer}>
        <header className={styles.header}>
          <img src="/nyc-council-logo.png" alt="NYC Council Logo" className={styles.logo} />
          <h1 className={styles.siteTitle}>NYC Council Complaint Dashboard</h1>
        </header>

        {isAdmin && (
          <div style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="district-select"><strong>Select District:</strong></label>
            <select
              id="district-select"
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              style={{ marginLeft: '0.75rem', padding: '0.4rem', fontSize: '1rem' }}
            >
              {Array.from({ length: 51 }, (_, i) => {
                const num = (i + 1).toString().padStart(2, '0');
                return <option key={num} value={`D${num}`}>{`District ${num}`}</option>;
              })}
            </select>
          </div>
        )}

        <div className={styles.buttonGroup}>
          <button onClick={() => setView('open')} className={`${styles.tabButton} ${view === 'open' ? styles.activeButton : ''}`}>Open Cases</button>
          <button onClick={() => setView('closed')} className={`${styles.tabButton} ${view === 'closed' ? styles.activeButton : ''}`}>Closed Cases</button>
          <button onClick={() => setView('top')} className={`${styles.tabButton} ${view === 'top' ? styles.activeButton : ''}`}>Top Complaint Types</button>
          <button onClick={() => setView('resident')} className={`${styles.tabButton} ${view === 'resident' ? styles.activeButton : ''}`}>Complaints by My Constituents</button>
        </div>

        {view === 'open' && (
          <ul className={styles.complaintList}>
            {openCases.map((c) => (
              <li key={c.id} className={styles.complaintItem}>
                <strong>{c.complaint_type}</strong>: {c.descriptor}
                <span className={styles.statusOpen}>({c.status})</span>
              </li>
            ))}
          </ul>
        )}

        {view === 'closed' && (
          <ul className={styles.complaintList}>
            {closedCases.map((c) => (
              <li key={c.id} className={styles.complaintItem}>
                <strong>{c.complaint_type}</strong>: {c.descriptor}
                <span className={styles.statusClosed}>({c.status})</span>
              </li>
            ))}
          </ul>
        )}

        {view === 'top' && (
          <ul className={styles.complaintList}>
            {topComplaintTypes.map((t) => (
              <li key={t.complaint_type} className={styles.complaintItem}>
                <strong>{t.complaint_type}</strong>: ({t.count})
              </li>
            ))}
          </ul>
        )}

        {view === 'resident' && (
          <ul className={styles.complaintList}>
            {residentComplaints.map((c) => (
              <li key={c.id} className={styles.complaintItem}>
                <strong>{c.complaint_type}</strong>: {c.descriptor}
                <span className={c.status === 'Open' ? styles.statusOpen : styles.statusClosed}>
                  ({c.status})
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <footer className={styles.footer}>
        This project is a demo and is not affiliated with or intended for official NYC Council use.
      </footer>
    </>
  );
};

export default Dashboard;
