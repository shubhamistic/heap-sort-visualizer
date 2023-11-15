import '../styles/App.scss';
import Sidebar from './Sidebar';
import Canvas from './Canvas';
import ExecutionLog from './ExecutionLog';
import { useAnimation } from '../hooks';

export default function App() {
  const { arrayInfo } = useAnimation();

  const isArrayInfoEmpty = () => {return Object.keys(arrayInfo).length === 0;}

  return (
    <div className="app">
      <Sidebar className="sidebar" />

      <div className="animation-window">
        <Canvas className="canvas" />

        {!isArrayInfoEmpty() && (
          <ExecutionLog className="execution-log" />
        )}
      </div>
    </div>
  );
}
