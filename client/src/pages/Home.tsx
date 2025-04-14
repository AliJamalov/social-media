import React from "react";
import { IoChatbubblesOutline } from "react-icons/io5";

const Home = () => {
  return (
    <div className="pt-4 px-3 text-white">
      <div className="flex justify-between items-center">
        <h1>Instakilogram</h1>
        <IoChatbubblesOutline size={25} />
      </div>
    </div>
  );
};

export default Home;
