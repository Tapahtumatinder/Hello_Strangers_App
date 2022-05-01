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
colorBlue: {
    color: '#1390E0'
},
colorBlack: {
    color: 'black'
},
colorGrey: {
    color: '#666'
},
listItem: {
    padding: 0
},
/* EventScreen */
eventImg: {
    height: 250,
    justifyContent: 'center',
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
/* EventDetailsScreen */
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
    fontSize: 20,
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 } ,
    textShadowRadius: 5,
},
boldFontWeight: {
    fontWeight: "700"
},
attending: {
    fontWeight: "700",
    marginBottom: 16
},
eventChips: {
    flex: 1,
    alignItems: 'flex-start',
    padding: 10
},
eventDescription: {
    flex: 1,
    padding: 15
},
bottomSheetContent: {
    alignItems: 'center'
},

})