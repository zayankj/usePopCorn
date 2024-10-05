import { useEffect } from "react";

export function useKeys(key, action) {
  useEffect(
    function () {
      function callBack(e) {
        if (e.code.toLowerCase() === key.toLowerCase()) {
          action();
          //   onCloseMovie();
          //   console.log("CLOSING");
        }
      }
      document.addEventListener("keydown", callBack);
      return function () {
        document.removeEventListener("keydown", callBack);
      };
    },
    [action, key]
  );
}
