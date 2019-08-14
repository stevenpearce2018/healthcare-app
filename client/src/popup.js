import { toast } from 'react-toastify'
export const popup = ( message = "Wow so easy!", success = true) => success ? toast.success(message) : toast.error(message)