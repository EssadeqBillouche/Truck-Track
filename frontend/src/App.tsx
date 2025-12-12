import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { AdminDrivers } from './pages/AdminDrivers';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    
                    <Route
                        path="/admin/drivers"
                        element={
                            <ProtectedRoute requiredRole="admin">
                                <AdminDrivers />
                            </ProtectedRoute>
                        }
                    />
                    
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
