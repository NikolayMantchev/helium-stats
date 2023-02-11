import Link from "next/link";
import { IoHome } from "react-icons/io5";

function LoginPage() {
    return (
        <div className="container">
            <div className="comp__cont">
                <form className=" align-c">
                    <p className="title">Login</p>
                    <div className="form">
                        <input
                            type="text"
                            className="form__input"
                            placeholder="Username"
                        />
                    </div>
                    <div className="form">
                        <input
                            type="Password"
                            className="form__input"
                            placeholder="Password"
                        />
                    </div>
                    <div className="btn btn__secondary">
                        <p>Login</p>
                    </div>
                    <div className="title">
                        <p>
                            Create Account
                            <Link href={"register"}>Register</Link>
                        </p>
                    </div>
                </form>
                <Link href={"/"}>
                    <div className="icon__home">
                        <IoHome />
                    </div>
                </Link>
            </div>
        </div>
    );
}
export default LoginPage;
