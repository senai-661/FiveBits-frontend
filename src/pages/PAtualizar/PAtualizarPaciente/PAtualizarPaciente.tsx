import { type JSX } from 'react';
import { useParams } from 'react-router-dom';
import Navegacao from '../../../components/Navegacao/Navegacao';
import Rodape from '../../../components/Rodape/Rodape';
import FormAtualizarPaciente from '../../../components/Formularios/FormAtualizarPaciente/FormAtualizarPaciente';

function PAtualizarPaciente(): JSX.Element {
    const { id_paciente } = useParams();

    return (
        <div className="page-shell">
            <Navegacao />
            <FormAtualizarPaciente idPaciente={Number(id_paciente)} />
            <Rodape />
        </div>
    );
}

export default PAtualizarPaciente;
