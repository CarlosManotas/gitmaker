import React , {Component} from 'react';
import Badge from './Badge';
import api from '../Utils/api';
import {
  View,
  Text,
  ListView,
  TouchableHighlight,
  StyleSheet,
  TextInput
} from 'react-native';

var styles = StyleSheet.create({
  container:{
    flexGrow:1,
    backgroundColor: 'white',
  },
  button:{
    height:60,
    backgroundColor: '#48bbec',
    flex:3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowContainer:{
    padding:10,
  },
  searchInput:{
    color:'#111',
    fontSize:18,
    padding:10,
    height:60,
    flex:10,
  },
  footerContainer:{
    backgroundColor: '#e3e3e3',
    alignItems: 'center',
    flexDirection:'row',
    position:'absolute',
    bottom:0,
    left:0,
    right:0,
  },
  separator:{
    height:1,
    marginLeft:15,
    marginTop:3,
    flex:1,
    backgroundColor:'#eaeaea',
  }
});

export default class Notas extends Component{
  constructor(props){
    super(props)
    this.ds = new ListView.DataSource({rowHasChanged: (row1,row2)=>row1 !== row2});
    this.state = {
      dataSource: this.ds.cloneWithRows(this.props.notes),
      note:'',
      error:''
    }
  }
  handleChange(e){
    this.setState({
      note:e.nativeEvent.text
    });
  }
  handleSubmit(){
    let note = this.state.note;
    this.setState({
      note:''
    })
    api.addNote(this.props.userInfo.login, note)
      .then((data)=>{
        api.getNotes(this.props.userInfo.login)
          .then((data)=>{
            this.setState({
              dataSource: this.ds.cloneWithRows(data)
            })
          })
      }).catch((err)=>{
        console.log('Request failed', err);
        this.setState({
          error
        })
      })
  }
  renderRow(rowData){
    return(
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <Text>{rowData}</Text>
        </View>
        <View style={styles.separator}/>
      </View>
    )
  }
  footer(){
    return(
      <View style={styles.footerContainer}>
        <TextInput
          style={styles.searchInput}
          value={this.state.note}
          onChange={this.handleChange.bind(this)}
          placeholder='Nueva Nota' />
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this)}
          underlayColor='#88d4f5'>
            <Text style={styles.buttonText}>Enviar</Text>
        </TouchableHighlight>
      </View>
    );
  }
  render(){
    return(
      <View style={styles.container}>
      <ListView
        enableEmptySections={true}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        renderHeader={() => <Badge userInfo={this.props.userInfo}/>} />
      {this.footer()}
      </View>
    )
  }
}


Notas.PropTypes = {
  userInfo : React.PropTypes.object.isRequired,
  notes : React.PropTypes.object.isRequired
};
