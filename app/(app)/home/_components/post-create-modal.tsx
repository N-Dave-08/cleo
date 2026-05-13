"use client";

import { createPost } from "@/app/(app)/home/_actions/create-post";
import imageCompression from "browser-image-compression";
import Image from "next/image";
import { ImagePlus, Loader2, Plus, X } from "lucide-react";
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
    files.forEach((file) => {
      formData.append("images", file);
    });

    startTransition(async () => {
      await createPost(formData);
      close();
    });
  }

  return (
    <>
      <button onClick={open} className="btn btn-primary btn-sm">
        <Plus className="size-4" />
        Create
      </button>

      <dialog ref={modalRef} className="modal">
        <div className="modal-box max-w-xl p-0">
          <form action={handleSubmit} className="flex flex-col">
            {/* HEADER */}
            <div className="flex justify-between p-4 border-b">
              <span className="font-semibold">Create post</span>

              <button type="button" onClick={close}>
                <X />
              </button>
            </div>

            {/* IMAGE SECTION */}
            <div className="p-4">
              {previews.length === 0 ? (
                <button
                  type="button"
                  className="w-full aspect-square border-dashed border-2 rounded-xl flex items-center justify-center"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <ImagePlus />
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {previews.map((preview) => (
                    <div
                      key={preview}
                      className="relative w-full aspect-square"
                    >
                      <Image
                        src={preview}
                        alt="Selected image preview"
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

            {/* CONTENT */}
            <div className="p-4">
              <textarea
                name="content"
                className="textarea w-full"
                placeholder="Write caption..."
              />
            </div>

            {/* ACTIONS */}
            <div className="p-4 border-t flex justify-end">
              <button
                disabled={files.length === 0 || isPending}
                className="btn btn-primary"
              >
                {isPending ? (
                  <Loader2 className="animate-spin size-4" />
                ) : (
                  "Share"
                )}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}
