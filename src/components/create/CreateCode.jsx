import React, { useEffect, useState } from "react";
import { DataStore } from "aws-amplify";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "components/Button";
import FormContainer from "components/FormContainer";
import Protected from "../Protected";
import { Draft } from "../../models";
import InputField from "../InputField";

function CreateCode() {
    const [code, setCode] = useState("");
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
            setCode(id);
        }
    }, [id]);



    const handleSave = async (e) => {
        e.preventDefault();
        try {

            const res = await DataStore.save(Draft.copyOf(draftDetails, updated => {
                updated.code = code;
            }));



            navigate(`/create/preview?id=${res.id}`)
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
                    {error && <p style={{ code: "red" }}>{error}</p>}

                    <div className="space-y-3">
                        <label for="code">Code</label>
                        <InputField
                            name='code'
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                    </div>
                    <Button type="submit">Continue</Button>

                </FormContainer>
            </form>
        </Protected>

    );
}

export default CreateCode;
