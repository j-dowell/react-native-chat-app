import React, { Component } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: ''
    }
  }
  onChangeText = name => {
    this.setState({
      name
    })
  }
  render() {
    return (
      <View>
        <TextInput
          style={styles.nameInput}
          placeHolder="James"
          value={this.state.name}
          onChangeText={this.onChangeText}
        />
      </View>
    )
  }
}

const offset = 24;
const styles = StyleSheet.create({
  nameInput: { 
    height: offset * 2,
    margin: offset,
    paddingHorizontal: offset,
    borderColor: '#111111',
    borderWidth: 1,
  },
});

export default Main;
