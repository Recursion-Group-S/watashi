import { onAuthStateChanged } from 'firebase/auth';
import { atom } from 'jotai';
import { useAtomValue } from 'jotai/utils';
import { auth } from '../client/firebase';



const authUserState = atom(null);

authUserState.onMount = (setAtom) => {
  // a: 最初の認証状態を取得した時に解決するPromiseを初期値に設定
  let resolvePromise;
  const initialValue = new Promise((resolve) => {
    resolvePromise = resolve;
  });
  setAtom(initialValue);

  // b: 認証状態の監視
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    // c: Userから必要なプロパティだけ取り出す
    if (user) {
      resolvePromise(user);
      setAtom(user);
    } else {
      resolvePromise(null);
      setAtom(null);
    }
  });
  // d: 監視を終了する関数を返す
  return () => {
    unsubscribe();
  };
};

// e: atomの値をサブスクライブするフック
export function useAuthUser() {
  return useAtomValue(authUserState);
}