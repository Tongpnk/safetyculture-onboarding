import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Website from './screens/Website'
import SignUp from './screens/SignUp'
import Start from './screens/Start'
import Plan from './screens/Plan'
import Introduce from './screens/Introduce'
import HomeEmpty from './screens/HomeEmpty'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Website />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/start" element={<Start />} />
        <Route path="/plan" element={<Plan />} />
        <Route path="/introduce" element={<Introduce />} />
        <Route path="/home" element={<HomeEmpty />} />
        <Route path="/workspace" element={<Navigate to="/home" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
