import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PHome from './pages/PHome/PHome'
import PListagemPaciente from './components/Listagens/ListagemPaciente/ListagemPaciente'
//import PLogin from './pages/PLogin/PLogin'
// Importações das novas listagens do MedFlow
// import PListagemPaciente from './pages/PListagem/PListagemPaciente/PListagemPaciente'
// import PListagemMedico from './pages/PListagem/PListagemMedico/PListagemMedico'
// import PListagemConsulta from './pages/PListagem/PListagemConsulta/PListagemConsulta'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* Rota Principal: Landing Page do MedFlow */}
        <Route path='/' element={<PHome />} /> 
        <Route path='/lista/paciente' element={<PListagemPaciente />}/>
{/*  
        <Route path='/login' element={<PLogin />}/>
        <Route path='/lista/paciente' element={<PListagemPaciente />}/>
        <Route path='/lista/medico' element={<PListagemMedico />}/>
        <Route path='/lista/consulta' element={<PListagemConsulta />}/> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App