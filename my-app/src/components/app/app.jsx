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
    () => import('../pages/single-comic-layout/single-comic-page.jsx'));
const SingleCharLayout = lazy(() => import('../pages/single-character-layout/single-char-layout.jsx'));
const SinglePage = lazy(() => import('../pages/single-page'));

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
                            path="/comics/:id"
                            element={
                                <SinglePage Component={SingleComicPage} dataType="comic"/>
                            }
                        />

                        <Route
                            path="/characters/:id"
                            element={
                                <SinglePage Component={SingleCharLayout} dataType="character"/>
                            }
                        />

                        <Route path="*" element={<Page404/>}/>
                    </Routes>
                </Suspense>
            </div>
        </Router>
    )
}

export default App