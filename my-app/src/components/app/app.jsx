import './app.css'

import {Suspense, lazy} from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router';

// import {Page404, MainPage, ComicsPage, SingleComicPage} from '../pages';
import Header from "../header/header.jsx";
import Spinner from "../spinner/spinner.jsx";

const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/main-page'));
const ComicsPage = lazy(() => import('../pages/comics-page'));
const SingleComicPage = lazy(
    () => import('../pages/single-comic-page'));

const App = () => {

    return (
        <Router>
            <div className="app">
                <Header/>
                <Suspense fallback={<Spinner></Spinner>}>
                    <Routes>
                        <Route
                            path="/"
                            element={<MainPage/>}
                        />

                        <Route
                            path="/comics"
                            element={<ComicsPage/>}
                        />

                        <Route
                            path="/comics/:comicId"
                            element={<SingleComicPage/>}
                        />

                        <Route path="*" element={<Page404/>}/>
                    </Routes>
                </Suspense>
            </div>
        </Router>
    )
}

export default App