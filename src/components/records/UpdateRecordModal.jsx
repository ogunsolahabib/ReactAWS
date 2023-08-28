import { useEffect, useState } from "react";
import Modal from "../Modal";
import InputField from "../InputField";
import Button from "../Button";
import { COLORS, MAKES, propertyRenderer } from "../../config";
import SelectField from "../SelectField";
import { Record } from "../../models";
import { DataStore } from "aws-amplify";

export default function UpdateRecordModal({ record, isOpen, onClose, fetchRecords }) {

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            await DataStore.save(Record.copyOf(record, updated => {
                updated.name = name;
                updated.make = make;
                updated.color = color;
            }));
            fetchRecords();
            onClose();

        } catch (err) {
            console.error("Error signing in:", err);
            setError(err.message);
        }
    };


    const [name, setName] = useState("");
    const [make, setMake] = useState("");
    const [color, setColor] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!record) return;
        setName(record.name);
        setMake(record.make);
        setColor(record.color);
    }, [record])
    return <Modal isOpen={isOpen} onClose={onClose}>
        <div className="container relative">
            <button className="text-2xl absolute right-0 top-0 font-bold" onClick={onClose}>Ⅹ</button>
            <h3 className="text-2xl mb-5 font-semibold">Edit Record</h3>
            <form onSubmit={handleSave} className="flex flex-col gap-5">
                {error && <p style={{ color: "red" }}>{error}</p>}
                <div className="space-y-3">
                    <label for="name">Name</label>
                    <InputField
                        type="name"
                        placeholder="Jon Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="space-y-3">
                    <label for="make">Make</label>
                    <SelectField
                        name='make'
                        value={make}
                        onChange={(e) => setMake(e.target.value)}
                    >
                        <option value="" disabled selected className="text-red">Select car make</option>

                        {MAKES.map(make => <option value={make}>{propertyRenderer[make]}</option>)}
                    </SelectField>
                </div>
                <div className="space-y-3">
                    <label for="color">Color</label>
                    <SelectField
                        name='color'
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                    >
                        <option value="" disabled selected className="text-red">Select car color</option>

                        {COLORS.map(color => <option value={color}>{color}</option>)}
                    </SelectField>
                </div>
                <Button type="submit">Save</Button>

            </form>
        </div>
    </Modal>
}