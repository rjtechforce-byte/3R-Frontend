import { useContext, useState, useEffect, useRef } from "react";
import Item from "../components/Item";
import HomeVideo from "../components/HomeVideo";
import DetailCard from "../components/DetailCard";
import Slidebar from "../components/Slidebar";
import { ImSpinner10 } from "react-icons/im";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiArrowDropUpLine } from "react-icons/ri";
import { MdDashboard, MdCheckroom, MdSports, MdBook, MdBackpack } from "react-icons/md";
import { AllProductsData } from "../context/AllProducts";
import { getSchoolProducts, getAllSchool } from "../components/form/api";
import { getThumbnailUrl, getImageUrl } from "../utils/fileUtils";
import { Icon } from "@iconify/react";

function Home() {
  const [productData, setproductData] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const selectedSchool = useRef([]);

  const schoolName = localStorage.getItem("schoolName");
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const schoolsRes = await getAllSchool();
        const schools = Array.isArray(schoolsRes) ? schoolsRes : schoolsRes?.data || [];
        
        const rawSchoolName = localStorage.getItem("schoolName");
        const storedSchoolName = rawSchoolName ? rawSchoolName.replace(/^"|"$/g, '').trim() : "";
        
        const currentSchool = schools.find(
          (item) => item.schoolName && item.schoolName.trim().toLowerCase() === storedSchoolName.toLowerCase()
        );
        selectedSchool.current = currentSchool;

        if (currentSchool) {
          const res = await getSchoolProducts(currentSchool._id);
          console.log("Products API Response:", res);
          let products = [];
          if (Array.isArray(res)) products = res;
          else if (res?.data && Array.isArray(res.data)) products = res.data;
          else if (res?.products && Array.isArray(res.products)) products = res.products;
          
          const availableProducts = products.filter((item) => item.availability);
          
          setAllProducts(availableProducts);
          setproductData(availableProducts);
        } else {
          console.log("School not found. Searched for:", storedSchoolName);
          console.log("Available schools:", schools.map(s => s.schoolName));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [schoolName]);

  const dummyData = useContext(AllProductsData);
  const [openDrop, setDrop] = useState(false);
  const openDropdown = () => {
    setDrop(!openDrop);
  };

  const [search, setSearch] = useState("");
  const [data, setData] = useState(dummyData);
  const [detailCard, setdetailCard] = useState({
    imgUrl: "",
    name: "",
    category: "",
    description: "",
    schoolName: "",
  });
  const { contextSafe } = useGSAP();
  const fun = contextSafe(() => {
    gsap.to(".cardOfDetailProduct", {
      display: "flex",
      opacity: 1,
    });
  });

  gsap.registerPlugin(useGSAP);

  const handleInput = (event) => {
    const newSearch = event.target.value;

    setSearch(newSearch);

    const newdata = allProducts.filter((item) => {
      const name = item.title || item.name || "";
      return name.toLowerCase().includes(newSearch.toLowerCase());
    });

    setproductData(newdata);
  }
  const handleClick = (e) => {
    document.body.classList.add("no-scroll");

    const detailId = e.target.id;

    productData.forEach((item) => {
      if (detailId === item._id) {
        setdetailCard(item);
        console.log(detailCard, item);
      }
    });

    fun();
  };

  const handleCategoryClick = (category) => {
    setSearch("");
    if (category === "ALL") {
      setproductData(allProducts);
      return;
    } else {
      let newdata = allProducts.filter(
        (item) => item.category && item.category.toUpperCase() === category.toUpperCase()
      );
      setproductData(newdata);
    }
  };

  return (
    <>
      <Slidebar />
      <div
        ref={productData}
        className="bg-linear-to-br from-emerald-50 via-green-50 to-teal-50 text-3xl sm:text-4xl md:text-5xl relative overflow-hidden"
      >
       
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-10 -right-10 w-72 h-72 bg-linear-to-br from-emerald-200/30 to-green-300/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-linear-to-tr from-teal-200/20 to-emerald-300/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="flex flex-col w-full bg-white/80 backdrop-blur-md min-h-screen p-4 rounded-t-3xl relative shadow-2xl">
          <div className="flex items-center lg:flex-row flex-col justify-around">
            <div className="flex sm:self-stretch flex-col pr-20">
              <div className="max-md:w-full relative mx-auto group">
                <input
                  className="bg-white/95 backdrop-blur-sm w-full max-md:w-full lg:w-[500px] text-3xl p-6 h-16 m-10 shadow-xl rounded-2xl border border-emerald-200/50 focus:outline-none focus:ring-4 focus:ring-emerald-200/50 focus:border-emerald-400 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-emerald-200/30 placeholder:text-emerald-300"
                  value={search}
                  placeholder="Search products..."
                  onChange={handleInput}
                />
                <div className="absolute inset-0 bg-linear-to-r from-emerald-400/10 to-green-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            <div className="text-green-800 flex 2xl:hidden flex-col justify-center right-1 items-center">
              {!openDrop && (
                <div
                  onClick={openDropdown}
                  className="text-3xl font-serif font-semibold mb-10 flex items-center cursor-pointer group transition-all duration-300 hover:text-emerald-700"
                >
                  <h1 className="bg-linear-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent group-hover:from-emerald-700 group-hover:to-green-700">Sort Products</h1>
                  <RiArrowDropDownLine size={50} className="text-emerald-600 group-hover:text-emerald-700 transition-colors duration-300" />
                </div>
              )}

              {openDrop && (
                <div
                  onClick={openDropdown}
                  className="text-3xl lg:hidden top-0 font-serif font-semibold flex items-center cursor-pointer group transition-all duration-300 hover:text-emerald-700"
                >
                  <h1 className="bg-linear-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent group-hover:from-emerald-700 group-hover:to-green-700">Sort Products</h1>
                  <RiArrowDropUpLine size={50} className="text-emerald-600 group-hover:text-emerald-700 transition-colors duration-300" />
                </div>
              )}

              {openDrop ? (
                <div className="ease-in duration-1000">
                  <div className="flex justify-center py-6 items-center bg-white rounded-2xl shadow-sm border border-gray-100 mb-8 mx-4">
                    <div className="flex flex-wrap gap-3 justify-center max-w-sm">
                      <div onClick={() => handleCategoryClick("ALL")} className="group px-4 py-3 bg-white hover:bg-emerald-50 rounded-xl text-emerald-700 hover:text-emerald-800 font-semibold text-sm transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-110 border border-emerald-200 hover:border-emerald-300 backdrop-blur-sm">
                        <span className="relative z-10 flex items-center gap-3">
                          <MdDashboard className="text-emerald-600 group-hover:text-emerald-700 transition-colors duration-300" size={16} />
                          ALL ITEMS
                        </span>
                      </div>
                      <div onClick={() => handleCategoryClick("Clothes")} className="group px-4 py-3 bg-white hover:bg-blue-50 rounded-xl text-blue-700 hover:text-blue-800 font-semibold text-sm transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-110 border border-blue-200 hover:border-blue-300 backdrop-blur-sm">
                        <span className="relative z-10 flex items-center gap-3">
                          <MdCheckroom className="text-blue-600 group-hover:text-blue-700 transition-colors duration-300" size={16} />
                          CLOTHES
                        </span>
                      </div>
                      <div onClick={() => handleCategoryClick("Footwear")} className="group px-4 py-3 bg-white hover:bg-purple-50 rounded-xl text-purple-700 hover:text-purple-800 font-semibold text-sm transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-110 border border-purple-200 hover:border-purple-300 backdrop-blur-sm">
                        <span className="relative z-10 flex items-center gap-3">
                          <Icon icon="hugeicons:running-shoes" width="20px" height="20px" className="text-purple-600 group-hover:text-purple-700 transition-colors duration-300" size={16} />
                          FOOTWEAR
                        </span>
                      </div>
                      <div onClick={() => handleCategoryClick("Stationary")} className="group px-4 py-3 bg-white hover:bg-amber-50 rounded-xl text-amber-700 hover:text-amber-800 font-semibold text-sm transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-110 border border-amber-200 hover:border-amber-300 backdrop-blur-sm">
                        <span className="relative z-10 flex items-center gap-3">
                          <MdBook className="text-amber-600 group-hover:text-amber-700 transition-colors duration-300" size={16} />
                          STATIONARY
                        </span>
                      </div>
                      <div onClick={() => handleCategoryClick("Bag")} className="group px-4 py-3 bg-white hover:bg-teal-50 rounded-xl text-teal-700 hover:text-teal-800 font-semibold text-sm transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-110 border border-teal-200 hover:border-teal-300 backdrop-blur-sm">
                        <span className="relative z-10 flex items-center gap-3">
                          <MdBackpack className="text-teal-600 group-hover:text-teal-700 transition-colors duration-300" size={16} />
                          BAGS
                        </span>
                      </div>
                    </div>
                    {openDrop && (
                      <div
                        onClick={openDropdown}
                        className="absolute top-4 right-4 rounded-full shadow-[2px_4px_10px_4px_#b6b4b4] text-green-800 cursor-pointer z-20"
                      >
                        <RiArrowDropUpLine size={30} />
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="overflow-y-hidden fixed z-10 top-[-1500%] w-fit flex items-center justify-center flex-col gap-10 ease-in duration-1000"></div>
              )}
            </div>
          </div>
          <div className="relative text-center mb-8">
            <h2 className="text-center md:text-6xl text-3xl font-bold font-serif relative z-10">
              <span className="bg-linear-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent">
                Available Products
              </span>
            </h2>
            <div className="absolute inset-0 bg-linear-to-r from-emerald-400/20 to-teal-400/20 blur-2xl transform scale-110"></div>
            <div className="h-1 w-32 bg-linear-to-r from-emerald-500 to-teal-500 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="2xl:flex justify-center hidden gap-12 items-center py-8 mb-5">
            <div onClick={() => handleCategoryClick("ALL")} className="group cursor-pointer transition-all duration-300 hover:scale-105">
              <div className="relative px-6 py-3 bg-white hover:bg-emerald-50 rounded-2xl text-emerald-700 hover:text-emerald-800 font-semibold text-sm tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 border border-emerald-200 hover:border-emerald-300 backdrop-blur-sm">
                <span className="relative z-10 flex items-center gap-3">
                  <MdDashboard className="text-emerald-600 group-hover:text-emerald-700 transition-colors duration-300" size={18} />
                  ALL ITEMS
                </span>
              </div>
            </div>

            <div onClick={() => handleCategoryClick("Clothes")} className="group cursor-pointer transition-all duration-300 hover:scale-105">
              <div className="relative px-6 py-3 bg-white hover:bg-blue-50 rounded-2xl text-blue-700 hover:text-blue-800 font-semibold text-sm tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-200 hover:border-blue-300 backdrop-blur-sm">
                <span className="relative z-10 flex items-center gap-3">
                  <MdCheckroom className="text-blue-600 group-hover:text-blue-700 transition-colors duration-300" size={18} />
                  CLOTHES
                </span>
              </div>
            </div>

            <div onClick={() => handleCategoryClick("Footwear")} className="group cursor-pointer transition-all duration-300 hover:scale-105">
              <div className="relative px-6 py-3 bg-white hover:bg-purple-50 rounded-2xl text-purple-700 hover:text-purple-800 font-semibold text-sm tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-200 hover:border-purple-300 backdrop-blur-sm">
                <span className="relative z-10 flex items-center gap-3">
                  <Icon icon="hugeicons:running-shoes" width="20px" height="20px" className="text-purple-600 group-hover:text-purple-700 transition-colors duration-300" size={18} />
                  FOOTWEAR
                </span>
              </div>
            </div>

            <div onClick={() => handleCategoryClick("Stationary")} className="group cursor-pointer transition-all duration-300 hover:scale-105">
              <div className="relative px-6 py-3 bg-white hover:bg-amber-50 rounded-2xl text-amber-700 hover:text-amber-800 font-semibold text-sm tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 border border-amber-200 hover:border-amber-300 backdrop-blur-sm">
                <span className="relative z-10 flex items-center gap-3">
                  <MdBook className="text-amber-600 group-hover:text-amber-700 transition-colors duration-300" size={18} />
                  STATIONARY
                </span>
              </div>
            </div>

            <div onClick={() => handleCategoryClick("Bag")} className="group cursor-pointer transition-all duration-300 hover:scale-105">
              <div className="relative px-6 py-3 bg-white hover:bg-teal-50 rounded-2xl text-teal-700 hover:text-teal-800 font-semibold text-sm tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 border border-teal-200 hover:border-teal-300 backdrop-blur-sm">
                <span className="relative z-10 flex items-center gap-3">
                  <MdBackpack className="text-teal-600 group-hover:text-teal-700 transition-colors duration-300" size={18} />
                  BAGS
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-5 justify-center px-4">
            {loading ? (
              <div className="mt-[10vh] flex flex-col items-center">
                <div className="relative">
                  <div className="text-6xl text-emerald-600 font-bold my-7">
                    <ImSpinner10 className="animate-spin" />
                  </div>
                  <div className="absolute inset-0 bg-linear-to-r from-emerald-400/20 to-green-400/20 rounded-full blur-xl animate-pulse"></div>
                </div>
                <h3 className="text-2xl font-bold bg-linear-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                  Loading Products...
                </h3>
              </div>
            ) : productData.length > 0 ? (
              productData.map((item) => {
                return (
                  <Item
                    category={item.category}
                    name={item.title || item.name}
                    imgUrl={getThumbnailUrl(item.thumbnail)}
                    schoolName={item.schoolName}
                    key={item._id}
                    id={item._id}
                    goodsData={dummyData}
                    handleClick={handleClick}
                    availability={item.availability ? "Available" : "Unavailable"}
                  />
                );
              })
            ) : (
              <div className="text-center my-16">
                <div className="relative inline-block">
                  <div className="text-6xl mb-6">🔍</div>
                  <div className="absolute inset-0 bg-linear-to-r from-emerald-400/10 to-green-400/10 rounded-full blur-2xl animate-pulse"></div>
                </div>
                <h1 className="text-4xl font-bold bg-linear-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-4">
                  No Products Found
                </h1>
                <p className="text-xl text-gray-600 max-w-md mx-auto">
                  We couldn't find any products matching your criteria. Try adjusting your search or filter settings.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <DetailCard
        detailCard={{
          imgUrl: getThumbnailUrl(detailCard.thumbnail),
          imgUrl2: getImageUrl(detailCard.images),
          category: detailCard.category,
          name: detailCard.title,
          description: detailCard.description,
          donor: detailCard.donorName,
          availability: detailCard.availability,
          donorClass: detailCard.donorClass,
          condition: detailCard.condition,
        }}
      />
    </>
  );
}

export default Home;
