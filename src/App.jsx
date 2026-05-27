import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from './pages/Home';
import Resume from './pages/Resume';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', color: '#ff6b6b', fontFamily: 'monospace', background: '#1a1a2e', minHeight: '100vh' }}>
          <h1>⚠️ Runtime Error</h1>
          <pre style={{ whiteSpace: 'pre-wrap', marginTop: '1rem', color: '#ffa07a' }}>
            {this.state.error?.message}
          </pre>
          <pre style={{ whiteSpace: 'pre-wrap', marginTop: '1rem', color: '#888', fontSize: '0.8rem' }}>
            {this.state.error?.stack}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/u/:username" element={<Resume />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
