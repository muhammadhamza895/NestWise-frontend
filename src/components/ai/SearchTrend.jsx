import { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Search, Home, MapPin, Building, Bed, Bath, Maximize, FileText } from 'lucide-react';

const citiesArray = [
    { key: "Lahore", value: "lahore-1" },
    { key: "Karachi", value: "karachi-2" },
    { key: "Islamabad", value: "islamabad-3" },
    { key: "Rawalpindi", value: "rawalpindi-41" },
    { key: "Faisalabad", value: "faisalabad-16" },
    { key: "Gujranwala", value: "gujranwala-327" },
    { key: "Multan", value: "multan-15" },
];


const SearchTrend = ({ onSearch, isTrendLoading }) => {
    const [searchParams, setSearchParams] = useState({
        city: 'karachi-2',
        purpose: 'Buy',
    });


    const handleChange = (e) => {
        const { name, value } = e.target;

        setSearchParams({
            ...searchParams,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchParams);
    };

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
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Find latest trending locations</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                {/* City Field with Suggestions */}
                <div className="relative">
                    <label htmlFor="city" className="flex items-center text-sm font-medium text-gray-700 mb-1.5">
                        <MapPin className="w-4 h-4 mr-1.5 text-blue-600" />
                        City
                    </label>
                    <div className="relative">
                        <select
                            id="city"
                            name="city"
                            value={searchParams.city}
                            onChange={handleChange}
                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-shadow appearance-none text-sm sm:text-base"
                        >
                            {citiesArray?.map((val, index) => {
                                return <option key={index} value={val?.value}>{val?.key}</option>
                            })}
                        </select>
                    </div>
                </div>

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

                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    disabled={isTrendLoading}
                    className="w-full mt-2 sm:mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 font-medium shadow-lg disabled:opacity-70"
                >
                    {isTrendLoading ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span className="text-sm sm:text-base">Finding Trending Locations...</span>
                        </span>
                    ) : (
                        <span className="flex items-center justify-center">
                            <Search className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                            <span className="text-sm sm:text-base">Find Trending Locations</span>
                        </span>
                    )}
                </motion.button>
            </form>
        </motion.div>
    );
};

SearchTrend.propTypes = {
    onSearch: PropTypes.func,
    isTrendLoading: PropTypes.bool,
};

export default SearchTrend;