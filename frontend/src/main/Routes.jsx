import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Home from '../components/home/Home'
import Clipping from '../components/user/Clipping'
import UpLoad from '../components/results/UpLoad'

export default props => 
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/Upload' component={UpLoad} />
        <Route path='/Clipping' component={Clipping} />
        <Redirect from='*' to='/' />
    </Switch>