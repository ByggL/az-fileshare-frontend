import React, { useEffect, useState, useRef } from "react";
import {
  listItems,
  uploadFile,
  createFolder,
  deleteItem,
  patchItem,
  shareItem,
  getFileDownloadUrl,
  downloadFile,
} from "../api/drive.js";
import DriveToolbar from "../components/drive/DriveToolbar.jsx";
import Breadcrumbs from "../components/drive/Breadcrumbs.jsx";
import FileList from "../components/drive/FileList.jsx";
import NewFolderForm from "../components/drive/NewFolderForm.jsx";
import RenameMoveModal from "../components/drive/RenameMoveModal.jsx";
import ShareModal from "../components/drive/ShareModal.jsx";
import ConfirmDialog from "../components/drive/ConfirmDialog.jsx";

export default function DrivePage() {
  const [currentParentId, setCurrentParentId] = useState(null);
  const [path, setPath] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNewFolder, setShowNewFolder] = useState(false);
  const [renameItem, setRenameItem] = useState(null);
  const [shareUrl, setShareUrl] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null);
  const uploadInputRef = useRef(null);

  const refresh = async (parentId = currentParentId) => {
    setLoading(true);
    try {
      const data = await listItems(parentId);

      data.map((item) => {
        if (item.type == "folder") return (item.isFolder = true);
        else return (item.isFolder = false);
      });

      setItems(data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh(currentParentId);
  }, [currentParentId]);

  const navigateTo = (parentId) => {
    setCurrentParentId(parentId);
    if (!parentId) {
      setPath([]);
      return;
    }
    setPath((prev) => {
      const idx = prev.findIndex((n) => n.id === parentId);
      if (idx >= 0) return prev.slice(0, idx + 1);
      const current = items.find((i) => i.id === parentId);
      if (current) return [...prev, { id: current.id, name: current.name }];
      return prev;
    });
  };

  const openFolder = (item) => {
    navigateTo(item.id);
  };

  const handleNewFolder = async (name) => {
    await createFolder({ name, parentId: currentParentId });
    setShowNewFolder(false);
    await refresh();
  };

  const handleFilesSelected = async (files) => {
    for (const file of files) {
      await uploadFile({ file, parentId: currentParentId });
    }
    await refresh();
  };

  const handleRenameMove = async (payload) => {
    await patchItem(renameItem.id, payload);
    setRenameItem(null);
    await refresh();
  };

  const handleShare = async (item) => {
    const data = await shareItem(item.id);
    const token = data.token || data.shareToken || data.id || "";
    const origin = window.location.origin;
    const url = `${origin}/share/${token}`;
    setShareUrl(url);
  };

  const handleDownload = async (item) => {
    console.log(item.isFolder, item.id);
    if (item.isFolder) return;
    await downloadFile(item.id);
  };

  return (
    <div className="drive-page">
      <div className="drive-header">
        <Breadcrumbs path={path} onNavigate={navigateTo} />
        <DriveToolbar
          onRefresh={() => refresh()}
          onNewFolder={() => setShowNewFolder(true)}
          onUploadClick={() => uploadInputRef.current?.click()}
        />
      </div>

      <input
        type="file"
        multiple
        ref={uploadInputRef}
        className="hidden-input"
        onChange={(e) => {
          const files = Array.from(e.target.files || []);
          if (files.length) handleFilesSelected(files);
          e.target.value = "";
        }}
      />

      {loading ? (
        <div className="drive-loading">Chargement...</div>
      ) : (
        <FileList
          items={items}
          onOpenFolder={(item) => (item.isFolder ? openFolder(item) : handleDownload(item))}
          onRenameMove={(item) => setRenameItem(item)}
          onShare={handleShare}
          onDelete={(item) => setConfirmDelete(item)}
        />
      )}

      {showNewFolder && <NewFolderForm onCreate={handleNewFolder} onCancel={() => setShowNewFolder(false)} />}
      {renameItem && (
        <RenameMoveModal item={renameItem} onSubmit={handleRenameMove} onCancel={() => setRenameItem(null)} />
      )}
      {shareUrl && <ShareModal url={shareUrl} onClose={() => setShareUrl("")} />}
      {confirmDelete && (
        <ConfirmDialog
          message={`Supprimer "${confirmDelete.name}" ?`}
          onConfirm={async () => {
            await deleteItem(confirmDelete.id);
            setConfirmDelete(null);
            await refresh();
          }}
          onCancel={() => setConfirmDelete(null)}
        />
      )}
    </div>
  );
}
