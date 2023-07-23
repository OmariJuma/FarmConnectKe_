import ImagePicker from 'react-native-image-crop-picker';
import ImgToBase64 from 'react-native-image-base64';
import {decode} from 'base-64';

if (typeof atob === 'undefined') {
  global.atob = decode;
}
const PickImage = richText => {
  ImagePicker.openPicker({
    width: 300,
    height: 400,
    cropping: true,
  }).then(image => {
    ImgToBase64.getBase64String(image.path)
      .then(base64String => {
        console.log(base64String);
        richText.current?.insertImage(
          `data:${image.mime};base64,${base64String}`,
        );
      })
      .catch(error => {
        console.log(error);
      });
  });
};
export default PickImage;
