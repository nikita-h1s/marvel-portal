import './app.css'

import {BrowserRouter as Router, Route, Routes} from 'react-router';

import {MainPage, ComicsPage, SingleComicPage, Page404} from '../pages';
import Header from "../header/header.jsx";


const App = () => {

    return (
        <Router>
            <div className="app">
                <Header/>
                <Routes>
                    <Route
                        path="/"
                        element={<MainPage/>}
                    />

                    <Route
                        path="/comics"
                        element={<ComicsPage />}
                    />

                    <Route
                        path="/comics/:comicId"
                        element={<SingleComicPage />}
                    />

                    <Route path="*" element={<Page404 />}/>
                </Routes>
            </div>
        </Router>
    )
}

export default App