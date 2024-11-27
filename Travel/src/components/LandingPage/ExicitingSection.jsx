import { Card } from "flowbite-react";

const ExcitingSection = () => (
  <div className=" container-sm">
    <div>
      <div className="flex items-center mt-3 mb-6 justify-between">
        <h2 className="text-3xl font-bold max-w-80">
          Exciting Experiences Await You!
        </h2>
        <p className="text-base text-gray-900 font-normal w-[400px]">
          At TripWise, we offer tailored travel experiences to match your
          adventure goals, providing the inspiration and tools for unforgettable
          journeys
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="transition-transform transform hover:scale-105 duration-300 ease-in-out">
          <Card>
            <h3 className="text-2xl text-sky-900 font-bold leading-5 ">
              Destination
            </h3>
            <p className="text-gray-500">
              Get personalized recommend for the best travel destinations based
              on your interests and location.
            </p>
          </Card>
        </div>
        <div className="transition-transform transform hover:scale-105 duration-300 ease-in-out">
          <Card>
            <h3 className="text-2xl text-sky-900 font-bold leading-5">
              Travel Routes
            </h3>
            <p className="text-gray-500">
              Effortlessly plan your journey with the best routes, optimized for
              ease and efficiency.
            </p>
          </Card>
        </div>
        <div className="transition-transform transform hover:scale-105 duration-300 ease-in-out">
          <Card>
            <h3 className="text-2xl text-sky-900 font-bold leading-5">
              Smart Assistant
            </h3>
            <p className="text-gray-500">
              Got questions? Our AI Assistant has answers. Get help anytime!
              we’ve got you covered.
            </p>
          </Card>
        </div>
        <div className="transition-transform transform hover:scale-105 duration-300 ease-in-out">
          <Card>
            <h3 className="text-2xl text-sky-900 font-bold leading-5">
              Travel Videos
            </h3>
            <p className="text-gray-500">
              Access inspiring travel videos, expert guides, and insider tips to
              visualize and plan yours.
            </p>
          </Card>
        </div>
      </div>
    </div>
  </div>
);

export default ExcitingSection;
