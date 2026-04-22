import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PHome from './pages/PHome/PHome'
import PLogin from './pages/PLogin/Plogin'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PHome />} />
        <Route path='/lista/login' element={<PLogin />} />
     {/*<Route path='/lista/alunos' element={<PListagemPaciente />} />
        <Route path='/lista/emprestimos' element={<PListagemConsulta />} />
        <Route path='/lista/livros' element={<PListagemMedico />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
