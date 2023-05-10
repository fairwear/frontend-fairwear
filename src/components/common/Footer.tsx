import React from "react";
import footer from "./footer.css";
import instagram from "../../assets/images/instagram_logo.png";

const Footer = () => {
	return (
		<div className="footer">
			<div className="sb__footer section__padding">
				<div className="sb__footer-links">
					<div className="sb__footer-links-div">
						<a href="/contribute">
							<p>Contribute</p>
						</a>
                        </div>
                    <div className="sb__footer-links-div"> 
                        <a href="/termsofservice">
							<p>Terms Of Service</p>
						</a>
                    </div>
                    <div className="sb__footer-links-div">
                        <a href="/report">
							<p>Report</p>
						</a>
                    </div>
                    <div className="sb__footer-links-div">
                        <a href="/surprise">
							<p>Open</p>
						</a>
                    </div>
                    <div className="sb__footer-links-div">
                        <h4>Coming soon on</h4>
                        <div className="socialmedia">
                            <p><img src={instagram} alt=""/></p>
                        </div>
					</div>
				</div>
         <hr></hr>
			</div>
        </div>
	);
};

export default Footer;
