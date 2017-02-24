import React , {Component} from 'react';

import {
  View,
  Text,
  Image,
  TouchableHighlight,
  StyleSheet
} from 'react-native';

var styles = StyleSheet.create({
  container:{
    backgroundColor:'#48bbec',
    paddingBottom:10,
    flex:1,
  },
  name:{
    alignSelf:'center',
    fontSize:21,
    marginTop:10,
    marginBottom:5,
    color:'white',
  },
  handle:{
    alignSelf:'center',
    fontSize:16,
    color:'white',
  },
  image:{
    height:125,
    width:125,
    borderRadius:65,
    marginTop:35,
    alignSelf:'center',
  }
});

export default class Badge extends Component{
  render(){
    return(
      <View style={styles.container}>
        <Image style={styles.image} source={{uri:this.props.userInfo.avatar_url}} />
        <Text style={styles.name}>{this.props.userInfo.name}</Text>
        <Text style={styles.handle}>{this.props.userInfo.login}</Text>
      </View>
    );
  }
}

Badge.propTypes = {
  userInfo: React.PropTypes.object.isRequired
};
