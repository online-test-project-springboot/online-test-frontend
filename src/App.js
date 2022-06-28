import BaseBg from 'components/Base-background';
import ExamQuestion from 'features/ExamQuestion';
import TopicFeature from 'features/Topic';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import NotFound from './components/NotFound';
import HomeFeature from './features/Home';

function App() {
  return (
    <div>
      <Header />

      <BaseBg />

      <Switch>
        <Redirect from="/home" to="/" exact />
        {/* <Redirect from="/post-list/:postId" to="/post/:postId" exact /> 
         <Route path="/" component={CounterFeature} exact />  */}
        <Route path="/" component={HomeFeature} exact />
        <Route path="/topic-list" component={TopicFeature} />
        <Route path="/examQuestion-list" component={ExamQuestion} />
         {/* <Route path="/topic-list/create" component={CreatePage} /> 
         <Route path="/todos" component={TodoFeature} />
        <Route path="/albums" component={SongFeature} />
        <Route path="/products" component={ProductFeature} /> */}
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;