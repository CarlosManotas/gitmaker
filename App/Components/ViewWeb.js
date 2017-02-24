import React , {Component} from 'react';

import {
  View,
  WebView,
  StyleSheet
} from 'react-native';

var styles = StyleSheet.create({
  container:{
    backgroundColor:'#f6f6ef',
    flex:1,
    flexDirection:'column',
  }
});

export default class ViewWeb extends Component {
  render(){
    return (
      <View style={styles.container}>
        <WebView source={{uri:this.props.url}}/>
      </View>
    );
  }
}

ViewWeb.PropTypes={
  url: React.PropTypes.string.isRequired
}
