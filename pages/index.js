import Navbar from "../components/Navbar";
import Balance from "../components/Balance";
import CurPrice from "../components/CurPrice";
import Wallet from "./Wallet";

function Layout({ children }) {
    return (
        <>
            <Navbar />
            <main className="container">
                <div className="component__content">
                    {children}
                    <div className="component__content">
                        <CurPrice></CurPrice>
                        <Balance></Balance>
                    </div>
                    <div className="component__content second_content">
                        <Wallet></Wallet>
                    </div>
                </div>
            </main>
            {/* <Footer /> */}
        </>
    );
}
export default Layout;
