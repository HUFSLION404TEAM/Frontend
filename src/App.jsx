import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Start from './pages/common/Start';
import OnboardingOwner from './pages/owner/OnBoarding';
import OnboardingStudent from './pages/student/OnBoarding';
import Login from './pages/common/Login';
import Select from './pages/common/Select';
import DashOwner from './pages/owner/Dash';
import DashStudent from './pages/student/Dash';
import NoticeOwner from './pages/owner/Notice';
import NoticeStudent from './pages/student/Notice';
import HeartOwner from './pages/owner/Heart';
import HeartStudent from './pages/student/Heart';
import MyOwner from './pages/owner/My';
import MyStudent from './pages/student/My';
import ChatOwner from './pages/owner/Chat';
import ChatStudent from './pages/student/Chat';
import SearchOwner from './pages/owner/Search';
import SearchStudent from './pages/student/Search';
import MatchOwner from './pages/owner/Match';
import MatchStudent from './pages/student/Match';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" elemebt={<Login />}/>
        <Route path="/select" elemebt={<Select />}/>
        <Route path="/onboarding-o" element={<OnboardingOwner />} />
        <Route path="/onboarding-s" elemebt={<OnboardingStudent />}/>
        <Route path="/dash-o" elemebt={<DashOwner />}/>
        <Route path="/dash-s" elemebt={<DashStudent />}/>
        <Route path="/notice-o" elemebt={<NoticeOwner />}/>
        <Route path="/notice-s" elemebt={<NoticeStudent />}/>
        <Route path="/heart-o" elemebt={<HeartOwner />}/>
        <Route path="/heart-s" elemebt={<HeartStudent />}/>
        <Route path="/my-o" elemebt={<MyOwner />}/>
        <Route path="/my-s" elemebt={<MyStudent />}/>
        <Route path="/chat-o" elemebt={<ChatOwner />}/>
        <Route path="/chat-s" elemebt={<ChatStudent />}/>
        <Route path="/search-o" elemebt={<SearchOwner />}/>
        <Route path="/search-s" elemebt={<SearchStudent />}/>
        <Route path="/match-o" elemebt={<MatchOwner />}/>
        <Route path="/match-s" elemebt={<MatchStudent />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
