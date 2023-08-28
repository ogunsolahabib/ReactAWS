import useCurrentUser from "../customHooks/useCurrentUser"
import Header from "./Header";

export default function Protected({ children }) {
    const { user, isFetchingUser } = useCurrentUser();

    if (isFetchingUser) return <span>Loading...</span>
    if (user) {
        return <main className="container m-auto">
            <Header />
            <div className="container mx-auto px-4 h-[80vh] grid place-items-center">

                {children}
            </div>
        </main>
    }
}