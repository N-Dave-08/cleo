"use client";

import { createPost } from "@/app/(app)/home/_actions/create-post";
import imageCompression from "browser-image-compression";
import Image from "next/image";
import { Loader2, Plus, X, Camera } from "lucide-react";
import { useRef, useState, useTransition } from "react";

export default function PostCreateModal() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDialogElement>(null);

  const [previews, setPreviews] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [isPending, startTransition] = useTransition();

  function open() {
    modalRef.current?.showModal();
  }

  function close() {
    modalRef.current?.close();
    setPreviews([]);
    setFiles([]);
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFiles = Array.from(e.target.files || []);
    if (!selectedFiles.length) return;

    const compressedFiles = await Promise.all(
      selectedFiles.map((file) =>
        imageCompression(file, {
          maxSizeMB: 0.6,
          maxWidthOrHeight: 1200,
          useWebWorker: true,
        }),
      ),
    );

    setFiles(compressedFiles);
    const previewUrls = compressedFiles.map((file) =>
      URL.createObjectURL(file),
    );
    setPreviews(previewUrls);
  }

  function handleSubmit(formData: FormData) {
    files.forEach((file) => formData.append("images", file));

    startTransition(async () => {
      await createPost(formData);
      close();
    });
  }

  return (
    <>
      {/* TRIGGER: Ghost button for a cleaner look */}
      <button
        onClick={open}
        className="btn btn-primary btn-sm gap-2 opacity-70 hover:opacity-100"
      >
        <Plus className="size-4" />
        <span>New Shot</span>
      </button>

      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box p-0 bg-base-100 border border-base-content/5 max-w-sm overflow-hidden">
          <form action={handleSubmit} className="flex flex-col">
            {/* HEADER: Minimalist Title */}
            <div className="flex justify-between items-center px-4 py-3 border-b border-base-content/5">
              <h3 className="text-sm font-semibold tracking-tight">New Shot</h3>
              <button
                type="button"
                onClick={close}
                className="btn btn-ghost btn-xs btn-circle"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* IMAGE SECTION: Edge-to-edge or rounded focus */}
            <div className="p-3">
              {previews.length === 0 ? (
                <button
                  type="button"
                  className="w-full aspect-square rounded-2xl bg-base-200/50 hover:bg-base-200 border-2 border-dashed border-base-content/10 flex flex-col items-center justify-center gap-2 transition-all group"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="p-3 rounded-full bg-base-100 shadow-sm group-hover:scale-110 transition-transform">
                    <Camera className="size-6 opacity-60" />
                  </div>
                  <span className="text-xs font-medium opacity-50">
                    Upload or Drag
                  </span>
                </button>
              ) : (
                <div
                  className={
                    previews.length > 1 ? "grid grid-cols-2 gap-2" : "block"
                  }
                >
                  {previews.map((preview) => (
                    <div key={preview} className="relative aspect-square">
                      <Image
                        src={preview}
                        alt="Preview"
                        fill
                        className="object-cover rounded-xl"
                        unoptimized
                      />
                    </div>
                  ))}
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                hidden
                multiple
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>

            {/* CONTENT: Frameless Textarea */}
            <div className="px-4 pb-4">
              <textarea
                name="content"
                className="textarea textarea-ghost w-full px-0 focus:bg-transparent resize-none min-h-20 text-sm placeholder:opacity-40"
                placeholder="What's the story?"
              />
            </div>

            {/* ACTION: Clean, borderless footer */}
            <div className="p-3 bg-base-200/30 flex justify-end">
              <button
                disabled={files.length === 0 || isPending}
                className="btn btn-primary btn-sm"
              >
                {isPending ? (
                  <Loader2 className="animate-spin size-4" />
                ) : (
                  "Post"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Backdrop for closing */}
        <form method="dialog" className="modal-backdrop">
          <button onClick={close}>close</button>
        </form>
      </dialog>
    </>
  );
}
