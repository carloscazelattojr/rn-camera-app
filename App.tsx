import { Camera, CameraType } from 'expo-camera';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CameraView } from './src/components/CameraView';

import * as MediaLibrary from 'expo-media-library';

export default function App() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean>(false);
  const [hasMediaPermission, setHasMediaPermission] = useState<boolean>(false);

  const onFlipCamera = () => {

    if (hasCameraPermission === false || null) {
      return <View><Text>Você não tem permissão de Camera.</Text></View>;
    }

    setType(current => (current === CameraType.back
      ? CameraType.front
      : CameraType.back));


    if (hasMediaPermission === false || null) {
      return <View><Text>Você não tem permissão de Midias.</Text></View>;
    }


  }

  useEffect(() => {

    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === 'granted');
    })();

    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setHasMediaPermission(status === 'granted');
    })();
  }, []);

  return (
    <View style={styles.container}>
      <CameraView
        type={type}
        onFlipCamera={onFlipCamera}
      />
    </View>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});
