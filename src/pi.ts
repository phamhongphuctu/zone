export function initPi() {
    if (window.Pi) {
      window.Pi.init({
        version: "2.0",
        sandbox: true,
        appId: "zone", // đổi đúng theo tên app đăng ký trong Pi Dev Portal
      });
    }
  }
  
  export async function loginWithPi(): Promise<string | null> {
    try {
      const scopes = ["username"];
      const result = await window.Pi.authenticate(scopes, () => {});
      return result.user.username;
    } catch (err) {
      console.error("Login error:", err);
      return null;
    }
  }
  