import { Dialog } from '@headlessui/react'

export default function Modal({ children, onClose }) {
    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <div
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg relative max-w-lg w-full"
          onClick={e => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
          >
            ✕
          </button>
          {children}
        </div>
      </div>
    );
  }
  