import React from "react";

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ComingSoonModal: React.FC<ComingSoonModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
        <h2 className="text-2xl font-bold text-brown mb-4">Coming Soon!</h2>
        <p className="text-lg text-black mb-6">
          Our app is currently under development. Stay tuned for updates!
        </p>
        <button
          onClick={onClose}
          className="px-6 py-2 bg-gold text-black rounded-full hover:bg-brown hover:text-white transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ComingSoonModal;