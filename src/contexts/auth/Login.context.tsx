// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { createContext, useReducer } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Keyboard } from 'react-native';

import { Toast, ValuesLogin } from 'src/constants/Values';
import { useFetch } from 'src/hooks/useFetch';
import { StateLogin, TypeHandle, TypeNavStack } from 'src/types/Types';

type TypeContext = {
    state: StateLogin
    setState: React.Dispatch<Partial<StateLogin>>
    handle: TypeHandle
    setHandle: React.Dispatch<Partial<TypeHandle>>
    
    onToggleShowPassword: () => void
    onHandleLogIn: () => void
    onHandleEffect: () => void
}

export const Context = createContext<TypeContext>({
    state: ValuesLogin.State,
    setState: () => { },
    handle: ValuesLogin.Handle,
    setHandle: () => { },

    onToggleShowPassword: () => { },
    onHandleLogIn: () => { },
    onHandleEffect: () => { }
})

export const CtxLogin = ({ children }: { children: React.ReactNode }) => {
    const navigation : TypeNavStack['navigation'] = useNavigation()

    const [state, setState] = useReducer(
        (state: StateLogin, newState: Partial<StateLogin>) => ({ ...state, ...newState }),
        ValuesLogin.State
    )

    const [handle, setHandle] = useReducer(
        (state: TypeHandle, newState: Partial<TypeHandle>) => ({ ...state, ...newState }), ValuesLogin.Handle
    )

    const onToggleShowPassword = () => {
        setHandle({ isShowPassword: !handle.isShowPassword })
    }

    const onHandleLogIn = async () => {
        try {
            Keyboard.dismiss()
            setHandle({ 
                isLoading: true,
                isShowPassword: false,
                isToast: Toast
            })

            await useFetch.Login(state, setHandle, navigation)
        } catch (error) {
            alert(error)
        } finally {
            setHandle({ isLoading: false })
        }
    }

    const onHandleEffect = async () => { 
        await useFetch.LoginMount(navigation, setHandle) 
    }

    return (
        <Context.Provider value={{ 
            state, 
            setState, 
            handle, 
            setHandle,

            onToggleShowPassword,
            onHandleLogIn,
            onHandleEffect,
        }}>
            {children}
        </Context.Provider>
    )
}
