import { useEffect, useState } from "react";
import { useI8n } from "./provider/context";

export function useLocalStorageState(name, defaultValue) {
  const [value, setter] = useState(
    () => localStorage.getItem(name) ?? defaultValue
  );

  useEffect(() => {
    localStorage.setItem(name, value);
  }, [name, value]);

  useEffect(() => {
    const listener = (event) => {
      if (event.key && event.key != name) return;
      if (event.storageArea != localStorage) return;
      if (event.newValue == value) return;
      setter(event.newValue);
    };
    window.addEventListener("storage", listener);
    return () => {
      window.removeEventListener("storage", listener);
    };
  }, [value, name]);

  return [value, setter];
}

export function useFormatDate() {
  const { lang } = useI8n();
  return (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString(
      lang === "id" ? "id-ID" : "en-US",
      options
    );
  };
}

export function useActionState() {
  const [error, setError] = useState(null);
  const [isPerformed, setIsPerformed] = useState(false);
  const handlePromise = (promise) => {
    setError(null);
    setIsPerformed(true);
    promise
      .catch((e) => {
        console.error(e);
        setError(e.message);
      })
      .finally(() => {
        setIsPerformed(false);
      });
  };
  return { error, isPerformed, handlePromise };
}
