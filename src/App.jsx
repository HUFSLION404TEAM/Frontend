import { BrowserRouter, Routes, Route } from "react-router-dom";
import Start from "./pages/common/Start";
import Login from "./pages/common/Login";
import Select from "./pages/common/Select";

import OnboardingOwner from "./pages/owner/OnBoarding";            // (남겨둠: 혹시 다른 경로에서 쓸 수도 있음)
import DashOwner from "./pages/owner/Dash";
import NoticeOwner from "./pages/owner/Notice";
import HeartOwner from "./pages/owner/Heart";
import MyOwner from "./pages/owner/My";
import ChatOwner from "./pages/owner/Chat";
import SearchOwner from "./pages/owner/Search";
import MatchOwner from "./pages/owner/Match";
import ReviewOwner from "./pages/owner/Review/index";
import ReportOwner from "./pages/owner/Report/index";
import Request from "./pages/owner/Request";
import DetailOwner from "./pages/owner/Detail";
import WriteOwner from "./pages/owner/Write";
import SearchOwnerDetail from "./pages/owner/Search/detail";


import DashStudent from "./pages/student/Dash";
import NoticeStudent from "./pages/student/Notice";
import HeartStudent from "./pages/student/Heart";
import MyStudent from "./pages/student/My";
import ChatStudent from "./pages/student/Chat";
import SearchStudent from "./pages/student/Search";
import MatchStudent from "./pages/student/Match";
import FeedbackStudent from "./pages/student/Feedback";
import ReviewStudent from "./pages/student/Review";
import ReportStudent from "./pages/student/Report";
import Apply from "./pages/student/Apply";
import DetailStudent from "./pages/student/Detail";
import ChatRoomOwner from "./pages/owner/ChatRoom";
import ChatRoomStudent from "./pages/student/ChatRoom";
import { HeartProvider } from "./contexts/heartcontext";
import SearchStudentDetail from "./pages/student/Search/detail";

import Layout from "./layouts/Layout";
import AuthComplete from "./pages/common/Login/authcomplete";
import OnboardingStudent from "./pages/student/OnBoarding";


function App() {
  return (
    <HeartProvider>
      <BrowserRouter>
        <Routes>
          {/* 공통 */}
          <Route path="/" element={<Start />} />
          <Route path="/login" element={<Login />} />
          <Route path="/auth/complete" element={<AuthComplete />} />
          <Route path="/oauth2/redirect" element={<AuthComplete />} />
          <Route path="/select" element={<Select />} />

          {/* Owner 레이아웃 (푸터 포함) */}
          <Route path="/owner" element={<Layout role="owner" />}>
            <Route index element={<DashOwner />} />
            {/* main 변경 반영: 온보딩은 StoreTypePage 사용 */}
            <Route path="dash" element={<DashOwner />} />
            <Route path="notice" element={<NoticeOwner />} />
            <Route path="heart" element={<HeartOwner />} />
            <Route path="my" element={<MyOwner />} />
            <Route path="chat" element={<ChatOwner />} />
            <Route path="chat/:roomId" element={<ChatRoomOwner />} />
            <Route path="search" element={<SearchOwner />} />
            <Route path="match" element={<MatchOwner />} />
            <Route path="review" element={<ReviewOwner />} />
            <Route path="report" element={<ReportOwner />} />
            <Route path="request" element={<Request />} />
            <Route path="detail" element={<DetailOwner />} />
            <Route path="write" element={<WriteOwner />} />
          </Route>

          {/* Student 레이아웃 (푸터 포함) */}
          <Route path="/student" element={<Layout role="student" />}>
            <Route index element={<DashStudent />} />
            <Route path="dash" element={<DashStudent />} />
            <Route path="notice" element={<NoticeStudent />} />
            <Route path="heart" element={<HeartStudent />} />
            <Route path="my" element={<MyStudent />} />
            <Route path="chat" element={<ChatStudent />} />
            <Route path="chat/:roomId" element={<ChatRoomStudent />} />
            <Route path="search" element={<SearchStudent />} />
            <Route path="match" element={<MatchStudent />} />
            <Route path="feedback" element={<FeedbackStudent />} />
            <Route path="review" element={<ReviewStudent />} />
            <Route path="report" element={<ReportStudent />} />
            <Route path="apply" element={<Apply />} />
            <Route path="detail" element={<DetailStudent />} />
          </Route>

          {/* 개별 경로 (중복 이동용) */}
          {/* Owner */}
          <Route path="/owner/dash" element={<DashOwner />} />
          <Route path="/owner/notice" element={<NoticeOwner />} />
          <Route path="/owner/heart" element={<HeartOwner />} />
          <Route path="/owner/my" element={<MyOwner />} />
          <Route path="/owner/chat" element={<ChatOwner />} />
          <Route path="/owner/chat/:roomId" element={<ChatRoomOwner />} />
          <Route path="/owner/search" element={<SearchOwner />} />
          <Route path="/owner/match" element={<MatchOwner />} />
          <Route path="/owner/review" element={<ReviewOwner />} />
          <Route path="/owner/report" element={<ReportOwner />} />
          <Route path="/owner/request" element={<Request />} />
          <Route path="/owner/detail" element={<DetailOwner />} />
          <Route path="/owner/write" element={<WriteOwner />} />
          <Route path="/owner/search/detail" element={<SearchOwnerDetail />} />
          <Route path="/owner/onboarding" element={<OnboardingOwner />} />

          {/* Student */}
          <Route path="/student/dash" element={<DashStudent />} />
          <Route path="/student/notice" element={<NoticeStudent />} />
          <Route path="/student/heart" element={<HeartStudent />} />
          <Route path="/student/my" element={<MyStudent />} />
          <Route path="/student/chat" element={<ChatStudent />} />
          <Route path="/student/chat/:roomId" element={<ChatRoomStudent />} />
          <Route path="/student/search" element={<SearchStudent />} />
          <Route path="/student/match" element={<MatchStudent />} />
          <Route path="/student/feedback" element={<FeedbackStudent />} />
          <Route path="/student/review" element={<ReviewStudent />} />
          <Route path="/student/report" element={<ReportStudent />} />
          <Route path="/student/apply" element={<Apply />} />
          <Route path="/student/detail" element={<DetailStudent />} />
          <Route path="/student/search/detail" element={<SearchStudentDetail />} />
          <Route path="/student/onboarding" element={<OnboardingStudent />} />
        </Routes>
      </BrowserRouter>
    </HeartProvider>
  );
}

export default App;
