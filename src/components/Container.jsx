export default function Container({ children }) {
    return <div className="container mx-auto px-4 h-screen grid place-items-center ">
        {children}
    </div>
}