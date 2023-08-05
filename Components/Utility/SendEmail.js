import email from 'react-native-email';
import {Toast} from "toastify-react-native"

const sendEmail = (senderEmail, firstName, password) => {
    // const email = senderEmail; // Replace with the recipient's email address
    const subject = `FarmConnectKe account created successfully😃`; // Replace with the subject of the email
    const body = `Hi ${firstName},\n\nYou have been added to our platform we are excited to have you on-board.\n\nTo get startedUse this password to login first and change your password under profile tab ${password}  🕐 \n\nKind Regards\n\nFarmConnectKe Customer Care`; 
    const to = [senderEmail]; // string or array of email addresses
    email(to, {
      // cc: ['bazzy@moo.com', 'doooo@daaa.com'], // string or array of email addresses
      // bcc: 'mee@mee.com', // string or array of email addresses
      subject: subject,
      body: body,
      checkCanOpen: false, // Call Linking.canOpenURL prior to Linking.openURL
    })        
    .catch((err)=>Toast.error('An error occurred, try again', 'top'))

};

export default sendEmail;
