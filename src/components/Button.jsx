export default function Button({ children, danger, ...rest }) {
    return <button className={`text-white ${danger ? 'bg-red-700' : 'bg-primary'} ${danger ? 'hover:bg-red-600' : 'hover:bg-green-600'} focus:ring-4 focus:outline-none ${danger ? 'focus:ring-red-300' : 'focus:ring-green-300'} rounded-lg w-full sm:w-auto px-5 py-2.5 text-center block my-5`} {...rest}>{children}</button>
}