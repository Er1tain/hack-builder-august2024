//Формат ответа на запрос о получении информации о рабочем
type ClientResp = {
    id: number,
    firstName: string,
    diplomFiles: {
        url: string
    }[],
    surname: string,
    secondName: string,
    email: string,
    phoneNumber: string,
    aboutMe: string,
    objectConstruction: ObjectConstructionResp,
    professions: ProfessionResp[],
    gradeUp: number
}