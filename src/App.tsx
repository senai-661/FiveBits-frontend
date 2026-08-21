import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PHome from './pages/PHome/PHome'
import PLogin from './pages/PLogin/Plogin'
import PListagemPaciente from './components/Listagens/ListagemPaciente/ListagemPaciente'
import PListagemMedico from './components/Listagens/ListagemMedico/ListagemMedico'
import PListagemConsulta from './components/Listagens/ListagemConsulta/ListagemConsulta'
import ProtectedRoute from './components/Rotas/ProtectedRotes'
import PHomeLogin from './pages/PHomeLogin/PHomeLogin'
import PDetalhesConsulta from "./pages/PDetalhes/PDetalhesConsulta/PDetalhesConsulta";
import PDetalhesPaciente from './pages/PDetalhes/PDetalhesPaciente/PDetalhesPaciente'
import PDetalhesMedico from './pages/PDetalhes/PDetalhesMedico/PDetalhesMedico'
import PCadastroPaciente from './pages/PCadastro/PCadastroPaciente/PCadastroPaciente'
import PCadastroMedico from './pages/PCadastro/PCadastroMedico/PCadastroMedico'
import PCadastroConsulta from './pages/PCadastro/PCadastroConsulta/PCadastroConsulta'
import PAtualizarMedico from './pages/PAtualizar/PAtualizarMedico/PAtualizarMedico'
import PAtualizarConsulta from './pages/PAtualizar/PAtualizarConsulta/PAtualizarConsulta'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* Rota Principal: Landing Page do MedFlow */}
        <Route path='/' element={<PHome />} />
        <Route path='/login' element={<PLogin />} />
        <Route path='/bem-vindo' element={<PHomeLogin />} />
        <Route path='/lista/paciente' element={<ProtectedRoute element={<PListagemPaciente />} />} />
        <Route path='/lista/medico' element={<ProtectedRoute element={<PListagemMedico />} />} />
        <Route path='/lista/consulta' element={<ProtectedRoute element={<PListagemConsulta />} />} />
        <Route path='/detalhes/paciente/:id_paciente' element={<ProtectedRoute element={<PDetalhesPaciente />} />} />
        <Route path='/detalhes/medico/:id_medico' element={<ProtectedRoute element={<PDetalhesMedico />} />} />
        <Route path='/detalhes/consulta/:id_consulta' element={<ProtectedRoute element={<PDetalhesConsulta />} />} />
        <Route path='/cadastro/paciente/' element={<ProtectedRoute element={<PCadastroPaciente />} />} />
        <Route path='/cadastro/medico/' element={<ProtectedRoute element={<PCadastroMedico />} />} />
        <Route path='/cadastro/consulta/' element={<ProtectedRoute element={<PCadastroConsulta />} />} />
        <Route path='/atualizar/medico/:id_medico' element={<ProtectedRoute element={<PAtualizarMedico />} />} />
        <Route path='/atualizar/consulta/:id_consulta' element={<ProtectedRoute element={<PAtualizarConsulta />} />} />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App;


