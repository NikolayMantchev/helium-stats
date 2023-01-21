
import Navbar from "../components/Layout";
import Names from "../components/Names";
import Daily from "../components/Daily";
import Balance from "../components/Balance";

function Layout({ children }) {

    return (
        <>
            <Navbar />
            <main className="container">
                {children}
                <div className="component__content">

                    <Names></Names>
                    <Daily></Daily>
                    <Balance></Balance>
                </div>
            </main>
        </>
    )
}
export default Layout;