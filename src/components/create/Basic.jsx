import React, { useState } from "react";
import { DataStore } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import Button from "components/Button";
import InputField from "components/InputField";
import SelectField from "components/SelectField";
import FormContainer from "components/FormContainer";
import { MAKES } from "../../config";
import Protected from "../Protected";
import { Draft } from "../../models";

function Basic() {
    const [name, setName] = useState("");
    const [make, setMake] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const res = await DataStore.save(new Draft({ name, make }));



            navigate(`/create/color?id=${res.id}`)
        } catch (err) {
            console.error("Error signing in:", err);
            setError(err.message);
        }
    };

    return (
        <Protected>
            <form onSubmit={handleSave}>
                <h2 className="text-2xl font-semibold text-center mb-6">Create Record</h2>
                <FormContainer>
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

                            {MAKES.map(make => <option value={make}>{make}</option>)}
                        </SelectField>
                    </div>
                    <Button type="submit">Continue</Button>

                </FormContainer>
            </form>
        </Protected>

    );
}

export default Basic;
