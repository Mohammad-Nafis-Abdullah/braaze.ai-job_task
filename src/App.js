import { Route, Routes, useLocation } from "react-router-dom";
import NotFound from "./components/preBuild/NotFound";
import React, { useEffect } from "react";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import 'react-toastify/dist/ReactToastify.css';
import Aos from "aos";
import { ToastContainer } from "react-toastify";
import Modal from "./components/preBuild/Modal";
import useStateReducer from "./hooks/useStateReducer";


// for implementing aos animation
Aos.init({
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
  initClassName: 'aos-init', // class applied after initialization
  animatedClassName: 'aos-animate', // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 0, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 0, // the delay on throttle used while scrolling the page (advanced)

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 150, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 400, // values from 0 to 3000, with step 50ms
  easing: 'ease-out-sine', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
});

// declaring context for handling state globally
const StateContext = React.createContext();
export {StateContext};

function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);


  return (
    <StateContext.Provider value={useStateReducer()}>
      <div className="">

        <h1 className="container text-center text-7xl min-h-screen flex justify-center items-center bg-zinc-900 text-white">
          <span className="fadeIn">React is Working....</span></h1>

        <section>
          <Routes>
            <Route path="/" element={''} />



            <Route path="/*" element={<NotFound />} />
          </Routes>
        </section>


        <Modal />
        <ToastContainer />

      </div>
    </StateContext.Provider>
  );
}

export default App;
