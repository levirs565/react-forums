import { useLocalStorageState } from "../hook";
import PropTypes from "prop-types";
import { I8nContext } from "./context";

const resources = {
  logout: {
    id: "Keluar",
    en: "Logout",
  },
  lightTheme: {
    id: "Tema Terang",
    en: "Light Theme",
  },
  darkTheme: {
    id: "Tema Gelap",
    en: "Dark Theme",
  },
  langName: {
    id: "Bahasa Indonesia",
    en: "English Language",
  },
  searchPlaceholder: {
    id: "Cari...",
    en: "Search....",
  },
  threadTitleField: {
    id: "Judul",
    en: "Title",
  },
  threadTitleCannotBlankMessage: {
    id: "Email tidak boleh kosong",
    en: "Email cannot blank",
  },
  threadContentField: {
    id: "Isi",
    en: "Content",
  },
  threadContentCannotBlankMessage: {
    id: "Isi tidak boleh kosong",
    en: "Content cannot blank",
  },
  notHaveAccountMessage: {
    id: "Tidak punya akun?",
    en: "Does not have account?",
  },
  createAction: {
    id: "Buat",
    en: "Create",
  },
  registerAction: {
    id: "Daftar",
    en: "Register",
  },
  emailField: {
    id: "Pos-el",
    en: "Email",
  },
  emailCannotBlankMessage: {
    id: "Email tidak boleh kosong",
    en: "Email cannot blank",
  },
  passwordField: {
    id: "Sandi",
    en: "Password",
  },
  passwordCannotBlankMessage: {
    id: "Sandi tidak boleh kosong",
    en: "Password cannot blank",
  },
  loginAction: {
    id: "Masuk",
    en: "Login",
  },
  haveAccountMessage: {
    id: "Sudah punya akun?",
    en: "Have account?",
  },
  nameField: {
    id: "Nama",
    en: "Name",
  },
  nameCannotBlankMessage: {
    id: "Nama tidak boleh kosong",
    en: "Name cannot blank",
  },
  passwordMinimalMessage: {
    id: "Sandi minimal 8 karakter",
    en: "Password must have 8 character",
  },
  repeatPasswordField: {
    id: "Ulangi Sandi",
    en: "Repeat Password",
  },
  passwordMustEqualMessage: {
    id: "Sandi harus sama",
    en: "Password must equal",
  },
  notFoundTitle: {
    id: "Halaman tidak ada!",
    en: "Page not found!",
  },
  checkUrlMessage: {
    id: "Coba cek URL lagi. Bisa saja ada kesalahan penulisan",
    en: "Try check URL again. Probably there typo",
  },
  homeAction: {
    id: "Beranda",
    en: "Home",
  },
  createNewAction: {
    id: "Buat Baru",
    en: "Create New",
  },
  threadList: {
    id: "Diskusi",
    en: "Threads",
  },
  leaderboard: {
    id: "Peringkat",
    en: "Leaderboard",
  },
  category: {
    id: "Kategori",
    en: "Category",
  },
  availableThread: {
    id: "Diskusi Tersedia",
    en: "Available Threads",
  },
  newThreadAction: {
    id: "Diskusi Baru",
    en: "New Thread",
  },
  threadListBlank: {
    id: "Tidak ada diskusi tersedia",
    en: "No threads found",
  },
  newComment: {
    id: "Komentar Baru",
    en: "New Comment",
  },
  comments: {
    id: "Komentar",
    en: "Comments",
  },
  commentField: {
    id: "Komentar",
    en: "Comment",
  },
  commentCannotBlank: {
    id: "Komentar tidak boleh kosong",
    en: "Comment cannot blank",
  },
  createCommentAction: {
    id: "Buat Komentar",
    en: "Create Comment",
  },
  commentListBlank: {
    id: "Belum ada komentar",
    en: "No comments yet",
  },
};

export function I8nProvider({ children }) {
  const [lang, setLang] = useLocalStorageState("lang", "id");
  const toggleLang = () =>
    setLang((prevLang) => (prevLang === "id" ? "en" : "id"));
  const getText = (name) => {
    const resource = resources[name];

    if (!resource || !resource[lang])
      throw new Error(`Text resource not found with name ${name}`);

    return resource[lang];
  };

  return (
    <I8nContext.Provider value={{ lang, toggleLang, getText }}>
      {children}
    </I8nContext.Provider>
  );
}

I8nProvider.propTypes = {
  children: PropTypes.node,
};
