import { BrowserRouter as Router , Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Layout from './layout/Layout'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import Kyc from './pages/Kyc'
import Payment from './pages/Payment'
import Trading from './pages/Trading'
import { useAppContext } from './context/AppContext'
import Login from './pages/Login'

function App() {
  const {isLoggedIn} = useAppContext();

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={
          <Layout>
            <Home />
          </Layout>
        }>
        </Route>

        <Route path='/signup' element={
          <Layout>
            <SignUp />
          </Layout>
        }>
        </Route>
        <Route path='/login' element={
          <Layout>
            <Login />
          </Layout>
        }>
        </Route>
        
        {isLoggedIn && (
          <>
          
        <Route path='/kyc' element={
          <Layout>
            <Kyc />
          </Layout>
        }>
        </Route>
        <Route path='/payment' element={
          <Layout>
            <Payment />
          </Layout>
        }>
        </Route>
        <Route path='/trading' element={
          <Layout>
            <Trading />
          </Layout>
        }>
        </Route>
        </>

        )}
        <Route path="*" element={<Navigate to="/" />}></Route>

      </Routes>
    </Router>

    </>

  )
}

export default App
