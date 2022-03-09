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
input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    width: 250
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
basicButton: {
    backgroundColor: 'rgba(128, 128, 128, 0.4)',
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 10,
    width: 200
},
basicTitle: {
    color: 'black',
    fontWeight: '100'
},
datePicker: {
    flex: 2,
},

})