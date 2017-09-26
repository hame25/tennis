import Express from 'express';
import { join as joinPath } from 'path';
import { compileFile } from 'pug';
import { match, RouterContext} from 'react-router';
import React from 'react';
import ReactDOMServer from'react-dom/server';
import createMemoryHistory from 'history/createMemoryHistory';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import bodyParser from 'body-parser';
import createRoutes from './routes';
import App from './components/app';
import playersReducer from './reducers/players';


const app = Express();

app.use(Express.static(joinPath(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

let layoutPath = joinPath(__dirname, './layout/layout.pug');
let layout = compileFile(layoutPath);

app.get('/favicon.ico', function(req, res) {
    res.status(204);
}); 

app.post('/head-2-head', (req, res) => {
  const player1 = req.body.player1;
  const player2 = req.body.player2;

  res.redirect(`/head-2-head/${player1}/${player2}`);
});

app.all("*", (req, res) => {

  const history = createMemoryHistory(req.url);
  const routes = createRoutes(history);

  match({ routes, location: req.originalUrl }, (err, redirectLocation, renderProps) => {
    //const components = renderProps.components[1];
    //const Component = components[components.length - 1].WrappedComponent;
    //const Component = components[components.length].WrappedComponent;

    const Component = renderProps.components[1]
    const store = createStore(
      playersReducer,
      applyMiddleware(thunkMiddleware)
    )

    //Promise.all([Component.fetchData({store}), fetchGlobalData({store})]).then(([pageData, globalData]) => {
    Promise.all([Component.fetchData({store, params: renderProps.params})]).then(([pageData]) => {

      function createElement(Component, props) {
        //return <Component {...props} {...pageData} {...globalData} />
        return <Component {...props} {...pageData} />
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
        data: Object.assign({}, store.getState())
      }

      res.send(layout(templateLocals));
    })
    .catch(err => console.log(err));
  });
});


app.listen(1979, () => {
  console.log('running tennis app on 1979...')
});
