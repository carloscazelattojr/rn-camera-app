import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    modalContainerButton: {
        flexDirection: 'row',
    },
    mainView: {
        flex: 1,
        backgroundColor: "transparent",
        flexDirection: "row",
    },
    flipArea: {
        position: 'absolute',
        bottom: 20,
        left: 20
    },
    flipText: {
        fontSize: 20,
        marginBottom: 15,
        color: "#fff",
    },
    takePhoto: {
        position: 'absolute',
        bottom: 20,
        right: 20
    },
    takePhotoText: {
        fontSize: 20,
        marginBottom: 15,
        color: "#fff",
    },
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
    },
    modalImage: {
        width: '100%',
        height: 650,
        borderRadius: 20
    },
    modalButton: {
        margin: 10,
        paddingRight: 20,
        paddingLeft: 20
    }
});