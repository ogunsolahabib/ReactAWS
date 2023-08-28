import { Outlet, Route } from "react-router-dom";



export default function CreateRecord() {
    return (
        <Route>

            <Route path="/" element={<CreateRecord />}>
                <Route
                    path="basic"
                    element={<>basic</>}
                />
                <Route path="color" element={<>color</>} />
                <Route path="code" element={<>code</>} />
                <Route path="save" element={<>save</>} />
            </Route>
            <Outlet />
        </Route>
    );
}