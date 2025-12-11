import { Carousel, initTE } from "tw-elements";

import image1 from "../../assets/images/img1.jpg";
import image2 from "../../assets/images/img2.jpg";
import image3 from "../../assets/images/img3.jpg";
import useNoBugUseEffect from "../../hooks/useNoBugUseEffect";
import Img from "../Img";
const DashboardCarousels = () => {
	useNoBugUseEffect({
		functions: () => {
			initTE({ Carousel });
		},
		timeout: 400,
	});
	return (
		<section className="w-full">
			<div className="">
				<div
					id="dashboardCarousels"
					className="relative"
					data-te-carousel-init
					data-te-carousel-slide
				>
					<div
						className="absolute bottom-0 left-0 right-0 z-[2] mx-[15%] mb-0 flex list-none justify-center p-0"
						data-te-carousel-indicators
					>
						<button
							type="button"
							data-te-target="#dashboardCarousels"
							data-te-slide-to="0"
							data-te-carousel-active
							className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
							aria-current="true"
							aria-label="Slide 1"
						></button>
						<button
							type="button"
							data-te-target="#dashboardCarousels"
							data-te-slide-to="1"
							className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
							aria-label="Slide 2"
						></button>
						<button
							type="button"
							data-te-target="#dashboardCarousels"
							data-te-slide-to="2"
							className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
							aria-label="Slide 3"
						></button>
					</div>

					<div className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
						<div
							className="relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
							data-te-carousel-active
							data-te-carousel-item
							style={{
								backfaceVisibility: "hidden",
							}}
						>
							<Img
								src={image1}
								className="block w-full aspect-[3/2] object-cover bg-slate-800"
								alt="..."
							/>
							<div className="absolute bottom-0 hidden py-4 b text-center bg-black w-full bg-opacity-70 text-white md:block">
								<h5 className="text-xl px-5 font-roboto font-light">
									Here´s Exactly Where We Are with <br />
									Vaccines and Treatments for COVID-19
								</h5>
								{/* <p>
																Some
																representative
																placeholder
																content for the
																first slide.
															</p> */}
							</div>
						</div>
						<div
							className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
							data-te-carousel-item
							style={{
								backfaceVisibility: "hidden",
							}}
						>
							<Img
								src={image2}
								className="block w-full aspect-[3/2] object-cover bg-slate-800"
								alt="..."
							/>
							<div className="absolute bottom-0 hidden py-4 b text-center bg-black w-full bg-opacity-70 text-white md:block">
								<h5 className="text-xl px-5 font-roboto font-light">
									Eating more plant foods may lower heart
									<br />
									disease risk in young adults, older women
								</h5>
								{/* <p>
																Some
																representative
																placeholder
																content for the
																first slide.
															</p> */}
							</div>
						</div>
						<div
							className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
							data-te-carousel-item
							style={{
								backfaceVisibility: "hidden",
							}}
						>
							<Img
								src={image3}
								className="block w-full aspect-[3/2] object-cover bg-slate-800"
								alt="..."
							/>
							<div className="absolute bottom-0 hidden py-4 b text-center bg-black w-full bg-opacity-70 text-white md:block">
								<h5 className="text-xl px-5 font-roboto font-light">
									COA flags "deficiencies" in DOH <br />
									management of P67-B COVID funds
								</h5>
								{/* <p>
																Some
																representative
																placeholder
																content for the
																first slide.
															</p> */}
							</div>
						</div>
					</div>

					<button
						className="absolute bottom-0 left-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
						type="button"
						data-te-target="#dashboardCarousels"
						data-te-slide="prev"
					>
						<span className="inline-block h-8 w-8">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								className="h-6 w-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M15.75 19.5L8.25 12l7.5-7.5"
								/>
							</svg>
						</span>
						<span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
							Previous
						</span>
					</button>
					<button
						className="absolute bottom-0 right-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
						type="button"
						data-te-target="#dashboardCarousels"
						data-te-slide="next"
					>
						<span className="inline-block h-8 w-8">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								className="h-6 w-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M8.25 4.5l7.5 7.5-7.5 7.5"
								/>
							</svg>
						</span>
						<span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
							Next
						</span>
					</button>
				</div>
			</div>
		</section>
	);
};

export default DashboardCarousels;
