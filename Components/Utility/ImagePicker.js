import ImagePicker from 'react-native-image-crop-picker';
import ImgToBase64 from 'react-native-image-base64';

const PickImage = (richText) => {
  ImagePicker.openPicker({
    multiple: true,
  }).then(image => {
    console.log(image);
    ConvertBase64(image, richText)
  });
};
const ConvertBase64 = (image, richText) => {
    ImgToBase64.getBase64String(image.path)
      .then(base64String => {
        let imageData = `data:${image.mime}; base64, ${image.path}`;
        richText.current.insertImage(str)
      })
      .catch(err => console.log(err));
  };


export default PickImage;
