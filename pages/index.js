
import Navbar from "../components/Navbar";
import Names from "../components/Names";
import Daily from "../components/Daily";
import Balance from "../components/Balance";
import CurPrice from "../components/CurPrice";
import Day from "./day";

function Layout({ children }) {

    return (
        <>
            <Navbar />
            <main className="container">
                {children}
                <div className="component__content">
                    <Day></Day>
                </div>
                <div className="component__content">
                    <CurPrice></CurPrice>
                    <Balance></Balance>
                </div>
                <div className="component__content second_content">
                    <Names>

                    </Names>
                    <Daily></Daily>
                </div>
            </main>
            {/* <Footer /> */}
        </>
    )
}
export default Layout;