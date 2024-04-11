import HomeHeader from '../../components/HomeHeader';
import HomeFooter from '../../components/HomeFooter'

export const AboutUsTemplate = ({ children }) => {
    return (
        <>
            <HomeHeader />
            {children}
            <HomeFooter />
        </>
    )
}