import { useLocalStorageState } from "../hook";
import PropTypes from "prop-types";
import { I8nContext } from "./context";

const resources = {
  activeNote: {
    id: "Aktif",
    en: "Active",
  },
  archiveNote: {
    id: "Arsip",
    en: "Archive",
  },
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
  noteTitlePlaceholder: {
    id: "Judul",
    en: "Title",
  },
  noteBodyPlaceholder: {
    id: "Catatan",
    en: "Note",
  },
  closeAction: {
    id: "Keluar",
    en: "Close",
  },
  saveAction: {
    id: "Simpan",
    en: "Save",
  },
  remainingLength: {
    id: "% tersisa",
    en: "% remaining",
  },
  editAction: {
    id: "Ubah",
    en: "Edit",
  },
  unarchiveAction: {
    id: "Batal Arsip",
    en: "Unarchive",
  },
  archiveAction: {
    id: "Arsipkan",
    en: "Archive",
  },
  deleteAction: {
    id: "Hapus",
    en: "Delete",
  },
  noteBlankMessage: {
    id: "Catatan kosong",
    en: "Note empty",
  },
  noteFindNotFoundMessage: {
    id: "Catatan tidak ditemukan",
    en: "Note not found",
  },
  archiveBlankMessage: {
    id: "Arsip catatan kosong",
    en: "Note archive empty",
  },
  archiveFindNotFoundMessage: {
    id: "Catatan terarsip tidak ditemukan",
    en: "Archived note not found",
  },
  notHaveAccountMessage: {
    id: "Tidak punya akun?",
    en: "Does not have account?",
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
  noteNotFoundMessage: {
    id: "Catatan tidak ada!",
    en: "Note not found!",
  },
  createNewAction: {
    id: "Buat Baru",
    en: "Create New",
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