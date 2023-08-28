export default function FormContainer({ children }) {
    return <div className="flex flex-col gap-5 w-full md:w-[450px] border rounded-md p-5 min-h-[10rem]">
        {children}
    </div>
}