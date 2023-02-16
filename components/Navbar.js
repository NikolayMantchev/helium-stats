import Link from "next/link";
import { IoHome, IoWalletOutline } from "react-icons/io5";

function Navbar() {
	return (
		<>
			<nav className="navbar ">
				<div className="nav_tran">
					<div className="icon__home">
						<Link href={"/"}>
							<IoHome />
						</Link>
					</div>
					<div className="nav_tile">
						<div className="navbar__content">
							{/* <div className="search">
                            <input
                                type="text"
                                className="search__input"
                                placeholder="Search..."
                                ref={inputRef}
                                // value={}
                                onChange={(e) => setWallet(e.target.value)}
                            />
                            <div className="search__icon">
                                <ion-icon name="search"></ion-icon>
                            </div>
                        </div> */}
							{/* <Link href={"login"}>
								<div className="btn btn__secondary">Login</div>
							</Link>
							<Link href={"register"}>
								<div className="btn btn__secondary">
									Register
								</div>
							</Link> */}
						</div>
					</div>
				</div>
			</nav>
		</>
	);
}
export default Navbar;
