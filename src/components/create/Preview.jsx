import React, { useEffect, useState } from "react";
import { DataStore } from "aws-amplify";
import { useNavigate, useSearchParams } from "react-router-dom";
import FormContainer from "components/FormContainer";
import Protected from "../Protected";
import { Draft, Record } from "../../models";
import Button from "../Button";
import useCurrentUser from "../../customHooks/useCurrentUser";

function Preview() {
    const [error, setError] = useState(null);
    const [searchParams] = useSearchParams();
    const [draftDetails, setDraftDetails] = useState();
    const { user } = useCurrentUser();


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
            const { name, make, color, code } = draftDetails || {};

            await DataStore.save(new Record({ name, make, color, code, createdBy: user.attributes.email }));

            await DataStore.delete(Draft, draftDetails)

            navigate(`/`)
        } catch (err) {
            console.error("Error signing in:", err);
            setError(err.message);
        }
    };

    return (
        <Protected>
            <form onSubmit={handleSave}>
                <h2 className="text-2xl font-semibold text-center mb-6">Preview Record</h2>
                {draftDetails && <FormContainer>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <div className="text-xl flex align-middle justify-center flex-col h-[10rem]">
                        <p>
                            I have a <strong>{draftDetails.make}</strong> and the colour is <strong>{draftDetails.color}</strong>.
                        </p>
                        {draftDetails.color === 'RED' ?
                            <p>THE CAR IS RED! NICE!!</p> : null}
                    </div>
                    <Button onClick={handleSave}>Save</Button>
                </FormContainer>}
            </form>
        </Protected>

    );
}

export default Preview;
