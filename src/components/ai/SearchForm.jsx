import { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Search, Home, MapPin, Building, Bed, Bath, Maximize, FileText  } from 'lucide-react';

const citiesArray = [
  { key: "Lahore", value: "Lahore-1" },
  { key: "Karachi", value: "Karachi-2" },
  { key: "Islamabad", value: "Islamabad-3" },
  { key: "Rawalpindi", value: "Rawalpindi-41" },
  { key: "Abbottabad", value: "Abbottabad-385" },
  { key: "Attock", value: "Attock-1233" },
  { key: "Bahawalpur", value: "Bahawalpur-23" },
  { key: "Daska", value: "Daska-1509" },
  { key: "Chakwal", value: "Chakwal-751" },
  { key: "Dera_Ghazi_Khan", value: "Dera_Ghazi_Khan-26" },
  { key: "Faisalabad", value: "Faisalabad-16" },
  { key: "Fateh_Jang", value: "Fateh_Jang-1293" },
  { key: "Galyat", value: "Galyat-811" },
  { key: "Gharo", value: "Gharo-636" },
  { key: "Gujar_Khan", value: "Gujar_Khan-8338" },
  { key: "Gujranwala", value: "Gujranwala-327" },
  { key: "Gwadar", value: "Gwadar-389" },
  { key: "Haripur", value: "Haripur-1048" },
  { key: "Hyderabad", value: "Hyderabad-30" },
  { key: "Jamshoro", value: "Jamshoro-1178" },
  { key: "Jhelum", value: "Jhelum-19" },
  { key: "Kasur", value: "Kasur-544" },
  { key: "Lodhran", value: "Lodhran-9872" },
  { key: "Mardan", value: "Mardan-440" },
  { key: "Mirpur", value: "Mirpur-134" },
  { key: "Mirpur_Khas", value: "Mirpur_Khas-1558" },
  { key: "Multan", value: "Multan-15" },
  { key: "Murree", value: "Murree-36" },
  { key: "Naran", value: "Naran-1258" },
  { key: "Nowshera", value: "Nowshera-1424" },
  { key: "Okara", value: "Okara-47" },
  { key: "Pakpattan", value: "Pakpattan-1716" },
  { key: "Peshawar", value: "Peshawar-17" },
  { key: "Quetta", value: "Quetta-18" },
  { key: "Rahim_Yar_Khan", value: "Rahim_Yar_Khan-40" },
  { key: "Sadiqabad", value: "Sadiqabad-9538" },
  { key: "Sahiwal", value: "Sahiwal-782" },
  { key: "Sarai_Alamgir", value: "Sarai_Alamgir-1034" },
  { key: "Sargodha", value: "Sargodha-778" },
  { key: "Sheikhupura", value: "Sheikhupura-44" },
  { key: "Sialkot", value: "Sialkot-480" },
  { key: "Sukkur", value: "Sukkur-45" },
  { key: "Swat", value: "Swat-1506" },
  { key: "Upper_Dir", value: "Upper_Dir-17743" },
  { key: "Wah", value: "Wah-459" }
];


const SearchForm = ({ onSearch, isLoading }) => {
  const [searchParams, setSearchParams] = useState({
    city: 'Karachi-2',
    location : '',
    purpose: 'Buy',
    maxPrice: 2500000,
    propertyCategory: 'Homes',
    propertyType: 'House',
    area: 50,
    beds: 1,
    baths: 1
  });

  const [activeField, setActiveField] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name == 'purpose') {
      setSearchParams({
        ...searchParams,
        [name]: value,
        'maxPrice': value == 'Buy' ? buyPrices[0] : rentPrices[0]
      });
      return
    }
    if (name == 'propertyCategory') {
      setSearchParams({
        ...searchParams,
        [name]: value,
        'propertyType': propertyTypes[value][0]['value']
      });
      return
    }
    setSearchParams({
      ...searchParams,
      [name]: name === 'maxPrice' ? parseFloat(value) : value
    });
  };

  // const generateUrl = (data) => {
  //   const {
  //     purpose,
  //     maxPrice,
  //     propertyCategory,
  //     propertyType,
  //     area,
  //     beds,
  //     baths,
  //   } = data

  //   const buyCategory = {
  //     Homes: { House: 'Houses_Property', Flat: 'Flats_Apartments', Penthouse: 'Penthouse' },
  //     Plots: { Residential_Plots: 'Residential_Plots', Commercial_Plots: 'Commercial_Plots' },
  //     Commercial: { Retail_Shops: 'Retail_Shops', Offices: 'Offices' }
  //   }
  //   const rentialCategory = {
  //     Homes: { House: 'Rentals_Houses_Property', Flat: 'Rentals_Flats_Apartments', Penthouse: 'Rentals_Penthouse' },
  //     Plots: { Residential_Plots: 'Rentals_Residential_Plots', Commercial_Plots: 'Rentals_Commercial_Plots' },
  //     Commercial: { Retail_Shops: 'Rentals_Retail_Shops', Offices: 'Rentals_Offices' }
  //   }

  //   const queryParams = []
  //   if (maxPrice) queryParams.push(`price_max=${maxPrice}`)
  //   if (area) queryParams.push(`area_max=${area}`)
  //   if (propertyCategory == 'Homes') {
  //     if (baths) queryParams.push(`baths_in=${baths}`)
  //     if (beds) queryParams.push(`beds_in=${beds}`)
  //   }

  //   let query = ''
  //   if (queryParams?.length) query = '?' + queryParams?.join('&')

  //   const category = purpose == 'Buy' ? buyCategory[propertyCategory][propertyType] : rentialCategory[propertyCategory][propertyType]

  //   const url = `https://www.zameen.com/${category}/Karachi-2-1.html` + query
  //   console.log({ url })
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    // generateUrl(searchParams)
    onSearch(searchParams);
  };

  const popularCities = ['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi'];

  const handleCitySelect = (city) => {
    setSearchParams(prev => ({
      ...prev,
      city
    }));
    setActiveField(null);
  };

  const propertyTypes = {
    Homes: [
      {
        key: 'House',
        value: 'House'
      }, {
        key: 'Flat',
        value: 'Flat'
      },
      {
        key: 'Penthouse',
        value: 'Penthouse'
      }
    ],
    Plots: [
      {
        key: 'Residential Plots',
        value: 'Residential_Plots'
      },
      {
        key: 'Commercial Plots',
        value: 'Commercial_Plots'
      }
    ],
    Commercial: [
      {
        key: 'Shop',
        value: 'Retail_Shops'
      },
      {
        key: 'Offices',
        value: 'Offices'
      }
    ]
  }

  const areaSq = [50, 100, 150, 200, 250, 300, 250, 400, 450, 500, 1000, 2000, 4000]

  const buyPrices = [2500000, 5000000, 7500000, 10000000, 12500000, 15000000, 17500000, 20000000,
    22500000, 25000000, 27500000, 30000000, 35000000, 40000000, 45000000, 50000000, 60000000, 70000000, 80000000, 90000000, 100000000]

  const rentPrices = [25000, 50000, 75000, 100000, 125000, 150000, 175000, 200000, 250000, 300000, 400000, 500000]

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-lg border border-gray-100"
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6">
        <div className="p-2 bg-blue-100 rounded-lg mr-3 w-10 h-10 flex items-center justify-center">
          <Search className="h-5 w-5 text-blue-600" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Find Your Dream Property</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
        {/* City Field with Suggestions */}
        <div className="relative">
          <label htmlFor="city" className="flex items-center text-sm font-medium text-gray-700 mb-1.5">
            <MapPin className="w-4 h-4 mr-1.5 text-blue-600" />
            City
          </label>
          <div className="relative">
            {/* <input
              type="text"
              id="city"
              name="city"
              value={searchParams.city}
              onChange={handleChange}
              onFocus={() => setActiveField('city')}
              onBlur={() => setTimeout(() => setActiveField(null), 100)}
              placeholder="Enter city name (e.g., Karachi)"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-shadow text-sm sm:text-base"
              required
            />
            {activeField === 'city' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 py-2"
              >
                <p className="px-3 py-1 text-xs font-medium text-gray-500">Popular Cities</p>
                <div className="mt-1 max-h-48 overflow-y-auto">
                  {popularCities.map((city) => (
                    <div
                      key={city}
                      onClick={() => handleCitySelect(city)}
                      className="px-3 py-2 hover:bg-blue-50 cursor-pointer text-gray-700 flex items-center"
                    >
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      {city}
                    </div>
                  ))}
                </div>
              </motion.div>
            )} */}
            <select
              id="city"
              name="city"
              value={searchParams.city}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-shadow appearance-none text-sm sm:text-base"
            >
              {citiesArray?.map((val, index)=>{
                return <option  key={index} value={val?.value}>{val?.key}</option>
              })}
            </select>
          </div>
        </div>

        <div className="relative">
          <label htmlFor="location" className="flex items-center text-sm font-medium text-gray-700 mb-1.5">
            <MapPin className="w-4 h-4 mr-1.5 text-blue-600" />
            Location
          </label>
          <div className="relative">
            <input
              type="text"
              id="location"
              name="location"
              value={searchParams.location}
              onChange={handleChange}
              placeholder="Enter location name (e.g., Gulshan-e-Iqbal)"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-shadow text-sm sm:text-base"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Purpose Field */}
          <div>
            <label htmlFor="propertyCategory" className="flex items-center text-sm font-medium text-gray-700 mb-1.5">
              <FileText className="w-4 h-4 mr-1.5 text-blue-600" />
              Purpose
            </label>
            <select
              id="purpose"
              name="purpose"
              value={searchParams.purpose}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-shadow appearance-none text-sm sm:text-base"
            >
              <option value="Buy">Buy</option>
              <option value="Rent">Rent</option>
            </select>
          </div>

          {/* Property Category Field */}
          <div>
            <label htmlFor="propertyCategory" className="flex items-center text-sm font-medium text-gray-700 mb-1.5">
              <Building className="w-4 h-4 mr-1.5 text-blue-600" />
              Property Category
            </label>
            <select
              id="propertyCategory"
              name="propertyCategory"
              value={searchParams.propertyCategory}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-shadow appearance-none text-sm sm:text-base"
            >
              <option value="Homes">Homes</option>
              <option value="Plots">Plots</option>
              <option value="Commercial">Commercial</option>
            </select>
          </div>

          {/* Property Type Field */}
          <div>
            <label htmlFor="propertyType" className="flex items-center text-sm font-medium text-gray-700 mb-1.5">
              <Home className="w-4 h-4 mr-1.5 text-blue-600" />
              Property Type
            </label>
            <select
              id="propertyType"
              name="propertyType"
              value={searchParams.propertyType}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-shadow appearance-none text-sm sm:text-base"
            >
              {propertyTypes[searchParams?.propertyCategory]?.map(propertyType => {
                return <option value={propertyType?.value}>{propertyType?.key || ''}</option>
              })}
            </select>
          </div>

          {/* Areaa Field */}
          <div>
            <label htmlFor="propertyCategory" className="flex items-center text-sm font-medium text-gray-700 mb-1.5">
              <Maximize className="w-4 h-4 mr-1.5 text-blue-600" />
              Max Area (Sq. Yd.)
            </label>
            <select
              id="area"
              name="area"
              value={searchParams.area}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-shadow appearance-none text-sm sm:text-base"
            >
              {areaSq?.map(val => {
                return <option value={val}>{val}</option>
              })}
            </select>
          </div>

          {searchParams?.propertyCategory == 'Homes' && (
            <>
              {/* Beds Field */}
              <div>
                <label htmlFor="propertyCategory" className="flex items-center text-sm font-medium text-gray-700 mb-1.5">
                  <Bed className="w-4 h-4 mr-1.5 text-blue-600" />
                  Beds
                </label>
                <select
                  id="beds"
                  name="beds"
                  value={searchParams.beds}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-shadow appearance-none text-sm sm:text-base"
                >
                  {Array.from({ length: 9 }, (_, i) => i + 1)?.map(val => {
                    return <option value={val}>{val}</option>
                  })}
                  <option value='10+'>10+</option>
                </select>
              </div>


              {/* Baths Field */}
              <div>
                <label htmlFor="propertyCategory" className="flex items-center text-sm font-medium text-gray-700 mb-1.5">
                  <Bath className="w-4 h-4 mr-1.5 text-blue-600" />
                  Baths
                </label>
                <select
                  id="baths"
                  name="baths"
                  value={searchParams.baths}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-shadow appearance-none text-sm sm:text-base"
                >
                  {Array.from({ length: 5 }, (_, i) => i + 1)?.map(val => {
                    return <option value={val}>{val}</option>
                  })}
                  <option value='6+'>6+</option>
                </select>
              </div>
            </>
          )}


          {/* Price Field */}
          {/* <div>
            <label htmlFor="maxPrice" className="flex items-center text-sm font-medium text-gray-700 mb-1.5">
              <span className="w-4 h-4 mr-1.5 text-blue-600">Rs</span>
              Maximum Price
            </label>
            <div className="relative">
              <input
                type="number"
                id="maxPrice"
                name="maxPrice"
                min="0.5"
                max="50"
                step="0.1"
                value={searchParams.maxPrice}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-shadow text-sm sm:text-base"
                required
              />
              <span className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm font-medium">
                Rs
              </span>
            </div>
          </div> */}

          <div>
            <label htmlFor="maxPrice" className="flex items-center text-sm font-medium text-gray-700 mb-1.5">
              <span className="w-4 h-4 mr-1.5 text-blue-600">Rs</span>
              Maximum Price
            </label>
            <select
              id="maxPrice"
              name="maxPrice"
              value={searchParams.maxPrice}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-shadow appearance-none text-sm sm:text-base"
            >
              {
                searchParams?.purpose === 'Buy'
                  ? buyPrices?.map((val) => (
                    <option key={val} value={val}>{val.toLocaleString('en-IN')}</option>
                  ))
                  : rentPrices?.map((val) => (
                    <option key={val} value={val}>{val.toLocaleString('en-IN')}</option>
                  ))
              }

            </select>
          </div>
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          disabled={isLoading}
          className="w-full mt-2 sm:mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 font-medium shadow-lg disabled:opacity-70"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-sm sm:text-base">Searching for Properties...</span>
            </span>
          ) : (
            <span className="flex items-center justify-center">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              <span className="text-sm sm:text-base">Find Properties</span>
            </span>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

SearchForm.propTypes = {
  onSearch: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default SearchForm;