import React from 'react';

class App extends React.Component {
    render() {
            return (
                <div className="App">
					<div id="wrapper">

						<header id="header" class="alt">
							<a href="index.html" class="logo"><span>Abiodun Maborukoje</span></a>
							<nav>
								<a href="#menu">Menu</a>
							</nav>
						</header>

						<nav id="menu">
							<ul class="links">
								<li><a href="index.html">Home</a></li>
								<li><a href="About.html">About Me</a></li>
								<li><a href="Launch Module.html">Induction Module</a></li>
								<li><a href="Module 2.html">The Data Professional</a></li>
								
								</ul>
						</nav>

								<section id="banner" class="major">
									<div class="inner">
										<header class="major">
											<h1>PGCert Data Science E-Portfolio</h1>
										</header>
										<div class="content">
											<p>My e-portfolio based on the work carried out on the PGCert Data Science programme.</p>
										</div>
									</div>
								</section>

								<div id="main">

									<section id="two">
										<div class="inner">
											<header class="major">
												<h2>About Me</h2>
											</header>
											<p>
												Strategic Information Technology Manager skilled in guiding navigation of modern technology.

												Accustomed to driving efficiency and effectiveness by developing, delivering and supporting strategic plans.

												Software and Data Engineering background working productively in dynamic environments for over 12 years.

												Fluent in C#, SQL, and Javascript programming languages used to develop software in Trade and Fin-tech industry.

												Proud team player with successful 7 years record of building positive relationships with internal and external stakeholders.

											</p>
											<ul class="actions">
												<li><a href="About.html" class="button">Learn more</a></li>
											</ul>
										</div>
									</section>


									<section id="one" class="tiles">
										<article>
											<span class="image">
												<img src="images/pic01.jpg" alt="" />
											</span>
											<header class="major">
												<h3><a href="Launch Module.html" class="link">Induction Module</a></h3>
												<p>Introductory module</p>
											</header>
										</article>
										<article>
											<span class="image">
												<img src="images/pic02.jpg" alt="" />
											</span>
											<header class="major">
												<h3><a href="Module 2.html" class="link">The Data Professional</a></h3>
												<p>Exploring the critical theoretical concepts in the discipline of data science.</p>
											</header>
										</article>
										
									</section>

								</div>

								<section id="contact">
									<div class="inner">
										<section>
											<form method="post" action="#">
												<div class="fields">
													<div class="field half">
														<label for="name">Name</label>
														<input type="text" name="name" id="name" />
													</div>
													<div class="field half">
														<label for="email">Email</label>
														<input type="text" name="email" id="email" />
													</div>
													<div class="field">
														<label for="message">Message</label>
														<textarea name="message" id="message" rows="6"></textarea>
													</div>
												</div>
												<ul class="actions">
													<li><input type="submit" value="Send Message" class="primary" /></li>
													<li><input type="reset" value="Clear" /></li>
												</ul>
											</form>
										</section>
										<section class="split">
											<section>
												<div class="contact-method">
													<span class="icon solid alt fa-envelope"></span>
													<h3>Email</h3>
													<a href="#">samaborukoje@gmail.com</a>
												</div>
											</section>
											<section>
												<div class="contact-method">
													<span class="icon solid alt fa-phone"></span>
													<h3>Phone</h3>
													<span>(+234) 8131963441</span>
												</div>
											</section>
											<section>
												<div class="contact-method">
													<span class="icon solid alt fa-home"></span>
													<h3>Address</h3>
													<span>Abuja<br />
														FCT<br />
														Nigeria</span>
												</div>
											</section>
										</section>
									</div>
								</section>

								<footer id="footer">
									<div class="inner">
										<ul class="icons">
											<li><a href="https://github.com/samabos" class="icon brands alt fa-github"><span class="label">GitHub</span></a></li>
											<li><a href="https://www.linkedin.com/in/samabos/" class="icon brands alt fa-linkedin-in"><span class="label">LinkedIn</span></a></li>
										</ul>
										<ul class="copyright">
											<li>&copy; Untitled</li><li>Design: <a href="https://html5up.net">HTML5 UP</a></li>
										</ul>
									</div>
								</footer>

							</div>

					
				</div>
            );
        
    }
}

export default App;
