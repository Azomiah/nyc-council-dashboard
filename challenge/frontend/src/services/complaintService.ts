// challenge/frontend/src/services/complaintService.ts

const BASE_URL = 'http://localhost:8000/api';

function buildUrl(endpoint: string, district?: string) {
  return district ? `${BASE_URL}${endpoint}?district=${district}` : `${BASE_URL}${endpoint}`;
}

export async function getOpenCases(district?: string) {
  const token = localStorage.getItem('token');
  const response = await fetch(buildUrl('/open-cases/', district), {
    headers: { Authorization: `Token ${token}` },
  });
  if (!response.ok) throw new Error('Failed to fetch open cases');
  return response.json();
}

export async function getClosedCases(district?: string) {
  const token = localStorage.getItem('token');
  const response = await fetch(buildUrl('/closed-cases/', district), {
    headers: { Authorization: `Token ${token}` },
  });
  if (!response.ok) throw new Error('Failed to fetch closed cases');
  return response.json();
}

export async function getTopComplaintTypes(district?: string) {
  const token = localStorage.getItem('token');
  const response = await fetch(buildUrl('/top-complaint-types/', district), {
    headers: { Authorization: `Token ${token}` },
  });
  if (!response.ok) throw new Error('Failed to fetch top complaint types');
  return response.json();
}

export async function getResidentComplaints(district?: string) {
  const token = localStorage.getItem('token');
  const response = await fetch(buildUrl('/resident-complaints/', district), {
    headers: { Authorization: `Token ${token}` },
  });
  if (!response.ok) throw new Error('Failed to fetch resident complaints');
  return response.json();
}
