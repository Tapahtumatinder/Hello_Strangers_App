import { StyleSheet } from 'react-native'

export default StyleSheet.create ({

mainContainer: {
    // default direction is column
    flex: 1,
},
centerContainer: {
    alignItems: 'center' // on secondary (row) axis
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
item: {
    padding: 10,
    marginVertical: 6,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 20
  },
listContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
},  
profileDescription: {
    padding: 10,
    fontSize: 18,
    color: 'grey'
},
profileChips: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection:'row',
   // alignContent: 'space-around',
    padding: 10
},
descriptionContainer: {
    flex: 2,
    justifyContent: 'center'
},
basicButton: {
    backgroundColor: 'rgba(128, 128, 128, 0.4)',
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 10,
    width: 250,
    margin: 10
},
basicTitle: {
    color: 'black',
    fontWeight: '100'
},
datePicker: {
    flex: 2,
},
// picture-komponentin kuvan style
image: {
    width: 375,
    height: 375,
    backgroundColor: '#ddd'
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
// POISTA ALLA OLEVAT ENNEN PUSHAUSTA
profileImg: {
    height: 250,
    justifyContent: 'center',
    marginBottom: 10
},
avatarOnEventImg: {
    marginLeft: 15, 
    flexDirection: 'row',
    position: 'absolute',
    bottom:0,
    marginBottom: 20,
},
txtOnEventImg: {
    marginLeft: 15,
    color: 'white',
    fontSize: 30,
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 } ,
    textShadowRadius: 5,
}

})