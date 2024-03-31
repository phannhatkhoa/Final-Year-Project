import AdminFooter from "../Pages/Auth/Admin/components/Footer"
import AdminHeader from "../Pages/Auth/Admin/components/Header"


export const AdminTemplate = ({ children }) => {
    return (
        <>
            <AdminHeader/>
            {children}
            <AdminFooter />
        </>
    )
}