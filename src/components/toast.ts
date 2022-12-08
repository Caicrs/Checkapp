import Toast from 'react-native-simple-toast';
import { colors } from '../assets/styles/colors';

function ToastError(text:string) {
    Toast.showWithGravityAndOffset(
        `${text}`,
        Toast.LONG,
        Toast.TOP,
        0,
        100,
        {
          textColor: colors.black,
          backgroundColor: '#FF0000',
        },
      );
}

export const AllToast = {ToastError}

