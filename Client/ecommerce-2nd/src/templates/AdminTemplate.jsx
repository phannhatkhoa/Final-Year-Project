import ProfileFooter from "../Pages/Auth/Profile/components/ProfileFooter"
import ProfileHeader from "../Pages/Auth/Profile/components/ProfileHeader"


export const AdminTemplate = ({ children }) => {
    return (
        <>
            <ProfileHeader />
            {children}
            <ProfileFooter />
        </>
    )
}