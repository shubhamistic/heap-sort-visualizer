import '../styles/App.scss';
import Sidebar from './Sidebar';
import Canvas from './Canvas';

export default function App() {
  return (
    <div className="app">
      <Sidebar className="sidebar" />
      <Canvas className="canvas" />
    </div>
  );
}
