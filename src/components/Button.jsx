export default function Button({ children, ...rest }) {
    return <button className="text-white bg-primary hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center block my-5" {...rest}>{children}</button>
}