import Modal from "../Modal";
import Button from "../Button";
import { DataStore } from "aws-amplify";

export default function DeleteRecordModal({ record, isOpen, onClose, fetchRecords }) {

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            await DataStore.delete(record);
            fetchRecords();
            onClose();

        } catch (err) {
            console.error("Error signing in:", err);
        }
    };





    return <Modal isOpen={isOpen} onClose={onClose}>
        <div className="container relative">
            <button className="text-2xl absolute right-0 top-0 font-bold" onClick={onClose}>Ⅹ</button>
            <h3 className="text-xl mb-5 font-semibold">Delete this record?</h3>

            <div className="grid gap-2 grid-cols-2 justify-between align-middle">
                <button className="btn text-gray-700 bg-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-lg sm:w-auto px-5 py-2.5 text-center block my-5" onClick={onClose}>
                    Cancel
                </button>
                <Button danger onClick={handleSave}>Delete</Button>
            </div>

        </div>
    </Modal>
}