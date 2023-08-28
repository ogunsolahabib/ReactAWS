export default function FormContainer({ children }) {
    return <div className="flex flex-col gap-5 w-full md:w-[450px] border rounded-md p-5">
        {children}
    </div>
}