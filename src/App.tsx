import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './styles.css'
import {Header} from "./components/Header/Header";
import {Main} from "./components/Main/Main";
import {Search} from "./components/Search/Search";
import {Footer} from "./components/Footer/Footer";


function App() {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path='/' element={<Main/>}/>
                <Route path='/search' element={<Search/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    );
}

export default App;
