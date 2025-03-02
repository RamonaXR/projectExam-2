import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { AiOutlineClose } from "react-icons/ai";

/**
 * Modal component displays a dialog modal using Headless UI's Dialog and Transition components.
 *
 * It renders an overlay with a fade-in/out animation and a panel containing the modal content.
 * An optional title is displayed at the top, and a close button is provided to dismiss the modal.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {boolean} props.isOpen - Determines whether the modal is visible.
 * @param {Function} props.onClose - Callback function invoked when the modal is requested to close.
 * @param {React.ReactNode} [props.title] - Optional title displayed at the top of the modal.
 * @param {React.ReactNode} props.children - The content to display inside the modal.
 * @returns {JSX.Element} The rendered modal component.
 */
export default function Modal({ isOpen, onClose, title, children }) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-md transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <button
                  onClick={onClose}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                  <AiOutlineClose size={20} />
                </button>

                {title && (
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 mb-2"
                  >
                    {title}
                  </Dialog.Title>
                )}

                <div className="mt-2">{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
