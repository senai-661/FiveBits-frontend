import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PHome from './pages/PHome/PHome'
import PLogin from './pages/PLogin/Plogin'
import PListagemPaciente from './components/Listagens/ListagemPaciente/ListagemPaciente'
import PListagemMedico from './components/Listagens/ListagemMedico/ListagemMedico'
import PListagemConsulta from './components/Listagens/ListagemConsulta/ListagemConsulta'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* Rota Principal: Landing Page do MedFlow */}
        <Route path='/' element={<PHome />} /> 
        <Route path='/lista/Login' element = {<PLogin/>}/>
        <Route path='/lista/paciente' element={<PListagemPaciente />}/>
        <Route path='/lista/medico' element={<PListagemMedico />}/>
        <Route path='/lista/consulta' element={<PListagemConsulta />}/> 

      </Routes>
    </BrowserRouter>
  )
}

export default App;