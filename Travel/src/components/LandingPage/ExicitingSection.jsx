import { Card } from "flowbite-react";

const ExcitingSection = () => (
  <div className="py-12">
    <div>
      <div className="flex items-center my-5 justify-between">
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
            <h3 className="text-2xl text-sky-900 font-bold leading-5">200+</h3>
            <h3 className="text-2xl text-sky-900 font-bold leading-5">
              Amazing Destination
            </h3>
            <p className="text-gray-500">
              From coastlines to mountains, vibrant cities to serene villages,
              explore the diverse cultures and landscapes of Indonesia
            </p>
          </Card>
        </div>
        <div className="transition-transform transform hover:scale-105 duration-300 ease-in-out">
          <Card>
            <h3 className="text-2xl text-sky-900 font-bold leading-5">34</h3>
            <h3 className="text-2xl text-sky-900 font-bold leading-5">
              Provinces
            </h3>
            <p className="text-gray-500">
              From coastlines to mountains, vibrant cities to serene villages,
              explore the diverse cultures and landscapes of Indonesia
            </p>
          </Card>
        </div>
        <div className="transition-transform transform hover:scale-105 duration-300 ease-in-out">
          <Card>
            <h3 className="text-2xl text-sky-900 font-bold leading-5">300+</h3>
            <h3 className="text-2xl text-sky-900 font-bold leading-5">
              Flexible Routes
            </h3>
            <p className="text-gray-500">
              From coastlines to mountains, vibrant cities to serene villages,
              explore the diverse cultures and landscapes of Indonesia
            </p>
          </Card>
        </div>
        <div className="transition-transform transform hover:scale-105 duration-300 ease-in-out">
          <Card>
            <h3 className="text-2xl text-sky-900 font-bold leading-5">500+</h3>
            <h3 className="text-2xl text-sky-900 font-bold leading-5">
              Interactive Videos
            </h3>
            <p className="text-gray-500">
              From coastlines to mountains, vibrant cities to serene villages,
              explore the diverse cultures and landscapes of Indonesia
            </p>
          </Card>
        </div>
      </div>
    </div>
  </div>
);

export default ExcitingSection;
