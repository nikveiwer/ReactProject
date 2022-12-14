import { lazy, Suspense } from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

// import { MainPage, ComicsPage, SingleComicPage, Page404 } from "../pages";
import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";

const Page404 = lazy(() => import("../pages/404"))
const MainPage = lazy(() => import("../pages/MainPage"))
const ComicsPage = lazy(() => import("../pages/ComicsPage"))
const SinglePage = lazy(() => import("../pages/SinglePage"))

const  App = () => {




    return (

        <Router>
            <div className="app">
                <AppHeader/>
                <Suspense fallback={<Spinner></Spinner>}>
                    <main>
                        <Routes>

                            <Route path="/" element={<MainPage/>}/>
                            <Route path="/comics" element={<ComicsPage/>}/>
                            <Route path="/comics/:comicOrCharId" element={<SinglePage/>}/>
                            <Route path="/chars/:comicOrCharId" element={<SinglePage char/>}/>
                            <Route path="*" element={<Page404/>}/>

                        </Routes>
                    </main>
                </Suspense>
            </div>
        </Router>
    )

}

export default App;