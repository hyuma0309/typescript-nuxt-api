export class TokenUtil {
  // LSからトークン取得
  public static getToken(): string | null {
    try {
      return window.localStorage.getItem('token');
    } catch (error) {
      return '';
    }
  }

  // LSにトークンを保存
  public static setToken(token: string) {
    try {
      return window.localStorage.setItem('token', token);
    } catch (error) {
      return '';
    }
  }
}
