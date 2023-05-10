import React from "react";
import "./Footer.css";
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

         <div className="sb__footer-bellow">
            <div className="sb__footer-bellow-copyright">
                <p>
                @{new Date().getFullYear()} FairWear. All right reserved.
                </p>
            </div>
            <div className="sb__footer-bellow-links">
                <a href="/idk"><div><p>I HAVE NO FUCKING IDEA WHAT IM DOING</p></div></a>
                <a href="/help"><div><p>SEND HELP</p></div></a>
            </div>

         </div>
			</div>
        </div>
	);
};

export default Footer;
