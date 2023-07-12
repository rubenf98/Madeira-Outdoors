import { combineReducers } from 'redux'

import auth from './redux/auth'
import application from './redux/application'

import extra from './redux/extra'
import insurance from './redux/insurance'
import reservation from './redux/reservation'
import carCategory from './redux/carCategory'
import blockDate from './redux/blockDate'

const reducer = combineReducers({
    auth,
    application,
    extra,
    insurance,
    reservation,
    carCategory,
    blockDate
})

export default reducer