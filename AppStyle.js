import { StyleSheet } from 'react-native'
import { withTheme } from 'react-native-elements'

export default StyleSheet.create({

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
        bottom: 0,
        marginBottom: 20,
    },
    txtOnEventImg: {
        marginLeft: 15,
        color: 'white',
        fontSize: 20,
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
    },
    boldFontWeight: {
        fontWeight: "700"
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
    /* Different event views */
    eventLists: {
        fontSize: 14,
        color: 'black'
    },
    views: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 50,

    },
    viewOptions: {
        color: 'black',
        fontSize: 10,
        backgroundColor: 'white',
        borderRadius: 11,
        borderColor: '#666',
        borderWidth: 1,
        opacity: 0.8,
        padding: 5,
        marginVertical: 5
    },
    viewOptions2: {
        color: 'black',
        fontSize: 10,
        backgroundColor: '#CCC',
        borderRadius: 11,
        borderColor: 'black',
        borderWidth: 1,
        opacity: 0.9,
        padding: 5,
        marginVertical: 5
    },
    /* EventCards */
    card: {
        width: 320,
        marginHorizontal: 8,
        borderRadius: 20,
        borderWidth: 1.5,
        borderColor: '#666',
        overflow: 'hidden',
        marginBottom: 12,
        marginTop: 8
    },
    cardBacgroundImg: {
        height: '100%',
        width: '100%',
    },
    avatarOnEventCard: {
        flexDirection: 'row',
        marginBottom: 3,
    },
    txtOnEventCard: {
        maxWidth: 250,
        marginLeft: 15,
        paddingRight: 5,
        color: 'white',
        fontSize: 20,
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
    },
    cardInfo: {
        position: 'absolute',
        bottom: 10,
        marginLeft: 15,
    },

    cardChip: {
        width: 'auto',
        backgroundColor: '#000',
        opacity: 0.6,
        color: 'white',
        margin: 3,
    },
    cardText: {
        color: 'white',
        fontSize: 12
    },
    /* Map */
    mapContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,

    },
    marker: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    markerImage: {
        height: 50,
        width: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#CCC',
    },
    markerTextView: {
        backgroundColor: '#333',
        borderRadius: 5,
        opacity: 0.7,
        marginLeft: 3,
        maxWidth: 110,
        paddingLeft: 4
    },
    markerText: {
        color: 'white',
        fontWeight: 'bold',
    },
    zoom: {
        position: 'absolute',
        top: 15,
        left: 10
    },
    icon: {
        color: 'white',
        paddingBottom: 10
    },

    /* Event tags */
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