import { useNavigate } from "react-router";
import { ChevronRight, MapPin, Users, Wind, Car, UtensilsCrossed } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "react-day-picker";

export function FunctionHallCard({ hall }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/hall/${hall.id}`)}
      className="group bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="flex flex-col sm:flex-row">
        {/* Image Container with Overlay */}
        <div className="relative w-full sm:w-2/5 h-56 sm:h-auto overflow-hidden flex-shrink-0">
          <ImageWithFallback
            src={hall.images[0]}
            alt={hall.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Price Badge */}
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-lg">
            <p className="text-base sm:text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ₹{hall.price.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-4 sm:p-6 flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {hall.name}
              </h2>
              <div className="flex items-start text-gray-600 mb-2">
                <MapPin className="w-4 h-4 mr-2 mt-1 flex-shrink-0 text-blue-500" />
                <p className="text-xs sm:text-sm">{hall.address}</p>
              </div>
              <div className="flex items-center text-gray-600">
                <Users className="w-4 h-4 mr-2 flex-shrink-0 text-purple-500" />
                <p className="text-xs sm:text-sm">Capacity: {hall.capacity} guests</p>
              </div>
            </div>
            <div className="ml-4 p-2 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full group-hover:from-blue-100 group-hover:to-purple-100 transition-colors">
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Amenities */}
          <div className="flex flex-wrap gap-2 mb-4">
            {hall.amenities.airConditioned && (
              <div className="flex items-center bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200">
                <Wind className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 text-blue-600" />
                <span className="text-xs sm:text-sm font-medium text-blue-700">Air Conditioned</span>
              </div>
            )}
            {hall.amenities.parkingAvailable && (
              <div className="flex items-center bg-green-50 px-3 py-1.5 rounded-lg border border-green-200">
                <Car className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 text-green-600" />
                <span className="text-xs sm:text-sm font-medium text-green-700">Parking Available</span>
              </div>
            )}
            {hall.amenities.cateringService && (
              <div className="flex items-center bg-purple-50 px-3 py-1.5 rounded-lg border border-purple-200">
                <UtensilsCrossed className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 text-purple-600" />
                <span className="text-xs sm:text-sm font-medium text-purple-700">Catering Service</span>
              </div>
            )}
          </div>

          {/* Availability Section */}
          <div className="mt-auto">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-3 sm:p-4 rounded-xl border border-blue-100 mb-4">
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3 flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                Check Availability
              </h3>

              <div className="bg-white rounded-lg p-2 sm:p-3 shadow-sm">
                {/* Header Row: Days of the Week */}
                <div className="flex justify-between text-[10px] sm:text-xs font-semibold text-gray-500 mb-2">
                  {/* flex-1 ensures every label takes up 1/7th of the row width */}
                  <span className="flex-1 text-center">MON</span>
                  <span className="flex-1 text-center">TUE</span>
                  <span className="flex-1 text-center">WED</span>
                  <span className="flex-1 text-center">THU</span>
                  <span className="flex-1 text-center">FRI</span>
                  <span className="flex-1 text-center text-red-500">SAT</span>
                  <span className="flex-1 text-center text-red-500">SUN</span>
                </div>

                {/* Dates Row */}
                <div className="flex justify-between text-xs sm:text-sm font-medium items-center">
                  {/* We use flex-1 here too so "30" sits exactly under "MON" */}
                  <span className="flex-1 text-center text-gray-300">30</span>
                  <span className="flex-1 text-center text-gray-300">31</span>

                  {/* For dates with backgrounds, wrap the circle in a flex-1 container */}
                  <div className="flex-1 flex justify-center">
                    <span className="text-gray-900 bg-blue-50 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full transition-colors hover:bg-blue-100">
                      1
                    </span>
                  </div>

                  <div className="flex-1 flex justify-center">
                    <span className="text-gray-900 bg-blue-50 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full">
                      2
                    </span>
                  </div>

                  <div className="flex-1 flex justify-center">
                    <span className="text-gray-900 bg-blue-50 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full">
                      3
                    </span>
                  </div>

                  <div className="flex-1 flex justify-center">
                    <span className="text-gray-900 bg-blue-50 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full">
                      4
                    </span>
                  </div>

                  <div className="flex-1 flex justify-center">
                    <span className="text-gray-900 bg-blue-50 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full">
                      5
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Book Now Button */}
            <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 sm:py-3.5 rounded-xl text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
              Book Now!
            </button>

            {/* <Button/> */}
            {/* <Button variant="default"/> */}
          </div>
        </div>
      </div>
    </div>
  );
}