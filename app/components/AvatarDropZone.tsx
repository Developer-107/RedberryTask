import { useDropzone } from 'react-dropzone'
import { X } from 'lucide-react'

type ImageDropzoneProps = {
  files: (File | { url: string })[];
  onChange: (files: (File | { url: string })[]) => void;
}

export function AvatarDropZone({ files, onChange }: ImageDropzoneProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': [] },
    multiple: true,
    onDrop: (acceptedFiles) => {
      onChange([...files, ...acceptedFiles])
    },
  })

  const removeImage = (index: number) => {
    onChange(files.filter((_, i) => i !== index))
  }

  return (
    <div className='mt-2 w-full'>
      <div
        {...getRootProps()}
        className={` border rounded-lg p-4 cursor-pointer
          ${isDragActive ? 'border-black' : 'border-gray-300'}`}
      >
        <input {...getInputProps()} />
        <div className='flex flex-col gap-2 items-center p-1 py-4'>
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M29.75 21.25V26.9167C29.75 27.6681 29.4515 28.3888 28.9201 28.9201C28.3888 29.4515 27.6681 29.75 26.9167 29.75H7.08333C6.33189 29.75 5.61122 29.4515 5.07986 28.9201C4.54851 28.3888 4.25 27.6681 4.25 26.9167V21.25" stroke="#ADADAD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M24.0837 11.3333L17.0003 4.25L9.91699 11.3333" stroke="#ADADAD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M17 4.25V21.25" stroke="#ADADAD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

        <p className="flex items-center text-sm text-gray-500 text-center gap-1 font-medium">
          Drag and drop or <span className='underline text-[#281ED2]'> Upload file</span>
        </p>

        <p className='text-xs text-gray-400'>JGP, PNG or WebP</p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="grid grid-cols-4 gap-3 mt-3">
          {files.map((file, i) => (
            <div key={i} className="relative group">
              <img
                src={file instanceof File ? URL.createObjectURL(file) : file.url}
                className="h-24 w-full object-cover rounded"
              />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
