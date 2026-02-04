import api from './client';

export async function listItems(parentId = null) {
  const params = {};
  if (parentId) params.parentId = parentId;
  const res = await api.get('/drive', { params });
  return res.data;
}

export async function uploadFile({ file, parentId = null }) {
  const formData = new FormData();
  formData.append('file', file);
  if (parentId) formData.append('parentId', parentId);
  const res = await api.post('/drive/files', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return res.data;
}

export async function createFolder({ name, parentId = null }) {
  const body = { name };
  if (parentId) body.parentId = parentId;
  const res = await api.post('/drive/folders', body);
  return res.data;
}

export async function getFileMetadata(id) {
  const res = await api.get(`/drive/files/${id}/metadata`);
  return res.data;
}

export function getFileDownloadUrl(id) {
  return `/api/drive/files/${id}/content`;
}

export async function patchItem(id, payload) {
  const res = await api.patch(`/drive/items/${id}`, payload);
  return res.data;
}

export async function deleteItem(id) {
  const res = await api.delete(`/drive/items/${id}`);
  return res.data;
}

export async function shareItem(id) {
  const res = await api.post(`/drive/items/${id}/share`);
  return res.data;
}

export async function getSharedItem(token) {
  const res = await api.get(`/share/${token}`);
  return res.data;
}

export function getSharedDownloadUrl(token) {
  return `/api/share/${token}`;
}
