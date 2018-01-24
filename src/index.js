import dva from 'dva';
import './index.css';
import "./normalize.css";
import createLoading from 'dva-loading'
import "./utils/interceptors";

// 1. Initialize
const app = dva({
  ...createLoading({
    effects: true,
  }),
});



// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/demand').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
