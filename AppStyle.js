import { StyleSheet } from 'react-native'

export default StyleSheet.create ({

mainContainer: {
    // default direction is column
    flex: 1,
},
inputContainer: {
    flex: 3,
    alignItems: 'center' // on secondary (row) axis
},
interestContainer: {
    flex: 3,
    width: 250
},
input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    width: 250,
    textAlign:'center'
},
multilineInput:{
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    width: 250,
},
//btnGroup ei käytössä interest screenissä
btnGroup: {
    flex: 1,
    flexDirection: 'column',
    //flexWrap: 'wrap',
    alignContent: 'space-around'
},
item: {
    padding: 10,
    marginVertical: 6,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 20
  },
//groupButton ei käytössä interest-screenillä
groupButton: {
    backgroundColor: 'white',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 20,
    width: 200,
    alignSelf: 'center'
    
},
listContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
},
flatListContainer: {
    flex: 4,
    width:"100%",
    // flexDirection: 'row',
   // flexWrap: 'wrap',
   // flexDirection: 'row',
   // alignContent: 'flex-start',
    //alignItems: 'center',
    //justifyContent: 'center',
},   
basicButton: {
    backgroundColor: 'rgba(128, 128, 128, 0.4)',
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 10,
    width: 200,
    marginBottom:10
},
basicTitle: {
    color: 'black',
    fontWeight: '100'
},
datePicker: {
    flex: 2,
},
eventImg: {
    height: 250,
    justifyContent: 'center',
    opacity: 0.7,
    marginBottom: 10
},
horizontalInputs: {
    flexDirection: 'row',
},
horizontalRight: {
    flex: 1,
    justifyContent: 'flex-end'
},
horizontalLeft: {
    flex: 1,
    justifyContent: 'flex-start'
},
label: {
    color: 'black',
    fontWeight: '700',
    fontSize: 16,
    marginLeft: 6,
    marginTop: 15
},
eventInput: {
    width: '95%',
    height: 40,
    margin: 6,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderColor: '#868B8E',
    borderWidth: 1
},
eventInputMultiline: {
    width: '95%',
    margin: 6,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderColor: '#868B8E',
    borderWidth: 1,
    textAlignVertical: 'top'
},

})