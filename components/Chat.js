import React, { Component} from 'react';
import { View, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import Fire from '../Fire';


class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      isLoading: true
    }
  }
  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).name || 'Chat!',
  });


  // Start looking for messages. Get messages and add them
  componentDidMount() {
    Fire.shared.on(message => {
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
        isLoading: false
      }))
    });
  }

  // Unsubscribing from the db
  componentWillUnmount() {
    Fire.shared.off();
  }

  get user() {
    return {
      name: this.props.navigation.state.params.name,
      _id: Fire.shared.uid
    }
  }
  render() {
    const offset = (Platform.OS === 'android') ? 80 : 0;
    return (
      <View style={{flex: 1}}>
        {this.state.isLoading ? (<ActivityIndicator size="large" color="#0000ff"/>) : (
          <View style={{flex: 1}}>
            <GiftedChat
              messages={this.state.messages}
              onSend={Fire.shared.send}
              user={this.user}
            />
            <KeyboardAvoidingView behavior={ Platform.OS === 'android' ? 'padding' :  null} keyboardVerticalOffset={offset} />
          </View>
        )}
      </View>
    )
  }
}


export default Chat;
