// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { createContext, useReducer } from 'react';
import { useNavigation } from '@react-navigation/native';

import { ValuesTimesheet } from 'src/constants/Values';
import { useFetch } from 'src/hooks/useFetch';
import { StateTimesheet, TypeHandle, TypeNavStack } from 'src/types/Types';
import { DateTimeUtils } from 'src';

type TypeContext = {
    state: StateTimesheet
    setState: React.Dispatch<Partial<StateTimesheet>>
    handle: TypeHandle
    setHandle: React.Dispatch<Partial<TypeHandle>>

    onHandlePress: (day: { dateString: string }) => void
    onHandleEffectI: () => void
}

export const Context = createContext<TypeContext>({
    state: ValuesTimesheet.State,
    setState: () => { },
    handle: ValuesTimesheet.Handle,
    setHandle: () => { },

    onHandlePress: () => { },
    onHandleEffectI: () => { }
})

export const CtxTimesheet = ({ children }: { children: React.ReactNode }) => {
    const navigation : TypeNavStack['navigation'] = useNavigation()

    const [state, setState] = useReducer(
        (state: StateTimesheet, newState: Partial<StateTimesheet>) =>
            ({ ...state, ...newState }), ValuesTimesheet.State
    )

    const [handle, setHandle] = useReducer(
        (state: TypeHandle, newState: Partial<TypeHandle>) =>
            ({ ...state, ...newState }), ValuesTimesheet.Handle
    )

    const onHandlePress = (day: { dateString: string }) => {
        setState({ calendarDate: DateTimeUtils.dateDashToDefault(day.dateString) })
    }

    const onHandleEffectI = async () => {
        setHandle({ isLoading: true })

        const timeoutId = setTimeout(async () => {
            await useFetch.Timesheet(navigation, state, setState, handle, setHandle)
        }, 500)

        return () => clearTimeout(timeoutId)
    }

    return (
        <Context.Provider value={{ 
            state, 
            setState, 
            handle, 
            setHandle,
            
            onHandlePress,
            onHandleEffectI,
        }}>
            {children}
        </Context.Provider>
    )
}
