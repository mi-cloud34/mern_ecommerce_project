import { useTranslation } from "react-i18next";

function Homes(){
    const { t } = useTranslation(["common"]);
    return (
        <div>
            <h1>{t("home")}</h1>
        </div>
    )
}
export default Homes;