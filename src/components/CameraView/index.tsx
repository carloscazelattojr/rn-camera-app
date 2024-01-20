import React, { useRef, useState } from 'react';
import { Text, TouchableOpacity, View, Modal, Image } from 'react-native';

import { Camera, CameraType, FlashMode, ImageType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

import { styles } from './styles';

import { FontAwesome5 } from '@expo/vector-icons';


interface CameraViewProps {
    type: CameraType;
    onFlipCamera: () => void;
}

export function CameraView({ type, onFlipCamera }: CameraViewProps) {

    const camRef = useRef<Camera>(null);
    const [capturePhoto, setCapturePhoto] = useState<string | null>(null);
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

    const options = { quality: 1, ImageType: ImageType.jpg };

    const onTakePicture = async () => {
        if (camRef && camRef.current) {
            const data = await camRef.current.takePictureAsync(options);
            setCapturePhoto(data.uri);
            setModalIsOpen(true);
        }
    }

    async function savePicture() {
        if (capturePhoto !== null) {
            await saveToAlbum(capturePhoto, "hotwheels");
        }
    }

    async function saveToAlbum(uri: string, album: string) {
        const asset = await MediaLibrary.createAssetAsync(uri);
        await MediaLibrary.createAlbumAsync(album, asset);
        setModalIsOpen(false);
    }


    return (
        <View style={styles.container}>
            <Camera
                style={styles.mainView}
                type={type}
                ratio='16:9'
                zoom={0}
                flashMode={FlashMode.off}
                ref={camRef}
            >

                <TouchableOpacity style={styles.flipArea} onPress={onFlipCamera}>
                    <FontAwesome5 name="sync" size={50} color={"#FFF"} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.takePhoto} onPress={onTakePicture}>
                    <FontAwesome5 name="camera" size={40} color={"#FFF"} />
                </TouchableOpacity>

                {
                    capturePhoto && (
                        <Modal
                            animationType='slide'
                            transparent={false}
                            visible={modalIsOpen}
                        >
                            <View style={styles.modal}>
                                <View style={styles.modalContainerButton}>
                                    <TouchableOpacity
                                        style={styles.modalButton}
                                        onPress={() => { setModalIsOpen(false) }}
                                    >
                                        <Text>Close</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.modalButton}
                                        onPress={savePicture}
                                    >
                                        <Text>Save</Text>
                                    </TouchableOpacity>
                                </View>
                                <Image style={styles.modalImage}
                                    source={{ uri: capturePhoto }}
                                />
                            </View>

                        </Modal>
                    )
                }
            </Camera>
        </View>
    );
}