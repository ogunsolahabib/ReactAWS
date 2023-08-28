import React, { useEffect, useState } from "react";
import { Auth, DataStore } from "aws-amplify";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import useCurrentUser from "customHooks/useCurrentUser";
import Button from "components/Button";
import InputField from "components/InputField";
import SelectField from "components/SelectField";
import FormContainer from "components/FormContainer";
import Container from "../Container";
import { COLORS, MAKES } from "../../config";
import Protected from "../Protected";
import { Draft } from "../../models";

function SelectColor() {
    const [color, setColor] = useState("");
    const [error, setError] = useState(null);
    const [searchParams] = useSearchParams();
    const [draftDetails, setDraftDetails] = useState();



    const id = searchParams.get('id');

    const navigate = useNavigate();
    async function fetchDraftDetails(id) {
        const res = await DataStore.query(Draft, id);

        setDraftDetails(res)
    }
    useEffect(() => {
        if (id) {
            fetchDraftDetails(id);
        }
    }, [id]);



    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const res = await DataStore.save(Draft.copyOf(draftDetails, updated => {
                updated.color = color;
            }));

            navigate(`/create/code?id=${res.id}`)
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
                    <Button type="submit">Continue</Button>

                </FormContainer>
            </form>
        </Protected>

    );
}

export default SelectColor;
