import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Tasks from "../components/Tasks/Tasks";

const MainPage = () => {
  return (
    <div>
      <Header />
      <Tasks />
      <Footer />
    </div>
  );
};

export default MainPage;
