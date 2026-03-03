import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Slider from "react-slick";
import { Calendar } from "../components/ui/calendar"; // Assuming this is your Shadcn/UI component
import { ArrowLeft, MapPin, Users, IndianRupee, Check, Calendar as CalendarIcon, Sparkles } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { functionHalls } from "../data/functionHalls";

export default function FunctionHallDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(new Date());

    const hall = functionHalls.find((h) => String(h.id) === String(id));

    if (!hall) {
        return (
            <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
                <div className="text-center bg-white p-5 rounded-4 shadow-lg" style={{ maxWidth: '400px' }}>
                    <h2 className="fw-bold mb-4">Function Hall Not Found</h2>
                    <button onClick={() => navigate("/")} className="btn btn-primary px-4 py-2 rounded-pill">
                        Go Back to Home
                    </button>
                </div>
            </div>
        );
    }

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true
    };

    const advancePayment = Math.round(hall.price * 0.1);
    const remainingPayment = hall.price - advancePayment;

    const isDateUnavailable = (date) => {
        return hall.unavailableDates?.some(
            (uDate) => uDate.toDateString() === date.toDateString()
        );
    };

    return (
        <div className="min-vh-100" style={{ background: 'linear-gradient(135deg, #f8faff 0%, #ffffff 50%, #f3f0ff 100%)' }}>
            <style>{`
                .premium-text { background: linear-gradient(90deg, #0d6efd, #6f42c1); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
                .custom-card { border-radius: 1.5rem; border: 1px solid rgba(0,0,0,0.05); box-shadow: 0 10px 30px rgba(0,0,0,0.05); background: white; }
                .icon-box { width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; border-radius: 12px; }
                .sticky-top-custom { position: sticky; top: 2rem; }
                .slick-prev:before, .slick-next:before { color: black !important; font-size: 30px; }
            `}</style>

            {/* Header / Back Button */}
            <nav className="navbar navbar-light bg-white shadow-sm mb-4">
                <div className="container">
                    <button onClick={() => navigate("/")} className="btn d-flex align-items-center text-secondary border-0 p-0">
                        <div className="bg-light rounded-circle p-2 me-2">
                            <ArrowLeft size={18} />
                        </div>
                        <span className="fw-medium">Back to Home</span>
                    </button>
                </div>
            </nav>

            <div className="container pb-5">
                {/* Image Carousel */}
                <div className="custom-card overflow-hidden mb-4 shadow-lg">
                    <Slider {...sliderSettings}>
                        {hall.images.map((image, index) => (
                            <div key={index}>
                                <ImageWithFallback
                                    src={image}
                                    alt={hall.name}
                                    className="w-100 object-fit-cover"
                                    style={{ height: '450px' }}
                                />
                            </div>
                        ))}
                    </Slider>
                </div>

                <div className="row g-4">
                    {/* Left Column */}
                    <div className="col-lg-8">
                        {/* Title Section */}
                        <div className="custom-card p-4 p-md-5 mb-4">
                            <div className="mb-4">
                                <h1 className="display-6 fw-bold premium-text mb-1">{hall.name}</h1>
                                <div className="text-warning small d-flex align-items-center">
                                    <Sparkles size={14} className="me-1" />
                                    <span className="text-secondary">Premium Venue</span>
                                </div>
                            </div>

                            <div className="row g-3">
                                <div className="col-md-6">
                                    <div className="d-flex align-items-start p-3 rounded-4" style={{ backgroundColor: '#eef4ff' }}>
                                        <div className="icon-box bg-primary me-3 text-white">
                                            <MapPin size={24} />
                                        </div>
                                        <div>
                                            <p className="fw-bold mb-0">Address</p>
                                            <p className="text-muted small mb-0">{hall.address}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="d-flex align-items-start p-3 rounded-4" style={{ backgroundColor: '#f5f0ff' }}>
                                        <div className="icon-box bg-purple me-3 text-white" style={{ backgroundColor: '#6f42c1' }}>
                                            <Users size={24} />
                                        </div>
                                        <div>
                                            <p className="fw-bold mb-0">Capacity</p>
                                            <p className="text-muted small mb-0">{hall.capacity} guests</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Package Details */}
                        <div className="custom-card p-4 p-md-5 mb-4">
                            <div className="d-flex align-items-center mb-4">
                                <div className="icon-box bg-success text-white me-3">
                                    <IndianRupee size={24} />
                                </div>
                                <h2 className="h3 fw-bold mb-0">Package Details</h2>
                            </div>

                            <div className="p-4 rounded-4 border border-2 border-success border-opacity-25 mb-4" style={{ backgroundColor: '#f0fff4' }}>
                                <p className="h1 fw-bold text-success mb-0">₹{hall.price.toLocaleString()}</p>
                                <p className="text-muted small mb-0">Total Package Cost</p>
                            </div>

                            <div className="border-top pt-4 mb-4">
                                <p className="fw-bold mb-3 d-flex align-items-center">
                                    <Check className="text-success me-2" size={20} /> Package Includes:
                                </p>
                                <ul className="list-unstyled row g-2">
                                    {hall.packageIncludes.map((item, index) => (
                                        <li key={index} className="col-md-6 d-flex align-items-center text-secondary">
                                            <Check size={16} className="text-success me-2" /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="p-4 rounded-4 border-2 border border-primary border-opacity-25 bg-light">
                                <p className="fw-bold text-primary mb-2">Payment Terms</p>
                                <p className="small mb-1">Pay only <strong>10% (₹{advancePayment.toLocaleString()})</strong> as advance booking.</p>
                                <p className="small text-muted mb-0">Remaining ₹{remainingPayment.toLocaleString()} to be paid offline.</p>
                            </div>

                            <button  className="btn btn-primary w-100 py-3 mt-4 rounded-4 fw-bold shadow">
                                Book Now!
                            </button>
                        </div>

                        {/* Maps */}
                        <div className="custom-card p-4">
                            <h2 className="h4 fw-bold mb-3">Location</h2>
                            <div className="rounded-4 overflow-hidden" style={{ height: '300px' }}>
                                <iframe
                                    title="location"
                                    width="100%"
                                    height="100%"
                                    frameBorder="0"
                                    src={`https://maps.google.com/maps?q=${hall.latitude},${hall.longitude}&z=15&output=embed`}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Column (Calendar) */}
                    <div className="col-lg-4">
                        <div className="custom-card p-4 sticky-top-custom">
                            <div className="d-flex align-items-center mb-3">
                                <div className="icon-box bg-primary text-white me-3 p-2">
                                    <CalendarIcon size={24} />
                                </div>
                                <h2 className="h4 fw-bold mb-0">Availability</h2>
                            </div>
                            <p className="text-muted small mb-4">Select a date to check if the hall is available.</p>
                            
                            <div className="d-flex justify-content-center border rounded-4 p-2">
                                <Calendar
                                    mode="single"
                                    selected={selectedDate}
                                    onSelect={setSelectedDate}
                                    disabled={(date) => isDateUnavailable(date) || date < new Date()}
                                />
                            </div>

                            <div className="mt-4 p-3 bg-light rounded-4">
                                <div className="d-flex align-items-center mb-2 small">
                                    <div className="bg-success rounded me-2" style={{ width: '15px', height: '15px' }}></div>
                                    <span>Available</span>
                                </div>
                                <div className="d-flex align-items-center small">
                                    <div className="bg-danger opacity-25 rounded me-2" style={{ width: '15px', height: '15px' }}></div>
                                    <span className="text-decoration-line-through">Booked</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-dark text-white py-4 mt-5">
                <div className="container text-center">
                    <p className="text-secondary small mb-0">© 2026 Function Hall Booking. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}