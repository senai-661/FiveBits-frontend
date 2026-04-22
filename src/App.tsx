import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PHome from './pages/PHome/PHome'
import PLogin from './pages/PLogin/Plogin'
import PListagemPaciente from './components/Listagens/ListagemPaciente/ListagemPaciente'
import PListagemMedico from './components/Listagens/ListagemMedico/ListagemMedico'
import PListagemConsulta from './components/Listagens/ListagemConsulta/ListagemConsulta'
import ProtectedRoute from './components/Rotas/ProtectedRotes'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* Rota Principal: Landing Page do MedFlow */}
        <Route path='/' element={<PHome />} /> 
        <Route path='/login' element = {<PLogin/>}/>
        <Route path='/lista/paciente' element={<ProtectedRoute element={<PListagemPaciente />} />}/>
        <Route path='/lista/medico' element={<ProtectedRoute element={<PListagemMedico />} />}/>
        <Route path='/lista/consulta' element={<ProtectedRoute element={<PListagemConsulta />} />}/> 

      </Routes>
    </BrowserRouter>
  )
}

export default App;


