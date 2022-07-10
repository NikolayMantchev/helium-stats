import Link from "next/link";
import { IoHome } from "react-icons/io5";

function Layout() {

    return (
        <>
            <nav className="navbar ">
                <div className="icon__home">
                    <Link href={"/"}><IoHome /></Link>
                </div>
                <div className="nav_tile">
                    <div className="navbar__content">
                        <div className="search">
                            <input
                                type="text"
                                className="search__input"
                                placeholder="Search..."
                            />
                            <div className="search__icon">
                                <ion-icon name="search"></ion-icon>
                            </div>
                        </div>
                        <div className="btn btn__secondary">
                            <p><Link href={"login"}>Login</Link></p>
                        </div>
                        <div className="btn btn__secondary">
                            <p><Link href={"register"}>Register</Link></p>
                        </div>
                    </div>
                </div>
            </nav>

            {/* <div className="container">
                <div className="components"></div>
            </div> */}
        </>
    )
}
export default Layout;