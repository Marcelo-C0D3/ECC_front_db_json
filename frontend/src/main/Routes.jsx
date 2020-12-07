import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Home from '../components/home/Home'
import Clipping from '../components/Clip/Clipping'
import UpLoad from '../components/Upload/UpLoad'
import Save from '../components/Save/Save'

export default props => 
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/Upload' component={UpLoad} />
        <Route path='/Clipping' component={Clipping} />
        <Route path='/Save' component={Save} />
        <Redirect from='*' to='/' />
    </Switch>