export class Encoder {
  private readonly ALPHABET: string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  private readonly KEYWORD: string = "BR@1596753Pas$BrNMXVB";

  private getVigenereTable(): string[][] {
    const table: string[][] = [];

    for (let i = 0; i < this.ALPHABET.length; i++) {
      const row: string[] = [];
      for (let j = 0; j < this.ALPHABET.length; j++) {
        row.push(this.ALPHABET[(i + j) % this.ALPHABET.length]);
      }
      table.push(row);
    }

    return table;
  }

  private isSpecialCharacter(char: string): boolean {
    return /[!@#$%^&*]/.test(char);
  }

  private isStrongPassword(password: string): boolean {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(password);
  }

  public async encode(plain: string): Promise<string> {
    const vigenereTable = this.getVigenereTable();
    let encryptedMessage = '';
    let keywordIndex = 0;

    for (let i = 0; i < plain.length; i++) {
      const messageChar = plain[i];
      if (this.isSpecialCharacter(messageChar) || !this.isStrongPassword(messageChar)) {
        encryptedMessage += messageChar;
      } else {
        const keywordChar = this.KEYWORD[keywordIndex % this.KEYWORD.length];
        keywordIndex++;
        const rowIndex = this.ALPHABET.indexOf(keywordChar);
        const columnIndex = this.ALPHABET.indexOf(messageChar);

        if (columnIndex >= 0) {
          const encryptedChar = vigenereTable[rowIndex][columnIndex];
          encryptedMessage += encryptedChar;
        }
      }
    }

    return encryptedMessage;
  }
}
