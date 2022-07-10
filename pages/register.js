import Link from "next/link";
import { IoHome } from "react-icons/io5";

function RegisterPage() {


	return (
		<div className="container">
			<div className="comp__cont">
				<p className="title" >Register</p>
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
				<div className="form">
					<input
						type="Password"
						className="form__input"
						placeholder="Repeat Password"
					/>
				</div>
				<div className="btn btn__secondary">
					<p>Register</p>
				</div>
				<div className="title">
					<p>Allready registered <Link href={"login"} color="6d5dfc">Login</Link></p>
				</div>
				<div className="icon__home">
					<Link href={"/"}><IoHome /></Link>
				</div>
			</div>
		</div >
	)
}
export default RegisterPage;