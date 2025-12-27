import { Link } from "react-router-dom";

export default function Item({
  imgUrl,
  category,
  name,
  description,
  schoolName,
  goodsData,
  id,
  handleClick,
  availability,
 
}) {
  console.log(name, imgUrl);
  
  
  const getStatusBadge = (status) => {
    if (status.toLowerCase() === 'available') {
      return (
        <span className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          {status}
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          {status}
        </span>
      );
    }
  };

  
  const getCategoryColor = (cat) => {
    const colors = {
      'clothes': 'bg-blue-100 text-blue-700',
      'footwear': 'bg-purple-100 text-purple-700', 
      'stationary': 'bg-amber-100 text-amber-700',
      'bag': 'bg-teal-100 text-teal-700',
      'default': 'bg-gray-100 text-gray-700'
    };
    return colors[cat?.toLowerCase()] || colors['default'];
  };

  return (
    <div className="group perspective-1000">
      <div 
        id={`${id}`} 
        className="relative w-[350px] bg-white rounded-3xl shadow-lg hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 overflow-hidden border border-gray-100 hover:border-emerald-200 backdrop-blur-sm"
      >
        
        <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-bl from-emerald-100/30 to-transparent rounded-full transform translate-x-8 -translate-y-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-linear-to-tr from-teal-100/30 to-transparent rounded-full transform -translate-x-6 translate-y-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-150"></div>
        
        
        <div className="relative overflow-hidden rounded-t-3xl">
          <img
            className="w-full h-64 object-contain bg-linear-to-br from-gray-50 to-emerald-50/30 p-6 group-hover:scale-110 transition-transform duration-700"
            src={imgUrl || 'https://via.placeholder.com/400x300?text=No+Image'}
            alt={name}
            onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/400x300?text=No+Image'; }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          
          <div className="absolute top-4 right-4">
            {getStatusBadge(availability)}
          </div>
        </div>
        
        
        <div className="p-6 flex flex-col gap-4">
         
          <div className="flex items-center justify-between">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(category)}`}>
              <div className="w-1.5 h-1.5 bg-current rounded-full mr-2"></div>
              {category}
            </span>
          </div>
          
          
          <h3 className="text-xl font-bold text-gray-800 leading-tight group-hover:text-emerald-700 transition-colors duration-300">
            {name}
          </h3>
          
         
          {schoolName && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
              <span className="font-medium">From: {schoolName}</span>
            </div>
          )}
          
          
          <div className="pt-2">
            <button 
              onClick={handleClick}
              id={`${id}`}
              className="w-full bg-linear-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-medium py-2 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-sm"
            >
              View Details
            </button>
          </div>
        </div>
        
        
        <div className="h-1 bg-linear-to-r from-emerald-400 via-green-400 to-teal-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
      </div>
    </div>
  );
}
