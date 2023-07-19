import ImagePicker from 'react-native-image-crop-picker';
import ImgToBase64 from 'react-native-image-base64';
import { storage } from '../../firebase';
import uuid from 'react-native-uuid';
import { uploadBytes, ref } from 'firebase/storage';
const PickImage = (richText) => {
  ImagePicker.openPicker({
    width: 300,
    height: 400,
    cropping: true,
  }).then(image => {
    console.log(image);
    uploadBytes(ref(storage, 'images/' + image.filename+uuid.v4(), image))
    richText.current?.insertImage(i)
    // ConvertBase64(image, richText)
  });
};
// const ConvertBase64 = (image, richText) => {
//     ImgToBase64.getBase64String(image.path)
//       .then(base64String => {
//         const str = `data:${image.mime};base64,${base64String}`
//         richText.current?.insertImage(
//           str
//         );      })
//       .catch(err => console.log(err));
//   };


export default PickImage;
