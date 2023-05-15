import React from "react";
import "./Footer.css";
import fw from "@assets/svg/FW200.svg";
import instagram from "../../assets/images/instagram_logo.png";

const Footer = () => {
	return (
		<div className="footer">
			<div className="footer section__padding">
				<div className="footer-links">
					<div className="footer-links-div">
						<div className="logo">
							<img src={fw} alt="fw" className="logo-image" />
						</div>
					</div>
					<div className="footer-links-div">
						<a href="/contribute">
							<p>Contribute</p>
						</a>
					</div>
					<div className="footer-links-div">
						<a href="/link2">
							<p>Link2</p>
						</a>
					</div>
					<div className="footer-links-div">
						<a href="/link3">
							<p>Link3</p>
						</a>
					</div>
					<div className="footer-links-div">
						<a href="/link4">
							<p>Link4</p>
						</a>
					</div>
					<div className="footer-links-div">
						<a href="/link5">
							<p>Link5</p>
						</a>
					</div>
					<div className="footer-links-div">
						<div className="socialmedia">
							<p>
								<img src={instagram} alt="" />
							</p>
						</div>
					</div>
				</div>

				<hr></hr>

				<div className="footer-bellow">
					<div className="footer-bellow-copyright">
						<p>@{new Date().getFullYear()} FairWear. All right reserved.</p>
					</div>
					<div className="footer-bellow-links">
						<a href="/privacypolicy">
							<div>
								<p>Privacy Policy</p>
							</div>
						</a>
						<a href="/termsofservice">
							<div>
								<p>Terms Of Service</p>
							</div>
						</a>
						<a href="/cookiessettings">
							<div>
								<p>Cookies Settings</p>
							</div>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Footer;
