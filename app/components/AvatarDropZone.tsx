import { useDropzone } from "react-dropzone";
import Image from "next/image";

type ImageDropzoneProps = {
  files: (File | { url: string })[];
  onChange: (files: (File | { url: string })[]) => void;
};

export function AvatarDropZone({ files, onChange }: ImageDropzoneProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    multiple: false,
    onDrop: (acceptedFiles) => {
      onChange([...files, ...acceptedFiles]);
    },
  });

  const removeImage = (index: number) => {
    onChange(files.filter((_, i) => i !== index));
  };

  return (
    <div className="mt-2 w-full ">
      <div
        {...getRootProps()}
        className={` border rounded-lg p-4 cursor-pointer hover:bg-[#EEEDFC] hover:border-[#DDDBFA] ${files.length > 0 ? "bg-[#EEEDFC] border-[#DDDBFA]" : ""}
          ${isDragActive ? "border-black" : "border-gray-300"}`}
      >
        <input {...getInputProps()} />
        {files.length > 0 ? (
          <div className="flex items-center gap-4 w-full">
            {files.map((file, i) => {
              const isFile = file instanceof File;
              const fileUrl = isFile ? URL.createObjectURL(file) : file.url;
              const fileName = isFile ? file.name : "Avatar";
              const fileSize = isFile
                ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
                : "";

              return (
                <div
                  key={i}
                  className="flex items-center justify-center p-1 py-4 w-90 h-31.5"
                >
                  {/* Avatar */}
                  <div className="relative w-14 h-14">
                    <Image
                      src={fileUrl || ""}
                      alt="User avatar"
                      fill
                      className="object-contain rounded-full auto"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex flex-col">
                    <p className="text-sm font-medium text-gray-700">
                      {fileName}
                    </p>
                    {fileSize && (
                      <p className="text-xs text-gray-400">Size: {fileSize}</p>
                    )}

                    {/* Change button */}
                    <button
                      type="button"
                      className="text-sm text-[#4F46E5] underline mt-1"
                    >
                      Change
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col gap-2 items-center justify-center p-1 py-4">
            <svg
              width="34"
              height="34"
              viewBox="0 0 34 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M29.75 21.25V26.9167C29.75 27.6681 29.4515 28.3888 28.9201 28.9201C28.3888 29.4515 27.6681 29.75 26.9167 29.75H7.08333C6.33189 29.75 5.61122 29.4515 5.07986 28.9201C4.54851 28.3888 4.25 27.6681 4.25 26.9167V21.25"
                stroke="#ADADAD"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M24.0837 11.3333L17.0003 4.25L9.91699 11.3333"
                stroke="#ADADAD"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17 4.25V21.25"
                stroke="#ADADAD"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <p className="flex items-center text-sm text-gray-500 text-center gap-1 font-medium">
              Drag and drop or{" "}
              <span className="underline text-[#281ED2]"> Upload file</span>
            </p>

            <p className="text-xs text-gray-400">JGP, PNG or WebP</p>
          </div>
        )}
      </div>
    </div>
  );
}
