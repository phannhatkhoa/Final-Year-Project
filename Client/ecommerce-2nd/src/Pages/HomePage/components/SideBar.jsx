import React from 'react';

const SideBar = ({ isOpen, toggleSidebar, selectedSubcategory, setSelectedSubcategory }) => {
  const subcategories = Array.from(
    new Set(sampleProducts.map((product) => product.subcategory))
  );

  return (
    <div
      className={`sidebar ${isOpen ? 'open' : 'closed'} transition-all duration-300 ease-in-out`}
    >
      <button className="text-white bg-blue-500 px-3 py-1 rounded-md mb-4" onClick={toggleSidebar}>
        Close Menu
      </button>

      <ul className="pl-4">
        {subcategories.map((subcategory) => (
          <li key={subcategory} className="mb-2">
            <button
              onClick={() => setSelectedSubcategory(subcategory)}
              className={`text-blue-500 hover:underline ${
                selectedSubcategory === subcategory ? 'font-bold' : ''
              }`}
            >
              {subcategory}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;