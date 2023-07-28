import { combineReducers } from 'redux'

import auth from './redux/auth'
import application from './redux/application'

import extra from './redux/extra'
import insurance from './redux/insurance'
import reservation from './redux/reservation'
import category from './redux/category'
import activity from './redux/activity'
import blockDate from './redux/blockDate'

const reducer = combineReducers({
    auth,
    application,
    extra,
    insurance,
    reservation,
    category,
    activity,
    blockDate
})

export default reducer