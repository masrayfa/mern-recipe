import React, { useContext, useEffect, useState, useRef } from "react";
import { Posts } from "../../dummyData";
import { FiSearch } from "react-icons/fi";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { useRecoilState, atom, useRecoilValue } from "recoil";
import { detailState } from "../../atoms/detailAtom";
import axios from "axios";
import { modalState } from "../../atoms/modalAtom";
import Modal from "../../components/modal/Modal";
import { CircularProgress } from "@mui/material";

const Home = (props) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const { user } = useContext(AuthContext);

  const [showDetail, setShowDetail] = useRecoilState(detailState);
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [rowRecipes, setRowRecipes] = useState(null);

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await axios.get(
        "http://localhost:7000/api/posts/feed/all"
      );

      // .then((response) => {
      //   // console.log(response.data[0].tools);
      // });
      console.log("Row Recipes: " + rowRecipes);
      setRowRecipes(response.data);
      console.log(response.data);
    };

    fetchAPI();
  }, []);

  const categoriesIcon = 4;

  return (
    <div className="bg-[#f6eedf] h-screen w-screen overflow-visible">
      <header className="pb-14">
        <div className="bg-white flex items-center drop-shadow justify-between">
          <h1 className="text-[#d63447] text-4xl font-black m-7">Cookedge</h1>
          <div className="justify-center space-x-5 items-center pr-16 ">
            {user ? (
              <button
                className="font-medium text-xl"
                onClick={() => {
                  return setShowModal(true);
                }}
              >
                Add Recipe
              </button>
            ) : null}

            {user ? (
              <button className=" rounded-full outline outline-2  outline-[#d63447]  text-black font-medium px-3 py-1 text-xl ">
                Logout
              </button>
            ) : (
              <Link to="/register">
                <button className=" rounded-full outline outline-2  outline-[#d63447]  text-black font-medium px-3 py-1 text-xl ">
                  Sign up
                </button>
              </Link>
            )}

            {user ? (
              <button className="rounded-full outline outline-2  items-center justify-center  text-white bg-[#d63447] font-medium px-3 py-1 text-xl ">
                {user.username}
              </button>
            ) : (
              <Link to="/login">
                <button className="rounded-full outline outline-2  items-center justify-center  text-white bg-[#d63447] font-medium px-3 py-1 text-xl ">
                  Log in
                </button>
              </Link>
            )}
          </div>
        </div>
      </header>
      <main>
        <div className="bg-[#d63447] rounded-lg flex w-[45vw] mx-auto h-14">
          <form className="flex ml-6 items-center ">
            <FiSearch className="text-white"></FiSearch>
            <input
              className="text-white bg-transparent focus:outline-none placeholder:text-white ml-8 "
              type="text"
              placeholder="Search"
            />
          </form>
        </div>
        <p className=" flex justify-center items-center my-6 text-center text-2xl">
          Categories
        </p>
        <div className="flex mx-auto justify-center my-7  ">
          <div className="flex-col mr-11 items-center">
            <div className="bg-white object-cover rounded-full p-3">
              <img src={PF + "indonesia-flag.png"}></img>
            </div>
            <p>Indonesia</p>
          </div>
          <div className="flex-col mr-11 flex items-center">
            <div className="bg-white object-cover rounded-full p-3">
              <img src={PF + "usa-flag.png"}></img>
            </div>
            <p>Western</p>
          </div>
          <div className="flex-col mr-11 items-center flex">
            <div className="bg-white object-cover rounded-full p-3">
              <img src={PF + "china-flag.png"}></img>
            </div>
            <p>China</p>
          </div>
          <div className="flex-col mr-11 items-center flex">
            <div className="bg-white object-cover rounded-full p-3">
              <img src={PF + "korea-flag.png"}></img>
            </div>
            <p>Korean</p>
          </div>
        </div>
        <div>
          <div className=" flex flex-col bg-white rounded-lg w-[65%] mx-auto h-[48vh] shadow-md ">
            <div className="md:px-9 py-3 px-14 ">
              <p>Top Picks</p>

              <div className="py-2 flex justify-between   ">
                {rowRecipes ? (
                  rowRecipes.map((result, index) => {
                    if (result.ingredients == "rumput")
                      return (
                        <div key={index} className="">
                          <Link to="/detail">
                            <button>
                              <img
                                src={
                                  result.img
                                    ? PF + result.img
                                    : PF + "disney.jpg"
                                }
                                alt="disney"
                                className="w-44 h-44 object-cover rounded-md "
                              />
                            </button>
                          </Link>

                          <p className="text-md font-medium">{result.title}</p>
                          <p className="text-sm">by @{result.userId}</p>
                        </div>
                      );
                  })
                ) : (
                  <CircularProgress />
                )}

                {/* <img
                  src={PF + "disney.jpg"}
                  alt="disney"
                  className="w-44 h-44 object-cover rounded-md "
                />
                <img
                  src={PF + "patience.jpg"}
                  alt="disney"
                  className="w-44 h-44 object-cover rounded-md "
                />
                <img
                  src={PF + "akkah.jpg"}
                  alt="soul"
                  className="w-44 h-44 object-cover rounded-md "
                />
                <img
                  src={PF + "akkah.jpg"}
                  alt="soul"
                  className="w-44 h-44 object-cover rounded-md "
                /> */}
              </div>
            </div>
          </div>
          <div className=" flex flex-col bg-white rounded-lg w-[65%] mx-auto h-[42vh] shadow-md my-7">
            <div className="md:px-9 py-3 px-14">
              <p>Our recommendations</p>
              <div className="py-2 flex justify-between">
                <img
                  src={PF + "disney.jpg"}
                  alt="disney"
                  className="w-44 h-44 object-cover rounded-md  "
                />

                <img
                  src={PF + "disney.jpg"}
                  alt="disney"
                  className="w-44 h-44 object-cover rounded-md "
                />
                <img
                  src={PF + "disney.jpg"}
                  alt="disney"
                  className="w-44 h-44 object-cover rounded-md "
                />
                <img
                  src={PF + "disney.jpg"}
                  alt="disney"
                  className="w-44 h-44 object-cover rounded-md "
                />
              </div>
            </div>
          </div>
        </div>
        <Modal />
      </main>
    </div>
  );
};

export default Home;
