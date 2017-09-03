import Express from 'express';
import { join as joinPath } from 'path';
import { compileFile } from 'pug';
import { match, RouterContext} from 'react-router';
import React from 'react';
import ReactDOMServer from'react-dom/server';
import createMemoryHistory from 'history/createMemoryHistory';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createRoutes from './routes';
import App from './components/app';

const app = Express();

app.use(Express.static(joinPath(__dirname, 'public')))

let layoutPath = joinPath(__dirname, './layout/layout.pug');
let layout = compileFile(layoutPath);

// app.use('/', (req, res) => {
//   res.send('Hello world');
// });

app.all("*", (req, res) => {

  const history = createMemoryHistory(req.url);
  const routes = createRoutes(history);

  match({ routes, location: req.originalUrl }, (err, redirectLocation, renderProps) => {

    const components = renderProps.components;
    const Component = components[components.length - 1].WrappedComponent;

    const store = createStore(() => {});

    //Promise.all([Component.fetchData({store}), fetchGlobalData({store})]).then(([pageData, globalData]) => {

      function createElement(Component, props) {
        //return <Component {...props} {...pageData} {...globalData} />
        return <Component {...props} />
      }

      const html = ReactDOMServer.renderToString(
        <Provider store={store}>
          <App>
            <RouterContext {...renderProps} createElement={createElement}/>
          </App>
        </Provider>
      );

      const templateLocals = {
        content: html,
        //data: Object.assign({}, pageData, globalData)
      }

      res.send(layout(templateLocals));
    //});
  });
});


app.listen(1979, () => {
  console.log('running tennis app...')
});
