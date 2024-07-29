import { authKey } from "@/constants/AuthKey";
import { setToLocalStorage } from "@/utils/local-storage";

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
    setToLocalStorage(authKey,accessToken)
};
