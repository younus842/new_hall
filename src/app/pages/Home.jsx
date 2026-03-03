import { FunctionHallCard } from "../components/FunctionHallCard";
import { functionHalls } from "../data/functionHalls";
import { Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 sm:py-16 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center justify-center mb-4">
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3 animate-pulse" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">Function Hall Booking</h1>
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 ml-2 sm:ml-3 animate-pulse" />
          </div>
          <p className="text-base sm:text-xl text-blue-100 mt-3 px-4">
            Find and book the perfect venue for your special occasion
          </p>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {functionHalls.map((hall) => (
            <FunctionHallCard key={hall.id} hall={hall} />
          ))}
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
