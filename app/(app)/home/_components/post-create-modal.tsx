"use client";

import { createPost } from "@/app/(app)/home/_actions/create-post";
import imageCompression from "browser-image-compression";
import { ImagePlus, Loader2, Plus, X } from "lucide-react";
import { useRef, useState, useTransition } from "react";

export default function PostCreateModal() {
  /**
   * Reference to the hidden file input element.
   *
   * We use this so we can trigger the native file picker
   * programmatically when the custom upload area is clicked.
   */
  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * Reference to the native HTML dialog element.
   *
   * Allows us to open/close the modal imperatively
   * using .showModal() and .close().
   */
  const modalRef = useRef<HTMLDialogElement>(null);

  /**
   * Stores a temporary browser URL used for image preview.
   *
   * Example:
   * blob:http://localhost:3000/abc123...
   */
  const [preview, setPreview] = useState<string | null>(null);

  /**
   * Stores the compressed image file that will eventually
   * be uploaded to Supabase Storage.
   */
  const [file, setFile] = useState<File | null>(null);

  /**
   * React concurrent transition state.
   *
   * isPending becomes true while the server action runs.
   * Useful for:
   * - disabling buttons
   * - showing loading spinners
   */
  const [isPending, startTransition] = useTransition();

  /**
   * Opens the native dialog modal.
   */
  function open() {
    modalRef.current?.showModal();
  }

  /**
   * Closes the modal and resets local UI state.
   *
   * Important:
   * We clear:
   * - preview image
   * - selected file
   *
   * so the modal starts fresh next time.
   */
  function close() {
    modalRef.current?.close();

    setPreview(null);
    setFile(null);
  }

  /**
   * Runs when the user selects an image file.
   */
  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    /**
     * Retrieve the first selected file.
     */
    const f = e.target.files?.[0];

    if (!f) return;

    /**
     * Compress image BEFORE upload.
     *
     * Benefits:
     * - smaller upload size
     * - faster uploads
     * - reduced storage usage
     * - improved app performance
     *
     * useWebWorker moves compression work
     * off the main UI thread for smoother UX.
     */
    const compressedFile = await imageCompression(f, {
      maxSizeMB: 1,
      maxWidthOrHeight: 1280,
      useWebWorker: true,
    });

    /**
     * Save compressed file into state
     * so we can submit it later.
     */
    setFile(compressedFile);

    /**
     * Create a temporary local browser URL
     * so the user can instantly preview the image
     * before uploading.
     */
    setPreview(URL.createObjectURL(compressedFile));
  }

  /**
   * Runs when the form is submitted.
   */
  function handleSubmit(formData: FormData) {
    /**
     * Server Actions automatically receive form fields,
     * but manually managed files stored in React state
     * must be appended manually.
     */
    if (file) {
      formData.append("image", file);
    }

    /**
     * startTransition prevents blocking urgent UI updates.
     *
     * React treats this as a non-urgent async update.
     */
    startTransition(async () => {
      /**
       * Call server action.
       *
       * This handles:
       * - authentication
       * - image upload
       * - database insertion
       */
      await createPost(formData);

      /**
       * Close and reset modal after successful creation.
       */
      close();
    });
  }

  return (
    <>
      {/* OPEN MODAL BUTTON */}
      <button onClick={open} className="btn btn-primary btn-sm">
        <Plus className="size-4" />
        Create
      </button>

      {/* MODAL */}
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

            {/* IMAGE UPLOAD SECTION */}
            <div className="p-4">
              {!preview ? (
                /**
                 * Empty upload state.
                 *
                 * Clicking triggers hidden file input.
                 */
                <button
                  type="button"
                  className="w-full aspect-square border-dashed border-2 rounded-xl flex items-center justify-center"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <ImagePlus />
                </button>
              ) : (
                /**
                 * Preview selected image before upload.
                 */
                <img
                  src={preview}
                  className="w-full aspect-square object-cover rounded-xl"
                />
              )}

              {/* HIDDEN NATIVE FILE INPUT */}
              <input
                ref={fileInputRef}
                type="file"
                hidden
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>

            {/* CAPTION INPUT */}
            <div className="p-4">
              <textarea
                name="content"
                className="textarea w-full"
                placeholder="Write caption..."
              />
            </div>

            {/* SUBMIT ACTIONS */}
            <div className="p-4 border-t flex justify-end">
              <button disabled={!file || isPending} className="btn btn-primary">
                {/**
                 * Show loading spinner while
                 * post creation is processing.
                 */}
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
