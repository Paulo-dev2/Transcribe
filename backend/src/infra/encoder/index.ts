import * as bcrypt from 'bcrypt';
import "dotenv/config";

const ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const KEYWORD = "BR@1596753Pas$BrNMXVB";

function getVigenereTable() {
  const table = [];
  for (let i = 0; i < ALPHABET.length; i++) {
    const row = [];
    for (let j = 0; j < ALPHABET.length; j++) {
      row.push(ALPHABET[(i + j) % ALPHABET.length]);
    }
    table.push(row);
  }
  return table;
}

function isSpecialCharacter(char: string) {
  return /[!@#$%^&*]/.test(char);
}

function isStrongPassword(password: string) {
  const tester = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
  return tester.test(password);
}

export class Encoder {
  private readonly rounds: number = 10;

  public async encode(plain: string): Promise<string> {
    const cipher = this.vigenereCipher(plain);
    return await bcrypt.hash(cipher, this.rounds);
  }

  public async compare(plain: string, hashed: string): Promise<boolean> {
    const cipher = this.vigenereCipher(plain);
    return await bcrypt.compare(cipher, hashed);
  }

  public vigenereCipher(plain: string) {
    const vigenereTable = getVigenereTable();
    let encryptedMessage = "";
    let keywordIndex = 0;
    for (let i = 0; i < plain.length; i++) {
      const messageChar = plain[i];
      if (isSpecialCharacter(messageChar) || !isStrongPassword(messageChar)) {
        encryptedMessage += messageChar;
      } else {
        const keywordChar = KEYWORD[keywordIndex % KEYWORD.length];
        keywordIndex++;
        const rowIndex = ALPHABET.indexOf(keywordChar);
        const columnIndex = ALPHABET.indexOf(messageChar);
        if (columnIndex >= 0) {
          const encryptedChar = vigenereTable[rowIndex][columnIndex];
          encryptedMessage += encryptedChar;
        }
      }
    }
    return encryptedMessage;
  }
}