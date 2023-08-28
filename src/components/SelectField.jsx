export default function SelectField(props) {
    return <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5" {...props}>{props.children}</select>
}