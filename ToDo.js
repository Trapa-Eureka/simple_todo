import React, { Component } from 'react';
import { View, Text, touchableOpacity, StyleSheet, Dimensions, TouchableOpacity, TextInput } from 'react-native';

const { width, hight } = Dimensions.get("window");

export default class ToDo extends Component {
    state = {
        isEditing: false,
        isCompleted: false,
        toDoValue: ""
    };
    render () {
        const { isCompleted, isEditing, toDoValue } = this.state;
        const { text } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.column}>
                    <TouchableOpacity onPress={this._toggleComplete}>
                        <View style={[styles.circle, isCompleted ? styles.completedCircle : styles.uncompletedCircle]} />
                    </TouchableOpacity>
                    { isEditing ? (
                        <TextInput 
                            style={[
                                styles.text, 
                                styles.input, 
                                isCompleted ? styles.completedText : styles.uncompletedText
                            ]} 
                            value={toDoValue}
                            multiline={true}
                            onChangeText={this._controlInput}
                            returnKeyType={"done"}
                            onBlur={this._finishEditing}
                        />
                    ) : (
                        <Text style={[styles.text, isCompleted ? styles.completedText : styles.uncompletedText]}>{text}</Text>
                    )}
                </View>
                {isEditing ? (
                    // Editing Mode
                    <View style={styles.actions}>
                        <TouchableOpacity onPressOut={this._finishEditing}>
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionText}>✓</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    // Editing Mode end
                ) : (
                    <View style={styles.actions}>
                        <TouchableOpacity onPressOut={this._startEditing}>
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionText}>✎</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionText}>✗</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        );
    }
    _toggleComplete = () => {
        this.setState(prevState => {
            return {
                isCompleted: !prevState.isCompleted
            };
        });
    };
    _startEditing = () => {
        const { text } = this.props;
        this.setState({
            isEditing: true,
            toDoValue: text
        });
    };
    _finishEditing = () => {
        this.setState({
            isEditing: false
        });
    };
    _controlInput = (text) => {
        this.setState({
            toDoValue: text
        });
    };
}

const styles = StyleSheet.create ({
    container: {
        width: width - 50,
        borderBottomColor: "#bbb",
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    circle: {
        width: 26,
        height: 26,
        borderRadius: 13,
        borderWidth: 3,
        marginRight: 30
    },
    completedCircle: {
        borderColor: "#bbb"
    },
    uncompletedCircle: {
        borderColor: "#f23657"
    },
    text: {
        fontWeight: "600",
        fontSize: 20,
        marginVertical: 20
    },
    completedText: {
        color: "#bbb",
        textDecorationLine: "line-through"
    },
    uncompletedText: {
        color: "#353839"
    },
    column: {
        flexDirection: "row",
        alignItems: "center",
        width: width / 2,
        justifyContent: "space-between"
    },
    actions: {
        flexDirection: "row"
    },
    actionContainer: {
        marginVertical: 10,
        marginHorizontal: 10
    },
    actionText: {
        fontSize: 25,
        color: "#bbb"
    },
    input: {
        marginVertical: 15,
        width: width / 2,
        paddingBottom: 5
    }
})