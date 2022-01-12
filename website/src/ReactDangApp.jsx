import Index from './components/Index.jsx'
import React, { Component, Suspense } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

class ReactDangApp extends Component{
    
    render() {
        return (
            <React.StrictMode>
                <Router>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Routes>
                            <Route exact path="/" element={<Index />}/>
                        </Routes>
                    </Suspense>
                </Router>
            </React.StrictMode>
        )
    }
}

export default ReactDangApp
