import useCurrentUser from "../customHooks/useCurrentUser"
import Header from "./Header";

export default function Protected({ children }) {
    const userObject = useCurrentUser();
    const { user, isFetchingUser } = userObject


    if (isFetchingUser) return <span>Loading...</span>
    if (user) {
        return <main className="container m-auto">
            <Header />
            <div className="container max-w-[60rem] mx-auto px-4 h-[80vh]">

                {children}
            </div>
        </main>
    }
}