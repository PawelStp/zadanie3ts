
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Picker } from 'react-native';

export default function ResultDetails({ route: { params } }) {

    return (<View style={{ flex: 1 }} >
        <Text style={styles.textStyle}>Imie i nazwisko: {params.result.Driver?.givenName} {params.result.Driver.familyName}</Text>
        <Text style={styles.textStyle}>Data urodzin: {params.result.Driver.dateOfBirth}</Text>
        <Text style={styles.textStyle}>Kraj: {params.result.Driver.nationality}</Text>
        <Text style={styles.textStyle}>Team: {params.result.Constructor.name}</Text>
        <Text style={styles.textStyle}>Liczba zdobytych punktów: {params.result.points}</Text>
    </View>)
}


export function QualiResultDetails({ route: { params } }) {

    return (<View style={{ flex: 1 }} >
        <Text style={styles.textStyle}>Imie i nazwisko: {params.result.Driver?.givenName} {params.result.Driver.familyName}</Text>
        <Text style={styles.textStyle}>Data urodzin: {params.result.Driver.dateOfBirth}</Text>
        <Text style={styles.textStyle}>Kraj: {params.result.Driver.nationality}</Text>
        <Text style={styles.textStyle}>Team: {params.result.Constructor.name}</Text>
        <Text style={styles.textStyle}>Q1: {params.result.Q1}</Text>
        <Text style={styles.textStyle}>Q2: {params.result.Q2}</Text>
        <Text style={styles.textStyle}>Q3: {params.result.Q3}</Text>
    </View>)
}

export  function StandingsDetails({ route: { params } }) {

    return (<View style={{ flex: 1 }} >
        <Text style={styles.textStyle}>Imie i nazwisko: {params.result.Driver?.givenName} {params.result.Driver.familyName}</Text>
        <Text style={styles.textStyle}>Data urodzin: {params.result.Driver.dateOfBirth}</Text>
        <Text style={styles.textStyle}>Kraj: {params.result.Driver.nationality}</Text>
        <Text style={styles.textStyle}>Miejsce: {params.result.position}</Text>
        <Text style={styles.textStyle}>Liczba zdobytych punktów: {params.result.points}</Text>
    </View>)
}


const styles = StyleSheet.create({
    textStyle: {
        flex: 1,
        paddingTop: 2,
        borderColor: "#7a42f4",
        borderWidth: 1,
        margin: 5,
    },
});