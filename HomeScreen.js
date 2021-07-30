import * as React from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';

export default class HomeScreen extends React.Component() {
getWord = (word) => {
    var keyword = word.toLowerCase();
    var url = "https://rupinwhitehatjr.github.io/dictionary/"+keyword+".json"

    return fetch(url)
    .then((data)=>{
        if(data.status === 200){
            return data.json()
        } else {
            return null
        }
    })
    
    .then((response)=>{
        var responseObject = response
        if(responseObject){
            var wordData = responseObject.definitions[0]
            var definition = wordData.description
            var type = wordData.wordtype

            this.setState({
                "word": this.state.text,
                "definition": definition,
                "type": type
            })
        } else {
            this.setState({
                "word": this.state.text,
                "definition": "404/Not Found"
            })
        }
    })
}
render(){
  return (
    <View>
      <TextInput
          onChangeText={text => {
            this.setState({ 
                text: text,
                isSearchPressed: false,
                word: "Loading...",
                type: '',
                examples: [],
                defination: ""
            });
          }}
          value={this.state.text}
        />
        <TouchableOpacity
            onPress = {() => {
                this.setState({ isSearchPressed: true });
                this.getWord(this.state.text);
            }}>
        </TouchableOpacity>
        <Text>
            Word: {" "}
        </Text>
        <Text>
            {this.state.word}
        </Text>
        <Text>
            Type: {" "}
        </Text>
        <Text>
            {this.state.type}
        </Text>
        <Text>
            Definition: {" "}
        </Text>
        <Text>
            {this.state.definition}
        </Text>
    </View>
  );
 }
}