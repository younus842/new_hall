import { useParams, useNavigate } from "react-router";
import { useState } from "react";
import Slider from "react-slick";
import { Calendar } from "../components/ui/calendar";
import { ArrowLeft, MapPin, Users, IndianRupee, Check, Calendar as CalendarIcon, Sparkles } from "lucide-react";
import { functionHalls } from "../data/functionHalls";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export default function FunctionHallDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const hall = functionHalls.find((h) => h.id === id);

  if (!hall) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
        <div className="text-center bg-white p-8 sm:p-12 rounded-2xl shadow-2xl max-w-md w-full">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">Function Hall Not Found</h2>
          <button
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
          >
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
    arrows: true,
    dotsClass: "slick-dots custom-dots",
  };

  const advancePayment = Math.round(hall.price * 0.1);
  const remainingPayment = hall.price - advancePayment;

  const isDateUnavailable = (date) => {
    return hall.unavailableDates.some(
      (unavailableDate) =>
        unavailableDate.getDate() === date.getDate() &&
        unavailableDate.getMonth() === date.getMonth() &&
        unavailableDate.getFullYear() === date.getFullYear()
    );
  };

  const handleBookNow = () => {
    alert(
      `🎉 Booking Details\n\n` +
      `Hall: ${hall.name}\n` +
      `Total Price: ₹${hall.price.toLocaleString()}\n\n` +
      `💳 Advance Payment (10%): ₹${advancePayment.toLocaleString()}\n` +
      `💰 Remaining Payment (offline): ₹${remainingPayment.toLocaleString()}\n\n` +
      `Proceeding to payment gateway...`
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Back Button */}
      <div className="bg-white shadow-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center text-gray-600 hover:text-blue-600 transition-colors group"
          >
            <div className="p-1.5 sm:p-2 bg-gray-100 rounded-full group-hover:bg-blue-50 transition-colors mr-2">
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="text-sm sm:text-base font-medium">Back to Home</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Image Carousel */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden mb-6 sm:mb-8">
          <style>{`
            .custom-dots {
              bottom: 12px;
            }
            .custom-dots li button:before {
              font-size: 10px;
              color: white;
              opacity: 0.5;
            }
            .custom-dots li.slick-active button:before {
              color: white;
              opacity: 1;
            }
            .slick-prev, .slick-next {
              z-index: 10;
              width: 36px;
              height: 36px;
            }
            .slick-prev {
              left: 12px;
            }
            .slick-next {
              right: 12px;
            }
            .slick-prev:before, .slick-next:before {
              font-size: 36px;
              opacity: 0.75;
            }
            .slick-prev:hover:before, .slick-next:hover:before {
              opacity: 1;
            }
            @media (min-width: 640px) {
              .custom-dots {
                bottom: 20px;
              }
              .custom-dots li button:before {
                font-size: 12px;
              }
              .slick-prev, .slick-next {
                width: 48px;
                height: 48px;
              }
              .slick-prev {
                left: 24px;
              }
              .slick-next {
                right: 24px;
              }
              .slick-prev:before, .slick-next:before {
                font-size: 48px;
              }
            }
          `}</style>
          <Slider {...sliderSettings}>
            {hall.images.map((image, index) => (
              <div key={index} className="relative">
                <ImageWithFallback
                  src={image}
                  alt={`${hall.name} - Image ${index + 1}`}
                  className="w-full h-64 sm:h-96 md:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            ))}
          </Slider>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Left Column - Main Details */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Hall Information */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-8 border border-gray-100">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    {hall.name}
                  </h1>
                  <div className="flex items-center text-gray-500 text-xs sm:text-sm">
                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-yellow-500" />
                    <span>Premium Venue</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="flex items-start p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl sm:rounded-2xl">
                  <div className="p-2 sm:p-3 bg-blue-500 rounded-lg sm:rounded-xl mr-3 sm:mr-4 flex-shrink-0">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Address</p>
                    <p className="text-gray-600 text-xs sm:text-sm">{hall.address}</p>
                  </div>
                </div>
                
                <div className="flex items-start p-4 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl sm:rounded-2xl">
                  <div className="p-2 sm:p-3 bg-purple-500 rounded-lg sm:rounded-xl mr-3 sm:mr-4 flex-shrink-0">
                    <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Capacity</p>
                    <p className="text-gray-600 text-xs sm:text-sm">{hall.capacity} guests</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Package Details */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-8 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="p-2 sm:p-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg sm:rounded-xl mr-3 sm:mr-4 flex-shrink-0">
                  <IndianRupee className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Package Details</h2>
              </div>
              
              <div className="mb-6 p-4 sm:p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl sm:rounded-2xl border-2 border-green-200">
                <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  ₹{hall.price.toLocaleString()}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">Total Package Cost</p>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <p className="font-semibold mb-4 text-gray-900 flex items-center text-sm sm:text-base">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-600" />
                  Package Includes:
                </p>
                <ul className="space-y-2 sm:space-y-3">
                  {hall.packageIncludes.map((item, index) => (
                    <li key={index} className="flex items-start group">
                      <div className="p-1 sm:p-1.5 bg-green-100 rounded-lg mr-2 sm:mr-3 group-hover:bg-green-200 transition-colors flex-shrink-0">
                        <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                      </div>
                      <span className="text-gray-700 group-hover:text-gray-900 transition-colors text-sm sm:text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl border-2 border-blue-200">
                <div className="flex items-start">
                  <div className="p-1.5 sm:p-2 bg-blue-500 rounded-lg mr-2 sm:mr-3 flex-shrink-0">
                    <IndianRupee className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-blue-900 mb-2 text-sm sm:text-base">Payment Terms</p>
                    <p className="text-xs sm:text-sm text-blue-800">
                      Pay only <span className="font-bold text-base sm:text-lg">10%</span> (₹{advancePayment.toLocaleString()}) 
                      as advance booking amount.
                    </p>
                    <p className="text-xs sm:text-sm text-blue-800 mt-1">
                      Remaining <span className="font-bold">₹{remainingPayment.toLocaleString()}</span> to 
                      be paid offline at the time of function.
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleBookNow}
                className="w-full mt-6 sm:mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                Book Now!
              </button>
            </div>

            {/* Google Maps */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-8 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="p-2 sm:p-3 bg-gradient-to-br from-red-400 to-pink-500 rounded-lg sm:rounded-xl mr-3 sm:mr-4 flex-shrink-0">
                  <MapPin className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Location</h2>
              </div>
              <div className="w-full h-64 sm:h-96 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border-2 border-gray-200">
                <iframe
                  title={`${hall.name} Location`}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0 }}
                  src={`https://www.google.com/maps?q=${hall.latitude},${hall.longitude}&z=15&output=embed`}
                  allowFullScreen
                />
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${hall.latitude},${hall.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center mt-4 sm:mt-5 text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors text-sm sm:text-base"
              >
                <MapPin className="w-4 h-4 mr-2" />
                Open in Google Maps →
              </a>
            </div>
          </div>

          {/* Right Column - Calendar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-8 border border-gray-100 lg:sticky lg:top-8">
              <div className="flex items-center mb-6">
                <div className="p-2 sm:p-3 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg sm:rounded-xl mr-3 sm:mr-4 flex-shrink-0">
                  <CalendarIcon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Availability</h2>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mb-6">
                Select a date to check if the hall is available
              </p>
              
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => isDateUnavailable(date) || date < new Date()}
                  className="rounded-xl border-2 border-gray-200 p-3 sm:p-4 w-full"
                  modifiers={{
                    booked: hall.unavailableDates,
                  }}
                  modifiersStyles={{
                    booked: {
                      backgroundColor: "#fee2e2",
                      color: "#991b1b",
                      textDecoration: "line-through",
                    },
                  }}
                />
              </div>
              
              <div className="mt-6 p-3 sm:p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl space-y-3">
                <div className="flex items-center text-xs sm:text-sm">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-green-200 to-green-300 rounded-md mr-3 border border-green-400 flex-shrink-0"></div>
                  <span className="text-gray-700 font-medium">Available</span>
                </div>
                <div className="flex items-center text-xs sm:text-sm">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-red-200 to-red-300 rounded-md mr-3 border border-red-400 flex-shrink-0"></div>
                  <span className="text-gray-700 font-medium">Booked</span>
                </div>
              </div>
              
              {selectedDate && !isDateUnavailable(selectedDate) && (
                <div className="mt-6 p-4 sm:p-5 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl shadow-sm">
                  <div className="flex items-start">
                    <div className="p-1.5 sm:p-2 bg-green-500 rounded-lg mr-2 sm:mr-3 flex-shrink-0">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-green-900 mb-1">Available!</p>
                      <p className="text-xs text-green-800">
                        {selectedDate.toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {selectedDate && isDateUnavailable(selectedDate) && (
                <div className="mt-6 p-4 sm:p-5 bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-300 rounded-xl shadow-sm">
                  <div className="flex items-start">
                    <div className="p-1.5 sm:p-2 bg-red-500 rounded-lg mr-2 sm:mr-3 flex-shrink-0">
                      <span className="text-white text-base sm:text-lg">✗</span>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-red-900 mb-1">Not Available</p>
                      <p className="text-xs text-red-800">
                        {selectedDate.toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-6 sm:py-8 mt-12 sm:mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center">
          <p className="text-sm sm:text-base text-gray-400">© 2026 Function Hall Booking. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
