import { Provider } from 'react-redux';
import store from './store';
import './index.css';
import { WebSocketProvider } from './utils/webSocket';
import Home from './components/home/home';

function App() {
  return (
    <Provider store={store}>
      <WebSocketProvider>
        <div className="App">
          <Home />
        </div>
      </WebSocketProvider>
    </Provider>
  );
}

export default App;
