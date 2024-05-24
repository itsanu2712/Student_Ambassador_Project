import React from 'react';

const SeeBenefits = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-5 p-10 items-center justify-center place-items-center">
      {/* Card 1 */}
      <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center  justify-center w-full">
        <div className="flex justify-center mb-4">
          <img src="/hero_sec-trans.png" alt="Image 1" className="rounded-full h-24 w-24" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Title 1</h3>
        <p className="text-gray-600">Description for the first card goes here. It can describe the benefits of community programs in college.</p>
      </div>

      {/* Card 2 */}
      <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center  justify-center w-full">
        <div className="flex justify-center mb-4">
          <img src="/icons8-student-30.png" alt="Image 2" className="rounded-full h-24 w-24" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Title 2</h3>
        <p className="text-gray-600">Description for the second card goes here. It can describe the benefits of community programs in college.</p>
      </div>

      {/* Card 3 */}
      <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center  justify-center w-full">
        <div className="flex justify-center mb-4">
          <img src="/hero_section_background.jpg" alt="Image 3" className="rounded-full h-24 w-24" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Title 3</h3>
        <p className="text-gray-600">Description for the third card goes here. It can describe the benefits of community programs in college.</p>
      </div>
    </div>
  );
};

export default SeeBenefits;