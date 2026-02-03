import { Routes, Route } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppShell />}>
        <Route index element={<Dashboard />} />
        {/* Placeholder routes for future implementation */}
        <Route path="repos" element={<div className="p-8 text-slate-400">Repositories View (Coming Soon)</div>} />
        <Route path="prs" element={<div className="p-8 text-slate-400">Pull Requests View (Coming Soon)</div>} />
        <Route path="quality" element={<div className="p-8 text-slate-400">Quality Metrics (Coming Soon)</div>} />
        <Route path="settings" element={<div className="p-8 text-slate-400">Settings (Coming Soon)</div>} />
      </Route>
    </Routes>
  );
}

export default App;
