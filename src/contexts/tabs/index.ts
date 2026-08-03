// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import { useContext } from 'react';
import { Context as CtxHome } from './Home.context';
import { Context as CtxRequest } from './Request.context';
import { Context as CtxCalendar } from './Calendar.context';
import { Context as CtxProfile } from './Profile.context';

const useHome = () => useContext(CtxHome)
const useCalendar = () => useContext(CtxCalendar)
const useRequest = () => useContext(CtxRequest)
const useProfile = () => useContext(CtxProfile)

export {
    useHome,
    useCalendar,
    useRequest,
    useProfile,
}
