import ImagePicker from 'react-native-image-crop-picker';
import ImgToBase64 from 'react-native-image-base64';
import {storage} from '../../firebase';
import uuid from 'react-native-uuid';
import {uploadBytes, ref, getDownloadURL} from 'firebase/storage';
const PickImage = richText => {
  ImagePicker.openPicker({
    width: 300,
    height: 400,
    cropping: true,
    includeBase64: true
  }).then(image => {
    const str = `data:${image.mime};base64,${image.data}`
    console.log(image);
    uploadBytes(ref(storage, 'images/' + uuid.v4()), image, {
      contentType: image.mime,
    })
    richText.current?.insertImage(str)

    .then(snapshot=>{
      let url=getDownloadURL(snapshot.ref)

    })
  });
};

export default PickImage;
