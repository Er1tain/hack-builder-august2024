import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Welcome from './pages/Welcome';
import WorkerProfile from './pages/Worker/Profile';
import WorkerTasks from './pages/Worker/Tasks';
import CurrentTasks from './pages/Worker/Tasks';
import ProgressBar from './pages/Worker/ProgressBar';

import EmployerProfile from './pages/Employer/Profile';
import PotentialWorkers from './pages/Employer/PotentialWorkers';

import '@ionic/react/css/core.css';

import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import '@ionic/react/css/palettes/dark.system.css';

import Reg from './pages/Reg';
import Auth from './pages/Auth';
import MapOfPartners from './pages/Worker/MapOfPartners';
import CRUDvacancies from './pages/Employer/CRUDvacancies';
import CRUDobjects from './pages/Employer/CRUDobjects';
import BuilderObjects from './pages/Employer/BuilderObjects';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
      
      <Route exact path="/">
        <Welcome/>
      </Route>

      <Route exact path='/reg'>
        <Reg/>
      </Route>

      <Route exact path='/auth'>
        <Auth/>
      </Route>

      {/*Маршруты специфичные для пользовательских ролей*/}
      {/*Сотрудник*/}
      <Route exact path='/worker/profile'>
          <WorkerProfile/>
      </Route>

        <Route exact path='/worker/tasks'>
          <WorkerTasks/>
        </Route>

        <Route exact path='/worker/current_tasks'>
          <CurrentTasks/>
        </Route>

        <Route exact path='/worker/progress_bar'>
          <ProgressBar/>
        </Route>

        <Route exact path='/worker/map_of_partners'>
          <MapOfPartners/>
        </Route>

      {/*Работодатель*/}
      <Route exact path='/employer/profile'>
        {/* <Route exact path='/profile'> */}
          <EmployerProfile/>
      </Route>

        <Route exact path='/employer/potential_workers'>
          <PotentialWorkers/>
        </Route>

        <Route exact path='/employer/crud_vacancies'>
          <CRUDvacancies/>
        </Route>

        <Route exact path='/employer/crud_objects'>
          <CRUDobjects/>
        </Route>

        <Route exact path='/employer/builder_projects'>
          <BuilderObjects/>
        </Route>
        {/*Кандидатов на назначение лучше назаначать во всплывающем окне CandidatesForObjects на том же url*/}



    </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
