import React, { useState } from 'react';

function Modal({ isOpen, onClose, children }) {
    return (
        <dialog
            className={`fixed inset-0 z-10 overflow-y-auto ${isOpen ? 'block' : 'hidden'
                } `}
            open={isOpen}
            onClick={onClose}
        >
            <div className='fixed bg-[rgba(0,0,0,0.6)] w-screen h-screen overflow-x-hidden overflow-y-auto md:inset-0 max-h-full justify-center items-center flex shadow-lg'>

            </div>
            <div className="flex items-center justify-center min-h-screen w-full md:min-w-[400px] bg-white">
                <div
                    className="modal-container bg-white w-full md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto p-6"
                    onClick={(e) => e.stopPropagation()}
                >
                    {children}
                </div>
            </div>
        </dialog>
    );
}

export default Modal;
