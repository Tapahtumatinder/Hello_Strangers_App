import { StyleSheet } from 'react-native'

export default StyleSheet.create({

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
        textAlign: 'center'
    },
    multilineInput: {
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
        flexDirection: 'row',
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
    colorBlue: {
        color: '#1390E0'
    },
    colorBlack: {
        color: 'black'
    },
    filterButton: {
        width: '100%'
    },
    colorGrey: {
        color: '#666'
    },
    listItem: {
        padding: 0
    },
    image: {
        width: 375,
        height: 375,
        backgroundColor: '#ddd'
    },
    horizontalInputs: {
        flexDirection: 'row',
    },
    horizontalRight: {
        flex: 1,
        justifyContent: 'center'
    },
    horizontalLeft: {
        flex: 2,
        justifyContent: 'center'
    },
    horizontalCenter: {
        flex: 1,
        justifyContent: 'center',
    },
    label: {
        color: 'black',
        fontWeight: '700',
        fontSize: 16,
        marginLeft: 6,
        marginTop: 15
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
    bottomSheetContent: {
        alignItems: 'center'
    },
    profileImg: {
        height: 250,
        justifyContent: 'center',
        marginBottom: 10
    },
    eventImg: {
        height: 250,
        justifyContent: 'center',
        marginBottom: 10
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
    avatarOnEventImg: {
        marginLeft: 15,
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        marginBottom: 10,
    },
    txtOnEventImg: {
        width: '90%',
        marginLeft: 15,
        marginRight: 5,
        color: 'white',
        fontSize: 20,
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
    },
    eventDescription: {
        flex: 1,
        padding: 15
    },
    showHkiEventsChipGroup: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        backgroundColor: '#E9EAEC',
    },
    showHkiEventsChip: {
        margin: 15,
    },
    apiEventsListView: {
        flex: 6,
    },
    createEventItem: {
        flex: 1,
        flexDirection: 'row',
    },
    hkiApiEventsFlatList: {
        flex: 5,
    },
    hkiEventTagGroup: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    hkiEventTag: {
        justifyContent: 'center',
        backgroundColor: '#1390E0',
        margin: 5,
    },
})