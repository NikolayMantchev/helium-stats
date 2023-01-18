
import Navbar from "../components/Layout";
import Names from "../components/Names";
import Daily from "../components/Daily";
import Box from "../components/Box";

function Layout({ children }) {

    return (
        <>
            <Navbar />
            <main className="container">
                {children}
                <div className="component__content">
                    <Names></Names>
                    <Daily></Daily>
                    {/* <Box></Box> */}
                </div>
            </main>
        </>
    )
}
export default Layout;