import api from "./client";

export async function listItems(parentId = null) {
  const params = {};
  if (parentId) params.parentId = parentId;
  const res = await api.get("/drive", { params });
  return res.data;
}

export async function uploadFile({ file, parentId = null }) {
  const formData = new FormData();
  formData.append("file", file);
  if (parentId) formData.append("parentId", parentId);
  const res = await api.post("/drive/files", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function createFolder({ name, parentId = null }) {
  const body = { name };
  if (parentId) body.parentId = parentId;
  const res = await api.post("/drive/folders", body);
  return res.data;
}

export async function getFileMetadata(id) {
  const res = await api.get(`/drive/files/${id}/metadata`);
  return res.data;
}

export function getFileDownloadUrl(id) {
  return `/api/drive/files/${id}/content`;
}

export async function downloadFile(fileId) {
  try {
    const response = await api.get(`/files/${fileId}/content`, {
      responseType: "blob", // Essential: forces the response to be treated as binary
    });

    // 1. Extract filename from the Content-Disposition header
    let fileName = "downloaded-file";
    const disposition = response.headers["content-disposition"];

    if (disposition && disposition.indexOf("attachment") !== -1) {
      // Regex to grab content inside filename="..."
      const matches = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(disposition);
      if (matches != null && matches[1]) {
        fileName = matches[1].replace(/['"]/g, "");
      }
    }

    // 2. Create a temporary URL for the binary blob
    const url = window.URL.createObjectURL(new Blob([response.data]));

    // 3. Trigger the browser's download routine
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName); // Use the extracted name
    document.body.appendChild(link);
    link.click();

    // 4. Cleanup
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Download failed:", error);
  }
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
