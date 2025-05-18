import { Route, Routes } from 'react-router-dom'
import Landingpage from './landinpage/landingpage'
import Inscription from './authentification/inscription'
import Connexion from './authentification/connexion'
import ChatBotTheEnd from './finalBot/finalBoth'
import HallDesFins from './hallDesFins/hallDesFins'
import Mesfins from './mesFins/mesfin'
import CharacterConfigurator from "./3d/CharacterConfigurator";
import ResultatEndpage from './endpage/ResultatEndpage';
function App() {
  
  return(<>
   <Routes>
            <Route path ="/"  element={<Landingpage/>}/>
            <Route path ="/inscription"  element={<Inscription/>}/>
            <Route path='/connexion' element={<Connexion/>}/>
            <Route path='/home/finalBot' element={<ChatBotTheEnd/>}/>
            <Route path ="/hall"  element={<HallDesFins/>}/> 
            <Route path ="/mesfins"  element={<Mesfins/>}/> 
            <Route path ="/mesfin"  element={<Mesfins/>}/> 
            <Route path="/3d-choice" element={<CharacterConfigurator />} />
            <Route path="/end-page" element={<ResultatEndpage />} />
   </Routes>  
  </>)
}

export default App
