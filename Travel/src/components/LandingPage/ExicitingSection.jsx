import { Card } from "flowbite-react";

const ExcitingSection = () => (
  <div className=" mx-auto  py-8" id="features">
    {/* Header */}
    <div className="flex flex-col items-center text-center space-y-4 mb-8 sm:flex-row sm:text-left sm:justify-between sm:items-start">
      <h2 className="text-2xl sm:text-3xl font-bold max-w-80">
        Exciting Experiences Await You!
      </h2>
      <p className="text-gray-700 text-base max-w-md">
        At TripWise, we offer tailored travel experiences to match your
        adventure goals, providing the inspiration and tools for unforgettable
        journeys.
      </p>
    </div>

    {/* Cards Section */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="transition-transform transform hover:scale-105 duration-300 ease-in-out">
        <Card>
          <h3 className="text-xl sm:text-2xl text-sky-600 font-bold leading-6">
            Destination
          </h3>
          <p className="text-gray-500 text-sm line-clamp-3 leading-0">
            Get personalized recommend for the best travel destinations based on
            your interests and location.
          </p>
        </Card>
      </div>
      <div className="transition-transform transform hover:scale-105 duration-300 ease-in-out">
        <Card>
          <h3 className="text-xl sm:text-2xl text-sky-600 font-bold">
            Travel Routes
          </h3>
          <p className="text-gray-500 text-sm line-clamp-3 ">
            Effortlessly plan your journey with the best routes, optimized for
            ease and efficiency.
          </p>
        </Card>
      </div>
      <div className="transition-transform transform hover:scale-105 duration-300 ease-in-out">
        <Card>
          <h3 className="text-xl sm:text-2xl text-sky-600 font-bold leading-6">
            Smart Assistant
          </h3>
          <p className="text-gray-500 text-sm line-clamp-3 ">
            Got questions? AI Assistant has answers. Get help anytime! We’ve got
            you covered.
          </p>
        </Card>
      </div>
      <div className="transition-transform transform hover:scale-105 duration-300 ease-in-out">
        <Card>
          <h3 className="text-xl sm:text-2xl text-sky-600 font-bold leading-6">
            Travel Videos
          </h3>
          <p className="text-gray-500 text-sm line-clamp-3 ">
            Access inspiring travel videos, expert guides, and insider tips to
            visualize and plan yours.
          </p>
        </Card>
      </div>
    </div>
  </div>
);

export default ExcitingSection;
