import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Toaster } from 'react-hot-toast';

// Layout
import MainLayout from './components/layout/MainLayout';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';

// Main Pages
import DashboardPage from './pages/dashboard/DashboardPage';
import MineListPage from './pages/mines/MineListPage';
import MineDetailPage from './pages/mines/MineDetailPage';
import ComplianceListPage from './pages/compliance/ComplianceListPage';
import InspectionListPage from './pages/inspections/InspectionListPage';
import ViolationListPage from './pages/violations/ViolationListPage';
import CorrectiveActionListPage from './pages/corrective-actions/CorrectiveActionListPage';
import EnvironmentPage from './pages/environment/EnvironmentPage';
import SafetyPage from './pages/safety/SafetyPage';
import AIInsightsPage from './pages/ai-insights/AIInsightsPage';
import AlertsPage from './pages/alerts/AlertsPage';
import ReportsPage from './pages/reports/ReportsPage';
import GovernanceAnalyticsPage from './pages/analytics/GovernanceAnalyticsPage';
import MapViewPage from './pages/analytics/MapViewPage';
import AuditLogPage from './pages/audit/AuditLogPage';
import UserManagementPage from './pages/users/UserManagementPage';
import SettingsPage from './pages/settings/SettingsPage';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}

function PublicRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return children;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />

      {/* Protected */}
      <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="mines" element={<MineListPage />} />
        <Route path="mines/:id" element={<MineDetailPage />} />
        <Route path="compliance" element={<ComplianceListPage />} />
        <Route path="inspections" element={<InspectionListPage />} />
        <Route path="violations" element={<ViolationListPage />} />
        <Route path="corrective-actions" element={<CorrectiveActionListPage />} />
        <Route path="environment" element={<EnvironmentPage />} />
        <Route path="safety" element={<SafetyPage />} />
        <Route path="ai-insights" element={<AIInsightsPage />} />
        <Route path="alerts" element={<AlertsPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="analytics" element={<GovernanceAnalyticsPage />} />
        <Route path="analytics/map" element={<MapViewPage />} />
        <Route path="audit-logs" element={<AuditLogPage />} />
        <Route path="users" element={<UserManagementPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              borderRadius: '10px',
              padding: '12px 16px',
            },
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  );
}
