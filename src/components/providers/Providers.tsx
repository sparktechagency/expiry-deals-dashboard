"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import { mainTheme } from "@/theme/mainTheme";
import NextTopLoader from "nextjs-toploader";
import MainLayoutContextProvider from "@/context/MainLayoutContext";
import { Provider as ReduxProvider } from "react-redux";
import { persistor, store } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";

export default function Providers({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <MainLayoutContextProvider>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AntdRegistry>
            <ConfigProvider theme={mainTheme}>{children}</ConfigProvider>

            <NextTopLoader
              color="var(--primary)"
              initialPosition={0.08}
              crawlSpeed={200}
              height={3}
              crawl={true}
              showSpinner={true}
              easing="ease"
              speed={200}
              shadow="0 0 10px var(--primary),0 0 5px #2299DD"
              zIndex={1600}
              showAtBottom={false}
            />

            <Toaster
              richColors
              position="top-center"
              duration={4000}
              toastOptions={{
                // style: {
                //   fontFamily: "var(--font-geist-sans)",
                // },
                className: "!font-geist-sans",
              }}
            />
          </AntdRegistry>
        </PersistGate>
      </ReduxProvider>
    </MainLayoutContextProvider>
  );
}
