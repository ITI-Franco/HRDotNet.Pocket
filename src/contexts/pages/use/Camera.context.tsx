// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { createContext, useReducer, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator'
import { CameraType } from 'expo-camera';
import { manipulateAsync, FlipType, SaveFormat, useImageManipulator } from 'expo-image-manipulator';

import { ValuesCamera } from 'src/constants/Values';
import { StateCamera, TypeHandle, TypeNavStack } from 'src/types/Types';
import { DateTimeUtils } from 'src/utils/DateTimeUtils';
import { Utils } from 'src/utils/Utils';
import { ERRORS, STRINGS } from 'src';

type TypeContext = {
    params?: { onPanel?: number } | undefined
    state: StateCamera
    setState: React.Dispatch<Partial<StateCamera>>
    handle: TypeHandle
    setHandle: React.Dispatch<Partial<TypeHandle>>

    onTakePicture: () => void
    onPickImage: () => void
    onRequestHandle: () => void
    onHandleEffectI: () => void
}

export const Context = createContext<TypeContext>({
    state: ValuesCamera.State,
    setState: () => { },
    handle: ValuesCamera.Handle,
    setHandle: () => { },

    onTakePicture: () => { },
    onPickImage: () => { },
    onRequestHandle: () => { },
    onHandleEffectI: () => { },
})

export const CtxCamera = ({ children }: { children: React.ReactNode }) => {
    const navigation : TypeNavStack['navigation'] = useNavigation()
    const params = useRoute().params! as { onPanel?: number }

    const [state, setState] = useReducer(
        (state: StateCamera, newState: Partial<StateCamera>) => ({ ...state, ...newState }), ValuesCamera.State
    )

    const [handle, setHandle] = useReducer(
        (state: TypeHandle, newState: Partial<TypeHandle>) => ({ ...state, ...newState }), ValuesCamera.Handle
    )

    const onTakePicture = async () => {
        const permission = await Utils.cameraPermission()

        if (permission) {
            if (handle.cameraRef) {
                let photo = await handle.cameraRef.takePictureAsync() as {
                    localUri?: string
                    uri: string
                }
    
                if (state.type === ImagePicker.CameraType.front) {
                    photo = await manipulateAsync(photo.localUri || photo.uri,
                        [{ rotate: 180 }, { flip: FlipType.Vertical }],
                        { compress: 1, format: SaveFormat.PNG })
                }
    
                setState({ image: photo.uri })
            }
        }
    }

    const onPickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.5,
        })

        if (!result.canceled) {
            const assets = result.assets[0]
            const info = await FileSystem.getInfoAsync(assets.uri) as {
                uri: string,
                size: number
            }

            if (info.size > STRINGS.sizeValue) {
                alert(ERRORS.fileSizeError)
                return
            }

            setState({ image: assets.uri })
            setHandle({ isLoading: false })
        }
    }

    const onRequestHandle = async () => {
        if (state.image) {
            const ext = state.image.substring(state.image.lastIndexOf('.') + 1).toLowerCase()
            const resized = await ImageManipulator.manipulateAsync(state.image, [], { compress: 0.2 })
            const timestamp = new Date().getTime() // get current timestamp in milliseconds
            const convertedUri = `${FileSystem.documentDirectory}Mobile_${timestamp}.${ext}`
            await FileSystem.copyAsync({ from: resized.uri, to: convertedUri })

            Utils.panelNavigateCamera(params?.onPanel, navigation, params, convertedUri, ext)
        }
    }

    const onHandleEffectI = async () => {
        await Utils.cameraPermission()
    }

    return (
        <Context.Provider value={{
            state, 
            setState, 
            handle, 
            setHandle,
            
            onTakePicture,
            onPickImage,
            onRequestHandle,
            onHandleEffectI,
        }}>
            {children}
        </Context.Provider>
    )
}
