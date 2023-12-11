import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';


function Agenda() {

  const [, setProfessores] = useState([]);
  const [, setSalas] = useState([]);
  const [, setNomeDesafios] = useState([]);
  const [horarios, setHorarios] = useState([]);


  useEffect(() => {
    const storedHorarios = JSON.parse(localStorage.getItem('Horarios')) || [];
    setHorarios(storedHorarios);

    const storedProfessores = JSON.parse(localStorage.getItem('Professores')) || [];
    setProfessores(storedProfessores);

    const storedSalas = JSON.parse(localStorage.getItem('Salas')) || [];
    setSalas(storedSalas);

    const storedDesafios = JSON.parse(localStorage.getItem('Desafios')) || [];
    setNomeDesafios(storedDesafios);
  }, []);
  

  return (
    <div>
      <div className="agenda-container">
        <h2 className="agenda-container1" >Calendário de Aulas</h2>
        <FullCalendar className="agenda-container"
          plugins={[dayGridPlugin, interactionPlugin]}
          events={horarios}
          height="auto"
          locale="pt-br"
          eventContent={renderizarConteudoEvento}
          classNames= "evento-customizado"
         
        />
      </div>
    </div>
  );
  
}

const  renderizarConteudoEvento = (arg) => {
  const { title, extendedProps } = arg.event; 

  return {
    html:   `
      <br className="agenda-container">${title}</b><br >
      Professor: ${extendedProps.professor}<br>
      Sala: ${extendedProps.sala}<br>
      Desafio: ${extendedProps.desafio}<br>
      Horário: ${extendedProps.horaInicial} - ${extendedProps.horaFinal}
    `,
    
  };
};

export default Agenda;
