import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PasswordEncryptorService {
  constructor() {}

  encryptPasword(password: string): any {
    const alphabet =
      'a b c d e f g h i j k l m n o p q r s t u v w x y z A B C D E F G H I J K L M N O P Q R S T U V W X Y Z 1 2 3 4 5 6 7 8 9 0 ± ! @ # $ % ^ & * ( ) _ + - = § £ ™ ¡ ¢ ∞ § ¶ • ª º – ≠ œ ∑ ´ ® † ¥ ¨ ˆ ø π “ ‘ å ß ∂ ƒ © ˙ ˚ ¬ … æ «  ~ Ω ≈ ç √ ∫ ˜ µ ≤ ≥ ÷ ₩ È É Ê Ë Ē Ė Ę À Á Â Ä Æ Ã Ā Ś Š Ÿ Û Ü Ù Ú Ū Î Ï Í Ī Į Ì Ô Ö Ò Ó Œ Ō Õ Ł Ž Ź Ż Ç Ć Č Ñ Ń è é ê ë ē ė ę à á â ä æ ã ā ś š ÿ û ü ù ú ū î ï í ī į ì ô ö ò ó œ ō õ ł ž ź ż ç ć č ñ ń';
    const alphabeticAsArray = alphabet.split(' ');

    const encryptedPaswoord = password
      .split('')
      .map((x) => (isNaN(Number(x)) ? x.charCodeAt(0) : Number(x)))
      .map((x, i) => x + i + 3)
      .map((x) => (x > 50 ? (x = x - 44) : (x = x + 33)))
      .map((x) => (x < 20 && x > 10 ? (x = x * 3) : x * 88))
      .map((x) =>
        Number(String(x)[0]) % 2
          ? alphabeticAsArray[Number(String(x)[1]) * 23]
          : x
      );

    return encryptedPaswoord.join(' ').replace(/ /g, '');
  }
}
