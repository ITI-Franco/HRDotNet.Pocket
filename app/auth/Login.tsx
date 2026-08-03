// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity ,ActivityIndicator, StatusBar } from "react-native";
import { Image } from "expo-image";
import { Entypo } from "@expo/vector-icons";

import Loader from "src/components/loader/Loader";
import Toast from "src/components/use/Toast";
import { COLORS, STRINGS, FONTS, STYLES, ASSETS } from "src";
import useLogin from "src/contexts/auth";

const Login: React.FC = () => {
    const styles = STYLES.Login
    const [fontsLoaded] = FONTS()

    if (!fontsLoaded) { return (<Loader />) }

    const {
        state,
        setState,
        handle,
        setHandle,
        onToggleShowPassword,
        onHandleLogIn,
        onHandleEffect
    } = useLogin()

    useEffect(() => {
        onHandleEffect()
    }, [])

    return (
        <React.Fragment>
            <StatusBar backgroundColor={COLORS.clearWhite} barStyle="dark-content" />

            {handle.isToast!.show && (
                <Toast handle={handle.isToast!} setHandle={setHandle} />
            )}

            {handle.isLoading ? (<Loader />) : (
                <View style={styles.container}>
                    <View style={styles.wrapper}>
                        <View style={styles.inputContainer}>
                            <Image
                                source={ASSETS.logoIcon}
                                style={styles.logoIcon}
                                onLoadStart={() => <ActivityIndicator size={'large'} />}
                                contentFit="contain"
                            />
                            <Image
                                source={ASSETS.logoWord}
                                  style={styles.logo}
                                
                                onLoadStart={() => <ActivityIndicator size={'large'} />}
                                contentFit="contain"
                            />

                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.textInput}
                                    onChangeText={(text: string) => setState({ username: text })}
                                    value={state.username}
                                    placeholder={STRINGS.placeholderUsername}
                                    placeholderTextColor={COLORS.lighterGray}
                                />
                            </View>

                            <View style={[styles.inputWrapper, ]}>
                                <TextInput
                                    style={styles.textInput}
                                    onChangeText={(text: string) => setState({ password: text })}
                                    value={state.password}
                                    secureTextEntry={!handle.isShowPassword}
                                    placeholder={STRINGS.placeholderPassword}
                                    placeholderTextColor={COLORS.lighterGray}
                                />
                                <View onTouchStart={onToggleShowPassword} style={{  position: 'absolute', right: 0, padding: 11, }}>

                                    <Entypo
                                        name={handle.isShowPassword ? 'eye' : 'eye-with-line'}
                                        size={24}
                                        color={COLORS.darkGray}
                                    // onPress={onToggleShowPassword}
                                    style={{marginEnd:10}}
                                    />
                                </View>
                            </View>

                            <TouchableOpacity
                                style={styles.loginBtn}
                                onPress={onHandleLogIn}
                            >
                                <Text style={styles.loginText}>{STRINGS.logIn}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Text style={styles.textFooter}>{STRINGS.loginFooter}</Text>
                </View>
            )}
        </React.Fragment>
    )
}

export default Login