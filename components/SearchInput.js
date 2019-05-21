import React from 'react';
import { StyleSheet, Text, View,Platform,TextInput,KeyboardAvoidingView} from 'react-native';

export default class SearchInput extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
         text: '', 
                    };
    }

    handleChangeText = text => { this.setState({
        text: text,
      });
  };

    handleSubmitEditing= text =>{
        const { onSubmit } = this.props;
        if (!this.state.text) return;
            onSubmit(this.state.text);
        this.setState({ text: '' });
    };

render(){

    const {placeholder} = this.props; 
    const {text} =this.state;

    return (
        <View style={styles.container}>
        <TextInput autoCorrect={false} 
        placeholder={placeholder}
        underlineColorAndroid="transparent"
        onChangeText={this.handleChangeText}
        onSubmitEditing={this.handleSubmitEditing}
         placeholderTextColor="white" 
         style ={styles.textInput} 
         clearButtonMode="always"
         value={text}
         >
         </TextInput>
        </View>
    );
}

}

const styles = StyleSheet.create({
    container: {
        height: 40,
        marginTop: 20,
        backgroundColor: '#666',
        marginHorizontal: 40,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    textInput: {
        flex: 1,
        color: 'white',
    },
})