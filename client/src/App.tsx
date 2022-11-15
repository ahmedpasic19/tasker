import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {
  Login,
  Register,
  HomePage,
  AllTasks,
  AssignTasks,
  EmployeeTasks,
  CompletedTasks,
} from './pages/pages'
import Layout from './components/routes/Layout'
import Navbar from './components/layout/Navbar'

import {
  ProtectAdmin,
  ProtectedRoute,
  ProtectAuth,
} from './routes/protectedRoutes'

import './App.css'

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          {/* Auth routes */}
          <Route path='/' element={<Layout />}>
            <Route element={<ProtectAuth />}>
              <Route path='/' element={<Login />} />
              <Route path='/register' element={<Register />} />
            </Route>
          </Route>
          {/* Page routes */}
          <Route path='/'>
            <Route element={<ProtectAdmin />}>
              <Route path='tasks' element={<AllTasks />} />
              <Route path='completed-tasks' element={<CompletedTasks />} />
              <Route path='employees' element={<AssignTasks />} />
            </Route>
          </Route>
          {/* Requre permission */}
          <Route path='/'>
            <Route element={<ProtectedRoute />}>
              <Route path='homepage' element={<HomePage />} />
              <Route path='my-tasks' element={<EmployeeTasks />} />7
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
