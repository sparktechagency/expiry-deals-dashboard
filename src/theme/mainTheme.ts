import { ThemeConfig } from "antd";

export const mainTheme: ThemeConfig = {
  token: {
    colorPrimary: "#fb6000",
    colorInfo: "#fb6000",
    fontFamily: "inherit",
  },

  components: {
    Menu: {
      itemBg: "transparent",
      itemColor: "#000",
      itemHoverBg: "var(--primary)",
      itemHoverColor: "#fff",
      subMenuItemBg: "var(--demin-primary-50)",
      itemSelectedBg: "var(--primary)",
      itemSelectedColor: "white",
      iconSize: 17,
      itemMarginBlock: 10,
      itemHeight: 56,
      itemPaddingInline: 1,
    },

    Table: {
      headerBg: "var(--primary)",
      headerSplitColor: "white",
      headerColor: "rgb(248, 250, 252)",
      cellFontSize: 16,
      colorText: "black",
      footerColor: "rgba(31, 41, 55, 0.88)",
      footerBg: "rgb(79, 106, 167)",
      headerFilterHoverBg: "transparent",
      filterDropdownMenuBg: "#fff",
      filterDropdownBg: "#fff",
      colorPrimary: "red",
      borderColor: "lightGray",
      headerBorderRadius: 0,
    },

    Button: {
      colorPrimary: "var(--primary)",
      colorPrimaryHover: "#fc6508",
    },

    Input: {
      colorBorder: "#a2a2a3",
    },
    Select: {
      colorBorder: "#a2a2a3",
    },

    DatePicker: {
      colorBgContainer: "var(--primary)",
      colorPrimary: "var(--primary)",
      colorTextPlaceholder: "#ffffff",
    },
  },
};
