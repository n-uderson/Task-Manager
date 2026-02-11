import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import NovaTarefa from './assets/components/NovaTarefa.jsx'

export default function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App/>}/>
                <Route path='/nova-tarefa' element={<NovaTarefa/>}/>
            </Routes>
        </BrowserRouter>
    )
}